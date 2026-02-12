# BeProfit Profit Calculation Methodology

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/the-profit-glossary-beprofit-help-center
  - https://help.runviably.com/beprofit/compare-beprofit-data-to-shopify-beprofit-help-center
  - https://help.runviably.com/beprofit/setting-up-calculation-preferences-beprofit-help-center
  - https://help.runviably.com/beprofit/whats-affected-by-calculation-preferences-beprofit-help-center
  - https://help.runviably.com/beprofit/why-is-my-data-not-accurate
  - https://help.runviably.com/beprofit/beprofit-faq
  - https://help.runviably.com/beprofit/transaction/processing-fees-beprofit-help-center
  - https://help.runviably.com/beprofit/marketing-cost-allocation-beprofit-help-center
  - https://help.runviably.com/beprofit/predicted-costs-beprofit-help-center
- **Category:** Core Feature / Profit Calculation
- **Date Captured:** 2026-02-12

---

## Profit Calculation Formula (Complete)

BeProfit uses a multi-tier profit formula that calculates from Gross Sales down to Net Profit through successive deductions. The complete formula chain is documented in the Profit Glossary.

### Revenue Tier

```
Gross Sales = Revenue from Sales + Sales Taxes + Shipping Revenue/Charged
Total Gross Revenue = Revenue from Sales + Sales Taxes + Shipping Revenue/Charged  (identical to Gross Sales)
Orders Revenue = Gross Sales - Discounts
Total Sales = Total Gross Revenue - Discounts - Returns/Refunds
Net Sales = Total Sales - Sales Taxes
```

### Cost Tier

```
Costs = Refunds + Fulfillment Costs + Taxes + Transaction Fees + COGS + Marketing Costs
Fulfillment Costs = Shipping Cost + Handling + Duties
```

### Profitability Tier

```
Gross Profit = Net Sales - Transaction Fees - Fulfillment Costs - Product Costs (COGS)
Gross Margin = Gross Profit / (Total Sales - Sales Taxes) × 100

Contribution Profit = Gross Profit - Marketing Costs
Contribution Margin = Contribution Profit / (Total Sales - Sales Taxes) × 100

Net Profit = Contribution Profit - Operating Expenses
Net Margin = Net Profit / (Total Sales - Sales Taxes) × 100
```

### Performance Metrics

```
AOV (Average Order Value) = Orders Revenue / Order Count
```

---

## Metric Definitions (Profit Glossary)

### Revenue Metrics

| Metric | Formula | Purpose |
|--------|---------|---------|
| **Gross Sales** | Revenue + Sales Taxes + Shipping Revenue | Total pre-deduction revenue including all charges to customers |
| **Total Gross Revenue** | Same as Gross Sales | Comprehensive pre-deduction revenue (alternate name) |
| **Orders Revenue** | Gross Sales - Discounts | Revenue after promotional deductions |
| **Total Sales** | Total Gross Revenue - Discounts - Returns/Refunds | Net revenue after all customer adjustments |
| **Net Sales** | Total Sales - Sales Taxes | Final sales figure after tax removal |

### Cost Metrics

| Metric | Formula | Purpose |
|--------|---------|---------|
| **Costs** | Refunds + Fulfillment + Taxes + Transaction Fees + COGS + Marketing | Holistic cost view for budget monitoring |
| **Product Costs / COGS** | (configured per product) | Cost of goods sold — assess production expenses |
| **Fulfillment Costs** | Shipping + Handling + Duties | Total order fulfillment cost |

### Profitability Metrics

| Metric | Formula | Purpose |
|--------|---------|---------|
| **Gross Profit** | Net Sales - Transaction Fees - Fulfillment - COGS | Profit after direct costs |
| **Gross Margin** | Gross Profit / Net Sales × 100 | Profitability percentage before marketing/opex |
| **Contribution Profit** | Gross Profit - Marketing Costs | Profit after marketing deduction |
| **Contribution Margin** | Contribution Profit / Net Sales × 100 | Margin after marketing |
| **Net Profit** | Contribution Profit - Operating Expenses | Bottom-line profit |
| **Net Margin** | Net Profit / Net Sales × 100 | Bottom-line profitability percentage |
| **AOV** | Orders Revenue / Order Count | Average order value |

---

## How Each Cost Component is Sourced

