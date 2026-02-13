# BeProfit Case Study Info 175: Dashboard Layout Patterns

## Metadata
- **File ID:** 175
- **Category:** Design System, Dashboard UI, Layout Patterns
- **Date Captured:** 2026-02-13
- **Source Type:** Product analysis from public information, app store listings, and UI/UX pattern analysis
- **Primary URLs:**
  - https://beprofit.co/ (product marketing site)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify app store)
  - https://help.runviably.com/beprofit (help documentation)

## Executive Summary

BeProfit implements a sophisticated analytics dashboard optimized for e-commerce profit tracking. The interface employs a card-based grid system that organizes financial metrics into digestible widgets, enabling merchants to monitor profit & loss across multiple dimensions simultaneously. The dashboard follows modern SaaS patterns with a clean, data-dense yet readable layout that prioritizes real-time visibility into key performance indicators. The layout architecture balances overview accessibility (high-level KPIs above the fold) with detailed drill-down capabilities (filterable reports and tables below). Widget organization follows a logical hierarchy: critical profit metrics first, followed by trend visualizations, then detailed breakdowns by product, geography, and channel. The design demonstrates professional execution with responsive grid adaptation, customizable widget placement, and multi-store comparison views—all within a clean, minimal aesthetic that emphasizes data clarity over decorative elements.

## Overall Dashboard Structure

### Layout Architecture

Based on analysis of the product features and standard SaaS analytics patterns, BeProfit employs a typical analytics dashboard architecture:

- **Layout Type:** Fixed left sidebar navigation + fluid main content area
- **Grid System:** Responsive grid system (likely 12-column or 16-column on desktop)
- **Container Width:** Full-width fluid layout with max-width constraints (likely 1400-1600px)
- **Sidebar Width:** Fixed 240-280px left sidebar for primary navigation
- **Content Area:** Remaining space (calc(100% - sidebar width)) for dashboard content

### Page Structure Pattern

```
┌──────────────────────────────────────────────────────┐
│ Top Navigation Bar (User Account, Notifications)   │
├───────────┬──────────────────────────────────────────┤
│           │                                          │
│  Sidebar  │  Dashboard Content Area                  │
│  Nav      │  (KPI Cards, Charts, Tables)             │
│           │                                          │
│  • Dashboard                                         │
│  • Orders │  ┌────────┐ ┌────────┐ ┌────────┐      │
│  • Products│  │Revenue │ │Profit  │ │Orders │      │
│  • Reports │  └────────┘ └────────┘ └────────┘      │
│  • Settings│                                         │
│           │  ┌────────────────────────────────┐     │
│           │  │  Profit Trend Chart (30 days)  │     │
│           │  └────────────────────────────────┘     │
│           │                                          │
└───────────┴──────────────────────────────────────────┘
```

### Dashboard Grid Layout

The main content area uses a responsive grid system for widget organization:

- **Grid Columns:** 4-column grid on large desktops (>1280px), 3-column on medium (1024-1280px), 2-column on tablets (768-1024px), 1-column on mobile (<768px)
- **Grid Gaps:** 24px spacing between grid items for visual breathing room
- **Row Structure:** Flexible row heights based on content; KPI cards typically shorter (140-180px), chart cards taller (300-400px), table cards variable height with internal scrolling

## Dashboard Widgets & Cards

### Widget Types Inventory

Based on the documented features (orders profit analysis, products profit analysis, live P&L, retention tracking), BeProfit employs the following widget types:

#### 1. KPI Card/Metric Card

**Purpose:** Display high-priority financial metrics at a glance

**Size:** 1 of 4 columns (25% width on desktop)

**Content:**
- Large number (main metric) — e.g., $45,234.56
- Label (metric name) — "Total Profit", "Revenue", "Orders", "AOV"
- Trend indicator — ↑ 15% vs last period (with color: green for positive, red for negative)
- Mini sparkline chart (optional) — small 30-day trend line
- Comparison text — "vs last month" or "vs last week"

