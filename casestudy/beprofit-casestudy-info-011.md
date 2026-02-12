# BeProfit Dashboard / Home Screen Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/track-your-real-time-data
  - https://help.runviably.com/beprofit/analyze-your-profit-breakdown-beprofit-help-center
  - https://help.runviably.com/beprofit/customize-snapshot-dashboard-metrics-beprofit-help-center
  - https://help.runviably.com/beprofit/beprofit-data-protection-beprofit-help-center
  - https://help.runviably.com/beprofit/track-profit-on-your-mobile-device-beprofit-help-center
  - Cross-referenced with real dashboard visual inventory (internal)
- **Category:** Core Feature / Dashboard
- **Date Captured:** 2026-02-12

---

## Dashboard Overview

The BeProfit Dashboard is the primary landing page after login, serving as a real-time profit monitoring hub. It displays key performance indicators (KPIs), profit breakdowns, order trends, product performance, and marketing summaries in a vertically scrolling, card-based layout. The dashboard is designed as a single-page overview that links out to deeper analysis pages for each section.

### Core Value Proposition
The dashboard enables three primary capabilities:
1. **Monitor profits in real-time** — view current-day and historical profit data
2. **Observe emerging trends** — track metric changes over time via charts
3. **Compare to previous periods** — strategic growth comparisons (same period last year, preceding period)

---

## Dashboard Layout Structure

The dashboard is organized into distinct sections stacked vertically. Each section is a white card with rounded corners, subtle shadow, and consistent padding.

### Global Controls (Top Navigation Bar)

| Element | Position | Description |
|---------|----------|-------------|
| Hamburger menu (☰) | Far left | Expands/collapses sidebar |
| BeProfit logo | Left | Purple "B" icon with "a Viably company" subtitle |
| Store selector | Center-left | Dropdown showing current store name (e.g., "Sonic Soak") |
| Onboarding progress | Center | "Onboarding 56%" with circular progress ring |
| Date range picker | Center-right | Global date window (e.g., "Jan-13-2025 — Feb-11-2026") with calendar icon |
| Gift/rewards icon | Right | Likely "What's New" or rewards |
| Notification bell | Right | Red badge showing unread count |
| User profile avatar | Far right | Purple circle with dropdown chevron |

### Date Range Selection
- **Custom date ranges:** User picks specific start/end dates
- **Predefined ranges:** Quick selection options (today, yesterday, last 7 days, last 30 days, this month, last month, etc.)
- The date range is **global** — it controls all dashboard sections simultaneously

### Customer Segmentation Filter
- **"All Customers" dropdown** with funnel icon in the dashboard header
- Enables filtering by customer type:
  - All Customers (default)
  - New Customers
  - Returning Customers
- This filter applies dashboard-wide, allowing users to see profitability metrics segmented by acquisition status

---

## Dashboard Sections (Detailed)

### Section 1: Today's Snapshot

A horizontal strip at the top showing quick KPIs for the current day.

**Layout:** Horizontal bar with date badge (e.g., "Feb 11 2025")

| Metric | Example Value | Description |
|--------|---------------|-------------|
| Sales | $0 | Today's total sales |
| Marketing | $58.12 | Today's marketing spend |
| Con. Profit | -$58.12 | Today's contribution profit |
| Order Count | 0 | Today's total orders |
| ROAS | -1 | Today's return on ad spend |

**Customization:**
- Small settings/customize icon at far right of the strip
- Users can select/deselect which metrics appear via checkboxes
- Changes persist after saving
- Can restore to default configuration

**Snapshot time window:** Displays data from previous 24-48 hours

### Section 2: Overview

**Header:** Purple circle icon with chart lines, "Overview" title, subtitle: "Track your store's metrics and monitor your performance"

**Customize link:** Sliders icon on the right, opens customization panel

**Top Row — 4 KPI Cards:**

