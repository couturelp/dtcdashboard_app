# Checkpoint Review #2 — Core Features Research (PRD Part 02)

## Source
- **Primary Sources:** beprofit-casestudy-info-011.md through 029.md (19 files)
- **Category:** Meta-Analysis / Checkpoint Review
- **Date Captured:** 2026-02-12

---

## Coverage Assessment

### PRD Part 02 Requirements

| Task | Requirement | File | Status | Depth Rating |
|------|------------|------|--------|--------------|
| 1 | Dashboard / Home Screen | 011 | Complete | Deep — 6 sections documented, 9+ KPI cards, donut chart, product cards, all UI elements inferred from real dashboard dump |
| 2 | Profit & Loss Reports | 012 | Complete | Deep — full P&L hierarchy, 3 display modes, 5 time periods, custom reports, scheduling, daily emails |
| 3 | Order-Level Profit Tracking | 013 | Complete | Deep — per-order cost visibility, hover breakdowns, UTM attribution, single/bulk editing, CSV workflow |
| 4 | Profit Calculation Methodology | 014 | Complete | Deep — complete formula chain (Gross→Con.→Net), 13 calculation preferences, cost allocation methods, predicted costs |
| 5 | COGS Management (Ongoing) | 015 | Complete | Deep — 6 methods with priority hierarchy, variant-level, effective dates, retroactive sync, bulk update |
| 6 | Product Analytics | 016 | Complete | Deep — Products Analytics (Con. Profit), Single Product (variant drill-down), Inventory, Returns, product comparison |
| 7 | Ad Spend Tracking & Attribution | 017 | Complete | Deep — 5 ad platforms, modified last-click, UTM dual attribution, POAS metric, 4 marketing channel tabs |
| 8 | Custom Reports / Report Builder | 018 | Complete | Moderate-Deep — 2-step builder with date grouping, scheduling, templates, Plus Plan custom metrics. Metric catalog undocumented |
| 9 | Customer Analytics | 019 | Complete | Moderate — cohort analysis with 4 base metrics, break-even visualization. Only 2 Help Center articles available |
| 10 | Shipping Cost Tracking (Detailed) | 020 | Complete | Deep — 6-method cost system, fulfillment profiles, dynamic rules, tiered rates, 10 platform integrations |
| 11 | Tax Handling | 021 | Complete | Moderate — platform-passthrough model only, per-order editing, no independent calculation or multi-jurisdiction support |
| 12 | Multi-Store & Multi-Currency | 022 | Complete | Deep — Workspace→Shop architecture, 4 platforms, aggregate views, currency conversion, per-shop isolation |
| 13 | Data Export & Scheduled Reports | 023 | Complete | Moderate-Deep — decentralized export, scheduling, API/FTP input, no output API, Plus-plan bulk gate |
| 14 | Alerts & Notifications | 024 | Complete | GAP ANALYSIS — no custom alerts exist, email-only notifications, notification bell undocumented |
| 15 | Goals & Targets | 025 | Complete | GAP ANALYSIS — no goal-setting features, adjacent features (benchmarks, simulators) partially documented |
| 16 | Inventory Tracking | 026 | Complete | Moderate-Deep — 6 inventory metrics, variant drill-down, valuation method (simple multiplication), depletion projections, Production Methods setting |
| 17 | Team & Collaboration | 027 | Complete | Moderate-Deep — binary role system (Admin/View Only), invitation flow, data protection, no collaboration features |
| 18 | API & Webhooks | 028 | Complete | GAP ANALYSIS + PARTIAL — API Access for cost input only, FTP integration, no public API docs, no webhooks, no Zapier/Make |
| 19 | Mobile App & White-Label | 029 | Complete | GAP ANALYSIS — no native app (Safari shortcut only), no white-label, partner program is referral-based |
| 20 | Checkpoint Review #2 | 030 | This file | — |

### Overall Completion: 19/19 research tasks complete (100%)

---

## Gap Analysis

