# BeProfit Alerts & Notifications Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/daily-profit-emails-in-beprofit (Daily Profit Emails — closest feature to alerts)
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — notification mentions)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://www.getapp.com/website-ecommerce-software/a/beprofit/features/ (GetApp feature listing)
  - https://help.runviably.com/beprofit (Help Center full navigation — no Alerts category)
  - Searched: "alert", "notification", "threshold", "warning", "Slack" across Help Center and beprofit.co
- **Category:** Core Feature / Alerts & Notifications (GAP ANALYSIS)
- **Date Captured:** 2026-02-12
- **Cross-references:**
  - File 011 (beprofit-casestudy-info-011.md) — Dashboard (notification bell icon in top nav)
  - File 012 (beprofit-casestudy-info-012.md) — P&L Reports (daily profit emails, scheduled reports)
  - File 023 (beprofit-casestudy-info-023.md) — Data Export & Scheduled Reports (comprehensive scheduling documentation)
  - Real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — Notification bell with red badge, Notification Management card

---

## Alerts & Notifications Overview

**Key Finding: BeProfit does NOT have a dedicated alerts or notifications system.**

There is no "Alerts" or "Notifications" category in the Help Center (confirmed from file 001's full 21-category taxonomy). There is no documentation anywhere in the Help Center about custom alerts, threshold-based triggers, profit drop warnings, or automated notification systems beyond email reports.

The "Alerts/Notifications" feature listed on GetApp's feature comparison page for BeProfit most likely refers to the **scheduled email reports and daily profit emails** — which are documented in files 012 and 023. There is no evidence of a distinct alerting system.

This makes Alerts & Notifications a **gap analysis document** — documenting what BeProfit does NOT have and the competitive opportunity this represents.

---

## What BeProfit DOES Have (Notification-Adjacent Features)

### 1. Daily Profit Emails (Primary Notification Feature)
The closest thing to a "notification" in BeProfit is the automated daily profit email.

**Documented in files 012 and 023:**
- Sent daily while the user remains active
- Content: Undocumented (likely sales, profit, order count)
- 21-day inactivity auto-pause
- Managed via Settings → Shop → Notification Management
- Subscribe/unsubscribe toggle
- Not customizable (fixed content and timing)

**This is NOT an alert system** — it's a scheduled digest. It doesn't trigger based on conditions (profit drops, cost spikes), and users cannot configure thresholds or rules.

### 2. Scheduled Report Emails
Custom reports and preset templates can be scheduled for email delivery.

**Documented in files 012, 018, and 023:**
- Frequency: Daily, Weekly, Monthly
- Configurable delivery time
- Multiple recipients
- User-selected metrics and date groupings

**This is NOT an alert system** — it's a recurring report. Reports are sent on a schedule regardless of what the data shows. There is no conditional logic (e.g., "only send if profit drops below $X").

### 3. Notification Bell (In-App)
The real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) shows:

> "A bell/notification icon with a red badge showing a number"

This confirms BeProfit has an **in-app notification indicator** in the top navigation bar. However:
- What notifications appear here is **completely undocumented**
- No Help Center article describes the notification bell or its contents
- Likely notifications include: system updates, feature announcements, setup reminders, data sync issues

### 4. Notification Management Settings
The Settings → Shop page shows:

> "Notification Management" — "Set your communication preferences"

