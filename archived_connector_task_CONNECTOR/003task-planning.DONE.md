# Task 003 - Platform Deep-Dive: Shopify & Meta Ads Data Coverage

## PRD Reference
- **PRD Part:** 03
- **PRD File:** @prd/detailed_prd_part_03.md
- **Requirements Addressed:**
  - Task 1: Deep-Dive — Shopify Data Coverage per Platform
  - Task 2: Deep-Dive — Meta Ads Data Coverage per Platform

## Status
- [ ] Planning Complete
- [ ] Implementation Complete
- [ ] Verification Complete
- Completed At: [timestamp - to be filled when done]

## Purpose
Perform detailed field-level verification of Shopify and Meta Ads data coverage for the 6 shortlisted platforms from Task 002 (Fivetran, n8n, Airbyte, Windsor.ai, Stitch Data, Make). This validates that each platform can actually retrieve the specific data fields we need for the DTC profit dashboard, as defined in PRD Part 01.

## Scope

### What This Task WILL Do (3 deliverables)
- **Deliverable 1:** Shopify data coverage matrix - verify each of 6 platforms provides the 27+ Shopify fields we need (orders, products, customers, refunds, transaction fees, COGS)
- **Deliverable 2:** Meta Ads data coverage matrix - verify each of 6 platforms provides the 19+ Meta Ads fields we need (campaign spend, impressions, clicks, conversions, ROAS, attribution windows)
- **Deliverable 3:** Deep-dive evaluation report documenting field-level findings, API documentation quality, data normalization approaches, and elimination/ranking of platforms based on coverage gaps

### What This Task Will NOT Do (Left for Later Tasks)
- Google Ads data coverage verification (Task 3 from PRD Part 03) - deferred to Task 004
- Google Analytics (GA4) data coverage verification (Task 4 from PRD Part 03) - deferred to Task 004
- API integration feasibility testing with actual API calls (Task 5 from PRD Part 03) - deferred to Task 004 or 005
- Data normalization schema deep-dive (Task 6 from PRD Part 03) - deferred to later task
- Security & compliance assessment (Task 7 from PRD Part 03) - deferred to later task
- Final platform recommendation - deferred until all integrations verified

## Files to Create/Modify

### Create:
- **Path:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md
- **Action:** CREATE
- **What changes:** Create comprehensive deep-dive report documenting Shopify and Meta Ads field-level coverage for all 6 shortlisted platforms, with coverage matrices, API documentation analysis, and platform rankings

### Modify:
- **Path:** prd/detailed_prd_part_03.md
- **Action:** MODIFY
- **What changes:** Update Progress section with Task 003 completion status showing Tasks 1 & 2 completed

## Implementation Steps (Max 6 steps)

### Step 1: Deep-Dive Shopify Coverage - Fivetran, n8n, Airbyte
**Files:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md (CREATE)

For the first 3 platforms (Fivetran, n8n, Airbyte), use `agent-browser` to navigate their API documentation and verify Shopify data coverage.

**Verification checklist per platform** (from PRD Part 01 data requirements):

**Shopify Orders Data (27 fields from PRD Part 01, lines 13-27):**
```markdown
For each platform, verify API/connector documentation shows access to:
- Order ID → field name in platform's schema
- Order date/time → field name
- Line items (product, qty, price) → verify nested array access
- Discount codes & amounts → verify field availability
- Shipping cost → verify field availability
- Transaction/payment gateway fees → CRITICAL: verify if available (many platforms miss this)
- Refund amounts & dates → verify refund object access
- Customer email & ID → verify customer reference
- Payment gateway used → verify field availability
- Order status (financial, fulfillment) → verify status fields
- Currency → verify currency field
- Tax amounts → verify tax breakdown availability
```

**Shopify Products Data (8 fields from PRD Part 01, lines 29-37):**
```markdown
- Product ID & title
- SKU (from variants)
- Variant info (size, color, etc.)
- Product cost (COGS) → CRITICAL: check if available (often requires Inventory API)
- Inventory levels → check if accessible
- Product type/category/tags
```

**Shopify Customers Data (5 fields from PRD Part 01, lines 39-44):**
```markdown
- Customer ID & email
- Total orders count
- Total spend
```

