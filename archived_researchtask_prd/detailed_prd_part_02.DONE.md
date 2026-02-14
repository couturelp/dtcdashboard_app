# PRD Part 02: Help Center — Core Features (Dashboard, Reports, Profit Calc, COGS)

## Overview
Deep-dive into BeProfit's core product features as documented in the Help Center. This covers the dashboard, reporting system, profit calculation methodology, COGS management, and all core analytics functionality. The goal is to understand these features at a level of detail sufficient for an engineer to rebuild them.

## Output Files
`beprofit-casestudy-info-011.md` through `beprofit-casestudy-info-030.md`

## Tasks

### Task 1: Dashboard / Home Screen Documentation
- Document all dashboard widgets and their metrics
- Capture available time range selectors
- Note dashboard customization options (rearrange, add/remove widgets)
- Document what KPIs are shown by default
- Capture drill-down capabilities from dashboard widgets
- **Output:** `beprofit-casestudy-info-011.md`

### Task 2: Profit & Loss Reports
- Document P&L report structure and layout
- Capture how profit is calculated (formula, included/excluded items)
- Note all line items in the P&L (revenue, COGS, shipping, ads, fees, taxes, etc.)
- Document time period options and comparison features
- Capture export options (CSV, PDF)
- **Output:** `beprofit-casestudy-info-012.md`

### Task 3: Order-Level Profit Tracking
- Document order-level profit view and methodology
- Capture what costs are attributed to each order
- Note how partial refunds, returns, and cancellations are handled
- Document order filtering and search capabilities
- Capture the order detail view
- **Output:** `beprofit-casestudy-info-013.md`

### Task 4: Profit Calculation Methodology
- Document the exact profit calculation formula
- Capture how each cost component is sourced (auto vs manual)
- Note handling of discounts, gift cards, taxes
- Document platform fees calculation (Shopify transaction fees, payment processor fees)
- Capture any documented accuracy limitations
- **Output:** `beprofit-casestudy-info-014.md`

### Task 5: COGS Management (Ongoing)
- Document ongoing COGS management beyond initial setup
- Capture bulk edit, CSV re-upload, and individual product editing
- Note COGS history and versioning (can you set different costs for different time periods?)
- Document variant-level cost support
- Capture COGS auto-sync from suppliers if available
- **Output:** `beprofit-casestudy-info-015.md`

### Task 6: Product Analytics
- Document per-product profitability views
- Capture best/worst performer rankings
- Note product grouping or categorization options
- Document product-level metrics available (revenue, cost, profit, margin, units sold)
- Capture product comparison features
- **Output:** `beprofit-casestudy-info-016.md`

### Task 7: Ad Spend Tracking & Attribution
- Document ad spend tracking features in detail
- Capture which ad platforms are supported and what metrics are pulled
- Note the attribution model used (first-click, last-click, etc.)
- Document ROAS, CPA, and other ad performance metrics
- Capture campaign-level vs ad set-level vs ad-level granularity
- **Output:** `beprofit-casestudy-info-017.md`

### Task 8: Custom Reports / Report Builder
- Document the custom report builder functionality
- Capture available dimensions, metrics, and filters
- Note visualization options (tables, charts, graphs)
- Document report saving, scheduling, and sharing
- Capture any report templates provided
- **Output:** `beprofit-casestudy-info-018.md`

### Task 9: Customer Analytics
- Document customer-level analytics (LTV, cohort analysis, acquisition cost)
- Capture customer segmentation options
- Note repeat purchase tracking
- Document customer profitability views
- **Output:** `beprofit-casestudy-info-019.md`

### Task 10: Shipping Cost Tracking (Detailed)
- Document shipping cost tracking in full detail
- Capture estimation vs actual cost reconciliation
- Note carrier-specific tracking
- Document shipping profitability analysis
- **Output:** `beprofit-casestudy-info-020.md`

### Task 11: Tax Handling
- Document how taxes factor into profit calculations
- Capture tax inclusion/exclusion settings
- Note multi-jurisdiction tax handling
- Document tax reporting features
- **Output:** `beprofit-casestudy-info-021.md`

### Task 12: Multi-Store & Multi-Currency Support
- Document multi-store management capabilities
- Capture how multiple Shopify/WooCommerce stores are handled
- Note cross-store reporting and aggregation
- Document currency conversion methodology and settings
- Capture multi-currency display options
- **Output:** `beprofit-casestudy-info-022.md`

### Task 13: Data Export & Scheduled Reports
- Document all data export capabilities (CSV, PDF, etc.)
- Capture scheduled export/report delivery features
- Note email report scheduling options
- Document API-based data access if documented
- **Output:** `beprofit-casestudy-info-023.md`

### Task 14: Alerts & Notifications
- Document alert/notification system
- Capture available trigger types (profit drop, cost spike, etc.)
- Note notification channels (email, in-app, Slack, etc.)
- Document alert customization options
- **Output:** `beprofit-casestudy-info-024.md`

### Task 15: Goals & Targets
- Document goal-setting features if they exist
- Capture profit target tracking
- Note progress visualization for goals
- **Output:** `beprofit-casestudy-info-025.md`

