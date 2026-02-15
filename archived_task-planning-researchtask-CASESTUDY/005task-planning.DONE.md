# Task 005 - PRD Part 02 (Batch 2) — Product Analytics, Ad Spend Tracking, Custom Reports, Customer Analytics, Shipping Cost Tracking

## PRD Reference
- **PRD Part:** 02
- **PRD File:** prd/detailed_prd_part_02.md
- **Requirements Addressed:** Tasks 6-10 of PRD Part 02 (Product Analytics, Ad Spend Tracking & Attribution, Custom Reports / Report Builder, Customer Analytics, Shipping Cost Tracking Detailed)

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-12

## Purpose
Continue the deep-dive research into BeProfit's core product features as documented in the Help Center. This task covers the next 5 of 20 PRD Part 02 requirements, focusing on analytics and reporting features: product-level profitability, ad spend tracking with attribution, the custom report builder, customer lifetime value analytics, and detailed shipping cost tracking. These are critical features for understanding how BeProfit surfaces actionable insights to users.

## Scope

### What This Task WILL Do (5 items)
1. Research and document Product Analytics → `beprofit-casestudy-info-016.md`
2. Research and document Ad Spend Tracking & Attribution → `beprofit-casestudy-info-017.md`
3. Research and document Custom Reports / Report Builder → `beprofit-casestudy-info-018.md`
4. Research and document Customer Analytics → `beprofit-casestudy-info-019.md`
5. Research and document Shipping Cost Tracking (Detailed) → `beprofit-casestudy-info-020.md`

### What This Task Will NOT Do (Left for Later Tasks)
- Task 11: Tax Handling → `beprofit-casestudy-info-021.md`
- Task 12: Multi-Store & Multi-Currency Support → `beprofit-casestudy-info-022.md`
- Task 13: Data Export & Scheduled Reports → `beprofit-casestudy-info-023.md`
- Task 14: Alerts & Notifications → `beprofit-casestudy-info-024.md`
- Task 15: Goals & Targets → `beprofit-casestudy-info-025.md`
- Task 16: Inventory Tracking → `beprofit-casestudy-info-026.md`
- Task 17: Team & Collaboration Features → `beprofit-casestudy-info-027.md`
- Task 18: API & Webhook Documentation → `beprofit-casestudy-info-028.md`
- Task 19: Mobile App & White-Label Features → `beprofit-casestudy-info-029.md`
- Task 20: Checkpoint Review #2 → `beprofit-casestudy-info-030.md`

## Files to READ (Context)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-001.md` — Help Center IA mapping (for article URLs)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-007.md` — Ad Platform Connection Setup (context for ad spend tracking)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-006.md` — Shipping Cost Setup (context for detailed shipping tracking)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-010.md` — Checkpoint Review #1 (methodology notes and template adjustments)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-011.md` — Dashboard documentation (for cross-referencing product/marketing widgets)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-012.md` — P&L Reports (for cross-referencing report builder context)
- `prd/manually-added-dump-from-real-dashboard.md` — Real dashboard visual inventory

## Files to CREATE
1. `dtcdashboard_app/casestudy/beprofit-casestudy-info-016.md` — Product Analytics
2. `dtcdashboard_app/casestudy/beprofit-casestudy-info-017.md` — Ad Spend Tracking & Attribution
3. `dtcdashboard_app/casestudy/beprofit-casestudy-info-018.md` — Custom Reports / Report Builder
4. `dtcdashboard_app/casestudy/beprofit-casestudy-info-019.md` — Customer Analytics
5. `dtcdashboard_app/casestudy/beprofit-casestudy-info-020.md` — Shipping Cost Tracking (Detailed)

## Implementation Steps

### Step 1: Research Product Analytics (File 016)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-016.md` (CREATE)

Browse the following Help Center articles from the Products category:
- https://help.runviably.com/beprofit/products-overview-beprofit-help-center (Products Overview)
- https://help.runviably.com/beprofit/single-product-beprofit-help-center (Single Product view)
- https://help.runviably.com/beprofit/inventory-beprofit-help-center (Inventory)
- https://help.runviably.com/beprofit/products-returns-beprofit-help-center (Products Returns)
- https://help.runviably.com/beprofit/products-analytics-beprofit-help-center (Products Analytics — also in Getting Started)

**Document structure (follow established template from files 011-015):**

