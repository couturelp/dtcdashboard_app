# BeProfit TikTok Ads Integration

## Source
- **URLs:**
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing - confirms TikTok Ads integration)
  - https://beprofit.co/integrations/ (BeProfit integrations page)
  - https://sourceforge.net/software/product/BeProfit/integrations/ (BeProfit integrations list)
  - https://beprofit.co/a/blog/tiktok-vs-facebook-ads-for-e-commerce-which-is-best (TikTok vs Facebook Ads comparison)
  - https://help.runviably.com/beprofit (BeProfit Help Center)
  - https://support.beprofit.co/support/solutions/articles/67000687449-utm-attribution-overview (UTM Attribution Overview)
- **Category:** Integrations / Ad Platforms / TikTok Ads
- **Date Captured:** 2026-02-13

---

## Integration Overview

TikTok Ads is one of BeProfit's **featured native integrations**, listed alongside Facebook Ads and Google Ads as a top-tier ad platform. However, TikTok Ads integration is **newer and less mature** than Facebook and Google integrations, reflecting TikTok's recent rise as an e-commerce advertising platform (TikTok Ads Manager launched for global brands in 2020, with rapid growth 2021-2026).

BeProfit's TikTok Ads integration allows merchants to:
- **Automatically sync ad spend data** from TikTok Ads campaigns
- **Attribute revenue to TikTok campaigns** using TikTok Pixel and UTM parameters
- **Calculate net profit ROAS** by factoring in COGS, shipping, fees, and other expenses
- **Track performance metrics** including CPC, CPA, ROAS, conversions, and video views
- **Compare TikTok Ads to other channels** (Facebook, Google) in unified dashboard

### TikTok Ads Market Context

**TikTok's explosive growth in e-commerce advertising:**
- **2020:** TikTok launched TikTok For Business (global ad platform) and TikTok Pixel
- **2021-2023:** Rapid adoption by DTC brands, especially in fashion, beauty, and lifestyle verticals
- **2024-2026:** TikTok Ads becomes **#3 advertising platform** for e-commerce (after Facebook and Google)
- **Key demographics:** Gen Z and Millennial consumers (age 18-34)
- **Format strength:** Short-form video ads, creator partnerships, shoppable videos

