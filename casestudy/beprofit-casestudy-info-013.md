# BeProfit Order-Level Profit Tracking

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/track-each-orders-profit-beprofit-help-center
  - https://help.runviably.com/beprofit/bulk-update-orders-costs-beprofit-help-center
  - https://help.runviably.com/beprofit/how-can-i-exclude-cogs-from
  - https://help.runviably.com/beprofit/expenses-types-beprofit-help-center
- **Category:** Core Feature / Order Profit Tracking
- **Date Captured:** 2026-02-12

---

## Orders Page Overview

The Orders page is the central hub for viewing all order data, including per-order cost breakdowns and profit calculations. It provides granular, order-level financial visibility — allowing merchants to understand the profitability of each individual transaction.

### Access
- Via left sidebar navigation: **Orders** (shopping bag icon, with right chevron indicating submenu)
- Or from the Dashboard's Orders section via the "Orders Page" external link

---

## Order List View

### Visible Columns
The order list displays the following metrics per order:

| Column | Description |
|--------|-------------|
| Order ID | Shopify/platform order identifier (searchable) |
| Paid | Amount paid by the customer |
| Shipping Costs | Shipping charges applied to the order |
| Net Shipping | Net shipping cost (revenue minus cost) |
| Tax | Tax amount on the order |
| Processing Fees | Payment gateway/transaction fees |
| Gross Profit | Profit before operating expenses |

### Hover-Over Breakdowns
Hovering over individual line items provides additional detail on cost components. This hover behavior reveals sub-breakdowns without navigating away from the list view.

### Search & Filtering

**Search:**
- Order ID search via search box — find specific orders by their identifier

**Filters:**
- Customer filters — focus on specific customer types or segments
- Source filters — filter by traffic/attribution source
- Fulfillment status — filter by order fulfillment state (fulfilled, unfulfilled, partially fulfilled, etc.)

### Export
- CSV export functionality available for the orders list
- Export captures the current filtered/visible data set

---

## Order Detail View (Expanded)

Expanding an individual order reveals a hierarchical product-level breakdown:

### Product-Level Cost Attribution
Each line item within an order shows:
- **Product name/variant**
- **COGS** — Cost of goods sold for that specific product
- **Tax allocation** — Tax attributed to that line item
- **Other per-item costs** as configured

### Customer Journey / UTM Data
The order detail view displays UTM attribution data associated with each order:
- **UTM source, medium, campaign** — how the customer found the store
- This enables per-order marketing attribution analysis

---

## Cost Editing (Single Order)

### Access
Via the **three-dot menu (⋯)** on individual order rows.

### Editable Cost Fields
Users can modify the following costs at the order level:

| Cost Type | Scope | Description |
|-----------|-------|-------------|
| COGS | Per item | Cost of goods sold for each line item |
| Shipping | Per order | Shipping cost for the order |
| Handling Fees | Per order | Additional handling charges |
| Duties | Per item | Import duties/customs fees |
| Tax | Per item | Tax allocation per line item |
| Processing Fees | Per order | Payment gateway fees |

This allows merchants to correct costs after the fact when actual vendor invoices differ from initial estimates.

---

## Bulk Cost Updates

### Purpose
Accommodates situations where actual costs from vendors arrive after order processing. Merchants can retroactively update costs in bulk when real invoices/shipping bills come in.

### Two Update Types

#### Type 1: Order Costs & Taxes/Duties
Updates **order-level** costs:
- Shipping costs
- Handling fees
- Tax and duty amounts

#### Type 2: Line Item COGS
Updates **product-level** production costs per individual line item.

### Bulk Update Process (Step-by-Step)

1. **Navigate** to the Orders section
2. **Click "Bulk Update"** button
3. **Select update type** — order costs or line item COGS
4. **Download template** — click "Download Now" to get a CSV file containing order data with editable cost columns
5. **Edit locally** — open the CSV, modify relevant cost fields based on actual vendor/supplier invoices
6. **Upload changes** — return to BeProfit, click Upload, select the modified CSV file
7. **Confirm** — click "Update & Close" to apply changes

