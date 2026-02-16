// src/lib/marketing/marketing-queries.ts
import { queryTenant } from '@/lib/tenant-db';

// ----- Types -----

export interface MarketingKpiSummary {
  total_ad_spend: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_conversion_value: number; // attributed revenue
  roas: number; // conversion_value / ad_spend
  cpa: number; // ad_spend / conversions
  ctr: number; // (clicks / impressions) * 100
  cpm: number; // (ad_spend / impressions) * 1000
  cpc: number; // ad_spend / clicks
}

export interface PlatformBreakdown {
  platform: 'meta' | 'google';
  platform_label: string; // "Meta Ads" or "Google Ads"
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversion_value: number;
  roas: number;
  cpa: number;
  spend_percentage: number; // percentage of total spend
  has_data: boolean;
}

// ----- Safe query helper -----

async function safeQuery(storeId: string, sql: string, params: unknown[]) {
  try {
    return (await queryTenant(storeId, sql, params)).rows;
  } catch (err) {
    const message = err instanceof Error ? err.message : '';
    // Propagate connection / auth errors — only swallow "relation does not exist" etc.
    if (message.includes('No active tenant database') || message.includes('ECONNREFUSED')) {
      throw err;
    }
    return null;
  }
}

// ----- Meta Ads queries -----

interface MetaAggregateRow {
  spend: string;
  impressions: string;
  clicks: string;
  conversions: string;
  conversion_value: string;
}

/**
 * Fetch aggregate Meta Ads metrics from `basic_ad` table.
 * Fivetran's Facebook Ads connector stores daily ad-level metrics in `basic_ad`.
 * Columns: date, ad_id, spend, impressions, clicks, inline_link_clicks,
 *          actions (JSONB array with action_type + value),
 *          action_values (JSONB array with action_type + value for revenue).
 *
 * Conversions = actions where action_type = 'offsite_conversion.fb_pixel_purchase'
 * Conversion value = action_values where action_type = 'offsite_conversion.fb_pixel_purchase'
 */
async function fetchMetaAggregates(
  storeId: string,
  from: string,
  to: string
): Promise<MetaAggregateRow | null> {
  const rows = await safeQuery(
    storeId,
    `SELECT
       COALESCE(SUM(spend), 0) AS spend,
       COALESCE(SUM(impressions), 0) AS impressions,
       COALESCE(SUM(clicks), 0) AS clicks,
       COALESCE(SUM(
         (SELECT COALESCE(SUM((elem->>'value')::numeric), 0)
          FROM jsonb_array_elements(COALESCE(actions, '[]'::jsonb)) AS elem
          WHERE elem->>'action_type' = 'offsite_conversion.fb_pixel_purchase')
       ), 0) AS conversions,
       COALESCE(SUM(
         (SELECT COALESCE(SUM((elem->>'value')::numeric), 0)
          FROM jsonb_array_elements(COALESCE(action_values, '[]'::jsonb)) AS elem
          WHERE elem->>'action_type' = 'offsite_conversion.fb_pixel_purchase')
       ), 0) AS conversion_value
     FROM basic_ad
     WHERE date >= $1::date AND date <= $2::date`,
    [from, to]
  );
  return rows?.[0] as MetaAggregateRow | null;
}

// ----- Google Ads queries -----

interface GoogleAggregateRow {
  spend: string;
  impressions: string;
  clicks: string;
  conversions: string;
  conversion_value: string;
}

/**
 * Fetch aggregate Google Ads metrics from `campaign_stats` table.
 * Fivetran's Google Ads connector stores daily campaign-level stats.
 * Columns: date, campaign_id, cost_micros, impressions, clicks, conversions, conversions_value.
 * cost_micros is in micros (divide by 1,000,000).
 */
async function fetchGoogleAggregates(
  storeId: string,
  from: string,
  to: string
): Promise<GoogleAggregateRow | null> {
  const rows = await safeQuery(
    storeId,
    `SELECT
       COALESCE(SUM(cost_micros / 1000000.0), 0) AS spend,
       COALESCE(SUM(impressions), 0) AS impressions,
       COALESCE(SUM(clicks), 0) AS clicks,
       COALESCE(SUM(conversions), 0) AS conversions,
       COALESCE(SUM(conversions_value), 0) AS conversion_value
     FROM campaign_stats
     WHERE date >= $1::date AND date <= $2::date`,
    [from, to]
  );
  return rows?.[0] as GoogleAggregateRow | null;
}

// ----- Aggregation helpers -----