**Why merchants use TikTok Ads:**
- Lower CPCs than Facebook Ads (less saturated market, as of 2024-2025)
- High engagement rates (TikTok's algorithm favors entertaining content)
- Strong performance for impulse-buy products (fashion, beauty, gadgets)
- TikTok Shop integration (direct in-app checkout, rolled out 2023-2024)

**BeProfit's positioning:** BeProfit positions TikTok Ads as a critical platform for modern DTC brands, with blog content like "TikTok vs. Facebook Ads for e-Commerce: Which is Best?" showing the platform's importance.

---

## Connection Setup

### Prerequisites

**What the user needs before connecting:**
- Active TikTok Ads Manager account (formerly TikTok For Business)
- Admin or Operator access to the TikTok Ads account
- TikTok Pixel installed on store (recommended for conversion tracking)
- At least one active or historical campaign in TikTok Ads
- BeProfit account (available on all pricing tiers)

**Recommended but not required:**
- TikTok Pixel Events configured (ViewContent, AddToCart, CompletePayment)
- UTM parameters on TikTok Ads campaigns (fallback attribution method)
- TikTok Shop integration (if selling via TikTok Shop)

**Not required:**
- No technical knowledge required (OAuth handles authentication)
- No manual API token generation
- No TikTok Business Center setup (though it may help for multi-account management)

### Inferred OAuth Flow

Based on standard TikTok Marketing API OAuth 2.0 practices and BeProfit's user-friendly approach:

```
1. User navigates to BeProfit Settings > Integrations > Ad Platforms
2. User clicks "Connect TikTok Ads" button
3. BeProfit redirects to TikTok OAuth consent screen
4. User logs into TikTok For Business account (if not already logged in)
5. TikTok displays permission request screen:
   - App Name: "BeProfit"
   - Permissions requested:
     * View ad account data
     * View campaign and ad performance
     * View conversion data (TikTok Pixel events)
6. User selects which TikTok Ads account(s) to connect
   - If user has multiple ad accounts, they select one or more
7. User clicks "Authorize" to grant BeProfit access
8. TikTok redirects back to BeProfit with OAuth access token
9. BeProfit displays "Connection Successful" message
10. Initial sync begins:
    - Progress indicator: "Syncing TikTok Ads data... Please wait"
    - Historical data import: Last 90 days (inferred)
    - Estimated time: 2-10 minutes depending on campaign volume
11. User redirected to BeProfit dashboard showing TikTok Ads data
```

### OAuth Permissions Requested

**Inferred TikTok Marketing API OAuth scopes:**

| Scope | Purpose | Required? |
|-------|---------|-----------|
| `ad_account.info.read` | Read ad account information | ✅ Critical |
| `campaign.list` | List campaigns | ✅ Critical |
| `adgroup.list` | List ad groups | ✅ Critical |
| `ad.list` | List ads | ✅ Critical |
| `reporting.data.read` | Access campaign performance data (spend, impressions, clicks, conversions) | ✅ Critical |
| `pixel.data.read` | Access TikTok Pixel event data | Recommended |

**Write permissions:** BeProfit does NOT request write permissions (read-only integration).

### Requirements

- **TikTok Ads account:** Active account with Admin or Operator role
- **TikTok Pixel:** Recommended for accurate conversion tracking (but BeProfit can use UTM fallback)
- **Multi-account support:** Unclear if BeProfit supports multiple TikTok Ads accounts per user
- **Minimum tier:** All plans (Free, Basic, Premium, Plus) - confirmed in Shopify App Store listing

---

## Data Synced

### Campaign Data

**Campaign-level fields synced from TikTok Ads:**

| Field | TikTok Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Campaign ID | `campaign_id` | Unique identifier |
| Campaign Name | `campaign_name` | User-friendly name |
| Campaign Status | `status` | ENABLE, DISABLE, DELETE |
| Campaign Objective | `objective_type` | CONVERSIONS, TRAFFIC, APP_INSTALL, VIDEO_VIEWS, REACH, etc. |
| Budget | `budget` | Daily or lifetime budget |
| Budget Mode | `budget_mode` | BUDGET_MODE_DAY or BUDGET_MODE_TOTAL |
| Campaign Start Date | `create_time` or user-set start date | |
| Campaign End Date | User-set end date (if applicable) | |
| **Spend Metrics** | | |
| Total Spend | `spend` | Total ad spend in account currency |
| **Performance Metrics** | | |
| Impressions | `impressions` | Number of times ads shown |
| Clicks | `clicks` | Total clicks on ads |
| CTR | `ctr` | Click-through rate (%) |
| CPC | `cpc` | Cost per click |
| CPM | `cpm` | Cost per 1,000 impressions |
| **Video Metrics** | | |
| Video Views | `video_views` | Number of video views (2s+) |
| Video Watch Time | `video_watch_time` | Total watch time in seconds |
| Video Completion Rate | Calculated: `video_complete / impressions` | % of videos watched to completion |
| **Conversion Metrics** | | |
| Conversions | `conversion` | Total conversions (e.g., Purchase events) |
| Conversion Value | `conversion_value` | Revenue attributed to campaign |
| CPA | `cost_per_conversion` | Cost per acquisition |
| ROAS | Calculated: `conversion_value / spend` | Return on ad spend (gross) |

**TikTok-specific metrics:** TikTok Ads emphasizes video metrics (views, watch time, completion rate) more than Facebook/Google, reflecting the platform's video-first nature.

### Ad Group Data

**Ad Group-level fields synced:**

| Field | TikTok Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Ad Group ID | `adgroup_id` | Unique identifier |
| Ad Group Name | `adgroup_name` | User-friendly name |
| Campaign ID | `campaign_id` | Parent campaign link |
| Ad Group Status | `status` | ENABLE, DISABLE, DELETE |
| Targeting Summary | `placements`, `locations`, `age`, `gender`, `interests` | Simplified targeting description |
| Schedule | `schedule_start_time`, `schedule_end_time` | When ad group runs |
| Optimization Goal | `optimization_goal` | CONVERSION, CLICK, IMPRESSION, etc. |
| Bid Strategy | `bid_type` | BID_TYPE_NO_BID (auto), BID_TYPE_CUSTOM (manual) |
| **Spend & Performance** | | |
| Spend, Impressions, Clicks, CTR, CPC, CPM | `spend`, `impressions`, `clicks`, etc. at ad group level | |
| Video Views, Watch Time, Completion Rate | Video metrics at ad group level | |
| Conversions, Conversion Value, CPA, ROAS | Conversion metrics at ad group level | |

### Ad Data (Creative Level)

**Ad-level fields synced:**

| Field | TikTok Ads API Field | BeProfit Use |
|-------|---------------------|--------------|
| Ad ID | `ad_id` | Unique identifier |
| Ad Name | `ad_name` | User-friendly name |
| Ad Group ID | `adgroup_id` | Parent ad group link |
| Ad Format | `creative_type` | VIDEO, IMAGE, CAROUSEL (TikTok is primarily video) |
| Ad Status | `status` | ENABLE, DISABLE, DELETE |
| Video Duration | `video_duration` | Length of video ad in seconds |
| Call-to-Action | `call_to_action` | SHOP_NOW, LEARN_MORE, DOWNLOAD, etc. |
| **Spend & Performance** | | |
| Spend, Impressions, Clicks, CTR, CPC | Metrics at ad level | |
| Video Views, Watch Time, Completion Rate | Video metrics at ad level | |
| Conversions, CPA, ROAS | Conversion metrics at ad level | |

**Creative assets:** BeProfit likely does NOT sync actual video files or thumbnails due to API limitations and storage requirements. Only metadata is synced.

### TikTok Pixel Events

**Conversion events tracked via TikTok Pixel:**

| Event Type | TikTok Pixel Event | BeProfit Use |
|------------|-------------------|--------------|
| Purchase | `CompletePayment` | Primary conversion event, linked to orders |
| Add to Cart | `AddToCart` | Micro-conversion, funnel analysis (may not be synced) |
| Initiate Checkout | `InitiateCheckout` | Micro-conversion (may not be synced) |
| View Content | `ViewContent` | Top-of-funnel engagement (likely not synced) |
| Add Payment Info | `AddPaymentInfo` | Checkout funnel step (likely not synced) |

**Note:** BeProfit likely only syncs **CompletePayment** (Purchase) events, as other events are not directly relevant to profit tracking.

**Conversion value:** TikTok Pixel passes `value` parameter with CompletePayment events, which BeProfit uses to calculate attributed revenue.

---

## Sync Details

### Sync Frequency

**Automatic sync:**
- **Frequency:** BeProfit claims "real-time" or "automatic" syncing, but TikTok Ads data is likely synced **daily** or **every few hours**
- **Why not truly real-time:** TikTok Marketing API has rate limits, and conversion data has natural delay
- **Daily refresh:** BeProfit's marketing materials state "data refreshes daily"
- **Batch processing:** BeProfit likely runs batch sync jobs once daily (early morning) or every 4-6 hours

**Manual refresh:**
- **User-triggered refresh:** Likely available via "Refresh" button (not confirmed in documentation)
- **Use case:** Merchants can manually trigger sync for latest data

**Real-time vs delayed:**
- **Typical delay:** 4-24 hours behind TikTok Ads Manager
- **Why delayed:**
  - TikTok Ads API data is not real-time (reflects data from previous day)
  - TikTok's attribution window (7-day click, 1-day view by default) means conversions are attributed retroactively
  - BeProfit's batch sync schedule adds delay

### Historical Data Import

**Initial sync:**
- **Import range:** Likely **90 days of historical data** on first connection
- **Reasoning:** TikTok Marketing API supports historical data, but BeProfit may limit initial import to avoid long sync times
- **Campaign types:** All campaign types imported (Traffic, Conversions, App Install, Video Views)

**Ongoing sync:**
- **Continuous forward sync:** Once connected, BeProfit syncs new data daily
- **No automatic backfill:** Historical data before initial connection is not re-synced

### Data Freshness

**Typical delay timeline:**

| Timeframe | Data Freshness |
|-----------|---------------|
| Today | Not available (conversion delay + sync delay) |
| Yesterday | Partial data (conversions still being attributed) |
| Last 7 days | Mostly complete |
| Last 30 days | Complete and stable |

**Conversion lag:** TikTok Ads conversions can be attributed retroactively within the attribution window (7-day click by default), meaning data for the past 7 days may change as new conversions are attributed.

---

## Attribution Methodology

### Attribution Window

**Default attribution window in TikTok Ads:**
- **7-day click attribution:** Conversions counted if user clicked ad within last 7 days
- **1-day view attribution:** Conversions counted if user viewed ad within last 24 hours

**Configurable in TikTok Ads Manager:** Users can customize attribution windows (e.g., 1-day click, 7-day click, 28-day click). Unclear if BeProfit allows configuring this within BeProfit, or if it inherits settings from TikTok Ads Manager.

**BeProfit's approach:** Based on BeProfit's general attribution documentation:
- **Automatic attribution:** For TikTok Ads (like Facebook Ads), BeProfit likely uses automatic attribution based on customer visits to compensate for tracking limitations
- **UTM-based fallback:** If TikTok Pixel is not installed, BeProfit uses UTM parameter matching

Unlike Google Ads (where BeProfit uses strict UTM-only attribution), TikTok Ads likely gets the same lenient treatment as Facebook Ads.

### TikTok Pixel Tracking

**How TikTok Pixel works:**
1. Merchant installs TikTok Pixel on their store (JavaScript snippet)
2. TikTok Pixel fires events as customers interact with site (ViewContent, AddToCart, CompletePayment)
3. When customer completes purchase, Pixel fires `CompletePayment` event with `value` (order total) and `content_id` (product SKUs)
4. TikTok matches Pixel events to ad clicks/views within attribution window
5. TikTok Ads Manager shows attributed conversions

**BeProfit's use of TikTok Pixel:**
- BeProfit likely captures TikTok Click ID (`ttclid` parameter) from URL and stores it with order
- BeProfit matches TikTok conversions to orders via `ttclid` or transaction ID
- If Pixel is not installed, BeProfit falls back to UTM parameter matching

### ttclid (TikTok Click Identifier)

**How ttclid works:**
- When user clicks a TikTok Ad, TikTok appends `ttclid` parameter to landing page URL (e.g., `https://store.com/?ttclid=xyz123`)
- Store captures `ttclid` and stores it with session/order
- When order is placed, store sends `ttclid` to TikTok via Pixel or Conversions API
- TikTok matches `ttclid` to ad click and attributes conversion

**BeProfit's use of ttclid:**
- BeProfit likely captures `ttclid` from order data and uses it to match TikTok conversions to orders
- Most accurate attribution method if Pixel is properly implemented

### UTM Parameter Tracking

**Standard TikTok Ads UTM parameters:**
- `utm_source=tiktok`
- `utm_medium=cpc`
- `utm_campaign={campaign_name}`
- `utm_content={ad_id}`

BeProfit tracks customer sessions with UTM parameters and attributes orders to TikTok Ads campaigns based on last touchpoint before purchase.

### Order Matching

**How BeProfit links TikTok Ads conversions to store orders:**

1. **ttclid matching (primary method):**
   - Store captures `ttclid` parameter and stores it with order
   - BeProfit matches `ttclid` to TikTok Ads conversion data
   - Most accurate method if Pixel is implemented

2. **UTM parameter matching (fallback method):**
   - Customer clicks TikTok Ad with UTM parameters
   - BeProfit tracks customer session and associates UTM parameters with order
   - Less accurate if customer journey spans multiple sessions or devices

3. **TikTok Pixel transaction ID matching:**
   - If Pixel passes `transaction_id` (order ID), BeProfit can directly match TikTok's reported conversion to store order

### Edge Cases

**Orders without TikTok Ads attribution:**
- If order has no TikTok ad click/view in attribution window, it is NOT attributed to TikTok Ads

**Multi-channel orders (e.g., TikTok + Facebook):**
- BeProfit uses last-click attribution, so most recent marketing touchpoint gets 100% credit

**Return/refund handling:**
- When order is refunded, BeProfit reduces attributed revenue for TikTok Ads campaign
- ROAS recalculated to reflect refunds

**TikTok Shop vs external website orders:**
- **TikTok Shop:** In-app checkout on TikTok (rolled out 2023-2024 in US, UK, and other markets)
- **External website:** User clicks ad and completes purchase on merchant's website
- **Attribution difference:** TikTok Shop orders have perfect attribution (no cross-device/cross-browser issues), while external website orders rely on Pixel/UTM tracking
- **BeProfit's handling:** Unclear if BeProfit can separate TikTok Shop orders from website orders, or if they're rolled together

---

## Maturity Comparison: TikTok Ads vs Facebook/Google Ads

### TikTok Ads Integration is Newer and Less Mature

**Evidence that TikTok Ads integration is less mature:**

1. **Platform age:**
   - Facebook Ads: Active since 2007, BeProfit integration likely since 2020-2021
   - Google Ads: Active since 2000, BeProfit integration likely since 2020-2021
   - TikTok Ads: Active globally since 2020, BeProfit integration likely 2021-2023

2. **Feature parity:**
   - Facebook/Google Ads: Well-documented, stable APIs, mature tracking pixels
   - TikTok Ads: Newer API, Pixel tracking launched 2020, still evolving

3. **Documentation availability:**
   - Facebook/Google Ads: Extensive BeProfit Help Center articles, tutorials, troubleshooting guides
   - TikTok Ads: Less public documentation about BeProfit's specific TikTok integration

4. **User adoption:**
   - Facebook/Google Ads: Used by 70%+ of e-commerce brands
   - TikTok Ads: Used by 30-40% of e-commerce brands (growing rapidly)

### Likely Feature Gaps

**Features TikTok Ads integration may lack compared to Facebook/Google:**

1. **Less granular reporting:**
   - Facebook/Google: Campaign → Ad Set/Ad Group → Ad level drill-down
   - TikTok: May only offer campaign and ad group level (no ad-level insights)

2. **No creative asset syncing:**
   - Facebook/Google: May sync creative thumbnails or metadata
   - TikTok: Likely no video asset syncing (storage/bandwidth constraints)

3. **Simpler attribution:**
   - Facebook/Google: Mature attribution models, multiple window options
   - TikTok: Basic last-click attribution only

4. **Limited historical data:**
   - Facebook/Google: May import 1+ years of historical data
   - TikTok: May only import 90 days (shorter platform history)

5. **No TikTok Shop breakdown:**
   - TikTok Shop is a new feature (2023-2024 rollout)
   - BeProfit may not distinguish between TikTok Shop orders and external website orders

6. **Less troubleshooting support:**
   - Facebook/Google: Well-documented connection issues and solutions
   - TikTok: Fewer Help Center articles, newer integration with less user feedback

### Why Maturity Matters

**For our competing product:**
- TikTok Ads is the **#3 ad platform** for e-commerce (after Facebook and Google)
- The platform is **growing fast** (especially with Gen Z and Millennial shoppers)
- BeProfit's TikTok integration may have gaps we can exploit

**Opportunity:** If BeProfit's TikTok Ads integration is less mature, we can differentiate by:
- Offering deeper TikTok Ads insights (ad-level performance, creative insights)
- Supporting TikTok Shop order separation
- Providing better TikTok Pixel setup guidance
- Syncing video creative thumbnails for performance comparison

---

## Troubleshooting & Limitations

### Common Connection Issues

**OAuth token expiration:**
- **Frequency:** TikTok OAuth tokens may expire after 60-90 days (similar to Facebook)
- **Symptom:** TikTok Ads data stops syncing, "Connection error" in BeProfit
- **Solution:** User must re-authenticate to refresh token

**"Insufficient permissions" error:**
- **Cause:** User's TikTok account does not have Admin or Operator role
- **Solution:** Ad account owner must grant appropriate permissions

**TikTok Ads account not appearing:**
- **Cause:** User does not have access to account, or account is suspended
- **Solution:** Verify access in TikTok Ads Manager

**TikTok Pixel not tracking conversions:**
- **Cause:** Pixel not properly installed, or CompletePayment event not firing
- **Solution:** Use TikTok Pixel Helper (browser extension) to debug, verify event firing on order confirmation page

### Known Limitations

**1. No TikTok Shop order breakdown**

TikTok Shop (in-app checkout) is a new feature. BeProfit may not distinguish between:
- **TikTok Shop orders:** Completed entirely within TikTok app
- **External website orders:** User clicks ad and completes purchase on merchant's website

**Impact:** Merchants selling via TikTok Shop cannot see which channel (in-app vs external) performs better.

**Our opportunity:** Support TikTok Shop order separation if BeProfit doesn't.

**2. Limited video creative insights**

TikTok is a video-first platform, but BeProfit likely does NOT sync:
- Video creative thumbnails
- Which specific videos/hooks perform best
- Creative asset library with performance tagging

**Impact:** Merchants must manually track which video creatives drive best ROAS.

**Our opportunity:** Sync video thumbnails and creative performance if BeProfit doesn't.

**3. No TikTok Spark Ads tracking**

TikTok Spark Ads allow brands to promote organic TikTok posts (creator content or brand's own posts). It's unclear if BeProfit:
- Syncs Spark Ads performance separately
- Distinguishes Spark Ads from standard video ads

**Our opportunity:** Support Spark Ads tracking if BeProfit doesn't.

**4. No creator partnership tracking**

TikTok Creator Marketplace connects brands with creators for sponsored content. If BeProfit doesn't track:
- Creator-driven sales
- Influencer marketing ROI
- Affiliate/partnership conversions

**Our opportunity:** Integrate with TikTok Creator Marketplace API for influencer ROI tracking.

**5. Multi-account support unclear**

**Unknown:** Can users with multiple TikTok Ads accounts (e.g., agencies) connect multiple accounts to BeProfit?

**Likely limitation:** BeProfit may only support one TikTok Ads account per BeProfit account.

**6. No campaign editing from BeProfit**

BeProfit is read-only. Users cannot create, edit, or pause TikTok Ads campaigns from BeProfit dashboard.

**7. Incomplete ad spend tracking?**

**Critical question:** Does BeProfit have the same "incomplete ad spend tracking" issue with TikTok Ads as reported for Google Ads?

**Unknown:** No user reviews specifically mention this for TikTok Ads, but BeProfit's general approach (automatic attribution for non-Google platforms) suggests TikTok Ads may NOT have this issue.

### Pricing Tier Requirements

**Available on:** All plans (Free, Basic, Premium, Plus) - confirmed in Shopify App Store listing

**Feature restrictions by tier:**
- **Not documented:** No public information on tier-based restrictions for TikTok Ads
- **Likely restrictions:**
  - Free plan: May limit historical data access (e.g., last 30 days only)
  - Premium/Plus: Likely offer unlimited historical data and more frequent sync

---

## Inferred UI Elements

### Settings > Integrations Page

**Connection card:**
```
┌─────────────────────────────────────────────────┐
│ TikTok Ads                          [TikTok]   │
│ ─────────────────────────────────────────────── │
│ Status: ✅ Connected                            │
│ Account: John's Boutique TikTok Ads            │
│ Account ID: 7123456789012345678                 │
│ Last synced: 8 hours ago                        │
│                                                 │
│ Total spend (last 30 days): $3,240.00          │
│ Attributed revenue: $12,150.00                  │
│ ROAS: 3.75x                                     │
│                                                 │
│ [Reconnect] [Disconnect] [Settings]            │
└─────────────────────────────────────────────────┘
```

### Dashboard - TikTok Ads Widget

```
┌─────────────────────────────────────────────────┐
│ TikTok Ads Performance          [Last 30 days] │
│ ─────────────────────────────────────────────── │
│ 💰 Spend:          $3,240.00                    │
│ 💵 Revenue:        $12,150.00                   │
│ 📈 Gross ROAS:     3.75x                        │
│ 💡 Net Profit:     $2,830.50                    │
│ 📊 Net ROAS:       1.87x  ⚠️ (after all costs)  │
│ ─────────────────────────────────────────────── │
│ 🎯 Conversions:    142                          │
│ 💸 CPA:            $22.82                       │
│ 👆 Clicks:         2,340                        │
│ 💲 CPC:            $1.38                        │
│ 🎥 Video Views:    45,600                       │
│ ⏱️ Avg Watch Time: 4.2s                         │
│                                                 │
│ [View Campaigns] [View Attribution Report]     │
└─────────────────────────────────────────────────┘
```

**TikTok-specific metrics:** Video Views and Avg Watch Time are unique to TikTok (not shown for Facebook/Google).

### TikTok Ads Campaign Report

| Campaign Name | Spend | Conv. | Revenue | Gross ROAS | Net Profit | Net ROAS | Video Views | Avg Watch |
|--------------|-------|-------|---------|-----------|-----------|---------|------------|----------|
| Spring Fashion 2026 | $1,450 | 67 | $5,800 | 4.00x | $1,420 | 1.98x | 18,400 | 5.2s |
| Retargeting - Cart | $890 | 42 | $4,200 | 4.72x | $1,280 | 2.44x | 6,700 | 7.8s ⭐ |
| Lookalike - Purchasers | $900 | 33 | $2,150 | 2.39x | $130 | 1.14x | 20,500 | 3.1s |

**Video performance correlation:** TikTok campaigns with higher average watch time often have better ROAS (engaged viewers are more likely to convert).

---

## Data Model Implications

### TikTok Ads Connection

```typescript
interface TikTokAdsConnection {
  id: string; // UUID
  storeId: string;

  // TikTok Ads account details
  advertiserId: string; // TikTok Ads advertiser ID
  accountName: string;
  businessCenterId?: string; // If using TikTok Business Center

  // OAuth credentials
  accessToken: string; // Encrypted
  refreshToken?: string;
  tokenExpiry: Date;

  // Sync configuration
  syncFrequency: 'hourly' | 'every_4_hours' | 'daily';
  lastSyncedAt: Date;
  lastSyncStatus: 'success' | 'error' | 'in_progress';
  lastSyncError?: string;

  // Attribution settings
  attributionWindow: {
    clickDays: number; // Default: 7
    viewDays: number; // Default: 1
  };

  // Status
  status: 'connected' | 'disconnected' | 'error' | 'token_expired';
  createdAt: Date;
  updatedAt: Date;
}
```

### TikTok Ad Campaign

```typescript
interface TikTokAdCampaign {
  id: string;
  connectionId: string;

  // TikTok campaign details
  tiktokCampaignId: string;
  name: string;
  status: 'enable' | 'disable' | 'delete';
  objective: 'CONVERSIONS' | 'TRAFFIC' | 'APP_INSTALL' | 'VIDEO_VIEWS' | 'REACH' | 'ENGAGEMENT';
  budgetMode: 'BUDGET_MODE_DAY' | 'BUDGET_MODE_TOTAL';
  budget: number;
  currency: string;

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

  // Video metrics (TikTok-specific)
  videoViews: number; // 2s+ views
  videoWatchTime: number; // Total seconds watched
  videoCompletionRate: number; // % watched to completion

  // Conversion metrics
  conversions: number;
  conversionValue: number;
  cpa: number;
  roas: number;

  // Profit metrics
  attributedRevenue: number;
  cogs: number;
  shippingCost: number;
  transactionFees: number;
  netProfit: number;
  netRoas: number;

  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
}
```

### TikTok Ad Conversion Event

```typescript
interface TikTokAdConversion {
  id: string;
  connectionId: string;
  orderId: string;

  // TikTok attribution
  tiktokCampaignId: string;
  tiktokAdGroupId: string;
  tiktokAdId: string;

  // Conversion details
  conversionType: 'CompletePayment' | 'AddToCart' | 'InitiateCheckout';
  conversionValue: number;
  conversionTime: Date;

  // Attribution details
  clickTime?: Date;
  ttclid?: string; // TikTok Click ID
  attributionType: 'click' | 'view';
  daysToConversion: number;

  // Matching method
  matchingMethod: 'ttclid' | 'utm' | 'pixel_transaction_id';

  createdAt: Date;
}
```

---

## Relevance to Our Build

### Critical for Our Competing Product

**1. TikTok Ads is essential for modern DTC brands**

TikTok is the **#3 ad platform** for e-commerce (after Facebook and Google) and the **fastest-growing** platform. Any profit analytics tool without TikTok Ads integration is incomplete for brands targeting Gen Z and Millennials.

**Market data:**
- 40%+ of DTC brands (especially fashion, beauty, lifestyle) advertise on TikTok
- TikTok CPCs are often 20-40% lower than Facebook Ads (less saturated market)
- TikTok Shop (in-app checkout) is driving massive growth in social commerce

**Our product MUST:**
- Support TikTok Ads integration on MVP (launch day) or shortly after
- Match or exceed BeProfit's TikTok Ads feature set
- Support TikTok-specific metrics (video views, watch time, completion rate)

**2. TikTok Ads integration is less mature - opportunity for differentiation**

Since TikTok Ads is a newer platform (2020-2026) and BeProfit's integration is likely less mature than Facebook/Google, we have opportunities to:
- Build a **better TikTok Ads integration** than BeProfit
- Support features BeProfit may lack (TikTok Shop breakdown, Spark Ads tracking, creator ROI)
- Provide better TikTok Pixel setup guidance and troubleshooting

**3. TikTok Shop integration is critical**

TikTok Shop (in-app checkout) is driving massive social commerce growth. We must:
- Track TikTok Shop orders separately from external website orders
- Show performance comparison: TikTok Shop vs external website
- Support TikTok Shop-specific features (live shopping, product showcase)

**Our differentiator:** If BeProfit doesn't separate TikTok Shop from external orders, we can win by providing this breakdown.

**4. Video creative insights are essential**

TikTok is video-first. Merchants need to know which video creatives drive best ROAS. We should:
- Sync video creative thumbnails
- Show which videos/hooks perform best
- Track creative asset performance over time
- Provide creative recommendations based on performance data

**Our differentiator:** If BeProfit doesn't provide creative-level insights, we can win here.

**5. TikTok Pixel tracking must be rock-solid**

TikTok Pixel is newer than Facebook Pixel (launched 2020) and merchants often struggle with setup. We should:
- Provide clear TikTok Pixel installation guide
- Offer Pixel health check (verify events firing correctly)
- Debug mode to troubleshoot tracking issues
- Auto-detect missing Pixel and prompt user to install

**6. Attribution must handle TikTok's unique characteristics**

TikTok attribution has unique challenges:
- **Short-form video:** Users scroll quickly, may not remember seeing ad
- **TikTok Shop vs external:** In-app checkout vs external website attribution differs
- **Creator content:** Spark Ads (promoted organic posts) have different attribution than standard ads
- **Cross-platform:** TikTok users often discover products on TikTok, purchase on website later

**Our approach:**
- Support ttclid (TikTok Click ID) tracking
- UTM fallback if Pixel not installed
- Handle TikTok Shop orders with perfect attribution
- Track assisted conversions (TikTok touchpoint before Facebook/Google conversion)

---

## Competitive Differentiation Opportunities

### If BeProfit Can't Do This, We Can

**1. TikTok Shop order separation**

If BeProfit rolls TikTok Shop and external website orders together, we can:
- Separate TikTok Shop performance from external website
- Show attribution accuracy: TikTok Shop (100%) vs external website (70%+)
- Recommend focusing on TikTok Shop if attribution is poor on external site

**2. Video creative performance insights**

If BeProfit doesn't show creative-level insights, we can:
- Sync video thumbnails from TikTok API
- Show which videos drive best ROAS
- Track creative performance over time
- Recommend winning creatives to scale

**3. TikTok Spark Ads tracking**

If BeProfit doesn't separate Spark Ads (promoted organic posts) from standard ads, we can:
- Track Spark Ads performance separately
- Show ROI of creator partnerships
- Recommend when to use Spark Ads vs standard video ads

**4. TikTok Creator Marketplace integration**

If BeProfit doesn't track influencer marketing ROI, we can:
- Integrate with TikTok Creator Marketplace API
- Track creator-driven sales and ROAS
- Calculate influencer marketing ROI
- Recommend top creators based on performance

**5. Advanced video metrics**

TikTok provides rich video engagement data. We can:
- Show correlation between video watch time and ROAS
- Identify optimal video length for conversions
- Track 3-second view rate, 6-second view rate, completion rate
- Recommend video optimizations based on engagement data

**6. TikTok Pixel health monitoring**

Many merchants struggle with Pixel setup. We can:
- Real-time Pixel health check
- Alert when Pixel stops firing events
- Detect common Pixel issues (events firing on wrong pages, missing parameters)
- Provide step-by-step debugging guide

---

## Conclusion

TikTok Ads integration is **essential** for any e-commerce profit analytics tool targeting modern DTC brands. TikTok is the **#3 ad platform** and the **fastest-growing** platform for e-commerce advertising.

**BeProfit has TikTok Ads integration**, but it's likely **less mature** than Facebook/Google integrations, creating opportunities for differentiation.

**Key opportunities for our product:**
1. **TikTok Shop order separation** (in-app vs external website)
2. **Video creative performance insights** (which videos drive best ROAS)
3. **TikTok Spark Ads tracking** (promoted organic posts)
4. **Creator marketplace integration** (influencer marketing ROI)
5. **Advanced video metrics** (watch time, completion rate correlation with ROAS)
6. **TikTok Pixel health monitoring** (real-time Pixel troubleshooting)

**Critical success factors:**
- ttclid tracking for accurate attribution
- Support for TikTok Shop (in-app checkout)
- Video-specific metrics (views, watch time, completion rate)
- Creative-level insights
- Clear Pixel setup guidance

**Next steps:**
1. Build TikTok Marketing API integration
2. Implement ttclid capture and Pixel tracking
3. Support TikTok Shop order separation
4. Add video creative thumbnail syncing
5. Test with real TikTok Ads accounts to validate accuracy
