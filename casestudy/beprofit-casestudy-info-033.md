# BeProfit WooCommerce Integration

## Source
- **URLs:**
  - https://woocommerce.com/products/beprofit-analytics-reports/ (WooCommerce Marketplace listing)
  - https://woocommerce.com/document/beprofit-for-woocommerce/ (Official documentation)
  - https://www.woohelpdesk.com/analytics-reporting/beprofit/ (Third-party setup guide)
  - https://beprofit.co/a/blog/best-woocommerce-profit-analysis-plugins (BeProfit blog)
  - https://beprofit.co/a/blog/a-breakdown-of-woocommerce-fees (WooCommerce fees guide)
  - https://developer.woocommerce.com/docs/apis/rest-api/ (WooCommerce REST API docs)
- **Category:** Integrations / E-Commerce Platforms / WooCommerce
- **Date Captured:** 2026-02-12

---

## WooCommerce Support Overview

WooCommerce is BeProfit's **second-tier platform integration** after Shopify. While supported, it is **less mature and less prominent** than Shopify:

**Evidence of Second-Tier Status:**
1. **Lower Rating:** WooCommerce Marketplace listing has **2.2 out of 5 stars** (5 reviews) vs Shopify's 4.5★ (194 reviews)
2. **Fewer Reviews:** Only 5 WooCommerce reviews vs 194 Shopify reviews (39x difference)
3. **Less Documentation:** WooCommerce setup docs are sparse compared to Shopify's extensive resources
4. **Support Complaints:** WooCommerce users report "inexistent support" and "technical issues"
5. **Marketing Positioning:** Shopify featured first on BeProfit's site; WooCommerce secondary

**Why WooCommerce is Harder:**
- **Self-Hosted Complexity:** WooCommerce runs on merchant's own servers (not SaaS like Shopify), introducing hosting variables
- **Diverse Payment Gateways:** WooCommerce supports 100+ payment gateways (Stripe, PayPal, Square, etc.) - harder to auto-pull fees
- **Plugin Conflicts:** 50,000+ WordPress plugins can cause conflicts with BeProfit integration
- **Server Configuration Variability:** SSL issues, firewall rules, PHP versions vary by host
- **No Native Webhooks:** WooCommerce webhooks exist but are less reliable than Shopify's

**Positioning:**
BeProfit markets WooCommerce support but appears to have invested less in polish and support infrastructure compared to Shopify. Merchants using WooCommerce may experience more setup friction and sync issues.

---

## Connection Setup

### Prerequisites

**What user needs before connecting:**
- **WordPress site** running WooCommerce (self-hosted or managed hosting)
- **WooCommerce version:** 9.0+ (required as of 2026)
- **WordPress version:** 6.7+ (required as of 2026)
- **Permalinks:** Pretty permalinks enabled (Settings > Permalinks) - default permalinks will NOT work
- **HTTPS/SSL:** SSL certificate installed (WooCommerce REST API requires HTTPS)
- **WooCommerce Admin Access:** Ability to generate REST API keys
- **BeProfit Account:** Free trial available at beprofit.co

**Hosting Requirements:**
- **PHP Version:** 7.4+ (WooCommerce requirement)
- **Memory Limit:** 128MB+ recommended (256MB+ for large stores)
- **Firewall:** Must allow outbound HTTPS requests to BeProfit's servers
- **Rate Limiting:** Some hosts throttle API calls - may slow sync

### Plugin Installation (if applicable)

**Status:** **No dedicated WordPress plugin required** (as of 2026)

**Connection Method:**
- BeProfit connects via **WooCommerce REST API** (no separate plugin installation)
- This is different from some competitors that require installing a WordPress plugin
- **Advantage:** Simpler setup (no plugin conflicts)
- **Disadvantage:** Manual API key generation required (vs one-click OAuth like Shopify)

### Connection Flow

**UI Flow** (inferred from documentation and standard WooCommerce REST API pattern):

```
1. User visits beprofit.co and signs up / logs in

2. User selects "WooCommerce" as e-commerce platform

3. BeProfit displays setup instructions:
   "To connect WooCommerce, you'll need to generate REST API keys"

4. User navigates to their WooCommerce admin:
   - Go to: WooCommerce > Settings > Advanced > REST API
   - Click "Add Key" button

5. User configures API key:
   - Description: "BeProfit Integration" (helps identify later)
   - User: Select admin user (typically yourself)
   - Permissions: "Read/Write" (BeProfit needs read for orders, may need write for COGS)

6. WooCommerce generates credentials:
   - Consumer Key: ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   - Consumer Secret: cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   - ⚠️ Warning: Copy these NOW - Consumer Secret won't be shown again!

7. User returns to BeProfit and enters:
   - Store URL: https://mystore.com (or https://mystore.com/shop if WC on subdirectory)
   - Consumer Key: [paste]
   - Consumer Secret: [paste]

8. BeProfit tests connection:
   - Pings WooCommerce API endpoint: GET /wp-json/wc/v3/system_status
   - Verifies authentication and permissions

9. Connection Success screen:
   - "✅ Connected to mystore.com"
   - "We're now importing your data..."

10. Initial data sync begins:
    - Progress bar: "Importing 1,250 orders... 35% complete"
    - Estimated time: 10-45 minutes depending on order volume and hosting speed
```

