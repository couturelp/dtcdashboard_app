# BeProfit Store Configuration Settings

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Category:** Help Center / Settings & Configuration
- **Subcategory:** Store Configuration
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research to populate

---

## Research Objective

Document all per-store configuration options, currency settings, default cost/margin settings, and store-level customizations in BeProfit. Unlike account-level settings (file 051), these settings apply to individual connected stores and may vary between stores in multi-store accounts.

---

## Store Management Overview

### Multi-Store Setup

**Expected Help Articles:**
- "Adding a new store"
- "Connecting multiple stores"
- "Switching between stores"
- "Store selector usage"
- "Managing multiple e-commerce platforms"

**Key Areas to Document:**
- [ ] Maximum number of stores per plan tier
- [ ] Supported store platforms (Shopify, Amazon, WooCommerce, Wix)
- [ ] Store connection/integration process
- [ ] Store selector interface (dropdown in header)
- [ ] Store naming and identification
- [ ] Store archiving or deactivation
- [ ] Store deletion process and data retention
- [ ] Cross-store reporting capabilities
- [ ] Per-store vs consolidated views

**Questions to Answer:**
1. Can you connect multiple stores from the same platform (e.g., 2 Shopify stores)?
2. Is there a limit on stores per platform type?
3. Can you switch active store context throughout the UI?
4. Are settings configured per-store or globally?
5. Can you view aggregated data across all stores simultaneously?

---

## Currency Settings

### Store Currency Configuration

**Expected Help Articles:**
- "Setting your store currency"
- "Multi-currency support"
- "Currency conversion"
- "Exchange rate management"
- "Displaying costs in different currencies"

**Key Areas to Document:**
- [ ] Primary store currency selection:
  - Currency dropdown (USD, EUR, GBP, CAD, AUD, etc.)
  - How currency is detected (automatic from platform vs manual)
  - Can currency be changed after initial setup?
  - Impact on historical data when changing currency
- [ ] Multi-currency stores:
  - Support for stores that sell in multiple currencies
  - How revenue in foreign currencies is handled
  - Base currency for profit calculations
- [ ] Currency display preferences:
  - Show store currency vs converted to account currency
  - Decimal places (2 vs 3 for certain currencies)
  - Currency symbol positioning
  - Thousands separator (comma vs space vs period)

**Questions to Answer:**
1. How many currencies are supported?
2. If a Shopify store sells in multiple currencies, how does BeProfit handle this?
3. Can you view reports in a currency different from store currency?
4. Are conversion rates live or cached?

---

### Exchange Rate Management

**Expected Help Articles:**
- "Currency conversion rates"
- "Updating exchange rates"
- "Historical exchange rate data"
- "Custom exchange rates"

**Key Areas to Document:**
- [ ] Exchange rate sources:
  - Provider used (e.g., Open Exchange Rates, ECB, etc.)
  - Update frequency (real-time, daily, manual)
  - Historical rate accuracy
- [ ] Manual rate overrides:
  - Can users set custom exchange rates?
  - Use case for custom rates
  - Rate override duration (permanent vs date-range)
- [ ] Exchange rate application:
  - Applied at order date or report date?
  - Impact on profit calculations
  - Display of original currency vs converted
- [ ] Multi-store currency consolidation:
  - Base currency for cross-store reporting
  - Conversion methodology

**Questions to Answer:**
1. Are exchange rates updated automatically?
2. Can you view exchange rate history?
3. What happens if exchange rate data is unavailable?
4. Can you reprocess historical data with updated exchange rates?

---

## Default Cost & Margin Settings

### Product Cost Configuration

**Expected Help Articles:**
- "Setting product costs (COGS)"
- "Default cost of goods sold"
- "Importing cost data"
- "Bulk editing product costs"
- "Variable vs fixed costs"

**Key Areas to Document:**
- [ ] COGS input methods:
  - Manual entry per product
  - Bulk import via CSV
  - Sync from e-commerce platform (if product cost field exists)
  - Import from suppliers or inventory management systems
  - Default cost if not specified
- [ ] Cost types:
  - Product cost / COGS
  - Packaging costs
  - Fixed per-order costs
  - Variable costs (by quantity, weight, etc.)
- [ ] Default cost fallbacks:
  - What happens if product cost is not set?
  - Can you set a default cost percentage (e.g., 40% of sale price)?
  - Category-level default costs
  - Brand/supplier-level default costs
