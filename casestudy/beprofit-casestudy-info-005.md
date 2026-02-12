# BeProfit COGS (Cost of Goods Sold) Initial Setup

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/product-costs/cogs-beprofit-help-center
  - https://help.runviably.com/beprofit/update-product-cost/cogs-beprofit-help-center
  - https://help.runviably.com/beprofit/cogs-profile-beprofit-help-center
  - https://help.runviably.com/beprofit/update-product-cost/cogs-using-google-sheets-beprofit-help-center
  - https://help.runviably.com/beprofit/bulk-update-product-costs/cogs-beprofit-help-center
  - https://help.runviably.com/beprofit/product-cost/cogs-sync-from-shopify-beprofit-help-center
  - https://help.runviably.com/beprofit/integrate-with-cj-dropshipping-beprofit-help-center
  - https://help.runviably.com/beprofit/beprofit-cogs-managing-method-and-priority
  - https://help.runviably.com/beprofit/how-can-i-exclude-cogs-from
  - https://help.runviably.com/beprofit/predicted-costs-beprofit-help-center
  - https://help.runviably.com/beprofit/beprofit-faq (COGS-related FAQ entries)
- **Category:** COGS / Cost Management
- **Date Captured:** 2026-02-12

---

## COGS Overview

"Product cost represents the comprehensive expenses associated with producing a specific item." BeProfit defines COGS as the cost assigned to each order for profit calculation purposes. Maintaining accurate COGS ensures proper profit reporting and helps identify which products warrant pricing adjustments.

BeProfit provides **6 methods** for updating COGS, each with different use cases and a defined priority hierarchy when multiple methods are used simultaneously.

---

## COGS Setup Methods

### Method 1: Manual Entry (Per Product/Variant)

**What it is:** Direct cost input for individual products and their variants via the Settings interface.

**Step-by-step process:**
1. Navigate to **Settings → Costs → Product Costs**
2. Locate the Product Costs table
3. Use search to find products by name, ID, or SKU
4. Apply filters: "Only Missing COGS" or "Recently Sold" options available
5. Click the dropdown arrow next to the target product
6. Modify the **Cost Per Item** field for specific variant(s)
7. Optionally adjust the **Handling Cost** field for variant(s)
8. Click **Save** at the bottom of the page
9. Specify the effective date range for the changes
10. Confirm — updates apply to future orders only

**Key features:**
- Variant-level precision — set costs individually for each product variant
- Flexible filtering — filter by product attributes or sales status
- Prospective application — changes affect future orders, not past

**Priority level:** 6 (lowest) — overridden by all other methods.

---

### Method 2: CSV Bulk Upload

**What it is:** Mass cost update via downloadable CSV file that can be edited offline and re-uploaded.

**Step-by-step process:**
1. Navigate to **Settings → Costs → Product Costs**
2. Click the **Bulk Update** button in the Product Costs table
3. Click **Download Now** to retrieve the products list in CSV format
4. Open the downloaded file — contains all product variants and their costs organized by row
5. Modify the **cogs_price** column for each variant as needed
6. Optionally update the **handling_cost** column per variant
7. Save the file
8. Click **Upload** to import the updated data

**CSV Template Format:**

| Column | Required | Format | Description |
|--------|----------|--------|-------------|
| (Product/variant identifiers) | Yes | Auto-generated | Product names, IDs, SKUs — pre-populated in download |
| cogs_price | Yes (editable) | Numeric | Cost of goods for the variant |
| handling_cost | Optional (editable) | Numeric | Handling cost per variant |

**Critical warning:** "Do not remove, add, or rename columns in the CSV file." Structural changes prevent successful upload.

**Priority level:** Part of "Bulk Update from Orders Page" (level 1) or "Product Cost Page Manual Update" (level 6), depending on context.

---

### Method 3: Google Sheets Sync (Auto-Sync)

**What it is:** Continuous automatic COGS synchronization via a connected Google Sheet. Once linked, changes to the sheet auto-update BeProfit.

