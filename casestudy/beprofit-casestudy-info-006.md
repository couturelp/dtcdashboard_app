# BeProfit Shipping Cost Setup

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/fulfillment-shipping-handling (Fulfillment category page)
  - https://help.runviably.com/beprofit/fulfillment-profiles-in-beprofit-beprofit-help-center (Fulfillment profiles overview)
  - https://help.runviably.com/beprofit/create-fulfillment-profile-beprofit-help-center (Create Fulfillment Profile)
  - https://help.runviably.com/beprofit/create-a-shipping-profile-legacy-beprofit-help-center (Legacy shipping profile)
  - https://help.runviably.com/beprofit/dynamic-fulfillment-rules (Dynamic fulfillment rules)
  - https://help.runviably.com/beprofit/setting-up-order-item-quantity-based-tiered-rates (Tiered rates)
  - https://help.runviably.com/beprofit/is-tax/vat-included-in-shipping-costs-beprofit-help-center (Tax in shipping costs)
  - https://help.runviably.com/beprofit/connect-fulfillment-platforms-beprofit-help-center (Connect fulfillment platforms)
  - https://help.runviably.com/beprofit/custom-fulfillment-expenses-beprofit-help-center (Custom fulfillment expenses)
  - https://beprofit.co/ (marketing site — shipping feature positioning)
- **Category:** Fulfillment / Shipping & Handling / Cost Management
- **Date Captured:** 2026-02-12

---

## Shipping Cost Overview

BeProfit treats shipping costs under the umbrella term "Fulfillment" — encompassing shipping, handling, duties, and related logistics costs. The system provides multiple methods for tracking these costs, ranging from manual profile-based estimation to automatic syncing from integrated fulfillment platforms.

The core concept is the **Fulfillment Profile** — a rule-based configuration that calculates shipping and handling costs dynamically based on variables like destination country, order weight, item quantity, order price, and shipping carrier.

BeProfit's marketing site describes the shipping analytics value as: "Unlock the impact of shipping methods on LTV, AOV, repurchase rates, and overall profitability." Shipping is positioned as one of several expense categories that merchants can analyze to "learn how fees such as shipping, fulfillment, discounts, and other expenses impact profitability, then optimize them."

---

## Shipping Cost Configuration Options

### Method 1: Fulfillment Profiles (Current System)

Fulfillment profiles are the primary method for configuring shipping costs. They calculate costs dynamically based on multiple variables.

**What it is:** A rule-based configuration that automatically calculates fulfillment costs per order based on configurable variables — destination country, weight, item quantity, order price, and more.

**Purpose:** "The role of fulfillment profiles within the BeProfit app is to assist in calculating your fulfillment costs, representing what you as a merchant, pay for fulfillment services."

**Step-by-step creation process:**

1. Navigate to **Settings → Costs → Fulfillment**
2. Click **"Create Fulfillment Rule"**
3. Select the **primary variable** that determines fulfillment expenses (e.g., weight, quantity, price)
4. Configure **rate tiers** — "Add rates, each added rate will create a new column in the table below"
5. Optionally include additional cost fields: **Handling** or **Duties** expenses
6. Specify **geographic pricing** — select countries and enter costs for each rate and country
7. Enter **Profile name** and select the **date range** for when changes take effect
8. Click **Save**

**Available primary variables for cost calculation:**
- Order price (total order value)
- Package weight
- Item quantity
- Shipping carrier
- Custom conditions (via Dynamic Fulfillment Rules)

**Refinement conditions:** Profiles support secondary conditions alongside the primary variable. For example, weight-based pricing can be limited to orders shipped via a specific carrier (e.g., "DHL"):
1. Click **"Add refinement condition"**
2. Select the refinement type (e.g., "Shipping Carrier") and choose the appropriate operator

**Profile scope options:**
- **All Products** — applies to entire catalog
- **Specific Products** — applies only to selected products

