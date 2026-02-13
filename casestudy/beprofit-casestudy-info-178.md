# BeProfit Case Study Info 178: Forms & Input Patterns

## Metadata
- **File ID:** 178
- **Category:** Design System, Forms, Input Components
- **Date Captured:** 2026-02-13
- **Source Type:** Product analysis from public information and form UI/UX best practices
- **Primary URLs:**
  - https://help.runviably.com/beprofit (settings documentation)
  - https://beprofit.co/ (signup/trial flows)
  - https://apps.shopify.com/beprofit-profit-tracker (app installation flow)

## Executive Summary

BeProfit implements a comprehensive form and input system optimized for both data entry workflows (expense tracking, product configuration, settings management) and analytical filtering (dashboard filters, report parameters, date range selection). The form architecture balances functional density with usability through clearly labeled inputs, inline validation feedback, and contextual help text that guides users without overwhelming them. Input components follow modern SaaS patterns: 44px height for comfortable touch targets, rounded corners (6-8px radius) for friendly aesthetics, focus states with purple accent rings matching brand identity, and error states with red borders plus descriptive messaging. Filter components receive special design attention as they're high-frequency touchpoints—date range pickers with preset shortcuts (Last 7/30/90 days), multi-select dropdowns with checkbox lists, and search inputs with debounced API calls optimize for rapid dashboard exploration. Form layouts adapt intelligently: vertical stacking (label above input) for settings pages prioritizes scannability, horizontal arrangements for compact filter bars maximize screen real estate, and multi-step wizards for onboarding reduce cognitive load through progressive disclosure. The system demonstrates professional attention to accessibility (ARIA labels, keyboard navigation, visible focus indicators) and mobile optimization (16px font size prevents zoom, full-width inputs on small screens, native input types trigger appropriate mobile keyboards).

## Form Layout Patterns

### 1. Vertical Form Layout (Stacked)

**Usage:** Settings pages, profile forms, detailed configuration forms

**Pattern:** Label positioned above input field (most common, most scannable)

**Characteristics:**
- **Label Position:** Above input field (8-12px margin below label)
- **Label Alignment:** Left-aligned (follows natural reading flow)
- **Field Width:** Full-width within container (max-width: 500-600px to prevent overly long inputs)
- **Spacing:** 24-32px vertical spacing between form groups (comfortable rhythm)

**Advantages:**
- Easy to scan vertically
- Works well on mobile (no horizontal space constraints)
- Clear label-input association

**Example:**
```
┌─────────────────────────────────────┐
│ Store Name                          │ ← Label
│ ┌─────────────────────────────────┐ │
│ │ My Shopify Store                │ │ ← Input
│ └─────────────────────────────────┘ │
│                                     │
│ Store URL                           │ ← Label
│ ┌─────────────────────────────────┐ │
│ │ mystore.myshopify.com           │ │ ← Input
│ └─────────────────────────────────┘ │
│ Your store's Shopify URL            │ ← Help text
│                                     │
│ Currency                            │ ← Label
│ ┌─────────────────────────────────┐ │
│ │ USD ($)                      ▼  │ │ ← Dropdown
│ └─────────────────────────────────┘ │
│                                     │
│              [Save Settings]        │ ← Submit button
└─────────────────────────────────────┘
```

**CSS Implementation:**
```css
.form-vertical {
  max-width: 600px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
}
```

### 2. Horizontal Form Layout (Inline)

**Usage:** Filter forms, compact settings, quick actions

**Pattern:** Label and input on same row (space-efficient)

**Characteristics:**
- **Label Position:** Left of input (same row)
- **Label Width:** Fixed width (100-150px) for consistent alignment
- **Label Alignment:** Right-aligned (aligns with input) or left-aligned
- **Field Width:** Flexible, fills remaining space

**Advantages:**
- Space-efficient (good for multiple short inputs)
- Quick scanning (entire form row visible at once)

**Disadvantages:**
- Less mobile-friendly (requires more horizontal space)
- Harder to read if labels are long

**Example:**
```
┌────────────────────────────────────────────┐
│  Date Range:  [Last 30 Days           ▼]  │
│  Status:      [All Statuses           ▼]  │
│  Country:     [All Countries          ▼]  │
│               [Apply Filters] [Reset]     │
└────────────────────────────────────────────┘
```

**CSS Implementation:**
```css
.form-horizontal .form-group {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.form-horizontal .form-label {
  width: 120px;
  flex-shrink: 0;
  text-align: right;
  margin-bottom: 0;
}

.form-horizontal .form-input {
  flex: 1;
}
```

### 3. Grid Form Layout

**Usage:** Multi-column forms (address forms, billing details)

**Pattern:** 2-3 column grid with related fields grouped

**Characteristics:**
- **Columns:** 2-column grid typical, 3-column on wide screens
- **Responsive:** Collapses to single column on mobile (<768px)
- **Field Grouping:** Related fields share row (First Name + Last Name)

