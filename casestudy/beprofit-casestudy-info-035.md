# BeProfit Facebook/Meta Ads Integration

## Source
- **URLs:**
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://beprofit.co/integrations/ (BeProfit integrations page)
  - https://help.runviably.com/beprofit (BeProfit Help Center)
  - https://support.beprofit.co/en/articles/8635856-utm-attribution-setup (UTM Attribution Setup)
  - https://support.beprofit.co/support/solutions/articles/67000687449-utm-attribution-overview (UTM Attribution Overview)
  - https://sourceforge.net/software/product/BeProfit/integrations/ (BeProfit integrations list)
  - https://beprofit.co/a/blog/advertise-on-facebook-like-an-e-commerce-pro (Facebook Ads strategies blog)
  - https://beprofit.co/a/blog/how-to-use-facebook-conversions-api-for-your-shopify-store (Facebook Conversions API guide)
- **Category:** Integrations / Ad Platforms / Facebook Ads
- **Date Captured:** 2026-02-13

---

## Integration Overview

Facebook/Meta Ads is one of BeProfit's **top-tier, native integrations** and is available on all pricing plans. BeProfit positions Facebook Ads integration as a core feature for profit tracking, allowing e-commerce merchants to:

- **Automatically sync ad spend data** from Facebook Ads campaigns
- **Attribute revenue to specific Facebook campaigns, ad sets, and ads**
- **Calculate true ROAS (Return on Ad Spend)** by factoring in all costs beyond just ad spend
- **Track performance metrics** including CPCs, CPMs, click-throughs, purchases, CPA, and ROAS
- **Monitor multi-channel attribution** across Facebook, Instagram, and Messenger ads

BeProfit's Facebook Ads integration is part of their broader "Ad Platforms" category, which allows merchants to "Monitor marketing profit-focused metrics and understand the true worth of your advertising channels."

### Key Value Proposition

Unlike Facebook Ads Manager, which shows gross ROAS, BeProfit calculates **net profit ROAS** by subtracting:
- Product costs (COGS)
- Shipping costs
- Transaction fees
- Marketplace fees
- Other operational expenses

This gives merchants a more accurate picture of which Facebook campaigns are actually profitable after all expenses are accounted for.

---

## Connection Setup

### Prerequisites

**What the user needs before connecting:**
- Active Facebook Business Manager account (recommended but may not be strictly required)
- Facebook Ads account with active or historical campaigns
- Admin or Advertiser access to the Facebook Ads account
- Facebook Pixel installed on store (recommended for conversion tracking, but BeProfit can work with UTM parameters as fallback)
- BeProfit account (Free, Basic, Premium, or Plus tier - Facebook Ads available on all plans)

**No prerequisites needed:**
- No manual API token generation required (OAuth handles authentication)
- No Facebook Marketing API knowledge required
- No technical implementation skills needed

### Inferred OAuth Flow

Based on standard Facebook Marketing API OAuth 2.0 practices and BeProfit's positioning as an easy-to-use SaaS platform, the connection flow likely follows this pattern:

```
1. User navigates to BeProfit Settings > Integrations > Ad Platforms
2. User clicks "Connect Facebook Ads" button
3. BeProfit redirects to Facebook OAuth consent screen
4. User logs into Facebook (if not already logged in)
5. Facebook displays permission request screen showing:
   - App Name: "BeProfit"
   - Permissions requested:
     * ads_read (read ad campaign data)
     * ads_management (manage ads - may be requested for broader access)
     * business_management (access Business Manager data)
     * read_insights (access campaign performance metrics)
   - Ad accounts available to connect
6. User selects which Facebook Ads account(s) to connect
7. User clicks "Continue" or "Authorize"
8. Facebook redirects back to BeProfit with OAuth access token
9. BeProfit displays "Connection Successful" message
10. Initial sync begins immediately:
    - Progress indicator: "Syncing Facebook Ads data..."
    - Historical data import: Last 90 days of campaign data (inferred)
    - Estimated time: 2-10 minutes depending on campaign volume
11. User redirected to BeProfit dashboard showing Facebook Ads data
```

### OAuth Permissions Requested

**Inferred Facebook Marketing API scopes:**

| Scope | Purpose | Required? |
|-------|---------|-----------|
| `ads_read` | Read ad account data, campaigns, ad sets, ads, and insights | ✅ Critical |
| `ads_management` | Broader access to ad account (may be requested even if not needed for writes) | ✅ Likely |
| `business_management` | Access Business Manager accounts and metadata | Recommended |
| `read_insights` | Access Facebook Insights data (impressions, clicks, conversions) | ✅ Critical |
| `public_profile` | Basic user profile information | ✅ Required by Facebook OAuth |
| `email` | User email address for account linking | ✅ Required |

**Write permissions:** BeProfit does NOT write data back to Facebook Ads - it is a **read-only integration**. BeProfit does not create, edit, or delete campaigns.

### Requirements

- **Facebook Business Manager:** Recommended for businesses with multiple ad accounts, but likely not strictly required for single ad account setups
- **Facebook Pixel:** Recommended for conversion tracking, but BeProfit can use UTM attribution as fallback if Pixel is not installed
- **Minimum tier:** All plans (Free, Basic, Premium, Plus)
- **Multi-account support:** Unclear from documentation if BeProfit allows connecting multiple Facebook Ads accounts simultaneously, or if users must switch between accounts

---

## Data Synced

### Campaign Data

**Campaign-level fields synced from Facebook Ads:**