- [ ] Cost update handling:
  - How cost changes affect historical orders
  - Retroactive cost updates option
  - Cost history tracking

**Questions to Answer:**
1. Is COGS per-product or per-variant?
2. Can you set costs at the order line item level?
3. What's the default cost if not specified (0, assumed from price, etc.)?
4. Can you import costs from Shopify product data?
5. How are bundled products handled?

---

### Margin & Profit Targets

**Expected Help Articles:**
- "Setting profit margin goals"
- "Target margins by product or category"
- "Profit thresholds and alerts"

**Key Areas to Document:**
- [ ] Target margin settings:
  - Account-wide target margin
  - Per-store target margin
  - Per-category or per-product targets
  - Industry benchmark comparisons
- [ ] Margin alert thresholds:
  - Low margin warnings
  - Negative profit alerts
  - Profitability scoring
- [ ] Margin calculation display:
  - Net margin vs gross margin defaults
  - Margin percentage vs absolute profit

**Questions to Answer:**
1. Can you set different target margins per product category?
2. Are there alerts when actual margins fall below targets?
3. Does BeProfit provide benchmark data for target margins?
4. Can you set margin goals for marketing campaigns?

---

## Store-Level Customization

### Dashboard Customization (Per-Store)

**Expected Help Articles:**
- "Customizing your store dashboard"
- "Store-specific metrics"
- "Hiding or showing widgets"

**Key Areas to Document:**
- [ ] Dashboard layout per store:
  - Can each store have a different dashboard layout?
  - Widget visibility toggles per store
  - Custom KPI selection per store
- [ ] Metric customization:
  - Which metrics are displayed by default
  - Store-specific calculated fields
  - Custom formulas or ratios
- [ ] Branding/theming per store:
  - Store logo or icon
  - Color coding for multi-store views

**Questions to Answer:**
1. Are dashboard customizations per-store or account-wide?
2. Can you save templates for store dashboards?
3. Do all team members see the same store dashboard or can it be user-specific?

---

### Data Sync & Refresh Settings

**Expected Help Articles:**
- "Data sync frequency"
- "Manual data refresh"
- "Historical data import"
- "Sync schedule configuration"

**Key Areas to Document:**
- [ ] Automatic sync frequency:
  - Real-time vs scheduled sync
  - Sync interval per plan tier (hourly, every 6 hours, daily?)
  - Sync during specific hours (e.g., overnight only on lower tiers)
- [ ] Manual refresh:
  - "Refresh Now" button location
  - Refresh limits (per hour, per day)
  - Refresh scope (all data vs specific integration)
- [ ] Historical data import:
  - How far back can you import orders?
  - Initial sync process when connecting a store
  - Re-sync or backfill options
  - Data integrity checks during sync
- [ ] Sync status monitoring:
  - Last sync timestamp display
  - Sync error notifications
  - Sync logs or history

**Questions to Answer:**
1. What's the sync frequency on each plan tier?
2. Can you trigger a manual refresh? How often?
3. Is there a sync queue or does new data push automatically?
4. What happens if sync fails (retry logic)?
5. Can you selectively sync certain integrations?

---

### Integration Configuration (Per-Store)

**Expected Help Articles:**
- "Configuring Shopify integration for your store"
- "Amazon Seller Central settings"
- "WooCommerce store connection"
- "Managing store integrations"

**Key Areas to Document:**
- [ ] Platform-specific settings:
  - Shopify: UTM tracking enable/disable, metafields usage
  - Amazon: FBA vs FBM handling, Amazon Ads connection
  - WooCommerce: API key management, extension settings
- [ ] Ad platform connections per store:
  - Facebook Ads account linking
  - Google Ads account linking
  - TikTok Ads account linking
  - Multiple ad accounts per store?
- [ ] Email/SMS integrations per store:
  - Klaviyo account connection
  - Email revenue attribution settings
- [ ] Shipping integrations per store:
  - ShipStation connection
  - ShipBob connection
  - Shipping cost sync settings
- [ ] Integration permissions and scopes:
  - Read-only vs read-write access
  - Data access permissions granted to BeProfit
  - OAuth token management

**Questions to Answer:**
1. Can different stores connect to different ad accounts?
2. Can one store have multiple Shopify stores connected? (Shopify Plus multi-store)
3. Are integration credentials stored per-store or account-wide?
4. Can you disconnect an integration without deleting the store?

---

## Order & Product Filtering

### Data Inclusion/Exclusion Rules

