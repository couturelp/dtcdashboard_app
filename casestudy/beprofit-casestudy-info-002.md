# BeProfit Getting Started & Quick Start Guides

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/getting-started (Getting Started category page)
  - https://help.runviably.com/beprofit/how-can-i-export-my-data
  - https://help.runviably.com/beprofit/products-analytics
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — contains extensive onboarding details)
  - https://help.runviably.com/beprofit/track-your-real-time-data
  - https://help.runviably.com/beprofit/customize-snapshot-dashboard-metrics-beprofit-help-center
- **Category:** Onboarding / Getting Started
- **Date Captured:** 2026-02-12

---

## Getting Started — Page Structure

BeProfit's "Getting Started" category is unusual: rather than containing a dedicated linear onboarding guide, it serves as a **hub page** that cross-references articles from other feature-specific categories. The page has only 2 direct articles ("How can I export my data?" and "Products Analytics") and then surfaces subcategory links to:

- Customer Lifetime Value
- Marketing Analytics (Marketing Platforms + UTM Attribution)
- Products (Products Reports and Analytics + Product Costs/COGS)
- Fulfillment (Shipping & Handling — Fulfillment Profile + Shipping Providers)
- Profit Dashboard

This means BeProfit does **not** have a single, consolidated "quick start guide." Instead, the onboarding sequence must be inferred from the FAQ, feature docs, and the product's implicit flow.

---

## Onboarding Sequence (Inferred from Documentation)

Based on the FAQ and feature articles, the recommended setup sequence for a new BeProfit user is:

### Phase 1: Account & Store Setup
1. **Sign up / Start free trial** — 14-day free trial available for all plans
2. **Connect your e-commerce store** — Supported platforms: Shopify, Amazon, WooCommerce, Wix
3. **Wait for initial data sync** — Historical order data is pulled automatically after connection

### Phase 2: Cost Configuration
4. **Set up COGS (Cost of Goods Sold)** — Via manual entry, CSV/Google Sheets upload, or auto-sync from platform
5. **Configure shipping/fulfillment costs** — Settings → Costs → Fulfillment (profiles, tiered rates)
6. **Set processing/transaction fees** — Settings → Costs → Processing Fees (PayPal, Shopify fees auto-detected for Shopify stores)
7. **Add operational expenses** — Custom Operational Expenses feature (rent, payroll, etc.)
8. **Configure taxes** — Tax data pulled from order data; additional settings available

### Phase 3: Marketing Integration
9. **Connect ad platforms** — Facebook, Google, TikTok, etc. via OAuth
10. **Set up UTM attribution** — For tracking marketing channel performance (Shopify stores only)

### Phase 4: Dashboard Configuration
11. **Customize dashboard metrics** — Drag-and-drop metric organization, toggle visibility
12. **Customize snapshot view** — Select which KPI metrics appear in the summary snapshot
13. **Set up reporting** — Schedule reports, create custom reports, enable daily profit emails

### Phase 5: Advanced (Optional)
14. **Connect additional stores** — Multi-shop support (Plus plan: multiple shops in one subscription; other plans: separate subscription per shop)
15. **Set up team members** — Invite team members to the account
16. **Configure calculation preferences** — Customize how BeProfit calculates profit metrics

---

## Step-by-Step Workflows

### Workflow 1: Exporting Data
**Article:** "How can I export my data?"
**URL:** https://help.runviably.com/beprofit/how-can-i-export-my-data

1. Navigate to any page that supports data export
2. Click the "Export" button in the top right corner of the page
3. Download the data specific to that page
4. Repeat for each section/page you need data from

**Plus Plan Enhancement:** Plus plan members can export all data simultaneously from the Custom Reports screen instead of exporting page by page.

**UI Element:** Export button (176x96px) visible in top-right corner of supported pages.

### Workflow 2: Products Analytics Dashboard
**Article:** "Products Analytics"
**URL:** https://help.runviably.com/beprofit/products-analytics

