// src/app/api/marketing/summary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseDateRangeFromParams } from '@/lib/dashboard/date-utils';
import { getStoreCurrency } from '@/lib/dashboard/summary-queries';
import {
  fetchMarketingKpiSummary,
  type MarketingKpiSummary,
} from '@/lib/marketing/marketing-queries';

export async function GET(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }

    const { current, comparison } = parseDateRangeFromParams(request.nextUrl.searchParams);

    // Fetch currency, current KPIs, and comparison KPIs in parallel
    const [currency, currentKpis, comparisonKpis] = await Promise.all([
      getStoreCurrency(storeId),
      fetchMarketingKpiSummary(storeId, current.from, current.to),
      comparison
        ? fetchMarketingKpiSummary(storeId, comparison.from, comparison.to)
        : Promise.resolve(null),
    ]);

    const changes = comparisonKpis
      ? {
          total_ad_spend: calcChange(currentKpis.total_ad_spend, comparisonKpis.total_ad_spend),
          total_conversions: calcChange(
            currentKpis.total_conversions,
            comparisonKpis.total_conversions
          ),
          roas: calcChange(currentKpis.roas, comparisonKpis.roas),
          cpa: calcChange(currentKpis.cpa, comparisonKpis.cpa),
          ctr: currentKpis.ctr - comparisonKpis.ctr, // absolute pp change
          cpm: calcChange(currentKpis.cpm, comparisonKpis.cpm),
        }
      : null;

    return NextResponse.json({
      current: currentKpis,
      comparison: comparisonKpis,
      changes,
      currency,
      period: current,
      comparison_period: comparison,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Marketing Summary] Error:', message);

    if (message.includes('No active tenant database')) {
      return NextResponse.json(
        { error: 'Data not yet available. Please connect your Shopify store first.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function calcChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : current < 0 ? -100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}
