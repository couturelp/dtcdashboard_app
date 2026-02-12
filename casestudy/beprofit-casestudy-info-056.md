# BeProfit Troubleshooting: Data Sync Issues

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Category:** Help Center / Troubleshooting / Data Sync
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research

---

## Research Objective

Document all data sync troubleshooting articles, common sync errors, resolutions, data discrepancy explanations, and manual correction options. This information helps users diagnose and resolve sync issues with e-commerce platforms (Shopify, WooCommerce, Amazon) and advertising platforms (Facebook, Google, TikTok).

---

## Section Structure

### Common Data Sync Errors

**Expected Help Articles:**
- "Why isn't my data syncing?"
- "Troubleshooting sync errors"
- "Common sync issues and solutions"
- "Data sync failed - what to do"

**Key Areas to Document:**

#### "Sync Failed" Error Messages
- [ ] **Error:** "Sync failed" error messages and meanings
  - **Error message text:** [Exact error message shown to users]
  - **Probable causes:** Integration disconnection, API rate limits, invalid credentials, data format issues
  - **Step-by-step resolution:**
    1. Check integration connection status
    2. Verify credentials are valid
    3. Check for platform outages
    4. Retry sync manually
    5. Contact support if issue persists
  - **Prevention tips:** Maintain active integrations, monitor connection health

#### "Data Out of Sync" Warnings
- [ ] **Warning:** "Data out of sync" warnings
  - **Error message text:** [Exact warning text]
  - **Probable causes:** Delayed sync, sync queue backlog, time zone differences
  - **Step-by-step resolution:**
    1. Check last successful sync timestamp
    2. Manually trigger sync refresh
    3. Wait for scheduled sync cycle
    4. Verify timezone settings match expectations
  - **Prevention tips:** Set sync frequency appropriately, monitor sync status

#### Missing Orders in BeProfit
- [ ] **Issue:** Missing orders in BeProfit
  - **Symptoms:** Orders visible in Shopify/WooCommerce but not in BeProfit
  - **Probable causes:** Sync filter settings, date range limitations, order status exclusions, initial sync not complete
  - **Step-by-step resolution:**
    1. Check sync date range settings (historical data depth)
    2. Verify order status is included in sync (completed, pending, etc.)
    3. Check if initial sync is still in progress
    4. Review sync filter settings (excluded products, order types)
    5. Manually trigger full data refresh
  - **Prevention tips:** Adjust historical data depth, review filter settings during setup

#### Duplicate Orders Appearing
- [ ] **Issue:** Duplicate orders appearing
  - **Symptoms:** Same order appearing multiple times in BeProfit
  - **Probable causes:** Multiple sync triggers, order updates causing re-import, multi-store sync conflicts
  - **Step-by-step resolution:**
    1. Identify which orders are duplicated (order ID, date)
    2. Check if duplicate is from different store/integration
    3. Manually delete duplicate orders (if feature available)
    4. Contact support for bulk duplicate removal
  - **Prevention tips:** Avoid manual and automatic sync simultaneously, review multi-store setup

#### Orders Not Updating After Refunds
- [ ] **Issue:** Orders not updating after refunds
  - **Symptoms:** Refunded orders still showing full revenue in BeProfit
  - **Probable causes:** Refund sync delay, refund data not included in sync, partial refund handling
  - **Step-by-step resolution:**
    1. Check when refund was processed in Shopify/platform
    2. Wait for next sync cycle (refunds may have delay)
    3. Manually trigger sync refresh
    4. Verify refund appears in platform integration settings
    5. Check if partial refunds are supported
  - **Prevention tips:** Allow 24-48 hours for refund sync, enable refund notifications

#### Delayed Data Sync (Time Lag Issues)
- [ ] **Issue:** Delayed data sync (time lag issues)
  - **Symptoms:** Data appears in BeProfit hours or days after appearing in source platform
  - **Probable causes:** Sync frequency settings, platform API delays, high data volume, queue backlog
  - **Step-by-step resolution:**
    1. Check sync frequency settings (real-time vs hourly vs daily)
    2. Review expected sync time lag in documentation
    3. Manually trigger sync if urgent
    4. Upgrade plan for more frequent sync (if applicable)
  - **Prevention tips:** Understand sync frequency by plan tier, set expectations for data freshness

