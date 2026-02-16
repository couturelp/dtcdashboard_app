import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Subscription from '@/lib/db/models/subscription';
import TenantDatabase from '@/lib/db/models/tenant-database';
import User from '@/lib/db/models/user';
import { getPlanByPriceId, getFeaturesForTier, FREE_PLAN, type PlanConfig } from '@/lib/plans';
import getStripe from '@/lib/stripe';

// Simple in-memory cache for Stripe-sourced billing details (per store)
const billingCache = new Map<string, { data: StripeDetails; ts: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Invalidate the cached Stripe billing details for a store.
 * Called from the webhook handler when subscriptions change so the
 * billing status page reflects updates immediately.
 */
export function invalidateBillingCache(storeId: string): void {
  billingCache.delete(storeId);
}

interface StripeDetails {
  price: number | null; // cents
  currency: string | null;
  interval: 'month' | 'year' | null;
  paymentMethodLast4: string | null;
  paymentMethodBrand: string | null;
}

/**
 * Fetch price/interval and payment method details from Stripe.
 * Results are cached per store for 5 minutes.
 */
async function getStripeDetails(
  stripeCustomerId: string,
  stripePriceId: string,
  storeId: string
): Promise<StripeDetails> {
  const cached = billingCache.get(storeId);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

  const defaults: StripeDetails = {
    price: null,
    currency: null,
    interval: null,
    paymentMethodLast4: null,
    paymentMethodBrand: null,
  };

  if (!process.env.STRIPE_SECRET_KEY) return defaults;

  try {
    const stripe = getStripe();

    // Fetch price for interval & amount
    const [price, customer] = await Promise.all([
      stripe.prices.retrieve(stripePriceId).catch(() => null),
      stripe.customers.retrieve(stripeCustomerId, {
        expand: ['invoice_settings.default_payment_method'],
      }).catch(() => null),
    ]);

    if (price && !price.deleted) {
      defaults.price = price.unit_amount;
      defaults.currency = price.currency;
      defaults.interval = (price.recurring?.interval as 'month' | 'year') ?? null;
    }

    // Extract default payment method last4
    if (customer && !customer.deleted) {
      const pm = customer.invoice_settings?.default_payment_method;
      if (pm && typeof pm !== 'string' && pm.card) {
        defaults.paymentMethodLast4 = pm.card.last4;
        defaults.paymentMethodBrand = pm.card.brand;
      }
    }

    // Prune expired entries if cache grows too large
    if (billingCache.size > 1000) {
      const now = Date.now();
      for (const [key, entry] of billingCache) {
        if (now - entry.ts > CACHE_TTL_MS) billingCache.delete(key);
      }
    }

    billingCache.set(storeId, { data: defaults, ts: Date.now() });
  } catch (err) {
    console.error('[Billing Status] Stripe lookup error:', err);
  }

  return defaults;
}

/**
 * GET /api/billing/status
 *
 * Returns the current subscription status for the authenticated user's store.
 * Includes plan name, price, billing cycle, payment method, and subscription state.
 * Used by the settings page billing section.
 */
export async function GET(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');

    // No store — return free tier with no subscription details
    if (!storeId) {
      const freeFeatures = getFeaturesForTier('free');
      return NextResponse.json({
        tier: 'free',
        planName: FREE_PLAN.name,
        subscription: null,
        usage: {
          dataSourcesUsed: 0,
          dataSourcesMax: freeFeatures.maxDataSources,
        },
      });
    }

    await connectDB();

    // Fetch subscription and data source count in parallel
    const [sub, dataSourceCount] = await Promise.all([
      Subscription.findOne({ store_id: storeId }).lean(),
      TenantDatabase.countDocuments({ store_id: storeId, status: 'active' }),
    ]);

    if (!sub) {
      const freeFeatures = getFeaturesForTier('free');
      return NextResponse.json({
        tier: 'free',
        planName: FREE_PLAN.name,
        subscription: null,
        usage: {
          dataSourcesUsed: dataSourceCount,
          dataSourcesMax: freeFeatures.maxDataSources,
        },
      });
    }

    const plan: PlanConfig = getPlanByPriceId(sub.stripe_price_id) ?? FREE_PLAN;

    // Fetch richer billing details from Stripe (price, interval, payment method)
    const user = await User.findOne({ store_id: storeId }).lean();
    let stripeDetails: StripeDetails | null = null;
    if (user?.stripe_customer_id) {
      stripeDetails = await getStripeDetails(
        user.stripe_customer_id,
        sub.stripe_price_id,
        storeId
      );
    }

    return NextResponse.json({
      tier: plan.tier,
      planName: plan.name,
      subscription: {
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        price: stripeDetails?.price ?? null,
        currency: stripeDetails?.currency ?? null,
        interval: stripeDetails?.interval ?? null,
        paymentMethodLast4: stripeDetails?.paymentMethodLast4 ?? null,
        paymentMethodBrand: stripeDetails?.paymentMethodBrand ?? null,
      },
      usage: {
        dataSourcesUsed: dataSourceCount,
        dataSourcesMax: plan.features.maxDataSources,
      },
    });
  } catch (error) {
    console.error('[Billing Status] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