### 1. Product Costs (COGS)
- **Source:** 6 methods with priority hierarchy (documented in file 005):
  1. Bulk Update (highest priority)
  2. Manual Edit
  3. CJ Dropshipping Integration
  4. COGS Profile
  5. Google Sheets
  6. Product Page Manual (lowest priority)
- **Automation:** Shopify product cost sync, CJ Dropshipping sync, Google Sheets auto-update
- **Manual:** Direct entry, CSV upload, bulk update

### 2. Transaction / Processing Fees
- **Auto-detected:** PayPal and Shopify Payments fees are calculated automatically
- **Shopify plan auto-detection:** BeProfit automatically applies correct fee rates based on the user's Shopify plan
- **Manual configuration:** Settings → Costs → Processing Fees
  - Each payment gateway shows after its first transaction
  - Configurable: percentage of transaction amount + fixed per-transaction fee
  - Both can be combined or set to "No fees apply"
  - Changes can be backdated to specific date ranges
- **Multiple gateways supported:** All active payment gateways that have processed orders appear in the list

### 3. Fulfillment Costs (Shipping + Handling + Duties)
- **Source:** Fulfillment profiles, connected fulfillment platforms (10 providers), manual entry
- **Methods:** Flat rate, per-item, per-order, weight-based, tiered, carrier-specific rates
- **See file 006** for comprehensive shipping cost documentation

### 4. Marketing Costs
- **Source:** Connected ad platforms (Facebook, Google, TikTok, Pinterest, Snapchat)
- **Auto-synced:** Ad spend data pulled via platform API/OAuth connections
- **Allocation to orders:** Two methods (see Marketing Cost Allocation section below)
- **UTM attribution:** Alternative to platform-reported attribution

### 5. Operating Expenses
- **Source:** Manual entry of fixed/recurring costs
- **Categories:** Rent, salaries, subscriptions, equipment, insurance, utilities, warehouse, etc.
- **Three types:** One-time, recurring, and variable expenses
- **Affects:** Net Profit calculation only (not Gross or Contribution Profit)

### 6. Sales Taxes
- **Source:** From order data received through e-commerce platforms (Shopify, WooCommerce, etc.)
- **Not from external sources:** Taxes come from the platform's order records, not from third-party tax calculators
- **Note:** Shopify includes taxes in product prices; BeProfit separates them in its calculations

### 7. Discounts
- **Source:** Discount data from e-commerce platform orders
- **Handling:** Deducted from Gross Sales to calculate Orders Revenue and Total Sales

### 8. Returns / Refunds
- **Source:** Refund data from e-commerce platform
- **Treatment:** Deducted from Total Gross Revenue to calculate Total Sales
- **Predicted returns available:** Configurable estimated return costs before actual refunds occur

---

## Calculation Preferences (13 Settings)

All preferences configured at: **Settings → Costs → Calculation Preferences**

### Order Inclusion/Exclusion Settings

| # | Setting | Description | Impact |
|---|---------|-------------|--------|
| 1 | Exclude pending orders from revenue | Controls whether pending orders count toward revenue | If enabled, pending orders don't appear in revenue metrics |
| 2 | Exclude unfulfilled orders from revenue | Determines if unfulfilled orders count as revenue | If enabled, only fulfilled orders contribute to revenue |
| 3 | Exclude canceled orders | Removes canceled orders from all calculations | Full exclusion from all metrics |
| 4 | Exclude free ($0) orders | Prevents zero-dollar orders from inclusion | Removes gift orders, samples, test orders |
| 5 | Include orders from specific sources | Filter orders by traffic source | Only selected sources contribute to calculations |
| 6 | Include orders from specific sales channels | Enable filtering by sales channel | Only selected channels contribute |
| 7 | Exclude fraud orders | Removes flagged fraudulent orders | Prevents fraud from distorting metrics |
| 8 | Exclude unfulfilled orders when refunded | Removes refunded unfulfilled orders | Prevents double-counting of refunded but unfulfilled orders |

### Refund & Return Settings

| # | Setting | Description | Impact |
|---|---------|-------------|--------|
| 9 | Set Predicted returns cost | Establishes estimated cost for returns; adjusted when actual refunds are processed | Anticipates return costs before they materialize |
| 10 | Exclude COGS from fully refunded orders | Controls COGS treatment for full refunds | Removes COGS from profit calc for fully refunded orders (partial refunds NOT affected) |