1. Navigate to the Products Analytics section
2. View the unit count visualization graph (weekly units sold by product)
3. Apply filters for specific products, vendors, variants, or types
4. Use grouping options to reorganize data for different analytical views
5. View the detailed metrics table (Order Count, Gross Sales, Product Profit)
6. Use "Product Simulators" for scenario forecasting
7. Export data for external analysis

**Key Metrics Available:**
- Order Count
- Gross Sales
- Product Profit
- Unit count visualization (graph)

### Workflow 3: Real-Time Profit Tracking on Dashboard
**Article:** "Track Real-Time Profit, trends and Compare to Past Results"
**URL:** https://help.runviably.com/beprofit/track-your-real-time-data

**Tracking real-time data:**
1. Access the Dashboard section
2. Locate the cloud icon at the top of the dashboard
3. Hover over it to see sync status (syncing indicator during active refresh)
4. View last refresh timestamp and data source

**Selecting time frames:**
1. Open Dashboard
2. Click date range selector in upper right
3. Choose custom date range or predefined options

**Comparing metrics across periods:**
1. Navigate to Dashboard
2. Select "Compare Periods"
3. Pick a metric from the left sidebar list
4. Choose comparison type: "Same Period Last Year" or "Preceding Period"
5. View comparison chart in daily, weekly, or monthly views

**Filtering by customer type:**
1. Go to Dashboard
2. Click "All Customers" dropdown
3. Filter to show new or returning customer performance

### Workflow 4: Customizing Dashboard & Snapshot Metrics
**Article:** "Customize Snapshot & Dashboard Metrics"
**URL:** https://help.runviably.com/beprofit/customize-snapshot-dashboard-metrics-beprofit-help-center

**Dashboard customization:**
1. Access the Dashboard section
2. Click "Customize Dashboard" (sliding button controls)
3. Drag metrics into preferred positions to reorganize
4. Use checkboxes to toggle metric visibility on/off
5. Click "Save" to apply changes
6. Option: "Restore to default" to reset

**Snapshot customization:**
1. Navigate to Dashboard
2. Select "Customize Dashboard Snapshot" (three sliding buttons)
3. Toggle checkboxes to show/hide individual metrics
4. Save modifications
5. Option: Reset to factory defaults

---

## Required vs Optional Actions

| Action | Required? | Why |
|--------|-----------|-----|
| Connect e-commerce store | Yes | No data without a connected store; this is the fundamental first step |
| Wait for data sync | Yes | Automatic after store connection; cannot use product until sync completes |
| Set up COGS | Recommended | Without COGS, profit calculations will be inaccurate (missing cost data) |
| Configure shipping costs | Recommended | Affects profit accuracy — missing shipping costs = inflated profit numbers |
| Set processing fees | Partial auto | PayPal/Shopify fees auto-detected for Shopify; others need manual setup |
| Add operational expenses | Optional | Rent, payroll, etc. — needed for true net profit but not required for basic use |
| Connect ad platforms | Optional | Only needed if you want marketing analytics / ROAS tracking |
| Set up UTM attribution | Optional | Shopify-only; for tracking marketing channel attribution |
| Customize dashboard | Optional | Dashboard works with defaults; customization is for personalization |
| Set up reports | Optional | Scheduled reports and daily emails are convenience features |
| Invite team members | Optional | Single-user accounts work fine |
| Configure calculation preferences | Optional | Advanced — affects how profit metrics are computed |

---

## Configuration Options & Defaults

| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| Currency display | Store's currency | Cannot be changed | "BeProfit can only show your data in the shop's currency" |
| Date range | Current period | Custom date range, predefined options | Adjustable per page/dashboard |
| Dashboard metrics | All visible | Toggle individual metrics on/off | Drag-and-drop reordering available |
| Snapshot metrics | Default set | Toggle individual KPIs | Customizable via "Customize Dashboard Snapshot" |
| Time comparison | None | Same Period Last Year, Preceding Period | Available via "Compare Periods" |
| Customer filter | All Customers | All, New, Returning | Dashboard-level filter |
| Data sync | Automatic | Cannot be manually triggered | Cloud icon shows sync status |
| Voided/canceled orders | Shown on orders page | Excluded from aggregate data | "Orders page is a raw data page" — profit for voided/canceled orders not included in aggregate views |
| Zero-value orders | Included | Can exclude via Settings → Costs → Calculation Preferences | Exclude orders by status |

