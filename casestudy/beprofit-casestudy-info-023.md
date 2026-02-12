# BeProfit Data Export & Scheduled Reports Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/how-can-i-export-my-data (How can I export my data? — Getting Started)
  - https://help.runviably.com/beprofit/schedule-reports-beprofit-help-center (Schedule Reports — Reports)
  - https://help.runviably.com/beprofit/daily-profit-emails-in-beprofit (Daily Profit Emails — Reports)
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — export and API mentions)
  - https://beprofit.co/integrations/ (Integrations page — for API/data access context)
  - https://integrations.beprofit.co/ (Tech Partner Directory — for integration landscape)
- **Category:** Core Feature / Data Export & Scheduling
- **Date Captured:** 2026-02-12
- **Cross-references:**
  - File 012 (beprofit-casestudy-info-012.md) — P&L Reports (export options, daily profit emails, scheduled reports basics)
  - File 018 (beprofit-casestudy-info-018.md) — Custom Reports / Report Builder (scheduling, custom report export, Plus plan bulk export)
  - Real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — API Access and FTP Integration under Settings → Costs

---

## Data Export Overview

BeProfit's data export system is **decentralized** — there is no single "Export Center" or unified data export page. Instead, export functionality is distributed across individual pages, with an Export button appearing on any page that supports data download.

### Export Philosophy
The documentation states: Data export is accessible from "any page that features an 'Export' button," typically located in the top right corner of the interface. If users need data from other sections, they "will need to go to each respective view and perform the export from those locations."

This means export is **page-specific and context-dependent**, not centralized.

---

## Export by Page/Section

### Consolidated Export Map

Based on cross-referencing files 011, 012, 017, 018, and the real dashboard inventory, here is the complete map of export capabilities across BeProfit:

| Page/Section | Export Button? | Export Evidence | Plan Requirement |
|-------------|---------------|-----------------|-----------------|
| **Dashboard Overview** | Likely (download icon near donut chart) | File 011: "refresh and download/export icons near the chart" | Unknown |
| **P&L Report** | Yes | File 012: "Print" and "Download" buttons in report header | Unknown |
| **Orders** | Likely | Order data is the core export use case | Unknown |
| **Products** | Likely | Product profitability data export | Unknown |
| **Marketing / Ad Spend** | Yes | Real dashboard: "Export" button visible below the Ad Spend Trend chart | Unknown |
| **Custom Reports** | Yes | File 018: Export button for individual custom reports | All plans |
| **Custom Reports (Bulk)** | Yes | File 018: "Export all data at once from Custom Reports screen" | **Plus Plan only** |
| **Fulfillment** | Likely | Shipping cost data | Unknown |
| **Cohort Analysis** | Unknown | Not documented | Unknown |

### Export Formats

The Help Center documentation **does not specify** export file formats. No article explicitly states whether exports are CSV, Excel, PDF, or another format.

**What we can infer:**
- The marketing page shows a download/export icon (arrow-down style) — typical for CSV/Excel download
- The P&L report has both "Print" (suggests PDF/print format) and "Download" (suggests CSV/Excel)
- BeProfit's marketing site mentions exports "in a range of different formats" — but doesn't enumerate them
- Industry standard for analytics tools: CSV and Excel are most common for tabular data

**Format Gap:** This is a significant documentation gap. Users do not know what format to expect before clicking export.

### Bulk Export

| Method | Availability | Description |
|--------|-------------|-------------|
| **Page-by-page export** | All plans | Visit each page, click Export, download that section's data |
| **Bulk export from Custom Reports** | **Plus Plan only** | Export all data at once from the Custom Reports screen |

The Plus Plan bulk export is the **only documented method** for exporting comprehensive data in one operation. Standard-tier users must export from each page individually, which is tedious for merchants who want complete data sets.

---

## Scheduled Reports System

BeProfit's scheduling system enables automated, recurring delivery of reports via email. This consolidates information from files 012 and 018 into a single reference.

### Schedule Configuration Options

