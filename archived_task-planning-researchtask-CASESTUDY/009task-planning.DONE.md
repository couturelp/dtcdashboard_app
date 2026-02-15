# Task 009 - E-Commerce Platform Integrations Research (PRD Part 03, Batch 1)

## PRD Reference
- **PRD Part:** 03
- **PRD File:** prd/detailed_prd_part_03.md
- **Requirements Addressed:** Tasks 1-4 of PRD Part 03 (Integration Ecosystem Overview, Shopify Integration, WooCommerce Integration, Amazon Integration)

## Status
- [ ] Planning Complete
- [ ] Implementation Complete
- [ ] Verification Complete
- Completed At: [timestamp - to be filled when done]

## Purpose
Begin PRD Part 03 (Integrations Deep Dive) by documenting BeProfit's integration ecosystem and the three primary e-commerce platform integrations. This establishes the foundation for understanding how BeProfit connects to external systems and syncs critical data.

## Scope

### What This Task WILL Do (4 items)
1. Research and document Integration Ecosystem Overview → `beprofit-casestudy-info-031.md`
2. Research and document Shopify Integration (Deep Dive) → `beprofit-casestudy-info-032.md`
3. Research and document WooCommerce Integration → `beprofit-casestudy-info-033.md`
4. Research and document Amazon Integration → `beprofit-casestudy-info-034.md`

### What This Task Will NOT Do (Left for Later Tasks)
- Facebook/Meta Ads Integration (file 035) - Task 010
- Google Ads Integration (file 036) - Task 010
- TikTok Ads Integration (file 037) - Task 010
- Other Ad Platform Integrations (file 038) - Task 010
- Klaviyo Integration (file 039) - Task 011
- Other Email/SMS Integrations (file 040) - Task 011
- Shipping Platform Integrations (file 041) - Task 011
- Accounting & Other Integrations (file 042) - Task 011
- Data Sync & Refresh Documentation (file 043) - Task 011
- Integration Comparison Matrix (file 044) - Task 011 or 012
- Checkpoint Review #3 (file 045) - Task 011 or 012

## Files to CREATE
1. `dtcdashboard_app/casestudy/beprofit-casestudy-info-031.md` — Integration Ecosystem Overview
2. `dtcdashboard_app/casestudy/beprofit-casestudy-info-032.md` — Shopify Integration (Deep Dive)
3. `dtcdashboard_app/casestudy/beprofit-casestudy-info-033.md` — WooCommerce Integration
4. `dtcdashboard_app/casestudy/beprofit-casestudy-info-034.md` — Amazon Integration

## Implementation Steps (Max 6 steps)

### Step 1: Research Integration Ecosystem Overview (File 031)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-031.md` (CREATE)

Browse the following sources to map BeProfit's full integration landscape:
- **BeProfit Help Center:** https://help.runviably.com/beprofit (Navigation sidebar will show "Integrations" category if it exists)
- **BeProfit Marketing Site:** https://beprofit.co/ (Homepage likely features "Integrations" section, footer may have integrations page)
- **Help Center Search:** Search for "integration", "connect", "sync", "platform"
- **Cross-reference:** Read `prd/manually-added-dump-from-real-dashboard.md` for Settings pages that show integration cards

**Research methodology:**
1. Identify ALL integrations by browsing the Help Center Integrations category
2. Categorize each integration:
   - E-commerce platforms (Shopify, WooCommerce, Amazon, etc.)
   - Ad platforms (Facebook Ads, Google Ads, TikTok Ads, etc.)
   - Email/SMS marketing (Klaviyo, Mailchimp, etc.)
   - Shipping (ShipStation, ShipBob, etc.)
   - Accounting (QuickBooks, Xero, etc.)
   - Payment processors (Stripe, PayPal, etc.)
   - Other (Zapier, webhooks, etc.)
3. For each integration, note:
   - Is it native (built directly into BeProfit) or third-party (via Zapier)?
   - Which pricing tier includes it (Free, Basic, Premium, Plus)?
   - Is it prominently featured or buried?
4. Create a master table of ALL integrations

**Document structure:**

