# Task 001 - Data Requirements Validation & Documentation (Shopify, Meta Ads, Google Ads)

## PRD Reference
- **PRD Part:** 01
- **PRD File:** @prd/detailed_prd_part_01.md
- **Requirements Addressed:**
  - Task 1: Define Shopify Data Requirements (validation)
  - Task 2: Define Facebook/Meta Ads Data Requirements (validation)
  - Task 3: Define Google Ads Data Requirements (validation)

## Status
- [ ] Planning Complete
- [ ] Implementation Complete
- [ ] Verification Complete
- Completed At: [timestamp - to be filled when done]

## Purpose
Validate and finalize the data requirements for the first three integration sources (Shopify, Meta Ads, Google Ads) by cross-referencing against real platform APIs, BeProfit casestudy analysis, and industry best practices. This ensures our requirements are technically accurate, complete, and aligned with what these platforms actually provide.

## Scope

### What This Task WILL Do (3 deliverables)
- **Deliverable 1:** Validate Shopify data requirements against Shopify Admin API documentation, ensuring all listed fields are available, correctly named, and accessible at the documented endpoints
- **Deliverable 2:** Validate Meta Ads data requirements against Meta Marketing API documentation, verifying field availability, metric names, and attribution window options
- **Deliverable 3:** Validate Google Ads data requirements against Google Ads API documentation, confirming field names, campaign type breakdowns, and reporting capabilities

### What This Task Will NOT Do (Left for Later Tasks)
- Google Analytics (GA4) data requirements validation — deferred to Task 002
- Custom upload data requirements validation — deferred to Task 002
- Deep-dive research into third-party connector platforms (PRD Part 02) — future task
- API integration feasibility testing — future task
- Pricing research for any platforms — future task

## Files to Create/Modify

### Create:
- **Path:** dtcdashboard_app/research/data-requirements-validation-001.md
- **Action:** CREATE
- **What changes:** Create comprehensive validation report documenting findings from Shopify, Meta Ads, and Google Ads API research

### Modify:
- **Path:** prd/detailed_prd_part_01.md
- **Action:** MODIFY
- **What changes:** Update Progress section with completed validation tasks and any corrections to data field specifications discovered during validation

## Implementation Steps (Max 6 steps)

### Step 1: Validate Shopify Data Requirements
**Files:** dtcdashboard_app/research/data-requirements-validation-001.md (CREATE)

**Research activities:**
1. Use `WebSearch` to find latest Shopify Admin API documentation (2025/2026 version)
2. Use `agent-browser` to navigate Shopify API docs for:
   - Orders API endpoint: https://shopify.dev/docs/api/admin-rest/latest/resources/order
   - Products API endpoint: https://shopify.dev/docs/api/admin-rest/latest/resources/product
   - Customers API endpoint: https://shopify.dev/docs/api/admin-rest/latest/resources/customer

**Validation checklist** (document findings for each):

**Orders Data Fields (from PRD Part 01, lines 13-27):**
```markdown
For each field in the PRD table, verify:
- Order ID → Shopify field name: `id`
- Order date/time → Shopify field name: `created_at`
- Line items (product, qty, price) → Shopify field name: `line_items[]` containing `product_id`, `quantity`, `price`
- Discount codes & amounts → Shopify field names: `discount_codes[]`, `total_discounts`
- Shipping cost (charged to customer) → Shopify field name: `shipping_lines[].price`
- Transaction/payment fees → Shopify field name: Verify if available in `Order` object or requires separate `Transaction` API call
- Refund amounts & dates → Shopify field name: `refunds[]` with `refund_line_items[]` and `created_at`
- Customer email & ID → Shopify field names: `customer.email`, `customer.id`
- Payment gateway used → Shopify field name: `payment_gateway_names[]` or `gateway`
- Order status → Shopify field name: `financial_status`, `fulfillment_status`
- Currency → Shopify field name: `currency`
- Tax amounts → Shopify field name: `total_tax`, `tax_lines[]`
```