| Field | Facebook Ads API Field | BeProfit Use |
|-------|----------------------|--------------|
| Campaign ID | `campaign.id` | Unique identifier, links to Facebook Ads |
| Campaign Name | `campaign.name` | User-friendly campaign name |
| Campaign Status | `campaign.status` | Active, Paused, Archived |
| Campaign Objective | `campaign.objective` | CONVERSIONS, TRAFFIC, BRAND_AWARENESS, etc. |
| Budget Type | `campaign.daily_budget` or `campaign.lifetime_budget` | Daily vs lifetime budget |
| Budget Amount | `campaign.daily_budget` or `campaign.lifetime_budget` | Budget in account currency |
| Campaign Start Date | `campaign.start_time` | When campaign began |
| Campaign End Date | `campaign.stop_time` | When campaign ends (if scheduled) |
| **Spend Metrics** | | |
| Total Spend | `insights.spend` | Total ad spend for date range |
| **Performance Metrics** | | |
| Impressions | `insights.impressions` | Number of times ads shown |
| Reach | `insights.reach` | Unique users who saw ads |
| Clicks | `insights.clicks` | Total clicks on ads |
| CTR | `insights.ctr` | Click-through rate |
| CPC | `insights.cpc` | Cost per click |
| CPM | `insights.cpm` | Cost per 1,000 impressions |
| **Conversion Metrics** | | |
| Conversions | `insights.actions` (filtered by conversion type) | Purchase events, add-to-carts, etc. |
| Conversion Value | `insights.action_values` | Revenue attributed to campaign |
| CPA | Calculated: `spend / conversions` | Cost per acquisition |
| ROAS | Calculated: `conversion_value / spend` | Return on ad spend (gross) |

**Note:** BeProfit syncs campaign data at multiple granularity levels - campaigns, ad sets, and ads - to allow drill-down analysis.

### Ad Set Data

**Ad Set-level fields synced:**

| Field | Facebook Ads API Field | BeProfit Use |
|-------|----------------------|--------------|
| Ad Set ID | `adset.id` | Unique identifier |
| Ad Set Name | `adset.name` | User-friendly name |
| Campaign ID | `adset.campaign_id` | Parent campaign link |
| Ad Set Status | `adset.status` | Active, Paused, Archived |
| Targeting Summary | `adset.targeting` | Geographic, demographic, interest targeting (likely simplified in UI) |
| Schedule | `adset.start_time`, `adset.end_time` | When ad set runs |
| Optimization Goal | `adset.optimization_goal` | CONVERSIONS, LINK_CLICKS, etc. |
| Bid Strategy | `adset.bid_strategy` | LOWEST_COST_WITHOUT_CAP, COST_CAP, etc. |
| **Spend & Performance** | | |
| Spend | `insights.spend` at ad set level | |
| Impressions, Clicks, CTR, CPC, CPM | `insights.*` at ad set level | |
| Conversions, CPA, ROAS | `insights.*` at ad set level | |

### Ad Data (Creative Level)

**Ad-level fields synced:**

| Field | Facebook Ads API Field | BeProfit Use |
|-------|----------------------|--------------|
| Ad ID | `ad.id` | Unique identifier |
| Ad Name | `ad.name` | User-friendly name |
| Ad Set ID | `ad.adset_id` | Parent ad set link |
| Creative Type | `ad.creative` | Image, Video, Carousel, Collection, etc. |
| Ad Status | `ad.status` | Active, Paused, Archived |
| **Spend & Performance** | | |
| Spend | `insights.spend` at ad level | |
| Impressions, Clicks, CTR, CPC, CPM | `insights.*` at ad level | |
| Conversions, CPA, ROAS | `insights.*` at ad level | |

**Creative metadata:** BeProfit likely does NOT sync the actual creative assets (images, videos) due to API limitations and storage requirements. Only metadata like creative type and format.

### Conversion Events

**Facebook Pixel / Conversions API events tracked:**

| Event Type | Facebook Event Name | BeProfit Use |
|------------|-------------------|--------------|
| Purchase | `Purchase` | Primary conversion event, links to orders |
| Add to Cart | `AddToCart` | Micro-conversion, funnel analysis |
| Initiate Checkout | `InitiateCheckout` | Micro-conversion, funnel analysis |
| View Content | `ViewContent` | Top-of-funnel engagement (likely not synced to BeProfit) |
| Lead | `Lead` | For lead gen campaigns (likely not applicable for e-commerce) |

**Conversion value:** Facebook passes `value` parameter with Purchase events, which BeProfit uses to calculate attributed revenue.

**Conversion matching:** BeProfit must match Facebook conversion events to actual Shopify/WooCommerce/Amazon orders. This is done via:
1. **Transaction ID matching** (most accurate) - Facebook Pixel passes order ID, BeProfit matches to store order
2. **UTM parameter matching** - If Pixel not used, BeProfit uses UTM parameters to attribute orders
3. **Customer journey matching** - BeProfit tracks customer sessions and attributes last-click or first-click based on their attribution rules

---

## Sync Details

### Sync Frequency

**Automatic sync:**
- **Frequency:** BeProfit claims "real-time" data syncing, but in practice, Facebook Ads data is likely synced **hourly** or **every few hours**
- **Why not truly real-time:** Facebook Marketing API has rate limits (200 calls per hour per user access token), making continuous real-time sync impractical
- **Daily refresh:** Data "refreshes daily to keep users on top of their numbers" (per BeProfit marketing materials)
- **Batch processing:** BeProfit likely runs batch sync jobs every 1-4 hours to pull updated insights data

