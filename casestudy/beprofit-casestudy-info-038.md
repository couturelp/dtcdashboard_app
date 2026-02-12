# BeProfit Other Ad Platform Integrations

## Source
- **URLs:**
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://beprofit.co/integrations/ (BeProfit integrations page)
  - https://sourceforge.net/software/product/BeProfit/integrations/ (BeProfit integrations list - comprehensive platform list)
  - https://help.runviably.com/beprofit (BeProfit Help Center)
  - https://www.getapp.com/website-ecommerce-software/a/beprofit/ (GetApp review page)
  - https://www.capterra.com/p/214079/BeProfit/ (Capterra review page)
  - File 031: beprofit-casestudy-info-031.md (Integration Ecosystem Overview - ad platform list)
- **Category:** Integrations / Ad Platforms / Other Platforms
- **Date Captured:** 2026-02-13

---

## Overview

This document covers all ad platform integrations EXCEPT Facebook/Meta Ads, Google Ads, and TikTok Ads (covered in files 035, 036, 037). Based on research from BeProfit's integration listings and third-party review sites, BeProfit supports **10+ ad platforms**, making it one of the most comprehensive e-commerce profit analytics tools for multi-channel advertising.

### Ad Platform Coverage Summary

**Tier 1 (Full Native, Mature):**
- Facebook/Meta Ads (file 035)
- Google Ads (file 036)

**Tier 2 (Native, Newer):**
- TikTok Ads (file 037)
- Pinterest Ads
- Snapchat Ads (Snapchat for Business)

**Tier 3 (Native, Limited Documentation):**
- Microsoft Ads (Bing Ads)
- Outbrain
- Taboola

**Tier 4 (Status Unclear / Possibly In Development):**
- Instagram Ads (rolled into Facebook Ads)
- Amazon Ads (separate from Amazon Seller integration)
- Reddit Ads
- Twitter/X Ads
- LinkedIn Ads
- YouTube Ads (rolled into Google Ads Video campaigns)

### BeProfit's Ad Platform Strategy

**Key observations:**

1. **Focus on DTC-relevant platforms:** BeProfit prioritizes platforms where e-commerce brands advertise (Facebook, Google, TikTok, Pinterest, Snapchat), not B2B platforms (LinkedIn)

2. **Native integrations over Zapier:** BeProfit emphasizes native API integrations rather than relying on Zapier or webhooks for ad platforms

3. **Broad coverage:** With 10+ ad platforms, BeProfit has significantly more ad integrations than most competitors

4. **Tier-based availability:** Top 3 platforms (Facebook, Google, TikTok) are available on all plans. Other platforms may be tier-restricted (Premium/Plus).

---

## Pinterest Ads Integration

### Availability
- **Status:** Native integration
- **Tier Required:** Likely all plans, but may be Premium/Plus only (not confirmed)
- **Maturity:** Medium - Pinterest Ads is less popular than Facebook/Google/TikTok but established platform

### Pinterest Ads Market Context

**Platform characteristics:**
- **Primary audience:** Women (60%+ of users), age 25-54
- **Top verticals:** Fashion, home decor, DIY/crafts, food/recipes, beauty
- **Ad formats:** Pins (image ads), Video Pins, Shopping Pins, Carousel Pins
- **Conversion strength:** High purchase intent (users actively searching for ideas/products to buy)
- **Unique features:** Pinterest Lens (visual search), Pinterest Trends (keyword insights)

**Why merchants use Pinterest Ads:**
- High purchase intent (users are in "discovery mode" looking for products)
- Longer content lifespan (Pins continue driving traffic for months, unlike Facebook/TikTok)
- Lower CPCs than Facebook Ads (less saturated market)
- Strong performance for visual products (fashion, home decor, wedding, travel)

### Connection Setup (Inferred)

**Prerequisites:**
- Active Pinterest Ads account (formerly Pinterest Business account)
- Admin access to Pinterest Ads account
- Pinterest Tag installed on store (recommended for conversion tracking)
- BeProfit account