#### Partial Sync Completions
- [ ] **Issue:** Partial sync completions
  - **Symptoms:** Only some data synced, incomplete datasets
  - **Probable causes:** API rate limits, timeout errors, large data volume, selective sync settings
  - **Step-by-step resolution:**
    1. Check sync status indicator for partial completion
    2. Wait for subsequent sync to complete remaining data
    3. Review API rate limit warnings
    4. Check if selective sync is enabled
  - **Prevention tips:** Reduce sync frequency if hitting rate limits, enable incremental sync

#### Sync Stuck or Hanging
- [ ] **Issue:** Sync stuck or hanging
  - **Symptoms:** Sync status shows "In Progress" indefinitely, no error message
  - **Probable causes:** Network timeout, platform outage, BeProfit service issue, large dataset processing
  - **Step-by-step resolution:**
    1. Wait 30-60 minutes for large sync operations
    2. Refresh browser/app to update sync status
    3. Cancel stuck sync (if feature available)
    4. Retry sync after 15 minutes
    5. Contact support if sync stuck >2 hours
  - **Prevention tips:** Monitor sync progress, avoid triggering multiple syncs simultaneously

#### Integration Disconnection During Sync
- [ ] **Issue:** Integration disconnection during sync
  - **Symptoms:** Sync interrupted, integration shows disconnected, partial data import
  - **Probable causes:** OAuth token expiration, credentials changed, permissions revoked, platform maintenance
  - **Step-by-step resolution:**
    1. Reconnect integration (see file 057 for reconnection procedures)
    2. Verify permissions are granted
    3. Retry sync after reconnection
    4. Check for platform maintenance notices
  - **Prevention tips:** Monitor integration health, enable connection alerts, refresh OAuth tokens proactively

---

### Shopify-Specific Sync Issues

**Expected Help Articles:**
- "Shopify sync troubleshooting"
- "Shopify orders not appearing in BeProfit"
- "Shopify refund sync issues"
- "Multi-currency Shopify sync"

**Key Areas to Document:**
- [ ] **Orders missing from Shopify import**
  - Draft orders not syncing (by design or issue?)
  - Test orders excluded from sync
  - Archived orders visibility
  - Multi-location order handling
- [ ] **Order status not updating (fulfilled, cancelled)**
  - Fulfillment status sync delay
  - Cancellation not reflecting in BeProfit
  - Pending orders sync behavior
- [ ] **Refund data not syncing**
  - Full refund vs partial refund handling
  - Refund sync timeline (immediate, hourly, daily)
  - Restocking adjustments
  - Refund impact on profit calculations
- [ ] **Shopify discount codes not reflected**
  - Automatic discounts vs discount codes
  - Discount allocation across line items
  - Percentage vs fixed amount discounts
  - Discount impact on revenue calculations
- [ ] **Shipping cost discrepancies**
  - Shipping charged to customer vs actual shipping cost
  - Free shipping handling
  - Multiple shipping rates
  - International shipping
- [ ] **Tax calculation differences**
  - Tax-inclusive vs tax-exclusive pricing
  - Multi-region tax rates
  - Tax overrides
  - Avalara or TaxJar integration impact
- [ ] **Multi-currency order sync issues**
  - Currency conversion handling
  - Base currency vs display currency
  - Exchange rate sources
  - Currency conversion discrepancies
- [ ] **Draft orders not appearing (or appearing incorrectly)**
  - Draft order sync settings
  - Draft vs completed order differentiation
  - Invoice sent vs payment received
- [ ] **Shopify POS order sync**
  - POS order identification
  - POS location assignment
  - Cash vs card payment handling
  - POS refunds and exchanges
- [ ] **Fulfillment location data**
  - Multi-location inventory impact on sync
  - Fulfillment service (third-party) data
  - Warehouse location assignment

**Research Questions:**
1. Are draft orders synced to BeProfit or only completed orders?
2. How quickly do Shopify refunds appear in BeProfit (real-time, 1 hour, 24 hours)?
3. How are multi-currency orders handled (converted to base currency)?
4. Do discount codes sync correctly for revenue calculations?
5. Are Shopify POS orders distinguished from online orders?
6. How does BeProfit handle Shopify Plus features (wholesale channel, etc.)?

---

### WooCommerce-Specific Sync Issues

**Expected Help Articles:**
- "WooCommerce sync troubleshooting"
- "WooCommerce orders not syncing"
- "WooCommerce API connection issues"