### Information Gaps Identified

#### Critical Gaps (Would Block Rebuild)
1. **Custom report metric catalog not enumerated.** The report builder's available dimensions and metrics are completely undocumented — an engineer cannot rebuild the report builder without knowing what fields are available.
2. **Profit Simulator and Marketing Simulator functionality unknown.** Two prominent CTA features on the dashboard have zero documentation. Their inputs, outputs, calculations, and UX are entirely undiscovered.
3. **API endpoint specifications unavailable.** The API Access feature exists but has no public documentation. Authentication method, endpoints, payload format, and rate limits are unknown.

#### Significant Gaps (Would Require Additional Research)
4. **UTM Attribution system partially documented.** Several key articles returned 404 errors during research (files 017). UTM setup, custom rules, and affiliate UTM management are documented only at overview level.
5. **FTP Integration details entirely undocumented.** File formats, sync schedule, configuration options, and error handling for the FTP integration are not described in any Help Center article.
6. **Notification bell contents unknown.** The in-app notification indicator exists (file 024) but what populates it is completely undocumented.
7. **Production Methods and Industries settings undocumented.** Both Settings → Shop cards exist in the UI (file 026) but have no Help Center articles explaining their options or effects.
8. **Pricing and plan-feature matrix remains opaque.** Despite checking the pricing page (files 003, 023), the complete feature matrix per plan tier is not publicly available.

#### Minor Gaps (Acceptable for Build Planning)
9. **Data sync frequency not specified.** How often dashboards refresh from connected platforms is unknown but would affect architecture decisions.
10. **Export file formats not documented.** Whether exports are CSV, Excel, or PDF is never stated (file 023).
11. **Daily profit email content and layout undocumented.** The specific metrics in daily emails are unknown (file 012).
12. **Mobile feature parity unclear.** Which features work on mobile vs desktop-only is mostly undocumented beyond CSV upload (file 029).

### Topics That Need Deeper Research (Later PRDs)

| Topic | Why | Suggested PRD |
|-------|-----|---------------|
| Profit Simulator / Marketing Simulator | Prominent features with zero documentation | PRD Part 03 or dedicated research task |
| Working Capital feature | Has own nav item with "NEW" badge, 1 Help Center article not yet researched | PRD Part 03 |
| Insights feature | Has own nav item in sidebar, no documentation researched | PRD Part 03 |
| Competitor analysis (TrueProfit, Lifetimely, OrderMetrics) | BeProfit-only research limits competitive context | PRD Part 03 or later |
| Real app screenshots / interactive demo | Help Center text only; visual reference would improve documentation | Ongoing |
| BeProfit pricing deep-dive | Dynamic pricing page prevents full feature matrix capture | PRD Part 03 |

---

## Key Discoveries & Surprises

### Top 15 Unexpected Findings from Core Features Research

1. **Contribution Profit is the primary product-level metric, not Gross Profit.** BeProfit factors marketing cost allocation into product analytics (file 016), giving a more complete picture of per-product economics than simple Gross Profit. This is a sophisticated choice.

2. **Modified last-click attribution with Shopify as source of truth.** BeProfit deliberately avoids trusting ad platform self-reported conversions (file 017). Using Shopify order data for attribution is more accurate and defensible than platform-reported ROAS.

3. **Google Ads attribution is UTM-only by design.** BeProfit intentionally does NOT auto-attribute orders to Google Ads to avoid SEO misattribution (file 017). This is a nuanced design decision most competitors likely miss.

4. **Meta Conversions API is the ONLY outbound data flow.** Out of 16 confirmed integrations, 15 are inbound (data INTO BeProfit). The only outbound flow sends profit data to Meta for ad optimization (file 028). This creates a "data roach motel" — data checks in but doesn't check out programmatically.

5. **BeProfit has NO native mobile app.** The "Track Profit on your Mobile Device" article describes a Safari bookmark workaround (file 029). TrueProfit explicitly uses this gap in competitive positioning.