**Important:** If specific products are selected, separate profiles must be created for non-selected products to ensure all products have shipping costs applied.

---

### Method 2: Legacy Shipping Profiles

An older fulfillment profile system that uses a zone-based approach with shipping methods.

**Step-by-step creation process:**

1. Navigate to **Settings → Costs → Fulfillment** and select the **Dynamic** option
2. Click **"Create Profile"**
3. Enter a descriptive **profile name**
4. Define **product scope** — "All Products" or "Specific Products"
5. Click **"Create shipping zone"** and select applicable countries (multiple zones per profile)
6. Configure **shipping rates** — fixed or variable
7. **Save** and select the **date range** for changes to take effect

**Rate configuration tip:** "If you use shipping methods, a base rate of $0 and enter the full rate in each of the methods under 'additional rate'"

**Legacy feature access:** "The legacy fulfillment feature must be enabled by our team to set up order item quantity-based tiered rates." Contact support if this feature isn't active.

---

### Method 3: Dynamic Fulfillment Rules

An advanced configuration that allows multi-variable cost calculations using a conditions-based interface.

**What it is:** "Dynamic Fulfillment Rules allows users to set up a fulfillment profile that calculates shipping and handling costs dynamically, considering factors like countries, weight, quantity, and more."

**Step-by-step creation:**

1. Navigate to workspace settings → **Costs → Fulfillment**
2. Click **"Create Fulfillment Rule"**
3. Choose **"Other"** from available fulfillment profile templates for full customization
4. Configure the **Dynamic Fulfillment Profile** using the conditions interface
5. Establish multiple criteria and attributes that extract appropriate data from your business operations

**Benefits:** "Shipping and fulfillment costs align with different factors, providing flexibility for businesses managing international or platform-specific orders."

---

### Method 4: Order Item Quantity-Based Tiered Rates

A specific configuration within the legacy system for volume-based shipping cost tiers.

**Step-by-step setup:**

1. Navigate to **Settings → Costs → Fulfillment Settings**
2. Enter a **Fulfillment Profile Name**
3. Choose **"All Products"** or **"Specific Products"**
4. Click **"Create Shipping Zone"** for rate definitions
5. Assign a **zone name**
6. Select **"Worldwide"** or **"Specific countries/regions"**
7. Select **"Order items quantity-based tiered rates"**
8. For each tier, configure:
   - **Rate Name** (descriptive label)
   - **Shipping Rate** (cost value)
   - **Handling Rate** (additional handling cost)
   - **Minimum item quantity** (lower bound for tier)
   - **Maximum item quantity** (upper bound for tier)
9. Click **"Add another rate"** to create additional tiers
10. Click **Save**

**Requirement:** This feature requires the legacy fulfillment system to be enabled by the BeProfit support team.

---

### Method 5: Fulfillment Platform Integration (Actual Cost Tracking)

Connects to third-party shipping/fulfillment platforms to automatically sync actual shipping costs.

**Supported fulfillment platforms (10):**

| # | Platform | Connection Method | Data Synced | Notes |
|---|----------|------------------|-------------|-------|
| 1 | Shopify Shipping Labels | Native integration | Shipping label costs | Auto-connected for Shopify stores |
| 2 | ShipStation | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |
| 3 | Shiphero | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |
| 4 | Shipmondo | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |
| 5 | Shopify Fulfillment Network | Native integration | Fulfillment costs | Shopify-specific |
| 6 | Shippo | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |
| 7 | Shipping Easy | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |
| 8 | Easyship | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |
| 9 | AfterShip | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |
| 10 | ShipBob | API/OAuth | Fulfillment costs per order | Matched by order ID or tracking code |

**Connection process:**

1. Navigate to **Settings → Costs → Fulfillment**
2. Select **"Manage Integration"**
3. Choose desired platforms and proceed
4. Click **"Connect"** next to each service to authorize