| Setting | Options | Notes |
|---------|---------|-------|
| **Frequency** | Daily, Weekly, Monthly | Yearly available for some templates |
| **Delivery Time** | Select specific hour of day | Hour granularity (not minute) |
| **Recipients** | Multiple email addresses | Add/remove individual addresses |
| **Timezone** | Not documented | Unclear whether delivery time respects user's timezone |

### Scheduling Custom Reports

**Workflow:**
1. Navigate to **Reports → Custom Reports**
2. Locate the desired report in the list
3. Toggle the **Schedule column** to **"Yes"**
4. Click the **edit icon** (three-dot menu ⋯)
5. Scroll to the **Schedule section**
6. Choose frequency: Daily / Weekly / Monthly
7. Select delivery hour
8. Enter email addresses in the **Email Recipients** section
9. Click **Save**

**Key detail:** The schedule toggle is visible in the Custom Reports list view — it can be enabled/disabled per report without opening the edit view.

### Scheduling Preset Report Emails

**Workflow:**
1. Navigate to **Reports → Templates**
2. Find the desired report in the **"Preset Emails"** section
3. Click the **edit icon** (three-dot menu ⋯) → **Edit**
4. Select delivery hour
5. Add email recipients
6. Save

**Template scheduling:** Users can also create a scheduled report from a template by selecting a template, clicking "Edit & Save Template," customizing it, and enabling the schedule.

### Recipient Management
- Add multiple email addresses per scheduled report
- Remove recipients by clicking the **"X"** next to their email address chip
- Users can remove themselves from scheduled reports
- **External recipients:** Not explicitly confirmed whether non-BeProfit users can receive scheduled reports, but the email address input suggests any email can be added

### Scheduled Report Delivery Format
The documentation **does not specify** what format scheduled reports are delivered in:
- Email body with inline data?
- CSV/Excel attachment?
- PDF attachment?
- Link to dashboard view?

This is a significant gap — users don't know what to expect when they schedule a report.

---

## Daily Profit Emails

### Overview
BeProfit sends automated daily profit report emails summarizing store performance. This is the primary "push" notification mechanism in the product.

### What's Included
The specific metrics included in daily profit emails are **not documented** in the Help Center. Based on cross-referencing with the "Today's Snapshot" feature (file 011), the daily email likely includes some combination of:
- Sales
- Marketing spend
- Contribution Profit
- Order Count
- ROAS

However, this is speculative — the exact email content is undocumented.

### Delivery Rules
- Emails sent **daily** while the user remains active
- **21-day inactivity rule:** Emails pause automatically if the user hasn't logged in for 21 days
- The final email arrives exactly 21 days after the last login
- Logging back in resumes email delivery

### Email Preference Management
- Navigate to **Settings → Shop → Notification Management** to control preferences
- Users can subscribe/unsubscribe from daily profit emails
- Individual control over which notifications are received

### Daily Email vs Scheduled Reports

| Feature | Daily Profit Email | Scheduled Custom Report |
|---------|-------------------|----------------------|
| **Setup** | Automatic (opt-in by default) | Manual (user creates and schedules) |
| **Content** | Fixed (undocumented metrics) | Configurable (user-selected metrics) |
| **Frequency** | Daily only | Daily, Weekly, or Monthly |
| **Delivery time** | Not configurable | Configurable (select hour) |
| **Recipients** | Account holder only (implied) | Multiple email addresses |
| **Inactivity cutoff** | 21-day auto-pause | No documented auto-pause |
| **Customization** | None documented | Full report builder customization |

---

## API-Based Data Access

### API for Cost Updates (Input Only)
The real dashboard visual inventory confirms two API-related features under **Settings → Costs**:

1. **API Access** — "Update costs over API"
   - Purpose: Programmatically push cost data INTO BeProfit
   - Direction: **Inbound only** (data flows into BeProfit)
   - Use case: ERP systems, supply chain tools sending COGS/cost updates

