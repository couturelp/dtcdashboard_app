import Stripe from 'stripe';

let _stripe: Stripe | null = null;

/**
 * Get the lazily-initialized Stripe instance.
 * Throws if STRIPE_SECRET_KEY is not set — callers that can tolerate
 * a missing key should guard with `process.env.STRIPE_SECRET_KEY` first.
 */
function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('[Stripe] STRIPE_SECRET_KEY is not set.');
  }

  _stripe = new Stripe(key);
  return _stripe;
}

export default getStripe;

/**
 * Create a Stripe customer for a newly registered user.
 * Called from POST /api/auth/register after User.create().
 */
export async function createStripeCustomer(
  email: string,
  userId: string
): Promise<string | null> {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('[Stripe] Skipping customer creation — no API key.');
    return null;
  }

  const customer = await getStripe().customers.create({
    email,
    metadata: { user_id: userId },
  });

  return customer.id;
}

/**
 * Create a Stripe Checkout session for subscription purchase.
 * Returns the checkout URL to redirect the user to.
 */
export async function createCheckoutSession(params: {
  stripeCustomerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    customer: params.stripeCustomerId,
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error('Stripe Checkout session URL is null');
  }

  return session.url;
}

/**
 * Create a Stripe Customer Portal session.
 * Returns the portal URL to redirect the user to.
 */
export async function createPortalSession(params: {
  stripeCustomerId: string;
  returnUrl: string;
}): Promise<string> {
  const session = await getStripe().billingPortal.sessions.create({
    customer: params.stripeCustomerId,
    return_url: params.returnUrl,
  });

  return session.url;
}

/**
 * Construct and verify a Stripe webhook event from the raw body.
 * Throws if signature verification fails.
 */
export function constructWebhookEvent(
  rawBody: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  return getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
}
