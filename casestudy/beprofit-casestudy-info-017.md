# BeProfit Ad Spend Tracking & Attribution Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/marketing-analytics-overview-beprofit-help-center (Marketing Analytics Overview)
  - https://help.runviably.com/beprofit/how-can-i-track-sales-through-ad-spend (Track Sales Through Ad Spend)
  - https://help.runviably.com/beprofit/marketing-cost-allocation-beprofit-help-center (Marketing Cost Allocation)
  - https://help.runviably.com/beprofit/marketing-by-country (Marketing By Country)
  - https://help.runviably.com/beprofit/tracking-affiliate-influencer-roas-in-beprofit (Affiliate & Influencer ROAS)
  - https://help.runviably.com/beprofit/excluding-ad-campaigns-in-beprofit (Excluding Ad Campaigns)
  - https://help.runviably.com/beprofit/removing-unwanted-ad-account-data-in-beprofit (Removing Unwanted Ad Data)
  - https://help.runviably.com/beprofit/exclude-ad-entities-from-dashboard-calculations-beprofit-help-center (Exclude Ad Entities)
  - https://help.runviably.com/beprofit/troubleshooting-1 (Troubleshooting Marketing Platform Data)
  - https://help.runviably.com/beprofit/utm-attribution-overview-beprofit-help-center (UTM Attribution Overview)
  - Cross-referenced with real dashboard visual inventory (file: prd/manually-added-dump-from-real-dashboard.md)
- **Category:** Core Feature / Marketing Analytics
- **Date Captured:** 2026-02-12
- **Cross-reference:** For ad platform CONNECTION setup, supported platforms, and OAuth flow details, see **beprofit-casestudy-info-007.md**. This file focuses on the analytics, reporting, and attribution layers.

---

## Marketing Analytics Page Overview

The Marketing page is "the central hub where all your marketing data is consolidated, providing a comprehensive overview of your marketing efforts."

### Navigation Path
**Marketing** (megaphone icon) in the left sidebar → expands to reveal four sub-sections:
1. **Ad Spend** (primary tab, default view)
2. **Affiliates & Influencers**
3. **Social**
4. **Email & SMS**

This four-tab structure confirms BeProfit tracks four categories of marketing channels: paid ads, affiliate/influencer, organic social, and email/SMS marketing.

### Page Header Elements
From the real dashboard visual inventory:

| Element | Description |
|---------|-------------|
| Page title | "Marketing" in large bold text |
| Green dot indicator | Next to title — indicates data is live/synced |
| Date range picker | Global control (e.g., "Jan-13-2026 ~ Feb-11-2026") |
| Marketing Simulator button | Solid green/teal CTA — scenario planning tool |
| Refresh Marketing Data button | White outline — manual data refresh trigger |
| Ad Integrations button | White outline — links to connection settings |
| UTM Attribution button | White outline — links to attribution configuration |

---

## Ad Spend Tab (Primary View)

### Layout Structure

The Ad Spend tab is divided into three main areas:

#### 1. Ad Spend Summary Card (Left Panel)
A compact card showing total ad spend broken down by platform with horizontal progress bars:

| Platform | Visual | Example |
|----------|--------|---------|
| Facebook | Blue bar with "f" icon | $2,107 (~70% of total) |
| Google | Green bar with "G" icon | $883 (~30% of total) |
| **Total Ad Spend** | Sum | $2,990 |

Each platform has a colored horizontal bar showing relative spend proportion against a gray track.

#### 2. Ad Spend Trend Chart (Right Panel)
A dual-axis combination chart:

| Axis | Data | Scale |
|------|------|-------|
| X-axis | Daily dates across the selected period | Date labels |
| Left Y-axis | Ad spend in dollars | $0 to ~$120 |
| Right Y-axis | ROAS/POAS values | -5 to 30 |

**Data series (4 lines):**
- **Facebook spend** — blue solid line with dot markers (left axis)
- **Google spend** — green/teal solid line with dot markers (left axis)
- **ROAS** — purple dashed line with larger dots (right axis)
- **POAS** — dark/black dashed line with dots (right axis)

**Chart controls:**
- "By Platform" dropdown — breakdown dimension
- "Daily" dropdown — time granularity selector (Daily / Weekly / Monthly)

#### 3. Platform Performance Data Table
A horizontally scrollable table with per-platform marketing metrics.

**Filter bar above table (hierarchical drill-down):**

