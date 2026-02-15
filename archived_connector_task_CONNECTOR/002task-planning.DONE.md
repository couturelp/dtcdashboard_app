# Task 002 - Connector Platform Discovery & Coverage Validation

## PRD Reference
- **PRD Part:** 02
- **PRD File:** @prd/detailed_prd_part_02.md
- **Requirements Addressed:**
  - Task 1: Research Unified API / Data Aggregator Platforms
  - Task 2: Initial Screening — Coverage Matrix (Shopify, Meta Ads, Google Ads, GA4)
  - Task 3: Research Pricing Models (initial gather only)

## Status
- [ ] Planning Complete
- [ ] Implementation Complete
- [ ] Verification Complete
- Completed At: [timestamp - to be filled when done]

## Purpose
Discover and catalog viable third-party connector platforms that integrate with our 4 required data sources (Shopify, Meta Ads, Google Ads, Google Analytics). Create a coverage matrix showing which platforms support all required integrations and gather initial pricing information to eliminate platforms outside our budget constraints.

## Scope

### What This Task WILL Do (4 deliverables)
- **Deliverable 1:** Comprehensive list of 15-25 candidate connector platforms across 3 categories (Marketing Data Aggregators, Unified Commerce APIs, iPaaS platforms)
- **Deliverable 2:** Coverage matrix documenting which platforms support all 4 required integrations (Shopify, Meta Ads, Google Ads, GA4)
- **Deliverable 3:** Initial pricing tier information for platforms that pass coverage screening (eliminate platforms >$500/month at startup scale)
- **Deliverable 4:** Research report documenting findings with platform shortlist (5-8 platforms) for deep-dive evaluation

### What This Task Will NOT Do (Left for Later Tasks)
- Deep-dive API documentation analysis (deferred to Task 003)
- Reliability and reputation assessment via G2/Capterra reviews (deferred to Task 003)
- Developer experience evaluation with hands-on testing (deferred to Task 003)
- Final platform recommendation and architecture design (deferred to Task 003 or 004)
- BeProfit casestudy cross-reference for connector insights (may be incorporated if time permits, but not required)

## Files to Create/Modify

### Create:
- **Path:** dtcdashboard_app/research/connector-platform-research-002.md
- **Action:** CREATE
- **What changes:** Create comprehensive research report documenting all candidate platforms, coverage matrix, initial pricing data, and shortlist recommendations

### Modify:
- **Path:** prd/detailed_prd_part_02.md
- **Action:** MODIFY
- **What changes:** Update Progress section with Task 002 completion status and cumulative progress tracking

## Implementation Steps (Max 6 steps)

### Step 1: Discover Candidate Platforms — Category A (Marketing Data Aggregators)
**Files:** dtcdashboard_app/research/connector-platform-research-002.md (CREATE)

Use `WebSearch` to find marketing data aggregator platforms. Search queries:
- "marketing data aggregator API 2026"
- "Supermetrics alternatives API access"
- "Funnel.io vs Fivetran vs Airbyte marketing data"
- "marketing attribution data connector platforms"
- "ad spend aggregator API Shopify Meta Google"