| Card | Value Example | Sub-metrics | Trend |
|------|---------------|-------------|-------|
| Total Sales | $9,064 | Info tooltip (ⓘ) | ↓ -45.90% (red) |
| Net Margin | 29.73% | — | ↑ 397.10% (green) |
| Net Profit | $2,674 | "Net Margin" 29.71% | ↑ 164.51% (green) |
| Order Count | 55 | "Best Count" 83, "Edit Count" 63 | ↓ -33.93% (red) |

**Second Row — 4 KPI Cards:**

| Card | Value Example | Sub-metrics | Trend |
|------|---------------|-------------|-------|
| Marketing | $2,991 | ROAS 3.03, POAS 0.9, CPA $54.46 | ↓ -65.27% (green — cost decrease is positive) |
| Fulfillment | $972 | N/A | ↓ -86.45% (green) |
| COGS | $1,950 | — | ↓ -52.93% (green — cost decrease is positive) |
| Operational Expenses | $29 | "Fixed" $29 | N/A |

**Third Row — 1 KPI Card:**

| Card | Value Example | Trend |
|------|---------------|-------|
| Returns | $0 | N/A |

**Trend Percentages:** Each percentage represents "performance change during the specified date range compared to the previous corresponding time period." Cost decreases are shown in green (positive), while revenue/profit decreases are shown in red (negative).

**Drill-down:** Users can hover over profit tiles and click a chart icon to "deep dive into the specific metric, see its trend over time and compare to past periods." This opens an in-line chart view within the card.

### Section 3: Profit & Expenses Breakdown

**Header:** "Profit & Expenses Breakdown" with "Profit Simulator" purple button on the right

**Filter Toggles (horizontal):**
- Sales type: `Gross Sales` | `Net Sales`
- Profit type: `Gross Profit` | `Con. Profit` (active) | `Net Profit`

**Visualization:** Large donut/ring chart showing expense breakdown as percentage of total sales

| Category | Color | Percentage | Dollar Amount |
|----------|-------|------------|---------------|
| Con. Profit | Dark purple/navy | 28.7% | $2,703 |
| Marketing | Purple/magenta | 31.76% | $2,991 |
| COGS | Teal/green | 20.71% | $1,950 |
| Fulfillment | Light purple | 10.32% | $972 |
| Transaction Fees | Medium blue | — | $179.18 |
| Taxes | Light blue | — | $1,808 (0.11%) |
| Returns | Blue | — | $0 (0%) |
| Discounts | Dark blue | — | $351.15 (3.73%) |

**Right-side legend** lists each category with color swatch, dollar amount, and percentage.

**Center display:** Total Gross Sales amount (e.g., $9,415) shown in the center of the ring.

**Interactive elements:** Hovering over segments reveals precise monetary amounts. Refresh and download/export icons near the chart.

### Section 4: Orders

**Header:** Shopping bag icon, "Orders" title, subtitle: "Track your store's order trends as well as current order amounts and their average value."

**Link:** "Orders Page" with external link icon (navigates to full Orders page)

**KPI Cards (2):**

| Metric | Value |
|--------|-------|
| Total Orders | 55 |
| AVG Order Value | $165 |

**Line Chart:** "Orders by day"
- Time granularity dropdown: "Daily" (can switch to weekly, monthly)
- X-axis: Daily date ticks
- Y-axis: Order count (0-8 range for small stores)
- Single purple line showing order count per day
- Legend: Purple square labeled "Orders"

### Section 5: Profits

**Header:** Purple circle icon with dollar sign, "Profits" title, subtitle: "Track your profits at a glance and monitor your store's progress."

**Left Column — Metric Blocks:**

| Metric | Value | Sub-metric | Trend |
|--------|-------|------------|-------|
| Gross Profit | $5,693 | Gross Margin 63.3% | ↓ -42.55% (red) |
| Con. Profit | $2,703 | Con. Margin 30.00% | ↑ 129.11% (green) |

**Right Column — Combined Chart:** "Compare Key Metrics"
- **"Compare Periods" toggle button** (purple) — enables side-by-side period comparison
- **Metric selector dropdown:** "Select Metrics (3)" — up to 3 metrics can be compared simultaneously
- **Time granularity dropdown:** "Daily"
- **Chart type:** Combined bar chart + line chart overlay (dual axis)
- Left Y-axis: Dollar amounts
- Right Y-axis: Count axis
- Example legend: Total Sales (teal bars), Gross Sales (lighter bars), Marketing (magenta bars), Con. Profit (line), Order Count (line)

