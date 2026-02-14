# PRD Part 01: Help Center — Getting Started, Onboarding & Account Setup

## Overview
Systematically crawl the BeProfit Help Center (https://help.runviably.com/beprofit) starting with all getting started, onboarding, and account setup documentation. This is the foundation — understanding how new users are introduced to the product reveals the core value proposition and primary workflows.

## Output Files
`beprofit-casestudy-info-001.md` through `beprofit-casestudy-info-010.md`

## Tasks

### Task 1: Help Center Landing Page Mapping
- Browse https://help.runviably.com/beprofit
- Document every category and subcategory listed on the main page
- Map the full information architecture of the help center
- Note article counts per category
- Capture the navigation structure and hierarchy
- **Output:** `beprofit-casestudy-info-001.md`

### Task 2: Getting Started / Quick Start Guides
- Find and read all "Getting Started" or "Quick Start" articles
- Document the recommended onboarding sequence
- Capture step-by-step setup workflows
- Note what actions are required vs optional during setup
- Document any "first run" experience details
- **Output:** `beprofit-casestudy-info-002.md`

### Task 3: Account Creation & Setup
- Document account creation process and requirements
- Capture any plan selection during signup
- Note authentication methods (email, Google, Shopify OAuth, etc.)
- Document initial configuration wizard steps if any
- **Output:** `beprofit-casestudy-info-003.md`

### Task 4: Store Connection & Initial Data Sync
- Document how users connect their first e-commerce store
- Capture the data sync process (what happens after connecting)
- Note sync duration expectations, what data is pulled
- Document any manual steps required after initial sync
- **Output:** `beprofit-casestudy-info-004.md`

### Task 5: COGS (Cost of Goods Sold) Initial Setup
- Document COGS setup options (manual entry, CSV upload, auto-sync)
- Capture the CSV template format if documented
- Note default values and handling of missing cost data
- Document per-product vs bulk cost assignment
- **Output:** `beprofit-casestudy-info-005.md`

### Task 6: Shipping Cost Setup
- Document shipping cost configuration options
- Capture estimation methods vs actual cost tracking
- Note integration with shipping platforms
- Document how shipping costs factor into profit calculations
- **Output:** `beprofit-casestudy-info-006.md`

### Task 7: Ad Platform Connection Setup
- Document how users connect ad platforms (Facebook, Google, TikTok, etc.)
- Capture the OAuth/API connection flow for each platform
- Note what ad data is synced and at what granularity
- Document attribution model details
- **Output:** `beprofit-casestudy-info-007.md`

### Task 8: Other Onboarding Configurations
- Document any remaining onboarding steps (tax setup, currency, team invites, etc.)
- Capture notification/alert setup
- Note any "recommended next steps" after initial setup
- **Output:** `beprofit-casestudy-info-008.md`

### Task 9: Onboarding UX Analysis
- Analyze the implied onboarding flow from documentation
- Document the sequence of screens/steps a new user goes through
- Note any gamification, progress indicators, or completion incentives
- Capture empty states and what users see before data is loaded
- **Output:** `beprofit-casestudy-info-009.md`

### Task 10: Checkpoint Review #1
- Perform the first structured checkpoint review
- Assess coverage of getting started / onboarding topics
- Identify any gaps in documentation gathered so far
- Plan adjustments for next batch of files
- Document discoveries and surprises
- **Output:** `beprofit-casestudy-info-010.md`

## Capture Checklist Per Article
For every help article read, capture:
- [ ] Feature or setting being described
- [ ] Step-by-step workflows
- [ ] Screenshot descriptions (infer UI from context)
- [ ] Configuration options and defaults
- [ ] Limitations, caveats, known issues
- [ ] Integration-specific instructions
- [ ] Plan/tier feature gating mentions
- [ ] Internal links to related articles

## Progress

### Task 001 - 2026-02-12
- Status: COMPLETED
- Summary: Mapped the complete Help Center information architecture (21 categories, ~100 articles) and documented the first 5 onboarding topics: Getting Started guides, Account Creation & Setup (10-step signup flow), Store Connection & Data Sync (4 platforms + 10 fulfillment integrations), and COGS Initial Setup (6 methods with priority hierarchy).
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-001.md` (540 lines — Help Center IA mapping)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-002.md` (230 lines — Getting Started / Quick Start)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-003.md` (276 lines — Account Creation & Setup)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-004.md` (256 lines — Store Connection & Data Sync)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-005.md` (374 lines — COGS Initial Setup)

### Task 002 - 2026-02-12
- Status: COMPLETED
- Summary: Completed all remaining PRD Part 01 research tasks: shipping cost configuration (6 methods, 10 fulfillment platforms), ad platform connections (5 platforms with OAuth flow, attribution model, cost allocation), other onboarding configurations (tax, currency, team, notifications, calculation preferences), onboarding UX analysis (reconstructed 19-step flow, identified "silent inaccuracy" problem as key gap), and Checkpoint Review #1 (coverage assessment, gap analysis, 10 key discoveries, methodology adjustments for PRD Part 02).
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-006.md` (334 lines — Shipping Cost Setup)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-007.md` (472 lines — Ad Platform Connection Setup)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-008.md` (451 lines — Other Onboarding Configurations)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-009.md` (280 lines — Onboarding UX Analysis)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-010.md` (195 lines — Checkpoint Review #1)

### Cumulative Progress (All Tasks)
- [x] Task 1: Help Center Landing Page Mapping - completed in Task 001
- [x] Task 2: Getting Started / Quick Start Guides - completed in Task 001
- [x] Task 3: Account Creation & Setup - completed in Task 001
- [x] Task 4: Store Connection & Initial Data Sync - completed in Task 001
- [x] Task 5: COGS Initial Setup - completed in Task 001
- [x] Task 6: Shipping Cost Setup - completed in Task 002
- [x] Task 7: Ad Platform Connection Setup - completed in Task 002
- [x] Task 8: Other Onboarding Configurations - completed in Task 002
- [x] Task 9: Onboarding UX Analysis - completed in Task 002
- [x] Task 10: Checkpoint Review #1 - completed in Task 002

### Remaining Work for This PRD
None — PRD Part 01 is COMPLETE.
