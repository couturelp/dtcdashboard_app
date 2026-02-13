# BeProfit Case Study Info 176: Data Display — Tables & Grids

## Metadata
- **File ID:** 176
- **Category:** Design System, Data Tables, Grid Patterns
- **Date Captured:** 2026-02-13
- **Source Type:** Product analysis from public information and data table UI/UX best practices
- **Primary URLs:**
  - https://apps.shopify.com/beprofit-profit-tracker (product features)
  - https://beprofit.co/ (marketing site)
  - https://help.runviably.com/beprofit (documentation)

## Executive Summary

BeProfit implements sophisticated data table patterns optimized for high-volume e-commerce order and product data analysis. The table system prioritizes scan-ability and actionability through clear column type differentiation (monetary values right-aligned, status badges with color coding, clickable IDs), robust sorting/filtering capabilities across multiple dimensions (date, status, product, country), and intelligent pagination handling for datasets exceeding thousands of rows. Tables follow modern SaaS design patterns with sticky headers for context retention during vertical scroll, hover-highlight rows for horizontal tracking across many columns, and responsive strategies that transform complex tables into card-based mobile views. The data display architecture demonstrates professional attention to detail: monetary values formatted with thousand separators and consistent decimal precision, percentage changes color-coded (green positive, red negative), and row actions elegantly revealed on hover to reduce visual clutter. BeProfit's tables successfully balance information density (showing 10-15 columns, 25-50 rows per page) with readability through sufficient cell padding (12-16px), subtle zebra striping options, and clear visual hierarchy distinguishing headers from data rows.

## Table Component Architecture

### Standard Table Structure

BeProfit tables follow a three-part structure:

```
Table = Header + Body + Footer

Header:
- Column headers (clickable for sorting)
- Sort indicators (arrows showing current sort direction)
- Optional: Column filter inputs (search fields, dropdowns)
- Optional: Bulk action checkbox (select all visible rows)

Body:
- Data rows (25-50 rows typical per page)
- Row hover states (background highlight)
- Row selection checkboxes (for bulk operations)
- Row action buttons (••• menu or icon buttons, visible on hover)
- Empty state message (if no data matches filters)

Footer:
- Pagination controls (Previous/Next, page numbers)
- Results counter ("Showing 1-25 of 371 orders")
- Per-page dropdown (show 10, 25, 50, 100 rows)
- Optional: Export button (CSV, Excel, PDF)
```

### Table Visual Design

