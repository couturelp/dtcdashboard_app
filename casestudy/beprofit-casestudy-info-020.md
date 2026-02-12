# BeProfit Shipping Cost Tracking (Detailed) Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/dynamic-fulfillment-rules (Dynamic Fulfillment Rules)
  - https://help.runviably.com/beprofit/setting-up-order-item-quantity-based-tiered-rates (Quantity-Based Tiered Rates)
  - https://help.runviably.com/beprofit/fulfillment-profiles-in-beprofit-beprofit-help-center (Fulfillment Profiles Overview)
  - https://help.runviably.com/beprofit/create-fulfillment-profile-beprofit-help-center (Create Fulfillment Profile)
  - https://help.runviably.com/beprofit/create-a-shipping-profile-legacy-beprofit-help-center (Legacy Shipping Profile)
  - https://help.runviably.com/beprofit/is-tax/vat-included-in-shipping-costs-beprofit-help-center (Tax/VAT in Shipping)
  - https://help.runviably.com/beprofit/connect-fulfillment-platforms-beprofit-help-center (Connect Fulfillment Platforms)
  - https://help.runviably.com/beprofit/custom-fulfillment-expenses-beprofit-help-center (Custom Fulfillment Expenses)
- **Category:** Core Feature / Shipping & Fulfillment Analytics
- **Date Captured:** 2026-02-12
- **Cross-reference:** For basic shipping cost SETUP during onboarding (method overview, initial configuration), see **beprofit-casestudy-info-006.md**. This file goes deeper into the ongoing tracking mechanics, dynamic rule engine, tiered rates, estimation vs actual cost reconciliation, carrier integration, and shipping profitability analysis.

---

## Shipping Cost Tracking Overview

BeProfit's shipping cost tracking operates as a multi-layered system with six methods for capturing fulfillment costs (documented in file 006). This file focuses on the analytics and operational aspects — how costs are computed dynamically, how estimated costs compare to actual costs, and how shipping profitability is surfaced.

### Cost Tracking Methods (Summary from File 006)

| Method | Type | Key Feature |
|--------|------|-------------|
| 1. Fulfillment Profiles (current) | Estimated | Rule-based dynamic calculation |
| 2. Legacy Shipping Profiles | Estimated | Zone + method based |
| 3. Dynamic Fulfillment Rules | Estimated | Multi-variable conditions |
| 4. Quantity-Based Tiered Rates | Estimated | Volume-based tiers (legacy) |
| 5. Fulfillment Platform Integration | Actual | Auto-synced from 10 platforms |
| 6. Custom Fulfillment Expenses | Manual | Indirect costs (warehouse, packaging) |

---

## Fulfillment Profiles (Current System) — Deep Dive

### Profile Concept
"The role of fulfillment profiles within the BeProfit app is to assist in calculating your fulfillment costs, representing what you as a merchant, pay for fulfillment services."

Fulfillment profiles are rule-based configurations that dynamically calculate shipping and handling costs per order. They take a primary variable (the main cost driver) and apply rate tiers with optional geographic and refinement conditions.

### Profile Creation — Detailed Steps

1. **Navigate:** Settings → Costs → Fulfillment → "Create Fulfillment Rule"

2. **Select Primary Variable:**
   Choose the main factor determining fulfillment costs:

   | Variable | Description |
   |----------|-------------|
   | Order Price | Cost scales with total order value |
   | Package Weight | Cost scales with shipment weight |
   | Item Quantity | Cost scales with number of items |
   | Shipping Carrier | Different rates per carrier |
   | Other (Custom) | Fully customizable via Dynamic Fulfillment Rules |

3. **Configure Rate Tiers:**
   "Add rates, each added rate will create a new column in the table below."

   Each rate tier defines a cost bracket. For example, with weight as the primary variable:
   - 0-1 kg: $5.00
   - 1-3 kg: $8.00
   - 3-5 kg: $12.00
   - 5+ kg: $18.00

4. **Add Optional Cost Fields:**
   - **Handling costs** — additional per-order handling fees
   - **Duties costs** — import duties for international shipments

