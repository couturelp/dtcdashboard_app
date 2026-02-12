# BeProfit Multi-Store & Multi-Currency Support Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/connecting-navigating-multiple-shops-and-platforms-in-beprofit-beprofit-help-center (Connecting & Navigating Multiple Shops and Platforms)
  - https://help.runviably.com/beprofit/multi-currencies-beprofit-help-center (Multi-currencies)
  - https://help.runviably.com/beprofit/manage-multi-shops-in-one-or-few-workspaces-beprofit-help-center (Manage Multi shops in one or few Workspaces)
  - https://help.runviably.com/beprofit/what-are-sales-channels (What are Sales Channels? — General)
  - https://help.runviably.com/beprofit/change-store-name-in-beprofit (Change store name — General)
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — multi-store and currency entries)
- **Category:** Core Feature / Multi-Store & Multi-Currency
- **Date Captured:** 2026-02-12
- **Cross-references:**
  - File 004 (beprofit-casestudy-info-004.md) — Store Connection & Data Sync (initial platform connection)
  - File 008 (beprofit-casestudy-info-008.md) — Other Onboarding Configurations (currency settings)
  - File 011 (beprofit-casestudy-info-011.md) — Dashboard (store selector in top nav)
  - Real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — Settings → Workspace tab

---

## Multi-Store Management Overview

BeProfit supports managing multiple e-commerce stores from a single account through a **Workspace** abstraction layer. The workspace is the top-level container that holds one or more shops, team members, and a base currency. This architecture enables merchants who operate multiple stores across different platforms to consolidate their profit tracking in one place.

### Supported E-Commerce Platforms
Based on the Settings → Workspace page (confirmed from real dashboard inventory):

| Platform | Logo | Multi-Store? | Notes |
|----------|------|-------------|-------|
| **Shopify** | Green Shopify bag | Yes | Primary platform, deepest integration |
| **Amazon** | Amazon smile arrow | Yes | Fee delays of 2-3 weeks |
| **WooCommerce** | Purple "Woo" logo | Yes | Third-party currency plugins NOT supported |
| **Wix** | "WiX" logo | Yes | Minimal documentation |

Each platform supports multiple shops — the "+ Add Shop" button is present for all platforms, including those that already have connected shops.

---

## Store Connection Flow

### Adding a New Store
1. Navigate to **Settings → Workspace**
2. In the **Shops** section, locate the platform row (Shopify, Amazon, WooCommerce, Wix)
3. Click **"+ Add Shop"** link next to the desired platform
4. Follow platform-specific authentication/connection flow:
   - **Shopify:** OAuth flow via Shopify App Store
   - **Amazon:** Amazon seller account authentication
   - **WooCommerce:** API key/secret configuration
   - **Wix:** Wix account authentication
5. Once connected, the new shop appears in the platform row with an expandable chevron (>) to show shop details

### Cross-Platform Stores
A single workspace can contain stores from **different platforms simultaneously**. For example:
- 1 Shopify store + 1 Amazon store + 1 WooCommerce store = all in one workspace
- Each store maintains its own independent settings (COGS, fulfillment profiles, calculation preferences)

---

## Store Navigation / Switching

### Store Selector UI
The store selector is located in **two places**:
1. **Top navigation bar:** Dropdown showing current store name (e.g., "Sonic Soak") with a down chevron
2. **Left sidebar:** Store name with "S" avatar and dropdown chevron at the top

### Switching Between Stores
From the store selector dropdown:
- **Individual store view:** Hover over a shop name and click the arrow to access that specific store's dashboard
- **Multi-store aggregate view:** Select checkboxes next to multiple shop names to combine performance metrics across stores

### Key Behavior
- Each store has its own independent dashboard view with store-specific data
- When viewing a single store, all metrics, charts, and reports reflect that store only
- When viewing aggregate, data from selected stores is combined

---

## Workspace Architecture

### What is a Workspace?
A workspace is the **top-level organizational unit** in BeProfit. It serves as a collaboration hub that contains:
- One or more connected shops
- Team members with assigned permissions
- A workspace-level base currency
- A workspace name

### Workspace Configuration
Accessible at **Settings → Workspace**, the workspace info card displays:

| Field | Example Value | Editable? |
|-------|---------------|-----------|
| Workspace name | "Sonic Soak Workspace" | Yes — pencil/edit icon |
| Subscribed Shops | 1 | Display only |
| Teammates | 1 | Display only |
| Currency | USD | Yes — edit icon |

