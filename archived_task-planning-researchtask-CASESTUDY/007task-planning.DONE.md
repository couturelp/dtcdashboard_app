# Task 007 - PRD Part 02 (Batch 4) — Inventory Tracking, Team & Collaboration, API & Webhooks, Mobile App & White-Label, Checkpoint Review #2

## PRD Reference
- **PRD Part:** 02
- **PRD File:** prd/detailed_prd_part_02.md
- **Requirements Addressed:** Tasks 16-20 of PRD Part 02 (Inventory Tracking, Team & Collaboration Features, API & Webhook Documentation, Mobile App & White-Label Features, Checkpoint Review #2)

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-12

## Purpose
Complete all remaining PRD Part 02 requirements. This task covers the final 5 of 20 research deliverables: platform infrastructure features (inventory tracking, team/collaboration, API/webhooks, mobile/partner features) plus the second checkpoint review synthesizing all 20 files from PRD Part 02. Completing this task will mark PRD Part 02 as DONE.

## Scope

### What This Task WILL Do (5 items)
1. Research and document Inventory Tracking → `beprofit-casestudy-info-026.md`
2. Research and document Team & Collaboration Features → `beprofit-casestudy-info-027.md`
3. Research and document API & Webhook Documentation → `beprofit-casestudy-info-028.md`
4. Research and document Mobile App & White-Label Features → `beprofit-casestudy-info-029.md`
5. Write Checkpoint Review #2 synthesizing all PRD Part 02 research → `beprofit-casestudy-info-030.md`

### What This Task Will NOT Do (Left for Later Tasks)
- All PRD Part 02 requirements will be completed by this task. No remaining work for PRD Part 02.
- PRD Part 03 and beyond are out of scope.

## Files to READ (Context)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-001.md` — Help Center IA mapping (article URLs)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-010.md` — Checkpoint Review #1 (methodology, template adjustments)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-016.md` — Product Analytics (cross-reference for inventory)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-022.md` — Multi-Store & Multi-Currency (cross-reference for workspace/team architecture)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-023.md` — Data Export & Scheduled Reports (cross-reference for API access)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-024.md` — Alerts & Notifications (cross-reference for mobile push)
- `prd/manually-added-dump-from-real-dashboard.md` — Real dashboard visual inventory (Settings pages, Workspace tab, Shop tab)

## Files to CREATE
1. `dtcdashboard_app/casestudy/beprofit-casestudy-info-026.md` — Inventory Tracking
2. `dtcdashboard_app/casestudy/beprofit-casestudy-info-027.md` — Team & Collaboration Features
3. `dtcdashboard_app/casestudy/beprofit-casestudy-info-028.md` — API & Webhook Documentation
4. `dtcdashboard_app/casestudy/beprofit-casestudy-info-029.md` — Mobile App & White-Label Features
5. `dtcdashboard_app/casestudy/beprofit-casestudy-info-030.md` — Checkpoint Review #2

## Implementation Steps

### Step 1: Research Inventory Tracking (File 026)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-026.md` (CREATE)

Browse the following Help Center articles:
- https://help.runviably.com/beprofit/inventory-beprofit-help-center (Inventory — Products Reports and Analytics subcategory)
- https://help.runviably.com/beprofit/products-overview-beprofit-help-center (Products Overview — cross-reference for inventory views within products)
- https://help.runviably.com/beprofit/products-analytics-beprofit-help-center (Products Analytics — cross-reference for inventory metrics)

Also browse for inventory-related content:
- Search Help Center for: "inventory", "stock", "reorder", "depletion", "valuation"
- Search BeProfit marketing site for: inventory tracking, stock management, inventory valuation
- Cross-reference `prd/manually-added-dump-from-real-dashboard.md` — the Shop settings has "Production Methods" card with subtitle "Set your inventory strategy"

**NOTE:** File 016 (Product Analytics) already documented the Inventory page at a high level — "dual value/cost tracking and stock depletion projections." This file (026) must go DEEPER on inventory-specific features without duplicating file 016's product analytics content. Focus on: inventory valuation methodology, stock-level monitoring, reorder capabilities, inventory history, and how inventory data feeds into profit calculations.

**Document structure:**

```markdown
# BeProfit Inventory Tracking Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Inventory Tracking
- **Date Captured:** [date]

---

## Inventory Page Overview
[Document the dedicated Inventory page — where it lives in navigation (Products → Inventory), what data it shows, primary table/list view]

### Inventory Data Fields
[Document all columns/metrics shown on the inventory page — product name, variant, SKU, stock quantity, inventory value, cost per unit, reorder point]

### Inventory Valuation Methods
[Document how inventory value is calculated — FIFO, LIFO, weighted average, or simple multiplication of units × cost. How does this tie to COGS settings?]

## Stock-Level Monitoring
[Document real-time stock level tracking — is it synced from Shopify/platform, manual entry, or both?]

### Stock Depletion Projections
[Document the "stock depletion projections" feature noted in file 016 — methodology, time horizon, visualization]

### Low Stock Alerts
[Document any low-stock or out-of-stock alerting — thresholds, notification channels, if this feature exists]

## Inventory & Profit Calculation Interaction
[Document how inventory data feeds into profit calculations — inventory as a cost, unsold inventory treatment, write-downs]

## Production Methods Setting
[Document the "Production Methods" shop setting from the dashboard dump — how it affects inventory tracking (dropshipping vs manufacturing vs print-on-demand)]

### Industries Setting
[Brief note on the "Industries" shop setting and how it relates to inventory benchmarks]

## Inventory History & Trends
[Document historical inventory views — stock level over time, inventory value over time, seasonal patterns]

## Inventory Import/Export
[Document how inventory data can be imported (CSV, platform sync) or exported]

## Inferred UI Elements
[Inventory table, stock level indicators, depletion charts, production method selector]

## Data Model Implications
[Product → Variant → InventoryLevel relationship, stock as a time-series, valuation methodology as configuration]

## Limitations & Gaps
[What couldn't be determined — no warehouse management, no multi-location inventory, no purchase order tracking]

## Relevance to Our Build
[7-10 actionable insights for inventory tracking in our product]
```

**Key research questions:**
- Is inventory tracking a dedicated feature or just a data display from Shopify?
- Does BeProfit calculate inventory valuation independently?
- Are there stock depletion projections, and what methodology do they use?
- How does the "Production Methods" setting affect inventory views?
- Can users set reorder points or receive low-stock alerts?
- Is inventory tracking available on all plans or gated?

- [x] Checkpoint: Step 1 complete

### Step 2: Research Team & Collaboration Features (File 027)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-027.md` (CREATE)

Browse the following Help Center articles:
- https://help.runviably.com/beprofit/adding-team-members-to-your-beprofit-account (Adding Team Members — General category)
- https://help.runviably.com/beprofit/beprofit-data-protection-beprofit-help-center (BeProfit Data Protection — Profit Dashboard category, may cover access controls)

Also browse for team/collaboration-related content:
- Search Help Center for: "team", "teammate", "invite", "permission", "role", "admin", "collaboration", "share"
- Search BeProfit marketing site for: team features, collaboration, multi-user, roles, permissions
- Cross-reference `prd/manually-added-dump-from-real-dashboard.md` — the Settings → Workspace tab shows Teammates section with Name/Status/Permissions columns, and "Invite New Teammate" button

**NOTE:** File 022 (Multi-Store & Multi-Currency) documented the Workspace → Shop architecture. The Teammates section is at the workspace level. This file should focus exclusively on team management — roles, permissions, invitation flow, collaboration features — without re-documenting the workspace architecture.

**Document structure:**

```markdown
# BeProfit Team & Collaboration Features Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Core Feature / Team & Collaboration
- **Date Captured:** [date]

---

## Multi-User Support Overview
[Document team support — workspace-level team management, confirmed from dashboard dump]

### Team Member Invitation Flow
[Document how to invite team members — email-based invitations, the "Invite New Teammate" CTA, invitation acceptance process]

### Invitation Status Tracking
[Document the Status column from the Teammates table — Active, Pending, Declined, etc.]

## Roles & Permissions System
[Document the permissions system — what roles exist (Admin, Viewer, etc.), what each role can and cannot do]

### Role Types
[Table of available roles with their capabilities]

### Permission Granularity
[Document granularity — is it page-level, feature-level, shop-level? Can a teammate be restricted to specific shops within a workspace?]

### Data Access Controls
[Document what data is visible/hidden by role — financial data, cost data, marketing data]

## Team Management Administration
[Document team management — removing teammates, changing roles, audit trails]

### Teammate Limit per Plan
[Document if there are limits on number of teammates per plan tier]

## Collaboration Features
[Document any collaboration features beyond access control — shared views, comments, annotations, shared reports]

### Shared Reports & Dashboards
[Document whether reports/dashboards can be shared with teammates or external users]

## Data Protection & Security
[Document data protection features from the BeProfit Data Protection article — encryption, access logging, data isolation]

## Inferred UI Elements
[Teammates table, invite modal, role selector dropdown, permission checkboxes, status badges]

## Data Model Implications
[Workspace → Teammate → Role relationship, permission as a role property or granular ACL, invitation as an entity]

## Limitations & Gaps
[What couldn't be determined — no granular permissions, limited roles, no comments/collaboration, no audit trail]

## Relevance to Our Build
[7-10 actionable insights for team features in our product]
```

**Key research questions:**
- What roles are available (just Admin/Viewer, or more granular)?
- Can permissions be set per-shop within a workspace?
- Is there a teammate limit per plan tier?
- Are there any collaboration features beyond access control (comments, shared views)?
- Does BeProfit have audit logging for team actions?
- How does BeProfit handle data protection (encryption, GDPR, etc.)?

- [x] Checkpoint: Step 2 complete

### Step 3: Research API & Webhook Documentation (File 028)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-028.md` (CREATE)

Browse the following Help Center articles and sources:
- Search Help Center for: "API", "webhook", "integration", "FTP", "developer", "programmatic"
- https://help.runviably.com/beprofit/beprofit-faq (FAQ — may mention API or developer access)
- https://help.runviably.com/beprofit/custom-metrics-creation-for-plus-plan-members (Plus Plan — Custom Metrics, may reference API capabilities)
- Search BeProfit marketing site for: API, developer documentation, integrations, webhooks, FTP
- Search broader web for: "BeProfit API", "BeProfit developer", "BeProfit webhook", "BeProfit integration"

Also cross-reference dashboard dump:
- Settings → Costs tab shows "API Access" card with subtitle "Update costs over API"
- Settings → Costs tab shows "FTP Integration" card with subtitle "Sync order related costs using an FTP"

**NOTE:** File 023 (Data Export & Scheduled Reports) already noted that API Access exists for cost INPUT only — no public API for data retrieval was found. This file should go DEEPER: attempt to find any developer documentation, REST endpoints, authentication methods, rate limits, and the FTP integration details. Also investigate whether any third-party integrations (Zapier, Make/Integromat) exist that could expose API-like functionality.

**Document structure:**

```markdown
# BeProfit API & Webhook Documentation

## Source
- **URLs:** [list all browsed URLs and searches performed]
- **Category:** Core Feature / API & Webhooks
- **Date Captured:** [date]

---

## API Overview
[Document what API capabilities exist — confirmed "API Access" for cost updates from dashboard dump]

### API Purpose & Scope
[Document that API is for cost INPUT (not data retrieval) — what specific cost types can be updated via API]

### API Authentication
[Document authentication method — API key, OAuth, token-based. Where is the API key generated (Settings → Costs → API Access)?]

### API Endpoints
[Document any known endpoints — cost update endpoints, product cost endpoints, expense endpoints]

### Rate Limits & Constraints
[Document any rate limits, payload size limits, or usage constraints]

### API Documentation Location
[Document whether BeProfit has external API docs (Swagger, Postman collection, developer portal) or if the only documentation is the Settings page]

## FTP Integration
[Document the FTP integration feature from the dashboard dump]

### FTP Purpose & Scope
[Document what data can be synced via FTP — "Sync order related costs using an FTP"]

### FTP Configuration
[Document setup process — FTP server credentials, file format requirements, sync schedule]

### Supported File Formats
[Document accepted file formats for FTP uploads — CSV, XML, JSON, etc.]

## Webhook Functionality
[Document whether BeProfit offers outbound webhooks — event triggers, payload format, delivery guarantees]

### Inbound vs Outbound Integration
[Clarify that BeProfit appears to have inbound integration (receive cost data) but may lack outbound integration (push data out)]

## Third-Party Integration Platforms
[Document any Zapier, Make/Integromat, or other iPaaS integrations]

### Google Sheets Integration
[Brief cross-reference to Google Sheets sync capabilities documented in earlier files — this is BeProfit's most prominent non-API integration method]

## Developer Experience Assessment
[Assess the overall developer experience — is there a developer portal, SDKs, code samples, community?]

## Inferred UI Elements
[API key generation page, FTP configuration form, connection test button]

## Data Model Implications
[API as a cost input channel alongside manual/CSV/integration, FTP as batch processing]

## Limitations & Gaps
[Key gap analysis — no data retrieval API, no webhooks, no real-time streaming, limited developer documentation]

## Relevance to Our Build
[7-10 actionable insights — API as a significant differentiation opportunity]
```

**Key research questions:**
- What specific data can be updated via the API (product costs only, or also expenses, orders)?
- Is there external API documentation (Swagger, developer portal)?
- What authentication method does the API use?
- Does the FTP integration support scheduled syncs or one-time uploads?
- Are there any Zapier/Make integrations?
- Does BeProfit offer any outbound webhooks (data push)?
- Is API access available on all plans or gated to higher tiers?

- [x] Checkpoint: Step 3 complete

### Step 4: Research Mobile App & White-Label Features (File 029)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-029.md` (CREATE)

Browse the following Help Center articles:
- https://help.runviably.com/beprofit/track-profit-on-your-mobile-device-beprofit-help-center (Track Profit on your Mobile Device — Profit Dashboard category)
- https://help.runviably.com/beprofit/become-a-partner (Become a BeProfit Partner — General category, may describe agency/white-label program)

Also browse for mobile and partner-related content:
- Search Help Center for: "mobile", "app", "iOS", "Android", "phone", "tablet"
- Search Help Center for: "partner", "agency", "white-label", "reseller"
- Search app stores: "BeProfit" on Apple App Store, Google Play Store (via web search)
- Search BeProfit marketing site for: mobile app, partner program, agency features, white-label
- Search broader web for: "BeProfit mobile app", "BeProfit partner program", "BeProfit agency"

**NOTE:** The Checkpoint Review #1 (file 010) noted that mobile experience is "largely unknown." The Help Center has one article about mobile profit tracking. The real dashboard dump shows the left sidebar includes a trial counter and navigation that would need to adapt to mobile. This file should document everything discoverable about mobile capabilities, plus any partner/agency/white-label features.

**Document structure:**

```markdown
# BeProfit Mobile App & White-Label Features Documentation

## Source
- **URLs:** [list all browsed URLs and searches performed]
- **Category:** Core Feature / Mobile & Partner Features
- **Date Captured:** [date]

---

## Mobile App Overview
[Document whether BeProfit has a native mobile app, PWA, or responsive web experience]

### Platform Availability
[Document iOS and Android availability — app store listings, ratings, last updated, download count]

### Mobile Feature Set
[Document what features are available on mobile — dashboard view, P&L, order tracking, notifications]

### Mobile vs Desktop Feature Parity
[Document differences between mobile and desktop — which features are mobile-only, desktop-only, or shared]

### Mobile Push Notifications
[Document whether mobile app supports push notifications — what triggers them, configuration options]

## Mobile UX Analysis
[Document the mobile user experience — navigation patterns, data visualization on small screens, touch interactions]

### Mobile Dashboard
[Document the mobile dashboard layout — is it the same widgets as desktop, simplified, or different?]

## White-Label / Agency Features
[Document any white-label or agency-specific features]

### Partner Program
[Document the BeProfit Partner program — what it offers, who it's for, benefits, requirements]

### Agency Multi-Store Management
[Document any agency-specific features for managing multiple client stores — cross-reference file 022 workspace architecture]

### Branded Reports
[Document whether reports can be branded/white-labeled for client delivery]

## Inferred UI Elements
[Mobile navigation (hamburger menu, bottom tabs), touch-optimized controls, simplified views]

## Data Model Implications
[Mobile-specific data considerations — offline caching, push notification tokens, reduced data payloads]

## Limitations & Gaps
[What couldn't be determined — mobile feature depth, offline capabilities, partner program details]

## Relevance to Our Build
[7-10 actionable insights — mobile-first design opportunities, partner program as growth channel]
```

**Key research questions:**
- Does BeProfit have a native iOS/Android app or just responsive web?
- What features are available on mobile?
- Does mobile support push notifications?
- What is the BeProfit Partner program (agency? referral? white-label?)?
- Can agencies manage multiple client stores with branded reporting?
- Is the mobile experience a significant gap for BeProfit?

- [x] Checkpoint: Step 4 complete

### Step 5: Write Checkpoint Review #2 (File 030)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-030.md` (CREATE)

This is a META-ANALYSIS file synthesizing all PRD Part 02 research (files 011-029). Follow the same structure as Checkpoint Review #1 (file 010) but adapted for the core features batch.

**Required inputs:** Read files 011 through 029 (19 files) and synthesize.

**Document structure:**

```markdown
# Checkpoint Review #2 — Core Features Research (PRD Part 02)

## Source
- **Primary Sources:** beprofit-casestudy-info-011.md through 029.md
- **Category:** Meta-Analysis / Checkpoint Review
- **Date Captured:** [date]

---

## Coverage Assessment

### PRD Part 02 Requirements

| Task | Requirement | File | Status | Depth Rating |
|------|------------|------|--------|--------------|
| 1 | Dashboard / Home Screen | 011 | Complete | [rating] |
| 2 | Profit & Loss Reports | 012 | Complete | [rating] |
| ... | ... | ... | ... | ... |
| 20 | Checkpoint Review #2 | 030 | This file | — |

## Gap Analysis

### Information Gaps Identified
[Document what couldn't be determined across all 19 research files — similar to file 010's gap analysis]

### Topics That Need Deeper Research
[What should be investigated in later PRDs — marketing site analysis, competitive intelligence, user reviews, etc.]

## Key Discoveries & Surprises
[Top 10-15 unexpected findings from the core features research — similar to file 010's format]

## Quality of Sources
[Assess Help Center coverage for core features vs onboarding — was documentation richer, thinner, or comparable?]

## Feature Completeness Matrix
[Table summarizing all 20 features documented, with completeness assessment for each — could an engineer rebuild this feature from the documentation?]

| Feature | Docs Quality | Build-Ready? | Key Gaps |
|---------|-------------|-------------|----------|
| Dashboard | High | Yes | Visual design details |
| P&L Reports | High | Yes | Custom report internals |
| ... | ... | ... | ... |

## BeProfit Strengths Summary
[Consolidated list of BeProfit's product strengths identified across all 19 files]

## BeProfit Weaknesses Summary
[Consolidated list of BeProfit's product weaknesses and gaps identified across all 19 files — these are our differentiation opportunities]

## Statistics
[Total files, total lines, articles browsed, limitations documented, actionable insights generated]

## Relevance to Our Build — Top 15 Takeaways
[The most important competitive intelligence insights from all core feature research — prioritized and actionable]
```

**Key synthesis activities:**
- Count total lines across files 011-029
- Identify recurring themes in "Limitations & Gaps" sections
- Consolidate all "Relevance to Our Build" insights into prioritized top-15 list
- Assess which features have sufficient documentation to rebuild vs which need more research
- Identify BeProfit's strongest and weakest feature areas
- Document methodology improvements learned during this batch

- [x] Checkpoint: Step 5 complete

### Step 6: Update PRD Part 02 Progress & Mark Complete
**Files:** `prd/detailed_prd_part_02.md` (MODIFY — Progress section only)

After completing files 026-030, update the PRD Part 02 Progress section:

```markdown
### Task 007 - [DATE]
- Status: COMPLETED
- Summary: [Brief description of all 5 files created]
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-026.md` (~NNN lines — Inventory Tracking)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-027.md` (~NNN lines — Team & Collaboration Features)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-028.md` (~NNN lines — API & Webhook Documentation)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-029.md` (~NNN lines — Mobile App & White-Label Features)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-030.md` (~NNN lines — Checkpoint Review #2)
```

Update cumulative progress to mark ALL 20 tasks complete:
```markdown
- [x] Task 16: Inventory Tracking - completed in Task 007
- [x] Task 17: Team & Collaboration - completed in Task 007
- [x] Task 18: API & Webhooks - completed in Task 007
- [x] Task 19: Mobile App & White-Label - completed in Task 007
- [x] Task 20: Checkpoint Review #2 - completed in Task 007
```

Update remaining work section:
```markdown
### Remaining Work for This PRD
None — all 20 tasks complete. PRD Part 02 is DONE.
```

- [x] Checkpoint: Step 6 complete

## Help Center Articles to Browse

**Products → Products Reports and Analytics (1 article):**
1. Inventory — https://help.runviably.com/beprofit/inventory-beprofit-help-center

**Products → Products Reports and Analytics (2 cross-reference articles):**
1. Products Overview — https://help.runviably.com/beprofit/products-overview-beprofit-help-center
2. Products Analytics — https://help.runviably.com/beprofit/products-analytics-beprofit-help-center

**General (1 article):**
1. Adding Team Members to Your BeProfit Account — https://help.runviably.com/beprofit/adding-team-members-to-your-beprofit-account

**Profit Dashboard (2 articles):**
1. BeProfit Data Protection — https://help.runviably.com/beprofit/beprofit-data-protection-beprofit-help-center
2. Track Profit on your Mobile Device — https://help.runviably.com/beprofit/track-profit-on-your-mobile-device-beprofit-help-center

**General (1 article):**
1. Become a BeProfit Partner — https://help.runviably.com/beprofit/become-a-partner

**Plus Plan (1 article):**
1. Custom Metrics Creation for Plus Plan Members — https://help.runviably.com/beprofit/custom-metrics-creation-for-plus-plan-members

**FAQs (1 article):**
1. BeProfit FAQ — https://help.runviably.com/beprofit/beprofit-faq

**Estimated total articles to browse: ~10 primary articles + broader web research for API, mobile app stores, and partner program. File 030 (Checkpoint Review #2) requires reading all 19 previous files (011-029) for synthesis.**

## Acceptance Criteria
- [x] `beprofit-casestudy-info-026.md` exists with inventory tracking documentation covering inventory page, valuation methods, stock monitoring, depletion projections, production methods setting
- [x] `beprofit-casestudy-info-027.md` exists with team & collaboration documentation covering invitation flow, roles/permissions system, data protection, collaboration features
- [x] `beprofit-casestudy-info-028.md` exists with API & webhook documentation covering API Access scope (cost input), authentication, FTP integration, third-party platform integrations, outbound webhook assessment
- [x] `beprofit-casestudy-info-029.md` exists with mobile app & white-label documentation covering mobile platform availability, feature parity, partner program, agency features
- [x] `beprofit-casestudy-info-030.md` exists as Checkpoint Review #2 with coverage assessment matrix, gap analysis, key discoveries, feature completeness matrix, strengths/weaknesses, and top-15 actionable insights
- [x] PRD Part 02 progress updated for Tasks 16-20, showing all 20 tasks complete
- [x] All files follow established template format (Source, main sections, Inferred UI Elements, Data Model Implications, Limitations & Gaps, Relevance to Our Build)
- [x] Each file explicitly cross-references prior related files to avoid duplication

## Notes
- PRD Part 02 has 20 tasks total. Tasks 004-006 completed 15 (75%). This task completes the remaining 5 (100%).
- After this task, PRD Part 02 should be marked as .DONE.
- Tasks 16 (Inventory) has 1 dedicated article plus cross-references from file 016.
- Task 17 (Team & Collaboration) has 1 article + dashboard dump showing Teammates section with Permissions column.
- Task 18 (API & Webhooks) has NO dedicated articles — this is likely a gap analysis supplemented by dashboard dump showing API Access and FTP Integration cards.
- Task 19 (Mobile) has 1 article + app store research. Partner program has 1 article.
- Task 20 (Checkpoint Review #2) is a synthesis file requiring reading all 19 prior files.
- The dashboard dump (`prd/manually-added-dump-from-real-dashboard.md`) is especially valuable for Tasks 16-18 since it shows Settings → Shop tab (Production Methods, Industries, Notification Management) and Settings → Costs tab (API Access, FTP Integration) which have minimal Help Center documentation.
