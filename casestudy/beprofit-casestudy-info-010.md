# Checkpoint Review #1 — Onboarding & Getting Started Research

## Source
- **Primary Sources:** beprofit-casestudy-info-001.md through 009.md
- **Category:** Meta-Analysis / Checkpoint Review
- **Date Captured:** 2026-02-12

---

## Coverage Assessment

### PRD Part 01 Requirements

| Task | Requirement | File | Status | Depth Rating |
|------|------------|------|--------|--------------|
| 1 | Help Center Landing Page & IA Mapping | 001 | Complete | Deep — full 21-category taxonomy with article counts, URLs, and navigation hierarchy |
| 2 | Getting Started / Quick Start Guides | 002 | Complete | Deep — inferred onboarding sequence, 4 step-by-step workflows, required vs optional analysis |
| 3 | Account Creation & Setup | 003 | Complete | Deep — 10-step registration flow with field-level detail, auth methods, plan structure |
| 4 | Store Connection & Data Sync | 004 | Complete | Deep — 4 platforms with connection details, data sync catalog, multi-store/workspace architecture |
| 5 | COGS Initial Setup | 005 | Complete | Deep — 6 COGS methods with step-by-step flows, priority hierarchy, predicted costs, refund handling |
| 6 | Shipping Cost Setup | 006 | Complete | Deep — 6 shipping cost methods, 10 fulfillment platform integrations, tax/VAT handling, net shipping metric |
| 7 | Ad Platform Connection Setup | 007 | Complete | Deep — 5 ad platforms, OAuth flow, attribution model, cost allocation methods, plan-gating analysis |
| 8 | Other Onboarding Configurations | 008 | Complete | Moderate-Deep — tax, currency, team, notifications, calculation preferences; some areas lacked detailed help articles |
| 9 | Onboarding UX Analysis | 009 | Complete | Deep — reconstructed 19-step flow, empty state analysis, friction points, time-to-value, industry comparison |
| 10 | Checkpoint Review #1 | 010 | This file | — |

### Per-Article Capture Checklist Compliance

| Checklist Item | Consistently Captured? | Files Missing or Weak |
|---------------|----------------------|----------------------|
| Feature or setting described | Yes — all files | None |
| Step-by-step workflows | Yes — all files contain workflows | File 001 (IA mapping, no workflows expected) |
| Screenshot descriptions (inferred UI) | Partial | Most files describe UI elements textually but lack explicit screenshot descriptions. Files 002, 005, 006 are strongest on UI inference. Files 007, 008 describe UI at a higher level. |
| Configuration options and defaults | Yes — all files include config tables | None |
| Limitations, caveats, known issues | Yes — all files include detailed limitation sections | None — this is a strength of the research; each file has 7-11 limitations documented |
| Integration-specific instructions | Yes — files 004, 005, 006, 007 cover integrations in detail | File 008 mentions integrations less (focus is on settings/config) |
| Plan/tier feature gating mentions | Yes — all files include plan-gating tables | Gating details are often incomplete because BeProfit's pricing page is dynamically loaded and doesn't expose full feature matrices |
| Internal links to related articles | Yes — all files include Related Articles sections with URLs | None |
| Relevance to Our Build section | Yes — all files end with 7-10 actionable takeaways | None — this is consistently the strongest section across all files |

---

## Gap Analysis

### Information Gaps Identified

1. **Plan/pricing details remain opaque:** Despite checking the pricing page (file 003), BeProfit uses dynamic/GMV-based pricing loaded via iframe. We have Basic, Pro, Ultimate, and Plus tiers confirmed but NO complete feature matrix mapping features to plans. The most significant gating discovered is Ultimate-only ad attribution metrics (file 007).

2. **Sync duration not documented anywhere:** No help article specifies how long initial data sync takes for any platform. This is a significant knowledge gap — we don't know if Shopify syncs in minutes or hours, which affects our own sync UX design.

3. **Screenshot/UI detail limitations:** Since this research relied on Help Center text articles (not actual app screenshots or interactive demos), we have TEXT descriptions of UI elements but no visual reference. We know there's a "cloud icon" for sync status, "three-dot menus" for options, and "drag-and-drop" for dashboard customization, but we don't have mockups or pixel-level detail.

4. **Mobile experience undocumented:** File 003 mentions a desktop-optimized signup with mobile redirect, and the Help Center mentions "Track Profit on your Mobile Device" (not researched in PRD 01). The mobile experience is largely unknown.

5. **Onboarding email sequence unknown:** We know daily profit emails exist (file 008) and that they pause after 21 days of inactivity, but there's no documentation of whether BeProfit sends onboarding-specific emails (Day 1: welcome, Day 3: set up COGS, etc.).

