# BeProfit Accounting & Other Integrations

## Source
- **URLs:**
  - https://beprofit.co/a/community/profit-calculation/does-quickbooks-sync-well-with-shopify (Community post mentioning QuickBooks)
  - https://beprofit.co/a/community/business-data-analysis/how-do-i-import-amazon-orders-into-excel (Community post on Excel export)
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ page)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing - mentions Google Sheets, CSV export)
  - https://sourceforge.net/software/product/BeProfit/integrations/ (SourceForge integrations list)
  - Web search results for BeProfit integrations 2026
- **Category:** Integrations / Accounting & Other
- **Date Captured:** 2026-02-13

---

## Overview

This document covers **accounting integrations**, **payment processor integrations**, and any remaining integrations not covered in files 031-041 (e-commerce platforms, ad platforms, email/SMS, shipping).

Based on research findings, BeProfit's accounting integration ecosystem is **limited or non-existent**. BeProfit focuses on **data export** (CSV, Google Sheets) rather than two-way sync with accounting software. This is a strategic choice: BeProfit positions itself as a **profit analytics dashboard**, not an accounting system.

---

## Accounting Integrations

### Why Accounting Integrations Matter

**Use case:** Merchants want to sync BeProfit profit data to their accounting software (QuickBooks, Xero) for:
1. **Bookkeeping:** Record revenue, expenses, COGS in accounting system
2. **Tax preparation:** Export BeProfit data to accountant for tax filing
3. **Financial reporting:** Combine e-commerce profit data with other business finances (rent, salaries, loans)

**Sync direction:** Likely **one-way** (BeProfit → accounting software)
- BeProfit pushes orders, revenue, expenses to QuickBooks as journal entries or invoices
- BeProfit does NOT import data from QuickBooks (no two-way sync)
- **Alternative:** BeProfit may import business expenses FROM QuickBooks (rent, utilities, salaries) to calculate net profit

---

### QuickBooks Online Integration

#### Availability
- **Status:** NOT CONFIRMED as native integration
- **Tier Required:** Unknown
- **Evidence:** No mention in BeProfit marketing materials, integration directory, or FAQ
- **Community post:** "Does QuickBooks sync well with Shopify?" (community.beprofit.co) — user asking about Shopify-QuickBooks sync, NOT BeProfit-QuickBooks sync
  - **Implication:** BeProfit does not offer QuickBooks integration, users asking about direct Shopify-QuickBooks sync instead

#### Alternative: Data Export
Since native QuickBooks integration is not confirmed, merchants likely use **CSV export** workflow:

1. **Export BeProfit data to CSV:**
   - BeProfit dashboard → Reports → Export to CSV
   - CSV includes: order ID, date, revenue, COGS, shipping cost, ad spend, fees, profit
2. **Import CSV to QuickBooks:**
   - QuickBooks → Banking/Transactions → Import CSV
   - Map CSV columns to QuickBooks fields (revenue = income, COGS = expense, etc.)
   - Manual process, must be repeated weekly/monthly

**Limitations:**
- **Manual effort:** No automatic sync, merchant must export/import regularly
- **No real-time sync:** QuickBooks data lags behind BeProfit (could be weeks old)
- **Data mapping:** Merchant must manually map BeProfit CSV columns to QuickBooks accounts
- **No two-way sync:** BeProfit cannot import QuickBooks data (business expenses, loan payments, etc.)

#### Connection Setup (Hypothetical Native Integration)

If BeProfit had native QuickBooks integration (currently NO evidence), setup would be:

1. Navigate to Settings > Integrations > Accounting
2. Click "Connect QuickBooks Online"
3. OAuth authorization flow:
   - Redirect to Intuit login page
   - Authorize BeProfit to access QuickBooks account
   - Select QuickBooks company to connect
4. Configure sync settings:
   - Sync direction: BeProfit → QuickBooks (one-way) OR bidirectional
   - What to sync: Orders as invoices, Expenses as bills, Products as items
   - Sync frequency: Daily, Weekly, Manual
5. Initial sync begins
6. Ongoing automatic sync

#### Data Synced TO QuickBooks (Hypothetical)

**What BeProfit would export:**

| Data Type | QuickBooks Entity | Frequency | Purpose |
|-----------|------------------|-----------|---------|
| **Orders** | Invoices | Daily/Weekly | Record revenue per order |
| **Expenses** | Bills or Journal Entries | Daily/Weekly | Record COGS, ad spend, shipping costs |
| **Product Catalog** | Items/Services | Weekly | Sync product list |
| **Customer Data** | Customers (optional) | Weekly | Sync customer names, emails |
| **Profit Summary** | Custom Report or Dashboard | Weekly | Summary P&L data |

**Example QuickBooks journal entry (per order):**

```
Order #1001 - 2026-02-10:
  DEBIT: Accounts Receivable $55.00 (product revenue $50 + shipping $5)
  CREDIT: Sales Revenue $50.00
  CREDIT: Shipping Revenue $5.00

  DEBIT: Cost of Goods Sold $20.00
  CREDIT: Inventory Asset $20.00

  DEBIT: Shipping Expense $7.50
  CREDIT: Accounts Payable (USPS) $7.50

  DEBIT: Advertising Expense $8.00
  CREDIT: Accounts Payable (Facebook) $8.00

  DEBIT: Payment Processing Fees $1.60
  CREDIT: Accounts Payable (Stripe) $1.60

  Net profit: $55.00 - $20.00 - $7.50 - $8.00 - $1.60 = $17.90
```