```markdown
# BeProfit Product Analytics Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Product Analytics
- **Date Captured:** [date]

---

## Products Overview
[Document the products listing page — table structure, available columns/metrics, sorting, filtering, search capabilities, pagination]

### Product-Level Metrics
[Capture all available metrics: revenue, cost, profit, margin %, units sold, returns, refund rate, AOV per product, etc.]

### Product Ranking / Best-Worst Performers
[Document how products are ranked, top/bottom performers view, ranking criteria options]

## Single Product View
[Document the detailed view for a single product — all tabs, sections, charts, variant-level breakdowns, historical data, comparison features]

### Product Grouping & Categorization
[Document any product tagging, collection-based grouping, custom categorization, vendor filtering]

## Product Returns
[Document the returns tracking view — return rate metrics, return reasons if tracked, refund impact on product profitability]

## Products Analytics (Advanced)
[Document the analytics-focused view — charts, trend lines, product comparison features, exportable data]

## Inferred UI Elements
[List buttons, menus, filters, toggles, modals described in the articles]

## Data Model Implications
[Note entity relationships — Product → Variants, Product → Orders, Product → Returns, metric aggregation logic]

## Limitations & Gaps
[Document what couldn't be determined from Help Center alone]

## Relevance to Our Build
[7-10 actionable insights for our competing product]
```

**Key research questions to answer:**
- What columns appear in the product table by default? Which are togglable?
- Can products be compared side-by-side?
- How does variant-level data appear (nested under parent product, or flat)?
- What time-range controls exist on product analytics pages?
- Are there any product-level custom metrics?
- How do returns and refunds roll up to product profitability?

- [x] Checkpoint: Step 1 complete

### Step 2: Research Ad Spend Tracking & Attribution (File 017)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-017.md` (CREATE)

Browse the following Help Center articles from the Marketing Analytics category:
- https://help.runviably.com/beprofit/marketing-analytics-overview-beprofit-help-center (Marketing Analytics Overview)
- https://help.runviably.com/beprofit/how-can-i-track-sales-through-ad-spend (Track sales through Ad Spend)
- https://help.runviably.com/beprofit/marketing-cost-allocation-beprofit-help-center (Marketing Cost Allocation)
- https://help.runviably.com/beprofit/marketing-by-country (Marketing By Country)
- https://help.runviably.com/beprofit/tracking-affiliate-influencer-roas-in-beprofit (Affiliate/Influencer ROAS)
- https://help.runviably.com/beprofit/removing-unwanted-ad-account-data-in-beprofit (Removing unwanted ad data)
- https://help.runviably.com/beprofit/excluding-ad-campaigns-in-beprofit (Excluding ad campaigns)

Also browse Marketing Platforms subcategory:
- https://help.runviably.com/beprofit/connect-your-ad-platforms (Connect Ad Platforms — may overlap with file 007)
- https://help.runviably.com/beprofit/exclude-ad-entities-from-dashboard-calculations (Exclude ad entities)
- https://help.runviably.com/beprofit/troubleshooting-marketing-platform-data-in-beprofit (Troubleshooting)

And UTM Attribution subcategory:
- https://help.runviably.com/beprofit/utm-attribution-overview (UTM Attribution Overview)
- https://help.runviably.com/beprofit/utm-attribution-setup (UTM Setup)
- https://help.runviably.com/beprofit/identify-order-utms (Identify Order UTMs)
- https://help.runviably.com/beprofit/attribute-utms-manually (Attribute UTMs Manually)
- https://help.runviably.com/beprofit/create-custom-attribution-rules (Custom Attribution Rules)
- https://help.runviably.com/beprofit/manage-affiliate-utms-expenses (Manage Affiliate UTMs & Expenses)

**NOTE:** File 007 (from PRD Part 01) covered ad platform CONNECTION setup. This file (017) covers the ANALYTICS and REPORTING side — what metrics are tracked, how attribution works, ROAS/CPA calculations, campaign management. Avoid duplicating connection setup content; instead cross-reference file 007 and focus on the reporting/analytics layer.

**Document structure:**