| Filter | Description |
|--------|-------------|
| Ad Platform | Select specific platform — e.g., "(1)" showing one selected |
| Account ID | Filter by specific ad account |
| Campaign | Filter by campaign |
| Ad Group | Filter by ad group — opens searchable dropdown with search by name or ID |

Active filters display as removable chips (e.g., "Google ✕") with a "Clear All" link.

**Table columns:**

| Column | UTM Badge | Plan Availability | Description |
|--------|-----------|-------------------|-------------|
| Platform | — | All | Platform name with logo icon |
| Amount Spent ↓ | — | All | Total spend (default sort, descending) |
| v.expenses | — | All | Variable marketing expenses |
| Impressions | — | All | Total ad impressions |
| Clicks | — | All | Total clicks |
| CPC | — | All | Cost per click |
| Orders | **UTM** | Ultimate only | Orders attributed via UTM |
| Revenue | **UTM** | Ultimate only | Revenue attributed via UTM |
| ROAS | **UTM** | Ultimate only | Return on ad spend |
| AOV | **UTM** | Ultimate only | Average order value |
| CPA | **UTM** | Ultimate only | Cost per acquisition |
| POAS | **UTM** | Ultimate only | Profit on ad spend |
| Conversion Rate | — | Ultimate only | Click-to-order conversion rate |

**Key observations:**
- Columns marked with "UTM" badge use UTM parameter attribution rather than platform-reported data
- Orders, Revenue, ROAS, AOV, CPA, POAS, and Conversion Rate are **Ultimate plan only** (see file 007)
- Platform names are clickable — drill down into platform-specific data
- Orders values are clickable (teal) — drill down to see specific attributed orders
- Table is horizontally scrollable (green scrollbar visible)

**Action buttons above/below table:**
- **UTM Attribution FAQ** — help/info button
- **Export** — download button for marketing data

### Drill-Down Hierarchy

The Marketing Analytics interface supports four levels of drill-down:

```
Ad Platform (e.g., Facebook)
  └── Ad Account (e.g., act_33079891)
      └── Campaign (e.g., "Summer Sale 2026")
          └── Ad Set / Ad Group (e.g., "Lookalike Audience 1%")
              └── Individual Ad (lowest level)
```

Users click a platform name to view metrics at each level. The same metrics (Amount Spent, Clicks, CPC, Orders, Revenue, ROAS, etc.) are available at every drill-down level.

**Ad Group dropdown observation:** From the real dashboard, Google Ad Groups display as hash-like IDs rather than human-readable names (e.g., `3ccb44fe1e96ca6fc8940b463a59849c`). This is a UX weakness.

---

## Attribution Model

### Last-Click Attribution (Modified)

BeProfit uses **last-click attribution** with two exceptions:

| Scenario | Attribution | Rationale |
|----------|-------------|-----------|
| Last click = direct, first click ≠ direct | **First click** gets credit | Direct traffic shouldn't override a known marketing source |
| Last and first clicks same source, last click lacks UTM | **First click** gets credit | Falls back to the more complete data point |
| Standard case | **Last click** gets credit | Standard last-click model |

### Data Source: Shopify as Source of Truth

"BeProfit retrieves order data from Shopify, capturing the entire customer journey along with UTMs." BeProfit deliberately trusts Shopify over ad platform self-reported data because "ad platforms may favor self-attribution" while Shopify remains neutral.

### Platform-Specific Attribution Rules

| Platform | Attribution Logic | Notes |
|----------|-------------------|-------|
| Facebook/Meta | Auto-assignment from customer journey data | Attributes even without UTM if source identified |
| Google Ads | UTM-only attribution | Prevents SEO/organic misattribution (see file 007) |
| TikTok, Snapchat, Pinterest | Auto-assignment from customer journey data | Same as Facebook approach |
| Affiliates/Influencers | UTM-based attribution | Requires manual UTM setup |

### iOS 14+ Handling
BeProfit acknowledges iOS 14 tracking limitations. The system automatically assigns orders based on customer journey data for "all ad platforms except Google" — a workaround that doesn't rely solely on pixel/cookie data.

### Expected Discrepancies
Attribution gaps occur between platform totals and individual campaign-level data when orders lack specific UTM information. An order may be attributable to Facebook at the platform level (via customer journey) but not attributable to a specific campaign/ad set/ad without UTM parameters.

---

## Marketing Cost Allocation

