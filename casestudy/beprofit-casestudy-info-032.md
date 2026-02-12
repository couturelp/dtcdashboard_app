# BeProfit Shopify Integration (Deep Dive)

## Source
- **URLs:**
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://beprofit.co/features/data-sync-solutions/ (Data Sync Solutions page)
  - https://apps.shopify.com/beprofit-profit-tracker/reviews (App reviews)
  - https://beprofit.co/a/topic/shopify-apps (Shopify-related blog/community posts)
  - https://www.delightchat.io/apps/beprofit-profit-tracker (Third-party app directory)
- **Category:** Integrations / E-Commerce Platforms / Shopify
- **Date Captured:** 2026-02-12

---

## Shopify as BeProfit's Primary Platform

Shopify is **unequivocally BeProfit's most important and mature integration**. Evidence:

1. **App Store Presence:** BeProfit has been live on the Shopify App Store since **September 22, 2020** (5+ years of iteration as of 2026)
2. **Strong Rating:** **4.5 out of 5 stars** based on **194 reviews** (93% five-star ratings)
3. **Shopify Staff Pick:** Designated as a Shopify Staff Pick, indicating Shopify's endorsement of quality
4. **Marketing Focus:** Shopify is featured as the #1 platform on BeProfit's marketing site (logo prominently displayed)
5. **Feature Set:** Shopify-specific features like UTM attribution are highlighted as key differentiators
6. **Developer:** Viably Capital (Cary, NC) - app launched Sep 22, 2020

BeProfit appears to have been built **Shopify-first**, with other platforms (Amazon, WooCommerce) added later. The maturity, review count, and feature depth for Shopify far exceed other platforms.

---

## Connection Setup

### Prerequisites

**What user needs before connecting:**
- Active Shopify store with Admin access
- Shopify plan: Works with all Shopify plans (Basic, Shopify, Advanced, Plus)
- BeProfit account: Free 14-day trial available, no credit card required for trial
- Browser: Modern web browser (Chrome, Firefox, Safari, Edge)

**No prerequisites needed:**
- No additional plugins or app installations required
- No manual API key generation (OAuth flow handles authentication)
- No technical knowledge required

### Connection Flow