**Research activities:**

1. **Fivetran - Shopify Connector Documentation**
   - Use `WebSearch`: "Fivetran Shopify connector schema documentation"
   - Use `agent-browser`: Navigate to https://fivetran.com/docs/applications/shopify
   - Document: Schema tables provided, field mappings, any missing fields
   - Check: Does Fivetran expose transaction fees? Does it include COGS/cost data?

2. **n8n - Shopify Node Documentation**
   - Use `WebSearch`: "n8n Shopify node operations documentation"
   - Use `agent-browser`: Navigate to https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.shopify/
   - Document: Available operations (Get Order, Get Product, etc.), fields returned
   - Check: Which Shopify API endpoints does n8n expose? Does it support Transaction API?

3. **Airbyte - Shopify Source Documentation**
   - Use `WebSearch`: "Airbyte Shopify source connector schema"
   - Use `agent-browser`: Navigate to https://docs.airbyte.com/integrations/sources/shopify
   - Document: Streams available (orders, products, customers, etc.), field coverage
   - Check: Does Airbyte sync transaction fees? Does it include inventory_items stream for COGS?

**Documentation structure:**

Create `dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md`:
```markdown
# Platform Deep-Dive Report - Task 003
## Shopify & Meta Ads Data Coverage Evaluation

## Shopify Data Coverage — Detailed Analysis

### Fivetran - Shopify Connector

**Documentation URLs:**
- Connector docs: [URL]
- Schema reference: [URL]

**Orders Data Coverage (27 fields):**
| PRD Field | Fivetran Schema Field | Status | Notes |
|-----------|----------------------|--------|-------|
| Order ID | `order.id` | ✓ Available | Direct field |
| Order date/time | `order.created_at` | ✓ Available | Timestamp format: ISO 8601 |
| Line items | `order_line.product_id`, `order_line.quantity`, `order_line.price` | ✓ Available | Separate table: `order_line` |
| Discount codes | `order.total_discounts` | ✓ Available | Aggregated value only, no code-level detail |
| Shipping cost | `order_shipping_line.price` | ✓ Available | Separate table: `order_shipping_line` |
| Transaction fees | ??? | ? Unknown | Need to verify if `transaction` table includes fees |
| ... [continue for all 27 fields] | ... | ... | ... |

**Products Data Coverage (8 fields):**
[Similar table]

**Customers Data Coverage (5 fields):**
[Similar table]

**Coverage Summary:**
- **Available:** X/27 orders fields, X/8 products fields, X/5 customers fields
- **Missing:** [List any missing fields]
- **Requires Additional Tables:** [List fields that need joins across tables]
- **Critical Issues:** [E.g., "Transaction fees not exposed in schema"]

**API Documentation Quality:**
- **Clarity:** [High/Medium/Low]
- **Completeness:** [High/Medium/Low]
- **Examples:** [Yes/No - are example queries provided?]
- **Notes:** [Any documentation gaps or confusion]

---

### n8n - Shopify Node
[Same structure as Fivetran]

---

### Airbyte - Shopify Source
[Same structure as Fivetran]
```

- [ ] Checkpoint: Step 1 complete

### Step 2: Deep-Dive Shopify Coverage - Windsor.ai, Stitch Data, Make
**Files:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md (APPEND)

Continue Shopify verification for the remaining 3 platforms using the same methodology as Step 1.

**Research activities:**

1. **Windsor.ai - Shopify Integration Documentation**
   - Use `WebSearch`: "Windsor.ai Shopify integration data fields"
   - Use `agent-browser`: Navigate to https://windsor.ai/api-fields/ or integration docs
   - Document: Available data fields, API response format
   - Note: Windsor.ai is primarily marketing-focused; Shopify support may be limited

2. **Stitch Data - Shopify Integration Documentation**
   - Use `WebSearch`: "Stitch Data Shopify integration schema"
   - Use `agent-browser`: Navigate to https://www.stitchdata.com/docs/integrations/saas/shopify
   - Document: Tables replicated, field mappings, replication frequency
   - Check: Schema coverage compared to Shopify Admin API

