# BeProfit Other Onboarding Configurations

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/edit-tax-settings-beprofit-help-center (Edit Tax Settings)
  - https://help.runviably.com/beprofit/multi-currencies-beprofit-help-center (Multi-Currencies)
  - https://help.runviably.com/beprofit/adding-team-members-to-your-beprofit-account (Adding Team Members)
  - https://help.runviably.com/beprofit/manage-multi-shops-in-one-or-few-workspaces-beprofit-help-center (Multi-Shop Workspaces)
  - https://help.runviably.com/beprofit/change-timezone (Change Timezone)
  - https://help.runviably.com/beprofit/change-store-name-in-beprofit (Change Store Name)
  - https://help.runviably.com/beprofit/changing-your-language-settings-in-beprofit (Language Settings)
  - https://help.runviably.com/beprofit/setting-up-calculation-preferences-beprofit-help-center (Calculation Preferences)
  - https://help.runviably.com/beprofit/whats-affected-by-calculation-preferences-beprofit-help-center (Calculation Preferences Impact)
  - https://help.runviably.com/beprofit/does-beprofit-automatically-apply-transaction-fees-based-on-shopify-plan (Auto Transaction Fees)
  - https://help.runviably.com/beprofit/how-can-i-change-my-processing-fees (Change Processing Fees)
  - https://help.runviably.com/beprofit/daily-profit-emails-in-beprofit (Daily Profit Emails)
  - https://help.runviably.com/beprofit/schedule-reports-beprofit-help-center (Schedule Reports)
  - https://help.runviably.com/beprofit/what-are-sales-channels (Sales Channels)
  - https://help.runviably.com/beprofit/how-can-i-change-my-plan (Change Plan)
  - https://help.runviably.com/beprofit/how-can-i-cancel-my-plan (Cancel Plan)
- **Category:** Settings / Account Configuration / Onboarding
- **Date Captured:** 2026-02-12

---

## Tax Setup

### Tax Configuration in BeProfit

BeProfit does NOT provide a dedicated tax configuration system. Instead, it relies on the connected ecommerce platform (Shopify, WooCommerce, Wix) for tax data.

**How taxes are handled:**
- BeProfit "automatically retrieves total order prices including tax/VAT from your e-commerce platform"
- Tax data flows in from the store — no separate tax setup in BeProfit
- There is no global tax rate configuration within BeProfit itself

**Per-order tax editing:**

1. Navigate to the **Orders** section
2. Click the **three-dot menu** next to an order
3. Select **"Edit order costs"**
4. Modify the **"Tax on shipping"** and **"Tax on goods"** fields
5. Click **Save**

**Critical limitation:** "Editing the taxes on an order on your Orders page will only affect the data for that specific order. To adjust the global tax settings please refer to your e-commerce platform."

### Tax in Profit Calculations

Tax is treated as a deduction from revenue in profit calculations:

```
Net Profit = Revenue - COGS - Shipping - Ad Spend - Processing Fees - Taxes - Custom Expenses
```

Tax is separated into two components at the order level:
- **Tax on goods** — tax applied to the product price
- **Tax on shipping** — tax applied to shipping charges

### Calculation Preferences for Tax-Related Settings

Several calculation preferences affect how tax-related scenarios are handled:

| Preference | Effect |
|-----------|--------|
| Exclude pending orders from revenue | Pending orders (including their tax) excluded from totals |
| Exclude unfulfilled orders from revenue | Unfulfilled orders excluded |
| Exclude canceled orders | Canceled orders removed from all calculations |
| Exclude free ($0) orders | Zero-dollar orders removed |
| Exclude fraud orders | Flagged fraud orders removed |
| Exclude COGS from fully refunded orders | COGS (not tax) removed from fully refunded orders |

---

## Currency Settings

### Default Currency

- BeProfit automatically uses the **store's primary currency** as the default
- For Shopify stores, the primary currency is detected from the Shopify configuration
- No manual currency setup is needed during onboarding

### Multi-Currency Support

**Automatic currency conversion:** BeProfit automatically converts currencies that don't match the store's primary currency. No manual configuration is required.

**Multi-shop aggregation:** When displaying data from multiple stores in one aggregated view, if stores use different currencies, the system automatically converts all data into **USD** as the common denominator.

**Ad spend currencies:**
- Ad platform spending can be configured in currencies different from the store's currency
- The dashboard displays ad spend in the store's currency
- Hovering over marketing section amounts reveals the original currency