**Example:**
```
┌─────────────────────────────────────────────┐
│ First Name              Last Name           │
│ ┌─────────────────┐     ┌─────────────────┐ │
│ │ John            │     │ Smith           │ │
│ └─────────────────┘     └─────────────────┘ │
│                                             │
│ Email                   Phone               │
│ ┌───────────────────────┐ ┌───────────────┐ │
│ │ john@email.com        │ │ 555-1234      │ │
│ └───────────────────────┘ └───────────────┘ │
│                                             │
│ Address                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ 123 Main St                             │ │ ← Full width
│ └─────────────────────────────────────────┘ │
│                                             │
│ City                    State     Zip      │
│ ┌───────────────┐  ┌────────┐  ┌────────┐ │
│ │ Boston        │  │ MA  ▼ │  │ 02101  │ │
│ └───────────────┘  └────────┘  └────────┘ │
└─────────────────────────────────────────────┘
```

**CSS Implementation:**
```css
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-grid .form-group-full {
  grid-column: span 2; /* Full width for address field */
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr; /* Single column on mobile */
  }

  .form-grid .form-group-full {
    grid-column: span 1;
  }
}
```

### 4. Multi-Step Form (Wizard)

**Usage:** Onboarding flows, complex setup processes (e.g., connecting Shopify store to BeProfit)

**Pattern:** Break long form into logical steps with progress indicator

**Characteristics:**
- **Progress Indicator:** Step numbers (1 of 4) or progress bar (25% complete)
- **Navigation:** Next/Previous buttons, ability to jump to completed steps
- **Validation:** Per-step validation before allowing progression
- **Summary:** Final review step before submission

**Steps in BeProfit Onboarding (Hypothetical):**
1. **Connect Store** — Authorize Shopify connection
2. **Configure Costs** — Set default shipping, transaction fees
3. **Import Products** — Choose which products to track
4. **Review & Launch** — Confirm settings and start tracking

**Example Step 1:**
```
Step 1 of 4: Connect Your Store
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[●━━━○━━○━━○]  25% Complete

Which platform do you use?

◉ Shopify
○ WooCommerce
○ BigCommerce
○ Amazon

Store URL
┌────────────────────────────────┐
│ mystore.myshopify.com          │
└────────────────────────────────┘

          [← Back]  [Next: Configure Costs →]
```

**Progress Bar Styling:**
```css
.wizard-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}

.wizard-step {
  flex: 1;
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.wizard-step.completed,
.wizard-step.active {
  background: #6514DD; /* Brand purple */
}

.wizard-step.active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

## Input Field Components

### 1. Text Input

**Usage:** Single-line text entry (names, emails, URLs, numbers)

**Visual Design:**

**Dimensions:**
- **Height:** 44px (comfortable for touch and desktop)
- **Width:** 100% of container (responsive)
- **Padding:** 12px horizontal, 10px vertical

**Border:**
- **Default:** 1px solid #D1D5DB (light gray)
- **Radius:** 6px (rounded corners for modern look)

**Typography:**
- **Font Size:** 16px (prevents zoom on iOS, ensures readability)
- **Font Color:** #111827 (dark gray/black for high contrast)
- **Placeholder Color:** #9CA3AF (light gray, clearly distinguished from entered text)

**States:**

**Default (Unfocused):**
- Border: #D1D5DB (light gray)
- Background: #FFFFFF (white)

**Focus:**
- Border: #6514DD (brand purple)
- Shadow: 0 0 0 3px rgba(101, 20, 221, 0.1) (purple glow)
- Outline: none (custom focus ring replaces browser default)

**Error:**
- Border: #EF4444 (red)
- Shadow: none or subtle red glow
- Error message below input (red text)

**Success (Optional):**
- Border: #10B981 (green)
- Checkmark icon on right side of input

**Disabled:**
- Background: #F3F4F6 (light gray)
- Text Color: #9CA3AF (muted gray)
- Cursor: not-allowed
- Opacity: 0.6

**CSS Specification:**
```css
.input-field {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  font-size: 16px;
  color: #111827;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-field::placeholder {
  color: #9CA3AF;
}

.input-field:focus {
  outline: none;
  border-color: #6514DD;
  box-shadow: 0 0 0 3px rgba(101, 20, 221, 0.1);
}

.input-field.error {
  border-color: #EF4444;
}

.input-field.success {
  border-color: #10B981;
}

.input-field:disabled {
  background: #F3F4F6;
  color: #9CA3AF;
  cursor: not-allowed;
  opacity: 0.6;
}
```

### 2. Textarea

**Usage:** Multi-line text input (descriptions, notes, custom instructions)

**Characteristics:**
- **Min Height:** 120px (typically 4-5 lines visible)
- **Resizable:** Vertical resize allowed (user can drag to increase height)
- **Scrollbar:** Appears when content exceeds height
- **Padding:** 12px all sides (comfortable for longer text)

**Example:**
```
Additional Notes
┌────────────────────────────────────┐
│ Add any additional context or     │
│ special instructions here...       │
│                                    │
│                                    │
│                                    │ ← Resizable (drag handle at bottom-right)
└────────────────────────────────────┘
```

**CSS:**
```css
.textarea-field {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical; /* Allow vertical resize only */
  font-family: inherit; /* Match page font */
}
```

### 3. Dropdown Select

**Usage:** Single-selection from predefined list (status, category, country)

**Visual Design:**
- **Appearance:** Custom-styled dropdown (not native browser select)
- **Chevron Icon:** ▼ (down arrow) on right side
- **Placeholder:** "Select an option..." or specific prompt

**Dropdown Menu:**
- **Max Height:** 300px (scrollable if > 10 options)
- **Option Hover:** Light gray background (#F9FAFB)
- **Selected Option:** Checkmark (✓) or purple background
- **Search:** For long lists (>20 options), include search input at top

**Example:**
```
Status
┌────────────────────────────┐
│ Select status          ▼  │
└────────────────────────────┘
  ↓ (on click)
