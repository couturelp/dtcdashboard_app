// src/app/api/marketing/platforms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseDateRangeFromParams } from '@/lib/dashboard/date-utils';
import { getStoreCurrency } from '@/lib/dashboard/summary-queries';
import { fetchPlatformBreakdown } from '@/lib/marketing/marketing-queries';

export async function GET(request: NextRequest) {
  try {
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
    console.error(
      '[Marketing Platforms] Error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