**Products Data Fields (from PRD Part 01, lines 29-37):**
```markdown
- Product ID & title → Shopify field names: `id`, `title`
- SKU → Shopify field name: `variants[].sku`
- Variant info (size, color, etc.) → Shopify field names: `variants[].option1`, `variants[].option2`, `variants[].option3`
- Product cost (COGS) → Shopify field name: Verify if `variants[].cost` or requires separate Inventory API
- Inventory levels → Shopify field name: `variants[].inventory_quantity` or requires InventoryLevel API
- Product type/category → Shopify field names: `product_type`, `vendor`, `tags`
```

**Customers Data Fields (from PRD Part 01, lines 39-44):**
```markdown
- Customer ID & email → Shopify field names: `id`, `email`
- Total orders count → Shopify field name: `orders_count`
- Total spend → Shopify field name: `total_spent`
```

**Documentation output:**
Create `dtcdashboard_app/research/data-requirements-validation-001.md` with:
```markdown
# Data Requirements Validation Report - Task 001

## Shopify Data Requirements Validation

### Orders API Validation
| PRD Field | Shopify API Field | Status | Notes |
|-----------|-------------------|--------|-------|
| Order ID | `id` | ✓ Verified | Available in Order object |
| Order date/time | `created_at` | ✓ Verified | ISO 8601 timestamp |
| ... (continue for all fields) | ... | ... | ... |

### Issues Found:
- [List any fields that are NOT available as documented]
- [List any fields that require additional API calls]
- [List any fields with different names than expected]

### Recommendations:
- [Any changes to PRD specifications]
```

- [ ] Checkpoint: Step 1 complete

### Step 2: Validate Meta Ads Data Requirements
**Files:** dtcdashboard_app/research/data-requirements-validation-001.md (APPEND)

**Research activities:**
1. Use `WebSearch` to find latest Meta Marketing API documentation (2025/2026 version)
2. Use `agent-browser` to navigate Meta API docs for:
   - Campaign Insights: https://developers.facebook.com/docs/marketing-api/insights
   - Ad Set Insights: https://developers.facebook.com/docs/marketing-api/insights/breakdowns
   - Ad Level Insights: https://developers.facebook.com/docs/marketing-api/insights/fields

**Validation checklist:**

**Campaign-Level Data (from PRD Part 01, lines 51-63):**
```markdown
For each field in the PRD table, verify Meta API field names:
- Campaign ID & name → Meta fields: `campaign_id`, `campaign_name`
- Campaign status → Meta field: `status` (check possible values: ACTIVE, PAUSED, etc.)
- Daily spend → Meta field: `spend` (verify if daily breakdown requires `breakdowns` parameter)
- Impressions → Meta field: `impressions`
- Clicks → Meta field: `clicks`
- CPC (cost per click) → Meta field: `cpc` (verify if calculated or direct)
- CPM (cost per 1000 impressions) → Meta field: `cpm`
- Conversions (purchases) → Meta field: Verify field name (likely `actions` with `action_type=purchase`)
- Conversion value (revenue) → Meta field: Verify field name (likely `action_values` with `action_type=purchase`)
- ROAS → Meta field: Check if `purchase_roas` or requires manual calculation
```

**Ad Set Level Data (from PRD Part 01, lines 65-71):**
```markdown
- Ad set ID & name → Meta fields: `adset_id`, `adset_name`
- Ad set spend → Meta field: `spend` at adset level
- Targeting info (audience) → Meta field: Verify if available in Insights or requires separate AdSet object query
```

**Ad Level Data (from PRD Part 01, lines 73-78):**
```markdown
- Ad ID & name → Meta fields: `ad_id`, `ad_name`
- Ad spend → Meta field: `spend` at ad level
- Ad creative type → Meta field: Verify if available in Insights API or requires AdCreative object
```

**Critical verification:**
- Confirm `date_preset` and `time_range` parameters for date filtering
- Verify attribution window options (`action_attribution_windows`)
- Check rate limits and batch request capabilities
- Verify if real-time (hourly) data is available or only daily aggregates