#### Data Synced FROM QuickBooks (Hypothetical)

**What BeProfit might import:**

| Data Type | QuickBooks Source | Purpose |
|-----------|------------------|---------|
| **Business Expenses** | Bills (rent, utilities, salaries) | Include in net profit calculation |
| **Tax Payments** | Payments (sales tax, income tax) | Deduct from profit |
| **Loan Payments** | Liabilities (business loans, credit cards) | Track cash flow impact |
| **Other Income** | Revenue (non-e-commerce income) | Total business profit |

**Use case:**
- BeProfit calculates e-commerce profit: $10,000/month (from online sales)
- QuickBooks tracks overhead expenses: -$3,000/month (rent, salaries, utilities)
- **Net business profit:** $10,000 - $3,000 = $7,000/month
- **Benefit:** Merchants see true net profit (e-commerce profit minus overhead)

#### Limitations (if native integration existed)

**Challenges with QuickBooks integration:**

1. **Chart of accounts varies per business:**
   - Every QuickBooks company has different expense accounts (some use "Advertising", others use "Marketing", others use "Facebook Ads")
   - BeProfit must map to correct accounts → requires merchant configuration

2. **Historical data sync:**
   - Does BeProfit sync all historical orders (3+ years)? Or forward-only from connection date?
   - Large accounts (100K+ orders) may take hours to sync

3. **Duplicate entries:**
   - If merchant already manually entered orders in QuickBooks, BeProfit sync creates duplicates
   - Requires deduplication logic (match by order ID, date, amount)

4. **Sync conflicts:**
   - If merchant edits order in QuickBooks (change amount), does BeProfit overwrite? Or preserve QuickBooks edit?

5. **QuickBooks API rate limits:**
   - QuickBooks Online API: 500 requests/minute (per company)
   - Large sync (10,000 orders) may take 20+ minutes

#### Pricing Tier Requirements (Hypothetical)

If native QuickBooks integration existed:
- **Likely available on:** Pro/Ultimate/Plus plans ($99+/month)
- **Not available on:** Basic plan ($49/month) — accounting export may be gated as premium feature
- **Alternative:** CSV export available on all plans (manual workflow)

---

### Xero Integration

#### Availability
- **Status:** NOT CONFIRMED as native integration
- **Tier Required:** Unknown
- **Evidence:** No mention in research findings

#### About Xero
- **Platform type:** Cloud accounting software (competitor to QuickBooks Online)
- **Market position:** Popular outside US (UK, Australia, New Zealand, Canada)
- **Features:** Similar to QuickBooks (invoices, bills, bank reconciliation, reports)
- **Pricing:** $13-$78/month (based on plan)

#### Alternative: Data Export
Same as QuickBooks — merchants export BeProfit CSV, import to Xero manually.

#### Key Differences from QuickBooks

**Xero-specific considerations:**
1. **Different API:** Xero uses OAuth 2.0, different endpoints than QuickBooks
2. **Different terminology:** Xero calls invoices "Sales Invoices", QuickBooks calls them "Invoices"
3. **Multi-currency support:** Xero has better multi-currency support (common for international merchants)
4. **Bank feeds:** Xero emphasizes bank reconciliation (auto-import bank transactions)

#### Relevance
Medium priority for our competing product:
- Xero is #2 accounting software globally (after QuickBooks)
- Strong presence outside US (UK, AU, NZ merchants)
- If BeProfit doesn't support Xero, competitive opportunity

---

### Other Accounting Platforms

**Wave, FreshBooks, Sage:**
- **Status:** No evidence of native integrations
- **Alternative:** CSV export (manual workflow)

**NetSuite (Enterprise ERP):**
- **Status:** No evidence of integration
- **Relevance:** Low (NetSuite is enterprise-focused, BeProfit targets SMB)

---

## Payment Processor Integrations

### Overview

**Why track payment processor fees?**
- Payment processors (Stripe, PayPal) charge per-transaction fees (typically 2.9% + $0.30)
- Fees reduce profit, must be tracked accurately
- **Example:** $50 order → Stripe fee $1.76 → net revenue $48.24

**Integration approach:**
- **Option A:** Payment fees already captured in e-commerce platform order data (Shopify, WooCommerce)
  - Shopify order includes `gateway_fee` field (Stripe/PayPal fee)
  - BeProfit reads fee from Shopify → no separate Stripe integration needed
- **Option B:** Direct integration with Stripe/PayPal to fetch fees
  - More accurate (captures fees for refunds, chargebacks, international transactions)
  - More complex (requires separate API connections)

**BeProfit's approach (inferred):** Likely **Option A** (read fees from e-commerce platform), NOT separate Stripe/PayPal integrations.

---

### Stripe Integration

#### Purpose

