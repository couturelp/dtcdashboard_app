# BeProfit Google Ads Integration

## Source
- **URLs:**
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://beprofit.co/integrations/ (BeProfit integrations page)
  - https://help.runviably.com/beprofit (BeProfit Help Center)
  - https://support.beprofit.co/en/articles/8635856-utm-attribution-setup (UTM Attribution Setup)
  - https://support.beprofit.co/support/solutions/articles/67000687449-utm-attribution-overview (UTM Attribution Overview)
  - https://sourceforge.net/software/product/BeProfit/integrations/ (BeProfit integrations list)
  - https://www.getapp.com/website-ecommerce-software/a/beprofit/ (GetApp review page)
- **Category:** Integrations / Ad Platforms / Google Ads
- **Date Captured:** 2026-02-13

---

## Integration Overview

Google Ads is one of BeProfit's **top-tier, native integrations**, alongside Facebook Ads and TikTok Ads. It is available on all pricing plans (Free, Basic, Premium, Plus). BeProfit positions Google Ads integration as essential for e-commerce merchants to:

- **Automatically sync ad spend data** from Google Ads campaigns (Search, Shopping, Display, Video, Discovery)
- **Attribute revenue to Google Ads campaigns** using GCLID (Google Click Identifier) and UTM parameters
- **Calculate true ROAS** by factoring in COGS, shipping, fees, and other expenses
- **Track performance metrics** including CPC, CPA, conversions, and net profit by campaign
- **Compare Google Ads to other channels** (Facebook, TikTok, organic) in unified dashboard

### Key Value Proposition

Google Ads Manager shows gross ROAS (revenue ÷ ad spend), but BeProfit calculates **net profit ROAS** by subtracting all costs:
- Cost of Goods Sold (COGS)
- Shipping costs
- Payment processing fees
- Platform fees (Shopify/WooCommerce)
- Other operational expenses

This gives merchants a true picture of which Google Ads campaigns are profitable after all expenses.

### Google Ads vs Facebook Ads in BeProfit

**Key difference:** BeProfit treats Google Ads attribution differently than Facebook Ads:

> "In Google's case, BeProfit attributes based on UTM data only so as to avoid attributing SEO-based orders to the Google Ads platform."

This means:
- **Facebook Ads:** BeProfit uses automatic attribution based on customer visits to compensate for iOS 14+ limitations
- **Google Ads:** BeProfit uses **strict UTM-only attribution** to avoid misattributing organic search traffic to paid Google Ads

This is a critical distinction that affects how ad spend is counted and orders are attributed.

---

## Connection Setup

### Prerequisites

**What the user needs before connecting:**
- Active Google Ads account with at least one campaign
- Admin access to the Google Ads account
- Google Ads Customer ID (e.g., 123-456-7890)
- BeProfit account (available on all pricing tiers)
- Store integration already connected (Shopify, WooCommerce, Amazon)

**Recommended but not required:**
- Google Analytics connected to store (for additional attribution data)
- UTM parameters on Google Ads campaigns (auto-tagging via GCLID is standard, but UTM provides fallback)
- Conversion tracking enabled in Google Ads (Purchase conversion action)

**Not required:**
- No technical knowledge required (OAuth handles authentication)
- No manual API key generation
- No Google Tag Manager configuration (though it may help with advanced tracking)

### Inferred OAuth Flow

Based on standard Google Ads API OAuth 2.0 practices and BeProfit's positioning as an easy-to-use platform:

```
1. User navigates to BeProfit Settings > Integrations > Ad Platforms
2. User clicks "Connect Google Ads" button
3. BeProfit redirects to Google OAuth consent screen
4. User logs into Google account (if not already logged in)
5. Google displays permission request screen:
   - App Name: "BeProfit"
   - Publisher: Viably / BeProfit
   - Permissions requested:
     * View and manage your Google Ads accounts
     * View Google Ads data (campaigns, ad groups, ads, performance)
6. User selects Google Ads account(s) to connect
   - If user has multiple Google Ads accounts, they can select one or more
   - Manager accounts (MCC) allow connecting multiple sub-accounts
7. User clicks "Allow" to authorize BeProfit
8. Google redirects back to BeProfit with OAuth access token and refresh token
9. BeProfit displays "Connection Successful" message
10. BeProfit prompts user to select which Google Ads account(s) to sync (if multiple available)
11. Initial sync begins:
    - Progress indicator: "Syncing Google Ads data... 25% complete"
    - Historical data import: Last 90 days (inferred)
    - Estimated time: 3-15 minutes depending on campaign volume
12. User redirected to BeProfit dashboard showing Google Ads data
```

### OAuth Permissions Requested

**Inferred Google Ads API OAuth 2.0 scopes:**

| Scope | Purpose | Required? |
|-------|---------|-----------|
| `https://www.googleapis.com/auth/adwords` | Full access to Google Ads accounts (read campaigns, performance data) | ✅ Critical |
| `https://www.googleapis.com/auth/userinfo.email` | User's email address for account linking | ✅ Required |
| `https://www.googleapis.com/auth/userinfo.profile` | Basic profile information | ✅ Required |

**Note:** The `adwords` scope is the primary scope for Google Ads API access. It grants read and write access, but BeProfit is **read-only** and does not modify campaigns.

**Write permissions:** BeProfit does NOT write data back to Google Ads (read-only integration).

### Requirements

