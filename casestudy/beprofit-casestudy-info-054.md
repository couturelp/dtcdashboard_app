# BeProfit Plan Feature Gating Details

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Secondary URLs:**
  - https://beprofit.co/pricing (feature comparison table)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store feature list)
- **Category:** Help Center / Plans & Feature Access
- **Subcategory:** Feature Gating, Limits, Restrictions
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research to populate

---

## Research Objective

Document which features are gated behind which plan tiers, usage limits per plan (orders/month, stores, users, integrations), add-on features available for purchase, free trial details, and free tier details. This is the detailed feature gating matrix that complements the pricing information in file 053.

---

## Feature Gating Philosophy

### Understanding Feature Gates

**Expected Help Articles:**
- "Plan features comparison"
- "What features are available on my plan?"
- "Upgrading to unlock features"
- "Feature restrictions by plan"

**Key Areas to Document:**
- [ ] How features are gated:
  - Hard gates (feature completely unavailable, grayed out, hidden)
  - Soft gates (feature visible but shows upgrade prompt when clicked)
  - Usage-based gates (feature available but limited by quota)
- [ ] Upgrade prompts:
  - In-app messaging when trying to access gated features
  - "Upgrade to Pro" call-to-action placement
  - Feature comparison shown in upgrade prompts
  - Trial vs paid feature gates
- [ ] Feature discovery:
  - Are gated features visible to lower-tier users?
  - Marketing for higher-tier features within the app
  - Feature announcement for newly available features after upgrade

**Questions to Answer:**
1. Can users see features they don't have access to?
2. What happens when you try to use a gated feature?
3. Are feature gates clearly labeled in the UI?
4. Do gated features show previews or demos?

---

## Core Feature Gating Matrix

### E-Commerce Platform Integrations

**Expected Help Articles:**
- "Which platforms are supported on my plan?"
- "Connecting multiple platforms"
- "Platform availability by plan"

| Platform | Free Trial | Starter | Pro | Ultimate | Enterprise |
|----------|-----------|---------|-----|----------|------------|
| **Shopify** | ✓ | ? | ✓ | ✓ | ✓ |
| **Amazon** | ? | ? | ? | ✓ | ✓ |
| **WooCommerce** | ? | ? | ? | ✓ | ✓ |
| **Wix** | ? | ? | ? | ✓ | ✓ |

**Key Questions:**
- Are all platforms available on all plans or gated?
- Can Starter plan users only connect Shopify?
- Are certain platforms enterprise-only?

---

### Ad Platform Integrations

**Expected Help Articles:**
- "Ad platform integrations by plan"
- "Which ad platforms can I connect?"
- "Connecting Facebook Ads, Google Ads, TikTok"

| Ad Platform | Free Trial | Starter | Pro | Ultimate | Enterprise |
|-------------|-----------|---------|-----|----------|------------|
| **Facebook Ads** | ? | ? | ✓ | ✓ | ✓ |
| **Google Ads** | ? | ? | ✓ | ✓ | ✓ |
| **TikTok Ads** | ? | ? | ✓ | ✓ | ✓ |
| **Instagram Ads** | ? | ? | ✓ | ✓ | ✓ |
| **Pinterest Ads** | ? | ? | ? | ✓ | ✓ |
| **Snapchat Ads** | ? | ? | ? | ✓ | ✓ |
| **Microsoft Ads** | ? | ? | ? | ✓ | ✓ |
| **Amazon Ads** | ? | ? | ? | ✓ | ✓ |
| **Multiple Ad Accounts** | ? | ? | ? | ? | ✓ |

**Key Questions:**
- Are "Big 3" ad platforms (FB, Google, TikTok) available on all plans?
- Are smaller ad platforms (Pinterest, Snapchat) gated to higher tiers?
- Can you connect multiple ad accounts per platform on lower tiers?

---

### Email/SMS & Marketing Integrations

**Expected Help Articles:**
- "Email marketing integrations"
- "Connecting Klaviyo"
- "Marketing tool availability"

