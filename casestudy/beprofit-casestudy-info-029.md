# BeProfit Mobile App & White-Label Features Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/track-profit-on-your-mobile-device-beprofit-help-center (Track Profit on your Mobile Device — Profit Dashboard)
  - https://help.runviably.com/beprofit/become-a-partner (Become a BeProfit Partner — General)
  - https://beprofit.co/partnerships/ (Partnership program page)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://www.getapp.com/website-ecommerce-software/a/beprofit/ (GetApp feature listing)
  - https://www.capterra.com/p/214079/BeProfit/ (Capterra listing)
  - https://trueprofit.io/comparison/trueprofit-vs-beprofit (TrueProfit competitive comparison)
  - Searched: Apple App Store for "BeProfit", Google Play Store for "BeProfit"
  - Searched broader web for: "BeProfit mobile app", "BeProfit iOS", "BeProfit Android", "BeProfit partner program agency white-label"
  - Cross-referenced with real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — sidebar navigation, responsive design indicators
  - Cross-referenced with file 022 (beprofit-casestudy-info-022.md) — workspace architecture for agency use case
  - Cross-referenced with file 024 (beprofit-casestudy-info-024.md) — notification capabilities on mobile
- **Category:** Core Feature / Mobile & Partner Features
- **Date Captured:** 2026-02-12

---

## Mobile App Overview

### Key Finding: BeProfit Does NOT Have a Native Mobile App

BeProfit does **not** offer a standalone native mobile application on iOS or Android. This is confirmed through multiple sources:

1. **Help Center:** The "Track Profit on your Mobile Device" article describes a Safari web shortcut workaround, not a native app
2. **App Store search:** No "BeProfit" native app found on iOS App Store or Google Play Store
3. **Competitor comparison:** TrueProfit's comparison page explicitly highlights that BeProfit lacks a mobile app as a competitive disadvantage: "with no mobile app, BeProfit can't match this flexibility"
4. **Marketing site:** beprofit.co does not mention a mobile app anywhere
5. **Shopify listing:** The Shopify App Store listing describes BeProfit as a web-based analytics dashboard with no mobile app references

### What BeProfit Offers Instead

BeProfit provides a **mobile-friendly web application** accessible through mobile device browsers. The only documented mobile access method is:

**iOS Safari "Add to Home Screen" Shortcut**

---

## Platform Availability

| Platform | Native App? | Web Access? | Notes |
|----------|------------|------------|-------|
| **iOS (iPhone/iPad)** | No | Yes (Safari shortcut) | Documented workaround via Add to Home Screen |
| **Android** | No | Yes (browser) | No specific guidance documented |
| **Desktop** | N/A | Yes (full functionality) | Primary intended experience |

### iOS Access Method (Safari Shortcut)

The Help Center documents a step-by-step process for iOS users:

1. Open **Safari** and log into your BeProfit account
2. Tap the **share icon** (square with upward arrow)
3. Select **"Add to Home Screen"** from the options menu
4. Name the shortcut **"BeProfit"**
5. Confirm the addition

**Critical limitation:** "The following steps will only work on Safari." This means:
- Chrome, Firefox, or other iOS browsers cannot create this shortcut
- The shortcut is essentially a bookmark with a home screen icon
- This is NOT a Progressive Web App (PWA) — there is no mention of offline capability, service workers, or app-like installation
- The "app" opens as a Safari tab without native app chrome (no address bar if using web app manifest, though this is not confirmed)

### Android Access
No Android-specific guidance is provided in the Help Center. Android users would need to:
- Access BeProfit through their mobile browser (Chrome, Firefox, etc.)
- Optionally create a home screen shortcut through the browser's "Add to Home Screen" option
- There is no documented guidance for this process

---

## Mobile Feature Set

### Documented Mobile Features
The Help Center article on mobile tracking is brief and does not enumerate specific features available on mobile. Based on the web-responsive nature of the platform:

**Likely available on mobile (via responsive web):**
- Dashboard overview with KPI cards
- P&L summary view
- Order list view
- Product performance summaries
- Marketing spend overview
- Basic report viewing

**Likely limited or unavailable on mobile:**
- Complex chart interactions (hover tooltips, drill-downs)
- Dashboard drag-and-drop customization
- CSV file uploads — explicitly noted: "the one feature that requires a desktop is uploading CSV files when reporting Production Costs" (from GetApp/marketing site)
- Multi-column table views (horizontal scrolling required)
- Report builder / custom report creation
- Settings configuration
- Integration management

### Mobile vs Desktop Feature Parity