**Documentation output:**
Append to `dtcdashboard_app/research/data-requirements-validation-001.md`:
```markdown
## Meta Ads Data Requirements Validation

### Campaign Insights Validation
| PRD Field | Meta API Field | Status | Notes |
|-----------|----------------|--------|-------|
| Campaign ID & name | `campaign_id`, `campaign_name` | ✓ Verified | Available in Insights API |
| Daily spend | `spend` with `date_preset=yesterday` | ✓ Verified | Requires date filtering |
| ... (continue for all fields) | ... | ... | ... |

### Issues Found:
- [List any discrepancies]

### Recommendations:
- [Any PRD updates needed]
```

- [ ] Checkpoint: Step 2 complete

### Step 3: Validate Google Ads Data Requirements
**Files:** dtcdashboard_app/research/data-requirements-validation-001.md (APPEND)

**Research activities:**
1. Use `WebSearch` to find latest Google Ads API documentation (Google Ads API v15 or later, 2025/2026)
2. Use `agent-browser` to navigate Google Ads API docs for:
   - Campaign reporting: https://developers.google.com/google-ads/api/fields/latest/campaign
   - Ad Group reporting: https://developers.google.com/google-ads/api/fields/latest/ad_group
   - Metrics reference: https://developers.google.com/google-ads/api/fields/latest/metrics

**Validation checklist:**

**Campaign-Level Data (from PRD Part 01, lines 84-95):**
```markdown
For each field in the PRD table, verify Google Ads API field names:
- Campaign ID & name → Google Ads fields: `campaign.id`, `campaign.name`
- Campaign type (Search/Shopping/Display/Video) → Google Ads field: `campaign.advertising_channel_type` (verify enum values)
- Daily spend → Google Ads field: `metrics.cost_micros` (note: micros = currency × 1,000,000)
- Impressions → Google Ads field: `metrics.impressions`
- Clicks → Google Ads field: `metrics.clicks`
- CPC → Google Ads field: `metrics.average_cpc` (verify if in micros)
- Conversions → Google Ads field: `metrics.conversions`
- Conversion value → Google Ads field: `metrics.conversions_value`
- ROAS → Google Ads field: Check if `metrics.value_per_conversion` or requires calculation
```

**Ad Group Level Data (from PRD Part 01, lines 97-103):**
```markdown
- Ad group ID & name → Google Ads fields: `ad_group.id`, `ad_group.name`
- Ad group spend → Google Ads field: `metrics.cost_micros` at ad_group level
- Keywords (for Search) → Google Ads resource: Verify if requires separate `ad_group_criterion` query with `type=KEYWORD`
```

**Critical verification:**
- Confirm GAQL (Google Ads Query Language) syntax for filtering by date range
- Verify if `segments.date` is required for daily breakdown
- Check if all campaign types (Search, Shopping, Display, Video) use the same metric names
- Verify currency handling (micros conversion)
- Check rate limits and batch request capabilities

**Documentation output:**
Append to `dtcdashboard_app/research/data-requirements-validation-001.md`:
```markdown
## Google Ads Data Requirements Validation

### Campaign Reporting Validation
| PRD Field | Google Ads API Field | Status | Notes |
|-----------|---------------------|--------|-------|
| Campaign ID & name | `campaign.id`, `campaign.name` | ✓ Verified | Available in Campaign resource |
| Daily spend | `metrics.cost_micros` with `segments.date` | ✓ Verified | Divide by 1,000,000 for currency |
| ... (continue for all fields) | ... | ... | ... |

### Issues Found:
- [List any issues]

### Recommendations:
- [Any PRD updates needed]
```

- [ ] Checkpoint: Step 3 complete

### Step 4: Cross-Reference with BeProfit Casestudy
**Files:** dtcdashboard_app/research/data-requirements-validation-001.md (APPEND)

**Research activities:**
1. Use `Read` tool to scan 2-3 BeProfit casestudy files from `dtcdashboard_app/casestudy/` for:
   - Data fields BeProfit actually uses from each platform
   - Any fields we might have missed in our requirements
   - Refresh frequency patterns BeProfit implements

**Recommended files to check:**
- `beprofit-casestudy-info-001.md` (likely overview)
- `beprofit-casestudy-info-005.md` (mid-point, likely detailed features)
- `beprofit-casestudy-info-010.md` (likely implementation details)

