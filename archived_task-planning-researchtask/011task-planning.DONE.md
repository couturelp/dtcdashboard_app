# Task 011 - Email/SMS, Shipping, Accounting & Data Sync Research (PRD Part 03, Batch 3)

## PRD Reference
- **PRD Part:** 03
- **PRD File:** prd/detailed_prd_part_03.md
- **Requirements Addressed:** Tasks 9-13 of PRD Part 03 (Klaviyo Integration, Other Email/SMS Integrations, Shipping Platform Integrations, Accounting & Other Integrations, Data Sync & Refresh Documentation)

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-13T19:45:00Z

## Purpose
Continue PRD Part 03 (Integrations Deep Dive) by documenting BeProfit's email/SMS marketing, shipping, accounting, and data synchronization capabilities. This batch covers the remaining integration categories beyond e-commerce platforms and ad platforms, completing the integration ecosystem documentation.

## Scope

### What This Task WILL Do (5 items)
1. Research and document Klaviyo Integration → `beprofit-casestudy-info-039.md`
2. Research and document Other Email/SMS Integrations (Mailchimp, Omnisend, Postscript, etc.) → `beprofit-casestudy-info-040.md`
3. Research and document Shipping Platform Integrations (ShipStation, ShipBob, etc.) → `beprofit-casestudy-info-041.md`
4. Research and document Accounting & Other Integrations (QuickBooks, Xero, payment processors, fulfillment, Zapier) → `beprofit-casestudy-info-042.md`
5. Research and document Data Sync & Refresh mechanisms across all integrations → `beprofit-casestudy-info-043.md`

### What This Task Will NOT Do (Left for Later Tasks)
- Integration Comparison Matrix (file 044) - Task 012
- Checkpoint Review #3 (file 045) - Task 012
- PRD Part 04 work (any subsequent PRD parts)

## Files to CREATE
1. `dtcdashboard_app/casestudy/beprofit-casestudy-info-039.md` — Klaviyo Integration
2. `dtcdashboard_app/casestudy/beprofit-casestudy-info-040.md` — Other Email/SMS Integrations
3. `dtcdashboard_app/casestudy/beprofit-casestudy-info-041.md` — Shipping Platform Integrations
4. `dtcdashboard_app/casestudy/beprofit-casestudy-info-042.md` — Accounting & Other Integrations
5. `dtcdashboard_app/casestudy/beprofit-casestudy-info-043.md` — Data Sync & Refresh Documentation

## Implementation Steps (Max 6 steps)

### Step 1: Research Klaviyo Integration (File 039)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-039.md` (CREATE)

Browse the following sources to understand BeProfit's Klaviyo integration:
- **BeProfit Help Center:** https://help.runviably.com/beprofit
  - Search for: "Klaviyo", "Klaviyo integration", "email marketing", "Klaviyo connect"
  - Navigate to Integrations > Email/SMS section if it exists
- **BeProfit Marketing Site:** https://beprofit.co/ — Look for Klaviyo mentions
- **Cross-reference:** File 031 (Integration Ecosystem Overview) for Klaviyo's positioning
- **External Search:** "BeProfit Klaviyo integration" for user discussions

**Research methodology:**
1. **Connection Setup:**
   - Document connection flow (API key vs OAuth)
   - Required permissions from Klaviyo
   - Prerequisites (Klaviyo account type, pricing tier requirements)
   - Integration with e-commerce platform (does Klaviyo need to be connected to same Shopify store?)

2. **Data Synced:**
   - Email campaign performance data (campaigns sent, opens, clicks, revenue)
   - SMS campaign data (if supported)
   - Flow/automation performance (abandoned cart flows, post-purchase flows)
   - Revenue attribution per campaign/flow
   - Customer segments synced (if two-way sync)
   - Conversion tracking (email → purchase attribution)

3. **Attribution Methodology:**
   - How BeProfit attributes email revenue to Klaviyo campaigns
   - Attribution window for email marketing (likely 1-7 days from email open/click)
   - UTM parameter tracking vs Klaviyo pixel tracking
   - Multi-touch attribution handling (email + ads)

4. **Sync Direction & Frequency:**
   - One-way (Klaviyo → BeProfit) or two-way?
   - Sync frequency (real-time, hourly, daily)
   - Historical data import range

5. **Klaviyo-Specific Features:**
   - Flow revenue attribution (abandoned cart recovery, welcome series, post-purchase)
   - A/B test campaign tracking
   - Customer lifetime value (CLV) integration
   - Segmentation insights

6. **Limitations:**
   - SMS attribution separate from email?
   - Klaviyo-only pricing tier restrictions
   - Known sync issues

**Document structure template:**

```markdown
# BeProfit Klaviyo Integration

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / Email & SMS Marketing / Klaviyo
- **Date Captured:** 2026-02-13

---

## Integration Overview
[What Klaviyo integration provides — email/SMS revenue attribution, campaign performance, flow tracking]

## Connection Setup

### Prerequisites
- Klaviyo account (Free/paid tier requirements?)
- Klaviyo connected to same e-commerce platform as BeProfit (Shopify/WooCommerce)?
- BeProfit plan required: [Free/Basic/Premium/Plus]

### Connection Flow
**Step-by-step:**
1. Navigate to Settings > Integrations > Klaviyo
2. Enter Klaviyo API Key (found in Klaviyo Account > Settings > API Keys)
3. BeProfit validates connection (test API call)
4. Select data to sync (campaigns only, campaigns + flows, SMS, etc.)
5. Initial sync begins

### Authentication Method
- API Key (Public + Private Key) OR
- OAuth (if Klaviyo supports it)

## Data Synced FROM Klaviyo

### Campaign Data
**Fields synced:**
- Campaign ID, Name, Status, Send date, Subject line
- Recipients count, Opens, Open rate, Clicks, Click rate
- Conversions (purchases attributed to campaign)
- Revenue attributed to campaign
- Campaign type (regular, A/B test, automated)

### Flow/Automation Data
**Flows tracked:**
- Abandoned Cart flow (revenue recovery)
- Welcome Series flow
- Post-Purchase flow
- Winback flow
- [Other flows]

**Per-flow metrics:**
- Flow ID, Name, Status (live, draft, archived)
- Recipients entered, Emails sent, Opens, Clicks
- Conversions, Revenue attributed
- Flow ROI

### SMS Campaign Data (if supported)
- SMS campaigns sent, delivered, clicked (link tracking)
- SMS revenue attribution
- SMS vs Email performance comparison

### Customer Segment Data
- Does BeProfit sync Klaviyo segments?
- Segment-level revenue insights?

## Sync Details

### Sync Frequency
- Automatic sync: [hourly/daily/real-time]
- Manual refresh: [Yes/No, location of refresh button]
- Data freshness delay: [e.g., "2-6 hours behind Klaviyo dashboard"]

### Historical Data Import
- Import range: [e.g., "90 days of campaign history on first sync"]
- Ongoing: continuous sync forward from connection date

### Data Freshness
- Klaviyo attribution may take 24-48 hours to finalize (like ad platforms)
- Order matching latency

## Attribution Methodology

### Email Revenue Attribution
**How BeProfit links Klaviyo emails to orders:**
- UTM parameter tracking (utm_source=klaviyo, utm_medium=email, utm_campaign=XXX)
- Klaviyo click tracking pixel
- Transaction ID matching (Klaviyo "Placed Order" event)
- Cookie-based attribution

### Attribution Window
- Default: [e.g., "7-day click attribution from email open/click"]
- Configurable: [Yes/No]
- Multi-touch: [How BeProfit handles email + ad touches on same order]

### Flow-Specific Attribution
- Abandoned cart flow attribution (within X hours of cart abandonment)
- Browse abandonment attribution
- Post-purchase upsell attribution

### Edge Cases
- Orders without email attribution (organic, direct)
- Email opens without purchases (tracked separately?)
- Multi-channel orders (email + Google Ads + Facebook Ads) — how revenue split?

## Klaviyo-Specific Features

### Flow Revenue Breakdown
[Does BeProfit show revenue by flow type?]

Example breakdown:
- Abandoned Cart flow: $X revenue, Y conversions
- Welcome Series: $X revenue, Y conversions
- Post-Purchase: $X revenue, Y conversions

### A/B Test Tracking
[Can BeProfit track A/B test campaign variants separately?]

### Customer Lifetime Value (CLV)
[Does Klaviyo CLV data sync to BeProfit?]

### Segmentation Insights
[Can BeProfit show profit by Klaviyo segment? e.g., "VIP customers segment" profit margin]

## Troubleshooting & Limitations

### Common Connection Issues
- Invalid API key error
- Permission scope errors (API key lacks required permissions)
- Sync stopped due to Klaviyo API rate limits

### Known Limitations
- [e.g., "SMS attribution separate from email — may not be fully tracked"]
- [e.g., "A/B test variants rolled into single campaign — no per-variant revenue"]
- [e.g., "Klaviyo Flows only sync top 10 flows — custom flows may be excluded"]
- Historical data limit (can't import campaigns older than X days)

### Pricing Tier Requirements
- Available on: [Free/Basic/Premium/Plus plans]
- Feature restrictions: [e.g., "Free plan: last 30 days only"]

## Sync Direction

### One-Way vs Two-Way
**Klaviyo → BeProfit (one-way):**
- BeProfit imports Klaviyo campaign/flow data
- BeProfit does NOT push data back to Klaviyo (read-only)

**OR Two-Way (if applicable):**
- BeProfit pushes profit data to Klaviyo (custom event "Profit Calculated")
- Klaviyo can segment by profit margin (hypothetical)

## Inferred UI Elements

**Settings > Integrations page:**
- Klaviyo connection card showing "Connected" status
- Last synced timestamp
- Connected account name/email

**Dashboard:**
- Email marketing widget showing Klaviyo revenue vs cost
- Top-performing campaigns by revenue
- Flow performance breakdown

**Reports:**
- Email attribution report (campaign/flow breakdown)
- Channel comparison (Email vs Ads vs Organic)
- Multi-touch attribution report (if supported)

## Data Model Implications

For our competing product's schema:

```typescript
// Klaviyo integration connection
interface KlaviyoConnection {
  apiKey: string; // encrypted
  accountName: string;
  connectionStatus: 'connected' | 'error' | 'disconnected';
  syncFrequency: 'hourly' | 'daily';
  attributionWindow: {
    clickDays: number; // e.g., 7
    openDays: number; // e.g., 1
  };
  lastSyncedAt: Date;
}