```markdown
# BeProfit Ad Spend Tracking & Attribution Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Marketing Analytics
- **Date Captured:** [date]

---

## Marketing Analytics Dashboard
[Document the marketing analytics page layout — overview metrics, charts, time-range controls]

### Supported Ad Platforms & Metrics Pulled
[Table of platform → metrics available: spend, impressions, clicks, conversions, CPC, CPM, etc.]

### Attribution Model
[Document which attribution model is used — first-click, last-click, multi-touch, platform-reported vs UTM-based. Reference file 007 finding that Shopify is source of truth.]

### Cost Allocation Methods (CAC vs CPA)
[Document the two allocation methods — how each distributes marketing cost across orders. Reference file 014's mention of calculation preferences.]

## Campaign Management
[Document campaign-level views — campaign → ad set → ad level granularity, filtering, exclusion capabilities]

### Excluding Campaigns / Ad Entities
[Document how users can exclude specific campaigns, ad sets, or accounts from calculations]

## UTM Attribution System
[Document the full UTM attribution system — setup, tracking, manual attribution, custom rules]

### Custom Attribution Rules
[Document rule creation — conditions, matching logic, priority, affiliate/influencer tracking]

## ROAS, CPA, and Performance Metrics
[Document all marketing performance metrics — formulas, how they're calculated, which pages show them]

### Marketing By Country
[Document geographic breakdown of marketing performance]

## Affiliate & Influencer Tracking
[Document influencer/affiliate ROAS tracking — UTM-based, expense management, custom rules]

## Inferred UI Elements
## Data Model Implications
## Limitations & Gaps
## Relevance to Our Build
```

**Key research questions to answer:**
- What granularity levels exist (account → campaign → ad set → ad)?
- How does UTM attribution differ from platform-reported attribution?
- What is the exact ROAS formula used? Is it revenue-based or profit-based?
- Can users create custom attribution rules? What conditions are available?
- How are affiliate/influencer costs tracked differently from ad platform costs?
- What happens when a campaign is excluded — is it retroactive?

- [x] Checkpoint: Step 2 complete

### Step 3: Research Custom Reports / Report Builder (File 018)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-018.md` (CREATE)

Browse the following Help Center articles from the Reports category:
- https://help.runviably.com/beprofit/report-templates-and-custom-reports-beprofit-help-center (Report Templates and Custom Reports)
- https://help.runviably.com/beprofit/create-a-custom-report-beprofit-help-center (Create a Custom Report)
- https://help.runviably.com/beprofit/schedule-reports-beprofit-help-center (Schedule Reports — may overlap with file 012)
- https://help.runviably.com/beprofit/custom-metrics-creation-for-plus-plan-members (Custom Metrics — Plus Plan)

Also browse relevant Getting Started articles:
- https://help.runviably.com/beprofit/how-can-i-export-my-data (Data Export)

**NOTE:** File 012 covered the P&L report structure and daily profit emails. This file (018) focuses specifically on the CUSTOM report builder — what dimensions/metrics are available, how reports are constructed, visualization options, templates, saving/sharing, and scheduling. Avoid duplicating P&L content; cross-reference file 012.

**Document structure:**

```markdown
# BeProfit Custom Reports / Report Builder Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Custom Reports
- **Date Captured:** [date]

---

## Report Builder Overview
[Document the report builder interface — entry point, overall UX flow, capabilities]

## Available Report Templates
[Document all pre-built report templates — name, purpose, which metrics/dimensions each includes]

## Custom Report Construction
[Document step-by-step process for creating a custom report]

### Available Dimensions
[Comprehensive list of all dimensions available for reports — date, product, order, campaign, country, etc.]

### Available Metrics
[Comprehensive list of all metrics — revenue, cost, profit, margin, ROAS, CPA, units, returns, etc.]

### Filters & Conditions
[Document filtering options — date range, product filters, campaign filters, order status, etc.]

### Visualization Options
[Document chart types — table, line chart, bar chart, pie chart, etc. Customization options for each.]

## Custom Metrics (Plus Plan)
[Document the Plus Plan custom metrics feature — what it allows, how metrics are created, examples]

## Report Saving & Management
[Document how reports are saved, renamed, duplicated, deleted, organized]

### Report Scheduling
[Document scheduling options — frequency, recipients, format, time of delivery. Cross-reference file 012.]

### Report Sharing
[Document sharing options — email, link, export formats (CSV, PDF)]

## Data Export Capabilities
[Document all data export flows — which pages support export, format options, bulk export]

## Inferred UI Elements
## Data Model Implications
## Limitations & Gaps
## Relevance to Our Build
```

