# Task 002 - Shipping, Ad Platforms, Remaining Onboarding & Checkpoint Review

## PRD Reference
- **PRD Part:** 01
- **PRD File:** prd/detailed_prd_part_01.md
- **Requirements Addressed:**
  1. Task 6: Shipping Cost Setup → `beprofit-casestudy-info-006.md`
  2. Task 7: Ad Platform Connection Setup → `beprofit-casestudy-info-007.md`
  3. Task 8: Other Onboarding Configurations → `beprofit-casestudy-info-008.md`
  4. Task 9: Onboarding UX Analysis → `beprofit-casestudy-info-009.md`
  5. Task 10: Checkpoint Review #1 → `beprofit-casestudy-info-010.md`

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-12

## Purpose
Complete all remaining PRD Part 01 research tasks. Task 001 covered the first 5 deliverables (Help Center mapping, Getting Started, Account Creation, Store Connection, COGS Setup). This task covers the final 5: shipping cost configuration, ad platform connections, remaining onboarding settings, an onboarding UX analysis synthesizing all onboarding documentation, and a structured checkpoint review assessing coverage and gaps before moving to PRD Part 02.

## Scope

### What This Task WILL Do (5 items)
- **Deliverable 1:** Research and document shipping cost configuration options, estimation vs actual cost tracking, shipping platform integrations, and how shipping costs factor into profit calculations → `beprofit-casestudy-info-006.md`
- **Deliverable 2:** Research and document ad platform connection flows (Facebook/Meta, Google, TikTok, Snapchat, Pinterest, etc.), OAuth/API processes, ad data sync granularity, and attribution model details → `beprofit-casestudy-info-007.md`
- **Deliverable 3:** Research and document remaining onboarding configurations — tax setup, currency settings, team member invites, notification/alert setup, and recommended next steps after initial setup → `beprofit-casestudy-info-008.md`
- **Deliverable 4:** Synthesize an onboarding UX analysis from all documentation gathered in Task 001 and this task — implied screen sequence, gamification/progress indicators, empty states, and onboarding friction points → `beprofit-casestudy-info-009.md`
- **Deliverable 5:** Perform structured Checkpoint Review #1 — assess coverage of all onboarding/getting-started topics across files 001-009, identify gaps, document discoveries, and plan adjustments for PRD Part 02 → `beprofit-casestudy-info-010.md`

### What This Task Will NOT Do (Left for Later Tasks)
- All PRD Part 02 requirements (Dashboard & Core Reports research)
- All PRD Parts 03-11 requirements
- No code implementation — this is research-only

## Files to Create/Modify

- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-006.md`
  - **Action:** CREATE
  - **What changes:** Shipping cost setup documentation — configuration options, estimation methods, platform integrations, profit calculation impact

- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-007.md`
  - **Action:** CREATE
  - **What changes:** Ad platform connection setup — OAuth/API flows per platform, data sync details, attribution models

- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-008.md`
  - **Action:** CREATE
  - **What changes:** Other onboarding configurations — tax, currency, team invites, notifications, recommended next steps

- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-009.md`
  - **Action:** CREATE
  - **What changes:** Onboarding UX analysis — synthesized screen flow, gamification, empty states, friction analysis

- **Path:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-010.md`
  - **Action:** CREATE
  - **What changes:** Checkpoint Review #1 — coverage assessment, gaps, discoveries, adjustments for next batch

- **Path:** `prd/detailed_prd_part_01.md`
  - **Action:** MODIFY (Progress section only)
  - **What changes:** Add Task 002 progress entry, mark Tasks 6-10 as completed, update cumulative progress, mark PRD Part 01 as DONE

## Implementation Steps

### Step 1: Research Shipping Cost Setup
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-006.md`

Use `agent-browser` to browse the BeProfit Help Center (`https://help.runviably.com/beprofit`) and search for articles related to shipping costs. Also search `https://beprofit.co/` for any marketing pages that describe shipping cost features.

**Research targets (from Help Center IA in file 001):**
- "Shipping Costs" category articles
- Any shipping-related articles within "Profit Calculator" or "Settings" categories
- Cross-references to shipping from COGS or order-level cost documentation

**Document structure:**