2. **FTP Integration** — "Sync order related costs using an FTP"
   - Purpose: Upload cost files via FTP/SFTP
   - Direction: **Inbound only** (data flows into BeProfit)
   - Use case: Legacy systems generating cost files

### No Public API for Data Export (Output)
Based on comprehensive research across the Help Center, FAQ, marketing site, and integrations directory:

- **There is no documented public REST API** for retrieving/exporting data from BeProfit
- **There are no webhook endpoints** for receiving notifications when data changes
- **There is no GraphQL or streaming API** for real-time data access
- The API Access feature under Settings is exclusively for **pushing costs into** BeProfit, not for **pulling data out**

### Third-Party Integration Data Flows

| Integration | Direction | Data Type |
|------------|-----------|-----------|
| Google Sheets | **Inbound** | COGS/cost updates, custom expenses, other revenue |
| CJ Dropshipping | **Inbound** | COGS per order |
| Facebook/Google/TikTok Ads | **Inbound** | Ad spend, impressions, clicks |
| Shopify/Amazon/WooCommerce | **Inbound** | Orders, products, revenue, tax |
| ShipStation/Fulfillment | **Inbound** | Shipping costs, tracking |
| Meta Conversions API | **Outbound** (unique) | Sends profit data back to Meta for optimization |
| Klaviyo | **Inbound** | Email/SMS marketing metrics |

The Meta Conversions API integration is the **only documented outbound data flow** from BeProfit to an external system — and it's specifically for sending profit data to Meta, not for general-purpose data export.

### Google Sheets for Data Export?
Google Sheets is extensively documented for **data input** (COGS updates, custom expenses, other revenue). However, there is **no documentation** of Google Sheets being used for **data output** — i.e., syncing BeProfit analytics/report data to a Google Sheet.

This is a notable absence: Google Sheets sync for output would be a low-friction way to give merchants programmatic access to their data without building a full API.

---

## Plan-Based Export Restrictions

| Feature | Free/Basic/Pro/Ultimate | Plus Plan |
|---------|------------------------|-----------|
| Page-specific export | Available | Available |
| Bulk export from Custom Reports | **Not available** | **Available** |
| Custom metrics in reports | **Not available** | **Available** (staff-created) |
| Scheduled reports | Available | Available |
| Daily profit emails | Available | Available |
| API for cost input | Available (under Costs settings) | Available |
| API for data output | Not available | Not available |

The key export restriction is the **Plus Plan gate on bulk export**. All other export and scheduling features appear to be available across plans, though plan-specific restrictions are not comprehensively documented.

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Export button | Action button | Top right of data pages | Download icon, triggers data export |
| Print button | Action button | P&L Report header | Prints current report view |
| Download button | Action button | P&L Report header | Exports report data |
| Schedule toggle | Toggle switch | Custom Reports list | Enable/disable per-report scheduling |
| Three-dot menu | Icon button | Report/template rows | Edit, schedule, delete options |
| Frequency selector | Dropdown | Schedule configuration | Daily / Weekly / Monthly |
| Hour selector | Dropdown | Schedule configuration | Delivery time selection |
| Email recipients field | Text input + chips | Schedule configuration | Add/remove recipient emails |
| Recipient "X" button | Close icon | Email recipient chips | Remove individual recipient |
| Preset Emails section | List section | Reports → Templates page | Pre-configured email reports |
| Notification Management | Settings page | Settings → Shop → Notification Management | Control daily email preferences |
| API Access card | Settings card | Settings → Costs | "Update costs over API" |
| FTP Integration card | Settings card | Settings → Costs | "Sync order related costs using an FTP" |

---

## Data Model Implications

### Export System
- **No persistent export entities** — exports appear to be stateless, one-time operations triggered by button click
- **No export history** — no documented log of what was exported, when, by whom
- **Page-context determines scope** — the export content is whatever the current page is displaying