| Feature Category | Desktop | Mobile (Web) | Notes |
|-----------------|---------|-------------|-------|
| **Dashboard viewing** | Full | Likely functional | Responsive layout |
| **KPI cards** | Full grid layout | Likely stacked/scrollable | Card-based design adapts to mobile |
| **Charts/graphs** | Full with hover/tooltips | Limited interaction | Touch-based interaction differs |
| **Tables (orders, products)** | Full multi-column | Horizontal scroll | Columns truncate on mobile |
| **Report viewing** | Full | Likely functional | Simplified layout |
| **Report building** | Full with drag-and-drop | Likely difficult | Complex UI not mobile-optimized |
| **CSV upload** | Full | **Not available** | Confirmed desktop-only |
| **Settings management** | Full | Likely functional but cramped | Forms work but may be tedious |
| **Store switching** | Full dropdown | Dropdown works on mobile | Touch-friendly |
| **Date range selection** | Calendar picker | Calendar adapts to mobile | Standard mobile calendar |
| **Data export** | Full | Likely functional | Download triggers on mobile |

---

## Mobile Push Notifications

### Push Notifications — NOT AVAILABLE

BeProfit does **not** support mobile push notifications. This is directly tied to the lack of a native mobile app:
- Native push notifications require an app installed from the App Store/Play Store
- Web push notifications (via browser) are technically possible but not documented
- The Safari shortcut method does not enable push notification capability

From file 024 (Alerts & Notifications), the only "push" mechanism is:
- Daily profit emails (email, not push)
- Scheduled report emails (email, not push)
- In-app notification bell (only visible when actively viewing the web app)

### Notification Landscape on Mobile
```
Mobile Notification Capabilities:
❌ Native push notifications (no mobile app)
❌ Web push notifications (not documented)
❌ SMS notifications (not offered)
✅ Email notifications (Daily Profit Email, Scheduled Reports)
✅ In-app notification bell (when viewing in browser)
```

---

## Mobile UX Analysis

### Responsive Web Design Assessment
Based on the real dashboard visual inventory and the marketing site's "mobile-friendly" claim:

**Positive indicators:**
- Card-based design throughout (cards adapt well to mobile widths)
- Vertical scrolling page layout (natural on mobile)
- KPI cards arranged in grids (can reflow to single column)
- Standard web UI components (dropdowns, buttons, toggles)

**Potential issues:**
- Left sidebar navigation (hamburger menu conversion needed on mobile)
- Wide data tables (Marketing page has 12+ columns, requires horizontal scrolling)
- Complex charts with multiple overlays (dual-axis charts lose detail on small screens)
- Drag-and-drop dashboard customization (not touch-friendly)
- Multiple nested menus (Products → submenu → tabs)

### Mobile Dashboard Layout (Inferred)
The desktop dashboard's 2-4 column KPI card grids would likely reflow to a **single-column scrollable layout** on mobile:

```
Mobile Dashboard (inferred):
┌──────────────┐
│ Store Selector │
├──────────────┤
│ Today's       │
│ Snapshot      │
├──────────────┤
│ Total Sales   │
│  $9,064       │
├──────────────┤
│ Net Margin    │
│  29.73%       │
├──────────────┤
│ Net Profit    │
│  $2,674       │
├──────────────┤
│ ... more KPIs │
├──────────────┤
│ Donut Chart   │
│ (compact)     │
├──────────────┤
│ Orders Chart  │
│ (full-width)  │
└──────────────┘
```

---

## White-Label / Agency Features

### White-Label Features — NOT AVAILABLE

Based on comprehensive research, BeProfit does **not** offer white-label capabilities:

- No mention of custom branding, logo replacement, or domain customization
- No "powered by" removable branding
- No client-facing branded reports
- The product is always branded as "BeProfit" (or "Viably")
- The dashboard displays "BeProfit" logo and branding throughout

### Agency-Specific Features
BeProfit does not have a dedicated "agency mode" or agency-specific features. However, the workspace architecture (file 022) can be used by agencies:

**How agencies might use BeProfit today:**
1. Create a workspace for each client (separate billing per workspace)
2. Connect each client's stores within their respective workspaces
3. Invite the client as a View Only teammate to see their own data
4. Switch between workspaces to manage multiple clients

**Limitations for agencies:**
- No cross-client dashboard or portfolio view
- No unified billing across client workspaces
- No commission tracking or agency-specific metrics
- No branded client reports
- No client onboarding workflow
- Each client workspace requires a separate subscription

### Branded Reports — NOT AVAILABLE
There is no documented ability to:
- Add custom logos to reports
- Remove BeProfit branding from exported reports
- Generate client-facing reports with agency branding
- Create PDF reports with custom headers/footers