### Blended Cost Allocation (Blended CAC)
BeProfit uses Blended Cost Allocation to distribute marketing expenses across orders. This provides "a more comprehensive and practical view of customer acquisition expenses."

### Order-Level Allocation Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| **CAC** (Customer Acquisition Cost) | Daily marketing expenses divided evenly across **new customers' orders only** | When marketing budget targets acquisition |
| **CPA** (Cost Per Acquisition) | Daily marketing expenses divided evenly across **all orders** | When marketing targets both acquisition and retention |

**Configuration:** Settings → Calculation Preferences → Marketing Cost Preferences

**Daily distribution:** "The daily Marketing costs are divided evenly across the orders of that day" — costs are first summed daily, then distributed across that day's qualifying orders.

### Product-Level Allocation Methods

Marketing costs flow to products within orders through two approaches:

| Method | Description | Example |
|--------|-------------|---------|
| **Even Allocation** | Daily marketing cost divided equally across all products in the order | $100 spend, 4 products → $25 each |
| **Selling Price Method** | Costs distributed proportionally based on each product's selling price | $100 spend, $40 product gets $40, $60 product gets $60 |

**Configuration:** Settings → Calculation Preferences → Product Cost Allocation Preferences

---

## Tracking Sales Through Ad Spend

BeProfit provides two methods for correlating sales with marketing spend:

### Method 1: Compare Sources (Overview Page)

1. Navigate to **Overview → Compare Sources**
2. A line chart displays order sources over time
3. Click **"Add Filter"** → select **"Marketing"** filter type
4. Choose **"By Marketing Platform"**
5. Select specific platforms to view associated sales
6. View visual line chart showing sales across timeframes and platforms

### Method 2: Orders Page Filtering

1. Navigate to **Orders** page
2. Click **"Add Filter"** → **"More Filters"**
3. Locate and select **"Marketing Source"** filter
4. Choose the desired marketing platform
5. View filtered order list showing only transactions from that platform

---

## Marketing By Country

### Configuration
1. Navigate to **Calculation Preferences**
2. Toggle **"Allocate marketing by country"** to ON
3. Select target countries for each shop
4. Connected platforms (Facebook, Google) automatically assign expenses to campaigns matching selected countries

### Behavior
- Countries not selected show zero marketing expenses
- Feature requires team activation before user access
- **Forward-only:** Applies from activation date onward — no retroactive historical data allocation
- Platform matching is automatic for Facebook and Google campaigns with geographic targeting

---

## Affiliates & Influencers Tab

### Navigation Path
**Marketing → Affiliates & Influencers** tab (second tab after Ad Spend)

### Adding Affiliates
1. Click **"Add Affiliate"** button
2. Enter partner details (name, contact info)
3. Configure expense tracking (see below)
4. Assign UTM parameters and associated costs

### Expense Tracking Options

| Type | Description | Use Case |
|------|-------------|----------|
| **Variable Expenses** | Per-order, percentage-based or metric-dependent costs | Commission-based affiliates (e.g., 10% of sale) |
| **Custom Expenses** | Fixed or recurring payments — daily, weekly, monthly, or yearly | Flat-fee influencer sponsorships |

**Configuration:** Settings → Costs → Variable and Custom Expense

### Analytics Per Affiliate
Once configured, merchants access "detailed analytics for each affiliate, including ROAS and other key performance metrics." The UTM parameters link sales back to specific affiliates for attribution.

---

## Marketing Performance Metrics

### Dashboard-Level Metrics (from file 011)

| Metric | Value Example | Location |
|--------|---------------|----------|
| ROAS (Return on Ad Spend) | 3.03 | Marketing section, KPI card |
| POAS (Profit on Ad Spend) | 0.9 | Marketing section, KPI card |
| CPA (Cost Per Acquisition) | $54.38 | Marketing section, KPI card |
| BCAC (Blended Customer Acquisition Cost) | $66.46 | Marketing section, second row |
| Total Ad Spend | $2,990 | Ad Spend summary |

### ROAS Formula
```
ROAS = Revenue attributed to platform / Amount spent on platform
```
ROAS is revenue-based (not profit-based). POAS (Profit on Ad Spend) is the profit-adjusted version.

### POAS Formula (Implied)
```
POAS = Profit attributed to platform / Amount spent on platform
```
POAS factors in COGS, shipping, and other costs — a more actionable metric than ROAS for profitability-focused merchants.

