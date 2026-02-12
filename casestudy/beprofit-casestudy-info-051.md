# BeProfit Account Settings & Profile Management

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Category:** Help Center / Settings & Configuration
- **Subcategory:** Account Settings & Profile
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research to populate

---

## Research Objective

Document all account-level settings, profile management options, email/notification preferences, and display customization settings available in BeProfit. This information is found in the help center under account management, profile settings, and user preferences sections.

---

## Account-Level Settings

### User Profile Management

**Expected Help Articles:**
- "How to update your profile information"
- "Managing your account details"
- "Changing your display name and avatar"
- "Account security settings"

**Key Areas to Document:**
- [ ] Profile information fields (name, email, phone, company)
- [ ] Avatar/profile picture upload capabilities
- [ ] Account ownership and admin designation
- [ ] Personal vs business account types (if applicable)
- [ ] Account linking (multiple stores under one account)
- [ ] Language and localization preferences
- [ ] Date format preferences (MM/DD/YYYY vs DD/MM/YYYY)

**Questions to Answer:**
1. Can users have multiple email addresses associated with one account?
2. Is there a user profile page or is account info managed through settings?
3. Can users change their primary email address?
4. What account information is required vs optional?
5. Is there two-factor authentication (2FA) available?

---

### Email & Notification Preferences

**Expected Help Articles:**
- "Managing email notifications"
- "Notification settings and preferences"
- "Alert configuration"
- "Daily/weekly digest settings"
- "Unsubscribing from emails"

**Key Areas to Document:**
- [ ] Types of email notifications available:
  - Data sync completion notifications
  - Error/issue alerts
  - Weekly/monthly summary reports
  - Product updates and feature announcements
  - Billing and payment reminders
  - Marketing emails and newsletters
  - Low profit margin alerts
  - Negative profit alerts
  - Integration disconnection warnings
- [ ] Notification frequency controls (real-time, daily digest, weekly digest)
- [ ] In-app notification center (bell icon in header)
- [ ] Notification delivery channels (email, in-app, SMS, push)
- [ ] Per-store notification settings
- [ ] Team notification settings (who receives what)
- [ ] Custom alert thresholds (e.g., notify when profit drops below $X)

**Questions to Answer:**
1. Are notifications enabled by default or opt-in?
2. Can users customize alert thresholds (e.g., "alert me when ROAS drops below 2.0")?
3. Is there a notification history or log?
4. Can users snooze or dismiss notifications?
5. Are there role-based notification settings (admin vs team member)?

---

### Timezone, Locale & Display Settings

**Expected Help Articles:**
- "Setting your timezone"
- "Changing display preferences"
- "Currency display options"
- "Language settings"

**Key Areas to Document:**
- [ ] Timezone configuration:
  - Dropdown list of supported timezones
  - Auto-detect timezone option
  - Impact on report date ranges and data display
  - Per-store timezone vs account-wide timezone
- [ ] Locale settings:
  - Language selection (English, Spanish, etc.)
  - Regional number formatting (comma vs period for decimals)
  - Currency symbol positioning
- [ ] Display preferences:
  - Dashboard layout customization
  - Theme settings (light/dark mode - if available)
  - Density settings (compact vs comfortable)
  - Default date range for reports
  - Default currency display (store currency vs converted)
- [ ] Accessibility settings (if any)

**Questions to Answer:**
1. What timezones are supported? All standard timezones or limited list?
2. Does timezone affect data sync times or only display?
3. Is language fully localized or just UI elements?
4. Can users set different timezones for different stores?
5. What is the default timezone if not set?

---

### Team & User Management

**Expected Help Articles:**
- "Inviting team members"
- "User roles and permissions"
- "Managing team access"
- "Removing users"
- "Setting user permissions by store"

**Key Areas to Document:**
- [ ] User roles available:
  - Account Owner
  - Admin
  - Team Member / User
  - Viewer / Read-Only
  - Custom roles (if available)
- [ ] Permission levels per role:
  - View reports
  - Edit settings
  - Manage integrations
  - Invite users
  - Manage billing
  - Export data
  - Delete data
- [ ] User invitation flow
- [ ] Per-store access control (can you limit users to specific stores?)
- [ ] User activity logging
- [ ] User limits by plan tier
- [ ] Pending invitations management
- [ ] User deactivation vs deletion

**Questions to Answer:**
1. How many team members are allowed per plan?
2. Can you assign different permissions to different stores for the same user?
3. Is there an audit log of user actions?
4. Can team members see each other's information?
5. What happens to user data when they're removed?

---

### Account Security

**Expected Help Articles:**
- "Two-factor authentication"
- "Password requirements"
- "Session management"
- "Login security"
- "Account recovery"

**Key Areas to Document:**
- [ ] Password requirements:
  - Minimum length
  - Complexity requirements
  - Password change frequency requirements
- [ ] Two-factor authentication (2FA):
  - Available methods (SMS, authenticator app, email)
  - Enrollment process
  - Backup codes
  - Recovery options if 2FA device lost
- [ ] Session management:
  - Session timeout duration
  - Active sessions display
  - Remote logout capability
  - "Remember this device" option