---

## Partner Program

### Program Overview
BeProfit offers a partnership program targeting three groups:

| Partner Type | Target Audience | Description |
|-------------|----------------|-------------|
| **eCommerce Agencies** | Agencies managing DTC brands | "Enhance client capabilities and support business scaling" |
| **Social Influencers** | Influencers in the Shopify/ecommerce space | "Monetize recommendations while building credibility" |
| **Shopify Apps** | App developers in the Shopify ecosystem | "Expand user bases through ecosystem connections" |

### Partner Benefits

#### Revenue & Support
- **Referral commissions** — Commission-based compensation for client referrals (specific percentages not documented)
- **Alternative revenue sharing** — Option to "share savings with referred clients" instead of taking commissions
- **Dedicated partner manager** — Individual support contact for partner accounts
- **Special Slack channel** — Dedicated Slack channel for partner communication and support

#### Business Development
- **Co-marketing activities** — Joint marketing campaigns to boost partner visibility
- **Educational content library** — Resources for partners to use in client engagement
- **Lead-sharing directory** — BeProfit connects partners with prospective clients
- **Partner directory listing** — Partners are listed in BeProfit's partner directory

#### Product Access
- **Financial control features** — Partners enable clients to access profit dashboards
- **Exclusive performance monitoring** — Not detailed what "exclusive" monitoring entails
- **Training from BeProfit specialists** — Professional training on platform features

### Application Process
- Contact: **partnership@beprofit.co** (from partnerships page) or **brandon@runviably.com** (from Help Center article)
- Speak with a "BeProfit Specialist" to discuss partnership details
- No self-service application form documented
- No documented approval criteria or requirements

### Program Gaps
- **No commission percentages documented** — Partners don't know what they'll earn before applying
- **No minimum performance thresholds** — Unclear if there are referral minimums to maintain partnership
- **No tiered partnership levels** — No Bronze/Silver/Gold/Platinum or equivalent structure
- **No white-label features for partners** — Partners cannot rebrand BeProfit for their clients
- **No multi-client management tools** — No agency dashboard for managing multiple client workspaces
- **No contract terms published** — Partnership agreement details are not public

---

## Agency Multi-Store Management

### Current Multi-Store Capabilities (from file 022)
BeProfit's workspace architecture provides basic multi-store support:
- One workspace per logical grouping of stores
- Multiple stores from different platforms in one workspace
- Store selector for switching between stores
- Aggregate views with multi-store checkbox selection

### Agency Workflow (Current, Suboptimal)
```
Agency with 5 clients:

Option A: Separate Workspaces (Recommended by BeProfit)
├── Workspace 1 (Client A) → Store 1, Store 2
├── Workspace 2 (Client B) → Store 3
├── Workspace 3 (Client C) → Store 4
├── Workspace 4 (Client D) → Store 5
└── Workspace 5 (Client E) → Store 6, Store 7
    Problem: No cross-client view, 5 separate subscriptions

Option B: Single Workspace (Not Recommended)
└── Workspace 1 (Agency)
    ├── All client stores (Store 1-7)
    ├── Teammates with client access to ALL stores
    └── No per-client data isolation
        Problem: Clients see each other's data
```

Neither option provides an ideal agency experience. The agency use case is not well-served by BeProfit's current architecture.

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Hamburger menu (mobile) | Icon button | Top left (inferred) | Replaces sidebar navigation on mobile |
| Mobile KPI card stack | Card layout | Dashboard body | Single-column KPI cards on mobile |
| Safari share icon | System button | Safari browser | Required for iOS "Add to Home Screen" shortcut |
| Home screen shortcut | App icon | iOS home screen | BeProfit bookmark disguised as app |
| Partner application form | Contact form | beprofit.co/partnerships | Partnership inquiry submission |
| Responsive chart container | Resizable div | Dashboard sections | Charts that adapt to viewport width |
| Touch-friendly store selector | Dropdown | Top nav (mobile) | Store switching optimized for tap interaction |

---

## Data Model Implications

### Mobile-Specific Data Considerations
Since BeProfit is web-only (no native app), there are no mobile-specific data implications:

- **No offline caching** — No local storage of analytics data for offline access
- **No push notification tokens** — No device tokens to manage for push notifications
- **No reduced data payloads** — Same API responses as desktop (no mobile-optimized endpoints)
- **No mobile-specific analytics** — No tracking of mobile vs desktop usage patterns