### BCAC (Blended Customer Acquisition Cost)
Appears on the dashboard but has **no Help Center article explaining its calculation methodology**. Likely calculated as:
```
BCAC = Total Marketing Spend / Total New Customers
```

---

## Ad Data Management

### Excluding Campaigns from Calculations

1. Navigate to **Marketing → Ad Spend**
2. Choose the advertising platform (e.g., Facebook)
3. Ensure you're on the **"Ad Campaign"** tab
4. Locate the campaign and scroll right
5. Click the **three-dot menu**
6. Select **"Exclude this Campaign"**

**Effect:** "Remove the selected campaign's costs from your analytics and reports"
**Purpose:** Focus only on relevant campaigns — exclude test campaigns, discontinued initiatives, etc.

### Excluding Ad Entities from All Calculations

1. Navigate to **Marketing → Ad Spend**
2. Select the relevant ad platform
3. Access any tab **except Accounts**
4. Click the **three-dot menu** next to the ad entity
5. Select **"Exclude from all calculations"**

**Visual indicator:** Excluded entities display with a **strikethrough** appearance.

**Re-inclusion process:**
1. Return to Marketing → Ad Spend → platform
2. Select **"also show excluded ad spend"** filter
3. Find the struck-through entity
4. Click three-dot menu → **"Include in all calculations"**

### Removing Unwanted Ad Account Data

When wrong ad accounts were connected, historical data persists even after deselection:

1. Navigate to **Settings → Costs → Marketing Platforms**
2. Click three-dot menu on the platform row
3. Select **"Disconnect"**
4. Choose **"Delete Data"** to permanently remove historical data
5. **Reconnect** the platform, selecting only correct accounts

**Warning:** "Deleting data is permanent." No undo.
**Root cause:** BeProfit imports all selected accounts at connection time. Later deselection doesn't purge already-imported data.

---

## Social & Email/SMS Tabs

The Marketing page includes **Social** and **Email & SMS** tabs, but the Help Center provides minimal documentation on these. From the sidebar:
- **Social** — organic social media tracking (no detailed articles found)
- **Email & SMS** — email/SMS marketing tracking, likely includes Klaviyo integration

The dashboard (file 011) shows a **Klaviyo integration card** in the Marketing section: "Unlock Klaviyo metrics" with a "Connect Klaviyo account" button, confirming Klaviyo is the primary email marketing integration.

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Marketing sidebar menu | Navigation item | Left sidebar | Megaphone icon, expandable with 4 sub-items |
| Ad Spend / Affiliates / Social / Email tabs | Tab bar | Marketing page header | Four channel category tabs |
| Marketing Simulator button | CTA button | Page header | Green/teal solid button |
| Refresh Marketing Data button | Action button | Page header | White outline, manual sync trigger |
| Ad Integrations button | Action button | Page header | White outline, links to settings |
| UTM Attribution button | Action button | Page header | White outline, links to config |
| Platform filter dropdown | Dropdown | Filter bar | "Ad Platform (1)" with active count |
| Account ID filter | Dropdown | Filter bar | Filter by ad account |
| Campaign filter | Dropdown | Filter bar | Filter by campaign |
| Ad Group filter | Dropdown | Filter bar | Searchable by name or ID |
| Active filter chips | Removable tags | Filter bar | "Google ✕" with "Clear All" link |
| Platform spend bars | Horizontal bars | Ad Spend card | Colored bars showing relative spend |
| Dual-axis trend chart | Combined chart | Ad Spend trend | Bars (spend) + lines (ROAS/POAS) |
| "By Platform" dropdown | Dropdown | Chart controls | Breakdown dimension selector |
| Time granularity dropdown | Dropdown | Chart controls | Daily / Weekly / Monthly |
| Three-dot menu | Icon button | Table rows | Exclude, disconnect, manage actions |
| Strikethrough indicator | Visual style | Excluded entities | Shows excluded status |
| Export button | Action button | Below chart | Download marketing data |
| UTM Attribution FAQ button | Info button | Below chart | Help content link |
| Klaviyo connect card | Integration CTA | Dashboard Marketing section | Upsell for unconnected integration |

---

## Data Model Implications

