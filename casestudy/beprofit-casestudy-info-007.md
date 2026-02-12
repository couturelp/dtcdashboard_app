# BeProfit Ad Platform Connection Setup

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/connect-your-ad-platforms-beprofit-help-center (Connect Your Ad Platforms)
  - https://help.runviably.com/beprofit/marketing-analytics-overview-beprofit-help-center (Marketing Analytics Overview)
  - https://help.runviably.com/beprofit/how-can-i-track-sales-through-ad-spend (Track Sales Through Ad Spend)
  - https://help.runviably.com/beprofit/marketing-cost-allocation-beprofit-help-center (Marketing Cost Allocation)
  - https://help.runviably.com/beprofit/marketing-by-country (Marketing By Country)
  - https://help.runviably.com/beprofit/generate-an-access-token-for-facebook-conversions-api (Report Order Profit to Meta)
  - https://help.runviably.com/beprofit/enable-third-party-cookies-to-authenticate-ad-platforms-beprofit-help-center (Enable Third-Party Cookies)
  - https://help.runviably.com/beprofit/troubleshooting-ad-platform-connection-issues-beprofit-help-center (Troubleshooting Connection Issues)
  - https://help.runviably.com/beprofit/exclude-ad-entities-from-dashboard-calculations-beprofit-help-center (Exclude Ad Entities)
  - https://help.runviably.com/beprofit/troubleshooting-1 (Troubleshooting Marketing Platform Data)
  - https://help.runviably.com/beprofit/excluding-ad-campaigns-in-beprofit (Excluding Ad Campaigns)
  - https://help.runviably.com/beprofit/removing-unwanted-ad-account-data-in-beprofit (Removing Unwanted Ad Account Data)
  - https://help.runviably.com/beprofit/utm-attribution-overview-beprofit-help-center (UTM Attribution Overview)
  - https://help.runviably.com/beprofit/tracking-affiliate-influencer-roas-in-beprofit (Affiliate & Influencer ROAS)
  - https://help.runviably.com/beprofit/amazon-ads-integration-status (Amazon Ads Status)
  - https://help.runviably.com/beprofit/existing-tiktok-related-functionality-in-beprofit (TikTok Functionality)
  - https://beprofit.co/ (marketing site)
- **Category:** Ad Platform Integrations / Marketing Analytics
- **Date Captured:** 2026-02-12

---

## Ad Platform Overview

BeProfit positions ad spend tracking as one of its core differentiators. The platform automatically syncs advertising cost data from connected ad platforms, enabling merchants to see the true profitability of their marketing campaigns by deducting ad spend from order-level revenue alongside other costs (COGS, shipping, fees).

The marketing analytics value proposition: "shift focus to profit tracking and see what you're really getting from your campaigns." Marketing data is surfaced in a dedicated Marketing Analytics section with two main tabs — **Ad Spend** (platform-synced data) and **Affiliates** (UTM-attributed data).

---

## Supported Ad Platforms

| # | Platform | Connection Method | Data Synced | Status | Notes |
|---|----------|------------------|-------------|--------|-------|
| 1 | Facebook/Meta Ads | OAuth popup | Campaigns, Ad Sets, Ads, Spend, Clicks, CPC | Active | Largest integration; supports Conversions API for profit reporting back to Meta |
| 2 | Google Ads | OAuth popup | Campaigns, Ad Groups, Ads, Spend, Clicks, CPC | Active | Special attribution rules — UTM-only attribution to avoid SEO misattribution |
| 3 | TikTok Ads | OAuth popup | Campaigns, Ad Sets, Ads, Spend, Clicks, CPC | Active | Also supports TikTok as a sales channel via Shopify |
| 4 | Snapchat Ads | OAuth popup | Campaigns, Ad Sets, Ads, Spend, Clicks, CPC | Active | — |
| 5 | Pinterest Ads | OAuth popup | Campaigns, Ad Sets, Ads, Spend, Clicks, CPC | Active | — |
| 6 | Instagram Ads | Via Facebook/Meta | Included with Facebook Ads connection | Active | Part of Meta Ads ecosystem — not a separate connection |
| 7 | Amazon Ads | Not available | N/A | Not integrated | Manual workaround via custom expenses or Google Sheets |
| 8 | Microsoft/Bing Ads | Not documented | N/A | Not confirmed | Not mentioned in help center or marketing materials |
| 9 | Klaviyo | API integration | Email marketing data | Recently added | Updated API to work with Klaviyo's new version (per FAQ) |

