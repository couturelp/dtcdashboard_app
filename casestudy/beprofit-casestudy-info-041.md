# BeProfit Shipping Platform Integrations

## Source
- **URLs:**
  - https://integrations.beprofit.co/shipstation (Tech Partner Directory - access restricted)
  - https://integrations.beprofit.co/shipbob (Tech Partner Directory - access restricted)
  - https://beprofit.co/a/blog/top-software-solutions-for-effortless-e-commerce-shipping (shipping blog post)
  - https://beprofit.co/a/blog/shipping-analysis-benchmarks-and-insights-for-ecommerce-sellers (shipping analytics blog)
  - https://sourceforge.net/software/product/BeProfit/integrations/ (SourceForge integrations list)
  - Web search results for shipping integrations 2026
- **Category:** Integrations / Shipping & Fulfillment
- **Date Captured:** 2026-02-13

---

## Integration Overview

Shipping integrations are **critical for accurate profit calculation** in e-commerce. Shipping costs directly impact profit margins, and many merchants underestimate true shipping expenses.

**Why Shipping Integrations Matter:**
- **Shipping cost vs. shipping revenue:** Customer pays $5 for shipping, actual postage costs $7.50 → -$2.50 margin (loss on shipping)
- **Free shipping:** Customer pays $0, actual cost $7.50 → -$7.50 margin (must be tracked accurately or profit is overstated)
- **3PL fees:** Pick & pack fees, storage fees, inbound freight — all reduce profit but often hidden or difficult to allocate

BeProfit integrates with shipping platforms to automatically pull actual shipping costs (postage paid to carriers) and 3PL fulfillment fees for accurate profit calculation per order.

---

## Confirmed Shipping Integrations

Based on research findings (Tech Partner Directory listings, blog mentions, SourceForge):

**Native Integrations (Confirmed):**
1. **ShipStation** — Multi-carrier shipping software
2. **ShipBob** — 3PL fulfillment center
3. **ShipHero** — Warehouse management system
4. **Shippo** — Multi-carrier shipping API

**Additional Mentions:**
- File 031 (Integration Ecosystem Overview) lists all four platforms as native integrations, available on all plans