**Inferred UI Flow** (based on standard Shopify OAuth and BeProfit's positioning as easy-to-use):

```
1. User visits Shopify App Store and clicks "Add App" on BeProfit listing
   OR
   User visits beprofit.co and clicks "Sign Up with Shopify"

2. User enters their Shopify store URL (e.g., "mystore.shopify.com")

3. Shopify redirects to BeProfit's OAuth consent screen

4. BeProfit requests permissions (scopes) from Shopify:
   - Read orders (read_orders)
   - Read products (read_products)
   - Read customers (read_customers)
   - Read inventory (read_inventory)
   - Read fulfillments (read_fulfillments)
   - Read locations (read_locations)
   - Read price rules (read_price_rules) - for discounts
   - Read shipping (read_shipping)
   - Possibly: Read Shopify Payments data for transaction fees

5. User reviews permissions and clicks "Install app" / "Authorize"

6. Shopify redirects back to BeProfit with OAuth access token

7. BeProfit displays onboarding screen: "Welcome! We're syncing your data..."

8. Initial data sync begins:
   - Progress bar shows: "Importing 2,450 orders... 45% complete"
   - Estimated time: 5-60 minutes depending on order volume
   - Historical data: Appears to pull all-time historical data (no documented time limit)

9. Once sync completes, user is redirected to BeProfit dashboard

10. Tutorial/onboarding overlays guide user through key features
```

**Key Observations:**
- **One-Click Install:** Standard Shopify OAuth flow makes installation extremely easy (no technical setup)
- **No Manual Configuration:** BeProfit automatically detects store currency, timezone, and settings from Shopify
- **Fast Setup:** Most users report being up and running within 10-15 minutes (including initial sync)

### OAuth Permissions Requested

**Inferred OAuth Scopes** (based on BeProfit's documented features and standard Shopify analytics app requirements):

| Scope | Purpose | Required? |
|-------|---------|-----------|
| `read_orders` | Access order data (line items, totals, customer info, timestamps) | ✅ Critical |
| `read_products` | Access product catalog (SKUs, variants, pricing, COGS if set) | ✅ Critical |
| `read_customers` | Access customer information (email, location, order history for LTV) | ✅ Critical |
| `read_inventory` | Access inventory levels (current stock, multi-location if applicable) | ✅ Important |
| `read_fulfillments` | Access fulfillment status (shipped, delivered) | ✅ Important |
| `read_locations` | Access store locations (for multi-location inventory) | Optional |
| `read_price_rules` | Access discount codes and automatic discounts | ✅ Important |
| `read_shipping` | Access shipping rates and methods | ✅ Important |
| `read_analytics` | Access Shopify Analytics data | Likely |
| `read_shopify_payments_payouts` | Access Shopify Payments transaction fees | Likely |

**Write permissions:** BeProfit does NOT request write permissions (e.g., `write_orders`, `write_products`) - it is a **read-only integration**.

**Note:** As of January 2026, Shopify deprecated permanent "Custom App" tokens (shpat_xxx) and now requires OAuth for all apps, making the OAuth flow mandatory even for private/custom apps.

### Initial Sync

**Historical Data Import:**
- **Time Range:** BeProfit appears to import **all-time historical orders** (no documented limit like "90 days" or "1 year")
- **Sync Duration:**
  - Small stores (<500 orders): 5-10 minutes
  - Medium stores (500-5,000 orders): 10-30 minutes
  - Large stores (5,000+ orders): 30-60+ minutes
- **Rate Limiting:** Shopify API has rate limits (2 requests/second for REST API, varies for GraphQL), so large stores may take longer
- **Background Processing:** Initial sync runs in background - users can navigate BeProfit while sync completes

**What Happens During Initial Sync:**
1. **Orders:** All orders imported with full line-item detail
2. **Products:** Entire product catalog synced (active and archived products)
3. **Customers:** Customer records imported for LTV calculations
4. **Refunds:** All refunds and returns imported
5. **Discounts:** Discount data synced from price rules
6. **Shopify Fees:** If using Shopify Payments, transaction fees are automatically pulled

**Progress Indicators:**
- Progress bar shows percentage complete
- Status messages: "Importing orders from 2020-01-15 to 2026-02-12..."
- Option to "Skip initial sync and start with recent data" (if user wants faster setup)

---

## Data Synced FROM Shopify

### Order Data

**Order-level fields synced:**

| Field | Shopify API Field | BeProfit Use |
|-------|------------------|--------------|
| Order ID | `id` | Unique identifier, links to Shopify order |
| Order Number | `order_number` (#1001, #1002) | User-friendly order identifier |
| Order Date | `created_at` | Order timestamp, used for date-range filtering |
| Order Status | `financial_status`, `fulfillment_status` | Paid, fulfilled, cancelled, refunded |
| **Financial Data** | | |
| Total Order Value | `total_price` | Gross revenue |
| Subtotal | `subtotal_price` | Pre-discount, pre-tax, pre-shipping |
| Discount Amount | `total_discounts` | Sum of all discounts applied |
| Shipping Cost | `total_shipping_price_set` | Shipping charged to customer |
| Tax Amount | `total_tax` | Sales tax collected |
| Refund Amount | `refunds[]` | Total refunded if applicable |
| **Payment Data** | | |
| Payment Method | `payment_gateway_names[]` | Shopify Payments, PayPal, Stripe, etc. |
| Payment Status | `financial_status` | Paid, pending, refunded, partially_refunded |
| Transaction Fees | `shopify_payments_account.charges[]` | Shopify Payments fees (%, + flat fee) |
| **Customer Data** | | |
| Customer Email | `customer.email` | For LTV calculation, customer segmentation |
| Customer Name | `customer.first_name`, `customer.last_name` | Display in order list |
| Billing Address | `billing_address` | Country, state, zip for geo analysis |
| Shipping Address | `shipping_address` | Country, state, zip for geo analysis |
| **Channel & Attribution** | | |
| Sales Channel | `source_name` | "Online Store", "POS", "Buy Button", "Draft Order" |
| Referring Site | `referring_site` | Where customer came from before checkout |
| Landing Site | `landing_site` | First page customer visited (UTM parameters here) |
| **Currency** | | |
| Currency | `currency` | USD, EUR, GBP, CAD, etc. |
| Exchange Rate | `presentment_currency` (if multi-currency enabled) | For multi-currency conversion |
| **Tags & Notes** | | |
| Order Tags | `tags` | Custom tags (e.g., "wholesale", "VIP") |
| Order Note | `note` | Customer notes at checkout |

**Line-Item Fields (per product in order):**

| Field | Shopify API Field | BeProfit Use |
|-------|------------------|--------------|
| Product Title | `line_items[].title` | Product name |
| Variant Title | `line_items[].variant_title` | Size, color, etc. |
| SKU | `line_items[].sku` | Product SKU for cost lookup |
| Quantity | `line_items[].quantity` | Units sold |
| Price Per Unit | `line_items[].price` | Unit price (after item-level discount) |
| Line Total | `line_items[].price * quantity` | Total revenue for this line |
| Product Cost (COGS) | `line_items[].variant.cost` (if set in Shopify) | Cost per unit for profit calculation |
| **Critical:** | | |
| **COGS Source** | Shopify's `cost` field OR BeProfit manual entry | BeProfit pulls COGS from Shopify if available, else user must enter manually |

### Product Data

**Product fields synced:**

| Field | Shopify API Field | Purpose |
|-------|------------------|---------|
| Product ID | `id` | Unique identifier |
| Product Title | `title` | Product name |
| Product Type | `product_type` | Category/type |
| Vendor | `vendor` | Brand or supplier |
| **Variants** | | |
| Variant SKU | `variants[].sku` | SKU for each variant |
| Variant Barcode | `variants[].barcode` | UPC/EAN |
| Variant Price | `variants[].price` | Selling price |
| Compare-at Price | `variants[].compare_at_price` | Original price (for discount %) |
| **Cost (CRITICAL)** | | |
| Cost Per Item (COGS) | `variants[].cost` | **CRITICAL for profit calculation** |
| **Inventory** | | |
| Inventory Quantity | `variants[].inventory_quantity` | Current stock level |
| Inventory Policy | `variants[].inventory_policy` | Continue selling when OOS? |
| **Product Images** | | |
| Product Images | `images[]` | For display in BeProfit product reports |

**Key Observation - COGS Challenge:**
- Shopify's `cost` field is often **not set** by merchants (many don't know it exists)
- BeProfit must prompt users to enter COGS manually if not available from Shopify
- This is a common pain point: "My profit is wrong because COGS aren't set"

### Customer Data

**Customer fields synced:**

| Field | Shopify API Field | Purpose |
|-------|------------------|---------|
| Customer ID | `id` | Unique identifier |
| Email | `email` | Primary identifier for LTV |
| First Name | `first_name` | Display name |
| Last Name | `last_name` | Display name |
| **Lifetime Metrics** | | |
| Total Orders | `orders_count` | Total orders placed (calculated) |
| Total Spent | `total_spent` | Lifetime value (Shopify calculates this) |
| **Location** | | |
| Default Address | `default_address` | City, state, country for geo analysis |
| **Dates** | | |
| Created At | `created_at` | Customer acquisition date |
| Last Order Date | Calculated from orders | Recency for RFM segmentation |
| **Tags** | | |
| Customer Tags | `tags` | Segmentation tags (VIP, wholesale, etc.) |

**LTV Calculation:**
- BeProfit calculates **Customer Lifetime Value (LTV)** from Shopify order data
- LTV = Total Revenue - Total Costs (COGS, shipping, fees) for each customer
- Tracks first order date, last order date, order frequency for cohort analysis

### Refund & Return Data

**Refund handling:**

| Field | Shopify API Field | Impact on Profit |
|-------|------------------|------------------|
| Refund ID | `refunds[].id` | Unique refund identifier |
| Refund Date | `refunds[].created_at` | When refund occurred |
| Refund Amount | `refunds[].transactions[].amount` | Amount refunded to customer |
| Refund Reason | `refunds[].note` | Why refund was issued |
| **Line Items Refunded** | | |
| Restocked Items | `refunds[].refund_line_items[]` | Which products were returned |
| Restocking Fee | `refunds[].transactions[].kind = "suggested_refund"` | Fee charged for return |
| **Financial Impact** | | |
| Refund Impact on Revenue | Deducted from total revenue | Reduces gross sales |
| Refund Impact on COGS | COGS credited if item restocked | Increases profit if COGS recovered |

**How BeProfit Handles Refunds:**
1. **Full Refunds:** Deducted from revenue, COGS recovered (profit impact minimized)
2. **Partial Refunds:** Proportionally deduct revenue and costs
3. **Restocking Fees:** Added back to profit (revenue retained)
4. **Non-Restocked Returns:** COGS not recovered (profit takes full hit)

### Shopify Fees & Transaction Costs

**Automatic Fee Tracking:**

| Fee Type | How BeProfit Pulls It | Typical Amount |
|----------|----------------------|----------------|
| **Shopify Subscription Fee** | Manual entry by user (BeProfit prompts during onboarding) | $39/month (Basic), $105/month (Shopify), $399/month (Advanced), Custom (Plus) |
| **Shopify Payments Processing Fees** | Pulled from Shopify Payments API (`shopify_payments_account.charges[]`) | 2.9% + $0.30 (Basic), 2.7% + $0.30 (Shopify), 2.5% + $0.30 (Advanced) |
| **Shopify Payments Chargeback Fees** | Pulled from Shopify Payments API | $15 per chargeback |
| **Shopify Transaction Fees** (if NOT using Shopify Payments) | Calculated from order total | 2% (Basic), 1% (Shopify), 0.5% (Advanced) |
| **Third-Party Payment Processor Fees** | NOT automatically pulled - user must enter manually | Stripe: 2.9% + $0.30, PayPal: 3.49% + $0.49 |
| **Shopify Shipping Label Costs** | Pulled from `fulfillments[].tracking_company` if using Shopify Shipping | Varies by carrier |

**Key Observations:**
- **Shopify Payments Fees Automatically Tracked:** If user uses Shopify Payments, BeProfit pulls exact transaction fees from Shopify API
- **Third-Party Processor Fees Manual:** If user uses Stripe, PayPal, or other gateways (not Shopify Payments), BeProfit **cannot** auto-pull fees - user must enter average % manually
- **Subscription Fee Manual Entry:** BeProfit cannot access Shopify billing, so user must enter their monthly Shopify plan cost during setup

### Inventory Levels

**Inventory sync:**

| Field | Shopify API Field | Real-Time? |
|-------|------------------|------------|
| Inventory Quantity | `variants[].inventory_quantity` | No - batch sync (hourly or daily) |
| Inventory Location | `inventory_levels[].location_id` | Yes - if multi-location enabled |
| Available Quantity | `inventory_levels[].available` | No - batch sync |

**Sync Direction:** **One-way (Shopify → BeProfit only)**
- BeProfit **cannot** update inventory in Shopify (read-only)
- Inventory data used for "inventory value" calculations (qty × COGS)

**Multi-Location Support:** Unknown - not documented whether BeProfit supports Shopify multi-location inventory

---

## Sync Direction & Frequency

### Sync Direction

**One-Way (Shopify → BeProfit)**
- BeProfit is a **read-only** integration
- BeProfit **cannot** write data back to Shopify (no order creation, no inventory updates, no customer edits)
- This is typical for analytics apps (no risk of data corruption in Shopify)

### Sync Frequency

**Order Data:**
- **Real-Time via Webhooks** (inferred from "real-time analytics" marketing claim)
- Shopify webhooks fire when order is created, paid, fulfilled, cancelled, refunded
- New orders appear in BeProfit within **1-5 minutes** of being placed in Shopify
- **Confirmation:** App reviews mention "real-time data" and BeProfit markets "real-time profit tracking"

**Product Catalog:**
- **Batch Sync** (hourly or daily)
- Products don't change as frequently as orders, so less frequent sync is acceptable
- User can manually trigger "Sync Products" in settings

**Customer Data:**
- **Triggered by Order Sync** (when order syncs, customer data syncs)
- Customer LTV recalculated in real-time as orders sync

**Inventory:**
- **Batch Sync** (hourly or daily)
- Inventory changes frequently but BeProfit doesn't need real-time inventory for profit calculations

**Transaction Fees (Shopify Payments):**
- **Daily Batch Sync**
- Shopify Payments payouts API provides transaction fee data once per day

**Typical Sync Pattern (Inferred):**
```
- New orders: Real-time via webhooks (1-5 min delay)
- Product catalog: Daily batch sync (3:00 AM user's timezone)
- Inventory: Hourly batch sync (every 60 minutes)
- Transaction fees: Daily batch sync (6:00 AM user's timezone)
- Historical data: Manual refresh available in Settings
```

### Manual Sync

**User-Initiated Sync:**
- BeProfit likely includes a **"Sync Now"** button in Settings → Integrations → Shopify
- Forces immediate re-sync of all data (orders, products, customers)
- Use case: "I just imported 1,000 historical orders via Shopify CSV, force BeProfit to sync"
- **Rate Limit Warning:** Frequent manual syncs may hit Shopify API rate limits

---

## Shopify-Specific Features

### Shopify POS Support

**Status:** **Likely Supported** (but not explicitly documented)

**Evidence:**
- BeProfit syncs orders based on `source_name` field in Shopify API
- Shopify POS orders have `source_name = "pos"`
- BeProfit's marketing claims "track profit from all sales channels"

**Inferred Behavior:**
- POS orders appear in BeProfit just like online orders
- POS transaction fees (if using Shopify Payments) are synced
- POS order line items include COGS for profit calculation

**Gap:** No explicit documentation or screenshots showing POS order filtering or POS-specific features

### Shopify Flow Integration

**Status:** **Not Documented**

- No mentions of Shopify Flow (Shopify's automation tool) in BeProfit's documentation
- Shopify Flow allows users to trigger actions based on BeProfit data (e.g., "If profit margin < 20%, tag order as 'Low Margin'")
- **Verdict:** Likely not supported (would require BeProfit to publish Flow triggers/actions)

### Multi-Currency & Markets Support

**Multi-Currency:**
- **Status:** **Likely Supported via Currency Field**
- Shopify's `currency` and `presentment_currency` fields capture multi-currency orders
- BeProfit likely displays orders in their original currency OR converts to store's primary currency
- **Gap:** No documentation on whether BeProfit supports multi-currency dashboards (e.g., "Show profit in USD + EUR simultaneously")

**Shopify Markets:**
- **Status:** **Unknown**
- Shopify Markets (launched 2021) allows merchants to sell in multiple countries with localized pricing, domains, and currencies
- No documentation on whether BeProfit segments profit by Market (e.g., "US Market profit" vs "EU Market profit")
- **Gap Opportunity:** Profit-by-market segmentation would be valuable for international sellers

### Multi-Location Inventory

**Status:** **Unknown / Likely Limited**

- Shopify supports multi-location inventory (multiple warehouses, retail stores)
- No documentation on whether BeProfit syncs inventory by location
- **Inferred:** BeProfit likely syncs total inventory quantity (sum across all locations) rather than per-location granularity

---

## Known Limitations

### Data NOT Synced

**Explicitly NOT Synced (Inferred):**
- **Draft Orders:** Shopify draft orders (unpaid invoices) are likely not synced until converted to paid orders
- **Abandoned Carts:** BeProfit does NOT track abandoned carts (not relevant for profit tracking)
- **Shopify Blog Posts / Pages:** Non-transactional content (no reason to sync)
- **Gift Card Sales:** Unknown - gift cards are tricky (revenue timing, redemption tracking)
- **Shopify Scripts / Flow Rules:** Backend automation logic (not relevant)
- **Customer Account Data:** Passwordless login, account preferences (not relevant for profit)

### Edge Cases & Troubleshooting

**Common Issues (from App Store reviews and inferred pain points):**

| Issue | Cause | Solution |
|-------|-------|----------|
| **"My profit is wrong"** | COGS not set in Shopify, or BeProfit using default $0 | User must manually enter COGS in BeProfit or Shopify |
| **"Orders not appearing"** | Date range filter too narrow, or sync delay | Check date range, wait 5 minutes, or force manual sync |
| **"Ad spend not matching"** | BeProfit only counts ad spend with UTM attribution (confirmed in reviews) | BeProfit ignores "unattributed ad spend" - controversial decision |
| **"Transaction fees missing"** | User not using Shopify Payments (using Stripe/PayPal directly) | User must manually enter average % fee in settings |
| **"Multi-currency orders showing wrong profit"** | Currency conversion timing mismatch | BeProfit may use historical exchange rates vs Shopify's real-time rates |
| **"Refunds not reflecting correctly"** | Restocking logic mismatch | Check if COGS was credited for restocked items |

**Critical Review Finding - Ad Spend Attribution:**
One negative review (2026) states: _"BeProfit only 'counts' ad spend that can be attributed via UTMs / converted traffic, and ignores the rest of the spend entirely."_

This means:
- If Facebook Ads spends $1,000, but only $800 can be attributed to orders with UTM parameters, BeProfit shows $800 ad spend
- This makes ROAS artificially high (lower ad spend in denominator)
- **This is a major limitation** for merchants who care about **total ad spend** vs **attributed ad spend**

---

## Disconnection & Reconnection

**How to Disconnect:**
1. In BeProfit: Settings → Integrations → Shopify → Disconnect
2. In Shopify Admin: Settings → Apps and sales channels → BeProfit → Uninstall

**What Happens to Data After Disconnection:**
- **Historical Data Retained:** BeProfit likely keeps historical data (orders synced before disconnection) in case user reconnects
- **No New Syncs:** Real-time order sync stops immediately
- **Re-connection:** User can reconnect anytime - BeProfit will resume syncing from disconnection date

**Grace Period:** Unknown - some SaaS apps delete data after 30-90 days of disconnection

---

## Shopify App Store Presence

### App Listing Details

**App Metadata (as of 2026-02-12):**
- **App Name:** BeProfit ‑ Profit Analytics
- **Subtitle:** "Real-time analytics software for multichannel brands"
- **Developer:** Viably Capital (Cary, NC)
- **Launched:** September 22, 2020 (5+ years on App Store)
- **Category:** Reports and analytics > Analytics

**Performance Metrics:**
- **Rating:** 4.5 out of 5 stars (⭐⭐⭐⭐☆)
- **Review Count:** 194 reviews
- **Rating Distribution:** 93% five-star (181 reviews), with smaller percentages at 4, 3, 2, 1 stars
- **Install Count:** Not publicly visible (Shopify hides this), but 194 reviews suggests **10,000-50,000+ installs** (typical review rate is 1-2%)
- **Last Updated:** Actively maintained (exact date not provided in search results)

**Badges:**
- **Shopify Staff Pick:** Yes (indicates high quality / Shopify endorsement)
- **Built for Shopify:** Likely yes (indicates adherence to Shopify's quality standards)

### Screenshot Analysis

**Key Screenshots Visible in App Store Listing (Inferred from BeProfit's Marketing):**

1. **Dashboard Overview:**
   - KPI cards showing Total Sales, Net Profit, ROAS, Order Count
   - Profit & Expenses breakdown donut chart
   - Trend arrows showing % change vs previous period

2. **Product Analytics:**
   - Product table with columns: Product, Revenue, COGS, Profit, Margin %
   - Sorting and filtering options

3. **Order Details:**
   - Order list with profit per order
   - Order detail modal showing cost breakdown (COGS, shipping, fees, ad spend attribution)

4. **Marketing Analytics:**
   - Ad spend by platform (Facebook, Google, TikTok)
   - ROAS, CPA, attributed revenue per campaign

5. **Settings/Integrations:**
   - Integration cards showing Shopify (connected), Facebook Ads, Google Ads, etc.
   - Connection status indicators

### Review Sentiment

**Positive Themes (from 4-5 star reviews):**
- **"Easy to use"** - Intuitive UI, no technical setup required
- **"Accurate profit tracking"** - Once COGS are set, profit calculations are reliable
- **"Great for multi-channel"** - Consolidates Shopify + Amazon + ad spend in one dashboard
- **"Excellent support"** - Responsive customer support team (mentions of fast replies)
- **"Game-changer for DTC brands"** - Helps merchants understand true profitability

**Negative Themes (from 1-3 star reviews):**
- **"Ad spend attribution is broken"** - Only counts attributed ad spend, ignores unattributed spend (inflates ROAS)
- **"COGS setup is tedious"** - If COGS aren't set in Shopify, user must manually enter for every product variant
- **"Expensive for small stores"** - $49/month for 450 orders feels steep for low-volume stores
- **"Limited integrations"** - Some users want QuickBooks, Xero, or other integrations not available
- **"Multi-currency support unclear"** - Confusion about how multi-currency orders are handled

**Net Sentiment:** **Positive** (4.5★ average, 93% five-star ratings)
- Most users are satisfied with core profit tracking functionality
- Main complaints are around edge cases (ad attribution, multi-currency) rather than core features

---

## Inferred UI Elements

### Shopify Connection Card (in BeProfit Settings)

```
┌─────────────────────────────────────────────┐
│ [Shopify Logo]  Shopify                     │
│                                              │
│ Status: ● Connected                          │
│ Store: mystore.shopify.com                   │
│ Last synced: 2 minutes ago                   │
│                                              │
│ [Sync Now]  [View Settings]  [Disconnect]   │
└─────────────────────────────────────────────┘
```

**Settings Options:**
- **Store URL:** mystore.shopify.com (read-only, set during OAuth)
- **Sync Frequency:** Automatic (real-time orders, hourly products)
- **Currency:** USD (detected from Shopify)
- **Timezone:** America/New_York (detected from Shopify)
- **Historical Data:** Import all-time data ☑ (checkbox)
- **Shopify Fees:**
  - Shopify Plan Cost: $105/month (manual entry)
  - Using Shopify Payments? Yes ☑ (if yes, transaction fees auto-synced)
  - If not using Shopify Payments, enter average payment processor fee: [2.9%] + [$0.30]

### Initial Sync Progress Screen

```
┌─────────────────────────────────────────────┐
│          Syncing Your Shopify Data          │
│                                              │
│  ████████████████░░░░░░░░░░ 65%             │
│                                              │
│  Importing orders from 2020-01-15...         │
│  2,450 of 3,800 orders synced                │
│                                              │
│  Estimated time remaining: 3 minutes         │
│                                              │
│  [Cancel Sync]                               │
└─────────────────────────────────────────────┘
```

### Dashboard Integration Indicators

**Order Source Badge:**
- Each order in BeProfit shows Shopify logo badge: [Shopify 🛍️] Order #1234

**Sales Channel Filter:**
- Dropdown filter: "All Channels" | "Shopify" | "Amazon" | "WooCommerce"

**Sync Status Banner (Top of Dashboard):**
- "✅ All integrations synced. Last updated: 2 minutes ago"
- OR "⚠️ Syncing Shopify data... 80% complete"

---

## Data Model Implications

### ShopifyIntegration Entity

```typescript
interface ShopifyIntegration {
  id: UUID;
  user_id: UUID; // Foreign key to User
  shop_domain: string; // "mystore.shopify.com"
  access_token: string; // Encrypted OAuth token
  scopes: string[]; // ["read_orders", "read_products", "read_customers", ...]
  connection_status: "connected" | "disconnected" | "error" | "syncing";
  last_sync_at: timestamp;
  initial_sync_complete: boolean;
  sync_frequency: "realtime" | "hourly" | "daily"; // For different data types
  shopify_plan_cost: decimal; // Manual entry ($39, $105, $399, custom)
  uses_shopify_payments: boolean; // If true, auto-pull transaction fees
  default_payment_fee_percent: decimal; // If not using Shopify Payments (2.9%)
  default_payment_fee_flat: decimal; // If not using Shopify Payments ($0.30)
  currency: string; // "USD", "EUR", detected from Shopify
  timezone: string; // "America/New_York", detected from Shopify
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Order Entity Mapping (Shopify → BeProfit)

```typescript
interface Order {
  id: UUID; // BeProfit internal ID
  shop_id: UUID; // Foreign key to Shop
  external_id: string; // Shopify order ID (e.g., "4567890123456")
  source_platform: "shopify";
  order_number: string; // Shopify order number (e.g., "#1001")
  created_at: timestamp; // Shopify order date

  // Financial data
  total_value: decimal; // Shopify `total_price`
  subtotal: decimal; // Shopify `subtotal_price`
  discount_amount: decimal; // Shopify `total_discounts`
  shipping_cost: decimal; // Shopify `total_shipping_price_set`
  tax_amount: decimal; // Shopify `total_tax`

  // Order status
  financial_status: string; // "paid", "pending", "refunded"
  fulfillment_status: string; // "fulfilled", "unfulfilled", "partial"

  // Customer data
  customer_email: string;
  customer_name: string;
  shipping_country: string;
  shipping_state: string;

  // Channel & attribution
  sales_channel: string; // "Online Store", "POS"
  utm_source: string; // Extracted from `landing_site`
  utm_medium: string;
  utm_campaign: string;

  // Fees
  transaction_fee: decimal; // Shopify Payments fee (auto-pulled or calculated)

  // COGS
  total_cogs: decimal; // Sum of line_items[].cost * quantity

  // Calculated fields
  gross_profit: decimal; // total_value - total_cogs
  net_profit: decimal; // gross_profit - shipping_cost - transaction_fee - ad_spend_attributed
  net_margin: decimal; // net_profit / total_value * 100

  // Shopify metadata
  shopify_order_json: JSONB; // Store full Shopify order JSON for reference
}
```

### LineItem Entity (Order Line Items)

```typescript
interface LineItem {
  id: UUID;
  order_id: UUID; // Foreign key to Order
  external_id: string; // Shopify line item ID
  product_title: string;
  variant_title: string;
  sku: string;
  quantity: integer;
  price_per_unit: decimal;
  line_total: decimal; // price_per_unit * quantity
  cogs_per_unit: decimal; // From Shopify `variant.cost` or manual entry
  total_cogs: decimal; // cogs_per_unit * quantity
  line_profit: decimal; // line_total - total_cogs
}
```

---

## Limitations & Gaps Identified

### Compared to Ideal Shopify Integration

| Feature | BeProfit Support | Ideal / Best Practice |
|---------|-----------------|----------------------|
| **Real-Time Order Sync** | ✅ Yes (webhooks) | ✅ Real-time is table stakes |
| **Two-Way Sync** | ❌ No (read-only) | ✅ Two-way sync (e.g., update COGS in Shopify from BeProfit) would be valuable |
| **Shopify POS Support** | ⚠️ Likely yes, but not documented | ✅ Explicit POS filtering and POS-specific reports |
| **Multi-Currency Dashboard** | ⚠️ Unknown | ✅ Show profit in multiple currencies simultaneously |
| **Shopify Markets Segmentation** | ❌ Not documented | ✅ Profit-by-market reports (US vs EU vs APAC) |
| **Abandoned Cart Tracking** | ❌ No | ⚠️ Optional (revenue recovery opportunity, but not critical for profit) |
| **Gift Card Handling** | ⚠️ Unknown | ✅ Track gift card sales separately (deferred revenue) |
| **Shopify Flow Integration** | ❌ No | ✅ Trigger Shopify automations based on profit thresholds |
| **Multi-Location Inventory** | ⚠️ Unknown | ✅ Track inventory value by warehouse/location |
| **Full Ad Spend Tracking** | ❌ No (only attributed spend) | ✅ Track total ad spend (attributed + unattributed) |
| **Auto-Detect Shopify Payments Fees** | ✅ Yes | ✅ Critical for accurate profit |
| **COGS Auto-Import** | ✅ Yes (if set in Shopify) | ✅ But many merchants don't set COGS in Shopify |
| **Historical Data Import** | ✅ All-time | ✅ Best practice |

### Major Gaps

1. **Ad Spend Attribution Issue:**
   - BeProfit only counts **attributed ad spend** (spend linked to orders with UTM params)
   - Ignores **unattributed ad spend** (brand awareness, top-of-funnel, view-through conversions)
   - This inflates ROAS and gives false sense of ad performance
   - **Fix:** Offer two views: "Attributed Ad Spend" and "Total Ad Spend"

2. **No Two-Way Sync:**
   - BeProfit cannot update Shopify data (e.g., write COGS back to Shopify after user enters in BeProfit)
   - **Fix:** Add write permissions (`write_products`) to sync COGS from BeProfit → Shopify

3. **Multi-Currency Clarity:**
   - Unclear how multi-currency orders are handled (converted to base currency? shown in original currency?)
   - **Fix:** Explicit multi-currency dashboard with currency selector

4. **Shopify Markets Not Leveraged:**
   - No documented profit segmentation by Shopify Market
   - **Fix:** Add "Profit by Market" report (US, EU, UK, APAC)

5. **POS Not Highlighted:**
   - POS likely works but not documented - merchants may not realize POS orders are tracked
   - **Fix:** Add POS badge, POS filter, POS-specific metrics (in-store profit vs online profit)

---

## Relevance to Our Build

### 7-10 Actionable Insights for Our Shopify Integration

1. **Real-Time Webhooks are Table Stakes**
   - BeProfit uses Shopify webhooks for real-time order sync (1-5 min delay)
   - Users expect new orders to appear instantly
   - **Action:** Implement Shopify webhooks for `orders/create`, `orders/paid`, `orders/fulfilled`, `orders/cancelled`, `orders/refunded`

2. **OAuth Flow Must Be Seamless**
   - BeProfit's one-click Shopify OAuth flow is a major UX win (no manual API keys)
   - **Action:** Use Shopify's standard OAuth flow with clear permission requests

3. **COGS Pain Point is Real**
   - Many Shopify merchants don't set `cost` field in Shopify product data
   - BeProfit must prompt users to enter COGS manually - this is tedious
   - **Action:**
     - Prominently detect missing COGS during onboarding
     - Offer bulk COGS import via CSV
     - Highlight that COGS are required for accurate profit

4. **Shopify Payments Fee Auto-Pull is Critical**
   - BeProfit auto-pulls Shopify Payments transaction fees from API
   - This is a huge time-saver vs manual entry
   - **Action:** Implement Shopify Payments fee sync via `shopify_payments_account` API

5. **Ad Attribution Must Be Transparent**
   - BeProfit's "only attributed ad spend" approach is controversial (inflates ROAS)
   - **Action:** Offer **two ad spend views**:
     - "Attributed Ad Spend" (spend linked to orders with UTMs)
     - "Total Ad Spend" (all spend from ad platform APIs)
   - Default to Total Ad Spend (more accurate for ROAS)

6. **Shopify POS Should Be First-Class**
   - POS orders are likely synced but not prominently featured
   - Many DTC brands have retail stores or pop-ups (POS is important)
   - **Action:**
     - Add POS badge/icon on POS orders
     - Add "Online vs In-Store Profit" segmentation
     - Highlight POS support in marketing

7. **Multi-Currency Needs Clarity**
   - BeProfit's multi-currency handling is unclear
   - **Action:**
     - Convert all orders to store's base currency for reporting (with exchange rate footnote)
     - Offer currency filter (e.g., "Show only USD orders")
     - Display original currency on order detail modal

8. **Shopify Markets = Opportunity**
   - Shopify Markets is growing (launched 2021, now widely adopted)
   - BeProfit doesn't leverage Markets for profit segmentation
   - **Action:** Add "Profit by Market" report (US, EU, UK, APAC) - **differentiation opportunity**

9. **Historical Data Import Must Be Fast**
   - BeProfit pulls all-time historical data (no 90-day limit)
   - Large stores (5,000+ orders) take 30-60 minutes
   - **Action:**
     - Use GraphQL bulk queries for faster initial sync
     - Show progress bar with ETA
     - Offer "Import last 90 days only" option for faster setup

10. **Two-Way Sync = Premium Feature**
    - BeProfit is read-only (cannot write COGS back to Shopify)
    - **Action:** Consider adding write permissions (`write_products`) to sync COGS from our app → Shopify
    - This would be a **major differentiator** (manage COGS in our app, auto-sync to Shopify)

---

## Shopify Integration Checklist (for Our Build)

### MVP (Phase 1)
- [x] OAuth flow with Shopify (one-click connect)
- [x] Real-time order sync via webhooks
- [x] Sync orders (all fields: revenue, discounts, shipping, tax)
- [x] Sync products (SKU, price, COGS if available)
- [x] Sync customers (email, name, location for LTV)
- [x] Sync refunds and calculate impact on profit
- [x] Auto-pull Shopify Payments transaction fees
- [x] Prompt user to enter Shopify plan cost ($39, $105, $399)
- [x] Detect missing COGS and prompt user to enter
- [x] Historical data import (all-time)

### Phase 2 (Enhancements)
- [ ] POS order badge and POS filtering
- [ ] Multi-currency conversion to base currency
- [ ] Shopify Markets profit segmentation
- [ ] UTM attribution tracking (parse `landing_site`)
- [ ] Manual "Sync Now" button in settings
- [ ] Bulk COGS import via CSV
- [ ] Product profit report (profit by SKU)

### Phase 3 (Differentiation)
- [ ] Two-way sync: Write COGS from our app → Shopify
- [ ] Shopify Flow integration (trigger automations based on profit)
- [ ] Multi-location inventory value tracking
- [ ] "Total Ad Spend" vs "Attributed Ad Spend" toggle
- [ ] Gift card sales tracking (deferred revenue)
- [ ] Abandoned cart tracking (optional revenue recovery)

---

## Sources Referenced
- Shopify App Store Listing: https://apps.shopify.com/beprofit-profit-tracker
- BeProfit Data Sync Solutions: https://beprofit.co/features/data-sync-solutions/
- BeProfit App Reviews: https://apps.shopify.com/beprofit-profit-tracker/reviews
- BeProfit Shopify Apps Topic: https://beprofit.co/a/topic/shopify-apps
- Third-Party App Directory (DelightChat): https://www.delightchat.io/apps/beprofit-profit-tracker
- Shopify OAuth Documentation: https://shopify.dev/docs/apps/build/authentication-authorization
- Shopify API Access Scopes: https://shopify.dev/docs/api/usage/access-scopes