```markdown
# BeProfit Shipping Cost Setup

## Source
- **URLs:** [all article URLs browsed]
- **Category:** Shipping Costs / Cost Management
- **Date Captured:** 2026-02-12

## Shipping Cost Configuration Options

### Method 1: Manual Shipping Cost Entry
[Document per-order vs per-product shipping cost entry]
[Steps to manually set shipping costs]

### Method 2: Flat-Rate Shipping Costs
[How to configure flat-rate shipping amounts]
[Per-product vs global flat rate]

### Method 3: Actual Shipping Cost Tracking
[Integration with shipping platforms for real cost data]
[Which platforms support actual cost sync]

### Method 4: Shipping Cost Rules/Formulas
[Any rule-based shipping cost assignment — by weight, region, etc.]

## Estimation vs Actual Cost Tracking
[How BeProfit handles estimated vs actual shipping costs]
[Which approach is default, and how users switch between them]

## Shipping Platform Integrations
| Platform | Data Synced | Connection Method | Notes |
|----------|-------------|-------------------|-------|
| ShipStation | ... | ... | ... |
| ShipBob | ... | ... | ... |
| [others] | ... | ... | ... |

## How Shipping Costs Factor Into Profit Calculations
[Where shipping costs appear in the profit formula]
[Net profit = Revenue - COGS - Shipping - Ads - Fees - ...]
[Order-level vs aggregate impact]

## Configuration Options & Defaults
| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| ... | ... | ... | ... |

## Limitations & Caveats
[Known issues, unsupported scenarios]

## Plan/Tier Feature Gating
[Shipping features gated by plan]

## Related Articles
[Internal links to other help articles referenced]

## Relevance to Our Build
[How shipping cost tracking informs our product design]
[Key decisions: support estimation only, actual only, or both?]
[Integration priorities for shipping platforms]
```

**Process:**
1. Navigate to `https://help.runviably.com/beprofit` and search/browse for shipping cost articles
2. Read each shipping-related article thoroughly
3. Cross-reference with COGS documentation from file 005 for overlap
4. Check `https://beprofit.co/features` or pricing page for shipping feature mentions
5. Write the structured markdown file

- [x] Checkpoint: Step 1 complete — `beprofit-casestudy-info-006.md` created

### Step 2: Research Ad Platform Connection Setup
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-007.md`

Use `agent-browser` to browse Help Center articles about connecting advertising platforms. This is a critical area — ad spend tracking is one of BeProfit's core differentiators.

**Research targets (from Help Center IA in file 001):**
- "Ad Platform Integrations" or "Marketing" category articles
- Individual platform connection guides (Facebook/Meta Ads, Google Ads, TikTok Ads, Snapchat Ads, Pinterest Ads, Microsoft/Bing Ads)
- Attribution model documentation
- Ad spend sync and reconciliation articles

**Document structure:**

```markdown
# BeProfit Ad Platform Connection Setup

## Source
- **URLs:** [all article URLs browsed]
- **Category:** Ad Platform Integrations / Marketing
- **Date Captured:** 2026-02-12

## Supported Ad Platforms
| Platform | Connection Method | Data Synced | Sync Frequency | Plan Required |
|----------|------------------|-------------|----------------|---------------|
| Facebook/Meta Ads | OAuth | Campaigns, Ad Sets, Ads, Spend, ROAS | ... | ... |
| Google Ads | OAuth | ... | ... | ... |
| TikTok Ads | OAuth | ... | ... | ... |
| Snapchat Ads | ... | ... | ... | ... |
| Pinterest Ads | ... | ... | ... | ... |
| Microsoft/Bing Ads | ... | ... | ... | ... |

## Connection Process Per Platform

### Facebook/Meta Ads
1. [Step-by-step OAuth flow]
2. [Permissions requested]
3. [Account/campaign selection]
4. [Initial data sync behavior]

### Google Ads
1. [Step-by-step OAuth flow]
2. [Permissions/scopes requested]
3. [Account selection — MCC vs individual]
4. [Initial data sync behavior]

### TikTok Ads
[Same structure]

### [Other platforms...]
[Same structure for each]

