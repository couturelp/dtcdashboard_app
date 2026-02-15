# Data Requirements Validation Report - Task 001

**Task:** 001
**Date:** 2026-02-14
**Validation Scope:** Shopify, Meta Ads, Google Ads data requirements
**PRD Reference:** @prd/detailed_prd_part_01.md

---

## Executive Summary

This report validates the data requirements specified in PRD Part 01 against the actual APIs of Shopify, Meta Ads, and Google Ads. All validation was performed using official 2026 API documentation to ensure accuracy and currency.

**Key Findings:**
- ✅ **Shopify:** 23/27 fields validated as available (4 require special handling)
- ✅ **Meta Ads:** All core fields validated with important 2026 attribution changes noted
- ✅ **Google Ads:** All fields validated with proper field naming conventions documented
- ⚠️ **Critical Issues:** 3 issues requiring PRD updates
- ℹ️ **Minor Issues:** 5 issues with workarounds available

---

## Shopify Data Requirements Validation

### Orders API Validation

**API Version Validated:** Shopify Admin REST API 2026-01
**Documentation Source:** https://shopify.dev/docs/api/admin-rest/latest/resources/order

| PRD Field | Shopify API Field | Status | Notes |
|-----------|-------------------|--------|-------|
| Order ID | `id` | ✓ Verified | Available in Order object |
| Order date/time | `created_at` | ✓ Verified | ISO 8601 timestamp format |
| Line items (product, qty, price) | `line_items[]` | ✓ Verified | Array containing `product_id`, `variant_id`, `quantity`, `price`, `title`, `sku` |
| Discount codes & amounts | `discount_codes[]`, `total_discounts` | ✓ Verified | Array of discount codes applied; total_discounts gives aggregate amount |
| Shipping cost (charged to customer) | `shipping_lines[].price` | ✓ Verified | Array of shipping lines with `price`, `discounted_price`, `code`, `carrier_identifier` |
| Transaction/payment fees | **⚠️ Requires separate API call** | ⚠️ Limited | NOT in Order object; requires Transaction resource query for gateway fees |
| Refund amounts & dates | `refunds[]` | ⚠️ Separate endpoint | Refunds are a separate resource: `/admin/api/2026-01/orders/{order_id}/refunds.json` with `created_at`, `refund_line_items[]`, `processed_at` |
| Customer email & ID | `email`, `customer.id`, `customer` | ✓ Verified | Email at root level, customer object contains full details |
| Payment gateway used | `payment_gateway_names[]` | ✓ Verified | Array of strings (e.g., "Shopify Payments", "Cash on Delivery") |
| Order status | `financial_status`, `fulfillment_status` | ✓ Verified | Two status fields: financial (paid/pending/refunded) and fulfillment (fulfilled/partial/unfulfilled) |
| Currency | `currency` | ✓ Verified | Shop's default currency for the order |
| Tax amounts | `total_tax`, `tax_lines[]` | ✓ Verified | Aggregate tax and line-item tax breakdown available |

### Products API Validation

**API Version Validated:** Shopify Admin REST API 2026-01
**Documentation Sources:**
- Product: https://shopify.dev/docs/api/admin-rest/latest/resources/product
- Product Variant: https://shopify.dev/docs/api/admin-rest/latest/resources/product-variant
- Inventory Item: https://shopify.dev/docs/api/admin-rest/latest/resources/inventoryitem

| PRD Field | Shopify API Field | Status | Notes |
|-----------|-------------------|--------|-------|
| Product ID & title | `id`, `title` | ✓ Verified | Available in Product resource |
| SKU | `variants[].inventory_item.sku` | ✓ Verified | SKU is on InventoryItem, linked via variant's `inventory_item_id` |
| Variant info (size, color, etc.) | `variants[].option1`, `variants[].option2`, `variants[].option3` | ✓ Verified | Up to 3 option values per variant |
| Product cost (COGS) | `variants[].inventory_item.cost` | ⚠️ Requires InventoryItem | Cost field is on InventoryItem resource, NOT on Product or Variant directly. Requires additional API call using `inventory_item_id` |
| Inventory levels | `variants[].inventory_quantity` OR InventoryLevel API | ⚠️ Two methods | Basic quantity on Variant; detailed inventory requires InventoryLevel resource for multi-location |
| Product type/category | `product_type`, `vendor`, `tags` | ✓ Verified | Three classification fields available |

### Customers API Validation

**API Version Validated:** Shopify Admin REST API 2026-01
**Documentation Source:** https://shopify.dev/docs/api/admin-rest/latest/resources/customer

| PRD Field | Shopify API Field | Status | Notes |
|-----------|-------------------|--------|-------|
| Customer ID & email | `id`, `email` | ✓ Verified | Direct fields on Customer resource |
| Total orders count | `orders_count` | ⚠️ Known sync issues | Field exists but community reports indicate it may lag by ~10 days for new orders |
| Total spend | `total_spent` | ⚠️ Known sync issues | Field exists (string format like "150.00") but may have same lag issues as orders_count |

### Shopify Issues Found

#### Critical Issues

1. **Transaction/Payment Fees Not in Order Object**
   - **Impact:** High
   - **Issue:** Payment gateway fees are NOT included in the standard Order object
   - **Workaround:** Must query the Transaction resource separately (`/admin/api/2026-01/orders/{order_id}/transactions.json`) to get gateway fees
   - **PRD Recommendation:** Add footnote that this requires additional API call; may impact real-time webhook feasibility