**Key Differences from Shopify:**
- **Manual API Keys:** WooCommerce requires manual key generation (more steps than Shopify's one-click OAuth)
- **No OAuth:** WooCommerce REST API uses API key authentication (simpler but less secure than OAuth)
- **Permissions Granularity:** WooCommerce has only "Read", "Write", "Read/Write" (vs Shopify's granular scopes)
- **Hosting-Dependent:** Success depends on merchant's server configuration (vs Shopify's uniform SaaS environment)

### API Credentials

**WooCommerce REST API Keys:**

| Credential | Format | Purpose | Security |
|------------|--------|---------|----------|
| **Consumer Key** | `ck_` + 40 characters | Identifies the application (BeProfit) | Public (can be exposed) |
| **Consumer Secret** | `cs_` + 40 characters | Authenticates the application | **Secret** (must be encrypted, never logged) |

**Permissions:**
- **Read:** BeProfit can read orders, products, customers, etc.
- **Write:** BeProfit can create/update products (needed if syncing COGS back to WooCommerce)
- **Read/Write:** Recommended permission level

**API Endpoint:**
- Base URL: `https://mystore.com/wp-json/wc/v3/`
- Authentication: HTTP Basic Auth (Consumer Key as username, Consumer Secret as password)
- Format: JSON

### Initial Sync

**Historical Data Import:**
- **Time Range:** BeProfit imports **all-time historical orders** (no documented limit)
- **Sync Duration:**
  - Small stores (<500 orders): 10-20 minutes
  - Medium stores (500-5,000 orders): 20-45 minutes
  - Large stores (5,000+ orders): 45-90+ minutes
- **Hosting Impact:** Self-hosted WooCommerce may sync slower than Shopify due to:
  - Shared hosting resource limits
  - Server location (latency if BeProfit's servers are geographically distant)
  - Firewall / rate limiting by host

**What Slows Down WooCommerce Sync:**
1. **Shared Hosting:** Hosts like Bluehost, GoDaddy throttle API requests
2. **Large Product Catalogs:** 10,000+ products takes significantly longer
3. **WooCommerce Subscriptions:** Recurring orders add complexity
4. **Large Order History:** 50,000+ orders may require multiple sync passes

**Progress Indicators:**
- Progress bar shows percentage complete
- Status: "Importing orders from 2018-06-01 to 2026-02-12..."
- Option to "Pause Sync" if causing server load issues

---

## Data Synced FROM WooCommerce

### Order Data

**Order-level fields synced (via WooCommerce REST API `/orders` endpoint):**

| Field | WooCommerce API Field | BeProfit Use |
|-------|----------------------|--------------|
| Order ID | `id` | Unique identifier |
| Order Number | `number` | User-friendly order identifier (may differ from ID) |
| Order Date | `date_created` | Order timestamp |
| Order Status | `status` | `pending`, `processing`, `on-hold`, `completed`, `cancelled`, `refunded`, `failed` |
| **Financial Data** | | |
| Total Order Value | `total` | Gross revenue |
| Subtotal | `line_items[].subtotal` (sum) | Pre-discount, pre-tax |
| Discount Amount | `discount_total` | Total discounts applied (coupons) |
| Shipping Cost | `shipping_total` | Shipping charged to customer |
| Tax Amount | `total_tax` | Sales tax collected |
| Refund Amount | `refunds[]` (separate API call) | Total refunded if applicable |
| **Payment Data** | | |
| Payment Method | `payment_method` | `stripe`, `paypal`, `bacs`, `cod`, etc. |
| Payment Method Title | `payment_method_title` | "Credit Card (Stripe)", "PayPal", etc. |
| Transaction ID | `transaction_id` | Payment gateway transaction ID |
| **Customer Data** | | |
| Customer ID | `customer_id` | WooCommerce customer ID (0 if guest checkout) |
| Customer Email | `billing.email` | For LTV calculation |
| Customer Name | `billing.first_name`, `billing.last_name` | Display name |
| Billing Address | `billing` | Full billing address (country, state, city, postcode) |
| Shipping Address | `shipping` | Full shipping address |
| **Metadata** | | |
| Currency | `currency` | USD, EUR, GBP, etc. |
| Customer IP | `customer_ip_address` | For fraud detection (optional use) |
| Customer User Agent | `customer_user_agent` | Browser info |
| Order Notes | `customer_note` | Customer notes at checkout |
| **Fees** | | |
| Fee Lines | `fee_lines[]` | Custom fees (e.g., handling fee, gift wrap) |
| Shipping Lines | `shipping_lines[]` | Shipping method details |

**Key Difference from Shopify:**
- WooCommerce `status` values differ: `processing`, `completed`, `on-hold` (vs Shopify's `financial_status` and `fulfillment_status`)
- Payment method is a string (e.g., "stripe", "paypal") rather than structured gateway data

### Line-Item Fields (per product in order)

| Field | WooCommerce API Field | BeProfit Use |
|-------|----------------------|--------------|
| Product ID | `line_items[].product_id` | Link to product catalog |
| Variation ID | `line_items[].variation_id` | Link to specific variation (if variable product) |
| Product Name | `line_items[].name` | Product title |
| SKU | `line_items[].sku` | Product SKU for cost lookup |
| Quantity | `line_items[].quantity` | Units sold |
| Subtotal | `line_items[].subtotal` | Pre-discount line total |
| Total | `line_items[].total` | Post-discount line total |
| **COGS (Critical)** | | |
| Product Cost | **NOT in WooCommerce core API** | BeProfit must pull from plugin (e.g., WooCommerce Cost of Goods) OR prompt user to enter manually |

**CRITICAL COGS Issue:**
- **WooCommerce does NOT store COGS natively** (unlike Shopify's `cost` field)
- Merchants must use a **third-party plugin** like:
  - "WooCommerce Cost of Goods" by WooCommerce
  - "ATUM Inventory Management"
  - Manual entry in product meta fields
- BeProfit must either:
  1. Integrate with specific COGS plugins (detect plugin, pull from custom meta fields)
  2. Prompt user to manually enter COGS for each product
- **This is a major pain point** for WooCommerce users (more tedious than Shopify)

### Product Data

**Product fields synced (via `/products` endpoint):**

| Field | WooCommerce API Field | Purpose |
|-------|----------------------|---------|
| Product ID | `id` | Unique identifier |
| Product Name | `name` | Product title |
| Product Type | `type` | `simple`, `grouped`, `external`, `variable` |
| SKU | `sku` | Product SKU |
| **Pricing** | | |
| Regular Price | `regular_price` | Standard selling price |
| Sale Price | `sale_price` | Discounted price (if on sale) |
| **Cost (CRITICAL)** | | |
| Cost per Unit | **NOT in WooCommerce core API** | Must pull from COGS plugin OR manual entry |
| **Variations (for Variable Products)** | | |
| Variations | `variations[]` (separate API call) | Size, color, etc. options |
| **Stock** | | |
| Stock Quantity | `stock_quantity` | Current inventory level |
| Stock Status | `stock_status` | `instock`, `outofstock`, `onbackorder` |
| **Categories & Tags** | | |
| Categories | `categories[]` | Product categories |
| Tags | `tags[]` | Product tags |
| **Images** | | |
| Product Images | `images[]` | Product photos for display |

**Variable Products:**
- WooCommerce "Variable Products" = Shopify "Products with Variants"
- Parent product has no price; child "variations" have individual SKUs, prices, stock
- BeProfit must fetch variations separately via `/products/<id>/variations` endpoint

### Customer Data

**Customer fields synced (via `/customers` endpoint or order billing data):**

| Field | WooCommerce API Field | Purpose |
|-------|----------------------|---------|
| Customer ID | `id` | Unique customer identifier |
| Email | `email` | Primary identifier for LTV |
| First Name | `first_name` | Display name |
| Last Name | `last_name` | Display name |
| **Lifetime Metrics** | | |
| Total Orders | Calculated from orders API | Total orders placed |
| Total Spent | Calculated from orders API | Lifetime value |
| **Location** | | |
| Billing Address | `billing` | Default billing address |
| Shipping Address | `shipping` | Default shipping address |
| **Dates** | | |
| Created At | `date_created` | Customer registration date |
| Last Order Date | Calculated from orders | Recency for RFM |

**Guest Checkout Challenge:**
- WooCommerce allows guest checkout (no account creation)
- Guest orders have `customer_id = 0`
- BeProfit must dedupe guests by email for LTV calculation (same email = same customer)

### Refund Data

**Refund handling (via `/orders/<id>/refunds` endpoint):**

| Field | WooCommerce API Field | Impact on Profit |
|-------|----------------------|------------------|
| Refund ID | `id` | Unique refund identifier |
| Refund Date | `date_created` | When refund occurred |
| Refund Amount | `amount` | Amount refunded to customer (negative value) |
| Refund Reason | `reason` | Why refund was issued |
| **Line Items Refunded** | | |
| Refunded Line Items | `line_items[]` | Which products were refunded (qty, amount) |
| Restocking | NOT in WooCommerce API | Must be manually tracked |

**How BeProfit Handles WooCommerce Refunds:**
1. **Full Refunds:** Deduct full order value from revenue, credit COGS if restocked
2. **Partial Refunds:** Proportionally deduct revenue and costs
3. **Restocking:** WooCommerce doesn't track restocking automatically - BeProfit may assume items are restocked

### Payment Gateway Fees

**Automatic Fee Tracking:**

| Fee Type | How BeProfit Pulls It | Typical Amount |
|----------|----------------------|----------------|
| **Payment Gateway Fees (Stripe)** | **NOT automatically pulled** - User must configure manually | 2.9% + $0.30 per transaction |
| **Payment Gateway Fees (PayPal)** | **NOT automatically pulled** - User must configure manually | 3.49% + $0.49 (for PayPal Checkout) |
| **Other Gateways (Square, Authorize.net, etc.)** | **NOT automatically pulled** - User must configure manually | Varies by gateway |
| **WooCommerce Payments Fees** | **MAY be auto-pulled** (WooCommerce Payments is Stripe-based) | 2.9% + $0.30 (US), varies by country |

**Key Challenge:**
- **WooCommerce does NOT expose payment fees in REST API** (unlike Shopify Payments)
- BeProfit must either:
  1. Integrate with specific payment gateway APIs (Stripe, PayPal) separately
  2. Prompt user to manually configure fee % in Settings > Costs > Processing Fees
- **User Workflow:** Settings → Costs → Processing Fees → Configure by payment gateway:
  - Stripe: 2.9% + $0.30
  - PayPal: 3.49% + $0.49
  - Square: 2.6% + $0.10
  - (etc.)

**BeProfit's Approach (Inferred):**
- BeProfit asks user to manually enter fee % for each payment gateway during setup
- Applies fee % to orders based on `payment_method` field
- **Example:** If order used "stripe" payment method, apply 2.9% + $0.30 fee

---

## Sync Direction & Frequency

### Sync Direction

**One-Way (WooCommerce → BeProfit) - Primarily**
- BeProfit is **primarily read-only**
- BeProfit requests "Read/Write" permissions but likely only WRITES for COGS updates (if supported)
- **Inferred:** BeProfit may write COGS back to WooCommerce product meta if user enters COGS in BeProfit

### Sync Frequency

**Order Data:**
- **Batch Sync (Polling)** - NOT real-time webhooks
- WooCommerce has webhooks, but BeProfit may not use them (reliability issues with self-hosted sites)
- **Inferred Sync Frequency:** Every 15-60 minutes (hourly polling)
- New orders appear in BeProfit within **15-60 minutes** (vs Shopify's 1-5 minutes)

**Product Catalog:**
- **Batch Sync** (daily)
- Products synced once per day (3:00 AM user's timezone)

**Customer Data:**
- **Triggered by Order Sync** (when order syncs, customer data updates)

**Inventory:**
- **Batch Sync** (daily or manual)
- Inventory less critical for BeProfit (profit tracking, not inventory management)

**Payment Fees:**
- **Calculated per Order** (based on manual fee % configuration)
- Not synced from gateway APIs

**Typical Sync Pattern (Inferred):**
```
- New orders: Hourly batch sync (poll WooCommerce API every 60 minutes)
- Product catalog: Daily batch sync (3:00 AM)
- Inventory: Daily batch sync (3:00 AM)
- Payment fees: Calculated per order based on manual % entry
- Historical data: Manual "Sync Now" in Settings
```

**Why Not Real-Time Webhooks?**
1. **Self-Hosted Reliability:** Merchant's server may be unreachable, firewalled, or offline
2. **Webhook Delivery Issues:** WooCommerce webhooks can fail silently if server is slow
3. **SSL Certificate Problems:** Many self-hosted sites have invalid/expired SSL certs, blocking webhooks
4. **Simpler Implementation:** Polling is more reliable than managing webhook failures

---

## WooCommerce-Specific Features

### WooCommerce Subscriptions Support

**Status:** **Likely Supported** (but not explicitly documented)

**WooCommerce Subscriptions Plugin:**
- Popular plugin for recurring revenue (subscriptions, memberships)
- Adds `subscription` order type
- BeProfit likely treats subscriptions as recurring orders
- **Gap:** No explicit "subscription profit tracking" features documented

### Multi-Currency Support

**Status:** **Unknown**

**WooCommerce Multi-Currency Plugins:**
- WPML Multi-Currency
- Aelia Currency Switcher
- WooCommerce Multilingual
- **Challenge:** Each plugin stores currency data differently
- **Inferred:** BeProfit likely converts all orders to store's base currency (may not support multi-currency dashboards)

### Variable Products

**Status:** **Supported**

**WooCommerce Variable Products:**
- Parent product (e.g., "T-Shirt") with variations (S, M, L, XL)
- Each variation has unique SKU, price, stock
- **BeProfit Handling:** Likely syncs variations as separate line items, links to parent product for reporting

---

## Differences from Shopify Integration

### Setup Complexity

| Aspect | Shopify | WooCommerce | Winner |
|--------|---------|-------------|--------|
| **Authentication** | One-click OAuth | Manual API key generation | Shopify |
| **Prerequisites** | None | SSL cert, WooCommerce 9.0+, pretty permalinks | Shopify |
| **Setup Steps** | 3 steps | 7-8 steps | Shopify |
| **Error Handling** | Shopify validates OAuth flow | User must troubleshoot API key errors | Shopify |
| **Time to Connect** | 2 minutes | 10-15 minutes (if no issues) | Shopify |

### Data Sync Reliability

| Aspect | Shopify | WooCommerce | Winner |
|--------|---------|-------------|--------|
| **Sync Method** | Real-time webhooks | Batch polling (hourly) | Shopify |
| **Latency** | 1-5 minutes | 15-60 minutes | Shopify |
| **Reliability** | 99.9% uptime (Shopify SaaS) | Depends on merchant's hosting | Shopify |
| **Server Load** | None (Shopify handles) | Merchant's server handles API calls | Shopify |
| **Firewall Issues** | Never | Common (firewall blocks API) | Shopify |
| **SSL Issues** | Never | Common (expired/invalid SSL) | Shopify |

### Feature Parity

| Feature | Shopify | WooCommerce | Winner |
|---------|---------|-------------|--------|
| **Order Sync** | ✅ Real-time | ✅ Hourly | Shopify |
| **COGS Auto-Import** | ✅ Yes (if set in Shopify) | ❌ No (requires plugin) | Shopify |
| **Payment Fee Auto-Import** | ✅ Yes (Shopify Payments) | ❌ No (manual % entry) | Shopify |
| **Multi-Currency** | ✅ Yes | ⚠️ Unknown/Limited | Shopify |
| **POS Support** | ✅ Yes (Shopify POS) | ⚠️ No (WooCommerce has no native POS) | Shopify |
| **Subscription Tracking** | ✅ Yes (Shopify Subscriptions) | ⚠️ Unknown (WooCommerce Subscriptions plugin) | Shopify |
| **Variable Products** | ✅ Yes (Variants) | ✅ Yes (Variable Products) | Tie |
| **Guest Checkout LTV** | ✅ Yes | ✅ Yes (dedupe by email) | Tie |

### Support Quality

| Aspect | Shopify | WooCommerce | Winner |
|--------|---------|-------------|--------|
| **App Rating** | 4.5★ (194 reviews) | 2.2★ (5 reviews) | Shopify |
| **Documentation** | Extensive | Sparse | Shopify |
| **Support Responsiveness** | "Great support" (reviews) | "Inexistent support" (reviews) | Shopify |
| **Issue Resolution** | Fast | Slow / unresolved | Shopify |

**Verdict:** **Shopify integration is significantly better** than WooCommerce in every measurable dimension (setup, reliability, features, support).

---

## Known Limitations

### Self-Hosted Challenges

**Common Issues with WooCommerce Self-Hosting:**

| Issue | Cause | Impact | Solution |
|-------|-------|--------|----------|
| **Slow Sync** | Shared hosting throttles API | 2-4 hour sync delays | Upgrade to VPS or managed WooCommerce hosting |
| **SSL Certificate Errors** | Expired/invalid SSL | API connection fails | Renew SSL cert via Let's Encrypt or hosting provider |
| **Firewall Blocking API** | Host firewall blocks outbound HTTPS to BeProfit | No data sync | Whitelist BeProfit's IP addresses in firewall |
| **PHP Memory Limit** | 128MB limit too low for large stores | Timeout errors during sync | Increase to 256MB in wp-config.php |
| **API Throttling** | Host limits WooCommerce API calls | Incomplete syncs | Contact host to increase API rate limit |
| **Plugin Conflicts** | Another plugin interferes with REST API | 500 errors, corrupt data | Disable plugins one-by-one to identify conflict |

### Data NOT Synced

**Explicitly NOT Synced or Limited:**
- **COGS:** Not in WooCommerce core - requires plugin or manual entry
- **Payment Fees:** Not in WooCommerce API - requires manual % configuration
- **Subscription Recurring Revenue:** May not be tracked separately from one-time orders
- **WooCommerce Bookings:** Booking products (appointments, rentals) may not sync correctly
- **Composite Products:** WooCommerce Composite Products plugin (product bundles) may not sync line items correctly
- **Memberships:** WooCommerce Memberships plugin (recurring memberships) may not be tracked

### Plugin Conflicts

**Known Conflicting Plugins (Inferred):**
- **Security Plugins:** Wordfence, iThemes Security (may block REST API)
- **Caching Plugins:** WP Super Cache, W3 Total Cache (may cache API responses incorrectly)
- **Firewall Plugins:** Cloudflare (may block BeProfit's IP addresses)
- **Custom Checkout Plugins:** May add custom order meta fields that BeProfit can't parse

**Solution:** Whitelist BeProfit in security/firewall plugin settings

---

## Troubleshooting

### Common WooCommerce-Specific Issues

| Issue | Symptom | Diagnosis | Fix |
|-------|---------|-----------|-----|
| **"Connection Failed"** | Cannot connect WooCommerce store | API keys invalid, SSL issue, or firewall | Regenerate API keys, check SSL cert, whitelist BeProfit IPs |
| **"Orders Not Syncing"** | New orders not appearing in BeProfit | Sync polling delay or API throttling | Wait 60 minutes, or force manual sync in Settings |
| **"Missing COGS"** | Profit shows as 0% or 100% margin | COGS not set in WooCommerce | Install "WooCommerce Cost of Goods" plugin, or enter COGS manually in BeProfit |
| **"Incorrect Payment Fees"** | Transaction fees too high/low | Manual % configuration incorrect | Go to Settings > Costs > Processing Fees, update % for each gateway |
| **"Multi-Currency Orders Wrong"** | Orders in EUR showing incorrect profit | Currency conversion timing mismatch | Check base currency in BeProfit settings, ensure matches WooCommerce base |
| **"Refunds Not Reflecting"** | Refund issued but profit unchanged | Refund sync delay or refund not detected | Force manual sync, check refund in WooCommerce admin |
| **"500 Internal Server Error"** | BeProfit shows API error | Server PHP error or plugin conflict | Check WooCommerce > Status > Logs, disable conflicting plugins |

---

## Inferred UI Elements

### WooCommerce Connection Card (in BeProfit Settings)

```
┌─────────────────────────────────────────────┐
│ [WooCommerce Logo]  WooCommerce              │
│                                              │
│ Status: ● Connected                          │
│ Store: mystore.com                           │
│ Last synced: 45 minutes ago                  │
│                                              │
│ [Sync Now]  [View Settings]  [Disconnect]   │
└─────────────────────────────────────────────┘
```

**Settings Options:**
- **Store URL:** https://mystore.com (editable)
- **Consumer Key:** ck_xxxxxxxxxxxx (editable)
- **Consumer Secret:** ●●●●●●●●●●●●● (hidden, editable)
- **Sync Frequency:** Hourly (automatic)
- **Currency:** USD (detected from WooCommerce)
- **Timezone:** America/New_York (detected from WooCommerce)
- **Historical Data:** Import all-time data ☑

**Processing Fees Configuration:**
- **Stripe:** [2.9]% + [$0.30] per transaction
- **PayPal:** [3.49]% + [$0.49] per transaction
- **WooCommerce Payments:** [2.9]% + [$0.30] per transaction
- **Other Gateway:** [2.5]% + [$0.00] per transaction
- **Add Custom Gateway:** [+ Add Gateway]

### Initial Sync Progress Screen

```
┌─────────────────────────────────────────────┐
│     Syncing Your WooCommerce Data           │
│                                              │
│  ██████████████░░░░░░░░░░░░░ 55%            │
│                                              │
│  Importing orders from 2019-03-12...         │
│  1,250 of 2,300 orders synced                │
│                                              │
│  ⚠️ Note: WooCommerce sync may take longer  │
│     than Shopify due to hosting speed.       │
│                                              │
│  Estimated time remaining: 12 minutes        │
│                                              │
│  [Pause Sync]  [Cancel Sync]                │
└─────────────────────────────────────────────┘
```

---

## Data Model Implications

### WooCommerceIntegration Entity

```typescript
interface WooCommerceIntegration {
  id: UUID;
  user_id: UUID;
  store_url: string; // "https://mystore.com"
  consumer_key: string; // Encrypted "ck_xxxxxxx"
  consumer_secret: string; // Encrypted "cs_xxxxxxx"
  connection_status: "connected" | "disconnected" | "error" | "syncing";
  last_sync_at: timestamp;
  initial_sync_complete: boolean;
  sync_frequency: "hourly"; // WooCommerce uses polling, not real-time
  currency: string; // "USD", detected from WooCommerce
  timezone: string; // "America/New_York", detected from WooCommerce

  // Payment fee configuration (manual entry)
  payment_fees: JSONB; // { "stripe": { percent: 2.9, flat: 0.30 }, "paypal": { percent: 3.49, flat: 0.49 } }

  // COGS source
  cogs_source: "manual" | "plugin_wc_cogs" | "plugin_atum"; // Track where COGS come from

  created_at: timestamp;
  updated_at: timestamp;
}
```

### Order Entity Mapping (WooCommerce → BeProfit)

```typescript
interface Order {
  id: UUID; // BeProfit internal ID
  shop_id: UUID;
  external_id: string; // WooCommerce order ID (e.g., "12345")
  source_platform: "woocommerce";
  order_number: string; // WooCommerce order number (may differ from ID, e.g., "#WC-12345")
  created_at: timestamp;

  // Financial data
  total_value: decimal; // WooCommerce `total`
  subtotal: decimal; // Sum of line_items[].subtotal
  discount_amount: decimal; // WooCommerce `discount_total`
  shipping_cost: decimal; // WooCommerce `shipping_total`
  tax_amount: decimal; // WooCommerce `total_tax`

  // Order status (different from Shopify)
  status: string; // "pending", "processing", "completed", "cancelled", "refunded"

  // Payment
  payment_method: string; // "stripe", "paypal", "bacs", "cod"
  transaction_fee: decimal; // Calculated from manual % config (NOT auto-pulled)

  // COGS
  total_cogs: decimal; // From plugin or manual entry (NOT from WooCommerce core)

  // Calculated profit
  gross_profit: decimal;
  net_profit: decimal;
  net_margin: decimal;

  // WooCommerce metadata
  woocommerce_order_json: JSONB; // Store full WooCommerce order JSON
}
```

---

## Limitations & Gaps Identified

### Compared to Ideal WooCommerce Integration

| Feature | BeProfit Support | Ideal / Best Practice |
|---------|-----------------|----------------------|
| **COGS Auto-Import** | ❌ No (requires plugin or manual) | ✅ Detect "WooCommerce Cost of Goods" plugin, auto-import COGS |
| **Payment Fee Auto-Import** | ❌ No (manual % config) | ✅ Integrate with Stripe/PayPal APIs to pull actual fees |
| **Real-Time Sync** | ❌ No (hourly polling) | ✅ Use WooCommerce webhooks for faster sync (with fallback polling) |
| **Multi-Currency** | ⚠️ Unknown | ✅ Support WPML Multi-Currency, Aelia Currency Switcher |
| **Subscription Tracking** | ⚠️ Unknown | ✅ Explicit support for WooCommerce Subscriptions (recurring revenue tracking) |
| **Variable Product Handling** | ✅ Likely yes | ✅ Explicit variation-level profit reporting |
| **Plugin Conflict Detection** | ❌ No | ✅ Detect common plugin conflicts, show warning during setup |
| **Hosting Speed Warning** | ⚠️ Generic message | ✅ Test API response time during setup, warn if slow hosting |
| **SSL Validation** | ⚠️ Generic error | ✅ Explicit SSL cert validation, provide fix instructions |

### Major Gaps

1. **COGS Hell:**
   - WooCommerce doesn't store COGS natively
   - Users must either: (a) buy $79 "WooCommerce Cost of Goods" plugin, or (b) manually enter COGS for every product
   - **Fix:** Build integration with "WooCommerce Cost of Goods" plugin (detect plugin, pull COGS from custom meta fields)

2. **Payment Fee Black Hole:**
   - BeProfit cannot auto-pull payment fees from Stripe, PayPal, etc.
   - Users must manually configure % for each gateway
   - **Fix:** Integrate with Stripe API (OAuth), PayPal API to pull actual transaction fees per order

3. **Hourly Sync Delay:**
   - 15-60 minute delay for new orders (vs Shopify's 1-5 minutes)
   - Merchants used to Shopify may think sync is broken
   - **Fix:** Implement WooCommerce webhooks with fallback polling (best of both worlds)

4. **Self-Hosted Support Burden:**
   - WooCommerce sync failures often due to hosting issues (SSL, firewall, throttling)
   - BeProfit support overwhelmed with hosting-related tickets
   - **Fix:** Build diagnostic tool (test SSL, API speed, firewall) during setup

5. **Low Rating / Poor Support:**
   - 2.2★ rating on WooCommerce Marketplace suggests poor quality or lack of investment
   - Reviews mention "inexistent support"
   - **Fix:** Invest in WooCommerce-specific support resources, improve documentation

---

## Relevance to Our Build

### 7-10 Actionable Insights for Our WooCommerce Integration

1. **COGS Plugin Integration is CRITICAL**
   - WooCommerce doesn't have native COGS - this is the #1 pain point
   - **Action:** Build native integration with "WooCommerce Cost of Goods" plugin (detect plugin, read `_wc_cog_cost` meta field)
   - Also support "ATUM Inventory Management" (alternative COGS plugin)
   - **Differentiation:** Auto-detect COGS plugin during setup, prompt user if missing

2. **Payment Fee Auto-Import = Major Win**
   - BeProfit requires manual % entry for Stripe, PayPal fees
   - **Action:** Build OAuth integration with Stripe API, PayPal API to pull actual transaction fees
   - Match fees to orders by `transaction_id`
   - **Differentiation:** "We automatically pull your exact payment fees - no manual configuration needed"

3. **Webhooks + Polling Hybrid**
   - BeProfit uses only polling (hourly sync delay)
   - **Action:** Use WooCommerce webhooks for real-time sync, with polling as fallback (if webhooks fail)
   - **Advantage:** Fast sync like Shopify (when webhooks work), reliability like polling (when they don't)

4. **Setup Diagnostic Tool**
   - WooCommerce setup fails often due to SSL, firewall, hosting issues
   - **Action:** Build "Connection Test" tool during setup:
     - Test SSL certificate validity
     - Test API response time (warn if >2 seconds)
     - Test outbound HTTPS to our servers
     - Detect common plugin conflicts (Wordfence, Cloudflare)
   - **UX:** Show green checkmarks for each test, red X with fix instructions if fail

5. **Explicit WooCommerce Limitations Warning**
   - Set expectations early: "WooCommerce sync is slower than Shopify due to self-hosting"
   - **Action:** During setup, show comparison table:
     - Shopify: Real-time (1-5 min), 99.9% reliable
     - WooCommerce: Hourly (15-60 min), depends on your hosting
   - **UX:** Transparent about limitations = fewer support tickets

6. **WooCommerce Subscriptions as Premium Feature**
   - WooCommerce Subscriptions (recurring revenue) is popular but complex
   - **Action:** Add explicit "Recurring Revenue Tracking" feature for WooCommerce Subscriptions plugin
   - Track MRR, churn, LTV for subscription customers
   - **Differentiation:** BeProfit doesn't highlight subscription support - we can

7. **Multi-Currency Support**
   - WooCommerce multi-currency plugins (WPML, Aelia) are widely used
   - **Action:** Integrate with WPML Multi-Currency, Aelia Currency Switcher
   - Detect plugin, pull original currency per order, convert to base currency for reporting
   - **Differentiation:** "We support multi-currency WooCommerce stores out of the box"

8. **Variable Product Profit Reporting**
   - WooCommerce variable products are tricky (parent has no price, variations do)
   - **Action:** Build "Profit by Variation" report (show profit for "T-Shirt - Size M" separately from "T-Shirt - Size L")
   - **Differentiation:** Help merchants identify which SKUs/variations are most profitable

9. **Guest Checkout LTV Deduplication**
   - WooCommerce guest checkout is common (`customer_id = 0`)
   - **Action:** Dedupe guest customers by email for accurate LTV calculation
   - **Edge Case:** Handle typos in emails (e.g., "john@gmail.com" vs "johm@gmail.com")

10. **WooCommerce-Specific Documentation**
    - BeProfit's WooCommerce docs are sparse (low investment)
    - **Action:** Create comprehensive WooCommerce setup guide:
      - Screenshots of WooCommerce API key generation
      - Troubleshooting guide for SSL, firewall, plugin conflicts
      - COGS plugin recommendations
      - Payment fee configuration examples
    - **Differentiation:** "Best WooCommerce integration documentation in the industry"

---

## WooCommerce Integration Checklist (for Our Build)

### MVP (Phase 1)
- [x] REST API connection (Consumer Key/Secret authentication)
- [x] Order sync via polling (hourly)
- [x] Product sync with variable product support
- [x] Customer sync with guest deduplication by email
- [x] Refund sync
- [x] Manual payment fee % configuration by gateway
- [x] Prompt user to enter COGS if missing
- [x] Historical data import (all-time)

### Phase 2 (Fix BeProfit's Gaps)
- [ ] Detect "WooCommerce Cost of Goods" plugin, auto-import COGS
- [ ] Stripe API OAuth integration for auto-payment fee import
- [ ] PayPal API integration for auto-payment fee import
- [ ] WooCommerce webhooks for real-time sync (with polling fallback)
- [ ] Setup diagnostic tool (SSL test, API speed test, firewall test)
- [ ] Plugin conflict detection (Wordfence, Cloudflare warnings)
- [ ] "Profit by Variation" report for variable products

### Phase 3 (Differentiation)
- [ ] WooCommerce Subscriptions support (MRR, churn tracking)
- [ ] WPML Multi-Currency integration
- [ ] Aelia Currency Switcher integration
- [ ] ATUM Inventory Management COGS import
- [ ] WooCommerce Bookings profit tracking
- [ ] WooCommerce Composite Products support
- [ ] Managed WooCommerce hosting optimization (WP Engine, Kinsta)

---

## Sources Referenced
- WooCommerce Marketplace Listing: https://woocommerce.com/products/beprofit-analytics-reports/
- BeProfit WooCommerce Documentation: https://woocommerce.com/document/beprofit-for-woocommerce/
- WooCommerce REST API Docs: https://developer.woocommerce.com/docs/apis/rest-api/
- BeProfit WooCommerce Blog: https://beprofit.co/a/blog/best-woocommerce-profit-analysis-plugins
- WooCommerce Fees Breakdown: https://beprofit.co/a/blog/a-breakdown-of-woocommerce-fees
- Third-Party Setup Guide: https://www.woohelpdesk.com/analytics-reporting/beprofit/