**Custom expenses and revenue:**
- Expenses and revenue can be added in any currency
- Select the desired currency when creating an expense entry
- Amounts automatically convert in the dashboard

**Workspace currency:**
- Navigate to **Settings → Workspace** to modify workspace currency
- Convert aggregated shop views to the workspace currency

**Shop-level currency:**
- Navigate to **Settings → Shop → General Settings** for shop-specific currency preferences

### Limitations

- The total row in multi-shop comparisons **always displays in USD** regardless of other currency display selections
- Currency conversion rates are automatic — documentation does not specify whether rates are real-time, daily, or fixed
- No manual exchange rate override is documented

---

## Transaction/Processing Fees

### Automatic Fee Detection (Shopify)

BeProfit automatically detects and applies transaction fees based on the active Shopify plan:

- **Automatic detection:** "BeProfit's 'automatically synced fees' feature detects your Shopify plan and applies the correct transaction fee rates for each order"
- **Plan-specific rates:** Recognizes that "Basic Shopify has higher transaction fees than Standard Shopify" and adjusts accordingly
- **Dynamic updates:** "If you change your Shopify plan, the transaction fees will automatically update accordingly"

**Verification steps:**
1. Navigate to **Settings → Costs → Processing Fees**
2. Verify **"automatically add in the transaction fees"** is enabled at the bottom

### Manual Fee Configuration

For non-Shopify stores or custom fee structures:
1. Navigate to **Settings → Costs tab → Processing Fees**
2. Modify fee percentages or amounts

**Note:** Shopify subscription costs (monthly plan fees) are NOT included in automatic transaction fees. These must be manually configured as operational expenses.

---

## Team Member Management

### Inviting Team Members

**Step-by-step process:**

1. Log into BeProfit and locate **"Invite Team members"** option at the dashboard bottom
2. Enter the prospective user's **name** and **email address**
3. Designate their **role**: Admin or View Only
4. Click **Save** — sends an invitation email with access instructions

### Available Roles

| Role | Dashboard Access | Reports | Settings | Cost Config | Integrations | User Management | Billing |
|------|-----------------|---------|----------|-------------|--------------|-----------------|---------|
| **Admin** | Full access | Full access | Full access | Can modify | Can manage | Can add/remove users | Full access |
| **View Only** | Can view | Can view & export | Cannot modify | Cannot modify | Cannot manage | Cannot manage | Cannot access |

**Admin:** "Full access to all features, settings, and data within your BeProfit account." Can modify settings, manage integrations, add/remove users, adjust cost configurations, and create custom metrics (Plus plan).

**View Only:** "See all dashboard information but cannot make changes to settings or configurations." Can access data, view reports, and export information.

### Managing Existing Users

1. Navigate to **Settings → Workspace**
2. Scroll to the **"Teammates"** section
3. From this interface:
   - Review user details
   - Modify role assignments (switch between Admin and View Only)
   - Remove team members
   - Invite additional collaborators

### Multi-Shop Team Access

When using workspaces with multiple shops:
1. Go to **Settings → Workspace**
2. Select **"Invite new Teammate"**
3. Enter name and email
4. **Set access level for each shop** — can grant different permissions per shop
5. Click **Save**

---

## Workspace & Shop General Settings

### Timezone Configuration

**Step-by-step:**
1. Navigate to **Settings → Shop → General Settings**
2. Locate the **timezone dropdown**
3. Choose preferred timezone

**Impact:** Affects when BeProfit reports data. "You may want to change your timezone due to data coming in at a different time than we report it."

### Store Name

**Automatic:** "If you change your store name on the platforms we support, BeProfit will automatically change its name for you." BeProfit uses webhooks to monitor store data including name and web address.

### Language Settings

**Step-by-step:**
1. Navigate to **Settings → Shop → General Settings**
2. Locate the **Shop Format Setting**
3. Choose preferred language from dropdown
4. Optionally check **"Use default browser settings"** for automatic language detection

**Note:** Documentation does not list which languages are available.

### Date Format

Configurable under **Settings → Shop → General Settings** alongside other regional preferences.

---

## Notification & Alert Setup

### Daily Profit Emails

**What it is:** BeProfit automatically sends daily profit report emails.

**Configuration:**
- Navigate to **Settings → Shop → Notification Management**
- Enable/disable daily profit emails

