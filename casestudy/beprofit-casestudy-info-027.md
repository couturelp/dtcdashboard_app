# BeProfit Team & Collaboration Features Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/adding-team-members-to-your-beprofit-account (Adding Team Members — General)
  - https://help.runviably.com/beprofit/beprofit-data-protection-beprofit-help-center (BeProfit Data Protection — Profit Dashboard)
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — team email notification question)
  - https://help.runviably.com/beprofit/manage-multi-shops-in-one-or-few-workspaces-beprofit-help-center (Workspace management — cross-reference)
  - Cross-referenced with real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — Settings → Workspace tab, Teammates section
  - Cross-referenced with file 022 (beprofit-casestudy-info-022.md) — Multi-Store & Multi-Currency (workspace architecture)
  - Cross-referenced with file 024 (beprofit-casestudy-info-024.md) — Alerts & Notifications (workspace email limitations)
- **Category:** Core Feature / Team & Collaboration
- **Date Captured:** 2026-02-12

---

## Multi-User Support Overview

BeProfit supports multiple users within a single workspace through a team member invitation system. Team management is administered at the **workspace level** — the same organizational container that holds shops, currency settings, and subscriptions (documented in file 022).

The Teammates section is located at **Settings → Workspace**, beneath the Shops section. This confirms that team management is a workspace-level concern, not a shop-level one — all team members have access to the workspace and its contents based on their assigned role.

### Key Architecture Principle
```
Workspace
├── Workspace Settings (name, currency)
├── Shops (1 or more, from any platform)
├── Teammates (1 or more, with role assignments)
│   ├── Workspace Owner (account creator)
│   ├── Admin(s)
│   └── View Only user(s)
└── Subscription/Billing
```

---

## Team Member Invitation Flow

### Step-by-Step Invitation Process
1. Log into your BeProfit account
2. Navigate to **Settings → Workspace**
3. Locate the **Teammates** section (below the Shops section)
4. Click the **"Invite New Teammate"** button (green/teal CTA with person-plus icon, positioned top right of the Teammates section)
5. Fill in the teammate details:
   - **Name** — team member's display name
   - **Email address** — where the invitation will be sent
   - **Role** — select either **Admin** or **View Only**
6. Click **"Save"**
7. An invitation email is automatically sent to the provided email address with access instructions

### Alternative Invitation Location
The Help Center article mentions that users can also find an "Invite Team members" option at the **bottom of the dashboard** — this may be a contextual prompt or persistent CTA visible to workspace owners/admins who haven't yet invited teammates.

### Invitation Acceptance
The specific invitation acceptance flow is not documented in the Help Center. Based on standard patterns, the invited user likely:
1. Receives an email with an invitation link
2. Clicks the link to create a BeProfit account (or logs in if they already have one)
3. Is automatically added to the workspace with the assigned role

---

## Invitation Status Tracking

The Teammates table in Settings → Workspace includes a **Status** column (confirmed from the real dashboard visual inventory). While the specific status values are not enumerated in the Help Center, they likely include:

| Status | Meaning |
|--------|---------|
| **Active** | Teammate has accepted the invitation and is using the account |
| **Pending** | Invitation sent but not yet accepted |
| **Declined** | Invitation was rejected (speculative — not confirmed) |

The Status column provides visibility into whether invited teammates have actually joined the workspace, allowing admins to follow up on outstanding invitations.

---

## Roles & Permissions System

BeProfit implements a **binary role system** with exactly two roles:

### Role Types

| Role | Access Level | Description |
|------|-------------|-------------|
| **Admin** | Full access | "Users with full access to all features, settings, and data within your BeProfit account" |
| **View Only** | Read-only access | "Users who can see all dashboard information but cannot make changes to settings or configurations" |

### Permission Breakdown

#### Admin Role Capabilities
- View all dashboard data and reports
- Configure account settings (COGS, fulfillment, calculation preferences, etc.)
- Manage integration connections (ad platforms, e-commerce platforms, Google Sheets)
- Add or remove users (invite teammates, change roles, remove teammates)
- Update cost settings and data sources
- Create and edit custom metrics (Plus plan only)
- Export data
- Schedule reports

