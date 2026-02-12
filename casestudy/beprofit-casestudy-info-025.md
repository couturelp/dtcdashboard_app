# BeProfit Goals & Targets Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/track-your-real-time-data (Track Real-Time Profit — Profit Dashboard)
  - https://help.runviably.com/beprofit/analyze-your-profit-breakdown-beprofit-help-center (Analyze Your Profit Breakdown — Profit Dashboard)
  - https://beprofit.co/features/benchmark-profit-analysis/ (Benchmark Profit Analysis — marketing feature page)
  - https://beprofit.co/profit-margin-calculators/marketing/ (Free Profit Margin Calculator — with target margin input)
  - https://help.runviably.com/beprofit (Help Center full navigation — no Goals/Targets category)
  - Searched: "goal", "target", "benchmark", "forecast", "budget", "projection" across Help Center and beprofit.co
- **Category:** Core Feature / Goals & Targets (GAP ANALYSIS)
- **Date Captured:** 2026-02-12
- **Cross-references:**
  - File 011 (beprofit-casestudy-info-011.md) — Dashboard (Compare Periods feature, Profit Simulator button, Marketing Simulator button)
  - File 014 (beprofit-casestudy-info-014.md) — Profit Calculation Methodology (predicted costs as a form of forecasting)
  - Real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — Profit Simulator and Marketing Simulator CTAs on dashboard

---

## Goals & Targets Overview

**Key Finding: BeProfit does NOT have explicit goal-setting or target-tracking features.**