| Integration | Free Trial | Starter | Pro | Ultimate | Enterprise |
|-------------|-----------|---------|-----|----------|------------|
| **Klaviyo** | ? | ? | ✓ | ✓ | ✓ |
| **Other Email/SMS** | ? | ? | ? | ✓ | ✓ |

**Key Questions:**
- Is Klaviyo available on all plans?
- Are other email platforms gated?

---

### Shipping & Fulfillment Integrations

**Expected Help Articles:**
- "Shipping integrations by plan"
- "3PL and fulfillment center connections"

| Integration | Free Trial | Starter | Pro | Ultimate | Enterprise |
|-------------|-----------|---------|-----|----------|------------|
| **ShipStation** | ? | ? | ✓ | ✓ | ✓ |
| **ShipBob** | ? | ? | ✓ | ✓ | ✓ |
| **ShipHero** | ? | ? | ? | ✓ | ✓ |
| **Shippo** | ? | ? | ? | ✓ | ✓ |

**Key Questions:**
- Are shipping integrations available on lower tiers?
- Do you need Pro+ for shipping cost tracking?

---

### Analytics & Reporting Features

**Expected Help Articles:**
- "Custom reports availability"
- "Advanced analytics by plan"
- "Report builder access"
- "Cohort analysis availability"

| Feature | Free Trial | Starter | Pro | Ultimate | Enterprise |
|---------|-----------|---------|-----|----------|------------|
| **Standard Dashboard** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Overview Page** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Orders Page** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Products Page** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Marketing Reports** | ? | ? | ✓ | ✓ | ✓ |
| **Custom Reports** | ✗ | ? | ✓ | ✓ | ✓ |
| **Report Builder** | ✗ | ✗ | ? | ✓ | ✓ |
| **Cohort Analysis** | ✗ | ✗ | ? | ✓ | ✓ |
| **LTV Analysis** | ✗ | ? | ? | ✓ | ✓ |
| **Advanced Filtering** | ? | ? | ✓ | ✓ | ✓ |
| **Saved Reports** | ? | Limited? | ✓ | ✓ | ✓ |
| **Scheduled Reports** | ✗ | ✗ | ? | ✓ | ✓ |

**Key Questions:**
- Which reporting features are available on each plan?
- Is custom report builder Pro+ only?
- Are cohort and LTV analysis Ultimate+ only?
- Can Starter plan users create custom reports?

---

### Data Export & API Features

**Expected Help Articles:**
- "Data export by plan"
- "API access availability"
- "Export limits"

| Feature | Free Trial | Starter | Pro | Ultimate | Enterprise |
|---------|-----------|---------|-----|----------|------------|
| **CSV Export** | ? | ✓ | ✓ | ✓ | ✓ |
| **Excel Export** | ? | ? | ✓ | ✓ | ✓ |
| **Google Sheets Sync** | ✗ | ? | ✓ | ✓ | ✓ |
| **Scheduled Exports** | ✗ | ✗ | ? | ✓ | ✓ |
| **API Access** | ✗ | ✗ | ? | ✓ | ✓ |
| **Webhook Support** | ✗ | ✗ | ✗ | ? | ✓ |
| **Bulk Data Export** | ? | ? | ✓ | ✓ | ✓ |

**Key Questions:**
- Is basic CSV export available on all plans?
- Is API access Pro+ or Ultimate+ only?
- Are there export frequency limits by plan?

---

## Usage Limits & Quotas

### Order Volume Limits

**Expected Help Articles:**
- "Order limits by plan"
- "What counts toward order limit"
- "Exceeding order limit"
- "Overage charges"

**Key Areas to Document:**
- [ ] Monthly order limits:
  - Free Trial: ? orders
  - Starter: ? orders (e.g., 100, 500, 1000?)
  - Pro: ? orders (e.g., 2500, 5000?)
  - Ultimate: ? orders (e.g., 10,000, unlimited?)
  - Enterprise: Unlimited
- [ ] Order counting methodology:
  - What counts as an order (fulfilled only, all orders, paid orders?)
  - How refunds affect order count
  - How test orders are handled
  - Multi-store order counting (per store or aggregate?)