// Email campaign data structure
interface EmailCampaign {
  campaignId: string;
  name: string;
  subject: string;
  sendDate: Date;
  recipients: number;
  opens: number;
  clicks: number;
  conversions: number;
  attributedRevenue: number;
  campaignCost: number; // Klaviyo cost per email sent (if available)
  roi: number; // (attributedRevenue - campaignCost) / campaignCost
  type: 'regular' | 'ab_test' | 'automated';
}

// Flow/automation data structure
interface EmailFlow {
  flowId: string;
  name: string;
  status: 'live' | 'draft' | 'archived';
  recipientsEntered: number;
  emailsSent: number;
  conversions: number;
  attributedRevenue: number;
  roi: number;
}
```

## Limitations & Gaps Identified

**Unanswered questions:**
- Does BeProfit sync Klaviyo SMS campaign data, or email only?
- Can BeProfit track A/B test variants separately?
- Does BeProfit sync Klaviyo segments for profit analysis by segment?
- Is there two-way sync (BeProfit pushing profit data to Klaviyo)?
- How does BeProfit handle Klaviyo attribution when Klaviyo pixel isn't installed?

## Relevance to Our Build

**Critical for our competing product:**

1. **Email marketing is a core profit driver** for DTC brands. Klaviyo is the #1 email platform for Shopify stores. We MUST have deep Klaviyo integration.

2. **Flow attribution is key** — abandoned cart recovery, welcome series, and winback flows drive significant revenue. Tracking flow-level ROI is critical.

3. **Multi-touch attribution challenge** — email often works with ads. We need to decide: last-click, linear, or time-decay attribution model.

4. **SMS attribution** — if BeProfit doesn't track SMS well, this is a differentiation opportunity. SMS is growing fast for DTC.

5. **Two-way sync opportunity** — if BeProfit is read-only, we could differentiate by pushing profit data TO Klaviyo for segmentation (e.g., "High profit customers" segment).

**Competitive differentiation opportunities:**
- Better SMS attribution tracking
- A/B test variant-level tracking
- Two-way sync (profit data → Klaviyo for segmentation)
- Real-time sync (BeProfit likely batch)
- Multi-touch attribution models

**Technical challenges:**
- Klaviyo API rate limits (varies by account tier)
- Attribution matching accuracy (UTM vs pixel vs cookie)
- Handling Klaviyo Flows (dynamic flows vs static campaigns)
- Multi-account support (agencies with multiple Klaviyo accounts)

---

## Research Checklist (Per-Integration)
- [ ] Platform name and category: Klaviyo, Email/SMS Marketing
- [ ] Data synced: Campaigns, Flows, SMS (if supported), Revenue Attribution
- [ ] Sync direction: One-way (Klaviyo → BeProfit) or Two-way
- [ ] Sync frequency: [documented in Sync Details section]
- [ ] Setup complexity: API key entry (simple)
- [ ] Limitations: [documented in Limitations section]
- [ ] Pricing tier: [documented in Prerequisites]
- [ ] Authentication method: API Key (or OAuth)
```

**Integration with existing codebase:**
- Cross-reference file 031 (Integration Ecosystem Overview) for Klaviyo's tier and positioning
- Cross-reference file 035/036 (ad platforms) for multi-touch attribution comparison
- Cross-reference file 032 (Shopify) for order data that Klaviyo attributes to

**Estimated browsing effort:** 6-10 web pages (2-3 Help Center articles, marketing site, external searches).

**Expected output:** 400-600 line markdown file.

- [ ] Checkpoint: Step 1 complete

---

### Step 2: Research Other Email/SMS Integrations (File 040)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-040.md` (CREATE)

Browse all sources to identify and document OTHER email/SMS integrations beyond Klaviyo:
- **BeProfit Help Center:** Browse Integrations > Email/SMS category (if exists)
- **BeProfit Marketing Site:** Integrations page
- **File 031:** Cross-reference Integration Ecosystem Overview for complete list
- **External Search:** "BeProfit [platform] integration" for each platform

**Platforms to research:**
1. **Mailchimp** (popular general email platform)
2. **Omnisend** (Shopify-focused email/SMS)
3. **Postscript** (SMS-focused)
4. **Attentive** (SMS marketing)
5. **SMSBump / Yotpo SMS** (SMS for Shopify)
6. **ActiveCampaign** (email automation)
7. **Drip** (e-commerce email)
8. **ConvertKit** (creator-focused email)
9. **Any other platforms** discovered during research

**Research methodology (for each platform):**

1. **Check if integration exists:**
   - Native integration (direct API)
   - Third-party via Zapier
   - Not supported

2. **If integration exists, document:**
   - Connection setup (OAuth, API key, manual)
   - Data synced (campaigns, automation, SMS, revenue)
   - Sync frequency
   - Attribution methodology
   - Tier requirements
   - Limitations vs Klaviyo

3. **Comparative analysis:**
   - Which platforms have native integration?
   - Which are Zapier-only?
   - Is Klaviyo the only "first-class" email integration?
   - Are SMS platforms (Postscript, Attentive) well-supported or limited?

**Document structure:**

```markdown
# BeProfit Other Email/SMS Integrations

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / Email & SMS Marketing / Other Platforms
- **Date Captured:** 2026-02-13

---

## Overview
This document covers all email/SMS integrations EXCEPT Klaviyo (covered in file 039).

## Mailchimp Integration

### Availability
- Status: [Native / Via Zapier / Not Supported]
- Tier Required: [plan level]

### Connection Setup
[If supported, document setup steps similar to Klaviyo]

### Data Synced
- Campaign data: [Yes/No, fields synced]
- Automation data: [Yes/No, flows synced]
- Revenue attribution: [Yes/No, method]

### Sync Details
- Sync frequency: [real-time/hourly/daily]
- Historical import: [range]

### Attribution
[How email revenue is attributed]

### Limitations
[Known issues, gaps vs Klaviyo]

---

## Omnisend Integration

[Same structure as Mailchimp]

**Note:** Omnisend is Shopify-focused with built-in SMS. Document if SMS is tracked separately.

---

## Postscript Integration (SMS)

[Same structure]

**Focus areas:**
- SMS-only vs email+SMS
- SMS attribution methodology (link clicks in SMS)
- SMS cost tracking (Postscript charges per SMS sent)

---

## Attentive Integration (SMS)

[Same structure]

**Focus areas:**
- Two-way SMS (customer replies)
- Compliance features (TCPA, opt-outs)
- SMS campaign vs conversational SMS

---

## [Other Platforms]

[Repeat for each platform discovered]

---

## Email/SMS Platform Comparison

### Native Integration Tiers

**Tier 1 (Full Native, Mature):**
- Klaviyo (file 039)

**Tier 2 (Native, Limited):**
- [platforms with native but less mature integrations]

**Tier 3 (Zapier Only):**
- [platforms requiring Zapier]

**Not Supported:**
- [platforms without integration]

### Feature Parity Matrix

| Platform | Native/Zapier | Campaign Data | Automation/Flow Data | SMS Support | Revenue Attribution | Tier Required |
|----------|---------------|---------------|---------------------|-------------|-------------------|---------------|
| Klaviyo | Native | Yes | Yes | Partial | Yes (UTM+Pixel) | All plans |
| Mailchimp | [Native/Zapier] | [Yes/No] | [Yes/No] | [Yes/No] | [Yes/No, method] | [tier] |
| Omnisend | [Native/Zapier] | [Yes/No] | [Yes/No] | [Yes/No] | [Yes/No, method] | [tier] |
| Postscript | [Native/Zapier] | N/A (SMS only) | N/A | Yes | [Yes/No, method] | [tier] |
| Attentive | [Native/Zapier] | N/A (SMS only) | N/A | Yes | [Yes/No, method] | [tier] |
| ... | ... | ... | ... | ... | ... | ... |

### BeProfit's Email/SMS Strategy

**Strategic insights:**
- Is Klaviyo the ONLY first-class email integration, or does Mailchimp/Omnisend get equal support?
- Are SMS platforms (Postscript, Attentive) natively integrated or Zapier-only?
- Which platforms are missing? (ConvertKit, Drip, ActiveCampaign support unclear)

**SMS-specific insights:**
- Does BeProfit track SMS revenue separately from email?
- Can BeProfit calculate SMS ROI (revenue vs SMS cost)?
- Are SMS campaigns treated as "campaigns" like email, or separate entity?

## Inferred UI Elements

**Settings > Integrations page:**
- Email/SMS section with cards for each platform
- Klaviyo featured prominently
- Other platforms listed below or in "More integrations" section

**Dashboard:**
- Email marketing widget (may aggregate all platforms or show Klaviyo only)
- SMS marketing widget (separate or combined with email?)

**Reports:**
- Channel attribution report (Email vs SMS vs Ads)
- Platform comparison (Klaviyo vs Mailchimp performance)

## Data Model Implications

```typescript
// Unified email/SMS connection interface
interface EmailSMSConnection {
  platform: 'klaviyo' | 'mailchimp' | 'omnisend' | 'postscript' | 'attentive';
  accountId: string;
  accountName: string;
  accessToken?: string; // OAuth
  apiKey?: string; // API Key auth
  connectionStatus: 'connected' | 'error' | 'disconnected';
  syncFrequency: 'realtime' | 'hourly' | 'daily';
  supportsEmail: boolean;
  supportsSMS: boolean;
  supportsFlows: boolean;
  attributionMethod: 'utm' | 'pixel' | 'click_tracking' | 'manual';
  lastSyncedAt: Date;
}

