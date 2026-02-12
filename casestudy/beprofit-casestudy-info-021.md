# BeProfit Tax Handling Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/edit-tax-settings-beprofit-help-center (Edit Tax settings — Taxes category)
  - https://help.runviably.com/beprofit/setting-up-calculation-preferences-beprofit-help-center (Calculation Preferences — cross-reference)
  - https://help.runviably.com/beprofit/whats-affected-by-calculation-preferences-beprofit-help-center (What's affected by calculation preferences — cross-reference)
  - https://help.runviably.com/beprofit/is-tax/vat-included-in-shipping-costs-beprofit-help-center (Tax/VAT in shipping costs)
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — tax-related entries)
  - https://beprofit.co/a/community/business-management/how-do-i-add-taxes-on-shopify (Community — tax setup)
  - https://beprofit.co/a/blog/essentials-of-profit-and-loss-statements-a-beginner-s-guide-for-e-commerce (Blog — tax in P&L)
- **Category:** Core Feature / Tax Handling
- **Date Captured:** 2026-02-12
- **Cross-references:**
  - File 014 (beprofit-casestudy-info-014.md) — Profit Calculation Methodology (tax in the profit formula)
  - File 020 (beprofit-casestudy-info-020.md) — Shipping Cost Tracking (tax/VAT in shipping costs)
  - File 012 (beprofit-casestudy-info-012.md) — P&L Reports (Sales Taxes line item)

---

## Tax Settings Overview

BeProfit's tax handling is remarkably simple — it is **not a standalone tax management system** but rather a passthrough of tax data from connected e-commerce platforms. The Taxes category in the Help Center contains only **one article** ("Edit Tax settings"), and that article focuses exclusively on per-order manual tax editing rather than system-wide tax configuration.

### Core Design Philosophy
BeProfit treats taxes as **platform-sourced data**, not internally calculated values. The FAQ explicitly states:

> "Taxes are pulled from the data received on the orders. The taxes are the sales taxes that a customer has paid when placing an order."

This means:
- BeProfit does **NOT** calculate taxes independently
- BeProfit does **NOT** integrate with tax calculation services (TaxJar, Avalara, etc.)
- Tax data comes exclusively from the connected e-commerce platform (Shopify, WooCommerce, Amazon)
- The accuracy of tax data depends entirely on how the merchant configured taxes in their e-commerce platform

### Tax Settings Access Path
There is no dedicated "Tax Settings" page in the traditional sense. Tax-related editing happens at:
- **Per-order level:** Orders page → three-dot menu → "Edit order costs" → Tax fields
- **Platform level:** Must be configured in the source e-commerce platform (Shopify Admin → Settings → Taxes)

---

## Tax Inclusion/Exclusion in Profit Calculations

### How Taxes Flow Through the Profit Formula
Based on file 014 (Profit Calculation Methodology), taxes appear at multiple points in the formula chain:

**Revenue-Side:**
```
Gross Sales = Revenue from Sales + Sales Taxes + Shipping Revenue/Charged
Total Sales = Total Gross Revenue - Discounts - Returns/Refunds
Net Sales = Total Sales - Sales Taxes
```

**Key insight:** Sales Taxes are **added** to Gross Sales (meaning Gross Sales includes taxes) and then **subtracted** to arrive at Net Sales. This means:
- **Gross Sales** = tax-inclusive figure
- **Net Sales** = tax-exclusive figure
- The P&L report shows "Sales Taxes" as a separate deduction line between Total Sales and Net Sales After Tax

**Cost-Side:**
```
Costs = Refunds + Fulfillment Costs + Taxes + Transaction Fees + COGS + Marketing Costs
```

Taxes appear in the overall Costs aggregation as well, representing the tax burden on the revenue side that must be accounted for.

### Profitability Metrics and Tax
All three profitability tiers (Gross Profit, Contribution Profit, Net Profit) use **Net Sales** (tax-exclusive) as the revenue base:
```
Gross Margin = Gross Profit / (Total Sales - Sales Taxes) × 100
```

This means BeProfit's profitability metrics are always calculated on a **pre-tax basis** — taxes are excluded before any profit calculation.