## Attribution Model Details
[How BeProfit attributes ad spend to orders]
[First-click, last-click, multi-touch, or custom]
[Attribution window settings]
[How attribution affects profit calculations]

## Ad Data Sync Granularity
[Campaign-level, ad set-level, ad-level data]
[Metrics synced: spend, impressions, clicks, conversions, ROAS]
[Historical data import — how far back]

## Ad Spend in Profit Calculations
[Where ad costs appear in the profit formula]
[Per-order attribution vs aggregate ad spend]
[ROAS calculation methodology]

## Troubleshooting & Common Issues
[Connection failures, data discrepancies, re-authentication]

## Limitations & Caveats
[Platform-specific limitations, data delays]

## Plan/Tier Feature Gating
[Which ad platforms require which plans]

## Related Articles
[Internal links]

## Relevance to Our Build
[Which platforms to prioritize for MVP]
[Attribution model design decisions]
[Ad data architecture considerations]
```

**Process:**
1. Navigate to Help Center and search for ad platform / advertising / marketing integration articles
2. Read each platform-specific connection guide
3. Document OAuth flows, permissions, and data synced per platform
4. Search for attribution model documentation
5. Check `https://beprofit.co/` marketing pages for ad tracking feature descriptions
6. Write the structured markdown file

- [x] Checkpoint: Step 2 complete — `beprofit-casestudy-info-007.md` created

### Step 3: Research Other Onboarding Configurations
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-008.md`

Use `agent-browser` to find and document all remaining onboarding-related configurations not covered in files 001-007. This includes tax setup, currency settings, team/user management, notifications, and any "recommended next steps" flows.

**Research targets (from Help Center IA in file 001):**
- "Settings" or "Account Settings" category articles
- Tax configuration articles
- Currency/multi-currency articles
- Team member / user management articles
- Notification / alert configuration articles
- Any "what to do next" or "recommended steps" articles

**Document structure:**

```markdown
# BeProfit Other Onboarding Configurations

## Source
- **URLs:** [all article URLs browsed]
- **Category:** Settings / Account Configuration
- **Date Captured:** 2026-02-12

## Tax Setup
### Tax Configuration Options
[How users configure tax settings]
[Auto-calculated vs manual tax rates]
[Tax-inclusive vs tax-exclusive pricing]

### Tax in Profit Calculations
[Where tax appears in the profit formula]
[Tax deducted from revenue or tracked separately]

## Currency Settings
### Default Currency
[How the default currency is set — from store or manually]

### Multi-Currency Support
[How multi-currency stores are handled]
[Currency conversion rates — real-time or fixed]
[Reporting currency vs transaction currency]

## Team Member Management
### Inviting Team Members
[How to invite users, permission levels/roles]
[Available roles: admin, viewer, editor, etc.]

### User Permissions
| Role | Dashboard | Reports | Settings | Billing |
|------|-----------|---------|----------|---------|
| Admin | ... | ... | ... | ... |
| ... | ... | ... | ... | ... |

## Notification & Alert Setup
### Available Notifications
[Email alerts, in-app notifications, Slack, etc.]
[What triggers are available — daily summary, threshold alerts, etc.]

### Configuration Options
[How users enable/disable notifications]
[Frequency and channel settings]

## Recommended Next Steps After Setup
[What does BeProfit suggest users do after initial setup is complete?]
[Checklist or progress tracker within the app]
[Suggested order of exploration]

## Configuration Options & Defaults
| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| ... | ... | ... | ... |

## Limitations & Caveats
[Known issues]

## Plan/Tier Feature Gating
[Features gated by plan]

## Related Articles
[Internal links]

## Relevance to Our Build
[Which settings to include in MVP vs later]
[Team/permission model design decisions]
[Notification strategy priorities]
```

**Process:**
1. Browse Help Center for settings, tax, currency, team, and notification articles
2. Read each article and document configuration options
3. Pay attention to default values and what's auto-configured vs manual
4. Search for any "next steps" or "recommended actions" content
5. Write the structured markdown file

- [x] Checkpoint: Step 3 complete — `beprofit-casestudy-info-008.md` created

### Step 4: Synthesize Onboarding UX Analysis
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-009.md`