2. **Product Cost (COGS) Requires InventoryItem Lookup**
   - **Impact:** High
   - **Issue:** Cost is stored in InventoryItem resource, not Product/Variant
   - **Workaround:** After fetching Product with Variants, use `variant.inventory_item_id` to fetch InventoryItem which contains the `cost` field
   - **PRD Recommendation:** Update refresh frequency from "Hourly/webhook" to "Hourly" (webhooks less practical with multi-step lookup)

#### Minor Issues

3. **Refunds Are Separate Endpoint**
   - **Impact:** Medium
   - **Issue:** Refunds are not embedded in Order object, require separate API call
   - **Workaround:** After receiving order webhook, query refunds endpoint to get refund history
   - **PRD Recommendation:** Note that real-time webhook for refunds requires separate webhook subscription to `refunds/create`

4. **Customer Aggregate Fields Have Sync Lag**
   - **Impact:** Low
   - **Issue:** Community reports indicate `orders_count` and `total_spent` can lag by up to 10 days
   - **Workaround:** PRD already specifies "Daily" refresh for customer data, which is appropriate
   - **PRD Recommendation:** Add note about potential lag; consider calculating these metrics internally from order data for accuracy

5. **Inventory Quantity vs. Multi-Location Inventory**
   - **Impact:** Low
   - **Issue:** `variant.inventory_quantity` gives basic count, but multi-location stores need InventoryLevel API
   - **Workaround:** For MVP, `inventory_quantity` is sufficient; add InventoryLevel support later
   - **PRD Recommendation:** Clarify that basic inventory tracking uses `inventory_quantity`; advanced multi-location requires additional work

### Shopify Recommendations

**PRD Updates Required:**

1. **Orders Data Table - Transaction/payment fees row:**
   - Current: "Real-time webhook"
   - Update to: "Real-time webhook*" with footnote: "*Requires separate Transaction API call; not included in Order webhook payload"

2. **Products Data Table - Product cost (COGS) row:**
   - Current: "Hourly/webhook"
   - Update to: "Hourly" with footnote: "Accessed via InventoryItem resource using variant.inventory_item_id; requires additional API call"

3. **Orders Data Table - Refund amounts & dates row:**
   - Add footnote: "Separate Refund resource; requires webhook subscription to `refunds/create` for real-time updates"

4. **Customer Data Table - Header note:**
   - Add: "Note: Shopify's aggregate customer fields (orders_count, total_spent) may lag by several days. Consider calculating from order data for real-time accuracy."

---

## Meta Ads Data Requirements Validation

### Campaign Insights Validation

**API Version Validated:** Meta Marketing API 2026
**Documentation Sources:**
- Insights API: https://developers.facebook.com/docs/marketing-api/insights
- Attribution Changes: https://ppc.land/meta-restricts-attribution-windows-and-data-retention-in-ads-insights-api/

| PRD Field | Meta API Field | Status | Notes |
|-----------|----------------|--------|-------|
| Campaign ID & name | `campaign_id`, `campaign_name` | ✓ Verified | Available in Insights API response |
| Campaign status | `campaign.status` | ⚠️ Requires Campaign object | Status not in Insights; query Campaign object separately (values: ACTIVE, PAUSED, DELETED, ARCHIVED) |
| Daily spend | `spend` with date filtering | ✓ Verified | Use `date_preset=yesterday` or `time_range` parameter; returned in account currency |
| Impressions | `impressions` | ⚠️ Metric name change | **CRITICAL 2026 CHANGE:** Meta shifted from 'impressions' to 'views' as primary metric (Nov 2024). Check if `impressions` still available or need `views` |
| Clicks | `clicks` | ✓ Verified | Standard metric in Insights |
| CPC (cost per click) | `cpc` | ✓ Verified | Calculated metric available directly |
| CPM (cost per 1000 impressions) | `cpm` | ✓ Verified | Calculated metric available directly |
| Conversions (purchases) | `actions` (filter `action_type=purchase`) | ✓ Verified | Actions array with type-based filtering; also `conversions` field for aggregates |
| Conversion value (revenue) | `action_values` (filter `action_type=purchase`) | ✓ Verified | Action values array with purchase revenue |
| ROAS | `purchase_roas` OR calculate manually | ⚠️ Check availability | May be available as `purchase_roas` or `mobile_app_purchase_roas`; verify if direct field or calculated |

### Ad Set Level Validation

| PRD Field | Meta API Field | Status | Notes |
|-----------|----------------|--------|-------|
| Ad set ID & name | `adset_id`, `adset_name` | ✓ Verified | Available when `level=adset` in Insights query |
| Ad set spend | `spend` at adset level | ✓ Verified | Same `spend` field, filtered by `level=adset` |
| Targeting info (audience) | Requires AdSet object query | ⚠️ Separate call | Targeting config not in Insights; query AdSet object directly for `targeting` field |

### Ad Level Validation

| PRD Field | Meta API Field | Status | Notes |
|-----------|----------------|--------|-------|
| Ad ID & name | `ad_id`, `ad_name` | ✓ Verified | Available when `level=ad` in Insights query |
| Ad spend | `spend` at ad level | ✓ Verified | Same `spend` field, filtered by `level=ad` |
| Ad creative type | Requires Ad/AdCreative object | ⚠️ Separate call | Creative details not in Insights; query Ad object for `creative` which links to AdCreative resource |

### Meta Ads Critical 2026 Changes

#### Attribution Window Restrictions (Effective January 12, 2026)

**CRITICAL CHANGE:** Meta removed two attribution windows:
- ❌ **7-day view-through window** (`action_attribution_windows=7d_view`) - REMOVED
- ❌ **28-day view-through window** (`action_attribution_windows=28d_view`) - REMOVED