- **Google Ads account:** Must have at least one active or historical campaign
- **Customer ID:** BeProfit likely auto-detects Customer ID from OAuth, but user may need to manually select if multiple accounts exist
- **Manager account (MCC) support:** If user has a Google Ads Manager account (MCC), they can connect multiple sub-accounts
- **Conversion tracking:** Recommended to have Google Ads conversion tracking enabled for accurate attribution
- **Minimum tier:** All plans (Free, Basic, Premium, Plus)

---

## Data Synced

### Campaign Data

**Campaign-level fields synced from Google Ads:**

| Field | Google Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Campaign ID | `campaign.id` | Unique identifier |
| Campaign Name | `campaign.name` | User-friendly campaign name |
| Campaign Status | `campaign.status` | ENABLED, PAUSED, REMOVED |
| Campaign Type | `campaign.advertising_channel_type` | SEARCH, SHOPPING, DISPLAY, VIDEO, DISCOVERY, PERFORMANCE_MAX |
| Budget | `campaign.campaign_budget` | Daily or lifetime budget |
| Budget Type | `campaign_budget.delivery_method` | STANDARD or ACCELERATED |
| Start Date | `campaign.start_date` | Campaign start date |
| End Date | `campaign.end_date` | Campaign end date (if scheduled) |
| **Spend Metrics** | | |
| Total Spend | `metrics.cost_micros` ÷ 1,000,000 | Total ad spend in account currency |
| **Performance Metrics** | | |
| Impressions | `metrics.impressions` | Number of times ads shown |
| Clicks | `metrics.clicks` | Total clicks on ads |
| CTR | `metrics.ctr` | Click-through rate (%) |
| CPC | `metrics.average_cpc` ÷ 1,000,000 | Cost per click |
| CPM | `metrics.average_cpm` ÷ 1,000,000 | Cost per 1,000 impressions |
| **Conversion Metrics** | | |
| Conversions | `metrics.conversions` | Total conversions (Purchase events) |
| Conversion Value | `metrics.conversions_value` | Revenue attributed to campaign |
| CPA | `metrics.cost_per_conversion` ÷ 1,000,000 | Cost per acquisition |
| ROAS | `metrics.conversions_value / metrics.cost_micros` | Return on ad spend (gross) |

**Note:** Google Ads API returns costs in micros (1/1,000,000 of currency unit), so $50.00 is represented as 50,000,000 micros. BeProfit must convert these values to standard currency format.

### Ad Group Data

**Ad Group-level fields synced:**

| Field | Google Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Ad Group ID | `ad_group.id` | Unique identifier |
| Ad Group Name | `ad_group.name` | User-friendly name |
| Campaign ID | `ad_group.campaign` | Parent campaign link |
| Ad Group Status | `ad_group.status` | ENABLED, PAUSED, REMOVED |
| Ad Group Type | `ad_group.type` | SEARCH_STANDARD, DISPLAY_STANDARD, SHOPPING_PRODUCT_ADS, etc. |
| **Bid Strategy** | | |
| CPC Bid | `ad_group.cpc_bid_micros` | Manual CPC bid amount (if applicable) |
| **Spend & Performance** | | |
| Spend | `metrics.cost_micros` at ad group level | |
| Impressions, Clicks, CTR, CPC, CPM | `metrics.*` at ad group level | |
| Conversions, Conversion Value, CPA, ROAS | `metrics.*` at ad group level | |

### Keyword Data (Search Campaigns)

**For Search campaigns, BeProfit may sync keyword-level data:**

| Field | Google Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Keyword ID | `ad_group_criterion.criterion_id` | Unique identifier |
| Keyword Text | `keyword.text` | The search term keyword |
| Match Type | `keyword.match_type` | EXACT, PHRASE, BROAD |
| Ad Group ID | `ad_group_criterion.ad_group` | Parent ad group link |
| **Performance** | | |
| Spend, Impressions, Clicks, CTR, CPC | `metrics.*` at keyword level | |
| Conversions, Conversion Value, CPA, ROAS | `metrics.*` at keyword level | |
| Quality Score | `ad_group_criterion.quality_info.quality_score` | Keyword quality score (1-10) |

**Note:** Keyword-level data is only applicable to Search campaigns. Shopping, Display, Video, and Performance Max campaigns do not have keywords in the traditional sense.

**Uncertainty:** It is unclear if BeProfit syncs keyword-level data or only aggregates at campaign/ad group level. Given BeProfit's focus on high-level profit analytics (not granular PPC optimization), it's likely that **keyword-level data is NOT synced**, and reporting stops at the ad group level.

### Shopping Campaign Data

**For Google Shopping campaigns (product feed-based ads):**

| Field | Google Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Product Group ID | `ad_group_criterion.criterion_id` | Product group identifier |
| Product Title | `product_group.product_title` or `shopping_product.title` | Product name |
| Product SKU | `shopping_product.product_id` | Product SKU/ID |
| **Performance** | | |
| Spend, Impressions, Clicks, Conversions | `metrics.*` at product group level | |

**Critical for e-commerce:** Google Shopping campaigns are often the highest ROAS campaigns for e-commerce brands. BeProfit must sync Shopping campaign data to be useful.

**Uncertainty:** It's unclear if BeProfit syncs product-level Shopping performance or only aggregates at campaign level. Given the importance of Shopping campaigns for e-commerce, BeProfit likely syncs at least **product group level** data, if not individual product performance.

### Ad Data (Creative Level)

**Ad-level fields synced:**

