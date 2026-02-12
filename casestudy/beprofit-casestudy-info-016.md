# BeProfit Product Analytics Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/products-overview-beprofit-help-center (Products Overview)
  - https://help.runviably.com/beprofit/single-product-beprofit-help-center (Single Product)
  - https://help.runviably.com/beprofit/inventory-beprofit-help-center (Inventory)
  - https://help.runviably.com/beprofit/products-returns-beprofit-help-center (Products Returns)
  - https://help.runviably.com/beprofit/products-analytics-beprofit-help-center (Products Analytics)
  - Cross-referenced with real dashboard visual inventory (file: prd/manually-added-dump-from-real-dashboard.md)
  - Cross-referenced with dashboard documentation (file: beprofit-casestudy-info-011.md)
- **Category:** Core Feature / Product Analytics
- **Date Captured:** 2026-02-12

---

## Products Section Overview

The Products section in BeProfit is accessed via the left sidebar navigation (**Products** menu item with a box icon and right chevron indicating a submenu). It contains four main subsections organized under "Products Reports and Analytics":

1. **Products Analytics** — Core product performance metrics, the primary listing page
2. **Single Product** — Detailed drill-down for individual product performance
3. **Inventory** — Stock levels, valuation, and depletion projections
4. **Products Returns** — Return tracking and return rate analysis

Additionally, a separate "Product Costs/COGS" subcategory (7 articles) covers cost management — documented in files 005 and 015.

The Products section on the dashboard (file 011, Section 7) provides a summary preview with paginated product cards (4 per row, 5 pages), sortable by Best Sellers, Most Profitable, and Least Profitable, and groupable by Product, Vendor, Type, or Collection.

---

## Products Analytics (Main Listing Page)

### Navigation Path
**Products → Products Analytics** (also accessible from the Getting Started hub)

### Page Layout
The Products Analytics page displays a tabular view of all products with their performance metrics. A global date range selector at the top controls the reporting period for all displayed data.

### Grouping Options
Data can be organized by four dimensions:

| Grouping | Description |
|----------|-------------|
| **Product** | Default view — one row per product |
| **Vendor** | Groups products by vendor/supplier |
| **Variant** | Flat list of all variants across all products |
| **Type** | Groups by product type classification |

These grouping options mirror the dashboard's product section tabs (Product, Vendor, Type, Collection — file 011), though the analytics page adds **Variant** as a grouping option and the dashboard adds **Collection**.

### Available Metrics

| Metric | Description | Sortable |
|--------|-------------|----------|
| **Quantity** | Units sold per product/variant during the selected period | Yes |
| **Con. Profit** (Contribution Profit) | Total Sales - COGS - Net Shipping - Taxes - Ad Spend | Yes |
| **Con. Margin** (Contribution Margin) | Contribution Profit as a percentage of Total Sales | Yes |

**Contribution Profit Formula:**
```
Con. Profit = Total Sales - COGS - Net Shipping - Taxes - Ad Spend
```

This is a significant finding — the Products Analytics page uses **Contribution Profit** rather than Gross or Net Profit, which means it factors in marketing costs at the product level (via the ad spend allocation method configured in Calculation Preferences — see file 014).

### Search and Filtering
- **Search field:** Allows locating specific products by name within the analytics view
- **Date range selector:** Global control at the top of the page

### Sorting
All metric columns have clickable headers. Clicking toggles between ascending and descending sort order. This enables quick identification of:
- **Most sold** products (sort by Quantity descending)
- **Most profitable** products (sort by Con. Profit descending)
- **Least profitable / money-losing** products (sort by Con. Profit ascending)
- **Highest / lowest margin** products (sort by Con. Margin)

### Product Rankings (Dashboard Preview)

From the dashboard documentation (file 011), the Products section provides three ranking tabs:

| Tab | Purpose |
|-----|---------|
| **Best Sellers** | Products sorted by highest sales volume |
| **Most Profitable** | Products sorted by highest profit |
| **Least Profitable** | Products sorted by lowest profit (including negative margins) |

Each product card on the dashboard shows:
- Product image/icon
- Product name
- Sales count
- Total Sales ($)
- Profit ($)
- Profit Margin (%)

Negative margins are displayed in red (e.g., XCover Protection Plan at -341.39% in the real dashboard).

---

## Single Product View

### Navigation Path
**Products → Single Product** → select a product from the list