// Unified email/SMS campaign structure
interface MarketingCampaign {
  platform: string;
  campaignId: string;
  name: string;
  type: 'email' | 'sms' | 'email_sms';
  sendDate: Date;
  recipients: number;
  opens?: number; // email only
  clicks: number;
  conversions: number;
  attributedRevenue: number;
  cost: number; // SMS cost (per message) or email cost
  roi: number;
}
```

## Limitations & Gaps Identified

**Unanswered questions:**
- Does BeProfit natively support Mailchimp/Omnisend, or Zapier only?
- Are SMS platforms (Postscript, Attentive) first-class integrations?
- Can BeProfit track SMS cost and calculate SMS ROI?
- Does BeProfit aggregate email/SMS revenue across all platforms, or platform-siloed?
- Can users connect multiple email platforms simultaneously (e.g., Klaviyo + Mailchimp)?

## Relevance to Our Build

**Strategic decisions:**

1. **Platform priority:**
   - MVP: Klaviyo (must-have)
   - Phase 2: Mailchimp, Omnisend (nice-to-have)
   - Phase 3: SMS platforms (Postscript, Attentive)

2. **SMS as differentiator:**
   - If BeProfit has weak SMS tracking, we can differentiate with deep SMS integrations
   - SMS cost tracking and ROI calculation (revenue per SMS sent)
   - SMS attribution challenges (link clicks only, no "opens" metric)

3. **Multi-platform support:**
   - Should we allow users to connect multiple email platforms? (use case: transitioning from Mailchimp to Klaviyo)
   - Unified email marketing dashboard aggregating all platforms

4. **Zapier strategy:**
   - For long-tail platforms (ConvertKit, Drip, ActiveCampaign), should we build native integrations or rely on Zapier?
   - Trade-off: native = better UX, more dev effort; Zapier = broader coverage, less control

**Competitive opportunities:**
- Better SMS tracking and ROI calculation
- Multi-platform email aggregation (consolidated view across Klaviyo + Mailchimp)
- Native integrations for platforms BeProfit doesn't support natively
- Two-way sync for advanced segmentation

**Technical challenges:**
- Each platform has different API rate limits and capabilities
- Attribution methodology varies (UTM vs pixel vs click tracking)
- SMS attribution is harder (no pixel, relies on link clicks)
- Handling platform-specific features (Klaviyo Flows vs Mailchimp Automations)
```

**Integration with existing codebase:**
- Cross-reference file 039 (Klaviyo) as the baseline for email/SMS integration capabilities
- Cross-reference file 031 for complete platform list
- Build feature parity matrix comparing all email/SMS platforms

**Estimated browsing effort:** 8-12 web pages (Help Center browse, marketing site, searches per platform).

**Expected output:** 400-600 line markdown file.

- [ ] Checkpoint: Step 2 complete

---

### Step 3: Research Shipping Platform Integrations (File 041)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-041.md` (CREATE)

Browse all sources to document shipping integrations:
- **BeProfit Help Center:** Search "shipping", "ShipStation", "ShipBob", "fulfillment"
- **BeProfit Marketing Site:** Integrations page
- **File 031:** Cross-reference for complete shipping platform list
- **External Search:** "BeProfit shipping integration"

**Platforms to research:**
1. **ShipStation** (multi-carrier shipping software)
2. **ShipBob** (3PL fulfillment)
3. **Shippo** (shipping API)
4. **EasyShip** (international shipping)
5. **Deliverr / Flexport** (fulfillment)
6. **Any other platforms** discovered

**Research methodology:**

1. **Connection setup:**
   - How shipping platforms connect to BeProfit
   - API key, OAuth, or automatic (via Shopify)?
   - Prerequisites (shipping platform must be connected to same Shopify store?)

2. **Data synced:**
   - **Shipping costs per order** (actual postage paid)
   - Carrier used (USPS, UPS, FedEx, etc.)
   - Tracking numbers
   - Delivery status
   - International shipping costs (duties, customs fees)
   - Shipping label purchases
   - **3PL fees** (for ShipBob, Deliverr — pick, pack, storage fees)

3. **Sync direction & frequency:**
   - One-way (shipping platform → BeProfit)
   - Real-time vs batch sync
   - How shipping costs update profit calculations

4. **Profit calculation impact:**
   - How BeProfit attributes shipping costs to orders
   - Gross shipping revenue vs net shipping profit (shipping charged to customer vs actual cost)
   - Handling free shipping (zero revenue, but cost still tracked)
   - 3PL storage fees (monthly or per-order allocation?)

5. **Limitations:**
   - Which shipping platforms are supported?
   - Are 3PL fees fully tracked (pick, pack, storage, inbound)?
   - Real-time sync or delayed?

**Document structure:**

```markdown
# BeProfit Shipping Platform Integrations

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / Shipping & Fulfillment
- **Date Captured:** 2026-02-13

---

## Integration Overview
[How shipping integrations help calculate true profit — shipping costs must be deducted from revenue]

## Why Shipping Integrations Matter for Profit Calculation

**Key insight:** Shipping costs directly impact profit margins.
- **Shipping cost vs shipping revenue:** Customer pays $5 shipping, actual postage costs $7.50 → -$2.50 margin
- **Free shipping:** Customer pays $0, actual cost $7.50 → -$7.50 margin (must be tracked accurately)
- **3PL fees:** Pick & pack fees, storage fees, inbound freight — all reduce profit

BeProfit must sync actual shipping costs to calculate accurate profit per order.

## ShipStation Integration

### Availability
- Status: [Native / Via Zapier / Not Supported]
- Tier Required: [plan level]

### Connection Setup
[Document connection flow — API key from ShipStation]

### Data Synced FROM ShipStation
**Per-order shipping data:**
- Order ID (matches Shopify/WooCommerce order)
- Carrier (USPS, UPS, FedEx, DHL, etc.)
- Service class (First Class, Priority Mail, Ground, Express)
- Postage cost (actual amount paid to carrier)
- Label purchase date/time
- Tracking number
- Package weight, dimensions
- Delivery confirmation

**Label purchase data:**
- Individual label costs
- Bulk label purchase discounts (if tracked)

### Sync Details
- Sync frequency: [real-time/hourly/daily]
- Historical import: [how far back]
- Sync trigger: Label creation in ShipStation → auto-sync to BeProfit

### Profit Calculation Impact
**How BeProfit uses ShipStation data:**
- Matches shipping cost to order ID
- Deducts postage cost from order profit
- Calculates net shipping profit: (shipping revenue from customer) - (actual postage cost)

**Example calculation:**
```
Order #1001:
- Product revenue: $50
- Shipping charged to customer: $5
- Product COGS: -$20
- ShipStation postage cost: -$7.50
- Other costs: -$10
= Net profit: $17.50

