# Task 006 - PRD Part 02 (Batch 3) — Tax Handling, Multi-Store & Multi-Currency, Data Export, Alerts & Notifications, Goals & Targets

## PRD Reference
- **PRD Part:** 02
- **PRD File:** prd/detailed_prd_part_02.md
- **Requirements Addressed:** Tasks 11-15 of PRD Part 02 (Tax Handling, Multi-Store & Multi-Currency Support, Data Export & Scheduled Reports, Alerts & Notifications, Goals & Targets)

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-12

## Purpose
Continue the deep-dive research into BeProfit's core product features from the Help Center. This task covers the next 5 of 20 PRD Part 02 requirements, focusing on platform-level configuration features: how taxes factor into profit calculations, multi-store/multi-currency management, data export capabilities, alerting/notification systems, and goal-setting features. These represent the operational infrastructure that supports the core analytics features documented in Tasks 004 and 005.

## Scope

### What This Task WILL Do (5 items)
1. Research and document Tax Handling → `beprofit-casestudy-info-021.md`
2. Research and document Multi-Store & Multi-Currency Support → `beprofit-casestudy-info-022.md`
3. Research and document Data Export & Scheduled Reports → `beprofit-casestudy-info-023.md`
4. Research and document Alerts & Notifications → `beprofit-casestudy-info-024.md`
5. Research and document Goals & Targets → `beprofit-casestudy-info-025.md`

### What This Task Will NOT Do (Left for Later Tasks)
- Task 16: Inventory Tracking → `beprofit-casestudy-info-026.md`
- Task 17: Team & Collaboration Features → `beprofit-casestudy-info-027.md`
- Task 18: API & Webhook Documentation → `beprofit-casestudy-info-028.md`
- Task 19: Mobile App & White-Label Features → `beprofit-casestudy-info-029.md`
- Task 20: Checkpoint Review #2 → `beprofit-casestudy-info-030.md`

## Files to READ (Context)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-001.md` — Help Center IA mapping (for article URLs)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-010.md` — Checkpoint Review #1 (methodology notes and template adjustments)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-012.md` — P&L Reports (cross-reference for scheduled reports & export)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-014.md` — Profit Calculation Methodology (cross-reference for tax handling in calculations)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-018.md` — Custom Reports / Report Builder (cross-reference for export & scheduling)
- `prd/manually-added-dump-from-real-dashboard.md` — Real dashboard visual inventory

## Files to CREATE
1. `dtcdashboard_app/casestudy/beprofit-casestudy-info-021.md` — Tax Handling
2. `dtcdashboard_app/casestudy/beprofit-casestudy-info-022.md` — Multi-Store & Multi-Currency Support
3. `dtcdashboard_app/casestudy/beprofit-casestudy-info-023.md` — Data Export & Scheduled Reports
4. `dtcdashboard_app/casestudy/beprofit-casestudy-info-024.md` — Alerts & Notifications
5. `dtcdashboard_app/casestudy/beprofit-casestudy-info-025.md` — Goals & Targets

## Implementation Steps

### Step 1: Research Tax Handling (File 021)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-021.md` (CREATE)

Browse the following Help Center articles:
- https://help.runviably.com/beprofit/edit-tax-settings-beprofit-help-center (Edit Tax settings — Taxes category, only article)
- https://help.runviably.com/beprofit/setting-up-calculation-preferences-beprofit-help-center (Setting up Calculation Preferences — cross-reference tax-related preferences)
- https://help.runviably.com/beprofit/whats-affected-by-calculation-preferences-beprofit-help-center (What's affected by calculation preferences — cross-reference tax impact)
- https://help.runviably.com/beprofit/is-tax/vat-included-in-shipping-costs-beprofit-help-center (Tax/VAT in shipping costs — already partially covered in file 020, focus on the tax methodology here)

Also search the BeProfit marketing site and broader web for:
- Tax handling documentation, blog posts, or feature descriptions
- How BeProfit handles sales tax vs VAT vs no-tax regions
- Any jurisdiction-specific tax features

**NOTE:** The Taxes category has only 1 dedicated article ("Edit Tax settings"), which suggests either a simple feature or limited documentation. Supplement with Calculation Preferences articles (which likely contain tax-related settings) and cross-reference file 014 (Profit Calculation Methodology) which documented how taxes factor into the profit formula. Avoid duplicating content from file 014 or file 020.

