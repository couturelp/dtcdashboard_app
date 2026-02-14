# Task 001 - Help Center Mapping & Initial Onboarding Research

## PRD Reference
- **PRD Part:** 01
- **PRD File:** prd/detailed_prd_part_01.md
- **Requirements Addressed:**
  1. Task 1: Help Center Landing Page Mapping → `beprofit-casestudy-info-001.md`
  2. Task 2: Getting Started / Quick Start Guides → `beprofit-casestudy-info-002.md`
  3. Task 3: Account Creation & Setup → `beprofit-casestudy-info-003.md`
  4. Task 4: Store Connection & Initial Data Sync → `beprofit-casestudy-info-004.md`
  5. Task 5: COGS (Cost of Goods Sold) Initial Setup → `beprofit-casestudy-info-005.md`

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-12

## Purpose
Research and document the BeProfit Help Center structure and the first wave of onboarding documentation (getting started, account creation, store connection, COGS setup). This establishes the foundational understanding of BeProfit's product, onboarding flow, and core setup workflows that all subsequent research builds upon.

## Scope

### What This Task WILL Do (5 items)
- **Deliverable 1:** Map the complete Help Center information architecture — all categories, subcategories, article counts, and navigation structure → `beprofit-casestudy-info-001.md`
- **Deliverable 2:** Document all Getting Started / Quick Start guides — onboarding sequence, step-by-step workflows, required vs optional actions → `beprofit-casestudy-info-002.md`
- **Deliverable 3:** Document account creation process — signup flow, plan selection, auth methods, initial config → `beprofit-casestudy-info-003.md`
- **Deliverable 4:** Document store connection & data sync — how users connect e-commerce stores, what data is pulled, sync expectations → `beprofit-casestudy-info-004.md`
- **Deliverable 5:** Document COGS setup — manual entry, CSV upload, auto-sync, template formats, default handling → `beprofit-casestudy-info-005.md`

### What This Task Will NOT Do (Left for Later Tasks)
- Task 6: Shipping Cost Setup → `beprofit-casestudy-info-006.md`
- Task 7: Ad Platform Connection Setup → `beprofit-casestudy-info-007.md`
- Task 8: Other Onboarding Configurations → `beprofit-casestudy-info-008.md`
- Task 9: Onboarding UX Analysis → `beprofit-casestudy-info-009.md`
- Task 10: Checkpoint Review #1 → `beprofit-casestudy-info-010.md`
- All PRD Parts 02-11 requirements

## Files to Create/Modify
- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-001.md`
  - **Action:** CREATE
  - **What changes:** Help Center landing page mapping — full IA, categories, subcategories, article counts
- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-002.md`
  - **Action:** CREATE
  - **What changes:** Getting Started / Quick Start documentation — onboarding sequence, step-by-step workflows
- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-003.md`
  - **Action:** CREATE
  - **What changes:** Account creation & setup — signup flow, auth methods, plan selection, initial configuration
- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-004.md`
  - **Action:** CREATE
  - **What changes:** Store connection & data sync — e-commerce platform integration, sync process, data pulled
- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-005.md`
  - **Action:** CREATE
  - **What changes:** COGS initial setup — cost entry methods, CSV templates, default handling, bulk vs per-product

## Implementation Steps

### Step 1: Browse & Map Help Center Landing Page
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-001.md`

Use the `agent-browser` skill to navigate to `https://help.runviably.com/beprofit` and systematically document:

```markdown
# BeProfit Help Center — Information Architecture Mapping

## Source
- **URL:** https://help.runviably.com/beprofit
- **Category:** Help Center / Information Architecture
- **Date Captured:** [current date]

## Help Center Structure

### Top-Level Categories
| # | Category Name | Article Count | Subcategories |
|---|--------------|---------------|---------------|
| 1 | [Category]   | [N articles]  | [list]        |
| ...

### Navigation Hierarchy
[Document the full tree structure]

### Category Details
[For each category: name, description, subcategories, article titles]

## Key Observations
[Notable patterns in how content is organized]

## Relevance to Our Build
[How this IA informs our own help center / documentation strategy]
```

**Process:**
1. Navigate to `https://help.runviably.com/beprofit`
2. Extract every visible category and subcategory from the landing page
3. Click into each category to count articles and capture subcategory structure
4. Document the full navigation tree
5. Note any search functionality, popular articles, or featured content sections
6. Write the structured markdown file

- [x] Checkpoint: Step 1 complete — `beprofit-casestudy-info-001.md` created

### Step 2: Research Getting Started / Quick Start Guides
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-002.md`

From the Help Center mapping in Step 1, identify the "Getting Started" category (or equivalent). Use `agent-browser` to read each article in this section.

```markdown
# BeProfit Getting Started & Quick Start Guides

