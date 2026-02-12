# BeProfit COGS Management (Ongoing)

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/update-product-cost/cogs-beprofit-help-center
  - https://help.runviably.com/beprofit/bulk-update-product-costs/cogs-beprofit-help-center
  - https://help.runviably.com/beprofit/cogs-profile-beprofit-help-center
  - https://help.runviably.com/beprofit/update-product-cost/cogs-using-google-sheets-beprofit-help-center
  - https://help.runviably.com/beprofit/product-cost/cogs-sync-from-shopify-beprofit-help-center
  - https://help.runviably.com/beprofit/beprofit-cogs-managing-method-and-priority
  - https://help.runviably.com/beprofit/product-costs/cogs-beprofit-help-center
  - https://help.runviably.com/beprofit/bulk-update-orders-costs-beprofit-help-center
  - https://help.runviably.com/beprofit/backingdating-various-expenses-in-shopify
  - https://help.runviably.com/beprofit/beprofit-faq (COGS-related entries)
- **Category:** Core Feature / COGS Management
- **Date Captured:** 2026-02-12

---

## Overview: Initial Setup vs Ongoing Management

File 005 documented the initial COGS setup process (6 methods, priority hierarchy, first-time configuration). This file focuses on **ongoing COGS management** — the day-to-day workflows merchants use to keep costs current as prices change, new products are added, suppliers are switched, and vendor invoices arrive.

### Why Ongoing COGS Management Matters
- Product costs change over time (supplier price changes, currency fluctuations, volume discounts)
- New products are continually added to the catalog
- Vendor invoices may arrive days/weeks after orders are placed
- Seasonal cost variations (materials, shipping rates)
- Maintaining accurate COGS is the single most important factor in profit calculation accuracy

---

## Ongoing COGS Update Methods

### Method 1: Individual Product Editing

**Use case:** Updating costs for a single product or specific variants when a supplier changes pricing.

**Process:**
1. Navigate to **Settings → Costs → Product Costs**
2. Search for the product by name, ID, or SKU
3. Use filters: "Only Missing COGS" or "Recently Sold" to narrow the list
4. Click the dropdown arrow next to the product to expand variants
5. Modify the **Cost Per Item** field for specific variants
6. Optionally adjust the **Handling Cost** field per variant
7. Click **Save**
8. **Select the time range** during which the update should take effect
9. Confirm — updates apply to orders within the selected timeframe

**Key behaviors:**
- Variant-level precision — each variant can have its own cost
- Editable fields: `Cost Per Item` and `Handling Cost` per variant
- Effective date control — changes can be applied to a specific date range
- Changes affect future orders (and potentially historical orders within the selected date range)

**Priority in hierarchy:** Level 6 (lowest) — will be overridden by any other method.

### Method 2: CSV Bulk Update

**Use case:** Updating costs for many products at once (quarterly supplier price list updates, new product catalog import).

**Process:**
1. Navigate to **Settings → Costs → Product Costs**
2. Click **Bulk Update** button
3. Click **"Download Now"** to retrieve current products list as CSV
4. Open the CSV — contains all product variants with current costs, row by row
5. Modify the `cogs_price` column for each variant
6. Optionally update the `handling_cost` column
7. Save the CSV file
8. Click **Upload** to sync changes

**CSV constraints:**
- **DO NOT** remove, add, or rename columns — structural changes prevent upload
- Only two editable columns: `cogs_price` and `handling_cost`
- All other columns (product name, variant ID, SKU, etc.) are pre-populated and read-only
- Currency must match shop currency — no currency symbols, only numbers

**Priority in hierarchy:** Level 1 (highest) when done from Orders page; varies by context from Product Costs page.

### Method 3: Google Sheets Auto-Sync

**Use case:** Continuous, automatic COGS updates for businesses that maintain cost data in spreadsheets (shared with suppliers, purchasing teams, or ERP exports).

**Ongoing sync behavior:**
- After initial connection, changes to the Google Sheet **only affect future orders** (not historical)
- The sheet syncs continuously — no manual action needed after initial setup
- New products must be added to the Google Sheet manually
- COGS amounts must be numbers only (no currency symbols), in shop's currency

**Adding new products:**
When new products are added to the catalog, merchants must "update the Google Sheet manually and add the product and its COGS." There is no auto-discovery of new products in the sheet.

**Troubleshooting:**
If entered COGS doesn't appear in orders, check the priority hierarchy — a higher-priority method may be overriding the Google Sheets value.

**Creating a template from existing data:**
1. Click **Bulk Update** → **Download Now** to get all products/variants with current costs
2. Import this file into Google Sheets as your base template
3. Connect the sheet via **Sync with Google Sheets**