**Total confirmed automated integrations: 5 ad platforms** (Facebook/Meta, Google, TikTok, Snapchat, Pinterest) + Klaviyo for email marketing.

---

## Connection Process (Universal)

All ad platforms follow the same general connection flow:

**Step-by-step process:**

1. Navigate to **Settings → Costs → Marketing Platforms**
2. Click **"Manage Integration"**
3. **Select all desired advertising platforms** using checkboxes (can select multiple at once)
4. Click **"Next"**
5. For each selected platform, click the **"Connect"** button
6. A **popup window** appears requesting login credentials for the ad platform
7. **Authenticate** with the ad platform credentials
8. **Select specific ad accounts** to include (if the platform has multiple accounts)
9. Click **"Save"** to finalize the connection
10. Repeat steps 5-9 for each additional platform

**Post-connection behavior:** "Your ad spend data will automatically sync with the app without any additional effort."

**Prerequisites for successful connection:**
- Ad/popup blockers must be disabled
- Must NOT use incognito/private browsing mode
- Third-party cookies must be enabled in the browser
- VPN software must be disabled
- Browser extensions that could interfere should be disabled

---

## Platform-Specific Details

### Facebook/Meta Ads

**Connection:** Standard OAuth popup flow.

**Unique feature — Conversions API (Profit Reporting to Meta):**

BeProfit can send gross profit per order back to Meta, enabling profit-optimized ad campaigns instead of revenue-based optimization.

**Setup process:**
1. Log into Meta account
2. Navigate to **Event Manager → Data Sources → Relevant Pixel → Settings**
3. Generate a new **access token**
4. Copy both the **access token** and **Pixel ID**
5. Send both credentials to the **BeProfit customer success manager** via chat or direct contact
6. BeProfit team enables the connection
7. In Meta Event Manager: approve/verify the new event from Alerts section
8. Monitor event feed — gross profit data should appear within minutes
9. Create a **custom conversion** using the profit event data
10. Add the custom conversion to campaign reports

**Note:** This is NOT self-service. It requires BeProfit's CS team to enable the connection.

**Attribution behavior:** For Facebook, BeProfit automatically assigns orders based on customer journey data. If an order originates from Facebook but lacks UTM data, BeProfit attributes it to the Facebook Ads platform. However, without UTM data, it cannot be assigned to a specific account, campaign, ad set, or ad — leading to possible discrepancies between BeProfit and Facebook's own reporting.

---

### Google Ads

**Connection:** Standard OAuth popup flow.

**Special attribution rule:** "We attribute based on UTM data only to avoid attributing SEO-based orders to the Google Ads platform." This is a deliberate design choice to prevent organic/SEO traffic from being misattributed as paid Google traffic.

**Implication:** Orders from Google without UTM parameters are NOT attributed to Google Ads, even if they came from a Google search. This can cause Google Ads ROAS to appear higher in BeProfit than in Google Ads reporting (fewer orders attributed, same spend).

**Limitation:** Demand generation campaigns from Google are unavailable through their API, so their spend won't appear in BeProfit.

---

### TikTok Ads

**Connection:** Standard OAuth popup flow for ad spend tracking.

**TikTok as a sales channel (separate from ads):**
- Requires selling on TikTok through Shopify
- Must link TikTok and Shopify accounts
- BeProfit surfaces TikTok sales data when filtered by sales channel
- Supports TikTok-specific processing fee analysis
- Can compare TikTok performance against other sales channels

---

### Snapchat Ads

**Connection:** Standard OAuth popup flow. No platform-specific documentation beyond the general connection process.

---

### Pinterest Ads

**Connection:** Standard OAuth popup flow. No platform-specific documentation beyond the general connection process.

---

### Amazon Ads (NOT Integrated)

**Status:** "Amazon Ads is not yet available as an automated connection option."