## Source
- **URLs:** [list all article URLs read]
- **Category:** Onboarding / Getting Started
- **Date Captured:** [current date]

## Onboarding Sequence
[Document the recommended order of setup steps]

### Step-by-Step Workflows
#### Workflow 1: [Name from article]
1. [Step]
2. [Step]
...

[Repeat for each article/workflow found]

## Required vs Optional Actions
| Action | Required? | Why |
|--------|-----------|-----|
| ...    | ...       | ... |

## Configuration Options & Defaults
[Document any settings mentioned with their defaults]

## Limitations & Caveats
[Any noted limitations or known issues]

## Plan/Tier Feature Gating
[Any mentions of features locked behind specific plans]

## Related Articles
[Internal links to other help articles referenced]

## Relevance to Our Build
[How these onboarding patterns inform our own product design]
```

**Process:**
1. Navigate to the Getting Started / Quick Start section identified in Step 1
2. Read each article in sequence
3. Document every step-by-step workflow
4. Capture required vs optional actions
5. Note any screenshots described (infer UI layout from context)
6. Document feature gating and plan restrictions
7. Write the structured markdown file

- [x] Checkpoint: Step 2 complete — `beprofit-casestudy-info-002.md` created

### Step 3: Research Account Creation & Setup
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-003.md`

Browse the Help Center for articles about account creation, signup, and initial setup. Also visit `https://beprofit.co/` to observe signup CTAs and flow indicators.

```markdown
# BeProfit Account Creation & Setup

## Source
- **URLs:** [list all article URLs and pages read]
- **Category:** Account Setup / Registration
- **Date Captured:** [current date]

## Account Creation Process
### Sign-Up Methods
[Email, Google, Shopify OAuth, etc.]

### Sign-Up Flow
1. [Step 1]
2. [Step 2]
...

## Plan Selection During Signup
[What plans are presented, when in the flow, defaults]

## Authentication Details
[Login methods, password requirements, 2FA if mentioned]

## Initial Configuration Wizard
[Steps in any setup wizard that runs after account creation]

## Configuration Options & Defaults
| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| ...     | ...     | ...     | ...   |

## Limitations & Caveats
[Noted limitations or issues]

## Plan/Tier Feature Gating
[Features locked behind plans mentioned in signup context]

## Related Articles
[Internal links]

## Relevance to Our Build
[How signup/auth patterns inform our product]
```

**Process:**
1. Search the Help Center for account creation / signup articles
2. Browse `https://beprofit.co/` for signup flow indicators
3. Document all authentication methods
4. Capture plan selection if it occurs during signup
5. Document any initial configuration wizard steps
6. Write the structured markdown file

- [x] Checkpoint: Step 3 complete — `beprofit-casestudy-info-003.md` created

### Step 4: Research Store Connection & Data Sync
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-004.md`

Browse Help Center articles about connecting e-commerce stores (Shopify, WooCommerce, Amazon, etc.) and the initial data synchronization process.

```markdown
# BeProfit Store Connection & Initial Data Sync

## Source
- **URLs:** [list all article URLs read]
- **Category:** Store Connection / Data Sync
- **Date Captured:** [current date]

## Supported Platforms
| Platform | Connection Method | Data Synced | Sync Frequency |
|----------|------------------|-------------|----------------|
| Shopify  | [OAuth/API/etc]  | [list]      | [frequency]    |
| ...      | ...              | ...         | ...            |

## Connection Process
### [Platform 1]: Shopify
1. [Step]
2. [Step]
...

### [Platform 2]: WooCommerce
1. [Step]
...

## Data Sync Details
### What Data Is Pulled
[Orders, products, customers, etc.]

### Sync Duration Expectations
[How long initial sync takes, what affects duration]

### Manual Steps After Sync
[Any required manual actions post-sync]

## Multi-Store Support
[Can users connect multiple stores? How does that work?]

## Limitations & Caveats
[Data freshness, sync delays, known issues]

## Plan/Tier Feature Gating
[Platform connections gated by plan]

## Related Articles
[Internal links]

## Relevance to Our Build
[How store connection patterns inform our integration architecture]
```

**Process:**
1. Search Help Center for store connection, integration, and sync articles
2. Read articles for each supported platform
3. Document connection flows per platform
4. Capture sync details — what data, how long, what frequency
5. Note multi-store capabilities
6. Document any manual post-sync steps
7. Write the structured markdown file

- [x] Checkpoint: Step 4 complete — `beprofit-casestudy-info-004.md` created

### Step 5: Research COGS Initial Setup
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-005.md`

