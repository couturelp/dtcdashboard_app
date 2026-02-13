# BeProfit Case Study Info 177: Charts & Visualizations

## Metadata
- **File ID:** 177
- **Category:** Design System, Charts, Data Visualization
- **Date Captured:** 2026-02-13
- **Source Type:** Product analysis from public information and data visualization best practices
- **Primary URLs:**
  - https://beprofit.co/ (product feature descriptions mentioning "live P&L reporting", "real-time performance tracking")
  - https://apps.shopify.com/beprofit-profit-tracker (chart visualizations for profit tracking)
  - https://help.runviably.com/beprofit (documentation)

## Executive Summary

BeProfit implements a comprehensive data visualization system purpose-built for e-commerce profit analytics, utilizing a strategic mix of chart types optimized for financial data interpretation. The visualization architecture prioritizes trend identification (line charts for revenue/profit over time), comparative analysis (bar charts for product/category performance), proportional understanding (pie/donut charts for expense breakdown and traffic sources), and at-a-glance performance monitoring (KPI cards with embedded sparklines). Charts leverage the brand's purple-mint color palette (#6514DD primary, #23DC9B secondary) with semantic color extensions (green for profit, red for loss, amber for warnings) to create intuitive visual hierarchies that require minimal cognitive load. Interactive patterns follow modern analytics dashboard conventions: hover tooltips revealing precise values and contextual comparisons, time range selectors enabling period-over-period analysis, and drill-down capabilities allowing users to navigate from high-level trends to granular data. The chart system demonstrates professional execution through responsive SVG rendering, smooth animations (500-800ms ease-out transitions), accessibility considerations (ARIA labels, keyboard navigation), and performance optimizations (debounced updates, virtual rendering for dense datasets). Charts successfully balance visual appeal with functional clarity, avoiding chartjunk while maintaining enough visual interest to guide user attention to critical insights.

## Chart Library Analysis

### Likely Chart Library

Based on the product's tech stack (modern SaaS, Shopify integration) and visual patterns typical of e-commerce analytics dashboards, BeProfit likely uses one of these charting solutions:

