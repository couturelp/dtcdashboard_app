import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Subscription from '@/lib/db/models/subscription';
import { getPlanByPriceId, FREE_PLAN, type PlanConfig } from '@/lib/plans';

/**
 * GET /api/billing/status
 *
 * Returns the current subscription status for the authenticated user's store.
 * Used by the settings page billing section.
 */
export async function GET(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');

    // No store — return free tier with no subscription details
    if (!storeId) {
      return NextResponse.json({
        tier: 'free',
        planName: FREE_PLAN.name,
        subscription: null,
      });
    }

    await connectDB();
    const sub = await Subscription.findOne({ store_id: storeId }).lean();

    if (!sub) {
      return NextResponse.json({
        tier: 'free',
        planName: FREE_PLAN.name,
        subscription: null,
      });
    }

    const plan: PlanConfig = getPlanByPriceId(sub.stripe_price_id) ?? FREE_PLAN;

    return NextResponse.json({
      tier: plan.tier,
      planName: plan.name,
      subscription: {
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      },
    });
  } catch (error) {
    console.error('[Billing Status] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