Browse Help Center articles about Cost of Goods Sold (COGS) setup, including manual entry, CSV upload, and auto-sync options.

```markdown
# BeProfit COGS (Cost of Goods Sold) Initial Setup

## Source
- **URLs:** [list all article URLs read]
- **Category:** COGS / Cost Management
- **Date Captured:** [current date]

## COGS Setup Methods
### Method 1: Manual Entry
[How to manually enter costs per product]

### Method 2: CSV Upload
[CSV template format, required columns, upload process]

#### CSV Template Format
| Column | Required | Format | Description |
|--------|----------|--------|-------------|
| ...    | ...      | ...    | ...         |

### Method 3: Auto-Sync
[Automatic cost sync from platforms, which platforms support it]

## Per-Product vs Bulk Cost Assignment
[How costs are assigned — per variant, per product, bulk]

## Default Values & Missing Data
[What happens when cost data is missing, default assumptions]

## Cost Types Tracked
[Product cost, shipping cost, handling fees, etc.]

## Configuration Options & Defaults
| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| ...     | ...     | ...     | ...   |

## Limitations & Caveats
[Known issues, limitations in cost tracking]

## Plan/Tier Feature Gating
[COGS features gated by plan]

## Related Articles
[Internal links]

## Relevance to Our Build
[How COGS tracking informs our cost management features]
```

**Process:**
1. Search Help Center for COGS, cost of goods, product cost articles
2. Read each article about cost setup methods
3. Document CSV template format if available
4. Capture per-product vs bulk assignment options
5. Note default values and missing data handling
6. Document any auto-sync capabilities from supplier platforms
7. Write the structured markdown file

- [x] Checkpoint: Step 5 complete — `beprofit-casestudy-info-005.md` created

### Step 6: Verification & Quality Check
**Files:** All 5 created files

Review all 5 files for completeness and consistency:

1. Verify each file follows the standard template structure:
   - Source URLs
   - Category tags
   - Date captured
   - Structured content sections
   - "Relevance to Our Build" section
2. Verify the per-article capture checklist from the PRD is addressed:
   - [ ] Feature or setting being described
   - [ ] Step-by-step workflows
   - [ ] Screenshot descriptions (inferred UI from context)
   - [ ] Configuration options and defaults
   - [ ] Limitations, caveats, known issues
   - [ ] Integration-specific instructions
   - [ ] Plan/tier feature gating mentions
   - [ ] Internal links to related articles
3. Ensure no placeholder text remains
4. Confirm all files are in `dtcdashboard_app/casestudy/`

- [x] Checkpoint: Step 6 complete — all files verified

## Acceptance Criteria
- [x] `beprofit-casestudy-info-001.md` exists with complete Help Center IA mapping
- [x] `beprofit-casestudy-info-002.md` exists with Getting Started guide documentation
- [x] `beprofit-casestudy-info-003.md` exists with account creation process documentation
- [x] `beprofit-casestudy-info-004.md` exists with store connection & sync documentation
- [x] `beprofit-casestudy-info-005.md` exists with COGS setup documentation
- [x] All files follow the standardized template with Source, Category, Date, and "Relevance to Our Build" sections
- [x] Each file contains substantive research content (not placeholders)
- [x] The PRD Part 01 capture checklist items are addressed where applicable in each file

---
## Completion

**Status:** COMPLETED
**Date:** 2026-02-12
**PRD Part:** 01
**Summary:** Mapped the complete BeProfit Help Center information architecture (21 categories, ~100 articles) and created 5 structured research files covering the first wave of onboarding documentation: Help Center IA, Getting Started guides, Account Creation (10-step signup flow), Store Connection & Data Sync (4 e-commerce + 10 fulfillment platforms), and COGS Initial Setup (6 methods with priority hierarchy). Total output: 1,676 lines across 5 files.

### Requirements Completed by This Task
- [x] Task 1: Help Center Landing Page Mapping → `beprofit-casestudy-info-001.md`
- [x] Task 2: Getting Started / Quick Start Guides → `beprofit-casestudy-info-002.md`
- [x] Task 3: Account Creation & Setup → `beprofit-casestudy-info-003.md`
- [x] Task 4: Store Connection & Initial Data Sync → `beprofit-casestudy-info-004.md`
- [x] Task 5: COGS Initial Setup → `beprofit-casestudy-info-005.md`

### PRD Status After This Task
- Requirements completed by this task: 5
- Total PRD requirements completed (cumulative): 5
- Requirements remaining: 5 (Tasks 6-10: Shipping Cost Setup, Ad Platform Connection, Other Onboarding Configs, Onboarding UX Analysis, Checkpoint Review #1)
- PRD completion: ONGOING
