# BeProfit Inventory Tracking Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/inventory-beprofit-help-center (Inventory — Products Reports and Analytics)
  - https://help.runviably.com/beprofit/products-overview-beprofit-help-center (Products Overview — cross-reference)
  - https://help.runviably.com/beprofit/products-analytics-beprofit-help-center (Products Analytics — cross-reference)
  - Cross-referenced with real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — Shop settings
  - Cross-referenced with file 016 (beprofit-casestudy-info-016.md) — Product Analytics (Inventory section)
- **Category:** Core Feature / Inventory Tracking
- **Date Captured:** 2026-02-12

---

## Inventory Page Overview

The Inventory page is a dedicated subsection within BeProfit's Products module, accessed via **Products → Inventory** in the left sidebar navigation. It sits alongside three sibling pages: Products Analytics, Single Product, and Products Returns — all grouped under "Products Reports and Analytics."

The page provides a combined view of stock-level monitoring and financial valuation, presenting inventory data in a tabular format with products and their variants listed together. A global date range selector at the top of the page controls the reporting period, which affects velocity-based calculations like daily sales and depletion projections.

### Navigation Path
**Left sidebar → Products (box icon, right chevron) → Inventory tab**

### Page Layout
The Inventory page displays a tabular view where each row represents a product. Products with multiple variants include an expandable collapsible arrow that reveals per-variant inventory metrics when clicked. This is the same parent→variant collapsible hierarchy pattern used in the Single Product view (documented in file 016).

---

## Inventory Data Fields

The Inventory page displays the following metrics per product/variant:

| Metric | Definition | Calculation Method |
|--------|-----------|-------------------|
| **Inventory Quantity** | Current stock levels per product/variant | Synced from the connected e-commerce platform (Shopify, WooCommerce, Amazon, Wix) |
| **Inventory Value** | Total monetary worth of inventory at selling price | Quantity × Unit Selling Price |
| **Inventory Cost** | Total acquisition/production cost of inventory | Quantity × Unit Cost (COGS) |
| **Unit Count** | Number of distinct units in stock | Count of individual items |
| **Daily Sales** | Average units sold per day | Calculated from order data over the selected date range |
| **Estimated Days to Stock Depletion** | Projected days until out-of-stock | Current Inventory Quantity ÷ Daily Sales Velocity |

### Key Financial Distinction: Inventory Value vs Inventory Cost

This dual-perspective approach is one of the most useful aspects of the Inventory page:

- **Inventory Value** = Revenue potential — what the inventory is worth if all items sold at their current selling price
- **Inventory Cost** = Capital tied up — what was paid to acquire or produce the inventory (COGS basis)
- **Implied Gross Profit Potential** = Inventory Value − Inventory Cost — the gross profit that could be realized if all current inventory were sold

This distinction helps merchants understand both their **cash tied up** (cost) and their **revenue opportunity** (value) at a glance.

---

## Inventory Valuation Methods

### Valuation Approach
BeProfit uses a **simple multiplication method** for inventory valuation:

- **Value** = Quantity × Unit Selling Price
- **Cost** = Quantity × Unit Cost (COGS)

There is **no documented support** for advanced accounting valuation methods such as:
- **FIFO** (First In, First Out)
- **LIFO** (Last In, First Out)
- **Weighted Average Cost**
- **Specific Identification**

The valuation is a point-in-time snapshot: current quantity multiplied by current unit price/cost. This is adequate for basic inventory monitoring but falls short of accounting-grade inventory valuation.

### COGS Source for Inventory Cost
The "Unit Cost" used in the Inventory Cost calculation comes from the COGS configuration documented in file 015. COGS follows a 6-level priority hierarchy (from file 005):
1. Bulk Update (highest priority)
2. Manual Edit
3. CJ Integration
4. COGS Profile
5. Google Sheets
6. Product Page Manual (lowest priority)

The COGS value active at the time of viewing determines the Inventory Cost calculation. Historical COGS changes are not retroactively applied to inventory valuation — it uses the current effective COGS rate.

---

## Stock-Level Monitoring

### Data Source
Inventory quantities are **synced from the connected e-commerce platform** (primarily Shopify). BeProfit does not maintain an independent inventory ledger — it reads stock levels from the platform's inventory system.

This means:
- Stock levels are as current as the platform sync allows
- Manual inventory adjustments in Shopify/WooCommerce are reflected in BeProfit after the next sync
- BeProfit does not support manual stock entry or adjustment within its own interface

### Sync Frequency
The exact inventory sync frequency is **not documented** in the Help Center. Based on patterns from other data syncs documented in earlier files:
- Shopify data typically syncs via webhooks (near-real-time for orders)
- Inventory-specific sync frequency may differ and could be periodic rather than event-driven
- There is no documented "Refresh Inventory" button or manual sync trigger for the Inventory page

