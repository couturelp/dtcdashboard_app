// src/lib/dashboard/summary-queries.ts
import mongoose from 'mongoose';
import CustomExpense from '@/lib/db/models/custom-expense';
import OperatingExpense from '@/lib/db/models/operating-expense';
import ShippingRate from '@/lib/db/models/shipping-rate';
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
  total_operating_expenses: number;
  total_custom_expenses: number;
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
  // Helper: run query, return null on table-level failure (table may not exist yet).
  // Re-throws connection-level errors so the caller can surface them properly.
  async function safeQuery(sql: string, params: unknown[]) {
    try {
      return (await queryTenant(storeId, sql, params)).rows[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      // Propagate connection / auth errors — only swallow "relation does not exist" etc.
      if (message.includes('No active tenant database') || message.includes('ECONNREFUSED')) {
        throw err;
      }
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

  // COGS: 0 for now (Part 06 upload flow not yet built)
  // Refunds: 0 for now (schema TBD)
  // Transaction fees: 0 for now (Fivetran `transaction` table TBD)
  const totalRefunds = 0;
  const totalCogs = 0;
  const totalTransactionFees = 0;

  // Operating expenses, custom expenses, and shipping config from MongoDB
  await connectDB();
  const rangeStart = new Date(from + 'T00:00:00');
  const rangeEnd = new Date(to + 'T23:59:59.999');
  const [opExpCents, customExpCents, shippingConfig] = await Promise.all([
    aggregateOperatingExpenses(storeId, rangeStart, rangeEnd),
    aggregateCustomExpenses(storeId, rangeStart, rangeEnd),
    ShippingRate.findOne({ store_id: storeId }).lean(),
  ]);
  // Convert cents to dollars to match Shopify revenue/discount/shipping units
  const totalOperatingExpenses = opExpCents / 100;
  const totalCustomExpenses = customExpCents / 100;

  // Custom shipping cost: override Shopify shipping when a custom rate is configured
  let effectiveShipping = totalShipping; // default: Shopify's shipping price
  if (shippingConfig && shippingConfig.rate_type !== 'shopify_default') {
    if (shippingConfig.rate_type === 'flat') {
      // Flat rate: rate_value (cents) × number of orders → convert to dollars
      effectiveShipping = (shippingConfig.rate_value * totalOrders) / 100;
    } else if (shippingConfig.rate_type === 'per_item') {
      // Per-item rate: need total item count from order_line table
      const itemRow = await safeQuery(
        `SELECT COALESCE(SUM(ol.quantity),0) AS total_items
         FROM order_line ol
         JOIN "order" o ON o.id = ol.order_id
         WHERE o.created_at >= $1::timestamp
           AND o.created_at < ($2::date + INTERVAL '1 day')::timestamp
           AND o.cancelled_at IS NULL`,
        [from, to]
      );
      const totalItems = parseInt(itemRow?.total_items, 10) || 0;
      effectiveShipping = (shippingConfig.rate_value * totalItems) / 100;
    }
    // weight_based: falls through to Shopify default (needs order weight data, future improvement)
  }

  const netRevenue = totalRevenue - totalDiscounts - totalRefunds;
  const grossProfit = netRevenue - totalCogs - effectiveShipping - totalTransactionFees;
  const netProfit = grossProfit - totalAdSpend - totalOperatingExpenses - totalCustomExpenses;

  return {
    total_revenue: totalRevenue,
    total_orders: totalOrders,
    average_order_value: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    total_discounts: totalDiscounts,
    total_refunds: totalRefunds,
    total_shipping: effectiveShipping,
    total_cogs: totalCogs,
    total_ad_spend: totalAdSpend,
    total_operating_expenses: totalOperatingExpenses,
    total_custom_expenses: totalCustomExpenses,
    gross_profit: grossProfit,
    net_profit: netProfit,
    profit_margin: netRevenue !== 0 ? (netProfit / netRevenue) * 100 : 0,
  };
}

/**
 * Aggregate operating expenses for a store within a date range.
 * Operating expenses are prorated:
 * - one_time: full amount if the expense falls within the range
 * - monthly: amount × number of months overlapping the range
 * - quarterly: (amount / 3) × months overlapping
 * - annual: (amount / 12) × months overlapping
 * Returns total in cents.
 */
async function aggregateOperatingExpenses(
  storeId: string,
  rangeStart: Date,
  rangeEnd: Date
): Promise<number> {
  // Find expenses that overlap with the date range:
  // start_date <= rangeEnd AND (end_date IS NULL OR end_date >= rangeStart)
  const expenses = await OperatingExpense.find({
    store_id: storeId,
    start_date: { $lte: rangeEnd },
    $or: [{ end_date: null }, { end_date: { $gte: rangeStart } }],
  }).lean();

  let total = 0;
  for (const exp of expenses) {
    if (exp.frequency === 'one_time') {
      // One-time: include full amount if the start_date falls within the range
      if (exp.start_date >= rangeStart && exp.start_date <= rangeEnd) {
        total += exp.amount;
      }
    } else {
      // Recurring: calculate overlapping months and prorate
      const effectiveStart = exp.start_date > rangeStart ? exp.start_date : rangeStart;
      const effectiveEnd = exp.end_date && exp.end_date < rangeEnd ? exp.end_date : rangeEnd;
      const months = monthsBetween(effectiveStart, effectiveEnd);
      if (months <= 0) continue;

      let monthlyRate: number;
      switch (exp.frequency) {
        case 'monthly':
          monthlyRate = exp.amount;
          break;
        case 'quarterly':
          monthlyRate = exp.amount / 3;
          break;
        case 'annual':
          monthlyRate = exp.amount / 12;
          break;
        default:
          monthlyRate = 0;
      }
      total += Math.round(monthlyRate * months);
    }
  }
  return total;
}

/**
 * Calculate the number of months (fractional) between two dates.
 * Uses a 30-day approximation for partial months.
 */
function monthsBetween(start: Date, end: Date): number {
  if (end < start) return 0;
  const diffMs = end.getTime() - start.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  // Use 30.44 (average days per month) for consistent proration
  return diffDays / 30.44;
}

/**
 * Aggregate custom expenses for a store within a date range.
 * Custom expenses are one-off — sum all whose expense_date falls in range.
 * Returns total in cents.
 */
async function aggregateCustomExpenses(
  storeId: string,
  rangeStart: Date,
  rangeEnd: Date
): Promise<number> {
  const result = await CustomExpense.aggregate([
    {
      $match: {
        store_id: new mongoose.Types.ObjectId(storeId),
        expense_date: { $gte: rangeStart, $lte: rangeEnd },
      },
    },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  return result.length > 0 ? result[0].total : 0;
}

/**
 * Fetch the store's currency code from MongoDB.
 */
export async function getStoreCurrency(storeId: string): Promise<string> {
  await connectDB();
  const store = await Store.findById(storeId).select('currency').lean();
  return store?.currency || 'USD';
}

/**
 * Calculate percentage change between current and previous values.
 * Used by dashboard and marketing summary routes for consistent comparison.
 */
export function calcChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : current < 0 ? -100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}