3. **Make (formerly Integromat) - Shopify Module Documentation**
   - Use `WebSearch`: "Make Integromat Shopify module actions"
   - Use `agent-browser`: Navigate to https://www.make.com/en/integrations/shopify
   - Document: Available modules/actions, data fields returned per action
   - Check: Can Make retrieve order details programmatically? Transaction data?

**Documentation output:**
Append to `dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md` following the same format as Step 1 for each platform.

- [ ] Checkpoint: Step 2 complete

### Step 3: Create Shopify Coverage Comparison Matrix
**Files:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md (APPEND)

Synthesize findings from Steps 1-2 into a comparison matrix showing which platforms have the best Shopify coverage.

**Documentation structure:**
```markdown
## Shopify Coverage — Cross-Platform Comparison

### Orders Data Coverage Matrix (27 Fields)

| Field | Fivetran | n8n | Airbyte | Windsor.ai | Stitch | Make | Priority |
|-------|----------|-----|---------|-----------|--------|------|----------|
| Order ID | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Critical |
| Order date | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Critical |
| Line items (details) | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | Critical |
| Discount codes | ✓ | ✓ | ✓ | ? | ✓ | ✓ | High |
| Shipping cost | ✓ | ✓ | ✓ | ? | ✓ | ✓ | High |
| Transaction fees | ? | ✗ | ? | ✗ | ? | ? | Critical |
| Refunds | ✓ | ✓ | ✓ | ? | ✓ | ? | Critical |
| ... [continue for all 27] | | | | | | | |

### Products Data Coverage Matrix (8 Fields)
[Similar format]

### Customers Data Coverage Matrix (5 Fields)
[Similar format]

### Platform Rankings - Shopify Coverage

1. **[Platform Name]** - Score: X/40 total fields
   - Strengths: [e.g., "Complete order data including transaction fees"]
   - Weaknesses: [e.g., "Missing COGS/cost data"]
   - Critical Gaps: [e.g., "No refund data access"]

2-6. [Continue for all platforms]

### Critical Findings - Shopify

**Fields with Universal Coverage (all 6 platforms):**
- [List fields ALL platforms provide]

**Fields with Gaps (missing from 1+ platforms):**
- Transaction/payment fees → Missing from: [list platforms]
- Product COGS → Missing from: [list platforms]
- [Continue for all problematic fields]

**Platforms to Eliminate Based on Shopify Coverage:**
- [Platform name]: Missing X critical fields → ELIMINATE
- [Continue if any platforms have showstopper gaps]

**Platforms Advancing to Meta Ads Evaluation:**
- [List platforms with acceptable Shopify coverage]
```

- [ ] Checkpoint: Step 3 complete

### Step 4: Deep-Dive Meta Ads Coverage - Fivetran, n8n, Airbyte
**Files:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md (APPEND)

For the first 3 platforms (or fewer if any were eliminated), verify Meta Ads data coverage.

**Verification checklist per platform** (from PRD Part 01 data requirements):

**Meta Ads Campaign-Level Data (19 fields from PRD Part 01, lines 51-78):**
```markdown
For each platform, verify API/connector documentation shows access to:
- Campaign ID & name
- Campaign status (ACTIVE/PAUSED/etc.)
- Daily spend (with date breakdown)
- Impressions
- Clicks
- CPC (cost per click)
- CPM (cost per 1000 impressions)
- Conversions (purchases) → Check field name: `actions` with `action_type=purchase`?
- Conversion value (revenue) → Check field name: `action_values`?
- ROAS → Check if calculated metric or direct field
- Ad set ID & name → Check if ad set level breakdown available
- Ad set spend
- Ad ID & name → Check if ad level breakdown available
- Ad spend
```

**Critical verification points:**
- Attribution windows: Which attribution windows are supported? (1-day click, 7-day click, 28-day click, etc.)
- Date granularity: Can we get daily breakdown or only aggregated?
- Real-time vs batch: Is data real-time or delayed?
- API version: Which Meta Marketing API version does the platform use?

**Research activities:**

1. **Fivetran - Facebook Ads Connector Documentation**
   - Use `WebSearch`: "Fivetran Facebook Ads connector schema"
   - Use `agent-browser`: Navigate to https://fivetran.com/docs/applications/facebook-ads
   - Document: Tables provided (campaigns, ad_sets, ads, insights), field mappings
   - Check: Does Fivetran expose action_values for conversion value? Attribution window options?