**Workarounds:**
1. **Custom expense tracking:** Settings → Costs → Variable Expenses → select "Marketing" category → manually enter Amazon Ads spend
2. **Google Sheets import:** Settings → Costs → Marketing → download template → format Amazon Ads data → upload in bulk

**Future plans:** "Amazon Ads is on our integration consideration list for future development" — no timeline provided.

---

### Klaviyo (Email Marketing)

**Status:** Recently integrated. "BeProfit recently updated their API to work with Klaviyo's new version."

**Use case:** Tracks email marketing costs alongside ad platform spend for a complete marketing cost picture.

---

## Attribution Model Details

### Attribution Method: Last-Click (Modified)

BeProfit uses **last-click attribution** with two important exceptions:

1. **Direct traffic override:** When an order's final interaction is direct traffic but the first interaction is NOT, attribution goes to the **initial source** (not the last click)
2. **Same-source fallback:** When both first and last clicks share the same source AND the final click lacks UTM data, attribution defaults to the **first interaction**

### Data Source Hierarchy

BeProfit uses **Shopify as the authoritative source** for attribution, not ad platform data. Rationale: ad platforms may have "incentives to attribute more orders to themselves."

### Platform-Specific Attribution Rules

| Platform | Attribution Logic | Notes |
|----------|------------------|-------|
| Facebook/Meta | Auto-assignment from customer journey data | Attributes even without UTM if source identified |
| Google Ads | UTM-only attribution | Prevents SEO/organic misattribution |
| TikTok, Snapchat, Pinterest | Auto-assignment from customer journey data | Same as Facebook approach |
| Affiliates/Influencers | UTM-based attribution | Requires manual UTM setup |

### iOS 14+ Impact

BeProfit acknowledges iOS 14 tracking limitations. The help center states the system automatically assigns orders based on customer journey data for "all ad platforms except Google" — implying a workaround for iOS-related tracking gaps that doesn't rely solely on pixel/cookie data.

---

## Ad Data Sync Granularity

### Drill-Down Levels

The Marketing Analytics interface supports four levels of drill-down:
1. **Ad Account** — top-level, which ad account
2. **Campaign** — campaign-level metrics
3. **Ad Set / Ad Group** — mid-level grouping
4. **Individual Ad** — lowest-level, per-ad metrics

### Metrics Available

| Metric | All Plans | Ultimate Plan |
|--------|-----------|--------------|
| Amount Spent | Yes | Yes |
| Clicks | Yes | Yes |
| CPC (Cost Per Click) | Yes | Yes |
| Orders | No | Yes |
| Revenue | No | Yes |
| ROAS | No | Yes |
| Conversion Rate | No | Yes |
| Profit | No | Yes |

**Note:** Orders, Revenue, ROAS, Conversion Rate, and Profit per platform are **Ultimate plan only** features. This is a significant plan-gating — basic plans can see ad spend but cannot correlate it with orders or profit per platform.

### Export Capability

An export button allows downloading platform-level marketing data.

---

## Marketing Cost Allocation to Orders

### Allocation Methods

BeProfit offers two methods for allocating marketing costs to individual orders:

**CAC (Customer Acquisition Cost):**
- Daily marketing expenses divided evenly across **new customers' orders only**
- Returning customers' orders receive zero marketing cost allocation
- Use case: when marketing budget primarily targets acquisition

**CPA (Cost Per Action):**
- Daily marketing expenses divided evenly across **all orders**
- Both new and returning customer orders receive marketing cost allocation
- Use case: when marketing targets both acquisition and retention

**Configuration:** Settings → Calculation Preferences → Marketing Cost Preferences

### Allocation to Products

Marketing costs flow to products within orders through two approaches:

**Even Allocation:**
- Daily marketing costs divide equally across all products in an order

**Selling Price Method:**
- Costs distribute proportionally based on each product's selling price relative to total order value

**Configuration:** Settings → Calculation Preferences → Product Cost Allocation Preferences

---

## Ad Spend in Profit Calculations

### Profit Formula Position

Ad spend is deducted from revenue as a separate expense line:

```
Net Profit = Revenue - COGS - Shipping/Fulfillment - Ad Spend - Processing Fees - Taxes - Custom Expenses
```

### Per-Order vs Aggregate