This is a **synthesis task**, not a new research task. Using all information gathered in files 001-008 plus any additional browsing of BeProfit's marketing site to infer the onboarding UX flow, create an analysis document.

**Inputs:**
- Re-read `dtcdashboard_app/casestudy/beprofit-casestudy-info-001.md` through `008.md`
- Browse `https://beprofit.co/` for signup page, onboarding screenshots, feature tour mentions
- Browse Help Center for any "getting started checklist" or "setup progress" articles

**Document structure:**

```markdown
# BeProfit Onboarding UX Analysis

## Source
- **URLs:** [any additional URLs browsed for this analysis]
- **Primary Sources:** beprofit-casestudy-info-001.md through 008.md
- **Category:** UX Analysis / Onboarding Flow
- **Date Captured:** 2026-02-12

## Implied Onboarding Flow
### Complete Screen-by-Screen Sequence
[Reconstruct the full onboarding flow from documentation clues]

| Step | Screen/Page | Required? | Actions | Data Collected |
|------|------------|-----------|---------|----------------|
| 1 | Signup | Yes | Email/OAuth | Account credentials |
| 2 | Store Connect | Yes | Platform OAuth | Store data access |
| 3 | [next step] | ... | ... | ... |
| ... | ... | ... | ... | ... |

### Flow Diagram (Text-Based)
```
Signup → Store Connect → COGS Setup → Shipping Setup → Ad Connect → Dashboard
                                  ↓ (skip)                    ↓ (skip)
                              Dashboard ←─────────────── Dashboard
```

## Onboarding Design Patterns

### Progress Indicators
[Is there a progress bar, step counter, or checklist?]
[How does the user know what's done vs remaining?]

### Gamification Elements
[Points, badges, completion percentages, rewards]
[Any "complete your profile" type incentives]

### Skip/Defer Options
[Which steps can be skipped? How is skip handled?]
[Do skipped steps appear as reminders later?]

### Empty States
[What users see before data loads — orders, products, reports]
[Empty state messaging — educational, motivational, or actionable?]
[Sample/demo data provided?]

## Time-to-Value Analysis
[How long from signup to first meaningful insight?]
[What is the "aha moment" BeProfit optimizes for?]
[Minimum setup to see any value]

## Friction Points (Inferred)
[Where might users drop off during onboarding?]
[Complex steps, unclear instructions, waiting periods]
[Based on help article complexity and user reviews]

## Onboarding Comparison to Competitors
[How does this compare to typical SaaS onboarding patterns?]
[Strengths and weaknesses of the approach]

## Relevance to Our Build
[Onboarding flow design for our product]
[Which patterns to adopt, which to improve]
[Critical "time to value" considerations]
[Empty state strategy]
```

**Process:**
1. Re-read files 001-008 to extract all onboarding-related details
2. Browse BeProfit marketing site for onboarding screenshots or descriptions
3. Reconstruct the implied screen-by-screen onboarding sequence
4. Analyze for gamification, progress indicators, and skip options
5. Infer empty states from help article descriptions
6. Write the synthesis document

- [x] Checkpoint: Step 4 complete — `beprofit-casestudy-info-009.md` created

### Step 5: Create Checkpoint Review #1
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-010.md`

Perform a structured checkpoint review of ALL research completed in files 001-009. This is a meta-analysis document that evaluates research coverage, identifies gaps, and guides adjustments for PRD Part 02.

**Inputs:**
- Re-read all files 001-009
- Review PRD Part 01 requirements
- Preview PRD Part 02 to understand what comes next

**Document structure:**

```markdown
# Checkpoint Review #1 — Onboarding & Getting Started Research

## Source
- **Primary Sources:** beprofit-casestudy-info-001.md through 009.md
- **Category:** Meta-Analysis / Checkpoint Review
- **Date Captured:** 2026-02-12

## Coverage Assessment

### PRD Part 01 Requirements
| Task | Requirement | File | Status | Depth |
|------|------------|------|--------|-------|
| 1 | Help Center Landing Page Mapping | 001 | Complete | Deep |
| 2 | Getting Started / Quick Start Guides | 002 | Complete | ... |
| 3 | Account Creation & Setup | 003 | Complete | ... |
| 4 | Store Connection & Data Sync | 004 | Complete | ... |
| 5 | COGS Initial Setup | 005 | Complete | ... |
| 6 | Shipping Cost Setup | 006 | Complete | ... |
| 7 | Ad Platform Connection Setup | 007 | Complete | ... |
| 8 | Other Onboarding Configurations | 008 | Complete | ... |
| 9 | Onboarding UX Analysis | 009 | Complete | ... |
| 10 | Checkpoint Review #1 | 010 | This file | — |