**Step-by-step process:**
1. Navigate to **Settings → Costs → Product Costs**
2. In the Product Costs table, click **Sync with Google Sheets**
3. Click **Connect with Google** in the popup
4. Authorize permissions by clicking **Allow**
5. Confirm the correct account and click **Link Sheet** (template available)
6. Match the columns in your sheet that contain the **SKU** and **COGS** values
7. Click **Done**, then **Close**
8. Review error listings if sync issues occur; correct in Google Sheets and click **Resync**

**Sync behavior:**
- **Initial sync:** Updates BOTH past and future orders retroactively
- **Subsequent changes:** Only affect future orders
- **Automatic updates:** Continuous syncing after initial connection

**Requirements:**
- COGS amounts must be in the same currency as the shop — "no currency, only numbers"
- SKU column must match product SKUs in BeProfit
- Template available during setup

**Priority level:** 5 — overridden by profiles, integrations, and manual order-level edits.

---

### Method 4: COGS Profile (Rule-Based)

**What it is:** A predefined set of rules that automatically assigns COGS to products based on criteria like geography, product selection, or pricing.

**Step-by-step process:**
1. Navigate to **Settings → Costs → Product Costs**
2. Scroll to the Product Costs table and click **Create COGS Profile**
3. Choose scope: **worldwide** or **by shipping zones**
   - Note: Zones should be based on delivery destinations, not manufacturing locations
4. Click **Next**
5. Enter a **profile name** and specify whether it applies to **all products** or **specific products**
6. If selecting specific products, choose them and proceed
7. Select a cost calculation method:
   - **Fixed production costs** — consistent COGS amount per unit
   - **Tiered production costs** — costs vary based on order item quantity (volume discount modeling)
   - **Price-based production costs** — calculated as a percentage of total product price
8. For shipping zone-based profiles: define each zone's geographic scope, then select the cost calculation method per zone
9. Repeat for additional zones as needed
10. Save the profile

**Editing existing profiles:**
- Navigate to Settings → Costs → Product Costs
- Find the profile in the "Active Product Costs Profiles" section
- Click **Manage**

**Priority levels:**
- Specific product profiles: 4a (higher)
- All products profiles: 4b (lower)

---

### Method 5: Shopify COGS Auto-Sync

**What it is:** Automatic COGS synchronization from Shopify's native "Cost per item" field. This is the default method for Shopify stores.

**How it works:**
- **Initial sync:** When BeProfit is first installed, it "automatically retrieves the COGS data for each product and variant" from Shopify
- **Ongoing sync:** "Any subsequent changes made to the COGS in Shopify will be reflected in BeProfit"
- **Priority:** Unless costs are manually updated within BeProfit, via a COGS profile, or via third-party integration, the system continuously fetches from Shopify
- **Retroactive impact:** "COGS update on Shopify will update all past orders, and future orders"

**Manual re-sync:**
- If re-synchronization of Shopify COGS data is required, users must contact customer support — no self-service re-sync option

**Priority level:** Implicit — active by default for Shopify stores but overridden by all other explicit methods.

---

### Method 6: CJ Dropshipping Integration

**What it is:** Direct integration with CJ Dropshipping to automatically sync supplier costs as COGS.

**Step-by-step process:**
1. Navigate to **Settings → Shop → Production Methods**
2. Select **"I dropship my products"** option
3. Choose **"CJ Dropshipping"** from available options
4. Click **Save**
5. Go to **Settings → Costs → Product Costs**
6. Click **Connect to CJ Dropshipping**

**Data synced:**
- COGS appears on an order level in the Orders page after integration is configured
- "BeProfit updates the COGS on an order level based on CJ Dropshipping data" (per FAQ)

**Priority level:** 3 — overridden by manual order edits and bulk updates, but overrides profiles and Google Sheets.

---

## COGS Priority Hierarchy (Descending)

When multiple COGS methods are active simultaneously, BeProfit applies this priority:

| Priority | Method | Scope |
|----------|--------|-------|
| 1 (Highest) | Bulk Update from Orders Page | Order-level |
| 2 | Manual Edit on Orders Page | Order-level |
| 3 | COGS Integration (CJ Dropshipping) | Product/order-level |
| 4a | COGS Profile — Specific products selected | Product-level |
| 4b | COGS Profile — All products selected | Product-level |
| 5 | Google Sheets Sync | Product-level |
| 6 (Lowest) | Product Cost Page Manual Update | Product-level |

**Key principle:** "When multiple methods are employed, the system applies the most specific and immediate COGS data available, maintaining accurate financial records."

**Shopify auto-sync** is not explicitly listed in the priority hierarchy but appears to be the implicit baseline for Shopify stores — active by default and overridden by any explicit COGS method.

---

## Per-Product vs Bulk Cost Assignment

| Approach | Method(s) | Use Case |
|----------|-----------|----------|
| Per-variant (granular) | Manual entry, Shopify sync | When each variant has a unique cost |
| Per-product (all variants same cost) | COGS Profile (fixed), CJ Dropshipping | When all variants of a product share the same cost |
| Bulk (all products) | CSV Bulk Upload, Google Sheets | Mass updates across entire catalog |
| Rule-based (automated) | COGS Profile (tiered/price-based) | When costs follow patterns (volume discounts, % of price) |
| Per-order override | Manual/Bulk edit on Orders page | Correcting costs for specific orders after the fact |

---

## Default Values & Missing Data

### What Happens When Cost Data Is Missing

The documentation does not explicitly state a default COGS value. Based on the FAQ and behavior inferences:

- **Missing COGS:** Products without assigned costs likely show $0 COGS, resulting in artificially inflated profit numbers
- **Filter for missing:** The Product Costs table has an **"Only Missing COGS"** filter to identify products without cost data
- **No automatic placeholder:** BeProfit does not auto-estimate COGS — it must be explicitly set via one of the 6 methods
- **Shopify stores:** May have partial COGS if only some products have the "Cost per item" field filled in Shopify

### Predicted Costs Feature (for Returns and Amazon Fees)

BeProfit offers a "Predicted Costs" feature that estimates costs before they are officially recorded:

**Predicted Returns:**
- Estimates refund costs before actual returns occur
- Returns typically happen 1-4 weeks post-purchase
- Prevents profit inflation from unrealized returns
- Setup: Settings → Costs → Returns Setting and Predictions
  1. Enable "Count refunds by order date"
  2. Define return window duration based on shop policy
  3. Assign predicted cost percentages for each day
  4. Save
- "Once actual refund data becomes available, the Predicted Cost will seamlessly replace the estimated percentages with real values"
- Available to all users

**Predicted Amazon Fees:**
- Anticipates Amazon fees before official reporting (2-3 weeks delay)
- Setup: Settings → Costs → Calculation Preferences
  1. Locate Amazon Fees Preferences section
  2. Enable "Count fees by order date"
  3. Input a percentage for predicted fees
  4. Save

---

## Cost Types Tracked in COGS Context

| Cost Type | Where Configured | Notes |
|-----------|-----------------|-------|
| Product cost (COGS) | Settings → Costs → Product Costs | Primary cost per item |
| Handling cost | Settings → Costs → Product Costs | Per-variant, alongside COGS |
| Predicted returns | Settings → Costs → Returns Setting and Predictions | Percentage-based estimate |
| Predicted Amazon fees | Settings → Costs → Calculation Preferences | Percentage-based estimate |

**Note:** Shipping costs, processing fees, and operational expenses are tracked separately and are NOT part of the COGS system. They are configured in their respective Settings sections and factored into profit calculations independently.

---

## COGS and Refunded Orders

BeProfit offers the option to exclude COGS from fully refunded orders:

**Setup:**
1. Navigate to **Settings → Costs → Calculation Preferences**
2. Find the **Refund Preferences** section
3. Toggle on: **"Exclude COGS from all fully refunded orders"**

