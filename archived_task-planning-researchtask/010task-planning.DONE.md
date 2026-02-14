# Task 010 - Ad Platform Integrations Research (PRD Part 03, Batch 2)

## PRD Reference
- **PRD Part:** 03
- **PRD File:** prd/detailed_prd_part_03.md
- **Requirements Addressed:** Tasks 5-8 of PRD Part 03 (Facebook/Meta Ads Integration, Google Ads Integration, TikTok Ads Integration, Other Ad Platform Integrations)

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-13

## Purpose
Continue PRD Part 03 (Integrations Deep Dive) by documenting BeProfit's advertising platform integrations. This batch covers how BeProfit connects to major ad platforms (Facebook/Meta, Google, TikTok, and others) to attribute ad spend to revenue and calculate true profit margins. Understanding these integrations is critical for building accurate profit analytics in our competing product.

## Scope

### What This Task WILL Do (4 items)
1. Research and document Facebook/Meta Ads Integration → `beprofit-casestudy-info-035.md`
2. Research and document Google Ads Integration → `beprofit-casestudy-info-036.md`
3. Research and document TikTok Ads Integration → `beprofit-casestudy-info-037.md`
4. Research and document Other Ad Platform Integrations (Snapchat, Pinterest, Microsoft/Bing Ads, etc.) → `beprofit-casestudy-info-038.md`

### What This Task Will NOT Do (Left for Later Tasks)
- Klaviyo Integration (file 039) - Task 011
- Other Email/SMS Integrations (file 040) - Task 011
- Shipping Platform Integrations (file 041) - Task 011
- Accounting & Other Integrations (file 042) - Task 011
- Data Sync & Refresh Documentation (file 043) - Task 011
- Integration Comparison Matrix (file 044) - Task 012
- Checkpoint Review #3 (file 045) - Task 012

## Files to CREATE
1. `dtcdashboard_app/casestudy/beprofit-casestudy-info-035.md` — Facebook/Meta Ads Integration
2. `dtcdashboard_app/casestudy/beprofit-casestudy-info-036.md` — Google Ads Integration
3. `dtcdashboard_app/casestudy/beprofit-casestudy-info-037.md` — TikTok Ads Integration
4. `dtcdashboard_app/casestudy/beprofit-casestudy-info-038.md` — Other Ad Platform Integrations

## Implementation Steps (Max 6 steps)

### Step 1: Research Facebook/Meta Ads Integration (File 035)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-035.md` (CREATE)

Browse the following sources to understand BeProfit's Facebook/Meta Ads integration in depth:
- **BeProfit Help Center:** https://help.runviably.com/beprofit
  - Search for: "Facebook Ads", "Meta Ads", "Facebook integration", "Facebook connect"
  - Navigate to Integrations > Ad Platforms section if it exists
- **BeProfit Marketing Site:** https://beprofit.co/
  - Look for "Integrations" page, "Facebook Ads" mentions in features
- **Settings Dump:** Read `prd/manually-added-dump-from-real-dashboard.md` for Facebook Ads connection UI/settings
- **External Search:** Google search for "BeProfit Facebook Ads integration setup" to find user discussions, tutorials

**Research methodology:**
1. **Connection Setup & OAuth Flow:**
   - Document step-by-step setup process (OAuth permissions required, scopes requested)
   - Identify if Business Manager access is required or just Ad Account access
   - Note if multiple ad accounts can be connected or single account only
   - Capture screenshots/descriptions of connection UI from settings dump

2. **Data Synced:**
   - Campaign-level data (name, status, objective, budget, spend)
   - Ad Set-level data (name, targeting summary, schedule, spend)
   - Ad-level data (creative name, format, spend, impressions, clicks, conversions)
   - Conversion data (purchases, add-to-carts, pixel events)
   - Attribution window settings (1-day click, 7-day click, 1-day view, etc.)

3. **Sync Frequency & Real-Time Capabilities:**
   - How often does BeProfit pull Facebook Ads data? (hourly, daily, manual refresh)
   - Is there real-time sync or is data delayed?
   - Historical data import: how far back can you import?

4. **Attribution Methodology:**
   - How does BeProfit attribute Facebook ad spend to orders?
   - Attribution window defaults (likely 7-day click, 1-day view)
   - How does it handle multi-touch attribution? (first-click, last-click, etc.)
   - UTM parameter tracking if Facebook Pixel not used

5. **Troubleshooting & Limitations:**
   - Common connection errors (token expiration, permissions issues)
   - Known limitations (e.g., can't sync Instagram Ads separately, can't sync specific pixel events)
   - Pricing tier requirements (available on which plans?)