- [ ] Exceeding limits:
  - Hard stop (data sync stops) or soft limit (overage fee)?
  - Overage fee structure (e.g., $0.01 per order over limit)
  - Grace period before enforcement
  - Upgrade prompts when approaching limit
  - Mid-month limit increase via upgrade
- [ ] Limit visibility:
  - Usage meter in UI (e.g., "450 / 1000 orders")
  - Email notifications at 80%, 90%, 100% thresholds
  - Historical usage tracking

**Questions to Answer:**
1. What are the exact order limits for each plan?
2. What happens when you exceed your order limit?
3. Are there overage fees or is it a hard stop?
4. Can you upgrade mid-month to increase limit?
5. Do canceled/refunded orders count toward limit?

---

### Store Limits

**Expected Help Articles:**
- "How many stores can I connect?"
- "Additional store pricing"
- "Store limits by plan"

**Key Areas to Document:**
- [ ] Store quantity limits:
  - Free Trial: ? stores (likely 1)
  - Starter: ? stores (1 or 2?)
  - Pro: ? stores (3-5?)
  - Ultimate: ? stores (10?)
  - Enterprise: Unlimited
- [ ] Additional store pricing:
  - Cost per additional store (e.g., +$10/month, +$29/month?)
  - Varies by plan tier
  - Platform-specific limits (can you add 3 Shopify stores on Pro?)
- [ ] Store management:
  - Can you swap stores (remove one, add another)?
  - Store archiving vs deletion
  - Reactivating archived stores

**Questions to Answer:**
1. How many stores are included in each plan?
2. Can you buy additional store capacity?
3. How much do additional stores cost?
4. Are there different limits by platform type?

---

### Team Member / User Limits

**Expected Help Articles:**
- "Team member limits"
- "User seats by plan"
- "Adding additional users"

**Key Areas to Document:**
- [ ] User seat limits:
  - Free Trial: ? users (likely 1)
  - Starter: ? users (1-2?)
  - Pro: ? users (3-5?)
  - Ultimate: ? users (10?, unlimited?)
  - Enterprise: Unlimited
- [ ] Additional user pricing:
  - Cost per additional user seat (e.g., +$5/month, +$10/month?)
  - Varies by plan tier
- [ ] User types counted:
  - Do all roles count equally (admin, user, viewer)?
  - Are read-only users free or counted?
  - Guest user access (if any)

**Questions to Answer:**
1. How many users are included in each plan?
2. Can you add extra user seats?
3. How much do additional users cost?
4. Do read-only users count toward limit?

---

### Data Retention Limits

**Expected Help Articles:**
- "Historical data access"
- "Data retention by plan"
- "How far back can I view data?"

**Key Areas to Document:**
- [ ] Historical data limits:
  - Free Trial: ? months (e.g., 3 months, 6 months?)
  - Starter: ? months (6 months, 12 months?)
  - Pro: ? months (12 months, 24 months?)
  - Ultimate: Unlimited (all historical data since account creation)
  - Enterprise: Unlimited
- [ ] What happens to old data:
  - Is it deleted or just hidden?
  - Can you access beyond limit via export?
  - Upgrade to unlock older data (does it reappear?)
- [ ] Initial data import limits:
  - When connecting a store, how far back does initial sync go?
  - Is initial import different from ongoing retention?

**Questions to Answer:**
1. How far back can you view data on each plan?
2. Is old data deleted or just inaccessible?
3. If you upgrade, can you access older data?
4. When you first connect a store, how much history is imported?

---

### Data Sync Frequency Limits

**Expected Help Articles:**
- "Data sync frequency by plan"
- "Real-time data sync"
- "Manual refresh limits"

**Key Areas to Document:**
- [ ] Automatic sync frequency:
  - Free Trial: ? (e.g., every 6 hours, daily?)
  - Starter: ? (e.g., every 6 hours, every 12 hours?)
  - Pro: ? (e.g., every 1 hour, every 3 hours?)
  - Ultimate: ? (e.g., every 15 minutes, real-time?)
  - Enterprise: Real-time or near real-time
- [ ] Manual refresh limits:
  - Free Trial: ? per day
  - Starter: ? per day (e.g., 1-3 refreshes?)
  - Pro: ? per day (e.g., 5-10 refreshes?)
  - Ultimate: Unlimited or very high limit
  - Enterprise: Unlimited