**Inferred OAuth flow:**
1. User navigates to BeProfit Settings > Integrations > Ad Platforms
2. User clicks "Connect Pinterest Ads"
3. BeProfit redirects to Pinterest OAuth consent screen
4. User authorizes BeProfit to access Pinterest Ads data
5. Initial sync begins (last 90 days, inferred)

### Data Synced (Inferred)

**Campaign-level data:**
- Campaign ID, Name, Status, Objective
- Budget (daily or lifetime)
- Spend, Impressions, Clicks, CTR, CPC, CPM
- Pin clicks, Outbound clicks (clicks to website)
- Saves (users saving Pin to their boards)
- Conversions (Purchase events from Pinterest Tag)
- Conversion value, CPA, ROAS

**Ad Group-level data:**
- Ad Group ID, Name, Status
- Targeting summary (demographics, interests, keywords)
- Spend, impressions, clicks, conversions

**Pin-level data (ads):**
- Pin ID, Pin image URL, Pin title, Pin description
- Ad format (Standard Pin, Video Pin, Carousel, Shopping Ad)
- Spend, impressions, clicks, conversions

### Sync Details

- **Sync frequency:** Likely daily (same as other ad platforms)
- **Historical data:** Likely 90 days on initial connection
- **Attribution window:** Pinterest default is 30-day click, 30-day view (longer than Facebook/Google)

### Attribution Methodology

**Pinterest Tag:**
- Pinterest Tag fires conversion events (PageVisit, AddToCart, Checkout, Purchase)
- BeProfit likely uses Pinterest Click ID or UTM parameters to attribute orders
- **Longer attribution window:** Pinterest's 30-day click / 30-day view window means more conversions may be attributed compared to Facebook (7-day)

**UTM fallback:** If Pinterest Tag not installed, BeProfit uses UTM parameters for attribution

### Limitations (Inferred)

- **Pinterest Shop orders:** Pinterest has in-app checkout (Pinterest Shop). Unclear if BeProfit separates Pinterest Shop orders from external website orders.
- **Organic Pins vs Promoted Pins:** Unclear if BeProfit can distinguish between organic Pin traffic and paid Pinterest Ads traffic.
- **Catalog sync:** Pinterest Shopping Ads use product catalogs. Unclear if BeProfit syncs product-level performance.
- **Tier restrictions:** Pinterest Ads may only be available on Premium/Plus plans (not confirmed).

### Relevance to Our Build

**Priority: Medium-High**
- Pinterest is the **#4-5 ad platform** for e-commerce (after Facebook, Google, TikTok)
- Critical for fashion, home decor, beauty, and lifestyle brands
- **If BeProfit supports Pinterest, we must too** (table stakes for visual product brands)