### Purpose
The Single Product view provides a detailed performance breakdown for an individual product and all its variants. This is the drill-down view from the products listing.

### Product-Level Metrics
The interface displays comprehensive performance data for the selected product at a glance. While the Help Center doesn't enumerate every metric shown, cross-referencing with the dashboard (file 011) and profit calculation methodology (file 014) suggests the following metrics are available:

| Metric | Source |
|--------|--------|
| Total Sales | Order revenue for this product |
| Quantity / Units Sold | Total units sold in selected period |
| COGS | Cost of goods for this product |
| Gross Profit | Sales - COGS |
| Gross Margin | Gross Profit / Sales |
| Contribution Profit | Sales - COGS - Shipping - Taxes - Ad Spend |
| Contribution Margin | Con. Profit / Sales |
| Net Shipping | Shipping Revenue - Shipping Cost for orders containing this product |
| Returns | Return value and/or count |
| Return Rate | Returned Units / Total Units |

### Variant-Level Breakdown
A key feature: users can **click a collapsing arrow** to expand and reveal the performance of all product variants. This enables:
- Side-by-side comparison of variant performance (e.g., different sizes or colors)
- Identification of high-performing vs underperforming variants
- Variant-level profitability analysis

**Data structure implication:** Variants are nested under their parent product in a collapsible hierarchy, not displayed as flat rows. This means the data model ties variants to products with a parent-child relationship.

### Product Comparison
The "Compare Products" section allows adding additional products for side-by-side analysis:

1. Navigate to Single Product view
2. Locate the **"Compare Products"** section
3. Click **"Add products"** to select additional products
4. View performance metrics for all selected products in a scrollable comparison area

**Key observation:** This is a manual, additive comparison — users choose which products to compare rather than having an automated comparison matrix.

---

## Inventory

### Navigation Path
**Products → Inventory** tab

### Purpose
The Inventory page provides stock tracking and financial valuation of current inventory, combining stock level monitoring with cost/value calculations.

### Primary Metrics

| Metric | Definition | Calculation |
|--------|-----------|-------------|
| **Inventory Quantity** | Current stock levels per product/variant | Synced from e-commerce platform |
| **Inventory Value** | Total monetary worth at selling price | Quantity × Unit Selling Price |
| **Inventory Cost** | Total acquisition/production cost | Quantity × Unit Cost (COGS) |
| **Unit Count** | Number of distinct units | Count of items |
| **Daily Sales Velocity** | Units sold per day | Based on selected date range |
| **Estimated Days to Stock Depletion** | Projected days until out-of-stock | Current Inventory / Daily Sales Velocity |

### Key Distinctions

**Inventory Value vs Inventory Cost:**
- **Value** = what the inventory is worth if all items sold at current selling price (revenue potential)
- **Cost** = what was paid to acquire/produce the inventory (COGS basis)
- The difference (Value - Cost) represents the **gross profit potential** of current inventory

This dual-perspective financial tracking is valuable for merchants who want to understand both their cash tied up in inventory (cost) and their revenue potential (value).

### Variant-Level Inventory
Like the Single Product view, inventory data supports variant-level drill-down via **collapsible arrows** that expand to reveal per-variant stock metrics.

### Date Range Impact
The date range selector affects metrics like daily sales velocity and depletion projections — selecting a different period changes the velocity calculation basis and therefore the stock-out projections.

---

## Products Returns

### Navigation Path
**Products → Product Returns**

### Purpose
Tracks returned products and their financial impact on profitability. Helps merchants identify products with high return rates and understand the cost of returns.

### Grouping Options

| Grouping | Description |
|----------|-------------|
| **Product** | Returns grouped by product |
| **Vendor** | Returns grouped by vendor |
| **Type** | Returns grouped by product type |

### Key Metrics

| Metric | Formula | Display |
|--------|---------|---------|
| **Return Rate** | (Returned Units / Unit Count) × 100 | Percentage |
| **Returns Amount Rate** | (Returns Amount / Total Sales) × 100 | Percentage |

**Return Rate** measures frequency — how often units are returned relative to units sold.
**Returns Amount Rate** measures financial impact — what proportion of revenue is lost to returns.

### Search and Filtering
- **Product search:** Find specific products within the returns view
- **Date range selector:** Control the reporting period
- **Grouping dropdown:** Switch between Product, Vendor, and Type views

