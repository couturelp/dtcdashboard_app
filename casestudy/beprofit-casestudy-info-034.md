# BeProfit Amazon Integration

## Source
- **URLs:**
  - https://sellercentral.amazon.com/selling-partner-appstore/dp/amzn1.sp.solution.835e75d5-129e-403a-b86d-e2f068b7765b (Amazon Selling Partner Appstore listing)
  - https://integrations.beprofit.co/amazon (BeProfit tech partner directory)
  - https://beprofit.co/a/blog/how-to-track-and-calculate-your-profit-on-amazon-fba (FBA profit tracking blog)
  - https://beprofit.co/a/blog/amazon-fba-profit-calculator-is-inaccurate-how-sellers-can-avoid-mistakes-that-can-cost-a-fortune (FBA calculator accuracy article)
  - https://help.runviably.com/beprofit/beprofit-faq (BeProfit FAQ)
  - https://developer-docs.amazon.com/sp-api/docs/connecting-to-the-selling-partner-api (SP-API documentation)
- **Category:** Integrations / E-Commerce Platforms / Amazon
- **Date Captured:** 2026-02-12

---

## Amazon Seller Support Overview

Amazon is one of BeProfit's **three core e-commerce platform integrations** alongside Shopify and WooCommerce. BeProfit positions itself as supporting "Shopify, Amazon, WooCommerce and Wix sellers" (in that order), suggesting Amazon is a critical platform but potentially secondary to Shopify in terms of marketing emphasis.

**Evidence of Amazon Integration Importance:**
1. **Listed as Primary Platform:** Amazon mentioned second (after Shopify) in marketing positioning
2. **Selling Partner Appstore Presence:** BeProfit is available in Amazon's official Selling Partner Appstore
3. **Educational Content:** Multiple blog posts about Amazon FBA profit calculation (suggests active Amazon seller user base)
4. **Multi-Marketplace Support:** "Display SLA and order & FBA tracking data across the 18 different Amazon marketplaces currently supported" (from research)

**Positioning:**
BeProfit targets **Amazon FBA sellers** specifically, with emphasis on FBA fee tracking and profit calculation complexity. The platform acknowledges that "Amazon FBA Profit Calculator is Inaccurate" (blog post title), positioning BeProfit as the solution for accurate Amazon profit tracking.

---

## Connection Setup

### Prerequisites

**What user needs before connecting:**
- **Amazon Seller Central account** (Professional Seller plan likely required for API access)
- **Selling account in good standing** (active, not suspended)
- **Primary account user access** (must be primary user to authorize API connections)
- **BeProfit account:** Free 14-day trial available at beprofit.co
- **Marketplace Selection:** User must know which Amazon marketplace(s) they sell on (US, CA, UK, EU, JP, AU, etc.)

**Amazon Seller Central Requirements:**
- Professional Seller account ($39.99/month subscription) - Individual Seller accounts typically cannot use SP-API
- Primary account holder access (sub-users may not have permission to authorize apps)

### API Used

**SP-API (Selling Partner API)** - Modern, REST-based API