2. **n8n - Facebook Graph API Node Documentation**
   - Use `WebSearch`: "n8n Facebook Graph API node Meta Ads insights"
   - Use `agent-browser`: Navigate to https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi/
   - Document: Available operations for Ads Insights, fields returned
   - Check: Can n8n retrieve campaign insights with conversions? What's the query complexity?

3. **Airbyte - Facebook Marketing Source Documentation**
   - Use `WebSearch`: "Airbyte Facebook Marketing source connector schema"
   - Use `agent-browser`: Navigate to https://docs.airbyte.com/integrations/sources/facebook-marketing
   - Document: Streams available (campaigns, ads, ad_insights), field coverage
   - Check: Does Airbyte support custom attribution windows? Conversion tracking?

**Documentation structure:**
```markdown
## Meta Ads Data Coverage — Detailed Analysis

### Fivetran - Facebook Ads Connector

**Documentation URLs:**
- Connector docs: [URL]
- Schema reference: [URL]

**Campaign-Level Data Coverage (19 fields):**
| PRD Field | Fivetran Schema Field | Status | Notes |
|-----------|----------------------|--------|-------|
| Campaign ID & name | `campaign.id`, `campaign.name` | ✓ Available | Direct fields |
| Campaign status | `campaign.status` | ✓ Available | Enum values documented |
| Daily spend | `ad_insights.spend` with `date_start` | ✓ Available | Requires date segmentation |
| Impressions | `ad_insights.impressions` | ✓ Available | Integer metric |
| Clicks | `ad_insights.clicks` | ✓ Available | Integer metric |
| CPC | `ad_insights.cpc` | ✓ Available | Calculated by Meta |
| CPM | `ad_insights.cpm` | ✓ Available | Calculated by Meta |
| Conversions (purchases) | `ad_insights.actions` → filter `action_type=purchase` | ? Verify | May require JSON parsing |
| Conversion value | `ad_insights.action_values` → filter `action_type=purchase` | ? Verify | May require JSON parsing |
| ROAS | `ad_insights.purchase_roas` | ? Verify | Check if available or needs calculation |
| ... [continue for all 19 fields] | ... | ... | ... |

**Attribution Windows:**
- Supported: [List which windows are available: 1d_click, 7d_click, 28d_click, etc.]
- Default: [What's the default attribution window?]
- Configurable: [Can users change attribution window in connector settings?]

**Data Refresh:**
- Frequency: [How often is data synced?]
- Latency: [How delayed is the data from real-time?]
- Backfill: [Can historical data be retrieved? How far back?]

**Coverage Summary:**
- **Available:** X/19 fields
- **Missing:** [List missing fields]
- **Requires Parsing:** [E.g., "Conversion data nested in JSON arrays"]
- **Critical Issues:** [Any showstoppers]

**API Documentation Quality:**
[Same as Shopify evaluation]

---

### n8n - Facebook Graph API Node
[Same structure]

---

### Airbyte - Facebook Marketing Source
[Same structure]
```

- [ ] Checkpoint: Step 4 complete

### Step 5: Deep-Dive Meta Ads Coverage - Windsor.ai, Stitch Data, Make
**Files:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md (APPEND)

Continue Meta Ads verification for the remaining 3 platforms (or fewer if any were eliminated after Shopify evaluation).

**Research activities:**

1. **Windsor.ai - Facebook Ads Integration Documentation**
   - Use `WebSearch`: "Windsor.ai Facebook Ads metrics fields API"
   - Use `agent-browser`: Navigate to https://windsor.ai/api-fields/ and check Facebook Ads section
   - Document: Available metrics, attribution settings, data granularity
   - Note: Windsor.ai specializes in marketing data, should have strong Meta Ads support

2. **Stitch Data - Facebook Ads Integration Documentation**
   - Use `WebSearch`: "Stitch Data Facebook Ads integration schema"
   - Use `agent-browser`: Navigate to https://www.stitchdata.com/docs/integrations/saas/facebook-ads
   - Document: Tables replicated (campaigns, ads, insights), field coverage
   - Check: Conversion tracking availability, attribution window options