```markdown
# BeProfit Integration Ecosystem Overview

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / Ecosystem Overview
- **Date Captured:** [date]

---

## Integration Philosophy
[Document BeProfit's integration approach — do they position as "connect to everything" or focus on specific platforms?]

## Complete Integration Catalog

### E-Commerce Platforms
[Table of all e-commerce platform integrations]

| Platform | Native/Third-Party | Tier Required | Featured? | Link |
|----------|-------------------|---------------|-----------|------|
| Shopify | Native | All plans | Yes | [article URL] |
| WooCommerce | Native | [tier] | [Yes/No] | [article URL] |
| Amazon | Native | [tier] | [Yes/No] | [article URL] |
| ... | ... | ... | ... | ... |

### Ad Platforms
[Table of all ad platform integrations]

| Platform | Native/Third-Party | Tier Required | Featured? | Link |
|----------|-------------------|---------------|-----------|------|
| Facebook Ads | Native | [tier] | Yes | [article URL] |
| Google Ads | Native | [tier] | Yes | [article URL] |
| ... | ... | ... | ... | ... |

### Email/SMS Marketing
[Table of all email/SMS integrations]

| Platform | Native/Third-Party | Tier Required | Featured? | Link |
|----------|-------------------|---------------|-----------|------|
| Klaviyo | Native | [tier] | [Yes/No] | [article URL] |
| ... | ... | ... | ... | ... |

### Shipping & Fulfillment
[Table of all shipping integrations]

### Accounting & ERP
[Table of all accounting integrations]

### Payment Processors
[Table of all payment processor integrations - may overlap with e-commerce platforms]

### Other Integration Methods
[Document Zapier, webhooks, API, FTP - cross-reference file 028 (API & Webhooks from PRD Part 02)]

## Integration Tiers Analysis
[Which integrations are available on which pricing tiers — is Shopify on Free, are ad platforms gated to Premium+?]

## Native vs Third-Party Split
[How many integrations are native vs requiring Zapier or other third-party tools?]

## Integration Maturity Assessment
[Which integrations appear most mature (rich Help Center docs, featured prominently) vs newly added or experimental?]

## Inferred UI Elements
[Integration marketplace/directory page, integration cards on dashboard, connection status indicators, "Add Integration" button]

## Data Model Implications
[Integration as an entity (type, status, credentials, sync_frequency), Shop → Integrations one-to-many relationship]

## Limitations & Gaps
[Missing integrations (e.g., no Magento, no Walmart), limited third-party extensibility]

## Relevance to Our Build
[7-10 actionable insights for integration strategy:
- Which integrations are table-stakes (must-have day 1)
- Which integrations differentiate BeProfit
- Gaps we could exploit (platforms BeProfit doesn't support)
- Integration UX patterns to adopt or improve
]
```

**Key research questions:**
- How many total integrations does BeProfit have?
- Which integrations are native vs Zapier/third-party?
- Are any major platforms missing (Magento, BigCommerce, Walmart, eBay)?
- Which integrations are gated to higher pricing tiers?
- Does BeProfit have an "integrations marketplace" or just a list?
- Are integrations prominently featured in marketing positioning?

**Expected output:** 300-500 line markdown file with comprehensive integration catalog tables.

- [ ] Checkpoint: Step 1 complete

### Step 2: Research Shopify Integration Deep Dive (File 032)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-032.md` (CREATE)

Browse the following sources for Shopify integration details:
- **Help Center article:** Search for "Shopify" in Help Center (likely "How to Connect Shopify" or similar)
- **BeProfit Help Center IA:** Check if there's a dedicated Shopify section
- **Shopify App Store:** Search for "BeProfit" on https://apps.shopify.com/ to see the app listing, reviews, install count, screenshots
- **BeProfit Marketing Site:** Look for Shopify-specific landing page or case studies
- **Cross-reference files:**
  - `beprofit-casestudy-info-031.md` (just created) for Shopify's position in the ecosystem
  - `prd/manually-added-dump-from-real-dashboard.md` for Shopify connection UI

**Research methodology:**
1. Document the FULL connection setup flow:
   - How user initiates connection (Settings → Integrations → Shopify → Connect?)
   - OAuth flow details (what permissions are requested)
   - Connection testing/verification
2. Catalog ALL data synced FROM Shopify:
   - Orders (order details, line items, customer info, timestamps)
   - Products (SKUs, variants, pricing, cost of goods if available)
   - Customers (email, location, customer lifetime value)
   - Refunds and returns
   - Inventory levels
   - Shopify Payments transaction fees
   - Shipping costs
   - Sales tax
3. Note sync direction and frequency:
   - Is it one-way (Shopify → BeProfit) or two-way?
   - Real-time via webhooks, or batch sync (hourly, daily)?
   - Can user manually trigger a sync?
4. Document Shopify-specific features:
   - Shopify POS support (in-person sales)
   - Shopify Flow integration (automation)
   - Multi-currency handling (if Shopify Payments multi-currency is enabled)
   - Shopify Markets support (international selling)
5. Capture limitations and troubleshooting:
   - What data is NOT synced (e.g., draft orders, abandoned carts)
   - Known issues or edge cases (e.g., "multi-location inventory not fully supported")
   - Common troubleshooting steps (reconnect, permission errors)