### Cost Allocation Settings

| # | Setting | Description | Impact |
|---|---------|-------------|--------|
| 11 | Allocate shipping costs into products gross profit | Distributes shipping costs by product weight or order quantity | Affects per-product profitability |
| 12 | Allocate marketing costs into products | Distributes marketing costs by selling price or evenly | Affects per-product profitability |
| 13 | Apply marketing costs to new/all customers | CAC (new only) vs CPA (all orders) | Fundamentally changes marketing cost attribution |

---

## Marketing Cost Allocation Methods

### Order-Level Allocation

**Method: CAC (Customer Acquisition Cost)**
- Divides daily marketing costs evenly among new customers' orders only
- Returning customers' orders receive **no** marketing cost allocation
- Best for: Understanding true cost of customer acquisition

**Method: CPA (Cost Per Action)**
- Divides daily marketing costs evenly across ALL orders, regardless of customer status
- Best for: Understanding per-order marketing efficiency

**Both methods:** Daily marketing expenses are distributed evenly across all qualifying orders placed on that specific day.

### Product-Level Allocation

Marketing costs flow to products only when the parent order qualifies for marketing cost allocation. Two methods:

**Even Allocation:**
- Daily marketing costs divide equally across all products in an order
- Simple but doesn't account for product value differences

**Selling Price (Revenue-Weighted):**
- Marketing costs allocated proportionally based on each product's selling price relative to total order value
- Example: A $40 product in a $100 order receives 40% of that order's marketing cost allocation
- More accurate for mixed-value orders

---

## Predicted Costs System

### Predicted Returns
- **Purpose:** Estimate refund costs occurring 1-4 weeks post-purchase before actual refunds are processed
- **Configuration:** Settings → Costs → Returns Setting and Predictions
- **Prerequisite:** "Count refunds by order date" calculation preference must be enabled
- **Setup:** Select return day windows aligned with shop return policy, assign predicted cost percentages per period
- **Example:** "For every new order, 10% of the order value will be attributed to returns on the first day, 7% for the second day, and so on"
- **Reconciliation:** Once actual refund data becomes available, predicted figures are automatically replaced with verified amounts

### Predicted Amazon Fees
- **Purpose:** Forecast Amazon fees typically reported 2-3 weeks after order processing
- **Configuration:** Settings → Costs → Calculation Preferences → Amazon Fees Preferences
- **Setup:** Enable "Count fees by order date" → input predicted fee percentage → save
- **Reconciliation:** Real Amazon fee data automatically supersedes estimates upon availability

---

## Pages Affected by Calculation Preferences

### Affected Pages
Calculation Preferences modify data display on:
- Dashboard
- Compare Shops
- Compare Countries
- Compare Channels
- P&L report
- Custom reports (including BeProfit preset reports)
- Fulfillment
- Discounts report
- Processing Gateways report
- Products (partially affected)

### Unaffected Pages (Independent Calculation Rules)
These sections maintain their own calculation methodologies:
- **Orders** — shows raw order data regardless of calculation preferences
- **Marketing** — uses its own attribution and calculation logic
- **Cohort analysis** — independent customer lifecycle calculations

### Special Rules for Pending Orders
- Pending orders are **not** counted in total order revenue **unless** they are Cash On Delivery (COD) orders
- On the Products page, pending order items don't count as sold
- Marketing page excludes pending orders from sales counts

### Refund Attribution
- Refunds are always tracked by **original order placement date** (not refund processing date)
- On Marketing and Products pages, refunded orders display as "refunded"

---

## BeProfit vs Shopify Data Discrepancies

### Why Numbers Differ

**Gross Sales Calculation:**
- **BeProfit:** Combines total order revenues and discounts
- **Shopify:** Multiplies product price × quantity sold before deductions
- **Key difference:** Shopify includes taxes in product prices; BeProfit separates taxes

**Best Comparison Metric:**
- Use **"Total Sales"** metric for cross-platform comparison — this remains consistent between both systems
- Orders Revenue is BeProfit's primary metric (customer payments including taxes and shipping, minus discounts)

**Refund Impact:**
- BeProfit offers a preference to "count refunds by order date" (attributes refunds to original order date)
- Disabling this setting can reconcile figures more closely with Shopify's reporting methodology