6. **Alerts and notifications are essentially non-existent.** Despite a notification bell in the UI, there are no custom alerts, threshold triggers, or real-time notifications (file 024). The only "notifications" are scheduled emails.

7. **Goals, targets, and budgets don't exist.** No goal-setting, budget tracking, or forecasting capability of any kind (file 025). This is a fundamental gap for a business management tool.

8. **Only two team roles: Admin and View Only.** The permissions system is binary with no data-level access control (file 027). Both roles see all financial data, making it impossible to restrict sensitive cost data from certain team members.

9. **Inventory valuation uses simple multiplication only.** No FIFO, LIFO, or weighted average (file 026). Inventory Cost = Quantity × Unit Cost, which is inadequate for accounting purposes.

10. **Tax handling is entirely platform-passthrough.** BeProfit has no independent tax calculation, no multi-jurisdiction reporting, and no tax service integrations (file 021). Tax corrections can only be made one order at a time.

11. **The Shopify COGS sync is retroactively dangerous.** Changing COGS in Shopify retroactively rewrites all past order costs in BeProfit with no undo capability (file 015). This could silently corrupt historical profit data.

12. **Exchange rate methodology is undocumented.** Multi-currency conversion happens automatically but the rate source, update frequency, and whether historical rates are used is unknown (file 022). This is a trust issue for multi-currency merchants.

13. **BeProfit's Help Center has 21 categories with ~100 articles, but quality is highly uneven.** Costs & Expenses (18 articles) is comprehensive while entire features like Customer Analytics have only 2 articles (file 001, file 019).

14. **Custom metrics require 3-5 business days of staff work.** Plus Plan custom metrics are not self-service — users submit requests and wait for BeProfit's team to build them (file 018). This is a managed service, not a product feature.

15. **The partner program is referral-only with no product features.** No white-label capabilities, no multi-client dashboard, no branded reports, and no agency-specific tools (file 029). The program provides commissions and a Slack channel, not product differentiation.

---

## Quality of Sources

### Help Center Coverage: Core Features vs Onboarding

| Dimension | PRD Part 01 (Onboarding) | PRD Part 02 (Core Features) |
|-----------|-------------------------|----------------------------|
| **Total articles researched** | ~60-70 | ~40-50 primary + broader web |
| **Documentation depth** | Generally good for setup workflows | Uneven — deep for costs, thin for analytics |
| **Step-by-step guides** | Consistently present | Present for settings, absent for analytics pages |
| **Screenshot/visual content** | Limited (text-based) | Limited (text-based), supplemented by real dashboard dump |
| **Feature completeness** | Most onboarding features documented | Several features undocumented (Simulators, Insights, Working Capital) |
| **GAP ANALYSIS files** | 0 (all features documented) | 3 files are partial/full gap analyses (024, 025, 028/029) |

### Source Quality Assessment

| Source Type | Coverage Quality | Notes |
|------------|-----------------|-------|
| **Help Center articles** | 7/10 | Good for cost configuration, weak for analytics features and newer capabilities |
| **Real dashboard visual inventory** | 9/10 | Extremely valuable — confirmed UI elements, settings structure, and features not in Help Center |
| **Marketing site (beprofit.co)** | 4/10 | Feature claims without depth; useful for positioning but not technical detail |
| **Third-party review sites** | 5/10 | Confirmed feature existence and competitive positioning; limited technical accuracy |
| **Competitor comparisons** | 6/10 | TrueProfit comparison valuable for identifying BeProfit gaps (mobile, features) |
| **App store listings** | 5/10 | Confirmed platform availability and feature claims |

### Real Dashboard Dump: Critical Contribution
The `prd/manually-added-dump-from-real-dashboard.md` file was the single most valuable supplementary source for PRD Part 02. It confirmed:
- Settings tab structure (Costs, Other Revenue, Shop, User, Workspace) — 5 tabs with 11 cost sub-sections
- UI elements not mentioned in Help Center (API Access card, FTP Integration card, Production Methods, Industries)
- Exact layout of Teammates table (Name, Status, Permissions columns)
- Platform support (Shopify, Amazon, WooCommerce, Wix logos)
- Marketing page structure (4 channel tabs, filter hierarchy, data table columns)
- Dashboard sections and KPI card values