**Manual refresh:**
- **User-triggered refresh:** Likely available via a "Refresh" button in BeProfit dashboard (not confirmed in documentation)
- **Use case:** Merchants can manually trigger sync if they need up-to-the-minute data for reporting

**Real-time vs delayed:**
- **Typical delay:** 2-4 hours behind Facebook Ads Manager
- **Why delayed:** Facebook's own attribution data takes time to stabilize (conversions attributed after view/click)

### Historical Data Import

**Initial sync:**
- **Import range:** Likely **90 days of historical data** on first connection (standard for Facebook Marketing API integrations)
- **Reasoning:** Facebook Ads API supports up to 37 months of historical data, but BeProfit may limit initial import to avoid rate limits and long sync times
- **Campaign history:** All campaigns (active, paused, archived) within the historical window are imported

**Ongoing sync:**
- **Continuous sync:** Once connected, BeProfit continuously syncs data going forward
- **No re-import:** Historical data before initial connection is not synced (unless user disconnects and reconnects)

### Data Freshness

**Typical delay timeline:**

| Timeframe | Data Freshness |
|-----------|---------------|
| Last 1 hour | Not available (sync delay) |
| Last 4 hours | Partial data (sync in progress) |
| Last 24 hours | Mostly complete |
| Last 7 days | Complete and stable |
| Older than 7 days | Fully stabilized |

**Attribution finalization:** Facebook's attribution windows (7-day click, 1-day view) mean conversion data can change retroactively as attribution is assigned. BeProfit likely re-syncs past 7-30 days periodically to capture updated attribution.

**Conversion lag:** Purchases made today may not be attributed to Facebook campaigns until 24-48 hours later, especially for view-through conversions.

---

## Attribution Methodology

### Attribution Window

**Default attribution window:** BeProfit likely uses Facebook's default attribution settings:
- **7-day click attribution:** Conversions counted if user clicked ad within last 7 days
- **1-day view attribution:** Conversions counted if user viewed ad within last 24 hours

**Configurable:** It is unclear from documentation whether BeProfit allows users to customize attribution windows within the BeProfit platform. More likely, BeProfit inherits whatever attribution settings are configured in Facebook Ads Manager.

**Attribution models supported by Facebook:**
- **Last-click:** Default model used by most merchants
- **First-click:** Available in Facebook Ads Manager but unclear if BeProfit exposes this
- **Linear:** Equal credit to all touchpoints
- **Time-decay:** More credit to recent touchpoints

**BeProfit's attribution approach:** Based on documentation, BeProfit uses **last-click attribution** with an exception:

> "BeProfit uses last-click attribution except for the following cases: If an order's last click is direct and first click is not direct, we attribute the order to the first click. If an order's last click is from the same source as the first click AND the last click has no UTM data, BeProfit attributes the order to the first click."

This suggests BeProfit applies its own attribution logic on top of Facebook's data, prioritizing UTM-based attribution.

### Multi-Touch Attribution

**How BeProfit handles multi-channel orders:**

If a customer's journey involves multiple touchpoints across platforms (e.g., Facebook Ad → Google Search → Direct), BeProfit must decide which platform gets credit.

**BeProfit's approach:**
- **Last-click priority:** The last marketing touchpoint before purchase gets credit
- **Exception for direct traffic:** If last click is direct (no UTM, no ad click), BeProfit looks back to first non-direct click
- **Platform-specific logic:** For Facebook and other ad platforms (except Google), BeProfit automatically attributes orders based on customer visits to "give you a better indication of your ad performance per platform, covering gaps created by iOS14 limitations"
- **Google exception:** For Google Ads, BeProfit attributes based on UTM data only to avoid attributing SEO-based orders to Google Ads

### Order Matching

**How BeProfit links Facebook conversions to store orders:**

1. **Pixel-based matching (primary method):**
   - Facebook Pixel fires `Purchase` event with `transaction_id` (order ID from Shopify/WooCommerce)
   - BeProfit matches Facebook conversion to store order by `transaction_id`
   - Most accurate method if Pixel is properly implemented

2. **UTM-based matching (fallback method):**
   - Customer clicks Facebook ad with UTM parameters (e.g., `?utm_source=facebook&utm_campaign=summer_sale`)
   - BeProfit tracks customer session and associates UTM parameters with subsequent order
   - Less accurate if customer journey spans multiple sessions or devices

3. **Customer journey tracking:**
   - BeProfit tracks customer visits and attributes orders based on last marketing touchpoint before purchase
   - Uses cookies and session data to connect ad clicks to purchases

**Transaction ID matching:** If Facebook Pixel passes `transaction_id` in the Purchase event, BeProfit can directly match Facebook's reported conversion to the actual store order. This is the most reliable method.

### Edge Cases

**Orders without Facebook attribution:**
- If an order has no Facebook ad click or view in attribution window, it is NOT attributed to Facebook
- These orders may be attributed to other channels (Google Ads, organic, direct) or marked as "unattributed"

**Multi-channel orders (e.g., Google + Facebook):**
- **Last-click wins:** BeProfit uses last-click attribution, so the most recent marketing touchpoint gets 100% credit
- **No fractional attribution:** BeProfit does not split credit between multiple channels (unlike data-driven attribution models)
- **Potential over-attribution:** If both Google and Facebook claim a conversion, BeProfit must decide which platform gets credit based on its attribution rules

