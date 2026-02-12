# BeProfit Custom Reports / Report Builder Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/report-templates-and-custom-reports-beprofit-help-center (Report Templates and Custom Reports)
  - https://help.runviably.com/beprofit/create-a-custom-report-beprofit-help-center (Create a Custom Report)
  - https://help.runviably.com/beprofit/schedule-reports-beprofit-help-center (Schedule Reports)
  - https://help.runviably.com/beprofit/custom-metrics-creation-for-plus-plan-members (Custom Metrics — Plus Plan)
  - https://help.runviably.com/beprofit/how-can-i-export-my-data (Data Export)
- **Category:** Core Feature / Custom Reports
- **Date Captured:** 2026-02-12
- **Cross-reference:** For P&L report structure, daily profit emails, and report scheduling basics, see **beprofit-casestudy-info-012.md**. This file focuses specifically on the custom report builder, templates, custom metrics, and data export capabilities.

---

## Report Builder Overview

BeProfit's reporting system sits under the **Reports** menu in the left sidebar (chart/document icon with right chevron). It contains two subsections:

1. **Custom Reports** — User-created reports with configurable metrics and filters
2. **Templates** — Pre-built report configurations that users can review, export, and customize

Reports provide "periodic insights into specific metrics that are important to you" and serve as the primary mechanism for recurring, scheduled data delivery beyond the interactive dashboard.

---

## Report Types

### 1. Custom Reports
User-built reports that can be personalized with specific metrics, date groupings, and schedules.

**Access:** Reports → Custom Reports

**Capabilities:**
- Create from scratch via the report builder
- Create from a template (customize and save)
- Edit after creation
- Schedule for recurring email delivery
- Export data

### 2. Report Templates (Preset)
Pre-defined report structures provided by BeProfit, designed for common reporting needs.

**Access:** Reports → Templates

**Capabilities:**
- Review and export pre-built reports
- Edit and save as a starting point for customization
- Schedule via "Preset Emails" section

**Available templates:** The Help Center does **not enumerate** the specific template names or what each template contains. Users must explore the Templates section in the app to discover available options.

---

## Creating Custom Reports

### Method 1: From Scratch

**Navigation:** Reports → Custom Reports → **"Create Report"** button

#### Step 1: Basic Info
Fill in organizational details to identify the report:
- **Report name** — descriptive title for the report
- **Organization details** — categorization/tagging (exact fields not documented)

#### Step 2: Report Data Configuration
This is the core of the report builder. Configuration follows a specific dependency chain:

1. **Select Date Grouping** (required first)
   - Must be selected before table columns and summary tiles become available
   - Options likely include: Daily, Weekly, Monthly, Quarterly, Yearly (mirroring the P&L time periods from file 012)

2. **Configure Table Columns** (dependent on date grouping)
   - Select which metrics appear in the report's data table
   - The available metrics are **not enumerated** in the Help Center documentation
   - Based on other features, likely includes: Revenue, COGS, Profit, Margin, Orders, Marketing, Fulfillment, etc.

3. **Select Main Summary Tiles** (optional)
   - Key metrics highlighted at the top of the report as KPI cards
   - Similar to the dashboard's snapshot/overview KPI cards
   - Optional — reports can have tabular data only

#### Step 3: Finalization
- **Default Timeframe** — sets the initial date range when viewing the report
- **Schedule** — configure recurring delivery (optional)
- Click **"Create Report"**

### Method 2: From Template

1. Navigate to **Reports → Templates**
2. Select a desired template
3. Click **"Edit and Save Template"**
4. Customize metrics, schedule, and timeframe
5. Save changes

This creates a copy based on the template that the user can further modify.

---

## Custom Report Configuration Options

| Setting | Description | Required? | Dependency |
|---------|-------------|-----------|------------|
| Basic Info | Report name and organizational details | Yes | None |
| Date Grouping | How data is grouped by time period | Yes | Must be selected first |
| Table Columns | Metrics displayed in the data table | Yes | Requires date grouping |
| Main Summary Tiles | KPI cards highlighted at report top | No | Requires date grouping |
| Default Timeframe | Default date range when viewing | Yes | None |
| Schedule | Automatic delivery configuration | No | None |