**Document structure:**

```markdown
# BeProfit Tax Handling Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Tax Handling
- **Date Captured:** [date]

---

## Tax Settings Overview
[Document the tax settings page — what controls exist, where accessed (Settings menu path)]

### Tax Inclusion/Exclusion Settings
[Document the primary tax toggle — include/exclude taxes from profit calculations, how this affects all downstream metrics]

### Tax Types Supported
[Document what tax types are recognized — sales tax, VAT, GST, customs duties. Which are auto-detected vs manual]

## Tax in Profit Calculations
[Document how taxes flow through the profit formula — reference file 014's calculation chain but focus on the tax-specific behavior]

### Revenue-Side Tax Handling
[How taxes on revenue/sales are handled — included in Gross Sales or separated]

### Cost-Side Tax Handling
[How taxes on costs (COGS, shipping) are handled — are supplier taxes tracked separately]

## Multi-Jurisdiction Tax Handling
[Document how different tax rates across regions/countries are handled — auto-detection, manual override, per-order vs per-product]

## Tax Reporting Features
[Document any tax-specific reports or views — tax collected, tax paid, net tax position]

## Tax & Shipping Costs Interaction
[Brief cross-reference to file 020 for tax/VAT in shipping costs]

## Tax & Calculation Preferences
[Document which calculation preferences affect tax treatment — reference the two Calculation Preferences articles]

## Inferred UI Elements
[List settings toggles, dropdowns, tax configuration forms described in articles]

## Data Model Implications
[Tax as a property on orders, tax rates as configuration entities, relationship to regions/countries]

## Limitations & Gaps
[What couldn't be determined — e.g., no VAT registration number support, no tax filing exports]

## Relevance to Our Build
[7-10 actionable insights — minimum viable tax handling, what to simplify, what to expand]
```

**Key research questions to answer:**
- Is tax handling a simple include/exclude toggle, or does it support granular tax rate configuration?
- Does BeProfit auto-detect tax rates from Shopify/platform data, or require manual entry?
- How do Calculation Preferences interact with tax settings (which takes priority)?
- Is there any tax reporting beyond the P&L line item?
- How does multi-currency interact with tax calculations?

- [x] Checkpoint: Step 1 complete

### Step 2: Research Multi-Store & Multi-Currency Support (File 022)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-022.md` (CREATE)

Browse the following Help Center articles from the "Profit Tracking Across Markets, Countries and Shops" category:
- https://help.runviably.com/beprofit/connecting-navigating-multiple-shops-and-platforms-in-beprofit-beprofit-help-center (Connecting & Navigating Multiple Shops and Platforms)
- https://help.runviably.com/beprofit/multi-currencies-beprofit-help-center (Multi-currencies)
- https://help.runviably.com/beprofit/manage-multi-shops-in-one-or-few-workspaces-beprofit-help-center (Manage Multi shops in one or few Workspaces)

Also browse related articles:
- https://help.runviably.com/beprofit/what-are-sales-channels (What are Sales Channels? — General category)
- https://help.runviably.com/beprofit/change-store-name-in-beprofit (Change store name — indicates multi-store awareness)

Also search the BeProfit marketing site for:
- Multi-store management feature pages
- Multi-currency support documentation
- Workspace vs store hierarchy explanations

**Document structure:**

```markdown
# BeProfit Multi-Store & Multi-Currency Support Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Multi-Store & Multi-Currency
- **Date Captured:** [date]

---

## Multi-Store Management Overview
[Document the multi-store architecture — how multiple stores are connected and organized]

### Store Connection Flow
[Document the process of connecting additional stores — Shopify, WooCommerce, Amazon, etc.]

### Store Navigation / Switching
[Document how users switch between stores — UI controls, navigation patterns]

### Workspace Architecture
[Document the Workspace concept — one workspace per store? Multiple stores per workspace? Hierarchy.]

### Workspace vs Store Relationship
[Document the relationship model — many-to-one, one-to-one, configurable]

## Cross-Store Reporting & Aggregation
[Document whether data from multiple stores can be viewed together — aggregate dashboards, combined P&L, cross-store comparisons]

### Sales Channels
[Document how BeProfit defines "sales channels" and how they relate to stores/platforms — reference the General article]

## Multi-Currency Support
[Document currency handling in detail]

### Currency Detection & Configuration
[How currencies are detected — from platform data, manual setting, per-store]

### Currency Conversion Methodology
[Document conversion rates — real-time, daily, fixed? Source of exchange rates?]

### Display Currency
[Document display currency options — view in store currency, convert to base currency, user-selectable]

### Multi-Currency in Reports
[How multi-currency affects P&L, product analytics, marketing analytics — conversions applied at which level]

## Platform-Specific Multi-Store Behavior
[Document any differences between Shopify multi-store, WooCommerce multi-store, Amazon, etc.]

## Inferred UI Elements
[Store switcher, workspace management, currency settings, aggregation toggles]

## Data Model Implications
[Workspace → Store → Orders/Products hierarchy, currency as property on transactions, conversion rate storage]

## Limitations & Gaps
[What couldn't be determined — max stores per workspace, performance with many stores, etc.]

## Relevance to Our Build
[7-10 actionable insights for multi-store/currency architecture]
```

