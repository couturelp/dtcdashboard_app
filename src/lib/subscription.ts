/**
 * Subscription query utilities.
 *
 * Provides helpers to look up a store's active subscription and resolve
 * its tier. Used by the requireTier middleware and billing status display.
 */

import Subscription, { type ISubscription } from '@/lib/db/models/subscription';
import { getTierByPriceId, type TierName } from '@/lib/plans';

// Grace period for past_due subscriptions (in milliseconds)
const GRACE_PERIOD_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

/**
 * Get the active (or grace-period) subscription for a store.
 * Returns null if the store has no active subscription.
 */
export async function getActiveSubscription(
  storeId: string
): Promise<ISubscription | null> {
  const sub = await Subscription.findOne({ store_id: storeId }).lean();

  if (!sub) return null;

  // Active or trialing subscriptions are fully valid
  if (sub.status === 'active' || sub.status === 'trialing') {
    return sub;
  }

  // Past-due subscriptions get a grace period
  if (sub.status === 'past_due') {
    // Use past_due_since (set by handlePaymentFailed), fall back to updated_at.
    // Default to epoch 0 if both are missing so grace period is treated as expired
    // rather than granting indefinite access (Date.now() - Date.now() ≈ 0 would always pass).
    const pastDueSince = sub.past_due_since?.getTime() ?? sub.updated_at?.getTime() ?? 0;
    if (Date.now() - pastDueSince <= GRACE_PERIOD_MS) {
      return sub; // Still within grace period
    }
    // Grace period expired — treat as no active subscription
    return null;
  }

  // All other statuses (canceled, incomplete, etc.) are not active
  return null;
}

/**
 * Get the current tier for a store.
 * Returns 'free' if the store has no active subscription.
 */
export async function getUserTier(storeId: string): Promise<TierName> {
  const sub = await getActiveSubscription(storeId);
  if (!sub) return 'free';
  return getTierByPriceId(sub.stripe_price_id);
}