**Differentiation opportunities:**
- Product-level Shopping Ads insights (if BeProfit doesn't provide)
- Organic vs Paid Pin performance comparison
- Pinterest Trends integration (show trending keywords for campaign ideas)

---

## Snapchat Ads Integration

### Availability
- **Status:** Native integration (listed as "Snapchat for Business")
- **Tier Required:** Likely Premium/Plus (not on Free plan - inferred)
- **Maturity:** Medium - Snapchat Ads is smaller than Facebook/Google/TikTok but established

### Snapchat Ads Market Context

**Platform characteristics:**
- **Primary audience:** Gen Z and young Millennials (age 13-29)
- **Top verticals:** Fashion, beauty, entertainment, gaming, fast food/snacks
- **Ad formats:** Snap Ads (vertical video), Story Ads, Collection Ads, AR Lenses, Filters
- **Unique features:** Augmented Reality (AR) try-on for fashion/beauty, disappearing content

**Why merchants use Snapchat Ads:**
- Reach young, hard-to-reach demographic (Gen Z)
- High engagement with AR ad formats
- Strong for impulse-buy products and limited-time offers
- Lower CPCs than Facebook Ads (less saturated market)

### Connection Setup (Inferred)

**Prerequisites:**
- Snapchat Ads Manager account
- Admin access to Snapchat Ads account
- Snapchat Pixel installed on store
- BeProfit account

**OAuth flow:** Similar to other ad platforms (OAuth consent, account selection, initial sync)

### Data Synced (Inferred)

**Campaign-level data:**
- Campaign ID, Name, Status, Objective
- Budget, Spend, Impressions, Swipe Ups (Snapchat's equivalent of clicks)
- Video Views, Screen Time (video engagement)
- Conversions (Purchase events from Snapchat Pixel)
- Conversion value, CPA, ROAS

**Ad-level data:**
- Ad ID, Creative format (Snap Ad, Story Ad, AR Lens)
- Spend, impressions, swipe ups, conversions

### Sync Details

- **Sync frequency:** Likely daily
- **Historical data:** Likely 90 days
- **Attribution window:** Snapchat default is 28-day click, 1-day view

### Attribution Methodology

**Snapchat Pixel:**
- Snapchat Pixel fires conversion events (PageView, AddToCart, Purchase)
- BeProfit uses Snapchat Click ID or UTM parameters for attribution

**UTM fallback:** UTM parameters if Pixel not installed

### Limitations (Inferred)

- **AR Lens performance:** Unclear if BeProfit tracks AR Lens ad performance separately
- **Snapchat Spotlight:** Snapchat's TikTok-like feed. Unclear if BeProfit tracks Spotlight ad performance.
- **Small market share:** Snapchat Ads are less popular than Facebook/Google/TikTok, so fewer users need this integration.
- **Tier restrictions:** Likely only on Premium/Plus plans.

### Relevance to Our Build

**Priority: Medium**
- Snapchat is the **#5-6 ad platform** for e-commerce
- Critical for brands targeting Gen Z
- **Nice-to-have, not must-have** (lower priority than Facebook/Google/TikTok/Pinterest)

**Differentiation opportunities:**
- AR Lens performance tracking (if BeProfit doesn't provide)
- Snapchat Spotlight ad insights
- Creative format comparison (Snap Ads vs Story Ads vs AR Lenses)

---

## Microsoft Advertising (Bing Ads) Integration

### Availability
- **Status:** Native integration (confirmed in multiple sources)
- **Tier Required:** Unknown (likely all plans or Premium/Plus)
- **Maturity:** Medium - Bing Ads is a smaller market than Google Ads but stable platform

### Microsoft Advertising Market Context

**Platform characteristics:**
- **Primary audience:** Older demographic (age 35-65), higher income, desktop-heavy
- **Top verticals:** B2B, finance, healthcare, legal services, luxury goods
- **Market share:** ~6-8% of search ad market (vs Google's 90%+)
- **Ad formats:** Search ads, Shopping ads, Display ads (Microsoft Audience Network)

**Why merchants use Microsoft Ads:**
- Lower CPCs than Google Ads (less competition)
- Reach older, higher-income audience
- Good for B2B and high-ticket items
- Easy Google Ads import (can clone Google campaigns to Bing)

### Connection Setup (Inferred)

**Prerequisites:**
- Microsoft Advertising account
- Admin access to account
- UET (Universal Event Tracking) tag installed on store
- BeProfit account

**OAuth flow:** Similar to Google Ads (Microsoft OAuth consent, account selection)

### Data Synced (Inferred)

**Campaign-level data:**
- Campaign ID, Name, Status, Type (Search, Shopping, Audience)
- Budget, Spend, Impressions, Clicks, CTR, CPC
- Conversions (from UET tag), Conversion value, CPA, ROAS

**Ad Group/Keyword data:**
- Ad Group ID, Name
- Keyword performance (for Search campaigns)
- Shopping campaign product performance

### Sync Details

- **Sync frequency:** Likely daily
- **Historical data:** Likely 90 days
- **Attribution window:** Microsoft Ads default is 30-day click (same as Google Ads)

### Attribution Methodology

**UET tag (Universal Event Tracking):**
- Microsoft's equivalent of Google Ads conversion tracking
- Fires conversion events (Purchase, AddToCart, etc.)
- BeProfit uses UET data for attribution

**UTM fallback:** UTM parameters if UET not installed

### Limitations (Inferred)

- **Smaller market:** Bing Ads are used by fewer merchants (< 30% of e-commerce advertisers)
- **Lower priority:** BeProfit likely invests less in Bing Ads integration compared to Google Ads
- **Limited documentation:** Little public documentation about BeProfit's Bing Ads integration
- **Feature parity:** May lack advanced features present in Google Ads integration

### Relevance to Our Build

**Priority: Low-Medium**
- Bing Ads are the **#7-8 ad platform** for e-commerce
- Important for B2B and older demographic targeting
- **Nice-to-have, not must-have** (low priority in MVP)

**Differentiation opportunities:**
- If BeProfit has weak Bing Ads integration, we can differentiate with better support
- Shopping campaign product insights
- Cross-platform comparison (Google Ads vs Bing Ads performance)

---

## Outbrain Integration

### Availability
- **Status:** Native integration (confirmed in integration lists)
- **Tier Required:** Unknown (likely Premium/Plus only)
- **Maturity:** Low - Niche platform, less commonly used by e-commerce brands

### Outbrain Market Context

**Platform characteristics:**
- **Ad format:** Content discovery (native ads in "Recommended for you" sections on news/blog sites)
- **Primary use case:** Content marketing, blog promotion, top-of-funnel awareness
- **Market position:** Competing with Taboola for content discovery ad market
- **Typical advertisers:** Publishers, media companies, content-heavy brands

**Why merchants use Outbrain:**
- Drive traffic to blog/content marketing
- Top-of-funnel awareness campaigns
- Lower CPCs than Facebook/Google for content promotion

### Connection Setup (Inferred)

**Prerequisites:**
- Outbrain Amplify account
- Admin access
- Outbrain Pixel installed on store (for conversion tracking)

### Data Synced (Inferred)

**Campaign-level data:**
- Campaign ID, Name, Status
- Spend, Impressions, Clicks, CTR, CPC
- Conversions, Conversion value, CPA, ROAS

### Limitations (Inferred)

- **Niche platform:** Outbrain is rarely used by e-commerce brands (primarily publishers)
- **Content-focused:** Designed for content promotion, not direct response e-commerce ads
- **Low conversion rates:** Outbrain traffic typically has lower conversion rates than Facebook/Google
- **Limited use case:** Most e-commerce merchants don't advertise on Outbrain

### Relevance to Our Build

**Priority: Low**
- Outbrain is **rarely used by e-commerce brands**
- **Low priority for MVP** (only add if customer demand exists)
- Consider supporting via Zapier/webhooks instead of native integration

---

## Taboola Integration

### Availability
- **Status:** Native integration (confirmed in integration lists)
- **Tier Required:** Unknown (likely Premium/Plus only)
- **Maturity:** Low - Niche platform, similar to Outbrain

### Taboola Market Context

**Platform characteristics:**
- **Ad format:** Content discovery (native ads in "You may like" sections)
- **Similar to Outbrain:** Direct competitor in content discovery space
- **Typical advertisers:** Publishers, content marketers, top-of-funnel campaigns

### Relevance to Our Build

**Priority: Low**
- Same analysis as Outbrain
- **Low priority for MVP**
- Consider supporting via Zapier/webhooks

---

## Amazon Ads Integration (Status Unclear)

### Availability
- **Status:** Unclear - May be in development or separate from Amazon Seller integration
- **Evidence:** Help Center article mentions "Amazon Ads Integration Status" (from file 031)
- **Tier Required:** Unknown

### Amazon Ads Market Context

**Platform characteristics:**
- **Amazon Ads:** Amazon Sponsored Products, Sponsored Brands, Sponsored Display
- **Market position:** #3 or #4 ad platform globally (behind Google, Facebook, possibly TikTok)
- **Primary use case:** Brands advertising on Amazon marketplace
- **High purchase intent:** Amazon users are ready to buy

**Why merchants use Amazon Ads:**
- Reach Amazon shoppers (300M+ active customers)
- Sponsored Products drive product page visibility
- High conversion rates (users are in buying mode)
- Critical for brands selling on Amazon

### Integration Complexity

**Challenge:** Amazon Ads integration may be separate from Amazon Seller Central integration (file 034). Amazon Ads API requires separate authentication and permissions.

**Two scenarios:**
1. **Amazon Seller integration includes ad data:** Amazon Seller Central API provides ad spend and performance data (simpler)
2. **Separate Amazon Ads integration:** Requires separate OAuth to Amazon Advertising API (more complex)

### Relevance to Our Build

**Priority: Medium-High**
- Amazon Ads are **critical for Amazon sellers**
- If BeProfit has Amazon Ads integration (or it's in development), we must match
- **Should be part of MVP for Amazon sellers** (many brands sell on Amazon + Shopify)

**Differentiation opportunities:**
- Product-level Amazon Sponsored Products insights
- Amazon Ads vs external ads comparison (Google Shopping vs Amazon Sponsored Products)
- ACoS (Advertising Cost of Sale) tracking (Amazon's version of ROAS)

---

## Platforms NOT Supported (Conspicuously Missing)

### LinkedIn Ads
- **Why missing:** LinkedIn is B2B-focused, not relevant for DTC e-commerce
- **BeProfit's market:** DTC e-commerce brands, not B2B SaaS
- **Our opportunity:** If we target B2B or B2C brands, we could add LinkedIn Ads

### Reddit Ads
- **Why missing:** Reddit Ads are niche, less commonly used by e-commerce brands
- **Growing platform:** Reddit is growing as an advertising platform (especially for Gen Z)
- **Our opportunity:** Add Reddit Ads if BeProfit doesn't support

### Twitter/X Ads
- **Why missing:** Twitter/X Ads are less popular for e-commerce (better for app installs, brand awareness)
- **Platform instability:** Twitter/X has faced challenges under Elon Musk ownership
- **Our opportunity:** Likely low priority, but could add if demand exists

### YouTube Ads (Rolled into Google Ads)
- **Status:** YouTube Ads are part of Google Ads (Video campaigns)
- **BeProfit's approach:** YouTube Ad performance is likely rolled into Google Ads integration without separate breakdown
- **Our opportunity:** Provide YouTube-specific insights (if BeProfit doesn't break down Video campaigns by platform)

### Quora Ads
- **Why missing:** Quora Ads are niche, rarely used by e-commerce brands
- **Our decision:** Skip Quora Ads unless customer demand exists

---

## Ad Platform Feature Parity Matrix

Comparison of BeProfit's ad platform integrations based on available documentation and inferred features:

| Platform | Native Integration | Tier Availability | Attribution Method | Sync Frequency | Conversion Tracking | Maturity |
|----------|-------------------|-------------------|-------------------|---------------|---------------------|----------|
| **Facebook Ads** | ✅ Yes | All plans | Pixel + UTM, auto attribution | Hourly/Daily | ✅ Full | ⭐⭐⭐ High |
| **Google Ads** | ✅ Yes | All plans | GCLID + UTM (strict) | Daily | ✅ Full | ⭐⭐⭐ High |
| **TikTok Ads** | ✅ Yes | All plans | ttclid + Pixel + UTM, auto attribution | Daily | ✅ Full | ⭐⭐ Medium |
| **Pinterest Ads** | ✅ Yes | All plans (?) | Pinterest Tag + UTM | Daily | ✅ Full | ⭐⭐ Medium |
| **Snapchat Ads** | ✅ Yes | Premium/Plus (?) | Snapchat Pixel + UTM | Daily | ✅ Full | ⭐⭐ Medium |
| **Microsoft Ads (Bing)** | ✅ Yes | Unknown | UET + UTM | Daily | ✅ Likely | ⭐⭐ Medium |
| **Outbrain** | ✅ Yes | Premium/Plus (?) | Outbrain Pixel + UTM | Daily | ⚠️ Likely basic | ⭐ Low |
| **Taboola** | ✅ Yes | Premium/Plus (?) | Taboola Pixel + UTM | Daily | ⚠️ Likely basic | ⭐ Low |
| **Amazon Ads** | ⚠️ In development (?) | Unknown | Amazon Attribution + UTM | Unknown | ⚠️ Unknown | ⭐ Unknown |
| **Instagram Ads** | ✅ Rolled into Facebook Ads | All plans | Same as Facebook | Hourly/Daily | ✅ Full | ⭐⭐⭐ High |
| **YouTube Ads** | ✅ Rolled into Google Ads | All plans | Same as Google | Daily | ✅ Full | ⭐⭐⭐ High |
| **LinkedIn Ads** | ❌ Not supported | N/A | N/A | N/A | N/A | N/A |
| **Reddit Ads** | ❌ Not supported | N/A | N/A | N/A | N/A | N/A |
| **Twitter/X Ads** | ❌ Not supported | N/A | N/A | N/A | N/A | N/A |

### Key Insights

**1. BeProfit prioritizes DTC-relevant platforms:**
- Strong support for Facebook, Google, TikTok (top 3 e-commerce ad platforms)
- Medium support for Pinterest, Snapchat (visual/social platforms for DTC brands)
- Basic support for Bing, Outbrain, Taboola (lower priority)
- No support for B2B platforms (LinkedIn) or low-relevance platforms (Twitter, Reddit)

**2. Tier-based feature gating likely:**
- Top 3 (Facebook, Google, TikTok) available on all plans
- Others (Pinterest, Snapchat, Bing, Outbrain, Taboola) likely Premium/Plus only

**3. Attribution consistency:**
- Lenient attribution for most platforms (auto attribution + UTM + Pixel)
- Strict attribution for Google Ads only (UTM-only to avoid SEO confusion)

**4. Sync frequency:**
- All platforms synced daily at minimum
- Top 3 may have hourly sync (especially Facebook Ads)

---

## Unified Ad Platform Data Model

For our competing product, we need a unified data model that works across all ad platforms:

### Unified Ad Platform Connection

```typescript
interface UnifiedAdPlatformConnection {
  id: string;
  storeId: string;

  // Platform identification
  platform: 'facebook' | 'google' | 'tiktok' | 'pinterest' | 'snapchat' | 'bing' | 'outbrain' | 'taboola' | 'amazon' | 'reddit' | 'twitter' | 'linkedin';
  platformDisplayName: string; // "Facebook Ads", "Google Ads", etc.

  // Account details
  accountId: string; // Platform-specific account ID
  accountName: string;
  managerId?: string; // For Manager/Business accounts

  // OAuth credentials
  accessToken: string; // Encrypted
  refreshToken?: string; // Encrypted
  tokenExpiry?: Date;

  // Sync configuration
  syncFrequency: 'realtime' | 'hourly' | 'every_4_hours' | 'daily';
  lastSyncedAt: Date;
  lastSyncStatus: 'success' | 'error' | 'in_progress';
  lastSyncError?: string;

  // Attribution settings
  attributionMethod: 'pixel_strict' | 'pixel_utm_fallback' | 'utm_only' | 'auto_attribution';
  attributionWindow: {
    clickDays: number; // 7, 30, 90, etc.
    viewDays: number; // 1, 7, 30, etc.
  };

  // Status
  status: 'connected' | 'disconnected' | 'error' | 'token_expired';
  createdAt: Date;
  updatedAt: Date;
}
```

### Unified Ad Spend Record

```typescript
interface UnifiedAdSpend {
  id: string;
  connectionId: string;

  // Platform identification
  platform: string; // 'facebook', 'google', etc.

  // Hierarchy (platform-agnostic names)
  campaignId: string;
  campaignName: string;
  adGroupId?: string; // Ad Set (Facebook), Ad Group (Google/Bing), Ad Group (TikTok)
  adGroupName?: string;
  adId?: string;
  adName?: string;

  // Platform-specific IDs (for API lookups)
  platformCampaignId: string; // Original platform's campaign ID
  platformAdGroupId?: string;
  platformAdId?: string;

  // Date dimension
  date: Date; // YYYY-MM-DD

  // Standard metrics (all platforms support these)
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number; // Calculated: clicks / impressions
  cpc: number; // Calculated: spend / clicks
  cpm: number; // Calculated: spend / impressions * 1000

  // Conversion metrics
  conversions: number; // Purchase events
  conversionValue: number; // Revenue attributed
  cpa: number; // Cost per acquisition
  roas: number; // Return on ad spend (gross)

  // Platform-specific metrics (nullable for platforms that don't support)
  videoViews?: number; // TikTok, Facebook, YouTube
  videoWatchTime?: number; // TikTok, Facebook, YouTube
  videoCompletionRate?: number; // TikTok, Facebook, YouTube
  pinSaves?: number; // Pinterest only
  swipeUps?: number; // Snapchat only

  // Profit metrics (calculated by our app)
  attributedRevenue: number;
  cogs: number;
  shippingCost: number;
  transactionFees: number;
  netProfit: number;
  netRoas: number;

  // Metadata
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Platform Adapter Pattern

To handle platform-specific APIs, we should use an adapter pattern:

```typescript
interface AdPlatformAdapter {
  platform: string;

  // OAuth
  getOAuthUrl(): string;
  handleOAuthCallback(code: string): Promise<AdPlatformConnection>;
  refreshAccessToken(connection: AdPlatformConnection): Promise<AdPlatformConnection>;

  // Data sync
  syncCampaigns(connection: AdPlatformConnection, startDate: Date, endDate: Date): Promise<UnifiedAdSpend[]>;
  syncHistoricalData(connection: AdPlatformConnection, daysBack: number): Promise<UnifiedAdSpend[]>;

  // Attribution
  captureClickId(url: URL): string | null; // Extract gclid, fbclid, ttclid, etc.
  matchConversionToOrder(conversion: PlatformConversion, orders: Order[]): Order | null;

  // Platform-specific features
  getPlatformSpecificMetrics(): string[]; // ['videoViews', 'videoWatchTime'] for TikTok
  supportedAttributionWindows(): AttributionWindow[];
}

// Concrete adapters
class FacebookAdsAdapter implements AdPlatformAdapter { /* ... */ }
class GoogleAdsAdapter implements AdPlatformAdapter { /* ... */ }
class TikTokAdsAdapter implements AdPlatformAdapter { /* ... */ }
class PinterestAdsAdapter implements AdPlatformAdapter { /* ... */ }
// ... etc.
```

---

## Relevance to Our Build

### Strategic Decisions for Our Product

**1. Platform priority for MVP:**

**Must-have (launch day):**
- Facebook/Meta Ads
- Google Ads
- TikTok Ads

**Phase 2 (3-6 months post-launch):**
- Pinterest Ads (if targeting fashion/home decor brands)
- Amazon Ads (if targeting Amazon sellers)

**Phase 3 (6-12 months post-launch):**
- Snapchat Ads (if targeting Gen Z brands)
- Microsoft Ads (Bing)

**Low priority / On-demand:**
- Outbrain, Taboola (only if customer demand exists)
- Reddit, Twitter/X, LinkedIn (niche use cases)

**2. Long-tail strategy:**

**Option A: Native integrations for all platforms**
- Pros: Full control, best user experience, deep insights
- Cons: High development cost, ongoing maintenance burden

**Option B: Top 3-5 native, rest via Zapier/webhooks**
- Pros: Lower development cost, faster time-to-market
- Cons: Worse user experience for long-tail platforms, limited insights

**Recommendation:** Start with Option B (native for top 5, Zapier for rest), then add native integrations based on customer demand.

**3. B2B platform differentiation:**

BeProfit does NOT support LinkedIn Ads (B2B-focused). If we want to differentiate by targeting B2C + B2B hybrid brands, we could add:
- LinkedIn Ads integration
- Position as "the only profit tracker that supports B2B and B2C advertising"

**Decision:** Only add LinkedIn Ads if we target B2B/hybrid brands. Skip for pure DTC focus.

---

## Competitive Differentiation Opportunities

### If BeProfit Can't Do This, We Can

**1. Amazon Ads integration (if BeProfit doesn't have it yet)**

Amazon Ads are critical for Amazon sellers. If BeProfit's integration is in development or incomplete, we can:
- Launch with Amazon Ads support (differentiation)
- Provide product-level Amazon Sponsored Products insights
- Track ACoS (Amazon's ROAS metric)

**2. YouTube Ads breakdown**

YouTube Ads are rolled into Google Ads Video campaigns. We can:
- Separate YouTube Ad performance from Google Display/Search
- Show YouTube-specific metrics (video views, watch time, completion rate)
- Compare YouTube vs Facebook vs TikTok video ad performance

**3. Instagram Ads breakdown**

Instagram Ads are rolled into Facebook Ads. We can:
- Separate Instagram performance from Facebook News Feed
- Show placement-level breakdown (Feed, Stories, Reels, Explore)
- Compare Instagram vs Facebook performance

**4. Reddit Ads support (if BeProfit doesn't have it)**

Reddit is growing as an ad platform, especially for Gen Z. If BeProfit doesn't support Reddit, we can:
- Add Reddit Ads integration (differentiation for Reddit advertisers)
- Target brands using Reddit for community-driven marketing

**5. Unified multi-platform reporting**

Provide better cross-platform comparison:
- Side-by-side performance comparison (Facebook vs Google vs TikTok vs Pinterest)
- Channel attribution (which platforms get credit in multi-touch journeys)
- Budget allocation recommendations (spend more on X, less on Y)

**6. Platform-specific creative insights**

Each platform has unique creative formats:
- TikTok: Video performance insights
- Pinterest: Pin design insights (vertical vs square, text overlay vs no text)
- Snapchat: AR Lens performance
- We can provide platform-specific creative recommendations

---

## Conclusion

BeProfit supports **10+ ad platforms**, making it one of the most comprehensive e-commerce profit analytics tools. The platform prioritizes DTC-relevant channels (Facebook, Google, TikTok, Pinterest, Snapchat) and does not support B2B platforms (LinkedIn).

**Key takeaways for our product:**

**1. Platform coverage tiers:**
- **Tier 1 (Must-have):** Facebook, Google, TikTok (MVP launch day)
- **Tier 2 (High priority):** Pinterest, Amazon Ads (3-6 months post-launch)
- **Tier 3 (Medium priority):** Snapchat, Bing (6-12 months post-launch)
- **Tier 4 (Low priority):** Outbrain, Taboola, Reddit, Twitter/X, LinkedIn (on-demand)

**2. Differentiation opportunities:**
- **Amazon Ads integration** (if BeProfit doesn't have it yet)
- **YouTube Ads breakdown** (separate from Google Ads)
- **Instagram Ads breakdown** (separate from Facebook Ads)
- **Reddit Ads support** (if BeProfit doesn't have it)
- **LinkedIn Ads support** (for B2B/hybrid brands)

**3. Technical architecture:**
- **Unified data model** across all platforms (UnifiedAdSpend)
- **Adapter pattern** for platform-specific APIs (FacebookAdsAdapter, GoogleAdsAdapter, etc.)
- **Flexible attribution** (support multiple attribution methods per platform)

**4. Long-tail strategy:**
- **Native integrations** for top 5 platforms (Facebook, Google, TikTok, Pinterest, Amazon)
- **Zapier/webhook support** for long-tail platforms (Outbrain, Taboola, etc.)
- **Add native integrations** based on customer demand

**5. Critical success factors:**
- Match BeProfit's platform coverage for top 3-5 platforms
- Differentiate on depth of insights (creative performance, platform-specific metrics)
- Provide unified cross-platform reporting (better than BeProfit's siloed approach)

**Next steps:**
1. Prioritize platform development roadmap (MVP: Facebook, Google, TikTok)
2. Build unified data model and adapter architecture
3. Validate Amazon Ads opportunity (is BeProfit's integration complete?)
4. Decide on B2B strategy (add LinkedIn Ads or skip?)
5. Test integrations with real ad accounts to ensure accuracy