#### View Only Role Capabilities
- View all dashboard data and reports
- Access historical data
- Export reports
- **Cannot** modify any settings or configurations
- **Cannot** invite or manage teammates
- **Cannot** change integrations or cost settings

### Critical Observation: Data Visibility is NOT Role-Gated
Both Admin and View Only roles can see **all dashboard information**. There is no documented ability to:
- Hide financial data (revenue, profit, margins) from View Only users
- Restrict access to specific pages or sections
- Limit visibility to specific shops within the workspace
- Gate sensitive cost data (COGS, supplier costs) from certain roles

This is a significant limitation for businesses that want to share marketing analytics with team members without exposing full financial data.

---

## Permission Granularity

### What Granularity Exists
The permission system is **role-based only** — either full access (Admin) or read-only (View Only). There is no documented:

| Granularity Type | Supported? | Notes |
|-----------------|------------|-------|
| **Page-level permissions** | No | Cannot restrict access to specific pages (e.g., Marketing only) |
| **Feature-level permissions** | No | Cannot allow report creation but block settings changes |
| **Shop-level permissions** | No | Cannot restrict a teammate to specific shops within the workspace |
| **Data-level permissions** | No | Cannot hide cost/revenue data from certain users |
| **Export permissions** | Partial | View Only can export but not modify — this is the only meaningful access control |

### Per-Shop Permissions
From file 022, the workspace data model includes:
```
Teammates (users with permissions)
├── Name
├── Status (Active, Pending)
└── Permissions (per-shop access levels)
```

The dashboard visual inventory shows a **"Permissions"** column in the Teammates table, and file 022 notes "per-shop access levels" in the data model implications. However, the Help Center article only describes two roles (Admin/View Only) with no mention of per-shop permission configuration.

**This is a contradiction** between what the UI suggests (per-shop permissions column) and what the documentation describes (binary Admin/View Only). It's possible that:
1. Per-shop permissions exist but are undocumented
2. The "Permissions" column simply shows "Admin" or "View Only" as a label
3. Per-shop permissions are a newer feature not yet documented

---

## Data Access Controls

### Financial Data Visibility
All team members (regardless of role) can view all financial data. There is no documented data access control layer that restricts visibility to:
- Revenue and sales data
- Cost data (COGS, shipping costs, operational expenses)
- Profit margins
- Marketing spend and ROAS
- Customer data (LTV, cohort analysis)

### Action-Based Controls
The only access control is **action-based**: Admin can modify, View Only cannot. Both roles see the same data.

---

## Team Management Administration

### Managing Existing Teammates
From the Settings → Workspace page, administrators can:

1. **View current user details** — Name, Status, and Permissions columns visible in the Teammates table
2. **Change role assignments** — Switch between Admin and View Only for existing teammates
3. **Remove users** — Remove teammates from the workspace (specific UI flow not documented)
4. **Invite additional teammates** — Via the "Invite New Teammate" button

### Workspace Owner
The workspace owner (original account creator) has an implicit role above Admin:
- **Only the workspace owner receives workspace-related system emails** (from FAQ: "only the shop reports can be set by the user. The workspace owner is the one who receives workspace-related emails")
- Workspace owner cannot be removed
- Workspace owner manages billing and subscription

### Audit Trail
There is **no documented audit trail** for team management actions. No log of:
- Who changed whose permissions
- When teammates were added or removed
- What actions each teammate performed
- Login history per teammate

---

## Teammate Limit per Plan

The Help Center does **not document** any teammate limits per plan tier. Based on available information:
- There is no stated maximum number of teammates per workspace
- There is no mention of teammate counts varying by plan (Basic, Pro, Ultimate, Plus)
- It's possible that teammate limits exist but are undocumented, or that unlimited teammates are included with all plans

For comparison, the dashboard visual inventory shows "Teammates: 1" in the Workspace info card, suggesting this is tracked as a count — which implies there may be a cap even if it's not documented.

---

## Collaboration Features

### Shared Views
Both Admin and View Only roles see the **same dashboard, reports, and analytics**. There is no concept of:
- Personal dashboards vs shared dashboards
- Custom views per user
- Saved filters per user
- User-specific dashboard layouts