**Priority in hierarchy:** Level 5 — overridden by bulk updates, manual edits, integrations, and COGS profiles.

### Method 4: COGS Profiles (Rule-Based)

**Use case:** Setting cost rules that automatically apply to product groups — useful for businesses with consistent cost structures (e.g., all products from Supplier A cost 30% of selling price, or fixed costs by region).

**Profile types:**

| Scope | Description |
|-------|-------------|
| **Worldwide** | One cost rule applies globally |
| **By Shipping Zones** | Different costs per delivery region (NOT manufacturing location) |

| Calculation Method | Description | Best For |
|--------------------|-------------|----------|
| **Fixed production costs** | Constant COGS per unit | Known, stable per-unit costs |
| **Tiered production costs** | Costs vary by order quantity | Volume discount modeling |
| **Price-based production costs** | Percentage of product selling price | Dropshipping, marketplace sellers |

**Profile management:**
- Existing profiles managed via "Active Product Costs Profiles" section
- Click "Manage" to edit existing profiles
- Profiles can apply to all products or specific products
- **Product-specific profiles** take priority over all-products profiles within the same method level

**Priority in hierarchy:** Level 4 (specific products) and Level 4.5 (all products).

### Method 5: Shopify Sync (Automatic)

**Use case:** Leveraging existing COGS data already maintained in Shopify's product catalog.

**Ongoing behavior:**
- Unless COGS is manually updated within BeProfit (or via profile/integration), BeProfit continuously pulls COGS from Shopify
- Any COGS changes in Shopify are reflected in BeProfit automatically
- **Critical warning:** "COGS update on Shopify will update all past orders, and future orders" — changes propagate retroactively across entire order history

**Resynchronization:**
- If manual resync is needed, users must **contact support** — there is no self-service resync button in the UI

**Priority:** Acts as a baseline — overridden by all other BeProfit-specific methods.

### Method 6: CJ Dropshipping Integration

**Use case:** Automated cost sync for dropshippers using CJ Dropshipping as their fulfillment partner.

**Behavior:**
- BeProfit updates COGS at the order level from CJ Dropshipping data
- Taxes derive from the e-commerce platform order, not from CJ
- COGS data isolated per shop — changes to one shop don't affect others

**Priority in hierarchy:** Level 3 — overrides profiles and Google Sheets but overridden by manual/bulk order edits.

---

## COGS Priority Hierarchy (Complete)

When multiple COGS methods are active simultaneously, BeProfit resolves conflicts using this 6-level priority system:

| Priority | Method | Scope | Description |
|----------|--------|-------|-------------|
| **1 (Highest)** | Bulk Update from Orders Page | Order-level | Direct bulk updates on the Orders page override everything |
| **2** | Manual Edit on Orders Page | Order-level | Individual order COGS modifications via three-dot menu |
| **3** | COGS Integration (CJ Dropshipping) | Product-level | Third-party platform integration costs |
| **4** | COGS Profile (Specific Products) | Product-level | Rule-based profiles targeting specific products |
| **4.5** | COGS Profile (All Products) | Product-level | Rule-based profiles applying to all products |
| **5** | Google Sheets Sync | Product-level | Spreadsheet-based continuous sync |
| **6 (Lowest)** | Product Cost Page Manual Update | Product-level | Direct manual entry via Settings page |

**Key principle:** "The system applies the most specific and immediate COGS data available." Order-level overrides always win over product-level settings.

**Shopify Sync baseline:** Shopify sync acts as the baseline that's active when no other method has been configured. Any BeProfit-specific method overrides it.

---

## COGS History & Versioning

### Effective Date Support
- When updating COGS via individual product editing, users can **select the time range** for the update
- This provides basic versioning: "cost was $5 from Jan 1 - Mar 31, then $6 from Apr 1 onwards"

### Retroactive Updates

| Method | Retroactive? | Scope |
|--------|-------------|-------|
| Individual product edit | Configurable — select date range | Applies to orders within selected range |
| CSV Bulk Upload | Not documented — likely future orders only | Product-level |
| Google Sheets (initial) | Yes — first connection updates ALL past and future orders | Product-level |
| Google Sheets (subsequent) | No — only future orders | Product-level |
| Shopify sync changes | Yes — updates ALL past and future orders | Product-level |
| Backdating expenses | Yes — can select specific date range | General expenses |

### Backdating Expenses
BeProfit supports backdating various expense types by "syncing your expenses and selecting a specific date range" to "apply updates retroactively." This ensures "both past and future orders reflect the correct costs."