**Key Areas to Document:**
- [ ] **WooCommerce order import problems**
  - Order status requirements (processing, completed, etc.)
  - Custom order statuses handling
  - Order notes sync
- [ ] **Payment gateway data sync**
  - Payment method identification
  - Gateway fees sync
  - Payment provider differences (Stripe, PayPal, etc.)
- [ ] **Subscription order handling**
  - WooCommerce Subscriptions plugin compatibility
  - Recurring order sync
  - Subscription renewal vs initial order
  - Subscription cancellations and refunds
- [ ] **Guest checkout orders**
  - Guest vs registered customer differentiation
  - Customer data completeness for guest orders
- [ ] **WooCommerce refund sync**
  - Refund processing timeline
  - Partial refund line item allocation
  - Refund to original payment method vs store credit

**Research Questions:**
1. Which WooCommerce order statuses are synced (processing, completed, pending)?
2. Are WooCommerce Subscriptions supported?
3. How are payment gateway fees handled?
4. Do guest checkout orders sync differently than registered customer orders?

---

### Amazon-Specific Sync Issues

**Expected Help Articles:**
- "Amazon Seller Central sync troubleshooting"
- "Amazon FBA orders not syncing"
- "Amazon multi-marketplace sync"

**Key Areas to Document:**
- [ ] **Amazon order import errors**
  - MWS vs SP-API sync differences
  - Order report delays from Amazon
  - Business orders vs individual orders
- [ ] **FBA vs FBM order differentiation**
  - Fulfillment method identification
  - FBA fees allocation
  - FBM shipping cost handling
- [ ] **Amazon fees not syncing correctly**
  - Referral fees, fulfillment fees, storage fees
  - Fee breakdown visibility
  - Fee updates and corrections
- [ ] **Multi-marketplace sync (Amazon.com, .uk, .de, etc.)**
  - Separate marketplace connections
  - Currency handling across marketplaces
  - Unified vs separate reporting
  - Inventory sync across regions

**Research Questions:**
1. Does BeProfit support both Amazon MWS and SP-API?
2. Are Amazon FBA fees automatically synced and allocated to orders?
3. Can multiple Amazon marketplaces (US, UK, EU) be connected simultaneously?
4. How are Amazon multi-channel fulfillment orders handled?

---

### Ad Platform Sync Issues (Facebook, Google, TikTok)

**Expected Help Articles:**
- "Facebook Ads sync troubleshooting"
- "Google Ads data not updating"
- "Ad spend discrepancies"
- "Attribution issues"

**Key Areas to Document:**
- [ ] **Ad spend not updating**
  - Sync frequency for ad platforms (hourly, daily)
  - Historical ad spend depth
  - Campaign-level vs account-level sync
  - Timezone impact on ad spend dates
- [ ] **Attribution window mismatches**
  - 7-day click vs 1-day click attribution
  - View-through attribution settings
  - Attribution model selection (last click, first click, linear)
  - BeProfit attribution vs platform native attribution
- [ ] **Campaign-level data missing**
  - Campaign name sync
  - Ad set and ad name sync
  - Campaign performance metrics (impressions, clicks, conversions)
  - Paused or archived campaign visibility
- [ ] **Ad platform disconnection issues**
  - Token expiration frequency
  - Permission changes breaking sync
  - Platform API changes impacting sync
- [ ] **Multi-account ad sync problems**
  - Multiple Facebook ad accounts under one Business Manager
  - Google Ads Manager (MCC) account support
  - Account switching and selection
  - Per-account sync settings

**Research Questions:**
1. How often does ad spend data sync (real-time, hourly, daily)?
2. What attribution window does BeProfit use (7-day click, 28-day click)?
3. Can users customize attribution windows?
4. Are multiple Facebook ad accounts supported?
5. Does BeProfit support Google Ads Manager (MCC) accounts?
6. How are paused or deleted campaigns handled in reporting?

---

### Data Discrepancy Explanations

**Expected Help Articles:**
- "Why don't my numbers match Shopify/platform?"
- "Revenue discrepancies explained"
- "Profit calculation differences"
- "Understanding data differences"

**Key Areas to Document:**

#### "Why don't my BeProfit numbers match Shopify?"
- [ ] **Discrepancy explanation:**
  - Common reasons for differences (refunds, cancellations, timezone, order status)
  - Calculation methodology differences
  - Data freshness and sync timing
  - Which number to trust and why