### Task 16: Inventory Tracking
- Document any inventory tracking features
- Capture inventory valuation methods
- Note stock-level monitoring and alerts
- **Output:** `beprofit-casestudy-info-026.md`

### Task 17: Team & Collaboration Features
- Document multi-user support
- Capture roles and permissions system
- Note team invitation and management flows
- Document any collaboration features (comments, shared views)
- **Output:** `beprofit-casestudy-info-027.md`

### Task 18: API & Webhook Documentation
- Document any public API endpoints
- Capture authentication methods and rate limits
- Note available data endpoints
- Document webhook functionality if any
- **Output:** `beprofit-casestudy-info-028.md`

### Task 19: Mobile App & White-Label Features
- Document mobile app existence and capabilities
- Capture any white-label or agency-specific features
- Note feature parity between mobile and desktop
- **Output:** `beprofit-casestudy-info-029.md`

### Task 20: Checkpoint Review #2
- Perform structured checkpoint review
- Assess depth of core feature documentation
- Identify remaining gaps — could an engineer rebuild these features from the docs?
- Plan next research phase
- **Output:** `beprofit-casestudy-info-030.md`

## Progress

### Task 004 - 2026-02-12
- Status: COMPLETED
- Summary: Deep-dive research into BeProfit's core product features — dashboard layout (6 sections, Today's Snapshot, Overview with 9 KPI cards, Profit & Expenses donut chart, Orders/Profits/Marketing/Products sections, customization via drag-and-drop), P&L reports (hierarchical from Gross Sales to Net Profit, 5 time periods, 3 display modes, custom report builder, scheduling system, daily profit emails with 21-day inactivity cutoff), order-level profit tracking (per-order cost visibility, hover breakdowns, UTM attribution, single/bulk cost editing, CSV bulk update workflow, COGS exclusion for full refunds), profit calculation methodology (complete formula chain documented — Gross/Contribution/Net profit tiers, 13 calculation preferences, marketing cost allocation methods CAC vs CPA, predicted costs for returns and Amazon fees, BeProfit vs Shopify discrepancy analysis), and ongoing COGS management (6 methods with priority hierarchy, variant-level support, effective date ranges, retroactive sync behaviors, Google Sheets/Shopify/CJ auto-sync, bulk update workflows).
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-011.md` (~300 lines — Dashboard / Home Screen Documentation)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-012.md` (~320 lines — Profit & Loss Reports)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-013.md` (~310 lines — Order-Level Profit Tracking)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-014.md` (~400 lines — Profit Calculation Methodology)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-015.md` (~350 lines — COGS Management Ongoing)

### Task 005 - 2026-02-12
- Status: COMPLETED
- Summary: Deep-dive research into BeProfit's analytics and reporting features — Product Analytics (Products Analytics page with Contribution Profit as primary metric, 4 grouping dimensions, Single Product view with variant-level drill-down and product comparison, Inventory page with dual value/cost tracking and stock depletion projections, Products Returns with return rate and amount rate metrics), Ad Spend Tracking & Attribution (Marketing Analytics page with 4 channel tabs, dual-axis trend charts, hierarchical Platform→Account→Campaign→AdSet→Ad drill-down, modified last-click attribution model with Shopify as source of truth, CAC vs CPA allocation methods, Marketing by Country, Affiliate/Influencer tracking with UTM attribution, campaign exclusion capabilities), Custom Reports / Report Builder (two-step builder with date grouping dependency, table columns + summary tiles, report scheduling with Daily/Weekly/Monthly frequency, template-based creation, Plus Plan custom metrics requiring 3-5 day staff creation, page-specific export with Plus-plan bulk export), Customer Analytics (Cohort Analysis chart with 4 base metrics: Sales/ROAS/Repurchase Rate/Gross Profit, Accumulated vs Marginal progression modes, break-even indicator visualization, CAC and LTV per cohort, limited to 2 Help Center articles), Shipping Cost Tracking Detailed (6-method cost system deep dive, fulfillment profile creation with primary variable/rate tiers/geographic matrix/refinement conditions, dynamic fulfillment rules, quantity-based tiered rates, 10 fulfillment platform integrations with order ID/tracking code matching, Net Shipping metric, tax/VAT limitations, custom fulfillment expenses).
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-016.md` (~373 lines — Product Analytics)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-017.md` (~453 lines — Ad Spend Tracking & Attribution)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-018.md` (~362 lines — Custom Reports / Report Builder)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-019.md` (~320 lines — Customer Analytics)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-020.md` (~487 lines — Shipping Cost Tracking Detailed)