**Cost matching:** The system uses either **order ID** or **tracking codes** to align costs with orders automatically.

**Multi-platform support:** Users managing multiple fulfillment services authenticate once per platform. After initial login, fulfillment expenses automatically connect to corresponding orders without manual intervention.

---

### Method 6: Custom Fulfillment Expenses

For indirect fulfillment costs that don't fit into profile-based or integration-based tracking (e.g., warehouse rent, packaging supplies, labor).

**Definition:** "Indirect costs associated with fulfilling customer orders and delivering products" including order processing, inventory management, packaging, and related activities.

**Step-by-step process:**

1. Navigate to **Settings → Costs → Fulfillment**
2. Scroll to **"Add Custom or Variable Expenses"** area
3. Click **"+Custom Expense"** button
4. Choose the **Recurrence** type:
   - One-time expense
   - Recurring expense
5. Select **Expense Status**:
   - **Active** — ongoing expense
   - **Ended** — previously active but now completed
   - **Active with End Date** — currently active with predefined expiration
6. Complete required fields:
   - **Expense Label** (descriptive name)
   - **Category** (expense category)
   - **Expense Amount** (cost value)
   - **Payment Date** (when the expense occurs)
7. Click **Save**

---

## Estimation vs Actual Cost Tracking

BeProfit supports both estimated and actual shipping cost tracking:

| Approach | Method | When to Use | Accuracy |
|----------|--------|-------------|----------|
| **Estimated (profile-based)** | Fulfillment Profiles (Methods 1-4) | When actual costs are unavailable or inconsistent | Approximate — based on rules and averages |
| **Actual (integration-based)** | Fulfillment Platform Integration (Method 5) | When using supported shipping platforms | Precise — real costs per order synced automatically |
| **Hybrid** | Both profiles + integrations | When some orders use integrated platforms, others don't | Mixed — actual where available, estimated where not |

**Default behavior:** There is no documented "default" shipping cost method. Users must explicitly configure either profiles or integrations. Without any configuration, shipping costs are $0 in profit calculations.

**Priority between methods:** When both a fulfillment profile and a platform integration apply to the same order, the documentation does not explicitly state which takes priority. Based on the system's design, integration data (actual costs) likely overrides profile estimates, but this is not confirmed.

---

## How Shipping Costs Factor Into Profit Calculations

### Profit Formula Position

Shipping costs are deducted from revenue as a separate expense line in BeProfit's profit calculation:

```
Net Profit = Revenue - COGS - Shipping/Fulfillment - Ad Spend - Processing Fees - Taxes - Custom Expenses
```

### Order-Level vs Aggregate Impact

- **Order-level:** Fulfillment costs are applied to individual orders and visible on the Orders page
- **Aggregate:** Shipping costs roll up into the Profit Dashboard as a total fulfillment expense line item
- **Reviewing per-order costs:**
  1. Navigate to the **Orders** page
  2. Locate the specific order
  3. Hover over the **Shipping Cost** amount to view the applied profile name
  4. Hover over the **Net Shipping** amount to compare customer-charged shipping vs actual merchant fulfillment costs

### Net Shipping Metric

BeProfit distinguishes between:
- **Shipping Revenue** — what the customer paid for shipping
- **Shipping Cost** — what the merchant actually paid for fulfillment
- **Net Shipping** — the difference (can be positive if customer pays more, negative if merchant absorbs costs)

### Tax/VAT in Shipping Costs

- Shipping prices charged to customers are automatically pulled from the store and already incorporate tax/VAT
- To view shipping tax on individual orders: navigate to the **Orders** page and hover over the **Tax** column
- **Limitation:** "BeProfit does not offer a breakdown of your shipping costs, separating them into shipping and tax amounts"
- **Manual adjustment:** If merchants bear the tax/VAT cost (rather than passing to customer), they can add the tax amount to the Shipping Rate field in their fulfillment profile:
  1. Go to **Settings → Costs → Fulfillment**
  2. Edit existing shipping profile
  3. Add tax amount to the **Shipping Rate** field value
  4. Click **Done**