All users in a workspace see the same data and layout. The dashboard customization documented in file 011 (drag-and-drop widget rearrangement) is likely workspace-wide, not per-user.

### Comments & Annotations
There is **no documented commenting or annotation system**. Users cannot:
- Add comments to specific orders, products, or metrics
- Leave notes on reports for other team members
- Tag teammates in observations
- Create threaded discussions around data points

### Shared Reports
Scheduled reports (documented in file 023) can be sent to **multiple email addresses**, which is the primary mechanism for sharing data with teammates and external stakeholders. However:
- This is email-based sharing, not collaborative report viewing
- There is no link-sharing for reports or dashboards
- There is no guest access for non-BeProfit users to view reports via a shared URL

### Real-Time Collaboration
There is no documented real-time collaboration features:
- No "who's online" indicators
- No simultaneous editing locks or warnings
- No activity feed showing what other teammates are doing

---

## Data Protection & Security

From the BeProfit Data Protection article:

### Infrastructure Security
- **Private, firewall-protected servers** accessible only to authorized users
- Data connections use **encryption and advanced security token mechanisms** for identity verification
- Integrations with ad platforms and third-party services operate through **server-to-server connections**

### Compliance
- **GDPR compliant** — adheres to GDPR requirements and regulations
- Data retrieval processes comply with the e-commerce platform's security standards
- Users can request **data deletion** via support tickets

### User-Level Security
- Users are "encouraged to create passwords" for enhanced security
- No mention of:
  - Two-factor authentication (2FA)
  - Single sign-on (SSO)
  - IP allowlisting
  - Session timeout policies
  - Password complexity requirements

### Privacy Resources
- Privacy Policy: https://www.become.co/beprofit-profit-tracker/privacy-policy.php
- Terms & Conditions: https://www.become.co/beprofit-profit-tracker/terms-and-conditions.php

---

## Workspace Email Notification Routing

From the FAQ (cross-referenced with file 024):

- **Workspace system emails** (billing, account changes) → only workspace owner
- **Daily profit emails** → configurable per user (subscribe/unsubscribe)
- **Scheduled report emails** → multiple recipients (configurable email addresses)
- **Shop-specific reports** → can be configured by the user

**Key limitation:** "You can't control the workspace email recipient. Only the shop reports can be set by the user." This means team members cannot individually subscribe to workspace-level notifications — only the owner receives them.

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| Teammates section header | Section title | Settings → Workspace | "Teammates" in bold text |
| Invite New Teammate button | CTA button | Teammates section, top right | Green/teal button with person-plus icon |
| Teammates table | Data table | Settings → Workspace | Columns: Name, Status, Permissions |
| Name column | Table column | Teammates table | Teammate display name |
| Status column | Table column | Teammates table | Active, Pending status badges |
| Permissions column | Table column | Teammates table | Admin / View Only role label |
| Invite modal (inferred) | Modal dialog | Triggered by Invite button | Name, Email, Role selector fields |
| Role selector | Dropdown/radio | Invite modal | Admin / View Only choice |
| Remove teammate action | Button/link | Teammates table row | Remove user from workspace |
| Change role action | Dropdown/link | Teammates table row | Switch between Admin and View Only |
| Dashboard invite CTA | Link/button | Bottom of dashboard | "Invite Team members" prompt |

---

## Data Model Implications

### Entity Relationships
```
Workspace (1) ──→ (N) Teammates
Teammate
├── id (unique identifier)
├── name (display name)
├── email (unique, invitation target)
├── role (enum: Admin, View Only)
├── status (enum: Active, Pending, possibly Declined)
├── invited_at (timestamp)
├── accepted_at (timestamp, null if pending)
├── invited_by (reference to inviting teammate/owner)
└── workspace_id (reference to workspace)

Workspace (1) ──→ (1) Owner
Owner extends Teammate with:
├── billing_access (true)
├── receives_workspace_emails (true)
└── cannot_be_removed (true)
```

### Permission Model
```
Role-Based Access Control (RBAC) — Simplest form:
├── Admin → all_actions: true
└── View Only → read_actions: true, write_actions: false

No attribute-based (ABAC) or resource-based access control.
No per-shop, per-page, or per-data-type permissions.
```