- [ ] **Reconciliation process:**
  - Step-by-step comparison checklist
  - How to identify source of discrepancy
  - When discrepancies are expected vs problematic

#### Revenue Differences Between Platforms
- [ ] **Discrepancy type:** Revenue totals don't match
  - **Why it occurs:** Tax inclusion/exclusion, shipping inclusion, discount timing, refund timing
  - **Which number is "correct":** Depends on accounting method (gross vs net revenue)
  - **Settings that affect this:** Revenue calculation settings, tax handling, refund inclusion
  - **How to verify accuracy:** Compare line-by-line with platform reports, check date ranges match

#### Order Count Mismatches
- [ ] **Discrepancy type:** Order count differs between BeProfit and platform
  - **Why it occurs:** Draft orders, test orders, cancelled orders, date range differences
  - **Which number is "correct":** Depends on order status filter settings
  - **Settings that affect this:** Order status filters, date range, timezone
  - **How to verify accuracy:** Filter by order status in both systems, align date ranges

#### COGS (Cost of Goods Sold) Calculation Differences
- [ ] **Discrepancy type:** COGS doesn't match expectations
  - **Why it occurs:** Product cost not set, variant cost differences, cost updates not retroactive
  - **Which number is "correct":** BeProfit uses manually set COGS, not platform COGS
  - **Settings that affect this:** Product cost settings, variant cost overrides
  - **How to verify accuracy:** Review product cost settings, check cost assignment date

#### Profit Margin Discrepancies
- [ ] **Discrepancy type:** Profit margin calculations differ
  - **Why it occurs:** Different expense inclusion, COGS differences, shipping cost allocation
  - **Which number is "correct":** Depends on which expenses are included (gross profit vs net profit)
  - **Settings that affect this:** Expense categories, shipping cost handling, ad spend allocation
  - **How to verify accuracy:** Break down profit calculation step by step

#### Ad Spend Totals Not Matching Ad Platforms
- [ ] **Discrepancy type:** Ad spend doesn't match Facebook/Google totals
  - **Why it occurs:** Timezone differences, currency conversion, date range alignment, campaign filter differences
  - **Which number is "correct":** Both can be correct for different date ranges/timezones
  - **Settings that affect this:** Timezone settings, currency settings, attribution date (spend date vs conversion date)
  - **How to verify accuracy:** Align timezone and date range exactly, check currency conversion rates

#### Refund Handling Differences
- [ ] **Discrepancy type:** Refunded orders showing differently
  - **Why it occurs:** Partial refunds, refund timing, refund inclusion in revenue vs separate line item
  - **Which number is "correct":** Depends on whether using gross revenue or net revenue after refunds
  - **Settings that affect this:** Refund handling settings, revenue calculation method
  - **How to verify accuracy:** Compare refunded order list, check partial vs full refunds

#### Cancellation Timing Differences
- [ ] **Discrepancy type:** Cancelled orders appearing or not appearing
  - **Why it occurs:** Cancellation sync delay, order status at time of sync, date range inclusion
  - **Which number is "correct":** Depends on when order was cancelled vs when it was placed
  - **Settings that affect this:** Order status filters, sync timing
  - **How to verify accuracy:** Check cancellation date vs order date, verify status filters

#### Currency Conversion Discrepancies
- [ ] **Discrepancy type:** Multi-currency revenue doesn't match
  - **Why it occurs:** Exchange rate source differences, exchange rate timing (real-time vs daily), conversion method
  - **Which number is "correct":** Depends on exchange rate source used
  - **Settings that affect this:** Currency conversion settings, exchange rate source, conversion date
  - **How to verify accuracy:** Check exchange rates used, compare conversion dates

#### Time Zone Differences Affecting Daily Totals
- [ ] **Discrepancy type:** Daily totals differ due to timezone
  - **Why it occurs:** Platform uses UTC, BeProfit uses account timezone, order crossing midnight boundary
  - **Which number is "correct":** Both correct for their respective timezones
  - **Settings that affect this:** Account timezone setting, platform timezone
  - **How to verify accuracy:** Convert times to same timezone, check orders near midnight