### Limitations of COGS Versioning
- **No explicit COGS version history.** There is no documented feature to view a timeline of cost changes for a product (e.g., "cost was $5 in Q1, changed to $6 in Q2, changed to $5.50 in Q3")
- **No audit trail for COGS changes.** Who changed the cost, when, and from what value is not tracked in the UI
- **Retroactive Shopify sync is dangerous.** Changing COGS in Shopify retroactively updates ALL past orders, which can dramatically change historical profit calculations without warning
- **Google Sheets first-time sync is irreversible.** The initial sync retroactively updates all past orders — subsequent syncs do not, creating an inconsistent behavior pattern

---

## Variant-Level COGS Support

### Capabilities
- Each product variant can have its own individual COGS value
- Both `Cost Per Item` and `Handling Cost` are variant-level fields
- The CSV Bulk Update file shows "all product variants and their costs row-by-row"
- Google Sheets sync supports variant-level mapping via SKU column

### Variant Identification
- Products are identified by **name, ID, or SKU** in the search/filter interface
- CSV files contain variant-level rows with identifiers
- Google Sheets mapping uses the SKU column for variant-level matching

### Limitations
- No documented support for variant-level COGS profiles (profiles seem to apply at the product level, not variant level)
- Handling cost is per-variant but it's unclear how it interacts with fulfillment profiles

---

## COGS Auto-Sync from Suppliers

### Available Auto-Sync Options

| Supplier/Source | Sync Type | Frequency | Retroactive? |
|----------------|-----------|-----------|--------------|
| **Shopify** | Automatic (continuous) | Real-time (on cost change) | Yes — all past + future orders |
| **Google Sheets** | Automatic (continuous after setup) | On sheet change | Initial: yes. Subsequent: no |
| **CJ Dropshipping** | Automatic (per order) | Order-level | Per-order only |

### Not Available
- No auto-sync from other suppliers (AliExpress, Printful, etc.)
- No ERP integration (SAP, NetSuite, etc.) beyond FTP (which is separate from COGS)
- No direct API-based COGS sync for custom suppliers
- No warehouse management system (WMS) integration for landed cost updates

---

## Common Ongoing COGS Workflows

### Workflow 1: Quarterly Supplier Price Update
1. Receive new price list from supplier (CSV/spreadsheet)
2. Download current COGS via Bulk Update → Download Now
3. Match supplier prices to product variants
4. Update `cogs_price` column in CSV
5. Upload updated CSV via Bulk Update → Upload
6. Verify a few products to ensure accuracy

### Workflow 2: New Product Launch
1. Add product to Shopify (COGS field optional in Shopify)
2. If Shopify COGS set → BeProfit auto-syncs (but lowest priority)
3. For accurate cost: manually update in Settings → Product Costs
4. Or: add to Google Sheet if sheet sync is connected
5. Or: create/update COGS Profile if rule-based pricing applies

### Workflow 3: Correcting Costs After Vendor Invoice
1. Receive actual vendor invoice (may differ from estimated COGS)
2. Navigate to Orders page
3. Use Bulk Update (Orders) → download template → update costs → upload
4. Or: edit individual orders via three-dot menu for small corrections
5. This has highest priority (Level 1-2) and overrides all product-level settings

### Workflow 4: Monitoring Missing COGS
1. Navigate to Settings → Costs → Product Costs
2. Filter by "Only Missing COGS" to find products without costs
3. Also filter by "Recently Sold" to prioritize high-impact products
4. Set costs for missing products to improve profit accuracy

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Product Costs table | Data table | Settings → Costs → Product Costs | List of all products with cost columns |
| Search box | Text input | Product Costs table | Search by name, ID, or SKU |
| "Only Missing COGS" filter | Checkbox filter | Product Costs table | Shows products without COGS assigned |
| "Recently Sold" filter | Checkbox filter | Product Costs table | Prioritizes actively selling products |
| Dropdown arrow | Expand/collapse | Product row | Reveals variant-level cost fields |
| Cost Per Item field | Number input | Variant row | Editable COGS per variant |
| Handling Cost field | Number input | Variant row | Editable handling cost per variant |
| Save button | CTA button | Product Costs page | Saves all changes |
| Time range selector | Date picker | Save confirmation | When changes should take effect |
| Bulk Update button | Action button | Product Costs table | Opens CSV download/upload workflow |
| Download Now button | Action button | Bulk Update modal | Downloads CSV template |
| Upload button | Action button | Bulk Update modal | Uploads modified CSV |
| Sync with Google Sheets button | Action button | Product Costs table | Opens Google Sheets connection flow |
| Create COGS Profile button | Action button | Product Costs table | Opens profile creation wizard |
| Active Product Costs Profiles | Section | Product Costs settings | Lists existing profiles with "Manage" links |
| Manage link | Text link | Profile row | Opens profile editing |

---

## Data Model Implications

### COGS Data Architecture
1. **Multi-source cost resolution:** The system needs a priority-based resolver that evaluates 6+ cost sources and picks the highest-priority value for each product/variant.

