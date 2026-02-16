import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import Subscription from '@/lib/db/models/subscription';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { sendPaymentFailedEmail } from '@/lib/email';
import { constructWebhookEvent } from '@/lib/stripe';

// Track processed event IDs for idempotency (in-memory, resets on deploy)
const processedEvents = new Set<string>();
const MAX_PROCESSED_EVENTS = 10000;

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
    }

    const rawBody = await request.text();

    let event: Stripe.Event;
    try {
      event = constructWebhookEvent(rawBody, signature);
    } catch (err) {
      console.error('[Webhook] Signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed.' },
        { status: 400 }
      );
    }

    // Idempotency check — mark BEFORE processing to prevent concurrent duplicates.
    // If processing fails, the ID is removed so Stripe retries can succeed.
    if (processedEvents.has(event.id)) {
      return NextResponse.json({ received: true });
    }
    processedEvents.add(event.id);

    // Prune oldest entries when set grows too large
    if (processedEvents.size > MAX_PROCESSED_EVENTS) {
      const iter = processedEvents.values();
      for (let i = 0; i < 1000; i++) {
        processedEvents.delete(iter.next().value!);
      }
    }

    try {
      await connectDB();

      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await handleSubscriptionUpsert(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
        case 'invoice.payment_succeeded':
          await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;
        case 'invoice.payment_failed':
          await handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;
        default:
          // Unhandled event type — log and acknowledge
          console.log(`[Webhook] Unhandled event type: ${event.type}`);
      }
    } catch (processingError) {
      // Remove from idempotency set so Stripe retries can reprocess
      processedEvents.delete(event.id);
      throw processingError;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Webhook] Processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 });
  }
}

/**
 * Handle checkout.session.completed — link subscription to store.
 * The session's customer maps to our user via stripe_customer_id.
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  if (session.mode !== 'subscription' || !session.subscription || !session.customer) {
    return;
  }

  const stripeCustomerId =
    typeof session.customer === 'string' ? session.customer : session.customer.id;

  // Find the user by stripe_customer_id to get their store_id
  const user = await User.findOne({ stripe_customer_id: stripeCustomerId }).lean();
  if (!user || !user.store_id) {
    console.warn(
      '[Webhook] checkout.session.completed: no user/store found for customer',
      stripeCustomerId
    );
    return;
  }

  // Subscription object will be synced by the customer.subscription.created event
  // that Stripe fires separately. Log for debugging.
  console.log(
    `[Webhook] Checkout completed for store ${user.store_id}, subscription ${session.subscription}`
  );
}

/**
 * Handle customer.subscription.created and customer.subscription.updated.
 * Upserts the subscription record in MongoDB.
 */
async function handleSubscriptionUpsert(sub: Stripe.Subscription): Promise<void> {
  const stripeCustomerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;

  const user = await User.findOne({ stripe_customer_id: stripeCustomerId }).lean();
  if (!user || !user.store_id) {
    console.warn(
      '[Webhook] subscription upsert: no user/store found for customer',
      stripeCustomerId
    );
    return;
  }

  const firstItem = sub.items.data[0];
  const priceId = firstItem?.price?.id || '';

  // Upsert by store_id (one subscription per store, enforced by unique index).
  // Using store_id instead of stripe_subscription_id ensures re-subscriptions
  // after cancellation update the existing record rather than hitting a
  // duplicate key error on the store_id unique index.
  await Subscription.findOneAndUpdate(
    { store_id: user.store_id },
    {
      $set: {
        store_id: user.store_id,
        stripe_subscription_id: sub.id,
        stripe_price_id: priceId,
        status: sub.status,
        // In Stripe API 2026+, current_period fields are on SubscriptionItem, not Subscription
        current_period_start: firstItem
          ? new Date(firstItem.current_period_start * 1000)
          : new Date(),
        current_period_end: firstItem ? new Date(firstItem.current_period_end * 1000) : new Date(),
        cancel_at_period_end: sub.cancel_at_period_end,
        canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
      },
    },
    { upsert: true, new: true }
  );

  console.log(
    `[Webhook] Subscription ${sub.id} upserted: status=${sub.status}, store=${user.store_id}`
  );
}

/**
 * Handle customer.subscription.deleted — mark subscription as canceled.
 */
async function handleSubscriptionDeleted(sub: Stripe.Subscription): Promise<void> {
  await Subscription.findOneAndUpdate(
    { stripe_subscription_id: sub.id },
    {
      $set: {
        status: 'canceled',
        canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000) : new Date(),
        cancel_at_period_end: false,
      },
    }
  );

  console.log(`[Webhook] Subscription ${sub.id} marked as canceled`);
}

/**
 * Handle invoice.payment_succeeded — ensure subscription is active after successful payment.
 * This covers the case where a past_due subscription is recovered by a successful retry.
 * Note: The subscription status is also updated by customer.subscription.updated events,
 * but this handler ensures the status is correct even if events arrive out of order.
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);
  if (!subscriptionId) return;

  // Only update if subscription was previously past_due (recovery scenario)
  await Subscription.findOneAndUpdate(
    { stripe_subscription_id: subscriptionId, status: 'past_due' },
    { $set: { status: 'active' } }
  );

  console.log(`[Webhook] Payment succeeded for subscription ${subscriptionId}`);
}

/**
 * Handle invoice.payment_failed — update subscription status to past_due
 * and send a notification email to the user via SendGrid.
 */
async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);
  if (!subscriptionId) return;

  await Subscription.findOneAndUpdate(
    { stripe_subscription_id: subscriptionId },
    { $set: { status: 'past_due' } }
  );

  // Send payment failure notification email
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
  if (customerId) {
    try {
      const user = await User.findOne({ stripe_customer_id: customerId }).lean();
      if (user?.email) {
        await sendPaymentFailedEmail(user.email, user.name || '');
        console.log(`[Webhook] Payment failed email sent to ${user.email} for subscription ${subscriptionId}`);
      }
    } catch (emailErr) {
      // Don't let email failure prevent webhook acknowledgment
      console.error('[Webhook] Failed to send payment failure email:', emailErr);
    }
  }

  console.log(`[Webhook] Payment failed for subscription ${subscriptionId}, set to past_due`);
}

/**
 * Extract the subscription ID from an invoice.
 * In Stripe API 2026+, the subscription is nested under invoice.parent.subscription_details.
 */
function getSubscriptionIdFromInvoice(invoice: Stripe.Invoice): string | undefined {
  const sub = invoice.parent?.subscription_details?.subscription;
  if (!sub) return undefined;
  return typeof sub === 'string' ? sub : sub.id;
}
