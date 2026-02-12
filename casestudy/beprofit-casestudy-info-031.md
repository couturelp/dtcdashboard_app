# BeProfit Integration Ecosystem Overview

## Source
- **URLs:**
  - https://beprofit.co/ (main marketing site)
  - https://beprofit.co/integrations/ (integrations page)
  - https://integrations.beprofit.co/ (tech partner directory - access restricted)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://www.getapp.com/website-ecommerce-software/a/beprofit/ (GetApp review page)
  - https://www.capterra.com/p/214079/BeProfit/ (Capterra review page)
  - https://sourceforge.net/software/product/BeProfit/integrations/ (SourceForge integrations list)
- **Category:** Integrations / Ecosystem Overview
- **Date Captured:** 2026-02-12

---

## Integration Philosophy

BeProfit positions itself as a **multi-channel profit analytics platform** that connects seamlessly with the e-commerce tools merchants already use. Their core value proposition is: _"Connect platforms and tools you work with to collect expenses, revenue, and other eCommerce data in real time."_

Key principles:
- **Unified Dashboard Approach**: Consolidate data from 5+ sales channels into one analytics dashboard
- **Real-Time Data Sync**: Emphasizes real-time data collection for up-to-date financials
- **Native Integrations**: Focus on native, built-in integrations rather than relying on Zapier
- **UTM Attribution**: Includes UTM tracking for Shopify merchants to monitor ad spend, CPCs, CPMs
- **Automatic Expense Tracking**: Integrations automatically pull in costs (shipping, ads, marketplace fees) for accurate profit calculation

BeProfit markets itself as a platform that "seamlessly integrates with your store platform, marketing channels, accounting, payment processor, and shipping accounts to ensure that your reports are accurate."

---

## Complete Integration Catalog

### E-Commerce Platforms

| Platform | Native/Third-Party | Tier Required | Featured? | Notes |
|----------|-------------------|---------------|-----------|-------|
| **Shopify** | Native | All plans | ⭐ Featured | Primary platform, most mature integration, Shopify App Store presence with 4.5★ rating (194 reviews) |
| **Amazon** | Native | All plans | ⭐ Featured | Amazon Seller Central integration, supports FBA/FBM orders |
| **WooCommerce** | Native | All plans | ⭐ Featured | WordPress plugin available, self-hosted support |
| **Wix** | Native | All plans | Featured | Wix e-commerce platform support |
| **eBay** | Unknown | Unknown | Not prominently featured | Not confirmed in 2026 documentation |
| **Etsy** | Unknown | Unknown | Not prominently featured | Not confirmed in 2026 documentation |

**Key Observations:**
- **Big 3:** Shopify, Amazon, WooCommerce are the primary e-commerce platforms heavily featured in marketing
- **Wix Support:** Wix added as 4th platform, targeting small business/website builder users
- **Missing Platforms:** No confirmed support for BigCommerce, Magento, Squarespace, or Walmart Marketplace

---

### Ad Platforms

| Platform | Native/Third-Party | Tier Required | Featured? | Link/Notes |
|----------|-------------------|---------------|-----------|------------|
| **Facebook Ads** (Meta for Business) | Native | All plans | ⭐ Featured | Automatic sync of ad spend, conversions, campaigns |
| **Google Ads** | Native | All plans | ⭐ Featured | Full campaign data sync, available on all tiers per Shopify App Store |
| **TikTok Ads** | Native | All plans | ⭐ Featured | Automatic sync of TikTok ad data, attribution tracking |
| **Instagram Ads** | Native | All plans | Featured | Part of Meta for Business integration |
| **Pinterest Ads** | Native | Pro/Ultimate/Plus? | Featured | Listed in various sources, tier requirement unclear |
| **Snapchat Ads** | Native | Pro/Ultimate/Plus? | Featured | Listed as "Snapchat for Business" integration |
| **Microsoft Ads** (Bing) | Native | Unknown | Listed | Confirmed in search results, less prominently featured |
| **Outbrain** | Unknown | Unknown | Listed | Native content discovery platform |
| **Taboola** | Unknown | Unknown | Listed | Native content discovery platform |
| **Amazon Ads** | Native | Unknown | In Development? | Help Center article mentions "Amazon Ads Integration Status" - suggests active development |