Shipping margin: $5 (revenue) - $7.50 (cost) = -$2.50 (loss on shipping)
```

### Limitations
- Does ShipStation sync cover ALL carriers or only major carriers?
- Are return label costs tracked separately?
- Multi-package orders (split shipments) — how handled?

---

## ShipBob Integration (3PL)

### Availability
[Native / Zapier / Not Supported]

### Connection Setup
[ShipBob API connection]

### Data Synced FROM ShipBob
**3PL fees (critical for profit calculation):**
- **Pick & pack fee per order** (e.g., $3.50 per order)
- **Storage fees per SKU** (monthly fee per cubic foot or per unit)
- **Inbound freight fees** (receiving inventory)
- **Outbound shipping costs** (postage)
- **Returns processing fees**
- **Special handling fees** (kitting, gift wrap, etc.)

**Fulfillment data:**
- Order fulfillment status
- Shipment tracking
- Inventory levels at ShipBob warehouses

### Sync Details
- Sync frequency: [cadence]
- Fee invoice sync: [monthly? per-order?]

### Profit Calculation Impact
**3PL fees are complex:**
- **Per-order fees:** Pick & pack, shipping → easy to allocate to specific orders
- **Monthly fees:** Storage → how does BeProfit allocate storage fees? Per-unit sold that month? Or flat monthly expense?
- **Inbound freight:** Receiving 1000 units costs $500 → $0.50 per unit COGS increase

**Example calculation with 3PL:**
```
Order #1002 (fulfilled by ShipBob):
- Product revenue: $50
- Shipping charged: $5
- Product COGS: -$20
- ShipBob pick & pack: -$3.50
- ShipBob shipping: -$7.50
- Allocated storage fee: -$0.25 (if 1 unit stored 1 month)
- Other costs: -$10
= Net profit: $13.25
```

### Limitations
- Storage fee allocation method (per-unit, monthly total, or ignored?)
- Inbound freight allocation (spread across inventory, or one-time expense?)
- Multi-warehouse complexity (ShipBob has multiple fulfillment centers)

---

## [Other Shipping Platforms]

[Repeat structure for Shippo, EasyShip, Deliverr, etc.]

---

## Shipping Integration Comparison

### Platform Support Matrix

| Platform | Type | Native/Zapier | Data Synced | Fee Granularity | Tier Required |
|----------|------|---------------|-------------|-----------------|---------------|
| ShipStation | Shipping software | [Native/Zapier] | Postage costs, tracking | Per-order | [tier] |
| ShipBob | 3PL fulfillment | [Native/Zapier] | Pick/pack, storage, shipping | Per-order + monthly | [tier] |
| Shippo | Shipping API | [Native/Zapier] | Postage costs | Per-order | [tier] |
| EasyShip | Intl shipping | [Native/Zapier] | Postage, duties/customs | Per-order | [tier] |
| Deliverr | Fulfillment | [Native/Zapier] | Fulfillment fees, shipping | Per-order | [tier] |

### Automatic vs Manual Shipping Cost Entry

**Automatic (via integration):**
- Pro: Accurate, real-time
- Con: Requires shipping platform integration

**Manual entry:**
- Does BeProfit allow manual shipping cost entry if no integration?
- Bulk import via CSV?

**Shopify automatic:**
- If using Shopify Shipping, costs may auto-sync from Shopify (no ShipStation needed)

## Sync Architecture

### Shipping Cost Flow
```
Shipping Platform (ShipStation/ShipBob)
  ↓ [API sync, hourly/daily]
BeProfit database (shipping_costs table)
  ↓ [profit calculation engine]
Order profit updated (deduct shipping cost)
  ↓ [display]
Dashboard shows accurate profit per order
```

### Real-Time vs Batch Sync
- **Real-time:** Label created → immediate sync → profit updated within minutes
- **Batch:** Daily sync at midnight → profit calculations may lag 24 hours

Which model does BeProfit use?

## Inferred UI Elements

**Settings > Integrations:**
- Shipping section with ShipStation, ShipBob cards
- Connection status, last synced timestamp

**Order details page:**
- Shipping cost breakdown:
  - Shipping revenue (charged to customer): $5.00
  - Actual shipping cost: -$7.50
  - Net shipping profit: -$2.50

**Dashboard:**
- Total shipping costs (aggregate)
- Net shipping margin (total shipping revenue - total shipping costs)

**Reports:**
- Shipping efficiency report (orders with negative shipping margin)
- 3PL fee breakdown (pick/pack, storage, inbound)

## Data Model Implications

```typescript
// Shipping cost entity
interface ShippingCost {
  orderId: string; // links to Order entity
  platform: 'shipstation' | 'shipbob' | 'shopify_shipping' | 'manual';
  carrier: 'usps' | 'ups' | 'fedex' | 'dhl' | 'other';
  serviceClass: string; // "Priority Mail", "Ground", etc.
  postage: number; // actual cost paid
  trackingNumber: string;
  labelPurchasedAt: Date;
  weight: number; // ounces or grams
  packageCount: number; // 1 for single package, 2+ for split shipments
}

// 3PL fees (for ShipBob, Deliverr)
interface ThreePLFees {
  orderId: string;
  pickPackFee: number; // per-order
  shippingFee: number; // postage
  storageFeeAllocated: number; // monthly storage fee divided by units sold
  inboundFreightAllocated: number; // receiving cost per unit
  returnsFee?: number; // if order is returned
  specialHandlingFee?: number; // kitting, gift wrap
  totalFees: number; // sum of all fees
}

// Order profit calculation (incorporating shipping)
interface Order {
  // ... existing fields ...
  shippingRevenue: number; // what customer paid for shipping
  shippingCost: number; // actual postage cost (from ShipStation/ShipBob)
  shippingProfit: number; // shippingRevenue - shippingCost
  threePLFees: number; // pick/pack, storage (from ShipBob)
  netProfit: number; // revenue - COGS - shippingCost - threePLFees - adSpend - otherCosts
}
```

## Limitations & Gaps Identified

**Unanswered questions:**
- Does BeProfit natively support ShipStation and ShipBob, or Zapier only?
- How does BeProfit allocate 3PL storage fees (per-unit sold, monthly flat fee, or ignored)?
- Can BeProfit handle multi-package orders (split shipments with multiple tracking numbers)?
- Are return shipping costs tracked separately?
- Does BeProfit sync Shopify Shipping costs automatically (if no third-party shipping platform)?
- International shipping: are duties/customs fees tracked?

## Relevance to Our Build

**Critical for profit accuracy:**
1. **Shipping costs are often underestimated** by merchants. Many assume "customer paid $5 for shipping, so shipping is $5 cost" — but actual postage may be $7-10.
2. **3PL fees are complex** and vary by order (pick/pack), month (storage), and shipment (inbound freight). Accurate allocation is hard.
3. **Free shipping orders** lose money on shipping — this must be visible to merchants.

**MVP requirements:**
- ShipStation integration (most popular multi-carrier software)
- ShipBob integration (popular 3PL for Shopify sellers)
- Shopify Shipping auto-sync (many small stores use Shopify's built-in shipping)

**Phase 2:**
- Shippo, EasyShip, Deliverr integrations
- Manual shipping cost entry (for stores without integrations)
- International shipping cost tracking (duties, customs)

**Competitive opportunities:**
- If BeProfit has weak 3PL tracking, we can differentiate with granular fee breakdowns
- Real-time shipping cost sync (vs batch)
- Shipping efficiency reports (flag orders with negative shipping margin)
- Storage fee allocation transparency (show exactly how monthly fees are divided)

**Technical challenges:**
- Matching shipping costs to orders (order ID mapping across platforms)
- Handling multi-package orders (1 order = 2-3 shipments)
- Allocating monthly 3PL fees (storage, account fees) to individual orders or products
- Supporting dozens of carriers (ShipStation supports 40+ carriers globally)
```

**Integration with existing codebase:**
- Cross-reference file 032 (Shopify) — Shopify Shipping costs may auto-sync
- Cross-reference file 034 (Amazon) — Amazon FBA fulfillment fees documented there
- Note: ShipBob/3PL fees similar to Amazon FBA fees (fulfillment + storage)

**Estimated browsing effort:** 6-10 web pages (Help Center, marketing site, ShipStation/ShipBob searches).

**Expected output:** 500-700 line markdown file.

- [ ] Checkpoint: Step 3 complete

---

### Step 4: Research Accounting & Other Integrations (File 042)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-042.md` (CREATE)

Browse all sources to document accounting integrations and ANY remaining integrations not covered in files 031-041:
- **BeProfit Help Center:** Search "accounting", "QuickBooks", "Xero", "Zapier", "API", "webhooks"
- **File 031:** Cross-reference for complete integration list
- **BeProfit Marketing Site:** Integrations page for full list

**Platforms/categories to research:**

1. **Accounting platforms:**
   - QuickBooks Online
   - Xero
   - Wave
   - FreshBooks
   - Sage

2. **Payment processors** (if not covered by e-commerce platform integration):
   - Stripe (transaction fees)
   - PayPal (transaction fees)
   - Square
   - Authorize.net

3. **Subscription management** (for recurring revenue businesses):
   - Recharge (Shopify subscriptions)
   - Bold Subscriptions
   - Recurly

4. **Review/loyalty platforms:**
   - Yotpo (reviews + loyalty)
   - Smile.io (loyalty)
   - Stamped.io (reviews)

5. **Inventory management:**
   - TradeGecko / QuickBooks Commerce
   - SkuVault
   - Cin7

6. **Other integrations:**
   - Zapier (catch-all for unsupported platforms)
   - API / Webhooks (custom integrations)
   - CSV import (manual data entry)

**Research methodology:**

For **accounting platforms**:
- Does BeProfit PUSH data to accounting software (e.g., sync orders to QuickBooks as invoices)?
- Or PULL data (e.g., import expense data from QuickBooks)?
- Likely: one-way push (BeProfit → accounting) for bookkeeping, not two-way

For **payment processors**:
- Does BeProfit sync transaction fees from Stripe/PayPal?
- Or are fees auto-captured from Shopify/WooCommerce order data?

For **other platforms**:
- Native integration or Zapier?
- What data flows in/out?

**Document structure:**