### Sorting
Metric column headers are clickable for ascending/descending sorting. This enables:
- Finding products with the **highest return rate** (potential quality issues)
- Finding products with the **highest returns amount** (biggest financial impact)

### Return Impact on Profitability
From the profit calculation methodology (file 014), returns are deducted from revenue as "Refunds" in the P&L:
```
Total Sales = Gross Sales - Discounts - Refunds
```
Returns also factor into COGS handling — per file 014, there's a calculation preference for "Exclude COGS from fully refunded orders."

---

## Product-Level Metrics Compilation

Across all Products subsections, the following product-level metrics are available or implied:

### Sales & Revenue Metrics
| Metric | Available In |
|--------|-------------|
| Gross Sales | P&L, Order-level |
| Total Sales (Net) | Products Analytics, Dashboard |
| Units Sold / Quantity | Products Analytics, Dashboard, Inventory |
| Average Selling Price | Implied from Total Sales / Quantity |
| Sales Velocity (daily) | Inventory |

### Cost Metrics
| Metric | Available In |
|--------|-------------|
| COGS per product | Product Costs section (files 005, 015) |
| Marketing Cost (allocated) | Products Analytics (via Con. Profit) |
| Shipping Cost | Net Shipping in Single Product |
| Inventory Cost | Inventory page |

### Profitability Metrics
| Metric | Available In |
|--------|-------------|
| Gross Profit | Dashboard, Single Product |
| Gross Margin | Dashboard, Single Product |
| Contribution Profit | Products Analytics (primary metric) |
| Contribution Margin | Products Analytics |
| Profit (unspecified type) | Dashboard product cards |
| Profit Margin | Dashboard product cards |

### Return Metrics
| Metric | Available In |
|--------|-------------|
| Return Rate (units) | Products Returns |
| Returns Amount Rate ($) | Products Returns |
| Returns Value | Dashboard (Section 1 Overview) |

### Inventory Metrics
| Metric | Available In |
|--------|-------------|
| Inventory Quantity | Inventory page |
| Inventory Value (at selling price) | Inventory page |
| Inventory Cost (at COGS) | Inventory page |
| Days to Stock Depletion | Inventory page |

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Products sidebar menu | Navigation item | Left sidebar | Box icon with right chevron, expandable submenu |
| Date range picker | Dropdown/calendar | Page header | Global control for all product metrics |
| Grouping tabs | Tab bar / dropdown | Products Analytics | Product / Vendor / Variant / Type |
| Search field | Text input | Products Analytics, Returns | Search products by name |
| Sortable column headers | Table headers | Analytics, Returns | Click to sort asc/desc |
| Collapsible variant arrow | Icon button | Single Product, Inventory | Expand/collapse variant details |
| Compare Products section | Panel | Single Product | "Add products" button for comparison |
| Product cards | Card grid | Dashboard section | 4 per row, paginated (5 pages) |
| Product sort tabs | Tab bar | Dashboard section | Best Sellers / Most Profitable / Least Profitable |
| Product group tabs | Tab bar | Dashboard section | Product / Vendor / Type / Collection |
| Pagination controls | Prev/Next arrows | Dashboard section | "1 of 5" with arrows |
| Negative margin indicator | Red text | Dashboard, Analytics | Highlights money-losing products |

---

## Data Model Implications

### Entity Relationships
```
Product (1) ──→ (N) Variants
Product (1) ──→ (N) OrderLineItems
Product (1) ──→ (1) COGS Configuration (with priority hierarchy — file 005)
Product (N) ──→ (1) Vendor
Product (N) ──→ (1) Type
Product (N) ──→ (N) Collections
Variant (1) ──→ (N) OrderLineItems
Variant (1) ──→ (1) InventoryLevel
Variant (1) ──→ (1) VariantCost (COGS)
```

### Metric Aggregation Logic
- **Product-level metrics** = sum/average across all variants for that product
- **Vendor-level metrics** = sum/average across all products from that vendor
- **Type-level metrics** = sum/average across all products of that type
- **Variant-level metrics** = direct values for individual variants
- **Collection-level metrics** = sum/average across all products in a collection (dashboard only)

### Cost Attribution to Products
Per file 014, marketing costs are attributed to products using one of two allocation methods:
- **Even Allocation:** Daily marketing costs divide equally across all products in an order
- **Selling Price Method:** Costs distribute proportionally based on each product's selling price relative to total order value