**Evidence:**
- BeProfit is listed in **Amazon Selling Partner Appstore** (https://sellercentral.amazon.com/selling-partner-appstore/)
- Amazon Selling Partner Appstore only lists apps using SP-API (not legacy MWS)
- Research indicates "Amazon SP-API" is "Amazon's next-generation REST-based API that incorporates a new level of security and data privacy compared to the previous MWS APIs"

**Why SP-API Matters:**
- **MWS (Marketplace Web Service):** Legacy API, being phased out, less secure
- **SP-API (Selling Partner API):** Modern replacement, launched 2020, REST-based, OAuth 2.0 authentication, granular permissions
- **Future-Proof:** SP-API is Amazon's current and future API standard

**Implications:**
- BeProfit uses modern, secure API (good for longevity)
- OAuth 2.0 flow (similar to Shopify) makes setup easier than MWS
- Granular permissions allow users to see exactly what data BeProfit accesses

### Connection Flow

**UI Flow** (inferred from standard SP-API authorization pattern and BeProfit positioning):

```
1. User logs into BeProfit dashboard

2. Navigates to Settings → Integrations → Amazon

3. Clicks "Connect Amazon Seller Central" button

4. User has two connection options:
   Option A: Via Amazon Selling Partner Appstore
     - Redirected to Amazon Selling Partner Appstore
     - Clicks "Authorize" or "Connect" on BeProfit app listing
     - Amazon OAuth consent screen shows requested permissions
     - User selects marketplace(s) to connect (US, UK, DE, etc.)
     - Clicks "Authorize" to grant permissions
     - Redirected back to BeProfit with authorization complete

   Option B: Direct connection from BeProfit
     - BeProfit initiates OAuth 2.0 flow
     - Redirected to Amazon Seller Central login page
     - User logs in with Seller Central credentials
     - Amazon displays SP-API authorization consent screen
     - Lists permissions BeProfit requests (read orders, read financial data, etc.)
     - User selects marketplace(s) to authorize
     - Clicks "Authorize"
     - Redirected back to BeProfit

5. BeProfit displays "✅ Connected to Amazon Seller Central"
   - Shows connected marketplace(s) (e.g., "US, CA, UK")
   - Shows Seller ID

6. Initial data sync begins:
   - Progress bar: "Syncing Amazon orders and fees... 25% complete"
   - Estimated time: 30-90 minutes (Amazon API has rate limits)
   - Historical data: Typically 90 days to 1 year back (Amazon API limitation)

7. Sync completes:
   - "All Amazon data synced successfully"
   - Dashboard now shows Amazon orders, FBA fees, profit metrics
```

**Key Difference from Shopify:**
- **Multi-Marketplace Selection:** Shopify is one store; Amazon requires selecting which marketplaces to sync (US, UK, EU, etc.)
- **Slower Initial Sync:** Amazon API rate limits are stricter than Shopify, so initial sync may take longer
- **No Real-Time Webhooks:** Amazon does not provide real-time webhooks like Shopify (batch sync only)

### API Credentials

**OAuth 2.0 Flow (No Manual Credentials Required)**

Unlike WooCommerce (manual API keys), Amazon connection uses OAuth 2.0:
- **No MWS Auth Token to copy/paste**
- **No AWS Access Keys required**
- User simply authorizes via Amazon's consent screen
- BeProfit receives OAuth access token and refresh token automatically

**Under the Hood (Technical):**
- BeProfit registers as SP-API application with Amazon
- BeProfit has LWA (Login with Amazon) Client ID and Secret
- User authorizes via Amazon OAuth, BeProfit receives access token
- Refresh token allows BeProfit to renew access without user re-authorization

**Permissions Requested (Inferred based on standard profit tracking requirements):**
- `read::orders` - Access order data
- `read::financial` - Access financial reports (fees, payouts)
- `read::catalog` - Access product catalog
- `read::reports` - Access settlement reports, FBA fee reports

### Initial Sync

**Historical Data Import:**
- **Time Range:** Typically **90 days** back (Amazon SP-API standard), possibly up to **1 year** if BeProfit uses reports API
- **Sync Duration:**
  - Small sellers (<500 orders/month): 30-45 minutes
  - Medium sellers (500-5,000 orders/month): 45-90 minutes
  - Large sellers (5,000+ orders/month): 90+ minutes (may require multiple sync passes)
- **Rate Limiting Impact:** Amazon API has strict rate limits (varies by endpoint), slowing down sync compared to Shopify

**What Happens During Initial Sync:**
1. **Orders:** All orders from connected marketplace(s) pulled (FBA + FBM)
2. **Products:** Product catalog synced (ASIN, SKU, price, cost if set)
3. **FBA Fees:** Per-order fees pulled from financial reports
4. **Settlements:** Monthly settlement reports pulled for storage fees, subscription fees
5. **Returns:** Return data synced from returns reports

**Progress Indicators:**
- Progress bar: "Syncing US marketplace orders... 40% complete"
- Status messages: "Importing FBA fees from January 2025..."
- Warning if rate limits hit: "Amazon API rate limit reached, slowing sync..."

---

## Data Synced FROM Amazon

### Order Data (FBA vs FBM)

**FBA (Fulfilled by Amazon) Order Fields:**

| Field | Amazon API Field | BeProfit Use |
|-------|------------------|--------------|
| Amazon Order ID | `AmazonOrderId` | Unique identifier |
| Order Date | `PurchaseDate` | Order timestamp |
| Order Status | `OrderStatus` | Pending, Shipped, Delivered, Canceled, etc. |
| **Order Type** | `FulfillmentChannel` | "AFN" (Amazon Fulfilled) vs "MFN" (Merchant Fulfilled) |
| **Product Data** | | |
| ASIN | `ASIN` | Amazon Standard Identification Number (product ID) |
| SKU | `SellerSKU` | Seller's SKU |
| Product Title | `Title` | Product name |
| Quantity | `QuantityOrdered` | Units sold |
| Item Price | `ItemPrice` | Price per unit |
| Item Tax | `ItemTax` | Sales tax collected |
| **Shipping** | | |
| Shipping Price | `ShippingPrice` | Shipping charged to customer (often $0 for Prime) |
| Shipping Tax | `ShippingTax` | Tax on shipping |
| **Discounts** | | |
| Promotion Discount | `PromotionDiscount` | Amazon promotional discounts |
| **Customer Data (Limited)** | | |
| Shipping Address | `ShippingAddress` (city, state, postal code, country) | Customer location (no PII like name/email) |
| **Marketplace** | | |
| Marketplace ID | `MarketplaceId` | Which Amazon marketplace (US, UK, DE, etc.) |
| Currency | Inferred from marketplace | USD, GBP, EUR, JPY, etc. |

**FBM (Fulfilled by Merchant) Order Fields:**
- Same as FBA orders but with `FulfillmentChannel = "MFN"`
- No FBA fulfillment fees (merchant handles shipping)
- Merchant responsible for tracking shipping costs

**Key Observation:**
- **Limited Customer Data:** Amazon does NOT provide customer email addresses or names (PII protection)
- **No Customer LTV:** Cannot calculate true customer lifetime value like Shopify/WooCommerce
- **FBA vs FBM Distinction Critical:** Profit calculation differs dramatically (FBA has Amazon fees, FBM has merchant shipping costs)

### Amazon Fees (CRITICAL for Profit Calculation)

Amazon fees are **the most complex aspect** of Amazon profit tracking. BeProfit must accurately capture and allocate these fees.

#### Per-Order Fees (Easy to Allocate)

| Fee Type | Amazon API Source | Typical Amount | How BeProfit Pulls It |
|----------|------------------|----------------|----------------------|
| **Referral Fee** | Financial Events API (`FeeList`) | 8-15% of sale price (category-dependent) | Per-order, pulled immediately |
| **FBA Fulfillment Fee** | Financial Events API (`FeeList`) | $3-$8 per unit (size/weight-based) | Per-order, pulled immediately |
| **Variable Closing Fee** | Financial Events API (for media categories) | $1.80 per item (books, DVDs, etc.) | Per-order if applicable |

**Example Fee Breakdown for One FBA Order:**
```
Item Price: $29.99
Referral Fee (15%): -$4.50
FBA Fulfillment Fee: -$4.25
Net Proceeds: $21.24
```

#### Monthly/Pooled Fees (Hard to Allocate Per-Order)

| Fee Type | Amazon Source | Typical Amount | Allocation Challenge |
|----------|---------------|----------------|---------------------|
| **FBA Storage Fee** | Monthly Storage Fee Report | $0.75 per cubic foot/month (standard), $2.40 (oversize) | **Monthly pool** - how to allocate to specific orders/products? |
| **Long-Term Storage Fee** | Long-Term Storage Fee Report | $6.90 per cubic foot (inventory aged 365+ days) | Allocated to specific ASINs, but which orders? |
| **Professional Seller Subscription** | Manual entry or settlement report | $39.99/month (US) | **Monthly fixed cost** - allocate per order, per unit, or pool? |
| **FBA Inbound Placement Fee** | New in 2026 | Variable based on shipment | Allocated to inventory received, not orders sold |

**Allocation Methodology (Inferred):**
BeProfit likely uses one of these approaches for monthly storage fees:
1. **Per-Unit Allocation:** Divide monthly storage fee by total units sold that month
2. **Per-SKU Weighting:** Allocate based on each SKU's storage volume (cubic feet)
3. **FIFO Allocation:** Allocate older inventory costs to orders sold (First-In-First-Out)
4. **Not Allocated:** Show storage fees as separate monthly expense pool, not per-order

**Most Likely:** BeProfit shows FBA storage fees as a **monthly expense line item** rather than allocating per-order (too complex and inaccurate).

#### 2026 FBA Fee Changes

**Critical Update for 2026:**
- FBA fees increasing by **average $0.08 per unit** (less than 0.5% of average item price)
- **No new fee types** in 2026
- Changes effective **January 15, 2026**
- Amazon providing updated Revenue Calculator and Fee Preview tools

**BeProfit Must Stay Updated:**
- FBA fee schedules change annually
- BeProfit must update fee calculation logic to match Amazon's 2026 rates
- Sellers rely on accurate fee projections - outdated fees = inaccurate profit

### Product Data

**Product fields synced (via Catalog Items API or Order Item data):**

| Field | Amazon API Field | Purpose |
|-------|------------------|---------|
| ASIN | `ASIN` | Amazon Standard Identification Number (primary product ID) |
| SKU | `SellerSKU` | Seller's internal SKU |
| Product Title | `ItemName` or `Title` | Product name |
| **Pricing** | | |
| List Price | `ListPrice` | Advertised price |
| Current Price | `Price` | Actual selling price (may differ if on sale) |
| **Cost (COGS)** | | |
| Cost per Unit | **NOT provided by Amazon API** | Seller must enter manually in BeProfit |
| **Inventory** | | |
| FBA Inventory | FBA Inventory Report | Current units in Amazon fulfillment centers |
| Seller-Fulfilled Inventory | Not easily accessible via API | Merchant tracks separately |
| **Product Attributes** | | |
| Package Dimensions | `PackageDimensions` (length, width, height, weight) | Used for FBA fee calculation |
| Product Category | `ProductCategory` | Determines referral fee percentage |

**CRITICAL COGS Challenge:**
- **Amazon does NOT store COGS in API** (like Shopify and WooCommerce)
- Sellers must manually enter COGS in BeProfit for each ASIN/SKU
- Without COGS, profit calculation is incomplete (revenue - fees ≠ profit without COGS)

### Returns & Refunds

**Amazon Return Handling:**

| Data Point | Amazon API Source | Impact on Profit |
|------------|------------------|------------------|
| Return Date | Returns Report API | When return was processed |
| Return Reason | Returns Report | "Defective", "Changed Mind", "Wrong Item", etc. |
| Return Quantity | Returns Report | Units returned |
| Refund Amount | Financial Events API | Amount refunded to customer |
| **Return Disposition** | Returns Report | "Sellable", "Damaged", "Defective" |
| Restocking Fee | Financial Events API (rare) | Fee charged to customer for return |
| **Reimbursement** | FBA Customer Returns Report | If Amazon damaged item, seller reimbursed |

**Return Impact on Profit:**
1. **Full Refund (Item Sellable):**
   - Revenue lost: Full refund amount
   - COGS recovered: Item returned to FBA inventory (can be resold)
   - Fees NOT recovered: Referral and fulfillment fees already paid (Amazon keeps them)
   - **Net Impact:** Loss = Fees paid + shipping cost

2. **Full Refund (Item Damaged/Defective):**
   - Revenue lost: Full refund amount
   - COGS lost: Item cannot be resold (disposed or returned to seller)
   - Fees NOT recovered: Amazon keeps fees
   - **Net Impact:** Loss = Full sale price + fees

3. **Amazon Reimbursement (FBA Error):**
   - If Amazon loses or damages item, they reimburse seller
   - Reimbursement = Item price (not including fees)
   - **Net Impact:** Seller made whole on inventory cost, but lost fees

**How BeProfit Handles Returns:**
- Returns shown as negative orders or adjustments
- Profit impact calculated based on return disposition (sellable vs damaged)
- **Gap:** BeProfit may not distinguish between sellable and damaged returns (API data quality varies)

### Amazon Ads Data

**Status:** **UNCLEAR - May Be Separate Integration**

**Two Possibilities:**
1. **Included in Seller Central Integration:** Amazon Sponsored Products/Brands ad spend pulled from Advertising API
2. **Separate Integration:** Amazon Ads requires separate OAuth authorization (different permissions)

**If Included (Amazon Ads Data Synced):**
- **Ad Spend by Campaign:** Sponsored Products, Sponsored Brands, Sponsored Display
- **Ad Performance:** Impressions, clicks, conversions, ACoS (Advertising Cost of Sale)
- **Attribution:** Which orders came from ads vs organic

**If Separate:**
- Seller must connect Amazon Ads separately in BeProfit (Settings → Integrations → Amazon Ads)
- Similar to how Facebook Ads and Google Ads are separate integrations

**Research Inconclusive:** Blog posts mention "Amazon Ads" generically but don't specify if it's part of Seller Central integration or separate.

**Assumption:** Amazon Ads likely **separate integration** (standard pattern for ad platforms).

---

## Multi-Marketplace Support

### Marketplace Coverage

**Amazon operates 20+ marketplaces globally.** BeProfit claims support for **18 marketplaces** (from research).

**Confirmed Supported Marketplaces (Inferred from "18 marketplaces" claim):**

| Region | Marketplaces | Marketplace IDs | Currency |
|--------|--------------|----------------|----------|
| **North America** | US, CA, MX | ATVPDKIKX0DER (US), A2EUQ1WTGCTBG2 (CA), A1AM78C64UM0Y8 (MX) | USD, CAD, MXN |
| **Europe** | UK, DE, FR, IT, ES, NL, SE, PL, BE, TR | Various | GBP, EUR, TRY |
| **Asia-Pacific** | JP, AU, IN, SG | Various | JPY, AUD, INR, SGD |
| **Middle East** | UAE, SA, EG (newer markets, may not be in "18") | Various | AED, SAR, EGP |
| **South America** | BR | A2Q3Y263D00KWC | BRL |

**Total:** 18-20 marketplaces supported.

**Notable Exclusions (if only 18 supported):**
- Newer markets (UAE, SA, EG, Turkey) may not be supported yet
- Amazon's expansion into new countries may not be immediately reflected in BeProfit

### Multi-Marketplace Consolidation

**If a seller operates on multiple marketplaces (e.g., US + UK + DE):**

**Option 1: Unified View (Converted to Single Currency)**
- All sales converted to seller's home currency (e.g., USD)
- Single profit dashboard showing combined performance
- **Pro:** Easier to see total business performance
- **Con:** Loses granularity on per-market profitability

**Option 2: Segmented View (Separate Dashboards per Marketplace)**
- US marketplace profit shown separately from UK marketplace profit
- Seller can toggle between markets
- **Pro:** See which markets are most/least profitable
- **Con:** More complex UI, harder to see overall business health

**Most Likely:** BeProfit offers **both views**:
- Default: Unified dashboard (converted to home currency)
- Filter: "Show only US marketplace" or "Show only UK marketplace"

### Currency Handling

**Challenge:** Each marketplace operates in its own currency.

**Example Multi-Marketplace Scenario:**
- **US Marketplace:** $10,000 revenue (USD)
- **UK Marketplace:** £5,000 revenue (GBP)
- **DE Marketplace:** €6,000 revenue (EUR)

**BeProfit's Approach (Inferred):**
1. **Convert to Home Currency:** Convert GBP and EUR to USD at order date exchange rate
2. **Display in Home Currency:** Show "$10,000 + $6,500 (£5,000 @ 1.30) + $6,600 (€6,000 @ 1.10) = $23,100 total"
3. **Exchange Rate Source:** Likely uses daily exchange rates from financial data provider (not Amazon-provided rates)

**Potential Issue:**
- **Exchange Rate Timing:** Amazon pays sellers in local currency, then sellers convert to home currency
- BeProfit may use different exchange rate than seller's actual conversion
- **Gap:** Slight discrepancies between BeProfit's profit calculation and actual bank account balance

---

## Sync Direction & Frequency

### Sync Direction

**One-Way (Amazon → BeProfit ONLY)**

BeProfit is **read-only** for Amazon data:
- Cannot update Amazon inventory from BeProfit
- Cannot create Amazon orders from BeProfit
- Cannot adjust Amazon prices from BeProfit

**Why Read-Only:**
- Amazon SP-API requires separate permissions for write operations
- Most sellers manage inventory/pricing in Amazon Seller Central directly
- BeProfit's focus is analytics, not inventory management

### Sync Frequency

**Batch Sync (NO Real-Time Webhooks)**

**Amazon does NOT provide webhooks** like Shopify. All data sync is batch-based (polling).

**Typical Sync Schedule (Inferred):**
- **Orders:** Hourly or every 4-6 hours (due to API rate limits)
- **Financial Data (Fees):** Daily (fee reports generated daily by Amazon)
- **Inventory:** Daily (FBA inventory reports)
- **Returns:** Daily (returns report)
- **Settlement Reports:** Monthly (storage fees, subscription fees)

**Why Not More Frequent:**
- **Amazon API Rate Limits:** SP-API has strict rate limits (varies by endpoint, typically 0.5-10 requests/second)
- **Report Generation Delay:** Some Amazon reports take 15-60 minutes to generate before API can fetch them
- **Cost:** Frequent polling increases API request count, potentially hitting rate limits or costing more

**User Impact:**
- New Amazon orders appear in BeProfit within **1-6 hours** (vs Shopify's 1-5 minutes)
- Sellers accustomed to Shopify's real-time sync may perceive Amazon sync as "slow"

### Rate Limits

**Amazon SP-API Rate Limits are STRICT:**

**Example Rate Limits (as of 2026):**
- **Orders API:** 0.0167 requests/second (1 request every 60 seconds) - very slow
- **Financial Events API:** 0.5 requests/second
- **Reports API:** Variable (depends on report type)

**Impact on BeProfit:**
- Initial sync takes 30-90+ minutes due to rate limits
- Large sellers (10,000+ orders/month) may experience even slower sync
- **Workaround:** BeProfit likely uses **Reports API** (higher rate limits) instead of Orders API for bulk data

**Manual Sync:**
- Users can likely trigger "Sync Now" button
- Initiates immediate sync (subject to rate limits)
- Use case: "I just made a sale, want to see it in BeProfit now"

---

## Amazon-Specific Profit Calculation

### FBA Fee Allocation

**The Core Challenge:** How does BeProfit allocate FBA fees to each order?

**Per-Order Fees (Straightforward):**
- **Referral Fee:** 15% × $29.99 item price = $4.50 (allocated to this specific order)
- **FBA Fulfillment Fee:** $4.25 (allocated to this specific order)
- **Total Per-Order Fees:** $8.75

**Monthly Fees (Complex):**
- **FBA Storage Fee:** $150/month (all inventory in FBA)
- **How to allocate to individual orders?**

**Option 1: Per-Unit Allocation (Simple but Inaccurate)**
```
Monthly storage fee: $150
Units sold in month: 300
Fee per unit: $150 / 300 = $0.50
Allocate $0.50 storage fee to each order
```
**Problem:** A single order for a slow-moving, bulky item may incur $10 in storage fees, but this method allocates only $0.50.

**Option 2: Per-SKU Volume Weighting (More Accurate)**
```
Product A: 50 cubic feet stored, 100 units sold
Product B: 20 cubic feet stored, 200 units sold
Total: 70 cubic feet, 300 units sold

Storage fee: $150 ($0.75/cubic foot × 70 cubic feet × 2.86 months... simplified)

Product A fee: $150 × (50/70) = $107.14 → $107.14 / 100 units = $1.07/unit
Product B fee: $150 × (20/70) = $42.86 → $42.86 / 200 units = $0.21/unit
```
**Problem:** Requires accessing FBA inventory reports and tracking cubic feet per SKU (complex).

**Option 3: Show as Monthly Expense Pool (Most Likely)**
BeProfit likely shows FBA storage fees as a **separate monthly line item** on dashboard:
```
February 2026 Expenses:
- Order Costs (COGS): $12,000
- FBA Fulfillment Fees: $3,200
- FBA Referral Fees: $4,500
- FBA Storage Fees (Feb): $150
- Professional Seller Subscription: $39.99
```
**Pro:** Accurate, transparent, no faulty per-order allocation
**Con:** Per-order profit margin doesn't include storage fee impact

**Verdict:** BeProfit most likely uses **Option 3** (monthly expense pool) for storage fees, and **per-order allocation** for referral and fulfillment fees.

### Net Profit After Amazon Fees

**Profit Calculation Hierarchy:**

```
Gross Revenue (Item Price + Shipping Charged)
- Amazon Referral Fee
- FBA Fulfillment Fee
- Variable Closing Fee (if applicable)
= Net Proceeds (Amazon pays out this amount)

Net Proceeds
- COGS (Cost of Goods Sold)
- Merchant Shipping Cost (if FBM)
= Gross Profit

Gross Profit
- FBA Storage Fee (monthly pool / units sold)
- Inbound Shipping to Amazon (if tracked)
- Professional Seller Subscription (monthly pool / units sold)
= Net Profit

Net Profit
- Ad Spend (if Amazon Ads integrated)
= Profit After Advertising
```

**BeProfit Dashboard Likely Shows:**
- **Gross Revenue:** Total sales
- **Amazon Fees:** Referral + Fulfillment + Storage + Subscription
- **COGS:** Cost of goods
- **Gross Profit Margin:** (Gross Profit / Revenue) × 100%
- **Net Profit Margin:** (Net Profit / Revenue) × 100%
- **Amazon-Specific Metric:** "Net Proceeds" (amount Amazon deposits to bank account)

---

## Known Limitations

### Data NOT Synced

**Explicitly NOT accessible or not synced:**

| Data Type | Reason Not Available | Impact |
|-----------|---------------------|--------|
| **Customer Email Addresses** | Amazon hides customer PII | Cannot calculate true customer LTV, cannot send marketing emails |
| **Customer Names** | Amazon hides customer PII | Cannot identify repeat customers by name |
| **Amazon Vendor Central Data** | Vendor Central uses different API (Vendor API, not SP-API) | Vendors (1P sellers who sell TO Amazon) cannot use BeProfit |
| **Amazon Handmade Data** | Specialty program, may use different API | Handmade sellers may have limited support |
| **Amazon Business Orders** | B2B orders may have different data structure | May not fully capture B2B-specific pricing/fees |
| **Amazon Subscribe & Save** | Subscription order data may be incomplete | Recurring revenue tracking may be limited |

### API Rate Limits

**Amazon SP-API Rate Limits Significantly Impact BeProfit:**

**Symptoms for Users:**
- "Your Amazon data is syncing slower than expected..."
- Initial sync takes 30-90 minutes (vs Shopify's 5-10 minutes)
- New orders appear in dashboard 1-6 hours after Amazon sale (vs Shopify's real-time)

**BeProfit Cannot Fix This:**
- Amazon sets rate limits, third-party apps must comply
- Exceeding rate limits results in temporary API ban
- **Workaround:** BeProfit uses Reports API (higher rate limits) for bulk data, Orders API for recent orders

### Historical Data Limitations

**Amazon SP-API Restrictions:**
- **Orders API:** Typically limited to **past 90 days** for detailed order data
- **Financial Reports:** Can access older data (up to 2 years) via reports
- **Initial Sync:** BeProfit likely pulls **90 days to 1 year** on first connection

**Impact:**
- Sellers who've been on Amazon for 5+ years cannot import all historical data
- Year-over-year comparisons limited to recent history
- **Workaround:** Sellers may need to manually upload historical data via CSV

### FBA Fee Calculation Edge Cases

**Potential Inaccuracies:**

1. **Dimensional Weight Rounding:** Amazon rounds up package dimensions, affecting FBA fulfillment fee calculation
2. **Storage Fee Timing:** Amazon bills storage fees monthly, but calculates daily - allocation timing can be off
3. **Long-Term Storage Fee Spikes:** Inventory aged 365+ days incurs sudden $6.90/cubic foot fee - may surprise sellers if not prominently displayed
4. **Inbound Placement Fee (New in 2026):** New fee for distributing inventory to FBA centers - BeProfit must track and allocate correctly

**Accuracy Challenge:**
Amazon's own "Revenue Calculator" is approximate - BeProfit's calculations may differ slightly from Amazon's actual fees. Discrepancies of $0.50-$2.00 per order are common.

---

## Troubleshooting

### Common Amazon-Specific Issues

| Issue | Symptom | Diagnosis | Fix |
|-------|---------|-----------|-----|
| **"Connection Failed"** | Cannot connect Amazon account | OAuth authorization failed or expired | Re-authorize in Settings → Integrations → Amazon → Reconnect |
| **"Orders Not Syncing"** | New orders not appearing | API rate limit hit, or marketplace mismatch | Wait 1-6 hours for next sync cycle, or check if correct marketplace authorized |
| **"Missing COGS"** | Profit shows as 0% or 100% margin | COGS not set in BeProfit | Enter COGS manually for each ASIN/SKU in Settings → Products |
| **"Incorrect FBA Fees"** | Fees too high/low | Amazon changed fee schedule, or dimensional weight mismatch | Contact BeProfit support to verify fee schedule is updated for 2026 |
| **"Multi-Currency Orders Wrong"** | Orders in GBP/EUR showing incorrect profit | Exchange rate conversion timing mismatch | Check exchange rate used in Settings, may need manual adjustment |
| **"Returns Not Reflecting"** | Return issued but profit unchanged | Return sync delay (reports generated daily) | Wait 24 hours for next sync, or force manual sync |
| **"Storage Fees Missing"** | Monthly storage fee not showing | Storage fee report not yet available (Amazon generates mid-month) | Storage fees appear 2-3 weeks into following month (Amazon timing) |

---

## Inferred UI Elements

### Amazon Connection Card (in BeProfit Settings)

```
┌─────────────────────────────────────────────┐
│ [Amazon Logo]  Amazon Seller Central         │
│                                              │
│ Status: ● Connected                          │
│ Marketplace(s): US, CA, UK                   │
│ Seller ID: A1B2C3D4E5F6G7                    │
│ Last synced: 2 hours ago                     │
│                                              │
│ [Sync Now]  [Add Marketplace]  [Disconnect]  │
└─────────────────────────────────────────────┘
```

**Settings Options:**
- **Connected Marketplaces:** US, CA, UK (checkboxes to add/remove)
- **Seller ID:** A1B2C3D4E5F6G7 (read-only, detected from Amazon)
- **Sync Frequency:** Automatic (hourly, cannot change due to API limits)
- **Home Currency:** USD (for conversion of multi-currency orders)
- **Historical Data:** Import last 90 days ☑
- **Amazon Fees:**
  - Professional Seller Subscription: $39.99/month (manual entry)
  - FBA Fee Calculation: Use Amazon's 2026 fee schedule ☑

### Initial Sync Progress Screen

```
┌─────────────────────────────────────────────┐
│       Syncing Your Amazon Seller Data        │
│                                              │
│  ████████░░░░░░░░░░░░░░░░ 35%               │
│                                              │
│  Currently syncing: US Marketplace           │
│  Importing orders from October 2025...       │
│  1,245 of 3,500 orders synced                │
│                                              │
│  ⚠️ Note: Amazon API rate limits may cause  │
│     syncing to take 30-90 minutes.           │
│                                              │
│  Next: UK Marketplace (estimated 15 min)     │
│                                              │
│  [Pause Sync]  [Cancel Sync]                │
└─────────────────────────────────────────────┘
```

### Dashboard Integration Indicators

**Order Source Badge:**
- Each order shows Amazon logo badge: [Amazon 📦] Order #112-3456789-1234567

**Marketplace Filter:**
- Dropdown filter: "All Marketplaces" | "US" | "CA" | "UK" | "DE" | ...

**FBA vs FBM Indicator:**
- Order list shows: "FBA" badge (blue) or "FBM" badge (gray) for each order

**Sync Status Banner (Top of Dashboard):**
- "✅ All marketplaces synced. Last updated: 2 hours ago"
- OR "⚠️ Syncing Amazon data from US marketplace... 45% complete"

---

## Data Model Implications

### AmazonIntegration Entity

```typescript
interface AmazonIntegration {
  id: UUID;
  user_id: UUID;
  seller_id: string; // Amazon Seller ID (e.g., "A1B2C3D4E5F6G7")
  connected_marketplaces: string[]; // ["ATVPDKIKX0DER" (US), "A1F83G8C2ARO7P" (UK), ...]
  oauth_access_token: string; // Encrypted SP-API OAuth token
  oauth_refresh_token: string; // Encrypted refresh token
  connection_status: "connected" | "disconnected" | "error" | "syncing";
  last_sync_at: timestamp;
  initial_sync_complete: boolean;
  sync_frequency: "hourly"; // Amazon uses batch polling, not real-time
  home_currency: string; // "USD" (for multi-currency conversion)
  professional_seller_fee: decimal; // $39.99/month (manual entry)
  api_version: "SP-API"; // vs legacy "MWS"
  created_at: timestamp;
  updated_at: timestamp;
}
```

### Order Entity Mapping (Amazon → BeProfit)

```typescript
interface Order {
  id: UUID; // BeProfit internal ID
  shop_id: UUID;
  external_id: string; // Amazon Order ID (e.g., "112-3456789-1234567")
  source_platform: "amazon";
  order_number: string; // Same as external_id for Amazon
  created_at: timestamp; // Amazon PurchaseDate

  // Amazon-specific fields
  amazon_marketplace_id: string; // "ATVPDKIKX0DER" (US)
  fulfillment_type: "FBA" | "FBM"; // Critical distinction
  asin: string; // Amazon Standard Identification Number

  // Financial data
  total_value: decimal; // ItemPrice + ShippingPrice
  item_price: decimal; // Price before shipping/tax
  shipping_cost: decimal; // ShippingPrice (customer paid)
  tax_amount: decimal; // ItemTax + ShippingTax
  promotion_discount: decimal; // PromotionDiscount

  // Order status
  status: string; // "Shipped", "Delivered", "Canceled", "Pending"

  // Fees (Amazon-specific)
  referral_fee: decimal; // Per-order referral fee (8-15%)
  fba_fulfillment_fee: decimal; // Per-order FBA fulfillment fee
  variable_closing_fee: decimal; // For media categories

  // COGS
  total_cogs: decimal; // Manual entry required (Amazon doesn't provide COGS)

  // Calculated profit
  net_proceeds: decimal; // Amount Amazon deposits (item_price - referral_fee - fba_fulfillment_fee)
  gross_profit: decimal; // net_proceeds - total_cogs
  net_profit: decimal; // gross_profit - (storage_fee_allocated + subscription_fee_allocated)
  net_margin: decimal; // net_profit / total_value * 100

  // Amazon metadata
  amazon_order_json: JSONB; // Store full Amazon order JSON for reference
}
```

### AmazonFees Entity (Monthly Pooled Fees)

```typescript
interface AmazonMonthlyFees {
  id: UUID;
  amazon_integration_id: UUID;
  month: string; // "2026-02"
  marketplace_id: string; // "ATVPDKIKX0DER"

  // Pooled fees (not per-order)
  storage_fee: decimal; // FBA storage fee for the month
  long_term_storage_fee: decimal; // For inventory aged 365+ days
  professional_seller_subscription: decimal; // $39.99

  // Calculated allocations
  units_sold_in_month: integer; // Total units sold (for per-unit allocation if needed)
  storage_fee_per_unit: decimal; // storage_fee / units_sold_in_month

  created_at: timestamp;
}
```

---

## Limitations & Gaps Identified

### Compared to Ideal Amazon Integration

| Feature | BeProfit Support | Ideal / Best Practice |
|---------|-----------------|----------------------|
| **FBA Fee Auto-Import** | ✅ Yes (per-order fees) | ✅ Critical for Amazon sellers |
| **FBA Storage Fee Allocation** | ⚠️ Likely monthly pool, not per-order | ✅ Per-SKU weighted allocation based on cubic feet |
| **Multi-Marketplace Support** | ✅ Yes (18 marketplaces) | ✅ Essential for international sellers |
| **Real-Time Sync** | ❌ No (hourly batch due to API limits) | ⚠️ Cannot improve (Amazon limitation) |
| **Customer LTV Tracking** | ❌ No (Amazon hides customer PII) | ⚠️ Cannot improve (Amazon policy) |
| **Amazon Ads Integration** | ⚠️ Unclear (may be separate) | ✅ Essential for profitability analysis |
| **Vendor Central Support** | ❌ No (SP-API only, not Vendor API) | ✅ Support 1P vendors, not just 3P sellers |
| **Historical Data (2+ years)** | ⚠️ Limited (90 days via Orders API) | ✅ Use Reports API to pull 2+ years |
| **COGS Auto-Import** | ❌ No (Amazon doesn't store COGS) | ⚠️ Cannot improve (Amazon limitation) |
| **Inbound Placement Fee Tracking** | ⚠️ Unknown (new in 2026) | ✅ Must track 2026 fee changes |

### Major Gaps

1. **Amazon Ads Integration Unclear:**
   - Research did not confirm if Amazon Sponsored Products/Brands ad spend is included
   - If separate integration, adds setup friction for sellers
   - **Fix:** Clarify if Amazon Ads is bundled or separate; if separate, build unified integration

2. **FBA Storage Fee Allocation Methodology:**
   - Likely shows as monthly pool, not per-order/per-SKU
   - Sellers may not realize which products are eating up storage fees
   - **Fix:** Build per-SKU storage fee allocation based on FBA inventory reports (cubic feet × time in storage)

3. **No Vendor Central Support:**
   - 1P vendors (who sell TO Amazon) cannot use BeProfit
   - Vendor Central uses different API (Vendor API), requires separate integration
   - **Fix:** Build Vendor Central integration to capture 1P vendor market

4. **Hourly Sync Delay:**
   - 1-6 hour delay for new orders (vs Shopify's real-time)
   - Sellers may perceive as "slow" or "broken"
   - **Fix:** Set clear expectations in UI ("Amazon data syncs hourly due to API limits")

5. **No Customer LTV:**
   - Amazon hides customer email/name, so cannot track repeat customers
   - Cannot segment by customer cohorts (first-time vs repeat buyers)
   - **Fix:** Cannot overcome (Amazon policy), but acknowledge limitation in marketing

6. **Inbound Placement Fee (New 2026):**
   - Amazon introduced new fee for distributing inventory to FBA centers in 2026
   - BeProfit must track this fee and allocate to inventory/products
   - **Fix:** Ensure 2026 fee schedule includes inbound placement fee

---

## Relevance to Our Build

### 7-10 Actionable Insights for Our Amazon Integration

1. **FBA Fee Tracking is CRITICAL**
   - Amazon sellers live and die by FBA fees
   - Referral and fulfillment fees are complex (category-dependent, size/weight-based)
   - **Action:** Implement accurate FBA fee calculator using Amazon's 2026 fee schedule
   - Maintain fee schedule database (updated annually as Amazon changes fees)

2. **Storage Fee Allocation = Competitive Advantage**
   - BeProfit likely shows storage fees as monthly pool (not per-order)
   - **Action:** Build per-SKU storage fee allocation using FBA inventory reports
   - Show sellers: "Product A is costing you $5/month in storage fees, Product B only $0.50"
   - **Differentiation:** "We show you which products are eating up storage fees - BeProfit doesn't"

3. **Multi-Marketplace Consolidation**
   - Amazon sellers often operate on 3-5 marketplaces (US, CA, UK, DE, JP)
   - **Action:** Support multi-marketplace connection in one authorization flow
   - Currency conversion to home currency (with clear exchange rate footnotes)
   - Marketplace segmentation: "Show only UK profit" vs "Show all marketplaces combined"

4. **Set Expectations on Sync Speed**
   - Amazon API rate limits = 1-6 hour sync delay (cannot fix)
   - **Action:** Clearly communicate in UI: "Amazon data syncs every 1-6 hours due to Amazon API rate limits"
   - Show "Last synced: 2 hours ago" timestamp prominently
   - Offer "Sync Now" button with caveat: "Sync may take 10-30 minutes due to Amazon rate limits"

5. **Amazon Ads Must Be Separate Integration**
   - Based on research patterns (Facebook Ads, Google Ads are separate), Amazon Ads likely separate
   - **Action:** Build separate Amazon Ads integration (Advertising API)
   - Pull Sponsored Products, Sponsored Brands, Sponsored Display spend
   - Attribute ad spend to orders for true profitability (ROAS, ACoS, TACoS metrics)

6. **COGS Prompt is Essential**
   - Amazon doesn't store COGS (like WooCommerce)
   - **Action:** Prominently prompt user during setup: "Amazon doesn't provide product costs. Please enter COGS for accurate profit tracking."
   - Bulk COGS import via CSV
   - Warning if COGS missing: "⚠️ 45 products missing COGS - profit calculations incomplete"

7. **Vendor Central = Untapped Market**
   - BeProfit doesn't support Vendor Central (1P vendors)
   - **Action:** Build Vendor Central integration (Vendor API, different from SP-API)
   - Capture: Purchase orders from Amazon, chargebacks, co-op marketing fees, shortage claims
   - **Market Opportunity:** 1P vendors underserved by profit tracking tools

8. **Inbound Placement Fee Tracking (2026 Update)**
   - New fee in 2026 for distributing inventory to FBA centers
   - **Action:** Track inbound placement fees from settlement reports
   - Allocate to products based on units shipped to FBA
   - Stay updated on Amazon fee changes annually (2027, 2028 updates)

9. **Dimensional Weight Mismatch Warning**
   - Amazon rounds up package dimensions, causing FBA fee discrepancies
   - **Action:** Build "FBA Fee Estimator" tool that shows: "Your package dimensions suggest $4.50 fee, but Amazon may charge $5.25 due to rounding"
   - Help sellers optimize packaging to reduce fees

10. **Return Disposition Tracking**
    - Distinguish between sellable and damaged returns
    - **Action:** Pull return disposition from Returns Report API
    - Show sellers: "80% of your returns are sellable (COGS recovered), 20% are damaged (COGS lost)"
    - **Insight:** Helps sellers identify defective products or packaging issues

---

## Amazon Integration Checklist (for Our Build)

### MVP (Phase 1)
- [x] SP-API OAuth connection (multi-marketplace support)
- [x] Order sync (FBA + FBM) via Orders API or Reports API
- [x] Per-order FBA fees (referral, fulfillment) auto-imported
- [x] Product catalog sync (ASIN, SKU, pricing)
- [x] Prompt user to enter COGS for each ASIN/SKU
- [x] Multi-marketplace currency conversion
- [x] Historical data import (90 days via Orders API, 1 year via Reports API)

### Phase 2 (Enhancements)
- [ ] FBA storage fee allocation per-SKU (using FBA inventory reports + cubic feet)
- [ ] Long-term storage fee tracking and warnings ("Product A has been in FBA 350+ days, will incur $6.90/cubic foot fee soon")
- [ ] Amazon Ads integration (separate OAuth, Advertising API)
- [ ] Return disposition tracking (sellable vs damaged)
- [ ] Inbound placement fee tracking (2026 new fee)
- [ ] Multi-marketplace segmentation dashboard ("Show only UK marketplace profit")
- [ ] "Sync Now" manual sync button with progress indicator

### Phase 3 (Differentiation)
- [ ] Amazon Vendor Central integration (1P vendors, Vendor API)
- [ ] FBA fee estimator tool (predict fees based on package dimensions)
- [ ] Storage fee optimization suggestions ("Move Product A to long-term storage or liquidate to save $150/month")
- [ ] Dimensional weight rounding warnings
- [ ] Amazon Subscribe & Save tracking (recurring revenue)
- [ ] Amazon Business (B2B) order support
- [ ] 2+ year historical data import via Reports API

---

## Sources Referenced
- Amazon Selling Partner Appstore: https://sellercentral.amazon.com/selling-partner-appstore/dp/amzn1.sp.solution.835e75d5-129e-403a-b86d-e2f068b7765b
- BeProfit Amazon Tech Partner: https://integrations.beprofit.co/amazon
- BeProfit FBA Profit Tracking Blog: https://beprofit.co/a/blog/how-to-track-and-calculate-your-profit-on-amazon-fba
- BeProfit FBA Calculator Accuracy Article: https://beprofit.co/a/blog/amazon-fba-profit-calculator-is-inaccurate-how-sellers-can-avoid-mistakes-that-can-cost-a-fortune
- Amazon SP-API Documentation: https://developer-docs.amazon.com/sp-api/docs/connecting-to-the-selling-partner-api
- Amazon 2026 FBA Fee Changes: https://sellerengine.com/amazon-2026-fba-fees/
- BeProfit FAQ: https://help.runviably.com/beprofit/beprofit-faq