**Key Observations:**
- **Core Ad Trio:** Facebook Ads, Google Ads, TikTok Ads are the most prominently featured and available on all pricing tiers
- **Broad Ad Coverage:** BeProfit supports 10+ ad platforms, significantly more than many competitors
- **Attribution Focus:** BeProfit emphasizes UTM attribution for Shopify, allowing merchants to track which campaigns drive profit
- **Amazon Ads:** Appears to be a separate integration from Amazon Seller Central (marketplace integration)

---

### Email/SMS Marketing

| Platform | Native/Third-Party | Tier Required | Featured? | Link/Notes |
|----------|-------------------|---------------|-----------|------------|
| **Klaviyo** | Native | All plans (confirmed in Shopify App Store) | ⭐ Featured | B2C CRM integration - syncs customer data, email revenue attribution |
| **Mailchimp** | Unknown | Unknown | Not confirmed | Not explicitly listed in 2026 documentation |
| **Omnisend** | Unknown | Unknown | Not confirmed | Not explicitly listed in 2026 documentation |
| **Postscript** | Unknown | Unknown | Not confirmed | Not explicitly listed in 2026 documentation |

**Key Observations:**
- **Klaviyo Dominance:** Klaviyo is the only prominently featured email/SMS integration
- **Limited Email Integrations:** Appears to be a gap compared to ad platform coverage
- **Revenue Attribution:** Email marketing data flows into profit calculations (attributed revenue from email campaigns)

---

### Shipping & Fulfillment

| Platform | Native/Third-Party | Tier Required | Featured? | Link/Notes |
|----------|-------------------|---------------|-----------|------------|
| **ShipStation** | Native | All plans | Featured | Order import, shipment tracking, shipping cost sync |
| **ShipBob** | Native | All plans | Featured | 3PL fulfillment center integration, listed in tech partner directory |
| **ShipHero** | Native | All plans | Featured | Warehouse management system integration |
| **Shippo** | Native | All plans | Featured | Multi-carrier shipping platform integration |

**Key Observations:**
- **Comprehensive Shipping Coverage:** BeProfit supports 4 major shipping platforms
- **Cost Tracking Focus:** Shipping integrations automatically pull shipping costs for accurate profit calculation
- **3PL Support:** ShipBob integration suggests focus on dropshipping/3PL business models

---

### Accounting & ERP

| Platform | Native/Third-Party | Tier Required | Featured? | Link/Notes |
|----------|-------------------|---------------|-----------|------------|
| **QuickBooks** | Unknown | Unknown | Not confirmed | Community post asks about QuickBooks sync with Shopify, suggesting potential integration or user demand |
| **Xero** | Unknown | Unknown | Not confirmed | Not explicitly listed in 2026 documentation |

**Key Observations:**
- **Limited Accounting Integrations:** Accounting integration is NOT a prominent feature of BeProfit
- **Data Export Focus:** BeProfit emphasizes data export capabilities (Google Sheets, CSV) as alternative to direct accounting integrations
- **Gap Opportunity:** Lack of QuickBooks/Xero integrations is a potential competitive weakness

---

### Payment Processors

| Platform | Native/Third-Party | Tier Required | Featured? | Link/Notes |
|----------|-------------------|---------------|-----------|------------|
| **Shopify Payments** | Indirect (via Shopify) | All Shopify users | Auto-synced | Transaction fees pulled automatically from Shopify |
| **Stripe** | Indirect (via e-commerce platform) | N/A | Auto-synced | Fees synced via WooCommerce/Shopify if Stripe is payment processor |
| **PayPal** | Indirect (via e-commerce platform) | N/A | Auto-synced | Fees synced via WooCommerce/Shopify if PayPal is payment processor |