**Document structure:**

```markdown
# BeProfit Facebook/Meta Ads Integration

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / Ad Platforms / Facebook Ads
- **Date Captured:** [date]

---

## Integration Overview
[Summarize what the Facebook Ads integration does — ad spend tracking, conversion attribution, ROI calculation]

## Connection Setup

### OAuth Flow
[Step-by-step OAuth connection process:]
1. Navigate to Settings > Integrations > Facebook Ads
2. Click "Connect Facebook Ads"
3. OAuth redirects to Facebook Business login
4. Required permissions: [list scopes like ads_read, ads_management, etc.]
5. Select ad accounts to sync
6. Confirm connection

### Requirements
- Facebook Business Manager account (required/not required?)
- Facebook Pixel installed on store (required/not required?)
- Minimum tier: [Free/Basic/Premium/Plus]

## Data Synced

### Campaign Data
- Campaign ID, Name, Status, Objective, Budget Type, Daily/Lifetime Budget, Spend, Start/End Date
- [Note if any fields are NOT synced]

### Ad Set Data
- Ad Set ID, Name, Campaign ID, Targeting Summary, Schedule, Optimization Goal, Bid Strategy, Spend

### Ad Data
- Ad ID, Name, Ad Set ID, Creative Type, Status, Spend, Impressions, Clicks, CTR, CPC, Conversions, CPA

### Conversion Events
- Purchase events (value, quantity, transaction ID)
- Add-to-Cart events (if tracked)
- Pixel events synced: [list which events beyond Purchase]

## Sync Details

### Sync Frequency
- Automatic sync: [hourly/daily/every X hours]
- Manual refresh: [Yes/No, button location]
- Real-time data: [Yes/No, delay time]

### Historical Data Import
- Import range: [e.g., "up to 90 days historical data on first sync"]
- Ongoing sync: [e.g., "continuous sync from connection date forward"]

### Data Freshness
- Typical delay: [e.g., "2-4 hours behind Facebook Ads Manager"]
- Attribution finalization: [e.g., "may take 24-48 hours for conversions to stabilize"]

## Attribution Methodology

### Attribution Window
- Default window: [e.g., "7-day click, 1-day view"]
- Configurable: [Yes/No — can user change attribution window?]
- Multi-touch: [How does BeProfit handle multiple ad touches before purchase?]

### Order Matching
[How BeProfit links Facebook conversions to Shopify/WooCommerce/Amazon orders:]
- Pixel-based: [Yes/No]
- UTM-based: [Yes/No, UTM parameters required]
- Transaction ID matching: [Yes/No]

### Edge Cases
- Orders without Facebook attribution: [How handled?]
- Multi-channel orders (e.g., Google + Facebook): [How split?]
- Return/refund handling in ad attribution: [How updated?]

## Troubleshooting & Limitations

### Common Connection Issues
- OAuth token expiration: [frequency, how to reconnect]
- "Insufficient permissions" error: [causes, solutions]
- Ad account not appearing: [troubleshooting steps]

### Known Limitations
- [e.g., "Cannot sync Instagram Ads separately — rolled into Facebook Ads spend"]
- [e.g., "Cannot filter by specific pixel events — all Purchase events synced"]
- [e.g., "Cannot sync archived campaigns older than 90 days"]
- [e.g., "Multi-account limitation: max X ad accounts per store"]

### Pricing Tier Requirements
- Available on: [Free/Basic/Premium/Plus or "All plans"]
- Feature restrictions by tier: [e.g., "Free plan: last 30 days only; Premium: unlimited history"]

## Inferred UI Elements
[Based on Help Center articles and settings dump, infer:]
- Connection card in Settings > Integrations showing "Facebook Ads — Connected" with account name and spend summary
- Ad spend dashboard widget showing Facebook spend vs attributed revenue
- Attribution report breaking down orders by ad campaign/ad set/ad
- [Include any UI screenshots or descriptions from settings dump]

## Data Model Implications
[For our competing product, what database schema/API design is needed:]

```typescript
// Facebook Ads integration data structure
interface FacebookAdsConnection {
  accountId: string;
  accountName: string;
  businessManagerId?: string;
  accessToken: string; // encrypted
  tokenExpiry: Date;
  syncFrequency: 'hourly' | 'daily';
  attributionWindow: {
    clickDays: number; // e.g., 7
    viewDays: number; // e.g., 1
  };
  lastSyncedAt: Date;
}

interface FacebookAdCampaign {
  campaignId: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  objective: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  attributedRevenue: number;
  roi: number; // (attributedRevenue - spend) / spend
}

