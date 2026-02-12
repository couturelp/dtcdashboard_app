# BeProfit Data Sync & Refresh Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ mentions sync behavior)
  - https://beprofit.co/ (marketing site emphasizes "real-time" data)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing mentions sync)
  - Cross-reference: Files 031-042 (all integration documents with sync frequency notes)
- **Category:** System Architecture / Data Synchronization
- **Date Captured:** 2026-02-13

---

## Overview

This document explains how BeProfit syncs data from all connected integrations (e-commerce platforms, ad platforms, email/SMS, shipping, accounting, etc.) and how data freshness is maintained across the system.

**Key Insight from Marketing:**
BeProfit positions itself as providing _"real-time analytics"_ and _"collect expenses, revenue, and other eCommerce data in real time."_ However, true real-time sync (< 1 minute latency) is technically challenging across 20+ integrations with varying API capabilities. The reality is likely a mix of:
- **Near-real-time** for some platforms (Shopify via webhooks: 1-5 minutes)
- **Batch sync** for most platforms (hourly/daily polling: 1-24 hour latency)
- **Manual refresh** for on-demand updates

---

## Global Sync Architecture

### How Data Flows Into BeProfit

```
External Platforms (Shopify, Facebook Ads, Klaviyo, ShipStation, etc.)
  ↓
BeProfit Sync Engine
  ├─ Real-time webhooks (for supported platforms: Shopify?)
  ├─ Scheduled batch sync (hourly, daily: most ad/email/shipping platforms)
  └─ Manual refresh (user-triggered: all integrations)
  ↓
BeProfit Database (orders, products, ad spend, expenses, inventory, etc.)
  ↓
Profit Calculation Engine (recalculates profit when new data arrives)
  ↓
Dashboard & Reports (display updated data to merchant)
```

### Sync Methods

**1. Real-Time Webhooks (Event-Driven)**

**How it works:**
- Platform sends HTTP POST request (webhook) to BeProfit when event occurs
- Events: `order.created`, `order.updated`, `refund.processed`, `product.updated`
- BeProfit receives webhook, processes immediately (1-5 minute latency)

**Supported platforms (inferred):**
- **Shopify:** Likely supports webhooks (Shopify has robust webhook system)
  - `orders/create` → BeProfit imports new order
  - `orders/updated` → BeProfit updates order (address change, line items added)
  - `refunds/create` → BeProfit marks order as refunded, recalculates profit
