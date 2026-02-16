import { NextResponse } from 'next/server';
import getStripe from '@/lib/stripe';
import { getTierByPriceId, getFeaturesForTier, type TierName } from '@/lib/plans';

// In-memory cache for plan data (avoid excessive Stripe API calls)
let cachedPlans: PlanResponse[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface PlanResponse {
  tier: TierName;
  productName: string;
  prices: Array<{
    priceId: string;
    amount: number; // in cents
    currency: string;
    interval: 'month' | 'year';
  }>;
  features: ReturnType<typeof getFeaturesForTier>;
}

/**
 * GET /api/billing/plans
 * Returns available subscription plans with pricing from Stripe.
 * Public endpoint (no auth required) — used on the pricing page.
 */
export async function GET() {
  try {
    // Return cached data if fresh
    if (cachedPlans && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
      return NextResponse.json({ plans: cachedPlans });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Billing is not configured.' },
        { status: 503 }
      );
    }

    const stripe = getStripe();

    // Fetch active products with their prices from Stripe
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    // Fetch all active recurring prices
    const prices = await stripe.prices.list({
      active: true,
      type: 'recurring',
      expand: ['data.product'],
    });

    // Group prices by product, then resolve tier from price ID
    const planMap = new Map<string, PlanResponse>();

    for (const price of prices.data) {
      if (!price.recurring || !price.unit_amount) continue;

      // Only support month and year intervals on the pricing page
      const interval = price.recurring.interval;
      if (interval !== 'month' && interval !== 'year') continue;

      const tier = getTierByPriceId(price.id);
      // Skip prices not mapped to any tier (unknown price IDs default to 'free')
      if (tier === 'free') continue;

      const productId = typeof price.product === 'string' ? price.product : price.product?.id;
      if (!productId) continue;

      const product = products.data.find((p) => p.id === productId);
      const productName = product?.name || tier.charAt(0).toUpperCase() + tier.slice(1);

      if (!planMap.has(tier)) {
        planMap.set(tier, {
          tier,
          productName,
          prices: [],
          features: getFeaturesForTier(tier),
        });
      }

      planMap.get(tier)!.prices.push({
        priceId: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        interval,
      });
    }

    // Sort plans by tier order
    const tierOrder: TierName[] = ['starter', 'professional', 'enterprise'];
    const plans = tierOrder
      .map((t) => planMap.get(t))
      .filter((p): p is PlanResponse => p !== undefined);

    // Update cache
    cachedPlans = plans;
    cacheTimestamp = Date.now();

    return NextResponse.json({ plans });
  } catch (error) {
    console.error('[Billing Plans] Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to load plans.' },
      { status: 500 }
    );
  }
}