**Research Questions:**
1. Does BeProfit explain common reasons for data discrepancies?
2. Are there help articles for "Why don't my numbers match [Platform]?"
3. What is the recommended reconciliation process?
4. How does BeProfit handle timezone differences in reporting?
5. Are revenue calculations gross or net of refunds/cancellations?
6. Can users choose between different calculation methodologies?

---

### Manual Data Correction Options

**Expected Help Articles:**
- "How to manually edit orders"
- "Correcting synced data"
- "Manual adjustments and overrides"
- "Recalculating profit data"

**Key Areas to Document:**
- [ ] **Manual order editing capabilities**
  - Can users edit synced orders? (revenue, COGS, expenses)
  - Which fields are editable (read-only vs editable)
  - Edit history and audit trail
  - Impact on future syncs (does sync override manual edits?)
- [ ] **Bulk data correction tools**
  - Bulk order editing (CSV import/export)
  - Bulk product cost updates
  - Bulk expense adjustments
  - Batch recalculation triggers
- [ ] **COGS override options**
  - Manual COGS entry per order
  - Product-level cost overrides
  - Variant-level cost overrides
  - Time-based cost changes (effective date)
- [ ] **Manual expense additions**
  - Adding custom expenses not from integrations
  - Expense categories (shipping, marketing, ops, etc.)
  - One-time vs recurring expenses
  - Expense allocation to orders or date ranges
- [ ] **Custom adjustment entries**
  - Manual revenue adjustments
  - Adjustment reasons and notes
  - Adjustment visibility in reports
  - Reversing adjustments
- [ ] **Recalculation triggers (force re-sync)**
  - Manual "Recalculate" button
  - What gets recalculated (profit, margins, ROAS)
  - Recalculation scope (single order, date range, all data)
  - Recalculation time (immediate, background job)
- [ ] **Data refresh procedures**
  - Full data refresh vs incremental refresh
  - Historical data re-import
  - Clearing and re-syncing data
  - Refresh impact on manual edits
- [ ] **Reprocessing historical data**
  - Re-importing old orders
  - Updating historical costs
  - Backfilling missing data
  - Historical data correction best practices

**Research Questions:**
1. Can users manually edit synced order data (revenue, COGS, expenses)?
2. Are there bulk editing tools for correcting data issues?
3. Can users override product COGS on a per-order basis?
4. Is there a "Recalculate" feature to recompute profit/ROAS?
5. Do manual edits persist through subsequent syncs or get overwritten?
6. Can users add custom expenses not from integrations?
7. Is there an edit history or audit trail for manual changes?

---

### Data Sync Settings & Configuration

**Expected Help Articles:**
- "Sync settings and preferences"
- "Configuring data sync frequency"
- "Historical data import settings"
- "Selective sync options"

**Key Areas to Document:**
- [ ] **Sync frequency settings (real-time, hourly, daily)**
  - Available sync frequencies by plan tier
  - Real-time sync limitations (webhooks vs polling)
  - Custom sync schedules
  - Manual sync trigger availability
- [ ] **Historical data import depth (30 days, 90 days, all time)**
  - Plan tier historical data limits
  - Initial sync data depth
  - Extending historical data after initial sync
  - Historical data re-import process
- [ ] **Selective sync options (which data to sync)**
  - Sync filters by order status (completed, pending, cancelled)
  - Sync filters by product/collection
  - Sync filters by date range
  - Exclude test orders, draft orders
- [ ] **Auto-sync vs manual sync**
  - Enabling/disabling auto-sync
  - Manual sync triggers (button, API)
  - Sync on-demand scenarios
- [ ] **Sync notifications and alerts**
  - Sync completion notifications
  - Sync error alerts
  - Sync delay warnings
  - Notification delivery methods (email, in-app, SMS)
- [ ] **Sync history logs**
  - Sync activity log (last 30 days, 90 days)
  - Sync status per integration (success, failed, partial)
  - Sync duration tracking
  - Data volume synced per sync event

**Research Questions:**
1. What sync frequencies are available (real-time, hourly, daily)?
2. Do different plan tiers have different sync frequencies?
3. How much historical data can be imported initially?
4. Can users selectively sync certain order types or products?
5. Is there a sync history log showing past sync events?
6. Can users disable auto-sync and sync manually only?
7. Are sync error notifications enabled by default?

---

### Sync Timing & Delays

**Expected Help Articles:**
- "How long does data sync take?"
- "Expected sync times"
- "Why is my data delayed?"
- "Real-time sync vs batch sync"

