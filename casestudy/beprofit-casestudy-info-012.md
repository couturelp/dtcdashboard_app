# BeProfit Profit & Loss Reports

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/understanding-your-pl-report-interface
  - https://help.runviably.com/beprofit/schedule-reports-beprofit-help-center
  - https://help.runviably.com/beprofit/report-templates-and-custom-reports-beprofit-help-center
  - https://help.runviably.com/beprofit/create-a-custom-report-beprofit-help-center
  - https://help.runviably.com/beprofit/daily-profit-emails-in-beprofit
  - https://help.runviably.com/beprofit/how-can-i-export-my-data
  - https://help.runviably.com/beprofit/how-can-i-view-weekly-data
- **Category:** Core Feature / Reporting
- **Date Captured:** 2026-02-12

---

## P&L Report Overview

The Profit & Loss (P&L) report is BeProfit's primary financial reporting tool. It presents a hierarchical breakdown of revenue, expenses, and profitability across configurable time periods. The report follows standard accounting structure from Gross Sales down to Net Profit, with intermediate subtotals at each stage.

---

## P&L Report Structure (Line Items)

The report presents items in this hierarchical sequence:

### Revenue Section
1. **Gross Sales** — Pre-deduction revenue (total sales before any adjustments)
2. **Discounts** — Price reductions applied at checkout
3. **Refunds** — Money returned to customers
4. **Total Sales** — Net revenue post-adjustments (Gross Sales - Discounts - Refunds)
5. **Sales Taxes** — Calculated based on applicable tax rates
6. **Net Sales After Tax** — Total Sales minus Sales Taxes

### Direct Costs Section
7. **Product Costs (COGS)** — Cost of goods sold
8. **Marketing Costs** — Channel-specific breakdown:
   - Google Ads
   - Facebook Ads
   - (Other connected ad platforms)
9. **Gross Profit** — Revenue minus direct costs
10. **Gross Margin** — Gross Profit as percentage of sales

### Operating Expenses Section
11. **Operational Expenses** — Fixed and variable operating costs, including:
    - Digital Marketing expenses
    - Content creation costs
    - Design costs
    - Software subscriptions
    - Equipment
    - Office expenses
    - Insurance
    - Employee costs
    - Utilities
    - Rent
    - Warehouse expenses

### Bottom Line
12. **Net Profit** — Revenue minus all costs (direct + operating)
13. **Net Margin** — Net Profit as percentage of sales

---

## P&L Report Time Period Options

### Available Timeframes
- **Yearly** — Annual view
- **Quarterly** — Quarter-by-quarter view
- **Monthly** — Month-by-month view
- **Weekly** — Week-by-week view
- **Daily** — Day-by-day view

### Date Range Selection
- Custom date ranges via calendar picker
- Ability to examine specific date ranges with comparative totals
- Multiple predefined date range options available (exact presets not documented)

---

## P&L Report Display Options

### Value Format Toggles
Three viewing modes for how metrics are displayed:

| Mode | Description |
|------|-------------|
| **Currency ($)** | Show all metrics as dollar amounts |
| **% of Sales** | "See all metrics as percentages of total sales" |
| **Both** | Display currency amounts and percentages simultaneously |

### Customer Segmentation
Toggle to "compare performance between customer segments":
- **New Customers** — First-time buyers
- **Returning Customers** — Repeat purchasers

This allows side-by-side P&L comparison by customer acquisition status.

---

## P&L Report Export Options

### Available Actions
- **Print** — Print the report for physical documentation
- **Download** — Download for external analysis (exact format not specified — likely CSV/Excel)

### Export Limitations
- Export is **page-specific** — data must be exported from each respective page/view
- No single "export everything" button (except for Plus plan — see below)
- Exact file formats (CSV, Excel, PDF) are **not documented** in the Help Center
- File size limitations and data retention policies not specified

### Plus Plan Export Enhancement
Plus plan subscribers can "streamline this process by exporting all the data at once from our Custom Reports screen." This is the only documented method for bulk, cross-section data export.

---

## Custom Reports System

### Two Types of Reports
1. **Report Templates (Preset)** — Pre-configured reports provided by BeProfit, ready to use
2. **Custom Reports** — User-created reports with configurable metrics and filters

### Creating Custom Reports

**Method 1: From Scratch**
1. Navigate to Reports → Custom Reports
2. Click "Create Report"
3. Complete **Basic Info** section (name, organization)
4. Configure **Report Data** — select filters, grouping, and metrics
5. **Important:** Must select a **date grouping** before table columns and summary tiles become available
6. Select **Main Summary Tiles** (optional) — key metrics highlighted at top of report
7. Set **Default Timeframe** for the report
8. Configure **Schedule** (optional)
9. Click "Create Report"