### Invitation Entity
```
Invitation
├── id
├── workspace_id
├── inviter_id (teammate who sent invitation)
├── invitee_email
├── invitee_name
├── assigned_role
├── status (sent, accepted, expired, declined)
├── sent_at
├── accepted_at (null until accepted)
└── token (unique invitation link token)
```

---

## Limitations & Gaps

1. **Only two roles (Admin/View Only).** The binary role system is too simplistic for most business contexts. There is no Marketing, Finance, Operations, or custom role. A marketing team member either sees ALL financial data (View Only) or can modify everything (Admin).

2. **No data-level access control.** Both roles see all data. There is no way to restrict a View Only user from seeing cost data, profit margins, or other sensitive financial information. This prevents businesses from sharing marketing dashboards with freelancers or contractors.

3. **No per-shop permissions.** Despite the "Permissions" column suggesting granularity, the documentation only describes workspace-wide roles. A multi-store merchant cannot give a teammate access to Store A but not Store B.

4. **No collaboration features.** There are no comments, annotations, shared views, or team discussion features. The only "sharing" mechanism is email-based scheduled reports.

5. **No audit trail.** There is no logging of who did what, when. This is a compliance risk for businesses in regulated industries and a practical gap for team accountability.

6. **Workspace email routing is owner-only.** Team members cannot subscribe to workspace-level system notifications. Only the workspace owner receives billing, account, and workspace-related emails.

7. **No 2FA or SSO.** The Data Protection article mentions encryption and GDPR compliance but does not mention two-factor authentication, single sign-on (SAML/OAuth), or other modern authentication methods. This is a security gap for enterprise customers.

8. **No teammate limits documentation.** Whether there are plan-based limits on teammate count is unknown, making it impossible to evaluate the team feature's scalability across plans.

9. **No guest or external access.** There is no way to share a read-only dashboard link with clients, investors, or other external stakeholders without giving them a full BeProfit account within the workspace.

10. **Dashboard customization may not be per-user.** If dashboard widget layout is workspace-wide (not per-user), team members with different roles (marketing vs finance) cannot customize their views independently.

---

## Relevance to Our Build

1. **Implement granular role-based permissions from launch.** Offer at least 4-5 roles: Owner, Admin, Finance, Marketing, Viewer. Each role should have feature-level and data-level permissions. A Marketing role might see ad spend and ROAS but not COGS or supplier costs.

2. **Build per-shop access control.** For multi-store merchants, allow workspace admins to grant teammates access to specific shops. An agency managing 5 client stores should be able to give each client access to only their own store's data.

3. **Add team collaboration features.** Implement commenting on data points (orders, products, reports), @mentions, and an activity feed. This transforms BeProfit from a solo analytics tool into a team intelligence platform.

4. **Implement SSO and 2FA.** Enterprise customers require SAML SSO and 2FA. Even for small merchants, 2FA is increasingly expected. These are table stakes for enterprise sales.

5. **Build an audit trail.** Log all significant actions with actor, timestamp, and details. Show an activity log accessible to workspace admins. This is critical for compliance (SOX, SOC 2) and team accountability.

6. **Create shareable dashboard links.** Allow workspace admins to generate read-only dashboard URLs that can be shared with external stakeholders (clients, investors, board members) without requiring a BeProfit account. Include optional password protection and expiration.

7. **Support custom roles.** Beyond preset roles, allow workspace admins to create custom roles with fine-grained permission checkboxes: which pages to access, which data to see, which actions to perform. This accommodates diverse organizational structures.

8. **Make per-user dashboard customization available.** Each team member should have their own dashboard layout, saved filters, and favorite reports. Marketing sees marketing widgets by default; finance sees P&L and margins.

9. **Implement team notification routing.** Allow each team member to independently control which notifications they receive: daily summaries, alert types, report schedules. Don't restrict workspace-level notifications to the owner only.

10. **Add external guest access with limited seats.** Allow agencies to invite client users as "guests" who see only their store's data with a simplified interface. This supports the agency use case without requiring clients to understand the full product.