---

## Feature Completeness Matrix

| Feature | Docs Quality | Build-Ready? | Key Gaps |
|---------|-------------|-------------|----------|
| **Dashboard** | High | Yes | Customization limits unclear, Simulators undocumented |
| **P&L Reports** | High | Yes | Template catalog opaque, export formats unknown |
| **Order Profit** | High | Yes | Partial refund COGS handling, bulk CSV format |
| **Profit Calculation** | High | Yes | BCAC formula missing, contribution profit inconsistency |
| **COGS Management** | High | Yes | COGS Profile variant handling, sync edge cases |
| **Product Analytics** | High | Yes | Full column list unknown, chart views undocumented |
| **Ad Spend/Attribution** | High | Yes | UTM details (404), Social/Email tabs undocumented |
| **Custom Reports** | Medium | Partially | Metric catalog unknown, visualization types unclear |
| **Customer Analytics** | Medium | Partially | Only 2 articles, no individual customer view, LTV formula unknown |
| **Shipping Cost Tracking** | High | Yes | Dynamic rules undocumented, carrier integration absent |
| **Tax Handling** | Medium | Yes (simple) | Minimal feature — passthrough only, easy to build |
| **Multi-Store/Currency** | High | Yes | Exchange rate source unknown, cross-store P&L unclear |
| **Data Export** | Medium | Yes | Export formats unknown, centralized export absent |
| **Alerts** | Low (GAP) | Greenfield | Feature doesn't exist — we define the spec |
| **Goals & Targets** | Low (GAP) | Greenfield | Feature doesn't exist — we define the spec |
| **Inventory Tracking** | Medium | Yes | No advanced valuation, no alerts, Production Methods unknown |
| **Team & Collaboration** | Medium | Yes | Binary roles, no collaboration features, per-shop permissions unclear |
| **API & Webhooks** | Low (GAP) | Greenfield | API docs not public, no webhooks, no iPaaS — we define the spec |
| **Mobile App** | Low (GAP) | Greenfield | No native app exists — we define the spec |

**Build-Ready Summary:**
- **12 features** have sufficient documentation to rebuild (with some gaps requiring inference)
- **2 features** are partially documented (Custom Reports, Customer Analytics — metric catalogs unknown)
- **5 features** are gap analyses (Alerts, Goals, API, Mobile, White-Label) — these are greenfield opportunities

---

## BeProfit Strengths Summary

Consolidated across all 19 research files, BeProfit's product strengths include:

### Core Analytics Engine
1. **Three-tier profit model** (Gross → Contribution → Net) provides progressively deeper profitability views
2. **Contribution Profit at the product level** factors in marketing cost allocation — more useful than simple Gross Profit
3. **13 calculation preferences** allow merchants to customize how profits are calculated to match their business model
4. **Predicted costs system** for returns and Amazon fees enables proactive profit projection

### Cost Configuration
5. **6 COGS methods with priority hierarchy** — comprehensive cost input system covering manual, bulk, integration, and sync methods
6. **6 shipping cost methods** with sophisticated fulfillment profiles, geographic rates, and platform integrations (10 providers)
7. **11 cost categories** in Settings → Costs covering every major expense type for DTC businesses
8. **Google Sheets integration for cost input** — low-friction data entry for merchants comfortable with spreadsheets

### Marketing Analytics
9. **Modified last-click attribution using Shopify as source of truth** — more accurate than trusting ad platform self-reporting
10. **UTM-based dual attribution** — gives merchants independent measurement alongside platform-reported metrics
11. **POAS (Profit on Ad Spend)** — a more meaningful metric than ROAS for profit-focused merchants
12. **4-level campaign drill-down** (Platform → Account → Campaign → Ad Group → Ad)