### CSV Template Format
- Pre-populated with existing order data
- Editable cost columns for the selected update type
- Exact column headers not documented in the Help Center

### Key Advantage
This workflow is designed for the common DTC scenario where:
- Orders are placed with estimated/predicted costs
- Actual costs arrive later (vendor invoices, 3PL billing, customs clearance)
- Merchants need to retroactively correct profit calculations without editing orders one by one

---

## Refund & Return Handling

### Fully Refunded Orders
- **COGS exclusion setting:** Settings → Costs → Calculation Preferences → "Exclude COGS from all fully refunded orders"
- When enabled, COGS is automatically removed from profit calculations for fully refunded orders
- This prevents refunded orders from negatively impacting profit metrics

### Partially Refunded Orders
- **COGS exclusion does NOT apply** to partial refunds
- The help article explicitly states: "this is for fully refunded orders. Partial refunded orders do not apply"
- How partial refund profit calculations work (proportional COGS reduction, no reduction, etc.) is **not documented**

### Cancellations
- No specific documentation on how cancelled orders affect profit calculations
- Presumably treated similarly to fully refunded orders if payment was processed

### Default Behavior
- The default state of the COGS exclusion setting (enabled or disabled by default) is **not documented**

---

## Expense Types Affecting Orders

BeProfit classifies expenses into three types that can affect per-order profitability:

### 1. One-Time Expenses
- **Definition:** Costs occurring once within a specific period
- **Examples:** Equipment purchases, facility renovations, project legal fees, new hire training costs
- **Impact:** Budgeted separately from recurring expenses; affects specific period financial statements
- **Per-order relevance:** Typically allocated across a date range rather than attributed to specific orders

### 2. Recurring Expenses
- **Definition:** Costs repeating at regular intervals (monthly, quarterly, annually)
- **Examples:** Rent, utilities, insurance, software subscriptions, salaries
- **Impact:** Operational expenses affecting net profit calculations
- **Per-order relevance:** Distributed across orders within the recurring period for net profit calculation

### 3. Variable Expenses
- **Definition:** Costs fluctuating based on activity levels and revenue
- **Calculation:** Computed as either a "percentage of an order's revenue/returned amount or fixed amount" allocated to chosen metrics
- **Examples:** Sales commissions, marketing expenses, variable shipping costs
- **Per-order relevance:** Directly tied to individual orders — most relevant to order-level profit

### Expense Configuration
All expense types managed at: **Settings → Costs → Custom and Variable Expenses**

Related expense sub-types:
- Custom Operational Expenses
- Custom Product Expenses
- Custom Fulfillment Expenses
- Custom Marketing Expenses
- Variable Expenses

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Order list table | Data table | Orders page | Columns for order metrics with expandable rows |
| Order ID search box | Text input | Orders page header | Search by order identifier |
| Filter dropdowns | Multi-select dropdowns | Orders page header | Customer, source, fulfillment status filters |
| CSV export button | Action button | Orders page header | Download current view as CSV |
| Three-dot menu (⋯) | Icon button | Order row | Opens single-order cost editing |
| Expandable row chevron | Icon | Order row | Expands to show product-level detail |
| Product cost breakdown | Nested table | Expanded order row | COGS, tax, duties per product line item |
| UTM data section | Info block | Expanded order row | UTM source, medium, campaign |
| Bulk Update button | Action button | Orders page | Opens bulk update workflow |
| Update type selector | Radio/tabs | Bulk update modal | Order costs vs line item COGS |
| Download template button | Action button | Bulk update modal | Downloads CSV template |
| Upload button | Action button | Bulk update modal | Upload modified CSV |
| "Update & Close" button | CTA button | Bulk update modal | Confirms and applies bulk changes |
| Hover tooltip | Tooltip | Order list cells | Shows sub-breakdowns on hover |

---

## Data Model Implications

### Order-Level Data Structure
Each order must store:
1. **Order metadata** — platform order ID, date, customer info, fulfillment status, source
2. **Revenue fields** — paid amount, shipping revenue, tax collected, discounts applied
3. **Cost fields (order level)** — shipping cost, handling fees, processing fees, duties
4. **Line items** — each with: product reference, quantity, COGS, tax allocation, duties
5. **UTM data** — source, medium, campaign, term, content
6. **Calculated fields** — gross profit, net shipping, margins