### Section 6: Marketing

**Header:** Megaphone icon, "Marketing" title, subtitle: "Track your marketing efforts at a glance."

**Action links:** "Marketing Simulator" (purple button), "Acquisition Page" (external link)

**Top Row — 3 KPI Cards:**

| Metric | Value |
|--------|-------|
| ROAS | 3.03 |
| POAS | 0.9 |
| CPA | $54.38 |

**Second Row:**

| Item | Description |
|------|-------------|
| BCAC (Blended Customer Acquisition Cost) | $66.46 |
| Klaviyo Integration Card | "Unlock Klaviyo metrics" — Connect Klaviyo account button (upsell for unconnected integration) |

**Ad Spend Breakdown (Left):**
- Horizontal bar segments showing spend per platform (e.g., Facebook $2,137, Google $853.45)
- Total Ad Spend displayed at bottom

**Ad Spend Trend Chart (Right):**
- Title: "Ad Spend Trend"
- Dropdowns: "By Platform" and "Daily"
- Chart: Stacked bar chart (spend by platform) with ROAS/POAS line overlays (dual axis)
- Legend: Platform colors + ROAS/POAS lines

### Section 7: Products

**Header:** "Products" title, subtitle: "See a breakdown of your most profitable products."

**Link:** "Products Page" (external link)

**Pagination:** "1 of 5" with left/right arrows — paginated product cards

**Filter Tabs:**
- `Best Sellers` (active) | `Most Profitable` | `Least Profitable`

**Grouping Tabs:**
- `Product` (active) | `Vendor` | `Type` | `Collection`

**Product Cards (4 per row):**
Each card shows:
- Product image/icon (purple-toned square)
- Product name
- Sales count
- Total Sales ($)
- Profit ($)
- Profit Margin (%)

Negative margins displayed in red (e.g., XCover Protection Plan at -341.39%).

---

## Dashboard Customization

### Customize Dashboard Layout
1. Navigate to Dashboard
2. Click "Customize Dashboard" (sliding button icons)
3. Drag metrics to reorder them (drag-and-drop)
4. Toggle visibility using checkboxes next to each section
5. Click Save to persist changes, or exit without saving
6. Use "Reset to Default" to restore factory settings

### Customize Daily Snapshot
1. Click "Customize Dashboard Snapshot" (three sliding buttons icon)
2. Select/deselect metric checkboxes for visibility
3. Save or revert without changes
4. Restore original default configuration available

### Key Customization Capabilities
- **Drag-and-drop** metric/section rearrangement
- **Toggle visibility** per metric via checkboxes
- **Persistent save** — customization persists across sessions
- **Default restoration** — one-click reset to factory layout

---

## Period Comparison Feature

The "Compare Periods" function allows metric analysis by:
1. Select a metric from the left-side list
2. Choose comparison type:
   - **Same Period Last Year** — year-over-year comparison
   - **Preceding Period** — compare to the immediately prior period of equal length
3. View results in daily, weekly, or monthly chart views
4. Charts overlay the two periods for visual comparison

---

## Real-Time Data & Sync

- **Sync indicator:** Cloud icon at top of dashboard; hovering shows last refresh timestamp
- **Active sync animation:** Visual indicator appears during active data synchronization from connected platforms
- **Data freshness:** Data is synced from connected platforms (Shopify, ad platforms, etc.) — exact refresh intervals are not documented
- **Manual refresh:** Marketing section has a "Refresh Marketing Data" button, suggesting ad data is not always real-time

---

## Mobile Access

### Key Finding: No Native Mobile App
BeProfit does **NOT** have a native mobile application. Instead, users can create a web-based shortcut on iOS.