- [ ] Login security:
  - Failed login attempt lockout
  - IP whitelisting (if available)
  - Login activity log
  - Suspicious activity alerts
- [ ] Account recovery:
  - Password reset flow
  - Email verification process
  - Account lockout recovery

**Questions to Answer:**
1. Is 2FA optional or mandatory?
2. Does BeProfit support SSO (Single Sign-On)?
3. Can account owners enforce 2FA for all team members?
4. What happens after X failed login attempts?
5. How long do password reset links remain valid?

---

### Data Export & Portability

**Expected Help Articles:**
- "Exporting your data"
- "Data download options"
- "Report export formats"
- "Automated data exports"

**Key Areas to Document:**
- [ ] Export formats available:
  - CSV
  - Excel (XLSX)
  - Google Sheets integration
  - PDF reports
  - API access
- [ ] What data can be exported:
  - All orders
  - All products
  - Custom reports
  - Full account data
  - Historical data
- [ ] Export frequency limits
- [ ] Export file size limits
- [ ] Automated export scheduling
- [ ] Export delivery methods (download, email, cloud storage)
- [ ] Data retention for exports

**Questions to Answer:**
1. Is there a limit to how often you can export data?
2. Can you schedule recurring exports (e.g., weekly CSV to email)?
3. What's the maximum date range for a single export?
4. Are exports available on all plan tiers?
5. Do exports include all integrations data or just core order/product data?

---

### API Access & Developer Settings

**Expected Help Articles:**
- "BeProfit API documentation"
- "Generating API keys"
- "API rate limits"
- "Webhook configuration"

**Key Areas to Document:**
- [ ] API availability:
  - Available on which plan tiers
  - API documentation URL
  - API authentication methods
  - API rate limits
- [ ] API capabilities:
  - Read-only vs read-write
  - Available endpoints
  - Data accessible via API
- [ ] Webhook support:
  - Available events
  - Webhook URL configuration
  - Webhook retry logic
  - Webhook security (signatures)
- [ ] Developer tools:
  - API key generation and management
  - Sandbox/test environment
  - API usage dashboard
  - API logs

**Questions to Answer:**
1. Does BeProfit have a public API?
2. Is API access restricted to certain plan tiers?
3. What are the API rate limits?
4. Can you create multiple API keys?
5. Is there webhook support for real-time data sync?

---

### Account Preferences & Defaults

**Expected Help Articles:**
- "Setting default preferences"
- "Dashboard customization"
- "Report defaults"

**Key Areas to Document:**
- [ ] Default dashboard view (which page loads on login)
- [ ] Default date range for reports
- [ ] Default currency for multi-store accounts
- [ ] Default customer segment filter
- [ ] Default comparison period (vs previous period, vs last year)
- [ ] Default chart types and visualizations
- [ ] Auto-refresh settings for live data
- [ ] Default sort orders for tables
- [ ] Metric visibility toggles (hide/show certain KPIs)

**Questions to Answer:**
1. Can users save multiple dashboard layouts?
2. Are preferences stored per user or per account?
3. Can you reset to default settings?
4. Do preferences sync across devices?
5. Can admins set default preferences for new team members?

---

## Integration with Other Settings Areas

### Cross-References to Other Help Articles

This section should document how account settings interact with:
- **Store Configuration** (file 052): Account settings vs store-specific settings
- **Billing & Plans** (file 053): How account settings affect plan features
- **Team Roles** (if separate article): Permission implications for changing settings
- **Data Privacy** (file 055): GDPR/privacy controls in account settings

---

## Common Questions & Edge Cases

**Questions Revealed by Help Documentation:**
- What settings are account-wide vs per-store?
- Can settings be bulk-applied across multiple stores?
- What happens to settings when downgrading plans?
- Are there hidden settings available only via support?
- What settings affect data sync or calculation accuracy?

---

## Research Checklist

To complete this document, systematically search the help center for:
- [ ] "account settings"
- [ ] "profile"
- [ ] "preferences"
- [ ] "notifications"
- [ ] "email alerts"
- [ ] "timezone"
- [ ] "language"
- [ ] "team members"
- [ ] "user roles"
- [ ] "permissions"
- [ ] "API"
- [ ] "export"
- [ ] "security"
- [ ] "two-factor authentication"
- [ ] "password"

Visit each article found and extract:
1. Feature descriptions
2. Step-by-step setup instructions
3. Screenshots descriptions (what UI elements are shown)
4. Configuration options and defaults
5. Plan tier availability
6. Limitations or caveats
7. Related articles and cross-links

---

## Next Steps

After manual research:
1. Fill in all "Expected Help Articles" sections with actual article titles and URLs
2. Complete all checkboxes with documented findings
3. Answer all "Questions to Answer" sections
4. Add screenshots descriptions from help center images
5. Document any settings not captured in this template
6. Note any deprecated or beta features mentioned
7. Cross-reference with PRD requirements to ensure completeness

---

**Status:** Template ready for manual research population
**Estimated Completion:** Requires 1-2 hours of systematic help center exploration
**Dependencies:** Access to BeProfit help center at https://help.runviably.com/beprofit