**Key research questions to answer:**
- What is the workspace-to-store relationship (1:1 or 1:many)?
- Can multiple stores be viewed in a single aggregated dashboard?
- Where do exchange rates come from (real-time API, daily snapshot, manual)?
- Can users set a "base currency" for reporting?
- How does multi-currency affect COGS (set in supplier currency vs store currency)?
- Are there additional costs (plan pricing) for adding more stores?

- [x] Checkpoint: Step 2 complete

### Step 3: Research Data Export & Scheduled Reports (File 023)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-023.md` (CREATE)

Browse the following Help Center articles:
- https://help.runviably.com/beprofit/how-can-i-export-my-data (How can I export my data? — Getting Started)
- https://help.runviably.com/beprofit/schedule-reports-beprofit-help-center (Schedule Reports — Reports category)
- https://help.runviably.com/beprofit/daily-profit-emails-in-beprofit (Daily Profit Emails — Reports category, partially covered in file 012)

Also browse for any API-related export documentation:
- https://help.runviably.com/beprofit/beprofit-faq (BeProfit FAQ — may mention API or bulk export)
- Search BeProfit marketing site for "API", "export", "data access", "integration"

**NOTE:** File 012 covered P&L report export and daily profit emails. File 018 covered custom report scheduling and export. This file (023) should consolidate and deepen the export/scheduling documentation — focusing on ALL export paths across the product (not just reports), API-based data access if it exists, and the complete scheduling system. Cross-reference files 012 and 018 to avoid duplication while providing a comprehensive single-reference document.

**Document structure:**

```markdown
# BeProfit Data Export & Scheduled Reports Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Data Export & Scheduling
- **Date Captured:** [date]

---

## Data Export Overview
[Consolidated view of ALL export capabilities across the entire product]

### Export by Page/Section
[Table mapping each page/section to its export capabilities]

| Page/Section | Export Formats | Plan Requirement | Bulk Support |
|-------------|---------------|-----------------|-------------|
| P&L Report | CSV, PDF | ... | ... |
| Orders | CSV | ... | ... |
| Products | CSV | ... | ... |
| Marketing | CSV | ... | ... |
| Custom Reports | CSV | ... | ... |

### Export Formats
[Document all available formats — CSV, PDF, Excel. Which pages support which formats.]

### Bulk Export
[Document bulk export capabilities — is there a "download all data" option? Plan restrictions?]

## Scheduled Reports System
[Consolidated documentation of the scheduling system across all report types]

### Schedule Configuration
[Document frequency options — Daily, Weekly, Monthly. Day/time selection. Timezone handling.]

### Recipients
[Document who can receive scheduled reports — email addresses, team members, external recipients]

### Scheduled Report Formats
[What format are scheduled reports delivered in — email body, CSV attachment, PDF attachment, link to dashboard]

### Daily Profit Emails
[Brief cross-reference to file 012's daily profit email documentation — the automated daily summary. Note the 21-day inactivity cutoff.]

## API-Based Data Access
[Document any public API for data access — endpoints, authentication, rate limits, data scope]

### API Availability
[Is there a documented public API? If not, note the absence and any hints from job postings or marketing site.]

### Third-Party Integrations for Data Export
[Google Sheets sync (already documented for COGS input — does it work for data OUTPUT?), Slack, email]

## Plan-Based Export Restrictions
[Document which export features are restricted by plan tier — free vs paid vs Plus]

## Inferred UI Elements
[Export buttons, scheduling modals, recipient lists, format selectors]

## Data Model Implications
[Scheduled report as an entity — frequency, recipients, format, report definition reference]

## Limitations & Gaps
[No API docs found, no Excel support, no real-time streaming, etc.]

## Relevance to Our Build
[7-10 actionable insights — export as table stakes, API as differentiator, scheduling as retention tool]
```