**Method 2: From Template**
1. Navigate to Reports → Templates
2. Choose a desired template
3. Click Edit and Save Template
4. Customize metrics, schedule, and timeframe to taste
5. Save changes

### Custom Report Configuration Options

| Setting | Description | Required? |
|---------|-------------|-----------|
| Basic Info | Report name and organization details | Yes |
| Date Grouping | How data is grouped by time (daily, weekly, monthly, etc.) | Yes — must be selected first |
| Table Columns | Metrics displayed in the data table | Yes — dependent on date grouping |
| Main Summary Tiles | Key metrics highlighted at report top | No — optional |
| Default Timeframe | Default date range when viewing report | Yes |
| Schedule | Automatic delivery frequency and recipients | No — optional |

### Report Templates
Pre-built reports available as starting points. Users can edit templates to customize metrics, schedule, and timeframe. Exact template names and contents are **not enumerated** in the Help Center documentation.

---

## Report Scheduling

### Scheduling Preset Emails
1. Navigate to Reports → Templates
2. Find the desired preset email in "Preset Emails" section
3. Click the edit icon (three-dot menu)
4. Select delivery hour
5. Add email recipients
6. Save

### Scheduling Custom Reports
1. Navigate to Reports → Custom Reports
2. Toggle the Schedule column to "Yes" for the desired report
3. Click the edit icon (three-dot menu)
4. Configure:
   - **Frequency:** Daily, Weekly, or Monthly
   - **Time:** Select delivery hour
   - **Recipients:** Add email addresses
5. Save

### Managing Recipients
- Add multiple email recipients per scheduled report
- Remove unwanted recipients by clicking the X next to their email address

---

## Daily Profit Emails

### Overview
BeProfit sends automated daily profit report emails summarizing store performance.

### Delivery Rules
- Emails sent daily while the user remains active
- **21-day inactivity rule:** Emails pause automatically if the user hasn't logged in for 21 days
- The final report arrives exactly 21 days after the last login
- Logging back in resumes email delivery

### Email Management
- Navigate to Settings → Shop → Notification Management to control preferences
- Users can subscribe/unsubscribe from daily emails

### Troubleshooting Stopped Emails
1. Check notification settings in Notification Management
2. Verify the account hasn't been inactive for 21+ days
3. Log back in to resume delivery
4. Contact support if issues persist

### Limitations
- Specific metrics included in daily emails are **not documented**
- Customization options for email content are **not described**
- No mention of scheduling the delivery time for daily emails (vs scheduled reports which allow time selection)
- The 21-day auto-pause is unusual and may frustrate email-only users

---

## Historical Data Access

### Manual Method
1. Log into BeProfit dashboard
2. Click the date range selector
3. Choose from multiple predefined date range options
4. Custom date range selection via calendar interface available

### Automated Method
Set up Custom Reports with daily, weekly, or monthly email delivery to receive historical data automatically without manual date selection.

### Data Retention
Data retention limits are **not documented.** It's unclear how far back historical data is available (months? years? since account creation?).

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| P&L report table | Hierarchical table | Reports section | Line items from Gross Sales to Net Profit |
| Time period selector | Dropdown/tabs | Report header | Yearly/Quarterly/Monthly/Weekly/Daily |
| Currency/% toggle | Radio buttons | Report header | Switch between $, %, or both display modes |
| Customer segment toggle | Toggle/switch | Report header | New vs Returning customer comparison |
| Print button | Action button | Report header | Prints current report view |
| Download button | Action button | Report header | Exports data (format unspecified) |
| Three-dot menu | Icon button | Report/template rows | Edit, schedule, configure options |
| Schedule toggle | Toggle switch | Custom Reports list | Enable/disable scheduled delivery |
| Create Report button | CTA button | Custom Reports page | Opens report builder |
| Date grouping selector | Dropdown | Report builder | Must be selected first before columns |
| Table columns selector | Multi-select | Report builder | Choose metrics for report table |
| Summary tiles selector | Multi-select | Report builder | Choose KPI tiles for report header |
| Timeframe selector | Dropdown | Report builder | Default date range for report |
| Frequency selector | Dropdown | Schedule config | Daily/Weekly/Monthly |
| Hour selector | Dropdown | Schedule config | Delivery time |
| Email recipients field | Text input + chips | Schedule config | Add/remove recipient emails |
| Templates list | Card/list view | Reports → Templates | Pre-built report options |
| Custom Reports list | Table/list view | Reports → Custom Reports | User-created reports with actions |