| Field | Google Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Ad ID | `ad_group_ad.ad.id` | Unique identifier |
| Ad Type | `ad_group_ad.ad.type` | EXPANDED_TEXT_AD, RESPONSIVE_SEARCH_AD, RESPONSIVE_DISPLAY_AD, VIDEO_AD, SHOPPING_PRODUCT_AD |
| Ad Status | `ad_group_ad.status` | ENABLED, PAUSED, REMOVED |
| Headlines | `ad_group_ad.ad.responsive_search_ad.headlines` | Ad headlines (for RSAs) |
| Descriptions | `ad_group_ad.ad.responsive_search_ad.descriptions` | Ad descriptions |
| **Performance** | | |
| Spend, Impressions, Clicks, CTR, CPC | `metrics.*` at ad level | |
| Conversions, CPA, ROAS | `metrics.*` at ad level | |

**Uncertainty:** BeProfit may NOT sync ad-level data due to the large number of ads (especially with Responsive Search Ads having multiple headline/description combinations). More likely, BeProfit aggregates at **ad group level** or **campaign level** only.

### Conversion Tracking

**Google Ads conversion actions synced:**

| Conversion Action | Google Ads Conversion Type | BeProfit Use |
|-------------------|---------------------------|--------------|
| Purchase | `PURCHASE` | Primary conversion event, linked to orders |
| Add to Cart | `ADD_TO_CART` | Micro-conversion, funnel analysis (may not be synced) |
| Begin Checkout | `BEGIN_CHECKOUT` | Micro-conversion (may not be synced) |
| Page View | `PAGE_VIEW` | Top-of-funnel (likely not synced) |

**Note:** BeProfit likely only syncs **Purchase** conversion events, as other conversion types (add-to-cart, page views) are not directly relevant to profit tracking.

**Conversion value:** Google Ads passes transaction value with Purchase conversions, which BeProfit uses to calculate attributed revenue.

---

## Sync Details

### Sync Frequency

**Automatic sync:**
- **Frequency:** BeProfit claims "real-time" or "automatic" data syncing, but Google Ads data is likely synced **daily** or **every few hours**
- **Why not truly real-time:** Google Ads API has rate limits and conversion data has natural delay, making continuous real-time sync impractical
- **Daily data refresh:** BeProfit marketing materials state "data refreshes daily to keep users on top of their numbers"
- **Batch processing:** BeProfit likely runs batch sync jobs once per day (early morning) or every 4-6 hours

**Manual refresh:**
- **User-triggered refresh:** Likely available via a "Refresh" or "Sync Now" button in BeProfit dashboard (not confirmed in documentation)
- **Use case:** Merchants can manually trigger sync if they need latest data for reporting

**Real-time vs delayed:**
- **Typical delay:** 4-24 hours behind Google Ads Manager
- **Why delayed:**
  - Google Ads conversion tracking has inherent delay (conversions can be reported up to 90 days after click)
  - Google Ads API data is not real-time - it reflects data from previous day
  - BeProfit's batch sync schedule adds additional delay

### Historical Data Import

**Initial sync:**
- **Import range:** Likely **90 days of historical data** on first connection
- **Reasoning:** Google Ads API supports historical data access, but BeProfit may limit initial import to avoid long sync times and user wait
- **All campaign types:** Search, Shopping, Display, Video, Performance Max campaigns are all imported

**Ongoing sync:**
- **Continuous forward sync:** Once connected, BeProfit continuously syncs data going forward on daily or hourly schedule
- **No automatic backfill:** Historical data before initial connection is not automatically synced (user would need to disconnect and reconnect to re-import)

### Data Freshness

**Typical delay timeline:**

| Timeframe | Data Freshness |
|-----------|---------------|
| Today | Not available (conversion delay + sync delay) |
| Yesterday | Partial data (conversions still being attributed) |
| Last 7 days | Mostly complete |
| Last 30 days | Complete and stable |
| Older than 30 days | Fully stabilized |