- **Per-order:** Marketing costs are allocated to individual orders using the CAC or CPA method (see above)
- **Aggregate:** Total ad spend rolls up into the Profit Dashboard as a marketing expense line item
- **ROAS calculation:** Revenue attributed to a platform ÷ Amount spent on that platform

### Marketing by Country

Marketing expenses can be distributed across specific countries for regional analysis:

1. Feature requires team activation
2. Access **Calculation Preferences** and toggle **"Allocate marketing by country"**
3. Select target countries for each shop
4. Connected platforms (Facebook, Google) automatically assign expenses to campaigns matching selected countries
5. Countries not selected show zero marketing expenses

**Limitation:** Applies from activation date forward only. No retroactive historical data allocation.

---

## Managing Ad Data

### Disconnecting a Platform

1. Navigate to **Settings → Costs → Marketing Platforms**
2. Find the platform row and click the **three-dot menu**
3. Select **"Disconnect"**
4. Choose whether to **delete or retain** historical data

### Removing Unwanted Ad Account Data

If wrong ad accounts were selected during initial connection:

1. Navigate to **Settings → Costs → Marketing Platforms**
2. Click the three-dot menu on the relevant platform
3. Select **"Disconnect"**
4. Choose **"Delete Data"** to permanently remove historical data from wrong accounts
5. **Reconnect** the platform and select only the correct ad accounts

**Warning:** "Deleting data is permanent. Make sure you only remove data you no longer need."

### Excluding Ad Entities from Calculations

For campaigns you want to keep connected but exclude from profit calculations:

1. Navigate to **Marketing → Ad Spend**
2. Select the relevant ad platform
3. Access any tab except Accounts
4. Click the **three-dot menu** next to the ad entity
5. Select **"Exclude from all calculations"**

To re-include: enable the "also show excluded ad spend" filter, find the entity, and select "Include in all calculations."

### Excluding Specific Campaigns

1. Navigate to **Marketing → Ad Spend**
2. Choose the advertising platform
3. Access the **"Ad Campaign"** tab
4. Locate the campaign and scroll right
5. Click the **three-dot menu**
6. Select **"Exclude this Campaign"**

---

## Variable Marketing Expenses

For marketing costs NOT captured via ad platform integrations (e.g., agency fees as a percentage of ad spend):

**Adding variable marketing expenses:**
- Click the edit icon of the marketing platform you'd like to add the variable expense to
- This allows dynamically calculating a percentage of ad spend paid to a marketing agency

**Use case:** If a marketing agency charges 15% of ad spend, this can be automatically calculated and added to the platform's total marketing cost.

---

## Affiliate & Influencer Tracking

For non-platform ad spend (affiliate programs, influencer partnerships):

1. Navigate to **Marketing → Affiliates & Influencers**
2. Click **"Add Affiliate"** and enter partner details
3. Configure expense tracking:
   - **Variable Expense:** Per-order, percentage-based or metric-dependent costs
   - **Custom Expense:** Fixed, one-time, or recurring payments (daily, weekly, monthly, yearly)
4. Assign **UTM parameters** and associated costs to each affiliate
5. Review ROAS and performance metrics per affiliate

---

## Troubleshooting Connection Issues

Six troubleshooting steps for failed ad platform connections:

1. **Disable ad/popup blockers** — they interfere with the OAuth popup
2. **Avoid incognito/private browsing** — prevents connection dialog from opening
3. **Enable third-party cookies** — required for the connection process
4. **Try alternative browser** — resolves browser-specific compatibility issues
5. **Disable VPN software** — VPNs interfere with the connection process
6. **Disable browser extensions** — can prevent the connection dialog from opening

If all six steps fail, contact support via chat.

---

## Configuration Options & Defaults

| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| Marketing cost allocation method | Not documented | CAC (new customers only), CPA (all orders) | Settings → Calculation Preferences |
| Product cost allocation | Not documented | Even, Selling Price | Settings → Calculation Preferences |
| Marketing by country | Off | On/Off + country selection | Requires team activation |
| Ad account selection | All accounts during connection | Per-account selection | Cannot deselect after connection — must disconnect/reconnect |
| Attribution model | Last-click (modified) | Not configurable | Two exceptions for direct traffic and same-source fallback |
| Google Ads attribution | UTM-only | Not configurable | By design, prevents SEO misattribution |
| Data retention on disconnect | Prompt to choose | Delete Data, Retain Data | Deletion is permanent |
| Variable marketing expenses | None | Percentage of platform spend | Per-platform configuration |