### Stock Depletion Projections

The "Estimated Days to Stock Depletion" metric provides a basic forecast of when current inventory will run out.

**Formula:**
```
Estimated Days to Depletion = Current Inventory Quantity ÷ Daily Sales Velocity
```

**Daily Sales Velocity** is calculated based on the selected date range — meaning the projection changes depending on whether the user is viewing a 7-day, 30-day, or custom date range. A shorter recent period captures more current demand trends, while a longer period smooths out volatility.

**Methodology Limitations:**
- **Simple linear extrapolation** — assumes sales continue at the same average rate
- **No seasonal adjustment** — doesn't account for holidays, promotions, or seasonal demand patterns
- **No trend-based projection** — doesn't factor in whether sales are accelerating or decelerating
- **No safety stock calculation** — doesn't account for lead time, supplier reliability, or desired buffer stock
- **Date range sensitivity** — the projection can vary significantly based on the selected date range, which could mislead users who don't understand this dependency

### Low Stock Alerts
There is **no documented low-stock alert or notification system** tied to the Inventory page. BeProfit does not appear to offer:
- Configurable low-stock thresholds
- Automatic low-stock notifications (email, in-app, or otherwise)
- Out-of-stock warnings
- Reorder point triggers

This is consistent with the broader finding from file 024 that BeProfit lacks a custom alerting system entirely.

---

## Variant-Level Inventory

The Inventory page supports variant-level drill-down through the same collapsible arrow UI pattern used throughout the Products section:

1. Each product row shows aggregate inventory metrics across all variants
2. Clicking the **collapsing arrow** expands the row to reveal per-variant inventory data
3. Each variant shows its own Inventory Quantity, Value, Cost, and other metrics

This is critical for merchants selling products with multiple SKUs (e.g., different sizes, colors, materials) where inventory levels vary significantly across variants.

### Data Structure
```
Product (parent row — aggregate metrics)
├── Variant A (e.g., Size S, Red) — individual metrics
├── Variant B (e.g., Size M, Red) — individual metrics
├── Variant C (e.g., Size L, Red) — individual metrics
└── Variant D (e.g., Size S, Blue) — individual metrics
```

---

## Inventory & Profit Calculation Interaction

Inventory data and profit calculations interact in several important ways:

### Inventory Cost vs COGS in P&L
- **COGS in P&L** (file 014) is calculated per ORDER — it represents the cost of goods actually SOLD during a period
- **Inventory Cost** (this page) represents the cost of goods currently IN STOCK — unsold inventory
- These are complementary: COGS tracks what was spent on sold goods, Inventory Cost tracks what's tied up in unsold goods

### Unsold Inventory Treatment
BeProfit does **not** appear to factor unsold inventory into its profit calculations. The P&L (file 012) calculates:
```
Gross Profit = Total Sales - COGS (of sold items)
```

Unsold inventory is not treated as a cost or liability in the profit calculation — it's tracked separately on the Inventory page. There is no documented:
- Inventory write-down functionality
- Slow-moving inventory impairment
- Dead stock identification or costing
- Inventory carrying cost calculation (storage, insurance, depreciation)

### Inventory Value as a Business Health Metric
While not directly part of profit calculations, Inventory Value and Inventory Cost serve as important business health indicators:
- High Inventory Value with low Daily Sales → capital is tied up, cash flow concern
- Low Inventory Quantity with high Daily Sales → risk of stock-out, revenue loss
- Large gap between Inventory Value and Inventory Cost → healthy margins on remaining stock

---

## Production Methods Setting

The Settings → Shop page includes a **"Production Methods"** card with the subtitle **"Set your inventory strategy"** (confirmed from the real dashboard visual inventory).

### What This Setting Likely Controls
Based on the subtitle and BeProfit's broader cost management architecture, Production Methods likely allows merchants to indicate their business model:

| Production Method | Typical Inventory Behavior |
|-------------------|--------------------------|
| **Manufacturing** | Produces goods in-house, tracks raw materials + finished goods |
| **Dropshipping** | Never holds inventory — products shipped directly from supplier |
| **Print-on-Demand** | Produces per order — minimal inventory held |
| **Warehousing/Retail** | Holds pre-purchased inventory, traditional stock management |
| **Wholesale** | Buys in bulk, holds large inventory quantities |