### iOS Web Shortcut Setup (5 steps)
1. Open Safari browser (Safari only — does not work in Chrome/Firefox)
2. Navigate to BeProfit web app
3. Tap the Share icon (square with upward arrow) at browser bottom
4. Select "Add to Home Screen"
5. Rename to "BeProfit" and tap "Add"

### Mobile Limitations
- **Safari only** — no other browser support for home screen shortcut
- **Not a native app** — just a web shortcut with no push notifications, offline access, or native performance
- **iOS only** — no Android instructions provided
- **Feature parity unknown** — no documentation on what features work/don't work on mobile
- **Responsive design assumed** — the web app presumably has some responsive behavior but no mobile-specific UI is documented

---

## Data Protection & Security

### Security Infrastructure
- **Private secure server** protected by firewalls with restricted access to authorized users
- **Encrypted communications** between users and BeProfit servers
- **Advanced security tokens** for identity verification
- **Server-to-server connections** for third-party integrations (no direct client connections to ad platforms)

### Compliance
- **GDPR compliant** — adherence to data protection regulations
- **E-commerce platform compliance** — follows requirements from Shopify, WooCommerce, etc.
- **Data deletion rights** — users can request complete data deletion via support ticket

### User-Level Security
- Password protection for accounts (encouraged but exact enforcement not documented)
- Authentication methods include email-based and platform OAuth

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Cloud sync icon | Status indicator | Top bar | Shows last sync time on hover, animates during sync |
| Date range picker | Dropdown/calendar | Top bar | Global control affecting all sections |
| Customer segment filter | Dropdown | Dashboard header | "All Customers" with funnel icon |
| Customize button | Icon button (sliders) | Section headers | Opens customization panel |
| KPI cards | Card grid | Throughout | White cards with value, sub-metric, trend arrow |
| Trend arrows | Indicators | KPI cards | Green (↑ positive), Red (↓ negative) |
| Info tooltip (ⓘ) | Icon | KPI cards | Explains metric calculation on hover |
| Chart drill-down icon | Icon button | KPI cards | Opens inline trend chart on click |
| Donut/ring chart | Visualization | Profit breakdown | Interactive with hover tooltips |
| Sales type toggle | Tab bar | Profit breakdown | Gross Sales / Net Sales |
| Profit type toggle | Tab bar | Profit breakdown | Gross / Con. / Net Profit |
| Compare Periods button | Toggle button | Profits section | Purple, enables period comparison |
| Metric selector dropdown | Multi-select | Profits section | "Select Metrics (3)" |
| Time granularity dropdown | Dropdown | Multiple sections | Daily / Weekly / Monthly |
| Product cards | Paginated grid | Products section | 4 per row, 5 pages |
| Product sort tabs | Tab bar | Products section | Best Sellers / Most Profitable / Least Profitable |
| Product group tabs | Tab bar | Products section | Product / Vendor / Type / Collection |
| Profit Simulator button | CTA button | Profit breakdown | Purple, opens what-if tool |
| Marketing Simulator button | CTA button | Marketing section | Purple, opens scenario planning |
| Platform spend bars | Horizontal bars | Marketing section | Visual proportion of spend per platform |
| Chat widget | Input field | Bottom right | "Ask me anything..." support chat |

---

## Data Model Implications

### Dashboard Data Requirements
1. **Real-time or near-real-time aggregation** — dashboard requires up-to-date summaries across orders, costs, and marketing
2. **Time-series data** — every metric needs daily/weekly/monthly aggregation for charts and trend comparison
3. **Period comparison engine** — must support "same period last year" and "preceding period" comparisons for any metric
4. **Customer segmentation** — orders must be tagged as new vs returning customer for segment-level filtering
5. **Multi-level cost attribution** — revenue must be decomposable into: COGS, marketing, fulfillment, transaction fees, taxes, returns, discounts, operational expenses
6. **Product-level profitability** — each product needs: units sold, revenue, cost, profit, margin — rollable by product, vendor, type, collection
7. **Marketing platform aggregation** — ad spend by platform (Facebook, Google, etc.) with ROAS, POAS, CPA calculations
8. **Snapshot cache** — today's/yesterday's snapshot KPIs likely cached for fast display