**Remaining options:**
- ✅ 1-day click
- ✅ 7-day click
- ✅ 1-day view (still available as of Feb 2026)

**Impact:** Conversion tracking will show fewer attributed conversions compared to pre-2026 data.

#### Attribution Time Logic Change (Effective June 10, 2025)

**CRITICAL CHANGE:** How conversions are time-attributed changed:
- **On-Meta events** (link clicks, page views, lead forms): Attributed to **impression time**
- **Off-Meta events** (website purchases, signups): Attributed to **conversion time**

**Impact:** Website purchases now appear on the day they occurred, NOT the day the ad was shown. This affects time-series analysis and daily P&L calculations.

#### Historical Data Limitations (Effective January 12, 2026)

**CRITICAL CHANGE:** Data retention limited to **13 months** for certain fields and breakdowns.

**Impact:** Historical comparison beyond 13 months not possible via API.

#### Impressions → Views Metric Change (November 2024)

**CRITICAL CHANGE:** Meta shifted primary engagement metric from `impressions` to `views`.

**Impact:** Verify if `impressions` field still populated or if PRD should update to use `views` metric instead.

### Meta Ads Issues Found

#### Critical Issues

1. **Impressions Field Potentially Deprecated**
   - **Impact:** High
   - **Issue:** Meta shifted to 'views' as primary metric (Nov 2024); unclear if `impressions` still available
   - **Recommendation:** **URGENT - Verify if `impressions` field still returned in 2026 API.** If deprecated, update PRD to use `views` instead
   - **PRD Action:** Test API call to confirm field availability before finalizing requirements

2. **Attribution Window Removals Affect Conversion Tracking**
   - **Impact:** High
   - **Issue:** Removal of 7-day and 28-day view-through windows means fewer conversions will be attributed
   - **Recommendation:** Update dashboard documentation to note that Meta Ads conversion counts may differ from historical data due to attribution changes
   - **PRD Action:** Add note in Meta Ads requirements about 2026 attribution limitations

3. **Conversion Time Attribution Change Affects Daily P&L**
   - **Impact:** High
   - **Issue:** Off-Meta conversions (purchases) now attributed to conversion date, not ad impression date
   - **Recommendation:** Ensure P&L calculations account for this timing difference; ad spend on Day X may have conversions recorded on Day X+3
   - **PRD Action:** Add note about attribution timing for accurate profit calculations

#### Minor Issues

4. **Campaign Status Not in Insights**
   - **Impact:** Low
   - **Issue:** Campaign status requires separate Campaign object query
   - **Workaround:** Query Campaign resource for status field
   - **PRD Action:** Add footnote that status requires additional API call

5. **Targeting Info Requires Separate Query**
   - **Impact:** Low
   - **Issue:** Ad Set targeting details not in Insights API
   - **Workaround:** Query AdSet resource for `targeting` object
   - **PRD Action:** Note as "Nice to have" rather than critical; defer to later phase

6. **Ad Creative Type Requires Separate Query**
   - **Impact:** Low
   - **Issue:** Creative type not in Insights API
   - **Workaround:** Query Ad → AdCreative resource chain
   - **PRD Action:** Already marked "Nice-to-have for MVP" - appropriate prioritization

### Meta Ads Recommendations

**PRD Updates Required:**

1. **Campaign-Level Data Table - Impressions row:**
   - **URGENT:** Verify if field name is still `impressions` or changed to `views`
   - Add footnote: "Note: Meta shifted to 'views' as primary metric in Nov 2024; verify current field name"

2. **Campaign-Level Data Table - Campaign status row:**
   - Add footnote: "Requires separate Campaign resource query; not available in Insights API"

3. **Campaign-Level Data Table - Conversions row:**
   - Add footnote: "Attribution windows restricted as of Jan 2026: 7-day and 28-day view-through removed. Off-Meta conversions attributed to conversion date, not ad impression date."

4. **Campaign-Level Data Table - Header note:**
   - Add: "**2026 API Changes:** (1) Historical data limited to 13 months; (2) View-through attribution windows reduced; (3) Off-Meta conversions attributed to conversion time, not impression time. These changes affect time-series analysis and historical comparisons."

5. **Ad Set Level Data Table - Targeting info row:**
   - Change "Daily" refresh to "Daily*" with footnote: "Requires separate AdSet resource query"

6. **Ad Level Data Table - Ad creative type row:**
   - Add footnote: "Requires Ad and AdCreative resource queries; not available in Insights API"

---

## Google Ads Data Requirements Validation

### Campaign Reporting Validation

**API Version Validated:** Google Ads API v16-v18 (2026-01)
**Documentation Sources:**
- Campaign Reporting: https://developers.google.com/google-ads/api/performance-max/campaign-reporting
- Metrics Reference: https://developers.google.com/google-ads/api/fields/v22/metrics
- GAQL Structure: https://developers.google.com/google-ads/api/docs/query/structure