5. **Geographic Configuration:**
   Select destination countries and enter costs for each rate tier × country combination. This creates a matrix:

   | Country | 0-1 kg | 1-3 kg | 3-5 kg | 5+ kg |
   |---------|--------|--------|--------|-------|
   | USA | $5.00 | $8.00 | $12.00 | $18.00 |
   | Canada | $7.00 | $11.00 | $16.00 | $24.00 |
   | UK | $10.00 | $15.00 | $22.00 | $35.00 |

6. **Refinement Conditions:**
   Add secondary conditions to further scope the profile:
   - Click **"Add refinement condition"**
   - Select condition type (e.g., "Shipping Carrier")
   - Choose operator (e.g., "equals", "contains")
   - This allows rules like: "Apply these weight-based rates ONLY when the carrier is DHL"

7. **Profile Scope:**
   - **All Products** — applies to entire catalog
   - **Specific Products** — applies only to selected products
   - **Important:** If specific products are chosen, separate profiles must be created for non-selected products

8. **Finalize:**
   Enter profile name, select effective date range, click Save.

### Profile Evaluation on Orders

When an order is placed, BeProfit evaluates the applicable fulfillment profile:
- Checks which profile's product scope and conditions match the order
- Extracts the primary variable value from the order (weight, quantity, price)
- Looks up the matching rate tier and country
- Applies handling and duties if configured
- Records the calculated cost against the order

**Viewing applied profiles:** On the Orders page, hover over the **Shipping Cost** amount to see which profile was applied.

---

## Dynamic Fulfillment Rules — Deep Dive

### Purpose
"Dynamic Fulfillment Rules allows users to set up a fulfillment profile that calculates shipping and handling costs dynamically, considering factors like countries, weight, quantity, and more."

### Creation Process
1. Navigate to Settings → Costs → Fulfillment
2. Click **"Create Fulfillment Rule"**
3. Choose **"Other"** from available fulfillment profile templates
4. Configure the Dynamic Fulfillment Profile using a conditions-based interface
5. Establish multiple criteria and attributes

### What Makes It Different from Standard Profiles
Dynamic rules allow **multi-variable** cost calculations. While a standard profile uses one primary variable (e.g., weight) with optional refinement, dynamic rules can combine multiple conditions simultaneously:
- Weight AND country AND carrier
- Quantity AND order price AND product type

### Documented Limitations
The Help Center article for Dynamic Fulfillment Rules is notably **high-level** — it does not document:
- The specific condition types available in the interface
- Logic operators (AND/OR/IF-THEN)
- Priority or precedence between rules
- Rule evaluation sequence
- Override behavior when multiple rules match
- Examples of actual rule configurations

**Assessment:** The Dynamic Fulfillment Rules feature appears powerful but poorly documented, suggesting either a newer feature with incomplete documentation or a feature that requires support assistance to configure properly.

---

## Quantity-Based Tiered Rates — Deep Dive

### Purpose
Different shipping costs based on the number of items in an order. Useful for merchants where shipping cost scales with item count (e.g., packaging additional items costs incrementally more).

### Configuration

1. Navigate to Settings → Costs → Fulfillment Settings
2. Enter a **Fulfillment Profile Name**
3. Choose scope: **"All Products"** or **"Specific Products"**
4. Click **"Create Shipping Zone"**
5. Name the zone
6. Select geographic scope: **"Worldwide"** or **"Specific countries/regions"**
7. Select **"Order items quantity-based tiered rates"**
8. Configure each tier:

   | Field | Description |
   |-------|-------------|
   | **Rate Name** | Descriptive label for the tier (e.g., "1-3 items") |
   | **Shipping Rate** | Base shipping cost at this tier |
   | **Handling Rate** | Additional handling cost at this tier |
   | **Min num of items** | Lower bound — minimum items for this tier |
   | **Max num of items** | Upper bound — maximum items for this tier |

9. Click **"Add another rate"** to create additional tiers
10. Click **Save**