This card (documented from the real dashboard in file 011's cross-reference) allows users to manage notification preferences. However:
- What preferences are available is **not documented**
- Likely limited to: daily profit email toggle, marketing email preferences, product update notifications
- There is no evidence of custom alert rule configuration in this section

### 5. Onboarding Progress Indicator
The top nav shows:

> "Onboarding 56%" — progress indicator with a partially filled circular progress ring

This is a form of in-app notification that communicates incomplete setup. It's a progress tracker, not a true notification system.

### 6. Gift/Rewards Icon
The top nav includes a gift/present icon that likely serves as a "What's New" or feature announcement channel. This is an in-app notification mechanism but unrelated to data-driven alerts.

### 7. Workspace Email Notifications
From the FAQ research:

> "You can't control the workspace email recipient. Only the shop reports can be set by the user. The workspace owner is the one who receives workspace-related emails."

This suggests workspace-level system emails exist (billing, account changes, etc.) but are not user-configurable beyond the owner receiving them.

---

## What BeProfit Does NOT Have

### Custom Alert Triggers — NOT AVAILABLE
There is no documented ability to:
- Set profit thresholds (e.g., "Alert me if daily profit drops below $100")
- Create cost spike alerts (e.g., "Notify me if COGS increases by more than 10%")
- Configure ROAS alerts (e.g., "Alert me if ROAS falls below 2.0")
- Set margin warnings (e.g., "Warning when any product margin goes below 15%")
- Define order anomaly alerts (e.g., "Alert on unusually high refund rate")

### Real-Time Alerts — NOT AVAILABLE
There is no documented ability to:
- Receive immediate notifications when metrics change
- Get real-time push notifications on mobile
- Have live dashboard alerts (toast notifications, banner warnings)

### Notification Channels (Beyond Email) — NOT AVAILABLE
There is no documented:
- **Slack integration** for notifications
- **Microsoft Teams integration** for notifications
- **SMS/text notifications**
- **Mobile push notifications** (BeProfit has no native mobile app — see file 011)
- **Webhook callbacks** for automated workflows
- **Zapier/Make integration** for notification routing
- **Browser push notifications**

### Conditional Logic — NOT AVAILABLE
There is no documented ability to:
- Create "if-then" rules for notifications
- Chain conditions (e.g., "If profit drops AND marketing spend increases")
- Set time-based conditions (e.g., "Alert if no orders for 4 hours during business hours")
- Configure severity levels (info, warning, critical)

---

## Email Notification Types (Exhaustive List)

Based on all research, here is the complete inventory of email-based notifications in BeProfit:

| Notification Type | Trigger | Configurable? | Recipients |
|-------------------|---------|---------------|-----------|
| **Daily Profit Email** | Scheduled (daily, auto) | Subscribe/unsubscribe only | Account holder |
| **Scheduled Custom Report** | Scheduled (Daily/Weekly/Monthly) | Fully configurable (metrics, frequency, time) | Multiple email addresses |
| **Scheduled Preset Email** | Scheduled (per template) | Delivery hour and recipients | Multiple email addresses |
| **Workspace System Emails** | System events (billing, account) | Not configurable | Workspace owner only |
| **Setup/Onboarding Emails** | Not documented | Unknown | Account holder |

**Total: 4-5 email notification types, all scheduled or system-triggered. Zero conditional/threshold-based alerts.**

---

## In-App Notification Elements

| Element | Type | Location | Purpose | Documented? |
|---------|------|----------|---------|-------------|
| Notification bell | Icon + badge | Top nav bar | Unread notification count | Visual only — contents undocumented |
| Onboarding progress | Progress ring | Top nav bar | Setup completion status | Partially documented |
| Gift/rewards icon | Icon | Top nav bar | Feature announcements | Undocumented |
| Data sync indicator | Cloud icon | Dashboard | Sync status (animates during sync) | Briefly documented in file 011 |
| Klaviyo upsell card | Banner card | Dashboard → Marketing section | "Unlock Klaviyo metrics" — integration promotion | Visual from dashboard inventory |
| Trial countdown | Text | Sidebar + footer | "3 trial days left" | Visual from dashboard inventory |

---

## Competitive Landscape: Alerts in Profit Analytics Tools

For context, here is what comparable tools typically offer in terms of alerts:

| Feature | BeProfit | Typical Competitors (Lifetimely, TrueProfit, OrderMetrics) |
|---------|---------|-----|
| Daily summary email | Yes | Yes |
| Scheduled reports | Yes | Yes |
| Custom threshold alerts | **No** | Some offer basic threshold alerts |
| Slack integration | **No** | Some offer Slack notifications |
| Mobile push notifications | **No** (no mobile app) | Some offer via mobile apps |
| In-app notifications | Minimal (bell icon, undocumented) | Varying levels of in-app alerting |
| Webhook notifications | **No** | Rare but growing |
| SMS alerts | **No** | Very rare |

**Note:** The competitive landscape for DTC profit analytics tools is not well-documented for alerting features specifically. Most focus on reporting rather than real-time alerting. This represents an industry-wide gap, not just a BeProfit gap.

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Notification bell | Icon button + red badge | Top navigation bar | Shows unread count, likely opens notification drawer |
| Notification Management card | Settings card | Settings → Shop | "Set your communication preferences" |
| Daily email toggle | Toggle switch | Notification Management (inferred) | Subscribe/unsubscribe from daily emails |
| Onboarding progress ring | Progress indicator | Top navigation bar | Circular ring showing % completion |
| Gift/What's New icon | Icon button | Top navigation bar | Feature announcements |
| Data sync cloud icon | Status indicator | Dashboard | Shows sync status with hover tooltip |
| Trial countdown text | Text label | Sidebar bottom + footer | "3 trial days left" |

---

## Data Model Implications

### Current State (Minimal)
- **Notification preferences:** Binary toggles per notification type (daily email: on/off)
- **Scheduled report delivery:** Report reference, frequency, hour, recipient list (documented in file 023)
- **Last login timestamp:** Required for the 21-day inactivity calculation
- **Unread notification count:** Tracked for the bell badge (source unknown)

### What Would Be Needed for a Real Alert System
- **Alert rule entity:** Metric reference, condition (above/below/change), threshold value, time window, severity level
- **Notification channel entity:** Channel type (email, Slack, SMS, webhook), configuration (email address, Slack webhook URL, phone number, endpoint URL)
- **Alert history:** Timestamp, rule that triggered, metric value at trigger, notification sent status, acknowledgment status
- **User notification preferences:** Per-alert-type and per-channel opt-in/out
- **Alert evaluation engine:** Periodic check of all active rules against current metric values, with deduplication and cooldown periods

---

## Limitations & Gaps

1. **No custom alert triggers.** This is the most significant gap. Merchants cannot set conditions that trigger notifications (profit thresholds, cost spikes, margin warnings). All notifications are time-based (scheduled) or system-based, not data-driven.

2. **No real-time notifications.** There is no mechanism to receive immediate alerts when something changes in the data. Even the daily email is a fixed schedule, not triggered by events.

3. **Single notification channel (email only).** Email is the only external notification channel. No Slack, Teams, SMS, mobile push, webhook, or browser notification support.

4. **Notification bell contents undocumented.** The in-app notification bell exists but what populates it is completely unknown. This suggests it may be used primarily for system/marketing messages rather than data-driven alerts.

5. **No conditional logic in scheduled reports.** Reports are sent regardless of data values. Users cannot say "only send this report if profit is negative" or "skip if there's no data."

6. **Daily email is not customizable.** Users cannot choose which metrics appear in their daily profit email or at what time it's delivered (scheduled reports have time selection, but the daily email does not).

7. **21-day inactivity auto-pause penalizes email-only users.** Merchants who rely on the daily email without logging into the app lose their notification after 21 days.

8. **Workspace notification control limited to owner.** Team members cannot individually control workspace-level notification preferences — only the workspace owner receives system emails.

9. **No alert escalation.** There is no documented ability to escalate alerts (e.g., "if profit drops below $X for 3 consecutive days, escalate to manager").

10. **No alert acknowledgment or history.** There is no documented log of past notifications, no "mark as read" workflow, and no alert history for audit or pattern analysis.

---

## Relevance to Our Build

1. **Alerts are a major differentiation opportunity.** BeProfit's complete lack of custom alerts is one of the biggest product gaps identified in this research. Building a robust alerting system would be a significant competitive advantage.

2. **Start with simple threshold alerts.** Allow merchants to set basic rules: "Alert me if daily profit drops below $X," "Notify me if any product's margin falls below Y%," "Warn me if ad spend exceeds $Z today." These are high-value, low-complexity features.

3. **Build multi-channel notification infrastructure from day one.** Design the notification system to support email, Slack, SMS, mobile push, and webhooks. Even if only email is available at launch, the architecture should accommodate additional channels.

4. **Implement Slack integration as an early differentiator.** Many DTC merchants and agencies use Slack for team communication. Sending profit alerts to a Slack channel is a natural workflow integration that no competing profit analytics tool appears to offer well.

5. **Design conditional scheduled reports.** Allow users to attach conditions to scheduled reports: "Only send this report if it contains negative margin products" or "Skip sending if there's no data change." This upgrades reports from dumb schedules to smart notifications.

6. **Build an alert rule builder UI.** Create an intuitive interface where merchants can define alert rules with: metric selection (dropdown), condition (above/below/change by), threshold value (number input), time window (today, this week, this month), and notification channel (email, Slack, SMS).

7. **Add anomaly detection as a premium feature.** Beyond user-defined thresholds, use statistical anomaly detection to automatically surface unusual patterns: "Shipping costs are 30% higher than your 90-day average" or "Refund rate this week is 2x normal." This adds AI-driven value beyond simple rules.

8. **Implement alert cooldown and deduplication.** Prevent alert fatigue by implementing cooldown periods (don't send the same alert more than once per hour/day) and smart deduplication (if profit is still below threshold, don't re-alert until it recovers and drops again).

9. **Create a notification center within the app.** Build a proper notification drawer accessible from the bell icon that shows all recent alerts, data-driven notifications, and system messages. Include read/unread state, filtering, and history.

10. **Design for team-based notification routing.** Allow workspace admins to configure which team members receive which types of alerts. Marketing team members get ROAS alerts, finance team gets margin alerts, operations gets shipping cost alerts. This supports the multi-role workspace architecture.