**Return/refund handling in ad attribution:**
- **Refunds reduce attributed revenue:** When an order is refunded, BeProfit likely reduces the attributed revenue for the Facebook campaign that drove that order
- **ROAS recalculation:** Facebook campaign ROAS is updated to reflect refunds
- **Timing:** Refunds may take 24-48 hours to sync and update attribution data

**iOS 14+ tracking limitations:**
- Apple's App Tracking Transparency (ATT) framework limits Facebook's ability to track conversions
- BeProfit's approach: "For all ad platforms other than Google, BeProfit automatically attributes orders based on customer visits, done in order to give you a better indication of your ad performance per platform, covering gaps created by iOS14 limitations"
- This suggests BeProfit uses its own tracking (UTMs, session tracking) to supplement Facebook's limited iOS conversion data

---

## Troubleshooting & Limitations

### Common Connection Issues

**OAuth token expiration:**
- **Frequency:** Facebook access tokens typically expire after 60-90 days
- **Symptom:** Facebook Ads data stops syncing, BeProfit shows "Connection error" or "Reconnect required"
- **Solution:** User must re-authenticate via OAuth to refresh token
- **Prevention:** BeProfit should proactively notify users when token is about to expire

**"Insufficient permissions" error:**
- **Cause:** User's Facebook account does not have Admin or Advertiser access to the ad account
- **Solution:** Ad account owner must grant user appropriate permissions in Facebook Business Manager
- **Alternative:** Ad account owner can connect Facebook Ads to BeProfit instead

**Ad account not appearing in connection flow:**
- **Cause 1:** User does not have access to ad account in Facebook Business Manager
- **Cause 2:** Ad account is disabled or restricted by Facebook
- **Solution:** Verify access in Facebook Business Manager, contact Facebook support if account is restricted

**Sync stuck or incomplete:**
- **Cause:** API rate limits, Facebook API downtime, or large campaign volume
- **Solution:** Wait 1-2 hours and check if sync completes, contact BeProfit support if persistent

### Known Limitations

**Critical limitation: Incomplete ad spend tracking**

From user review (January 7, 2026):
> "BeProfit only 'counts' ad spend that can be attributed via UTMs / converted traffic, and ignores the rest of the spend entirely, which massively inflates profit figures and makes the dashboard commercially unusable for any serious Google Ads advertiser (especially Performance Max / feed-based ecommerce)."

While this review specifically mentions Google Ads, it raises the question: **Does BeProfit fully sync Facebook ad spend, or only attributed spend?**

**If BeProfit only syncs attributed spend:**
- **Problem:** Not all ad spend results in conversions. Brand awareness campaigns, top-of-funnel campaigns, and ads that drive untracked conversions (e.g., phone calls, in-store visits) would be excluded.
- **Impact:** Profit calculations would be inflated because not all ad costs are accounted for.
- **Recommendation for our product:** ALWAYS sync total ad spend from platform, even if attribution is imperfect.

**Instagram Ads rolled into Facebook Ads:**
- **Limitation:** Instagram Ads are part of Meta's advertising platform and likely rolled into Facebook Ads data in BeProfit
- **Impact:** Users cannot separate Instagram Ad performance from Facebook News Feed performance
- **Workaround:** Use campaign naming conventions to distinguish Instagram vs Facebook placements

**Messenger Ads rolled into Facebook Ads:**
- Similar to Instagram, Messenger Ads are likely rolled into Facebook Ads data without separate breakdown

**Cannot sync archived campaigns older than X days:**
- Facebook Marketing API may limit historical data access to 37 months
- BeProfit likely imports 90 days initially, so very old archived campaigns may not be accessible

**Multi-account limitation:**
- **Unknown:** Documentation does not specify if users can connect multiple Facebook Ads accounts (e.g., agency managing multiple clients)
- **Likely limitation:** BeProfit may only support one Facebook Ads account per BeProfit account, requiring users to switch accounts or maintain separate BeProfit accounts

**No campaign editing from BeProfit:**
- BeProfit is read-only - users cannot create, edit, or pause campaigns from BeProfit dashboard
- Users must manage campaigns in Facebook Ads Manager

**No creative performance insights:**
- BeProfit likely does not sync creative-level insights (which specific images/videos perform best)
- Focus is on campaign/ad set/ad performance, not creative asset testing

**Facebook Catalog sales attribution:**
- **Unclear:** If merchant uses Facebook/Instagram Shop with product catalog, it's unclear if BeProfit can attribute catalog sales separately from website sales
- **Likely limitation:** BeProfit may only track website conversions via Pixel, not native Facebook Shop orders

### Pricing Tier Requirements

**Available on:** All plans (Free, Basic, Premium, Plus)

**Feature restrictions by tier:**
- **Not documented:** BeProfit does not publicly specify if Facebook Ads integration has feature restrictions by tier
- **Likely restrictions:**
  - **Free plan:** May limit historical data access (e.g., last 30 days only)
  - **Premium/Plus plans:** Likely offer unlimited historical data and higher sync frequency

**No explicit tier gating:** Unlike some features that are Premium/Plus-only, Facebook Ads integration is prominently listed as available on all plans in Shopify App Store listing.

---

## Inferred UI Elements

Based on BeProfit's marketing materials, Shopify App Store listing, and standard SaaS analytics platform patterns, the Facebook Ads integration UI likely includes:

### Settings > Integrations Page