### No Global Include/Exclude Toggle
Unlike some competitors, BeProfit does **not** offer a global "include/exclude taxes from profit calculations" toggle. The tax treatment is fixed:
- Gross Sales includes taxes
- Net Sales excludes taxes
- Profit metrics use Net Sales as the denominator

---

## Per-Order Tax Editing

The primary tax interaction in BeProfit is editing tax amounts on individual orders.

### Tax Edit Workflow
1. Navigate to the **Orders** section
2. Click the **three-dot menu** (⋯) on a specific order
3. Select **"Edit order costs"**
4. Modify two fields:
   - **Tax on shipping** — tax amount applied to shipping charges
   - **Tax on goods** — tax amount applied to the product/goods portion
5. Click **Save** to apply changes

### Scope of Changes
**Critical limitation:** "Editing the taxes on an order on your Orders page will only affect the data for that specific order." There is no mechanism to:
- Apply tax rate changes retroactively across all orders
- Set default tax rates for future orders
- Configure tax rates by region/jurisdiction within BeProfit
- Bulk edit tax amounts across multiple orders simultaneously

### When to Use Per-Order Tax Editing
This feature is intended for corrections when:
- The e-commerce platform sent incorrect tax data
- Tax was miscalculated on a specific order
- Manual adjustments are needed for special tax circumstances

---

## Tax Types Supported

### What BeProfit Recognizes
Based on documentation analysis, BeProfit handles taxes as a single aggregated "tax" value per order, with no granular tax type categorization:

| Tax Type | Supported? | Notes |
|----------|-----------|-------|
| Sales Tax | Yes — as aggregate | Pulled from platform order data |
| VAT | Yes — as aggregate | Treated identically to sales tax in the data model |
| GST | Not explicitly mentioned | Likely included if platform provides it in the tax field |
| Customs Duties | Separate category | Tracked under Fulfillment Costs (Duties), not Tax |
| Import Tax | Not explicitly mentioned | May fall under Duties in fulfillment |

### No Tax Type Distinction
BeProfit does **not** distinguish between different tax types. Whether an order has sales tax (US), VAT (EU/UK), or GST (Australia/Canada), it all flows into the same "Tax" field. The two editable fields are "Tax on shipping" and "Tax on goods" — these represent WHERE tax is applied, not WHAT TYPE of tax it is.

---

## Multi-Jurisdiction Tax Handling

### Current Capability: None
BeProfit has **no multi-jurisdiction tax handling**. There is:
- No per-region tax rate configuration
- No automatic tax rate detection based on customer location
- No tax jurisdiction mapping
- No VAT registration number support
- No tax compliance reporting by jurisdiction

### How Regional Taxes Are Handled
Regional tax calculations happen entirely within the e-commerce platform:
- **Shopify:** Manages tax rates via Settings → Taxes → Tax Regions. BeProfit receives the calculated tax amount per order.
- **Amazon:** Amazon handles tax calculation and collection. BeProfit receives post-tax order data.
- **WooCommerce:** Tax rates configured in WooCommerce settings. BeProfit receives calculated amounts.

BeProfit is agnostic to the tax jurisdiction — it simply receives and displays whatever tax amount the platform calculated for each order.

---

## Tax Reporting Features

### Current Tax Reporting
Tax reporting in BeProfit is minimal:

1. **P&L Report Line Item:** "Sales Taxes" appears as a deduction line between Total Sales and Net Sales After Tax (documented in file 012)
2. **Order-Level Tax Display:** Hovering over the Tax amount on the Orders page shows a tooltip with tax breakdown
3. **Profit Breakdown Donut Chart:** The dashboard donut chart includes "Taxes" as a segment (documented in file 011 — typically a small percentage, e.g., 0.11% in the example)

### What Does NOT Exist
- No dedicated tax report or tax summary page
- No tax collected by period report
- No tax by jurisdiction/region breakdown
- No tax filing export (tax amounts in a format suitable for tax returns)
- No tax reconciliation tools (comparing collected vs remitted)
- No tax rate audit trail

---

## Tax & Shipping Costs Interaction

### Customer-Facing Shipping Revenue
The shipping price paid by customers **already includes tax/VAT** when pulled from the e-commerce platform. The Help Center states:

> "The shipping price paid by your customers is pulled automatically from your store and already includes tax/VAT."