### Cost Update Audit Trail
The bulk update feature implies:
- Orders can have costs modified after creation
- A history/audit trail of cost changes may be needed (original estimate → actual cost)
- Two distinct update scopes: order-level costs vs line-item COGS

### Key Relationships
- **Order** → has many **Line Items** → each has **Product**, COGS, tax, duties
- **Order** → has **UTM Attribution** (source, medium, campaign)
- **Order** → has **Fulfillment Status** (tracked independently from financial status)
- **Order** → has **Customer** → classified as new or returning
- **Order** → can have **Variable Expenses** applied (calculated per-order)
- **Order** → can have **Refund** (full or partial) → affects COGS exclusion logic

---

## Limitations & Gaps

1. **Order list column set incomplete.** The documented columns (Paid, Shipping Costs, Net Shipping, Tax, Processing Fees, Gross Profit) may not be the full set. Additional columns like COGS, Marketing Cost, Net Profit, Margin % are expected but not explicitly listed.

2. **Partial refund COGS handling undocumented.** How partial refunds affect profit calculations (proportional COGS reduction? no change? manual adjustment?) is not explained.

3. **Bulk update CSV format undocumented.** The exact column headers, accepted formats, and validation rules for the bulk update CSV template are not specified.

4. **Sorting capabilities not described.** Whether users can sort the order list by any column (profit, date, amount) is not documented.

5. **Pagination not described.** How large order sets are paginated (infinite scroll, numbered pages, load more) is unknown.

6. **Order detail view depth unclear.** Beyond product-level COGS and UTM data, what other information is visible in the expanded order view is not fully described.

7. **No bulk editing of variable expenses.** The bulk update only covers order costs and line item COGS — not variable/custom expenses applied to orders.

8. **Filter options incomplete.** The documented filters (customer, source, fulfillment status) are likely a subset. Date range, platform, profit range, product filters would be expected but aren't confirmed.

9. **No order tagging or notes.** There's no mention of ability to tag, annotate, or add notes to individual orders for internal tracking.

10. **Cancellation handling missing.** How cancelled orders (not just refunded) are treated in profit calculations is not documented.

---

## Relevance to Our Build

### Key Takeaways

1. **Order-level profit visibility is table-stakes.** Every profit analytics tool must show per-order profitability. Build a fast, searchable, filterable order list with real-time profit calculations.

2. **Support post-hoc cost correction from day one.** Merchants frequently get actual costs after order placement (3PL invoices, customs duties, vendor bills). Build both single-order editing and bulk CSV update into the core product.

3. **UTM attribution per order is high value.** Showing which marketing channel drove each order links marketing spend directly to revenue. Make this a first-class citizen in the order detail view.

4. **Solve the partial refund problem.** BeProfit's limitation around partial refund COGS handling is a gap. Our system should proportionally adjust COGS when partial refunds occur (e.g., 2 of 3 items returned → 2/3 COGS excluded).

5. **Hover breakdowns reduce clicks.** Showing cost sub-breakdowns on hover is a strong UX pattern for data-dense tables. Implement this widely — every number should be explorable without navigation.

6. **Bulk update via CSV is the right pattern.** Merchants are comfortable with spreadsheets. The download-edit-upload cycle is standard for ERP/accounting workflows. Consider adding Google Sheets sync as a real-time alternative.

7. **Variable expenses at order level are powerful.** Calculating commissions and other variable costs as a percentage of order revenue provides accurate per-order profitability. Build flexible variable expense rules (percentage-based, fixed per order, tiered by volume).

8. **Add order annotations.** The lack of order-level notes/tags is a gap. Allow merchants to tag orders ("wholesale", "influencer sample", "gift") and add internal notes for their team.

9. **Build comprehensive filtering.** Go beyond customer/source/status filters. Add: date range, product contains, profit range (profitable/unprofitable), platform, payment method, geography.

10. **Order-level audit trail.** When costs are updated (single or bulk), maintain an audit trail showing what changed, when, and by whom. This is critical for accounting reconciliation.