**Connection card:**
```
┌─────────────────────────────────────────────────┐
│ Facebook Ads                            [Meta]  │
│ ─────────────────────────────────────────────── │
│ Status: ✅ Connected                            │
│ Account: John's Boutique Ad Account            │
│ Account ID: act_1234567890                      │
│ Last synced: 2 hours ago                        │
│                                                 │
│ Total spend (last 30 days): $5,234.50          │
│ Attributed revenue: $18,450.00                  │
│ ROAS: 3.52x                                     │
│                                                 │
│ [Reconnect] [Disconnect] [Settings]            │
└─────────────────────────────────────────────────┘
```

**Settings options (inferred):**
- Attribution window configuration (if available)
- Campaign import filters (e.g., only sync active campaigns)
- Sync frequency preferences
- Currency settings

### Dashboard - Ad Spend Widget

**Widget showing Facebook Ads performance:**
```
┌─────────────────────────────────────────────────┐
│ Facebook Ads Performance        [Last 30 days] │
│ ─────────────────────────────────────────────── │
│ 💰 Spend:          $5,234.50                    │
│ 💵 Revenue:        $18,450.00                   │
│ 📈 Gross ROAS:     3.52x                        │
│ 💡 Net Profit:     $4,215.67                    │
│ 📊 Net ROAS:       1.81x  ⚠️ (after all costs)  │
│ ─────────────────────────────────────────────── │
│ 🎯 Conversions:    234                          │
│ 💸 CPA:            $22.35                       │
│ 👆 Clicks:         3,456                        │
│ 💲 CPC:            $1.51                        │
│                                                 │
│ [View Campaigns] [View Attribution Report]     │
└─────────────────────────────────────────────────┘
```

**Key differentiator:** BeProfit shows **Net ROAS** (after subtracting COGS, shipping, fees) in addition to Gross ROAS, which Facebook Ads Manager does not calculate.

### Attribution Report

**Drill-down report showing Facebook campaign performance:**

| Campaign Name | Spend | Conversions | Revenue | Gross ROAS | Net Profit | Net ROAS |
|--------------|-------|-------------|---------|-----------|-----------|---------|
| Summer Sale 2026 | $2,450 | 112 | $9,250 | 3.78x | $2,180 | 1.89x |
| Retargeting - Cart Abandoners | $1,120 | 67 | $5,200 | 4.64x | $1,450 | 2.29x |
| Prospecting - Lookalike 1% | $980 | 34 | $2,800 | 2.86x | $220 | 1.22x |
| Brand Awareness - Video | $684 | 21 | $1,200 | 1.75x | -$180 | 0.74x ⚠️ |

**Ad Set drill-down:** Clicking a campaign shows ad set performance within that campaign.

**Ad drill-down:** Clicking an ad set shows individual ad creative performance.

**Filters:**
- Date range selector
- Campaign status filter (Active, Paused, Archived)
- Objective filter (Conversions, Traffic, etc.)
- Sort by: Spend, ROAS, Net Profit, etc.

### Multi-Channel Attribution Report

**Report comparing performance across all ad platforms:**

| Platform | Spend | Attributed Revenue | Gross ROAS | Net ROAS | % of Total Spend |
|----------|-------|-------------------|-----------|---------|----------------|
| Facebook Ads | $5,234 | $18,450 | 3.52x | 1.81x | 47% |
| Google Ads | $3,890 | $14,200 | 3.65x | 1.92x | 35% |
| TikTok Ads | $1,450 | $4,800 | 3.31x | 1.65x | 13% |
| Other | $550 | $1,200 | 2.18x | 1.05x | 5% |
| **Total** | **$11,124** | **$38,650** | **3.47x** | **1.78x** | **100%** |

---

## Data Model Implications

For our competing product, we need to design database schema and API integrations to support Facebook Ads tracking. Here are the key data structures:

### Facebook Ads Connection

```typescript
interface FacebookAdsConnection {
  id: string; // UUID
  storeId: string; // Parent store/user

  // Facebook account details
  accountId: string; // Facebook Ads account ID (act_XXXXXXXXX)
  accountName: string; // User-friendly account name
  businessManagerId?: string; // Facebook Business Manager ID (optional)

  // OAuth credentials
  accessToken: string; // Encrypted OAuth access token
  tokenExpiry: Date; // When token expires (60-90 days)
  refreshToken?: string; // If Facebook provides refresh tokens

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

  // Historical data range
  historicalImportDate: Date; // Earliest data imported

  // Status
  status: 'connected' | 'disconnected' | 'error' | 'token_expired';
  createdAt: Date;
  updatedAt: Date;
}
```

### Facebook Ad Campaign

```typescript
interface FacebookAdCampaign {
  id: string; // UUID (our internal ID)
  connectionId: string; // Foreign key to FacebookAdsConnection

  // Facebook campaign details
  facebookCampaignId: string; // Facebook's campaign ID
  name: string;
  status: 'active' | 'paused' | 'archived' | 'deleted';
  objective: 'CONVERSIONS' | 'TRAFFIC' | 'BRAND_AWARENESS' | 'REACH' | 'APP_INSTALLS' | 'LEAD_GENERATION' | 'MESSAGES' | 'VIDEO_VIEWS';

  // Budget
  budgetType: 'daily' | 'lifetime';
  budgetAmount: number; // In account currency
  currency: string; // USD, EUR, GBP, etc.

  // Dates
  startDate: Date;
  endDate?: Date;

  // Performance metrics (aggregated from ad sets/ads)
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number; // Click-through rate
  cpc: number; // Cost per click
  cpm: number; // Cost per 1,000 impressions

  // Conversion metrics
  conversions: number; // Total conversions
  conversionValue: number; // Total revenue attributed
  cpa: number; // Cost per acquisition
  roas: number; // Return on ad spend (gross)

  // Profit metrics (calculated by our app)
  attributedRevenue: number; // Same as conversionValue
  cogs: number; // Cost of goods sold for attributed orders
  shippingCost: number;
  transactionFees: number;
  netProfit: number; // attributedRevenue - spend - cogs - shippingCost - transactionFees
  netRoas: number; // netProfit / spend

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
}
```