### Impact on Inventory Tracking
The Production Method setting likely affects:
- Whether inventory tracking metrics are prominent or hidden (dropshippers don't need inventory monitoring)
- How COGS is calculated (per-item vs per-order vs supplier-dependent)
- Whether depletion projections are meaningful (irrelevant for dropshipping/POD)

**Documentation Gap:** The Help Center does not have a dedicated article about Production Methods. The only evidence is the Settings card in the dashboard dump. How this setting affects the Inventory page display and calculations is undocumented.

---

## Industries Setting

Adjacent to Production Methods on the Settings → Shop page is an **"Industries"** card with the subtitle **"Set the niche you operate in."**

### Relevance to Inventory
The Industries setting likely provides:
- Industry-specific benchmarks for inventory metrics (e.g., typical days-to-depletion for electronics vs apparel)
- Contextual recommendations based on industry norms
- Potential categorization for the Benchmark Profit Analysis feature (documented in file 025)

**Documentation Gap:** Like Production Methods, the Industries setting has no dedicated Help Center article. Its specific impact on inventory tracking is unknown.

---

## Inventory History & Trends

### Historical Inventory Data
The Help Center does **not document** any historical inventory views such as:
- Stock level over time (time-series chart)
- Inventory value over time
- Seasonal inventory patterns
- Month-over-month inventory comparisons

The Inventory page appears to show **current snapshot data only**, with the date range selector affecting only the velocity/depletion calculations (not showing historical stock levels).

### Inventory Trend Analysis
There is no documented:
- Inventory turnover ratio calculation
- Days of inventory on hand (DOH) trending
- Stock-to-sales ratio tracking
- ABC analysis (categorizing products by inventory contribution)

---

## Inventory Import/Export

### Data Import
Inventory quantities are **imported automatically** via platform sync (Shopify, WooCommerce, etc.). There is no documented:
- Manual CSV import for inventory quantities
- Manual stock count entry
- Barcode/scanner integration
- Physical inventory count reconciliation

### Data Export
The Inventory page likely supports the same **page-specific export** pattern documented in file 023 — an Export button in the top right corner that downloads the currently displayed data. However, the Help Center does not explicitly confirm export functionality for the Inventory page.

**Export format** is undocumented (likely CSV/Excel based on other pages, per file 023).

---

## Inventory Page vs Products Analytics Page

It's important to distinguish between the Inventory page and the Products Analytics page:

| Feature | Inventory Page | Products Analytics Page |
|---------|---------------|----------------------|
| **Primary Focus** | Stock levels & valuation | Sales performance & profitability |
| **Key Metrics** | Quantity, Value, Cost, Depletion | Quantity Sold, Con. Profit, Con. Margin |
| **Time Orientation** | Current snapshot + forward projection | Historical period (date range) |
| **Inventory Data** | Yes — core purpose | No — sales-focused only |
| **Profitability Data** | Implied (Value − Cost) | Yes — Contribution Profit formula |
| **Grouping Options** | Unknown (not documented) | Product, Vendor, Variant, Type |
| **Variant Drill-Down** | Yes (collapsible arrow) | Not documented for analytics page |

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Inventory tab | Navigation tab | Products submenu | Access to inventory page within Products section |
| Date range picker | Dropdown/calendar | Page header | Controls velocity and depletion calculation period |
| Product table | Data table | Main content | Rows per product with inventory metrics |
| Collapsible variant arrow | Icon button | Product rows | Expand to reveal per-variant inventory data |
| Inventory Quantity column | Table column | Product table | Current stock count |
| Inventory Value column | Table column | Product table | Quantity × selling price |
| Inventory Cost column | Table column | Product table | Quantity × unit cost (COGS) |
| Unit Count column | Table column | Product table | Distinct unit count |
| Daily Sales column | Table column | Product table | Average daily sales velocity |
| Depletion projection column | Table column | Product table | Estimated days to stock-out |
| Export button (likely) | Action button | Top right | Download inventory data |
| Production Methods card | Settings card | Settings → Shop | "Set your inventory strategy" |
| Industries card | Settings card | Settings → Shop | "Set the niche you operate in" |

---

## Data Model Implications

### Entity Relationships
```
Product (1) ──→ (N) Variants
Variant (1) ──→ (1) InventoryLevel
  ├── quantity (integer, synced from platform)
  ├── unit_selling_price (decimal, from platform)
  ├── unit_cost (decimal, from COGS config — file 015)
  ├── inventory_value (computed: quantity × unit_selling_price)
  └── inventory_cost (computed: quantity × unit_cost)

Product (aggregate) ──→ computed from sum of Variant InventoryLevels
  ├── total_quantity = Σ variant quantities
  ├── total_value = Σ variant inventory values
  └── total_cost = Σ variant inventory costs

Daily Sales Velocity ──→ derived from OrderLineItems within date range
Depletion Projection ──→ derived: total_quantity ÷ daily_sales_velocity
```

### Key Data Characteristics
- **Inventory Quantity** is externally sourced (platform sync) — BeProfit is read-only for stock levels
- **Unit Cost** is internally managed (COGS configuration) — BeProfit controls this value
- **Computed metrics** (Value, Cost, Depletion) are derived from the above at query time
- **Date range** affects only velocity-dependent calculations, not stock level data
- **No historical inventory tracking** — current snapshot only, no time-series storage

### Production Method as Configuration
```
Shop (1) ──→ (1) ProductionMethodConfig
  ├── method_type (enum: manufacturing, dropshipping, pod, warehousing, wholesale)
  └── affects: inventory_visibility, cogs_method_suggestions, depletion_relevance

Shop (1) ──→ (1) IndustryConfig
  ├── industry_type (enum or multi-select of industry categories)
  └── affects: benchmark_data, inventory_norms, metric_recommendations
```

---

## Limitations & Gaps

1. **No advanced inventory valuation.** BeProfit uses simple multiplication (Qty × Unit Price/Cost) without support for FIFO, LIFO, weighted average, or other accounting-standard methods. This makes Inventory Cost unsuitable for financial reporting or tax purposes.

2. **No independent inventory ledger.** BeProfit reads stock levels from the e-commerce platform — it cannot track inventory independently. Merchants selling through channels not connected to BeProfit have invisible inventory.

3. **No low-stock alerts.** There is no configurable threshold system to warn when stock drops below a certain level. This is a major gap for proactive inventory management.

4. **No reorder point or safety stock.** Users cannot set reorder points, safety stock levels, or automatic reorder triggers. The depletion projection shows WHEN stock will run out but doesn't help prevent it.

5. **No multi-location inventory.** There is no documented support for tracking inventory across multiple warehouses, fulfillment centers, or retail locations. Stock is a single number per variant.

6. **No purchase order tracking.** BeProfit does not track incoming inventory (purchase orders, expected stock arrivals). It only shows current available stock.

7. **Depletion projection is simplistic.** The linear extrapolation (stock ÷ daily velocity) doesn't account for seasonality, trends, promotions, or supply chain lead times. The projection changes based on the selected date range, which can be confusing.

8. **No inventory history or trending.** Users cannot view stock levels over time, inventory turnover rates, or seasonal stock patterns. The page shows current snapshot only.

9. **Production Methods setting is undocumented.** The "Set your inventory strategy" card exists in the dashboard but has no Help Center article explaining what options are available or how they affect the product.

10. **Inventory sync frequency unknown.** How often stock levels are refreshed from the e-commerce platform is not documented, making the freshness and reliability of inventory data uncertain.

11. **No inventory carrying cost.** The cost of holding inventory (storage, insurance, depreciation, opportunity cost) is not calculated. Only acquisition cost is tracked.

---

## Relevance to Our Build

1. **Implement FIFO/weighted-average valuation as a differentiator.** BeProfit's simple multiplication method is adequate for quick estimates but falls short for merchants who need accounting-grade inventory valuation. Offering FIFO and weighted average methods would serve larger merchants and those with fluctuating supplier costs.

2. **Build configurable low-stock alerts from day one.** This is a clear gap in BeProfit. Allow merchants to set per-product or per-variant low-stock thresholds with multi-channel notifications (email, Slack, in-app). Integrate with the alert system planned based on file 024's gap analysis.

3. **Add reorder point management.** Beyond showing when stock will deplete, allow merchants to set reorder points, lead times, and safety stock levels. Calculate recommended order quantities and trigger reorder notifications. This transforms passive monitoring into proactive inventory management.

4. **Implement inventory history and trending.** Store historical stock levels as a time series. Show stock-level-over-time charts, inventory turnover ratios, and seasonal patterns. This enables merchants to plan purchasing and identify slow-moving inventory.

5. **Support multi-location inventory.** For merchants using multiple warehouses or fulfillment centers (common with Amazon FBA + self-fulfillment), track inventory per location. Show consolidated views with per-location breakdowns.

6. **Add inventory carrying cost calculations.** Help merchants understand the true cost of holding inventory by factoring in storage costs, insurance, depreciation, and opportunity cost. This is a sophisticated feature that few DTC analytics tools offer.

7. **Build smart depletion projections.** Improve on BeProfit's linear extrapolation with trend-aware projections that account for sales velocity changes, seasonal patterns, and upcoming promotions. Use historical data to provide more accurate stock-out forecasts.

8. **Make Production Method impact explicit.** If we implement a production method setting, clearly document and show how it affects inventory tracking, COGS calculations, and which inventory features are relevant. A dropshipper shouldn't see depletion projections; a manufacturer should see raw materials tracking.

9. **Add dead stock identification.** Automatically flag products with low sales velocity relative to inventory levels. Calculate days of inventory on hand and highlight items exceeding a configurable threshold (e.g., >90 days of stock). This helps merchants free up capital.

10. **Integrate inventory data into profit analysis.** Unlike BeProfit, where inventory is separate from P&L, consider showing "capital efficiency" metrics that combine profitability with inventory management — e.g., GMROI (Gross Margin Return on Investment in Inventory) = Gross Margin ÷ Average Inventory Cost.