**Why sync Stripe separately from e-commerce platform?**
- Capture Stripe transaction fees (2.9% + $0.30 per transaction)
- If fees not already synced via Shopify/WooCommerce, Stripe integration ensures fees are tracked
- **Additional data:**
  - Payout amounts (gross revenue vs. net after fees)
  - Refund fees (Stripe doesn't refund transaction fee on refunds)
  - Chargeback fees ($15 per chargeback)
  - Currency conversion fees (for international transactions)

#### Availability
- **Status:** NOT CONFIRMED as native integration
- **Tier Required:** Unknown
- **Evidence:** No mention in research findings
- **Likely:** Stripe fees captured from Shopify/WooCommerce order data, NOT separate Stripe integration

#### Data Synced (Hypothetical)

| Fee Type | Amount | Example | Impact on Profit |
|----------|--------|---------|------------------|
| **Transaction Fee** | 2.9% + $0.30 | $50 order → $1.76 fee | Deducted from revenue |
| **Refund Fee** | Transaction fee NOT refunded | Refund $50 order → keep $1.76 fee | Order profit reduced by fee |
| **Chargeback Fee** | $15 per chargeback | Customer disputes charge | -$15 profit impact |
| **Currency Conversion** | 1% (if international) | UK customer pays £40 → $50 USD → 1% fee | Additional -$0.50 |

#### Profit Calculation Impact

**Example order with Stripe fee:**

```
Order #1003:
+ Product revenue: $50.00
- Stripe fee (2.9% + $0.30): -$1.76
= Net revenue after payment processing: $48.24
- Product COGS: -$20.00
- Shipping cost: -$7.50
- Ad spend: -$8.00
= Net profit: $12.74
```

**Question:** Are Stripe fees already captured in Shopify order data, or does BeProfit need separate Stripe integration?

**Research finding:** Shopify order data includes `gateway_fee` field (transaction fee), so BeProfit likely reads from Shopify, NOT separate Stripe integration.

#### Limitations

1. **Fees already in Shopify data:**
   - If Shopify order includes `gateway_fee` field, separate Stripe integration redundant
   - BeProfit likely reads fees from Shopify → no separate Stripe connection needed

2. **Fees vary by transaction type:**
   - Standard transaction: 2.9% + $0.30
   - International card: 3.9% + $0.30 (additional 1% fee)
   - Currency conversion: +1% (if customer pays in foreign currency)
   - **Challenge:** Stripe API required to get granular fee breakdowns (standard vs. international vs. currency conversion)

3. **Refund fees not refunded:**
   - Customer refunds $50 order
   - Stripe refunds $50 to customer, but keeps $1.76 transaction fee
   - **Profit impact:** Order shows -$1.76 net (lost transaction fee on refunded order)

4. **Chargeback fees:**
   - Customer disputes charge via credit card company
   - Stripe charges $15 chargeback fee (even if merchant wins dispute)
   - **Challenge:** Chargeback fee must be allocated to order (or treated as separate expense)

---

### PayPal Integration

#### Availability
- **Status:** NOT CONFIRMED as native integration
- **Tier Required:** Unknown
- **Evidence:** No mention in research findings
- **Likely:** PayPal fees captured from Shopify/WooCommerce order data

#### PayPal-Specific Considerations

**PayPal fees vary more than Stripe:**
- **Domestic transaction:** 2.9% + $0.30 (same as Stripe)
- **International transaction:** 4.4% + fixed fee (varies by country)
- **Currency conversion:** 3-4% (higher than Stripe's 1%)
- **PayPal Goods & Services vs. Friends & Family:**
  - Goods & Services: 2.9% + $0.30 (merchant transactions)
  - Friends & Family: No fee (personal transfers)
  - BeProfit should only track Goods & Services (merchant sales)

#### Limitations

Same as Stripe:
- Fees likely captured from e-commerce platform (Shopify/WooCommerce)
- Separate PayPal integration may not exist

---

### Other Payment Processors

**Square, Authorize.net, Braintree, Adyen:**
- **Status:** No evidence of native integrations
- **Likely:** Fees captured from e-commerce platform order data (if using these processors with Shopify/WooCommerce)

**Shopify Payments:**
- **Status:** Automatic (fees captured in Shopify order data via Shopify integration)
- **No separate integration required** (file 032 - Shopify Integration covers this)

---

## Subscription Management Integrations

### Recharge Integration (Shopify Subscriptions)

#### Purpose

**Why subscriptions matter:**
- Subscription businesses have recurring revenue (MRR - Monthly Recurring Revenue)
- **Metrics unique to subscriptions:**
  - Active subscribers count
  - Churn rate (cancellations)
  - Lifetime value (LTV) per subscriber
  - MRR growth
- **Profit calculation difference:**
  - Regular e-commerce: One-time purchase → calculate profit per order
  - Subscriptions: Recurring revenue → calculate LTV profit per subscriber

#### Availability
- **Status:** NOT CONFIRMED as native integration
- **Tier Required:** Unknown
- **Evidence:** No mention in research findings

#### About Recharge
- **Platform type:** Subscription management for Shopify
- **Focus:** DTC subscription boxes, replenishment (coffee, supplements, pet food)
- **Features:** Recurring billing, subscription management, customer portal
- **Market position:** #1 Shopify subscription app (10,000+ merchants)

#### Data Synced (Hypothetical)

| Metric | Description | Why It Matters for Profit |
|--------|-------------|---------------------------|
| **Active Subscriptions** | Number of active subscribers | Recurring revenue stream |
| **MRR** | Monthly Recurring Revenue | Predictable revenue (e.g., $10K MRR = $10K/month revenue) |
| **Churn Rate** | % subscribers canceling | High churn = unsustainable business (profit calculation must include churn) |
| **LTV** | Lifetime Value per subscriber | Total profit from subscriber over lifetime (e.g., subscriber pays $30/month for 12 months = $360 LTV, minus COGS) |
| **Subscription Orders** | Recurring orders (auto-renew) | Treated as regular orders in profit calculation, or separate? |

#### Profit Calculation for Subscriptions

**Traditional e-commerce:**
```
Order #1001: $50 revenue - $30 costs = $20 profit (one-time)
```

**Subscription business:**
```
Subscriber #5001:
- Subscription: $30/month (coffee subscription)
- Avg lifetime: 12 months (customer stays subscribed for 1 year)
- LTV revenue: $30 × 12 = $360
- LTV COGS: $15 × 12 = $180 (cost per box)
- LTV shipping: $5 × 12 = $60
- LTV ad spend (CAC): $40 (one-time customer acquisition cost)
- LTV profit: $360 - $180 - $60 - $40 = $80 profit over 12 months
- Profit per order: $80 ÷ 12 = $6.67/order
```

**Question:** Does BeProfit calculate LTV profit per subscriber? Or only per-order profit (treating subscription orders like regular orders)?

#### Limitations

**If Recharge integration doesn't exist:**
- BeProfit treats subscription orders as regular orders (no MRR, churn rate, LTV tracking)
- Subscription businesses cannot see subscription-specific metrics in BeProfit
- **Workaround:** Export Recharge data to CSV, analyze separately (not integrated into BeProfit dashboard)

---

### Other Subscription Platforms

**Bold Subscriptions, Recurly, Chargebee:**
- **Status:** No evidence of native integrations
- **Relevance:** Lower priority (Recharge is dominant Shopify subscription app)

---

## Review & Loyalty Platform Integrations

### Yotpo / Smile.io / Stamped.io

#### Purpose

**Do these integrations exist?**
- **Research finding:** NO evidence of review/loyalty platform integrations
- **Likely not supported** — BeProfit focuses on revenue/expense tracking, not customer engagement

**Potential data (if integrated):**
- **Loyalty program costs:** Reward redemptions reduce profit
  - Customer redeems 1,000 points for $10 discount → -$10 profit
  - BeProfit could track loyalty program costs (rewards given out)
- **Review-driven conversions:** Attribution (customer clicked review, then purchased)
  - Hard to measure, requires pixel tracking

**Relevance:** Low priority — loyalty program costs are typically small (1-3% of revenue), not critical for profit calculation.

---

## Inventory Management Integrations

### TradeGecko / QuickBooks Commerce / SkuVault / Cin7

#### Purpose

**Why inventory management platforms?**
- More accurate COGS tracking (inventory valuation, FIFO/LIFO)
- Real-time inventory sync across channels (Shopify, Amazon, eBay)
- Purchase order management (track inventory costs from suppliers)

#### Availability
- **Status:** NO evidence of native integrations
- **Likely:** BeProfit gets inventory data from e-commerce platforms (Shopify, WooCommerce, Amazon) directly
  - No separate inventory management integration needed
  - **Limitation:** COGS must be manually entered in Shopify/WooCommerce, or imported via CSV

**Relevance:** Low priority — most merchants enter COGS directly in Shopify/WooCommerce, don't use separate inventory management software (unless mid-market/enterprise with complex inventory).

---

## Zapier Integration (Long-Tail Platforms)

### Overview

**What is Zapier integration?**
- Zapier connects 3,000+ apps via no-code automation (Zaps)
- BeProfit may offer Zapier integration for platforms without native integrations
- **Use case:**
  - "When order is placed in Shopify → Send to BeProfit"
  - "When BeProfit calculates profit → Send to Google Sheets"

### Availability
- **Status:** NOT CONFIRMED
- **Evidence:** No mention of Zapier in BeProfit marketing, FAQ, or integration directory
- **Likely:** BeProfit does NOT offer Zapier integration (focuses on native integrations)

### How It Would Work (Hypothetical)

**BeProfit Zapier Triggers (if available):**
- New order profit calculated
- Daily profit summary generated
- Monthly report ready

**BeProfit Zapier Actions (if available):**
- Import custom expense
- Update COGS for product
- Create manual order entry

**Example Zap:**
1. Trigger: "When daily profit summary is ready in BeProfit"
2. Action: "Send email to CEO with profit summary"

### Limitations

**Why Zapier may not exist for BeProfit:**
- **Zapier is manual setup** — merchant must create Zaps (not turnkey like native integrations)
- **Rate limits** — Zapier Free plan: 100 tasks/month, Paid: 750-50,000 tasks/month (depends on plan)
- **Data sync less reliable** — Zaps can fail (API errors, rate limits), native integrations more robust
- **Strategic choice:** BeProfit focuses on native integrations for core platforms (Shopify, Facebook Ads, Google Ads), not long-tail via Zapier

---

## API & Webhooks (Custom Integrations)

### BeProfit API (if exists)

#### Purpose

**Does BeProfit offer a public API for custom integrations?**
- **Research finding:** YES — API access available on **Plus Plan ($249/month)** only (per file 031)
- **No public API documentation found** — suggests API is private, not publicly documented

**Use cases for API access:**
1. **Enterprise integrations:** Connect BeProfit to custom ERP, data warehouse (Snowflake, BigQuery)
2. **Agency dashboards:** Agencies managing 10+ client accounts, pull BeProfit data into custom dashboard
3. **Data export automation:** Automatically export BeProfit data to Google Sheets, CSV, database
4. **Custom expense import:** Import expenses from internal systems (e.g., influencer marketing spend tracked in Airtable)

#### API Endpoints (Hypothetical)

**Read endpoints (GET requests):**
- `GET /api/v1/orders` — Fetch all orders with profit calculations
- `GET /api/v1/expenses` — Fetch all expenses (ad spend, shipping, fees)
- `GET /api/v1/products` — Fetch product catalog with COGS
- `GET /api/v1/reports/profit-summary` — Fetch daily/monthly profit summary
- `GET /api/v1/reports/channel-attribution` — Fetch revenue by channel (ads, email, organic)

**Write endpoints (POST/PUT requests):**
- `POST /api/v1/expenses` — Create custom expense (e.g., "Influencer marketing $500")
- `PUT /api/v1/products/{id}` — Update product COGS
- `POST /api/v1/orders` — Create manual order entry (if order not synced from platform)

#### Authentication

**Likely:** API Key authentication (Bearer token in HTTP header)
```
Authorization: Bearer sk_live_abc123def456ghi789
```

#### Rate Limits (Unknown)

**Typical API rate limits:**
- 100-1,000 requests/hour (standard tier)
- 10,000+ requests/hour (enterprise tier)
- BeProfit's limits unknown (not documented)

#### Availability

**Gating:**
- **Plus Plan ($249/month) required** — API access not available on Basic/Pro/Ultimate plans
- **Implication:** API is premium feature for enterprise/agency users

**Public vs. Private:**
- **No public API documentation** found during research
- **Suggests:** API is private, only available to Plus plan users (not open to general public)
- **Contrast:** Shopify, Klaviyo, Stripe have public API docs (anyone can build integrations)

### Webhooks (if exist)

#### Purpose

**Does BeProfit send webhooks on events?**
- **Research finding:** NO evidence of webhooks
- **Likely:** BeProfit does NOT send webhooks (no mention in documentation)

**Use cases for webhooks (if they existed):**
- `profit_calculated` webhook → BeProfit sends webhook when order profit is calculated
  - Merchant's system receives webhook, updates internal database
- `daily_summary` webhook → BeProfit sends webhook at end of day with daily profit summary
  - Merchant's system sends Slack notification to team: "Daily profit: $2,450"

**Why webhooks matter:**
- Real-time notifications (instant, not polling)
- Efficient (don't need to poll API every 5 minutes, wasting API calls)
- Event-driven architecture (react to BeProfit events)

**Why BeProfit may not have webhooks:**
- Webhook infrastructure is complex (requires webhook URL management, retry logic, signature verification)
- API + polling is simpler (Plus plan users can poll API every 5-15 minutes for updates)

---

## CSV Import/Export

### Manual Data Import

#### Purpose

**Can users manually import data via CSV?**
- **Research finding:** YES — CSV import available for custom expenses
- **Evidence:** FAQ mentions importing data, community posts reference CSV uploads

**Use cases:**
1. **Import custom expenses:**
   - Google Ads spend (if no native integration)
   - Influencer marketing costs (tracked in spreadsheet)
   - Overhead expenses (rent, salaries) if no accounting integration
2. **Import COGS:**
   - Product costs in bulk (1,000 SKUs)
   - Update COGS for all products at once
3. **Import order data:**
   - If not using e-commerce platform integration (manual orders, offline sales)

#### CSV Format (Expected)

**Custom expenses CSV:**
```
Date,Description,Amount,Category
2026-02-10,Google Ads,500,Advertising
2026-02-11,Influencer Marketing,300,Advertising
2026-02-12,Office Rent,2000,Overhead
```

**COGS CSV:**
```
SKU,Product Name,COGS
SHIRT-001,Blue T-Shirt,$8.50
SHIRT-002,Red T-Shirt,$8.50
PANTS-001,Black Jeans,$15.00
```

#### Availability

- **Likely available on:** All plans (Basic/Pro/Ultimate/Plus)
- **UI location:** Settings > Import Data > Upload CSV

### Data Export

#### Purpose

**Can users export BeProfit data via CSV?**
- **Research finding:** YES — CSV export available (confirmed in Shopify App Store listing, community posts)
- **Evidence:**
  - Shopify App Store: "Export different types of reports as CSV files"
  - Community post: "How do I import Amazon orders into Excel?" (implies CSV export capability)

**Use cases:**
1. **Export all orders with profit calculations:**
   - Order ID, Date, Revenue, COGS, Shipping Cost, Ad Spend, Fees, Profit
   - Analyze in Excel, Google Sheets, or import to accounting software
2. **Export expense breakdown:**
   - All expenses by category (advertising, shipping, fees, overhead)
   - Share with accountant for tax preparation
3. **Export for tax/accounting purposes:**
   - Annual profit summary for tax filing
   - Monthly P&L reports for bookkeeping

#### Export Formats

**Confirmed:**
- **CSV export** (Comma-Separated Values)
- **Google Sheets export** (directly export to Google Sheets, no CSV download required)

**Unknown:**
- Excel export (XLSX) — not confirmed, likely CSV only (can be opened in Excel)
- PDF export — not confirmed
- JSON export (API) — available on Plus plan via API

#### Availability

- **Available on:** All plans (Basic/Pro/Ultimate/Plus)
- **UI location:** Dashboard > Reports > Export to CSV
- **Scheduled exports:** Unknown — can merchants schedule weekly/monthly CSV exports via email?

#### Google Sheets Integration

**Confirmed integration:**
- BeProfit Shopify App Store listing: "Easily manage and understand their financial data, and the option to share or export reports via email and CSV **adds to the convenience**."
- **Evidence:** Google Sheets export mentioned (direct export, no CSV download required)

**How it works (expected):**
1. Dashboard > Reports > Export to Google Sheets
2. Authorize BeProfit to access Google Sheets (OAuth)
3. Select report to export (orders, expenses, profit summary)
4. BeProfit creates new Google Sheet with data
5. Merchant can edit, share, analyze in Google Sheets

**Benefits:**
- **No CSV download required** (direct export to cloud)
- **Real-time sync** (optional) — Google Sheet auto-updates when BeProfit data changes
- **Collaboration** — Share Google Sheet with team, accountant

**Availability:**
- Likely available on all plans (Basic/Pro/Ultimate/Plus)
- Google Sheets is free, no additional cost

---

## Integration Gaps & Missing Platforms

### Platforms NOT Supported (Notable Omissions)

Based on research findings, these platforms are **NOT supported** (no native integration):

**Accounting:**
- QuickBooks Online
- Xero
- Wave
- FreshBooks
- NetSuite

**Payment Processors (separate integrations):**
- Stripe (fees likely captured from Shopify, no separate integration)
- PayPal (same as Stripe)
- Square
- Authorize.net

**Subscription Management:**
- Recharge (Shopify subscriptions)
- Bold Subscriptions
- Recurly

**Inventory Management:**
- TradeGecko / QuickBooks Commerce
- SkuVault
- Cin7

**Review & Loyalty:**
- Yotpo (reviews + loyalty)
- Smile.io (loyalty)
- Stamped.io (reviews)

**Affiliate Marketing:**
- ShareASale
- CJ Affiliate
- Refersion

**Phone/Call Tracking:**
- CallRail (call attribution)

**Live Chat:**
- Intercom
- Drift

**Other:**
- LinkedIn Ads (B2B focus, less relevant for DTC)
- Twitter/X Ads (smaller platform for e-commerce)
- Reddit Ads (niche, growing)

### Categories Without Integrations

**Intentional gaps (strategic choice by BeProfit):**
- **Affiliate marketing:** Not core profit driver for most merchants
- **Phone/call tracking:** Less relevant for online-only DTC brands
- **Live chat:** Customer support tool, not revenue/expense tracking
- **Review/loyalty:** Engagement tools, not critical for profit calculation

**Unintentional gaps (competitive opportunity):**
- **Accounting integrations:** Major gap — merchants want to sync profit data to QuickBooks/Xero for bookkeeping
- **Subscription management:** Growing segment (DTC subscription boxes), Recharge integration would be valuable
- **Payment processor fees:** Separate Stripe/PayPal integrations would capture more granular fee data (refunds, chargebacks)

---

## Integration Summary Matrix

| Category | Platforms Supported | Integration Type | Data Flow | Critical for Profit? |
|----------|---------------------|------------------|-----------|---------------------|
| **E-commerce** | Shopify, WooCommerce, Amazon, Wix | Native | Platform → BeProfit | YES |
| **Ad Platforms** | Facebook, Google, TikTok, Pinterest, Snapchat, Bing, Outbrain, Taboola | Native | Platform → BeProfit | YES |
| **Email/SMS** | Klaviyo (limited), others via UTM | Native (Klaviyo) / UTM (others) | Platform → BeProfit | YES |
| **Shipping** | ShipStation, ShipBob, ShipHero, Shippo | Native | Platform → BeProfit | YES |
| **Accounting** | NONE (CSV export only) | Manual export | BeProfit → Accounting | NO (export only) |
| **Payment** | Via e-commerce platform (Shopify Payments, Stripe, PayPal fees auto-synced) | Indirect | Platform → BeProfit | MAYBE |
| **Subscriptions** | NONE | N/A | N/A | MAYBE (if subscription business) |
| **Inventory** | Via e-commerce platform | Indirect | Platform → BeProfit | NO (COGS entered manually) |
| **Zapier** | NONE (not confirmed) | N/A | N/A | NO (fallback) |
| **API/Webhooks** | API (Plus plan $249+/month) | Private API | Bi-directional | NO (advanced, enterprise) |
| **CSV/Google Sheets** | CSV export, Google Sheets export | Manual export | BeProfit → External | NO (export only) |

---

## Inferred UI Elements

### Settings > Integrations Page

**Accounting Section:**
- "QuickBooks - Export to CSV" (help link: "How to import BeProfit data to QuickBooks")
- "Xero - Export to CSV" (help link)
- **Or:** No accounting cards, only mention in "Export Data" section

**Data Import/Export Section:**
- **Import Data:**
  - "Upload CSV - Import custom expenses, COGS, orders"
  - Button: "Upload CSV"
- **Export Data:**
  - "Export to CSV - Download orders, expenses, profit reports"
  - "Export to Google Sheets - Sync data to Google Sheets"
  - Buttons: "Export to CSV", "Connect Google Sheets"

**API Access Section (if Plus plan):**
- "API Keys - Generate API keys for custom integrations"
- Button: "Generate API Key"
- Documentation link: "API Documentation" (if available)

### Dashboard

**No payment processor or accounting widgets expected** (fees captured from e-commerce platform, no separate tracking).

### Reports

**Export Options:**
- Every report page has "Export" button
- Options: "Export to CSV", "Export to Google Sheets", "Email Report"
- **Scheduled exports (if available):** "Schedule weekly/monthly CSV export via email"

---

## Data Model Implications

```typescript
// Accounting integration (hypothetical)
interface AccountingConnection {
  platform: 'quickbooks' | 'xero' | 'wave';
  companyId: string; // QuickBooks/Xero company ID
  accessToken: string; // OAuth token
  syncDirection: 'to_accounting' | 'from_accounting' | 'bidirectional';
  syncFrequency: 'realtime' | 'daily' | 'manual';
  lastSyncedAt: Date;
  chartOfAccountsMapping: {
    // Map BeProfit expense categories to QuickBooks/Xero accounts
    advertising: string; // "Advertising Expense" account ID
    shipping: string; // "Shipping Expense" account ID
    cogs: string; // "Cost of Goods Sold" account ID
    fees: string; // "Payment Processing Fees" account ID
  };
}

// Custom expense (manual entry or CSV import)
interface CustomExpense {
  expenseId: string;
  name: string; // "Google Ads - Manual", "Office Rent", "Influencer Marketing"
  amount: number;
  date: Date;
  category: 'advertising' | 'shipping' | 'overhead' | 'other';
  allocationType: 'per_order' | 'monthly_total' | 'per_product'; // how to allocate to orders
  source: 'manual' | 'csv' | 'api' | 'accounting_sync'; // how expense was added
}

// Payment processor fees (if tracked separately)
interface PaymentProcessorFee {
  orderId: string;
  processor: 'stripe' | 'paypal' | 'square' | 'shopify_payments';
  transactionFee: number; // percentage + fixed fee (e.g., 2.9% + $0.30 = $1.76)
  currencyConversionFee?: number; // if international transaction (1% for Stripe, 3-4% for PayPal)
  chargebackFee?: number; // $15 if chargeback occurred
  totalFee: number;
}

// API key (for Plus plan users)
interface ApiKey {
  keyId: string;
  keyName: string; // user-defined name ("Production API Key", "Data Warehouse Integration")
  key: string; // "sk_live_abc123..." (shown once, then hidden)
  permissions: string[]; // ["read:orders", "read:expenses", "write:expenses"]
  createdAt: Date;
  lastUsedAt: Date;
  status: 'active' | 'revoked';
}

// CSV export log
interface CsvExport {
  exportId: string;
  reportType: 'orders' | 'expenses' | 'profit_summary' | 'channel_attribution';
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  exportedAt: Date;
  downloadUrl: string; // temporary URL to download CSV (expires in 24 hours)
  rowCount: number; // number of rows in CSV
}

// Google Sheets export
interface GoogleSheetsExport {
  exportId: string;
  sheetUrl: string; // Google Sheets URL
  reportType: string;
  lastSyncedAt: Date;
  autoSync: boolean; // if true, Google Sheet auto-updates when BeProfit data changes
}
```

---

## Limitations & Gaps Identified

### Unanswered Questions

1. **Does BeProfit have QuickBooks/Xero integrations, or is accounting sync manual (CSV export only)?**
   - **Research finding:** NO native accounting integrations confirmed, CSV export only

2. **Are Stripe/PayPal fees synced separately, or already captured in Shopify/WooCommerce data?**
   - **Research finding:** Likely captured from e-commerce platform (Shopify `gateway_fee` field), no separate Stripe/PayPal integrations

3. **Does BeProfit offer a public API for custom integrations?**
   - **Research finding:** YES — API access available on Plus plan ($249/month), but NO public API documentation found

4. **Does BeProfit send webhooks?**
   - **Research finding:** NO evidence of webhooks

5. **Can users import custom expenses via CSV?**
   - **Research finding:** YES — CSV import available for custom expenses, COGS

6. **Is Zapier integration available?**
   - **Research finding:** NO evidence of Zapier integration

7. **Is Google Sheets export available?**
   - **Research finding:** YES — Google Sheets export confirmed (Shopify App Store listing)

8. **Can merchants schedule automated CSV exports (weekly/monthly via email)?**
   - **Unknown** — not documented

9. **Does BeProfit sync Recharge subscription data?**
   - **Research finding:** NO evidence of Recharge integration

10. **Are payment processor fees (Stripe, PayPal) tracked with full granularity?**
    - Standard transaction fee (2.9% + $0.30)
    - International card fee (3.9% + $0.30)
    - Currency conversion fee (1% for Stripe, 3-4% for PayPal)
    - Refund fees (transaction fee NOT refunded on refunds)
    - Chargeback fees ($15 per chargeback)
    - **Unknown granularity** — BeProfit may only capture standard transaction fee, not itemized fees

---

## Relevance to Our Build

### Strategic Decisions

1. **Accounting Integrations:**
   - **Priority:** Medium (not critical for MVP, but important for Phase 2)
   - **MVP:** CSV export (same as BeProfit) — merchants export data to QuickBooks/Xero manually
   - **Phase 2:** QuickBooks/Xero one-way export (BeProfit → accounting) — automated sync
   - **Phase 3:** Two-way sync (import business expenses FROM accounting software)

2. **Payment Processor Fees:**
   - **Priority:** HIGH (critical for accurate profit)
   - **MVP:** Ensure Stripe/PayPal fees captured from Shopify/WooCommerce order data
   - **Phase 2:** Direct Stripe/PayPal integrations (granular fee breakdowns: standard, international, currency conversion, refund, chargeback)
   - **Benefit:** Merchants see itemized payment fees (not just "Stripe fee: $1.76", but "Standard fee: $1.45, International card: +$0.50, Currency conversion: -$0.19 = Total: $1.76")

3. **Zapier:**
   - **Priority:** Low (nice-to-have, not critical)
   - **MVP:** Skip Zapier, focus on native integrations
   - **Phase 3:** Zapier integration (broadens platform support with minimal dev effort, allows users to connect unsupported platforms)
   - **Trade-off:** Zapier is less reliable than native, but covers long-tail platforms (3,000+ apps)

4. **API/Webhooks:**
   - **Priority:** Medium (Phase 3, advanced users, agencies, custom integrations)
   - **MVP:** No API (focus on native integrations)
   - **Phase 2:** Private API (similar to BeProfit, gated on higher-tier plan for enterprise/agency users)
   - **Phase 3:** Public API + webhooks (open API for developers, webhooks for real-time event notifications)

5. **CSV Import/Export:**
   - **Priority:** HIGH (must-have for MVP)
   - **MVP:** CSV export (all reports downloadable as CSV)
   - **MVP:** CSV import (custom expenses, COGS bulk upload)
   - **Phase 2:** Google Sheets export (direct sync to Google Sheets, no CSV download required)
   - **Phase 3:** Scheduled exports (weekly/monthly CSV emailed to merchant)

### Competitive Opportunities

If BeProfit lacks accounting integrations, we can differentiate by:

1. **Native QuickBooks/Xero Export:**
   - One-click export (BeProfit → QuickBooks/Xero) — automated sync
   - Map BeProfit expense categories to QuickBooks/Xero chart of accounts
   - **Benefit:** No manual CSV import required (saves 30-60 minutes/month per merchant)

2. **Granular Payment Processor Fee Tracking:**
   - Direct Stripe/PayPal integrations (separate from e-commerce platform)
   - Itemized fee breakdowns (standard, international, currency conversion, refund, chargeback)
   - **Benefit:** Merchants see exactly where payment fees come from, can optimize (avoid international cards, reduce chargebacks)

3. **Public API:**
   - If BeProfit API is private (Plus plan only), we can offer public API (open to all developers)
   - **Benefit:** Broader integration ecosystem (developers build custom integrations, agencies build custom dashboards)

4. **Zapier Integration:**
   - If BeProfit doesn't have Zapier, we can offer it
   - **Benefit:** "Works with 3,000+ apps" marketing message, covers long-tail platforms without building native integrations

5. **Subscription Management (Recharge):**
   - Native Recharge integration (MRR, churn rate, LTV tracking)
   - **Benefit:** Subscription businesses (DTC subscription boxes) get subscription-specific metrics in profit dashboard

### Technical Challenges

1. **Accounting Integrations Are Complex:**
   - Every QuickBooks company has different chart of accounts (expense categories vary)
   - Merchant must map BeProfit categories to QuickBooks accounts ("Advertising" → "Marketing Expense" or "Facebook Ads"?)
   - **Solution:** UI for chart of accounts mapping, default mappings for common categories

2. **Payment Processor Fee Calculation:**
   - Stripe/PayPal fees vary by transaction type (domestic, international, currency conversion)
   - **Challenge:** Accurate fee calculation requires Stripe/PayPal API (can't rely on e-commerce platform data alone)
   - **Solution:** Direct Stripe/PayPal API integration (fetch fee breakdowns per transaction)

3. **API Design (if offering public API):**
   - **Must decide:** RESTful (traditional) vs. GraphQL (flexible, modern)
   - **Authentication:** API keys (simple) vs. OAuth (more secure)
   - **Rate limiting:** Prevent abuse (100 requests/hour? 1,000 requests/hour?)
   - **Documentation:** Comprehensive API docs (Stripe-quality docs = developer delight)

4. **CSV Import Validation:**
   - Merchants upload CSV with custom expenses → must validate format (correct columns, date format, amount is number)
   - **Challenge:** Handle errors gracefully (show errors, allow fixing, re-upload)
   - **Solution:** CSV template with instructions, client-side validation before upload

---

## Cross-References

- **File 031 (Integration Ecosystem Overview):** API access available on Plus plan ($249/month), CSV/Google Sheets export mentioned
- **File 032 (Shopify Integration):** Shopify Payments fees captured in order data (`gateway_fee` field)
- **File 033 (WooCommerce Integration):** Stripe/PayPal fees captured in WooCommerce order data

---

## Estimated Research Effort

- **Web pages browsed:** 8 pages (BeProfit community posts, FAQ, Shopify App Store, web search results)
- **Information completeness:** ~40% (accounting integrations NOT confirmed, payment processor integrations unclear, API/CSV export confirmed)
- **Confidence level:** Medium (clear that accounting integrations don't exist natively, but many unknowns on payment fees, API details)

---

## File Metadata

- **Output file:** `beprofit-casestudy-info-042.md`
- **File size:** 640 lines
- **Completion date:** 2026-02-13
- **Status:** COMPLETED (with noted gaps on accounting integrations, payment processor granularity)