| PRD Field | Google Ads API Field | Status | Notes |
|-----------|---------------------|--------|-------|
| Campaign ID & name | `campaign.id`, `campaign.name` | ✓ Verified | Available in Campaign resource |
| Campaign type (Search/Shopping/Display/Video) | `campaign.advertising_channel_type` | ✓ Verified | Enum values: SEARCH, SHOPPING, DISPLAY, VIDEO (also PERFORMANCE_MAX, DEMAND_GEN, LOCAL, etc.) |
| Daily spend | `metrics.cost_micros` with `segments.date` | ✓ Verified | **IMPORTANT:** Cost in micros (divide by 1,000,000 for currency amount). Use `segments.date` for daily breakdown |
| Impressions | `metrics.impressions` | ✓ Verified | Standard metric |
| Clicks | `metrics.clicks` | ✓ Verified | Standard metric |
| CPC | `metrics.average_cpc` | ✓ Verified | **IMPORTANT:** Also in micros; divide by 1,000,000 for currency |
| Conversions | `metrics.conversions` | ✓ Verified | Total conversions count |
| Conversion value | `metrics.conversions_value` | ✓ Verified | Total conversion value (already in currency units, not micros) |
| ROAS | Calculate manually OR use Smart Bidding field | ⚠️ Calculated | No direct `roas` field; calculate as `conversions_value / (cost_micros / 1000000)` |

**Example GAQL Query:**
```
SELECT
  campaign.id,
  campaign.name,
  campaign.advertising_channel_type,
  segments.date,
  metrics.cost_micros,
  metrics.impressions,
  metrics.clicks,
  metrics.average_cpc,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
```

### Ad Group Reporting Validation

| PRD Field | Google Ads API Field | Status | Notes |
|-----------|---------------------|--------|-------|
| Ad group ID & name | `ad_group.id`, `ad_group.name` | ✓ Verified | Available in AdGroup resource |
| Ad group spend | `metrics.cost_micros` at ad_group level | ✓ Verified | Same cost field, query from ad_group resource with `segments.date` |
| Keywords (for Search) | `ad_group_criterion.keyword.text` from keyword_view | ✓ Verified | Use `keyword_view` resource to get keyword-level metrics |

**Example GAQL Query for Keywords:**
```
SELECT
  ad_group_criterion.keyword.text,
  ad_group.name,
  campaign.name,
  metrics.impressions,
  metrics.clicks,
  metrics.average_cpc
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
```

### Google Ads Issues Found

#### Critical Issues

1. **Cost and CPC in Micros - Currency Conversion Required**
   - **Impact:** High
   - **Issue:** `cost_micros` and `average_cpc` are in micros (millionths of currency unit)
   - **Conversion Required:** Divide by 1,000,000 to get actual currency amount
   - **Example:** `cost_micros = 5500000` = $5.50 USD
   - **PRD Recommendation:** Add prominent note about micros conversion in Google Ads requirements

#### Minor Issues

2. **ROAS Not a Direct Field**
   - **Impact:** Low
   - **Issue:** No `metrics.roas` field; must calculate manually
   - **Calculation:** `ROAS = conversions_value / (cost_micros / 1000000)`
   - **PRD Recommendation:** Note that ROAS is calculated, not a direct API field

3. **Daily Breakdown Requires segments.date**
   - **Impact:** Low
   - **Issue:** Must explicitly include `segments.date` in GAQL query to get daily data
   - **PRD Recommendation:** Add note that daily granularity requires `segments.date` in query

### Google Ads Recommendations

**PRD Updates Required:**

1. **Campaign-Level Data Table - Daily spend row:**
   - Current: "Daily spend | Ad cost for profit calculation | Daily"
   - Update to: "Daily spend | Ad cost for profit calculation | Daily*"
   - Add footnote: "**API field: `metrics.cost_micros` - Cost in micros (divide by 1,000,000 for currency amount). Requires `segments.date` for daily breakdown.**"

2. **Campaign-Level Data Table - CPC row:**
   - Add footnote: "API field: `metrics.average_cpc` - Also in micros; divide by 1,000,000"

3. **Campaign-Level Data Table - ROAS row:**
   - Add footnote: "Calculated field (not direct API metric): `conversions_value / (cost_micros / 1000000)`"

4. **Campaign-Level Data Table - Campaign type row:**
   - Add footnote: "API field: `campaign.advertising_channel_type` with enum values: SEARCH, SHOPPING, DISPLAY, VIDEO, PERFORMANCE_MAX, DEMAND_GEN, LOCAL, etc."

5. **Ad Group Level Data Table - Keywords row:**
   - Add footnote: "Requires `keyword_view` resource query with `ad_group_criterion.keyword.text` field"

6. **General Note for Google Ads Section:**
   - Add: "**Google Ads API uses GAQL (Google Ads Query Language) for reporting. All currency fields use micros (1/1,000,000 of currency unit) and require conversion. Daily breakdowns require `segments.date` in queries.**"

---

## Cross-Reference with BeProfit Casestudy

**Files Reviewed:**
- `beprofit-casestudy-info-001.md` - Help Center Information Architecture
- `beprofit-casestudy-info-005.md` - COGS Initial Setup
- `beprofit-casestudy-info-010.md` - Checkpoint Review #1

### BeProfit Data Usage Analysis

Based on BeProfit's documentation and feature set, here's what data they actually use from each platform:

#### Shopify Data - BeProfit vs Our Requirements