**Limitation:** This applies exclusively to fully refunded orders. "Partial refunded orders do not apply" — partially refunded orders retain their COGS in calculations.

---

## COGS Per Shop (Multi-Store)

Per the FAQ: "Each shop has its own unique settings. So...changes to the COGS on one shop...won't affect the settings of the other shops." This means:

- COGS configuration is shop-specific
- Multi-store users must configure COGS separately for each connected store
- No cross-shop COGS inheritance or templates

---

## Configuration Options & Defaults

| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| COGS entry method | Shopify auto-sync (for Shopify stores) | 6 methods (see above) | Multiple methods can be active simultaneously |
| Missing COGS value | $0 (implied) | Must be explicitly set | No auto-estimation |
| COGS update direction | Future orders only (manual) | Past + future (initial Google Sheets, Shopify sync) | Depends on method |
| Handling cost | $0 (implied) | Per-variant numeric value | Optional field alongside COGS |
| COGS profile scope | N/A | Worldwide, by shipping zone | Zone = delivery destination, not manufacturing |
| COGS profile calculation | N/A | Fixed, tiered (quantity-based), price-based (% of price) | Three calculation methods |
| Exclude COGS from full refunds | Off (implied) | Toggle on/off | Settings → Costs → Calculation Preferences |
| Predicted returns | Off | Enable + set window + percentages | Auto-replaces with actual data |
| Predicted Amazon fees | Off | Enable + set percentage | Auto-replaces with actual data |
| CSV column structure | Pre-populated template | Cannot modify columns | Download, edit cogs_price/handling_cost, re-upload |
| Google Sheets currency | Must match shop currency | Numbers only (no currency symbols) | SKU + COGS columns required |

---

## Limitations & Caveats

1. **No automatic COGS estimation:** BeProfit does not auto-estimate or suggest COGS values. Products without explicit costs show no cost data, inflating apparent profit.
2. **Google Sheets subsequent updates are forward-only:** "The first time the Google sheet is connected...it will update past and future orders. Any future change will only update future orders."
3. **Shopify COGS updates are retroactive:** "COGS update on Shopify will update all past orders, and future orders" — this can unexpectedly change historical profit data.
4. **No self-service Shopify re-sync:** If Shopify COGS data needs re-syncing, users must contact support.
5. **CSV structure is rigid:** Cannot add, remove, or rename columns in the bulk upload CSV. Only cogs_price and handling_cost are editable.
6. **COGS per shop only:** Multi-store users must configure COGS separately for each store. No templates or cross-shop copying.
7. **Partial refund COGS not excludable:** Only fully refunded orders can have COGS excluded. Partial refunds always retain COGS.
8. **COGS profile zones are delivery-based:** Zones should be based on delivery destinations, not manufacturing locations — potentially confusing for users thinking about sourcing geography.
9. **Priority hierarchy can be confusing:** With 6 methods and a priority stack, users may not understand why a specific cost is being applied. The hierarchy documentation exists but requires careful reading.
10. **CJ Dropshipping is the only supplier integration:** No direct integration with AliExpress, Alibaba, Zendrop, or other common dropshipping suppliers.
11. **Custom metrics for cost analysis require Plus plan:** Custom metrics creation is reserved for Plus plan members and created by the BeProfit team.

---

## Plan/Tier Feature Gating

| Feature | All Plans | Plus Only |
|---------|-----------|-----------|
| Manual COGS entry | Yes | Yes |
| CSV Bulk Upload | Yes | Yes |
| Google Sheets Sync | Yes | Yes |
| COGS Profiles | Yes | Yes |
| Shopify COGS Auto-Sync | Yes (Shopify stores) | Yes |
| CJ Dropshipping Integration | Yes | Yes |
| Custom Metrics for cost analysis | No | Yes (created by BeProfit team) |
| Predicted Returns | Yes | Yes |
| Predicted Amazon Fees | Yes | Yes |