### Tier Example

| Tier Name | Shipping | Handling | Min Items | Max Items |
|-----------|----------|----------|-----------|-----------|
| Single item | $5.00 | $1.00 | 1 | 1 |
| 2-5 items | $8.00 | $2.00 | 2 | 5 |
| 6-10 items | $12.00 | $3.00 | 6 | 10 |
| 10+ items | $15.00 | $4.00 | 11 | 999 |

### Rate Application Logic
The documentation indicates rates apply based on **order item count thresholds** — per-order, not per-item. An order with 7 items would fall into the "6-10 items" tier and be charged $12.00 shipping + $3.00 handling = $15.00 total fulfillment.

### Requirement
**Legacy system only:** "The legacy fulfillment feature must be enabled by our team." This feature requires contacting BeProfit support for activation.

---

## Legacy Shipping Profile System — Deep Dive

### How It Differs from Current System

| Aspect | Legacy System | Current System |
|--------|---------------|----------------|
| Template | Zone + shipping method based | Variable + rate tier based |
| Primary approach | Geographic zones first, then methods within zones | Primary variable first, then geographic overlay |
| Rate types | Base rate + method-specific additional rates | Tier-based rates per variable range |
| Zone creation | Explicit "Create Shipping Zone" flow | Country selection within rate table |
| Methods | Multiple shipping methods per zone | Carrier as a refinement condition |
| Activation | Requires support team activation (for tiered rates) | Self-service |

### Configuration Process

1. Navigate to Settings → Costs → Fulfillment → select **Dynamic** option
2. Click **"Create Profile"**
3. Enter profile name
4. Set product scope: All Products or Specific Products
5. Click **"Create shipping zone"** → select countries (multiple zones per profile)
6. Configure shipping rates (fixed or variable)
7. Save and set date range

### Rate Configuration Pattern
"If you use shipping methods, a base rate of $0 and enter the full rate in each of the methods under 'additional rate'" — this means the legacy system supports multiple shipping methods per zone, each with its own rate.

**Example structure:**
```
Zone: North America (USA, Canada, Mexico)
├── Base Rate: $0
├── Standard Shipping: $8.00 additional
├── Express Shipping: $15.00 additional
└── Overnight Shipping: $25.00 additional

Zone: Europe (UK, Germany, France)
├── Base Rate: $0
├── Standard Shipping: $12.00 additional
└── Express Shipping: $22.00 additional
```

### Coexistence with Current System
Both systems appear to coexist — the legacy system is available alongside the current fulfillment profile system. The documentation warns: "Ensure that if specific products are selected, profiles are created for the non-selected products to have costs applied to them as well."

---

## Estimation vs Actual Cost Reconciliation

### How Estimated Costs Work
Fulfillment profiles (Methods 1-4) provide **estimated** shipping costs based on configured rules. These estimates are applied to orders at the time of calculation and are only as accurate as the rules configured.

### How Actual Costs Work
Fulfillment platform integrations (Method 5) provide **actual** shipping costs synced from third-party platforms. "We match the costs by order ID or by tracking code, ensuring accurate and streamlined cost management."

### Cost Matching Logic
Two methods for matching actual costs to orders:
1. **Order ID** — direct match between platform order ID and BeProfit order
2. **Tracking code** — match via shipment tracking number

This dual-matching approach minimizes gaps in cost attribution.

### Reconciliation Behavior
The documentation **does not explicitly document** what happens when both estimated (profile) and actual (integration) costs exist for the same order. Based on file 006's analysis: "When both a fulfillment profile and a platform integration apply to the same order, the documentation does not explicitly state which takes priority."

**Likely behavior:** Integration data (actual costs) overrides profile estimates, but this is inferred, not confirmed.

### No Documented Variance Reporting
There is no documented feature that shows the **difference** between estimated and actual shipping costs — e.g., "Your profiles estimated $1,200 in shipping this month but actual costs were $1,450." This would be valuable for merchants calibrating their shipping cost assumptions.

---