### Viewing Shipping Tax
Users can see the shipping tax component by:
1. Navigate to the **Orders** page
2. Hover over the **Tax** amount displayed for each order
3. The tooltip shows a breakdown including tax on shipping

### Merchant-Side Shipping Cost Tax
If merchants want to account for tax/VAT in their own shipping cost calculations (i.e., the costs they pay to carriers), they must:
1. Navigate to **Settings → Costs → Fulfillment**
2. Edit the fulfillment profile
3. Manually add the tax amount into the **Shipping Rate** field
4. Save changes

### Critical Limitation
> "BeProfit does not offer a breakdown of your shipping costs, separating them into shipping and tax amounts."

This means:
- Shipping revenue from customers includes embedded tax — no separation available
- Merchant shipping costs must manually include tax — no automatic calculation
- There is no "Net Shipping" metric that excludes tax (the Net Shipping metric documented in file 020 refers to revenue minus cost, not tax separation)

**Cross-reference:** See file 020 (Shipping Cost Tracking) for comprehensive shipping cost documentation.

---

## Tax & Calculation Preferences

### No Tax-Specific Calculation Preferences
After reviewing both Calculation Preferences articles, there are **no calculation preferences that specifically control tax treatment**. The 13 calculation preferences documented in file 014 cover:
- Order inclusion/exclusion (pending, unfulfilled, canceled, free, fraud)
- Source and channel filtering
- Refund and COGS treatment
- Shipping and marketing cost allocation

None of these directly address tax handling.

### Indirect Tax Impact
Some calculation preferences affect tax amounts indirectly:
- **Exclude pending orders from revenue:** If enabled, the taxes on pending orders are also excluded
- **Exclude canceled orders:** Removes associated tax amounts from calculations
- **Exclude free ($0) orders:** Removes any tax on zero-dollar orders
- **Exclude fraud orders:** Removes associated tax amounts

These preferences affect the ORDER, and since tax is a component of the order, the tax is excluded along with the order. But there is no preference that says "include/exclude taxes from the profit formula."

---

## Tax Data Source by Platform

| Platform | Tax Source | Auto-Detected? | Notes |
|----------|-----------|----------------|-------|
| Shopify | Order data via Shopify API | Yes | Shopify calculates tax based on tax region configuration. BeProfit receives the calculated amount. |
| Amazon | Order data via Amazon API | Yes | Amazon handles tax calculation and collection. Fee delays of 2-3 weeks apply to all Amazon data. |
| WooCommerce | Order data via WooCommerce API | Yes | Tax rates configured in WooCommerce. Third-party currency/tax plugins NOT supported. |
| Wix | Order data via Wix API | Yes | Minimal documentation on Wix-specific tax behavior. |
| CJ Dropshipping | NOT from CJ | N/A | FAQ explicitly states: "Taxes are not pulled from CJ Dropshipping, but rather from the order data we receive from the eCommerce platform." |

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Tax on shipping field | Number input | Orders → Edit order costs modal | Manual tax amount for shipping |
| Tax on goods field | Number input | Orders → Edit order costs modal | Manual tax amount for goods/products |
| Tax hover tooltip | Tooltip | Orders page → Tax column | Shows tax breakdown (tax on goods, tax on shipping) |
| Sales Taxes line item | Table row | P&L Report | Deduction between Total Sales and Net Sales |
| Taxes donut segment | Chart segment | Dashboard → Profit Breakdown | Visual proportion of taxes in total costs |
| Edit order costs option | Menu item | Orders → three-dot menu | Opens cost editing modal including tax fields |

---

## Data Model Implications

### Tax as a Property on Orders
- **Tax on goods:** Decimal amount, per-order, sourced from platform or manually edited
- **Tax on shipping:** Decimal amount, per-order, sourced from platform or manually edited
- **Total tax:** Sum of tax on goods + tax on shipping
- **Tax source:** Implicit — always from e-commerce platform (Shopify, Amazon, WooCommerce, Wix)

### No Tax Configuration Entities
Unlike competitors that might have tax rate tables, jurisdiction mappings, or tax rule engines, BeProfit has no independent tax configuration data model. Tax is purely an order-level attribute.