### Marketing Data Requirements
1. **Multi-level campaign hierarchy** — Platform → Account → Campaign → Ad Set → Ad, with metrics at every level
2. **Dual attribution tracking** — Platform-reported metrics AND UTM-based attribution for the same data
3. **Daily cost aggregation** — Marketing costs summed by day for allocation to orders
4. **Order-level attribution** — Each order linked to a marketing source (platform, campaign, UTM parameters)
5. **Customer type classification** — New vs returning customer per order (for CAC vs CPA allocation)
6. **Geographic cost mapping** — Marketing costs assignable to countries (for Marketing by Country)
7. **Variable expense support** — Per-platform variable costs (e.g., agency fees as % of spend)
8. **Affiliate entity** — Affiliates with associated UTMs, variable expenses, and custom expenses

### Key Entities
- **MarketingPlatform** → accounts, campaigns, ad sets, ads
- **AdAccount** → platform, account ID, connection status
- **Campaign** → ad account, name, spend, metrics, excluded flag
- **Attribution** → order, source platform, campaign, UTM parameters
- **Affiliate** → name, UTM parameters, variable expenses, custom expenses
- **MarketingExpense** → platform, date, amount, type (ad spend, variable, custom)

---

## Limitations & Gaps

1. **No multi-touch attribution.** BeProfit uses modified last-click only. No first-click, linear, time-decay, or data-driven attribution models are available.

2. **UTM Attribution articles returned 404 errors.** Several UTM-specific articles (setup, identify order UTMs, manual attribution, custom rules, manage affiliate UTMs) were inaccessible. The UTM attribution system is documented only at overview level.

3. **BCAC metric undefined.** Blended Customer Acquisition Cost appears on the dashboard but has no Help Center article explaining its calculation.

4. **Social and Email/SMS tabs undocumented.** Two of the four marketing channel tabs have no Help Center articles explaining their functionality.

5. **No documented custom attribution rules.** The UTM Attribution article references "custom rules" but the setup article was inaccessible (404).

6. **Campaign exclusion is binary.** Excluded campaigns are completely removed from calculations — no partial weighting, budget adjustment, or split allocation.

7. **Ad Group names display as hashes.** Google Ad Groups in the filter dropdown show as raw hash IDs rather than human-readable names — a UX weakness.

8. **Marketing by country is forward-only.** No retroactive historical allocation when enabling country-level analysis.

9. **No documented cross-platform attribution.** How BeProfit handles a customer who clicks Facebook ad then Google ad before purchasing is not documented — the modified last-click model likely attributes to the last non-direct click.

10. **POAS formula not explicitly documented.** While POAS appears throughout the marketing analytics, the exact formula (which costs are included in the "profit" calculation) is not specified in marketing-specific articles.

---

## Relevance to Our Build

1. **Four-channel marketing structure is comprehensive.** The Ad Spend / Affiliates / Social / Email & SMS taxonomy covers all major marketing channels. We should adopt this structure and consider adding a fifth tab for Content Marketing or SEO.

2. **Dual attribution (platform + UTM) is a strong pattern.** Showing both platform-reported and UTM-based metrics gives merchants two perspectives. We should implement both and make it easy to compare them.

3. **POAS > ROAS for profit-focused merchants.** POAS (Profit on Ad Spend) is a more meaningful metric than ROAS for a profit dashboard. We should make POAS the primary marketing efficiency metric and show ROAS as secondary.

4. **Hierarchical drill-down is essential.** Platform → Account → Campaign → Ad Set → Ad enables merchants to find exactly which ads are profitable. We must support this full hierarchy.

5. **Blended CAC/CPA allocation is pragmatic.** The two allocation methods (new customers only vs all orders) handle the main business scenarios. We should offer both plus a "weighted" option for more sophisticated allocation.

6. **Marketing by Country enables regional optimization.** Geographic cost allocation is valuable for international sellers. We should implement this from launch with automatic detection of campaign geographic targeting.

7. **Campaign exclusion prevents data pollution.** The ability to exclude test campaigns, irrelevant data, and shared ad accounts keeps analytics clean. We should offer this at every level of the hierarchy (not just campaigns).

8. **Manual data refresh button reveals a sync gap.** The "Refresh Marketing Data" button suggests data isn't always real-time. We should invest in near-real-time ad data syncing and clearly communicate sync freshness to users.

9. **Affiliate/influencer tracking is table stakes.** DTC brands increasingly rely on affiliate and influencer marketing. UTM-based attribution with variable and fixed expense tracking covers the main use cases. We should extend this with automatic UTM generation and link management.

10. **Fix the ad account management UX.** BeProfit's inability to remove historical data without full disconnection is a significant pain point. We should support granular ad account management — add/remove accounts without data destruction.