**Key research questions to answer:**
- What is the complete list of pages that support data export?
- Is there a centralized "data export" page, or is export only available per-page?
- Does BeProfit offer any public API for data access?
- Can scheduled reports be sent to non-BeProfit users (external email addresses)?
- Is Google Sheets used for data export (output), or only for data import (COGS input)?
- Are there any export volume limits (max rows, max date range)?
- What plan tier is required for full export capabilities?

- [x] Checkpoint: Step 3 complete

### Step 4: Research Alerts & Notifications (File 024)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-024.md` (CREATE)

Browse the following Help Center articles and sources:
- https://help.runviably.com/beprofit/daily-profit-emails-in-beprofit (Daily Profit Emails — already partially covered in files 012 and 023, but this is the closest to an "alert" feature)
- https://help.runviably.com/beprofit/beprofit-faq (FAQ — may mention notifications or alerts)
- Search Help Center for: "alert", "notification", "warning", "threshold"
- Search BeProfit marketing site for: alerts, notifications, Slack integration, mobile push notifications

Also check the dashboard documentation cross-reference:
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-011.md` — Dashboard (for any in-app notification indicators)
- `prd/manually-added-dump-from-real-dashboard.md` — Real dashboard screenshots (for any bell icons, notification badges, alert banners)

**NOTE:** There is no dedicated "Alerts & Notifications" category in the Help Center (based on file 001's IA mapping). This strongly suggests either: (a) alerts/notifications are a very limited feature, (b) they don't exist as a standalone feature, or (c) documentation is scattered across other articles. Be transparent about this gap. The main notification-like feature appears to be Daily Profit Emails.

**Document structure:**

```markdown
# BeProfit Alerts & Notifications Documentation

## Source
- **URLs:** [list all browsed URLs and searches performed]
- **Category:** Core Feature / Alerts & Notifications
- **Date Captured:** [date]

---

## Alerts & Notifications Overview
[Document what alert/notification capabilities exist — or document the ABSENCE of a robust alerting system]

