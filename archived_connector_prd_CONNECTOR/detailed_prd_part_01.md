# PRD Part 01: MVP Data Requirements Mapping

## Overview
Before researching connector platforms, we must define exactly what data we need from each integration source. This ensures we can evaluate platforms against concrete requirements rather than vague feature lists.

## Tasks

### Task 1: Define Shopify Data Requirements
- **Description**: Map out every data field we need from Shopify to power the dashboard Overview and Marketing sections.
- **Acceptance Criteria**: Complete field-level specification for Shopify data
- **Technical Details**:

**Orders Data (Critical)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Order ID | Unique identifier, linking across systems | Real-time webhook |
| Order date/time | Time-series analytics, daily P&L | Real-time webhook |
| Line items (product, qty, price) | Revenue calculation, product-level profit | Real-time webhook |
| Discount codes & amounts | Accurate revenue calculation | Real-time webhook |
| Shipping cost (charged to customer) | Revenue vs. actual shipping cost comparison | Real-time webhook |
| Transaction/payment fees | Net revenue after gateway fees | Real-time webhook |
| Refund amounts & dates | Adjusted profit calculation | Real-time webhook |
| Customer email & ID | Customer-level analytics | Real-time webhook |
| Payment gateway used | Fee calculation per gateway | Real-time webhook |
| Order status | Filter cancelled/pending orders | Real-time webhook |
| Currency | Multi-currency support | Real-time webhook |
| Tax amounts | Tax-inclusive/exclusive profit calc | Real-time webhook |

**Products Data (Critical)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Product ID & title | Product-level profit analytics | Hourly/webhook |
| SKU | Cross-reference with cost spreadsheets | Hourly/webhook |
| Variant info (size, color, etc.) | Variant-level profit tracking | Hourly/webhook |
| Product cost (COGS) | Gross profit calculation | Hourly/webhook |
| Inventory levels | Stock value tracking | Hourly/webhook |
| Product type/category | Category-level analytics | Hourly/webhook |

**Customer Data (Secondary)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Customer ID & email | Deduplication, customer analytics | Daily |
| Total orders count | Repeat customer identification | Daily |
| Total spend | Customer value metrics | Daily |

### Task 2: Define Facebook/Meta Ads Data Requirements
- **Description**: Map all ad performance data needed from Meta Ads (Facebook + Instagram).
- **Acceptance Criteria**: Complete field-level specification for Meta Ads data
- **Technical Details**:

**Campaign-Level Data (Critical)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Campaign ID & name | Campaign identification | Hourly/daily |
| Campaign status | Active/paused filtering | Hourly/daily |
| Daily spend | Ad cost for profit calculation | Hourly/daily |
| Impressions | Performance metrics | Hourly/daily |
| Clicks | CPC calculation | Hourly/daily |
| CPC (cost per click) | Efficiency metric | Hourly/daily |
| CPM (cost per 1000 impressions) | Reach efficiency | Hourly/daily |
| Conversions (purchases) | ROAS calculation | Hourly/daily |
| Conversion value (revenue) | Revenue attribution | Hourly/daily |
| ROAS | Return on ad spend | Hourly/daily |

**Ad Set Level Data (Important)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Ad set ID & name | Granular performance | Daily |
| Ad set spend | Budget allocation analysis | Daily |
| Targeting info (audience) | Audience performance | Daily |

**Ad Level Data (Nice-to-have for MVP)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Ad ID & name | Ad-level performance | Daily |
| Ad spend | Granular cost tracking | Daily |
| Ad creative type | Creative performance analysis | Daily |

### Task 3: Define Google Ads Data Requirements
- **Description**: Map all ad performance data needed from Google Ads (Search, Display, Shopping, YouTube).
- **Acceptance Criteria**: Complete field-level specification for Google Ads data
- **Technical Details**:

**Campaign-Level Data (Critical)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Campaign ID & name | Campaign identification | Daily |
| Campaign type (Search/Shopping/Display/Video) | Type-based analytics | Daily |
| Daily spend | Ad cost for profit calculation | Daily |
| Impressions | Performance metrics | Daily |
| Clicks | CPC calculation | Daily |
| CPC | Efficiency metric | Daily |
| Conversions | ROAS calculation | Daily |
| Conversion value | Revenue attribution | Daily |
| ROAS | Return on ad spend | Daily |

**Ad Group Level Data (Important)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Ad group ID & name | Granular performance | Daily |
| Ad group spend | Budget allocation | Daily |
| Keywords (for Search) | Keyword performance | Daily |

### Task 4: Define Google Analytics Data Requirements
- **Description**: Map traffic and conversion data needed from Google Analytics (GA4).
- **Acceptance Criteria**: Complete field-level specification for GA4 data
- **Technical Details**:

**Traffic Data (Critical)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Sessions by channel | Traffic source breakdown | Daily |
| Users (new vs returning) | Audience composition | Daily |
| Page views | Site engagement | Daily |
| Bounce rate | Traffic quality | Daily |
| Average session duration | Engagement depth | Daily |

**Conversion Data (Critical)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Transactions | Conversion tracking | Daily |
| Revenue by channel | Channel attribution | Daily |
| Conversion rate by channel | Channel efficiency | Daily |
| E-commerce conversion rate | Overall funnel metric | Daily |

**Source/Medium Data (Important)**:
| Field | Purpose | Refresh |
|-------|---------|---------|
| Source/medium breakdown | Attribution analysis | Daily |
| Campaign-level traffic | Campaign performance context | Daily |
| Landing page performance | Page-level analytics | Daily |

### Task 5: Define Custom Upload Data Requirements
- **Description**: Map data fields users will upload manually via spreadsheet or manual input.
- **Acceptance Criteria**: Clear specification of uploadable cost categories
- **Technical Details**:

**Product Costs (CSV Upload)**:
| Field | Purpose |
|-------|---------|
| SKU or Product ID | Match to Shopify products |
| Product cost (COGS) | Gross profit calculation |
| Variant-level costs | Variant profit tracking |
| Currency | Multi-currency cost support |
| Effective date | Time-based cost changes |

**Fulfillment/Shipping Costs (CSV Upload or Manual)**:
| Field | Purpose |
|-------|---------|
| Shipping provider | Cost allocation by carrier |
| Cost per order / weight-based | Shipping cost calculation |
| Flat rate / tiered pricing | Cost structure definition |
| Zone/region rates | Geographic cost tracking |

**Operating Expenses (Manual Input)**:
| Field | Purpose |
|-------|---------|
| Expense category | P&L categorization |
| Amount | Cost tracking |
| Frequency (one-time / recurring) | Amortization |
| Date range | Period-based allocation |
| Description/notes | Audit trail |

**Other Expenses (Manual Input)**:
| Field | Purpose |
|-------|---------|
| Category (software, payroll, etc.) | P&L line items |
| Amount | Cost tracking |
| Frequency | Recurring vs one-time |
| Attribution method (per-order, per-month) | Allocation logic |

## Progress

### Task 001 - Data Requirements Validation (Shopify, Meta Ads, Google Ads) - 2026-02-14
- **Status:** COMPLETED
- **Summary:** Validated Shopify, Meta Ads, and Google Ads data requirements against official 2026 API documentation and cross-referenced with BeProfit casestudy analysis
- **Files Created:** `dtcdashboard_app/research/data-requirements-validation-001.md`
- **Issues Found:** 6 critical issues, 8 minor issues with workarounds
- **Key Findings:**
  - Shopify: 23/27 fields verified available; 4 require additional API calls (Transaction fees, COGS via InventoryItem, Refunds separate endpoint, Customer aggregates have lag)
  - Meta Ads: All core fields verified with critical 2026 changes (attribution window removals, conversion timing changes, historical data limits)
  - Google Ads: All fields verified; currency fields use micros requiring conversion
  - BeProfit comparison revealed 2 missing fields: Handling costs and UTM parameters (recommended additions)
- **Critical Corrections Required:**
  - ⚠️ URGENT: Verify Meta `impressions` vs `views` field name (Nov 2024 metric change)
  - Add Shopify UTM parameters to Orders data (critical for attribution)
  - Add Handling costs to Products data (separate from COGS)
  - Document Google Ads micros conversion requirement
  - Note Meta 2026 attribution changes impact on P&L timing
- **Validation Report:** See `dtcdashboard_app/research/data-requirements-validation-001.md` for detailed field-by-field validation with API sources

### Cumulative Progress
- [x] Task 1: Shopify data requirements validated - completed in Task 001 (2 missing fields identified: UTM parameters, Handling costs)
- [x] Task 2: Meta Ads data requirements validated - completed in Task 001 (2026 API changes documented)
- [x] Task 3: Google Ads data requirements validated - completed in Task 001 (micros conversion requirement noted)
- [ ] Task 4: Google Analytics data requirements finalized - NOT STARTED
- [ ] Task 5: Custom upload data requirements finalized - NOT STARTED

### Remaining Work
- **Next Task:** Google Analytics (GA4) data requirements validation (Task 002)
- **Next Task:** Custom upload data requirements validation (Task 002 or 003)
- **Follow-up:** Apply critical corrections to PRD data field tables based on validation findings (requires review/approval)
- **Urgent:** Test Meta Ads API to confirm `impressions` field availability (before implementation phase)