┌────────────────────────────┐
│ ✓ All Statuses             │ ← Currently selected
│   Paid                     │
│   Pending                  │
│   Refunded                 │
│   Cancelled                │
└────────────────────────────┘
```

**CSS:**
```css
.select-field {
  position: relative;
  width: 100%;
}

.select-button {
  width: 100%;
  height: 44px;
  padding: 0 36px 0 12px; /* Space for chevron */
  text-align: left;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.select-button:hover,
.select-button.open {
  border-color: #6514DD;
}

.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
  pointer-events: none;
  transition: transform 0.2s;
}

.select-button.open .select-chevron {
  transform: translateY(-50%) rotate(180deg); /* Flip chevron when open */
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.select-option {
  padding: 10px 12px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s;
}

.select-option:hover {
  background: #F9FAFB;
}

.select-option.selected {
  background: #EDE9FE; /* Light purple */
  color: #6514DD;
  font-weight: 500;
}
```

### 4. Multi-Select Dropdown

**Usage:** Select multiple options (categories, tags, channels)

**Characteristics:**
- **Selected Items:** Shown as chips/tags inside input field
- **Remove:** X button on each chip to deselect
- **Dropdown:** Checkboxes for each option (not radio buttons)

**Example:**
```
Categories
┌────────────────────────────────────────┐
│ [Electronics ×] [Apparel ×] [Home ×] ▼│
└────────────────────────────────────────┘
  ↓ (on click)
┌────────────────────────────────────────┐
│ ☑ Electronics                          │
│ ☑ Apparel                              │
│ ☑ Home Goods                           │
│ ☐ Beauty                               │
│ ☐ Toys                                 │
└────────────────────────────────────────┘
```

**Selected Chip Styling:**
```css
.selected-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #EDE9FE; /* Light purple */
  color: #6514DD;
  border-radius: 12px; /* Pill shape */
  font-size: 14px;
  font-weight: 500;
}

.selected-chip-remove {
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: #6514DD;
  transition: color 0.15s;
}

.selected-chip-remove:hover {
  color: #4C1D95; /* Darker purple */
}
```

### 5. Search/Autocomplete Input

**Usage:** Search with suggestions (order search, product lookup, customer finder)

**Characteristics:**
- **Search Icon:** 🔍 magnifying glass inside field (left side)
- **Clear Button:** X button on right (appears when text entered)
- **Suggestions Dropdown:** Appears as user types (debounced 300ms)
- **Highlight:** Matching text highlighted in suggestions
- **Keyboard Nav:** Arrow keys to navigate, Enter to select

**Example:**
```
Search Products
┌────────────────────────────────────┐
│ 🔍 iphone                       ×  │
└────────────────────────────────────┘
  ↓ (typing)
┌────────────────────────────────────┐
│ iPhone 14 Pro - Purple             │ ← "iPhone" highlighted
│ iPhone 14 - Black                  │
│ iPhone Case - Leather              │
│ iPhone 13 - White                  │
└────────────────────────────────────┘
```

**CSS:**
```css
.search-field {
  position: relative;
}

.search-input {
  padding-left: 40px; /* Space for search icon */
  padding-right: 40px; /* Space for clear button */
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9CA3AF;
  cursor: pointer;
  display: none; /* Hidden when input empty */
}

.search-input:not(:placeholder-shown) + .search-clear {
  display: block;
}

.search-suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.search-suggestion {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.15s;
}

.search-suggestion:hover,
.search-suggestion.focused {
  background: #F9FAFB;
}

.search-highlight {
  background: #FEF3C7; /* Yellow highlight */
  font-weight: 600;
}
```

### 6. Date Picker

**Usage:** Select single date (order date, due date, start date)

**Visual Design:**
- **Input Field:** Shows selected date ("Feb 13, 2026") with calendar icon (📅) on right
- **Popup Calendar:** Opens below input on click
- **Calendar Navigation:** Month/year dropdowns or arrows (← February 2026 →)

**Calendar Popup:**
```
┌──────────────────────┐
│ ← February 2026  →   │ ← Month/year navigation
│ Su Mo Tu We Th Fr Sa │ ← Day headers
│          1  2  3  4  │
│  5  6  7  8  9 10 11 │
│ 12 [13]14 15 16 17 18│ ← Selected day (13)
│ 19 20 21 22 23 24 25 │
│ 26 27 28             │
│                      │
│ [Today]    [Clear]   │ ← Quick actions
└──────────────────────┘
```

**Selected Day Styling:**
```css
.calendar-day {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Circular */
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s;
}