---

## Limitations & Caveats

1. **Only 5 ad platforms natively supported:** Facebook/Meta, Google, TikTok, Snapchat, and Pinterest. No Amazon Ads, Microsoft/Bing Ads, LinkedIn Ads, Twitter/X Ads, or programmatic display integrations.
2. **Amazon Ads requires manual workaround:** No automated integration — must use custom expenses or Google Sheets import.
3. **Google demand generation campaigns excluded:** Google's API doesn't expose demand generation campaign data, so that spend is invisible in BeProfit.
4. **Cannot deselect ad accounts after connection:** If wrong accounts are selected, must disconnect, delete data, and reconnect — losing all historical data for that platform.
5. **Ultimate plan required for order-level attribution:** Basic plans see ad spend totals but cannot see which orders came from which platform or calculate per-platform ROAS. This significantly limits the value of ad tracking on lower-tier plans.
6. **Meta profit reporting requires manual setup:** The Conversions API integration for reporting profit back to Meta requires contacting BeProfit's CS team — not self-service.
7. **Attribution differences with ad platforms:** BeProfit uses Shopify data as the source of truth, not ad platform data. This means BeProfit's reported metrics will differ from what Facebook, Google, or TikTok report natively — potentially confusing users who compare reports.
8. **iOS 14+ tracking gaps:** While BeProfit has workarounds, the documentation acknowledges that tracking limitations affect all platforms except Google.
9. **No multi-touch attribution:** BeProfit uses modified last-click only. No support for first-click, linear, time-decay, or data-driven attribution models.
10. **Marketing by country is forward-only:** No retroactive historical data allocation when enabling country-level marketing analysis.
11. **Campaign exclusion is binary:** Excluded campaigns are completely removed from calculations — no partial weighting or allocation adjustment.

---

## Plan/Tier Feature Gating

| Feature | Basic/Starter | Ultimate/Plus | Notes |
|---------|--------------|---------------|-------|
| Ad platform connections | Yes | Yes | All plans can connect platforms |
| Ad spend sync (Amount, Clicks, CPC) | Yes | Yes | Basic spend metrics on all plans |
| Orders per platform | No | Yes | Ultimate only |
| Revenue per platform | No | Yes | Ultimate only |
| ROAS per platform | No | Yes | Ultimate only |
| Conversion Rate per platform | No | Yes | Ultimate only |
| Profit per platform | No | Yes | Ultimate only |
| Campaign drill-down | Yes | Yes | All plans |
| Ad entity exclusion | Yes | Yes | All plans |
| Variable marketing expenses | Yes | Yes | All plans |
| Meta Conversions API | Not documented | Likely Plus/Ultimate | Requires CS team setup |
| Marketing by country | Not documented | Not documented | Requires "team activation" |
| UTM attribution | Yes | Yes | All plans |
| Affiliate tracking | Yes | Yes | All plans |

**Key insight:** Ad platform **connection** is available on all plans, but the most valuable analytics (orders, revenue, ROAS, profit per platform) are reserved for the Ultimate plan. This is the most significant plan-gating observed across all BeProfit features studied so far.

---

## Related Articles