---

## Configuration Options & Defaults

| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| Fulfillment cost method | None (must configure) | Profiles, Integrations, Custom Expenses | No default — $0 shipping cost if unconfigured |
| Profile scope | N/A | All Products, Specific Products | Must choose during profile creation |
| Profile primary variable | N/A | Price, Weight, Quantity, Carrier, Custom | Select one primary variable |
| Refinement conditions | None | Carrier, Country, and more | Optional secondary filters |
| Geographic zones | N/A | Worldwide, Specific countries/regions | Define per-profile |
| Rate structure | N/A | Fixed, Tiered (quantity-based), Price-based | Select during profile setup |
| Date range | Current date forward | Custom start/end dates | Controls when profile is active |
| Custom expense recurrence | N/A | One-time, Recurring | Select during expense creation |
| Custom expense status | Active | Active, Ended, Active with End Date | Controls expense lifecycle |
| Tax/VAT in shipping | Included in customer-facing price | Manual adjustment via rate field | No automatic separation |

---

## Limitations & Caveats

1. **No default shipping cost:** Without explicit configuration, shipping costs are $0, silently inflating profit. Unlike COGS (which has Shopify auto-sync), there is no automatic shipping cost detection.
2. **No shipping cost breakdown for tax/VAT:** "BeProfit does not offer a breakdown of your shipping costs, separating them into shipping and tax amounts." Users must manually combine or separate these.
3. **Legacy features require support activation:** Order item quantity-based tiered rates require the legacy fulfillment system to be enabled by the BeProfit team — not self-service.
4. **Profile vs integration priority unclear:** When both a fulfillment profile and a platform integration apply to the same order, the override behavior is not documented.
5. **Only 10 fulfillment platforms supported:** No integration with DHL, FedEx, UPS, USPS, or other carrier-direct APIs. Only third-party fulfillment management platforms are supported.
6. **No real-time carrier rate lookups:** BeProfit does not query carrier APIs for real-time rates. All estimated costs are based on user-configured profiles.
7. **Specific product profiles require complementary profiles:** If a profile is set for specific products, non-selected products won't have shipping costs applied unless a separate profile exists for them.
8. **ShipStation currency changes require support contact:** Currency changes for ShipStation integration require contacting support@beprofit.co (documented in file 004).
9. **Custom fulfillment expenses are manual only:** No auto-detection or estimation of indirect fulfillment costs — warehouse rent, packaging, etc. must be manually entered.
10. **No historical backfill from integrations:** Documentation does not mention whether connecting a fulfillment platform imports historical shipping cost data or only captures costs from the connection date forward.

---

## Plan/Tier Feature Gating

| Feature | All Plans | Plus Only | Notes |
|---------|-----------|-----------|-------|
| Fulfillment profiles (current) | Yes | Yes | Available to all plans |
| Legacy shipping profiles | Yes | Yes | Requires support activation |
| Dynamic fulfillment rules | Yes | Yes | Available to all plans |
| Tiered rates | Yes | Yes | Requires legacy activation |
| Fulfillment platform integrations (10) | Yes | Yes | Available to all plans |
| Custom fulfillment expenses | Yes | Yes | Available to all plans |

**Note:** Shipping/fulfillment features do not appear to be plan-gated. All fulfillment configuration methods are available across all plan tiers. This aligns with BeProfit's approach to COGS (also not plan-gated) — cost input methods are universal, while analytics and reporting features are differentiated by plan.

---

## Related Articles