## Daily Profit Emails (Primary Notification Feature)
[Brief summary cross-referencing file 012 — this appears to be BeProfit's primary "notification" mechanism]

### Email Notification Types
[Document all email-based notifications — daily profit, scheduled reports, account alerts, billing notices]

## In-App Notifications
[Document any in-app notification system — bell icon, notification drawer, banners, toasts]

### Onboarding / Setup Notifications
[Document any setup completion prompts, missing data warnings, connection status alerts]

### Data Quality Alerts
[Document any alerts about data accuracy issues, sync failures, missing COGS]

## Custom Alert Triggers
[Document whether users can set custom alerts — profit drops, cost spikes, ROAS thresholds. If this feature doesn't exist, document its absence explicitly.]

## Notification Channels
[Document available channels — email, in-app, Slack, SMS, mobile push. If limited to email + in-app, document that.]

## Third-Party Notification Integrations
[Document any Slack, Teams, or webhook notification integrations]

## Inferred UI Elements
[Notification settings page (if exists), email preference toggles, alert configuration (if exists)]

## Data Model Implications
[Notification preferences, alert rules (if they exist), delivery channel configuration]

## Limitations & Gaps
[Key gap analysis — what alerting features are MISSING from BeProfit that competitors or users would expect]

## Relevance to Our Build
[7-10 actionable insights — alerts as a differentiation opportunity, what users expect, what to build]
```

**Key research questions to answer:**
- Does BeProfit have a dedicated alerts/notifications system, or just daily profit emails?
- Can users set custom thresholds for alerts (e.g., "alert me if profit drops below X")?
- Is there a Slack integration for notifications?
- Are there mobile push notifications (relates to the mobile app in Task 19)?
- What in-app notifications exist (banners, toasts, notification drawer)?
- Is the absence of robust alerting a documented user complaint? (Check reviews)

- [x] Checkpoint: Step 4 complete

### Step 5: Research Goals & Targets (File 025)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-025.md` (CREATE)

Browse the following Help Center articles and sources:
- Search Help Center for: "goal", "target", "benchmark", "forecast", "budget"
- https://help.runviably.com/beprofit/track-your-real-time-data (Track Real-Time Profit — Profit Dashboard, may mention targets or benchmarks)
- https://help.runviably.com/beprofit/analyze-your-profit-breakdown-beprofit-help-center (Analyze Your Profit Breakdown — may reference goal lines on charts)
- Search BeProfit marketing site for: goals, targets, forecasting, budgets, planning
- Check `prd/manually-added-dump-from-real-dashboard.md` for any goal/target indicators in the real dashboard

**NOTE:** Like Alerts & Notifications, there is no dedicated "Goals & Targets" category in the Help Center. This feature may not exist, may be minimal, or may be undocumented. Be transparent about findings. If the feature doesn't exist, document its absence and analyze the competitive opportunity.

**Document structure:**

```markdown
# BeProfit Goals & Targets Documentation

## Source
- **URLs:** [list all browsed URLs and searches performed]
- **Category:** Core Feature / Goals & Targets
- **Date Captured:** [date]

---

## Goals & Targets Overview
[Document what goal-setting features exist — or document the ABSENCE of goal/target capabilities]

## Profit Targets
[Document any profit target setting — daily, weekly, monthly goals. UI for setting and tracking.]

## Revenue Goals
[Document any revenue goal features]

## Budget Management
[Document any budget-related features — marketing budget caps, expense budgets, COGS budgets]

## Progress Visualization
[Document how goal progress is shown — progress bars, goal lines on charts, percentage completion, color coding]

## Forecasting
[Document any forecasting or projection features — predicted profit based on trends, revenue projections]

## Benchmarking
[Document any industry benchmarking — "your margin is X% compared to industry average of Y%"]

## Comparison Features
[Document time-period comparison as a proxy for goal tracking — "this month vs last month" as implicit goal measurement]

## Inferred UI Elements
[Goal setting modals, target input fields, progress indicators (if they exist)]

## Data Model Implications
[Goal as an entity — metric, target value, time period, status]

## Limitations & Gaps
[Document what's missing — likely a significant gap area for BeProfit]

## Relevance to Our Build
[7-10 actionable insights — goals as a differentiation opportunity, what merchants need, competitive advantage]
```

**Key research questions to answer:**
- Does BeProfit have any explicit goal-setting feature?
- Can users set profit/revenue targets for time periods?
- Is there any budget management (e.g., marketing spend budgets)?
- Does BeProfit offer forecasting or projections?
- Are there any benchmark comparisons (industry averages, peer comparisons)?
- Is time-period comparison (this month vs last month) the closest thing to goal tracking?
- Is goal-setting a feature users have requested? (Check reviews)

- [x] Checkpoint: Step 5 complete

### Step 6: Update PRD Part 02 Progress
**Files:** `prd/detailed_prd_part_02.md` (MODIFY — Progress section only)

After completing files 021-025, update the PRD Part 02 Progress section:

```markdown
### Task 006 - [DATE]
- Status: COMPLETED
- Summary: [Brief description of what was documented across all 5 files]
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-021.md` (~NNN lines — Tax Handling)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-022.md` (~NNN lines — Multi-Store & Multi-Currency Support)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-023.md` (~NNN lines — Data Export & Scheduled Reports)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-024.md` (~NNN lines — Alerts & Notifications)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-025.md` (~NNN lines — Goals & Targets)
```

Update cumulative progress:
```markdown
- [x] Task 11: Tax Handling - completed in Task 006
- [x] Task 12: Multi-Store & Multi-Currency - completed in Task 006
- [x] Task 13: Data Export & Scheduled Reports - completed in Task 006
- [x] Task 14: Alerts & Notifications - completed in Task 006
- [x] Task 15: Goals & Targets - completed in Task 006
```

Update remaining work section to reflect Tasks 16-20 still pending (Inventory Tracking, Team & Collaboration, API & Webhooks, Mobile App & White-Label, Checkpoint Review #2). Note that one more task (Task 007) should complete PRD Part 02.

- [x] Checkpoint: Step 6 complete

## Help Center Articles to Browse

**Taxes category (1 article):**
1. Edit Tax settings

**Calculation Preferences category (2 articles — cross-reference for tax):**
1. Setting up Calculation Preferences
2. What's affected by calculation preferences?

**Profit Tracking Across Markets, Countries and Shops (3 articles):**
1. Connecting & Navigating Multiple Shops and Platforms in BeProfit
2. Multi-currencies
3. Manage Multi shops in one or few Workspaces

**General category (relevant articles):**
1. What are Sales Channels?
2. What if I want to change my store name?

**Getting Started (1 article):**
1. How can I export my data?

**Reports category (2 articles — may partially overlap with files 012/018):**
1. Schedule Reports
2. Daily Profit Emails in BeProfit

**FAQs (1 article):**
1. BeProfit FAQ

**Profit Dashboard (2 articles — for goals/targets cross-reference):**
1. Track Real-Time Profit, trends and Compare to Past Results
2. Analyze Your Profit Breakdown

**Estimated total articles to browse: ~15 primary articles + broader web research for Alerts and Goals topics**

## Acceptance Criteria
- [ ] `beprofit-casestudy-info-021.md` exists with tax handling documentation covering tax settings, inclusion/exclusion, multi-jurisdiction, and calculation preferences interaction
- [ ] `beprofit-casestudy-info-022.md` exists with multi-store & multi-currency documentation covering workspace architecture, store navigation, currency conversion, cross-store reporting
- [ ] `beprofit-casestudy-info-023.md` exists with consolidated data export documentation covering all export paths, formats, scheduling, and API access (cross-referencing files 012 and 018)
- [ ] `beprofit-casestudy-info-024.md` exists with alerts & notifications documentation (may be a gap analysis documenting the absence of robust alerting)
- [ ] `beprofit-casestudy-info-025.md` exists with goals & targets documentation (may be a gap analysis documenting the absence of goal-setting features)
- [ ] PRD Part 02 progress updated for Tasks 11-15
- [ ] All files follow established template format (Source, main sections, Inferred UI Elements, Data Model Implications, Limitations & Gaps, Relevance to Our Build)
- [ ] Each file explicitly cross-references prior related files to avoid duplication

## Notes
- PRD Part 02 has 20 tasks total. Tasks 004-005 completed 10 (50%). This task covers 5 more (75% cumulative).
- The remaining 5 tasks (16-20) will need 1 more task (Task 007) to complete PRD Part 02.
- Tasks 14 (Alerts) and 15 (Goals) are likely GAP ANALYSES — these features appear to have minimal or no dedicated Help Center documentation, suggesting they may be limited or absent in BeProfit. This is valuable competitive intelligence.
- Tax Handling (Task 11) has only 1 dedicated article but should be supplemented with Calculation Preferences articles and cross-references to file 014.
- Multi-Store & Multi-Currency (Task 12) has its own 3-article category plus relevant General articles — this should be a substantive file.
- Data Export (Task 13) consolidates export information scattered across multiple previous files into a single comprehensive reference.

---
## Completion

**Status:** COMPLETED
**Date:** 2026-02-12
**PRD Part:** 02
**Summary:** Researched and documented 5 BeProfit feature areas — Tax Handling (platform passthrough model), Multi-Store & Multi-Currency (Workspace→Shop architecture with auto-conversion), Data Export & Scheduled Reports (decentralized export, no public API), Alerts & Notifications (gap analysis — no alerting system), Goals & Targets (gap analysis — no goal-setting features). Created files 021-025 totaling 1,537 lines.

### Requirements Completed by This Task
- [x] Task 11: Tax Handling — documented platform-passthrough tax model, per-order editing, no multi-jurisdiction support
- [x] Task 12: Multi-Store & Multi-Currency — documented Workspace→Shop 1:N architecture, 4 platforms, currency conversion
- [x] Task 13: Data Export & Scheduled Reports — consolidated all export paths, scheduling system, API access (input only)
- [x] Task 14: Alerts & Notifications — gap analysis confirming no dedicated alerting system exists
- [x] Task 15: Goals & Targets — gap analysis confirming no goal-setting features, documented adjacent features

### PRD Status After This Task
- Requirements completed by this task: 5 (Tasks 11-15)
- Total PRD requirements completed (cumulative): 15 of 20 (75%)
- Requirements remaining: 5 (Tasks 16-20: Inventory Tracking, Team & Collaboration, API & Webhooks, Mobile App & White-Label, Checkpoint Review #2)
- PRD completion: ONGOING
