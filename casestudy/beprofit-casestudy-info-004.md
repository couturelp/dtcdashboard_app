# BeProfit Store Connection & Initial Data Sync

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/connecting-navigating-multiple-shops-and-platforms-in-beprofit-beprofit-help-center
  - https://help.runviably.com/beprofit/what-are-sales-channels
  - https://help.runviably.com/beprofit/manage-multi-shops-in-one-or-few-workspaces-beprofit-help-center
  - https://help.runviably.com/beprofit/multi-currencies-beprofit-help-center
  - https://help.runviably.com/beprofit/connect-fulfillment-platforms-beprofit-help-center
  - https://help.runviably.com/beprofit/why-is-my-data-not-accurate
  - https://help.runviably.com/beprofit/understanding-amazon-fees-in-beprofit
  - https://help.runviably.com/beprofit/beprofit-faq (supported platforms and sync details)
  - https://beprofit.co/register/ (platform connection during signup)
- **Category:** Store Connection / Data Sync
- **Date Captured:** 2026-02-12

---

## Supported E-Commerce Platforms

| Platform | Connection Method | Connection Fields Required | Notes |
|----------|------------------|---------------------------|-------|
| Shopify | OAuth / API | Store URL (`.myshopify.com` format) | Primary platform; deepest integration |
| Amazon | API | Store name, Storefront URL, Amazon Marketplace (dropdown), Timezone | Fee data delayed by weeks due to Amazon settlement schedule |
| WooCommerce | API | Store URL, Store name, Owner name, Store email, Timezone | Requires more manual setup than Shopify |
| Wix | API | (Fields not fully documented) | Least documented of the four platforms |

**Total platforms supported: 4** — Shopify, Amazon, WooCommerce, Wix.

---

## Connection Process

### First Store: Connected During Signup

The initial store connection happens as part of the registration flow (Steps 7-9 of signup):

1. Select e-commerce platform(s) — checkboxes for Shopify, WooCommerce, Amazon, Wix (can select multiple)
2. Enter platform-specific connection details (see table above)
3. Authenticate via OAuth (Shopify) or API credentials
4. Connection established; data sync begins automatically

### Additional Stores: Connected via Settings

To connect additional stores after initial setup:

1. Navigate to **Settings → Workspace**
2. Click **"+ Add Shop"** button
3. Follow the platform-specific instructions that appear in the onboarding flow
4. Once connected, the new shop appears in the dropdown menu at the top-right of the application

### Switching Between Connected Stores
1. Click your shop's name in the top-left corner to access the dropdown
2. Hover over shop names to reveal navigation arrows
3. Click the arrow to switch to a specific shop's dashboard

### Aggregated Performance Across Stores
- Check the checkbox next to shop names to view combined performance metrics across selected stores
- Allows consolidated reporting across multiple operations

---

## Data Sync Details

### What Data Is Pulled

Based on documentation across multiple articles, BeProfit syncs the following data from connected stores:

| Data Type | Source | Sync Method | Notes |
|-----------|--------|-------------|-------|
| Orders | E-commerce platform | Automatic via API/webhooks | Historical and ongoing orders |
| Products | E-commerce platform | Automatic | Product catalog, variants, SKUs |
| Sales Channels | E-commerce platform | Automatic | "Various platforms where merchants can sell" — online store, social media, marketplaces, third-party integrations |
| Store name & URL | E-commerce platform | Webhooks (real-time) | Auto-updates when changed on platform |
| Revenue data | E-commerce platform | Automatic | Gross sales, refunds, discounts |
| Tax data | E-commerce platform | From order data | "Taxes: Pulled from order data" (per FAQ) |
| Processing fees (Shopify) | Shopify | Automatic | PayPal and Shopify processing fees auto-detected |
| Amazon fees | Amazon | Automatic (delayed) | FBA fees, storage, commission, shipping chargebacks — delayed by weeks until Amazon settlement |
| Fulfillment costs | Fulfillment platforms | Automatic (if connected) | Matched by order ID or tracking code |

### What Is NOT Auto-Synced (Requires Manual Setup)
- COGS / product costs (unless using Shopify COGS sync or CJ Dropshipping integration)
- Shipping cost profiles / fulfillment rules
- Custom operational expenses (rent, payroll)
- Ad spend data (requires separate ad platform connections)
- UTM attribution data (requires UTM setup, Shopify only)