.calendar-day:hover {
  background: #F3F4F6;
}

.calendar-day.selected {
  background: #6514DD; /* Brand purple */
  color: #FFFFFF;
  font-weight: 600;
}

.calendar-day.today {
  border: 2px solid #6514DD;
  font-weight: 600;
}

.calendar-day.disabled {
  color: #D1D5DB;
  cursor: not-allowed;
}
```

### 7. Date Range Picker

**Usage:** Select date range (report periods, filter ranges)

**Characteristics:**
- **Single Input:** Shows "Feb 1 - Feb 13, 2026"
- **Dual Calendars:** Two side-by-side months for easy range selection
- **Presets:** Quick select buttons (Last 7 days, Last 30 days, etc.)
- **Range Highlight:** Days between start and end shaded

**Preset Buttons:**
```
┌──────────────────────────────────────┐
│ [Last 7 Days] [Last 30 Days]         │
│ [Last 90 Days] [This Month]          │
│ [Last Month] [Custom]                │
├──────────────────────────────────────┤
│  Jan 2026        Feb 2026            │
│ Su Mo ... Sa    Su Mo ... Sa         │
│  ...            ...                  │
│ [5] 6 7 8       1 [2] 3 4 5          │ ← Range: Jan 5 - Feb 2
│ ███████████████████████████          │ ← Shaded range
└──────────────────────────────────────┘
```

### 8. Number Input

**Usage:** Numeric data (prices, quantities, percentages)

**Characteristics:**
- **Input Type:** `<input type="number">` (triggers numeric keyboard on mobile)
- **Spinner Buttons:** ▲▼ arrows on right (optional, often hidden for cleaner look)
- **Min/Max:** Validation for acceptable range
- **Step:** Increment value (e.g., step="0.01" for currency)

**Example:**
```
Product Price
┌──────────────────────┐
│ $ 99.99         ▲▼  │
└──────────────────────┘
```

**CSS:**
```css
.number-input {
  /* Hide default spinner arrows (optional) */
  -moz-appearance: textfield; /* Firefox */
}

.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none; /* Chrome, Safari */
  margin: 0;
}