### Per-Article Capture Checklist Compliance
| Checklist Item | Consistently Captured? | Files Missing It |
|---------------|----------------------|------------------|
| Feature or setting described | Yes/No | [list] |
| Step-by-step workflows | Yes/No | [list] |
| Screenshot descriptions (inferred UI) | Yes/No | [list] |
| Configuration options and defaults | Yes/No | [list] |
| Limitations, caveats, known issues | Yes/No | [list] |
| Integration-specific instructions | Yes/No | [list] |
| Plan/tier feature gating mentions | Yes/No | [list] |
| Internal links to related articles | Yes/No | [list] |

## Gap Analysis

### Information Gaps Identified
[What questions remain unanswered?]
[Which topics had thin documentation?]
[Areas where Help Center lacked detail]

### Topics That Need Deeper Research
[List specific topics to revisit in later tasks]

## Key Discoveries & Surprises
[Unexpected findings about BeProfit's product]
[Features that are more/less sophisticated than expected]
[Competitive insights discovered during research]

## Quality of Sources
[How comprehensive is the Help Center?]
[Are articles up-to-date or stale?]
[Any broken links or missing content observed?]

## Adjustments for Next Batch
[Changes to research methodology]
[Additional sources to include]
[Template modifications if needed]

## Statistics
- Total files created: 10
- Total lines written: [count]
- Articles/pages browsed: [estimate]
- Sources consulted: [list]

## Relevance to Our Build
[Top 10 takeaways for our product from the onboarding research]
[Priority insights for product design decisions]
```

**Process:**
1. Re-read all 9 previous files (001-009)
2. Evaluate each against the PRD capture checklist
3. Identify gaps and thin coverage areas
4. Document key discoveries and surprises
5. Read PRD Part 02 header to understand what comes next
6. Write adjustments and recommendations for future research
7. Write the checkpoint review document

- [x] Checkpoint: Step 5 complete — `beprofit-casestudy-info-010.md` created

### Step 6: Update PRD Progress & Verify All Files
**Files:** `prd/detailed_prd_part_01.md` (Progress section only), all 5 new casestudy files

1. Update the PRD Part 01 Progress section with Task 002 completion:

```markdown
### Task 002 - [DATE]
- Status: COMPLETED
- Summary: [Brief summary of what was researched]
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-006.md`
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-007.md`
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-008.md`
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-009.md`
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-010.md`

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
```

2. Verify all 5 new files exist and follow the standard template:
   - Source URLs present
   - Category tags present
   - Date captured present
   - "Relevance to Our Build" section present
   - No placeholder text remaining
   - Substantive content throughout

3. Verify the capture checklist items are addressed per file:
   - Feature or setting being described
   - Step-by-step workflows
   - Screenshot descriptions (inferred UI)
   - Configuration options and defaults
   - Limitations, caveats, known issues
   - Integration-specific instructions
   - Plan/tier feature gating mentions
   - Internal links to related articles

- [x] Checkpoint: Step 6 complete — PRD updated, all files verified

## Acceptance Criteria
- [x] `beprofit-casestudy-info-006.md` exists with shipping cost setup documentation
- [x] `beprofit-casestudy-info-007.md` exists with ad platform connection documentation
- [x] `beprofit-casestudy-info-008.md` exists with other onboarding configuration documentation
- [x] `beprofit-casestudy-info-009.md` exists with onboarding UX analysis
- [x] `beprofit-casestudy-info-010.md` exists with Checkpoint Review #1
- [x] All files follow the standardized template with Source, Category, Date, and "Relevance to Our Build" sections
- [x] Each file contains substantive research content (not placeholders)
- [x] PRD Part 01 Progress section updated with Task 002 completion
- [x] PRD Part 01 marked as COMPLETE (all 10 tasks done)