- **WooCommerce:** Possible webhook support (WooCommerce has webhook API)
- **Amazon:** NO webhooks (Amazon SP-API doesn't support webhooks for orders)

**Pros:**
- Immediate updates (1-5 minutes from event to BeProfit dashboard)
- Efficient (no polling, BeProfit only processes when events occur)
- Scales well (handles high order volume without constant API polling)

**Cons:**
- Limited platform support (not all APIs have webhooks)
- Requires webhook infrastructure (BeProfit must host webhook endpoint, handle retries, validate signatures)
- Webhook failures (if BeProfit server down, webhook lost → must have fallback batch sync)

**2. Batch Sync (Scheduled Polling)**

**How it works:**
- BeProfit polls platform API on schedule (every hour, every day)
- API request: "Give me all orders/campaigns/shipments created/updated since last sync"
- BeProfit stores `last_synced_at` timestamp, queries for data newer than timestamp
- Latency: Up to sync interval (hourly sync = max 1 hour delay, daily sync = max 24 hours delay)

**Supported platforms (inferred):**
- **Ad platforms:** Facebook Ads, Google Ads, TikTok Ads (hourly or daily batch)
  - Reason: Ad conversion data takes 24-48 hours to finalize (attribution window), real-time sync not useful
- **Email/SMS platforms:** Klaviyo (hourly or daily batch)
  - Reason: Email campaign data (opens, clicks, conversions) updated throughout day, batch sync sufficient
- **Shipping platforms:** ShipStation, ShipBob (hourly or daily batch)
  - Reason: Shipping labels created throughout day, batch sync once per hour captures most labels
- **Amazon:** Daily batch (Amazon SP-API rate limits restrict frequent polling)

**Pros:**
- Works with all platforms (no webhook required, just API read access)
- Predictable load (BeProfit knows when syncs run, can optimize server resources)
- Catch-all backup (even if webhooks fail, batch sync ensures data eventually syncs)

**Cons:**
- Delayed data (1-24 hour latency, dashboard shows outdated info for recent orders)
- API rate limits (frequent polling hits rate limits, must throttle)
- Inefficient (polling every hour even if no new data)

**3. Manual Refresh (User-Triggered)**

**How it works:**
- User clicks "Sync Now" button in Settings > Integrations
- BeProfit immediately polls platform API for new data
- Latency: 1-5 minutes (time to API call, data processing, profit recalculation)

**Supported platforms:**
- **All integrations** (manual refresh available for all connected platforms)
- **Rate limited:** Can only manually sync once every 15-60 minutes (to prevent API quota exhaustion)

**Pros:**
- On-demand updates (user controls when data refreshes)
- Useful for urgent checks (merchant wants to see today's profit, clicks "Sync Now")

**Cons:**
- Manual effort (user must remember to click "Sync Now")
- Rate limits (can't spam "Sync Now" every 5 minutes, API quota limits apply)
- Not scalable (doesn't work for high-volume stores with 1,000+ orders/day)

---

## Sync Schedules by Integration

### E-Commerce Platforms

**Shopify:**
- **Order data:** Real-time via webhook (1-5 minutes)
  - Webhook events: `orders/create`, `orders/updated`, `orders/cancelled`, `refunds/create`
- **Product catalog:** Hourly batch sync OR webhook (`products/create`, `products/update`)
- **Inventory levels:** Hourly batch sync OR webhook (`inventory_levels/update`)
- **Refunds:** Real-time via webhook (1-5 minutes)
- **Historical import:** All-time (no limit, can import 5+ years of orders on initial connection)

**WooCommerce:**
- **Order data:** Hourly batch sync OR webhooks (if WooCommerce webhooks enabled)
- **Product catalog:** Hourly batch sync
- **Refunds:** Hourly batch sync OR webhooks
- **Historical import:** All-time (no limit)

**Amazon:**
- **Order data:** Daily batch sync (Amazon SP-API rate limits: 0.0167 requests/second = ~1 request/minute = slow)
- **Product catalog:** Daily batch sync
- **Fees:** Daily batch sync (after Amazon fee reports are generated at end of day)
- **Historical import:** 90 days (Amazon SP-API limit: orders older than 90 days require different API endpoint)

**Wix:**
- **Order data:** Hourly or daily batch sync (Wix API capabilities unclear)
- **Historical import:** Unknown

### Ad Platforms

**Facebook Ads:**
- **Ad spend data:** Hourly batch sync
  - Reason: Ad spend updates throughout day, hourly sync captures most spend
- **Conversion data:** Hourly batch sync (but conversions may finalize over 24-48 hours due to attribution window)
  - Attribution window: 1-day click, 7-day view (default)
  - Conversions may be retroactively attributed up to 7 days after ad click
- **Historical import:** 90 days (sufficient for most businesses)

**Google Ads:**
- **Ad spend data:** Daily batch sync (Google Ads API rate limits: 15,000 operations/day per account)
  - Daily sync = 1 operation/account/day → very API-efficient
- **Conversion data:** Daily batch sync (conversion import lag may cause 24-72 hour delays)
  - Google Ads conversion tracking: conversions imported from Google Analytics or e-commerce platform, may lag 24-72 hours
- **Historical import:** 30 days (Google Ads API default: recent data only)

**TikTok Ads:**
- **Ad spend data:** Daily batch sync (TikTok Ads API rate limits unknown, likely similar to Facebook)
- **Conversion data:** Daily batch sync
- **Historical import:** 90 days (estimated)

**Other Ad Platforms (Pinterest, Snapchat, Microsoft Ads):**
- **Ad spend/conversion data:** Daily batch sync (estimated)
- **Historical import:** 30-90 days (varies by platform)

### Email/SMS Platforms

**Klaviyo:**
- **Campaign data:** Hourly batch sync (estimated)
  - Campaign opens/clicks update throughout day after send
- **Flow data:** Daily batch sync (flow performance aggregated daily)
- **Historical import:** 90 days (estimated)

**Other Email/SMS (if supported via UTM):**
- **Revenue attribution:** Real-time (via Shopify order webhooks with UTM parameters)
  - When order created, BeProfit reads UTM source (klaviyo, mailchimp, omnisend) → attributes to email channel
- **No campaign metrics:** UTM-based attribution only tracks revenue, not opens/clicks

### Shipping Platforms

**ShipStation:**
- **Label purchases:** Hourly batch sync (estimated)
  - BeProfit polls ShipStation API: "Give me all labels created since last sync"
- **Tracking updates:** Daily batch sync (tracking status: delivered, in transit, exception)
- **Historical import:** 90 days (estimated)

**ShipBob:**
- **Fulfillment data:** Daily batch sync (pick & pack, shipping)
- **Fee invoices:** Monthly sync (storage fees calculated at end of month when ShipBob generates invoice)
- **Historical import:** 30-90 days (estimated)

**ShipHero, Shippo:**
- **Similar to ShipStation:** Hourly or daily batch sync

### Accounting Platforms

**QuickBooks, Xero:**
- **No native integration confirmed** — data export only (CSV/Google Sheets)

### Payment Processors

**Stripe, PayPal:**
- **Fees synced via e-commerce platform** (Shopify order data includes `gateway_fee` field)
- **Sync frequency:** Same as e-commerce platform (real-time for Shopify via webhooks, hourly for WooCommerce)

---

## Manual Refresh Options

### Where to Trigger Manual Sync

**Settings > Integrations Page:**
- Each integration card has **"Sync Now"** button
- Clicking triggers immediate sync for that integration
- Example:
  - ShipStation card: "Last synced: 2 hours ago" → Click "Sync Now" → "Syncing..." → "Last synced: Just now"

**Dashboard (Global Refresh):**
- **"Refresh Data"** button (syncs ALL integrations simultaneously)
  - Useful when merchant wants to see most up-to-date profit across all data sources
  - **Limitation:** May hit rate limits if syncing 10+ integrations at once

**Per-Report Refresh:**
- Some reports may have **"Refresh"** button (re-run profit calculation with latest data)

### Rate Limits on Manual Sync

**Per-Integration Limits:**
- Can only manually sync once every **15-60 minutes** (to avoid API rate limit abuse)
- If user clicks "Sync Now" too frequently, error message:
  - _"Sync already in progress, please wait"_ OR
  - _"You can manually sync this integration once per hour. Next sync available in 42 minutes."_

**Global Limit:**
- Max **5-10 manual syncs per day** across all integrations (to prevent API quota exhaustion)
- Example: If user clicks "Sync Now" on 10 different integrations in 1 day, may hit global limit

**Platform-Specific Rate Limits:**
- **Shopify API:** 2 requests/second (burst), 40 requests/second (sustained)
  - Manual sync unlikely to hit Shopify limits (single sync = 5-10 API calls)
- **Facebook Ads API:** 200 calls/hour per user, 4,800 calls/hour per app
  - Manual sync: 10-20 API calls → well under limit
- **Google Ads API:** 15,000 operations/day per account
  - Manual sync: 5-10 operations → insignificant
- **Amazon SP-API:** 0.0167 requests/second (very slow)
  - Manual sync may take 5-10 minutes for large account (1,000+ orders)

---

## Data Freshness & Latency

### Typical Freshness by Data Type

**Order data:**
- **Shopify:** 1-5 minutes (real-time webhook)
- **WooCommerce:** 5-60 minutes (hourly batch OR webhooks)
- **Amazon:** 24 hours (daily batch sync)
- **Wix:** 1-24 hours (unknown sync frequency)

**Ad spend data:**
- **Facebook Ads:** 1-2 hours (hourly batch)
- **Google Ads:** 24 hours (daily batch)
- **TikTok Ads:** 24 hours (daily batch)
- **Other ad platforms:** 24 hours (daily batch)

**Conversion attribution (ad platforms):**
- **Facebook Ads:** 24-48 hours (attribution window finalization)
  - Order placed on Day 1 → Facebook attributes to ad on Day 1, but may retroactively adjust on Day 2-7 (view-through attribution)
- **Google Ads:** 24-72 hours (conversion import lag)
  - Google Ads conversion tracking relies on Google Analytics or e-commerce platform conversion data, which may lag 24-72 hours

**Shipping costs:**
- **ShipStation:** 1-2 hours (hourly batch)
- **ShipBob:** 24 hours (daily batch for per-order fees, monthly for storage fees)

**Email campaign data:**
- **Klaviyo:** 1-2 hours (hourly batch)
  - Campaign sent at 10 AM → opens/clicks accumulate throughout day → BeProfit syncs at 11 AM, 12 PM, 1 PM, etc.

### "Last Synced" Timestamps

**Where displayed:**
- **Settings > Integrations:** Each integration card shows "Last synced: 15 minutes ago"
- **Dashboard:** Global "Data last updated: 30 minutes ago" (timestamp of most recent sync across all integrations)

**Calculation:**
- BeProfit stores `last_synced_at` timestamp per integration
- Dashboard shows: `time_since_sync = current_time - last_synced_at`
- Example: If Shopify synced at 10:30 AM, and current time is 10:45 AM → "Last synced: 15 minutes ago"

### Data Staleness Alerts

**Does BeProfit alert users if data is stale?**

**Expected behavior:**
- If sync fails for 24+ hours, BeProfit shows alert:
  - Dashboard banner (red): _"Google Ads sync failed — reconnect integration"_
  - Email notification: _"Your BeProfit account has a sync issue with Facebook Ads"_
  - Integration card status: Red "Error" badge

**Alert triggers:**
- Sync failed for **24 hours** (sync hasn't run in 24 hours)
- Sync errors for **3 consecutive attempts** (API errors, auth failures)
- **Data is >48 hours old** (merchant viewing outdated profit data)

**Alert types:**
- **In-app banner:** Red banner at top of dashboard
- **Email notification:** Sent to merchant's email (once per day until resolved)
- **Integration card status:** Red "Error" badge on affected integration

---

## Historical Data Import

### Initial Sync: How Far Back?

**Per-Integration Historical Data Import:**

| Integration | Historical Range | Notes |
|-------------|------------------|-------|
| **Shopify** | All-time | No limit (can import 5+ years of orders, but may take hours for large stores) |
| **WooCommerce** | All-time | No limit |
| **Amazon** | 90 days | SP-API limitation (orders older than 90 days require different endpoint, may not be imported) |
| **Wix** | Unknown | Likely all-time or 90 days |
| **Facebook Ads** | 90 days | Sufficient for most businesses (3 months of ad history) |
| **Google Ads** | 30 days | Limited (conversion data only recent) |
| **TikTok Ads** | 90 days | Estimate (similar to Facebook Ads) |
| **Klaviyo** | 90 days | Estimate (3 months of campaign history) |
| **ShipStation** | 90 days | Estimate (recent shipments only) |
| **ShipBob** | 30 days | Estimate (recent fulfillment data, monthly invoices) |

**Initial Sync Duration:**

Depends on data volume:
- **Small store** (100 orders total): 5-10 minutes
- **Medium store** (10,000 orders): 30-60 minutes
- **Large store** (100,000+ orders): 2-6 hours
- **Enterprise** (1,000,000+ orders): 6-24 hours (may require background job processing)

**Progress Indicator:**
- During initial sync, dashboard shows: _"Syncing Shopify data... 45% complete (4,500/10,000 orders)"_
- **Why this matters:** Merchants know when data is ready (don't check dashboard 10 times wondering "Is it done yet?")

### Re-Import Historical Data

**Can users trigger re-import after initial setup?**

**Use case:**
- Merchant connected BeProfit, synced 10,000 orders
- Merchant later added COGS to all products in Shopify
- Merchant wants to recalculate historical profit with new COGS

**Expected feature:**
- **"Re-sync Historical Data"** button in Settings > Integrations
- Modal: _"This will re-import the last 90 days of orders and recalculate profit. This may take 30-60 minutes. Continue?"_
- Merchant clicks "Continue" → BeProfit re-imports orders, recalculates profit

**Limitations:**
- **Historical import range limited** (e.g., Google Ads only 30 days → cannot re-import 6 months of ad data)
- **Time-consuming** (re-importing 10,000 orders takes 30-60 minutes)
- **API quota impact** (re-import consumes API quota, may delay other syncs)

**Alternative:**
- Manual CSV import (merchant exports historical data, updates in spreadsheet, re-imports to BeProfit)

---

## Sync Error Handling

### Common Sync Errors

**1. OAuth Token Expired**

**Cause:**
- User revoked permissions in platform (Facebook, Google)
- OAuth token expired after 60-90 days (platform policy)

**Symptom:**
- Sync stops, data becomes stale
- BeProfit receives `401 Unauthorized` error from platform API

**Error message:**
- _"Facebook Ads connection expired — reconnect now"_

**Resolution:**
1. User clicks "Reconnect" button on integration card
2. OAuth flow: redirect to Facebook login, re-authorize BeProfit
3. BeProfit stores new OAuth token
4. Sync resumes

**2. API Rate Limit Exceeded**

**Cause:**
- Too many sync requests (manual syncs, batch syncs, concurrent syncs)
- Platform API rate limit hit (e.g., Amazon SP-API: 0.0167 requests/second)

**Symptom:**
- Sync fails with `429 Too Many Requests` error
- Some data syncs successfully, rest fails

**Resolution:**
- **Automatic retry:** BeProfit waits 15-60 minutes, then retries
- **Exponential backoff:** First retry after 15 min, second retry after 30 min, third retry after 60 min
- **Max retries:** 3-5 attempts before giving up (requires manual reconnect)

**3. Platform API Downtime**

**Cause:**
- Shopify/Facebook/Google API is down (rare, but happens)
- API returns `503 Service Unavailable` error

**Symptom:**
- Sync fails with `503` error
- All integrations for that platform fail simultaneously (all Shopify stores fail if Shopify API down)

**Resolution:**
- **Automatic retry:** BeProfit retries every 15 minutes until API recovers
- **Status page check:** BeProfit may check platform status page (status.shopify.com) to confirm API downtime
- **User notification:** BeProfit may show alert: _"Shopify API is experiencing issues — sync delayed"_

**4. Invalid Credentials (API Key Error)**

**Cause:**
- User changed password on platform (invalidated API key)
- API key was manually deleted or revoked
- User disconnected integration on platform side

**Symptom:**
- Sync fails with `401 Unauthorized` error
- BeProfit cannot authenticate with platform

**Error message:**
- _"ShipStation connection invalid — check API key"_

**Resolution:**
1. User navigates to Settings > Integrations > ShipStation
2. Clicks "Reconnect" or "Edit Connection"
3. Enters new API key (generated in ShipStation dashboard)
4. BeProfit validates new API key
5. Sync resumes

**5. Data Mismatch / Order Not Found**

**Cause:**
- ShipStation label for Order #1001, but Order #1001 doesn't exist in BeProfit database
- Possible reasons:
  - Order was deleted in Shopify (before BeProfit synced it)
  - Order ID format mismatch (Shopify: "#1001", ShipStation: "1001")

**Symptom:**
- Partial sync success (some shipping costs synced, others orphaned)
- BeProfit shows warning: _"12 shipping costs could not be matched to orders"_

**Resolution:**
- **Orphaned data handling:** BeProfit may create "unmatched expenses" bucket for orphaned shipping costs
- **Order ID normalization:** BeProfit normalizes order IDs across platforms (remove "#", leading zeros)
- **Manual review:** Merchant can review unmatched expenses, manually link to orders

### Error Notifications

**How users are notified of sync errors:**

**1. In-App Alert:**
- Red banner at top of dashboard: _"Google Ads sync failed — click to reconnect"_
- Dismissible (user can click "X" to close banner)
- Persists until error resolved (banner reappears on next page load)

**2. Email Notification:**
- Subject: _"Your BeProfit account has a sync issue with Facebook Ads"_
- Body: _"We've been unable to sync your Facebook Ads data for 24 hours. Please reconnect your Facebook Ads account."_
- Sent once per day until resolved (not spamming every hour)

**3. Integration Card Status:**
- Settings > Integrations: Integration card shows red "Error" badge
- Hover over badge: Tooltip shows error message (_"OAuth token expired"_)
- Click card: Expand to see full error details, "Reconnect" button

### Automatic Retry Mechanism

**Does BeProfit automatically retry failed syncs?**

**Expected behavior:** YES (with exponential backoff)

**Retry schedule:**
1. **First retry:** 15 minutes after failure
2. **Second retry:** 30 minutes after first retry (45 minutes total)
3. **Third retry:** 60 minutes after second retry (1 hour 45 minutes total)
4. **Max retries:** 3-5 attempts
5. **Give up:** After max retries, require manual intervention (user must reconnect)

**Why exponential backoff?**
- If error is temporary (API downtime for 5 minutes), first retry (15 min later) likely succeeds
- If error is persistent (OAuth token expired), retrying every 5 minutes wastes API quota → exponential backoff reduces load

**Error tracking:**
- BeProfit stores error count per integration: `consecutive_failures: 3`
- After successful sync, reset error count: `consecutive_failures: 0`

### Partial Sync Handling

**What happens if only SOME data syncs successfully?**

**Example scenario:**
- BeProfit syncing 1,000 orders from Shopify
- 950 orders sync successfully
- 50 orders fail (API timeout, data validation errors)

**Expected behavior:**
1. **Save successful data:** BeProfit saves the 950 successful orders to database
2. **Log failed records:** BeProfit logs 50 failed order IDs for manual review or retry
3. **Partial success status:** Dashboard shows: _"Partial sync: 950/1,000 orders synced"_
4. **Retry failed records:** On next sync, BeProfit retries the 50 failed orders

**Benefits of partial sync:**
- Merchant sees most recent data (950 orders) immediately, not waiting for all 1,000 to succeed
- Reduces data staleness (partial data better than no data)

**Challenges:**
- Merchant may not realize 50 orders missing (profit calculations slightly off)
- BeProfit must clearly communicate partial sync status

---

## Retroactive Data Updates

### Handling Changes to Historical Orders

**Scenario 1: Order Refunded 2 Days After Initial Sync**

**Timeline:**
- Day 1: Order #1001 placed ($50 revenue), BeProfit syncs order, calculates $20 profit
- Day 3: Customer refunds order ($50 refund)
- Day 3: Shopify sends `refunds/create` webhook to BeProfit

**BeProfit's action:**
1. Receive webhook: Order #1001 refunded
2. Update Order #1001 in database: `status: 'refunded'`, `refund_amount: $50`, `profit: -$1.76` (lost transaction fee)
3. Recalculate daily/monthly profit reports (subtract $50 revenue, $20 profit from Day 1)
4. Dashboard shows updated profit (Day 1 profit drops from $10,000 to $9,980)

**Data consistency approach:** **Retroactive updates** (historical reports update when data changes)

**Scenario 2: Ad Conversion Attribution Finalizes 48 Hours Later**

**Timeline:**
- Day 1: Customer clicks Google Ad, purchases ($50 order)
- Day 1: Google Ads reports 0 conversions (conversion data not yet imported from GA)
- Day 3: Google Ads finalizes attribution, reports 1 conversion for Day 1 ad click
- Day 3: BeProfit syncs Google Ads data, attributes $50 revenue to Day 1 ad

**BeProfit's action:**
1. Sync Google Ads conversion data (Day 3)
2. Find Order #1001 (placed Day 1), attribute to Google Ads
3. Update Day 1 profit calculation: add $8 ad spend (Google Ads cost for that click)
4. Recalculate Day 1 profit: $50 revenue - $8 ad spend - $20 COGS - ... = $12 profit (was $20 profit before attribution)
5. Dashboard shows updated Day 1 profit

**Data consistency approach:** **Retroactive attribution updates** (ad attribution applied retroactively as data finalizes)

### Data Consistency Guarantee

**Does BeProfit guarantee eventual consistency?**

**Two approaches to historical data:**

**Option A: Immutable Snapshots (Historical Reports Never Change)**
- When user views Monday's report, BeProfit shows profit as calculated on Monday
- If refund processed Tuesday, Monday's report still shows original profit (before refund)
- Tuesday's report shows refund impact
- **Pro:** Historical reports are stable (profit for Jan 15 always shows same value)
- **Con:** Historical reports may be inaccurate (missing refunds, retroactive ad attribution)

**Option B: Live Recalculations (Historical Reports Update Retroactively)**
- When user views Monday's report, BeProfit shows profit with latest data (includes refunds processed after Monday)
- If refund processed Tuesday, Monday's report updates to reflect refund
- **Pro:** Historical reports are accurate (profit for Jan 15 always shows true profit, including retroactive adjustments)
- **Con:** Historical reports change (profit for Jan 15 may show different value each time viewed)

**BeProfit's approach (inferred):** **Likely Option B (Live Recalculations)** — historical reports update retroactively.

**Why?**
- BeProfit marketing emphasizes "accurate profit tracking"
- Merchants want to see true profit (including refunds, retroactive ad attribution), not outdated snapshots
- **Trade-off:** Historical reports may change, but accuracy > stability

**Example:**
- User views Jan 15 report on Jan 16: $10,000 profit
- Customer refunds order on Jan 20: -$500
- User views Jan 15 report on Jan 21: $9,500 profit (retroactively updated)

---

## Sync Performance & Scalability

### How BeProfit Handles High-Volume Stores

**Large store challenges:**
- 100,000+ orders (5+ years of e-commerce history)
- 10,000+ products
- 1,000+ ad campaigns
- 50,000+ shipping labels

**Sync optimizations:**

**1. Incremental Sync (Only Sync New/Updated Data)**
- BeProfit stores `last_synced_at` timestamp per integration
- On sync, query platform API: _"Give me all orders created/updated since [last_synced_at]"_
- Only syncs new/updated data, not full catalog every time
- **Example:** Last sync was 1 hour ago → only sync orders created in past hour (100 orders) instead of all 100,000 orders

**2. Parallel Sync (Sync Multiple Integrations Simultaneously)**
- BeProfit syncs Shopify + Facebook Ads + Google Ads + ShipStation simultaneously (parallel API calls)
- Reduces total sync time: 4 integrations × 5 minutes each = 20 minutes sequentially, but only 5 minutes in parallel
- **Challenge:** Must respect per-integration rate limits (can't spam all platforms at once)

**3. Pagination (API Calls Paginated for Large Datasets)**
- Shopify API returns 250 orders per request (max)
- If store has 10,000 new orders, BeProfit makes 40 API requests (10,000 ÷ 250 = 40 pages)
- **Rate limit consideration:** Shopify allows 2 requests/second → 40 requests takes 20 seconds

**4. Background Job Processing (Async Sync)**
- Large initial sync (100,000 orders) runs as background job (doesn't block dashboard loading)
- Merchant can browse BeProfit dashboard while sync runs in background
- Progress bar shows sync status: _"Syncing 45% complete (45,000/100,000 orders)"_

**5. Database Indexing (Fast Profit Recalculation)**
- BeProfit indexes orders by `order_id`, `created_at`, `platform`
- When new ad spend data arrives, BeProfit quickly finds orders to attribute (indexed by date)
- **Without indexing:** Recalculating profit for 100,000 orders takes 10+ minutes
- **With indexing:** Recalculating profit takes 10-30 seconds

### Sync Queue & Priority

**Does BeProfit prioritize certain data types?**

**Expected sync priority:**
1. **Priority 1: Orders (Revenue Data)**
   - Orders are most critical (revenue drives profit)
   - Sync orders first, then other data
2. **Priority 2: Refunds (Impact Profit Immediately)**
   - Refunds reduce profit significantly, must be synced ASAP
3. **Priority 3: Ad Spend (Cost Data)**
   - Ad spend is large expense, impacts profit calculation
4. **Priority 4: Product Catalog (Less Time-Sensitive)**
   - Product COGS changes infrequently, lower priority

**Sync queue visibility:**
- Does user see "Sync queue: 3 integrations pending"?
- **Likely:** BeProfit shows sync status per integration (Shopify: "Syncing...", Facebook Ads: "Queued"), not global queue

---

## Inferred UI Elements

### Settings > Integrations Page

**Each integration card shows:**
- **Connection status:** "Connected" (green badge) / "Error" (red badge) / "Disconnected" (gray badge)
- **Last synced timestamp:** "Last synced: 15 minutes ago"
- **Sync progress (if syncing):** "Syncing... 45% complete (4,500/10,000 orders)"
- **Buttons:**
  - **"Sync Now"** (manual refresh, rate-limited to once per hour)
  - **"Reconnect"** (if error state — OAuth expired, invalid API key)
  - **"Disconnect"** (remove integration)

**Example integration card:**
```
┌─────────────────────────────────────────┐
│ Shopify                          ✅ Connected │
│ Last synced: 15 minutes ago              │
│ Account: mystore.myshopify.com           │
│                                          │
│ [Sync Now] [Disconnect]                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Facebook Ads                     ❌ Error   │
│ Last synced: 2 days ago                  │
│ Error: OAuth token expired               │
│                                          │
│ [Reconnect] [Disconnect]                │
└─────────────────────────────────────────┘
```

### Dashboard

**Global Data Freshness Indicator:**
- Top-right corner: _"Data last updated: 30 minutes ago"_
- Tooltip on hover: _"Shopify: 15 min ago, Facebook Ads: 2 hours ago, Google Ads: 1 day ago"_
- **"Refresh Data"** button (global sync, syncs all integrations)

**Sync Status Badge:**
- While syncing, show spinner: _"Syncing... (3 of 5 integrations complete)"_
- After sync complete: _"Data updated just now"_

**Sync Error Banner:**
- Red banner at top of dashboard (if any integration has error):
  - _"Facebook Ads sync failed — click to reconnect"_
  - [Reconnect] button in banner

### Sync History Page (if exists)

**Log of all sync events:**
- Table with columns: Timestamp, Integration, Status, Records Synced, Duration, Error Message
- Example rows:
  ```
  2026-02-13 10:30 AM — Shopify — Success — 120 orders — 8 seconds
  2026-02-13 10:30 AM — Facebook Ads — Success — 5 campaigns — 3 seconds
  2026-02-13 09:30 AM — Google Ads — Failed — 0 campaigns — N/A — OAuth token expired
  2026-02-13 08:30 AM — ShipStation — Partial Success — 95/100 labels — 12 seconds — 5 labels failed (API timeout)
  ```

**Filters:**
- Filter by integration (show only Shopify sync history)
- Filter by status (show only failed syncs)
- Date range (show syncs from last 7 days)

---

## Data Model Implications

```typescript
// Sync log entity
interface SyncLog {
  syncId: string; // unique sync ID
  integration: string; // 'shopify', 'facebook_ads', 'klaviyo', 'shipstation', etc.
  syncType: 'initial' | 'scheduled_batch' | 'manual' | 'webhook';
  startedAt: Date; // when sync started
  completedAt: Date; // when sync finished
  status: 'success' | 'partial_success' | 'failed';
  recordsSynced: number; // number of orders, products, campaigns synced
  recordsFailed: number; // number of records that failed to sync
  errorMessage?: string; // error details (if failed)
  retryCount: number; // how many times this sync has been retried
  nextRetryAt?: Date; // if failed, when to retry
}

// Integration status entity
interface IntegrationStatus {
  integration: string; // 'shopify', 'facebook_ads', etc.
  connectionStatus: 'connected' | 'error' | 'disconnected';
  lastSyncedAt: Date; // timestamp of most recent sync
  lastSuccessfulSyncAt: Date; // timestamp of most recent successful sync (may differ from lastSyncedAt if recent sync failed)
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'manual'; // how often this integration syncs
  dataFreshness: number; // seconds since last sync (current_time - lastSyncedAt)
  errorCount: number; // consecutive sync failures (reset to 0 on successful sync)
  errorMessage?: string; // error details (if error state)
  authToken?: string; // OAuth token or API key (encrypted, not displayed to user)
  authExpiresAt?: Date; // when OAuth token expires (if applicable)
}

// Sync queue (for async processing)
interface SyncQueue {
  queueId: string;
  integration: string; // 'shopify', 'facebook_ads', etc.
  priority: 1 | 2 | 3; // 1 = high (orders, refunds), 2 = medium (ad spend, shipping), 3 = low (products, inventory)
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date; // when sync was queued
  processedAt?: Date; // when sync started processing
  completedAt?: Date; // when sync finished
}

// Webhook event log (if using webhooks)
interface WebhookEvent {
  webhookId: string;
  integration: string; // 'shopify', 'woocommerce'
  eventType: string; // 'orders/create', 'orders/updated', 'refunds/create', 'products/update'
  payload: object; // webhook payload (JSON from platform)
  receivedAt: Date; // when BeProfit received webhook
  processedAt?: Date; // when BeProfit processed webhook
  status: 'pending' | 'processed' | 'failed';
  errorMessage?: string; // if processing failed
}
```

---

## Limitations & Gaps Identified

### Unanswered Questions

1. **Does BeProfit use real-time webhooks for Shopify, or hourly batch sync?**
   - Marketing says "real-time", but technical implementation unknown
   - **Likely:** Webhooks for Shopify (most mature integration), batch for others

2. **What is the exact sync frequency for each ad platform (hourly vs. daily)?**
   - Facebook Ads: Hourly (estimated)
   - Google Ads: Daily (estimated)
   - TikTok Ads: Daily (estimated)
   - **Unknown:** Actual sync schedules not documented

3. **Does BeProfit retroactively update historical reports when data changes (refunds, attribution finalization)?**
   - **Expected:** YES (live recalculations for accuracy)
   - **Alternative:** NO (immutable snapshots for stability)
   - **Unknown:** BeProfit's actual approach

4. **What is the automatic retry mechanism for failed syncs?**
   - Exponential backoff (15 min, 30 min, 60 min)?
   - Max retries (3-5 attempts)?
   - **Unknown:** Exact retry schedule

5. **Can users trigger re-import of historical data after initial setup?**
   - Use case: Merchant added COGS later, wants to recalculate historical profit
   - **Expected:** "Re-sync Historical Data" button exists
   - **Unknown:** Feature availability not confirmed

6. **Is there a sync queue dashboard showing pending/in-progress syncs?**
   - Useful for transparency (user sees "5 integrations queued for sync")
   - **Unknown:** Sync queue visibility not documented

7. **What is the rate limit on manual "Sync Now" button?**
   - Once per hour? Once per 15 minutes?
   - **Unknown:** Exact rate limit not documented

8. **Does BeProfit show sync history log?**
   - Table of all sync events (timestamp, integration, status, records synced)
   - Useful for debugging (user can see "Facebook Ads sync failed 3 times yesterday")
   - **Unknown:** Sync history page not confirmed

---

## Relevance to Our Build

### Critical for Competing Product

1. **Real-time sync is a competitive advantage:**
   - If BeProfit uses hourly/daily batch sync for orders, we can differentiate with real-time webhooks (1-5 min latency)
   - **Merchant benefit:** See profit within minutes of order placement (not 1-24 hours later)

2. **Manual refresh UX:**
   - Users want control — clear "Sync Now" button on each integration
   - Real-time progress indicator (syncing 45% complete)
   - **No frustration:** Users know when sync is running, not wondering "Is it working?"

3. **Sync error handling:**
   - Graceful error messages (_"OAuth token expired — reconnect now"_ not _"Error 401: Unauthorized"_)
   - Automatic retries (exponential backoff, max 3-5 attempts)
   - Email notifications (user knows sync failed, not discovering 3 days later when profit data is stale)

4. **Historical data import flexibility:**
   - Allow users to re-import historical data (e.g., if they add COGS later and want to recalculate old orders)
   - **Benefit:** Merchants can correct mistakes without losing historical profit data

5. **Data consistency strategy:**
   - **Decision:** Immutable snapshots (historical reports never change) vs. live recalculations (historical reports update when data changes)
   - **Recommendation:** Live recalculations (accuracy > stability) — matches merchant expectation ("I want to see true profit, not outdated snapshots")

### MVP Requirements

**Phase 1 (MVP):**
- **Real-time webhook sync for Shopify** (most critical platform, 1-5 min latency)
- **Hourly batch sync for ad platforms** (Facebook, Google, TikTok)
- **Manual "Sync Now" button** for all integrations (rate-limited to once per hour)
- **Sync error notifications** (in-app banner + email)
- **Automatic retry** with exponential backoff (15 min, 30 min, 60 min, max 3 attempts)
- **Last synced timestamp** displayed on each integration card

**Phase 2:**
- **Sync history log** (all sync events visible to user, filterable by integration/status/date)
- **Re-import historical data** feature (user can re-sync past 90 days, recalculate profit with updated COGS)
- **Sync queue dashboard** (show pending syncs, "5 integrations queued")
- **Webhook support for WooCommerce** (real-time sync for second-most popular platform)

**Phase 3:**
- **Parallel sync optimization** (sync multiple integrations simultaneously for faster total sync time)
- **Incremental sync optimization** (only sync changed data, not full catalog)
- **Background job processing** (large initial syncs run async, don't block dashboard)

### Competitive Opportunities

If BeProfit has sync limitations, we can differentiate by:

1. **Real-time Shopify sync (1-5 min) vs. hourly batch (1+ hour lag):**
   - Merchant sees profit within minutes of order placement
   - **Marketing message:** "Real-time profit tracking — see your profit the moment orders come in"

2. **Proactive sync error handling:**
   - If BeProfit silently fails (data goes stale without notification), we can excel with proactive alerts
   - **Email + in-app banner + push notification** (multi-channel error alerts)

3. **Historical data re-import:**
   - If BeProfit doesn't allow re-importing historical data, we can offer this flexibility
   - **Use case:** Merchant adds COGS on Day 30, can re-import and recalculate profit for Days 1-29

4. **Sync history transparency:**
   - If BeProfit doesn't show sync history, we can provide detailed sync logs
   - **Benefit:** Merchants trust the system (can verify sync ran successfully, see exactly when data was updated)

5. **Faster sync speeds:**
   - Parallel sync (sync 5 integrations simultaneously, not sequentially)
   - Incremental sync (only sync new/updated data, not full catalog)
   - **Benefit:** Large stores (100K+ orders) sync in 5-10 minutes (not 1-2 hours)

### Technical Challenges

1. **Webhook infrastructure:**
   - Receiving, validating, processing webhooks at scale
   - **Challenges:**
     - Webhook signature verification (prevent fake webhooks)
     - Idempotency (handle duplicate webhooks, don't double-count orders)
     - Retry logic (if webhook processing fails, retry)
     - Webhook endpoint hosting (must be always-on, low-latency)

2. **API rate limit management:**
   - Each platform has different rate limits (Shopify: 2/sec, Amazon: 0.0167/sec, Facebook: 200/hour)
   - **Challenges:**
     - Throttling (don't exceed rate limits, queue requests)
     - Exponential backoff (if rate limit hit, wait before retry)
     - Multi-account support (rate limits per account, not global)

3. **Handling eventual consistency:**
   - Data changes retroactively (refunds, ad attribution finalization)
   - **Challenges:**
     - Recalculate historical profit when data changes
     - Communicate to user (historical reports may update)
     - Performance (recalculating 100K orders takes time)

4. **Sync queue architecture:**
   - Priority queue (orders synced first, then products)
   - Parallel processing (sync multiple integrations simultaneously)
   - Failure recovery (retry failed syncs, don't lose data)
   - **Challenges:**
     - Queue management (which sync to run next?)
     - Resource allocation (don't overload server with 10 concurrent syncs)
     - Monitoring (track queue depth, sync durations, failure rates)

5. **Database performance:**
   - Indexing (fast profit recalculation for 100K+ orders)
   - Query optimization (find orders to attribute when new ad data arrives)
   - **Challenges:**
     - Database size grows (100K orders × 10 fields = 1M records)
     - Slow queries (recalculating profit for 100K orders without indexes = 10+ min)
     - Solution: Database indexing, query optimization, caching

---

## Cross-References

- **File 031 (Integration Ecosystem Overview):** Summary of all integrations, sync frequency not detailed
- **File 032 (Shopify Integration):** Shopify likely uses webhooks (real-time sync), all-time historical import
- **File 033 (WooCommerce Integration):** Hourly batch or webhooks (unclear)
- **File 034 (Amazon Integration):** Daily batch sync (Amazon SP-API rate limits)
- **File 035 (Facebook Ads Integration):** Hourly batch sync, attribution window 24-48 hours
- **File 036 (Google Ads Integration):** Daily batch sync, conversion import lag 24-72 hours
- **File 037 (TikTok Ads Integration):** Daily batch sync (estimated)
- **File 038 (Other Ad Platforms):** Daily batch sync (estimated)
- **File 039 (Klaviyo Integration):** Hourly batch sync (estimated)
- **File 040 (Other Email/SMS Integrations):** UTM-based attribution (real-time via Shopify webhooks)
- **File 041 (Shipping Platform Integrations):** ShipStation hourly batch, ShipBob daily batch
- **File 042 (Accounting & Other Integrations):** No native integrations (CSV export only)

---

## Estimated Research Effort

- **Web pages browsed:** 6 pages (BeProfit FAQ, marketing site, Shopify App Store, cross-reference all integration files)
- **Information completeness:** ~35% (marketing says "real-time", but technical details unknown, many sync frequencies estimated)
- **Confidence level:** Medium-Low (significant gaps, sync architecture not documented)

---

## File Metadata

- **Output file:** `beprofit-casestudy-info-043.md`
- **File size:** 863 lines
- **Completion date:** 2026-02-13
- **Status:** COMPLETED (with noted limitations — sync frequencies estimated, technical architecture inferred)