function calcRate(numerator: number, denominator: number, multiplier = 1): number {
  if (denominator === 0) return 0;
  return (numerator / denominator) * multiplier;
}

// ----- Public API -----

/**
 * Fetch aggregate marketing KPIs across all ad platforms for a date range.
 */
export async function fetchMarketingKpiSummary(
  storeId: string,
  from: string,
  to: string
): Promise<MarketingKpiSummary> {
  const [meta, google] = await Promise.all([
    fetchMetaAggregates(storeId, from, to),
    fetchGoogleAggregates(storeId, from, to),
  ]);

  const metaSpend = parseFloat(meta?.spend ?? '0');
  const metaImpressions = parseInt(meta?.impressions ?? '0', 10);
  const metaClicks = parseInt(meta?.clicks ?? '0', 10);
  const metaConversions = parseFloat(meta?.conversions ?? '0');
  const metaConvValue = parseFloat(meta?.conversion_value ?? '0');

  const googleSpend = parseFloat(google?.spend ?? '0');
  const googleImpressions = parseInt(google?.impressions ?? '0', 10);
  const googleClicks = parseInt(google?.clicks ?? '0', 10);
  const googleConversions = parseFloat(google?.conversions ?? '0');
  const googleConvValue = parseFloat(google?.conversion_value ?? '0');

  const totalSpend = metaSpend + googleSpend;
  const totalImpressions = metaImpressions + googleImpressions;
  const totalClicks = metaClicks + googleClicks;
  const totalConversions = metaConversions + googleConversions;
  const totalConvValue = metaConvValue + googleConvValue;

  return {
    total_ad_spend: totalSpend,
    total_impressions: totalImpressions,
    total_clicks: totalClicks,
    total_conversions: totalConversions,
    total_conversion_value: totalConvValue,
    roas: calcRate(totalConvValue, totalSpend),
    cpa: calcRate(totalSpend, totalConversions),
    ctr: calcRate(totalClicks, totalImpressions, 100),
    cpm: calcRate(totalSpend, totalImpressions, 1000),
    cpc: calcRate(totalSpend, totalClicks),
  };
}

/**
 * Fetch per-platform breakdown for a date range.
 * Returns an array with one entry per platform that has data (or has_data: false).
 */
export async function fetchPlatformBreakdown(
  storeId: string,
  from: string,
  to: string
): Promise<PlatformBreakdown[]> {
  const [meta, google] = await Promise.all([
    fetchMetaAggregates(storeId, from, to),
    fetchGoogleAggregates(storeId, from, to),
  ]);

  const metaSpend = parseFloat(meta?.spend ?? '0');
  const metaImpressions = parseInt(meta?.impressions ?? '0', 10);
  const metaClicks = parseInt(meta?.clicks ?? '0', 10);
  const metaConversions = parseFloat(meta?.conversions ?? '0');
  const metaConvValue = parseFloat(meta?.conversion_value ?? '0');
  const metaHasData = meta !== null;

  const googleSpend = parseFloat(google?.spend ?? '0');
  const googleImpressions = parseInt(google?.impressions ?? '0', 10);
  const googleClicks = parseInt(google?.clicks ?? '0', 10);
  const googleConversions = parseFloat(google?.conversions ?? '0');
  const googleConvValue = parseFloat(google?.conversion_value ?? '0');
  const googleHasData = google !== null;

  const totalSpend = metaSpend + googleSpend;

  const platforms: PlatformBreakdown[] = [
    {
      platform: 'meta',
      platform_label: 'Meta Ads',
      spend: metaSpend,
      impressions: metaImpressions,
      clicks: metaClicks,
      ctr: calcRate(metaClicks, metaImpressions, 100),
      conversions: metaConversions,
      conversion_value: metaConvValue,
      roas: calcRate(metaConvValue, metaSpend),
      cpa: calcRate(metaSpend, metaConversions),
      spend_percentage: calcRate(metaSpend, totalSpend, 100),
      has_data: metaHasData,
    },
    {
      platform: 'google',
      platform_label: 'Google Ads',
      spend: googleSpend,
      impressions: googleImpressions,
      clicks: googleClicks,
      ctr: calcRate(googleClicks, googleImpressions, 100),
      conversions: googleConversions,
      conversion_value: googleConvValue,
      roas: calcRate(googleConvValue, googleSpend),
      cpa: calcRate(googleSpend, googleConversions),
      spend_percentage: calcRate(googleSpend, totalSpend, 100),
      has_data: googleHasData,
    },
  ];

  return platforms;
}