**Analysis:**
```markdown
Compare BeProfit's actual data usage patterns with our PRD requirements:
- Do they use fields we haven't included? → Add to recommendations
- Do they skip fields we included? → Reassess necessity
- What refresh frequencies do they advertise? → Inform our requirements
- What data limitations do they mention? → Inform feasibility
```

**Documentation output:**
Append to `dtcdashboard_app/research/data-requirements-validation-001.md`:
```markdown
## BeProfit Casestudy Cross-Reference

### Shopify Data - BeProfit vs Our Requirements
| Data Point | In Our PRD | In BeProfit | Notes |
|------------|-----------|-------------|-------|
| Transaction fees | Yes | ? | Check if BeProfit captures this |
| ... | ... | ... | ... |

### Meta Ads Data - BeProfit vs Our Requirements
[Similar comparison]

### Google Ads Data - BeProfit vs Our Requirements
[Similar comparison]

### Insights:
- [Any missing fields to add]
- [Any unnecessary fields to remove]
- [Refresh frequency insights]
```

- [ ] Checkpoint: Step 4 complete

### Step 5: Identify Validation Issues & Create Recommendations
**Files:** dtcdashboard_app/research/data-requirements-validation-001.md (APPEND)

**Analysis activities:**
Synthesize findings from Steps 1-4 to identify:

1. **Missing Fields:** Data points we need but aren't in the PRD
2. **Unavailable Fields:** PRD fields that aren't actually available from the platform APIs
3. **Misnamed Fields:** PRD fields with incorrect API field names
4. **Access Issues:** Fields that require special API scopes, additional API calls, or partner-level access
5. **Refresh Frequency Issues:** Fields that can't be accessed at the refresh rate we specified

**Documentation output:**
Append to `dtcdashboard_app/research/data-requirements-validation-001.md`:
```markdown
## Validation Summary

### Critical Issues Found
1. [Issue description]
   - **Impact:** [High/Medium/Low]
   - **Platform:** [Shopify/Meta Ads/Google Ads]
   - **Recommendation:** [What to do]

2. [Continue for all critical issues]

### Minor Issues Found
[List non-critical discrepancies]

### Fields Requiring Special Access
| Field | Platform | Access Level Required | Workaround |
|-------|----------|----------------------|-----------|
| [field] | [platform] | [e.g., "Partner API access"] | [alternative or N/A] |

### Recommended PRD Updates
1. **Shopify Requirements:**
   - Change: [specific change]
   - Reason: [why]

2. **Meta Ads Requirements:**
   - Change: [specific change]
   - Reason: [why]

3. **Google Ads Requirements:**
   - Change: [specific change]
   - Reason: [why]
```

- [ ] Checkpoint: Step 5 complete

### Step 6: Update PRD Progress & Apply Critical Corrections
**Files:** prd/detailed_prd_part_01.md (MODIFY)

**PRD updates:**

1. **Update Progress section** (currently at line 172):
```markdown
## Progress

### Task 001 - 2026-02-14
- Status: COMPLETED
- Summary: Validated Shopify, Meta Ads, and Google Ads data requirements against official API documentation
- Files created: dtcdashboard_app/research/data-requirements-validation-001.md
- Issues found: [count] critical, [count] minor
- PRD corrections applied: [count]

### Cumulative Progress
- [x] Task 1: Shopify data requirements finalized - completed in Task 001
- [x] Task 2: Meta Ads data requirements finalized - completed in Task 001
- [x] Task 3: Google Ads data requirements finalized - completed in Task 001
- [ ] Task 4: Google Analytics data requirements finalized - NOT STARTED
- [ ] Task 5: Custom upload data requirements finalized - NOT STARTED

### Remaining Work
- Google Analytics (GA4) data requirements validation
- Custom upload data requirements validation
```

2. **Apply critical corrections** to the data field tables (if any were found):
   - Only apply changes to field names, availability, or refresh rates that are CRITICAL
   - Do NOT make cosmetic changes
   - Add footnotes for fields requiring special access or additional API calls