This allocation drives the **Contribution Profit** metric at the product level.

### Inventory Data Requirements
- Real-time or near-real-time stock levels synced from e-commerce platform
- Selling price per variant (for Inventory Value)
- COGS per variant (for Inventory Cost)
- Historical sales velocity calculation (rolling average over selected period)

---

## Limitations & Gaps

1. **No comprehensive metric list available.** The Help Center describes features at a high level but does not enumerate every metric visible in the Products Analytics table. The exact set of available columns beyond Quantity, Con. Profit, and Con. Margin is unknown.

2. **No documented chart views in Products Analytics.** The Help Center mentions tabular data but does not describe any product-level trend charts, time-series views, or visualizations beyond the dashboard's product cards.

3. **Comparison feature is manual only.** The "Compare Products" feature requires users to manually add products. There's no automatic comparison matrix, no "compare similar products" suggestion, and no benchmarking against category averages.

4. **No product-level custom metrics.** Unlike the dashboard which supports customizable KPI cards, the Products Analytics page doesn't mention custom or user-defined metrics.

5. **Inventory depletion projection is basic.** The "Days to Stock Depletion" metric uses a simple division (current inventory / daily velocity) — no documented support for seasonal adjustments, trend-based projections, or safety stock calculations.

6. **No documented product-level alerts.** No mention of low-stock alerts, margin alerts, or performance drop notifications at the product level.

7. **Return reasons not tracked.** The Returns section shows return rates and amounts but no documentation mentions return reason categorization (defective, wrong item, changed mind, etc.).

8. **No product-level ROI or ROAS.** While Contribution Profit includes ad spend allocation, there's no documented product-level ROAS metric showing marketing efficiency per product.

9. **Collection grouping inconsistency.** The dashboard supports grouping by Collection, but the Products Analytics page documentation shows Product/Vendor/Variant/Type — no Collection grouping. This may be a documentation gap or a genuine feature discrepancy.

10. **Inventory data freshness unclear.** How often inventory quantities sync from the e-commerce platform is not documented. Whether it's real-time, hourly, or daily affects the reliability of depletion projections.

---

## Relevance to Our Build

1. **Contribution Profit as the default product metric is smart.** BeProfit's choice to show Con. Profit (which includes ad spend allocation) rather than just Gross Profit gives merchants a more complete picture of product-level economics. We should adopt this approach and make it the primary product metric.

2. **Variant-level drill-down is essential.** The collapsible parent → variant hierarchy is a proven UX pattern for products with multiple SKUs. Our product tables should support this nesting with expand/collapse controls.

3. **Inventory value vs cost distinction is valuable.** Showing both "what you could sell it for" (value) and "what you paid" (cost) for inventory gives merchants two perspectives on their tied-up capital. Our inventory view should surface both along with the implied gross profit potential.

4. **Return rate analysis at the product level is actionable.** Merchants can quickly identify problematic products and make decisions about discontinuing, improving, or adjusting pricing. We should include return rate as a first-class product metric and add return reason tracking that BeProfit lacks.

5. **Product comparison needs better UX.** BeProfit's manual "add products to compare" approach is functional but clunky. We should offer one-click comparison from the product table (select 2-3 products via checkboxes and click "Compare") plus automated suggestions for similar products.

6. **Stock depletion projections are a quick win.** The simple formula (stock / daily velocity) is easy to implement and immediately useful. We can differentiate by adding trend-aware projections and configurable safety stock thresholds with reorder alerts.

7. **Missing product-level charts is a gap we can fill.** BeProfit shows tabular data in Products Analytics but doesn't document any per-product trend lines or visualizations. We should include mini sparklines in the product table and expanded time-series charts in the single product view.

8. **Multiple grouping dimensions improve discoverability.** The ability to view products by Product, Vendor, Type, Variant, and Collection covers the main ways merchants think about their catalog. We should support all five from launch.

9. **Build product-level notifications.** BeProfit doesn't offer product-level alerts (low stock, margin drop, return rate spike). These would be high-value features for proactive inventory and profitability management.

10. **Searchable product tables are table stakes.** Both Products Analytics and Returns include search functionality. Our product views must support text search, and we should add advanced filtering (by vendor, type, margin range, stock status).