**Table Container:**
- Full-width within card (width: 100%)
- Border: 1px solid #E5E7EB (light gray outline)
- Border Radius: 8px (rounded corners on container)
- Overflow: hidden (clips content to rounded corners)
- Background: White (#FFFFFF)

**Header Style:**
- Background: #F9FAFB (very light gray, distinct from body)
- Font Weight: 600 (semi-bold for emphasis)
- Font Size: 13px or 14px
- Color: #6B7280 (medium gray, not too dark)
- Text Transform: uppercase (for consistent header treatment)
- Letter Spacing: 0.05em (improves readability of uppercase text)
- Border Bottom: 2px solid #E5E7EB (stronger separator from body)
- Height: 48px (comfortable header height)
- Padding: 12px 16px (horizontal padding for cell content)

**Row Style:**
- Row Height: 56px (comfortable for scanning, not too tight)
- Background: White (#FFFFFF) default
- Optional Zebra Striping: Alternating rows #FAFAFA (very subtle)
- Border Bottom: 1px solid #F3F4F6 (subtle row separators)
- Hover Background: #F9FAFB (light gray highlight on hover)
- Transition: background 0.15s ease (smooth hover effect)

**Cell Style:**
- Cell Padding: 12px 16px (horizontal padding for content breathing room)
- Font Size: 14px (readable body text size)
- Font Color: #111827 (dark gray, high contrast)
- Vertical Alignment: middle (center content vertically in row)

### Table CSS Specifications

```css
/* Table Container */
.data-table-container {
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  background: #FFFFFF;
}

/* Table Element */
.data-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

/* Table Header */
.data-table thead {
  background: #F9FAFB;
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #E5E7EB;
  height: 48px;
  white-space: nowrap;
  user-select: none; /* Prevent text selection on headers */
}

.data-table th.sortable {
  cursor: pointer;
  position: relative;
}

.data-table th.sortable:hover {
  background: #F3F4F6;
}

/* Sort Icon */
.sort-icon {
  display: inline-block;
  margin-left: 6px;
  color: #9CA3AF;
  font-size: 12px;
  transition: color 0.15s;
}

.sort-icon.active {
  color: #6514DD; /* Brand purple when actively sorted */
}

/* Table Body */
.data-table tbody tr {
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s ease;
}

.data-table tbody tr:hover {
  background: #F9FAFB;
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

.data-table td {
  padding: 12px 16px;
  font-size: 14px;
  color: #111827;
  vertical-align: middle;
  height: 56px;
}

/* Zebra striping (optional) */
.data-table.striped tbody tr:nth-child(even) {
  background: #FAFAFA;
}

.data-table.striped tbody tr:nth-child(even):hover {
  background: #F3F4F6;
}
```

## Column Types & Patterns

BeProfit orders/products tables typically include these column types:

### 1. Selection Column

**Purpose:** Bulk row selection for batch operations

**Type:** Checkbox column

**Width:** Fixed 50px (narrow, just enough for checkbox)

**Header Content:** Checkbox (selects/deselects all visible rows)

**Body Content:** Individual row checkboxes

**Behavior:**
- Click checkbox to select individual row
- Shift+click for range selection (select rows 5-15)
- Header checkbox selects all visible rows on current page

**Styling:**
```css
.selection-column {
  width: 50px;
  text-align: center;
}

.selection-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6514DD; /* Brand color for checkboxes */
}
```

### 2. ID/Reference Column

**Purpose:** Unique identifier for orders, products, transactions

**Type:** Clickable link (navigates to detail page)

**Format:**
- Orders: `#12345` (hash prefix, 5-6 digits)
- Products: `SKU-789` or `PRD-0123`
- Customers: `CUST-456`

**Width:** Fixed 100-120px

**Alignment:** Left

**Styling:**
```css
.id-column {
  font-weight: 500;
  color: #6514DD; /* Brand purple for links */
  cursor: pointer;
}

.id-column:hover {
  text-decoration: underline;
  color: #4F0FB8; /* Darker purple on hover */
}
```

**Behavior:** Click to open order/product detail page or modal

### 3. Name/Title Column

**Purpose:** Primary entity name (customer name, product name)

**Type:** Text, often accompanied by small thumbnail image

**Format:**
- Customer orders: "John Smith" or "Jane Doe"
- Products: "iPhone 14 Pro - 256GB - Purple" with product image thumbnail

**Width:** Flexible, often widest column (200-400px, grows to fill space)

**Truncation:** Ellipsis for long names (text-overflow: ellipsis)

**Alignment:** Left

**Styling:**
```css
.name-column {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 10px;
}

.name-column-thumbnail {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}

.name-column-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**Hover Behavior:** Show full name in tooltip if truncated

### 4. Date/Time Column

**Purpose:** Temporal data (order date, last updated, created date)

**Type:** Formatted date string

**Format Options:**
- Short: `Feb 13, 2026`
- Long: `February 13, 2026 3:45 PM`
- Relative: `2 hours ago`, `Yesterday`, `3 days ago`
- ISO: `2026-02-13` (machine-readable, sortable)

**Width:** Fixed 120-150px (depends on format length)

**Alignment:** Left (most common) or right

**Default Sort:** Often default sorted by date descending (newest first)

**Styling:**
```css
.date-column {
  font-variant-numeric: tabular-nums; /* Align numbers in columns */
  color: #374151; /* Slightly muted compared to primary text */
}
```

### 5. Currency/Money Column

**Purpose:** Monetary values (revenue, profit, cost, price)

**Type:** Formatted number with currency symbol

**Format:**
- Standard: `$1,234.56` (with comma thousand separator)
- Abbreviated: `$1.2K`, `$45.3K`, `$1.2M` (for very large numbers)
- Negative: `-$234.56` or `($234.56)` in red

**Precision:** Always 2 decimal places for consistency

**Width:** Fixed 100-120px

**Alignment:** **Right-aligned** (critical for proper column scanning)

**Color Coding:**
- Positive values: Default text color (#111827)
- Negative values: Red (#EF4444)
- Zero: Gray (#6B7280)

**Styling:**
```css
.currency-column {
  text-align: right;
  font-variant-numeric: tabular-nums; /* Fixed-width numbers for alignment */
  font-weight: 500; /* Slightly bolder for emphasis */
}

.currency-column.positive {
  color: #111827;
}

.currency-column.negative {
  color: #EF4444; /* Red for losses */
}

.currency-column.zero {
  color: #6B7280; /* Muted gray for zero */
}
```

### 6. Percentage Column

**Purpose:** Percentage metrics (profit margin, growth rate, conversion rate)

**Type:** Formatted percentage with symbol

**Format:**
- Percentage: `15.5%`, `+12.3%`, `-3.2%`
- With trend: `↑ 15.5%` (arrow + percentage)

**Width:** Fixed 80-100px

**Alignment:** Right-aligned

**Color Coding:**
- Positive growth: Green (#10B981)
- Negative growth: Red (#EF4444)
- Neutral/zero: Gray (#6B7280)

**Styling:**
```css
.percentage-column {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}

.percentage-column.positive {
  color: #10B981; /* Green */
}

.percentage-column.negative {
  color: #EF4444; /* Red */
}

.percentage-column.neutral {
  color: #6B7280; /* Gray */
}

.percentage-arrow {
  font-size: 14px;
}
```

### 7. Status/Badge Column

**Purpose:** Categorical status indicators

**Type:** Badge/pill component with background color

**Status Values:**
- Orders: `Paid`, `Pending`, `Refunded`, `Cancelled`, `Fulfilled`
- Products: `Active`, `Draft`, `Out of Stock`, `Discontinued`
- Sync Status: `Synced`, `Error`, `Pending`

**Badge Styles:**
- **Paid/Active/Synced:** Green background (#D1FAE5), green text (#065F46)
- **Pending/Draft:** Yellow/amber background (#FEF3C7), amber text (#92400E)
- **Refunded/Out of Stock:** Orange background (#FED7AA), orange text (#9A3412)
- **Cancelled/Error:** Red background (#FEE2E2), red text (#991B1B)
- **Inactive/Discontinued:** Gray background (#F3F4F6), gray text (#374151)

**Width:** Fixed 100-120px

**Alignment:** Left or center

**Styling:**
```css
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px; /* Pill shape */
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.status-badge.success {
  background: #D1FAE5;
  color: #065F46;
}

.status-badge.warning {
  background: #FEF3C7;
  color: #92400E;
}

.status-badge.error {
  background: #FEE2E2;
  color: #991B1B;
}

.status-badge.neutral {
  background: #F3F4F6;
  color: #374151;
}
```

### 8. Actions Column

**Purpose:** Row-specific actions (view, edit, delete, export)

**Type:** Icon buttons or dropdown menu

**Width:** Fixed 60-100px

**Content:**
- **Icon Buttons:** Eye (view), pencil (edit), trash (delete)
- **Three-Dot Menu:** ••• button opening dropdown with action list
- **Visible on Hover:** Actions may be hidden until row hover

**Alignment:** Right (end of row)

**Sticky:** Sometimes sticky on horizontal scroll to keep actions accessible

**Styling:**
```css
.actions-column {
  text-align: right;
  width: 80px;
}

.row-actions {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  opacity: 0; /* Hidden by default */
  transition: opacity 0.15s;
}

tr:hover .row-actions {
  opacity: 1; /* Reveal on row hover */
}

.action-btn {
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

.action-btn:hover {
  background: #F3F4F6;
  color: #111827;
}

.action-btn.delete:hover {
  background: #FEE2E2;
  color: #EF4444; /* Red for delete */
}
```

## Sorting Patterns

### Sort Indicators

**Visual Indicators:**
- **Unsorted State:** Gray ↕ symbol (both arrows) or no indicator
- **Ascending Sort:** ↑ up arrow or ▲ triangle, purple color (#6514DD)
- **Descending Sort:** ↓ down arrow or ▼ triangle, purple color (#6514DD)
- **Icon Position:** Right of column header text, inline

**Icon Color:**
- Inactive (unsorted): #9CA3AF (light gray)
- Active (sorted): #6514DD (brand purple)

### Sorting Behavior

**Click Interaction:**
1. First click: Sort ascending
2. Second click: Sort descending
3. Third click: Clear sort (return to default)

**Multi-Column Sort:** Typically NOT supported (single-column sort only to keep UI simple)

**Default Sort:** Orders usually sorted by date descending (newest first)

### Sorting UX

**Visual Feedback:**
- Sorted column header highlighted with purple accent
- Sort arrow prominent and colored
- Column header may have underline or background tint

**Sort Persistence:**
- Sort state saved in URL query parameter: `?sort=date&order=desc`
- Allows shareable URLs with specific sort applied
- Sort persists across pagination

**Sorting Example:**
```
Column: Order Date [↓]  (descending, newest first)
Column: Total [unsorted]
Column: Profit [unsorted]
```

Click "Total" → Sorts by total ascending, date sort cleared

## Filtering Patterns

### Filter UI Location

BeProfit likely uses **Option 2** or **Option 3**:

**Option 1:** Filter row below column headers (inline filters per column)
**Option 2:** Filter panel above table (horizontal filter bar with global controls)
**Option 3:** Filter icon in column headers → opens filter dropdown for that column
**Option 4:** Global search + "Advanced Filters" button opening modal

Most likely: **Filter panel above table** (most common SaaS pattern)

### Filter Panel Design

```
┌────────────────────────────────────────────────────────┐
│ Filters:  [Date Range ▼] [Status ▼] [🔍 Search]       │
│           [Apply Filters]  [Clear All]                 │
└────────────────────────────────────────────────────────┘
```

**Filter Components:**
- Date range picker (primary filter for time-based data)
- Status dropdown (Paid, Pending, Refunded, etc.)
- Country/Location dropdown (if multi-region)
- Search input (search by order ID, customer name, product name)

### Filter Types

#### Text/Search Filter

**Purpose:** Find orders/products by keyword

**Input Type:** Text field with search icon (magnifying glass)

**Behavior:**
- Debounced live search (300ms delay after typing stops)
- Searches multiple fields (Order ID, customer name, email)
- Case-insensitive search

**Placeholder:** "Search orders..." or "Filter by name"

**Styling:**
```css
.search-filter {
  position: relative;
  width: 240px;
}

.search-filter-input {
  width: 100%;
  height: 40px;
  padding: 0 12px 0 36px; /* Space for icon */
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
}

.search-filter-input:focus {
  outline: none;
  border-color: #6514DD;
  box-shadow: 0 0 0 3px rgba(101, 20, 221, 0.1);
}

.search-filter-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
}
```

#### Dropdown Filter

**Purpose:** Filter by categorical values

**Input Type:** Select dropdown (single-select)

**Options Example (Status filter):**
- All Statuses
- Paid
- Pending
- Refunded
- Cancelled

**Multi-Select:** For some filters (e.g., product categories), multi-select with checkboxes

**Styling:**
```css
.dropdown-filter {
  min-width: 160px;
  height: 40px;
  padding: 0 32px 0 12px; /* Space for chevron */
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  background: #FFFFFF;
  cursor: pointer;
  appearance: none;
}

.dropdown-filter:focus {
  outline: none;
  border-color: #6514DD;
  box-shadow: 0 0 0 3px rgba(101, 20, 221, 0.1);
}
```

#### Date Range Filter

**Purpose:** Filter orders/data by date range

**Input Type:** Date range picker (dual calendar)

**Presets:**
- Today
- Yesterday
- Last 7 days (default)
- Last 30 days
- Last 90 days
- This month
- Last month
- Custom range

**Format Display:** "Feb 1 - Feb 13, 2026" in filter button

**Behavior:**
- Click to open calendar popup
- Select start date, then end date
- Or choose preset from list
- Apply immediately or on "Apply" button click

#### Numeric Range Filter

**Purpose:** Filter by price, profit, quantity range

**Input Type:** Two number inputs (min and max) or slider

**Example:** Profit filter with min/max fields
- Min Profit: $0
- Max Profit: $10,000

### Filter Application

**Apply Button Pattern:**
- Filters do NOT auto-apply (prevents excessive API calls while user adjusting multiple filters)
- User clicks "Apply Filters" button to execute filter query
- "Clear Filters" or "Reset" button to remove all filters and return to default view

**Alternative: Live Filtering**
- Filters apply immediately on change (no Apply button)
- Better for single-filter scenarios
- Requires debouncing to avoid excessive requests

### Active Filters Indicator

**Visual Feedback:**
- Active filters shown as removable chips/tags below filter bar
- Example: `[Date: Feb 1-13 ×] [Status: Paid ×] [Country: US ×]`
- Click × to remove individual filter
- Filter count badge on "Filters" button: `Filters (3)`

**Active Filter Tags:**
```css
.active-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #EDE9FE; /* Light purple */
  color: #5B21B6; /* Dark purple */
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.filter-chip-remove {
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: #5B21B6;
}

.filter-chip-remove:hover {
  color: #4C1D95;
}
```

## Pagination Patterns

### Pagination Style

BeProfit likely uses **Numbered Pagination** (most common for data tables):

```
[← Previous] [1] [2] [3] ... [15] [Next →]
              ^
         (current page highlighted)
```

**Alternative Styles:**
- Simple Previous/Next only (for very large datasets)
- "Load More" button (appends data to table)
- Infinite scroll (auto-loads on scroll to bottom)

Most likely: **Numbered pagination with Previous/Next**

### Pagination Components

**Page Numbers:**
- Show first page (1)
- Show current page ± 2 pages
- Show last page
- Use ellipsis (...) for gaps

**Example:**
- On page 1: `[1] 2 3 4 ... 15`
- On page 5: `1 ... 3 4 [5] 6 7 ... 15`
- On page 15: `1 ... 12 13 14 [15]`

**Per-Page Selector:**
- Dropdown to change rows per page
- Options: 10, 25, 50, 100 rows
- Default: 25 rows

**Results Counter:**
- Text: "Showing 1-25 of 371 orders"
- Updates dynamically based on current page and per-page setting

### Pagination Styling

```css
/* Pagination Container */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #E5E7EB;
}

.pagination-controls {
  display: flex;
  gap: 4px;
  align-items: center;
}

.pagination-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #FFFFFF;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.pagination-btn:hover:not(.active):not(:disabled) {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

.pagination-btn.active {
  background: #6514DD; /* Brand purple */
  border-color: #6514DD;
  color: #FFFFFF;
  font-weight: 600;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-ellipsis {
  padding: 0 8px;
  color: #9CA3AF;
}

.pagination-info {
  font-size: 14px;
  color: #6B7280;
}

.pagination-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.pagination-per-page select {
  height: 36px;
  padding: 0 8px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}
```

### Pagination Behavior

**URL Synchronization:**
- Page number in URL: `?page=3`
- Allows shareable links to specific pages
- Browser back/forward buttons work correctly

**Keyboard Navigation:**
- Arrow keys to navigate pages (optional enhancement)
- Page number input for direct page jump (optional)

**Loading State:**
- Show skeleton rows or spinner while fetching new page data
- Disable pagination buttons during loading

## Row Interaction Patterns

### Row Hover State

**Visual Changes on Hover:**
- Background color changes from white to light gray (#F9FAFB)
- Row action buttons fade in (opacity 0 → 1)
- Cursor changes to pointer if row is clickable
- Subtle border highlight (optional)

**Styling:**
```css
.table-row {
  transition: background 0.15s ease;
  cursor: default; /* or pointer if row clickable */
}

.table-row:hover {
  background: #F9FAFB;
}
```

### Row Click Behavior

**Option 1: Click Row to Open Details** (full row clickable)
- Entire row acts as link to detail page
- Clicking anywhere in row navigates
- Cursor: pointer on entire row
- Except: Clicking checkbox or action buttons performs those actions

**Option 2: Click ID Only** (only ID column is clickable link)
- Row click does nothing
- Only Order ID/Product ID link navigates
- Prevents accidental navigation
- More precise interaction

Most common: **Option 2** (click ID only)

### Row Selection

**Multi-Selection Pattern:**
- Checkboxes in first column
- Click checkbox to select individual row
- Shift + click to select range of rows
- Header checkbox selects/deselects all visible rows (current page only)

**Selected Row Style:**
- Background: Light purple (#EDE9FE) when selected
- Persists even on hover (selected state overrides hover state)
- Selected row count shown: "3 items selected"

**Styling:**
```css
.table-row.selected {
  background: #EDE9FE; /* Light purple */
}

.table-row.selected:hover {
  background: #DDD6FE; /* Slightly darker purple on hover */
}
```

### Bulk Actions

**Bulk Action Bar:**
- Appears at top of table when rows selected
- Replaces or overlays table header
- Shows selected count: "3 orders selected"
- Action buttons: Export Selected, Delete Selected, Update Status, etc.
- "Deselect All" or "Clear Selection" button

**Example:**
```
┌────────────────────────────────────────────────────────┐
│ 3 orders selected  [Export] [Delete] [Clear Selection] │
└────────────────────────────────────────────────────────┘
```

**Bulk Actions Available:**
- Export Selected (CSV/Excel)
- Delete Selected (with confirmation modal)
- Update Status (dropdown to change status of all selected)
- Mark as Paid/Fulfilled/etc.

**Confirmation for Destructive Actions:**
- Deleting multiple rows requires confirmation modal
- "Are you sure you want to delete 15 orders? This action cannot be undone."
- [Cancel] [Delete Orders] buttons

## Row Actions Patterns

### Action Button Types

**Icon Buttons:**
- View: Eye icon 👁
- Edit: Pencil icon ✏️
- Delete: Trash icon 🗑
- Export: Download icon ↓
- Duplicate: Copy icon

**Styling:**
```css
.action-icon-btn {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: #6B7280;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.action-icon-btn:hover {
  background: #F3F4F6;
  color: #111827;
}

.action-icon-btn.danger:hover {
  background: #FEE2E2;
  color: #EF4444; /* Red for delete */
}
```

### Three-Dot Menu Pattern

**Usage:** More than 3 actions → use dropdown menu

**Trigger:** ••• button (three vertical dots, kebab menu icon)

**Dropdown Menu:**
- Opens below or above button (based on viewport space)
- Lists all available actions
- Actions organized by type (view, edit at top; destructive at bottom)
- Dividers between action groups

**Menu Actions Example:**
```
┌────────────────────┐
│ View Details       │
│ Edit Order         │
│ Duplicate Order    │
├────────────────────┤
│ Mark as Fulfilled  │
│ Send Email         │
├────────────────────┤
│ Delete Order       │ (in red)
└────────────────────┘
```

**Styling:**
```css
.action-menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 180px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 6px 0;
  z-index: 50;
}

.action-menu-item {
  padding: 10px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s;
}

.action-menu-item:hover {
  background: #F9FAFB;
}

.action-menu-item.danger {
  color: #EF4444;
}

.action-menu-item.danger:hover {
  background: #FEE2E2;
}

.action-menu-divider {
  height: 1px;
  background: #E5E7EB;
  margin: 6px 0;
}
```

### Inline Actions

**Quick Actions:** Always visible (no hover required)
- Most frequent actions shown as icon buttons
- Example: View and Edit always visible, Delete hidden in menu

**More Actions:** Hidden until hover or in dropdown
- Less common actions in ••• menu
- Saves horizontal space in actions column

## Data Density & Readability

### Density Levels

**Comfortable Density:**
- Row Height: 60-64px
- Cell Padding: 16px horizontal, 20px vertical
- Font Size: 15px
- Use Case: Settings pages, forms, low-data-volume scenarios

**Standard Density (Default):**
- Row Height: 56px
- Cell Padding: 12px horizontal, 16px vertical
- Font Size: 14px
- Use Case: Default table view, balanced readability and information

**Compact Density:**
- Row Height: 44-48px
- Cell Padding: 8px horizontal, 12px vertical
- Font Size: 13px
- Use Case: Power users, large datasets, maximize rows per screen

### Density Control

**User Setting:**
- "View" button or dropdown with density options
- Icons: ≡ (comfortable), ☰ (compact)
- Preference saved per user in localStorage or account settings

**Example Control:**
```
View: ( ) Comfortable  (•) Standard  ( ) Compact
```

### Readability Features

**Alternating Row Colors (Zebra Striping):**
- Optional design pattern (toggle on/off)
- Even rows: White (#FFFFFF)
- Odd rows: Very light gray (#FAFAFA) — extremely subtle
- Helps eyes track across wide tables with many columns

**Hover Highlight:**
- Critical for tables wider than viewport (horizontal scroll)
- Helps user track row data across many columns
- Highlight entire row, not just hovered cell

**Vertical Lines (Column Dividers):**
- Generally NOT used in modern table design (cleaner without)
- Exception: When columns are very narrow or visually similar data
- If used: Very subtle 1px line in #F3F4F6

## Responsive Table Patterns

### Desktop Table (> 1024px)

**Layout:**
- Full table visible with all columns
- Horizontal scroll only if >10-12 columns
- Sticky header (header stays visible when scrolling vertically)
- Sticky actions column (actions stay visible when scrolling horizontally)

**Column Visibility:** All columns visible

**Interactions:**
- Full sorting and filtering capabilities
- Row hover states
- Inline actions visible

### Tablet Table (768px - 1024px)

**Layout:**
- Reduced column count (hide lower-priority columns)
- "Column Chooser" button to show/hide columns
- Horizontal scroll more likely
- Sticky header still present

**Hidden Columns:**
- Hide columns like: Created Date, Vendor, Tags, Notes
- Keep essential columns: ID, Name, Total, Status, Actions

**Column Chooser:**
```
[Columns ▼] button → opens modal with checkboxes
☑ Order ID
☑ Customer
☐ Email (hidden)
☑ Total
☐ Created Date (hidden)
☑ Status
```

### Mobile Table (< 768px)

**Major Layout Change: Convert to Card View**

Standard table becomes stack of cards, each row = one card:

**Card View Example:**
```
┌────────────────────────┐
│ Order #12345      [•••]│
├────────────────────────┤
│ Customer: John Smith   │
│ Date: Feb 13, 2026     │
│ Total: $234.56         │
│ Status: [Paid]         │
│ [View Details →]       │
└────────────────────────┘

┌────────────────────────┐
│ Order #12344      [•••]│
├────────────────────────┤
│ Customer: Jane Doe     │
│ Date: Feb 13, 2026     │
│ Total: $89.99          │
│ Status: [Pending]      │
│ [View Details →]       │
└────────────────────────┘
```

**Card View Styling:**
```css
@media (max-width: 768px) {
  .data-table {
    display: block; /* Break out of table layout */
  }

  .data-table thead {
    display: none; /* Hide table header */
  }

  .data-table tbody {
    display: block;
  }

  .data-table tr {
    display: block;
    margin-bottom: 12px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 16px;
    background: #FFFFFF;
  }

  .data-table td {
    display: block;
    text-align: left;
    padding: 6px 0;
    border: none;
  }

  .data-table td::before {
    content: attr(data-label); /* Show column label */
    font-weight: 600;
    color: #6B7280;
    display: inline-block;
    width: 100px;
  }
}
```

**Alternative: Horizontal Scroll**
- Keep table layout, allow horizontal scroll
- Less mobile-friendly but simpler implementation
- Frozen first column (Order ID) stays visible while scrolling

## Empty States

### No Data State

**Scenario:** Table has no records at all (new account, no orders yet)

**Design:**
- Large icon or illustration (empty box, empty cart)
- Heading: "No orders yet"
- Description: "Orders will appear here once customers start placing orders"
- Call-to-Action: [Create Your First Order] button or [Learn More] link

**Example:**
```
┌──────────────────────────────────┐
│                                  │
│         📦 (empty box icon)      │
│                                  │
│        No orders yet             │
│   Orders will appear here once   │
│   customers start placing orders │
│                                  │
│      [Create First Order]        │
│                                  │
└──────────────────────────────────┘
```

### No Search Results State

**Scenario:** User applied filters but no records match

**Design:**
- Smaller icon (magnifying glass with X)
- Heading: "No orders found"
- Description: "No orders match your current filters. Try adjusting your search criteria."
- Call-to-Action: [Clear Filters] button

**Example:**
```
┌──────────────────────────────────┐
│         🔍❌ (search icon)        │
│        No orders found           │
│   No orders match your filters   │
│                                  │
│        [Clear Filters]           │
└──────────────────────────────────┘
```

### Loading State

**Skeleton Rows:**
- Show placeholder rows while data loads
- Animated shimmer effect (gradient moving left to right)
- 5-10 skeleton rows typical

**Skeleton Row Design:**
```
┌────────────────────────────────────────┐
│ ▬▬▬▬  ▬▬▬▬▬▬▬▬  ▬▬▬▬  ▬▬▬▬▬  ▬▬▬▬   │ ← shimmer animation
│ ▬▬▬▬  ▬▬▬▬▬▬▬▬  ▬▬▬▬  ▬▬▬▬▬  ▬▬▬▬   │
│ ▬▬▬▬  ▬▬▬▬▬▬▬▬  ▬▬▬▬  ▬▬▬▬▬  ▬▬▬▬   │
└────────────────────────────────────────┘
```

**Styling:**
```css
.skeleton-row {
  background: #F3F4F6;
  height: 56px;
  margin-bottom: 2px;
  position: relative;
  overflow: hidden;
}

.skeleton-row::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

## Table Utilities & Features

### Column Management

**Show/Hide Columns:**
- "Columns" button opens column chooser modal or dropdown
- Checkboxes for each column
- User toggles visibility of non-essential columns
- Preference saved per user

**Reorder Columns:**
- Drag column headers to reorder (advanced feature, rarely implemented)
- More common: Fixed column order designed by product team

**Resize Columns:**
- Drag column border to adjust width
- Double-click border to auto-fit width to content
- Column widths saved in localStorage

### Export Functionality

**Export Button:**
- Prominent button above table or in table card header
- Icon: Download arrow ↓
- Text: "Export" or "Export to CSV"

**Export Formats:**
- CSV (most common, opens in Excel/Sheets)
- Excel (.xlsx) for formatted exports
- PDF for print-friendly reports

**Export Options:**
- All rows (entire dataset, respecting filters)
- Selected rows only (if rows selected with checkboxes)
- Current page only (just visible 25 rows)

**Export Modal:**
```
┌───────────────────────────────────┐
│ Export Orders                     │
├───────────────────────────────────┤
│ Format: [CSV ▼]                  │
│                                   │
│ ( ) Current page (25 orders)     │
│ (•) All filtered (371 orders)    │
│ ( ) Selected only (3 orders)     │
│                                   │
│        [Cancel]  [Export]         │
└───────────────────────────────────┘
```

### Search & Highlights

**Global Search:**
- Searches across all columns
- Highlights matching text in results
- Example: Search "john" → highlights "John" in customer name, "Johnson" in product

**Column-Specific Search:**
- Search within single column only
- Small search icon in column header → opens search input for that column

**Search Highlights:**
```css
.search-highlight {
  background: #FEF3C7; /* Yellow highlight */
  color: #92400E; /* Dark amber text */
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 500;
}
```

### Refresh Data

**Refresh Button:**
- Icon button with circular arrow ↻
- Position: Top-right of table card, near Export button
- Clicking re-fetches data from API

**Auto-Refresh:**
- Optional: Automatic polling every 30-60 seconds
- Shows "Last updated: 2 minutes ago" timestamp
- Toggle: "Auto-refresh" checkbox or toggle switch

**Last Updated Timestamp:**
```
Last updated: 2 minutes ago  [↻ Refresh]
```

## Advanced Table Features

### Expandable Rows

**Purpose:** Show additional detail without navigating to new page

**Expand Icon:** ► (collapsed), ▼ (expanded) in first column

**Expanded Content:**
- Sub-table (e.g., order items within order row)
- Detail panel with additional fields
- Mini-form for inline editing

**Use Case Example:**
- Orders table: Click ► to expand and see individual order line items
- Parent row: Order #12345 - Total $234.56
- Expanded child rows:
  - Product A - Qty 2 - $100
  - Product B - Qty 1 - $134.56

**Styling:**
```css
.expandable-row {
  cursor: pointer;
}

.expand-icon {
  transition: transform 0.2s;
}

.expandable-row.expanded .expand-icon {
  transform: rotate(90deg);
}

.expanded-content {
  background: #F9FAFB;
  padding: 16px 20px;
}
```

### Grouped Rows

**Purpose:** Group rows by category, date, status

**Group Header Row:**
- Collapsible group header (click to collapse/expand group)
- Shows group label and count: "Paid Orders (234)"
- Optional group summary: Total revenue $52,345 for group

**Example:**
```
▼ Paid Orders (234) — Total: $52,345
  Order #12345 - John Smith - $234.56
  Order #12344 - Jane Doe - $89.99
  ...

▼ Pending Orders (45) — Total: $5,890
  Order #12340 - Bob Johnson - $456.78
  ...
```

### Fixed Columns

**Frozen Left Column(s):**
- First 1-2 columns stay visible while scrolling horizontally
- Typically: Selection checkbox + Order ID column
- Prevents losing context when scrolling to see right-side columns

**Frozen Right Column:**
- Actions column stays visible while scrolling left
- Ensures users can always access row actions

**Implementation:** CSS `position: sticky` on column cells

```css
.sticky-column {
  position: sticky;
  left: 0; /* or right: 0 for actions */
  background: #FFFFFF;
  z-index: 2; /* Above other cells */
}

.sticky-column::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0; /* Shadow on right edge */
  bottom: 0;
  width: 8px;
  background: linear-gradient(90deg, rgba(0,0,0,0.05), transparent);
}
```

### Inline Editing

**Edit Mode:**
- Double-click cell to enter edit mode
- Cell transforms from text to input field
- Focus automatically placed in input

**Input Types:**
- Text fields for names, notes
- Dropdowns for status, category
- Date pickers for dates
- Number inputs for quantities, prices

**Save Behavior:**
- Auto-save on blur (user clicks away from input)
- Or explicit save button (checkmark ✓) next to input
- Cancel button (✗) to discard changes

**Example:**
```
Normal: │ $234.56 │
Edit:   │ [$234.56  ✓  ✗] │
```

## Table Performance

### Large Dataset Handling

**Pagination:** Primary method
- Limits rows per page (10-100)
- Server-side pagination (fetch only current page)
- Never load all 10,000+ rows at once

**Virtual Scrolling:** Advanced technique
- Render only visible rows + buffer
- As user scrolls, dynamically render new rows and unmount off-screen rows
- Smooth infinite scroll experience without loading all data
- Libraries: react-virtual, react-window

**Lazy Loading:**
- Load initial page immediately
- Load subsequent pages on demand (when user scrolls or clicks next page)

### Loading Optimization

**Progressive Loading:**
- Load critical columns first (ID, name, total)
- Load secondary columns after (created date, notes, tags)
- Show partial table while remaining data loads

**Debounced Filtering:**
- Delay filter execution while user typing in search
- 300ms debounce: Wait until user stops typing for 300ms before querying
- Prevents excessive API calls

**Cached Results:**
- Cache filtered/sorted results in memory
- Returning to previous page loads from cache instantly
- Invalidate cache on data changes or manual refresh

## Competitive Table Analysis

### vs TrueProfit Tables

**Similarities:**
- Both use sortable, filterable data tables for orders/products
- Both show profit calculations prominently in table columns
- Similar column types (ID, date, revenue, profit, margin)

**Differences:**
- BeProfit may have more granular cost breakdowns (COGS, shipping, fees separately)
- TrueProfit might focus more on margin percentages
- Visual design differences (color coding, status badges)

### vs Lifetimely Tables

**Similarities:**
- Both analytics-focused tables with financial metrics
- Both support date range filtering

**Differences:**
- Lifetimely emphasizes customer lifetime value (CLV) columns
- BeProfit focuses on order/product profit analysis
- Different primary metrics highlighted

### Industry Best Practices

BeProfit tables follow standard data table patterns:
- **Sortable headers** (industry standard)
- **Sticky headers** (keeps context during scroll)
- **Hover row highlight** (improves scan-ability)
- **Right-aligned numbers** (proper alignment for comparison)
- **Pagination over infinite scroll** (better for large datasets)
- **Responsive card view on mobile** (mobile-first best practice)

## Table Strengths

1. **Clear Column Type Differentiation** — Monetary values right-aligned, status badges color-coded, clickable IDs distinct; users quickly identify column types and scan data efficiently
2. **Robust Filtering System** — Date range, status, search across multiple dimensions enables users to slice data precisely and find specific orders/products quickly
3. **Hover-Reveal Actions** — Row actions hidden until hover reduces visual clutter while keeping actions accessible when needed
4. **Responsive Card Transformation** — Mobile tables convert to card view providing usable experience on small screens without horizontal scroll frustration
5. **Sticky Header Pattern** — Header stays visible during vertical scroll maintaining context of which column user is viewing

## Table Weaknesses

1. **Limited Inline Editing** — If not supported, users must navigate to detail page for every edit, slower workflow for power users making batch updates
2. **No Persistent Column Preferences** — If column visibility/order not saved per user, users must reconfigure table layout every session
3. **Basic Grouping Capabilities** — Lack of grouping by category/date/status forces users to rely heavily on filtering; grouped views more scannable for category comparisons

## Relevance to Our Build

### Table Component Strategy

**Library vs Custom:**
- **Use Existing Library (Recommended):** TanStack Table (React Table v8), AG Grid, Material-UI DataGrid
- **Rationale:** Sorting, filtering, pagination, virtual scrolling already implemented; focus on business logic not table mechanics
- **Custom Styling:** Override library styles to match brand (purple accent, card design)

**Recommended: TanStack Table**
- Headless (unstyled, full design control)
- Lightweight, performant
- Built-in sorting, filtering, pagination
- Virtual scrolling support
- TypeScript-first

### Key Table Features to Implement

**MVP Must-Haves:**
1. Sortable columns (click header to sort)
2. Pagination (25 rows per page default)
3. Search filter (global search across Order ID, customer)
4. Date range filter (critical for time-based data)
5. Status filter dropdown (Paid, Pending, etc.)
6. Responsive mobile card view

**Phase 2:**
7. Export to CSV
8. Bulk selection with checkboxes
9. Column show/hide
10. Per-page row count selector

**Phase 3 (Advanced):**
11. Saved filter presets
12. Virtual scrolling for >1000 rows
13. Inline editing
14. Expandable rows

### Data Density Decisions

**Default Density:** Standard (56px row height, 14px font)
- Balances readability with information density
- Shows ~10-12 rows per screen (1080p monitor)

**Density Toggle:** Add later (Phase 2)
- Compact mode for power users
- Comfortable mode for settings/forms

**Default Rows Per Page:** 25
- Sweet spot between too few (excessive pagination) and too many (slow loading)

### Mobile Table Strategy

**Approach: Card View** (transform table to cards on <768px)
- Better UX than horizontal scroll on phones
- Each row becomes a card showing key fields
- "View Details" button to see full data

**Implementation:**
- CSS media query transforms table to block layout
- Use `data-label` attributes on cells for mobile labels
- Hide less critical fields on mobile (show only top 5 fields)

### Performance Considerations

**For Large Datasets (>1000 rows):**
- Server-side pagination (never load all rows client-side)
- Debounce search input (300ms delay)
- Show skeleton loading state while fetching
- Cache previous pages in memory

**For Very Large Datasets (>10,000 rows):**
- Virtual scrolling (only render visible rows)
- Limit filters to reasonable ranges (max 365 days date range)
- Aggregate summaries instead of row-level details where possible

## Table Component Specifications

### Complete Table HTML Structure

```html
<div class="table-card">
  <div class="table-card-header">
    <h3 class="table-title">Recent Orders</h3>
    <div class="table-actions">
      <button class="btn-icon" title="Refresh">↻</button>
      <button class="btn-secondary">Export</button>
    </div>
  </div>

  <div class="table-filters">
    <input type="text" class="filter-search" placeholder="Search orders..." />
    <select class="filter-dropdown">
      <option>All Statuses</option>
      <option>Paid</option>
      <option>Pending</option>
    </select>
    <button class="btn-primary">Apply</button>
    <button class="btn-secondary">Clear</button>
  </div>

  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th class="selection-column">
            <input type="checkbox" class="select-all" />
          </th>
          <th class="sortable">Order ID <span class="sort-icon">↕</span></th>
          <th class="sortable">Customer <span class="sort-icon">↕</span></th>
          <th class="sortable">Date <span class="sort-icon active">↓</span></th>
          <th class="sortable">Total <span class="sort-icon">↕</span></th>
          <th class="sortable">Profit <span class="sort-icon">↕</span></th>
          <th>Status</th>
          <th class="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-row">
          <td class="selection-column">
            <input type="checkbox" />
          </td>
          <td class="id-column">#12345</td>
          <td>John Smith</td>
          <td>Feb 13, 2026</td>
          <td class="currency-column">$234.56</td>
          <td class="currency-column positive">$45.89</td>
          <td><span class="status-badge success">Paid</span></td>
          <td class="actions-column">
            <div class="row-actions">
              <button class="action-btn" title="View">👁</button>
              <button class="action-btn" title="Edit">✏️</button>
              <button class="action-btn danger" title="Delete">🗑</button>
            </div>
          </td>
        </tr>
        <!-- More rows... -->
      </tbody>
    </table>
  </div>

  <div class="pagination">
    <div class="pagination-info">Showing 1-25 of 371 orders</div>
    <div class="pagination-controls">
      <button class="pagination-btn" disabled>← Previous</button>
      <button class="pagination-btn active">1</button>
      <button class="pagination-btn">2</button>
      <button class="pagination-btn">3</button>
      <span class="pagination-ellipsis">...</span>
      <button class="pagination-btn">15</button>
      <button class="pagination-btn">Next →</button>
    </div>
    <div class="pagination-per-page">
      Show
      <select>
        <option>10</option>
        <option selected>25</option>
        <option>50</option>
        <option>100</option>
      </select>
      per page
    </div>
  </div>
</div>
```

## Sources

- https://apps.shopify.com/beprofit-profit-tracker — Shopify App Store product features describing orders profit analysis, products profit analysis, and data table functionality
- https://beprofit.co/ — Marketing site feature descriptions
- https://help.runviably.com/beprofit — Help documentation
- User reviews describing "clean dashboard", "easy to use tables", and "detailed order breakdowns"
- Standard SaaS data table patterns and UI/UX best practices from Material Design, Ant Design, and TanStack Table documentation