**21-day inactivity policy:** BeProfit automatically pauses daily emails if the account is unused for 3 weeks. The final report sends exactly 21 days after the most recent login. Logging back in reactivates the emails.

**Limitation:** Limited configuration — can only enable/disable. No documented options for customizing which metrics are included.

### Scheduled Reports

**Preset email reports:**
1. Navigate to **Reports → Templates**
2. Find report in the **Preset Emails** section
3. Click edit icon (three dots) → **Edit**
4. Choose **delivery hour** and **email recipients**
5. Click **Save**

**Custom report scheduling:**
1. Go to **Reports → Custom Reports**
2. Toggle the **Schedule** column to **Yes**
3. Click edit icon → navigate to **Schedule** section
4. Select frequency: **Daily**, **Weekly**, or **Monthly**
5. Set delivery hour
6. Enter email recipients
7. Click **Save**

### Other Notifications

The documentation does not describe:
- In-app notifications or alerts
- Slack or other messaging integrations
- Threshold-based alerts (e.g., "alert me if profit drops below X")
- Push notifications or mobile alerts

The notification system appears limited to email-based reports.

---

## Calculation Preferences

A comprehensive set of toggles that control how BeProfit calculates and reports metrics.

### Available Preferences

| Preference | Description | Default (Implied) |
|-----------|-------------|-------------------|
| Exclude pending orders from revenue | Whether orders awaiting processing count toward revenue | Excluded (except COD) |
| Exclude unfulfilled orders from revenue | Whether unshipped orders count toward revenue | Not documented |
| Exclude canceled orders | Remove canceled transactions from all calculations | Not documented |
| Exclude free ($0) orders | Remove zero-dollar orders from metrics | Not documented |
| Include orders from specific sources | Filter calculations to designated order origins | All sources |
| Include orders from specific sales channels | Restrict metrics to particular sales platforms | All channels |
| Exclude fraud orders | Remove flagged fraudulent transactions | Not documented |
| Exclude unfulfilled orders when refunded | Omit unshipped refunded orders | Not documented |
| Set predicted returns cost | Establish anticipated refund expenses | Off |
| Exclude COGS from fully refunded orders | Remove product costs from fully refunded transactions | Off |
| Allocate shipping costs into products gross profit | Distribute delivery expenses by weight or quantity per order | Not documented |
| Allocate marketing costs into products | Distribute promotional expenses by product price or evenly | Not documented |
| Apply marketing costs (CAC vs CPA) | New-customer-only attribution vs all-order allocation | Not documented |

### What's Affected by Calculation Preferences

**Affected sections:**
- Dashboard and comparison features (shops, countries, channels)
- P&L reports and custom reports
- Discounts and processing gateways reports
- Fulfillment data
- Products page (partial impact)

**Unaffected sections:**
- Orders page
- Marketing analytics
- Cohort analysis

**Special rules:**
- Pending orders are excluded from revenue unless they are Cash On Delivery (COD) transactions
- On the Products page, pending order items don't count as sold
- The Marketing page excludes pending orders from sales figures
- Refunds are always calculated by original order date and display as "refunded"

---

## Sales Channels

**Definition:** "Sales Channels are used to identify the source of an order. They represent the various platforms where merchants can sell their products, including their online store, social media, marketplaces, or through third-party integrations."

**Configuration:** Sales channels are pulled from the ecommerce platform (Shopify). No configuration needed in BeProfit.

**Viewing:** Check which sales channel an order came from via the Shopify Admin → Orders → specific order → "Sales Channel" field.

---

## Plan & Billing Management

### Changing Plans