**Expected Help Articles:**
- "Excluding orders from reports"
- "Filtering test orders"
- "Handling refunds and returns"
- "Draft orders settings"

**Key Areas to Document:**
- [ ] Order filtering options:
  - Exclude draft orders
  - Exclude test orders (orders with "test" in customer name, etc.)
  - Exclude cancelled orders
  - Exclude refunded orders vs include with negative values
  - Minimum order value threshold
  - Exclude specific order tags
- [ ] Product filtering:
  - Exclude specific products from reports
  - Exclude digital products
  - Exclude wholesale orders
  - Product collection filters
- [ ] Date range handling:
  - Order date vs fulfillment date vs payment date
  - Which date determines when an order appears in reports?
- [ ] Refund handling:
  - Full refunds: exclude order or show as negative?
  - Partial refunds: adjust order value or separate line item?
  - Refund timing (refund in different period than original order)

**Questions to Answer:**
1. Can you create custom order exclusion rules?
2. How are chargebacks handled differently from refunds?
3. Can you filter by order tags from Shopify?
4. Are excluded orders hidden permanently or just filtered from view?

---

## Custom Fields & Metadata

### Store-Specific Custom Data

**Expected Help Articles:**
- "Adding custom fields"
- "Using metafields"
- "Custom product attributes"
- "Store-specific data fields"

**Key Areas to Document:**
- [ ] Custom field support:
  - Can you add custom fields to products?
  - Can you add custom fields to orders?
  - Custom field types (text, number, dropdown, date)
  - Custom field usage in reports and filters
- [ ] Metafield sync (Shopify):
  - Which Shopify metafields are synced?
  - Can you map metafields to BeProfit fields?
  - Metafield usage for COGS, supplier info, etc.
- [ ] Custom tags:
  - Product tags
  - Order tags
  - Customer tags
  - Tag-based segmentation in reports

**Questions to Answer:**
1. Does BeProfit support Shopify metafields?
2. Can you create calculated fields based on custom data?
3. Are custom fields available on all plan tiers?

---

## Attribution & Tracking Settings

### UTM & Campaign Attribution (Store-Specific)

**Expected Help Articles:**
- "UTM tracking setup"
- "Campaign attribution"
- "Source/medium tracking"
- "Conversion attribution window"

**Key Areas to Document:**
- [ ] UTM tracking configuration:
  - Enable/disable UTM tracking per store
  - UTM parameters captured (source, medium, campaign, content, term)
  - First-click vs last-click attribution
  - Attribution window (7 days, 30 days, etc.)
- [ ] Campaign tracking:
  - How campaigns are identified
  - Campaign grouping and categorization
  - Cross-channel campaign tracking
- [ ] Attribution logic:
  - Organic vs paid attribution
  - Direct traffic handling
  - Multi-touch attribution support
  - Order source assignment rules

**Questions to Answer:**
1. Is UTM tracking automatic or does it require setup?
2. Is UTM tracking available for all platforms or Shopify-only?
3. Can you override automatic attribution?
4. How does BeProfit handle orders with no UTM data?

---

## Operational Expense Allocation

### Fixed Costs per Store

**Expected Help Articles:**
- "Adding operational expenses"
- "Fixed costs configuration"
- "Rent and overhead allocation"
- "Monthly recurring expenses"

**Key Areas to Document:**
- [ ] Expense entry:
  - One-time expenses
  - Recurring monthly expenses
  - Annual expenses (amortized monthly)
  - Expense categories (rent, utilities, software, salaries, etc.)
- [ ] Expense allocation:
  - Allocate to one store vs split across stores
  - Allocation rules (by revenue, by order volume, equal split, custom)
  - Time-based expense application
- [ ] Expense impact:
  - How expenses affect net profit calculation
  - Expense per order calculation
  - Expense tracking over time

**Questions to Answer:**
1. Can you add store-specific operational expenses?
2. How are shared expenses allocated across multiple stores?
3. Can you schedule expense changes (e.g., rent increase in Q2)?
4. Are expense allocations reflected in order-level profit?

---

## Tax & Compliance Settings

### Tax Configuration (Per-Store)

**Expected Help Articles:**
- "Sales tax settings"
- "VAT configuration"
- "Tax-inclusive vs tax-exclusive pricing"
- "Tax reporting"

**Key Areas to Document:**
- [ ] Tax handling:
  - How sales tax is captured from platform
  - Tax-inclusive pricing stores (Europe/Australia)
  - Tax-exclusive pricing stores (US)
  - Tax display in profit calculations