### Workspace vs Store Relationship

**Architecture: One-to-Many (1:N)**
- One workspace contains many shops
- Each shop belongs to exactly one workspace
- Shops can be from different e-commerce platforms

**Settings Isolation:**
Each shop has its own unique settings. Changes to COGS, fulfillment profiles, calculation preferences, or other settings on one shop do **not** affect other shops in the same workspace. From the FAQ:

> "Each shop has its own unique settings. So, if you happen to make any changes to the COGS on one shop, it won't affect the settings of the other shops in your workspace."

**Workspace Merging:**
To combine workspaces (e.g., merging two separate accounts), users must contact **support@beprofit.co**. This is not a self-service operation — you must provide:
- All relevant shop information
- The destination workspace
- BeProfit support handles the migration

---

## Cross-Store Reporting & Aggregation

### Aggregate Dashboard View
When multiple stores are selected in the store selector:
- **KPI cards** show combined metrics across all selected stores
- **Charts** aggregate data from all selected stores
- **Currency conversion** is applied automatically (see Multi-Currency section below)

### Limitations of Aggregation
- The documentation does not describe **cross-store P&L reports** — it's unclear whether a consolidated P&L across multiple stores is available
- **Compare Shops** view exists (referenced in Calculation Preferences affected pages) — this suggests a side-by-side comparison mode rather than just aggregation
- Individual store breakdowns within the aggregate view are not well documented

### Sales Channels vs Stores
BeProfit distinguishes between **sales channels** and **stores**:

**Sales Channels:**
> "Sales Channels are used to identify the source of an order. They represent the various platforms where merchants can sell their products, including their online store, social media, marketplaces, or through third-party integrations."

- Sales channel data comes from **Shopify's configuration** (or equivalent platform settings)
- A single Shopify store can have multiple sales channels (Online Store, POS, Facebook Shop, Instagram, Google, Buy Button, etc.)
- Sales channels identify WHERE an order was placed, while stores identify WHICH store fulfilled it

**Stores (Shops):**
- A store is a connected e-commerce account (one Shopify store, one Amazon seller account, etc.)
- Multiple stores can exist in one workspace
- Each store may have its own sales channels

### Calculation Preferences & Multi-Store
From file 014, Calculation Preferences affect these multi-store-relevant pages:
- **Compare Shops** — side-by-side store comparison
- **Compare Countries** — cross-store geographic analysis
- **Compare Channels** — cross-store channel analysis

These confirm that multi-store comparison features exist but their exact UI and capabilities are not well documented in the Help Center.

---

## Multi-Currency Support

### Currency Architecture

BeProfit uses a **hierarchical currency system**:

| Level | Currency Setting | Controlled By |
|-------|-----------------|---------------|
| **Shop** | Shop's native currency (from platform) | E-commerce platform settings (e.g., Shopify Admin → General → Currency) |
| **Workspace** | Workspace base currency | Settings → Workspace → Currency field |
| **Display** | Viewing currency | User selection in multi-store views |

### Currency Detection & Configuration

**Shop Currency:**
- Automatically detected from the connected e-commerce platform
- For Shopify: Pulled from Shopify Admin settings
- For WooCommerce: Must be set in WooCommerce → Settings → General → Currency Options
- **Critical limitation:** BeProfit does NOT support third-party WooCommerce currency plugins (e.g., Multi Currency for WooCommerce). The currency is determined by WooCommerce core settings only.

**Workspace Currency:**
- Set manually in Settings → Workspace
- Used as the base currency for aggregated multi-store views
- Default appears to be USD based on documentation examples

### Currency Conversion Methodology