### Tax in Aggregations
- **P&L aggregation:** Sum of all order taxes for the period → displayed as "Sales Taxes" line item
- **Dashboard aggregation:** Sum of all order taxes → displayed in donut chart as "Taxes" segment
- **Profit formulas:** Net Sales = Total Sales - Sales Taxes (tax excluded from all profitability calculations)

---

## Limitations & Gaps

1. **No independent tax calculation.** BeProfit relies entirely on e-commerce platforms for tax amounts. If the platform calculates tax incorrectly, BeProfit inherits the error with no way to detect or correct it at scale.

2. **No multi-jurisdiction tax reporting.** For merchants selling across multiple states/countries, there is no breakdown of tax collected by jurisdiction — all tax is aggregated into a single amount per order.

3. **No tax rate configuration.** Users cannot set tax rates within BeProfit. There are no tax region settings, no VAT registration number fields, no tax class assignments.

4. **No tax filing or compliance exports.** BeProfit does not generate tax reports suitable for filing (no tax collected by state, no VAT return summary, no 1099 data).

5. **No integration with tax services.** No connection to TaxJar, Avalara, Vertex, or other tax calculation/compliance services.

6. **No separation of tax types.** Sales tax, VAT, and GST are all treated identically — there is no way to distinguish between tax types in reporting.

7. **Per-order editing only.** Tax corrections must be made one order at a time. No bulk tax editing, no retroactive tax rate adjustments.

8. **Shipping tax is not separable.** Customer-facing shipping prices include embedded tax/VAT, and BeProfit cannot separate the tax component from the shipping amount.

9. **No tax on COGS or supplier costs.** BeProfit tracks tax on the REVENUE side (what customers paid) but has no mechanism for tracking tax on the COST side (VAT paid to suppliers, import duties as tax, etc.). Customs duties are tracked separately under fulfillment but are not categorized as "tax."

10. **CJ Dropshipping tax exclusion.** Taxes for CJ Dropshipping orders come from the e-commerce platform, not from CJ — this could cause discrepancies if the platform's tax data differs from actual CJ transaction taxes.

---

## Relevance to Our Build

1. **Tax handling is a significant BeProfit weakness — and a differentiation opportunity.** The minimal tax handling (passthrough from platform, per-order editing only) means merchants with multi-jurisdiction tax complexity are underserved. Building proper tax configuration would be a competitive advantage.

2. **Start with platform passthrough, but add a tax configuration layer.** Like BeProfit, we should pull tax data from connected platforms as the baseline. But add the ability to configure tax rates, tax regions, and override rules when platform data is insufficient.

3. **Build tax-by-jurisdiction reporting from day one.** For US merchants (multi-state sales tax), EU merchants (VAT across countries), and global sellers, showing tax collected by jurisdiction is critical for compliance. This is completely absent in BeProfit.

4. **Integrate with tax calculation services as a premium feature.** TaxJar and Avalara integrations would allow automatic tax rate verification and compliance reporting. This could be a higher-tier plan feature.

5. **Support both revenue-side and cost-side tax tracking.** Merchants need to track not just the tax they collect from customers, but also VAT/GST paid on purchases (COGS, shipping, supplies). Input VAT recovery is a significant concern for EU merchants.

6. **Build bulk tax editing.** BeProfit's per-order-only editing is a pain point for merchants who discover systematic tax errors. Allow bulk tax corrections with filters (by date range, by region, by product).

7. **Separate tax types in the data model.** Design the data model to distinguish between sales tax, VAT, GST, customs duties, and other tax categories. This enables type-specific reporting even if the initial UI treats them similarly.

8. **Keep the Net Sales approach for profitability metrics.** BeProfit's method of excluding taxes from profit calculations (using Net Sales as the base) is correct for most merchants. Taxes collected are liabilities, not revenue. Maintain this approach.

9. **Add tax compliance indicators.** Show merchants whether their tax setup appears complete — "You're collecting tax in 5 states but have nexus indicators in 12 states" type insights. This adds value beyond pure profit tracking.

10. **Export tax data in filing-friendly formats.** Generate reports that can be used for sales tax returns, VAT returns, or imported into accounting software (QuickBooks, Xero). This bridges the gap between profit analytics and tax compliance.