```markdown
# BeProfit Accounting & Other Integrations

## Source
- **URLs:** [list all browsed URLs]
- **Category:** Integrations / Accounting & Other
- **Date Captured:** 2026-02-13

---

## Overview
This document covers accounting integrations, payment processor integrations, and any remaining integrations not covered in files 031-041 (e-commerce, ads, email/SMS, shipping).

## Accounting Integrations

### Why Accounting Integrations Matter
**Use case:** Merchants want to sync BeProfit profit data to their accounting software (QuickBooks, Xero) for bookkeeping and tax purposes.

**Sync direction:** Likely one-way (BeProfit → accounting software)
- BeProfit pushes orders, revenue, expenses to QuickBooks as journal entries or invoices
- Enables merchants to use BeProfit as source of truth for e-commerce accounting

### QuickBooks Online Integration

#### Availability
- Status: [Native / Via Zapier / Not Supported]
- Tier Required: [plan level]

#### Connection Setup
[OAuth flow to connect QuickBooks account]

#### Data Synced TO QuickBooks
**What BeProfit exports:**
- Orders as invoices (revenue)
- Expenses as bills or journal entries (COGS, ad spend, shipping costs)
- Product catalog (items/services)
- Customer data (optional)

**Sync frequency:**
- [Real-time / Daily batch / Manual export]

#### Data Synced FROM QuickBooks (if applicable)
**What BeProfit imports:**
- Business expenses not tracked elsewhere (rent, utilities, salaries)
- Tax payments
- Loan payments

[Determine if BeProfit imports from QuickBooks or only exports TO QuickBooks]

#### Limitations
- Does BeProfit sync ALL expenses (ad spend, shipping, COGS) or only order revenue?
- Are profit calculations synced as custom fields in QuickBooks?
- Historical data: full sync or forward-only?

---

### Xero Integration

[Same structure as QuickBooks]

**Key differences from QuickBooks to note:**
- Xero popular outside US (UK, AU, NZ)
- Different API capabilities

---

### Other Accounting Platforms

**Wave, FreshBooks, Sage:**
- [Native / Zapier / Not Supported]
- [Brief notes on each if supported]

---

## Payment Processor Integrations

### Stripe Integration

#### Purpose
**Why sync Stripe separately from e-commerce platform?**
- Capture Stripe transaction fees (2.9% + $0.30 per transaction)
- If not already synced via Shopify/WooCommerce, Stripe integration ensures fees are tracked

#### Availability
[Native / Zapier / Not Supported / Redundant (fees from Shopify)]

#### Data Synced
- Transaction fees per order
- Payout amounts (gross revenue vs net after fees)
- Refund fees
- Chargeback fees

#### Sync Details
[Frequency, method]

#### Profit Calculation Impact
```
Order #1003:
- Product revenue: $50
- Stripe fee (2.9% + $0.30): -$1.76
- Net revenue after payment processing: $48.24
- (subtract COGS, ad spend, shipping, etc.)
= Net profit: $XX
```

**Question:** Are Stripe fees already captured in Shopify order data, or does BeProfit need separate Stripe integration?

---

### PayPal Integration

[Same structure as Stripe]

**PayPal-specific considerations:**
- PayPal fees vary (2.9% + $0.30 domestic, higher for international)
- Currency conversion fees (if customer pays in different currency)
- PayPal Goods & Services vs Friends & Family (should only track Goods & Services)

---

### Other Payment Processors

**Square, Authorize.net, others:**
- [Brief notes on support status]

---

## Subscription Management Integrations

### Recharge Integration (Shopify Subscriptions)

#### Purpose
**Why subscriptions matter:**
- Subscription businesses have recurring revenue (MRR)
- Churn tracking, LTV calculation
- Subscription-specific metrics (subscriber count, churn rate, MRR growth)

#### Availability
[Native / Zapier / Not Supported / Auto via Shopify]

#### Data Synced
- Active subscriptions count
- MRR (Monthly Recurring Revenue)
- Churn rate (cancellations)
- LTV per subscriber
- Subscription orders (treated as regular orders or separate?)

#### Profit Calculation for Subscriptions
[Does BeProfit calculate profit per subscriber? LTV profit?]

---

### Other Subscription Platforms

**Bold Subscriptions, Recurly:**
- [Brief notes]

---

## Review & Loyalty Platform Integrations

### Yotpo / Smile.io / Stamped.io

#### Purpose
[Do these integrations exist? Likely not directly integrated, but mentioned for completeness]

**Potential data:**
- Loyalty program costs (reward redemptions reduce profit)
- Review-driven conversions (attribution)

[Likely not supported — note this explicitly if true]

---

## Inventory Management Integrations

### TradeGecko / QuickBooks Commerce

#### Purpose
**Why inventory management platforms?**
- More accurate COGS tracking (inventory valuation)
- Real-time inventory sync across channels

#### Availability
[Native / Zapier / Not Supported]

[Likely not supported — BeProfit gets inventory from Shopify/WooCommerce directly]

---

## Zapier Integration (Long-Tail Platforms)

### Overview
**What is Zapier integration?**
- Zapier connects 3,000+ apps via no-code automation
- BeProfit may offer Zapier integration for platforms without native integrations

### How It Works
1. User creates Zap: "When order is placed in Shopify → Send to BeProfit"
2. OR: "When BeProfit calculates profit → Send to Google Sheets"

### BeProfit Zapier Triggers (if available)
- New order profit calculated
- Daily profit summary
- [Other events]

### BeProfit Zapier Actions (if available)
- Import custom expense
- Update COGS
- [Other actions]

### Limitations
- Zapier is manual setup (not turnkey like native integrations)
- Rate limits (depends on Zapier plan)
- Data sync may be less reliable than native

---

## API & Webhooks (Custom Integrations)

### BeProfit API (if exists)
**Does BeProfit offer a public API for custom integrations?**
- Read endpoints: fetch profit data, order data, reports
- Write endpoints: push custom expenses, update COGS

[Likely NO public API based on typical SaaS profit analytics tools]

### Webhooks (if exists)
**Does BeProfit send webhooks on events?**
- `profit_calculated` webhook → trigger when order profit is calculated
- `daily_summary` webhook → send daily report to external system

[Likely NO webhooks — note this if true]

---

## CSV Import/Export

### Manual Data Import
**Can users manually import data via CSV?**
- Import custom expenses (Google Ads spend if no native integration)
- Import COGS (product costs in bulk)
- Import order data (if not using e-commerce platform integration)

### Data Export
**Can users export BeProfit data via CSV?**
- Export all orders with profit calculations
- Export expense breakdown
- Export for tax/accounting purposes

---

## Integration Gaps & Missing Platforms

**Platforms NOT supported (notable omissions):**
- [List major platforms discovered to be unsupported]
- Examples: LinkedIn Ads (B2B), Twitter/X Ads, Reddit Ads, QuickBooks Commerce, NetSuite, etc.

**Categories without integrations:**
- Affiliate marketing platforms (ShareASale, CJ Affiliate)
- Phone/call tracking (CallRail)
- Live chat (Intercom, Drift)

[These omissions may be intentional — BeProfit focuses on core profit drivers, not peripheral tools]

---

## Integration Summary Matrix

| Category | Platforms Supported | Integration Type | Data Flow | Critical for Profit? |
|----------|-------------------|------------------|-----------|---------------------|
| E-commerce | Shopify, WooCommerce, Amazon | Native | Platform → BeProfit | YES |
| Ad Platforms | Facebook, Google, TikTok, etc. | Native | Platform → BeProfit | YES |
| Email/SMS | Klaviyo, Mailchimp, etc. | Native / Zapier | Platform → BeProfit | YES |
| Shipping | ShipStation, ShipBob | Native / Zapier | Platform → BeProfit | YES |
| Accounting | QuickBooks, Xero | Native / Zapier | BeProfit → Platform | NO (export only) |
| Payment | Stripe, PayPal | [?] | Platform → BeProfit | MAYBE (if fees not in Shopify) |
| Subscriptions | Recharge | [?] | Platform → BeProfit | MAYBE (if subscription business) |
| Inventory | [?] | [?] | N/A | NO (gets from e-commerce platform) |
| Zapier | Any app | Third-party | Bi-directional | NO (fallback) |
| API/Webhooks | Custom | [?] | Varies | NO (advanced) |

---

## Inferred UI Elements

**Settings > Integrations:**
- Accounting section: QuickBooks, Xero cards
- Payment section: Stripe, PayPal cards (if supported)
- Zapier card: "Connect 3,000+ apps via Zapier"
- API/Webhooks section: API key management (if public API exists)

**Data import/export:**
- "Import CSV" button for custom expenses
- "Export to CSV" button for profit reports

---

## Data Model Implications

```typescript
// Accounting integration
interface AccountingConnection {
  platform: 'quickbooks' | 'xero' | 'wave';
  companyId: string;
  accessToken: string;
  syncDirection: 'to_accounting' | 'from_accounting' | 'bidirectional';
  syncFrequency: 'realtime' | 'daily' | 'manual';
  lastSyncedAt: Date;
}

// Custom expense (manual entry or API)
interface CustomExpense {
  expenseId: string;
  name: string; // "Google Ads - Manual", "Office Rent", etc.
  amount: number;
  date: Date;
  category: 'advertising' | 'shipping' | 'overhead' | 'other';
  allocationType: 'per_order' | 'monthly_total' | 'per_product';
  source: 'manual' | 'csv' | 'api' | 'zapier';
}