- Connect Your Ad Platforms — https://help.runviably.com/beprofit/connect-your-ad-platforms-beprofit-help-center
- Marketing Analytics Overview — https://help.runviably.com/beprofit/marketing-analytics-overview-beprofit-help-center
- Marketing Cost Allocation — https://help.runviably.com/beprofit/marketing-cost-allocation-beprofit-help-center
- Marketing By Country — https://help.runviably.com/beprofit/marketing-by-country
- Report Order Profit to Meta — https://help.runviably.com/beprofit/generate-an-access-token-for-facebook-conversions-api
- Enable Third-Party Cookies — https://help.runviably.com/beprofit/enable-third-party-cookies-to-authenticate-ad-platforms-beprofit-help-center
- Troubleshooting Connection Issues — https://help.runviably.com/beprofit/troubleshooting-ad-platform-connection-issues-beprofit-help-center
- Exclude Ad Entities — https://help.runviably.com/beprofit/exclude-ad-entities-from-dashboard-calculations-beprofit-help-center
- Excluding Ad Campaigns — https://help.runviably.com/beprofit/excluding-ad-campaigns-in-beprofit
- Removing Unwanted Ad Account Data — https://help.runviably.com/beprofit/removing-unwanted-ad-account-data-in-beprofit
- Troubleshooting Marketing Platform Data — https://help.runviably.com/beprofit/troubleshooting-1
- UTM Attribution Overview — https://help.runviably.com/beprofit/utm-attribution-overview-beprofit-help-center
- UTM Attribution Setup — https://help.runviably.com/beprofit/utm-attribution-setup
- Tracking Affiliate & Influencer ROAS — https://help.runviably.com/beprofit/tracking-affiliate-influencer-roas-in-beprofit
- Amazon Ads Integration Status — https://help.runviably.com/beprofit/amazon-ads-integration-status
- TikTok Functionality — https://help.runviably.com/beprofit/existing-tiktok-related-functionality-in-beprofit
- How can I track sales through Ad Spend? — https://help.runviably.com/beprofit/how-can-i-track-sales-through-ad-spend
- Custom Marketing Expenses — https://help.runviably.com/beprofit/custom-marketing-expenses-beprofit-help-center
- Marketing Variable Expense — https://help.runviably.com/beprofit/marketing-variable-expense-beprofit-help-center

---

## Relevance to Our Build

### Ad Platform Integration Takeaways

1. **5 platforms is a reasonable MVP:** BeProfit covers the 5 major DTC ad platforms (Facebook, Google, TikTok, Snapchat, Pinterest). We should target the same 5 at launch. Facebook and Google are non-negotiable; TikTok is increasingly important; Snapchat and Pinterest are nice-to-have.

2. **OAuth popup approach is standard but fragile:** The connection process relies on browser popups, which creates a long list of troubleshooting scenarios (ad blockers, incognito mode, cookies, VPN, extensions). We should consider a more robust connection method — perhaps API key-based connections as fallback, or at minimum, a pre-connection checklist that validates browser settings.

3. **Plan-gating on attribution is a smart monetization lever:** BeProfit gates the most valuable marketing analytics (orders, revenue, ROAS, profit per platform) behind the Ultimate plan. All plans can see spend, but only premium plans see the correlation with revenue. We should consider a similar tiering — free/basic gets spend tracking, premium gets attribution and ROAS.

4. **Modified last-click attribution is pragmatic:** BeProfit's two exceptions to last-click (direct traffic override, same-source fallback) handle common edge cases sensibly. However, the lack of multi-touch attribution is a gap. We should consider offering at least first-click and last-click options, with a roadmap for multi-touch.

5. **Google's UTM-only attribution is defensive:** The decision to attribute Google traffic only via UTMs (to avoid SEO misattribution) is smart but means orders from Google Ads without UTMs won't be attributed. We should implement a similar approach and clearly document it for users.

6. **Shopify as source of truth is correct:** Using the ecommerce platform's data rather than ad platform self-reported data is the right approach. Ad platforms inflate conversions. We should adopt the same philosophy — platform data > ad platform data.

7. **Meta Conversions API integration is a differentiator:** Sending profit data back to Meta for profit-based campaign optimization is a powerful feature. However, BeProfit's implementation requires manual CS setup. We should offer this as a self-service feature to differentiate.

8. **Amazon Ads gap is a real problem:** For DTC brands selling on Amazon (many do), not having automated Amazon Ads tracking means incomplete marketing cost data. We should prioritize Amazon Ads integration to capture this underserved market.

9. **Marketing cost allocation models are essential:** The CAC vs CPA allocation methods (distributing daily spend across orders) are important for order-level profitability. We should support both and potentially add more sophisticated models (e.g., platform-specific allocation rates, weighted allocation based on attribution confidence).

10. **Ad account management UX needs improvement:** The inability to deselect ad accounts without disconnecting and deleting all data is a poor UX pattern. We should support ad account management (add/remove accounts) without requiring full disconnection.