**Key Observations:**
- **No Direct Payment Integrations:** BeProfit does NOT directly integrate with Stripe/PayPal
- **Platform-Mediated:** Payment processor data flows through e-commerce platform integrations
- **Transaction Fee Tracking:** BeProfit captures payment processing fees for profit calculation

---

### Analytics & Tracking

| Platform | Native/Third-Party | Tier Required | Featured? | Link/Notes |
|----------|-------------------|---------------|-----------|------------|
| **Google Analytics** | Native | All plans (confirmed in Shopify App Store) | Featured | Listed as one of the core integrations |
| **UTM Tracking** | Built-in | Shopify users | Featured | Native UTM parameter tracking for Shopify merchants |

**Key Observations:**
- **Google Analytics Integration:** Allows cross-referencing BeProfit data with GA traffic/conversion data
- **UTM Attribution:** Built-in UTM tracking is a key differentiator for Shopify users

---

### Other Integration Methods

| Method | Availability | Use Case |
|--------|-------------|----------|
| **Google Sheets** | All plans | Data export for custom analysis or accounting handoffs |
| **CSV Bulk Upload** | All plans | Manual data import for custom expenses or COGS |
| **API Access** | Plus Plan only ($249/month) | Custom integrations, data warehouse connections |
| **Webhooks** | Unknown | Not documented, likely not available |
| **Zapier** | Not emphasized | BeProfit focuses on native integrations, minimal Zapier references |

**Key Observations:**
- **API Gating:** API access is limited to Plus plan (enterprise tier), suggesting BeProfit wants to control integration ecosystem
- **Data Export Focus:** Easy export (Google Sheets, CSV) rather than two-way sync with accounting tools
- **No Public API:** No public API documentation found, suggesting closed integration ecosystem

---

### Tech Partner Directory

BeProfit maintains an integration directory at `integrations.beprofit.co` (access restricted during research) featuring technology partners including:

**Confirmed Partners:**
- **PageFly** - Shopify page builder
- **UpPromote** - Affiliate marketing platform
- **SocialPhotos** - Social media marketing tool
- **Uplifted** - Unknown (linked in search results)
- **SaleYee** - Dropshipping platform
- **DSers** - AliExpress dropshipping solution
- **AdScale** - Ad automation platform
- **OptiMonk** - On-site messaging & personalization
- **WideBundle** - Product bundling app
- **Kimonix** - Merchandising & personalization
- **LimeChat** - Customer support chat
- **Glood.AI** - AI-powered personalization

**Key Observations:**
- **Shopify Ecosystem Focus:** Most tech partners are Shopify apps, reinforcing Shopify as primary platform
- **Dropshipping Tools:** Multiple dropshipping integrations (DSers, SaleYee) suggest dropshipper target market
- **Marketing Optimization:** Several marketing/CRO tools (OptiMonk, AdScale) suggest focus on DTC brands

---

## Integration Tiers Analysis

### Pricing Structure (from Shopify App Store - confirmed accurate as of 2026-02-12)

| Tier | Monthly Cost | Order Limit | Shops | Key Features | API Access |
|------|-------------|-------------|-------|--------------|------------|
| **Basic** | $49 | 450 orders | 1 | Core profit tracking, all integrations | ❌ No |
| **Pro** | $99 | 900 orders | 1 | Same as Basic + higher order volume | ❌ No |
| **Ultimate** | $149 | 1,700 orders | 1 | Same as Pro + higher order volume | ❌ No |
| **Plus (Enterprise)** | $249 | Unlimited | Unlimited | Everything + API access, unlimited orders/shops | ✅ Yes |

**Free Trial:** 14-day free trial available on all tiers
**Annual Discount:** 20% discount when billed annually

### Integration Availability by Tier