/* Custom spinner buttons (if desired) */
.number-spinner {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

.number-spinner-btn {
  width: 20px;
  height: 18px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.number-spinner-btn:hover {
  background: #E5E7EB;
}
```

### 9. Checkbox

**Usage:** Binary options (enable/disable features, terms acceptance)

**Visual Design:**
- **Size:** 20px × 20px square
- **Border:** 2px solid #D1D5DB, rounded corners (4px)
- **Checked State:** Purple background (#6514DD) with white checkmark (✓)

**States:**
- **Unchecked:** Empty square with gray border
- **Checked:** Purple background, white checkmark
- **Indeterminate:** Dash (−) for "select all" scenarios (some children selected)
- **Disabled:** Grayed out, no interaction

**Example:**
```
Notification Preferences
☑ Email notifications
☐ SMS notifications
☑ Push notifications
☐ Weekly digest emails
```

**CSS:**
```css
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  border-radius: 4px;
  background: #FFFFFF;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.checkbox:hover {
  border-color: #6514DD;
}

.checkbox.checked {
  background: #6514DD;
  border-color: #6514DD;
}

.checkbox.checked::after {
  content: '✓';
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 700;
}

.checkbox:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

### 10. Radio Button

**Usage:** Single selection from options (payment method, shipping speed)

**Visual Design:**
- **Size:** 20px diameter circle
- **Border:** 2px solid #D1D5DB
- **Selected State:** Purple outer ring with filled inner circle

**Example:**
```
Payment Method
◉ Credit Card          ← Selected
○ PayPal
○ Bank Transfer
```

**CSS:**
```css
.radio {
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  border-radius: 50%; /* Perfect circle */
  background: #FFFFFF;
  cursor: pointer;
  transition: border-color 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.radio:hover {
  border-color: #6514DD;
}

.radio.selected {
  border-color: #6514DD;
}

.radio.selected::after {
  content: '';
  width: 10px;
  height: 10px;
  background: #6514DD;
  border-radius: 50%;
}
```

### 11. Toggle/Switch

**Usage:** Binary on/off settings (enable auto-sync, activate feature)

**Visual Design:**
- **Width:** 44px
- **Height:** 24px
- **Track:** Rounded pill shape (border-radius: 12px)
- **Thumb:** 20px circle that slides
- **Color:** Gray when off (#D1D5DB), purple when on (#6514DD)

**States:**
- **Off:** Gray track, thumb on left
- **On:** Purple track, thumb on right

**Example:**
```
Settings
Enable notifications     [○━━━]  Off
Auto-sync data           [━━━○]  On
Weekly reports           [○━━━]  Off
```

**CSS:**
```css
.toggle {
  width: 44px;
  height: 24px;
  background: #D1D5DB; /* Gray when off */
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle.on {
  background: #6514DD; /* Purple when on */
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle.on .toggle-thumb {
  left: 22px; /* Moved to right */
}
```

### 12. Slider/Range Input

**Usage:** Select value from range (price range, quantity, budget)

**Visual Design:**
- **Track:** Horizontal line (full width)
- **Fill:** Colored section showing selected range (purple)
- **Thumb:** Circle handle to drag (16px diameter)
- **Min/Max Labels:** Show range limits below track

**Example:**
```
Budget Range
$0                                      $10,000
├───●━━━━━━━━━━━━━●────────────────────┤
    $2,000         $7,500
```

**CSS:**
```css
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #E5E7EB;
  border-radius: 3px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #6514DD;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #6514DD;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Fill portion (requires JS or CSS gradient trick) */
.slider::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    #6514DD 0%,
    #6514DD 40%, /* Fill up to thumb position */
    #E5E7EB 40%,
    #E5E7EB 100%
  );
}
```

### 13. File Upload

**Usage:** Upload images, documents, CSV files (product images, expense receipts)

**Patterns:**

**Button + Label:**
```
┌─────────────────────────────┐
│  [Choose File]              │
│  No file chosen             │
└─────────────────────────────┘
```

**Drag-and-Drop Zone:**
```
┌─────────────────────────────┐
│  ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊  │ ← Dashed border
│                             │
│  📤 Drag & drop file here   │
│       or                    │
│  [Choose File]              │
│                             │
│  ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊ ┊  │
└─────────────────────────────┘
```

**After Upload:**
```
┌─────────────────────────────┐
│ ✓ receipt.pdf  (2.3 MB)  [×]│ ← File name, size, remove button
└─────────────────────────────┘
```

**CSS:**
```css
.file-upload-zone {
  border: 2px dashed #D1D5DB;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  background: #F9FAFB;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.file-upload-zone:hover {
  border-color: #6514DD;
  background: #FFFFFF;
}

.file-upload-zone.dragging {
  border-color: #6514DD;
  background: #EDE9FE; /* Light purple */
}

.uploaded-file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F3F4F6;
  border-radius: 6px;
  margin-top: 12px;
}

.uploaded-file-remove {
  margin-left: auto;
  cursor: pointer;
  color: #EF4444; /* Red */
}
```

## Form Labels & Help Text

### Label Design

**Typography:**
- **Font Size:** 14px
- **Font Weight:** 500 or 600 (semi-bold)
- **Color:** #374151 (dark gray, not pure black)
- **Text Transform:** None (sentence case, not uppercase)

**Required Indicator:**
- **Red Asterisk:** * (red color #EF4444)
- **Position:** After label text

**Spacing:**
- **Below Label:** 8px margin to input

**Example:**
```
Email Address *
┌────────────────────────────┐
│ user@example.com           │
└────────────────────────────┘
```

**CSS:**
```css
.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-label.required::after {
  content: ' *';
  color: #EF4444; /* Red */
}
```

### Help Text / Description

**Purpose:** Provide additional context or instructions

**Position:** Below input field

**Typography:**
- **Font Size:** 13px or 14px
- **Color:** #6B7280 (muted gray)
- **Icon:** ⓘ info icon sometimes (optional)

**Example:**
```
Password
┌────────────────────────────┐
│ ••••••••                   │
└────────────────────────────┘
Must be at least 8 characters and include a number
```

**CSS:**
```css
.form-help {
  display: block;
  font-size: 13px;
  color: #6B7280;
  margin-top: 6px;
  line-height: 1.5;
}

.form-help-icon {
  display: inline-block;
  margin-right: 4px;
  color: #9CA3AF;
}
```

### Placeholder Text

**Purpose:** Example input or hint

**Color:** #9CA3AF (light gray, clearly distinguished from real input)

**Style:** Sometimes italic (font-style: italic)

**Example Text:** "Enter your email address...", "Search products..."

**Important:** Placeholders disappear when user starts typing, so critical info should be in label or help text, not placeholder

## Validation Patterns

### Inline Validation

**Timing Options:**

**On Blur (Most Common):**
- Validate when user leaves field (loses focus)
- Doesn't interrupt typing
- Shows error after user finishes entering value

**On Type (Real-Time):**
- Validate as user types
- Use for password strength, username availability
- Can be distracting if overused

**On Submit:**
- Validate all fields when form submitted
- Show all errors at once
- Good for simple forms with few fields

### Validation Messages

**Success State:**
- **Border:** Green (#10B981)
- **Icon:** ✓ checkmark (right side of input)
- **Message:** Green text below input
- **Example:** "Email is available"

**Error State:**
- **Border:** Red (#EF4444)
- **Icon:** ✗ X mark or ⚠ warning icon (right side of input)
- **Message:** Red text below input
- **Example:** "Email is required" or "Invalid email format"

**Error Message Examples:**
```
Email Address *
┌────────────────────────────┐
│ invalid-email         ✗    │ ← Red border
└────────────────────────────┘
✗ Please enter a valid email address
```

**Success Message Example:**
```
Username *
┌────────────────────────────┐
│ john_smith_2026       ✓    │ ← Green border
└────────────────────────────┘
✓ Username is available
```

### Error Message Design

**CSS:**
```css
.error-message {
  color: #EF4444; /* Red */
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.error-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.success-message {
  color: #10B981; /* Green */
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-field.error {
  border-color: #EF4444;
  background: #FEF2F2; /* Very light red tint */
}

.input-field.success {
  border-color: #10B981;
}

/* Icon in input field */
.input-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.input-icon.error {
  color: #EF4444;
}

.input-icon.success {
  color: #10B981;
}
```

## Form Buttons

### Primary Button (Submit)

**Purpose:** Main action (Save, Submit, Continue, Create)

**Style:**
- **Background:** Solid brand purple (#6514DD)
- **Text Color:** White (#FFFFFF)
- **Height:** 44px
- **Padding:** 12px 24px (horizontal)
- **Border Radius:** 6px
- **Font Weight:** 600 (semi-bold)
- **Font Size:** 16px

**States:**
- **Default:** Purple background
- **Hover:** Darker purple (#4F0FB8)
- **Active/Pressed:** Even darker (#3D0C8C)
- **Disabled:** Opacity 0.5, cursor not-allowed
- **Loading:** Spinner icon, text "Saving..." or hidden

**CSS:**
```css
.btn-primary {
  height: 44px;
  padding: 0 24px;
  background: #6514DD;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #4F0FB8;
}

.btn-primary:active {
  background: #3D0C8C;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary.loading {
  position: relative;
  color: transparent; /* Hide text */
}

.btn-primary.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
```

### Secondary Button (Cancel, Back)

**Purpose:** Secondary action (Cancel, Back, Reset, Clear)

**Style:**
- **Background:** Light gray (#F3F4F6) or transparent with border
- **Text Color:** Dark gray (#374151)
- **Border:** 1px solid #D1D5DB (if outlined variant)

**CSS:**
```css
.btn-secondary {
  height: 44px;
  padding: 0 24px;
  background: #F3F4F6;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-secondary:hover {
  background: #E5E7EB;
}

/* Outlined variant */
.btn-secondary-outlined {
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
}

.btn-secondary-outlined:hover {
  border-color: #9CA3AF;
  background: #F9FAFB;
}
```

### Button Group

**Pattern:** Multiple buttons side by side

**Layout:**
- **Alignment:** Right-aligned typically (primary on right, secondary on left)
- **Spacing:** 12px gap between buttons
- **Order:** Cancel/Back (left), Submit/Save (right)

**Example:**
```
[Cancel]  [Save Settings]
 (gray)    (purple)
```

**CSS:**
```css
.button-group {
  display: flex;
  gap: 12px;
  justify-content: flex-end; /* Right-align */
  margin-top: 24px;
}
```

## Filter Forms

### Dashboard Filter Panel

**Usage:** Filter dashboard data by date range, status, category, etc.

**Layout:**
- **Position:** Top of page, below page title
- **Orientation:** Horizontal row of filters
- **Apply Button:** Explicit "Apply Filters" button or auto-apply on change

**Example Filter Bar:**
```
┌─────────────────────────────────────────────────────┐
│ Filters:                                            │
│ [Last 30 Days ▼] [All Stores ▼] [All Status ▼]    │
│ [Apply Filters] [Reset]                             │
└─────────────────────────────────────────────────────┘
```

**Compact Inline Filters:**
```
Date: [Last 30 Days ▼]  Store: [All ▼]  [Apply] [Reset]
```

### Filter Chips/Tags

**Purpose:** Show active filters as removable chips

**Display:** Below filter bar, shows which filters are currently applied

**Example:**
```
Active Filters:
[Date: Feb 1-13 ×] [Status: Paid ×] [Store: Main Store ×]
   ↑ Click × to remove individual filter
```

**CSS:**
```css
.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #EDE9FE; /* Light purple */
  color: #5B21B6; /* Dark purple */
  border-radius: 16px; /* Pill shape */
  font-size: 13px;
  font-weight: 500;
}

.filter-chip-remove {
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: #5B21B6;
  transition: color 0.15s;
}

.filter-chip-remove:hover {
  color: #4C1D95; /* Darker */
}
```

## Form Accessibility

### Accessible Form Patterns

**Label Association:**
```html
<label for="email">Email Address</label>
<input id="email" type="email" name="email" />
```
- Label connected to input via `for` attribute and input `id`
- Screen readers announce label when input focused

**ARIA Labels:**
```html
<input
  type="text"
  aria-label="Search orders"
  placeholder="Search..."
/>
```
- For inputs without visible labels
- `aria-describedby` links input to help text

**Required Fields:**
```html
<input
  type="email"
  required
  aria-required="true"
/>
```
- Both HTML `required` and `aria-required` for compatibility

**Error Announcements:**
```html
<div role="alert" aria-live="assertive">
  Email is required
</div>
```
- `aria-live` regions announce errors to screen readers
- `assertive` interrupts user for critical errors

**Keyboard Navigation:**
- Tab order: Logical flow through form fields
- Enter to submit form (on any input)
- Space to toggle checkbox/radio
- Arrows to navigate radio groups

**Focus Indicators:**
- Visible focus ring on focused input (purple outline)
- Never use `outline: none` without custom focus style

### Focus Management

**Focus Ring:**
```css
.input-field:focus {
  outline: none;
  border-color: #6514DD;
  box-shadow: 0 0 0 3px rgba(101, 20, 221, 0.1); /* Purple glow */
}
```

**Keyboard-Only Focus:**
```css
/* Show outline only for keyboard navigation */
.input-field:focus-visible {
  outline: 2px solid #6514DD;
  outline-offset: 2px;
}

/* Hide for mouse clicks */
.input-field:focus:not(:focus-visible) {
  outline: none;
}
```

## Form UX Best Practices Observed

### Good Patterns

1. **Clear Labels** — Every input has descriptive label, not just placeholder
2. **Inline Validation** — Errors shown immediately after field blur, users catch mistakes early
3. **Helpful Error Messages** — Specific messages ("Email is required") not vague ("Invalid input")
4. **Autofocus First Field** — Cursor automatically placed in first input, users can start typing immediately
5. **Disabled Submit Until Valid** — Primary button disabled until form valid, prevents wasted submission attempts
6. **Loading State Feedback** — Button shows spinner during API call, users know action is processing
7. **Success Confirmation** — After save, show success message or toast notification, confirms action completed
8. **Smart Defaults** — Pre-fill known values (e.g., user's country based on IP), reduces data entry

### Areas for Improvement

1. **No Password Strength Indicator** — If password field lacks strength meter, users don't know if password is secure enough
2. **Unclear Error Recovery** — If error messages don't explain how to fix, users stuck
3. **No Autosave** — Long forms without autosave risk data loss if user navigates away
4. **Limited Mobile Optimization** — If input types don't match (e.g., `type="text"` for numbers), mobile keyboard suboptimal

## Competitive Form Analysis

### vs TrueProfit Forms

**Similarities:**
- Both use standard input patterns (text, dropdowns, date pickers)
- Both have settings forms for expense tracking configuration
- Similar validation patterns (inline errors)

**Differences:**
- BeProfit may have more detailed expense category forms (custom cost rules)
- Visual design differences (border thickness, colors, spacing)

### vs Lifetimely Forms

**Similarities:**
- Both SaaS analytics tools with settings forms
- Both use filters for dashboard data slicing

**Differences:**
- Lifetimely may focus more on customer segmentation filters
- BeProfit emphasizes date range and store selection

### Industry Best Practices

BeProfit forms follow standard design patterns:
- **Nielsen Norman Group Guidelines:** Clear labels, visible focus states, helpful error messages
- **Material Design Principles:** 44px touch targets, rounded corners, elevation through shadows
- **WCAG 2.1 Accessibility:** Keyboard navigation, ARIA labels, sufficient contrast

## Form Strengths

1. **Clear Visual Hierarchy** — Labels, inputs, help text, and errors each have distinct styling; users instantly identify form structure
2. **Comprehensive Validation** — Inline validation with specific error messages helps users correct mistakes without form submission delays
3. **Mobile-Optimized Inputs** — 16px font size prevents zoom, appropriate input types trigger correct mobile keyboards (numeric, email, tel)

## Form Weaknesses

1. **Repetitive Manual Entry** — If expense tracking forms don't support bulk import or templates, entering many items tedious
2. **Limited Smart Defaults** — If forms don't pre-fill based on previous entries or user patterns, users re-enter same data frequently
3. **No Progressive Disclosure** — If complex forms show all fields upfront, overwhelming for new users; progressive disclosure (show basic, expand for advanced) improves first-run experience

## Relevance to Our Build

### Form Component Library

**Recommendation:** Use headless UI library + custom styles

**Options:**
- **Headless UI (Recommended):** Unstyled, accessible components (by Tailwind Labs)
- **Radix UI:** Similar to Headless UI, excellent accessibility
- **React Hook Form:** Form state management, not UI components
- **Build Custom:** Full control but high development time

**Strategy:**
- Use Headless UI for complex components (dropdowns, date pickers, modals)
- Build simple inputs (text, checkbox, radio) with custom CSS
- Use React Hook Form for form state, validation

### Essential Input Types

**MVP Must-Haves:**
1. Text input (names, emails, notes)
2. Dropdown select (status, category)
3. Date range picker (critical for analytics dashboards)
4. Number input (prices, quantities)
5. Checkbox (enable/disable options)

**Phase 2:**
6. Search/autocomplete (order search, product lookup)
7. Multi-select dropdown (tags, categories)
8. File upload (receipts, product images)

**Phase 3:**
9. Toggle switches (settings UI)
10. Slider (budget ranges, filters)

### Validation Strategy

**Approach:**
- **Client-Side:** React Hook Form with Zod schema validation (fast feedback)
- **Server-Side:** API validates before save (security, data integrity)
- **Timing:** On blur for most fields, real-time for password strength/username availability

**Error Handling:**
- Show specific error messages below fields
- Disable submit button until form valid
- Scroll to first error on submit attempt

### Filter UI Approach

**Layout:**
- Horizontal filter bar at top of dashboard
- Date range picker (left), Store selector, Status dropdown (right)
- "Apply" button (explicit apply vs auto-apply on change — explicit better for performance with large datasets)

**Presets:**
- Last 7/30/90 days presets in date picker
- "Clear Filters" button resets all to defaults

**Active Filter Chips:**
- Show active filters as removable chips below filter bar
- Quick removal without reopening filter dropdowns

### Accessibility Priorities

**MVP:**
- Label-input association (`for` and `id` attributes)
- Keyboard navigation (tab through fields, enter to submit)
- Visible focus indicators (purple outline ring)
- ARIA labels where needed

**Phase 2:**
- Error announcements (aria-live regions)
- Screen reader testing
- High contrast mode support

**Phase 3:**
- Keyboard shortcuts (Ctrl+S to save)
- Skip links (skip to form content)

## Form Component Specifications

### Complete Form Example (React + TypeScript)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schema
const storeSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  storeUrl: z.string().url('Invalid URL format'),
  currency: z.string().min(1, 'Currency is required'),
  notificationsEnabled: z.boolean(),
});

type StoreFormData = z.infer<typeof storeSchema>;

function StoreSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      notificationsEnabled: true,
    },
  });

  const onSubmit = async (data: StoreFormData) => {
    // API call to save settings
    await fetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-vertical">
      {/* Store Name */}
      <div className="form-group">
        <label htmlFor="storeName" className="form-label required">
          Store Name
        </label>
        <input
          id="storeName"
          type="text"
          className={`input-field ${errors.storeName ? 'error' : ''}`}
          placeholder="My Shopify Store"
          {...register('storeName')}
        />
        {errors.storeName && (
          <span className="error-message">
            {errors.storeName.message}
          </span>
        )}
      </div>

      {/* Store URL */}
      <div className="form-group">
        <label htmlFor="storeUrl" className="form-label required">
          Store URL
        </label>
        <input
          id="storeUrl"
          type="url"
          className={`input-field ${errors.storeUrl ? 'error' : ''}`}
          placeholder="https://mystore.myshopify.com"
          {...register('storeUrl')}
        />
        <span className="form-help">
          Your store's Shopify URL
        </span>
        {errors.storeUrl && (
          <span className="error-message">
            {errors.storeUrl.message}
          </span>
        )}
      </div>

      {/* Currency */}
      <div className="form-group">
        <label htmlFor="currency" className="form-label required">
          Currency
        </label>
        <select
          id="currency"
          className={`input-field ${errors.currency ? 'error' : ''}`}
          {...register('currency')}
        >
          <option value="">Select currency</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
        {errors.currency && (
          <span className="error-message">
            {errors.currency.message}
          </span>
        )}
      </div>

      {/* Notifications Toggle */}
      <div className="form-group">
        <label className="form-label-inline">
          <input
            type="checkbox"
            className="checkbox"
            {...register('notificationsEnabled')}
          />
          <span>Enable email notifications</span>
        </label>
      </div>

      {/* Submit Buttons */}
      <div className="button-group">
        <button type="button" className="btn-secondary">
          Cancel
        </button>
        <button
          type="submit"
          className={`btn-primary ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
```

### Complete Form CSS

```css
/* Form Container */
.form-vertical {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 24px;
}

/* Labels */
.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-label.required::after {
  content: ' *';
  color: #EF4444;
}

/* Inputs */
.input-field {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  font-size: 16px;
  color: #111827;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field::placeholder {
  color: #9CA3AF;
}

.input-field:focus {
  outline: none;
  border-color: #6514DD;
  box-shadow: 0 0 0 3px rgba(101, 20, 221, 0.1);
}

.input-field.error {
  border-color: #EF4444;
  background: #FEF2F2;
}

.input-field:disabled {
  background: #F3F4F6;
  color: #9CA3AF;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Help Text */
.form-help {
  display: block;
  font-size: 13px;
  color: #6B7280;
  margin-top: 6px;
}

/* Error Messages */
.error-message {
  color: #EF4444;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Button Group */
.button-group {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
}

/* Buttons */
.btn-primary {
  height: 44px;
  padding: 0 24px;
  background: #6514DD;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #4F0FB8;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  height: 44px;
  padding: 0 24px;
  background: #F3F4F6;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #E5E7EB;
}

/* Checkbox */
.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  accent-color: #6514DD;
}

.form-label-inline {
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* Loading State */
.btn-primary.loading {
  position: relative;
  color: transparent;
}

.btn-primary.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .form-vertical {
    max-width: 100%;
    padding: 0 16px;
  }

  .button-group {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
```

## Sources

- https://help.runviably.com/beprofit — Settings documentation describing configuration forms
- https://beprofit.co/ — Signup/trial flows showing input patterns
- https://apps.shopify.com/beprofit-profit-tracker — App installation flow indicating form patterns
- User reviews mentioning "easy setup", "simple configuration" suggesting user-friendly forms
- Form design best practices from Nielsen Norman Group, Luke Wroblewski's "Web Form Design" principles
- React Hook Form documentation (https://react-hook-form.com/)
- Headless UI documentation (https://headlessui.com/)
- WCAG 2.1 accessibility guidelines for forms