// Similar interfaces for AdSet, Ad entities
```

## Limitations & Gaps
[What questions remain unanswered? What does BeProfit NOT show or do?]
- Unclear if BeProfit syncs Facebook Catalog sales (dynamic product ads)
- Unclear if BeProfit handles Facebook Shop orders separately from website orders
- No mention of Instagram Ads breakdown (likely rolled into Facebook Ads)
- No mention of Facebook Marketplace listing syncing

## Relevance to Our Build
**Critical for our competing product:**
1. **Must-have feature:** Facebook Ads is the #1 ad platform for e-commerce DTC brands. Our product MUST have deep Facebook Ads integration with accurate attribution.
2. **Attribution complexity:** Multi-touch attribution is hard. We need to decide: first-click, last-click, linear, time-decay? BeProfit's approach will inform our default.
3. **OAuth security:** We need secure token storage, auto-refresh on expiry, graceful handling of permission revocations.
4. **Attribution window flexibility:** Power users want configurable attribution windows (7-day vs 28-day click). Should we offer this as a premium feature?
5. **Real-time vs batch sync:** Real-time sync is expensive (API rate limits). BeProfit likely does hourly batch sync. We should match or beat this.

**Competitive differentiation opportunities:**
- If BeProfit can't sync Instagram Ads separately, we could offer that as a differentiator
- If BeProfit lacks multi-touch attribution options, we could offer advanced attribution models
- If BeProfit's attribution window is fixed, we could offer configurability

**Technical challenges:**
- Facebook Marketing API rate limits (200 calls per hour per user token)
- OAuth token management (90-day expiry, need refresh logic)
- Attribution matching accuracy (pixel vs UTM vs transaction ID)
- Handling multi-account businesses (agencies managing multiple brands)

---

## Research Checklist (Per-Integration)
- [x] Platform name and category: Facebook/Meta Ads, Ad Platforms
- [x] Data synced: Campaigns, Ad Sets, Ads, Conversions, Pixel Events
- [x] Sync direction: One-way (Facebook → BeProfit)
- [x] Sync frequency: [documented above]
- [x] Setup complexity: [documented above]
- [x] Limitations: [documented above]
- [x] Pricing tier: [documented above]
- [x] Authentication method: OAuth 2.0

```

**Integration with existing codebase:**
- Reference file 031 (Integration Ecosystem Overview) for consistency in categorization and tier mapping
- Cross-reference file 032 (Shopify Integration) for order attribution methodology — Facebook ad conversions must map to Shopify order data

**Estimated browsing effort:** 8-12 web pages (2-3 Help Center articles, 1-2 marketing site pages, settings dump review, 3-5 external search results for setup tutorials/user discussions).

- [x] Checkpoint: Step 1 complete

---

### Step 2: Research Google Ads Integration (File 036)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-036.md` (CREATE)

Browse the following sources to understand BeProfit's Google Ads integration:
- **BeProfit Help Center:** Search for "Google Ads", "Google Ads integration", "Google Ads connect"
- **BeProfit Marketing Site:** Integrations page, feature mentions
- **Settings Dump:** `prd/manually-added-dump-from-real-dashboard.md` for Google Ads settings UI
- **External Search:** "BeProfit Google Ads integration" + tutorials/discussions

**Research methodology:**
1. **Connection Setup & OAuth Flow:**
   - Google Ads account connection (Google OAuth scopes required)
   - Google Ads Customer ID requirement
   - Manager account (MCC) support — can you connect sub-accounts?

2. **Data Synced:**
   - Campaign-level data (name, type, budget, spend, impressions, clicks, conversions)
   - Ad Group-level data (name, spend, keywords)
   - Keyword-level data (search terms, CPC, conversions) — is this granular data available?
   - Shopping campaign data (product titles, SKUs, spend per product)
   - Conversion tracking (Google Ads Conversion Tracking vs Google Analytics Goals)

3. **Sync Frequency & Historical Import:**
   - Sync cadence (real-time, hourly, daily)
   - Historical data range (30 days, 90 days, unlimited?)

4. **Attribution Methodology:**
   - Attribution window (Google Ads default is 30-day click, 1-day view)
   - How BeProfit attributes Google Ads conversions to orders (GCLID matching, UTM parameters)
   - Handling of Google Shopping vs Search vs Display campaigns

5. **Google Analytics Integration:**
   - Does BeProfit also connect to Google Analytics for additional attribution data?
   - If yes, how does it reconcile Google Ads data vs GA data?