- [ ] Sync priority:
  - Do higher-tier plans get priority in sync queue?
  - Peak time sync delays by plan

**Questions to Answer:**
1. How often does data sync automatically on each plan?
2. Can you manually refresh data?
3. Are there limits on manual refreshes?
4. Is real-time sync available? On which plans?

---

### Integration Quantity Limits

**Expected Help Articles:**
- "How many integrations can I connect?"
- "Ad account limits"
- "Multiple account connections"

**Key Areas to Document:**
- [ ] Ad account limits per platform:
  - Can you connect multiple Facebook Ads accounts?
  - Multiple Google Ads accounts?
  - Limits by plan tier
- [ ] Email/SMS account limits:
  - One Klaviyo account or multiple?
- [ ] Shipping account limits:
  - How many ShipStation accounts can you connect?
- [ ] Total integration limits:
  - Overall cap on number of integrations?

**Questions to Answer:**
1. Can you connect multiple ad accounts per platform?
2. Are there limits on total number of integrations?
3. Do higher plans allow more integration connections?

---

## Feature-Specific Gates

### Dashboard & Visualization Features

**Expected Help Articles:**
- "Dashboard customization by plan"
- "Widget availability"
- "Chart types by plan"

**Key Areas to Document:**
- [ ] Dashboard customization:
  - Widget drag-and-drop (all plans or Pro+?)
  - Custom dashboard layouts (limited on lower plans?)
  - Number of custom dashboards you can save
- [ ] Visualization types:
  - Basic charts (line, bar, pie) available on all plans
  - Advanced charts (cohort heatmaps, funnel charts) gated?
  - Interactive charts vs static on lower plans
- [ ] "Today's Snapshot" bar customization:
  - Can you customize metrics shown?
  - Gated by plan tier?

**Questions to Answer:**
1. Which dashboard features are available on each plan?
2. Can all users customize their dashboard?
3. Are there limits on saved dashboard layouts?

---

### Order & Product Analysis Features

**Expected Help Articles:**
- "Order-level profit analysis"
- "Product profitability by plan"
- "SKU-level analysis"

**Key Areas to Document:**
- [ ] Order-level analysis:
  - Order detail page with full profit breakdown (all plans?)
  - Batch order editing (Pro+?)
  - Order tagging and categorization (all plans?)
- [ ] Product analysis:
  - Product profitability page (all plans?)
  - SKU-level profit tracking (all plans?)
  - Product comparison tools (Pro+?)
  - Best/worst performing products (all plans?)
  - Product recommendation engine (Ultimate+?)
- [ ] Filtering and segmentation:
  - Basic filters (all plans)
  - Advanced filters with multiple conditions (Pro+?)
  - Saved filter sets (Pro+?)
  - Customer segment filters (all plans?)

**Questions to Answer:**
1. Can all users see order-level profit breakdowns?
2. Are advanced filtering tools gated?
3. Is product-level analysis available on all plans?

---

### Marketing & Attribution Features

**Expected Help Articles:**
- "Marketing attribution by plan"
- "UTM tracking availability"
- "ROAS calculation"
- "Campaign analysis"

**Key Areas to Document:**
- [ ] Attribution features:
  - UTM tracking (Shopify only? All platforms? All plans?)
  - Multi-touch attribution (Ultimate+?)
  - Source/medium tracking (all plans?)
  - Campaign profitability (Pro+?)
- [ ] Marketing metrics:
  - ROAS, POAS, CPA (all plans?)
  - Channel comparison (all plans?)
  - Campaign ROI tracking (Pro+?)
- [ ] Ad platform reporting:
  - Basic ad spend sync (all plans with ad integrations?)
  - Campaign-level breakdown (Pro+?)
  - Ad-level breakdown (Ultimate+?)
  - Creative performance (Ultimate+?)

**Questions to Answer:**
1. Is UTM tracking available on all plans?
2. Are advanced attribution features gated?
3. Can all users see ROAS and marketing ROI?

---

### Fulfillment & Operational Features

