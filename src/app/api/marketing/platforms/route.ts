// src/app/api/marketing/platforms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseDateRangeFromParams } from '@/lib/dashboard/date-utils';
import { getStoreCurrency } from '@/lib/dashboard/summary-queries';
import { fetchPlatformBreakdown } from '@/lib/marketing/marketing-queries';
import { requireTier } from '@/lib/require-tier';

export async function GET(request: NextRequest) {
  try {
    // Platform breakdown is an advanced analytics feature (professional+ tier)
    const tierDenied = await requireTier(request, 'professional');
    if (tierDenied) return tierDenied;

    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }

    const { current } = parseDateRangeFromParams(request.nextUrl.searchParams);

    // Fetch currency and platform breakdown in parallel
    const [currency, platforms] = await Promise.all([
      getStoreCurrency(storeId),
      fetchPlatformBreakdown(storeId, current.from, current.to),
    ]);

    return NextResponse.json({
      platforms,
      currency,
      period: current,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Marketing Platforms] Error:', message);

    if (message.includes('No active tenant database')) {
      return NextResponse.json(
        { error: 'Data not yet available. Please connect your Shopify store first.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