- [ ] Tax exclusion from costs:
  - Are costs entered including tax or excluding tax?
  - VAT reclaim scenarios
- [ ] Tax jurisdiction handling:
  - Multi-state or multi-country tax rates
  - Nexus considerations
- [ ] Tax reporting:
  - Tax liability summaries
  - Tax collected vs tax remitted
  - Export for tax filing

**Questions to Answer:**
1. Does BeProfit automatically detect tax settings from the e-commerce platform?
2. Can you configure whether revenue includes tax or excludes tax?
3. Is there support for reverse charge VAT?
4. Can you track tax by jurisdiction?

---

## Advanced Store Configuration

### API & Webhook Settings (Store-Level)

**Expected Help Articles:**
- "Store-specific API access"
- "Webhook configuration per store"
- "Custom integrations"

**Key Areas to Document:**
- [ ] API keys per store vs account-wide
- [ ] Webhook endpoints per store
- [ ] Custom integration options
- [ ] Data export automations per store

**Questions to Answer:**
1. Can you generate store-specific API keys?
2. Are webhooks configurable per store?

---

### Store Onboarding Progress

**Expected Help Articles:**
- "Store onboarding checklist"
- "Completing store setup"
- "Onboarding percentage explained"

**Key Areas to Document:**
- [ ] Onboarding checklist items:
  - Connect store platform
  - Import historical data
  - Set product costs
  - Connect ad platforms
  - Connect shipping providers
  - Configure settings
  - Invite team members
- [ ] Onboarding progress indicator (shown in header, e.g., "56%")
- [ ] Incomplete setup warnings
- [ ] Onboarding completion benefits

**Questions to Answer:**
1. What are all the steps in store onboarding?
2. Can you skip onboarding steps?
3. What happens if onboarding is never completed?
4. Is onboarding progress tracked per store?

---

## Store Settings vs Account Settings Matrix

### Hierarchy & Precedence

**Key Documentation Needed:**
- Which settings are account-wide (apply to all stores)?
- Which settings are per-store (overridable)?
- Can store settings override account settings?
- What's the default behavior for new stores?

| Setting Area | Account-Wide | Per-Store | Notes |
|--------------|--------------|-----------|-------|
| User/team management | ✓ | ✗ | Users have access to all stores or specific stores |
| Currency | ✗ | ✓ | Each store has its own currency |
| Timezone | ? | ? | TBD |
| Notification preferences | ? | ? | TBD |
| Data sync frequency | ✓ (by plan) | ✗ | Plan-level setting |
| Dashboard layout | ? | ? | TBD |
| COGS defaults | ✗ | ✓ | Per-store defaults |
| Expense allocation | Mixed | ✓ | Some expenses are store-specific |
| Integration connections | ✗ | ✓ | Each store connects its own integrations |
| API access | ✓ | ✗ | Account-wide API keys |

---

## Research Checklist

To complete this document, systematically search the help center for:
- [ ] "store settings"
- [ ] "store configuration"
- [ ] "currency"
- [ ] "exchange rate"
- [ ] "COGS"
- [ ] "product cost"
- [ ] "default cost"
- [ ] "margin"
- [ ] "data sync"
- [ ] "refresh"
- [ ] "integration settings"
- [ ] "UTM tracking"
- [ ] "attribution"
- [ ] "operational expenses"
- [ ] "fixed costs"
- [ ] "tax settings"
- [ ] "multi-store"
- [ ] "onboarding"

Visit each article and document:
1. Step-by-step configuration instructions
2. Default values and recommended settings
3. Plan tier availability for each setting
4. Edge cases and limitations
5. Screenshots descriptions (settings page layouts, dropdowns, toggles)
6. Related settings and dependencies

---

## Next Steps

After manual research:
1. Fill in all "Expected Help Articles" sections with actual titles and URLs
2. Complete all checkboxes with documented findings
3. Answer all "Questions to Answer" sections
4. Complete the Settings Matrix table with accurate data
5. Document any store-specific settings not captured in this template
6. Cross-reference with file 051 (Account Settings) to clarify account vs store settings
7. Note any differences in settings by platform (Shopify vs Amazon vs WooCommerce)

---

**Status:** Template ready for manual research population
**Estimated Completion:** Requires 1-2 hours of systematic help center exploration
**Dependencies:** Access to BeProfit help center at https://help.runviably.com/beprofit