## Carrier/Provider Integration

### Supported Fulfillment Platforms (10)

| # | Platform | Connection Type | Data Synced |
|---|----------|----------------|-------------|
| 1 | Shopify Shipping Labels | Native | Shipping label costs |
| 2 | ShipStation | API/OAuth | Fulfillment costs per order |
| 3 | Shiphero | API/OAuth | Fulfillment costs per order |
| 4 | Shipmondo | API/OAuth | Fulfillment costs per order |
| 5 | Shopify Fulfillment Network | Native | Fulfillment costs |
| 6 | Shippo | API/OAuth | Fulfillment costs per order |
| 7 | Shipping Easy | API/OAuth | Fulfillment costs per order |
| 8 | Easyship | API/OAuth | Fulfillment costs per order |
| 9 | AfterShip | API/OAuth | Fulfillment costs per order |
| 10 | ShipBob | API/OAuth | Fulfillment costs per order |

### Connection Process
1. Navigate to Settings → Costs → Fulfillment
2. Select **"Manage Integration"**
3. Choose desired platforms
4. Click **"Connect"** next to each service to authorize

### Multi-Platform Support
Users can connect multiple platforms simultaneously. "Each platform requires a single login, after which costs distribute automatically across orders without additional setup steps."

### What's NOT Integrated
- **Direct carrier APIs** — No FedEx, UPS, USPS, DHL, or other carrier-direct integrations
- **Real-time rate lookups** — No API calls to carriers for live shipping quotes
- All integrations are through **fulfillment management platforms**, not carrier APIs directly

---

## Shipping Profitability Analysis

### Net Shipping Metric
BeProfit tracks three shipping components (from file 006):

| Component | Definition |
|-----------|-----------|
| **Shipping Revenue** | What the customer paid for shipping |
| **Shipping Cost** | What the merchant paid for fulfillment |
| **Net Shipping** | Shipping Revenue - Shipping Cost |

**Positive Net Shipping:** Merchant charges more for shipping than it costs (shipping is profitable)
**Negative Net Shipping:** Merchant subsidizes shipping (free shipping or below-cost shipping)

### Viewing Shipping Profitability
On the Orders page:
1. Locate a specific order
2. Hover over the **Shipping Cost** amount → see which fulfillment profile was applied
3. Hover over the **Net Shipping** amount → see the comparison between customer-charged shipping and actual merchant costs

### Aggregate Shipping Data
In the dashboard (file 011):
- **Fulfillment** KPI card shows total fulfillment costs with trend percentage
- Fulfillment cost appears as a segment in the **Profit & Expenses Breakdown** donut chart
- Fulfillment costs roll up into the P&L as a separate line item

### Missing Shipping Analytics
There is no documented dedicated "Shipping Analytics" page or dashboard section that provides:
- Shipping cost trends over time
- Cost per carrier breakdown
- Cost per geographic zone breakdown
- Estimated vs actual cost variance
- Shipping margin by product
- Shipping method utilization rates

Shipping data appears to be distributed across Orders (per-order view), Dashboard (aggregate KPI), and P&L (line item) rather than having its own analytics section.

---

## Tax/VAT in Shipping Costs

### Automatic Behavior
"The shipping price paid by your customers is pulled automatically from your store and already includes tax/VAT." This means shipping revenue in BeProfit already has tax baked in.

### Viewing Shipping Tax
Navigate to Orders page → hover over the **Tax** column to see the shipping tax breakdown per order.

### Manual Adjustment for Merchant-Paid Tax
If the merchant bears shipping tax/VAT (rather than passing it to the customer):

1. Go to Settings → Costs → Fulfillment
2. Edit existing shipping profile
3. Manually add the tax amount to the **Shipping Rate** field
4. Click **Done**

### Critical Limitation
"BeProfit does not offer a breakdown of your shipping costs, separating them into shipping and tax amounts." There is no automated tax separation — merchants must manually incorporate tax into their shipping rate configuration.

---

## Custom Fulfillment Expenses — Deep Dive