**Key UX finding:** The date grouping dependency is a significant UX detail — users must select how data is grouped temporally before they can choose which metrics appear. This creates a two-step configuration where the first choice (time granularity) unlocks the second (metric selection). BeProfit's documentation emphasizes this dependency: "the data you receive is tailored to meet your specific business goals and preferences."

---

## Available Dimensions and Metrics

The Help Center documentation **does not provide comprehensive lists** of available dimensions or metrics for custom reports. Based on cross-referencing with other feature documentation:

### Probable Dimensions (Grouping Options)
| Dimension | Source Evidence |
|-----------|----------------|
| Date (Daily/Weekly/Monthly/Quarterly/Yearly) | P&L report (file 012), required date grouping |
| Product | Products Analytics (file 016) |
| Vendor | Products Analytics grouping option |
| Product Type | Products Analytics grouping option |
| Collection | Dashboard products section (file 011) |
| Marketing Platform | Marketing Analytics (file 017) |
| Campaign | Marketing drill-down hierarchy |
| Customer Segment (New/Returning) | Dashboard filter, P&L comparison |
| Country | Marketing by Country feature |
| Order | Order-level tracking (file 013) |

### Probable Metrics (Column Options)
| Metric | Source Evidence |
|--------|----------------|
| Gross Sales | P&L structure (file 012) |
| Net Sales | P&L structure |
| Total Sales | Dashboard, Products Analytics |
| COGS | P&L, Products |
| Gross Profit | P&L, Dashboard |
| Gross Margin | P&L, Dashboard |
| Contribution Profit | Products Analytics, Dashboard |
| Contribution Margin | Products Analytics |
| Net Profit | P&L, Dashboard |
| Net Margin | P&L, Dashboard |
| Marketing Cost | P&L, Marketing Analytics |
| Fulfillment Cost | P&L, Dashboard |
| Transaction Fees | P&L |
| Taxes | P&L |
| Returns | P&L, Products Returns |
| Discounts | P&L |
| Order Count | Dashboard, Orders |
| AOV | Dashboard |
| ROAS | Marketing Analytics |
| POAS | Marketing Analytics |
| CPA | Marketing Analytics |
| Units Sold | Products Analytics |

**Gap:** This is a reconstructed list. The actual available metrics in the report builder may differ.

---

## Report Scheduling

### Scheduling Options

| Setting | Options |
|---------|---------|
| **Frequency** | Daily, Weekly, Monthly (Yearly also mentioned for templates) |
| **Delivery Time** | Select specific hour of day |
| **Recipients** | Multiple email addresses, manageable (add/remove) |

### Scheduling Custom Reports
1. Navigate to **Reports → Custom Reports**
2. Locate the report in the list
3. Toggle the **Schedule column** to **"Yes"**
4. Click the **edit icon** (three-dot menu)
5. Scroll to the Schedule section
6. Choose frequency (Daily / Weekly / Monthly)
7. Select delivery hour
8. Enter email addresses in the **Email Recipients** section
9. Click **Save**

### Scheduling Preset Report Emails
1. Navigate to **Reports → Templates**
2. Find the desired report in the **"Preset Emails"** section
3. Click the **edit icon** (three-dot menu) → **Edit**
4. Select delivery hour
5. Add email recipients
6. Save

### Recipient Management
- Add multiple email addresses per scheduled report
- Remove recipients by clicking the **"X"** next to their email address
- Users can remove themselves from scheduled reports

---

## Custom Metrics (Plus Plan Feature)

### What Are Custom Metrics?
Custom metrics are tailored KPIs created specifically for **Plus Plan subscribers** who need performance tracking beyond BeProfit's standard offerings. These enable monitoring of unique metrics aligned with specific operational needs.