There is no "Goals," "Targets," "Budgets," or "Forecasting" category in the Help Center (confirmed from file 001's full 21-category taxonomy). No Help Center article describes any feature where users can set profit targets, revenue goals, budget caps, or track progress toward predefined objectives.

However, BeProfit does have several **adjacent features** that serve some goal-related functions:
1. **Benchmark Profit Analysis** — industry comparison (effectively "how do I compare to peers?")
2. **Compare Periods** — historical comparison (effectively "am I doing better than last period?")
3. **Profit Simulator / Marketing Simulator** — what-if scenario tools (effectively "what would happen if I changed X?")
4. **Predicted Costs** — anticipated returns and Amazon fees (a form of cost forecasting)

This makes Goals & Targets a **partial gap analysis** — documenting the absence of explicit goal-setting while cataloging the adjacent features that partially address the need.

---

## Features That Serve Goal-Related Functions

### 1. Benchmark Profit Analysis (Industry Comparison)

**What it is:** A feature that compares the merchant's financial performance against industry peers.

**How it works:**
- Compares user's metrics against industry benchmarks at the **25th percentile, median, and 75th percentile**
- Data is segmented by **industry vertical, geographic location, and business size**
- Enables comparison of genuinely comparable competitors rather than broad market averages

**Metrics benchmarked:**
| Category | Specific Metrics |
|----------|-----------------|
| Profitability | Contribution profit, contribution margin percentage |
| Marketing Performance | ROAS, POAS, BCPA (Break-Even Cost Per Acquisition) |
| Expense Categories | COGS %, marketing spend %, transaction fees %, fulfillment costs % |

**What it answers:**
- "Is my marketing spend above or below industry average?"
- "How does my contribution margin compare to similar stores?"
- "Am I in the 25th percentile or 75th percentile for ROAS?"

**What it does NOT do:**
- Does not let users SET targets based on benchmarks
- Does not track progress toward reaching a benchmark level
- Does not alert users when they move between percentile brackets
- Does not show benchmark trends over time (e.g., "you moved from 25th to 50th percentile this quarter")

**Plan availability:** Not explicitly documented. Likely a paid-plan feature.

### 2. Compare Periods (Historical Comparison)

**What it is:** The ability to compare current performance against a prior time period, available from the dashboard's Profits section.

**How it works:**
From file 011:
1. Select a metric from the left-side list
2. Choose comparison type:
   - **Same Period Last Year** — year-over-year comparison
   - **Preceding Period** — compare to the immediately prior period of equal length
3. View results in daily, weekly, or monthly chart views
4. Charts overlay the two periods for visual comparison

**What it serves as a proxy for:**
- Implicit goal: "Do better than last year/month/week"
- Trend indicator: "Am I improving or declining?"
- Contextual comparison: "Is this seasonal pattern normal?"

**What it does NOT do:**
- Does not let users set explicit targets (e.g., "I want 20% more profit than last year")
- Does not track percentage toward a target
- Does not visualize a target line on charts
- Does not forecast whether current trajectory will meet historical performance

### 3. Profit Simulator (What-If Tool)

**What it is:** A scenario planning tool accessible from a prominent purple button on the dashboard's "Profit & Expenses Breakdown" section.

**How it works:** **Undocumented in the Help Center.** No Help Center article explains the Profit Simulator's functionality, inputs, or outputs.

**What we can infer from the dashboard:**
- It's a CTA button labeled "Profit Simulator" — suggests a calculator-type interface
- Located next to the Profit & Expenses Breakdown donut chart
- Likely allows users to model scenarios: "What if COGS increased 10%?", "What if shipping costs dropped by $2/order?"

**What it likely serves as a proxy for:**
- Scenario-based planning (closest to forecasting)
- "What would my profit be if I achieved goal X?"
- Sensitivity analysis for cost/revenue changes

**Limitation:** Without Help Center documentation, the exact capabilities are unknown.

### 4. Marketing Simulator (Ad Spend What-If Tool)

**What it is:** A scenario planning tool for marketing spend, accessible from the dashboard's Marketing section.

**How it works:** **Undocumented in the Help Center.** Like the Profit Simulator, no article describes this tool.

**What we can infer:**
- Green/teal CTA button labeled "Marketing Simulator" on the dashboard
- Also visible on the full Marketing page (confirmed from real dashboard inventory)
- Likely allows users to model: "What ROAS do I need to achieve target profit?", "What if I double my ad budget?"

### 5. Predicted Costs (Cost Forecasting)

**What it is:** A limited forecasting mechanism for anticipated costs before actual data arrives.

**Documented in file 014:**
- **Predicted Returns:** Estimate refund costs 1-4 weeks post-purchase using configurable percentage windows per day
- **Predicted Amazon Fees:** Forecast Amazon fees (typically 2-3 weeks delayed) using a percentage estimate
- Both auto-reconcile when actual data arrives

**What it serves as a proxy for:**
- Short-term cost forecasting (days to weeks)
- More accurate profit estimation before all costs are known

**What it does NOT do:**
- Does not forecast revenue
- Does not project long-term trends
- Does not support budget planning

### 6. Free Profit Margin Calculator (External Tool)

**What it is:** A free web-based calculator on beprofit.co (not inside the app) that lets users input a target profit margin and calculate required pricing/costs.

**What it offers:**
- Users "choose your target profit margin, and better manage your marketing costs to get more profit from your campaigns"
- Calculates relationships between revenue, costs, and margin targets

**What it does NOT do:**
- Not integrated into the BeProfit app
- Does not track actual performance against the target
- One-time calculation, not ongoing monitoring

---

## What BeProfit Does NOT Have

### Explicit Goal-Setting — NOT AVAILABLE
- No ability to set numeric targets for any metric (profit, revenue, margin, ROAS, etc.)
- No goal creation workflow (name, metric, target value, time period)
- No goal progress tracking

### Revenue Targets — NOT AVAILABLE
- No daily/weekly/monthly revenue target setting
- No revenue goal progress bars or indicators
- No "on track" / "at risk" / "off track" status for revenue goals

### Profit Targets — NOT AVAILABLE
- No profit target for any time period
- No profit goal visualization
- No notification when profit target is reached or missed

### Budget Management — NOT AVAILABLE
- No marketing budget caps or tracking
- No operational expense budget setting
- No COGS budget management
- No "X% of budget spent" indicators
- No budget vs actual comparison reports

### Progress Visualization — NOT AVAILABLE
- No progress bars toward goals
- No goal lines on charts (horizontal reference lines showing target levels)
- No percentage completion indicators
- No red/yellow/green color coding for goal status

### Forecasting / Projections — NOT AVAILABLE
- No revenue forecasting based on trends
- No profit projection for end-of-period
- No "at this rate, you'll reach $X by end of month" calculations
- No machine learning-based projections
- No seasonal adjustment in forecasts

### Industry Benchmarking AS Goals — PARTIALLY AVAILABLE
- Benchmark Profit Analysis provides industry comparison data
- However, users cannot SET an industry percentile as a goal
- No tracking of movement between percentile brackets over time

---

## Comparison Feature as Implicit Goal Tracking

The "Compare Periods" feature is the closest BeProfit comes to goal tracking. In practice, many merchants use period-over-period comparison as an implicit goal system:

| Comparison Type | Implicit Goal |
|----------------|---------------|
| Same Period Last Year | "Beat last year's numbers" |
| Preceding Period | "Improve month over month" |
| YoY trend direction | "Keep the growth trend positive" |

**Why this falls short:**
- No explicit target (just "better than before")
- No percentage-to-target calculation
- No visualization of gap between current and target
- No projection of whether current pace will meet or miss
- No notification when goal is met or at risk

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Profit Simulator button | CTA button (purple) | Dashboard → Profit Breakdown section | Opens what-if scenario tool (undocumented) |
| Marketing Simulator button | CTA button (green/teal) | Dashboard → Marketing section + Marketing page | Opens ad spend scenario tool (undocumented) |
| Compare Periods button | Toggle button (purple) | Dashboard → Profits section | Enables period-over-period comparison |
| Trend arrows | Directional indicators | KPI cards throughout dashboard | ↑/↓ with percentage change vs prior period |
| Benchmark data | Percentile chart/table | Unknown location in app | Industry comparison visualization |
| Profit Margin Calculator | Web tool | beprofit.co/profit-margin-calculators/ | External calculator with target margin input |

---

## Data Model Implications

### Current State (No Goal Entities)
BeProfit's data model does not include goal-related entities. There is no:
- Goal definition table
- Target value storage
- Progress tracking records
- Budget allocation entities

### Adjacent Feature Data Requirements
- **Benchmark data:** Anonymized industry aggregate data by vertical, region, size → percentile calculations
- **Period comparison:** Time-series metric data with historical preservation
- **Predicted costs:** Day-windowed percentage predictions auto-replaced by actuals
- **Simulators:** Real-time calculation engine using current data with user-modified parameters (undocumented)

### What Would Be Needed for a Goal System
- **Goal entity:** Name, metric reference, target value, target type (absolute / percentage / percentile), time period (daily/weekly/monthly/quarterly/annual), status (on track / at risk / missed / achieved)
- **Budget entity:** Category (marketing/operational/COGS/fulfillment), budget amount, period, currency, allocation rules
- **Forecast entity:** Metric reference, forecast methodology (linear trend / seasonal / ML), projected value, confidence interval, last calculated timestamp
- **Progress tracking:** Current value, target value, percentage complete, projected end-of-period value, pace indicator

---

## Limitations & Gaps

1. **No explicit goal-setting of any kind.** This is the most fundamental gap. Merchants cannot set numeric targets for any metric — profit, revenue, ROAS, margin, or any other KPI.

2. **No budget management.** For merchants spending tens of thousands on ads monthly, there is no way to set a marketing budget cap within BeProfit and track spend against it. This is a critical missing feature for cost-conscious merchants.

3. **No forecasting or projections.** BeProfit shows historical data and current data but does not project future performance. "At this rate, your end-of-month profit will be $X" is not available.

4. **Simulators are undocumented.** The Profit Simulator and Marketing Simulator are prominent UI elements but have zero Help Center documentation. Their capabilities, inputs, and outputs are unknown.

5. **Benchmarking exists but isn't actionable.** Industry comparison data is available but users cannot set benchmark-based goals, track progress toward a percentile, or receive alerts when they move between brackets.

6. **No goal visualization.** No progress bars, target lines on charts, percentage-to-goal indicators, or red/yellow/green status coding anywhere in the product.

7. **Compare Periods is not goal tracking.** While useful for understanding trends, period comparison lacks the intentionality of goal setting — there's no target, no progress percentage, and no projected outcome.

8. **No budget vs actual reports.** A fundamental management accounting feature — comparing planned (budgeted) costs against actual costs — is completely absent.

9. **Predicted costs are extremely limited forecasting.** The predicted returns and Amazon fee features are narrow cost predictions (days to weeks), not broad business forecasting (months to quarters).

10. **No collaborative goal setting.** In workspaces with multiple team members, there is no way to assign goals to team members, track departmental targets, or align individual goals with business objectives.

---

## Relevance to Our Build

1. **Goal-setting is a major differentiation opportunity.** Like alerts, the complete absence of goal-setting in BeProfit represents a significant competitive gap. Merchants fundamentally want to set targets and track progress — this is basic business management that profit analytics tools should support.

2. **Start with simple metric targets.** Allow merchants to set targets for key metrics: daily/monthly profit target, revenue target, ROAS target, margin target. Show progress as a percentage with visual indicators (progress bar, gauge, or percentage overlay on KPI cards).

3. **Build budget management for marketing.** Marketing budget tracking is the highest-value goal feature for DTC merchants. Allow setting monthly ad spend budgets with daily/weekly burn rate tracking, projected end-of-period spend, and overspend alerts.

4. **Add target lines to charts.** On any time-series chart, allow users to add a horizontal reference line showing their target value. This creates instant visual context: "I can see my daily profit and where my target is."

5. **Implement simple revenue/profit forecasting.** Use linear trend projection or simple exponential smoothing to show "at current pace, your end-of-month revenue will be $X." This doesn't need to be sophisticated ML — simple trend extrapolation is valuable.

6. **Build goal status indicators (On Track / At Risk / Off Track).** Use pace calculations to determine goal status: "You're 60% through the month with 70% of your profit target achieved → On Track (green)." Display this prominently on the dashboard.

7. **Integrate benchmarks with goals.** Allow merchants to set goals based on industry benchmarks: "I want to be in the 75th percentile for contribution margin in my industry." Track their progress toward this benchmark-based goal.

8. **Create budget vs actual reports.** This is table-stakes management accounting. Show planned (budgeted) amounts alongside actual amounts with variance calculations for each cost category. This is essential for any merchant doing formal financial planning.

9. **Build collaborative goal dashboards for teams.** In multi-user workspaces, allow goal assignment and tracking by team role: marketing team has ROAS goals, operations has shipping cost goals, management has profit goals. Show team-wide goal progress on a shared dashboard.

10. **Document and improve the simulator tools.** Whatever the Profit Simulator and Marketing Simulator do, make our equivalent tools well-documented, deeply configurable, and connected to the goal system. "Run a simulation → if you like the outcome → set it as a goal" is a powerful workflow.