- Fulfillment profiles in BeProfit — https://help.runviably.com/beprofit/fulfillment-profiles-in-beprofit-beprofit-help-center
- Create Fulfillment Profile — https://help.runviably.com/beprofit/create-fulfillment-profile-beprofit-help-center
- Create a shipping profile (Legacy) — https://help.runviably.com/beprofit/create-a-shipping-profile-legacy-beprofit-help-center
- Dynamic Fulfillment Rules — https://help.runviably.com/beprofit/dynamic-fulfillment-rules
- Setting Up Order Item Quantity-Based Tiered Rates — https://help.runviably.com/beprofit/setting-up-order-item-quantity-based-tiered-rates
- Is tax/VAT included in shipping costs? — https://help.runviably.com/beprofit/is-tax/vat-included-in-shipping-costs-beprofit-help-center
- Connect Fulfillment Platforms — https://help.runviably.com/beprofit/connect-fulfillment-platforms-beprofit-help-center
- Custom Fulfillment Expenses — https://help.runviably.com/beprofit/custom-fulfillment-expenses-beprofit-help-center
- Variable and Custom Expense — https://help.runviably.com/beprofit/variable-expense-beprofit-help-center
- Custom Operational Expenses — https://help.runviably.com/beprofit/custom-operational-expenses-beprofit-help-center
- Compare BeProfit data to Shopify — https://help.runviably.com/beprofit/compare-beprofit-data-to-shopify-beprofit-help-center

---

## Relevance to Our Build

### Shipping Cost Architecture Takeaways

1. **Fulfillment profile concept is well-designed:** The multi-variable, rule-based approach to shipping cost estimation covers common scenarios (weight-based, quantity-based, zone-based, price-based). We should adopt a similar profile system but with clearer UX — BeProfit's documentation suggests the profile creation flow is multi-step and potentially confusing.

2. **Integration-first approach for accuracy:** BeProfit supports 10 fulfillment platforms for actual cost tracking. This is the gold standard for shipping cost accuracy. We should prioritize integrations with the most popular platforms (ShipStation, ShipBob, Easyship) and consider adding direct carrier integrations (FedEx, UPS, USPS, DHL) that BeProfit lacks.

3. **Net Shipping metric is valuable:** The distinction between shipping revenue (customer-paid), shipping cost (merchant-paid), and net shipping (the difference) is a useful analytical dimension. Our product should surface this metric prominently — many merchants unknowingly lose money on shipping.

4. **Tax/VAT shipping breakdown is a gap:** BeProfit cannot separate shipping costs from tax/VAT amounts, requiring manual workarounds. We should support automatic tax separation in shipping costs for markets where this matters (EU, UK, Australia).

5. **No default shipping cost is dangerous:** Like COGS, missing shipping costs silently inflate profits. Our onboarding should prominently warn users that unconfigured shipping costs mean inaccurate profits, and provide estimation defaults or wizards to help users get approximate values quickly.

6. **Legacy vs current system complexity:** The coexistence of legacy and current fulfillment profile systems creates confusion. We should design one unified system from the start, avoiding the need for migration paths or dual systems.

7. **Missing carrier-direct integrations:** BeProfit only integrates with fulfillment management platforms (ShipStation, etc.), not carriers directly (FedEx, UPS, USPS). Supporting carrier APIs for real-time rate lookups could be a significant differentiator, especially for merchants who ship directly without a fulfillment platform.

8. **Custom expenses for indirect costs:** The ability to track warehouse rent, packaging, and labor as custom fulfillment expenses is useful but manual. We could differentiate by estimating some of these costs automatically (e.g., packaging cost per order based on average dimensions).

9. **Geographic zone flexibility:** The zone-based pricing model (worldwide vs specific countries/regions) is essential for international sellers. We should support this from launch and consider adding more granular options (state/province-level, zip code-level).

10. **Shipping as a profit lever:** BeProfit's marketing positions shipping analytics as helping merchants "unlock the impact of shipping methods on LTV, AOV, repurchase rates, and overall profitability." This framing — shipping as an optimization opportunity, not just a cost — should inform how we present shipping data in our dashboard.
