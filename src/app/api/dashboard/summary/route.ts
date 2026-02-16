// src/app/api/dashboard/summary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseDateRangeFromParams } from '@/lib/dashboard/date-utils';
import { fetchKpiSummary, getStoreCurrency } from '@/lib/dashboard/summary-queries';

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
    const currency = await getStoreCurrency(storeId);

    // Fetch current period KPIs
    const currentKpis = await fetchKpiSummary(storeId, current.from, current.to);

    // Fetch comparison period KPIs if requested
    let comparisonKpis: Awaited<ReturnType<typeof fetchKpiSummary>> | null = null;
    if (comparison) {
      comparisonKpis = await fetchKpiSummary(storeId, comparison.from, comparison.to);
    }

    // Calculate percentage changes
    const changes = comparisonKpis
      ? {
          total_revenue: calcChange(currentKpis.total_revenue, comparisonKpis.total_revenue),
          total_orders: calcChange(currentKpis.total_orders, comparisonKpis.total_orders),
          average_order_value: calcChange(
            currentKpis.average_order_value,
            comparisonKpis.average_order_value
          ),
          gross_profit: calcChange(currentKpis.gross_profit, comparisonKpis.gross_profit),
          net_profit: calcChange(currentKpis.net_profit, comparisonKpis.net_profit),
          profit_margin: currentKpis.profit_margin - comparisonKpis.profit_margin, // absolute pp change
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
    console.error(
      '[Dashboard Summary] Error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function calcChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}