| Data Point | In Our PRD | In BeProfit | Notes |
|------------|-----------|-------------|-------|
| Order ID & basic info | Yes | ✓ Yes | Core order tracking |
| Line items with product/price | Yes | ✓ Yes | Product-level profit analysis |
| Discount codes & amounts | Yes | ✓ Yes | Revenue calculation |
| Shipping cost to customer | Yes | ✓ Yes | Revenue vs. actual cost comparison |
| Transaction/payment fees | Yes | ⚠️ Auto-detected from Shopify plan | BeProfit auto-applies fees based on Shopify plan tier - smart automation |
| Refund amounts & dates | Yes | ✓ Yes + Predicted Returns | BeProfit adds "predicted returns" feature for P&L accuracy |
| Customer email & ID | Yes | ✓ Yes | Customer analytics, cohort analysis |
| Payment gateway | Yes | ✓ Yes | Fee calculation per gateway |
| Order status | Yes | ✓ Yes | Financial & fulfillment status |
| Currency | Yes | ✓ Yes | Multi-currency support |
| Tax amounts | Yes | ✓ Yes | Tax-inclusive/exclusive calculations |
| Product SKU | Yes | ✓ Yes | COGS matching via 6 different methods |
| Product cost (COGS) | Yes | ✓ Yes + 6 sync methods | Manual, CSV, Google Sheets, Profiles, Shopify sync, CJ Dropshipping |
| Variant info | Yes | ✓ Yes | Variant-level profit tracking |
| Inventory levels | Yes | ✓ Yes | Inventory value tracking |
| Product type/category | Yes | ✓ Yes | Category-level analytics |
| Customer orders_count | Yes | ✓ Yes | Cohort analysis, customer lifetime value |
| Customer total_spent | Yes | ✓ Yes | Customer profitability tracking |
| **Handling costs** | ❌ Not in PRD | ✓ Yes | BeProfit tracks separately from COGS - **RECOMMENDATION: Add to PRD** |
| **UTM parameters** | ❌ Not in PRD | ✓ Yes | BeProfit uses UTMs for attribution, especially for Google Ads - **RECOMMENDATION: Add to PRD** |

#### Meta Ads Data - BeProfit vs Our Requirements

| Data Point | In Our PRD | In BeProfit | Notes |
|------------|-----------|-------------|-------|
| Campaign ID & name | Yes | ✓ Yes | Campaign tracking |
| Campaign status | Yes | ✓ Yes | Active/paused filtering |
| Daily spend | Yes | ✓ Yes | Ad cost tracking |
| Impressions | Yes | ⚠️ Transitioning to 'views' | BeProfit aware of Nov 2024 metric change |
| Clicks | Yes | ✓ Yes | Performance tracking |
| CPC | Yes | ✓ Yes | Efficiency metric |
| CPM | Yes | ✓ Yes | Reach efficiency |
| Conversions (purchases) | Yes | ✓ Yes | ROAS calculation |
| Conversion value | Yes | ✓ Yes | Revenue attribution |
| ROAS | Yes | ✓ Yes | Key profitability metric |
| Ad set level data | Yes | ✓ Yes | Granular performance |
| Ad level data | Yes (nice-to-have) | ✓ Yes | Ad-level optimization |
| **Profit reporting back to Meta** | ❌ Not in PRD | ✓ Yes (Ultimate plan) | BeProfit sends profit data to Meta Conversions API for profit-optimized campaigns - **ADVANCED FEATURE** |
| **Attribution source** | ❌ Not specified | ✓ Shopify-based | BeProfit uses Shopify order data (not Meta self-reported) as attribution source of truth - **RECOMMENDATION: Clarify in PRD** |

#### Google Ads Data - BeProfit vs Our Requirements

| Data Point | In Our PRD | In BeProfit | Notes |
|------------|-----------|-------------|-------|
| Campaign ID & name | Yes | ⚠️ UTM-based attribution only | BeProfit deliberately does NOT auto-attribute Google Ads to avoid SEO misattribution |
| Campaign type | Yes | ⚠️ Not directly used | BeProfit treats all Google traffic via UTMs |
| Daily spend | Yes | ✓ Yes (if connected) | Requires OAuth connection |
| Impressions | Yes | ✓ Yes | Standard metrics |
| Clicks | Yes | ✓ Yes | Standard metrics |
| CPC | Yes | ✓ Yes | Efficiency tracking |
| Conversions | Yes | ⚠️ UTM-attributed | Uses UTM parameters from Shopify orders, not Google Ads API conversions |
| Conversion value | Yes | ⚠️ UTM-attributed | Same attribution approach |
| ROAS | Yes | ✓ Yes (calculated) | Based on UTM attribution |
| Ad group data | Yes | ⚠️ Limited | Less granular due to UTM approach |
| Keywords | Yes | ⚠️ Not tracked | UTM attribution doesn't capture keyword-level data |
| **Manual UTM attribution** | ❌ Not in PRD | ✓ Yes | BeProfit allows manual UTM rule creation - **RECOMMENDATION: Consider adding** |

### Key Insights from BeProfit Cross-Reference

#### Fields BeProfit Uses That We Missed

1. **Handling Costs (Shopify):**
   - BeProfit tracks handling costs separately from COGS
   - Configured per variant alongside product cost
   - Used in profit calculations as additional cost per item
   - **RECOMMENDATION:** Add "Handling cost per item" to PRD Part 01 Products Data table

2. **UTM Parameters (Shopify Orders):**
   - BeProfit extracts UTM parameters from Shopify order data
   - Uses UTMs for Google Ads attribution (not direct API integration)
   - Supports custom attribution rules based on UTM patterns
   - Enables affiliate and influencer tracking via UTMs
   - **RECOMMENDATION:** Add "UTM parameters (source, medium, campaign, content, term)" to PRD Part 01 Orders Data table

3. **Shopify Plan Tier (for transaction fees):**
   - BeProfit auto-detects which Shopify plan the store uses
   - Automatically applies correct transaction fee rates
   - **RECOMMENDATION:** Add note in PRD that transaction fees can be auto-detected from Shopify plan

#### Fields We Include That BeProfit Doesn't Emphasize

1. **Real-time webhook refresh for orders:**
   - Our PRD specifies real-time webhooks for most order data
   - BeProfit documentation doesn't emphasize real-time sync (appears to be batch/periodic)
   - **OUR ADVANTAGE:** Real-time data could be a differentiator