6. **WooCommerce and Wix specifics are thin:** Most documentation is Shopify-centric. WooCommerce gets occasional mentions (different connection fields, currency settings). Wix is barely documented. Amazon has its own articles but with noted limitations (fee delays).

7. **Custom metrics and Plus plan features:** The Plus plan offers custom metrics "created by the BeProfit team" but no documentation explains what these metrics are, how they're requested, or what the creation process looks like.

8. **API/developer documentation absence:** No API docs were found anywhere in the Help Center (noted in file 001). We don't know if BeProfit offers a public API for programmatic access.

### Topics That Need Deeper Research in Later Tasks

| Topic | Why | Suggested PRD |
|-------|-----|---------------|
| Dashboard widgets and metrics | Core product experience not yet documented | PRD Part 02, Task 1 |
| P&L report structure | Critical for understanding profit calculation display | PRD Part 02, Task 2 |
| Order-level profit view | Key feature for per-order analysis | PRD Part 02, Task 3 |
| Exact profit calculation formula | Need to understand every component of the formula | PRD Part 02, Task 4 |
| Mobile app experience | Completely undocumented in PRD 01 research | PRD Part 02 or later |
| Competitor comparison (Lifetimely, OrderMetrics, TrueProfit) | BeProfit-only research limits competitive context | Later PRD |
| Actual app screenshots/flows | Help Center text only; need visual reference | Ongoing |

---

## Key Discoveries & Surprises

### Unexpected Findings

1. **BeProfit has NO onboarding wizard or guided setup.** For a product whose entire value depends on accurate cost configuration, the lack of post-registration guidance is a major UX oversight. Users can (and likely do) use the product with incomplete cost data, seeing artificially inflated profit numbers.

2. **6 COGS methods with a 6-level priority hierarchy** (file 005). This is more complex than expected. The priority hierarchy (Bulk Update > Manual Edit > CJ Integration > COGS Profile > Google Sheets > Product Page Manual) is well-thought-out but hard to discover in the UI.

3. **Google Ads attribution is UTM-only** (file 007). BeProfit deliberately does NOT auto-attribute orders to Google Ads (unlike Facebook, TikTok, etc.) to avoid SEO misattribution. This is a sophisticated design decision that most competitors likely miss.

4. **Meta Conversions API for profit reporting** (file 007). BeProfit can send profit data BACK to Meta for profit-optimized campaigns. This is a power feature but requires manual CS team setup — it's not self-service.

5. **BeProfit uses Shopify as the attribution source of truth** (file 007). Rather than trusting ad platform self-reported conversions, BeProfit uses Shopify order data for attribution. This is a defensible and accurate approach.

6. **Transaction fees auto-detected from Shopify plan** (file 008). BeProfit automatically applies the correct fee rates based on which Shopify plan the user has. This is a subtle but valuable auto-configuration.

7. **21-day email auto-pause** (file 008). Daily profit emails automatically stop if the user hasn't logged in for 21 days. This is an unusual anti-pattern — it penalizes email-only users.

8. **Calculation preferences don't affect all pages equally** (file 008). Orders and Marketing pages are NOT affected by calculation preferences, which can cause confusion when numbers differ between views.

9. **The Help Center has ~100 articles across 21 categories** (file 001). This is a substantial knowledge base for a focused product. The distribution is highly uneven — Costs & Expenses has 18 articles while several categories have only 1.

10. **Viably/BeProfit dual branding** (file 001). The Help Center is under the Viably brand (help.runviably.com) while the product is still marketed as BeProfit. This suggests an in-progress corporate rebrand.

---

## Quality of Sources

### Help Center Assessment

**Comprehensiveness:** 7/10 — The Help Center covers most features but with uneven depth. Core cost configuration articles (COGS, shipping, marketing) are thorough. Settings and account articles are thinner. Some features (calculation preferences, multi-currency) have only basic descriptions.

**Currency of content:** 7/10 — Most articles appear current (copyright 2026 Viably). However, the coexistence of "legacy" and "current" fulfillment systems (file 006) suggests some articles may describe deprecated features.