### Sync Duration Expectations

**No specific sync duration is documented** in the Help Center. Key observations:

- **Shopify:** Appears to be the fastest; uses webhooks for real-time updates. Historical data pulled via API on initial connection.
- **Amazon:** Explicitly documented as slow: "data becomes available only after orders are fully settled in Amazon's system, which can take several weeks after placement and fulfillment." Users advised to manually input estimated fees while waiting.
- **WooCommerce:** No specific timing documented.
- **Wix:** No specific timing documented.

The Help Center article about data accuracy states: "BeProfit integrates into your store and pulls your stores data" but provides no timeline for initial sync completion.

### Data Freshness & Real-Time Updates
- Dashboard shows a **cloud icon** indicating sync status
- Hovering over the cloud icon shows last refresh timestamp and data source
- A syncing indicator appears during active data refresh
- Webhooks used for real-time monitoring of store data changes (name, URL, etc.)

---

## Fulfillment Platform Integrations (Separate from E-Commerce)

In addition to the 4 core e-commerce platform connections, BeProfit supports connections to fulfillment/shipping platforms for cost tracking:

### Supported Fulfillment Platforms (10)
1. Shopify Shipping Labels
2. ShipStation
3. Shiphero
4. Shipmondo
5. Shopify Fulfillment Network
6. Shippo
7. Shipping Easy
8. Easyship
9. AfterShip
10. ShipBob

### Fulfillment Connection Process
1. Navigate to **Settings → Costs → Fulfillment**
2. Select **"Manage Integration"**
3. Choose desired platforms and proceed
4. Click **"Connect"** next to each service to establish connections

### How Fulfillment Data Syncs
- Costs matched to orders by **order ID or tracking code**
- Multi-platform support: authenticate once per platform, costs auto-apply to corresponding orders
- Integration provides real-time reporting of shipping and fulfillment expenses

---

## Multi-Store Support

### How Multi-Store Works
- Users can connect multiple e-commerce stores to one BeProfit account
- Each store has its own dashboard with independent settings
- Stores appear in a dropdown selector for switching between them
- Aggregated views are available by checking store checkboxes

### Workspace Architecture
- Stores are organized into **workspaces**
- Each workspace has:
  - A name (modifiable via Settings → Workspace)
  - A workspace currency (for aggregated views)
  - Teammates with per-shop access levels
- Workspace owner receives workspace-related email notifications

### Plan Restrictions for Multi-Store
- **Plus Plan:** Multiple shops within one subscription
- **Other plans (Basic/Pro/Ultimate):** Separate subscription required per shop
- Cross-workspace management available via "Manage Multi shops in one or few Workspaces"

### Workspace Currency for Aggregation
- When aggregating data across shops with different currencies, all data converts to workspace currency
- Multi-shop dashboard automatically converts to **USD** by default
- "The total row will always be displayed in USD" when comparing shops with different currencies
- Users can toggle between original currencies or USD conversion in cross-shop comparisons

---

## Multi-Currency Support

### How Currency Handling Works
- BeProfit shows data in the **shop's native currency** for individual shop views
- "BeProfit can only show your data in the shop's currency" (per FAQ)
- For WooCommerce, currency can be adjusted via WooCommerce → Settings → General
- Individual shop currency settings: Settings → Shop → General Settings

### Multi-Currency Scenarios

| Scenario | Currency Behavior |
|----------|------------------|
| Single shop view | Shop's native currency only |
| Multi-shop aggregated view | Auto-converts all to USD |
| Ad spend (different currency from shop) | Displayed in shop's currency; original visible on hover |
| Custom expenses in foreign currency | Converts to shop currency for display |
| Cross-shop comparison | Toggle between original currencies or USD |
| Workspace aggregation total row | Always USD |

---

## Manual Steps Required After Sync

After connecting a store and completing initial data sync, users need to:

1. **Set up COGS/product costs** — Not auto-synced for most users; required for accurate profit calculations
2. **Configure shipping cost profiles** — Define fulfillment costs if not using integrated shipping platforms
3. **Set processing fees** — Non-Shopify stores need manual fee configuration; Shopify auto-detects some fees
4. **Add operational expenses** — Rent, payroll, and other fixed costs
5. **Connect ad platforms** — Separate step from store connection (Facebook, Google, TikTok ads)
6. **Set up UTM attribution** — Shopify only; for marketing channel tracking
7. **Adjust timezone** — If data appears at wrong times
8. **Configure calculation preferences** — Advanced settings for how profit is computed