**Note:** COGS setup methods themselves do not appear to be plan-gated. All methods are available on all plans. The Plus plan adds custom metrics creation for advanced cost analysis.

---

## Related Articles

- Product Costs/COGS — https://help.runviably.com/beprofit/product-costs/cogs-beprofit-help-center
- Update Product Cost/COGS — https://help.runviably.com/beprofit/update-product-cost/cogs-beprofit-help-center
- COGS Profile — https://help.runviably.com/beprofit/cogs-profile-beprofit-help-center
- Update Product Cost/COGS using Google Sheets — https://help.runviably.com/beprofit/update-product-cost/cogs-using-google-sheets-beprofit-help-center
- Bulk Update Product Costs/COGS — https://help.runviably.com/beprofit/bulk-update-product-costs/cogs-beprofit-help-center
- Product Cost/COGS sync from Shopify — https://help.runviably.com/beprofit/product-cost/cogs-sync-from-shopify-beprofit-help-center
- Integrate with CJ Dropshipping — https://help.runviably.com/beprofit/integrate-with-cj-dropshipping-beprofit-help-center
- BeProfit COGS Managing Method and Priority — https://help.runviably.com/beprofit/beprofit-cogs-managing-method-and-priority
- Bulk Update Orders Costs — https://help.runviably.com/beprofit/bulk-update-orders-costs-beprofit-help-center
- Predicted Costs — https://help.runviably.com/beprofit/predicted-costs-beprofit-help-center

---

## Relevance to Our Build

### COGS Design Takeaways

1. **6 methods is comprehensive but complex:** BeProfit's 6 COGS methods (manual, CSV, Google Sheets, profiles, Shopify sync, CJ Dropshipping) cover most use cases but create a confusing priority hierarchy. We should support multiple methods but design clearer UX for understanding which method is active and why a specific cost is applied. Consider showing a "cost source" indicator on each product.

2. **Priority hierarchy is a necessary evil:** When multiple cost sources exist, a priority system is required. BeProfit's 6-level hierarchy is well-thought-out (most specific wins), but poorly surfaced in the UI. We should display the active cost source and priority clearly, possibly with a "COGS audit trail" showing which method set each product's cost.

3. **Google Sheets as a cost management tool:** The Google Sheets integration is clever — it allows finance teams to manage costs in their preferred tool (spreadsheets) while auto-syncing to the profit dashboard. We should support this pattern and potentially extend it to Excel/CSV auto-sync as well.

4. **COGS Profiles for rule-based pricing:** The profile concept (fixed, tiered, price-based) handles common pricing structures elegantly. Tiered pricing for volume discounts and percentage-of-price for markup-based businesses are particularly useful. We should implement similar functionality.

5. **Predicted costs for proactive P&L:** The predicted returns and predicted Amazon fees features are sophisticated — they estimate costs before actual data arrives and auto-replace with real values. This keeps the P&L statement meaningful even when data is delayed. We should implement similar prediction logic.

6. **Missing COGS is the biggest accuracy risk:** Products without costs silently inflate profits. The "Only Missing COGS" filter is helpful but reactive. We should proactively warn users about uncounted products with an in-dashboard alert or onboarding step that doesn't let users proceed until critical products have costs assigned.

7. **Shopify retroactive COGS is dangerous:** Changing costs in Shopify updates ALL historical orders, which can dramatically alter past profit reports without warning. We should consider whether to replicate this behavior or offer a "freeze historical costs" option.

8. **No supplier marketplace beyond CJ Dropshipping:** Only CJ Dropshipping is directly integrated for COGS. Supporting AliExpress, Zendrop, Spocket, and other dropshipping suppliers would be a differentiator, especially for the growing dropshipping market.

9. **Handling cost as a separate field:** BeProfit tracks handling cost separately from product cost, which is useful for businesses that have per-item handling fees. We should support this separation.

10. **CSV rigidity is a pain point:** Not being able to modify CSV columns is unnecessarily restrictive. Our CSV import should be more flexible — allowing column mapping during upload rather than requiring an exact template match.