**Automatic Conversion:**
BeProfit "automatically converts all data into USD" (or the workspace currency) when currencies don't match across stores. This applies to:
- Multi-store aggregate dashboard views
- Ad spend from marketing platforms (converted to shop's currency)
- Custom expenses and revenue added in non-shop currencies

**Conversion Details:**
- Users can add expenses and revenue in **any currency** — the system converts automatically
- Ad spend is converted from the ad platform's currency to the shop's currency
- Users can hover over marketing figures to see the **original currency amount**

**Exchange Rate Source:**
The Help Center does **not** document:
- Where exchange rates come from (API source)
- Whether rates are real-time, daily snapshots, or at time of transaction
- Whether users can set fixed exchange rates
- Whether historical rates are used for past transactions

### Display Currency Options

**Single-Store View:**
- Data is displayed in the **shop's native currency** only
- No option to convert to a different currency within a single-store view

**Multi-Store View:**
When comparing shops with different currencies, users can:
- View each shop in its **original currency**
- Convert all shops to **USD** (workspace currency)
- **Limitation:** "The total row in multi-currency comparisons always displays exclusively in USD, regardless of individual shop currencies"

### Multi-Currency in Reports
How currency conversion affects different report types:

| Report Type | Currency Behavior |
|-------------|-------------------|
| Single-store dashboard | Shop's native currency, no conversion |
| Multi-store aggregate | Converted to workspace currency (USD) |
| P&L report | Likely in shop's currency (not documented for multi-currency) |
| Custom reports | Not documented for multi-currency behavior |
| Marketing analytics | Ad spend converted from platform currency to shop currency |
| Products analytics | Shop's currency |

### Multi-Currency and COGS
The interaction between multi-currency and COGS is not directly documented. Key questions:
- If COGS is entered in a supplier's currency, is it converted to the shop's currency?
- Is there a COGS currency field per product?
- How does currency affect margin calculations when costs and revenue are in different currencies?

Based on the custom expenses feature (which allows any currency), it's likely that COGS can also be entered in non-shop currencies with automatic conversion, but this is not explicitly confirmed.

---

## Platform-Specific Multi-Store Behavior

### Shopify
- Deepest integration support
- Auto-detection of store name via webhooks (auto-sync when name changes)
- Multiple Shopify stores can be added to one workspace
- Sales channel data automatically synced from Shopify

### Amazon
- Supported as a connected platform
- Fee delays of 2-3 weeks (general Amazon limitation, documented in file 014)
- Amazon marketplace currency likely follows the marketplace region (US = USD, UK = GBP, etc.)

### WooCommerce
- Supported but with currency limitations
- Third-party currency plugins NOT supported
- Currency must be set in WooCommerce core settings (Settings → General → Currency Options)
- ShipStation currency changes require contacting BeProfit support

### Wix
- Supported but minimally documented
- Connection flow and specific features for Wix stores are not detailed in the Help Center

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Store selector dropdown | Dropdown | Top nav bar | Shows current store name with down chevron |
| Store selector (sidebar) | Dropdown | Left sidebar top | Store name with avatar and chevron |
| Multi-store checkboxes | Checkboxes | Store selector dropdown | Select multiple stores for aggregate view |
| Store arrow button | Icon button | Store selector dropdown | Click to view individual store dashboard |
| Workspace info card | Summary bar | Settings → Workspace | Shows name, shops count, teammates, currency |
| Workspace name edit | Edit icon/link | Workspace info card | Pencil icon to rename workspace |
| Workspace currency edit | Edit icon/link | Workspace info card | Edit icon to change base currency |
| Shops table | Table | Settings → Workspace | Platform rows with logo, shop count, "+ Add Shop" |
| Platform expand chevron | Icon | Shops table | Expand to see connected shop details |
| "+ Add Shop" button | Link/button | Shops table per platform row | Initiates store connection flow |
| Invite Teammate button | CTA button | Teammates section | Green/teal "Invite New Teammate" button |
| Teammates table | Table | Settings → Workspace | Name, Status, Permissions columns |
| Currency toggle | Toggle/dropdown | Multi-store view | Switch between original currencies and USD |

---

## Data Model Implications

### Entity Hierarchy
```
Workspace
├── Workspace name
├── Base currency (e.g., USD)
├── Teammates (users with permissions)
│   ├── Name
│   ├── Status (Active, Pending)
│   └── Permissions (per-shop access levels)
├── Shop 1 (Shopify)
│   ├── Shop name (auto-synced via webhook)
│   ├── Platform type
│   ├── Currency (from platform)
│   ├── Sales channels (from platform)
│   ├── Settings (COGS, fulfillment, calc preferences — independent)
│   └── Orders, products, marketing data
├── Shop 2 (Amazon)
│   └── ... (independent settings)
└── Shop N (any platform)
    └── ... (independent settings)
```

### Key Relationships
- **Workspace → Shops:** One-to-many. Each workspace contains multiple shops.
- **Shop → Platform:** Many-to-one. Multiple shops can be from the same platform (e.g., 3 Shopify stores).
- **Workspace → Teammates:** One-to-many. Team members belong to a workspace with per-shop permissions.
- **Shop → Currency:** Each shop has one native currency from its platform.
- **Workspace → Currency:** The workspace has one base currency for aggregation/conversion.
- **Shop → Sales Channels:** One-to-many. A single shop can have multiple sales channels (source platforms within the store).

### Currency Conversion Requirements
- Store currency ↔ Workspace currency conversion for aggregated views
- Ad platform currency → Shop currency conversion for marketing data
- Custom expense/revenue currency → Shop currency conversion
- Exchange rate storage (unknown source and methodology)

---

## Limitations & Gaps

1. **Exchange rate source undocumented.** BeProfit converts currencies automatically but doesn't document where rates come from (API provider), update frequency (real-time, daily, weekly), or whether historical rates are used for past transactions.

2. **No user-configurable exchange rates.** Users cannot set fixed exchange rates for budgeting or override automatic rates when they know the actual conversion rate used in a transaction.

3. **Total row always USD.** In multi-currency comparison views, the total row is always in USD regardless of the workspace currency setting. This is a hardcoded limitation.

4. **WooCommerce third-party currency plugins unsupported.** Merchants using Multi Currency for WooCommerce or similar plugins cannot have BeProfit recognize those currencies. Only WooCommerce core currency settings are respected.

5. **No consolidated multi-store P&L explicitly documented.** While aggregate views exist, it's unclear whether a true consolidated P&L report across multiple stores with proper currency conversion is available.

6. **Workspace merging requires support contact.** Combining two separate BeProfit accounts/workspaces into one is not self-service — requires emailing support@beprofit.co.

7. **ShipStation currency changes require support.** Changing the currency used for ShipStation integration requires contacting BeProfit's tech support team.

8. **Per-store settings isolation can be tedious.** Each shop has independent settings. If a merchant with 5 stores wants to apply the same calculation preferences, they must configure each store individually — no "apply to all stores" capability documented.

9. **Cross-store product matching not documented.** If the same product is sold across multiple stores/platforms, it's unclear whether BeProfit can recognize them as the same SKU for unified product analytics.

10. **Max stores per workspace not documented.** No documented limit on how many stores a single workspace can hold, or whether there are performance implications with many stores.

---

## Relevance to Our Build

1. **Adopt the workspace→stores hierarchy from day one.** BeProfit's Workspace > Shop architecture is sound and standard in multi-tenant SaaS. Design our data model with this hierarchy to support multi-store merchants from launch.

2. **Make exchange rate methodology transparent.** BeProfit's undocumented conversion approach is a trust issue. Display the exchange rate used, its source (e.g., ECB, Open Exchange Rates), and timestamp. Allow users to see and optionally override rates.

3. **Support user-configurable exchange rates.** For merchants who negotiate specific rates with payment processors or want to use budget rates, allow manual rate entry alongside automatic rates.

4. **Build cross-store product matching.** If a merchant sells the same product on Shopify and Amazon, they should be able to link those SKUs for unified product-level profitability analysis. BeProfit doesn't appear to offer this.

5. **Self-service workspace management.** Make workspace merging, splitting, and reorganization self-service rather than requiring support intervention. Enterprise merchants need this flexibility.

6. **Support "apply settings to all stores" for shared preferences.** When merchants have multiple stores with identical business logic, allow them to propagate settings changes across stores to reduce configuration overhead.

7. **Build proper consolidated P&L across stores.** A single P&L that combines revenue and costs from multiple stores with proper currency conversion is a valuable feature for multi-store operators. Include elimination entries for inter-store transfers.

8. **Support WooCommerce multi-currency plugins.** BeProfit's limitation here is a clear competitive gap. Support popular plugins like Multi Currency for WooCommerce to capture merchants using these setups.

9. **Add pricing tier for multi-store.** BeProfit's pricing page doesn't clearly document per-store pricing. Consider whether to charge per-store or include a store count in each plan tier. Be transparent about multi-store costs.

10. **Implement cross-store comparison dashboards.** The "Compare Shops" feature referenced in BeProfit's documentation suggests merchants want side-by-side store analysis. Build this as a first-class feature with normalized metrics (adjust for store size, currency, operating time) for fair comparison.