### Facebook Ad Set

```typescript
interface FacebookAdSet {
  id: string; // UUID (our internal ID)
  connectionId: string;
  campaignId: string; // Foreign key to FacebookAdCampaign

  // Facebook ad set details
  facebookAdSetId: string;
  facebookCampaignId: string;
  name: string;
  status: 'active' | 'paused' | 'archived';

  // Targeting (simplified)
  targetingSummary?: string; // "US, 25-45, Interested in Fashion"

  // Schedule
  startDate: Date;
  endDate?: Date;

  // Optimization
  optimizationGoal: 'CONVERSIONS' | 'LINK_CLICKS' | 'IMPRESSIONS' | 'REACH' | 'LANDING_PAGE_VIEWS';
  bidStrategy: 'LOWEST_COST_WITHOUT_CAP' | 'LOWEST_COST_WITH_BID_CAP' | 'COST_CAP' | 'TARGET_COST';

  // Performance metrics
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
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

### Facebook Ad (Creative Level)

```typescript
interface FacebookAd {
  id: string;
  connectionId: string;
  campaignId: string;
  adSetId: string;

  // Facebook ad details
  facebookAdId: string;
  facebookAdSetId: string;
  facebookCampaignId: string;
  name: string;
  status: 'active' | 'paused' | 'archived';

  // Creative metadata
  creativeType: 'image' | 'video' | 'carousel' | 'collection' | 'slideshow';
  creativeFormat?: string; // Single Image, Single Video, etc.