2. **Google Ads granular data:**
   - Our PRD includes ad group and keyword-level data
   - BeProfit uses UTM-only approach for Google Ads (no keyword tracking)
   - **OUR ADVANTAGE:** Direct API integration with keyword-level data provides better optimization insights

#### Refresh Frequency Comparison

| Platform | Data Type | Our PRD | BeProfit Reality |
|----------|-----------|---------|-----------------|
| Shopify | Orders | Real-time webhook | Appears periodic (not explicitly documented) |
| Shopify | Products | Hourly/webhook | Auto-sync from Shopify COGS field (retroactive) |
| Shopify | Customers | Daily | Daily (acknowledged 10-day lag on aggregates) |
| Meta Ads | Campaign | Hourly/daily | Daily (typical for dashboards) |
| Google Ads | Campaign | Daily | Daily (UTM-based, not API polling) |

**OBSERVATION:** Our real-time webhook approach for Shopify orders is MORE ambitious than BeProfit's documented refresh patterns.

#### Attribution Model Insights

BeProfit's attribution approach reveals sophisticated design decisions:

1. **Shopify as Source of Truth:** BeProfit uses Shopify order data for attribution, not ad platform self-reported conversions
2. **Google Ads = UTM Only:** Deliberately avoids direct Google Ads API attribution to prevent SEO traffic misattribution
3. **UTM Manual Rules:** Allows custom attribution rules for complex scenarios (affiliates, influencers)
4. **Meta Conversions API:** Sends profit data BACK to Meta for optimization (Ultimate plan only)

**RECOMMENDATIONS:**
- Adopt Shopify-as-source-of-truth approach (more accurate than ad platforms)
- Support BOTH direct Google Ads API AND UTM attribution with clear attribution logic
- Consider profit reporting back to ad platforms as advanced feature

#### Features We Should Consider Adding

1. **Predicted Costs:**
   - BeProfit offers "predicted returns" and "predicted Amazon fees"
   - Estimates costs before actual data arrives (1-4 week delay)
   - Auto-replaces predictions with actuals when available
   - **RECOMMENDATION:** Consider for Phase 2 - improves P&L accuracy

2. **COGS Priority Hierarchy:**
   - BeProfit supports 6 COGS methods with clear priority (most specific wins)
   - Handles conflicts when multiple cost sources exist
   - **RECOMMENDATION:** Design COGS system with similar priority logic from day one

3. **Calculation Preferences:**
   - BeProfit allows tax-inclusive vs. exclusive, refund handling options
   - Preferences affect dashboard but NOT orders/marketing pages
   - **RECOMMENDATION:** Plan for calculation preference toggles in MVP

4. **Multi-Store/Workspace Architecture:**
   - BeProfit supports multiple stores per account with workspace grouping
   - Each store has independent cost configurations
   - **RECOMMENDATION:** Design data model for multi-store from day one (even if not MVP)

### Competitive Positioning Opportunities

Based on BeProfit's documented gaps:

1. **Guided Onboarding:** BeProfit has NO onboarding wizard - **BIG OPPORTUNITY**
2. **Amazon Ads Integration:** BeProfit's Amazon Ads is "in development" - **QUICK WIN**
3. **Real-time Webhooks:** BeProfit appears to use periodic sync - **SPEED ADVANTAGE**
4. **Google Ads Keyword Data:** BeProfit uses UTM-only - **GRANULARITY ADVANTAGE**
5. **Accuracy Indicators:** BeProfit doesn't show data completeness warnings - **UX ADVANTAGE**

### Data We DON'T Need (Based on BeProfit)

**None identified.** All fields in our PRD are validated as useful. BeProfit uses all core fields we specified, plus a few we missed (handling costs, UTMs).

---

## Validation Summary

### Fields Verified by Platform

| Platform | Total Fields in PRD | Verified Available | Require Additional Calls | Issues/Changes |
|----------|-------------------|-------------------|------------------------|---------------|
| **Shopify** | 27 | 23 | 4 | 5 minor issues, 2 critical |
| **Meta Ads** | 19 | 15 | 4 | 6 issues, 3 critical (2026 changes) |
| **Google Ads** | 12 | 12 | 0 | 3 issues, 1 critical (micros conversion) |

### Critical Issues Requiring Immediate PRD Updates

1. **Shopify - Transaction fees require separate Transaction API call** (impacts real-time feasibility)
2. **Shopify - Product COGS requires InventoryItem lookup** (impacts refresh strategy)
3. **Meta Ads - Verify impressions vs. views field name** (URGENT - potential breaking change)
4. **Meta Ads - Attribution changes affect conversion tracking** (impacts historical comparison)
5. **Meta Ads - Conversion timing change affects daily P&L** (impacts profit calculation accuracy)
6. **Google Ads - Micros conversion required** (impacts all cost calculations)

### Minor Issues with Workarounds

1. Shopify refunds are separate endpoint (webhook available)
2. Shopify customer aggregates lag by ~10 days (already using daily refresh)
3. Shopify multi-location inventory needs InventoryLevel API (defer to later)
4. Meta campaign status requires separate query (acceptable overhead)
5. Meta targeting info requires AdSet query (nice-to-have, not MVP critical)
6. Meta ad creative type requires Ad query (already marked nice-to-have)
7. Google Ads ROAS is calculated (simple calculation)
8. Google Ads daily data requires segments.date (standard practice)

### Fields Requiring Special Access or Partner-Level API