**All Tiers (Basic, Pro, Ultimate, Plus):**
- All e-commerce platform integrations (Shopify, Amazon, WooCommerce, Wix)
- All core ad platforms (Facebook, Google, TikTok, Instagram)
- Shipping integrations (ShipStation, ShipBob, ShipHero, Shippo)
- Klaviyo (email/SMS)
- Google Analytics
- Data export (Google Sheets, CSV)

**Plus Plan Exclusive:**
- API access for custom integrations
- Unlimited shops (multi-brand management)
- Unlimited orders

**Key Observations:**
- **No Integration Gating:** Unlike competitors, BeProfit does NOT gate integrations by pricing tier (all integrations available on $49 Basic plan)
- **Volume-Based Pricing:** Tiers differ only by order volume and shop count, not features
- **API as Premium Feature:** API access is the ONLY feature gated to Plus plan
- **Competitive Advantage:** All-inclusive integration access at $49/month is strong value proposition

---

## Native vs Third-Party Split

### Native Integrations (Built by BeProfit)
**E-commerce Platforms:** Shopify, Amazon, WooCommerce, Wix (4 platforms)
**Ad Platforms:** Facebook/Meta, Google Ads, TikTok, Instagram, Pinterest, Snapchat, Microsoft Ads, Outbrain, Taboola (~9-10 platforms)
**Shipping:** ShipStation, ShipBob, ShipHero, Shippo (4 platforms)
**Email/SMS:** Klaviyo (1 platform)
**Analytics:** Google Analytics (1 platform)

**Total Native Integrations:** ~19-20 integrations

### Third-Party / Zapier Integrations
**Zapier:** NOT prominently featured or documented in BeProfit's marketing
**Conclusion:** BeProfit appears to have a **native-first integration strategy** with minimal reliance on Zapier

### Missing Integrations (Third-Party Gap)
- Mailchimp, Omnisend, Postscript (email/SMS competitors to Klaviyo)
- QuickBooks, Xero (accounting)
- BigCommerce, Magento, Squarespace (e-commerce platforms)
- Walmart, eBay, Etsy (marketplaces)

**Key Observations:**
- **Native-First:** BeProfit has invested in building native integrations for major platforms
- **Quality over Quantity:** Focuses on depth (Shopify, Amazon, WooCommerce done well) over breadth (no eBay, Etsy)
- **No Zapier Fallback:** Unlike competitors, BeProfit doesn't offer "connect anything via Zapier" - integrations are curated

---

## Integration Maturity Assessment

### Tier 1: Highly Mature (Rich documentation, featured prominently, stable)
- **Shopify** - 4.5★ rating with 194 reviews on App Store, launched Sep 2020, 5+ years of iteration
- **Amazon** - Featured equally to Shopify, Help Center article on "Amazon Ads Integration Status"
- **Facebook Ads / Meta** - Core ad integration, automatic sync
- **Google Ads** - Core ad integration, automatic sync

### Tier 2: Mature (Stable, documented, less prominent)
- **WooCommerce** - WordPress plugin available, Help Center documentation
- **TikTok Ads** - Multiple blog posts on TikTok integration, suggests maturity
- **Klaviyo** - Featured in Shopify App Store integrations list
- **ShipStation** - Standard shipping integration

### Tier 3: Developing (Listed but less documented)
- **Wix** - Added as 4th e-commerce platform, newer
- **Pinterest Ads** - Listed but not heavily featured
- **Snapchat Ads** - Listed but not heavily featured
- **Microsoft Ads** - Listed but not prominently featured
- **ShipBob, ShipHero, Shippo** - Listed but less documented than ShipStation
- **Amazon Ads** - Help Center article suggests active development ("Integration Status")

### Tier 4: Uncertain / Potentially Deprecated
- **Outbrain, Taboola** - Listed in some sources but not featured, may be legacy or limited
- **eBay, Etsy** - Not confirmed in 2026 documentation