---

## Limitations & Caveats

1. **Only 4 e-commerce platforms supported:** Shopify, Amazon, WooCommerce, Wix. No eBay, BigCommerce, Magento, etc.
2. **Amazon fee data significantly delayed:** Takes weeks after order fulfillment for fee data to appear. Workaround: manually input estimated fees.
3. **No documented sync duration:** The Help Center does not specify how long initial data sync takes for any platform.
4. **Currency display locked to shop currency:** Cannot view individual shop data in a different currency (only USD aggregation across shops).
5. **Data accuracy blamed on store setup:** When data is inaccurate, Help Center says "We recommend checking your store first before anything else" — suggesting data quality issues are often on the store side.
6. **Sales channels determined by store configuration:** BeProfit pulls sales channel data from the store; it doesn't define its own channels.
7. **ShipStation currency changes require support:** Currency changes for ShipStation integration require contacting support@beprofit.co.
8. **Multi-shop total always in USD:** Cannot change the currency used for multi-shop totals.

---

## Plan/Tier Feature Gating

| Feature | Basic/Pro/Ultimate | Plus |
|---------|-------------------|------|
| Connect e-commerce store | Yes | Yes |
| Multi-shop in one subscription | No (separate sub per shop) | Yes |
| Fulfillment platform integrations | Yes | Yes |
| Cross-shop aggregated view | Yes (with separate subs) | Yes |
| Workspace management | Yes | Yes |

---

## Related Articles

- Connecting & Navigating Multiple Shops and Platforms — https://help.runviably.com/beprofit/connecting-navigating-multiple-shops-and-platforms-in-beprofit-beprofit-help-center
- Multi-currencies — https://help.runviably.com/beprofit/multi-currencies-beprofit-help-center
- Manage Multi shops in one or few Workspaces — https://help.runviably.com/beprofit/manage-multi-shops-in-one-or-few-workspaces-beprofit-help-center
- What are Sales Channels? — https://help.runviably.com/beprofit/what-are-sales-channels
- Connect Fulfillment Platforms — https://help.runviably.com/beprofit/connect-fulfillment-platforms-beprofit-help-center
- Understanding Amazon Fees in BeProfit — https://help.runviably.com/beprofit/understanding-amazon-fees-in-beprofit
- Why is my data inaccurate within BeProfit? — https://help.runviably.com/beprofit/why-is-my-data-not-accurate

---

## Relevance to Our Build

### Integration Architecture Takeaways

1. **Shopify is the priority platform:** BeProfit's deepest integration is with Shopify — auto-detected fees, OAuth, webhooks, COGS sync, UTM attribution (Shopify-only). We should prioritize Shopify integration similarly but aim for parity across platforms faster than BeProfit has achieved.

2. **Amazon integration is inherently slow:** Amazon's settlement-based fee data creates a weeks-long delay that's a platform limitation, not a BeProfit bug. We'll face the same constraint. Our UX should handle "pending fee data" states gracefully with estimated costs and clear communication about when real data will appear.

3. **Fulfillment platform support is a differentiator:** BeProfit supports 10 shipping/fulfillment platforms (ShipStation, ShipBob, Easyship, etc.). This is more than the 4 e-commerce platforms and suggests fulfillment cost tracking is a key value-add. We should decide which fulfillment platforms to support at launch.

4. **Workspace architecture for multi-store:** The workspace concept (group stores, assign team members per store, aggregate views) is well-designed. We should adopt a similar architecture. The automatic USD conversion for aggregation is pragmatic but limiting — we could differentiate by supporting user-selected aggregation currencies.

5. **No sync duration transparency:** BeProfit doesn't tell users how long initial sync takes, which likely creates anxiety. We should provide estimated sync times and progress indicators during initial data import.

6. **Order ID / tracking code matching for fulfillment:** This matching logic is straightforward and effective. We should use the same approach for connecting fulfillment platform costs to orders.

7. **Platform expansion opportunity:** No eBay, BigCommerce, Magento, Etsy, or Square support. Supporting these platforms would immediately differentiate us from BeProfit.

8. **Webhook-based real-time updates:** Using webhooks for store data changes (name, URL) is a good pattern. We should use webhooks extensively for order and product updates to minimize sync latency.