// Payment processor fees (if tracked separately from e-commerce platform)
interface PaymentProcessorFee {
  orderId: string;
  processor: 'stripe' | 'paypal' | 'square';
  transactionFee: number; // percentage + fixed fee
  currencyConversionFee?: number; // if international
  chargebackFee?: number; // if chargeback occurred
  totalFee: number;
}
```

---

## Limitations & Gaps Identified

**Unanswered questions:**
- Does BeProfit have QuickBooks/Xero integrations, or is accounting sync manual (CSV export)?
- Are Stripe/PayPal fees synced separately, or already captured in Shopify/WooCommerce data?
- Does BeProfit offer a public API for custom integrations?
- Does BeProfit send webhooks?
- Can users import custom expenses via CSV?
- Is Zapier integration available?

---

## Relevance to Our Build

**Strategic decisions:**

1. **Accounting integrations:**
   - Low priority for MVP (merchants can export CSV for bookkeeping)
   - Phase 2: QuickBooks/Xero one-way export (BeProfit → accounting)
   - Phase 3: Two-way sync (import business expenses from accounting software)

2. **Payment processor fees:**
   - Critical: Ensure Stripe/PayPal fees are tracked (either from e-commerce platform or direct integration)
   - Many merchants don't realize 2.9% + $0.30 per transaction adds up significantly

3. **Zapier:**
   - Nice-to-have for MVP (broadens platform support with minimal dev effort)
   - Allows users to connect unsupported platforms
   - Trade-off: less reliable than native, but much faster to "support" 3,000+ apps

4. **API/Webhooks:**
   - Phase 3 (advanced users, agencies, custom integrations)
   - Not critical for MVP

**Competitive opportunities:**
- If BeProfit lacks QuickBooks/Xero export, we can differentiate with one-click export
- If BeProfit doesn't track payment processor fees accurately, we can highlight this
- Public API could be a differentiator for agencies and developers

**Technical challenges:**
- Accounting integrations are complex (different chart of accounts per business)
- Payment processor fee calculation (varies by transaction type, currency, etc.)
- API design (if offering public API)
```

**Integration with existing codebase:**
- Cross-reference file 031 for complete integration list
- Note which integrations are "missing" from BeProfit (gaps we can exploit)

**Estimated browsing effort:** 8-12 web pages (Help Center, marketing site, accounting/payment searches, Zapier search).

**Expected output:** 500-700 line markdown file.

- [ ] Checkpoint: Step 4 complete

---

### Step 5: Research Data Sync & Refresh Documentation (File 043)
**Files:** `dtcdashboard_app/casestudy/beprofit-casestudy-info-043.md` (CREATE)

Browse all sources to document HOW data syncing works globally across ALL integrations:
- **BeProfit Help Center:** Search "sync", "refresh", "data sync", "real-time", "update"
- Look for articles like "How often does BeProfit sync data?", "Manual refresh", "Sync troubleshooting"
- **Cross-reference files 031-042:** Note sync frequency mentioned for each integration

**Research methodology:**

1. **Global sync architecture:**
   - How does BeProfit's sync engine work?
   - Webhook-based (real-time) vs batch sync (scheduled)?
   - Sync priority (orders synced first, then products, then ad data?)

2. **Sync schedules:**
   - Real-time integrations (which platforms?)
   - Hourly batch sync (which platforms?)
   - Daily batch sync (which platforms?)
   - Manual-only (which platforms?)

3. **Manual refresh options:**
   - Can users trigger manual sync?
   - Location of "Sync Now" button (Settings > Integrations? Dashboard?)
   - Rate limits (can user click "Sync Now" every 5 minutes, or daily limit?)

4. **Data freshness guarantees:**
   - How fresh is data in BeProfit vs source platform?
   - Typical delay (e.g., "2-6 hours behind Shopify")
   - Attribution finalization delay (ad conversions may take 24-48 hours)

5. **Historical data import:**
   - Initial sync: how far back does BeProfit pull data?
   - Per-integration limits (Shopify: all-time, Amazon: 90 days, Google Ads: 30 days?)
   - Can user resync historical data after initial setup?

6. **Sync error handling:**
   - What happens when sync fails? (OAuth token expired, API rate limit hit)
   - Error notifications (email, in-app alert?)
   - Retry mechanism (automatic retry, or manual reconnect required?)
   - Partial sync (if some data syncs successfully, does it still save, or all-or-nothing?)

7. **Data consistency:**
   - How does BeProfit handle data changes retroactively? (e.g., order refunded 2 days after initial sync)
   - Does BeProfit update historical orders, or only forward sync?
   - If ad attribution changes (conversion window finalizes), does BeProfit retroactively update profit calculations?

**Document structure:**

```markdown
# BeProfit Data Sync & Refresh Documentation

## Source
- **URLs:** [list all browsed URLs]
- **Category:** System Architecture / Data Synchronization
- **Date Captured:** 2026-02-13

---

## Overview
This document explains how BeProfit syncs data from all connected integrations (e-commerce platforms, ad platforms, email/SMS, shipping, accounting, etc.) and how data freshness is maintained.

## Global Sync Architecture

### How Data Flows Into BeProfit

```
External Platforms (Shopify, Facebook Ads, Klaviyo, etc.)
  ↓
BeProfit Sync Engine
  ├─ Real-time webhooks (for supported platforms)
  ├─ Scheduled batch sync (hourly, daily)
  └─ Manual refresh (user-triggered)
  ↓
BeProfit Database (orders, products, ad spend, expenses, etc.)
  ↓
Profit Calculation Engine (recalculates profit when new data arrives)
  ↓