**Expected Help Articles:**
- "Fulfillment tracking by plan"
- "Shipping cost analysis"
- "Operational expenses by plan"

**Key Areas to Document:**
- [ ] Fulfillment tracking:
  - Fulfillment cost sync (all plans?)
  - 3PL cost tracking (Pro+?)
  - Shipping profitability analysis (Pro+?)
- [ ] Operational expenses:
  - Add fixed costs (all plans?)
  - Expense allocation rules (Pro+?)
  - Expense scheduling (Pro+?)

**Questions to Answer:**
1. Is fulfillment cost tracking available on all plans?
2. Can all users add operational expenses?

---

### Insights & AI Features

**Expected Help Articles:**
- "Insights feature"
- "AI-powered recommendations"
- "Automated alerts"

**Key Areas to Document:**
- [ ] Insights page:
  - Automated insights and anomaly detection (Pro+? Ultimate+?)
  - AI-powered recommendations (Ultimate+?)
  - Profitability alerts (all plans?)
- [ ] Predictive features:
  - Sales forecasting (Ultimate+?)
  - Profit predictions (Ultimate+?)
  - Trend analysis (Pro+?)

**Questions to Answer:**
1. Is the Insights feature available on all plans?
2. Are AI-powered features gated to higher tiers?

---

### Working Capital Feature

**Expected Help Articles:**
- "Working Capital by plan"
- "Cash flow features"
- "Financing options"

**Key Areas to Document:**
- [ ] Working Capital availability:
  - Available on which plans?
  - Requirements to access (order volume, revenue, plan tier?)
  - Financing options available
  - Interest rates and terms
- [ ] Cash flow features:
  - Cash flow projection (Ultimate+?)
  - Inventory financing (Working Capital feature only?)

**Questions to Answer:**
1. Which plans include Working Capital feature?
2. Are there revenue or order requirements to access it?
3. Is it an add-on or included in certain tiers?

---

## Add-On Features & Services

### Available Add-Ons

**Expected Help Articles:**
- "Add-on features"
- "Premium add-ons"
- "Additional services"

**Key Areas to Document:**
- [ ] Purchasable add-ons:
  - Additional stores
  - Additional users
  - API access (if not included in plan)
  - Priority support
  - Onboarding/setup services
  - Custom integrations
  - Data migration services
  - White-label options
- [ ] Add-on pricing:
  - One-time fees vs recurring
  - Price per add-on
  - Bundle discounts

**Questions to Answer:**
1. What add-ons are available for purchase?
2. Can you add features à la carte or only via plan upgrade?
3. Are there setup/onboarding services available?

---

## Free Trial Feature Access

### Trial Feature Availability

**Expected Help Articles:**
- "What features are available during free trial?"
- "Trial limitations"
- "Testing features before subscribing"

**Key Areas to Document:**
- [ ] Feature access during trial:
  - Do trial users get access to all Ultimate features?
  - Or limited to specific plan tier features?
  - Are some features demo-only (view but not use)?
- [ ] Trial limitations:
  - Data volume limits (max orders, products, stores during trial)
  - Integration limits during trial
  - Export restrictions during trial
  - User limit during trial (1 user only?)
- [ ] Trial-to-paid transition:
  - Do settings/configurations carry over?
  - Which plan tier is recommended based on trial usage?

**Questions to Answer:**
1. What features can you access during the free trial?
2. Are trial users limited to a specific plan tier's features?
3. Are there usage caps during the trial?
4. Can you test all integrations during trial?

---

## Free Tier Details (If Exists)

### Permanent Free Plan

**Expected Help Articles:**
- "Free plan details"
- "Forever free option"
- "Free vs trial"

**Key Areas to Document:**
- [ ] Free plan existence:
  - Is there a permanent free tier or only free trial?
  - Free tier requirements (Shopify app only? specific regions?)
- [ ] Free plan limitations:
  - Order volume limit (e.g., 50 orders/month?)
  - Feature restrictions (basic dashboard only?)
  - Integration restrictions (Shopify only?)
  - Branding (powered by BeProfit watermark?)
- [ ] Free plan upgrade path:
  - How does free tier upgrade to paid?
  - Seamless or requires reconfiguration?