**Key Areas to Document:**
- [ ] **Expected sync times (how long should it take?)**
  - Initial sync time estimates (1 hour, 24 hours, depends on data volume)
  - Incremental sync time (minutes, seconds)
  - Per-integration sync time differences
  - Factors affecting sync speed (data volume, API limits, plan tier)
- [ ] **Real-time vs batch sync**
  - What data syncs in real-time (orders, ad spend, etc.)
  - What data syncs in batches (reports, analytics)
  - Webhook-based real-time sync availability
  - Polling-based sync intervals
- [ ] **Peak time delays (high order volume)**
  - Black Friday / Cyber Monday impact
  - Holiday season sync performance
  - High-traffic event handling
  - Queue prioritization during peak times
- [ ] **Initial sync vs incremental sync**
  - Initial sync duration (hours to days)
  - Incremental sync duration (seconds to minutes)
  - When initial sync is retriggered (data refresh, reconnection)
- [ ] **Sync queue management**
  - Queue visibility (position in queue)
  - Queue prioritization rules
  - Concurrent sync limits
  - Queue clearing after errors

**Research Questions:**
1. What is the typical time lag for order data sync (real-time, 15 min, 1 hour)?
2. What is the typical time lag for ad spend sync (hourly, daily)?
3. How long does initial sync take for a store with 10k orders? 100k orders?
4. Are there sync delays during Black Friday or high-traffic periods?
5. Does BeProfit use webhooks for real-time sync or polling?
6. Can users see their position in the sync queue?
7. Is there a maximum sync queue wait time?
8. Do higher plan tiers get faster or prioritized sync?

---

## Summary of Research Questions

**Critical Questions:**
1. What is the typical time lag for data sync (orders, ad spend)?
2. Can users manually trigger a sync refresh?
3. Is there a sync history or activity log?
4. What happens when sync fails - does it retry automatically?
5. Are there known limitations (e.g., "can't sync orders older than X")?
6. How does BeProfit handle partial sync failures?
7. Can users see sync status per integration?
8. Are there rate limits from platforms that cause sync delays?
9. What's the resolution process when Shopify data conflicts with BeProfit data?
10. Can users edit or override synced data?

**Secondary Questions:**
11. Are draft orders synced or only completed orders?
12. How quickly do refunds appear in BeProfit after processing?
13. How are multi-currency orders converted and displayed?
14. What attribution window is used for ad spend (7-day, 28-day)?
15. Can multiple ad accounts be connected per platform?
16. Are WooCommerce Subscriptions supported?
17. Does BeProfit support Amazon SP-API (successor to MWS)?
18. Can users customize sync frequency based on their needs?

---

## Research Notes

**Data Sources to Check:**
- Help Center main page (https://help.runviably.com/beprofit)
- Help Center search for: "sync", "troubleshooting", "data not showing", "missing orders", "discrepancy", "refund", "delayed"
- Integration-specific troubleshooting sections (Shopify, WooCommerce, Amazon, Facebook, Google)
- FAQ sections related to data accuracy
- Platform status page (if exists) for known sync issues

**Expected Documentation Depth:**
- Sync troubleshooting is typically one of the most detailed areas in SaaS help centers
- Common issues should have dedicated articles with step-by-step resolutions
- Platform-specific issues should be clearly categorized
- Data discrepancy explanations are critical for user trust

**Research Challenges:**
- Some sync issues may be reported in community forums rather than official help center
- Platform-specific nuances may not be fully documented
- Expected sync times may vary significantly based on data volume and plan tier
- Attribution methodology details may be vague or missing

---

## Completion Checklist

- [ ] All "Key Areas to Document" sections reviewed and populated
- [ ] All "Questions to Answer" addressed with findings
- [ ] Source URLs documented for each finding
- [ ] Error messages captured verbatim
- [ ] Resolution procedures documented step-by-step
- [ ] Research date and status updated
- [ ] Cross-references to related files (055, 057) added if applicable
- [ ] Ambiguities or gaps in documentation noted
- [ ] File marked as "RESEARCHED" instead of "TEMPLATE" when complete

---

**File Status:** ⚠️ TEMPLATE - Ready for manual research
**Expected Completion Time:** 4-5 hours of thorough help center exploration
**Next Steps:** Visit https://help.runviably.com/beprofit and systematically document troubleshooting findings in each section above