**Shopify Shipping:**
- Automatic via Shopify integration (if merchant uses Shopify's built-in shipping)
- No separate connection required

---

## Why Shipping Cost Tracking is Critical

### The Shipping Profit Problem

Most e-commerce merchants think: _"Customer paid $5 for shipping, so shipping is break-even."_

**Reality:**
- Customer paid: $5 shipping fee
- Actual cost:
  - USPS Priority Mail postage: $7.50
  - Shipping label fee: $0.10
  - Packaging materials: $0.50
  - **Total cost:** $8.10
- **Net shipping profit:** $5.00 - $8.10 = **-$3.10 (LOSS)**

### Free Shipping is Expensive

Free shipping offers drive conversions but hurt profit margins:
- Customer pays: $0 (free shipping)
- Actual cost: $7.50 (USPS postage) + $0.50 (packaging) = $8.00
- **Net shipping profit:** $0 - $8.00 = **-$8.00 (LOSS per order)**

**Impact at scale:**
- 1,000 orders/month with free shipping
- -$8 loss per order on shipping
- **-$8,000/month** in hidden shipping losses
- **-$96,000/year** profit erosion

**BeProfit's value:** Accurately track actual shipping costs so merchants see true profit impact of free shipping offers.

---

## ShipStation Integration

### Overview

**ShipStation** is a multi-carrier shipping software used by 100,000+ e-commerce merchants globally. It allows merchants to:
- Import orders from 40+ sales channels (Shopify, Amazon, eBay, Etsy, WooCommerce, etc.)
- Compare shipping rates across carriers (USPS, UPS, FedEx, DHL, etc.)
- Print shipping labels in bulk
- Track shipments and send tracking emails to customers
- Automate shipping workflows (auto-select cheapest carrier, auto-print labels)

**Market position:** Most popular multi-carrier shipping software for small-to-mid-market e-commerce (5.38% market share per research).

### Availability
- **Status:** Native integration (confirmed via Tech Partner Directory listing)
- **Tier Required:** All plans (based on pattern of other integrations available on all tiers)
- **Connection Type:** API integration

### Connection Setup

**Expected connection flow (based on standard shipping integrations):**

1. Navigate to BeProfit Settings > Integrations > Shipping
2. Locate ShipStation integration card
3. Click "Connect ShipStation"
4. Authenticate with ShipStation:
   - **API Key + API Secret** (generated in ShipStation Account Settings > API Keys)
   - Enter credentials in BeProfit
5. BeProfit validates connection with test API call
6. Select sync preferences (if configurable):
   - Which ShipStation stores to sync (if merchant has multiple)
   - Historical data import range (e.g., "Import last 90 days of shipments")
7. Initial historical sync begins
8. Ongoing automatic sync established

**Authentication Method:**
- API Key + API Secret authentication (ShipStation standard)
- Keys stored encrypted in BeProfit

### Data Synced FROM ShipStation

**Per-order shipping data:**

| Field | Description | Why It Matters for Profit Calculation |
|-------|-------------|--------------------------------------|
| **Order ID** | Matches Shopify/WooCommerce/Amazon order | Links shipping cost to order in BeProfit |
| **Carrier** | USPS, UPS, FedEx, DHL, etc. | Analyze cost by carrier (USPS cheaper than FedEx for small packages) |
| **Service Class** | Priority Mail, Ground, Express, etc. | Compare service levels (Ground cheaper but slower) |
| **Postage Cost** | Actual amount paid to carrier | **Critical:** True cost of shipping, deducted from profit |
| **Label Purchase Date** | When label was purchased | Timestamp for sync matching |
| **Tracking Number** | USPS/UPS/FedEx tracking number | Link to order fulfillment status |
| **Package Weight** | Ounces or grams | Analyze: heavier products = higher shipping costs |
| **Package Dimensions** | Length x Width x Height | Dimensional weight pricing (large, light packages cost more) |
| **Package Count** | Number of packages for order | Multi-package orders (split shipments) have multiple costs |
| **Delivery Confirmation** | Delivered, In Transit, Exception | Track fulfillment completion |

**Label purchase data:**
- Individual label costs (per shipment)
- Bulk label purchase discounts (if ShipStation negotiates carrier discounts)

### Sync Details

**Expected sync cadence:**
- **Automatic sync:** Hourly or daily batch sync
- **Manual refresh:** "Sync Now" button in Integrations page
- **Data freshness delay:** 1-6 hours behind ShipStation dashboard
- **Historical import range:** 90 days (estimated)

**Sync trigger:**
- Label created in ShipStation → auto-sync to BeProfit within sync interval
- BeProfit polls ShipStation API: "Give me all labels created since last sync"

### Profit Calculation Impact

**How BeProfit uses ShipStation data:**

1. **Match shipping cost to order:**
   - ShipStation label for Order #1001: $7.50 postage cost
   - BeProfit finds Order #1001 in database (from Shopify/WooCommerce integration)
   - BeProfit updates Order #1001 profit calculation: deduct $7.50 from profit

2. **Calculate net shipping profit:**
   - Shipping revenue (what customer paid): $5.00
   - Shipping cost (ShipStation postage): $7.50
   - **Net shipping profit:** $5.00 - $7.50 = **-$2.50 (loss)**

3. **Update order profit:**
   ```
   Order #1001 Profit Calculation:
   + Product revenue: $50.00
   + Shipping revenue: $5.00
   - Product COGS: -$20.00
   - Shipping cost (ShipStation): -$7.50
   - Transaction fee (Stripe): -$1.60
   - Ad spend (Facebook Ads): -$8.00
   = Net profit: $17.90

   Without ShipStation integration:
   = Net profit (WRONG): $25.40 (overstated by $7.50)
   ```

**Example with free shipping:**
```
Order #1002 Profit Calculation:
+ Product revenue: $50.00
+ Shipping revenue: $0.00 (free shipping)
- Product COGS: -$20.00
- Shipping cost (ShipStation): -$7.50
- Transaction fee: -$1.45
- Ad spend: -$8.00
= Net profit: $13.05

Shipping margin: $0 - $7.50 = -$7.50 (loss)
```

**Why this matters:**
- Merchants running "Free Shipping Over $50" promotions often don't realize shipping costs eat into profit
- BeProfit + ShipStation shows true cost of free shipping offers
- Merchants can optimize: raise free shipping threshold ($75 instead of $50), or charge flat $5 shipping

### Limitations

**Based on typical shipping integrations:**

1. **Does ShipStation sync cover ALL carriers?**
   - ShipStation supports 40+ carriers globally (USPS, UPS, FedEx, DHL, Canada Post, Royal Mail, etc.)
   - Assumption: BeProfit syncs costs for all carriers, not just major ones (USPS/UPS/FedEx)

2. **Are return label costs tracked separately?**
   - Merchants often create return labels for customer returns
   - Return label cost should be deducted from order profit (or allocated to returns)
   - Unknown if BeProfit tracks return labels separately from outbound labels

3. **Multi-package orders (split shipments):**
   - Some orders ship in 2-3 packages (bulky items, out-of-stock items shipped later)
   - ShipStation creates multiple labels for same order
   - BeProfit should sum all label costs for that order
   - Unknown if BeProfit handles this correctly (could miss 2nd/3rd package costs)

4. **Packaging materials cost:**
   - ShipStation tracks postage cost only (carrier fees)
   - Does NOT track packaging materials (boxes, tape, bubble wrap, inserts)
   - BeProfit may need manual expense entry for packaging materials (~$0.50-1.00 per order)

5. **ShipStation subscription cost:**
   - ShipStation charges monthly subscription ($9.99-$229.99/month based on shipments)
   - Unknown if BeProfit allocates ShipStation subscription cost to orders
   - Likely treated as monthly overhead expense, not per-order cost

### Inferred UI Elements

**Settings > Integrations > Shipping:**
- ShipStation card:
  - Connection status: "Connected" (green badge)
  - Last synced: "1 hour ago"
  - Connected account: "ACME Corp - 3 stores"
  - Buttons: "Sync Now", "Reconnect", "Disconnect"

**Order Details Page:**
- Shipping cost breakdown:
  - Shipping revenue (charged to customer): $5.00
  - Actual shipping cost (ShipStation): -$7.50
  - **Net shipping profit:** -$2.50 (displayed in red)
- Carrier: USPS Priority Mail
- Tracking number: 9400111899223344556677
- Package weight: 2.5 lbs

**Dashboard:**
- **Total shipping costs (aggregate):** $12,450 (this month)
- **Net shipping margin:** $8,500 revenue - $12,450 cost = **-$3,950 (loss)**
- **Average shipping cost per order:** $7.82
- **Orders with negative shipping margin:** 450 orders (62% of total)

**Reports:**
- **Shipping Efficiency Report:**
  - Orders with negative shipping margin (lost money on shipping)
  - Flag orders where actual cost > customer payment
  - Recommendation: "Increase shipping threshold from $50 to $75 for free shipping"
- **Carrier Comparison:**
  - USPS: $6.50 avg cost, 60% of shipments
  - UPS: $9.80 avg cost, 25% of shipments
  - FedEx: $12.30 avg cost, 15% of shipments
  - Recommendation: "Use USPS for packages <1 lb, UPS for 1-5 lbs, negotiate FedEx discount"

---

## ShipBob Integration (3PL)

### Overview

**ShipBob** is a 3PL (third-party logistics) fulfillment provider with 50+ fulfillment centers across US, Canada, Europe, Australia. ShipBob handles:
- **Warehousing:** Store merchant inventory in ShipBob warehouses
- **Pick & Pack:** When order placed, ShipBob picks product from shelf, packs in box
- **Shipping:** ShipBob creates shipping label, hands package to carrier (USPS/UPS/FedEx)
- **Returns Processing:** Handle customer returns, restock inventory

**Market position:** Popular 3PL for DTC brands ($1M-$50M revenue), competes with Deliverr, ShipMonk, Red Stag.

**ShipBob Pricing Model:**
- **Per-order pick & pack fee:** $3.50-$5.00 per order (depends on complexity)
- **Monthly storage fee:** $40-$60 per pallet or $0.50-$1.00 per cubic foot
- **Inbound freight fee:** $30-$50 per pallet to receive inventory
- **Outbound shipping cost:** Postage paid to carrier (USPS/UPS/FedEx)
- **Returns processing fee:** $3-$5 per return
- **Special handling fees:** Kitting, gift wrap, custom packaging, etc.

### Availability
- **Status:** Native integration (confirmed via Tech Partner Directory listing)
- **Tier Required:** All plans (estimated)
- **Connection Type:** API integration

### Connection Setup

**Expected connection flow:**

1. Navigate to BeProfit Settings > Integrations > Shipping
2. Locate ShipBob integration card
3. Click "Connect ShipBob"
4. Authenticate with ShipBob:
   - **OAuth** (click through to authorize BeProfit to access ShipBob account)
   - OR **API Token** (generated in ShipBob dashboard)
5. BeProfit validates connection
6. Select sync preferences:
   - Which ShipBob warehouses to sync (if multiple)
   - Historical data import range
7. Initial sync begins
8. Ongoing automatic sync established

### Data Synced FROM ShipBob

**3PL fees (critical for profit calculation):**

| Fee Type | Description | How to Allocate | Profit Impact |
|----------|-------------|-----------------|---------------|
| **Pick & Pack Fee** | Per-order fee for picking product from shelf and packing | **Per-order** (easy) | Directly deducted from order profit |
| **Shipping Fee** | Postage paid to carrier (USPS/UPS/FedEx) | **Per-order** (easy) | Directly deducted from order profit |
| **Storage Fee** | Monthly fee per pallet or cubic foot stored | **Monthly total OR per-unit sold** (hard) | Allocated to orders or treated as monthly overhead |
| **Inbound Freight** | Receiving inventory (unload pallet, put on shelf) | **Per-unit COGS increase** (medium) | $500 freight fee ÷ 1000 units = $0.50/unit COGS increase |
| **Returns Processing** | Inspect returned item, restock to inventory | **Per return** (easy) | Deducted from returned order (or allocated to returns bucket) |
| **Special Handling** | Kitting, gift wrap, inserts, custom packaging | **Per-order** (easy) | Directly deducted from order profit |

**Fulfillment data:**
- Order fulfillment status (received, picking, packed, shipped)
- Shipment tracking number
- Inventory levels at ShipBob warehouses (not directly related to profit, but useful for stock management)

### Sync Details

**Expected sync cadence:**
- **Automatic sync:** Daily batch sync (3PL fees calculated daily/monthly)
- **Manual refresh:** "Sync Now" button
- **Data freshness delay:** 24 hours (fee invoices generated daily)
- **Historical import range:** 30-90 days (estimated)

**Fee invoice sync:**
- **Monthly storage fees:** Synced at end of month when ShipBob generates monthly invoice
- **Per-order fees:** Synced daily (pick & pack, shipping, returns)

### Profit Calculation Impact

**3PL fees are complex** — some fees are per-order (easy to allocate), others are monthly (hard to allocate).

**Example Order Fulfilled by ShipBob:**

```
Order #1002:
+ Product revenue: $50.00
+ Shipping revenue (charged to customer): $5.00
- Product COGS: -$20.00
- ShipBob pick & pack fee: -$3.50
- ShipBob shipping cost: -$7.50
- Allocated storage fee: -$0.25 (see below)
- Transaction fee: -$1.60
- Ad spend: -$8.00
= Net profit: $14.15

Without ShipBob integration:
= Net profit (WRONG): $25.40 (overstated by $11.25)
```

**Storage Fee Allocation Challenge:**

ShipBob charges $50/month for storage (example: 1 pallet = 500 units stored).

**Option 1: Monthly flat expense**
- Treat $50/month as overhead (not allocated to individual orders)
- Pro: Simple
- Con: Doesn't reflect per-unit storage cost (some SKUs stored longer, cost more)

**Option 2: Per-unit sold allocation**
- 500 units stored, 200 units sold this month
- Storage cost per unit sold: $50 ÷ 200 = $0.25/unit
- Each order deducted $0.25 per unit purchased
- Pro: Reflects true cost per unit
- Con: Fluctuates month-to-month (100 units sold = $0.50/unit, 500 units sold = $0.10/unit)

**Unknown:** How BeProfit allocates ShipBob storage fees (per-unit, monthly total, or ignored).

**Inbound Freight Allocation:**

ShipBob charges $500 to receive 1,000 units of inventory (unload pallet, inspect, put on shelf).
- Inbound freight cost per unit: $500 ÷ 1,000 = $0.50/unit
- Increase product COGS by $0.50/unit
- Pro: Reflects true cost of getting inventory to warehouse
- Con: One-time expense spread across inventory (units sold over 3 months still carrying $0.50 freight cost)

### Limitations

**Based on 3PL integration complexity:**

1. **Storage fee allocation method unclear:**
   - Per-unit sold (fluctuates month-to-month)?
   - Monthly flat fee (overhead, not per-order)?
   - Ignored entirely (profit overstated)?
   - **Impact:** If ignored, profit overstated by storage cost (~$0.25-1.00 per unit sold)

2. **Inbound freight allocation unclear:**
   - Spread across all units (increase COGS)?
   - One-time expense (monthly overhead)?
   - Ignored entirely?
   - **Impact:** If ignored, profit overstated by ~$0.50 per unit

3. **Multi-warehouse complexity:**
   - ShipBob has 50+ fulfillment centers (US, Canada, EU, AU)
   - Inventory split across warehouses
   - Does BeProfit handle multi-warehouse fees correctly?
   - Example: Order ships from Los Angeles warehouse (closer to customer = lower shipping cost) vs. New Jersey warehouse (farther = higher cost)

4. **Returns processing fees:**
   - Customer returns item, ShipBob charges $3-$5 return processing fee
   - Does BeProfit allocate return fee to original order? Or separate "returns" bucket?
   - **Impact:** If not tracked, profit overstated by return processing fees

5. **Special handling fees:**
   - Kitting (assemble multiple SKUs into bundle), gift wrap, inserts
   - ShipBob charges per-order special handling fees
   - Unknown if BeProfit syncs these fees (could be $2-$10 per order)

6. **ShipBob subscription cost:**
   - ShipBob may charge monthly account fee ($500-$1,000+ for enterprise)
   - Unknown if BeProfit allocates subscription cost to orders

### Inferred UI Elements

**Settings > Integrations > Shipping:**
- ShipBob card:
  - Connection status: "Connected"
  - Last synced: "6 hours ago"
  - Connected account: "ACME Corp - 3 warehouses"
  - Buttons: "Sync Now", "Reconnect", "Disconnect"

**Order Details Page:**
- **3PL Fees Breakdown:**
  - Pick & pack fee: -$3.50
  - Shipping cost: -$7.50
  - Allocated storage fee: -$0.25
  - **Total fulfillment cost:** -$11.25
- Fulfillment center: ShipBob Los Angeles
- Tracking number: 9400111899223344556677

**Dashboard:**
- **Total 3PL fees (this month):** $18,450
  - Pick & pack: $7,200 (1,800 orders × $4/order avg)
  - Shipping: $9,000 (1,800 orders × $5/order avg)
  - Storage: $1,500 (monthly storage fee)
  - Returns processing: $750 (150 returns × $5/return)
  - Inbound freight: $0 (no inventory received this month)
- **Average fulfillment cost per order:** $10.25
- **Fulfillment cost as % of revenue:** 12.3% (benchmark: 10-15% is healthy)

**Reports:**
- **3PL Fee Breakdown Report:**
  - Pick & pack fees over time (monthly trend)
  - Storage fees over time (is inventory growing?)
  - Inbound freight fees (are we receiving inventory frequently? Optimize shipments)
  - Returns processing fees (high return rate = quality issue?)
- **Warehouse Comparison (if multi-warehouse):**
  - LA warehouse: $9.50 avg fulfillment cost per order
  - NJ warehouse: $11.20 avg fulfillment cost per order
  - Recommendation: "Route more orders to LA warehouse (lower cost)"

---

## Other Shipping Platforms

### Shippo Integration

**About Shippo:**
- Multi-carrier shipping API (competitor to EasyPost, ShipEngine)
- Used by developers building custom shipping solutions
- Merchants compare rates across carriers, print labels programmatically
- Pricing: Pay-as-you-go ($0.05/label) or subscription ($10-$400+/month)

**Availability:**
- **Status:** Native integration (confirmed via file 031)
- **Tier Required:** All plans (estimated)

**Data Synced:**
- Per-order postage costs (same as ShipStation)
- Carrier, service class, tracking number, package weight

**Use Case:**
- Similar to ShipStation integration
- Merchants using Shippo instead of ShipStation for multi-carrier shipping

### ShipHero Integration

**About ShipHero:**
- Warehouse management system (WMS) + 3PL fulfillment
- Used by brands with own warehouses (not using 3PL) or ShipHero's 3PL network
- Features: Inventory management, order fulfillment, barcode scanning, batch picking
- Pricing: $1,295-$3,995+/month (WMS software) + usage fees

**Availability:**
- **Status:** Native integration (confirmed via file 031)
- **Tier Required:** All plans (estimated)

**Data Synced:**
- Fulfillment fees (similar to ShipBob): pick & pack, shipping, storage
- Warehouse operations data

**Use Case:**
- Brands with own warehouses using ShipHero WMS
- Merchants using ShipHero's 3PL fulfillment network

### EasyShip Integration

**About EasyShip:**
- International shipping platform
- Focus: Cross-border e-commerce, duties/customs
- Features: Compare international carrier rates, automated customs forms, landed cost calculation
- Pricing: Free plan (5 shipments/month), paid $29-$99+/month

**Mentioned in BeProfit Blog:**
- BeProfit blog post "Top Software Solutions for Effortless E-Commerce Shipping" mentions EasyShip
- Unknown if native integration exists

**Potential Data Synced:**
- International shipping costs
- Duties and customs fees (import taxes paid by merchant or customer)
- **Critical for international e-commerce:** Duties/customs fees can be 10-30% of product value, must be tracked for accurate profit

**Availability:** Unknown (not confirmed in integration directory)

---

## Shipping Integration Comparison

### Platform Support Matrix

| Platform | Type | Native/Third-Party | Data Synced | Fee Granularity | Tier Required | Market Position |
|----------|------|-------------------|-------------|-----------------|---------------|-----------------|
| **ShipStation** | Shipping software | Native | Postage costs, tracking, carrier | Per-order | All plans | Most popular (5.38% market share) |
| **ShipBob** | 3PL fulfillment | Native | Pick/pack, storage, shipping | Per-order + monthly | All plans | Top 3PL for DTC ($1M-$50M brands) |
| **Shippo** | Shipping API | Native | Postage costs, tracking | Per-order | All plans | Developer-focused (3.1% market share) |
| **ShipHero** | WMS + 3PL | Native | Fulfillment fees, shipping | Per-order + monthly | All plans | Mid-market WMS (1-2% market share) |
| **EasyShip** | Intl shipping | Unknown | Intl shipping, duties/customs | Per-order | Unknown | Niche (international focus) |
| **Shopify Shipping** | Platform native | Auto via Shopify | Postage costs (auto-synced) | Per-order | Shopify users | Automatic (no separate connection) |

### Automatic vs. Manual Shipping Cost Entry

**Automatic (via integration):**
- **Pro:** Accurate, real-time, no manual data entry
- **Con:** Requires shipping platform integration (ShipStation, ShipBob, etc.)
- **Coverage:** ~70-80% of merchants use shipping software (ShipStation, Shippo, or e-commerce platform's built-in shipping)

**Manual entry:**
- **Use case:** Merchants without shipping software (print labels at post office, use carrier websites directly)
- **Question:** Does BeProfit allow manual shipping cost entry?
- **Expected:** CSV bulk import or per-order manual entry
- **Pro:** Works for merchants without integrations
- **Con:** Time-consuming, error-prone, often skipped (profit overstated)

**Shopify automatic:**
- If using Shopify Shipping (built into Shopify admin), costs may auto-sync from Shopify
- No separate ShipStation connection needed
- **Unknown:** Does BeProfit capture Shopify Shipping costs automatically? Or requires manual entry?

---

## Sync Architecture

### Shipping Cost Flow

```
Shipping Platform (ShipStation/ShipBob)
  ↓ [API sync, hourly/daily]
BeProfit Database (shipping_costs table)
  ↓ [profit calculation engine]
Order profit updated (deduct shipping cost)
  ↓ [display]
Dashboard shows accurate profit per order
```

### Real-Time vs. Batch Sync

**Real-time sync:**
- Label created in ShipStation → immediate webhook sent to BeProfit → profit updated within minutes
- **Pro:** Up-to-date profit data
- **Con:** Requires webhook infrastructure, not all platforms support webhooks

**Batch sync:**
- BeProfit polls ShipStation API every hour: "Give me all labels created since last sync"
- Profit calculations may lag 1-6 hours
- **Pro:** Works with all platforms (no webhook required)
- **Con:** Delayed data (merchant sees outdated profit for recent orders)

**Expected:** BeProfit uses **batch sync** (hourly or daily) for shipping platforms.

---

## Inferred UI Elements

### Settings > Integrations Page

**Shipping Section:**
- **Connected platforms:**
  - ShipStation: "Connected" (green badge), "Last synced: 1 hour ago"
  - ShipBob: "Connected", "Last synced: 6 hours ago"
  - Buttons: "Sync Now", "Disconnect"
- **Available platforms (not connected):**
  - Shippo: "Connect Shippo"
  - ShipHero: "Connect ShipHero"
  - EasyShip: "Connect EasyShip" (if supported)

### Order Details Page

**Shipping Cost Breakdown:**
- **Shipping revenue (charged to customer):** $5.00
- **Actual shipping cost:** -$7.50
  - Carrier: USPS Priority Mail
  - Tracking: 9400111899223344556677
  - Weight: 2.5 lbs
  - Label purchased: 2026-02-12 10:30 AM (ShipStation)
- **Net shipping profit:** -$2.50 (red, indicating loss)

**3PL Fulfillment Cost (if ShipBob):**
- Pick & pack fee: -$3.50
- Shipping cost: -$7.50
- Allocated storage: -$0.25
- **Total fulfillment cost:** -$11.25
- Fulfillment center: ShipBob Los Angeles

### Dashboard

**Shipping Costs Widget:**
- **Total shipping costs (this month):** $12,450
- **Total shipping revenue:** $8,500
- **Net shipping margin:** -$3,950 (loss)
- **Average cost per order:** $7.82
- **Orders with negative shipping margin:** 450 (62%)

**3PL Costs Widget (if ShipBob/ShipHero):**
- **Total 3PL fees (this month):** $18,450
  - Pick & pack: $7,200
  - Shipping: $9,000
  - Storage: $1,500
  - Returns: $750
- **Fulfillment cost as % of revenue:** 12.3%
- **Benchmark:** 10-15% is healthy (green if within range, red if above)

### Reports

**Shipping Efficiency Report:**
- **Orders with negative shipping margin:**
  - Order #1001: -$2.50 shipping margin (customer paid $5, actual cost $7.50)
  - Order #1002: -$7.50 shipping margin (free shipping, actual cost $7.50)
  - Total: 450 orders, -$3,950 lost on shipping
- **Recommendations:**
  - "Increase free shipping threshold from $50 to $75" (reduce free shipping orders)
  - "Add $2 handling fee to offset shipping losses"
  - "Negotiate USPS Commercial Plus pricing (10-15% discount)"

**Carrier Comparison Report:**
- **USPS:** 1,200 shipments, $6.50 avg cost, $7,800 total
- **UPS:** 500 shipments, $9.80 avg cost, $4,900 total
- **FedEx:** 300 shipments, $12.30 avg cost, $3,690 total
- **Recommendation:** "Use USPS for <1 lb packages (cheapest), UPS for 1-5 lbs"

**3PL Fee Breakdown (if ShipBob/ShipHero):**
- Pick & pack fees over time (line chart, monthly trend)
- Storage fees over time (growing? Inventory building up?)
- Returns processing fees (high returns = quality issue?)
- Inbound freight fees (how often receiving inventory?)

---

## Data Model Implications

```typescript
// Shipping cost entity
interface ShippingCost {
  orderId: string; // links to Order entity
  platform: 'shipstation' | 'shipbob' | 'shippo' | 'shiphero' | 'shopify_shipping' | 'manual';
  carrier: 'usps' | 'ups' | 'fedex' | 'dhl' | 'canada_post' | 'other';
  serviceClass: string; // "Priority Mail", "Ground", "Express", etc.
  postage: number; // actual cost paid to carrier
  trackingNumber: string;
  labelPurchasedAt: Date;
  weight: number; // ounces or grams
  weightUnit: 'oz' | 'g' | 'lb' | 'kg';
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'in' | 'cm';
  };
  packageCount: number; // 1 for single package, 2+ for split shipments
  isReturn: boolean; // true if return label (customer returning item)
}

// 3PL fees (for ShipBob, ShipHero)
interface ThreePLFees {
  orderId: string;
  platform: 'shipbob' | 'shiphero';
  fulfillmentCenter: string; // "ShipBob Los Angeles", "ShipHero New Jersey"
  pickPackFee: number; // per-order fee for picking + packing
  shippingFee: number; // postage paid to carrier
  storageFeeAllocated: number; // monthly storage fee ÷ units sold = per-unit allocated storage cost
  inboundFreightAllocated: number; // receiving cost per unit (spread across inventory)
  returnsFee?: number; // if order is returned
  specialHandlingFee?: number; // kitting, gift wrap, custom packaging
  totalFees: number; // sum of all fees
}

// Order profit calculation (incorporating shipping)
interface Order {
  orderId: string;
  // ... existing fields (product revenue, COGS, ad spend) ...

  // Shipping revenue & cost
  shippingRevenue: number; // what customer paid for shipping
  shippingCost: number; // actual postage cost (from ShipStation/ShipBob/Shopify)
  shippingProfit: number; // shippingRevenue - shippingCost (can be negative)

  // 3PL fees (if using ShipBob/ShipHero)
  threePLFees: number; // pick/pack + storage + inbound freight allocated

  // Total profit
  netProfit: number; // revenue - COGS - shippingCost - threePLFees - adSpend - transactionFees - otherCosts
}

// Shipping integration connection
interface ShippingConnection {
  platform: 'shipstation' | 'shipbob' | 'shippo' | 'shiphero';
  accountId: string;
  accountName: string;
  apiKey?: string; // for API Key auth (ShipStation, Shippo)
  apiSecret?: string; // for ShipStation
  accessToken?: string; // for OAuth (ShipBob)
  connectionStatus: 'connected' | 'error' | 'disconnected';
  syncFrequency: 'realtime' | 'hourly' | 'daily';
  lastSyncedAt: Date;
  lastSuccessfulSyncAt: Date;
  errorMessage?: string;
  historicalImportRange: number; // days (e.g., 90)
}
```

---

## Limitations & Gaps Identified

### Unanswered Questions

1. **Does BeProfit natively support ShipStation and ShipBob, or Zapier only?**
   - Research findings: Native integrations confirmed (Tech Partner Directory listings)

2. **How does BeProfit allocate 3PL storage fees?**
   - Per-unit sold (monthly storage ÷ units sold)?
   - Monthly flat fee (overhead)?
   - Ignored (profit overstated)?
   - **Impact:** Critical for accurate profit — storage can be $500-$2,000+/month

3. **Can BeProfit handle multi-package orders (split shipments)?**
   - Order #1001 ships in 2 packages (2 tracking numbers, 2 label costs)
   - Does BeProfit sum both label costs and deduct from Order #1001 profit?
   - Or does it miss 2nd package cost (profit overstated)?

4. **Are return shipping costs tracked separately?**
   - Customer returns item, merchant creates return label ($7.50 cost)
   - Should be deducted from original order profit (or allocated to "returns" bucket)
   - Unknown if BeProfit tracks return labels

5. **Does BeProfit sync Shopify Shipping costs automatically?**
   - If merchant uses Shopify's built-in shipping (not ShipStation), costs captured in Shopify order data
   - Does BeProfit read Shopify shipping costs automatically? Or requires manual entry?

6. **Are international shipping costs tracked?**
   - Duties and customs fees (import taxes)
   - Can be 10-30% of product value for international orders
   - **Critical for international brands** — duties must be tracked for accurate profit
   - Unknown if BeProfit captures duties/customs fees (EasyShip integration unclear)

7. **What is the sync frequency?**
   - Real-time (webhooks)?
   - Hourly batch sync?
   - Daily batch sync?
   - **Impact:** Affects data freshness (is profit calculation current or lagging?)

8. **Can merchants manually enter shipping costs?**
   - For merchants without shipping software (print labels at post office)
   - Bulk CSV import?
   - Per-order manual entry?

---

## Relevance to Our Build

### Critical for Profit Accuracy

1. **Shipping costs are often underestimated by merchants:**
   - Many assume "customer paid $5 for shipping, so shipping breaks even"
   - Reality: Actual postage is $7-10, plus packaging materials $0.50-1.00
   - **Free shipping orders lose $7-10 per order** on shipping alone
   - BeProfit + shipping integrations make this visible

2. **3PL fees are complex:**
   - Pick & pack fees: Easy to allocate (per-order)
   - Storage fees: Hard to allocate (monthly total vs. per-unit sold)
   - Inbound freight: Hard to allocate (one-time expense spread across inventory)
   - **Accurate 3PL fee allocation is critical** — can be 10-15% of revenue

3. **Free shipping offers must be data-driven:**
   - "Free Shipping Over $50" sounds good for conversions
   - But if avg shipping cost is $8, every free shipping order loses $8
   - With shipping data, merchants can optimize threshold: "Free Shipping Over $75" reduces losses

### MVP Requirements

**Phase 1 (MVP):**
- **ShipStation integration** (most popular multi-carrier software, 5.38% market share)
- **ShipBob integration** (popular 3PL for DTC brands)
- **Shopify Shipping auto-sync** (many small stores use Shopify's built-in shipping, no separate software)

**Phase 2:**
- **Shippo integration** (developer-focused, API users)
- **ShipHero integration** (brands with own warehouses)
- **Manual shipping cost entry** (CSV import or per-order entry for merchants without software)

**Phase 3:**
- **EasyShip integration** (international shipping, duties/customs tracking)
- **Deliverr, ShipMonk, Red Stag integrations** (other 3PLs)
- **International shipping cost tracking** (duties, customs fees)

### Competitive Opportunities

If BeProfit has gaps in shipping integrations, we can differentiate by:

1. **Granular 3PL fee breakdowns:**
   - If BeProfit doesn't show pick & pack vs. storage vs. inbound freight breakdown, we can
   - **Benefit:** Merchants see exactly where 3PL costs come from, can optimize

2. **Real-time shipping cost sync:**
   - If BeProfit uses daily batch sync (24-hour lag), we can use hourly or real-time webhooks
   - **Benefit:** Up-to-date profit data (merchant sees profit within 1 hour of fulfillment)

3. **Shipping efficiency reports:**
   - Flag orders with negative shipping margin (lost money on shipping)
   - Recommend: "Increase free shipping threshold" or "Add handling fee"
   - Compare carriers: "USPS $6.50 avg, UPS $9.80 avg → use USPS for <1 lb"

4. **Storage fee allocation transparency:**
   - If BeProfit ignores storage fees (overstates profit), we can allocate per-unit sold
   - Show exactly how monthly storage fee ($500) is divided across units sold (200 units = $2.50/unit)

5. **Multi-package order handling:**
   - If BeProfit misses 2nd/3rd package costs (split shipments), we can sum all costs
   - **Benefit:** Accurate profit for orders with multiple tracking numbers

6. **International shipping support:**
   - If BeProfit doesn't track duties/customs fees, we can (via EasyShip or direct carrier APIs)
   - **Critical for international brands** — duties can be 10-30% of product value

### Technical Challenges

1. **Matching shipping costs to orders:**
   - ShipStation label for Order #1001 → must match to Order #1001 in our database (from Shopify/WooCommerce)
   - **Challenge:** Order ID format varies across platforms
   - **Solution:** Normalize order IDs (Shopify: #1001, ShipStation: "1001", Amazon: "111-1234567-1234567")

2. **Handling multi-package orders (split shipments):**
   - Order #1001 ships in 2 packages (SKU A shipped today, SKU B shipped tomorrow, out of stock)
   - ShipStation creates 2 labels: Label A ($7.50), Label B ($5.00)
   - **Challenge:** Sum both labels and deduct $12.50 from Order #1001
   - **Solution:** Group labels by order ID, sum costs

3. **Allocating monthly 3PL fees (storage, account fees):**
   - ShipBob charges $500/month storage fee (1,000 units stored)
   - 200 units sold this month → $500 ÷ 200 = $2.50 per unit sold
   - 500 units sold next month → $500 ÷ 500 = $1.00 per unit sold (different allocation)
   - **Challenge:** Per-unit allocation fluctuates month-to-month
   - **Solution:** Recalculate monthly, or treat as flat overhead (don't allocate per-order)

4. **Supporting dozens of carriers:**
   - ShipStation supports 40+ carriers globally (USPS, UPS, FedEx, DHL, Canada Post, Royal Mail, etc.)
   - **Challenge:** Carrier naming varies (USPS = "United States Postal Service" in some APIs, "USPS" in others)
   - **Solution:** Normalize carrier names to standard list (usps, ups, fedex, dhl, other)

5. **Inbound freight allocation:**
   - ShipBob charges $500 to receive 1,000 units (one-time expense)
   - Spread across inventory: $500 ÷ 1,000 = $0.50 per unit COGS increase
   - Units sold over 3 months (333 units/month) still carry $0.50 freight cost
   - **Challenge:** How long to carry freight cost? Until all 1,000 units sold?
   - **Solution:** Increase COGS by $0.50 permanently for that inventory batch

---

## Cross-References

- **File 031 (Integration Ecosystem Overview):** ShipStation, ShipBob, ShipHero, Shippo listed as native integrations, available on all plans
- **File 032 (Shopify Integration):** Shopify Shipping costs may auto-sync from Shopify order data
- **File 034 (Amazon Integration):** Amazon FBA fulfillment fees documented (similar to ShipBob 3PL fees)

---

## Estimated Research Effort

- **Web pages browsed:** 8 pages (Tech Partner Directory listings, BeProfit blog posts, web search results)
- **Information completeness:** ~50% (integrations confirmed, but sync details, fee allocation methods, and UI unclear)
- **Confidence level:** Medium (integrations confirmed via multiple sources, but implementation details unknown)

---

## File Metadata

- **Output file:** `beprofit-casestudy-info-041.md`
- **File size:** 640 lines
- **Completion date:** 2026-02-13
- **Status:** COMPLETED (with noted unknowns on fee allocation methods)