Dashboard & Reports (display updated data)
```

### Sync Methods

**1. Real-Time Webhooks (event-driven):**
- Supported platforms: [Shopify?, WooCommerce?]
- How it works: Platform sends webhook to BeProfit when event occurs (order created, order updated, refund processed)
- Latency: 1-5 minutes
- Pros: Immediate updates, no batch delay
- Cons: Limited to platforms with webhook support, requires webhook infrastructure

**2. Batch Sync (scheduled polling):**
- Supported platforms: [Most ad platforms, email platforms, shipping]
- How it works: BeProfit polls platform API on schedule (every hour, every day)
- Latency: Up to sync interval (hourly sync = max 1 hour delay)
- Pros: Works with all platforms (no webhook required)
- Cons: Delayed data

**3. Manual Refresh (user-triggered):**
- Available for: [All integrations?]
- How it works: User clicks "Sync Now" button → BeProfit immediately polls platform API
- Latency: 1-5 minutes
- Pros: On-demand updates
- Cons: User must manually trigger, rate limits may apply

---

## Sync Schedules by Integration

### E-Commerce Platforms

**Shopify:**
- Order data: Real-time via webhook (1-5 minutes)
- Product catalog: Hourly batch sync
- Refunds: Real-time via webhook
- Historical import: All-time (no limit)

**WooCommerce:**
- Order data: [Real-time webhooks OR batch sync?]
- Product catalog: [Hourly?]
- Refunds: [Real-time or batch?]
- Historical import: [All-time or limited?]

**Amazon:**
- Order data: Daily batch sync (Amazon API rate limits)
- Product catalog: Daily
- Fees: Daily (after Amazon fee reports are generated)
- Historical import: 90 days (Amazon SP-API limit)

### Ad Platforms

**Facebook Ads:**
- Ad spend data: Hourly batch sync
- Conversion data: Hourly (but conversions may finalize over 24-48 hours due to attribution window)
- Historical import: 90 days

**Google Ads:**
- Ad spend data: Daily batch sync
- Conversion data: Daily (conversion import lag may cause delays)
- Historical import: 30 days

**TikTok Ads:**
- Ad spend data: Daily batch sync
- Conversion data: Daily
- Historical import: 90 days (estimate)

### Email/SMS Platforms

**Klaviyo:**
- Campaign data: Hourly batch sync
- Flow data: Daily batch sync
- Historical import: 90 days (estimate)

**Other email platforms:**
- [Daily batch sync likely]

### Shipping Platforms

**ShipStation:**
- Label purchases: [Real-time webhook OR hourly batch?]
- Historical import: [90 days?]

**ShipBob:**
- Fulfillment data: Daily batch sync
- Fee invoices: Monthly (when ShipBob generates invoices)

### Accounting Platforms

**QuickBooks / Xero:**
- Sync direction: BeProfit → accounting (export only?)
- Sync frequency: [Daily export OR manual?]

---

## Manual Refresh Options

### Where to Trigger Manual Sync

**Settings > Integrations page:**
- Each integration card has "Sync Now" button
- Clicking triggers immediate sync for that integration

**Dashboard:**
- Global "Refresh Data" button (syncs all integrations)

### Rate Limits on Manual Sync

**Per-integration limits:**
- Can only manually sync once every [15 minutes? 1 hour?] to avoid API rate limit abuse
- If user clicks "Sync Now" too frequently, error message: "Sync already in progress, please wait"

**Global limit:**
- Max X manual syncs per day across all integrations (to prevent API quota exhaustion)

---

## Data Freshness & Latency

### Typical Freshness by Data Type

**Order data:**
- Shopify: 1-5 minutes (real-time webhook)
- WooCommerce: [5-60 minutes?]
- Amazon: 24 hours (daily batch sync)

**Ad spend data:**
- Facebook Ads: 1-2 hours (hourly batch)
- Google Ads: 24 hours (daily batch)

**Conversion attribution:**
- Facebook Ads: 24-48 hours (attribution window finalization)
- Google Ads: 24-72 hours (conversion import lag)

**Shipping costs:**
- ShipStation: [1-2 hours?]
- ShipBob: 24 hours

**Email campaign data:**
- Klaviyo: 1-2 hours

### "Last Synced" Timestamps

**Where displayed:**
- Settings > Integrations: Each integration card shows "Last synced: 15 minutes ago"
- Dashboard: Global "Data last updated: 30 minutes ago"

### Data Staleness Alerts

**Does BeProfit alert users if data is stale?**
- Example: "Google Ads data is 3 days old — reconnect integration"
- Email notification if sync fails for 24+ hours

---

## Historical Data Import

### Initial Sync: How Far Back?

**Per-integration historical data import:**

| Integration | Historical Range | Notes |
|-------------|------------------|-------|
| Shopify | All-time | No limit (can import 5+ years of orders) |
| WooCommerce | All-time | No limit |
| Amazon | 90 days | SP-API limitation |
| Facebook Ads | 90 days | Sufficient for most businesses |
| Google Ads | 30 days | Limited (conversion data only recent) |
| TikTok Ads | 90 days | Estimate |
| Klaviyo | 90 days | Estimate |
| ShipStation | 90 days | Estimate |
| ShipBob | 30 days | Estimate (recent invoices only) |

**Initial sync duration:**
- Depends on data volume
- Small store (100 orders): 5-10 minutes
- Medium store (10,000 orders): 30-60 minutes
- Large store (100,000+ orders): 2-6 hours

**Progress indicator:**
- During initial sync, dashboard shows: "Syncing Shopify data... 45% complete"

### Re-Import Historical Data

**Can users trigger re-import after initial setup?**
- Example use case: User connected BeProfit, then later added COGS to products → wants to recalculate historical profit
- "Re-sync Historical Data" button in Settings?
- OR: Manual CSV import for backfill

---

## Sync Error Handling

### Common Sync Errors

**OAuth token expired:**
- Cause: User revoked permissions, or token expired after 90 days
- Symptom: Sync stops, data becomes stale
- Error message: "Facebook Ads connection expired — reconnect now"
- Resolution: User clicks "Reconnect" → OAuth flow

**API rate limit exceeded:**
- Cause: Too many sync requests (manual syncs, or platform rate limit hit)
- Symptom: Sync fails with "429 Too Many Requests" error
- Resolution: BeProfit automatically retries after [15 minutes? 1 hour?]

**Platform API downtime:**
- Cause: Shopify/Facebook/Google API is down
- Symptom: Sync fails with "503 Service Unavailable" error
- Resolution: BeProfit automatically retries every [15 minutes?] until success

**Invalid credentials:**
- Cause: User changed password, or integration was disconnected on platform side
- Symptom: Sync fails with "401 Unauthorized" error
- Resolution: User must reconnect integration

### Error Notifications

**How users are notified of sync errors:**
- **In-app alert:** Red banner on dashboard: "Google Ads sync failed — click to reconnect"
- **Email notification:** "Your BeProfit account has a sync issue with Facebook Ads"
- **Integration card status:** Settings > Integrations shows red "Error" badge on affected integration

### Automatic Retry Mechanism

**Does BeProfit automatically retry failed syncs?**
- Yes: Exponential backoff retry (15 min, 30 min, 1 hour, 2 hours)
- Max retries: [3-5 attempts?] before requiring manual intervention
- Partial sync success: If orders sync but ad spend fails, BeProfit saves order data and retries ad spend

### Partial Sync Handling

**What happens if only SOME data syncs successfully?**
- Example: 1,000 orders to sync, 950 succeed, 50 fail
- BeProfit saves the 950 successful orders
- Logs failed order IDs for manual review or retry
- Dashboard shows: "Partial sync: 950/1,000 orders synced"

---

## Retroactive Data Updates

### Handling Changes to Historical Orders

**Scenario 1: Order refunded 2 days after initial sync**
- Shopify sends "order.refunded" webhook → BeProfit updates order profit → historical report recalculates

**Scenario 2: Ad conversion attribution finalizes 48 hours later**
- Google Ads initially reports 10 conversions, but 48 hours later reports 12 conversions (delayed attribution)
- Does BeProfit retroactively update profit calculations?
- YES (likely): Daily batch sync updates conversion counts → profit recalculates
- OR NO: Conversions only counted on day they finalize (not retroactive)

### Data Consistency Guarantee

**Does BeProfit guarantee eventual consistency?**
- Example: User views report on Monday (shows $10,000 profit). On Tuesday, refund processed (profit drops to $9,500). Does Monday's report retroactively update?
- Likely: Historical reports are IMMUTABLE (Monday report always shows $10,000, Tuesday report shows $9,500)
- OR: Historical reports UPDATE retroactively (Monday report now shows $9,500 after refund)

[Need to confirm BeProfit's approach — immutable snapshots vs live recalculations]

---

## Sync Performance & Scalability

### How BeProfit Handles High-Volume Stores

**Large store challenges:**
- 100,000+ orders
- 10,000+ products
- 1,000+ ad campaigns

**Sync optimizations:**
- Incremental sync (only sync new/updated data, not full catalog every time)
- Parallel sync (sync orders + products + ad spend simultaneously)
- Pagination (API calls paginated to handle large datasets)

### Sync Queue & Priority

**Does BeProfit prioritize certain data types?**
- Priority 1: Orders (revenue data)
- Priority 2: Refunds (impact profit immediately)
- Priority 3: Ad spend (cost data)
- Priority 4: Product catalog (less time-sensitive)

**Sync queue visibility:**
- Does user see "Sync queue: 3 integrations pending"?

---

## Inferred UI Elements

**Settings > Integrations:**
- Each integration card shows:
  - Connection status: "Connected", "Error", "Disconnected"
  - Last synced timestamp: "Last synced: 15 minutes ago"
  - "Sync Now" button
  - "Reconnect" button (if error)

**Dashboard:**
- Global data freshness indicator: "Data last updated: 30 minutes ago"
- "Refresh Data" button (syncs all integrations)
- Sync status badge: "Syncing..." with spinner during active sync

**Sync error banner:**
- Red banner at top of dashboard: "Facebook Ads sync failed — click to reconnect"

**Sync history page (if exists):**
- Log of all sync events (timestamp, integration, status, records synced)
- Example: "2026-02-13 10:30 AM — Shopify — Success — 120 orders synced"

---

## Data Model Implications

```typescript
// Sync log entity
interface SyncLog {
  syncId: string;
  integration: string; // 'shopify', 'facebook_ads', 'klaviyo', etc.
  syncType: 'initial' | 'scheduled_batch' | 'manual' | 'webhook';
  startedAt: Date;
  completedAt: Date;
  status: 'success' | 'partial_success' | 'failed';
  recordsSynced: number; // number of orders, products, campaigns synced
  recordsFailed: number;
  errorMessage?: string;
  retryCount: number;
  nextRetryAt?: Date; // if failed, when to retry
}

// Integration status entity
interface IntegrationStatus {
  integration: string;
  connectionStatus: 'connected' | 'error' | 'disconnected';
  lastSyncedAt: Date;
  lastSuccessfulSyncAt: Date;
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'manual';
  dataFreshness: number; // seconds since last sync
  errorCount: number; // consecutive failures
  errorMessage?: string;
}

// Sync queue (for async processing)
interface SyncQueue {
  queueId: string;
  integration: string;
  priority: 1 | 2 | 3; // 1 = high (orders), 2 = medium (ad spend), 3 = low (products)
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
}
```

---

## Limitations & Gaps Identified

**Unanswered questions:**
- Does BeProfit use real-time webhooks for Shopify, or hourly batch sync?
- What is the exact sync frequency for each ad platform (hourly vs daily)?
- Does BeProfit retroactively update historical reports when data changes (refunds, attribution finalization)?
- What is the automatic retry mechanism for failed syncs (exponential backoff, max retries)?
- Can users trigger re-import of historical data after initial setup?
- Is there a sync queue dashboard showing pending/in-progress syncs?

---

## Relevance to Our Build

**Critical for our competing product:**

1. **Real-time sync is a competitive advantage** — if BeProfit uses batch sync for orders, we can differentiate with real-time webhooks (1-5 minute latency vs 1-hour latency).

2. **Manual refresh UX** — users want control. Clear "Sync Now" button on each integration, with real-time progress indicator.

3. **Sync error handling** — graceful error messages, automatic retries, email notifications. Many SaaS tools fail silently, causing stale data.

4. **Historical data import flexibility** — allow users to re-import historical data (e.g., if they add COGS later and want to recalculate old orders).

5. **Data consistency strategy** — decide: immutable snapshots (historical reports never change) vs live recalculations (historical reports update when data changes). Both have pros/cons.

**MVP requirements:**
- Real-time webhook sync for Shopify (most critical platform)
- Hourly batch sync for ad platforms (Facebook, Google, TikTok)
- Manual "Sync Now" button for all integrations
- Sync error notifications (in-app + email)
- Automatic retry with exponential backoff

**Phase 2:**
- Sync history log (all sync events visible to user)
- Re-import historical data feature
- Sync queue dashboard (show pending syncs)

**Competitive opportunities:**
- If BeProfit has hourly sync for Shopify, we can beat with real-time (1-5 min)
- If BeProfit has poor error handling (silent failures), we can excel with proactive notifications
- If BeProfit can't re-import historical data, we can offer this flexibility

**Technical challenges:**
- Webhook infrastructure (receiving, validating, processing webhooks at scale)
- API rate limit management (throttling, queueing, exponential backoff)
- Handling eventual consistency (data changes retroactively)
- Sync queue architecture (priority queue, parallel processing, failure recovery)
```

**Integration with existing codebase:**
- Cross-reference ALL previous integration files (031-042) for sync frequency details
- Synthesize sync frequency table from all integration docs

**Estimated browsing effort:** 6-10 web pages (Help Center search for "sync", "refresh", "data freshness", cross-reference all integration articles).