**Document structure:**

```markdown
# BeProfit Shopify Integration (Deep Dive)

## Source
- **URLs:** [list all browsed URLs - Help Center, Shopify App Store, marketing site]
- **Category:** Integrations / E-Commerce Platforms / Shopify
- **Date Captured:** [date]

---

## Shopify as BeProfit's Primary Platform
[Document Shopify's importance to BeProfit — is it the most common integration, most featured, best supported?]

## Connection Setup

### Prerequisites
[What user needs before connecting: Shopify store URL, admin access, pricing plan requirements]

### Connection Flow
[Step-by-step walkthrough of the connection process]

**UI Flow:**
```
1. User navigates to Settings → Integrations (or similar)
2. Clicks "Connect Shopify" button or card
3. Redirected to Shopify OAuth consent screen
4. Shopify requests permissions: [list specific scopes like read_orders, read_products, etc.]
5. User clicks "Install app" or "Authorize"
6. Redirected back to BeProfit with connection success message
7. Initial data sync begins (may take 5-60 minutes depending on order volume)
```

### OAuth Permissions Requested
[List specific Shopify API scopes requested — this reveals what data BeProfit accesses]

Example:
- `read_orders` — Access order data
- `read_products` — Access product catalog
- `read_customers` — Access customer information
- `read_inventory` — Access inventory levels
- (list all permissions)

### Initial Sync
[How long does first sync take? How far back does it pull historical data? (90 days, 1 year, all time?)]

## Data Synced FROM Shopify

### Order Data
[Comprehensive list of order fields synced]

**Order-level fields:**
- Order ID, Order number, Order date, Order status (paid, fulfilled, cancelled)
- Total order value, Subtotal, Discount amount, Shipping cost, Tax amount
- Payment method, Payment status, Fulfillment status
- Customer email, Customer name, Shipping address, Billing address
- Currency (if multi-currency)
- Channel (Online Store, POS, etc.)

**Line-item fields (per product in order):**
- Product name, Variant name, SKU
- Quantity, Price per unit, Line total
- Product cost (if set in Shopify or synced from COGS tool)

### Product Data
[List of product/catalog fields synced]

- Product title, Product type, Product vendor
- Variants (SKU, barcode, price, compare-at price)
- Cost per item (COGS if available in Shopify)
- Inventory quantity (per location if multi-location)

### Customer Data
[Customer fields synced]

- Customer ID, Email, Name
- Total orders, Total spent (lifetime value)
- Location (city, state, country)

### Refund & Return Data
[How refunds are handled]

- Refund date, Refund amount, Refund reason
- Partial vs full refunds
- Restocking fees
- Impact on profit calculation

### Shopify Fees & Transaction Costs
[Does BeProfit pull Shopify Payments transaction fees automatically?]

- Shopify subscription fee (plan cost) — manual entry or auto-detected?
- Shopify Payments processing fees (2.9% + $0.30, etc.)
- Shopify Shipping label costs

### Inventory Levels
[Is real-time inventory synced? One-way or two-way?]

## Sync Direction & Frequency

### Sync Direction
[One-way (Shopify → BeProfit only) or two-way (can BeProfit write back to Shopify)?]

### Sync Frequency
[Real-time webhooks for orders, or batch sync? If batch, what's the schedule?]

**Typical sync pattern (inferred):**
- New orders: Real-time via Shopify webhook (appear in BeProfit within 1-5 minutes)
- Product catalog: Hourly or daily batch sync
- Inventory: Real-time or hourly
- Historical data: Manual refresh available in Settings

### Manual Sync
[Can user trigger a manual "Sync Now" button?]

## Shopify-Specific Features

### Shopify POS Support
[Does BeProfit track in-person sales from Shopify POS?]

### Shopify Flow Integration
[Any documented integration with Shopify Flow for automation?]

### Multi-Currency & Markets Support
[How does BeProfit handle Shopify Payments multi-currency? Shopify Markets for international selling?]

### Multi-Location Inventory
[Does BeProfit support Shopify's multi-location inventory feature?]

## Known Limitations

### Data NOT Synced
[What Shopify data is explicitly NOT synced?]

Example limitations (to be confirmed or refuted):
- Draft orders (not synced until finalized)
- Abandoned carts (not tracked)
- Shopify blog posts, pages (non-transactional content)
- Gift card sales (may require special handling)

### Edge Cases & Troubleshooting
[Common issues documented in Help Center]

Example issues:
- "Orders not appearing" → Check date range filter, check connection status
- "Incorrect profit calculations" → Verify COGS are set in Shopify or BeProfit
- "Multi-location inventory not syncing" → Known limitation

## Disconnection & Reconnection
[How to disconnect Shopify integration, what happens to historical data?]

## Shopify App Store Presence

### App Listing Details
[From Shopify App Store listing]

- App rating (X.X stars out of 5)
- Number of reviews
- Install count (if visible — "1,000+ installs", "5,000+ installs")
- Last updated date (app freshness indicator)
- Developer info (Viably Inc. or similar)

### Screenshot Analysis
[Describe key screenshots from Shopify App Store — what UI elements are shown?]

### Review Sentiment
[High-level sentiment from Shopify App Store reviews — positive themes, negative themes]

## Inferred UI Elements
[From Shopify integration perspective]

- Shopify connection card (green checkmark when connected, "Connect" button when not)
- Sync status indicator ("Last synced: 5 minutes ago")
- Manual "Sync Now" button
- Connection settings (disconnect, reconnect, view permissions)
- Initial sync progress bar

## Data Model Implications

**Integration entity:**
```
ShopifyIntegration {
  shop_id: string (Shopify myshopify.com domain)
  access_token: string (encrypted OAuth token)
  scopes: string[] (permissions granted)
  connection_status: "connected" | "disconnected" | "error"
  last_sync_at: timestamp
  initial_sync_complete: boolean
  sync_frequency: "realtime" | "hourly" | "daily"
}
```

**Order entity mapping:**
```
Order {
  external_id: string (Shopify order ID)
  source_platform: "shopify"
  order_number: string (Shopify order number like #1001)
  created_at: timestamp
  total_value: decimal
  ...
  // All Shopify order fields mapped to BeProfit's unified order model
}
```

## Limitations & Gaps Identified
[What's missing in Shopify integration that could be improved?]

- No two-way sync (e.g., can't update Shopify inventory from BeProfit)
- No abandoned cart tracking (potential revenue recovery feature)
- No Shopify Marketing data sync (email campaign performance)
- Multi-location inventory support unclear

## Relevance to Our Build
[7-10 actionable insights specifically for our Shopify integration:
- What to prioritize in our Shopify integration
- What data is essential vs nice-to-have
- How to position our Shopify integration vs BeProfit's
- Opportunities to exceed BeProfit's Shopify capabilities (e.g., better POS support, two-way sync)
- OAuth flow best practices
]
```

**Key research questions:**
- What exact OAuth scopes does BeProfit request?
- Is sync real-time (webhooks) or batch?
- Does BeProfit support Shopify POS sales?
- How does BeProfit handle multi-currency orders?
- Are Shopify Payments fees auto-imported?
- What's the Shopify App Store rating and review sentiment?
- How far back does initial sync pull data?

**Expected output:** 500-700 line markdown file with exhaustive Shopify integration documentation.

- [ ] Checkpoint: Step 2 complete

### Step 3: Research WooCommerce Integration (File 033)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-033.md` (CREATE)

Browse the following sources for WooCommerce integration details:
- **Help Center search:** "WooCommerce"
- **BeProfit Help Center:** Check Integrations category for WooCommerce article
- **BeProfit Marketing Site:** Look for WooCommerce landing page or mentions
- **WordPress.org Plugin Directory:** Search for "BeProfit" to see if there's a WordPress plugin
- **Cross-reference file 032:** Compare WooCommerce capabilities to Shopify (differences, limitations)

**Research methodology:**
1. Document connection setup (differs from Shopify since WooCommerce is self-hosted):
   - Does BeProfit use WooCommerce REST API?
   - Does it require a WordPress plugin installation?
   - What credentials are needed (API keys, site URL)?
2. Catalog data synced (same categories as Shopify: orders, products, customers, refunds)
3. Note WooCommerce-specific considerations:
   - WooCommerce is self-hosted (not SaaS) — any hosting requirements?
   - Payment gateway variety (Stripe, PayPal, etc.) — how does BeProfit handle?
   - WooCommerce Subscriptions support?
4. Compare to Shopify integration:
   - What works the same?
   - What's different or limited?
   - Is WooCommerce a "second-class citizen" or equally supported?

**Document structure:**

```markdown
# BeProfit WooCommerce Integration

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / E-Commerce Platforms / WooCommerce
- **Date Captured:** [date]

---

## WooCommerce Support Overview
[Document BeProfit's positioning for WooCommerce users — is it equally prominent to Shopify, or less featured?]

## Connection Setup

### Prerequisites
[What user needs: WooCommerce site URL, admin access, minimum WooCommerce version, WordPress version, SSL requirement?]

### Plugin Installation (if applicable)
[Does BeProfit require a WordPress plugin to be installed, or does it connect via REST API only?]

### Connection Flow
[Step-by-step walkthrough — likely involves generating WooCommerce REST API keys]

**UI Flow:**
```
1. User navigates to Settings → Integrations → WooCommerce
2. Enters WooCommerce site URL (e.g., https://mystore.com)
3. Either:
   a. Redirected to WooCommerce site to authorize API keys
   OR
   b. Instructed to manually generate API keys in WooCommerce → Settings → Advanced → REST API
4. Enters Consumer Key and Consumer Secret in BeProfit
5. BeProfit tests connection (pings /wp-json/wc/v3/orders endpoint)
6. Initial data sync begins
```

### API Credentials
[WooCommerce REST API keys — Consumer Key and Consumer Secret, read vs read/write permissions]

### Initial Sync
[How long? How far back historically?]

## Data Synced FROM WooCommerce

### Order Data
[Similar to Shopify — list order fields]

**Key differences from Shopify to note:**
- WooCommerce order statuses (processing, completed, refunded) may differ from Shopify
- Payment gateways (Stripe, PayPal, etc.) are third-party plugins — does BeProfit detect which gateway was used?

### Product Data
[Product fields synced — may be similar to Shopify]

### Customer Data
[Customer fields — WooCommerce customer model differs slightly from Shopify]

### Refund Data
[Refund handling in WooCommerce]

### Payment Gateway Fees
[How does BeProfit handle payment processing fees in WooCommerce? Stripe fees, PayPal fees — are they auto-imported or manual entry?]

## Sync Direction & Frequency
[One-way or two-way? Real-time webhooks or batch sync?]

**Note:** WooCommerce webhooks exist but may be less reliable than Shopify webhooks due to self-hosted nature.

## WooCommerce-Specific Features

### WooCommerce Subscriptions Support
[Does BeProfit support WooCommerce Subscriptions extension for recurring revenue tracking?]

### Multi-Currency Support
[How does BeProfit handle multi-currency in WooCommerce (via WPML, Aelia Currency Switcher, etc.)?]

### Variable Products
[How does BeProfit handle WooCommerce variable products (equivalent to Shopify variants)?]

## Differences from Shopify Integration

### Setup Complexity
[Is WooCommerce setup more complex (manual API keys vs OAuth)?]

### Data Sync Reliability
[Is sync less reliable due to self-hosted nature, server configurations, firewall issues?]

### Feature Parity
[Are any BeProfit features NOT available for WooCommerce users that ARE available for Shopify?]

## Known Limitations

### Self-Hosted Challenges
[Firewall/server configuration issues, SSL requirements, API throttling on shared hosting]

### Data NOT Synced
[Similar to Shopify — abandoned carts, draft orders, etc.]

### Plugin Conflicts
[Any documented conflicts with other WooCommerce plugins?]

## Troubleshooting
[Common WooCommerce-specific issues: API key errors, SSL certificate errors, hosting timeout issues]

## Inferred UI Elements
[WooCommerce connection card, site URL input field, API key input fields (consumer key/secret), connection test button]

## Data Model Implications
[Similar to Shopify but with `source_platform: "woocommerce"` and different external ID format]

## Limitations & Gaps Identified
[What's missing or weaker than Shopify integration?]

## Relevance to Our Build
[7-10 actionable insights for WooCommerce integration:
- How to make WooCommerce setup easier than BeProfit's
- Payment gateway fee auto-import as a differentiator
- Self-hosted reliability challenges to solve
- WooCommerce user segment to target
]
```

**Key research questions:**
- Does BeProfit use a WordPress plugin or just REST API?
- Is setup more complex than Shopify?
- How does BeProfit handle diverse WooCommerce payment gateways?
- Is WooCommerce sync less reliable due to self-hosting?
- Does BeProfit support WooCommerce Subscriptions?
- Are there known hosting compatibility issues?

**Expected output:** 400-600 line markdown file documenting WooCommerce integration with emphasis on differences from Shopify.

- [ ] Checkpoint: Step 3 complete

### Step 4: Research Amazon Integration (File 034)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-034.md` (CREATE)

Browse the following sources for Amazon Seller integration details:
- **Help Center search:** "Amazon"
- **BeProfit Help Center:** Check Integrations category for Amazon article
- **BeProfit Marketing Site:** Look for Amazon seller positioning
- **Cross-reference files 031-032:** Compare Amazon integration maturity to Shopify/WooCommerce

**Research methodology:**
1. Document Amazon Seller Central connection:
   - Does BeProfit use Amazon MWS API or newer Amazon SP-API?
   - What credentials are needed (MWS Auth Token, AWS keys)?
   - Does it support Amazon Seller Central only, or also Vendor Central?
2. Catalog Amazon-specific data synced:
   - Orders (FBA vs FBM)
   - Amazon fees (referral fees, FBA fees, storage fees)
   - Returns and refunds (A-to-Z claims, customer returns)
   - Advertising (Amazon Ads — may be separate integration)
3. Note multi-marketplace support:
   - Does BeProfit support multiple Amazon marketplaces (US, CA, UK, EU, etc.) from one connection?
   - How are marketplace fees and currencies handled?
4. Document Amazon-specific profit calculation:
   - FBA fees are critical to profit calculation for Amazon sellers
   - How does BeProfit capture and attribute these fees?

**Document structure:**

```markdown
# BeProfit Amazon Integration

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / E-Commerce Platforms / Amazon
- **Date Captured:** [date]

---

## Amazon Seller Support Overview
[Document BeProfit's positioning for Amazon sellers — how prominent is Amazon support?]

## Connection Setup

### Prerequisites
[What user needs: Amazon Seller Central account, Professional Seller account requirement?, API access permissions]

### API Used
[Does BeProfit use Amazon MWS (legacy) or Amazon SP-API (newer)? This affects capabilities and longevity.]

### Connection Flow
[Step-by-step walkthrough of connecting Amazon Seller Central]

**UI Flow:**
```
1. User navigates to Settings → Integrations → Amazon
2. Enters Seller ID and MWS Auth Token (or AWS credentials for SP-API)
3. Selects primary marketplace (e.g., US, UK, DE)
4. (Optional) Selects additional marketplaces to sync
5. BeProfit tests connection and requests data access permissions
6. Initial data sync begins (may be slow due to Amazon API rate limits)
```

### API Credentials
[MWS Auth Token, AWS Access Key, AWS Secret Key, Seller ID, Marketplace IDs]

### Initial Sync
[How long for Amazon sync? Amazon API has strict rate limits — does this slow down sync?]

## Data Synced FROM Amazon

### Order Data (FBA vs FBM)
[Document both Fulfilled by Amazon (FBA) and Fulfilled by Merchant (FBM) orders]

**FBA Order Fields:**
- Order ID, Order date, Order status
- Product ASIN, SKU, Quantity, Price
- Amazon referral fee (percentage, typically 8-15% depending on category)
- FBA fulfillment fee
- FBA storage fee (allocated per unit if monthly)
- Shipping revenue (if applicable)
- Customer location (city, state, country)

**FBM Order Fields:**
- Similar to FBA but without FBA fees
- Merchant-fulfilled shipping costs (if tracked)

### Amazon Fees (Critical for Profit Calculation)
[Comprehensive list of Amazon fees that must be tracked]

**Fee types:**
- Referral fee (8-15% of sale price, category-dependent)
- FBA fulfillment fee (per-unit pick & pack fee, size/weight-based)
- FBA storage fee (monthly, per cubic foot)
- Long-term storage fee (for inventory aged 365+ days)
- FBA disposal/removal fees (if applicable)
- Advertising fees (if Amazon Ads are integrated — may be separate)
- Subscription fee (Professional Seller: $39.99/month)

**How fees are synced:**
- Real-time per-order fees (referral, fulfillment) — likely synced with each order
- Monthly fees (storage) — how are these allocated to products/orders?

### Product Data
[Amazon catalog data synced]

- ASIN, SKU, Product title
- Current inventory level (FBA vs FBM)
- Product cost (if set by seller)

### Returns & Refunds
[Amazon return handling]

- Customer returns (reason, condition, restocking fee)
- A-to-Z Guarantee claims
- Chargebacks
- Impact on profit calculation (returned item fees, restocked inventory)

### Amazon Ads Data
[Does Amazon Seller integration include Amazon Ads (Sponsored Products, Sponsored Brands)?]

**If included:**
- Ad spend per campaign
- Advertising Cost of Sale (ACoS)
- Attribution to orders

**If separate:**
- Note that Amazon Ads may be a separate integration (cross-reference file 038 - Other Ad Platform Integrations)

## Multi-Marketplace Support

### Marketplace Coverage
[Which Amazon marketplaces are supported?]

- North America: US, CA, MX
- Europe: UK, DE, FR, IT, ES
- Asia-Pacific: JP, AU, IN, SG

### Multi-Marketplace Consolidation
[If a seller operates on multiple marketplaces (e.g., US + UK), does BeProfit consolidate profit across markets or show separately?]

### Currency Handling
[Each marketplace has its own currency — how does BeProfit convert and report?]

## Sync Direction & Frequency

### Sync Direction
[One-way (Amazon → BeProfit only)]

### Sync Frequency
[Batch sync due to Amazon API rate limits — likely daily or hourly at best]

**Note:** Amazon does NOT provide webhooks like Shopify, so sync is batch-based.

### Rate Limits
[Amazon MWS/SP-API has strict rate limits — does this affect data freshness?]

## Amazon-Specific Profit Calculation

### FBA Fee Allocation
[How does BeProfit allocate FBA fees to each order?]

**Example:**
- Referral fee: Per-order (easy to allocate)
- FBA fulfillment fee: Per-order (easy to allocate)
- FBA storage fee: Monthly total — does BeProfit divide by units sold that month? Or allocate based on inventory levels?

### Net Profit After Amazon Fees
[Does BeProfit show "Amazon Profit" as a separate metric?]

## Known Limitations

### Data NOT Synced
[What Amazon data is NOT accessible or not synced?]

- Amazon Vendor Central (if BeProfit only supports Seller Central)
- Amazon Handmade, Amazon Merch (specialized programs)
- Amazon customer email addresses (Amazon hides customer PII)

### API Rate Limits
[Amazon API rate limits may cause delayed sync — is this documented as a limitation?]

### Historical Data
[How far back can initial sync go? Amazon API may limit historical data access to 90 days or 1 year.]

## Troubleshooting
[Common Amazon-specific issues: API credential errors, marketplace mismatch, rate limit errors]

## Inferred UI Elements
[Amazon connection card, Seller ID input, MWS Auth Token input, marketplace selector (multi-select), FBA fee breakdown table]

## Data Model Implications

**Amazon-specific fields in Order model:**
```
Order {
  source_platform: "amazon"
  amazon_order_id: string
  fulfillment_type: "FBA" | "FBM"
  asin: string
  marketplace_id: string (e.g., "ATVPDKIKX0DER" for US)
  fees: {
    referral_fee: decimal
    fba_fulfillment_fee: decimal
    fba_storage_fee_allocated: decimal (monthly fee divided)
  }
}
```

## Limitations & Gaps Identified
[What's missing in Amazon integration?]

- No Amazon Vendor Central support (if true)
- No real-time sync (API rate limits)
- Storage fee allocation methodology unclear
- Amazon Ads may be separate or not supported

## Relevance to Our Build
[7-10 actionable insights for Amazon integration:
- FBA fee tracking is CRITICAL for Amazon sellers — must be accurate
- Multi-marketplace consolidation is a key feature
- Storage fee allocation methodology to define (per-unit, per-SKU, or monthly pool)
- Amazon Ads integration as a differentiator (if BeProfit doesn't include it)
- Handling Amazon API rate limits gracefully
]
```

**Key research questions:**
- Does BeProfit use MWS or SP-API?
- Are FBA fees automatically pulled and accurately allocated?
- Does BeProfit support multiple Amazon marketplaces in one connection?
- Is Amazon Ads (Sponsored Products) included in this integration or separate?
- How are monthly storage fees allocated to individual orders/products?
- Does BeProfit support Amazon Vendor Central (1P) or only Seller Central (3P)?

**Expected output:** 500-700 line markdown file documenting Amazon integration with heavy emphasis on FBA fees and multi-marketplace support.

- [ ] Checkpoint: Step 4 complete

### Step 5: Update PRD Part 03 Progress
**Files:** `prd/detailed_prd_part_03.md` (MODIFY — Progress section only)

After completing files 031-034, update the PRD Part 03 Progress section to log this task's work:

```markdown
## Progress

### Task 009 - [DATE]
- Status: COMPLETED
- Summary: Created first batch of integration research covering ecosystem overview and 3 major e-commerce platforms (Shopify, WooCommerce, Amazon)
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-031.md` (~NNN lines — Integration Ecosystem Overview)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-032.md` (~NNN lines — Shopify Integration Deep Dive)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-033.md` (~NNN lines — WooCommerce Integration)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-034.md` (~NNN lines — Amazon Integration)

### Cumulative Progress
- [x] Task 1: Integration Ecosystem Overview - completed in Task 009
- [x] Task 2: Shopify Integration - completed in Task 009
- [x] Task 3: WooCommerce Integration - completed in Task 009
- [x] Task 4: Amazon Integration - completed in Task 009
- [ ] Task 5: Facebook/Meta Ads Integration - NOT STARTED
- [ ] Task 6: Google Ads Integration - NOT STARTED
- [ ] Task 7: TikTok Ads Integration - NOT STARTED
- [ ] Task 8: Other Ad Platform Integrations - NOT STARTED
- [ ] Task 9: Klaviyo Integration - NOT STARTED
- [ ] Task 10: Other Email/SMS Integrations - NOT STARTED
- [ ] Task 11: Shipping Platform Integrations - NOT STARTED
- [ ] Task 12: Accounting & Other Integrations - NOT STARTED
- [ ] Task 13: Data Sync & Refresh Documentation - NOT STARTED
- [ ] Task 14: Integration Comparison Matrix - NOT STARTED
- [ ] Task 15: Checkpoint Review #3 - NOT STARTED

### Remaining Work for This PRD
11 of 15 tasks remaining (Tasks 5-15). Estimated 2-3 more tasks to complete PRD Part 03.
```

Use the Edit tool to update ONLY the Progress section of the PRD file. Do NOT modify other sections.

- [ ] Checkpoint: Step 5 complete

## Help Center Articles to Browse

**Integrations (category — to be discovered):**
1. Integration overview/list page (if exists)
2. Shopify integration article (likely titled "How to Connect Shopify" or "Shopify Integration")
3. WooCommerce integration article
4. Amazon integration article

**External sources:**
1. Shopify App Store: https://apps.shopify.com/ (search "BeProfit")
2. WordPress.org Plugin Directory: https://wordpress.org/plugins/ (search "BeProfit")
3. BeProfit Marketing Site: https://beprofit.co/ (look for integrations page, Shopify/WooCommerce/Amazon landing pages)

**Cross-reference:**
1. `prd/manually-added-dump-from-real-dashboard.md` — Settings pages showing integration cards

**Estimated browsing effort:** 10-15 web pages (3-4 Help Center articles, 2-3 app store/plugin listings, 3-5 marketing site pages, 2-3 external searches).

## Acceptance Criteria
- [ ] `beprofit-casestudy-info-031.md` exists with comprehensive integration catalog (tables of all integrations by category), tier analysis, and native vs third-party breakdown
- [ ] `beprofit-casestudy-info-032.md` exists with exhaustive Shopify integration documentation covering OAuth flow, data sync details, POS support, Shopify App Store presence, and comparison basis for other e-commerce platforms
- [ ] `beprofit-casestudy-info-033.md` exists with WooCommerce integration documentation emphasizing differences from Shopify (setup complexity, self-hosted challenges, payment gateway variety)
- [ ] `beprofit-casestudy-info-034.md` exists with Amazon integration documentation emphasizing FBA fees, multi-marketplace support, and Amazon-specific profit calculations
- [ ] All files follow the established template format (Source, main sections, Inferred UI Elements, Data Model Implications, Limitations & Gaps, Relevance to Our Build)
- [ ] Per-integration capture checklist items are addressed for Shopify, WooCommerce, and Amazon (data synced, sync direction, sync frequency, setup complexity, limitations, tier requirements, authentication method)
- [ ] PRD Part 03 progress updated showing Tasks 1-4 complete, 11 tasks remaining

## Notes
- This is the first batch of PRD Part 03. The PRD has 15 tasks total; this task covers the first 4 (27%).
- File 031 (Integration Ecosystem Overview) serves as the master catalog and reference point for all subsequent integration files.
- File 032 (Shopify) is the most important and should be the most comprehensive, as Shopify is likely BeProfit's primary platform.
- Files 033 (WooCommerce) and 034 (Amazon) should explicitly compare to Shopify integration to highlight differences, limitations, or feature parity.
- The next task (010) will likely cover ad platform integrations (Facebook Ads, Google Ads, TikTok Ads, Other Ad Platforms) — Tasks 5-8.
- Task 011 or 012 will cover email/SMS, shipping, accounting integrations plus data sync documentation and checkpoint review — Tasks 9-15.

---
## Completion

**Status:** COMPLETED
**Date:** 2026-02-13
**PRD Part:** 03
**Summary:** Created comprehensive integration research documentation covering BeProfit's integration ecosystem overview and deep-dive documentation for the three primary e-commerce platforms (Shopify, WooCommerce, Amazon).

### Requirements Completed by This Task
- [x] Task 1: Integration Ecosystem Overview (file 031, 538 lines)
- [x] Task 2: Shopify Integration Deep Dive (file 032, 834 lines)
- [x] Task 3: WooCommerce Integration (file 033, 795 lines)
- [x] Task 4: Amazon Integration (file 034, 931 lines)

### PRD Status After This Task
- Requirements completed by this task: 4
- Total PRD requirements completed (cumulative): 4
- Requirements remaining: 11 (Tasks 5-15)
- PRD completion: ONGOING

### Files Created
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-031.md` (538 lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-032.md` (834 lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-033.md` (795 lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-034.md` (931 lines)

Total: 3,098 lines of comprehensive integration research documentation