---

## Limitations & Caveats

1. **Currency limitation:** BeProfit can only display data in the shop's native currency. Multi-currency support is available for multi-shop setups but not per-transaction conversion.
2. **No dedicated quick start guide:** There is no single linear "Getting Started" document. New users must navigate multiple categories to understand the full setup process.
3. **UTM attribution is Shopify-only:** "UTMs are fully supported and easy to set up in BeProfit" but "supported only with Shopify shops."
4. **Google Sheets COGS updates are forward-only after initial sync:** "The first time the Google sheet is connected...it will update past and future orders. Any future change will only update future orders."
5. **Klaviyo integration discontinued then restored:** Originally discontinued direct Klaviyo integration, advising UTMs instead. Later updated API to restore Klaviyo integration.
6. **No phone support:** "We provide support through our AI bot in chat and human support via email" — no demo calls or phone support.
7. **Account pausing loses data access:** "Pausing your account means you won't have access to your data, but you can easily start a new plan whenever you're ready."
8. **Separate subscriptions per shop (non-Plus):** Multi-shop support requires separate subscriptions unless on Plus plan.
9. **Data export is page-by-page (non-Plus):** Must export each page individually; Plus plan allows bulk export from Custom Reports.

---

## Plan/Tier Feature Gating

| Feature | Free Trial | Basic/Pro | Ultimate | Plus |
|---------|-----------|-----------|----------|------|
| Free trial | 14 days for all plans | — | — | — |
| Data export | Page-by-page | Page-by-page | Page-by-page | All data from Custom Reports |
| Multi-shop in one subscription | No | No | No | Yes |
| Custom Metrics | No | No | No | Yes (created by BeProfit team) |
| Ultimate plan trial | — | — | 14-day trial available | — |

*Note: Full plan comparison details are not documented in the Getting Started articles. The FAQ references Basic, Pro, Ultimate, and Plus tiers but does not list complete feature matrices.*

---

## Related Articles

- Analyze Your Profit Breakdown — https://help.runviably.com/beprofit/analyze-your-profit-breakdown-beprofit-help-center
- Compare BeProfit data to Shopify — https://help.runviably.com/beprofit/compare-beprofit-data-to-shopify-beprofit-help-center
- Marketing Analytics Overview — https://help.runviably.com/beprofit/marketing-analytics-overview-beprofit-help-center
- Exclude ad entities from dashboard calculations — referenced in dashboard customization article

---

## Relevance to Our Build

### Onboarding Design Takeaways
1. **Lack of linear onboarding is a gap:** BeProfit does NOT have a single, step-by-step "Getting Started" guide. Their Getting Started page is a cross-reference hub, not a tutorial. This is a significant competitive opportunity — we should build a clear, linear onboarding wizard that walks users through each setup step in sequence.

2. **Cost setup is the critical onboarding bottleneck:** The documentation reveals that COGS, shipping, and processing fees must all be configured before profit data is meaningful. Our onboarding should make this painfully obvious and guide users through each cost type with progress indicators.

3. **Dashboard-first approach:** BeProfit's getting started documentation leads users to the dashboard early. The dashboard shows data immediately after store connection (even before cost setup is complete), giving users a quick "aha moment." We should adopt a similar approach — show data fast, even if incomplete, then prompt cost setup.

4. **Page-by-page export is a pain point:** The limitation of page-by-page export (unless on Plus) is a user friction point we can address by offering flexible export options across all plans.

5. **Currency inflexibility:** "Can only show data in shop's currency" is a limitation worth solving. Multi-currency display (converting to a preferred currency) would be a differentiator.

6. **Support model:** No phone support, AI chatbot + email only. This is standard for SaaS at their price point but could be a differentiator if we offer more accessible support.

7. **Platform support scope:** Only 4 platforms (Shopify, Amazon, WooCommerce, Wix). This is a clear market positioning choice. We should decide whether to match or exceed this coverage.