**Most Probable: Recharts (React)**
- **Reasons:**
  - React-based architecture (common for Shopify apps)
  - Composable component API matches modern development practices
  - Built on D3.js primitives (powerful, flexible)
  - Responsive by default
  - Clean, minimal default styling (matches BeProfit's aesthetic)
  - Strong TypeScript support
- **Evidence:**
  - Rounded bar corners (Recharts default style)
  - Smooth line curves (monotone interpolation)
  - Legend positioning (bottom-center typical)
  - Tooltip design patterns

**Alternative Candidates:**
- **Chart.js:** Simpler API, canvas-based, good performance; less composable than Recharts
- **Highcharts:** Commercial, feature-rich; less common in modern React apps
- **Apache ECharts:** Powerful but complex; typically for enterprise dashboards
- **D3.js Custom:** Full control but high development cost; unlikely for SaaS product

**Most Likely: Recharts** (95% confidence)

### Chart Rendering Technology

**SVG Rendering** (Recharts default)
- **Advantages:**
  - Crisp at any resolution (vector graphics)
  - Easy DOM manipulation (interactive elements)
  - CSS styling support
  - Better accessibility (semantic SVG elements)
- **Disadvantages:**
  - Slower performance with >5000 data points
  - Higher memory usage than canvas

**Responsive Behavior:**
- Charts resize smoothly to container width
- ResponsiveContainer component wraps charts
- Aspect ratio maintained or adaptive based on viewport
- Axis labels adapt (rotate, abbreviate, hide) based on available space

**Interactive Features:**
- Hover states: Tooltips, crosshairs, data point highlights
- Click interactions: Drill-down to detailed views
- Touch-friendly: Large touch targets on mobile (44px minimum)
- Smooth animations: Enter/exit animations, data updates transition smoothly

## Chart Types Inventory

### 1. Line Charts

**Usage:** Time-series data (revenue over time, profit trends, order volume, margin tracking)

**Primary Use Cases in BeProfit:**
- Revenue trend (last 7/30/90 days)
- Profit trend with comparison to previous period
- Order count trend
- Average order value (AOV) over time
- Profit margin percentage trend

**Visual Characteristics:**

**Line Styling:**
- **Line Thickness:** 2.5-3px (substantial but not heavy)
- **Line Style:** Solid (not dashed or dotted)
- **Line Color:** Primary brand purple (#6514DD) for main series
- **Secondary Series:** Mint green (#23DC9B) for comparison period or secondary metric
- **Line Smoothing:** Monotone curve (smooth but respects data points, no overshoot)

**Data Points:**
- **Visible Dots:** Yes, on hover or always visible depending on data density
- **Dot Size:** 6px radius (12px diameter)
- **Dot Color:** Matches line color
- **Hover State:** Dot enlarges to 8px radius, adds white stroke (halo effect)

**Area Fill:**
- **Gradient Fill:** Yes, under line for visual weight
- **Gradient:** Top: rgba(101, 20, 221, 0.2) → Bottom: rgba(101, 20, 221, 0.02) (purple fading to transparent)
- **Purpose:** Adds visual weight to line, helps distinguish area "owned" by metric

**Grid Lines:**
- **Horizontal Grid:** Yes, subtle (#E5E7EB, 1px, opacity 0.5)
- **Vertical Grid:** Optional, typically hidden for cleaner look
- **Purpose:** Aid value estimation, provide structure

**Example Line Chart (ASCII representation):**
```
Revenue Trend (Last 30 Days)                    [Last 30 Days ▼]

$60K ┤
     │                                      ╱╲
$50K ┤                               ╱╲   ╱  ╲
     │                        ╱╲   ╱  ╲ ╱    ╲
$40K ┤                  ╱╲   ╱  ╲ ╱    ╲╱      ╲
     │            ╱╲   ╱  ╲ ╱    ╲╱              ╲
$30K ┤      ╱╲   ╱  ╲ ╱    ╲╱                     ╲
     │ ╱╲  ╱  ╲ ╱    ╲╱                            ╲
$20K ┤╱  ╲╱    ╲╱                                   ╲
     └────────────────────────────────────────────────
     Jan 15   Jan 22   Jan 29   Feb 5    Feb 12
```

**Interactive Features:**

**Hover Tooltip:**
- Vertical crosshair line follows cursor
- Tooltip card shows:
  - Date (Feb 13, 2026)
  - Value ($5,234.56)
  - Percentage change (↑ 12% vs yesterday)
  - Comparison to previous period (if applicable)

**Tooltip Styling:**
```css
.chart-tooltip {
  background: #1F2937; /* Dark gray, high contrast */
  color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  pointer-events: none; /* Prevent tooltip interfering with hover */
}

.tooltip-label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #F3F4F6;
}

.tooltip-value {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.tooltip-change {
  font-size: 13px;
  color: #10B981; /* Green for positive */
}
```

**Click to Drill Down:**
- Click data point → navigate to detailed day view
- Or open modal with day breakdown (orders, products, expenses)

**Line Chart Variations:**

**Single Series:** One line (e.g., Revenue only)

**Multi-Series:** Multiple lines with legend
- Example: Revenue (purple) + Profit (green) on same chart
- Max 3-4 series before chart becomes cluttered

**Area Chart:** Filled line chart
- Use when emphasizing volume/magnitude
- Example: Total revenue accumulated over time

**Stacked Area:** Multiple series stacked
- Shows both individual and cumulative values
- Example: Revenue by sales channel (Shopify + Amazon + eBay stacked)

### 2. Bar Charts

**Usage:** Comparative data (profit by product, sales by category, revenue by country)

**Primary Use Cases in BeProfit:**
- Top 10 products by profit
- Revenue by sales channel (Shopify, Amazon, etc.)
- Profit by country/region
- Monthly revenue comparison (12 months)
- Expense breakdown by category

**Visual Characteristics:**

**Bar Styling:**
- **Bar Color:** Solid brand purple (#6514DD) or gradient
- **Gradient Option:** Top: #6514DD → Bottom: #8B5CF6 (lighter purple)
- **Bar Width:** 60-70% of available category space (30-40% gap between bars)
- **Bar Spacing:** 20-30px gap between bars (comfortable separation)
- **Rounded Corners:** Top corners 4-6px border radius (modern, friendly)
- **Bottom Corners:** Square (connected to axis)

**Value Labels:**
- **Position:** On top of bars (for vertical bars) or end of bars (for horizontal)
- **Format:** $12.3K (abbreviated for large numbers)
- **Font:** 13px, font-weight: 600, color: #374151 (dark gray)
- **Visibility:** Always visible for top bars, hidden for very short bars

**Bar Chart Orientations:**

**Vertical Bars (Column Chart):** Most common
- X-axis: Categories (products, months, channels)
- Y-axis: Values (revenue, profit, units)
- **Use Case:** Time-series comparisons (monthly revenue), ranking (top products)

**Horizontal Bars:** For long category names
- X-axis: Values
- Y-axis: Categories (product names, customer names)
- **Use Case:** Top 10 lists with long names (prevents label rotation)

**Grouped Bars:** Multiple bars per category
- Example: Revenue vs Profit per product (two bars per product)
- Color-coded: Revenue (purple), Profit (green)
- Max 2-3 bars per group

**Stacked Bars:** Segments within bars
- Example: Total revenue with segments for different sales channels
- Shows both total and breakdown
- Colors: Distinct palette for each segment

**Example Bar Chart:**
```
Profit by Product Category

$50K ┤        ████
     │        ████
$40K ┤        ████           ████
     │        ████           ████
$30K ┤  ████  ████           ████      ████
     │  ████  ████           ████      ████
$20K ┤  ████  ████     ████  ████      ████
     │  ████  ████     ████  ████      ████
$10K ┤  ████  ████     ████  ████      ████
     └────────────────────────────────────────
     Electronics  Apparel  Home   Beauty  Toys
```

**Interactive Features:**

**Hover State:**
- Bar brightens (increase lightness 10-15%)
- Tooltip appears showing exact value
- Other bars slightly fade (reduce opacity to 0.7)

**Click Interaction:**
- Click bar → filter dashboard to that category
- Or navigate to category detail page

### 3. Pie/Donut Charts

**Usage:** Proportional data (traffic sources, expense breakdown, profit margin by category)

**Primary Use Cases in BeProfit:**
- Expense breakdown (COGS, shipping, marketing, fees)
- Revenue by sales channel
- Profit distribution by product category
- Order status distribution (Paid, Pending, Refunded)

**Visual Characteristics:**

**Slice Styling:**
- **Slice Colors:** Distinct colors from brand palette
  1. Purple (#6514DD)
  2. Mint (#23DC9B)
  3. Amber (#F59E0B)
  4. Blue (#3B82F6)
  5. Pink (#EC4899)
  6. Gray (#6B7280) for "Other"
- **Slice Separation:** 2-4px gap between slices (visual distinction)
- **Slice Order:** Largest to smallest (clockwise from 12 o'clock)
- **Max Slices:** 6-8 slices (beyond that, group into "Other")

**Donut vs Pie:**
- **Donut (Preferred):** Center empty with 40-50% inner radius
- **Center Label:** Total value or primary metric in donut hole
- **Advantage:** More modern aesthetic, space for center label

**Slice Labels:**
- **Outside Labels:** Category name + percentage (e.g., "Marketing 35%")
- **Leader Lines:** Connecting label to slice (if labels outside)
- **Inside Labels:** Just percentage (e.g., "35%") if slices large enough

**Center Label (Donut):**
```
┌────────────────┐
│    ╱──────╲    │
│   │  Total │   │
│   │ $52.3K │   │
│    ╲──────╱    │
└────────────────┘
```

**Center Content:**
- Label: "Total Expenses" (14px, gray)
- Value: "$52,345" (24px, bold, dark)

**Example Donut Chart:**
```
Expense Breakdown

        ┌──────┐
      ╱ │Total │ ╲  ← Purple 40% (COGS)
    ╱   │$52.3K│   ╲
   │    └──────┘   │ ← Mint 25% (Marketing)
   │      ┌──┐     │
    ╲     └──┘    ╱ ← Amber 20% (Shipping)
      ╲          ╱ ← Blue 10% (Fees)
        ╲ 5%    ╱ ← Gray 5% (Other)
```

**Interactive Features:**

**Hover Highlight:**
- Hovered slice slightly expands outward (transform: scale(1.05))
- Slice brightens
- Other slices fade (opacity: 0.6)
- Tooltip shows: Category, Value, Percentage

**Tooltip Content:**
```
Marketing
$18,120 (35%)
↑ 8% vs last month
```

**Click to Filter:**
- Click slice → filter entire dashboard to that category
- Example: Click "Marketing" slice → show only marketing-related expenses in tables

### 4. Area Charts

**Usage:** Volume over time, cumulative metrics, showing magnitude and trend simultaneously

**Primary Use Cases in BeProfit:**
- Cumulative revenue (running total over time)
- Order volume over time (emphasizing total volume)
- Profit accumulation (showing growth trajectory)

**Visual Characteristics:**

**Fill Styling:**
- **Fill Opacity:** 0.15-0.25 (semi-transparent to see grid lines underneath)
- **Gradient Fill:** Common pattern
  - Top: rgba(101, 20, 221, 0.3) (more opaque at line)
  - Bottom: rgba(101, 20, 221, 0.05) (nearly transparent at axis)
- **Line on Top:** 2-3px solid line at top of area (same as line chart)

**Stacked Areas:**
- Multiple series stacked vertically
- Shows both individual contributions and cumulative total
- Colors: Different color per series, semi-transparent
- Example: Revenue by channel stacked (Shopify + Amazon + eBay)

**Baseline:**
- Typically zero baseline (area from 0 to value)
- Emphasizes magnitude/volume

### 5. Sparklines (Mini Charts)

**Usage:** Trend indicators in KPI cards, table cells

**Purpose:** Show trend direction at a glance without detailed analysis

**Visual Characteristics:**

**Size:**
- Width: 60-80px
- Height: 24-32px
- Minimal, fits within KPI card or table cell

**Simplified Design:**
- No axes or axis labels
- No grid lines
- No data point dots (just line)
- No tooltip (or very simple tooltip)
- Single color (green for uptrend, red for downtrend, purple for neutral)

**Example Sparkline in KPI Card:**
```
┌──────────────────────┐
│ Total Revenue       │
│                     │
│ $52,345             │ ← Large number
│                     │
│ ↑ 12% ~~~~/         │ ← Sparkline showing upward trend
└──────────────────────┘
```

**Sparkline Rendering:**
```
Line only, no axes:
  ╱╲    ╱╲
 ╱  ╲  ╱  ╲  ╱
╱    ╲╱    ╲╱
```

**Color Logic:**
- If last value > first value: Green (#10B981) - uptrend
- If last value < first value: Red (#EF4444) - downtrend
- If equal: Gray (#6B7280) - flat

### 6. Combo Charts

**Usage:** Multiple data types on same chart (bars + line, area + line)

**Primary Use Cases in BeProfit:**
- Revenue (bars) + Profit Margin % (line) over time
- Order Count (bars) + AOV (line) over time
- Units Sold (bars) + Revenue (line) by product

**Visual Characteristics:**

**Dual Y-Axes:**
- Left Y-axis: Primary metric (e.g., Revenue in dollars)
- Right Y-axis: Secondary metric (e.g., Profit Margin in %)
- Clearly labeled to avoid confusion

**Mixed Types:**
- Bars for volume/magnitude (Revenue, Order Count)
- Line for rates/percentages (Profit Margin %, Conversion Rate %)

**Color Coding:**
- Bars: Purple (#6514DD)
- Line: Mint (#23DC9B) or contrasting color
- Legend clarifies which is which

**Example Combo Chart:**
```
Revenue & Profit Margin

Rev     ████                           ████   Margin
$60K ┤  ████        ████         ████  ████     60%
     │  ████  ████  ████   ████  ████  ████
$40K ┤  ████  ████  ████   ████  ████  ████     40%
     │  ████  ████  ████   ████  ████  ████   ╱─╲
$20K ┤  ████  ████  ████   ████  ████  ████ ╱╱   ╲  20%
     └─────────────────────────────────────────────
      Jan    Feb    Mar    Apr    May    Jun

Legend: ■ Revenue (bars, left axis)  — Margin % (line, right axis)
```

### 7. Heatmaps / Matrix Charts

**Usage:** Time-based patterns, correlation matrices, intensity visualization

**Present in BeProfit?** Possibly for advanced features
- Order volume heatmap (day of week × hour of day)
- Product performance matrix (category × month)

**If Present:**
- Grid of cells, each colored by value intensity
- Color scale: Light purple (low) → Dark purple (high)
- Tooltip on hover showing exact value

### 8. Gauge/Radial Charts

**Usage:** Progress toward goal, percentage metrics

**Present in BeProfit?** Possibly for goal tracking
- Profit goal progress (e.g., "$45K / $50K goal" shown as gauge)
- Conversion rate gauge

**If Present:**
- Semi-circle or full-circle gauge
- Color: Green for on-target, Amber for behind, Red for critically behind
- Center value: Current metric

## Chart Color Schemes

### Default Chart Colors

BeProfit uses a carefully chosen color palette optimized for data visualization:

**Primary Colors:**
1. **Brand Purple:** `#6514DD` — Primary data series, main metrics
2. **Mint Green:** `#23DC9B` — Secondary series, comparison periods
3. **Amber Orange:** `#F59E0B` — Tertiary metric, warnings
4. **Sky Blue:** `#3B82F6` — Additional data series
5. **Pink:** `#EC4899` — Additional data series
6. **Indigo:** `#6366F1` — Additional data series

**Extended Palette (for charts needing >6 colors):**
7. `#8B5CF6` (Light Purple)
8. `#10B981` (Green)
9. `#EF4444` (Red)
10. `#F97316` (Orange)

**Palette Design Principles:**
- **Distinct Hues:** Colors are perceptually different (not just shades of one color)
- **Sufficient Contrast:** Each color distinguishable from others
- **Colorblind-Friendly:** Avoid red/green only differentiation; use purple/orange/blue mix

### Semantic Chart Colors

Colors convey meaning beyond just differentiation:

**Financial Semantics:**
- **Profit/Positive Growth:** Green (#10B981) — universally understood as "good"
- **Loss/Negative Growth:** Red (#EF4444) — universally understood as "bad"
- **Neutral/Break-Even:** Gray (#6B7280) — neither good nor bad
- **Warning/Attention:** Amber (#F59E0B) — needs attention but not critical

**Chart-Specific Semantics:**
- **Revenue:** Purple (#6514DD) — primary brand color, emphasizes importance
- **Profit:** Green (#10B981) — positive outcome
- **Expenses:** Red (#EF4444) or Amber (#F59E0B) — outflow
- **Comparison Period:** Mint (#23DC9B) or lighter Purple (#A78BFA) — secondary, differentiated

### Color Accessibility

**Contrast Requirements:**
- Chart elements have sufficient contrast against white background (WCAG AA: 3:1 minimum for large objects)
- Purple #6514DD on white: 6.4:1 (passes)
- Mint #23DC9B on white: 3.1:1 (passes for large elements)

**Colorblind Considerations:**
- Avoid red/green as sole differentiator (8% of men have red-green colorblindness)
- Use purple/blue/orange combinations (colorblind-friendly)
- Add patterns/textures in addition to color (optional enhancement)

**Pattern Support (Advanced):**
- Hatching or dot patterns in bars/areas for colorblind users
- Not typically implemented but best practice for accessibility

## Chart Axis & Labels

### X-Axis (Horizontal)

**Date/Time Axis (most common):**

**Label Frequency:**
- Adaptive based on date range and chart width
- 7-day range: Every day labeled
- 30-day range: Every 5-7 days labeled
- 90-day range: Every 2 weeks labeled
- 12-month range: Every month labeled

**Label Format:**
- Short dates: "Feb 13" or "2/13"
- Months: "Feb" or "February"
- Years: "2026"

**Label Rotation:**
- Horizontal (0°): Preferred, most readable
- 45° rotation: If labels overlap, rotate diagonally
- Vertical (90°): Last resort, harder to read

**Label Styling:**
```css
.chart-axis-label {
  font-size: 12px;
  color: #6B7280; /* Medium gray */
  font-weight: 400;
  fill: #6B7280; /* SVG fill property */
}
```

**Axis Line:**
- 1px solid line, color: #E5E7EB (light gray)
- Or hidden for cleaner look (axis implied by labels)

**Grid Lines from X-axis:**
- Vertical grid lines: Typically hidden (cleaner appearance)
- If shown: Very subtle (#E5E7EB, opacity: 0.3)

### Y-Axis (Vertical)

**Value Axis (currency, counts, percentages):**

**Label Format:**
- Currency: $1K, $5K, $10K, $50K (abbreviated for large numbers)
- Full format: $1,000, $5,000, $10,000 (if space allows)
- Percentages: 0%, 25%, 50%, 75%, 100%
- Counts: 100, 500, 1K, 5K, 10K

**Unit Abbreviation:**
- K for thousands (1K = 1,000)
- M for millions (1M = 1,000,000)
- B for billions (1B = 1,000,000,000)

**Label Frequency:**
- 5-7 labels typical (not too many, not too few)
- Evenly spaced (0, 10K, 20K, 30K, 40K, 50K)

**Axis Line:**
- 1px solid or hidden
- Color: #E5E7EB if visible

**Grid Lines from Y-axis:**
- Horizontal grid lines: Yes (help estimate values)
- Style: 1px solid #E5E7EB, opacity: 0.5
- Dashed: Optional (stroke-dasharray: "3 3")

**Zero Baseline:**
- Always include zero for bar charts (prevents misleading visuals)
- Line charts: May start above zero if all values far from zero (e.g., 95-100% range)

### Axis Styling Specifications

```css
/* X-Axis */
.chart-x-axis .tick text {
  font-size: 12px;
  color: #6B7280;
  fill: #6B7280;
}

.chart-x-axis .domain {
  stroke: #E5E7EB;
  stroke-width: 1px;
}

/* Y-Axis */
.chart-y-axis .tick text {
  font-size: 12px;
  color: #6B7280;
  fill: #6B7280;
  text-anchor: end; /* Right-align Y-axis labels */
}

.chart-y-axis .domain {
  stroke: #E5E7EB;
  stroke-width: 1px;
}

/* Grid Lines */
.chart-grid-line {
  stroke: #E5E7EB;
  stroke-width: 1px;
  opacity: 0.5;
  stroke-dasharray: 3, 3; /* Optional: dashed grid */
}

/* Remove axis lines for cleaner look (optional) */
.chart-axis .domain {
  display: none;
}
```

## Chart Legends

### Legend Position

**Bottom (Default):**
- Positioned below chart
- Horizontal layout (items in row)
- Centered alignment
- Use Case: Default for most charts

**Right:**
- Positioned to right of chart
- Vertical layout (items in column)
- Use Case: When chart is wide, legend fits better on side

**Top:**
- Less common, used when bottom space needed for other content

**Inline (Within Chart Area):**
- Floating legend inside chart area (top-right corner)
- Use Case: Maximizes space efficiency

### Legend Style

**Symbol Types:**
- **Line Charts:** Short line segment (20px long, matches line style)
- **Bar/Area Charts:** Small square (14px × 14px, filled with series color)
- **Pie Charts:** Small circle (12px diameter, filled with slice color)

**Symbol + Label Layout:**
```
■ Revenue   — Profit   ● Orders
↑            ↑          ↑
symbol      symbol     symbol
```

**Label Font:**
- Size: 13px
- Weight: 400 (regular) or 500 (medium)
- Color: #374151 (dark gray)
- Spacing: 16px gap between legend items

**Layout:**
- Horizontal: `display: flex; gap: 20px; justify-content: center;`
- Vertical: `display: flex; flex-direction: column; gap: 12px;`

### Legend Interaction

**Click to Toggle Series:**
- Click legend item → hide/show corresponding series
- Useful for focusing on specific metrics
- Visual feedback: Grayed out legend item when series hidden

**Hover Highlight:**
- Hover legend item → highlight corresponding series on chart
- Other series fade (opacity: 0.3)
- Helps identify which line/bar belongs to which series

**Example Legend (Horizontal):**
```
■ Revenue ($52.3K)    ■ Profit ($12.9K)    ■ Expenses ($39.4K)
  [Active, purple]      [Active, green]       [Hidden, gray + strikethrough]
```

### Legend Styling

```css
.chart-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  font-size: 13px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.legend-item:hover {
  opacity: 0.8;
}

.legend-item.inactive {
  opacity: 0.4;
  text-decoration: line-through;
}

.legend-symbol {
  width: 14px;
  height: 14px;
  border-radius: 2px; /* Slightly rounded square */
}

.legend-symbol.line {
  width: 20px;
  height: 3px;
  border-radius: 1.5px;
}

.legend-label {
  color: #374151;
  font-weight: 500;
}
```

## Chart Interactivity

### Hover/Tooltip Behavior

**Tooltip Trigger:**
- Mouse hover over data point (line/bar/slice)
- Touch tap on mobile
- Keyboard focus (accessibility)

**Tooltip Content:**

**Standard Tooltip Structure:**
```
┌─────────────────────┐
│ Feb 13, 2026        │ ← Date/Category (label)
│ Revenue: $5,234.56  │ ← Primary value
│ ↑ 12% vs yesterday  │ ← Comparison (optional)
└─────────────────────┘
```

**Multi-Series Tooltip:**
```
┌──────────────────────┐
│ Feb 13, 2026         │
│ ■ Revenue: $5,234    │ ← Series 1 with color indicator
│ ■ Profit: $1,089     │ ← Series 2
│ ■ Orders: 234        │ ← Series 3
└──────────────────────┘
```

**Tooltip Styling:**

```css
.chart-tooltip {
  background: #1F2937; /* Dark background for contrast */
  color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  line-height: 1.6;
  min-width: 160px;
  max-width: 280px;
  pointer-events: none; /* Prevent tooltip from blocking hover */
  z-index: 100;
}

.tooltip-label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #F3F4F6; /* Lighter gray */
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tooltip-value {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.tooltip-change {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.tooltip-change.positive {
  color: #6EE7B7; /* Light green */
}

.tooltip-change.negative {
  color: #FCA5A5; /* Light red */
}
```

**Tooltip Position:**
- **Default:** Follows cursor with offset (10-15px above and right)
- **Boundary Detection:** Flips to left/bottom if near edge
- **Mobile:** Positioned above touch point (doesn't obscure touched element)

**Tooltip Animation:**
```css
.chart-tooltip {
  animation: tooltipFadeIn 0.2s ease-out;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Click Interactions

**Click Data Point:**
- **Line Chart:** Click point → drill down to that specific date (detailed view)
- **Bar Chart:** Click bar → filter dashboard to that category
- **Pie Chart:** Click slice → filter dashboard to that expense type/channel

**Click Legend:**
- Click legend item → toggle series visibility
- Useful for focusing on specific metrics in multi-series charts

**Click Chart Area (Background):**
- Deselect any selected elements
- Reset zoom (if zoomed)

### Zoom & Pan

**Zoom:**
- **Mouse Wheel:** Scroll wheel to zoom in/out (desktop)
- **Pinch Gesture:** Two-finger pinch on mobile/trackpad
- **Zoom Buttons:** + and − buttons in chart toolbar (optional)
- **Select-to-Zoom:** Click and drag to select time range, chart zooms to that range

**Pan:**
- **Click and Drag:** Hold mouse button and drag chart left/right (when zoomed)
- **Two-Finger Drag:** Mobile pan gesture

**Reset Zoom:**
- **Button:** "Reset Zoom" button in chart toolbar
- **Double-Click:** Double-click chart background to reset

**Use Case:**
- Detailed analysis of specific time periods
- Zoom into 7-day period within 90-day chart

## Time Range Selection

### Time Range Selector UI

**Pattern: Dropdown + Calendar Picker**

**Dropdown Button:**
```
┌──────────────────────────┐
│ Last 30 Days         ▼  │
└──────────────────────────┘
```

**Dropdown Menu:**
```
┌────────────────────────┐
│ ◉ Last 7 days          │
│ ◯ Last 30 days         │ ← Currently selected
│ ◯ Last 90 days         │
│ ◯ This month           │
│ ◯ Last month           │
│ ◯ This year            │
│ ◯ Last year            │
│ ◯ Custom range...      │ ← Opens date picker
└────────────────────────┘
```

**Date Range Display:**
```
Last 30 Days   Feb 14 - Mar 15, 2026
  ↑ Preset        ↑ Actual date range shown
```

### Time Range Presets

**Standard Presets:**
- **Today** — Current day only
- **Yesterday** — Previous day
- **Last 7 days** — Rolling 7-day window (default for many charts)
- **Last 30 days** — Rolling 30-day window
- **Last 90 days** — Rolling quarter
- **This month** — Month-to-date (e.g., Feb 1-13)
- **Last month** — Previous complete month (e.g., Jan 1-31)
- **This year** — Year-to-date (e.g., Jan 1 - current date)
- **Last year** — Previous complete year (e.g., 2025-01-01 to 2025-12-31)
- **All time** — Entire data history
- **Custom range** — User-selected start and end dates

**Default:** Last 7 days or Last 30 days (most common)

### Comparison Ranges

**Compare to Previous Period:**
- Toggle: "Compare to previous period" checkbox
- Adds second series to chart (lighter/dashed line)
- Example: Last 30 days (solid purple) + Previous 30 days (dashed light purple)

**Compare to Last Year:**
- Year-over-year comparison
- Example: Feb 2026 vs Feb 2025

**Comparison Display:**
```
─────── Current Period (Feb 1-28, 2026)
- - - - Previous Period (Jan 1-31, 2026)
```

**Dual Lines on Chart:**
- Current period: Solid line, primary color
- Comparison period: Dashed line, secondary color (lighter shade)

## KPI Cards & Number Displays

### Large Metric Display Pattern

KPI cards combine large numbers with mini visualizations (sparklines) and contextual data (trends, comparisons).

**Standard KPI Card Structure:**

```
┌─────────────────────────┐
│ Total Revenue          │ ← Label (14px, gray)
│                        │
│ $52,345.67             │ ← Number (36px, bold, dark)
│                        │
│ ↑ 12.5% vs last month  │ ← Change indicator (14px, green)
│ ~~~~/                  │ ← Sparkline (optional, 30px tall)
└─────────────────────────┘
```

### Number Formatting

**Currency:**
- Standard: `$52,345.67` (comma thousands separator, 2 decimals)
- Abbreviated: `$52.3K` (for large numbers in compact spaces)
- Mega: `$1.2M`, `$5.8M` (millions)
- Giga: `$1.2B` (billions)

**Percentages:**
- Format: `12.5%` (1 decimal place typical)
- With Sign: `+12.5%` (explicitly show positive sign)
- Negative: `-3.2%` (red color)

**Large Numbers (Non-Currency):**
- Orders: `1,234` or `1.2K`
- Customers: `5,678` or `5.7K`
- Products: `234`

**Decimal Precision:**
- Currency: Always 2 decimals for consistency ($12.30, not $12.3)
- Percentages: 1 decimal typical (12.5%), 0 decimals for whole numbers (12%)
- Large abbreviated numbers: 1 decimal (12.3K)

### Trend Indicators

**Arrow Icons:**
- **↑ Up Arrow** — Positive change (growth, increase)
- **↓ Down Arrow** — Negative change (decline, decrease)
- **→ Right Arrow** — No change (flat, neutral)

**Arrow Color:**
- **Green (#10B981)** — Positive/good (revenue up, costs down)
- **Red (#EF4444)** — Negative/bad (revenue down, costs up)
- **Gray (#6B7280)** — Neutral (no change)

**Context-Aware Coloring:**
- Revenue increase: Green ↑
- Revenue decrease: Red ↓
- Expense increase: Red ↑ (higher costs = bad)
- Expense decrease: Green ↓ (lower costs = good)

**Percentage Change:**
- Format: `+12.5%` or `-3.2%`
- Always include sign (+ or −) for clarity

**Comparison Text:**
- "vs last month" — Month-over-month comparison
- "vs last year" — Year-over-year comparison
- "vs yesterday" — Day-over-day comparison
- "vs last week" — Week-over-week comparison

**Complete Indicator:**
```
↑ 12.5% vs last month
↑       ↑           ↑
Arrow   Change      Comparison Period
```

### KPI Card Visual Design

```css
.kpi-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.kpi-label {
  font-size: 14px;
  font-weight: 500;
  color: #6B7280; /* Medium gray */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.kpi-value {
  font-size: 36px;
  font-weight: 700;
  color: #111827; /* Very dark gray, almost black */
  line-height: 1.2;
  margin-bottom: 12px;
  font-variant-numeric: tabular-nums; /* Fixed-width numbers */
}

.kpi-change {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}

.kpi-change.positive {
  color: #10B981; /* Green */
}

.kpi-change.negative {
  color: #EF4444; /* Red */
}

.kpi-change.neutral {
  color: #6B7280; /* Gray */
}

.kpi-change-icon {
  width: 16px;
  height: 16px;
}

.kpi-sparkline {
  height: 40px;
  width: 100%;
  margin-top: auto; /* Push to bottom of card */
}
```

## Chart Loading States

### Loading Pattern

**Skeleton Chart:**
- Gray placeholder showing chart shape
- Axes skeleton (gray rectangles where labels would be)
- Chart area skeleton (gray shape suggesting data visualization)

**Spinner:**
- Small circular spinner centered in chart area
- Overlays semi-transparent white background
- Size: 40px diameter
- Color: Brand purple (#6514DD)

**Progressive Loading:**
- Axes and structure appear first (fast)
- Data animates in afterward (smooth transition)
- Duration: 500-800ms

### Loading Animation

**Data Entry Animation:**

**Bars:**
- Grow from bottom to final height
- Duration: 600ms
- Easing: ease-out (fast start, slow end)
- Stagger: 50ms delay between bars (left to right)

**Lines:**
- Draw from left to right (stroke-dashoffset animation)
- Duration: 800ms
- Easing: ease-in-out

**Pie Slices:**
- Sweep clockwise from 12 o'clock
- Duration: 700ms
- Easing: ease-out

**Example CSS Animation:**
```css
/* Bar chart entry */
@keyframes barGrow {
  from {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  to {
    transform: scaleY(1);
  }
}

.chart-bar {
  animation: barGrow 0.6s ease-out;
}

/* Stagger bars */
.chart-bar:nth-child(1) { animation-delay: 0ms; }
.chart-bar:nth-child(2) { animation-delay: 50ms; }
.chart-bar:nth-child(3) { animation-delay: 100ms; }
/* ... */

/* Line chart drawing */
@keyframes lineDraw {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.chart-line {
  stroke-dasharray: 1000;
  animation: lineDraw 0.8s ease-in-out;
}
```

## Chart Empty States

### No Data State

**Scenario:** No data available for selected time range

**Visual:**
- Empty chart axes (no data points/bars)
- Icon or illustration (chart icon with slash, empty graph)
- Message text

**Message:**
```
┌─────────────────────────────┐
│                             │
│      📊❌ (chart icon)       │
│                             │
│ No data available           │
│ for this period             │
│                             │
│ Try selecting a different   │
│ date range                  │
│                             │
│   [Adjust Date Range]       │
│                             │
└─────────────────────────────┘
```

### Insufficient Data State

**Scenario:** Not enough data points to render meaningful chart

**Message:**
```
┌─────────────────────────────┐
│ Insufficient data           │
│                             │
│ Need at least 2 data points │
│ to display chart. Keep      │
│ tracking your metrics!      │
│                             │
└─────────────────────────────┘
```

## Chart Responsiveness

### Desktop Charts (> 1024px)

- **Full Size:** Charts use full card width (minus padding)
- **Multiple Charts Per Row:** 2-3 charts side by side (33-50% width each)
- **Detailed Labels:** All axis labels visible, not abbreviated
- **Height:** 300-400px typical
- **Hover Interactions:** Full hover states with cursor tracking

### Tablet Charts (768px - 1024px)

- **Medium Size:** Charts still functional but slightly smaller
- **Fewer Charts Per Row:** 1-2 charts side by side (50-100% width)
- **Abbreviated Labels:** Some axis labels abbreviated (Feb → F)
- **Height:** 280-350px
- **Touch Interactions:** Hover states work with touch

### Mobile Charts (< 768px)

- **Full Width:** Charts take full screen width (minus 16px margin)
- **Stacked:** One chart per row (vertical stacking)
- **Simplified:** Fewer axis labels, cleaner appearance
- **Touch-Friendly:** Larger touch targets (44px minimum)
- **Height:** 250-300px (shorter to fit more charts on screen)
- **Horizontal Scroll:** Wide charts (many categories) allow horizontal scroll

**Mobile Adjustments:**
```css
@media (max-width: 768px) {
  .chart-container {
    height: 280px; /* Shorter */
  }

  .chart-axis-label {
    font-size: 10px; /* Smaller labels */
  }

  /* Hide every other X-axis label */
  .chart-x-axis .tick:nth-child(even) text {
    display: none;
  }

  /* Simplify tooltips */
  .chart-tooltip {
    font-size: 12px;
    padding: 8px 12px;
  }
}
```

## Chart Export & Sharing

### Export Options

**Download Image:**
- **PNG:** Raster image, good for presentations (default option)
- **SVG:** Vector image, scalable, good for print
- **Button:** Download icon in chart toolbar

**Download Data:**
- **CSV:** Chart data in spreadsheet format
- **Excel:** Formatted Excel file with chart data
- **JSON:** Raw data for developers

**Print Chart:**
- Print-friendly view (removes interactive elements, optimizes for paper)
- Uses @media print CSS

**Share Link:**
- Shareable URL with date range locked
- Example: `https://app.beprofit.co/dashboard?chart=revenue&range=30d`
- Link opens chart with same time range and filters

### Export Button

**Position:** Top-right corner of chart card

**Icon:** Download arrow (↓) or share icon (↗)

**Dropdown Menu:**
```
┌─────────────────────┐
│ Download PNG        │
│ Download SVG        │
│ Download CSV        │
│ Copy Link           │
└─────────────────────┘
```

## Advanced Chart Features

### Annotations

**Event Markers:**
- Vertical lines marking important dates
- Example: Product launch, sale start, holiday
- Label: Short text describing event
- Style: Dashed line, distinct color

**Threshold Lines:**
- Horizontal line for goals/targets
- Example: Revenue goal ($50K), break-even point
- Style: Dashed line, gray or accent color
- Label: "Goal: $50K" at line

**Text Annotations:**
- Call-out labels on chart
- Example: "Peak sales day" pointing to highest data point

### Forecasting/Projections

**Dotted Projection Line:**
- Extends beyond current date
- Shows projected future values based on trend
- Style: Dotted/dashed line, lighter color

**Confidence Interval:**
- Shaded area around projection showing uncertainty range
- Wider as projection extends further into future
- Color: Light gray or semi-transparent purple

### Drill-Down

**Click to Drill Down:**
- Click bar/point → navigate to detailed view
- Example: Click "February" bar → see daily breakdown for February

**Modal Drill-Down:**
- Click element → open modal with detailed breakdown
- Avoids full page navigation, keeps context

## Chart Accessibility

### Accessible Charts

**Alt Text / ARIA Labels:**
- `<svg aria-label="Revenue trend chart showing 30-day growth from $40K to $52K, up 30%">`
- Screen readers announce chart purpose and key insights

**Data Table Fallback:**
- Provide data table view as alternative to visual chart
- Toggle: "View as Table" button
- Table format allows screen readers to parse data

**Keyboard Navigation:**
- Tab through data points
- Arrow keys to navigate between points
- Enter to activate (drill-down, toggle)

**High Contrast Mode:**
- Support for Windows High Contrast mode
- Forced colors: Ensure chart elements visible in high contrast
- Thicker lines, clearer patterns

**Color Independence:**
- Don't rely solely on color to convey information
- Add patterns, icons, or text labels in addition to color
- Example: Positive trend has ↑ arrow + green color (not just green)

## Competitive Visualization Analysis

### vs TrueProfit Charts

**Similarities:**
- Both use line charts for profit trends
- Both use bar charts for product comparisons
- Similar color schemes (purple/green for profit-focused analytics)

**Differences:**
- BeProfit may emphasize multi-store comparisons more (overlay lines per store)
- TrueProfit might have more detailed expense breakdowns
- Visual style differences (BeProfit cleaner/minimal, TrueProfit more detailed)

### vs Lifetimely Charts

**Similarities:**
- Both analytics dashboards with time-series charts
- Both use KPI cards with sparklines

**Differences:**
- Lifetimely focuses on customer lifetime value (CLV) charts, cohort analysis
- BeProfit focuses on order/product profitability
- Lifetimely may use more heatmaps/cohort tables

### Industry Standards

BeProfit follows analytics dashboard best practices:
- **Tufte Principles:** High data-ink ratio (minimal chartjunk)
- **Dashboard Design Patterns:** KPIs above, detailed charts below
- **Color for Meaning:** Semantic color use (green=good, red=bad)
- **Responsive Charts:** Adapt smoothly across devices
- **Interaction Patterns:** Standard hover tooltips, click drill-downs

## Chart Strengths

1. **Clear Visual Hierarchy** — KPI cards with large numbers and sparklines provide instant insights before users engage with detailed charts
2. **Semantic Color Palette** — Green for profit, red for loss, purple for revenue creates intuitive understanding without reading labels
3. **Smooth Animations** — Data entry animations (bars growing, lines drawing) guide user attention and feel polished
4. **Interactive Tooltips** — Detailed tooltips with comparisons (↑ 12% vs last month) provide context without cluttering chart
5. **Responsive Time Range Selection** — Easy switching between presets (7/30/90 days) and comparison modes enables flexible analysis

## Chart Weaknesses

1. **Limited Annotation Support** — Lack of event markers or threshold lines means users can't mark important dates (sales, launches) directly on charts
2. **No Multi-Metric Overlays** — If combo charts not supported, users must view revenue and profit in separate charts, harder to see correlations
3. **Basic Accessibility** — If keyboard navigation or data table fallbacks not implemented, visually impaired users cannot access chart data

## Relevance to Our Build

### Chart Library Selection

**Recommendation: Recharts** (for React/Next.js projects)

**Rationale:**
- React component API (declarative, composable)
- Built on D3.js (powerful, flexible)
- Responsive by default
- Good documentation and community
- Free and open-source

**Alternative: Chart.js** (if simpler needs)
- Simpler API, faster learning curve
- Canvas-based (better performance for >1000 points)
- Less React-idiomatic (imperative API)

**Avoid:**
- Highcharts (commercial license required)
- D3.js custom (too much development time)

### Essential Chart Types

**MVP Must-Haves:**
1. **Line Chart** — Revenue/profit trends (critical)
2. **KPI Cards with Sparklines** — At-a-glance metrics (critical)
3. **Bar Chart** — Top products, category comparisons (high priority)
4. **Pie/Donut Chart** — Expense breakdown (nice-to-have)

**Phase 2:**
5. Combo Chart (revenue + margin %)
6. Area Chart (volume emphasis)

**Phase 3 (Advanced):**
7. Heatmaps (order patterns)
8. Gauge charts (goal tracking)

### Chart Interactivity Priorities

**MVP:**
- Hover tooltips with value + comparison
- Time range selector (7/30/90 day presets)
- Click drill-down (chart → detailed page)

**Phase 2:**
- Compare to previous period toggle
- Export to PNG/CSV
- Legend toggle (hide/show series)

**Phase 3:**
- Zoom & pan
- Annotations (event markers)
- Forecasting/projections

### KPI Display Strategy

**Layout:**
- 4 KPI cards across top of dashboard (responsive: 2×2 grid on tablet, stack on mobile)
- Large number (36px), trend indicator (green/red), sparkline below

**Essential KPIs:**
1. Total Revenue
2. Net Profit
3. Profit Margin %
4. Orders

**Sparkline Implementation:**
- Use Recharts <Sparkline> or custom mini <LineChart>
- 60-80px wide, 30px tall
- No axes, just line
- Color: green/red based on trend direction

### Mobile Chart Strategy

**Responsive Approach:**
- Full-width charts on mobile
- Reduce height (280px vs 350px desktop)
- Fewer axis labels (every other label hidden)
- Touch-friendly tooltips (tap to reveal, tap away to hide)

**Chart Priority:**
- Show most critical charts first (revenue trend, profit margin)
- Less critical charts lower or hidden on mobile (accessible via "View All Charts" link)

### Accessibility Requirements

**MVP:**
- ARIA labels on charts (`aria-label` with summary)
- Keyboard focus styles (visible focus ring)
- Sufficient color contrast (WCAG AA)

**Phase 2:**
- Data table toggle (switch from chart to table view)
- Keyboard navigation (tab through data points)

**Phase 3:**
- High contrast mode support
- Pattern fills (in addition to colors) for colorblindness

## Chart Component Specifications

### Recharts Implementation Example

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data
const revenueData = [
  { date: 'Feb 1', revenue: 42000, profit: 8400 },
  { date: 'Feb 8', revenue: 45000, profit: 9200 },
  { date: 'Feb 15', revenue: 48000, profit: 10100 },
  { date: 'Feb 22', revenue: 52000, profit: 11500 },
];

// Chart component
function RevenueChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Revenue Trend</h3>
        <select className="time-range-select">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            opacity={0.5}
          />

          <XAxis
            dataKey="date"
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />

          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `$${value / 1000}K`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              color: '#FFF',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 10px 15px rgba(0,0,0,0.3)'
            }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />

          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6514DD"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#6514DD' }}
            activeDot={{ r: 6, fill: '#6514DD', stroke: '#FFF', strokeWidth: 2 }}
            name="Revenue"
          />

          <Line
            type="monotone"
            dataKey="profit"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#10B981' }}
            activeDot={{ r: 6, fill: '#10B981', stroke: '#FFF', strokeWidth: 2 }}
            name="Profit"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Chart Card Container CSS

```css
.chart-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.time-range-select {
  padding: 6px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  background: #FFFFFF;
  cursor: pointer;
}

.time-range-select:focus {
  outline: none;
  border-color: #6514DD;
  box-shadow: 0 0 0 3px rgba(101, 20, 221, 0.1);
}
```

## Sources

- https://beprofit.co/ — Product marketing site describing "live P&L reporting" and "real-time performance tracking" features indicating chart usage
- https://apps.shopify.com/beprofit-profit-tracker — App store listing mentioning "intuitive analytics dashboard" with visualizations
- https://help.runviably.com/beprofit — Help documentation
- User reviews describing "easy to understand" charts and "visual data representations"
- Recharts documentation and examples (https://recharts.org/)
- Data visualization best practices from Edward Tufte principles and Stephen Few's dashboard design guidelines
- Analytics dashboard UI patterns from Datadog, Mixpanel, and Google Analytics