3. **Make - Facebook Ads Module Documentation**
   - Use `WebSearch`: "Make Integromat Facebook Ads module"
   - Use `agent-browser`: Navigate to https://www.make.com/en/integrations/facebook-ads
   - Document: Available actions (Get Campaign Insights, etc.), fields returned
   - Check: Can Make retrieve ad insights programmatically? Conversion data?

**Documentation output:**
Append to `dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md` following the same format as Step 4.

- [ ] Checkpoint: Step 5 complete

### Step 6: Create Meta Ads Coverage Matrix & Final Platform Rankings
**Files:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md (APPEND), prd/detailed_prd_part_03.md (MODIFY)

Synthesize Meta Ads findings and create final platform rankings based on combined Shopify + Meta Ads coverage.

**Documentation structure:**
```markdown
## Meta Ads Coverage — Cross-Platform Comparison

### Campaign-Level Data Coverage Matrix (19 Fields)

| Field | Fivetran | n8n | Airbyte | Windsor.ai | Stitch | Make | Priority |
|-------|----------|-----|---------|-----------|--------|------|----------|
| Campaign ID & name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Critical |
| Daily spend | ✓ | ✓ | ✓ | ✓ | ✓ | ? | Critical |
| Impressions | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | High |
| Clicks | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | High |
| Conversions | ? | ? | ✓ | ✓ | ? | ? | Critical |
| Conversion value | ? | ✗ | ✓ | ✓ | ? | ✗ | Critical |
| ROAS | ✗ | ✗ | ? | ✓ | ✗ | ✗ | High |
| ... [continue for all 19] | | | | | | | |

### Platform Rankings - Meta Ads Coverage

1-6. [Similar format to Shopify rankings]

### Critical Findings - Meta Ads

**Fields with Universal Coverage:**
- [List fields ALL platforms provide]

**Fields with Gaps:**
- Conversion value → Missing from: [list platforms]
- ROAS → Missing from: [list platforms] → Can be calculated if spend + revenue available
- [Continue]

**Platforms to Eliminate Based on Meta Ads Coverage:**
- [Platform name]: Missing X critical fields → ELIMINATE

---

## FINAL PLATFORM RANKINGS - Combined Shopify + Meta Ads

### Overall Scores

| Platform | Shopify Score | Meta Ads Score | Combined Score | Rank |
|----------|--------------|----------------|----------------|------|
| Fivetran | X/40 (X%) | X/19 (X%) | X/59 (X%) | 1 |
| Airbyte | X/40 (X%) | X/19 (X%) | X/59 (X%) | 2 |
| ... [continue] | | | | |

### Top 3 Platforms - Detailed Analysis

#### 1. [Platform Name] - Score: X/59 (X%)

**Strengths:**
- Complete Shopify orders data including transaction fees
- Full Meta Ads insights with conversion tracking
- Strong API documentation with code examples
- [Continue]

**Weaknesses:**
- Missing [specific field] from Shopify
- Attribution window limited to [X days]
- [Continue]

**Critical Gaps:**
- [List any showstopper missing fields]
- [If none: "No critical gaps identified"]

**Recommendation:** [ADVANCE to Google Ads evaluation / ELIMINATE / UNCERTAIN - needs further research]

#### 2-3. [Continue for top 3]

### Platforms Eliminated After This Task

**[Platform Name]** - Eliminated for:
- Missing Shopify transaction fees (critical field)
- No Meta Ads conversion value tracking
- Total score: X/59 (below threshold)

[Continue for any eliminated platforms]

### Platforms Advancing to Task 004 (Google Ads + GA4 Evaluation)

1. [Platform name]
2. [Platform name]
3. [Continue - likely 3-5 platforms]

---

## Task 003 Summary

### Evaluation Methodology
- **Platforms Evaluated:** 6 (Fivetran, n8n, Airbyte, Windsor.ai, Stitch Data, Make)
- **Data Sources Covered:** 2 (Shopify, Meta Ads)
- **Total Fields Verified:** 59 (40 Shopify + 19 Meta Ads)
- **Documentation Sources:** Official connector docs, API references, schema documentation

### Key Findings
- **Platforms with 100% Coverage:** [count] - [names]
- **Platforms with 90%+ Coverage:** [count] - [names]
- **Platforms with Critical Gaps:** [count] - [names]
- **Platforms Eliminated:** [count] - [names with reasons]
- **Platforms Advancing:** [count] - [names]

### Most Problematic Fields (Missing from Multiple Platforms)
1. Shopify transaction/payment fees → Missing from: [list]
2. Shopify product COGS → Missing from: [list]
3. Meta Ads conversion value → Missing from: [list]
4. [Continue]

### Documentation Quality Insights
- **Best Documentation:** [platform name] - [why]
- **Worst Documentation:** [platform name] - [why]
- **Average Documentation Quality:** [High/Medium/Low]

### Recommendations for Next Task (004)
- Evaluate Google Ads + GA4 coverage for top [X] platforms: [list names]
- Special attention needed for: [specific concerns from this evaluation]
- Consider eliminating [platform name] early if [specific reason]
```