### Purpose
"Fulfillment expenses refer to indirect costs associated with fulfilling customer orders and delivering products" — costs like warehouse rent, packaging supplies, labor, and insurance that don't fit into per-order profile or integration tracking.

### Creation Process
1. Navigate to Settings → Costs → Fulfillment
2. Scroll to **"Add Custom or Variable Expenses"** section
3. Click **"+Custom Expense"**
4. Configure expense details
5. Click **Save**

### Configuration Options

| Field | Options | Description |
|-------|---------|-------------|
| **Recurrence** | One-time, Recurring | Single occurrence vs ongoing |
| **Expense Status** | Active, Ended, Active with End Date | Lifecycle state |
| **Expense Label** | Free text | Descriptive name |
| **Category** | Dropdown (not enumerated) | Expense categorization |
| **Expense Amount** | Currency value | Cost amount |
| **Payment Date** | Date picker | When the expense occurs |

### Status Lifecycle

```
Active ──→ (continues indefinitely)
Active with End Date ──→ (auto-transitions to Ended at expiration)
Ended ──→ (no longer active, historical record)
```

### Expense Scope
Custom fulfillment expenses are categorized under the Fulfillment cost bucket in profit calculations. They appear in:
- The Fulfillment line item in the P&L report
- The Fulfillment KPI card on the dashboard
- The expense breakdown donut chart

### Related Expense Types
BeProfit's custom expense system extends beyond fulfillment:
- Variable expenses (percentage-based)
- Operational expenses (fixed overhead)
- Product expenses (per-product costs)
- Marketing expenses (ad-related)
- Workspace expenses (cross-store costs)

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Fulfillment settings page | Settings section | Settings → Costs → Fulfillment | Central hub for all shipping config |
| Create Fulfillment Rule button | CTA button | Fulfillment settings | Opens profile creation wizard |
| Primary variable selector | Dropdown | Profile creation Step 1 | Weight / Price / Quantity / Carrier / Other |
| Rate tier table | Editable table | Profile creation Step 2 | Columns per tier, rows per country |
| Add rate button | Action button | Rate configuration | Creates new rate tier column |
| Refinement condition area | Form section | Profile creation | "Add refinement condition" link |
| Product scope toggle | Radio buttons | Profile creation | All Products / Specific Products |
| Date range selector | Date picker | Profile finalization | Effective date range |
| Manage Integration button | Action button | Fulfillment settings | Opens platform connection list |
| Platform connect buttons | Action buttons | Integration management | Per-platform "Connect" buttons |
| Shipping Cost hover tooltip | Tooltip | Orders page | Shows applied profile name |
| Net Shipping hover tooltip | Tooltip | Orders page | Shows revenue vs cost comparison |
| +Custom Expense button | CTA button | Fulfillment settings | Opens custom expense form |
| Expense status selector | Dropdown | Custom expense form | Active / Ended / Active with End Date |
| Recurrence selector | Radio/dropdown | Custom expense form | One-time / Recurring |
| Shipping zone creator | Form section | Legacy profile | "Create Shipping Zone" button |
| Rate + handling fields | Input fields | Tiered rates | Rate Name, Shipping Rate, Handling Rate, Min/Max items |

---

## Data Model Implications

### Fulfillment Profile Configuration
1. **Profile entity** — name, type (current/legacy/dynamic), product scope, date range, active flag
2. **Primary variable** — enum (price, weight, quantity, carrier, custom)
3. **Rate tiers** — array of {name, min, max, rates per country}
4. **Refinement conditions** — array of {field, operator, value}
5. **Geographic matrix** — rate × country combinations
6. **Cost fields** — shipping rate + handling rate + duties rate per cell

### Order-Level Shipping Data
1. **Shipping revenue** — customer-paid amount (from platform)
2. **Shipping cost (estimated)** — calculated from fulfillment profile
3. **Shipping cost (actual)** — synced from fulfillment platform integration
4. **Net shipping** — revenue minus cost
5. **Applied profile** — reference to which profile generated the estimate
6. **Tax/VAT** — embedded in shipping revenue, no separate tracking