**Conversion lag:** Google Ads has a longer conversion lag than Facebook Ads:
- **Click-to-conversion window:** Google Ads default is 30-day click attribution (vs Facebook's 7-day)
- **Conversion import delay:** Conversions from offline tracking or CRM import can be delayed by days or weeks
- **Attribution finalization:** Conversions can be attributed retroactively up to 90 days after click

**Best practice:** BeProfit should re-sync the last 30-90 days periodically to capture retroactive conversions.

---

## Attribution Methodology

### Attribution Window

**Default attribution window in Google Ads:**
- **30-day click attribution:** Conversions counted if user clicked ad within last 30 days
- **1-day view attribution:** Conversions counted if user viewed Display/Video ad within last 24 hours

**Note:** Google Ads' default attribution window is **longer** than Facebook Ads (30-day vs 7-day), which means Google Ads may attribute more conversions to the same order.

**Configurable in Google Ads Manager:**
- Users can customize attribution windows in Google Ads Manager (e.g., 7-day, 30-day, 90-day)
- Unclear if BeProfit allows configuring attribution windows within BeProfit, or if it inherits settings from Google Ads Manager

**BeProfit's approach:** BeProfit uses **strict UTM-only attribution** for Google Ads:

> "In Google's case, BeProfit attributes based on UTM data only so as to avoid attributing SEO-based orders to the Google Ads platform."

This means:
- **GCLID parameter matching:** When user clicks a Google Ad, Google appends `gclid` parameter to URL (e.g., `?gclid=abc123`). BeProfit captures this and links it to the order.
- **UTM parameter matching:** If GCLID is not present, BeProfit falls back to UTM parameters (e.g., `?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale`)
- **No automatic attribution:** Unlike Facebook Ads, BeProfit does NOT use automatic "customer visit" attribution for Google Ads to avoid misattributing organic Google Search traffic to Google Ads

### Google Ads Attribution Models

Google Ads supports multiple attribution models:

| Attribution Model | Description | Default? |
|------------------|-------------|----------|
| Last-click | 100% credit to last ad click | ✅ Default |
| First-click | 100% credit to first ad click | |
| Linear | Equal credit to all ad clicks in path | |
| Time-decay | More credit to recent ad clicks | |
| Position-based | 40% first click, 40% last click, 20% middle clicks | |
| Data-driven | Machine learning assigns credit based on historical patterns | Recommended by Google |

**BeProfit's approach:** Unclear if BeProfit respects Google Ads' attribution model setting or uses its own attribution logic. Most likely, BeProfit uses **last-click attribution** regardless of Google Ads settings, to maintain consistency with its attribution approach for other platforms.

### GCLID (Google Click Identifier)

**How GCLID works:**
1. User clicks a Google Ad
2. Google appends `gclid` parameter to landing page URL (e.g., `https://store.com/?gclid=Cj0KCQiA...`)
3. Store captures `gclid` and stores it with the session/order
4. When order is placed, store sends `gclid` to Google Ads via conversion tracking (Google Ads Conversion Tag or Google Analytics)
5. Google Ads matches `gclid` to the ad click and attributes conversion to the campaign/ad group/keyword

**BeProfit's use of GCLID:**
- BeProfit likely captures `gclid` from order data (Shopify, WooCommerce, Amazon) and uses it to match Google Ads conversions to orders
- This is the most accurate method for attributing Google Ads conversions

**Limitation:** If store does not capture `gclid` (e.g., custom checkout, non-standard integration), BeProfit must fall back to UTM parameter matching, which is less accurate.

### UTM Parameter Tracking

**Standard Google Ads UTM parameters:**
- `utm_source=google`
- `utm_medium=cpc`
- `utm_campaign={campaign_name}`
- `utm_term={keyword}` (for Search campaigns)
- `utm_content={ad_group}` or `{creative}`

BeProfit tracks customer sessions with UTM parameters and attributes orders to Google Ads campaigns based on last UTM touchpoint before purchase.

**BeProfit's UTM attribution setup:**
From BeProfit's support documentation, when BeProfit identifies a new UTM group (pulled from customer journey data), it attempts to attribute it automatically to an ad platform (Google Ads, Facebook Ads, etc.) or alternative medium (email, SMS, etc.).

**Critical for Google Ads:** BeProfit uses **UTM-only attribution** for Google Ads to avoid misattributing organic search traffic. This means if a user arrives via organic Google Search (no UTM parameters), BeProfit will NOT attribute the order to Google Ads, even if the user previously clicked a Google Ad.

### Order Matching

**How BeProfit links Google Ads conversions to store orders:**

1. **GCLID matching (primary method):**
   - Store captures `gclid` parameter and stores it with the order
   - BeProfit matches `gclid` to Google Ads conversion data
   - Most accurate method if properly implemented

2. **UTM parameter matching (fallback method):**
   - Customer clicks Google Ad with UTM parameters
   - BeProfit tracks customer session and associates UTM parameters with subsequent order
   - Less accurate if customer journey spans multiple sessions or devices

3. **Conversion Import API:**
   - If store sends conversion data to Google Ads via Conversion Import API, BeProfit may sync this data
   - Useful for offline conversions or CRM data

**Transaction ID matching:** If Google Ads conversion tracking passes `transaction_id`, BeProfit can directly match Google's reported conversion to the actual store order.

### Edge Cases

**Orders without Google Ads attribution:**
- If an order has no GCLID and no Google Ads UTM parameters, it is NOT attributed to Google Ads
- This is intentional in BeProfit's design to avoid misattributing organic search traffic

**Multi-channel orders (e.g., Facebook + Google):**
- **Last-click wins:** BeProfit uses last-click attribution, so the most recent marketing touchpoint gets 100% credit
- **GCLID overrides UTM:** If an order has both GCLID (Google Ads) and Facebook ad click, GCLID likely takes precedence if it's the last click

**SEO vs Google Ads confusion:**
- **Critical issue:** Without proper tracking, it's easy to misattribute organic Google Search traffic to Google Ads
- **BeProfit's solution:** Strict UTM-only attribution for Google Ads ensures only paid clicks are attributed
- **Trade-off:** This may under-attribute Google Ads if UTM parameters are not properly implemented

**Return/refund handling:**
- When an order is refunded, BeProfit reduces the attributed revenue for the Google Ads campaign
- ROAS is recalculated to reflect refunds
- Google Ads conversion tracking should also be updated to reflect refunds (via Conversion Adjustments API), but unclear if BeProfit handles this

**Performance Max campaigns:**
- **Challenge:** Performance Max campaigns are Google's newest campaign type (2021) and combine Search, Shopping, Display, YouTube, and Discovery into one campaign
- **Attribution complexity:** Performance Max uses AI to optimize across channels, making attribution more opaque
- **BeProfit's approach:** Unclear how BeProfit handles Performance Max - likely aggregates all Performance Max conversions at campaign level without channel breakdown

---

## Critical User Feedback: Incomplete Ad Spend Tracking

### The Problem

From a user review (January 7, 2026):

> "BeProfit only 'counts' ad spend that can be attributed via UTMs / converted traffic, and ignores the rest of the spend entirely, which massively inflates profit figures and makes the dashboard commercially unusable for any serious Google Ads advertiser (especially Performance Max / feed-based ecommerce)."

The reviewer reported:
- Connected Google Ads account with full permissions
- Only ~15% of actual ad spend was imported into BeProfit
- Remaining 85% of spend was ignored because it couldn't be attributed to conversions
- This inflated profit figures and made the tool unusable

### Why This Happens

**BeProfit's attribution approach:**
- BeProfit uses **strict UTM-only attribution** for Google Ads
- If a conversion does not have Google Ads UTM parameters, it is NOT attributed to Google Ads
- If ad spend does not result in attributable conversions, it is NOT synced to BeProfit

**Scenarios where ad spend is not tracked:**
1. **Brand awareness campaigns:** Top-of-funnel campaigns that don't drive direct conversions
2. **Display/Video campaigns:** These often have view-through conversions that are hard to track
3. **Performance Max campaigns:** Conversions may not have clear UTM attribution
4. **Incomplete UTM tagging:** If merchant does not properly tag all Google Ads campaigns with UTM parameters, spend is not tracked
5. **Cross-device conversions:** User clicks ad on mobile, purchases on desktop without UTM parameters
6. **Assisted conversions:** User clicks Google Ad, then clicks Facebook Ad, then purchases (Facebook gets credit, Google Ad spend is ignored)

### Impact on Profit Calculations

**If BeProfit only tracks attributed ad spend:**
- **Total Google Ads spend:** $10,000/month
- **Attributed spend (tracked by BeProfit):** $1,500/month (15%)
- **Unattributed spend (ignored by BeProfit):** $8,500/month (85%)
- **Calculated profit:** Inflated by $8,500 because $8,500 in costs are not accounted for
- **Result:** Dashboard shows false profitability

**This is a critical flaw** if true, as it makes BeProfit's profit calculations fundamentally inaccurate for Google Ads advertisers.

### Is This a Google Ads-Specific Issue?

The reviewer specifically mentioned Google Ads, but it's unclear if the same issue affects Facebook Ads, TikTok Ads, etc.

**BeProfit's attribution documentation suggests this IS a Google Ads-specific issue:**
- **Facebook Ads:** BeProfit uses automatic attribution based on customer visits to compensate for tracking limitations
- **Google Ads:** BeProfit uses strict UTM-only attribution to avoid misattributing organic search

This means BeProfit may sync **all Facebook Ads spend** regardless of attribution, but only syncs **attributed Google Ads spend**.

### Our Competitive Opportunity

**If this limitation is real, it's a MASSIVE opportunity for our product:**

1. **Always sync total ad spend** from Google Ads API, regardless of attribution
2. **Show both metrics:**
   - Total spend: $10,000
   - Attributed spend: $1,500 (15%)
   - Unattributed spend: $8,500 (85% - ⚠️ Warning: High unattributed spend)
3. **Flag attribution gaps:** Alert user when attribution percentage is low
4. **Provide recommendations:** Suggest adding UTM parameters, enabling auto-tagging, or using GCLID capture

**This single feature could justify switching from BeProfit** for serious Google Ads advertisers.

---

## Troubleshooting & Limitations

### Common Connection Issues

**OAuth token expiration:**
- **Frequency:** Google OAuth tokens can be long-lived (no expiration) if refresh token is used, but can be revoked by user or expire due to inactivity
- **Symptom:** Google Ads data stops syncing, "Connection error" message in BeProfit
- **Solution:** User must re-authenticate via OAuth to refresh token

**"Insufficient permissions" error:**
- **Cause:** User's Google account does not have Admin access to Google Ads account
- **Solution:** Google Ads account owner must grant user Admin access
- **Alternative:** Account owner can connect Google Ads to BeProfit instead

**Google Ads account not appearing:**
- **Cause 1:** User does not have access to Google Ads account
- **Cause 2:** Google Ads account is suspended or disabled
- **Solution:** Verify access in Google Ads Manager, contact Google Ads support if account is suspended

**Sync stuck or incomplete:**
- **Cause:** API rate limits, Google Ads API downtime, or large campaign volume
- **Solution:** Wait 1-2 hours and check if sync completes, contact BeProfit support if persistent

**Conversion tracking not syncing:**
- **Cause:** Google Ads conversion tracking not properly set up, or conversion action is paused
- **Solution:** Verify conversion tracking in Google Ads Manager, ensure conversion actions are active

### Known Limitations

**1. Incomplete ad spend tracking (CRITICAL)**

As discussed, BeProfit may only track attributed ad spend, not total ad spend. This is a **deal-breaker limitation** for serious Google Ads advertisers.

**2. No YouTube Ads breakdown**

YouTube Ads are part of Google Ads, but BeProfit likely rolls YouTube Ad performance into Video campaigns without separate breakdown. Merchants cannot see YouTube Ad performance separately.

**3. Performance Max opacity**

Performance Max campaigns combine Search, Shopping, Display, YouTube, and Discovery. BeProfit likely aggregates Performance Max conversions at campaign level without channel breakdown, making it hard to understand which channels within Performance Max are performing.

**4. No keyword-level insights**

BeProfit likely does NOT sync keyword-level data for Search campaigns. Merchants who want to optimize Search campaigns at the keyword level must use Google Ads Manager directly.

**5. No Search Terms report**

Google Ads provides a "Search Terms" report showing actual search queries that triggered ads. BeProfit likely does NOT sync this data.

**6. No ad creative insights**

BeProfit likely does NOT sync ad creative performance (which headlines/descriptions perform best in Responsive Search Ads). Focus is on campaign/ad group level, not creative optimization.

**7. Manager account (MCC) limitations**

**Unclear:** Can users with Google Ads Manager accounts (MCC) connect multiple sub-accounts to BeProfit, or only one account at a time?

**Likely limitation:** BeProfit may only support one Google Ads account per BeProfit account, requiring agencies to maintain separate BeProfit accounts for each client.

**8. Shopping campaign product-level insights**

**Unclear:** Does BeProfit show product-level performance for Shopping campaigns, or only campaign-level aggregates?

**Likely limitation:** BeProfit may only sync campaign or product group level data, not individual product performance.

**9. No campaign editing from BeProfit**

BeProfit is read-only. Users cannot create, edit, pause, or optimize campaigns from BeProfit dashboard. All campaign management must be done in Google Ads Manager.

**10. Conversion import not supported**

If merchant uses Google Ads Conversion Import API to import offline conversions (e.g., phone sales, in-store purchases), BeProfit may not sync this data.

### Pricing Tier Requirements

**Available on:** All plans (Free, Basic, Premium, Plus)

**Feature restrictions by tier:**
- **Not documented:** BeProfit does not publicly specify if Google Ads integration has feature restrictions by tier
- **Likely restrictions:**
  - **Free plan:** May limit historical data access (e.g., last 30 days only)
  - **Premium/Plus plans:** Likely offer unlimited historical data and more frequent sync

---

## Inferred UI Elements

### Settings > Integrations Page

**Connection card:**
```
┌─────────────────────────────────────────────────┐
│ Google Ads                            [Google]  │
│ ─────────────────────────────────────────────── │
│ Status: ✅ Connected                            │
│ Account: John's Boutique Ads                    │
│ Customer ID: 123-456-7890                       │
│ Last synced: 6 hours ago                        │
│                                                 │
│ Total spend (last 30 days): $8,450.00          │
│ Attributed revenue: $28,900.00                  │
│ ROAS: 3.42x                                     │
│                                                 │
│ ⚠️ Attribution rate: 18% (Low - check UTM tags)│
│                                                 │
│ [Reconnect] [Disconnect] [Settings]            │
└─────────────────────────────────────────────────┘
```

**Note:** The attribution rate warning is a hypothetical feature we could add if BeProfit's limitation is real.

### Dashboard - Google Ads Widget

```
┌─────────────────────────────────────────────────┐
│ Google Ads Performance          [Last 30 days] │
│ ─────────────────────────────────────────────── │
│ 💰 Spend:          $8,450.00                    │
│ 💵 Revenue:        $28,900.00                   │
│ 📈 Gross ROAS:     3.42x                        │
│ 💡 Net Profit:     $6,120.50                    │
│ 📊 Net ROAS:       1.72x  ⚠️ (after all costs)  │
│ ─────────────────────────────────────────────── │
│ 🎯 Conversions:    287                          │
│ 💸 CPA:            $29.44                       │
│ 👆 Clicks:         5,678                        │
│ 💲 CPC:            $1.49                        │
│                                                 │
│ [View Campaigns] [View Attribution Report]     │
└─────────────────────────────────────────────────┘
```

### Google Ads Campaign Report

| Campaign Name | Type | Spend | Conv. | Revenue | Gross ROAS | Net Profit | Net ROAS |
|--------------|------|-------|-------|---------|-----------|-----------|---------|
| Shopping - All Products | SHOPPING | $3,200 | 142 | $12,400 | 3.88x | $3,450 | 2.08x |
| Search - Brand | SEARCH | $890 | 67 | $8,200 | 9.21x | $3,120 | 4.51x ⭐ |
| Performance Max - 2026 | PERFORMANCE_MAX | $2,450 | 51 | $6,100 | 2.49x | $820 | 1.33x |
| Display - Retargeting | DISPLAY | $1,120 | 18 | $1,800 | 1.61x | -$180 | 0.84x ⚠️ |
| Search - Generic | SEARCH | $790 | 9 | $400 | 0.51x | -$620 | 0.22x ⚠️ |

**Campaign Type Breakdown:**
- Search campaigns
- Shopping campaigns
- Display campaigns
- Video campaigns (YouTube)
- Discovery campaigns
- Performance Max campaigns

**Drill-down:** Click campaign to see ad group performance.

---

## Data Model Implications

### Google Ads Connection

```typescript
interface GoogleAdsConnection {
  id: string; // UUID
  storeId: string; // Parent store/user

  // Google Ads account details
  customerId: string; // Google Ads Customer ID (e.g., "1234567890")
  accountName: string; // User-friendly account name
  managerId?: string; // If connected via MCC, the manager account ID

  // OAuth credentials
  accessToken: string; // Encrypted OAuth access token
  refreshToken: string; // Encrypted refresh token (long-lived)
  tokenExpiry?: Date; // Access token expiry (may not expire if refresh token works)

  // Sync configuration
  syncFrequency: 'hourly' | 'every_4_hours' | 'daily';
  lastSyncedAt: Date;
  lastSyncStatus: 'success' | 'error' | 'in_progress';
  lastSyncError?: string;

  // Attribution settings
  attributionWindow: {
    clickDays: number; // Default: 30
    viewDays: number; // Default: 1
  };

  // Historical data range
  historicalImportDate: Date; // Earliest data imported

  // Status
  status: 'connected' | 'disconnected' | 'error' | 'token_expired';
  createdAt: Date;
  updatedAt: Date;
}
```

### Google Ads Campaign

```typescript
interface GoogleAdsCampaign {
  id: string; // UUID (our internal ID)
  connectionId: string; // Foreign key to GoogleAdsConnection

  // Google Ads campaign details
  googleCampaignId: string; // Google's campaign ID
  name: string;
  status: 'enabled' | 'paused' | 'removed';
  campaignType: 'SEARCH' | 'SHOPPING' | 'DISPLAY' | 'VIDEO' | 'DISCOVERY' | 'PERFORMANCE_MAX' | 'SMART' | 'LOCAL';

  // Budget
  budgetAmount: number; // Daily budget
  currency: string; // USD, EUR, GBP, etc.

  // Dates
  startDate: Date;
  endDate?: Date;

  // Performance metrics
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;

  // Conversion metrics
  conversions: number;
  conversionValue: number;
  cpa: number;
  roas: number;

  // Profit metrics (calculated by our app)
  attributedRevenue: number;
  cogs: number;
  shippingCost: number;
  transactionFees: number;
  netProfit: number;
  netRoas: number;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
}
```

### Google Ads Ad Group

```typescript
interface GoogleAdsAdGroup {
  id: string;
  connectionId: string;
  campaignId: string;

  // Google Ads ad group details
  googleAdGroupId: string;
  googleCampaignId: string;
  name: string;
  status: 'enabled' | 'paused' | 'removed';
  type: 'SEARCH_STANDARD' | 'DISPLAY_STANDARD' | 'SHOPPING_PRODUCT_ADS' | 'VIDEO_TRUE_VIEW_IN_DISPLAY' | 'VIDEO_TRUE_VIEW_IN_STREAM';

  // Bid strategy
  cpcBid?: number; // Manual CPC bid (if applicable)

  // Performance metrics
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  conversionValue: number;
  cpa: number;
  roas: number;

  // Profit metrics
  netProfit: number;
  netRoas: number;

  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
}
```

### Google Ads Conversion Event

```typescript
interface GoogleAdsConversion {
  id: string;
  connectionId: string;
  orderId: string; // Foreign key to Order table

  // Google Ads attribution
  googleCampaignId: string;
  googleAdGroupId?: string;
  googleKeywordId?: string; // For Search campaigns

  // Conversion details
  conversionType: 'Purchase' | 'AddToCart' | 'BeginCheckout';
  conversionValue: number;
  conversionTime: Date;

  // Attribution details
  clickTime?: Date;
  gclid?: string; // Google Click Identifier
  attributionType: 'click' | 'view';
  daysToConversion: number;

  // Matching method
  matchingMethod: 'gclid' | 'utm' | 'conversion_import';

  createdAt: Date;
}
```

---

## Comparison: Google Ads vs Facebook Ads in BeProfit

| Aspect | Google Ads | Facebook Ads |
|--------|-----------|--------------|
| **Attribution Method** | UTM-only (strict) | Automatic + UTM (lenient) |
| **Default Attribution Window** | 30-day click, 1-day view | 7-day click, 1-day view |
| **Click Identifier** | GCLID | fbclid |
| **Campaign Types** | Search, Shopping, Display, Video, Performance Max | Single campaign type (with placement targeting) |
| **Organic Traffic Risk** | High (Google Search vs Google Ads) | Low (Facebook organic ≠ Facebook Ads) |
| **Conversion Delay** | Higher (30-day window, offline imports) | Lower (7-day window, real-time Pixel) |
| **iOS 14+ Impact** | Lower (web-based conversions) | Higher (app-based tracking limited) |
| **Ad Spend Tracking Issue** | Only attributed spend synced (per user review) | May sync all spend (unclear) |

**Key takeaway:** BeProfit treats Google Ads and Facebook Ads very differently, with Google Ads having stricter attribution to avoid SEO confusion.

---

## Relevance to Our Build

### Critical for Our Competing Product

**1. Google Ads is non-negotiable**

Google Ads is the **#2 advertising platform** for e-commerce (after Facebook Ads). Any profit analytics tool without Google Ads integration is incomplete.

**Market data:**
- 60%+ of e-commerce brands advertise on Google (Search + Shopping)
- Google Shopping is often the highest ROAS channel for product-based businesses
- Many brands spend more on Google Ads than Facebook Ads

**Our product MUST:**
- Support Google Ads integration on MVP (launch day)
- Match or exceed BeProfit's Google Ads feature set
- **Solve the incomplete ad spend tracking issue** (if real, this is a critical opportunity)

**2. Complete ad spend tracking is critical**

If BeProfit only tracks attributed ad spend for Google Ads, this is our **biggest competitive opportunity**.

**Our approach:**
- **Always sync total ad spend** from Google Ads API
- **Show attribution breakdown:**
  - Total spend: $10,000
  - Attributed spend: $2,000 (20%)
  - Unattributed spend: $8,000 (80% - ⚠️ Low attribution rate)
- **Provide recommendations:**
  - "Your attribution rate is low. Consider enabling auto-tagging in Google Ads settings."
  - "Add UTM parameters to all campaigns to improve attribution."
- **Educational content:** Explain why some spend cannot be attributed (brand awareness, cross-device, assisted conversions)

**This could be the feature that wins customers from BeProfit.**

**3. GCLID tracking is essential**

GCLID is the most accurate way to attribute Google Ads conversions to orders. We must:
- Capture `gclid` parameter on all landing pages
- Store `gclid` with order data
- Pass `gclid` to Google Ads for conversion tracking
- Use `gclid` to match Google Ads conversions to orders

**Technical implementation:**
- Add JavaScript to capture `gclid` and store in cookie
- Pass `gclid` to checkout and store with order
- Sync `gclid` with Google Ads via Conversion Tracking or Conversion Import API

**4. Google Shopping is critical for e-commerce**

Google Shopping campaigns are often the highest ROAS channel for product-based businesses. We must:
- Sync Shopping campaign data at product group level (not just campaign level)
- Show which products drive the most profit from Google Shopping
- Integrate with product catalog to show ROAS by product

**Differentiator:** If BeProfit only shows campaign-level Shopping data, we can win by showing product-level insights.

**5. Performance Max is the future**

Performance Max is Google's newest campaign type and is replacing Smart Shopping and Local campaigns. We must:
- Support Performance Max campaign syncing
- Handle Performance Max's multi-channel nature (Search, Shopping, Display, YouTube, Discovery)
- Provide channel breakdown within Performance Max (if Google Ads API allows)

**Challenge:** Performance Max is deliberately opaque (Google controls optimization), so we may only be able to show campaign-level aggregates.

**6. Attribution window flexibility**

Google Ads default is 30-day click attribution, but some businesses prefer 7-day or 90-day. We should:
- Allow users to configure attribution windows (Premium feature)
- Show attribution comparison (7-day vs 30-day vs 90-day ROAS)
- Explain trade-offs (longer window = more attributed conversions, but less certainty)

---

## Competitive Differentiation Opportunities

### If BeProfit Can't Do This, We Can

**1. Complete ad spend tracking**

As discussed, if BeProfit only tracks attributed spend, we win by tracking total spend and showing attribution breakdown.

**2. Product-level Google Shopping insights**

If BeProfit only shows campaign-level Shopping data, we can:
- Show ROAS by product
- Identify top-performing products in Shopping campaigns
- Recommend products to promote based on ROAS

**3. Search Terms report**

Google Ads provides a Search Terms report showing actual search queries. If BeProfit doesn't sync this, we can:
- Sync search terms data
- Show which search queries drive profit
- Recommend negative keywords to reduce wasted spend

**4. Keyword-level insights**

If BeProfit aggregates at campaign/ad group level, we can:
- Sync keyword-level data for Search campaigns
- Show ROAS by keyword
- Recommend bid adjustments or keyword pauses

**5. Manager account (MCC) support**

If BeProfit limits users to one Google Ads account, we can:
- Support multiple Google Ads accounts per user
- Agency dashboard for managing multiple clients
- Cross-client comparison reports

**6. Advanced attribution models**

Google Ads supports data-driven attribution, but BeProfit likely uses last-click only. We can:
- Respect Google Ads' attribution model setting
- Allow users to switch between attribution models
- Show attribution comparison reports

---

## Technical Challenges

### What We Need to Build

**1. Google Ads API integration**
- OAuth 2.0 with refresh token management
- API wrapper for Google Ads API v16+ (latest version as of 2026)
- Rate limit handling (10,000 operations per day per developer token)
- Error handling (Google Ads API errors can be cryptic)

**2. GCLID capture and storage**
- JavaScript to capture `gclid` from URL parameter
- Cookie/session storage for `gclid`
- Pass `gclid` to checkout and store with order
- Match `gclid` to Google Ads conversion data

**3. UTM parameter tracking**
- Capture UTM parameters on all sessions
- Associate UTM parameters with orders
- Match UTM-tagged orders to Google Ads campaigns

**4. Complete ad spend syncing**
- Sync ALL campaign spend from Google Ads API, not just attributed spend
- Calculate attribution rate (attributed spend ÷ total spend)
- Alert users when attribution rate is low

**5. Historical data import**
- Batch import 90 days of historical data
- Handle API rate limits (queue requests)
- Show progress during import

**6. Daily snapshot storage**
- Store daily snapshots of campaign performance
- Handle retroactive conversion attribution updates
- Efficient storage (millions of rows over time)

**7. Profit calculation**
- Match Google Ads conversions to orders
- Pull COGS from product data
- Calculate net profit (revenue - ad spend - COGS - shipping - fees)
- Calculate net ROAS

---

## Conclusion

Google Ads integration is **essential** for any e-commerce profit analytics tool. BeProfit has a mature Google Ads integration, but there is a critical opportunity:

**If BeProfit only tracks attributed ad spend** (not total spend), this is a **massive competitive advantage** for us. We can win by:
1. Always syncing total ad spend
2. Showing attribution breakdown
3. Alerting users to low attribution rates
4. Providing recommendations to improve attribution

**Other differentiation opportunities:**
- Product-level Google Shopping insights
- Search Terms report
- Keyword-level insights
- Manager account (MCC) support for agencies
- Advanced attribution models

**Critical success factors:**
- GCLID tracking (most accurate attribution method)
- Complete ad spend syncing (not just attributed spend)
- Clear communication of attribution limitations
- Fast, reliable syncing (daily or hourly)

**Next steps:**
1. Validate the "incomplete ad spend tracking" issue (is it real?)
2. Build Google Ads API integration with OAuth
3. Implement GCLID capture and UTM tracking
4. Design attribution matching engine
5. Test with real Google Ads accounts to ensure accuracy