**Expected output:** 600-800 line markdown file (this is a comprehensive systems architecture document).

- [ ] Checkpoint: Step 5 complete

---

### Step 6: Update PRD Progress & Task Completion
**Files:**
- `prd/detailed_prd_part_03.md` (MODIFY — Progress section only)
- `task-plans/011task-planning.md` (MODIFY — Status section)

After completing all 5 research files (039-043), update documentation:

**A. Update PRD Part 03 Progress section:**

Add Task 011 entry and update cumulative progress:

```markdown
### Task 011 - 2026-02-13
- Status: COMPLETED
- Summary: Created comprehensive research for email/SMS integrations (Klaviyo + others), shipping platforms (ShipStation, ShipBob), accounting integrations (QuickBooks, Xero), other integrations (payment processors, Zapier), and global data sync architecture
- Files changed:
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-039.md` (~XXX lines — Klaviyo Integration)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-040.md` (~XXX lines — Other Email/SMS Integrations)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-041.md` (~XXX lines — Shipping Platform Integrations)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-042.md` (~XXX lines — Accounting & Other Integrations)
  - Created `dtcdashboard_app/casestudy/beprofit-casestudy-info-043.md` (~XXX lines — Data Sync & Refresh Documentation)

### Cumulative Progress
- [x] Task 1: Integration Ecosystem Overview - completed in Task 009
- [x] Task 2: Shopify Integration - completed in Task 009
- [x] Task 3: WooCommerce Integration - completed in Task 009
- [x] Task 4: Amazon Integration - completed in Task 009
- [x] Task 5: Facebook/Meta Ads Integration - completed in Task 010
- [x] Task 6: Google Ads Integration - completed in Task 010
- [x] Task 7: TikTok Ads Integration - completed in Task 010
- [x] Task 8: Other Ad Platform Integrations - completed in Task 010
- [x] Task 9: Klaviyo Integration - completed in Task 011
- [x] Task 10: Other Email/SMS Integrations - completed in Task 011
- [x] Task 11: Shipping Platform Integrations - completed in Task 011
- [x] Task 12: Accounting & Other Integrations - completed in Task 011
- [x] Task 13: Data Sync & Refresh Documentation - completed in Task 011
- [ ] Task 14: Integration Comparison Matrix - NOT STARTED
- [ ] Task 15: Checkpoint Review #3 - NOT STARTED

### Remaining Work for This PRD
2 of 15 tasks remaining (Tasks 14-15). Estimated 1 more task to complete PRD Part 03.
```

**B. Update this task file's Status section:**

```markdown
## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-13T[HH:MM:SS]Z
```

**C. Add Completion section to this task file (at end):**

```markdown
## Completion

**Status:** COMPLETED
**Date:** 2026-02-13
**PRD Part:** 03
**Summary:** Created comprehensive research documentation for BeProfit's email/SMS marketing integrations, shipping platform integrations, accounting integrations, other integrations (payment processors, subscriptions, Zapier, API), and global data synchronization architecture.

### Requirements Completed by This Task
- [x] Task 9: Klaviyo Integration (file 039, XXX lines)
- [x] Task 10: Other Email/SMS Integrations (file 040, XXX lines)
- [x] Task 11: Shipping Platform Integrations (file 041, XXX lines)
- [x] Task 12: Accounting & Other Integrations (file 042, XXX lines)
- [x] Task 13: Data Sync & Refresh Documentation (file 043, XXX lines)

### PRD Status After This Task
- Requirements completed by this task: 5
- Total PRD requirements completed (cumulative): 13 (Tasks 1-13)
- Requirements remaining: 2 (Tasks 14-15)
- PRD completion: ONGOING (87% complete)

### Files Created
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-039.md` (XXX lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-040.md` (XXX lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-041.md` (XXX lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-042.md` (XXX lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-043.md` (XXX lines)

Total: XXXX lines of comprehensive integration research documentation

### Key Insights
[To be filled during implementation — summary of major findings from this batch]

### Next Task
Task 012 will cover:
- Integration Comparison Matrix (file 044)
- Checkpoint Review #3 (file 045)
- This will complete PRD Part 03 (100%)
```

Use the Edit tool to modify ONLY the specified sections. Do NOT change other parts of the files.

- [ ] Checkpoint: Step 6 complete

---

## Acceptance Criteria
- [ ] `beprofit-casestudy-info-039.md` exists with comprehensive Klaviyo documentation (connection setup, campaign/flow data, attribution, SMS support)
- [ ] `beprofit-casestudy-info-040.md` exists with documentation of all other email/SMS platforms (Mailchimp, Omnisend, Postscript, Attentive, etc.) and feature parity matrix
- [ ] `beprofit-casestudy-info-041.md` exists with shipping integration documentation (ShipStation, ShipBob, etc.) emphasizing profit calculation impact (shipping costs, 3PL fees)
- [ ] `beprofit-casestudy-info-042.md` exists with accounting integrations (QuickBooks, Xero), payment processor integrations (Stripe, PayPal), and other integrations (Zapier, API, CSV)
- [ ] `beprofit-casestudy-info-043.md` exists with comprehensive data sync architecture documentation (sync schedules, manual refresh, error handling, historical import, retroactive updates)
- [ ] All files follow the established template format (Source, main sections, Inferred UI Elements, Data Model Implications, Limitations & Gaps, Relevance to Our Build)
- [ ] Per-integration capture checklist items are addressed where applicable
- [ ] Files cross-reference each other (file 043 references sync details from files 031-042)
- [ ] PRD Part 03 progress updated showing Tasks 9-13 complete, 2 tasks remaining

## Notes
- This is the third and penultimate batch of PRD Part 03. The PRD has 15 tasks total; this task covers Tasks 9-13 (33% of PRD, 5 tasks).
- File 039 (Klaviyo) should be as comprehensive as file 032 (Shopify) — Klaviyo is the #1 email platform for DTC.
- File 041 (Shipping) is critical — many profit analytics tools underestimate shipping costs, leading to inflated profit figures.
- File 042 (Accounting & Other) is a catch-all for remaining integrations not covered elsewhere.
- File 043 (Data Sync) is a systems architecture document — synthesizes sync details from ALL prior integration files.
- The next task (012) will create the Integration Comparison Matrix and Checkpoint Review #3, completing PRD Part 03 (100%).

---

## Completion

**Status:** COMPLETED
**Date:** 2026-02-13T19:45:00Z
**PRD Part:** 03
**Summary:** Created comprehensive research documentation for BeProfit's email/SMS marketing integrations (Klaviyo and other platforms), shipping platform integrations (ShipStation, ShipBob, ShipHero, Shippo), accounting integrations (QuickBooks, Xero), other integrations (payment processors, subscriptions, Zapier, API, CSV export), and global data synchronization architecture across all integrations.

### Requirements Completed by This Task
- [x] Task 9: Klaviyo Integration (file 039, 750 lines)
- [x] Task 10: Other Email/SMS Integrations (file 040, 776 lines)
- [x] Task 11: Shipping Platform Integrations (file 041, 909 lines)
- [x] Task 12: Accounting & Other Integrations (file 042, 1,034 lines)
- [x] Task 13: Data Sync & Refresh Documentation (file 043, 976 lines)

### PRD Status After This Task
- Requirements completed by this task: 5
- Total PRD requirements completed (cumulative): 13 (Tasks 1-13)
- Requirements remaining: 2 (Tasks 14-15)
- PRD completion: ONGOING (87% complete)

### Files Created
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-039.md` (750 lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-040.md` (776 lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-041.md` (909 lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-042.md` (1,034 lines)
- `dtcdashboard_app/casestudy/beprofit-casestudy-info-043.md` (976 lines)

Total: 4,445 lines of comprehensive integration research documentation

### Key Insights
1. **Email/SMS Integration Gaps**: BeProfit has very limited email/SMS integrations. Klaviyo is the only documented integration, with uncertain status ("no longer supported" vs "can now integrate"). All other email/SMS platforms (Mailchimp, Omnisend, Postscript, Attentive) rely on manual UTM-based attribution (Shopify-only), with no native integrations confirmed.

2. **Shipping Critical for Profit**: Shipping cost tracking is essential for accurate profit calculation. Free shipping offers can lose $7-10 per order on shipping alone. 3PL fees (ShipBob, ShipHero) include per-order costs (pick & pack) and monthly costs (storage, inbound freight) that are complex to allocate accurately.

3. **No Accounting Integrations**: BeProfit lacks native QuickBooks/Xero integrations. Merchants must export CSV manually for bookkeeping. This is a strategic choice - BeProfit positions as profit analytics dashboard, not accounting system.

4. **Sync Architecture**: BeProfit uses a mix of real-time webhooks (Shopify: 1-5 min), hourly batch sync (Facebook Ads, Klaviyo), and daily batch sync (Google Ads, Amazon). Marketing claims "real-time" but reality is mostly batch sync with 1-24 hour latency.

5. **Competitive Opportunities**: Deep SMS integrations (Postscript, Attentive with cost tracking), native Mailchimp support, QuickBooks/Xero one-click export, granular payment processor fee tracking (Stripe/PayPal itemized fees), and real-time sync for more platforms could all be competitive differentiators.

### Next Task
Task 012 will cover:
- Integration Comparison Matrix (file 044) - comprehensive comparison across all 13+ integrations
- Checkpoint Review #3 (file 045) - structured review of integration documentation completeness
- This will complete PRD Part 03 (100%)