### Eligibility
- **Plus Plan only** — not available on Basic, Pro, or Ultimate plans
- All requests undergo technical review by BeProfit's product team

### This Is NOT Self-Service
Custom metrics are **created by BeProfit's team**, not by users themselves. The process:

1. **Contact Support** — reach out via in-app chat or email
2. **Provide Formula Details:**
   - Proposed metric name
   - Mathematical formula using existing BeProfit data points
   - Business justification for the metric
3. **BeProfit reviews** — support forwards to product team for feasibility assessment
4. **Development** — if approved, dev team creates the metric
5. **Testing** — ensures accuracy across connected stores
6. **Deployment** — metric added to the user's dashboard
7. **Multi-store** — can be applied across all stores upon request

### Example Custom Metric
**Name:** "ROAS with Returns"
**Formula:** (Net Sales + Returns) / Marketing Spend
**Rationale:** Measures marketing effectiveness against initial sales before returns are subtracted

### Timeline
Typical turnaround: **3-5 business days** for approved requests

### Limitations
- Must utilize data already tracked within BeProfit
- Extremely complex calculations require additional assessment
- Some formulas may be technically impossible
- Not self-service — requires BeProfit staff involvement

---

## Data Export Capabilities

### Standard Export
- **Location:** Export button typically positioned in the **top right corner** of any page with exportable data
- **Scope:** Page-specific — each page/section must be exported separately
- **Method:** Click "Export" button → download starts
- **Format:** Not documented (likely CSV or Excel based on industry standards)

### Export Locations
Data can be exported from:
- Individual dashboard views
- Report pages
- Analytics sections (Products, Marketing, Orders)
- Any interface displaying the Export button

### Plus Plan Bulk Export
Plus plan members get a key enhancement: "export all the data at once from our Custom Reports screen."

This means:
- Standard plans: Must visit each page and export individually
- Plus plan: Centralized export from Custom Reports for all data in one operation

### Export Limitations
- **No documented file formats** — whether exports are CSV, Excel, PDF, or other format is not specified
- **No file size limits documented**
- **No data retention policies specified**
- **No API-based export** mentioned in the Help Center for reports (though API Access exists under Settings → Costs)
- **No webhook delivery** for automated export

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Reports sidebar menu | Navigation item | Left sidebar | Chart/document icon with chevron |
| Custom Reports sub-nav | Navigation item | Reports submenu | User-created reports section |
| Templates sub-nav | Navigation item | Reports submenu | Pre-built reports section |
| Create Report button | CTA button | Custom Reports page | Opens report builder |
| Basic Info form | Form fields | Report builder Step 1 | Name and organization |
| Date Grouping selector | Dropdown | Report builder Step 2 | Must select first |
| Table Columns selector | Multi-select | Report builder Step 2 | Choose metrics for table |
| Summary Tiles selector | Multi-select | Report builder Step 2 | Choose KPI tiles (optional) |
| Default Timeframe selector | Dropdown | Report builder Step 3 | Set default date range |
| Schedule toggle | Toggle switch | Custom Reports list | Enable/disable scheduled delivery |
| Three-dot menu | Icon button | Report/template rows | Edit, schedule, delete options |
| Frequency selector | Dropdown | Schedule configuration | Daily / Weekly / Monthly |
| Hour selector | Dropdown | Schedule configuration | Delivery time |
| Email recipients field | Text input + chips | Schedule configuration | Add/remove recipient emails |
| Recipient "X" button | Close button | Email chips | Remove recipient |
| Export button | Action button | Top right of data pages | Download data |
| Preset Emails section | List section | Templates page | Pre-configured email reports |
| Edit & Save Template button | Action button | Template detail | Clone template for customization |

---

## Data Model Implications

### Report Configuration Storage
1. **Report entity** — name, owner, created date, type (custom vs template-based)
2. **Date grouping** — enum (daily, weekly, monthly, quarterly, yearly)
3. **Column selection** — array of metric IDs
4. **Summary tile selection** — array of metric IDs (subset of columns)
5. **Default timeframe** — date range configuration
6. **Schedule configuration** — frequency, delivery hour, recipient list, enabled flag