**PRD Progress update:**

Update `prd/detailed_prd_part_03.md` Progress section:
```markdown
## Progress

### Task 003 - Platform Deep-Dive: Shopify & Meta Ads Coverage - 2026-02-14
- **Status:** COMPLETED
- **Summary:** Evaluated 6 shortlisted platforms (Fivetran, n8n, Airbyte, Windsor.ai, Stitch Data, Make) for Shopify and Meta Ads data coverage at field level
- **Files Created:** dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md
- **Key Findings:**
  - Shopify coverage: [X] platforms with 90%+ coverage (40 fields evaluated)
  - Meta Ads coverage: [X] platforms with 90%+ coverage (19 fields evaluated)
  - [X] critical fields identified as missing from multiple platforms
  - [X] platforms eliminated due to coverage gaps
  - [X] platforms advancing to Google Ads + GA4 evaluation (Task 004)
- **Platforms Eliminated:** [names with brief reason]
- **Platforms Advancing:** [names]
- **Research Report:** See dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md for complete coverage matrices and rankings

### Cumulative Progress
- [x] Task 1: Shopify data deep-dive completed - **Completed in Task 003** (40 fields verified across 6 platforms)
- [x] Task 2: Meta Ads data deep-dive completed - **Completed in Task 003** (19 fields verified across 6 platforms)
- [ ] Task 3: Google Ads data deep-dive - **NOT STARTED** (deferred to Task 004)
- [ ] Task 4: GA4 data deep-dive - **NOT STARTED** (deferred to Task 004)
- [ ] Task 5: API feasibility test - **NOT STARTED** (deferred to later task)
- [ ] Task 6: Data normalization assessment - **NOT STARTED** (deferred to later task)
- [ ] Task 7: Security assessment - **NOT STARTED** (deferred to later task)

### Remaining Work
- **Next Task (004):** Google Ads + GA4 data coverage evaluation for remaining [X] platforms
- **Subsequent Tasks:** API integration testing, data normalization assessment, security review, final recommendation
```

- [ ] Checkpoint: Step 6 complete

## Acceptance Criteria
- [ ] All 6 shortlisted platforms evaluated for Shopify data coverage (40 fields verified per platform)
- [ ] All 6 shortlisted platforms (or remaining after Shopify elimination) evaluated for Meta Ads data coverage (19 fields verified per platform)
- [ ] Cross-platform comparison matrices created for both Shopify and Meta Ads
- [ ] Platform rankings created based on combined coverage scores
- [ ] Critical missing fields identified and documented per platform
- [ ] Platforms eliminated if showstopper gaps found (with clear justification)
- [ ] Top 3-5 platforms recommended for advancing to Google Ads + GA4 evaluation
- [ ] Comprehensive deep-dive report created at dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md
- [ ] PRD Progress section updated with Task 003 completion

## Notes

### Research Tools to Use
- `WebSearch`: Finding platform-specific connector documentation, schema references, API guides
- `agent-browser`: Navigating documentation sites, reading field reference tables, checking integration guides

### Research Focus
This task is **FIELD-LEVEL VERIFICATION**, not implementation:
- **DO:** Systematically verify each field from PRD Part 01 against platform documentation, create detailed coverage matrices, eliminate platforms with critical gaps
- **DON'T:** Attempt actual API calls (that's Task 5), write integration code, make final platform recommendation (need all 4 integrations first)