**Questions to Answer:**
1. Is there a free forever plan or just a free trial?
2. What are the limitations of the free plan?
3. Can you stay on free plan indefinitely?

---

## Plan Recommendation Logic

### Which Plan Should I Choose?

**Expected Help Articles:**
- "Choosing the right plan"
- "Plan selector tool"
- "When to upgrade"

**Key Areas to Document:**
- [ ] Plan selector criteria:
  - Monthly order volume
  - Number of stores
  - Number of sales channels/platforms
  - Number of ad accounts
  - Number of team members
  - Need for custom reports
  - Need for API access
- [ ] Recommended plans by business type:
  - Starter: Single-store, Shopify-only, <500 orders/month
  - Pro: Multi-store, multi-channel, 500-5000 orders/month
  - Ultimate: High-volume, advanced analytics, >5000 orders/month
  - Enterprise: Multi-brand, agency, complex needs
- [ ] Upgrade triggers:
  - When to upgrade from Starter to Pro
  - When to upgrade from Pro to Ultimate

**Questions to Answer:**
1. What criteria determine which plan is right for a user?
2. Is there a plan selection tool or quiz?
3. What are the common reasons users upgrade?

---

## Feature Gate Messaging & UI

### How Gated Features are Presented

**Expected UI Documentation:**
- Screenshots descriptions of upgrade prompts
- Feature gate messaging examples
- Upgrade call-to-action designs

**Key Areas to Document:**
- [ ] Gated feature discovery:
  - Are gated features visible in navigation?
  - "Pro" or "Ultimate" badges next to feature names
  - Locked icon indicators
- [ ] Upgrade prompts:
  - Modal popup design ("Upgrade to unlock")
  - Feature comparison table shown in modal
  - Pricing displayed in upgrade prompt
  - "Learn More" vs "Upgrade Now" buttons
- [ ] In-app marketing:
  - Banners promoting higher-tier features
  - Email campaigns about upgrades
  - Feature announcements for new plan features

**Questions to Answer:**
1. How are gated features communicated in the UI?
2. What messaging is used to encourage upgrades?
3. Can users preview gated features?

---

## Research Checklist

To complete this document, systematically search the help center for:
- [ ] "plan features"
- [ ] "feature comparison"
- [ ] "which plan"
- [ ] "upgrade"
- [ ] "order limit"
- [ ] "store limit"
- [ ] "user limit"
- [ ] "team member limit"
- [ ] "data retention"
- [ ] "historical data"
- [ ] "sync frequency"
- [ ] "real-time"
- [ ] "custom reports" + "plan"
- [ ] "API access" + "plan"
- [ ] "free trial features"
- [ ] "free plan"
- [ ] "add-on"
- [ ] "additional store"
- [ ] "additional user"

Also:
- [ ] Screenshot/document the pricing page feature comparison table
- [ ] Document all "upgrade to unlock" prompts encountered
- [ ] Note all plan badges/indicators in the UI
- [ ] Cross-reference Shopify App Store listing for plan details

Document:
1. Complete feature availability matrix for all plan tiers
2. All usage limits and quotas
3. Exact thresholds for each limit
4. Overage fee structures (if any)
5. Add-on options and pricing
6. Trial feature access details
7. Free plan details (if exists)
8. Upgrade messaging and UI patterns

---

## Next Steps

After manual research:
1. Populate ALL feature gating tables with accurate data
2. Fill in exact usage limits (orders, stores, users) for each plan
3. Document data retention limits precisely
4. Complete add-on and extra capacity pricing
5. Answer all "Questions to Answer" sections with definitive answers
6. Cross-reference with file 053 (Billing & Plans) for consistency
7. Add screenshots descriptions of upgrade prompts and gated feature UI
8. Verify feature gates by testing or reviewing help articles thoroughly

---

**Status:** Template ready for manual research population
**Estimated Completion:** Requires 2-3 hours of systematic help center exploration and pricing page analysis
**Dependencies:**
- Access to BeProfit help center at https://help.runviably.com/beprofit
- Access to https://beprofit.co/pricing (feature comparison table)
- Ideally: trial account access to see gated features and upgrade prompts
