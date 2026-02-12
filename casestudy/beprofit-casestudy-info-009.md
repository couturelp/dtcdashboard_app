# BeProfit Onboarding UX Analysis

## Source
- **URLs:**
  - https://beprofit.co/ (marketing site — signup CTAs, feature positioning)
  - https://beprofit.co/register/ (registration flow — analyzed in file 003)
  - https://help.runviably.com/beprofit/getting-started (Getting Started category)
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — onboarding details)
- **Primary Sources:** beprofit-casestudy-info-001.md through 008.md
- **Category:** UX Analysis / Onboarding Flow
- **Date Captured:** 2026-02-12

---

## Implied Onboarding Flow

### Complete Screen-by-Screen Sequence

Reconstructed from documentation clues across files 001-008. BeProfit does NOT document an explicit onboarding flow, so this sequence is inferred from registration form analysis (file 003), feature setup documentation (files 004-008), and the Getting Started hub structure (file 002).

| Step | Screen/Page | Required? | Actions | Data Collected | Source File |
|------|------------|-----------|---------|----------------|-------------|
| 1 | Email entry | Yes | Enter email, opt-in marketing | Email, marketing consent | 003 |
| 2 | Account verification | Conditional | Enter verification code (only if existing device/account detected) | Device association | 003 |
| 3 | Agency details | Conditional | Agency name, website, relation (only if agency) | Agency segmentation | 003 |
| 4 | Profile details | Yes | Full name, job title, mobile, password | Identity, role, contact | 003 |
| 5 | Business profiling | Yes | Referral source, shop count, GMV/order volume | Business size, acquisition channel | 003 |
| 6 | Goal selection | Yes | Main goals (multi-select), current tracking method | Use case intent, competitor intel | 003 |
| 7 | Platform selection | Yes | Select ecommerce platforms (Shopify, WooCommerce, Amazon, Wix) | Platform(s) to connect | 003 |
| 8 | Store connection | Yes | Enter store URL/credentials, OAuth for Shopify | Store access, data sync trigger | 003, 004 |
| 9 | Mobile redirect | Conditional | If on mobile, link sent to continue on desktop | Device preference | 003 |
| 10 | Initial data sync | Automatic | Background sync of orders, products, revenue, tax | Historical store data | 004 |
| 11 | Dashboard (first view) | Automatic | Landing page after signup completes | — | 002 |
| 12 | COGS setup | Recommended | Settings → Costs → Product Costs | Product costs | 005 |
| 13 | Shipping/fulfillment setup | Recommended | Settings → Costs → Fulfillment | Shipping costs | 006 |
| 14 | Processing fees review | Recommended | Settings → Costs → Processing Fees | Transaction fees | 008 |
| 15 | Ad platform connections | Optional | Settings → Costs → Marketing Platforms | Marketing spend data | 007 |
| 16 | Calculation preferences | Optional | Settings → Costs → Calculation Preferences | Reporting customization | 008 |
| 17 | Team invites | Optional | Dashboard bottom → Invite Team Members | Team access | 008 |
| 18 | Dashboard customization | Optional | Dashboard → Customize Dashboard | UI personalization | 002 |
| 19 | Report scheduling | Optional | Reports → Templates / Custom Reports | Notification setup | 008 |

### Flow Diagram (Text-Based)