---

## Data Model Implications

### P&L Report Data Requirements
1. **Hierarchical cost taxonomy** — costs must be categorized into a strict hierarchy: Revenue → Direct Costs (COGS, Marketing) → Gross Profit → Operating Expenses → Net Profit
2. **Marketing cost by channel** — marketing expenses must be breakable by individual ad platform (Google, Facebook, TikTok, etc.)
3. **Operational expense categories** — need support for 11+ operational expense types (digital marketing, content, design, subscriptions, equipment, office, insurance, employees, utilities, rent, warehouse)
4. **Customer segment tagging** — every order needs new vs returning customer classification for P&L segmentation
5. **Multi-period time series** — data must support yearly, quarterly, monthly, weekly, and daily aggregation
6. **Percentage-of-sales calculation** — every line item needs to be expressible as % of total sales
7. **Report persistence** — custom reports must be saved with their configuration (columns, tiles, timeframe, schedule)
8. **Schedule engine** — needs a job scheduler for daily/weekly/monthly email report delivery with recipient management
9. **Template system** — pre-built report configurations that users can clone and customize

### Key Relationships
- **P&L Report** → date range, customer segment, display mode, line items
- **Custom Report** → basic info, date grouping, columns, tiles, timeframe, schedule
- **Schedule** → report reference, frequency, hour, recipient emails
- **Report Template** → predefined configuration, editable by user

---

## Limitations & Gaps

1. **No enumeration of report templates.** The Help Center references pre-built templates but never lists what they are by name or what metrics each contains.

2. **Custom report metrics/dimensions not documented.** The available fields for table columns and summary tiles are not listed. Users must explore the UI to discover available options.

3. **Export format unspecified.** Whether exports are CSV, Excel, PDF, or other format is not documented.

4. **Daily email content unknown.** The specific metrics, layout, and formatting of daily profit emails are not described anywhere in the Help Center.

5. **No visualization types documented for custom reports.** Whether custom reports support charts, graphs, or only tabular data is unclear.

6. **P&L formula details limited.** The P&L structure is shown but the exact calculation formulas for each line item (especially how taxes, discounts, and fees are computed) are not detailed in this article.

7. **Historical data retention unspecified.** How far back users can view historical data is not documented.

8. **No report sharing/collaboration features mentioned.** Beyond email scheduling, there's no mention of shared links, team views, or embedded reports.

9. **Comparison features basic.** The customer segment comparison (new vs returning) is the only documented comparison mode within the P&L. No product-level or channel-level P&L breakdowns are described.

10. **Plus plan bulk export gating.** The ability to export all data at once from Custom Reports is Plus-plan-only, meaning lower tier users must export page by page.

---

## Relevance to Our Build

### Key Takeaways

1. **Follow standard P&L hierarchy.** BeProfit's Revenue → COGS → Gross Profit → OpEx → Net Profit structure is standard accounting practice. Match this structure but add intermediate subtotals like "Contribution Profit" (Revenue - COGS - Marketing) which BeProfit shows on the dashboard but not clearly in the P&L.

2. **Three display modes are essential.** Dollar amounts, percentages-of-sales, and combined views are all valuable for different analysis contexts. Implement all three from launch.

3. **Customer segment P&L is a strong feature.** Being able to see P&L for new vs returning customers separately is powerful for understanding customer economics. Extend this with custom segments.

4. **Report scheduling should be friction-free.** BeProfit's 3-click scheduling flow (toggle → configure → save) is clean. Match this simplicity but add more delivery channels (Slack, webhook, dashboard widget) beyond email.

5. **Build a proper template library.** BeProfit has templates but doesn't document them well. Create a curated set of named templates (e.g., "Weekly P&L Summary", "Monthly Marketing ROI", "Product Profitability Report") with clear descriptions.

6. **Custom report builder needs strong UX.** The requirement to select date grouping before columns is a dependency that could confuse users. Consider a more guided wizard approach.

7. **Fix the 21-day email cutoff.** BeProfit's auto-pause of daily emails after 21 days of inactivity is user-hostile. Email-only users who rely on daily summaries without logging into the app get penalized. We should let users opt-in/out independently of login activity.

8. **Bulk export should not be plan-gated.** Making "export all data" a Plus-plan-only feature feels punitive. Offer bulk export on all paid plans.

9. **Add more granular operational expense categories.** BeProfit's 11 OpEx categories are a good start. Allow custom category creation so merchants can track expenses specific to their business.

10. **Report builder should preview results.** BeProfit's documentation doesn't mention a preview before saving. Build a live preview that shows sample data as users configure their report, reducing trial-and-error.