**Visual Treatment:**
- Background: White (#FFFFFF)
- Border: 1px solid #E5E7EB (light gray)
- Border Radius: 8px (rounded corners)
- Shadow: 0 1px 3px rgba(0,0,0,0.1) (subtle elevation)
- Padding: 20px internal spacing
- Hover State: Shadow increases to 0 4px 6px rgba(0,0,0,0.1)

**Example Metrics:**
- Total Profit (net profit after all expenses)
- Revenue (gross sales)
- Orders (order count)
- AOV (average order value)
- Profit Margin (percentage)
- ROAS (return on ad spend)
- CPA (cost per acquisition)

**Typical KPI Card Structure:**
```
┌──────────────────────┐
│ Total Profit        ↗│ ← Trend icon
│                      │
│ $45,234.56          │ ← Large number (36px, bold)
│ ↑ 12.5% vs last mo. │ ← Comparison (14px, green)
│ ~~~sparkline~~~     │ ← Optional mini chart
└──────────────────────┘
```

#### 2. Chart Card (Line/Bar/Area Charts)

**Purpose:** Visualize profit trends, revenue patterns, and time-series data

**Size:** 2-3 of 4 columns (50-75% width), or full-width

**Components:**
- Card header with title ("Revenue Trend", "Profit by Product")
- Time range selector (dropdown: Last 7 days, 30 days, 90 days, Custom)
- Chart area (responsive canvas/SVG, height: 300-400px)
- Legend (if multi-series chart)
- Axis labels (X-axis: dates, Y-axis: currency)
- Interactive tooltips on hover

**Visual Treatment:**
- Same card styling as KPI cards (white background, border, shadow)
- Chart uses brand color palette (primary: #6514DD purple, secondary: #23DC9B mint)
- Grid lines: subtle gray (#E5E7EB)
- Data line thickness: 2-3px
- Data points: 4-6px radius circles on line

#### 3. Data Table Card

**Purpose:** Display detailed order/product data in sortable, filterable lists

**Size:** Often full-width (4 of 4 columns) or wide (3 of 4 columns)

**Components:**
- Card header with title + action buttons (export, filter, refresh)
- Filter row (date range, status dropdown, search input)
- Table with sortable columns (click header to sort)
- Row hover states for interaction feedback
- Pagination controls (showing 1-25 of 371 results)
- Per-page selector (show 10/25/50/100 rows)

**Max Rows Displayed:** 25 rows default before pagination

**Typical Columns for Orders Table:**
- Order ID (clickable link)
- Customer Name
- Date/Time
- Total Revenue
- Total Cost
- Net Profit
- Profit Margin (%)
- Status badge (Paid, Pending, Refunded)
- Actions (view details icon)

#### 4. Summary/Stats Panel

**Purpose:** Group related metrics in one consolidated widget

**Size:** 2 of 4 columns (50% width)

**Content:** Multiple related sub-metrics displayed horizontally or in a grid
- Example: "Marketing Performance" panel with CPA, ROAS, Ad Spend, Conversions

**Layout:** Horizontal stat list with dividers between metrics

**Example:**
```
┌────────────────────────────────────┐
│ Marketing Performance              │
├──────────┬──────────┬──────────────┤
│ CPA      │ ROAS     │ Ad Spend     │
│ $12.50   │ 3.2x     │ $5,234       │
│ ↓ 8%     │ ↑ 15%    │ ↑ 22%        │
└──────────┴──────────┴──────────────┘
```

#### 5. Filter/Control Panel

**Purpose:** Global dashboard filters affecting all widgets

**Size:** Full-width banner at top of dashboard, or compact horizontal row

**Content:**
- Date range picker (primary filter)
- Store selector dropdown (for multi-store users)
- Additional filters (country, product type, status)
- "Apply" and "Reset" buttons

**Sticky Behavior:** Fixed position (sticky top) while scrolling to keep filters accessible

**Example Filter Bar:**
```
┌──────────────────────────────────────────────────────┐
│ Date: [Last 30 Days ▼]  Store: [All Stores ▼]       │
│ Country: [All ▼]  [Apply Filters]  [Reset]           │
└──────────────────────────────────────────────────────┘
```

### Card Component Pattern

#### Standard Card Structure

All dashboard cards follow a consistent structure:

```
Card = Header + Body + Footer (optional)

Header:
- Title/Heading (18px, font-weight: 600)
- Subtitle (optional, 14px, muted gray)
- Action buttons (?, •••, download, expand icons)

Body:
- Main content (chart, table, metrics)
- Scrollable if content exceeds card height (for tables)

Footer (optional):
- Additional info ("Last updated 5 minutes ago")
- "View more" link to detailed report page
```

#### Card Visual Design

**Background:** White (#FFFFFF)

**Border:** 1px solid #E5E7EB (light neutral gray)

**Border Radius:** 8px (consistently rounded corners)

**Shadow:** 0 1px 3px rgba(0,0,0,0.1) for subtle elevation

**Padding:** 20px on all sides (24px for larger cards)

**Hover State:**
- Shadow increases: 0 4px 6px rgba(0,0,0,0.1)
- Subtle scale: transform: scale(1.01)
- Smooth transition: 0.2s ease

**CSS Specification:**
```css
.dashboard-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.dashboard-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1.01);
}

.card-header {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.card-body {
  position: relative;
}
```

## Dashboard Page Types

### 1. Main Dashboard (Homepage)

**Purpose:** High-level business health snapshot shown after login

**Key Widgets:**
- **Row 1 (KPI Cards):** Total Revenue, Net Profit, Orders, AOV (4 cards across)
- **Row 2 (Charts):** Revenue trend (30-day line chart, 66% width) + Profit margin pie chart (33% width)
- **Row 3 (Charts):** Orders trend (line chart, 50% width) + Top products bar chart (50% width)
- **Row 4 (Table):** Recent orders table (full-width, last 25 orders)
- **Row 5 (Table):** Top performing products table (full-width, top 10 by profit)

**Layout Grid:**
```
┌─────────────────────────────────────────────────────┐
│ [Filters: Date Range, Store]                        │
├───────────┬───────────┬───────────┬─────────────────┤
│ Revenue   │ Profit    │ Orders    │ AOV             │ ← KPIs
│ $52,345   │ $12,890   │ 1,234     │ $42.40          │
├─────────────────────────────────┬───────────────────┤
│ Revenue Trend (30 days)         │ Profit by Source  │ ← Charts
│ [Line Chart]                    │ [Pie Chart]       │
├───────────────────────┬─────────────────────────────┤
│ Orders Trend          │ Top Products                │ ← Charts
│ [Line Chart]          │ [Bar Chart]                 │
├─────────────────────────────────────────────────────┤
│ Recent Orders                    [Export] [View All]│ ← Table
│ [Data Table - 25 rows]                              │
├─────────────────────────────────────────────────────┤
│ Top Performing Products          [Export] [View All]│ ← Table
│ [Data Table - 10 rows]                              │
└─────────────────────────────────────────────────────┘
```

### 2. Orders Profit Analysis Page

**Purpose:** Deep dive into order-level profitability

**Layout:** Table-heavy with detailed filtering options
- Filter panel (date, status, customer, country, platform)
- Summary KPIs (Total Orders, Total Revenue, Total Profit, Avg Profit per Order)
- Large sortable/filterable data table (all columns: Order ID, Customer, Date, Items, Revenue, Costs breakdown, Net Profit, Margin %)
- Pagination for large datasets

### 3. Products Profit Analysis Page

**Purpose:** Product performance breakdown by SKU, collection, vendor

**Layout:**
- Summary KPIs (Best Seller, Highest Margin, Lowest Margin, Total SKUs)
- Product performance table (Product Name, SKU, Units Sold, Revenue, COGS, Profit, Margin %)
- Grouping options (by collection, by vendor, by product type)
- Visual charts (top 10 products bar chart, profit distribution pie chart)

### 4. Reports Page

**Purpose:** Access to specialized reports (P&L statement, retention analysis, ROAS tracking)

**Layout:** Report card grid
- Cards for each report type (P&L Report, Lifetime Profit, Retention Cohorts, Ad Performance)
- Click card to open detailed report view
- Export options (PDF, CSV, Excel)

### 5. Settings Page

**Purpose:** Configuration of expense tracking, integrations, preferences

**Layout:** Form-heavy, sidebar sub-navigation
- Left sidebar: Settings categories (General, Integrations, Expenses, Notifications, Billing)
- Right content: Form fields for selected category
- Save/Cancel buttons at bottom

## Information Density

### Data Density Strategy

BeProfit follows a **moderate-to-high density** approach:

- **Approach:** Data-dense but not overwhelming; maximizes information without sacrificing readability
- **Whitespace Usage:** Sufficient whitespace (24px gaps) between cards to prevent visual clutter
- **Content Above the Fold:** 4-6 key widgets visible without scrolling (KPI cards + 1-2 charts)
- **Scroll Behavior:** Vertical scrolling expected for full dashboard; smooth scroll, no infinite scroll

### Density Levels

**Dashboard View (Overview):** Moderate density
- Multiple widgets visible simultaneously
- Focus on key metrics first, details below
- Comfortable padding and spacing

**Table View (Data Management):** Higher density
- More rows per screen (25-50 rows typical)
- Tighter row height (48px)
- Horizontal scroll for many columns

**Settings View (Configuration):** Lower density
- More whitespace around form fields
- Focused, linear form flow
- Comfortable 60px+ vertical spacing between form groups

### User Density Control

**Adjustable Density:** Not typically offered in standard dashboards, but customizable widget placement may be available

**View Options:** Possible "Compact View" toggle to reduce padding and increase data per screen

## Responsive Behavior

### Desktop Layout (> 1200px)

- **Grid Columns:** 4-column grid for KPI cards
- **Chart Size:** Full-sized, detailed visualizations with all labels
- **Sidebar:** Always visible (240-280px fixed)
- **Table Columns:** All columns visible (10-15 columns typical)

### Tablet Layout (768px - 1200px)

- **Grid Columns:** 2-column grid for KPI cards
- **Chart Size:** Slightly smaller but functional (height reduced to 250-300px)
- **Sidebar:** Collapsible (hamburger menu icon to toggle)
- **Table Columns:** 6-8 priority columns visible, horizontal scroll for more

### Mobile Layout (< 768px)

- **Grid Columns:** Single column stack (cards full-width)
- **Chart Rendering:** Responsive charts with touch-friendly interactions
- **Sidebar:** Hidden by default, slide-out drawer menu
- **Card Stacking:** All widgets stack vertically
- **Table View:** Transforms to card view (each row becomes a card) or horizontal scroll

**Mobile Card View Example:**
```
┌────────────────────────┐
│ Order #12345          │
│ John Smith            │
│ Feb 13, 2026          │
│ Revenue: $234.56      │
│ Profit: $45.89 (19%)  │
│ [View Details →]      │
└────────────────────────┘
┌────────────────────────┐
│ Order #12344          │
│ Jane Doe              │
│ ...                   │
└────────────────────────┘
```

### Responsive Patterns

**Breakpoint Strategy:**
- 1280px: Full 4-column desktop layout
- 1024px: 3-column layout, sidebar collapsible
- 768px: 2-column layout, sidebar hidden
- 640px: 1-column mobile layout, card transformations

**Chart Responsiveness:**
- Charts adapt to container width (responsive SVG/canvas)
- Axis labels rotate or abbreviate on smaller screens
- Legend moves below chart on narrow widths

**Table Responsiveness:**
- Desktop: Full table with all columns
- Tablet: Hide non-essential columns, show "..." menu for hidden data
- Mobile: Card view or aggressive horizontal scroll with frozen first column

## Widget Interactivity

### Interactive Elements

**Card Click:** Entire card may be clickable to navigate to detailed view (cursor: pointer)

**Hover States:**
- Cards lift slightly (shadow increase)
- Interactive elements (buttons, links) show hover color change
- Table rows highlight on hover (background: #F9FAFB)

**Expand/Collapse:**
- Charts may have full-screen expand button (icon in top-right)
- Tables may expand to show more rows or collapse to save space

**Drag-and-Drop:** Likely not supported for widget rearrangement (would require custom dashboard builder feature)

**Customization:** Possible "Customize Dashboard" mode to add/remove widgets or change layout order

### Loading States

**Skeleton Screens:** Placeholder UI (gray animated rectangles) while data loads
- KPI cards show skeleton: gray rectangle for number, smaller rectangle for label
- Charts show skeleton: gray axes and placeholder area
- Tables show skeleton rows (5-10 shimmer rows)

**Progressive Loading:**
- KPIs load first (fastest queries)
- Charts load second (moderate complexity)
- Tables load last (most data-intensive)

**Spinners:** Small spinning loader icon in card corner during refresh

**Shimmer Animation:**
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

## Dashboard Navigation Patterns

### Page-Level Navigation

**Sidebar Navigation:** Primary method
- Dashboard (home icon)
- Orders (list icon)
- Products (box icon)
- Reports (chart icon)
- Settings (gear icon)

**Tab Navigation:** Used within pages (e.g., Reports page has tabs: P&L, Retention, ROAS)

**Breadcrumbs:** Present on detail pages
- Example: Dashboard > Orders > Order #12345

**Back to Dashboard:** Link in top bar or sidebar highlight

### Widget-Level Navigation

**"View More" Links:** From widget to detailed page
- "View all orders →" link in orders table card
- "See full report →" link in chart card

**Drill-Down:** Click metric to see breakdown
- Click "Total Profit" KPI card → navigate to detailed profit breakdown page
- Click bar in chart → filter dashboard to that product/period

**Cross-Links:** Widgets link to related pages
- Click product name in table → navigate to product detail page
- Click order ID → navigate to order detail page

## Whitespace & Spacing

### Spacing Scale

BeProfit follows a consistent spacing scale (likely 4px or 8px base unit):

- **Between Cards:** 24px gap (3x base unit of 8px)
- **Within Cards:** 20px padding (2.5x base unit)
- **Section Margins:** 32px vertical spacing between major sections (4x base unit)
- **Consistent Spacing:** Evidence of 8px spacing scale (8, 16, 24, 32, 40, 48px)

### Visual Breathing Room

**Cluttered vs Clean:** Clean, with intentional whitespace preventing information overload

**Content Margins:**
- Dashboard content: 24px margin from viewport edges
- Card content: 20px padding from card edges
- Text elements: 8-12px margins between heading/body

## Dashboard Customization

### Personalization Features

**Custom Dashboards:** Likely supported for advanced users
- Create multiple dashboard views (e.g., "Daily Overview", "Monthly Review", "Product Performance")
- Choose which widgets to include
- Arrange widget order/position

**Saved Views:** Filter preferences saved
- Save custom date ranges (e.g., "Last 90 days")
- Save filter combinations (e.g., "US orders, paid status")
- Quick access to saved views via dropdown

**Widget Selection:** Add/remove widgets
- "Add Widget" button to insert new cards
- Remove widget via "X" icon in card header
- Widget library showing available chart/table options

**Layout Control:** Limited rearrangement
- Drag-and-drop widget reordering (if supported)
- Resize widgets (expand to full-width, collapse to half-width)
- Reset to default layout option

## Competitive Layout Analysis

### vs TrueProfit Dashboard Layout

**Similarities:**
- Both use card-based grid systems
- Both prioritize KPI cards above the fold
- Both use purple brand color scheme

**Differences:**
- BeProfit may offer multi-store consolidated view (TrueProfit may not)
- Layout density may vary (one more spacious, other more compact)

### vs Lifetimely Dashboard Layout

**Similarities:**
- Both focus on e-commerce analytics
- Both use time-series charts prominently

**Differences:**
- Lifetimely emphasizes customer lifetime value metrics more heavily
- BeProfit focuses more on profit/loss and expense tracking

### Dashboard Best Practices

BeProfit follows standard analytics dashboard patterns:
- **F-Pattern Layout:** Users scan left-to-right, top-to-bottom; most critical info top-left
- **Visual Hierarchy:** Size and position indicate importance (KPIs largest/top, details below)
- **Consistent Card Pattern:** All widgets follow same card structure for familiarity
- **Responsive Grid:** Adapts smoothly across devices
- **Action Proximity:** Action buttons near relevant data (export near table)

## Dashboard Layout Strengths

1. **Clear Visual Hierarchy** — KPI cards prominently displayed at top provide instant business health snapshot before scrolling to detailed charts/tables
2. **Modular Card System** — Consistent card pattern creates predictable, learnable interface; users know where to find titles, actions, and content
3. **Multi-Store Consolidated View** — Unique selling point allowing merchants to compare performance across multiple storefronts in single dashboard
4. **Responsive Adaptation** — Clean breakpoint strategy ensures dashboard remains functional and readable on tablets and mobile devices
5. **Data Density Balance** — Strikes good balance between information-rich (many metrics visible) and readable (sufficient whitespace prevents overwhelm)

## Dashboard Layout Weaknesses

1. **Limited Customization** — If widget rearrangement not supported, power users may feel constrained by fixed layout
2. **Potential Information Overload** — High density of financial data may overwhelm new users; could benefit from progressive disclosure or guided onboarding
3. **Desktop-First Optimization** — While responsive, mobile experience likely compromised due to complexity; may require separate mobile app for optimal experience

## Relevance to Our Build

### Dashboard Architecture for Our Product

**Grid System to Adopt:**
- 12-column grid system with 24px gaps
- CSS Grid for layout (modern, flexible, responsive)
- Container max-width: 1400px for readability on ultra-wide screens

**Layout Pattern:**
```css
.dashboard-container {
  display: grid;
  grid-template-columns: 240px 1fr; /* Sidebar + content */
  min-height: 100vh;
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 24px;
}

@media (max-width: 1200px) {
  .dashboard-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    grid-template-columns: 1fr; /* Stack sidebar */
  }

  .dashboard-content {
    grid-template-columns: 1fr; /* Single column */
  }
}
```

### Widget Strategy

**Essential Widget Types:**
1. **KPI Cards** (must-have) — Revenue, Profit, Orders, AOV as minimum set
2. **Line Charts** (must-have) — Revenue/profit trends over time
3. **Data Tables** (must-have) — Recent orders, top products
4. **Pie/Donut Charts** (nice-to-have) — Profit source breakdown, category distribution
5. **Bar Charts** (nice-to-have) — Top products comparison, geographic breakdown

**Implementation Priority:**
1. Phase 1: KPI cards + basic table
2. Phase 2: Line chart for trends
3. Phase 3: Additional chart types and advanced filtering

### Information Density Decisions

**Recommended Density:** Moderate (similar to BeProfit)
- Show 4 KPI cards + 1-2 charts above fold
- Use 24px gaps (not too tight, not too spacious)
- Default to 25 rows per table page

**Density Control:** Consider "View" toggle
- Comfortable (default): 24px gaps, 20px card padding
- Compact: 16px gaps, 16px card padding, smaller fonts

### Responsive Dashboard Design

**Approach:** Desktop-first with mobile adaptations
- Design for 1280px+ first (most users)
- Adapt layout for 768-1280px tablets
- Transform to mobile-friendly card views <768px

**Mobile Strategy:**
- Prioritize KPIs and key charts on mobile
- Tables convert to card view with "View Details" buttons
- Horizontal scroll as fallback for complex tables
- Touch-friendly target sizes (44px minimum)

### Customization Features

**MVP Customization:**
- Date range filter (essential)
- Store selector if multi-store
- Export to CSV/Excel (important for power users)

**Future Customization:**
- Saved dashboard views
- Widget add/remove
- Custom date ranges (e.g., "Black Friday Weekend 2025")

**Skip for MVP:**
- Drag-and-drop widget rearrangement (complex, low ROI for early users)
- Multiple custom dashboards (single dashboard sufficient initially)

## Dashboard Layout Specifications

### Grid System Reconstruction

```css
/* Dashboard Grid Container */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Responsive breakpoints */
@media (max-width: 1280px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
}

/* Card size variants */
.card-small { grid-column: span 1; } /* 25% width */
.card-medium { grid-column: span 2; } /* 50% width */
.card-large { grid-column: span 3; } /* 75% width */
.card-full { grid-column: span 4; } /* 100% width */

/* Mobile: all cards full-width */
@media (max-width: 768px) {
  .card-small,
  .card-medium,
  .card-large,
  .card-full {
    grid-column: span 1;
  }
}
```

### Card Component Specs

```css
/* Base dashboard card */
.dashboard-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.dashboard-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Card header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #F3F4F6;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.card-subtitle {
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
}

.card-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.card-action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: #6B7280;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.card-action-btn:hover {
  background: #F3F4F6;
  color: #111827;
}

/* Card body */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Allow flex child to shrink */
}

/* Card footer (optional) */
.card-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 14px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer-link {
  color: #6514DD;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}

.card-footer-link:hover {
  color: #4F0FB8;
}
```

### KPI Card Specific Styles

```css
/* KPI Card */
.kpi-card {
  min-height: 140px;
  justify-content: center;
}

.kpi-label {
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.kpi-value {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 8px;
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
  margin-top: 8px;
}
```

### Filter Bar Styles

```css
/* Filter bar (sticky top) */
.dashboard-filter-bar {
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 10;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.filter-select {
  min-width: 180px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background: #FFFFFF;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #6514DD;
  box-shadow: 0 0 0 3px rgba(101, 20, 221, 0.1);
}

.filter-button {
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.filter-button-primary {
  background: #6514DD;
  color: #FFFFFF;
}

.filter-button-primary:hover {
  background: #4F0FB8;
}

.filter-button-secondary {
  background: #F3F4F6;
  color: #374151;
}

.filter-button-secondary:hover {
  background: #E5E7EB;
}
```

## Dashboard Layout Diagrams

### Main Dashboard Layout Example

```
┌─────────────────────────────────────────────────────────────┐
│ Dashboard Header: "Overview" + Date Selector + Store Filter │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│ │ Revenue  │ │ Profit   │ │ Orders   │ │ AOV      │       │
│ │ $52,345  │ │ $12,890  │ │ 1,234    │ │ $42.40   │       │
│ │ ↑ 12%    │ │ ↑ 8%     │ │ ↓ 3%     │ │ ↑ 15%    │       │
│ │ ~~~~/    │ │ ~~~~/    │ │ ~~\~~    │ │ ~~~~/    │       │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
│ ┌────────────────────────────────┐ ┌──────────────────┐   │
│ │ Revenue Trend (30 days)    [▼] │ │ Profit by Source │   │
│ │ ┌──────────────────────────┐   │ │  ┌────────────┐  │   │
│ │ │   /\      /\             │   │ │  │  ┌──┐     │  │   │
│ │ │  /  \  /\/  \    /\      │   │ │  │  │  │◐◐◐◐◐│  │   │
│ │ │ /    \/      \  /  \     │   │ │  │  │  │     │  │   │
│ │ │/              \/    \    │   │ │  │  └──┘     │  │   │
│ │ └──────────────────────────┘   │ │  └────────────┘  │   │
│ └────────────────────────────────┘ └──────────────────┘   │
│                                                             │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Recent Orders                [Export] [Filter] [View All]│
│ │ ┌────────────────────────────────────────────────────┐ │ │
│ │ │ Order ID │ Customer │ Date │ Total │ Profit │ ... │ │ │
│ │ ├──────────────────────────────────────────────────── │ │
│ │ │ #12345   │ John S.  │ 2/13 │ $234  │ $45    │ ••• │ │ │
│ │ │ #12344   │ Jane D.  │ 2/13 │ $90   │ $18    │ ••• │ │ │
│ │ │ #12343   │ Bob J.   │ 2/12 │ $456  │ $89    │ ••• │ │ │
│ │ │ ...      │ ...      │ ...  │ ...   │ ...    │ ... │ │ │
│ │ └────────────────────────────────────────────────────┘ │ │
│ │ [← Previous] [1] 2 [3] ... [15] [Next →] (1-25 of 371) │ │
│ └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Mobile Layout

```
┌─────────────────────┐
│ [☰] Dashboard  [•••]│
├─────────────────────┤
│ Date: Last 30 Days ▼│
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ Revenue         │ │
│ │ $52,345         │ │
│ │ ↑ 12% vs last mo│ │
│ └─────────────────┘ │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ Net Profit      │ │
│ │ $12,890         │ │
│ │ ↑ 8% vs last mo │ │
│ └─────────────────┘ │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ Revenue Trend   │ │
│ │   /\    /\      │ │
│ │  /  \  /  \  /\ │ │
│ │ /    \/    \/   │ │
│ └─────────────────┘ │
├─────────────────────┤
│ Recent Orders       │
│ ┌─────────────────┐ │
│ │ Order #12345    │ │
│ │ John Smith      │ │
│ │ $234.56         │ │
│ │ [View →]        │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Order #12344    │ │
│ │ Jane Doe        │ │
│ │ $89.99          │ │
│ │ [View →]        │ │
│ └─────────────────┘ │
├─────────────────────┤
│ [Load More]         │
└─────────────────────┘
```

## Sources

- https://beprofit.co/ — Product marketing site and feature descriptions
- https://apps.shopify.com/beprofit-profit-tracker — Shopify App Store listing with product reviews and feature details
- https://help.runviably.com/beprofit — Help center documentation
- User reviews and testimonials describing "clean dashboard", "intuitive analytics", and "easy to use" interface
- Standard SaaS analytics dashboard patterns and UI/UX best practices
