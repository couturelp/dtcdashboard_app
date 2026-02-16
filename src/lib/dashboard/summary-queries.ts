// src/lib/dashboard/summary-queries.ts
import Store from '@/lib/db/models/store';
import { connectDB } from '@/lib/db/mongodb';
import { queryTenant } from '@/lib/tenant-db';

export interface KpiSummary {
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  total_discounts: number;
  total_refunds: number;
  total_shipping: number;
  total_cogs: number;
  total_ad_spend: number;
  gross_profit: number;
  net_profit: number;
  profit_margin: number; // percentage
}

/** Fetch KPI summary for a date range. Each query is try/caught — returns 0 if table missing. */
export async function fetchKpiSummary(
  storeId: string,
  from: string,
  to: string
): Promise<KpiSummary> {
  // Helper: run query, return null on failure (table may not exist yet)
  async function safeQuery(sql: string, params: unknown[]) {
    try {
      return (await queryTenant(storeId, sql, params)).rows[0];
    } catch {
      return null;
    }
  }

  // Revenue + orders + shipping from Shopify "order" table (single scan)
  const orderRow = await safeQuery(
    `SELECT COALESCE(SUM(CAST(total_price AS NUMERIC)),0) AS rev, COUNT(*) AS cnt,
            COALESCE(SUM(CAST(total_discounts AS NUMERIC)),0) AS disc,
            COALESCE(SUM(CAST(total_shipping_price_set->'shop_money'->>'amount' AS NUMERIC)),0) AS ship
     FROM "order" WHERE created_at >= $1::timestamp
       AND created_at < ($2::date + INTERVAL '1 day')::timestamp AND cancelled_at IS NULL`,
    [from, to]
  );
  const totalRevenue = parseFloat(orderRow?.rev) || 0;
  const totalOrders = parseInt(orderRow?.cnt, 10) || 0;
  const totalDiscounts = parseFloat(orderRow?.disc) || 0;
  const totalShipping = parseFloat(orderRow?.ship) || 0;

  // Ad spend: Meta + Google (independent tables, run in parallel)
  const [metaRow, googleRow] = await Promise.all([
    safeQuery(
      `SELECT COALESCE(SUM(spend),0) AS s FROM basic_ad WHERE date>=$1::date AND date<=$2::date`,
      [from, to]
    ),
    safeQuery(
      `SELECT COALESCE(SUM(cost_micros/1000000.0),0) AS s FROM campaign_stats WHERE date>=$1::date AND date<=$2::date`,
      [from, to]
    ),
  ]);
  const totalAdSpend = (parseFloat(metaRow?.s) || 0) + (parseFloat(googleRow?.s) || 0);

  // COGS: 0 for now (Part 06), Refunds: 0 for now (schema TBD),
  // Transaction fees: 0 for now (Fivetran `transaction` table TBD),
  // Operating expenses: 0 for now (needs MongoDB aggregation by date range)
  const totalRefunds = 0,
    totalCogs = 0,
    totalTransactionFees = 0,
    totalOperatingExpenses = 0;

  const netRevenue = totalRevenue - totalDiscounts - totalRefunds;
  const grossProfit = netRevenue - totalCogs - totalShipping - totalTransactionFees;
  const netProfit = grossProfit - totalAdSpend - totalOperatingExpenses;

  return {
    total_revenue: totalRevenue,
    total_orders: totalOrders,
    average_order_value: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    total_discounts: totalDiscounts,
    total_refunds: totalRefunds,
    total_shipping: totalShipping,
    total_cogs: totalCogs,
    total_ad_spend: totalAdSpend,
    gross_profit: grossProfit,
    net_profit: netProfit,
    profit_margin: netRevenue !== 0 ? (netProfit / netRevenue) * 100 : 0,
  };
}

/**
 * Fetch the store's currency code from MongoDB.
 */
export async function getStoreCurrency(storeId: string): Promise<string> {
  await connectDB();
  const store = await Store.findById(storeId).select('currency').lean();
  return store?.currency || 'USD';
}