### Setup for Comparison
1. Add "Orders Revenue" to dashboard: Navigate to Overview → Customize → enable Orders Revenue checkbox
2. Adjust refund preferences: Settings → Costs → Calculation Preferences → Refund Preferences

---

## Data Accuracy Issues

### Documented Causes
The Help Center article on data accuracy is notably thin, stating only: "Your data could be inaccurate due to the set up of your store."

### Common Accuracy Issues (from FAQ and cross-references)
1. **Incomplete COGS setup** — Products without cost data show inflated profits
2. **Missing shipping costs** — Unconfigured fulfillment profiles leave shipping costs at zero
3. **Processing fee misconfiguration** — Incorrect gateway fee rates
4. **Refund treatment** — Different refund date attribution can cause discrepancies vs platform data
5. **Voided/cancelled orders** — Appear in raw data but excluded from aggregate reporting
6. **Currency issues** — BeProfit shows data exclusively in shop's native currency; third-party currency plugins not supported for WooCommerce
7. **$0 orders included by default** — Zero-dollar orders (gifts, samples, tests) included unless explicitly excluded
8. **Pending order ambiguity** — Pending orders excluded from revenue by default, except COD orders
9. **Google Sheets COGS timing** — First connection updates past and future orders; subsequent changes only update future orders
10. **CJ Dropshipping COGS** — Updated at order level; taxes derive from e-commerce platform, not from CJ

### Data Source Fundamental
BeProfit is fundamentally an integration tool that visualizes store data rather than generating it independently. Data accuracy depends on the quality and completeness of data from connected platforms and user-configured costs.

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Calculation Preferences page | Settings page | Settings → Costs → Calc Preferences | 13 toggle switches (Yes/No) |
| Yes/No toggles | Toggle buttons | Calc Preferences | Each preference has a binary toggle |
| Save button | CTA button | Calc Preferences | Saves all preference changes |
| Processing Fees table | Configuration table | Settings → Costs → Processing Fees | Lists active payment gateways with fee inputs |
| Percentage input | Number input | Processing Fees | % of transaction amount |
| Fixed fee input | Number input | Processing Fees | Fixed $ per transaction |
| "No fees apply" option | Checkbox/radio | Processing Fees | Disables fees for a gateway |
| Date range selector | Date picker | Processing Fees save | When fee changes take effect |
| Predicted returns config | Form | Settings → Costs → Returns | Day windows + percentage inputs |
| Amazon fee percentage | Number input | Calc Preferences | Predicted fee % for Amazon orders |
| Marketing allocation toggles | Toggle/select | Calc Preferences | CAC vs CPA, Even vs Selling Price |
| Orders Revenue toggle | Checkbox | Dashboard Customize | Show/hide Orders Revenue metric |

---

## Data Model Implications

### Profit Calculation Engine Requirements

1. **Multi-tier calculation pipeline:** Revenue → Direct Costs → Gross Profit → Marketing → Contribution Profit → OpEx → Net Profit. Each tier must be independently calculable and displayable.

2. **13 configurable preference flags:** The calculation engine must support 13 binary configuration switches that alter which data is included/excluded from calculations. These preferences must propagate correctly across affected pages while leaving unaffected pages unchanged.

3. **Per-page calculation logic:** Some pages (Orders, Marketing, Cohort) have independent calculation rules that ignore preferences. The engine needs page-level calculation context.

4. **Marketing cost allocation engine:** Must support two allocation methods (CAC vs CPA) and two product-level distribution methods (Even vs Selling Price), applied daily to qualifying orders.

5. **Predicted cost system:** Must maintain predicted costs alongside actual costs, with automatic reconciliation when actual data arrives. Requires a two-phase cost storage (predicted → actual).

6. **Transaction fee auto-detection:** Integration with Shopify to detect plan-level fee rates, plus manual override capability per payment gateway.

7. **Refund date attribution:** Must support configurable refund attribution (by order date vs refund date) that changes how refunds affect period calculations.

8. **Multi-method COGS with priority hierarchy:** 6 input methods with defined priority — must resolve conflicts when multiple methods provide costs for the same product.