6. **Troubleshooting & Limitations:**
   - OAuth token expiration
   - Conversion tracking setup requirements (must have Google Ads conversion tracking enabled?)
   - Known limitations (e.g., can't sync Display Network campaigns separately)

**Document structure:** Same template as File 035, adapted for Google Ads specifics.

**Key differences from Facebook Ads to highlight:**
- Google Ads often has more conversion delay due to conversion import lag
- Google Shopping campaigns require product feed sync (does BeProfit show this?)
- Search vs Shopping vs Display campaign attribution differences
- GCLID parameter tracking (Google's equivalent of fbclid)

**Integration with existing codebase:**
- Cross-reference file 035 (Facebook Ads) for attribution methodology comparison
- Cross-reference file 032 (Shopify) for GCLID parameter capture in order data

**Estimated browsing effort:** 8-12 web pages.

- [x] Checkpoint: Step 2 complete

---

### Step 3: Research TikTok Ads Integration (File 037)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-037.md` (CREATE)

Browse the following sources:
- **BeProfit Help Center:** Search for "TikTok Ads", "TikTok integration"
- **BeProfit Marketing Site:** Integrations page
- **Settings Dump:** TikTok Ads settings (if present)
- **External Search:** "BeProfit TikTok Ads" + user discussions

**Research methodology:**
1. **Connection Setup:**
   - TikTok Ads Manager account connection (OAuth flow)
   - TikTok Pixel requirement for conversion tracking
   - Does BeProfit support TikTok Business Center or just individual ad accounts?

2. **Data Synced:**
   - Campaign-level data (name, objective, budget, spend, results)
   - Ad Group-level data (targeting, placements, spend)
   - Ad-level data (video creative ID, spend, views, clicks, conversions)
   - TikTok Pixel events (ViewContent, AddToCart, CompletePayment)

3. **Sync Frequency:**
   - TikTok Ads API rate limits may differ from Facebook/Google
   - Real-time vs batch sync

4. **Attribution Methodology:**
   - Attribution window (TikTok default: 7-day click, 1-day view)
   - How BeProfit maps TikTok conversions to orders (likely Pixel-based with transaction ID)
   - Edge cases: TikTok Shop orders vs external website orders

5. **Maturity Compared to Facebook/Google:**
   - TikTok Ads integration is likely newer/less mature than Facebook/Google
   - Document any missing features vs Facebook Ads integration
   - Are there tier restrictions? (e.g., TikTok Ads only on Premium/Plus plans)

6. **Troubleshooting & Limitations:**
   - TikTok Pixel setup requirements
   - Known bugs or sync issues
   - Feature parity gaps

**Document structure:** Same template as File 035, adapted for TikTok Ads.

**Key differences to highlight:**
- TikTok Ads integration is likely less mature (newer platform)
- TikTok Pixel setup may be more complex for non-Shopify stores
- TikTok Shop vs external website attribution differences
- Video creative performance (views, watch time) may not be fully synced

**Integration with existing codebase:**
- Cross-reference files 035 and 036 for attribution comparison
- Note maturity gaps compared to Facebook/Google integrations

**Estimated browsing effort:** 6-10 web pages (TikTok Ads is newer, may have less documentation).

- [x] Checkpoint: Step 3 complete

---

### Step 4: Research Other Ad Platform Integrations (File 038)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-038.md` (CREATE)

Browse all sources to identify and document OTHER ad platform integrations beyond Facebook, Google, TikTok:
- **BeProfit Help Center:** Browse full Integrations > Ad Platforms category
- **BeProfit Marketing Site:** Integrations page listing
- **File 031:** Cross-reference Integration Ecosystem Overview for complete ad platform list
- **External Search:** "BeProfit [platform name] integration" for each platform

**Platforms to research:**
1. **Snapchat Ads** (if supported)
2. **Pinterest Ads** (if supported)
3. **Microsoft Advertising / Bing Ads** (if supported)
4. **Reddit Ads** (if supported)
5. **Twitter/X Ads** (if supported)
6. **YouTube Ads** (may be rolled into Google Ads integration)
7. **Amazon Ads** (Amazon Sponsored Products — may be part of Amazon integration from file 034)
8. **Any other platforms** discovered during research

**Research methodology (for each platform):**
1. **Check if integration exists:**
   - Native integration (direct API connection)
   - Third-party via Zapier
   - Not supported (note this explicitly)

2. **If integration exists, document:**
   - Connection setup (OAuth, API key, manual CSV upload?)
   - Data synced (campaigns, spend, conversions)
   - Sync frequency
   - Attribution methodology
   - Tier requirements
   - Limitations vs Facebook/Google integration

3. **Comparative analysis:**
   - Which ad platforms get native integrations vs Zapier?
   - Which platforms are mentioned on marketing site vs buried in Help Center?
   - Which platforms are clearly mature vs experimental/beta?

**Document structure:**

```markdown
# BeProfit Other Ad Platform Integrations

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / Ad Platforms / Other Platforms
- **Date Captured:** [date]

---

## Overview
This document covers all ad platform integrations EXCEPT Facebook/Meta Ads, Google Ads, and TikTok Ads (covered in files 035, 036, 037).

## Snapchat Ads Integration

### Availability
- Status: [Native / Via Zapier / Not Supported]
- Tier Required: [plan level]

### Connection Setup
[If supported, document setup steps]

### Data Synced
[Campaign, Ad Set, Ad data fields]

### Sync Details
- Sync frequency: [cadence]
- Historical import: [range]

### Attribution
[How Snapchat conversions are attributed to orders]

### Limitations
[Known issues or gaps]

---

## Pinterest Ads Integration

[Same structure as Snapchat]

---

## Microsoft Advertising (Bing Ads) Integration

[Same structure]

---

## [Other Platforms]

[Repeat structure for each platform found]

---

## Ad Platform Comparison

### Native Integration Tiers
Tier 1 (Full Native, Mature):
- Facebook/Meta Ads
- Google Ads

Tier 2 (Native, Newer):
- TikTok Ads
- [others if applicable]

Tier 3 (Zapier or Limited):
- [platforms with Zapier integration only]

Not Supported:
- [platforms explicitly not supported]

### Feature Parity Matrix

| Platform | OAuth Setup | Campaign Data | Ad-Level Data | Attribution | Real-Time Sync | Tier Required |
|----------|-------------|---------------|---------------|-------------|----------------|---------------|
| Facebook Ads | Yes | Yes | Yes | Pixel + UTM | No (hourly) | All plans |
| Google Ads | Yes | Yes | Yes | GCLID | No (daily) | All plans |
| TikTok Ads | Yes | Yes | Partial | Pixel | No (daily) | Premium+ |
| Snapchat Ads | [Yes/No] | [Yes/No] | [Yes/No] | [method] | [Yes/No] | [tier] |
| Pinterest Ads | [Yes/No] | [Yes/No] | [Yes/No] | [method] | [Yes/No] | [tier] |
| ... | ... | ... | ... | ... | ... | ... |

### BeProfit's Ad Platform Strategy
[Synthesize insights:]
- Which platforms does BeProfit prioritize? (Facebook, Google clearly top priority)
- Which platforms are newer additions? (TikTok likely added in 2021-2023)
- Which platforms are conspicuously missing? (LinkedIn Ads, Quora Ads, etc.)
- Is there a long-tail strategy (Zapier for everything else) or focus on top 3-5 platforms?

## Inferred UI Elements
- Settings > Integrations page showing ad platform cards (Facebook, Google, TikTok, Snapchat, Pinterest, etc.)
- "Connect [Platform]" buttons for each supported platform
- Consolidated ad spend dashboard showing spend breakdown by platform
- Attribution report with platform filter

## Data Model Implications
[For our competing product:]

```typescript
// Unified ad platform connection interface
interface AdPlatformConnection {
  platform: 'facebook' | 'google' | 'tiktok' | 'snapchat' | 'pinterest' | 'bing';
  accountId: string;
  accountName: string;
  accessToken: string; // encrypted
  tokenExpiry: Date;
  syncFrequency: 'realtime' | 'hourly' | 'daily';
  attributionWindow: {
    clickDays: number;
    viewDays: number;
  };
  status: 'connected' | 'error' | 'disconnected';
  lastSyncedAt: Date;
  lastError?: string;
}

// Unified ad spend data structure across platforms
interface AdSpend {
  platform: string;
  campaignId: string;
  campaignName: string;
  date: Date;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  attributedRevenue: number;
  roi: number;
}
```

## Limitations & Gaps
- Unclear if BeProfit supports multi-currency ad accounts (e.g., US ads in USD, UK ads in GBP)
- Unclear if BeProfit normalizes currency conversion for global brands
- No mention of LinkedIn Ads, Quora Ads, or B2B ad platforms (likely intentional — BeProfit is DTC-focused)

## Relevance to Our Build
**Strategic decisions for our product:**
1. **Platform priority:** Match BeProfit's top 3 (Facebook, Google, TikTok) as MVP. Add Pinterest, Snapchat, Bing in phase 2.
2. **Long-tail strategy:** Should we support ALL ad platforms via Zapier/webhooks, or focus on top platforms with deep integrations?
3. **B2B platforms:** Should we differentiate by supporting LinkedIn Ads (B2B use case)?

**Competitive opportunities:**
- If BeProfit lacks Pinterest Ads (popular for fashion/home decor brands), we can add it
- If BeProfit lacks Snapchat Ads (popular for Gen Z brands), we can add it
- If BeProfit has poor TikTok Ads integration (new platform), we can do it better

**Technical architecture:**
- Design abstraction layer for ad platforms so adding new platforms is plug-and-play
- Unified `AdPlatformConnection` and `AdSpend` interfaces across all platforms
- Platform-specific adapters handle OAuth, API differences, attribution logic

---

## Research Checklist Summary
For each platform:
- [x] Platform name and category
- [x] Data synced
- [x] Sync direction: One-way (Platform → BeProfit)
- [x] Sync frequency
- [x] Setup complexity
- [x] Limitations
- [x] Pricing tier
- [x] Authentication method
```

**Integration with existing codebase:**
- Cross-reference file 031 (Integration Ecosystem Overview) for complete ad platform list
- Cross-reference files 035, 036, 037 for attribution methodology consistency
- Build comparative feature matrix across all ad platforms

**Estimated browsing effort:** 10-15 web pages (BeProfit Help Center browse, marketing site integrations page, targeted searches for each platform).

- [x] Checkpoint: Step 4 complete

---

### Step 5: Cross-Check & Update PRD Progress
**Files:** `prd/detailed_prd_part_03.md` (MODIFY — Progress section only)

After completing all 4 research files, update the PRD's Progress section to log this task's completion.

**Edit the PRD file** (`prd/detailed_prd_part_03.md`) **Progress section** to add:

```markdown
### Task 010 - 2026-02-13
- Status: COMPLETED
- Summary: Created comprehensive ad platform integration research covering Facebook/Meta Ads, Google Ads, TikTok Ads, and other ad platforms (Snapchat, Pinterest, Bing, etc.)
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-035.md` (Facebook/Meta Ads Integration)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-036.md` (Google Ads Integration)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-037.md` (TikTok Ads Integration)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-038.md` (Other Ad Platforms)

### Cumulative Progress
- [x] Task 1: Integration Ecosystem Overview - completed in Task 009
- [x] Task 2: Shopify Integration - completed in Task 009
- [x] Task 3: WooCommerce Integration - completed in Task 009
- [x] Task 4: Amazon Integration - completed in Task 009
- [x] Task 5: Facebook/Meta Ads Integration - completed in Task 010
- [x] Task 6: Google Ads Integration - completed in Task 010
- [x] Task 7: TikTok Ads Integration - completed in Task 010
- [x] Task 8: Other Ad Platform Integrations - completed in Task 010
- [ ] Task 9: Klaviyo Integration - NOT STARTED
- [ ] Task 10: Other Email/SMS Integrations - NOT STARTED
- [ ] Task 11: Shipping Platform Integrations - NOT STARTED
- [ ] Task 12: Accounting & Other Integrations - NOT STARTED
- [ ] Task 13: Data Sync & Refresh Documentation - NOT STARTED
- [ ] Task 14: Integration Comparison Matrix - NOT STARTED
- [ ] Task 15: Checkpoint Review #3 - NOT STARTED

### Remaining Work for This PRD
7 of 15 tasks remaining (Tasks 9-15). Estimated 2 more tasks to complete PRD Part 03.
```

**CRITICAL:** Only modify the `## Progress` section. Do NOT change any requirements or task descriptions in the PRD.

- [x] Checkpoint: Step 5 complete

---

### Step 6: Self-Verification & Completion Documentation
**Files:** `task-plans/010task-planning.md` (MODIFY — Status section at top)

After all research files are created and PRD is updated:

1. **Verify all 4 files exist and meet quality standards:**
   - Each file is 400+ lines (comprehensive)
   - Each file follows the established template (Source, main sections, Inferred UI Elements, Data Model Implications, Limitations & Gaps, Relevance to Our Build)
   - Each file addresses the per-integration capture checklist (data synced, sync direction, frequency, setup complexity, limitations, tier, auth method)
   - Files cross-reference each other (file 036 references 035 for comparison, file 038 references 035/036/037)

2. **Mark this task complete:**
   - Update the Status checkboxes in this file:
     - [x] Planning Complete
     - [x] Implementation Complete
     - [x] Verification Complete
   - Add completion timestamp

3. **Document totals:**
   - Count total lines created across all 4 files
   - Verify acceptance criteria met

**Completion summary format:**

```markdown
## Completion

**Status:** COMPLETED
**Date:** [YYYY-MM-DD]
**PRD Part:** 03
**Summary:** [one-sentence summary]

### Requirements Completed by This Task
- [x] Task 5: Facebook/Meta Ads Integration (file 035, [XXX] lines)
- [x] Task 6: Google Ads Integration (file 036, [XXX] lines)
- [x] Task 7: TikTok Ads Integration (file 037, [XXX] lines)
- [x] Task 8: Other Ad Platform Integrations (file 038, [XXX] lines)

### PRD Status After This Task
- Requirements completed by this task: 4
- Total PRD requirements completed (cumulative): 8 (Tasks 1-8)
- Requirements remaining: 7 (Tasks 9-15)
- PRD completion: ONGOING (53% complete)

### Files Created
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-035.md` ([XXX] lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-036.md` ([XXX] lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-037.md` ([XXX] lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-038.md` ([XXX] lines)

Total: [XXXX] lines of comprehensive ad platform integration research documentation
```

- [x] Checkpoint: Step 6 complete

---

## Acceptance Criteria
- [x] `beprofit-casestudy-info-035.md` exists with comprehensive Facebook/Meta Ads documentation covering OAuth flow, data sync details (campaigns/ad sets/ads/conversions), attribution methodology (pixel + UTM, attribution windows), and troubleshooting
- [x] `beprofit-casestudy-info-036.md` exists with comprehensive Google Ads documentation covering connection setup, data sync (campaigns/ad groups/keywords/Shopping campaigns), GCLID attribution, and Google Analytics integration (if applicable)
- [x] `beprofit-casestudy-info-037.md` exists with TikTok Ads documentation emphasizing maturity comparison vs Facebook/Google, TikTok Pixel requirements, and attribution methodology
- [x] `beprofit-casestudy-info-038.md` exists with documentation of ALL other ad platforms (Snapchat, Pinterest, Bing, etc.) and includes comparative feature parity matrix across all ad platforms
- [x] All files follow the established template format (Source, main sections, Inferred UI Elements, Data Model Implications, Limitations & Gaps, Relevance to Our Build)
- [x] Per-integration capture checklist items are addressed for all platforms (data synced, sync direction, sync frequency, setup complexity, limitations, tier requirements, authentication method)
- [x] Files cross-reference each other (file 036 compares to file 035, file 038 builds feature parity matrix from files 035/036/037)
- [x] PRD Part 03 progress updated showing Tasks 5-8 complete, 7 tasks remaining

## Notes
- This is the second batch of PRD Part 03. The PRD has 15 tasks total; this task covers Tasks 5-8 (27% of PRD).
- File 035 (Facebook Ads) is the most critical and should be the most comprehensive, as Facebook Ads is the #1 ad platform for DTC e-commerce.
- File 036 (Google Ads) should document both Search and Shopping campaigns, as Google Shopping is critical for product-based businesses.
- File 037 (TikTok Ads) may have less documentation available (newer platform), but should emphasize gaps/maturity issues vs Facebook/Google.
- File 038 (Other Platforms) is a catch-all for Snapchat, Pinterest, Bing, and any other platforms discovered. Should include a feature parity matrix.
- The next task (011) will likely cover email/SMS, shipping, accounting integrations, and data sync documentation — Tasks 9-13.
- Task 012 will likely cover the integration comparison matrix and checkpoint review — Tasks 14-15.

---

## Completion

**Status:** COMPLETED
**Date:** 2026-02-13
**PRD Part:** 03
**Summary:** Created comprehensive research documentation for BeProfit's ad platform integrations covering Facebook/Meta Ads, Google Ads, TikTok Ads, and other ad platforms including Snapchat, Pinterest, Bing, Outbrain, and Taboola.

### Requirements Completed by This Task
- [x] Task 5: Facebook/Meta Ads Integration (file 035, 1,047 lines)
- [x] Task 6: Google Ads Integration (file 036, 1,006 lines)
- [x] Task 7: TikTok Ads Integration (file 037, 831 lines)
- [x] Task 8: Other Ad Platform Integrations (file 038, 773 lines)

### PRD Status After This Task
- Requirements completed by this task: 4
- Total PRD requirements completed (cumulative): 8 (Tasks 1-8)
- Requirements remaining: 7 (Tasks 9-15)
- PRD completion: ONGOING (53% complete)

### Files Created
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-035.md` (1,047 lines — Facebook/Meta Ads Integration)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-036.md` (1,006 lines — Google Ads Integration)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-037.md` (831 lines — TikTok Ads Integration)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-038.md` (773 lines — Other Ad Platforms)

Total: 3,657 lines of comprehensive ad platform integration research documentation

### Key Insights and Findings

**Facebook/Meta Ads (File 035):**
- BeProfit's most mature ad integration alongside Google Ads
- Uses automatic attribution + Pixel + UTM (lenient approach)
- 7-day click, 1-day view attribution window
- Critical limitation discovered: May only track attributed ad spend, not total spend
- Strong iOS 14+ workaround with automatic attribution

**Google Ads (File 036):**
- Uses strict UTM-only attribution to avoid misattributing organic search
- 30-day click, 1-day view attribution window (longer than Facebook)
- User review confirms critical issue: Only ~15% of ad spend tracked (attributed only)
- GCLID tracking is primary attribution method
- Supports Search, Shopping, Display, Video, Performance Max campaigns

**TikTok Ads (File 037):**
- Newer integration (2021-2023), less mature than Facebook/Google
- Uses automatic attribution + ttclid + Pixel + UTM
- 7-day click, 1-day view attribution window
- TikTok-specific metrics: video views, watch time, completion rate
- TikTok Shop integration unclear (in-app vs external website orders)
- Major growth opportunity as #3 ad platform for DTC

**Other Ad Platforms (File 038):**
- BeProfit supports 10+ ad platforms total
- Tier 2 platforms: Pinterest, Snapchat (medium maturity)
- Tier 3 platforms: Bing, Outbrain, Taboola (basic support)
- Amazon Ads may be in development (mentioned in Help Center)
- No support for B2B platforms (LinkedIn, Twitter/X)
- Unified data model and adapter pattern recommended for our build

### Critical Competitive Opportunity

**Incomplete Ad Spend Tracking Issue:**
- User review reports BeProfit only counts attributed ad spend for Google Ads
- Only ~15% of actual spend tracked (attributed conversions only)
- Remaining 85% of unattributed spend is ignored
- This massively inflates profit figures
- **MAJOR OPPORTUNITY:** We can differentiate by always tracking total spend, showing attribution breakdown

### Technical Challenges Identified

**Attribution Complexity:**
- Each platform has different attribution windows (7-day vs 30-day)
- Multiple attribution methods (Pixel, Click ID, UTM, automatic)
- Cross-device and multi-channel attribution difficulties
- iOS 14+ tracking limitations for Facebook/TikTok

**Platform-Specific Tracking:**
- Facebook: fbclid + Pixel events (CompletePayment)
- Google: GCLID + conversion tracking (strict UTM-only for BeProfit)
- TikTok: ttclid + Pixel events (CompletePayment)
- Pinterest: Pinterest Tag + 30-day attribution window
- Each requires separate OAuth flow and API integration

**Data Model Requirements:**
- Unified ad platform connection schema
- Unified ad spend data structure
- Platform adapter pattern for API differences
- Daily snapshot storage for historical reporting
- Retroactive attribution updates

### Recommendations for Our Product

**MVP (Must-have on launch day):**
1. Facebook/Meta Ads integration
2. Google Ads integration
3. TikTok Ads integration
4. **Always sync total ad spend** (not just attributed spend)
5. Show attribution breakdown (total vs attributed)
6. Alert users to low attribution rates

**Phase 2 (3-6 months post-launch):**
1. Pinterest Ads (for fashion/home decor brands)
2. Amazon Ads (for Amazon sellers)
3. Instagram Ads breakdown (separate from Facebook)
4. YouTube Ads breakdown (separate from Google)

**Phase 3 (6-12 months):**
1. Snapchat Ads (for Gen Z brands)
2. Microsoft Ads (Bing)
3. Advanced multi-touch attribution models
4. Creative performance insights

**Key Differentiators:**
1. **Complete ad spend tracking** (total spend, not just attributed)
2. Attribution rate monitoring and alerts
3. Platform-specific creative insights (video performance, pin design, etc.)
4. Multi-account support for agencies
5. Configurable attribution windows

### Verification Completed

All acceptance criteria met:
- ✅ `beprofit-casestudy-info-035.md` exists with comprehensive Facebook/Meta Ads documentation
- ✅ `beprofit-casestudy-info-036.md` exists with comprehensive Google Ads documentation
- ✅ `beprofit-casestudy-info-037.md` exists with TikTok Ads documentation
- ✅ `beprofit-casestudy-info-038.md` exists with documentation of all other ad platforms
- ✅ All files follow established template format
- ✅ Per-integration capture checklist items addressed for all platforms
- ✅ Files cross-reference each other appropriately
- ✅ PRD Part 03 progress updated showing Tasks 5-8 complete

### Next Task

Task 011 will cover:
- Klaviyo Integration (file 039)
- Other Email/SMS Integrations (file 040)
- Shipping Platform Integrations (file 041)
- Accounting & Other Integrations (file 042)
- Data Sync & Refresh Documentation (file 043)