```
REGISTRATION (Steps 1-9, ~5-10 min)
┌─────────────────────────────────────────────────────────────────────┐
│  Email → [Verification?] → [Agency?] → Profile → Business Info    │
│  → Goals → Platform Select → Store Connect → [Mobile Redirect?]   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    AUTOMATIC DATA SYNC
                    (background process)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     DASHBOARD (First View)                         │
│  Revenue data appears immediately from store sync                  │
│  Profit data is INACCURATE until costs are configured              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
COST SETUP (Steps 12-14, user-directed, no enforced order)
┌─────────────────────────────────────────────────────────────────────┐
│  COGS Setup ──────────┐                                            │
│  Shipping Setup ──────┤  (all accessible via Settings → Costs)     │
│  Processing Fees ─────┘                                            │
│                                                                     │
│  Each step is independent — users can do them in any order          │
│  or skip them entirely. No progress tracking or enforcement.        │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
INTEGRATIONS & PERSONALIZATION (Steps 15-19, optional)
┌─────────────────────────────────────────────────────────────────────┐
│  Ad Platforms ────────┐                                            │
│  Calc Preferences ────┤  (all optional, no enforced sequence)      │
│  Team Invites ────────┤                                            │
│  Dashboard Custom ────┤                                            │
│  Report Scheduling ───┘                                            │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Observations About the Flow

1. **Registration is front-loaded with data collection:** Steps 1-9 collect extensive business intelligence (job title, GMV, goals, tracking methods) before the user sees any value. This is a classic product-led-growth vs sales-led tension — the data is valuable for segmentation but creates signup friction.

2. **No guided post-registration setup:** After registration completes and the dashboard appears, there is NO documented wizard, checklist, or guided tour that walks users through cost configuration. Users must self-discover that they need to set up COGS, shipping, and other costs via Settings.

3. **Cost setup steps are independent and unordered:** COGS, shipping, processing fees, and ad platforms can be configured in any order, or skipped entirely. There's no dependency enforcement (e.g., "set up COGS before viewing profit reports").

4. **Dashboard shows data immediately but it's misleading:** Revenue data appears right after store connection, but profit numbers are inaccurate until costs are configured. A user who sees the dashboard immediately after signup may incorrectly believe their profit data is accurate.

---

## Onboarding Design Patterns

### Progress Indicators

**Registration flow:** The registration form (file 003) appears to use a multi-step form with progress indicators — the documentation describes 10 sequential steps, suggesting a step-by-step wizard with visual progress.

**Post-registration:** **No progress indicator.** There is NO documented:
- Setup completion percentage
- Checklist of required/recommended steps
- Progress bar showing setup status
- "Get Started" widget or task list

The Help Center's "Getting Started" page is a cross-reference hub, not a guided checklist. This is a significant UX gap — users have no way to know what setup steps remain or how close they are to having accurate profit data.

### Gamification Elements

**None documented.** There are no references to:
- Points or rewards for completing setup steps
- Badges or achievements
- Completion percentages or scores
- "Complete your profile" incentives
- Streak tracking or engagement rewards

BeProfit's onboarding appears entirely utilitarian — no gamification layer.

### Skip/Defer Options

**Registration:** Steps 2 (verification), 3 (agency details), and 9 (mobile redirect) are conditional — they appear only when relevant. Steps 4-8 appear to be mandatory within the signup flow.

**Post-registration cost setup:** All cost configuration steps are implicitly skippable. There is NO enforcement mechanism that prevents users from using the dashboard without configuring costs. Users can:
- Skip COGS setup → profit shows $0 cost of goods → artificially high profit
- Skip shipping setup → profit excludes shipping costs → artificially high profit
- Skip ad platform connections → profit excludes marketing spend → artificially high profit

**No documented "skip" buttons or "do this later" prompts.** Users simply don't visit the Settings pages, and costs remain unconfigured.

### Empty States

**Dashboard after first sync:**
- Revenue data populates immediately from store data
- Profit numbers display with whatever costs are configured (likely $0 for most cost categories)
- The dashboard shows a cloud icon with sync status — this is the only "loading" indicator documented

**No documented empty states for:**
- Products page before data loads
- Marketing analytics before ad platforms are connected
- Reports before enough data accumulates
- Orders page before sync completes

**No documented sample/demo data:** BeProfit does not appear to provide sample data or demo mode. Users see their real data (or lack thereof) from the first dashboard view.

**Inferred empty state strategy:** Based on the documentation, BeProfit takes a "show real data immediately" approach rather than a "show sample data first" approach. This means users see their actual revenue right away, which creates an immediate "aha moment" — but also means unconfigured cost categories show as $0, creating misleading profit numbers.

---

## Time-to-Value Analysis

### What is BeProfit's "Aha Moment"?

Based on documentation analysis, BeProfit optimizes for two time-to-value targets:

**Fast aha (minutes):** Seeing your store's revenue data on the dashboard immediately after store connection. This requires only:
1. Complete registration (~5-10 min)
2. Wait for initial sync (undocumented duration, likely minutes to hours)
3. View dashboard

**True aha (hours to days):** Seeing accurate profit data after configuring all costs. This requires:
1. Complete registration
2. Set up COGS (variable time — depends on number of products and method chosen)
3. Configure shipping costs
4. Set processing fees
5. Optionally connect ad platforms

### Minimum Setup to See Any Value

| Configuration Level | Data Visible | Accuracy | Time Required |
|--------------------|--------------|-----------|-|
| Registration + store connect only | Revenue, orders, products | Revenue accurate; profit grossly inflated | ~10 min |
| + COGS setup (manual) | Revenue + cost of goods | Profit partially accurate (missing shipping/ads) | + 30 min to 2 hours |
| + Shipping + processing fees | Revenue + COGS + fulfillment + fees | Profit mostly accurate (missing ad spend) | + 30 min |
| + Ad platform connections | Full profit picture | Profit accurate | + 15 min per platform |
| Full setup (all costs + preferences) | Complete analytics | Fully accurate | Total: 2-6 hours |

### Critical Insight

BeProfit's documentation reveals a **"silent inaccuracy" problem**: users can view profit data immediately, but that data is wrong unless all cost categories are configured. There is no clear warning, progress bar, or accuracy indicator that tells users "your profit data is only X% accurate because you haven't configured shipping costs yet."

---

## Friction Points (Inferred)

### High-Friction Areas

1. **10-step registration form (file 003):** The registration collects job title, GMV, goals, tracking methods, and more BEFORE the user sees the dashboard. Conversion data likely shows significant dropoff during this flow. Alternative: email + platform connection only, with progressive profiling later.

2. **No guided cost setup after registration:** Users land on the dashboard with no indication of what to configure next. The "Getting Started" help category is a cross-reference hub, not a wizard. Users must discover Settings → Costs independently.

3. **COGS setup complexity (file 005):** 6 COGS methods with a 6-level priority hierarchy. New users face a confusing choice: manual entry, CSV, Google Sheets, profiles, Shopify sync, or CJ Dropshipping. No documented recommendation for "most users should start with X."

4. **Fulfillment profile configuration (file 006):** Creating a fulfillment profile requires selecting primary variables, configuring rate tiers, specifying geographic zones, and setting date ranges — a multi-step process within Settings that's not intuitive for non-technical users.

5. **Ad platform OAuth dependency on browser settings (file 007):** Connecting ad platforms requires disabled ad blockers, non-incognito mode, enabled third-party cookies, disabled VPN, and disabled browser extensions. This is a 6-item prerequisite checklist that many users will fail on first attempt.

6. **No cancellation self-service (file 003):** Users cannot cancel their plan through the UI — they must contact support. While this is a retention tactic, it creates friction and negative sentiment.

### Medium-Friction Areas

7. **Amazon fee data delay (file 004):** Amazon fees take weeks to appear due to settlement schedules. Users may think the integration is broken or data is missing.

8. **Currency display limitations (file 004, 008):** Individual shop data can only be displayed in the shop's native currency. No per-user currency preference.

9. **Legacy vs current fulfillment systems (file 006):** Two coexisting systems (legacy shipping profiles and current fulfillment profiles) create confusion about which to use.

10. **Ultimate plan required for ad attribution (file 007):** Users on basic plans can connect ad platforms but can't see which orders came from which platform — a disappointing discovery after completing the setup process.

### Low-Friction Areas

11. **Transaction fee auto-detection (file 008):** Shopify transaction fees are auto-detected — this is well-designed and reduces friction.

12. **Store name auto-sync (file 008):** Store names update automatically via webhooks — seamless.

13. **Multi-currency auto-conversion (file 008):** Currency conversion happens automatically without configuration — good default behavior.

---

## Onboarding Comparison to Typical SaaS Patterns

### What BeProfit Does Well

| Pattern | Implementation | Assessment |
|---------|---------------|------------|
| **Platform connection during signup** | Store connection embedded in registration flow | Good — minimizes time to first data |
| **Auto-sync of store data** | Historical orders, products, revenue pulled automatically | Good — no manual data entry for core data |
| **Auto-detected fees** | Shopify plan fees auto-applied | Good — reduces configuration burden |
| **Dashboard-first landing** | Users see revenue immediately after signup | Good — fast "aha moment" for revenue data |
| **Webhook-based updates** | Real-time store data monitoring | Good — data stays current without manual refresh |

### What BeProfit Does Poorly

| Pattern | Implementation | Assessment |
|---------|---------------|------------|
| **Guided post-signup setup** | None — no wizard, checklist, or tour | Poor — users must self-discover cost setup |
| **Setup completion tracking** | No progress bar, completion %, or task list | Poor — no visibility into remaining setup steps |
| **Data accuracy indicators** | No warning when profit data is incomplete | Poor — "silent inaccuracy" problem |
| **Contextual help during setup** | Help Center is external; no in-app guidance for cost setup | Poor — users leave the app to find instructions |
| **Empty states with guidance** | No documented empty state messaging or CTAs | Poor — missed opportunity to guide users to setup |
| **Onboarding email sequence** | Only daily profit emails (after setup); no documented drip campaign | Poor — no email nurture during onboarding |
| **Success milestones** | No "your setup is X% complete" or "congrats, you've connected your first platform" | Poor — no positive reinforcement |
| **Plan value communication** | Feature gating discoverable only through use, not during onboarding | Poor — users hit paywalls unexpectedly |

### Industry Best Practices Missing

1. **No interactive product tour:** Tools like Intercom, Pendo, or Appcues-style walkthroughs are not documented.
2. **No onboarding email drip:** No documented sequence of "Day 1: Set up COGS", "Day 3: Connect ad platforms", etc.
3. **No in-app tips or tooltips:** No contextual guidance during first use of features.
4. **No "setup health" score:** No aggregate indicator of data completeness or profit accuracy.
5. **No personalized onboarding path:** Despite collecting job title and goals during signup, the post-registration experience appears identical for all users.
6. **No community or peer onboarding:** No "see how other [industry] stores configured BeProfit" content.

---

## Relevance to Our Build

### Onboarding Flow Design Recommendations

1. **Build a setup wizard that BeProfit lacks:** The single largest UX gap in BeProfit's onboarding is the absence of a guided post-registration setup flow. We should build a prominent, step-by-step wizard that walks users through: store connection → COGS setup → shipping costs → processing fees → ad platform connections. Each step should explain why it matters for profit accuracy.

2. **Show a "data accuracy" indicator:** After store connection, display a "Profit Accuracy Score" (e.g., "Your profit data is ~40% accurate — connect COGS to improve"). This creates urgency to complete setup without blocking access to the dashboard.

3. **Shorten registration to 3 steps max:** BeProfit's 10-step registration is excessive. Our MVP should be: email/OAuth → select platform → connect store. Business profiling (GMV, goals, job title) can be collected via progressive profiling after the user sees value.

4. **Implement an onboarding email sequence:** Days 1-7 emails guiding users through each setup step, with deep links directly to the relevant Settings page. Include success stories ("merchants who completed COGS setup saw 30% more accurate profit data").

5. **Design meaningful empty states:** When a user views Marketing Analytics before connecting ad platforms, show an actionable empty state: "Connect your ad platforms to see which campaigns are profitable" with a one-click setup CTA. Same for shipping, COGS, and other unconfigured areas.

6. **Personalize onboarding by business type:** BeProfit collects job title and goals during signup but doesn't use them. We should tailor the setup wizard: dropshippers get "connect CJ Dropshipping / AliExpress" as a COGS step; DTC brands get "enter production costs"; Amazon sellers get "set up Amazon fee predictions."

7. **Add a setup completion dashboard widget:** A persistent widget on the dashboard showing setup progress (e.g., "3 of 5 steps complete") with direct links to remaining steps. Remove it only when all recommended steps are done — or let users dismiss it.

8. **Solve the "silent inaccuracy" problem:** Display prominent banners or badges on profit metrics that indicate when data is incomplete: "Profit excludes shipping costs (not configured)" or "Ad spend not tracked (no platforms connected)." Make the incompleteness visible, not hidden.

9. **Use progressive disclosure for complexity:** BeProfit's 6 COGS methods and fulfillment profile builder are overwhelming for new users. Our setup wizard should recommend the simplest method first (e.g., "Import from Shopify" for Shopify stores) and let advanced users access more complex methods later.

10. **Design for the "fast aha" moment:** Like BeProfit, show revenue data immediately after store connection. But unlike BeProfit, overlay a message like "This is your revenue. Now let's add your costs to see your true profit." This frames the setup journey as completing a picture rather than configuring a tool.