**Key research questions to answer:**
- How many pre-built report templates exist and what do they cover?
- What is the complete list of available dimensions and metrics?
- Can users create calculated/derived metrics (e.g., custom margin formulas)?
- What visualization types are supported (table only, or also charts)?
- Is the report builder drag-and-drop or form-based?
- What export formats are available (CSV, PDF, Excel)?
- Can reports be shared with non-BeProfit users (e.g., via public link)?
- What are the Plus Plan custom metrics — is this a self-service feature or does BeProfit's team create them?

- [x] Checkpoint: Step 3 complete

### Step 4: Research Customer Analytics (File 019)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-019.md` (CREATE)

Browse the following Help Center articles from the Customer Lifetime Value category:
- https://help.runviably.com/beprofit/beprofit-cohort-analysis-chart-guide-beprofit-help-center (Cohort Analysis Chart Guide)
- https://help.runviably.com/beprofit/cohort-analysis-understanding-your-stores-customers-beprofit-help-center (Cohort Analysis: Understanding Your Store's Customers)

Also check for any additional customer-related content in:
- Marketing Analytics articles (may reference customer segmentation)
- The main BeProfit marketing site (https://beprofit.co/) for customer analytics feature claims
- Review the dashboard documentation (file 011) for any customer-related widgets

**NOTE:** The Customer Lifetime Value category has only 2 Help Center articles, which suggests either limited documentation or a simpler feature set. Supplement with marketing site claims and cross-reference other files. Be transparent about gaps.

**Document structure:**

```markdown
# BeProfit Customer Analytics Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Customer Analytics
- **Date Captured:** [date]

---

## Customer Analytics Overview
[Document the customer analytics capabilities — what views exist, where they are accessed]

## Cohort Analysis
[Document the cohort analysis feature in detail — how cohorts are defined, time periods, metrics displayed]

### Cohort Chart Types
[Document visualization types — heatmap, line chart, table. What each axis represents.]

### Cohort Metrics
[Document available metrics — LTV, repeat purchase rate, revenue per cohort, retention rate, etc.]

### Cohort Time Granularity
[Document period options — weekly, monthly, quarterly cohorts]

## Customer Segmentation
[Document any segmentation capabilities — new vs returning, high-value vs low-value, by acquisition channel]

## Customer Profitability
[Document per-customer profit views if they exist — revenue, cost, LTV, acquisition cost, profit per customer]

## Repeat Purchase Tracking
[Document repeat purchase metrics — rate, frequency, average time between purchases]

## Customer Acquisition Cost
[Document how CAC is calculated at customer level — which marketing costs are attributed]

## Inferred UI Elements
## Data Model Implications
## Limitations & Gaps
## Relevance to Our Build
```

**Key research questions to answer:**
- What cohort types are available (acquisition date, first purchase date)?
- What metrics appear in the cohort heatmap/table?
- Is there a per-customer detail view (like per-order profit)?
- Can customers be segmented by acquisition channel or campaign?
- Is customer LTV calculated, and if so, what formula?
- How does BeProfit define "repeat customer"?
- Are there any customer-level alerts or notifications?

- [x] Checkpoint: Step 4 complete

### Step 5: Research Shipping Cost Tracking Detailed (File 020)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-020.md` (CREATE)

Browse the following Help Center articles from the Fulfillment category:
- https://help.runviably.com/beprofit/dynamic-fulfillment-rules (Dynamic Fulfillment Rules)
- https://help.runviably.com/beprofit/setting-up-order-item-quantity-based-tiered-rates (Quantity-Based Tiered Rates)
- https://help.runviably.com/beprofit/fulfillment-profiles-in-beprofit-beprofit-help-center (Fulfillment Profiles Overview)
- https://help.runviably.com/beprofit/create-fulfillment-profile-beprofit-help-center (Create Fulfillment Profile)
- https://help.runviably.com/beprofit/create-a-shipping-profile-legacy-beprofit-help-center (Legacy Shipping Profile)
- https://help.runviably.com/beprofit/is-tax/vat-included-in-shipping-costs-beprofit-help-center (Tax/VAT in Shipping)
- https://help.runviably.com/beprofit/connect-fulfillment-platforms-beprofit-help-center (Connect Fulfillment Platforms)

Also check Costs & Expenses for fulfillment-related articles:
- https://help.runviably.com/beprofit/custom-fulfillment-expenses-beprofit-help-center (Custom Fulfillment Expenses)

**NOTE:** File 006 (from PRD Part 01) covered shipping cost SETUP during onboarding. This file (020) goes deeper into the ongoing tracking and analytics side — dynamic rules, tiered rates, fulfillment profiles, estimation vs actual cost reconciliation, carrier-specific tracking, and shipping profitability analysis. Cross-reference file 006 and avoid duplicating basic setup content.

**Document structure:**

```markdown
# BeProfit Shipping Cost Tracking (Detailed) Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Shipping & Fulfillment Analytics
- **Date Captured:** [date]

---

## Shipping Cost Tracking Overview
[Document the full shipping cost tracking system — how costs are captured, estimated vs actual]

## Fulfillment Profiles (Current System)
[Document the current fulfillment profile system — creation flow, configuration options, rule types]

### Dynamic Fulfillment Rules
[Document dynamic rules — condition types, logic operators, priority, override behavior]

### Quantity-Based Tiered Rates
[Document tiered pricing — threshold configuration, per-item vs per-order, step-up logic]

### Country/Region-Based Rules
[Document geographic shipping rules — zone configuration, country mapping]

## Legacy Shipping Profile System
[Document the deprecated system — what it supported, how it differs from current, migration path]

## Estimation vs Actual Cost Reconciliation
[Document how estimated shipping costs compare to actual costs — sync from fulfillment platforms, override workflow]

## Carrier/Provider Integration
[Document specific carrier integrations — which platforms sync actual costs, data granularity]

## Shipping Profitability Analysis
[Document any shipping-specific profitability views — shipping revenue vs cost, per-order shipping margin]

## Tax/VAT in Shipping Costs
[Document how taxes interact with shipping cost calculations — inclusion/exclusion settings]

## Custom Fulfillment Expenses
[Document additional fulfillment cost types — handling fees, packaging, insurance, etc.]

## Inferred UI Elements
## Data Model Implications
## Limitations & Gaps
## Relevance to Our Build
```

**Key research questions to answer:**
- How does the dynamic fulfillment rules engine work (conditions, actions, priority)?
- What are quantity-based tiered rates — per-item tiers or order-total tiers?
- Does BeProfit reconcile estimated vs actual shipping costs? If so, how?
- Which fulfillment platforms sync actual shipping costs back to BeProfit?
- Is there a shipping profitability metric (shipping revenue - shipping cost)?
- How do legacy and current shipping profile systems coexist?
- Are there any shipping-specific reports or dashboards?

- [x] Checkpoint: Step 5 complete

### Step 6: Update PRD Part 02 Progress
**Files:** `prd/detailed_prd_part_02.md` (MODIFY — Progress section only)

After completing files 016-020, update the PRD Part 02 Progress section:

```markdown
### Task 005 - [DATE]
- Status: COMPLETED
- Summary: [Brief description of what was documented across all 5 files]
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-016.md` (~NNN lines — Product Analytics)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-017.md` (~NNN lines — Ad Spend Tracking & Attribution)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-018.md` (~NNN lines — Custom Reports / Report Builder)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-019.md` (~NNN lines — Customer Analytics)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-020.md` (~NNN lines — Shipping Cost Tracking Detailed)
```

Update cumulative progress:
```markdown
- [x] Task 6: Product Analytics - completed in Task 005
- [x] Task 7: Ad Spend Tracking & Attribution - completed in Task 005
- [x] Task 8: Custom Reports / Report Builder - completed in Task 005
- [x] Task 9: Customer Analytics - completed in Task 005
- [x] Task 10: Shipping Cost Tracking (Detailed) - completed in Task 005
```

Update remaining work section to reflect Tasks 11-20 still pending.

- [x] Checkpoint: Step 6 complete

## Acceptance Criteria
- [x] `beprofit-casestudy-info-016.md` exists with comprehensive product analytics documentation
- [x] `beprofit-casestudy-info-017.md` exists with ad spend tracking & attribution documentation (not duplicating file 007 connection content)
- [x] `beprofit-casestudy-info-018.md` exists with custom report builder documentation (not duplicating file 012 P&L content)
- [x] `beprofit-casestudy-info-019.md` exists with customer analytics / cohort analysis documentation
- [x] `beprofit-casestudy-info-020.md` exists with detailed shipping cost tracking documentation (not duplicating file 006 setup content)
- [x] PRD Part 02 progress updated for Tasks 6-10
- [x] All files follow established template format (Source, main sections, Inferred UI Elements, Data Model Implications, Limitations & Gaps, Relevance to Our Build)
- [x] Each file explicitly cross-references prior related files (007, 006, 012) to avoid duplication

## Help Center Articles to Browse

**Products category (5 articles):**
1. Products Overview
2. Single Product
3. Inventory
4. Products Returns
5. Products Analytics

**Marketing Analytics category (7 direct + ~12 subcategory = ~19 articles):**
1. Marketing Analytics Overview
2. Track sales through Ad Spend
3. Marketing Cost Allocation
4. Marketing By Country
5. Tracking Affiliate & Influencer ROAS
6. Removing Unwanted Ad Account Data
7. Excluding Ad Campaigns
8. Connect Your Ad Platforms (subcategory)
9. Exclude ad entities from dashboard calculations (subcategory)
10. Troubleshooting Marketing Platform Data (subcategory)
11. UTM Attribution Overview (subcategory)
12. UTM Attribution Setup (subcategory)
13. Identify Order UTMs (subcategory)
14. Attribute UTMs Manually (subcategory)
15. Create Custom Attribution Rules (subcategory)
16. Manage Affiliate UTMs & Expenses (subcategory)

**Reports category (3 articles — 2 not yet covered):**
1. Report Templates and Custom Reports
2. Create a Custom Report
3. Custom Metrics Creation for Plus Plan Members (Plus Plan category)

**Customer Lifetime Value category (2 articles):**
1. BeProfit Cohort Analysis Chart Guide
2. Cohort Analysis: Understanding Your Store's Customers

**Fulfillment category (7 articles):**
1. Dynamic Fulfillment Rules
2. Setting Up Order Item Quantity-Based Tiered Rates
3. Fulfillment profiles in BeProfit
4. Create Fulfillment Profile
5. Create a shipping profile (Legacy)
6. Is tax/VAT included in shipping costs?
7. Connect Fulfillment Platforms

**Costs & Expenses (1 relevant article):**
1. Custom Fulfillment Expenses

**Estimated total articles to browse: ~35 articles**

## Notes
- PRD Part 02 has 20 tasks total. Task 004 completed 5 (25%). This task covers 5 more (50% cumulative).
- The remaining 10 tasks (11-20) will need 2 more tasks to complete.
- The next task (006) should cover Tasks 11-15: Tax Handling, Multi-Store & Multi-Currency, Data Export & Scheduled Reports, Alerts & Notifications, Goals & Targets.
- Ad Spend Tracking (file 017) will be the largest file in this batch due to the ~19 Marketing Analytics articles to process.
- Customer Analytics (file 019) may be thinner due to only 2 Help Center articles in the category — supplement with marketing site claims and cross-references.
- The "Report Order Profit to Meta" article and "Troubleshooting Ad Platform Connection Issues" may need to be browsed but may contain more connection/setup content than analytics content — use judgment on what goes in file 017 vs cross-referencing file 007.

---
## Completion

**Status:** COMPLETED
**Date:** 2026-02-12
**PRD Part:** 02
**Summary:** Deep-dive research into BeProfit's analytics and reporting features covering 5 core areas: Product Analytics (Contribution Profit as primary metric, variant drill-down, inventory value/cost tracking, return rate analysis), Ad Spend Tracking & Attribution (4-channel marketing hub, hierarchical drill-down, modified last-click attribution, CAC/CPA allocation, affiliate tracking), Custom Reports / Report Builder (two-step builder with date-grouping dependency, scheduling, Plus Plan custom metrics), Customer Analytics (cohort analysis with break-even visualization, 4 base metrics, accumulated/marginal modes), and Shipping Cost Tracking (6-method system, fulfillment profiles, 10 platform integrations, Net Shipping metric).

### Requirements Completed by This Task
- [x] Task 6: Product Analytics — documented in beprofit-casestudy-info-016.md (373 lines)
- [x] Task 7: Ad Spend Tracking & Attribution — documented in beprofit-casestudy-info-017.md (453 lines)
- [x] Task 8: Custom Reports / Report Builder — documented in beprofit-casestudy-info-018.md (362 lines)
- [x] Task 9: Customer Analytics — documented in beprofit-casestudy-info-019.md (320 lines)
- [x] Task 10: Shipping Cost Tracking (Detailed) — documented in beprofit-casestudy-info-020.md (487 lines)

### PRD Status After This Task
- Requirements completed by this task: 5 (Tasks 6-10)
- Total PRD requirements completed (cumulative): 10 of 20 (50%)
- Requirements remaining: 10 (Tasks 11-20)
- PRD completion: ONGOING
