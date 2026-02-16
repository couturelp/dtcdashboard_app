/**
 * Subscription plan configuration.
 *
 * Maps Stripe Price IDs to tiers and feature flags. The Price IDs should come
 * from environment variables so they can differ between test and live mode
 * without code changes.
 *
 * Tier hierarchy: free < starter < professional < enterprise
 */

// ─── Types ───────────────────────────────────────────────────────────

export type TierName = 'free' | 'starter' | 'professional' | 'enterprise';

export interface TierFeatures {
  maxDataSources: number; // -1 = unlimited
  syncFrequency: '6h' | '1h' | '15m' | 'realtime';
  exportEnabled: boolean;
  advancedAnalytics: boolean;
  prioritySupport: boolean;
}

export interface PlanConfig {
  tier: TierName;
  name: string; // Display name
  features: TierFeatures;
}

// ─── Tier Hierarchy (for comparison) ─────────────────────────────────

const TIER_ORDER: Record<TierName, number> = {
  free: 0,
  starter: 1,
  professional: 2,
  enterprise: 3,
};

/**
 * Compare two tiers. Returns:
 *  - negative if a < b
 *  - 0 if a === b
 *  - positive if a > b
 */
export function compareTiers(a: TierName, b: TierName): number {
  return TIER_ORDER[a] - TIER_ORDER[b];
}

/**
 * Check if `userTier` meets the `requiredTier` minimum.
 */
export function meetsMinimumTier(userTier: TierName, requiredTier: TierName): boolean {
  return TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];
}

// ─── Feature definitions per tier ────────────────────────────────────

const TIER_FEATURES: Record<TierName, TierFeatures> = {
  free: {
    maxDataSources: 1,
    syncFrequency: '6h',
    exportEnabled: false,
    advancedAnalytics: false,
    prioritySupport: false,
  },
  starter: {
    maxDataSources: 3,
    syncFrequency: '1h',
    exportEnabled: true,
    advancedAnalytics: false,
    prioritySupport: false,
  },
  professional: {
    maxDataSources: 10,
    syncFrequency: '15m',
    exportEnabled: true,
    advancedAnalytics: true,
    prioritySupport: false,
  },
  enterprise: {
    maxDataSources: -1, // unlimited
    syncFrequency: 'realtime',
    exportEnabled: true,
    advancedAnalytics: true,
    prioritySupport: true,
  },
};

// ─── Price ID → Plan mapping ─────────────────────────────────────────

/**
 * Build the price-to-plan map from environment variables.
 * Expected env vars (set per environment — test vs live):
 *   STRIPE_PRICE_STARTER_MONTHLY=price_xxx
 *   STRIPE_PRICE_STARTER_ANNUAL=price_xxx
 *   STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_xxx
 *   STRIPE_PRICE_PROFESSIONAL_ANNUAL=price_xxx
 *   STRIPE_PRICE_ENTERPRISE_MONTHLY=price_xxx
 *   STRIPE_PRICE_ENTERPRISE_ANNUAL=price_xxx
 *
 * The free tier has no Stripe price (no subscription needed).
 */
function buildPriceMap(): Map<string, PlanConfig> {
  const map = new Map<string, PlanConfig>();

  const tiers: Array<{ tier: TierName; name: string; envPrefix: string }> = [
    { tier: 'starter', name: 'Starter', envPrefix: 'STRIPE_PRICE_STARTER' },
    { tier: 'professional', name: 'Professional', envPrefix: 'STRIPE_PRICE_PROFESSIONAL' },
    { tier: 'enterprise', name: 'Enterprise', envPrefix: 'STRIPE_PRICE_ENTERPRISE' },
  ];

  for (const { tier, name, envPrefix } of tiers) {
    const monthly = process.env[`${envPrefix}_MONTHLY`];
    const annual = process.env[`${envPrefix}_ANNUAL`];

    const config: PlanConfig = { tier, name, features: TIER_FEATURES[tier] };

    if (monthly) map.set(monthly, config);
    if (annual) map.set(annual, config);
  }

  return map;
}

// Lazy singleton — built once on first access
let _priceMap: Map<string, PlanConfig> | null = null;

function getPriceMap(): Map<string, PlanConfig> {
  if (!_priceMap) {
    _priceMap = buildPriceMap();
  }
  return _priceMap;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Look up the plan config for a Stripe Price ID.
 * Returns undefined if the price ID is not recognized (unmapped or free tier).
 */
export function getPlanByPriceId(priceId: string): PlanConfig | undefined {
  return getPriceMap().get(priceId);
}

/**
 * Resolve a Stripe Price ID to a tier name.
 * Returns 'free' if the price ID is not mapped (safe default).
 */
export function getTierByPriceId(priceId: string): TierName {
  return getPlanByPriceId(priceId)?.tier ?? 'free';
}

/**
 * Get the feature set for a given tier name.
 */
export function getFeaturesForTier(tier: TierName): TierFeatures {
  return TIER_FEATURES[tier];
}

/**
 * Get all configured price IDs (useful for validating incoming priceId params).
 */
export function getKnownPriceIds(): string[] {
  return Array.from(getPriceMap().keys());
}

/**
 * Free tier config (no Stripe price needed).
 */
export const FREE_PLAN: PlanConfig = {
  tier: 'free',
  name: 'Free',
  features: TIER_FEATURES.free,
};

/**
 * All tier names in order.
 */
export const ALL_TIERS: TierName[] = ['free', 'starter', 'professional', 'enterprise'];