### Scheduling Infrastructure
- **Scheduled Report entity:** Report reference, frequency enum (Daily/Weekly/Monthly), delivery hour, recipient email list, enabled/disabled flag
- **Job scheduler:** Cron-like system that triggers report generation and email delivery at configured intervals
- **Email delivery pipeline:** Generates report content, formats for email, delivers to recipient list
- **Timezone handling:** Required but undocumented — delivery hour must map to some timezone

### Daily Profit Email
- **System-generated:** Not user-configurable beyond subscribe/unsubscribe
- **Activity tracking:** Requires last-login timestamp per user for the 21-day inactivity calculation
- **Delivery pipeline:** Separate from scheduled reports — fixed template, fixed timing

---

## Limitations & Gaps

1. **No documented export formats.** Users cannot determine whether they'll get CSV, Excel, PDF, or another format before clicking Export. This creates uncertainty for data integration workflows.

2. **No centralized export.** Standard-plan users must visit each page individually to export data. There is no "Export All Data" or "Data Download" page outside the Plus Plan Custom Reports feature.

3. **No public API for data retrieval.** The API Access feature is inbound-only (pushing costs in). Merchants who want programmatic access to their BeProfit analytics data have no documented option.

4. **No webhook notifications.** There are no webhook endpoints for triggering actions when metrics change (e.g., "notify me when daily profit drops below $X" via webhook).

5. **No Google Sheets data sync (output).** Google Sheets is used for data input only. There's no way to sync BeProfit report data to a Google Sheet for use in external dashboards or models.

6. **Scheduled report delivery format unknown.** Whether scheduled reports arrive as inline email, CSV attachment, PDF, or dashboard link is not documented.

7. **Daily email content not specified.** The specific metrics, layout, and formatting of daily profit emails are not described in any Help Center article.

8. **No export volume limits documented.** Maximum rows, maximum date range, or file size limitations for exports are not specified.

9. **21-day email auto-pause is user-hostile.** Merchants who prefer email-only engagement (checking their daily email without logging into the app) get penalized after 21 days of not logging in.

10. **No data retention policy for exports.** How long data remains available for export (months? years? since account creation?) is not documented.

---

## Relevance to Our Build

1. **Build a centralized Data Export page from day one.** BeProfit's page-by-page export is a significant friction point. Create a single "Data Export" or "Data Download" section where users can select what to export (orders, products, P&L, marketing), date range, format, and download everything in one place.

2. **Support multiple export formats.** Offer CSV, Excel (.xlsx), PDF, and JSON from launch. CSV for data analysis, Excel for spreadsheet users, PDF for sharing/printing, JSON for developers.

3. **Build a public API for data retrieval.** This is a major BeProfit gap. A RESTful API that allows merchants to pull their analytics data programmatically would serve agencies, enterprises, and developers building custom dashboards. This is a strong differentiator.

4. **Implement Google Sheets data sync (output).** Beyond just input, allow merchants to sync their BeProfit analytics data to Google Sheets on a schedule. This enables custom reporting, financial modeling, and integration with other tools without requiring API expertise.

5. **Add webhook support.** Implement webhooks that fire when metrics cross thresholds (profit drops, cost spikes, ROAS falls below target). This enables integration with Slack, Zapier, and custom automation workflows.

6. **Fix the daily email system.** Remove the 21-day inactivity cutoff or make it configurable. Include specific metric descriptions in the daily email documentation. Allow users to customize which metrics appear in their daily summary.

7. **Document export formats explicitly.** For every export option, clearly state the format, approximate file size, and any limitations. Users should know what they're getting before they click.

8. **Don't gate bulk export by plan.** Offer reasonable export capabilities on all paid plans. Reserve advanced features (API access, webhook integrations, automated scheduled exports to cloud storage) for higher tiers.

9. **Add Slack/Teams integration for scheduled reports.** Beyond email, deliver scheduled reports to Slack channels or Microsoft Teams. This reaches teams where they already work.

10. **Build export history and audit trail.** Log all exports (who, what, when, format) for compliance and audit purposes. This is especially important for enterprises with data governance requirements.