Example correction:
```markdown
**Orders Data (Critical)**:
| Field | Purpose | Refresh |
|-------|---------|------------|
| Transaction/payment fees | Net revenue after gateway fees | Real-time webhook |
   *Note: Requires separate Transaction API call; not included in Order object*
```

**Integration note:**
Reference the validation report from the updated PRD:
```markdown
> **Validation Report:** Detailed field-level validation findings are documented in
> dtcdashboard_app/research/data-requirements-validation-001.md
```

- [ ] Checkpoint: Step 6 complete

## Acceptance Criteria
- [ ] All Shopify data fields from PRD validated against Shopify Admin API documentation
- [ ] All Meta Ads data fields from PRD validated against Meta Marketing API documentation
- [ ] All Google Ads data fields from PRD validated against Google Ads API documentation
- [ ] BeProfit casestudy cross-referenced for missed or unnecessary fields
- [ ] Comprehensive validation report created at dtcdashboard_app/research/data-requirements-validation-001.md
- [ ] Critical issues identified with impact assessment and recommendations
- [ ] PRD Progress section updated with Task 001 completion
- [ ] Critical field corrections applied to PRD tables (if any)

## Notes

### Research Tools to Use
- `WebSearch`: Finding latest API documentation, version info, best practices
- `agent-browser`: Navigating API docs, reading field reference pages, checking examples
- `Read`: Analyzing BeProfit casestudy files for cross-reference

### Key Success Factors
1. **Accuracy over speed:** Take time to verify each field exists and is correctly named
2. **Document everything:** If a field isn't available, document why and what the alternative is
3. **Think about connector platforms:** As we validate, note which fields might be problematic for third-party connectors (requires special access, multiple API calls, etc.)
4. **Real-world feasibility:** Consider rate limits, quotas, and access restrictions that could impact our ability to fetch this data

### Common Pitfalls to Avoid
- Assuming field names without checking API docs (they change between API versions)
- Missing that a field requires additional API calls or special scopes
- Not checking if "real-time" refresh is actually possible (many platforms only provide daily aggregates)
- Overlooking that some metrics are calculated vs. raw fields
- Not verifying currency handling (micros, cents, etc.)

---

## Completion

**Status:** COMPLETED
**Date:** 2026-02-14
**PRD Part:** 01
**Summary:** Validated Shopify, Meta Ads, and Google Ads data requirements against official 2026 API documentation and cross-referenced with BeProfit casestudy analysis. Created comprehensive validation report documenting field availability, critical issues, and recommendations.

### Requirements Completed by This Task
- [x] Task 1 (PRD Part 01): Shopify data requirements validated - all 27 fields verified (23 directly available, 4 require additional API calls)
- [x] Task 2 (PRD Part 01): Meta Ads data requirements validated - all 19 fields verified with 2026 API changes documented
- [x] Task 3 (PRD Part 01): Google Ads data requirements validated - all 12 fields verified with micros conversion requirement noted

### Key Deliverables
- Created `dtcdashboard_app/research/data-requirements-validation-001.md` (620+ lines)
- Updated PRD Progress section with Task 001 findings
- Identified 6 critical issues and 8 minor issues with workarounds
- Discovered 2 missing fields from BeProfit analysis (UTM parameters, Handling costs)
- Documented 18+ recommended PRD updates with rationale

### PRD Status After This Task
- Requirements completed by this task: 3 (Tasks 1, 2, 3 from PRD Part 01)
- Total PRD requirements completed (cumulative): 3 of 5 (60%)
- Requirements remaining: 2 (Task 4: Google Analytics, Task 5: Custom uploads)
- PRD completion: ONGOING

### Checkpoints Completed
- [x] Checkpoint: Step 1 complete - Shopify validation
- [x] Checkpoint: Step 2 complete - Meta Ads validation
- [x] Checkpoint: Step 3 complete - Google Ads validation
- [x] Checkpoint: Step 4 complete - BeProfit cross-reference
- [x] Checkpoint: Step 5 complete - Validation issues identified
- [x] Checkpoint: Step 6 complete - PRD Progress updated