**Accuracy:** 8/10 — The documentation is generally consistent across articles. The FAQ aligns with feature-specific articles. Minor contradictions exist (e.g., file 002 says "can only show data in shop's currency" but file 008's multi-currency article describes broader conversion support).

**Missing coverage:** The Help Center lacks:
- Video tutorials or walkthroughs
- Changelog or "what's new" section
- API documentation
- Community or forum content
- System status page

### Additional Sources Used

| Source | Value | Notes |
|--------|-------|-------|
| beprofit.co (marketing site) | Medium | Good for positioning and feature claims; thin on technical details |
| beprofit.co/register/ (signup page) | High | Provided detailed registration flow analysis |
| Third-party review sites (GetApp, SourceForge) | Low-Medium | Confirmed platform list and feature claims |
| Help Center sidebar navigation | High | Provided the complete IA taxonomy (file 001) |

---

## Adjustments for Next Batch (PRD Part 02)

### Methodology Changes

1. **Attempt to access the actual app:** If possible, create a trial account to capture real screenshots and verify help article accuracy. Help Center text is valuable but visual reference would significantly improve documentation quality.

2. **Focus on metric definitions:** PRD Part 02 covers dashboard and reporting. The Profit Glossary article (https://help.runviably.com/beprofit/the-profit-glossary-beprofit-help-center) should be one of the first articles researched — it likely defines all metrics used throughout the product.

3. **Cross-reference with Shopify data model:** Since BeProfit's profit calculation depends on Shopify data fields, understanding which Shopify fields map to which BeProfit metrics will be critical for PRD Part 02's profit calculation methodology task.

4. **Track article freshness:** Note publish dates or "last updated" timestamps where visible. Some articles may describe outdated features.

5. **Check for video content:** The Help Center may embed tutorial videos that weren't captured in text-only fetches. Look for embedded YouTube or Vimeo content.

### Template Modifications

The current template works well. No structural changes needed. Two minor additions:

1. **Add "Inferred UI Elements" subsection:** Explicitly list UI components mentioned in documentation (buttons, menus, dialogs, indicators) to build a UI component inventory.

2. **Add "Data Model Implications" subsection:** When documenting features that touch multiple entities (orders, products, campaigns), note the implied data relationships for our own schema design.

---

## Statistics

- **Total files created:** 10 (including this file)
- **Total lines written:** ~3,500 across all 10 files
- **Help Center articles/pages browsed:** ~60-70 unique article pages
- **Other sources consulted:** beprofit.co marketing site, beprofit.co/register (signup form), GetApp, SourceForge, WooCommerce docs
- **Topics covered:** Help Center IA, onboarding flow, account creation, store connection, COGS setup, shipping costs, ad platforms, settings/config, UX analysis, checkpoint review
- **Unique URLs referenced across all files:** ~100+
- **Limitations documented:** 70+ across all files (7-11 per file)
- **"Relevance to Our Build" insights:** 80+ actionable takeaways across all files (7-10 per file)

---

## Relevance to Our Build

### Top 10 Takeaways from Onboarding Research

1. **Build the onboarding wizard that BeProfit doesn't have.** This is the single biggest product differentiation opportunity identified in PRD Part 01 research. A guided setup flow with progress tracking, data accuracy indicators, and contextual help would dramatically improve time-to-value over BeProfit's "figure it out yourself" approach.

2. **Solve the "silent inaccuracy" problem.** When costs are unconfigured, profit data is wrong but looks right. Display accuracy indicators ("Your profit data is ~40% complete — configure shipping costs to improve") to create urgency for setup completion without blocking dashboard access.

3. **Start with Shopify, but design for multi-platform from day one.** BeProfit's Shopify integration is deepest (auto-fees, COGS sync, UTM attribution). We should match Shopify depth but architect our data model to support WooCommerce, Amazon, Wix, and future platforms without platform-specific hacks.

4. **Use the ecommerce platform as the source of truth for attribution.** BeProfit's decision to use Shopify order data (not ad platform self-reported data) for attribution is correct and defensible. We should adopt the same approach.

5. **Support 5 ad platforms at launch: Facebook, Google, TikTok, Pinterest, Snapchat.** These are the platforms BeProfit supports and they cover the vast majority of DTC ad spend. Add Amazon Ads integration (BeProfit's gap) as a quick differentiator.

6. **Auto-configure everything possible.** BeProfit auto-detects Shopify plan fees, syncs store names via webhooks, and pulls tax from order data. Every auto-configuration reduces setup friction. We should auto-detect even more: suggest COGS based on product category averages, estimate shipping costs from store location, pre-configure common expense categories.

7. **Design cost configuration UX for simplicity first.** BeProfit's 6 COGS methods and multi-step fulfillment profiles are powerful but overwhelming. Lead with the simplest method (e.g., "Import from Shopify") and progressively reveal advanced options (profiles, Google Sheets, CSV).

8. **Implement meaningful empty states.** Every unconfigured section should show an actionable empty state that explains what the user is missing and provides a one-click path to setup. "No shipping costs configured — your profit may be inflated by $X" is more compelling than a blank section.

9. **Offer granular user roles from launch.** BeProfit's Admin/View Only two-role system is too simple. Support at least: Owner, Admin, Finance, Marketing, Viewer — with feature-level and shop-level permissions.

10. **Build notification infrastructure beyond email.** BeProfit's email-only notifications are insufficient. Plan for: in-app alerts, Slack/Teams integration, threshold-based triggers, mobile push notifications, and webhook callbacks for automated workflows.