### Platform & Architecture
13. **Workspace → Shop architecture** supporting 4 e-commerce platforms with multi-store aggregation
14. **Automatic currency conversion** for multi-store merchants with different currencies
15. **Card-based, responsive dashboard design** with customizable KPI metrics and drag-and-drop layout
16. **Comprehensive Help Center** (~100 articles across 21 categories)

---

## BeProfit Weaknesses Summary

Consolidated across all 19 research files, BeProfit's product weaknesses represent our differentiation opportunities:

### Missing Feature Categories
1. **No custom alerts or threshold-based notifications** — email-only, schedule-based notifications (file 024)
2. **No goal-setting, budget tracking, or forecasting** — no target management of any kind (file 025)
3. **No native mobile app** — Safari bookmark workaround only (file 029)
4. **No public API for data retrieval** — data goes in but doesn't come out programmatically (file 028)
5. **No webhooks or iPaaS integrations** — no Zapier, Make, or event-driven automation (file 028)
6. **No white-label or agency-specific features** — partner program is referral-only (file 029)

### Feature Limitations
7. **Binary permission system** (Admin/View Only) with no data-level access control (file 027)
8. **No collaboration features** — no comments, annotations, shared views, or team discussions (file 027)
9. **Simple inventory valuation** (Qty × Price) without FIFO/LIFO/weighted average (file 026)
10. **Platform-passthrough tax handling only** — no independent calculation or multi-jurisdiction support (file 021)
11. **No multi-touch attribution** — modified last-click only, no first-click, linear, or data-driven models (file 017)
12. **Custom metrics require staff involvement** — 3-5 day managed service, not self-service (file 018)

### UX & Data Gaps
13. **Retroactive Shopify COGS sync** can silently corrupt historical data (file 015)
14. **Exchange rate methodology undocumented** — currency conversion is a black box (file 022)
15. **Export is page-by-page** with no centralized download, undocumented formats, Plus-plan bulk gate (file 023)
16. **No COGS version history or audit trail** — who changed what, when is invisible (file 015)
17. **21-day email auto-pause** penalizes email-only users (file 012)
18. **No individual customer view** — customer analytics is cohort-level only (file 019)
19. **No estimated vs actual shipping cost reconciliation** (file 020)
20. **Profit Simulator and Marketing Simulator are undocumented** — potentially valuable features with zero discoverability (file 011, 025)

---

## Statistics

| Metric | Value |
|--------|-------|
| **Total research files (PRD Part 02)** | 19 (files 011-029) |
| **Total lines written (PRD Part 02)** | 6,910 lines |
| **Average file length** | 364 lines |
| **Longest file** | 020 (Shipping Cost Tracking) — 487 lines |
| **Shortest file** | 024 (Alerts & Notifications) — 256 lines |
| **Help Center articles browsed (PRD Part 02)** | ~50 primary articles + broader web |
| **Gap analysis files** | 4 (files 024, 025, 028, 029 — partial or full) |
| **Total limitations documented (PRD Part 02)** | 190+ (10 per file × 19 files) |
| **Total "Relevance to Our Build" insights** | 190+ (10 per file × 19 files) |
| **External sources consulted** | Help Center, beprofit.co, app stores, GetApp, Capterra, SourceForge, TrueProfit comparison, WooCommerce docs, Shopify App Store, integrations.beprofit.co, beprofit.co/partnerships |
| **Features documented as present** | 14 |
| **Features documented as absent (gap analysis)** | 5 (Alerts, Goals, API Output, Mobile App, White-Label) |

### Combined Statistics (PRD Part 01 + Part 02)

| Metric | PRD Part 01 | PRD Part 02 | Total |
|--------|-------------|-------------|-------|
| **Research files** | 10 (001-010) | 20 (011-030) | 30 |
| **Total lines** | ~3,500 | ~7,300 (with this file) | ~10,800 |
| **Help Center articles** | ~60-70 | ~50 | ~110-120 |
| **Limitations documented** | ~80 | ~190+ | ~270+ |
| **Actionable insights** | ~80 | ~190+ | ~270+ |