Use `agent-browser` to visit official sites for these known platforms:
- **Supermetrics** (https://supermetrics.com) — check Integrations page, API availability, Pricing
- **Funnel.io** (https://funnel.io) — check Data Sources page, API docs link, Pricing
- **Fivetran** (https://fivetran.com) — check Connectors catalog, pricing model
- **Airbyte** (https://airbyte.com) — check Integrations, open-source vs cloud pricing
- **Stitch Data** (https://stitchdata.com) — check Integrations, pricing tiers
- **Windsor.ai** (https://windsor.ai) — check Integrations page, API access
- **Adverity** (https://adverity.com) — check Data Connectors, enterprise pricing clues
- **Hevo Data** (https://hevodata.com) — check Sources, pricing page
- **Portable.io** (https://portable.io) — check Connectors, pricing

**Documentation structure:**
```markdown
# Connector Platform Research Report - Task 002

## Category A: Marketing Data Aggregators

### Supermetrics
- **Website:** https://supermetrics.com
- **Positioning:** [1-2 sentence summary from homepage]
- **Target Market:** [SMB / Enterprise / Both]
- **Integrations Advertised:** [count, e.g., "200+ integrations"]
- **API Availability:** [Yes/No/Unknown — check for "API" in nav or docs]
- **Pricing Model:** [Per-connector / Per-destination / Flat rate / Unknown]
- **Base Price Range:** [e.g., "$100-$500/mo" or "Enterprise only" or "Contact sales"]
- **Notes:** [Any red flags or standout features]

[Repeat for each platform in Category A]
```

**Expected output:** 8-10 platforms cataloged in Category A

- [ ] Checkpoint: Step 1 complete

### Step 2: Discover Candidate Platforms — Category B (Unified Commerce APIs)
**Files:** dtcdashboard_app/research/connector-platform-research-002.md (APPEND)

Use `WebSearch` to find unified commerce API platforms. Search queries:
- "unified commerce API Shopify 2026"
- "Rutter API review pricing"
- "Codat vs Merge.dev commerce integrations"
- "embedded commerce integration platform"
- "Shopify Google Ads unified API"

Use `agent-browser` to visit official sites for these platforms:
- **Rutter** (https://rutter.com) — check Platform page, Integrations, Pricing
- **Codat** (https://codat.io) — check Products, Data Types, Pricing
- **Merge.dev** (https://merge.dev) — check Categories (check if they have commerce/marketing), Pricing
- **Hotglue** (https://hotglue.com) — check Integrations, Pricing
- **Vessel** (https://vessel.dev) — check Integrations, pricing model
- **Alloy Automation** (https://runalloy.com) — check Integrations, embedded platform model
- **Paragon** (https://useparagon.com) — check Integrations catalog, pricing

**Documentation structure:**
```markdown
## Category B: Unified Commerce APIs

### Rutter
- **Website:** https://rutter.com
- **Positioning:** [summary]
- **Target Market:** [SaaS companies building commerce integrations / other]
- **Integrations Advertised:** [count]
- **API Availability:** [Yes — this is their core product]
- **Pricing Model:** [Per-connection / Usage-based / Unknown]
- **Base Price Range:** [estimate or "Contact sales"]
- **Commerce Focus:** [Yes/Partial/No]
- **Notes:** [red flags or standout features]

[Repeat for each platform in Category B]
```

**Expected output:** 6-8 platforms cataloged in Category B

- [ ] Checkpoint: Step 2 complete

### Step 3: Discover Candidate Platforms — Category C (iPaaS / Integration Platforms)
**Files:** dtcdashboard_app/research/connector-platform-research-002.md (APPEND)

Use `WebSearch` to find iPaaS platforms with API access. Search queries:
- "Zapier API programmatic access 2026"
- "Make Integromat API backend integration"
- "n8n self-hosted workflow automation"
- "Tray.io embedded integration platform"
- "open source iPaaS alternatives"

Use `agent-browser` to visit official sites for these platforms:
- **Zapier** (https://zapier.com) — check if they offer API beyond just webhook triggers (likely NO for programmatic backend use)
- **Make** (https://make.com) — check API availability, scenario execution via API
- **Tray.io** (https://tray.io) — check Embedded platform, API access, enterprise pricing
- **Workato** (https://workato.com) — check Enterprise automation, API capabilities
- **n8n** (https://n8n.io) — check self-hosted option, API execution capabilities

**Documentation structure:**
```markdown
## Category C: iPaaS / Integration Platforms

### Zapier
- **Website:** https://zapier.com
- **Positioning:** [summary]
- **API for Backend Integration:** [Yes/No/Limited — critical to verify]
- **Integrations Advertised:** [count, likely 5000+]
- **Pricing Model:** [Per-task / Per-zap]
- **Base Price Range:** [free tier + paid tiers]
- **Programmatic Suitability:** [Low/Medium/High — can we call their API from Node.js backend?]
- **Notes:** [likely NOT suitable for backend pass-through, more for user-facing automation]

[Repeat for each platform in Category C]
```

**Critical evaluation criteria for iPaaS:**
- Can we execute integrations programmatically from our Node.js backend?
- Or are they designed only for user-triggered workflows?
- If they don't offer programmatic API execution, mark as "NOT SUITABLE" and exclude from coverage matrix

**Expected output:** 4-6 platforms cataloged in Category C (but likely 2-3 will be marked NOT SUITABLE)

- [ ] Checkpoint: Step 3 complete

### Step 4: Create Coverage Matrix & Initial Screening
**Files:** dtcdashboard_app/research/connector-platform-research-002.md (APPEND)

For each platform discovered in Steps 1-3, verify integration coverage using `agent-browser`:

**Verification checklist per platform:**
1. Navigate to platform's Integrations/Connectors page
2. Search or filter for each required source:
   - **Shopify** (search for "Shopify" in integrations list)
   - **Facebook Ads** or **Meta Ads** (check naming — may be listed as Facebook/Meta/Facebook Marketing)
   - **Google Ads** (may be listed as Google Ads or Google AdWords)
   - **Google Analytics** (check if GA4 specifically mentioned, or just "Google Analytics")
3. Document availability: ✓ Yes / ✗ No / ? Unclear (needs deeper check)
4. Check if API/REST API access is available (not just UI-based data warehouse destinations)
5. Note if free tier or trial is available

**Documentation structure:**
```markdown
## Coverage Matrix

| Platform | Category | Shopify | Meta Ads | Google Ads | GA4 | API Access | Est. Price | Pass? |
|----------|----------|---------|----------|------------|-----|------------|-----------|-------|
| Supermetrics | Marketing | ✓ | ✓ | ✓ | ✓ | ✓ | $200-500 | ✓ |
| Funnel.io | Marketing | ✓ | ✓ | ✓ | ✓ | ? | $500+ | ? |
| Fivetran | Marketing | ✓ | ✓ | ✓ | ✓ | Limited | $100+ | ✓ |
| Airbyte | Marketing | ✓ | ✓ | ✓ | ✓ | ✓ (OSS) | Free-$500 | ✓ |
| Rutter | Commerce | ✓ | ? | ? | ? | ✓ | Contact | ? |
| [... continue for all platforms] | | | | | | | | |

### Screening Results
- **Total Platforms Evaluated:** [count]
- **Platforms with Full Coverage (4/4):** [count]
- **Platforms with Partial Coverage:** [count] (list them with missing sources)
- **Platforms Eliminated (missing required sources):** [count]
- **Platforms Eliminated (no API access):** [count]
- **Platforms Eliminated (price >$500/mo):** [count]
- **Platforms Passing to Shortlist:** [count] (5-8 ideal)
```

**Elimination criteria:**
- Missing ANY of the 4 required integrations → ELIMINATE
- No API access for programmatic backend use → ELIMINATE
- Clearly enterprise-only pricing (>$1000/mo minimum) → ELIMINATE (unless feature-rich and worth noting)
- No pricing information + "Contact sales" + enterprise positioning → ELIMINATE (assume too expensive)

**Expected output:** Coverage matrix with 15-25 platforms, narrowed to 5-8 shortlist candidates

- [ ] Checkpoint: Step 4 complete

### Step 5: Gather Initial Pricing Information for Shortlisted Platforms
**Files:** dtcdashboard_app/research/connector-platform-research-002.md (APPEND)

For platforms that passed screening in Step 4, gather detailed pricing information using `agent-browser`:

**Pricing research per shortlisted platform:**
1. Navigate to pricing page (if public) or find pricing in documentation
2. Identify pricing model:
   - **Per-connector** (e.g., $50/connector/month)
   - **Per-row** (e.g., $0.10 per 1000 rows synced)
   - **Per-destination** (e.g., $100/destination)
   - **Flat rate** (e.g., $200/month unlimited)
   - **Usage-based** (e.g., based on API calls or data volume)
   - **Tiered** (e.g., Starter/Pro/Enterprise)
3. Document key pricing factors:
   - Base monthly cost
   - Cost per connector (if applicable)
   - Data volume limits
   - API call limits
   - Historical data access (how far back can we pull?)
   - Number of users/seats included
   - Free tier details (if available)
4. Calculate estimated cost for our usage:
   - 4 connectors (Shopify, Meta, Google Ads, GA4)
   - 1 destination (our Node.js backend/database)
   - Daily sync frequency
   - ~10,000 orders/month (startup scale)

**Documentation structure:**
```markdown
## Pricing Analysis — Shortlisted Platforms

### Supermetrics
- **Pricing Page:** https://supermetrics.com/pricing
- **Pricing Model:** [describe]
- **Base Cost:** [$/month]
- **Per-Connector Cost:** [if applicable]
- **Our Estimated Monthly Cost:** $XXX
  - Calculation: [show breakdown]
  - Assumptions: 4 connectors, daily sync, 10K orders/month
- **Free Tier:** [Yes/No, details]
- **Free Trial:** [Yes/No, duration]
- **Notes:** [any pricing quirks, hidden costs, volume discounts]

[Repeat for each shortlisted platform]

### Pricing Comparison Table
| Platform | Base Cost | Per-Connector | Estimated Total | Free Tier | Trial | Notes |
|----------|-----------|--------------|----------------|-----------|-------|-------|
| Supermetrics | $200 | Included | ~$200/mo | No | 14-day | Good for startups |
| Airbyte | $0 (OSS) | N/A | ~$50 hosting | Yes | N/A | Self-host option |
| [... continue] | | | | | | |

### Pricing Insights
- **Lowest Cost Option:** [platform name] at ~$XXX/month
- **Best Value:** [platform name] — [reasoning]
- **Most Expensive (still viable):** [platform name] at ~$XXX/month
- **Free/OSS Options:** [list platforms with self-hosted or free tiers]
```

**Expected output:** Detailed pricing breakdown for 5-8 shortlisted platforms

- [ ] Checkpoint: Step 5 complete

### Step 6: Create Platform Shortlist & Update PRD Progress
**Files:** dtcdashboard_app/research/connector-platform-research-002.md (APPEND), prd/detailed_prd_part_02.md (MODIFY)

Synthesize research findings and create final shortlist recommendations.

**Shortlist criteria:**
- All 4 integrations available
- API access confirmed
- Pricing within budget ($0-$500/month at startup scale)
- Clear documentation of API capabilities (even if not deeply evaluated yet)
- Actively maintained (no abandoned projects)

**Documentation structure:**
```markdown
## Task 002 Final Shortlist

### Recommended Platforms for Deep-Dive (Task 003)
1. **[Platform Name]**
   - **Why:** [1-2 sentences on key strengths]
   - **Coverage:** 4/4 integrations
   - **Est. Cost:** $XXX/month
   - **API Quality:** [Initial impression from docs overview]
   - **Next Steps:** Evaluate API documentation, test API access, check reviews

2. **[Platform Name]**
   - [Same format]

3-5. [Continue for 5-8 total platforms]

### Eliminated Platforms Summary
- **Total Eliminated:** [count]
- **Reason: Missing Integrations:** [list 2-3 examples]
- **Reason: No API Access:** [list 2-3 examples]
- **Reason: Too Expensive:** [list 2-3 examples]

### Key Findings
- **Most Common Coverage Gap:** [e.g., "Many iPaaS platforms lack direct Shopify API access"]
- **Pricing Range:** $[low] - $[high] per month for our use case
- **Open Source Options:** [count] platforms offer self-hosted deployment
- **Surprise Findings:** [any unexpected discoveries during research]

### Recommendations for Next Task
- Focus deep-dive evaluation on top 3-5 platforms: [list names]
- Prioritize platforms with [specific criteria based on findings]
- Test API access hands-on for [specific platforms if needed]
```

**PRD Progress update:**

Update `prd/detailed_prd_part_02.md` Progress section (around line 180):
```markdown
## Progress

### Task 002 - Connector Platform Discovery & Coverage Validation - 2026-02-14
- **Status:** COMPLETED
- **Summary:** Researched 20+ connector platforms across 3 categories, created coverage matrix for 4 required integrations, gathered initial pricing data
- **Files Created:** dtcdashboard_app/research/connector-platform-research-002.md
- **Key Findings:**
  - [X] platforms passed full coverage screening (Shopify + Meta Ads + Google Ads + GA4)
  - Pricing range: $XX-$XXX/month for startup scale
  - [X] open-source/free options identified
  - [X] platforms eliminated due to missing integrations or high cost
- **Shortlist Created:** [X] platforms recommended for deep-dive evaluation (Task 003)
- **Research Report:** See dtcdashboard_app/research/connector-platform-research-002.md for full coverage matrix and pricing analysis

### Cumulative Progress
- [x] Task 1: Candidate platforms identified - completed in Task 002 (20+ platforms cataloged)
- [x] Task 2: Coverage matrix completed - completed in Task 002 (4/4 integrations verified per platform)
- [x] Task 3: Initial pricing comparison - completed in Task 002 (estimated costs for shortlisted platforms)
- [ ] Task 4: Reliability assessment - NOT STARTED
- [ ] Task 5: Documentation quality assessment - NOT STARTED

### Remaining Work
- **Next Task:** Deep-dive evaluation of top 5-8 shortlisted platforms (reliability, reviews, documentation)
- **Next Task:** Final platform recommendation and architecture design
```

- [ ] Checkpoint: Step 6 complete

## Acceptance Criteria
- [ ] 15-25 connector platforms cataloged across 3 categories (Marketing Aggregators, Commerce APIs, iPaaS)
- [ ] Coverage matrix completed showing which platforms support all 4 required integrations
- [ ] Platforms missing any required integration eliminated from consideration
- [ ] Initial pricing information gathered for all shortlisted platforms
- [ ] Estimated monthly cost calculated for our usage (4 connectors, 10K orders/month)
- [ ] Final shortlist of 5-8 platforms recommended for deep-dive evaluation
- [ ] Comprehensive research report created at dtcdashboard_app/research/connector-platform-research-002.md
- [ ] PRD Progress section updated with Task 002 completion status

## Notes

### Research Tools to Use
- `WebSearch`: Finding connector platforms, comparisons, pricing discussions, reviews
- `agent-browser`: Navigating platform websites, integrations pages, pricing pages, API doc links (NOT full API docs yet)

### Research Focus
This task is **DISCOVERY and SCREENING**, not deep evaluation:
- **DO:** Cast a wide net, find many platforms, verify basic integration coverage, gather initial pricing
- **DON'T:** Deep-dive into API documentation quality, test APIs hands-on, read reviews extensively, make final recommendations

### Common Pitfalls to Avoid
- Don't spend too much time on any single platform — this is broad discovery, not deep analysis
- Don't skip the coverage verification step — MANY platforms claim "1000+ integrations" but may be missing one of our 4 required sources
- Don't assume iPaaS platforms work for backend API pass-through — many are UI-only automation tools
- Don't eliminate platforms just because pricing is "Contact sales" — if they pass coverage check, include in shortlist for follow-up
- Watch for "Google Analytics" vs "GA4" distinction — older platforms may only support Universal Analytics (deprecated)

### Expected Time Allocation
- Step 1 (Category A discovery): ~30% of effort
- Step 2 (Category B discovery): ~25% of effort
- Step 3 (Category C discovery): ~15% of effort
- Step 4 (Coverage matrix): ~20% of effort (most critical step)
- Step 5 (Pricing gather): ~15% of effort
- Step 6 (Shortlist + PRD update): ~10% of effort

---

## Self-Check Before Starting

Verification checklist:
- [ ] I have 4 or fewer deliverables ✓ (4 deliverables)
- [ ] My plan is under 900 lines ✓ (approximately 550 lines)
- [ ] I have 6 or fewer implementation steps ✓ (6 steps)
- [ ] I explicitly listed what's NOT included ✓ (deferred to Task 003)
- [ ] My deliverables are all RELATED to each other ✓ (all about discovering and screening connector platforms)
- [ ] Every implementation step contains concrete actions and expected outputs ✓
- [ ] This is a RESEARCH task, not implementation ✓ (no code to write)

---
## Completion

**Status:** COMPLETED
**Date:** 2026-02-14
**PRD Part:** 02
**Summary:** Researched 21 connector platforms across 3 categories (Marketing Data Aggregators, Unified Commerce APIs, iPaaS), created coverage matrix verifying 4/4 required integrations per platform, gathered detailed pricing analysis for 8 shortlisted platforms, and produced final shortlist of 6 platforms recommended for deep-dive evaluation.

### Requirements Completed by This Task
- [x] Task 1: Research Unified API / Data Aggregator Platforms - 21 platforms cataloged across 3 categories
- [x] Task 2: Initial Screening — Coverage Matrix - Coverage matrix completed showing which platforms support all 4 required integrations (Shopify, Meta Ads, Google Ads, GA4)
- [x] Task 3: Research Pricing Models (initial gather) - Detailed pricing information gathered for 8 shortlisted platforms with estimated monthly costs

### Files Created
- dtcdashboard_app/research/connector-platform-research-002.md (916 lines)

### Files Modified
- prd/detailed_prd_part_02.md (Progress section updated)

### PRD Status After This Task
- Requirements completed by this task: 3 (Tasks 1, 2, 3)
- Total PRD requirements completed (cumulative): 3 out of 5
- Requirements remaining: 2 (Task 4: Reliability assessment, Task 5: Documentation quality assessment)
- PRD completion: ONGOING (60% complete)

### Key Deliverables
1. Comprehensive platform catalog (21 platforms evaluated)
2. Coverage matrix (12 platforms with full 4/4 integration coverage)
3. Pricing analysis (8 platforms detailed, 6 in final shortlist)
4. Platform shortlist (Fivetran, n8n, Airbyte, Windsor.ai, Stitch Data, Make)

### Next Task Recommendation
Task 003 should focus on deep-dive evaluation of the 6 shortlisted platforms:
- Reliability assessment (G2/Capterra reviews, uptime tracking, user feedback)
- API documentation quality evaluation
- Developer experience assessment
- Hands-on testing recommendations
- Final platform recommendation