### Critical Success Factors
1. **Thoroughness:** Verify EVERY field from PRD Part 01 - missing even one critical field could break profit calculations
2. **Documentation:** Clearly mark ✓ Available / ✗ Missing / ? Unclear for each field - no assumptions
3. **Context:** Note which fields require additional API calls, JSON parsing, or table joins
4. **Honesty:** If a platform has a critical gap, ELIMINATE it - don't rationalize keeping it

### Common Pitfalls to Avoid
- Don't assume a field exists just because "Shopify connector" is listed - verify the actual schema
- Watch for fields that require MULTIPLE API calls or table joins (complexity issue)
- Check for nested JSON fields that require parsing (e.g., Meta's `actions` array)
- Verify attribution windows for Meta Ads - default may not match our needs
- Don't skip platforms that look "less popular" - sometimes they have better coverage
- Remember: transaction/payment fees and COGS are historically problematic fields - verify carefully

---

## Self-Check Before Starting

Verification checklist:
- [x] I have 5 or fewer deliverables ✓ (3 deliverables)
- [x] My plan is under 900 lines ✓ (approximately 710 lines)
- [x] I have 6 or fewer implementation steps ✓ (6 steps)
- [x] I explicitly listed what's NOT included ✓ (Google Ads, GA4, testing, security, etc. deferred)
- [x] My deliverables are all RELATED to each other ✓ (all about Shopify and Meta Ads data coverage verification)
- [x] Every implementation step contains concrete actions ✓ (specific URLs, field lists, documentation structures)
- [x] I referenced the actual requirements from PRD Part 01 ✓ (specific line numbers and field lists)

---

## Completion

**Status:** COMPLETED
**Date:** 2026-02-14
**PRD Part:** 03
**Summary:** Successfully evaluated 6 platforms (Fivetran, n8n, Airbyte, Windsor.ai, Stitch Data, Make) for Shopify and Meta Ads data coverage at field level. Created comprehensive research report with coverage matrices, eliminated Windsor.ai due to insufficient coverage, and advanced 5 platforms to Task 004 for Google Ads + GA4 evaluation.

### Requirements Completed by This Task
- [x] Task 1: Deep-Dive — Shopify Data Coverage per Platform (40 fields verified across 6 platforms)
- [x] Task 2: Deep-Dive — Meta Ads Data Coverage per Platform (19 fields verified across 5 platforms after eliminating Windsor.ai)

### Deliverables Created
- [x] Deliverable 1: Shopify data coverage matrix with field-level verification for all 6 platforms
- [x] Deliverable 2: Meta Ads data coverage matrix with field-level verification for 5 platforms
- [x] Deliverable 3: Deep-dive evaluation report (1,764 lines, 94KB) documenting findings, API documentation quality, platform rankings, and elimination decisions

### Files Created/Modified
- **Created:** `dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md` (1,764 lines)
- **Modified:** `prd/detailed_prd_part_03.md` (updated Progress section)

### Key Accomplishments
- Verified 59 total fields (40 Shopify + 19 Meta Ads) across 6 platforms
- Identified universal challenges: transaction fees (Shopify API limitation), product COGS (requires special permissions)
- Eliminated Windsor.ai (33-53% Shopify coverage - insufficient for requirements)
- Ranked remaining 5 platforms: Fivetran #1 (95%), Airbyte #2 (93%), n8n #2 (93%), Stitch #4 (85%), Make #5 (81%)
- Documented critical missing fields and platform-specific issues
- Created comprehensive cross-platform comparison matrices

### PRD Status After This Task
- Requirements completed by this task: 2 (Tasks 1 & 2 from PRD Part 03)
- Total PRD requirements completed (cumulative): 2 out of 7
- Requirements remaining: 5 (Tasks 3, 4, 5, 6, 7)
- PRD completion: **ONGOING** (28.6% complete - 2 of 7 tasks done)

### Next Steps
Task 004 will continue PRD Part 03 by evaluating Google Ads and GA4 data coverage for the remaining 5 platforms (Fivetran, Airbyte, n8n, Stitch Data, Make).