2. **Variant-level granularity:** COGS must be stored at the variant level, not just the product level. Each variant has independent `cost_per_item` and `handling_cost` fields.

3. **Temporal cost data:** Support for effective date ranges on COGS changes. A product can have different costs in different time periods. Orders should use the cost that was effective at the time of order placement.

4. **Source tracking:** Each COGS value should track its source method (manual, bulk upload, Google Sheets, Shopify sync, CJ integration, profile) for priority resolution and auditability.

5. **Two cost scopes:** Product-level costs (settings-based) and order-level costs (override-based) must coexist, with order-level always taking precedence.

6. **External sync state:** Google Sheets and Shopify sync connections need status tracking (connected, last synced, errors, first-time vs subsequent).

### Key Entities
- **ProductVariant** → has `cost_per_item`, `handling_cost`, `cogs_source`, `effective_date_start`, `effective_date_end`
- **COGSProfile** → has scope (worldwide/zones), calculation method (fixed/tiered/price-based), product scope (all/specific), zone definitions
- **ExternalSync** → type (Google Sheets/Shopify/CJ), status, last_sync, first_sync_completed flag
- **OrderCostOverride** → order-level COGS override with source (bulk update/manual edit)

---

## Limitations & Gaps

1. **No COGS version history UI.** There's no way to view a timeline of cost changes for a product. Users can't answer "what was the cost of Product X in March?" without checking raw data.

2. **No audit trail.** Who changed COGS, when, and from what value — none of this is tracked or visible in the UI.

3. **Shopify retroactive sync is risky.** A single COGS change in Shopify retroactively rewrites all past order costs. This is a dangerous default with no undo capability.

4. **No self-service resync for Shopify.** If Shopify sync gets out of sync, users must contact support. No refresh button available.

5. **Google Sheets first-sync asymmetry.** First connection retroactively updates all history; subsequent changes don't. This inconsistency is confusing and not well-documented.

6. **New product auto-discovery gap.** Google Sheets sync doesn't auto-discover new products. Merchants must manually add them to the sheet — easy to forget.

7. **No import from common sources.** No direct import from AliExpress, Printful, Amazon FBA, or other common DTC supply chain platforms beyond CJ Dropshipping.

8. **COGS Profile variant limitation.** It's unclear whether COGS Profiles support variant-level rules or only product-level application.

9. **Handling cost vs fulfillment overlap.** The `handling_cost` field in COGS and the separate Fulfillment cost system have overlapping scope. How they interact (additive? exclusive?) is not documented.

10. **No cost validation or anomaly detection.** There's no system to flag when entered COGS is suspiciously high or low compared to the product's selling price (e.g., COGS > selling price should trigger a warning).

---

## Relevance to Our Build

### Key Takeaways

1. **Build COGS version history from day one.** Store every COGS change with timestamp, old value, new value, source method, and user who made the change. Display this as a timeline for each product. This is a significant gap in BeProfit.

2. **Implement smart cost validation.** Flag products where COGS > selling price, COGS = 0 but product has orders, or COGS changed by >50% (potential error). Show a "data quality" indicator on the Product Costs page.

3. **Auto-discover new products for Google Sheets sync.** When new products are added to the catalog, automatically add them to the connected Google Sheet (or at least flag them as unmatched).

4. **Make Shopify sync behavior configurable.** Give users the choice: "Sync all past orders" vs "Only sync future orders" when Shopify COGS changes. The current retroactive-everything behavior is too aggressive.

5. **Support more supplier integrations.** Beyond CJ Dropshipping, build connections to AliExpress, Printful, Printify, ShipBob, and other common DTC supply chain platforms for automatic COGS sync.

6. **Simplify the priority hierarchy.** BeProfit's 6-level hierarchy is powerful but confusing. Consider a simpler model: per-order overrides (always win) > product-level settings (latest update wins) > rules/profiles > platform sync (baseline).

7. **Build bulk update with preview and validation.** Before applying a CSV upload, show a diff view: "These 47 products will have COGS updated. 3 products have COGS > selling price (potential errors). Review before applying."

8. **Separate handling cost from COGS.** The overlap between `handling_cost` in COGS and fulfillment cost profiles creates confusion. Make handling cost a clear sub-component of fulfillment, not COGS.

9. **Implement "Missing COGS impact" calculator.** Instead of just filtering for missing COGS, show: "23 products missing COGS, representing $12,450 in revenue this month. Your reported profit may be inflated by up to $X."

10. **Build cost change propagation controls.** When costs change, let merchants choose: apply to future orders only, apply to orders from [date], or apply to all orders. Make the scope explicit and controllable rather than inconsistent across methods.