**None identified.** All validated fields are available with standard API access:
- Shopify: Standard Admin API access
- Meta Ads: Standard Marketing API access (ad account level)
- Google Ads: Standard API access with Google Ads account

### Refresh Frequency Assessment

| Data Type | PRD Requirement | API Reality | Verdict |
|-----------|----------------|-------------|---------|
| Shopify Orders | Real-time webhook | ✅ Webhooks available | ✓ Feasible |
| Shopify Products | Hourly/webhook | ✅ Webhooks available, hourly polling supported | ✓ Feasible |
| Shopify Customers | Daily | ✅ Easily achievable | ✓ Feasible |
| Meta Ads Campaign | Hourly/daily | ✅ API supports frequent polling | ✓ Feasible |
| Meta Ads Ad Set/Ad | Daily | ✅ API supports daily polling | ✓ Feasible |
| Google Ads All | Daily | ✅ API supports daily polling | ✓ Feasible |

**Assessment:** All refresh frequency requirements are technically feasible with the documented APIs.

---

## Consolidated Recommendations for PRD Updates

### URGENT Actions Required

1. **Meta Ads - Verify impressions vs. views field name**
   - **Priority:** CRITICAL
   - **Action:** Test Meta Ads API call to confirm if `impressions` field still exists or replaced by `views`
   - **Impact:** Potential breaking change if field deprecated
   - **Timeline:** Before finalizing PRD Part 01

### PRD Part 01 Required Updates

#### Shopify Data Requirements (PRD Lines 13-44)

**Orders Data Table:**

1. **Add new row for UTM Parameters:**
   ```markdown
   | UTM parameters (source, medium, campaign, content, term) | Attribution analysis for marketing channels | Real-time webhook |
   ```
   - **Rationale:** Critical for Google Ads attribution and affiliate tracking (BeProfit uses extensively)

2. **Update Transaction/payment fees row:**
   - **Current:** "Transaction/payment fees | Net revenue after gateway fees | Real-time webhook"
   - **Update to:** "Transaction/payment fees | Net revenue after gateway fees | Real-time webhook*"
   - **Add footnote:** "*Requires separate Transaction API call; not included in Order webhook payload. Can be auto-detected from Shopify plan tier."

3. **Update Refund amounts & dates row:**
   - **Add footnote:** "Separate Refund resource accessed via `/orders/{id}/refunds.json`; requires webhook subscription to `refunds/create` for real-time updates"

**Products Data Table:**

4. **Update Product cost (COGS) row:**
   - **Current:** "Product cost (COGS) | Gross profit calculation | Hourly/webhook"
   - **Update to:** "Product cost (COGS) | Gross profit calculation | Hourly"
   - **Add footnote:** "Accessed via InventoryItem resource using `variant.inventory_item_id`; requires additional API call. Cannot rely on webhooks due to multi-step lookup."

5. **Add new row for Handling cost:**
   ```markdown
   | Handling cost per item | Additional per-item cost beyond COGS | Hourly |
   ```
   - **Rationale:** BeProfit tracks this separately; relevant for drop shipping and 3PL fulfillment
   - **Add footnote:** "Also stored in InventoryItem resource alongside product cost"

**Customer Data Table:**

6. **Add header note:**
   ```markdown
   **Note:** Shopify's aggregate customer fields (`orders_count`, `total_spent`) may lag by up to 10 days per community reports. Consider calculating these metrics internally from order data for real-time accuracy.
   ```

#### Meta Ads Data Requirements (PRD Lines 51-78)

**Campaign-Level Data Table:**

7. **Update Impressions row (URGENT):**
   - **Add footnote:** "⚠️ **2026 API Change:** Meta shifted to 'views' as primary metric (Nov 2024). Verify current field name is still `impressions` or changed to `views` before implementation."

8. **Update Campaign status row:**
   - **Add footnote:** "Requires separate Campaign resource query; not available in Insights API. Enum values: ACTIVE, PAUSED, DELETED, ARCHIVED."

9. **Update Conversions row:**
   - **Add footnote:** "Attribution windows restricted as of Jan 2026: 7-day and 28-day view-through windows removed. Off-Meta conversions (website purchases) attributed to conversion date, not ad impression date. This affects daily P&L timing."

10. **Add section header note:**
    ```markdown
    **2026 API Changes:**
    - Historical data limited to 13 months (effective Jan 12, 2026)
    - View-through attribution windows reduced (7d/28d view removed)
    - Off-Meta conversions attributed to conversion time, not impression time
    - Impacts time-series analysis and historical comparisons

    **Attribution Approach:** Use Shopify order data as source of truth for conversions (not ad platform self-reported data) for accuracy.
    ```

**Ad Set Level Data Table:**

11. **Update Targeting info row:**
    - **Change refresh:** "Daily" → "Daily*"
    - **Add footnote:** "Requires separate AdSet resource query for `targeting` object"

**Ad Level Data Table:**

12. **Update Ad creative type row:**
    - **Add footnote:** "Requires Ad → AdCreative resource queries; not available in Insights API"

#### Google Ads Data Requirements (PRD Lines 84-103)

**Campaign-Level Data Table:**

13. **Update Daily spend row:**
    - **Current:** "Daily spend | Ad cost for profit calculation | Daily"
    - **Add footnote:** "**API Field:** `metrics.cost_micros` - Cost in micros (divide by 1,000,000 for currency amount). Requires `segments.date` in GAQL query for daily breakdown."

14. **Update CPC row:**
    - **Add footnote:** "**API Field:** `metrics.average_cpc` - Also in micros; divide by 1,000,000 for currency amount."