### Partner Program Data Model
```
Partner
├── id
├── name (individual or organization)
├── type (enum: agency, influencer, app_developer)
├── contact_email
├── partner_manager_id (dedicated support contact)
├── status (active, inactive, pending)
├── referrals (count of referred clients)
├── commission_rate (percentage, undocumented)
└── created_at

Referral
├── id
├── partner_id (referring partner)
├── referred_workspace_id (client's workspace)
├── referral_date
├── conversion_date (when client subscribes)
├── commission_earned
└── status (pending, converted, expired)
```

### Agency Architecture (What Would Be Needed)
```
AgencyAccount (does not exist in BeProfit)
├── agency_name
├── agency_branding (logo, colors, domain)
├── client_workspaces[] (1:N relationship)
├── cross_client_dashboard (aggregate view)
├── unified_billing (single invoice)
├── agency_users[] (staff with cross-client access)
└── client_users[] (restricted to their workspace)
```

---

## Limitations & Gaps

1. **No native mobile app.** BeProfit does not have an iOS or Android app. The Safari shortcut workaround is a bookmark, not an app. This is a significant competitive disadvantage — TrueProfit explicitly highlights this gap.

2. **No mobile push notifications.** Without a native app, there is no way to receive push notifications. Merchants who want real-time profit alerts on their phone are underserved.

3. **Android access is undocumented.** While iOS users get Safari shortcut guidance, Android users receive no specific instructions. This is a documentation gap for a major mobile platform.

4. **Mobile feature parity is unclear.** The Help Center does not describe which features work on mobile and which don't. The only confirmed limitation is CSV upload being desktop-only. Users must discover other mobile limitations themselves.

5. **No white-label capabilities.** Agencies cannot rebrand BeProfit for their clients. Reports, dashboards, and the interface always show BeProfit branding. This limits the product's appeal to agencies who want to present analytics under their own brand.

6. **No agency-specific features.** There is no multi-client dashboard, cross-client reporting, unified agency billing, or client onboarding workflow. Agencies must manage separate workspaces with separate subscriptions.

7. **Partner program lacks transparency.** Commission rates, requirements, performance thresholds, and contract terms are not published. Partners must contact sales to learn basic program details.

8. **No client-facing branded reports.** Agencies cannot generate reports with their own branding to share with clients. Scheduled reports are BeProfit-branded.

9. **No progressive web app (PWA) features.** The mobile web experience doesn't include PWA features like offline access, background sync, or installable app behavior. The Safari shortcut is a simple bookmark.

10. **Partner program is referral-only.** The program focuses on referral commissions and co-marketing — there are no product features specifically built for partners (no partner dashboard, no client management tools, no branded portal).

---

## Relevance to Our Build

1. **Build a native mobile app for iOS and Android.** This is a clear competitive gap. A native app with push notifications, offline-capable dashboard summaries, and touch-optimized charts would differentiate immediately. TrueProfit already offers this — we should match and exceed it.

2. **Implement push notifications from day one.** Allow merchants to receive real-time profit alerts, low-stock warnings, ROAS drop notifications, and daily summaries via mobile push. This keeps merchants engaged without requiring them to log into the web dashboard.

3. **Design mobile-first for key dashboards.** Don't just make the desktop responsive — design the mobile experience intentionally. The dashboard, daily summary, and key KPIs should be mobile-first with progressive enhancement for desktop.

4. **Build a PWA as a minimum mobile offering.** Even before launching native apps, implement PWA features: offline access to recent data, background data sync, installable app behavior, and web push notifications. This provides app-like experience without App Store distribution.

5. **Create a white-label / agency program.** Offer agencies the ability to: custom-brand the dashboard (logo, colors), generate branded reports (PDF with agency header/footer), create client portals with restricted access, and manage multiple clients from a single agency dashboard.

6. **Build agency-specific infrastructure.** Create an agency account type with: cross-client portfolio dashboard, unified billing (one invoice for all client workspaces), per-client access controls, and agency performance metrics (total MRR across clients, aggregate store metrics).

7. **Publish transparent partnership terms.** Be upfront about commission rates, program tiers, requirements, and benefits. A self-service partner application with clear criteria will attract more partners than a "contact sales" approach.

8. **Support branded client reports.** Allow agencies and merchants to generate PDF reports with custom branding — company logo, colors, and footer text. This is essential for agencies presenting to clients and for merchants reporting to investors.

9. **Build offline-capable daily summaries.** Store the last 7 days of summary data locally on mobile devices. When a merchant opens the app without connectivity (common while traveling), show cached data with a "last updated" timestamp. This removes friction from checking daily performance.

10. **Create a partner ecosystem with product features.** Go beyond referral commissions — build product features that partners need: multi-client management, white-label options, client onboarding templates, and partner-specific analytics (total referred client revenue, commission tracking, partner performance dashboard).