**Key Observations:**
- **Shopify-First Development:** Shopify integration is most mature with 5+ years of refinement
- **Ad Platform Priority:** Facebook, Google, TikTok are clearly Tier 1 investments
- **Newer Platforms:** Wix, some ad platforms (Pinterest, Snapchat) appear to be Tier 3 maturity
- **Limited Help Center Content:** Lack of Help Center articles for many integrations suggests either very simple setup or incomplete documentation

---

## Inferred UI Elements

Based on integration functionality and typical SaaS patterns, BeProfit likely includes:

### Integrations Settings Page
- **Integration Cards:** Grid or list of all available integrations (Shopify, Amazon, WooCommerce, etc.)
- **Connection Status Indicators:** Green checkmark (connected), gray (not connected), red (error)
- **"Connect" Buttons:** OAuth flow initiation for Facebook, Google, Shopify
- **"Disconnect" Buttons:** Remove integration and stop data sync
- **Last Sync Timestamp:** "Last synced: 5 minutes ago" for each integration

### Individual Integration Settings
- **Shopify:** OAuth connect button, store URL display, sync frequency settings
- **Amazon:** Seller ID input, MWS Auth Token input, marketplace selector (US, UK, EU)
- **Facebook Ads:** Ad account selector, attribution window settings (1-day, 7-day, 28-day)
- **Google Ads:** OAuth connect, customer ID input, campaign selection
- **Shipping Platforms:** API key inputs, warehouse selection (ShipBob)

### Dashboard Integration Indicators
- **Platform Badges:** Each order shows source platform icon (Shopify logo, Amazon logo)
- **Ad Spend Cards:** Marketing section shows breakdown by platform (Facebook $500, Google $300, TikTok $200)
- **Sync Status Banner:** "Syncing data from Shopify..." or "All integrations up to date"

### Manual Sync Controls
- **"Sync Now" Button:** Force refresh for each integration
- **Initial Sync Progress Bar:** For first-time connection, shows "Importing 2,500 orders from Shopify (60% complete)"

---

## Data Model Implications