### Key Entities Implied
- **Order** → revenue, costs, customer type, date, products
- **Product** → COGS, sales count, profit, margin, vendor, type, collection
- **Marketing Campaign** → platform, spend, orders attributed, revenue attributed
- **Expense** → category (COGS, fulfillment, marketing, operational, transaction, tax, return, discount), amount, date
- **Date Range** → start, end, comparison period type

---

## Limitations & Gaps

1. **No exhaustive metric list available.** The Help Center describes dashboard sections but does not provide a complete list of all available metrics for customization. The exact set of toggleable metrics is unknown.

2. **Customization limits unclear.** Documentation doesn't specify whether users can add entirely new widgets/sections or only rearrange/show/hide existing ones. The extent of drag-and-drop customization is ambiguous.

3. **No mobile app — only iOS web shortcut.** The lack of a native mobile app is a significant product gap. No Android support at all. Push notifications, offline access, and native mobile UX are entirely absent.

4. **Sync frequency undocumented.** How often the dashboard refreshes from connected platforms (Shopify, Facebook Ads, etc.) is not specified. Whether it's real-time, hourly, or daily is unknown.

5. **Dashboard performance for high-volume stores unknown.** No documentation on how the dashboard performs with large data volumes (millions of orders, thousands of products).

6. **Profit Simulator and Marketing Simulator undocumented.** Both are prominently displayed as CTAs but no Help Center articles explain their functionality in detail.

7. **BCAC (Blended Customer Acquisition Cost) not defined.** This metric appears on the dashboard but has no Help Center article explaining its calculation methodology.

8. **Klaviyo integration details sparse.** The dashboard shows a Klaviyo upsell card but no documentation explains what Klaviyo metrics are unlocked after connection.

9. **Chart interaction details limited.** Whether charts support zoom, pan, data point highlighting, or tooltip details beyond basic hover is undocumented.

10. **No dashboard sharing or embedding.** No mention of ability to share dashboard views with external stakeholders, embed charts, or create public read-only links.

---

## Relevance to Our Build

### Key Takeaways

1. **Mirror the section-based card layout.** BeProfit's vertically stacked, card-based dashboard is industry-standard for analytics dashboards. Adopt this pattern but improve information density — consider collapsible sections to reduce scrolling.

2. **Today's Snapshot is high-value, low-cost to build.** A quick-glance strip for today's KPIs is easy to implement and immediately useful. Make ours more prominent and include a "Yesterday" comparison built-in.

3. **Implement "Compare Periods" from day one.** Year-over-year and preceding period comparisons are essential for e-commerce merchants tracking seasonal patterns. Build this into the charting infrastructure, not as an afterthought.

4. **Donut chart for profit breakdown is effective.** The expense decomposition visualization makes cost structure immediately visible. Consider adding interactive drill-down (click a segment to see sub-breakdown).

5. **Build a real mobile app.** BeProfit's lack of native mobile is a significant gap. A basic mobile app with push notifications for daily profit summaries, anomaly alerts, and key KPI viewing would be a strong differentiator.

6. **Customer segmentation filter is a powerful pattern.** Dashboard-wide filtering by new vs returning customers enables quick cohort analysis. Extend this with custom segments (high-value, at-risk, first purchase this month).

7. **Profit Simulator and Marketing Simulator are differentiators.** These what-if tools are prominently placed, suggesting merchants value scenario planning. Build equivalent functionality — "What would my margin be if COGS increased 10%?" type questions.

8. **Product cards with profit margin are immediately actionable.** Showing profit margin next to each product helps merchants quickly identify underperformers. The ability to sort by best sellers, most profitable, and least profitable is essential.

9. **Dual-axis charts for spend vs ROAS are standard.** The marketing section's combined bar+line chart (spend on one axis, ROAS on the other) is a proven pattern for understanding ad efficiency.

10. **Data protection page provides a trust template.** While thin on technical detail, having a dedicated data protection page is important for merchant trust. Build a more detailed security page with SOC 2 compliance, encryption details, and data residency information.