### Cost Priority Resolution
When multiple cost sources exist for the same order:
```
Fulfillment Platform Integration (actual) > Fulfillment Profile (estimated) > $0 (unconfigured)
```
(Inferred priority — not explicitly documented)

---

## Limitations & Gaps

1. **No estimated vs actual cost variance reporting.** When both profile estimates and platform actuals exist, there's no documented report showing the difference. Merchants can't easily calibrate their profiles against real costs.

2. **Dynamic Fulfillment Rules poorly documented.** The most flexible cost configuration option has the thinnest documentation — no condition types, operators, or examples provided.

3. **No direct carrier integrations.** Only fulfillment management platforms (ShipStation, etc.) are supported. No FedEx, UPS, USPS, or DHL API integrations for real-time rates or actual cost syncing.

4. **No shipping cost breakdown for tax/VAT.** "BeProfit does not offer a breakdown of your shipping costs, separating them into shipping and tax amounts."

5. **Quantity-based tiered rates require legacy activation.** This useful feature is locked behind a support request to enable the legacy fulfillment system.

6. **No dedicated shipping analytics page.** Shipping data is spread across Orders (per-order), Dashboard (aggregate KPI), and P&L (line item) with no consolidated shipping analytics view.

7. **Profile vs integration priority undocumented.** When both estimated and actual costs apply, which takes precedence is not specified.

8. **No historical backfill from integrations.** Whether connecting a fulfillment platform imports historical data or only captures forward data is not documented.

9. **No shipping method utilization analytics.** There's no view showing which shipping methods customers choose most, or which methods are most/least profitable.

10. **Zone/country configuration is manual.** Geographic shipping zones require manual country selection with no bulk import, template zones, or auto-detection based on order history.

---

## Relevance to Our Build

1. **Build estimated vs actual cost reconciliation.** The biggest gap in BeProfit's shipping tracking is the lack of variance reporting. We should show: "Estimated: $1,200 | Actual: $1,450 | Variance: -$250 (17% underestimated)." This helps merchants calibrate their profiles and identify cost leakage.

2. **Create a dedicated Shipping Analytics page.** BeProfit distributes shipping data across multiple views. A consolidated shipping analytics page with cost trends, carrier breakdown, zone analysis, and net shipping margins would be a strong differentiator.

3. **Add direct carrier API integrations.** Supporting FedEx, UPS, USPS, and DHL APIs for real-time rate quotes and actual cost syncing would cover merchants who ship directly without a fulfillment platform. This is a clear competitive gap.

4. **Implement automatic tax/VAT separation.** BeProfit can't separate shipping tax from shipping cost. We should auto-detect and split these for markets where tax-exclusive reporting is required (EU, UK, Australia).

5. **Make dynamic rules self-service with good UX.** BeProfit's dynamic fulfillment rules are powerful but poorly documented, suggesting the UX is also complex. Build a visual rule builder with clear condition types, drag-and-drop priority, and preview/test capabilities.

6. **Don't require support team activation for features.** BeProfit gates quantity-based tiered rates behind support team activation. All shipping configuration features should be self-service from launch.

7. **Add shipping method analytics.** Show which methods customers choose, which are most profitable, and where there's opportunity to steer customers toward more profitable shipping options (e.g., if free shipping costs more than it retains in revenue).

8. **Net Shipping should be a first-class metric.** The revenue vs cost gap for shipping is immediately actionable — merchants can adjust shipping pricing, negotiate carrier rates, or change packaging. Surface this prominently on dashboards and in product-level views.

9. **Template shipping zones for common markets.** Instead of requiring manual country selection for each zone, offer pre-built zone templates: "North America", "EU28", "APAC", "UK + Ireland", etc. that merchants can one-click apply.

10. **Historical backfill from integrations should be explicit.** When a merchant connects ShipStation or ShipBob, clearly communicate whether historical data will be imported and from what date. This sets expectations and avoids cost gaps.