### Integration Entity
```
Integration {
  id: UUID
  user_id: UUID (foreign key to User)
  platform_type: enum (shopify, amazon, woocommerce, facebook_ads, google_ads, etc.)
  connection_status: enum (connected, disconnected, error, syncing)
  credentials: JSONB (encrypted OAuth tokens, API keys, etc.)
  settings: JSONB (attribution window, sync frequency, selected ad accounts, etc.)
  last_sync_at: timestamp
  initial_sync_complete: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

### Shop / Store Entity (E-Commerce Platforms)
```
Shop {
  id: UUID
  user_id: UUID
  integration_id: UUID (foreign key to Integration)
  platform: enum (shopify, amazon, woocommerce, wix)
  shop_name: string
  shop_url: string (myshopify.com, Amazon Seller ID, WooCommerce site URL)
  currency: string (USD, EUR, GBP)
  timezone: string
  // Platform-specific fields stored in JSONB
  platform_metadata: JSONB
}
```

### AdAccount Entity (Ad Platforms)
```
AdAccount {
  id: UUID
  user_id: UUID
  integration_id: UUID
  platform: enum (facebook, google, tiktok, snapchat, pinterest)
  account_id: string (external platform account ID)
  account_name: string
  currency: string
  attribution_window: integer (days - e.g., 1, 7, 28)
  active: boolean
}
```

### Order Entity (E-Commerce Data)
```
Order {
  id: UUID
  shop_id: UUID (foreign key to Shop)
  external_id: string (Shopify order ID, Amazon order ID)
  source_platform: enum (shopify, amazon, woocommerce)
  order_number: string
  created_at: timestamp
  total_value: decimal
  // ... other order fields

  // Integration-sourced expense data
  shipping_cost: decimal (from ShipStation/ShipBob/etc.)
  transaction_fees: decimal (from Shopify Payments/Stripe via Shopify)
  marketplace_fees: decimal (Amazon referral fees, FBA fees)
}
```

### AdSpend Entity (Ad Platform Data)
```
AdSpend {
  id: UUID
  ad_account_id: UUID (foreign key to AdAccount)
  date: date
  platform: enum (facebook, google, tiktok)
  campaign_id: string (external campaign ID)
  campaign_name: string
  spend: decimal
  impressions: integer
  clicks: integer
  conversions: integer
  attributed_revenue: decimal (based on attribution window)
  // UTM tracking for Shopify
  utm_source: string
  utm_medium: string
  utm_campaign: string
}
```

---

## Limitations & Gaps

### E-Commerce Platforms
- **Missing Major Platforms:** BigCommerce, Magento, Squarespace, Volusion
- **Missing Marketplaces:** eBay, Etsy, Walmart Marketplace
- **International Platforms:** No AliExpress (merchant), Mercado Libre, or regional platforms

### Ad Platforms
- **Limited Coverage:** No LinkedIn Ads, Reddit Ads, Twitter/X Ads
- **Affiliate Networks:** No Amazon Associates, ShareASale, CJ Affiliate
- **Display Networks:** No explicit support for programmatic display (DV360, etc.)

### Email/SMS
- **Limited Options:** Only Klaviyo prominently supported
- **Missing Major Players:** Mailchimp, Omnisend, Postscript, Attentive

### Accounting
- **No QuickBooks/Xero:** Major gap for businesses wanting automated P&L export to accounting software
- **Manual Export Only:** Relies on CSV/Google Sheets export rather than two-way sync

### Payment Processors
- **No Direct Integration:** Cannot directly connect Stripe/PayPal accounts (must go through e-commerce platform)
- **Limited Fee Tracking:** May miss fees if not captured by e-commerce platform API

### Analytics
- **No GA4 Advanced Features:** Google Analytics integration likely basic (no documented custom event tracking)
- **No Attribution Modeling:** Appears to use last-click attribution (or attribution window settings) without multi-touch attribution

### Data Sync
- **API Access Gated:** API limited to $249/month Plus plan, preventing mid-tier customers from building custom integrations
- **No Webhooks:** No documented webhook support for real-time event notifications
- **No Zapier:** Cannot connect to 1,000+ tools via Zapier (unlike competitors like TrueProfit)

---

## Relevance to Our Build

### 7-10 Actionable Insights for Our Integration Strategy

1. **Integration as Competitive Moat**
   - BeProfit's native integrations (19-20 platforms) are a key differentiator
   - Building native integrations for Shopify, Amazon, WooCommerce, Facebook Ads, Google Ads is **table stakes** - these 5 integrations are minimum viable
   - Quality matters: BeProfit's Shopify integration has 4.5★ rating after 5+ years of refinement

2. **No Integration Gating = Powerful Value Proposition**
   - BeProfit offers ALL integrations on the $49 Basic plan (no feature gating, only volume limits)
   - This is a strong competitive advantage - consider adopting similar all-inclusive approach
   - Our differentiation should be in **quality of profit calculations** and **UX**, not artificial integration restrictions

3. **Gaps We Can Exploit**
   - **Accounting Integrations:** QuickBooks/Xero integration would differentiate us significantly
   - **More Email/SMS Options:** Support for Mailchimp, Omnisend, Postscript beyond just Klaviyo
   - **Marketplace Expansion:** eBay, Etsy, Walmart support for multi-channel sellers
   - **Zapier as Escape Hatch:** Offer Zapier integration as catch-all for tools we don't natively support

4. **Shopify-First Development is Smart**
   - BeProfit's Shopify integration is most mature (5+ years, 194 reviews, 4.5★ rating)
   - Shopify has largest e-commerce app ecosystem and developer-friendly API
   - **Recommendation:** Launch with Shopify-first, then add WooCommerce, then Amazon

5. **Ad Platform Trio is Critical**
   - Facebook Ads, Google Ads, TikTok Ads are the "Big 3" for DTC brands in 2026
   - These 3 ad platforms MUST be supported from day 1
   - Pinterest, Snapchat can be added later (Tier 2 priority)

6. **API Access as Premium Feature**
   - BeProfit gates API access to $249/month Plus plan
   - This creates enterprise revenue opportunity while protecting integration ecosystem
   - **Recommendation:** Consider similar approach - free/low-tier has no API, Premium/Enterprise gets API

7. **Shipping Integration is Underrated**
   - BeProfit supports 4 shipping platforms (ShipStation, ShipBob, ShipHero, Shippo)
   - Shipping costs are critical for accurate profit calculation, especially for dropshippers
   - **Recommendation:** Support at least ShipStation (most popular) and ShipBob (3PL/dropshipping)

8. **UTM Attribution is Key for Shopify**
   - BeProfit's built-in UTM attribution for Shopify is mentioned as a key feature
   - Allows merchants to track which campaigns/channels drive profit (not just revenue)
   - **Recommendation:** Implement UTM tracking and attribution from day 1 for Shopify

9. **Data Export > Data Import**
   - BeProfit emphasizes export (Google Sheets, CSV) over import or two-way sync
   - This is pragmatic: easier to build one-way export than bidirectional accounting sync
   - **Recommendation:** Prioritize easy export to Google Sheets/Excel for handoff to accountants

10. **Tech Partner Ecosystem is Growth Channel**
    - BeProfit's tech partner directory (integrations.beprofit.co) lists 15+ complementary tools
    - Partnerships with Shopify apps (PageFly, UpPromote, etc.) drive co-marketing and referrals
    - **Recommendation:** Build integration partnerships with popular Shopify apps early for distribution

---

## Integration Roadmap Recommendation (Phased Approach)

### Phase 1: MVP (Table Stakes - Launch Blockers)
**E-commerce:** Shopify (OAuth, full order/product/customer sync)
**Ad Platforms:** Facebook Ads, Google Ads, TikTok Ads (OAuth, ad spend + conversions)
**Shipping:** ShipStation (API key, shipping cost sync)
**Email:** Klaviyo (OAuth, email revenue attribution)
**Export:** Google Sheets export, CSV export

### Phase 2: Parity (Match BeProfit)
**E-commerce:** Amazon Seller Central (MWS/SP-API), WooCommerce (REST API)
**Ad Platforms:** Instagram Ads (via Meta), Pinterest Ads, Snapchat Ads
**Shipping:** ShipBob (3PL fulfillment costs)
**Analytics:** Google Analytics (basic integration)

### Phase 3: Differentiation (Beat BeProfit)
**Accounting:** QuickBooks Online (OAuth, auto-export P&L)
**Accounting:** Xero (OAuth, auto-export P&L)
**Email/SMS:** Mailchimp, Omnisend, Postscript
**Marketplaces:** eBay, Etsy, Walmart
**Zapier:** Universal connector for tools we don't natively support

### Phase 4: Enterprise (Premium Features)
**API Access:** REST API for custom integrations (gated to Premium/Enterprise tier)
**Webhooks:** Real-time event webhooks for order creation, ad spend updates
**Multi-Touch Attribution:** Beyond last-click, support first-click, linear, time-decay attribution models

---

## Sources Referenced
- BeProfit Marketing Site: https://beprofit.co/
- BeProfit Integrations Page: https://beprofit.co/integrations/
- Shopify App Store Listing: https://apps.shopify.com/beprofit-profit-tracker
- GetApp Review: https://www.getapp.com/website-ecommerce-software/a/beprofit/
- Capterra Review: https://www.capterra.com/p/214079/BeProfit/
- SourceForge Integrations: https://sourceforge.net/software/product/BeProfit/integrations/
- BeProfit Tech Partner Directory: https://integrations.beprofit.co/ (individual partner pages)