### Scheduling Infrastructure
- **Job scheduler** — cron-like system for Daily/Weekly/Monthly report generation
- **Email delivery** — templated emails with report data/attachment
- **Recipient management** — per-report email list with add/remove capabilities
- **Timezone handling** — delivery hour must respect user's timezone

### Custom Metrics Engine (Plus Plan)
- **Metric definition** — name, formula (referencing other metric IDs), data type
- **Cross-store support** — metric definitions can be applied across multiple stores
- **Validation** — formula must reference existing data points
- **Deployment pipeline** — dev team builds and tests before deploying

---

## Limitations & Gaps

1. **No metric/dimension enumeration.** The Help Center never lists the complete set of available dimensions or metrics for the report builder. Users must explore the UI to discover options.

2. **No visualization types documented.** Whether custom reports support charts (bar, line, pie) or only tabular data is not specified. The builder focuses on "table columns" and "summary tiles" — suggesting table + KPI cards only, with no charting.

3. **No report sharing beyond email.** Reports can be scheduled via email but there's no mention of shared links, embedded views, PDF generation, or team-shared report dashboards.

4. **Template catalog is opaque.** The specific templates available and what each covers is not documented. This is a significant discovery gap.

5. **Custom metrics are not self-service.** Plus Plan custom metrics require contacting BeProfit support and waiting 3-5 business days. Users cannot create their own derived metrics through a UI.

6. **Export format unspecified.** Whether exports are CSV, Excel, PDF, or other formats is never documented.

7. **Bulk export is Plus-plan-gated.** The ability to export all data at once from Custom Reports is exclusively for Plus plan subscribers. Standard users must export page by page.

8. **No report versioning or history.** No mention of report version tracking, change history, or the ability to view how a report's configuration evolved over time.

9. **No conditional formatting or alerts within reports.** Reports appear to be static data snapshots with no documented ability to highlight anomalies, set thresholds, or trigger alerts based on report data.

10. **No API-based report delivery.** While API Access exists for cost updates, there's no documented API endpoint for retrieving report data programmatically.

---

## Relevance to Our Build

1. **Build a self-service report builder.** BeProfit's report builder is functional but basic (table + KPI tiles). We should offer a more visual builder with drag-and-drop metric selection, live preview, and chart type options.

2. **Enumerate all available metrics clearly.** BeProfit's undocumented metric catalog forces users to explore. We should provide a categorized, searchable metric picker with descriptions and formulas for each metric.

3. **Add chart types to reports.** If BeProfit only offers tables + summary tiles, we can differentiate with line charts, bar charts, pie charts, and combination charts within custom reports.

4. **Self-service custom metrics is a major differentiator.** BeProfit requires staff involvement for custom metrics. We should offer a formula builder where users can create derived metrics using existing data points (e.g., "Custom Margin = (Revenue - COGS - Shipping) / Revenue").

5. **Don't gate bulk export by plan.** Making bulk export a premium feature feels punitive. Offer reasonable export capabilities on all paid plans and reserve advanced features (scheduled exports, API access) for higher tiers.

6. **Build a proper template library.** Create named, described templates with preview thumbnails: "Weekly P&L Summary", "Monthly Marketing ROI", "Product Profitability Rank", "Daily Sales Flash", etc.

7. **Add report sharing beyond email.** Implement shareable links (with optional password protection), embedded views for external stakeholders, PDF generation, and Slack/Teams integration.

8. **Report scheduling should include more channels.** Email is the only delivery channel. Add Slack notifications, webhook delivery, dashboard pinning, and mobile push notifications.

9. **Implement conditional formatting.** Allow users to set thresholds within reports (e.g., "highlight products with margin < 10% in red") for proactive anomaly detection.

10. **Build live preview in the report builder.** BeProfit's documentation doesn't mention a preview before saving. Show a live preview with sample data as users configure columns, tiles, and date groupings.