---

## Relevance to Our Build — Top 15 Takeaways

The most important competitive intelligence insights from all core feature research, prioritized by impact:

### Tier 1: Foundational Differentiators (Build These First)
1. **Build a comprehensive public API (REST + webhooks) as the #1 technical differentiator.** BeProfit is a data roach motel. An API that lets merchants, agencies, and developers programmatically access their analytics data would unlock an entire ecosystem of integrations, custom dashboards, and automation workflows that BeProfit cannot support. This is the single biggest gap in the DTC profit analytics category.

2. **Build a native mobile app with push notifications.** This is an explicit competitive gap that TrueProfit already exploits. A mobile app with daily profit summaries, threshold alerts, and quick KPI viewing transforms the product from a "sit at your desk" tool into an always-with-you profit monitor.

3. **Implement custom alerts and threshold-based notifications.** The complete absence of data-driven alerts in BeProfit is the most significant product gap. Simple rules like "alert me if daily profit drops below $X" or "notify me if ROAS falls below 2.0" are high-value, moderate-complexity features.

### Tier 2: Core Experience Improvements
4. **Adopt the three-tier profit model (Gross → Contribution → Net) with transparent formulas.** BeProfit's model is correct. Improve on it by making every calculation interactive — hover over any number to see its components. Build "calculation explainers" that show merchants exactly how their profit is computed.

5. **Build a proper goal-setting and budget management system.** No competitor in this space does this well. Monthly profit targets, marketing budget caps with burn rate tracking, and revenue forecasting would add a strategic planning layer that pure analytics tools lack.

6. **Design granular roles and permissions from day one.** BeProfit's binary Admin/View Only system fails real-world team structures. Build role-based access with data-level controls: Marketing role sees campaigns but not COGS, Finance role sees all costs but not campaign details, etc.

### Tier 3: Feature Depth Advantages
7. **Build a centralized, format-flexible data export system.** BeProfit's page-by-page export with undocumented formats is frustrating. Offer a single "Data Export" page with format selection (CSV, Excel, PDF, JSON), scope selection, and schedule options.

8. **Implement advanced inventory management** — FIFO/weighted-average valuation, low-stock alerts, reorder points, and inventory carrying cost calculations. BeProfit's simple Qty × Price valuation is inadequate for merchants who need accounting-grade inventory data.

9. **Build a Zapier integration for instant ecosystem access.** A Zapier app with triggers and actions would connect our product to 7,000+ tools immediately. BeProfit has no iPaaS presence at all.

10. **Create white-label and agency features.** Custom branding, client portals, multi-client dashboards, and branded reports would serve the agency market that BeProfit's referral-only partner program ignores.

### Tier 4: Polish and Refinement
11. **Fix cost management UX weaknesses.** Make Shopify COGS sync behavior configurable (retroactive vs forward-only), add COGS version history with audit trail, implement cost validation warnings, and auto-discover new products in Google Sheets sync.

12. **Build estimated vs actual shipping cost reconciliation.** Show merchants the variance between their fulfillment profile estimates and actual carrier costs. This helps calibrate cost models and identify leakage.

13. **Implement multi-touch attribution models.** Offer first-click, linear, time-decay, and data-driven attribution alongside BeProfit's modified last-click. Let merchants compare models to understand their true marketing efficiency.

14. **Add per-customer detail views and RFM analysis.** BeProfit's customer analytics is cohort-level only. Individual customer pages with LTV trajectory, order history, and predictive churn scoring would be a significant step forward.

15. **Build tax-by-jurisdiction reporting.** BeProfit's passthrough-only tax model is a weakness for multi-state and international merchants. Even basic tax-by-region breakdown would serve compliance needs that BeProfit ignores entirely.