### Task 006 - 2026-02-12
- Status: COMPLETED
- Summary: Research into BeProfit's platform-level configuration and operational infrastructure features — Tax Handling (platform-passthrough tax model with per-order manual editing only, no independent tax calculation, no multi-jurisdiction support, no tax rate configuration, taxes sourced from e-commerce platform order data, tax on goods + tax on shipping as two editable fields, no tax-specific calculation preferences), Multi-Store & Multi-Currency Support (Workspace→Shop 1:N architecture supporting Shopify/Amazon/WooCommerce/Wix, multi-store aggregate views with checkbox selection, workspace-level base currency with automatic currency conversion, per-shop independent settings, store name auto-sync via webhooks, undocumented exchange rate methodology), Data Export & Scheduled Reports (decentralized page-specific export with no centralized export page, undocumented export formats, Plus-plan-only bulk export from Custom Reports, scheduled reports with Daily/Weekly/Monthly frequency and configurable recipients, daily profit emails with 21-day inactivity auto-pause, API Access for cost input only — no public API for data retrieval, no webhook notifications, no Google Sheets output sync), Alerts & Notifications (GAP ANALYSIS — no dedicated alerting system, no custom threshold triggers, no real-time alerts, email-only notification channel, notification bell in top nav is undocumented, Notification Management settings card exists but preferences undocumented, significant competitive differentiation opportunity), Goals & Targets (GAP ANALYSIS — no explicit goal-setting features, no profit/revenue targets, no budget management, no forecasting/projections, adjacent features include Benchmark Profit Analysis with industry percentile comparison, Compare Periods for historical comparison, undocumented Profit Simulator and Marketing Simulator tools, Predicted Costs as limited cost forecasting).
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-021.md` (~309 lines — Tax Handling)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-022.md` (~363 lines — Multi-Store & Multi-Currency Support)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-023.md` (~313 lines — Data Export & Scheduled Reports)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-024.md` (~256 lines — Alerts & Notifications — Gap Analysis)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-025.md` (~296 lines — Goals & Targets — Gap Analysis)

### Task 007 - 2026-02-12
- Status: COMPLETED
- Summary: Final batch of PRD Part 02 research — Inventory Tracking (dedicated Inventory page with 6 metrics: quantity, value, cost, unit count, daily sales, depletion projection; simple multiplication valuation only — no FIFO/LIFO; variant-level drill-down; Production Methods settings card undocumented; no low-stock alerts or reorder points), Team & Collaboration Features (binary role system with Admin and View Only roles; email-based invitation flow; Teammates table with Name/Status/Permissions columns; no data-level access control — both roles see all data; no collaboration features — no comments, annotations, or shared views; GDPR-compliant data protection with encryption), API & Webhook Documentation (GAP ANALYSIS + PARTIAL — API Access for cost input only under Settings → Costs; FTP Integration for batch cost file upload; no public API documentation found anywhere; no REST endpoints for data retrieval; no webhooks; no Zapier/Make integration; 16 integrations confirmed — 15 inbound, 1 outbound to Meta only; developer experience rated 1/10), Mobile App & White-Label Features (GAP ANALYSIS — no native iOS or Android app; Safari shortcut workaround only; no push notifications; no PWA features; no white-label capabilities; partner program is referral-based with commissions and Slack support but no product features for agencies), Checkpoint Review #2 (synthesis of all 19 research files: 6,910 lines, 12 features build-ready, 2 partially documented, 5 greenfield gap analyses; top differentiators identified: public API, mobile app, custom alerts, goal-setting, granular permissions, white-label/agency features).
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-026.md` (~376 lines — Inventory Tracking)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-027.md` (~386 lines — Team & Collaboration Features)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-028.md` (~405 lines — API & Webhook Documentation — Gap Analysis)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-029.md` (~412 lines — Mobile App & White-Label Features — Gap Analysis)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-030.md` (~305 lines — Checkpoint Review #2)

### Cumulative Progress (All Tasks)
- [x] Task 1: Dashboard / Home Screen - completed in Task 004
- [x] Task 2: Profit & Loss Reports - completed in Task 004
- [x] Task 3: Order-Level Profit Tracking - completed in Task 004
- [x] Task 4: Profit Calculation Methodology - completed in Task 004
- [x] Task 5: COGS Management (Ongoing) - completed in Task 004
- [x] Task 6: Product Analytics - completed in Task 005
- [x] Task 7: Ad Spend Tracking & Attribution - completed in Task 005
- [x] Task 8: Custom Reports / Report Builder - completed in Task 005
- [x] Task 9: Customer Analytics - completed in Task 005
- [x] Task 10: Shipping Cost Tracking (Detailed) - completed in Task 005
- [x] Task 11: Tax Handling - completed in Task 006
- [x] Task 12: Multi-Store & Multi-Currency - completed in Task 006
- [x] Task 13: Data Export & Scheduled Reports - completed in Task 006
- [x] Task 14: Alerts & Notifications - completed in Task 006
- [x] Task 15: Goals & Targets - completed in Task 006
- [x] Task 16: Inventory Tracking - completed in Task 007
- [x] Task 17: Team & Collaboration - completed in Task 007
- [x] Task 18: API & Webhooks - completed in Task 007
- [x] Task 19: Mobile App & White-Label - completed in Task 007
- [x] Task 20: Checkpoint Review #2 - completed in Task 007

### Remaining Work for This PRD
None — all 20 tasks complete. PRD Part 02 is DONE.