### Key Data Relationships
- **Order** → has cost components (COGS per item, fulfillment, transaction fee, marketing allocation, tax)
- **Product** → has COGS from multiple sources with priority resolution
- **Daily Marketing Cost** → allocated across qualifying orders for that day
- **Calculation Preferences** → 13 flags affecting calculation behavior
- **Payment Gateway** → has fee configuration (% + fixed)
- **Predicted Cost** → tracked parallel to actual cost, auto-replaced on reconciliation

---

## Limitations & Gaps

1. **No BCAC formula documented.** The dashboard shows BCAC (Blended Customer Acquisition Cost) but the Profit Glossary doesn't define its formula.

2. **Contribution Profit appears inconsistently.** It's a key metric on the dashboard (donut chart, KPI cards) but its definition as "Gross Profit - Marketing Costs" is not always clear in the P&L hierarchy.

3. **Partial refund profit impact unclear.** The COGS exclusion only applies to fully refunded orders. How partial refunds affect Gross Profit, Contribution Profit, and Net Profit at the line-item level is not documented.

4. **Margin denominator ambiguity.** The formulas show margins calculated as Profit / (Total Sales - Sales Taxes). But "Total Sales - Sales Taxes" is equivalent to "Net Sales." The documentation uses both terms interchangeably, which could cause confusion.

5. **Daily marketing allocation is coarse.** Marketing costs are distributed evenly across orders on a daily basis. This means a high-value order gets the same marketing cost allocation as a low-value order (in CPA mode). Hourly or session-based allocation would be more accurate.

6. **Predicted returns configuration complexity.** The multi-window return prediction system (day 1: 10%, day 2: 7%, etc.) requires merchant expertise to configure accurately. No guidance on typical return rate benchmarks by industry.

7. **Currency handling limitations.** BeProfit shows data exclusively in shop's native currency. Third-party WooCommerce currency plugins are not supported. Multi-currency P&L calculations are unclear.

8. **No contribution margin by channel.** While marketing cost allocation exists, calculating contribution margin per marketing channel (Facebook CM, Google CM, etc.) is not explicitly documented.

9. **Tax source limitation.** Taxes come only from e-commerce platform data. No integration with tax calculation services (TaxJar, Avalara, etc.) for independent verification.

10. **Data accuracy article is unhelpful.** The "why is my data inaccurate" article provides essentially no diagnostic guidance — just says "check your store setup."

---

## Relevance to Our Build

### Key Takeaways

1. **Adopt the three-tier profit model.** Gross Profit → Contribution Profit → Net Profit provides progressively deeper profitability views. This is the right abstraction for DTC merchants.

2. **Make the profit formula transparent.** Show users exactly how each number is calculated. BeProfit's Profit Glossary is good but incomplete. Build interactive formula explorers — hover over any number to see its components.

3. **Build a real calculation preferences system.** The 13 toggles are powerful but complex. Group them into logical categories (order filtering, refund handling, cost allocation) and provide clear explanations of each setting's impact with preview capabilities.

4. **Fix marketing cost allocation.** BeProfit's daily-even-allocation is crude. Build attribution-weighted allocation (orders attributed to a channel get that channel's cost) rather than spreading costs equally across all daily orders.

5. **Auto-detect more transaction fees.** BeProfit auto-detects PayPal and Shopify Payments. We should auto-detect Stripe, Square, Klarna, Afterpay, Shop Pay, and other common gateways.

6. **Build smart data accuracy diagnostics.** Instead of "check your store," build a data quality score that highlights: "3 products missing COGS," "Shipping costs not configured for FedEx," "Processing fees below market average (possible misconfiguration)."

7. **Implement predicted costs with industry benchmarks.** The predicted returns feature is valuable but hard to configure. Provide industry benchmark return rates (fashion: 20-30%, electronics: 10-15%, home goods: 5-10%) as starting points.

8. **Make refund handling configurable but clear.** Both refund-by-order-date and refund-by-refund-date have valid use cases. Explain the implications clearly and let users choose, with a recommendation for their business type.

9. **Support partial refund COGS proportional adjustment.** When 2 of 3 items in an order are returned, proportionally reduce COGS. This is a gap in BeProfit that we should solve.

10. **Build per-channel contribution margin.** Calculate and display contribution margin for each marketing channel independently (Facebook CM%, Google CM%, TikTok CM%). This answers "which channel is actually profitable?" more directly than ROAS alone.