  // Performance metrics
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
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

### Facebook Ad Conversion Event

```typescript
interface FacebookAdConversion {
  id: string;
  connectionId: string;
  orderId: string; // Foreign key to Order table

  // Facebook attribution
  facebookCampaignId: string;
  facebookAdSetId: string;
  facebookAdId: string;

  // Conversion details
  conversionType: 'Purchase' | 'AddToCart' | 'InitiateCheckout';
  conversionValue: number;
  conversionTime: Date;

  // Attribution window
  clickTime?: Date; // When user clicked ad
  viewTime?: Date; // When user viewed ad
  attributionType: 'click' | 'view';
  daysToConversion: number; // Days between click/view and conversion

  // Matching method
  matchingMethod: 'transaction_id' | 'utm' | 'session_tracking';

  createdAt: Date;
}
```

### Daily Ad Spend Snapshot

For historical reporting and to handle retroactive attribution changes, we should store daily snapshots:

```typescript
interface FacebookAdDailySnapshot {
  id: string;
  connectionId: string;
  campaignId: string;
  adSetId?: string;
  adId?: string;

  // Date
  date: Date; // YYYY-MM-DD (date dimension)

  // Metrics snapshot
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  conversionValue: number;

  // Calculated metrics
  ctr: number;
  cpc: number;
  cpm: number;
  cpa: number;
  roas: number;

  // Sync metadata
  syncedAt: Date; // When this snapshot was captured

  createdAt: Date;
}
```

---

## Limitations & Gaps

### What Remains Unclear or Unconfirmed

**Attribution completeness:**
- **Critical question:** Does BeProfit sync ALL Facebook ad spend, or only spend that can be attributed to conversions?
- **User review concern:** One merchant reported that BeProfit "only counts ad spend that can be attributed via UTMs / converted traffic, and ignores the rest"
- **Our interpretation:** This is a deal-breaker limitation if true. A profit tracking tool MUST show total ad spend, even if some spend cannot be attributed to specific orders.
- **Recommendation for our product:** Always sync total spend from Facebook Ads API, even if attribution is incomplete.

**Multi-account support:**
- **Unclear:** Can users connect multiple Facebook Ads accounts (e.g., agency managing 5 clients)?
- **Likely limitation:** BeProfit may only support one Facebook Ads account per BeProfit account.

**Instagram Ads breakdown:**
- **Unclear:** Can users see Instagram Ad performance separately from Facebook News Feed ads?
- **Likely limitation:** Instagram Ads are rolled into Facebook Ads data without separate breakdown (Meta's API groups them together).

**Facebook Shop orders:**
- **Unclear:** If merchant sells via Facebook Shop or Instagram Shop, are those orders tracked separately?
- **Likely limitation:** BeProfit may only track website conversions via Pixel, not native Facebook Shop orders.

**Creative-level insights:**
- **Unclear:** Does BeProfit show which specific creative assets (images, videos) perform best?
- **Likely limitation:** BeProfit focuses on campaign/ad set/ad performance, not creative asset testing.

**Historical data limit:**
- **Unclear:** How far back can users import historical Facebook Ads data? 90 days? 1 year? All-time?
- **Inferred:** Likely 90 days on initial connection, with ongoing sync from connection date forward.

**Token refresh handling:**
- **Unclear:** Does BeProfit proactively refresh OAuth tokens before expiry, or do users have to manually reconnect every 60-90 days?
- **Best practice:** Proactive token refresh with user notification if refresh fails.

**Campaign-level filters:**
- **Unclear:** Can users exclude certain campaigns from syncing (e.g., test campaigns, brand awareness campaigns)?
- **Likely limitation:** BeProfit syncs all campaigns automatically without user control.

---

## Relevance to Our Build

### Critical for Our Competing Product

**1. Must-have feature: Facebook Ads integration is non-negotiable**

Facebook Ads is the **#1 advertising platform for DTC e-commerce brands**. Any profit analytics tool that does not have deep Facebook Ads integration will be dismissed immediately by potential customers.

**Market data:**
- 70%+ of e-commerce brands advertise on Facebook/Instagram
- Facebook Ads is often the largest single marketing expense
- Accurate Facebook Ad attribution is critical for profit tracking

**Our product MUST:**
- Support Facebook Ads integration on MVP (launch day)
- Match or exceed BeProfit's Facebook Ads feature set
- Solve BeProfit's limitation around incomplete ad spend tracking

**2. Attribution complexity: This is hard to get right**

Multi-touch attribution is one of the hardest problems in e-commerce analytics. Key challenges:

- **iOS 14+ tracking limitations:** Apple's ATT framework has crippled Facebook's conversion tracking
- **Cross-device journeys:** Customer clicks ad on phone, purchases on laptop
- **Multi-channel journeys:** Customer clicks Facebook ad, then Google ad, then purchases
- **Attribution window choices:** 7-day click? 28-day click? 1-day view?
- **First-click vs last-click vs linear:** Which attribution model is "right"?

**BeProfit's approach:**
- Last-click attribution with exception for direct traffic
- Automatic attribution to supplement iOS 14+ gaps
- UTM-based fallback when Pixel tracking is incomplete

**Our decision:**
- **Default to last-click attribution** (industry standard, easy to understand)
- **Offer configurable attribution windows** as premium feature (7-day, 28-day, 90-day)
- **Clearly communicate attribution methodology** to users (transparency builds trust)
- **Provide attribution model comparison** (show how numbers change under different models)

**3. OAuth security and token management**

Facebook's OAuth flow is complex, and token management is critical:

- **Access tokens expire after 60-90 days** - we need refresh logic
- **Scopes must be carefully requested** - too many scopes scare users, too few break functionality
- **Graceful handling of revoked permissions** - if user revokes access, don't crash
- **Business Manager vs Ad Account access** - we need to handle both scenarios

**Our implementation:**
- Proactive token refresh 7 days before expiry
- Email/in-app notification if refresh fails
- Clear explanation of permissions requested during OAuth
- Secure token storage (encrypted at rest)

**4. Complete ad spend tracking (BeProfit's weakness)**

**Critical differentiator:** If BeProfit only tracks attributed ad spend, this is a massive opportunity for us.

**Our approach:**
- **Always sync total ad spend** from Facebook Marketing API, regardless of attribution
- **Show both metrics:** "Total spend: $5,000 | Attributed spend: $4,200 (84%)"
- **Flag unattributed spend:** "⚠️ $800 in ad spend could not be attributed to orders. This may be due to brand awareness campaigns, incomplete tracking, or iOS 14+ limitations."
- **Educate users:** Explain why some spend cannot be attributed (not a bug, it's a Facebook limitation)

This single feature could be a major competitive advantage if BeProfit's limitation is as severe as reported.

**5. Real-time vs batch sync: Balance accuracy and cost**

Real-time sync is expensive:
- Facebook Marketing API has rate limits (200 calls/hour/token)
- Real-time queries would require dedicated infrastructure
- Facebook's attribution data takes time to stabilize anyway

**Our approach:**
- **Hourly sync for recent data** (last 7 days)
- **Daily sync for older data** (8-90 days ago)
- **Manual refresh button** with 5-minute cooldown
- **"Data as of X minutes ago" timestamp** to set expectations

BeProfit claims "real-time" but likely does hourly sync. We should match this and be honest about sync frequency.

**6. Attribution window flexibility: Power user feature**

BeProfit likely uses fixed 7-day click / 1-day view attribution. This is Facebook's default, but power users want options:

- **28-day click attribution:** For longer sales cycles
- **90-day attribution:** For high-ticket items
- **View-through attribution customization:** Some advertisers want 7-day view, others want 1-day

**Our differentiation:**
- **Configurable attribution windows** (Premium feature)
- **Attribution model comparison report:** "Here's your ROAS under 7-day, 28-day, and 90-day attribution"
- **Best practices guidance:** Help users choose the right attribution window for their business

---

## Competitive Differentiation Opportunities

### If BeProfit Can't Do This, We Can

**1. Separate Instagram Ads reporting**

If BeProfit rolls Instagram Ads into Facebook Ads without breakdown, we can differentiate by:
- Separate Instagram Ads performance dashboard
- Placement-level reporting (Facebook News Feed vs Instagram Feed vs Stories vs Reels)
- Creative format analysis (Image vs Video vs Carousel performance by placement)

**2. Advanced multi-touch attribution models**

BeProfit uses simple last-click attribution. We can offer:
- **First-click attribution:** Credit the first touchpoint
- **Linear attribution:** Equal credit to all touchpoints
- **Time-decay attribution:** More credit to recent touchpoints
- **Data-driven attribution:** Machine learning model assigns credit based on historical patterns
- **Attribution comparison view:** See how numbers change under different models

**3. Creative-level insights**

If BeProfit doesn't show creative asset performance, we can:
- Sync creative thumbnails from Facebook API
- Show which images/videos drive best ROAS
- Creative asset library with performance tagging
- "Top performing creatives" report for quick reference

**4. Complete ad spend tracking (if BeProfit's limitation is real)**

As discussed, if BeProfit only tracks attributed spend, we win by:
- Always showing total spend
- Clearly separating attributed vs unattributed spend
- Explaining attribution gaps to users

**5. Multi-account support for agencies**

If BeProfit limits users to one Facebook Ads account, we can:
- Support unlimited Facebook Ads accounts (per user tier)
- Agency dashboard: View all clients' Facebook Ads performance
- Client comparison report: Compare ROAS across clients
- White-label reports for agencies to share with clients

**6. Facebook Catalog & Shop integration**

If BeProfit doesn't track Facebook Shop orders, we can:
- Sync Facebook Catalog product performance
- Track Facebook Shop vs website conversions separately
- Dynamic Product Ads (DPA) performance insights
- Catalog product recommendations based on ad performance

---

## Technical Challenges

### What We Need to Build

**1. Facebook Marketing API integration**

- **OAuth 2.0 implementation** with proper scope management
- **API wrapper** to abstract Facebook's complex API
- **Rate limit handling:** 200 calls/hour/token - need queuing system
- **Error handling:** Facebook's API errors are notoriously opaque
- **Webhook support:** Facebook offers webhooks for real-time updates (advanced feature)

**2. Attribution matching engine**

- **Transaction ID matching:** Match Facebook Purchase events to store orders
- **UTM parameter tracking:** Capture and persist UTM parameters on customer sessions
- **Customer journey tracking:** Build session tracking to connect ad clicks to purchases
- **Multi-channel attribution logic:** Decide which platform gets credit when multiple channels are involved
- **Retroactive attribution updates:** Handle cases where Facebook updates attribution after initial sync

**3. OAuth token management**

- **Secure token storage:** Encrypt access tokens at rest
- **Proactive refresh:** Refresh tokens 7 days before expiry
- **Expiry detection:** Monitor for token expiry errors and prompt user to reconnect
- **Graceful degradation:** If token expires, show last synced data with clear messaging

**4. Historical data import**

- **Batch import job:** Import 90 days of historical data without hitting rate limits
- **Progress tracking:** Show user progress during initial sync ("45% complete...")
- **Resume capability:** If import fails mid-way, resume from last checkpoint
- **Campaign metadata sync:** Import campaign structures (campaigns → ad sets → ads)

**5. Daily snapshot storage**

- **Daily aggregation:** Store daily snapshots of ad performance for historical reporting
- **Retroactive updates:** When Facebook updates attribution, update historical snapshots
- **Data retention:** Decide how long to keep daily snapshots (1 year? 5 years? Forever?)

**6. Profit calculation engine**

- **Match Facebook conversions to orders:** Link Facebook's reported revenue to actual order data
- **Calculate COGS:** Pull product costs from inventory data
- **Add shipping costs:** Include shipping expenses in profit calculation
- **Add transaction fees:** Include payment processor fees, platform fees
- **Calculate net profit:** Revenue - ad spend - COGS - shipping - fees
- **Calculate net ROAS:** Net profit / ad spend

---

## Implementation Roadmap

### MVP (Launch Day)

**Must-have features:**
- Facebook Ads OAuth connection
- Campaign-level performance reporting (spend, ROAS, conversions)
- Basic attribution (last-click)
- Daily sync (not real-time)
- Total ad spend syncing (NOT just attributed spend - this is critical)
- Integration with Shopify orders for attribution matching

### Phase 2 (Post-MVP)

**Nice-to-have features:**
- Ad Set and Ad-level drill-down
- Configurable attribution windows
- Hourly sync for more frequent updates
- Historical data import beyond 90 days
- Multi-account support (for agencies)

### Phase 3 (Advanced Features)

**Differentiators:**
- Advanced multi-touch attribution models
- Creative-level insights with thumbnail syncing
- Instagram Ads breakdown
- Facebook Catalog & Shop integration
- Attribution model comparison reports
- Automated campaign optimization recommendations

---

## Conclusion

Facebook Ads integration is **table stakes** for any e-commerce profit analytics tool. BeProfit has a mature Facebook Ads integration, but there are clear opportunities to differentiate:

1. **Complete ad spend tracking** (if BeProfit's limitation is real)
2. **Configurable attribution windows** (7-day, 28-day, 90-day)
3. **Advanced multi-touch attribution models** (first-click, linear, time-decay, data-driven)
4. **Instagram Ads breakdown** (separate reporting)
5. **Multi-account support** (for agencies)
6. **Creative-level insights** (which images/videos perform best)

Our Facebook Ads integration must be **as good as BeProfit's** at minimum, with at least 1-2 clear differentiators to justify switching.

**Critical success factors:**
- Accurate attribution matching (Transaction ID > UTM > Session tracking)
- Complete ad spend syncing (total spend, not just attributed spend)
- Transparent attribution methodology (users understand how numbers are calculated)
- OAuth security and token management (no user pain around re-authentication)
- Fast, reliable syncing (hourly updates, minimal delay)

**Next steps for our team:**
1. Decide on MVP feature set (what ships on launch day)
2. Design database schema for Facebook Ads data
3. Build OAuth flow and token management system
4. Integrate with Facebook Marketing API
5. Build attribution matching engine
6. Test with real Facebook Ads accounts to validate accuracy