Documentation exists for changing plans (https://help.runviably.com/beprofit/how-can-i-change-my-plan) but specific steps were not captured in this research session.

### Canceling Plans

Documentation exists for plan cancellation (https://help.runviably.com/beprofit/how-can-i-cancel-my-plan). The Account category has only this one article, suggesting cancellation is the primary account-level action documented.

### Billing History

Per the FAQ category, billing history can be viewed — specific location documented in a separate FAQ article.

---

## Recommended Next Steps After Setup

### What BeProfit Suggests

The Help Center documentation does **not** contain a dedicated "recommended next steps" or "what to do after setup" article. There is no documented checklist, wizard, or guided tour that walks users through post-setup actions.

**Inferred recommended sequence** (based on documentation organization and Getting Started category structure):

1. **Connect store** — required first step (documented in file 004)
2. **Set up COGS** — products need costs for profit accuracy (documented in file 005)
3. **Configure shipping costs** — fulfillment profiles or platform integrations (documented in file 006)
4. **Connect ad platforms** — for marketing cost tracking (documented in file 007)
5. **Review calculation preferences** — customize how metrics are calculated
6. **Invite team members** — share access with colleagues
7. **Explore the dashboard** — start analyzing profit data
8. **Set up scheduled reports** — automate reporting

### Getting Started Category Cross-References

The Getting Started category acts as a hub linking to other feature categories rather than providing a linear onboarding guide. It references:
- Customer Lifetime Value
- Marketing Analytics
- Products
- Fulfillment / Shipping & Handling
- Profit Dashboard

This cross-referencing pattern suggests BeProfit's onboarding strategy is to guide users to feature-specific documentation rather than providing a consolidated step-by-step setup flow.

---

## Configuration Options & Defaults

| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| Tax configuration | Auto-synced from store | Per-order manual editing | No global tax config in BeProfit |
| Currency | Store's primary currency | Any currency for expenses | Multi-shop aggregation defaults to USD |
| Transaction fees (Shopify) | Auto-detected from Shopify plan | Manual override available | Settings → Costs → Processing Fees |
| Team member roles | N/A | Admin, View Only | Two roles only |
| Timezone | Store default (implied) | Any timezone | Settings → Shop → General Settings |
| Language | Not documented | Dropdown selection or browser default | Settings → Shop → General Settings |
| Daily profit emails | Enabled (implied) | Enable/Disable | Pauses after 21 days of inactivity |
| Report scheduling | Not scheduled | Daily, Weekly, Monthly | Per-report configuration |
| Calculation preferences | Various defaults (see table above) | Toggle on/off per preference | Settings → Costs → Calculation Preferences |
| Store name | Auto-synced from store | Automatic via webhooks | No manual override needed |

---

## Limitations & Caveats

1. **No global tax configuration:** BeProfit relies entirely on the ecommerce platform for tax rates. Users cannot set custom tax rates that apply across all orders — only per-order manual overrides are available.
2. **Only two user roles:** Admin and View Only. No intermediate roles (e.g., "Editor" who can change costs but not billing, or "Finance" who can see revenue but not marketing). This limits enterprise use cases.
3. **Per-shop access control only:** Team members can have different access per shop in a workspace, but within a shop, it's either Admin or View Only — no feature-level permissions.
4. **No threshold-based alerts:** No documented ability to set alerts like "notify me when daily profit drops below $X" or "alert when ROAS falls below Y." All notifications are scheduled reports, not event-driven.
5. **21-day email auto-pause:** Daily profit emails automatically stop if the user doesn't log in for 21 days. This could mean users who rely on emails without logging in will lose visibility.
6. **Currency conversion transparency:** Documentation does not specify whether exchange rates are real-time, daily averages, or fixed at time of transaction. No manual exchange rate override documented.
7. **Multi-shop totals locked to USD:** When viewing multi-shop aggregated data, total rows always display in USD regardless of individual shop currencies or user preference.
8. **No in-app notifications or alerts:** All notifications appear to be email-based. No push notifications, Slack integrations, or in-app alert center documented.
9. **Calculation preferences don't affect all sections equally:** Orders page and Marketing analytics are NOT affected by calculation preferences, which could lead to confusion when numbers differ between dashboard views and order-level details.
10. **No onboarding checklist or guided setup:** No documented setup wizard, progress tracker, or "getting started" checklist within the app. Users must self-navigate the setup process using help documentation.

---

## Plan/Tier Feature Gating

| Feature | All Plans | Plus/Ultimate Only | Notes |
|---------|-----------|-------------------|-------|
| Tax auto-sync from store | Yes | Yes | All plans |
| Per-order tax editing | Yes | Yes | All plans |
| Multi-currency support | Yes | Yes | All plans |
| Team member invites | Yes | Yes | All plans |
| Admin + View Only roles | Yes | Yes | All plans |
| Transaction fee auto-detection | Yes (Shopify) | Yes | All plans |
| Daily profit emails | Yes | Yes | All plans |
| Scheduled reports | Yes | Yes | All plans |
| Calculation preferences | Yes | Yes | All plans |
| Custom metrics creation | No | Yes (Plus) | Created by BeProfit team |
| Multi-shop workspaces | Not documented | Not documented | May be plan-gated |

**Note:** Most onboarding and configuration features appear to be available on all plans. The primary plan-gating for settings/configuration is around custom metrics (Plus plan only, and created by the BeProfit team rather than self-service).

---

## Related Articles

- Edit Tax settings — https://help.runviably.com/beprofit/edit-tax-settings-beprofit-help-center
- Multi-currencies — https://help.runviably.com/beprofit/multi-currencies-beprofit-help-center
- Adding Team Members — https://help.runviably.com/beprofit/adding-team-members-to-your-beprofit-account
- Manage Multi shops — https://help.runviably.com/beprofit/manage-multi-shops-in-one-or-few-workspaces-beprofit-help-center
- Change Timezone — https://help.runviably.com/beprofit/change-timezone
- Change Store Name — https://help.runviably.com/beprofit/change-store-name-in-beprofit
- Language Settings — https://help.runviably.com/beprofit/changing-your-language-settings-in-beprofit
- Calculation Preferences — https://help.runviably.com/beprofit/setting-up-calculation-preferences-beprofit-help-center
- What's Affected by Calculation Preferences — https://help.runviably.com/beprofit/whats-affected-by-calculation-preferences-beprofit-help-center
- Auto Transaction Fees — https://help.runviably.com/beprofit/does-beprofit-automatically-apply-transaction-fees-based-on-shopify-plan
- Change Processing Fees — https://help.runviably.com/beprofit/how-can-i-change-my-processing-fees
- Daily Profit Emails — https://help.runviably.com/beprofit/daily-profit-emails-in-beprofit
- Schedule Reports — https://help.runviably.com/beprofit/schedule-reports-beprofit-help-center
- Sales Channels — https://help.runviably.com/beprofit/what-are-sales-channels
- Connecting Multiple Shops — https://help.runviably.com/beprofit/connecting-navigating-multiple-shops-and-platforms-in-beprofit-beprofit-help-center
- How can I change my plan? — https://help.runviably.com/beprofit/how-can-i-change-my-plan
- How can I cancel my plan? — https://help.runviably.com/beprofit/how-can-i-cancel-my-plan

---

## Relevance to Our Build

### Onboarding Configuration Takeaways

1. **Tax should be auto-synced, not manually configured:** BeProfit's approach of pulling tax from the ecommerce platform is correct. We should replicate this and avoid creating a separate tax configuration system. Per-order tax editing is a useful escape hatch for corrections.

2. **Two user roles is too simple:** Admin and View Only are insufficient for growing teams. We should offer at least 3-4 roles: Owner (billing + all), Admin (settings + all data), Editor (can modify costs/expenses but not billing), Viewer (read-only). Feature-level permissions would be even better for enterprise customers.

3. **Multi-currency should be seamless:** BeProfit's automatic currency conversion is the right default. We should ensure conversion is transparent (show which rate was used, when), and consider offering manual rate overrides for businesses that use contracted exchange rates.

4. **Transaction fee auto-detection is a strong UX pattern:** Automatically applying the correct Shopify plan fees reduces setup friction and prevents errors. We should replicate this for all supported platforms and extend it to other fee types (payment gateway fees, marketplace fees).

5. **Notification system is underpowered:** BeProfit's email-only notifications (daily summaries and scheduled reports) lack modern features. We should build a more robust notification system including: in-app alerts, threshold-based triggers (profit drop alerts, ROAS warnings), Slack/Teams integration, and mobile push notifications.

6. **No onboarding checklist is a significant gap:** BeProfit has no documented in-app setup wizard or progress tracker. We should build a prominent onboarding checklist that guides users through setup, shows completion percentage, and explains why each step matters for profit accuracy. This is a major UX differentiator opportunity.

7. **Calculation preferences are powerful but hidden:** The ability to customize which orders count toward revenue and how costs are allocated is valuable — but buried in settings. We should surface these preferences during onboarding and explain their impact in plain language, not just toggle labels.

8. **Workspace/shop hierarchy is well-designed:** The workspace → shop → team structure supports multi-store businesses cleanly. We should adopt a similar hierarchy and add features BeProfit lacks (cross-shop templates for cost configuration, inherited settings).

9. **Sales channel data should be automatic:** BeProfit correctly pulls sales channel data from the store rather than requiring manual configuration. We should do the same and extend it with automatic channel-level profit analysis.

10. **21-day email pause is user-hostile:** Automatically pausing profit emails when users don't log in penalizes users who rely on email monitoring without active dashboard usage. We should let users choose their notification preferences without inactivity-based pauses, or at minimum warn before pausing.