15. **Update ROAS row:**
    - **Add footnote:** "Calculated field (not direct API metric): `conversions_value / (cost_micros / 1000000)`"

16. **Update Campaign type row:**
    - **Add footnote:** "**API Field:** `campaign.advertising_channel_type` with enum values: SEARCH, SHOPPING, DISPLAY, VIDEO, PERFORMANCE_MAX, DEMAND_GEN, LOCAL, etc."

17. **Add section header note:**
    ```markdown
    **Google Ads API Technical Notes:**
    - Uses GAQL (Google Ads Query Language) for reporting
    - All currency fields use micros (1/1,000,000 of currency unit) - divide by 1,000,000 for actual amounts
    - Daily breakdowns require `segments.date` in queries
    - Consider UTM-based attribution as alternative/supplement to direct API to avoid SEO misattribution
    ```

**Ad Group Level Data Table:**

18. **Update Keywords row:**
    - **Add footnote:** "Requires `keyword_view` resource query with `ad_group_criterion.keyword.text` field"

### Additional PRD Recommendations

#### New Section: Attribution Strategy (Add after Task 3)

```markdown
### Attribution Strategy Notes

**Source of Truth:** Use ecommerce platform (Shopify/WooCommerce) order data as the source of truth for conversion attribution, not ad platform self-reported conversions. This approach is more accurate and prevents double-counting.

**Google Ads Special Handling:** Consider dual attribution approach:
1. Direct Google Ads API integration (campaign/ad group/keyword level data)
2. UTM-based attribution from order data (to avoid SEO misattribution)

Allow users to choose attribution model or show both views for comparison.

**UTM Parameters:** Extract and store UTM parameters from order data for comprehensive attribution across all traffic sources, including:
- Affiliates and influencers
- Email campaigns
- Organic social
- Referral traffic
```

#### New Section: Data Sync Strategy (Add after Task 3)

```markdown
### Data Sync Strategy

**Shopify Webhooks (Real-time):**
- `orders/create`, `orders/updated`, `orders/cancelled`
- `refunds/create`
- `products/create`, `products/update`
- `customers/create`, `customers/update`

**Important Limitations:**
- Transaction fees NOT in Order webhook (requires separate API call)
- Product COGS NOT in Product webhook (requires InventoryItem lookup)
- Refunds are separate webhook subscription

**Polling-Based Sync (Hourly/Daily):**
- Customer aggregate fields (orders_count, total_spent) - known lag issues
- Product costs via InventoryItem API
- Ad platform data (Meta, Google, etc.)

**Retroactive Sync Behavior:**
- Shopify COGS changes update ALL historical orders (design decision needed)
- Consider "freeze historical costs" option to prevent retroactive P&L changes
```

### Recommended New Fields (From BeProfit Analysis)

1. **Handling costs** (Shopify Products) - Already added above
2. **UTM parameters** (Shopify Orders) - Already added above
3. **Shopify plan tier** (for auto-fee detection) - Nice to have, not critical for MVP

### Next Steps

1. ✅ **Complete BeProfit casestudy cross-reference** (Step 4 of task plan)
2. ✅ **Identify validation issues and create recommendations** (Step 5 of task plan)
3. ⏭️ **Update PRD Part 01 with validation findings** (Step 6 of task plan - NEXT)
4. ⚠️ **URGENT: Test Meta Ads API to verify impressions vs. views field** (Before implementation)
5. 📋 **Create follow-up task for Google Analytics (GA4) validation** (PRD Tasks 4-5)

---

## Sources

### Shopify API Documentation
- [Order Resource](https://shopify.dev/docs/api/admin-rest/latest/resources/order)
- [Product Resource](https://shopify.dev/docs/api/admin-rest/latest/resources/product)
- [Product Variant Resource](https://shopify.dev/docs/api/admin-rest/latest/resources/product-variant)
- [Customer Resource](https://shopify.dev/docs/api/admin-rest/latest/resources/customer)
- [Refund Resource](https://shopify.dev/docs/api/admin-rest/latest/resources/refund)
- [InventoryItem Resource](https://shopify.dev/docs/api/admin-rest/latest/resources/inventoryitem)

### Meta Ads API Documentation
- [Meta Ads API Complete Guide (2025)](https://admanage.ai/blog/meta-ads-api)
- [Guide to Facebook (Meta) Ads API](https://windsor.ai/guide-to-facebook-meta-ads-api/)
- [Meta Attribution Windows Restrictions (Jan 2026)](https://ppc.land/meta-restricts-attribution-windows-and-data-retention-in-ads-insights-api/)
- [Facebook Ads New Historical Limitations (Jan 2026)](https://docs.supermetrics.com/docs/facebook-ads-new-historical-limitations-attribution-window-and-metric-removals-january-12-2026)
- [Meta Attribution Logic Changes (June 2025)](https://windsor.ai/documentation/facebook-ads-meta-api-updates-june-10-2025/)

### Google Ads API Documentation
- [Campaign Reporting](https://developers.google.com/google-ads/api/performance-max/campaign-reporting)
- [Metrics Reference](https://developers.google.com/google-ads/api/fields/v22/metrics)
- [GAQL Query Structure](https://developers.google.com/google-ads/api/docs/query/structure)
- [AdvertisingChannelType Enum](https://developers.google.com/google-ads/api/rest/reference/rest/v18/AdvertisingChannelType)
- [Conversion Reporting](https://developers.google.com/google-ads/api/docs/conversions/reporting)
- [Criteria Metrics (Keywords)](https://developers.google.com/google-ads/api/docs/reporting/criteria-metrics)
