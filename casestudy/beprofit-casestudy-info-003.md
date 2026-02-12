# BeProfit Account Creation & Setup

## Source
- **URLs:**
  - https://beprofit.co/ (main website — signup CTAs and trial info)
  - https://beprofit.co/register/ (registration flow — full form analysis)
  - https://app.beprofit.co/login (login page reference)
  - https://help.runviably.com/beprofit/how-can-i-change-my-plan
  - https://help.runviably.com/beprofit/how-can-i-cancel-my-plan
  - https://help.runviably.com/beprofit/adding-team-members-to-your-beprofit-account
  - https://help.runviably.com/beprofit/where-can-i-view-my-billing-history
  - https://help.runviably.com/beprofit/change-store-name-in-beprofit
  - https://help.runviably.com/beprofit/change-timezone
  - https://help.runviably.com/beprofit/changing-your-language-settings-in-beprofit
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — account and plan details)
- **Category:** Account Setup / Registration
- **Date Captured:** 2026-02-12

---

## Account Creation Process

### Sign-Up Methods
BeProfit offers two primary authentication methods during registration:

1. **Email/Password Registration** — Standard account creation with email and password
   - Password requirements: minimum 8 characters, must contain letters and numbers
   - Password strength validated using zxcvbn library (client-side)
   - Email is checked server-side for existing accounts
2. **Google Sign-In** — OAuth integration ("Continue with Email" button, which references Google OAuth)
3. **Shopify OAuth** — Direct integration available during platform connection step (not a primary signup method, but a connection method post-signup)

**Note:** Login is at `https://app.beprofit.co/login`. The registration flow is at `https://beprofit.co/register/`.

### Existing Account Detection
If BeProfit detects the user's device is linked to an existing account, it shows a verification code flow to link the new session to the existing account rather than creating a duplicate.

---

## Sign-Up Flow (10 Steps)

The registration flow is multi-step with progress indicators and conditional fields:

### Step 1: Email Entry
- Enter email address
- Checkbox: "I wish to receive update notifications and marketing emails"
- Server-side check for existing accounts
- If existing: verification code flow for account linking

### Step 2: Agency Registration (Conditional)
- Only shown if user indicates agency ownership
- Fields: Agency name, Agency website, Agency relation
- Skippable step

### Step 3: Profile Details
- Full Name (required)
- Job Title (dropdown):
  - Agency owner
  - Brand owner
  - E-commerce manager
  - Finance manager
  - Operations
  - Marketing Manager
  - Data analyst
  - Growth manager
  - Other (shows additional text input)
- Mobile Number (international format with country code selection and flag display)
- Password (min 8 chars, letters + numbers required)

### Step 4: Profile Completion
- "How did you hear about BeProfit?" (dropdown with conditional follow-ups)
- Number of shops/brands: 1, 2-5, 6-10, 10+
- Annual GMV / Monthly order volume: $500K ranges up to $100M+

### Step 5: Additional Questions (Part A)
- Consolidation of platform/goal data based on previous selections

### Step 6: Additional Questions (Part B)
- Main goal using BeProfit (multi-select checkboxes):
  - Financial overview
  - Location tracking
  - P&L clarity
  - Profit optimization
  - ROAS/POAS measurement
  - Custom reports
  - (and other options)
- Current business performance tracking method:
  - Spreadsheet
  - eCommerce Platform
  - Internal BI
  - Other App (shows additional text input for app name)

### Step 7: Platform Selection
- eCommerce platform checkboxes (multi-select):
  - Shopify
  - WooCommerce
  - Amazon
  - Wix

### Step 8: Platform-Specific Connection Setup
Different fields depending on selected platform(s):

**Shopify:**
- Store URL (`.myshopify.com` format)

**WooCommerce:**
- Store URL (full domain)
- Store name
- Store owner name
- Store email
- Store timezone (dropdown)

**Amazon:**
- Store name
- Storefront URL
- Amazon Marketplace (dropdown)
- Timezone (dropdown)

**Wix:**
- (Specific fields not detailed in the extracted source)

### Step 9: Platform Connection
- Store-specific credential entry and OAuth flows
- Helper links: "I don't remember my store URL", "Can't find your storefront URL?"
- Discount/coupon code input with API validation

### Step 10: Mobile Redirect
- Desktop-optimized completion — if on mobile, a link is sent via email to complete setup on desktop
- "Continue on mobile anyway" option available

---

## Plan Selection During Signup

Plan selection is **not visible during the initial signup flow** on the registration page. The homepage promotes "Start Free Trial" CTAs but does not show pricing tiers during registration. Key observations:

- **Free trial:** 14-day free trial available for all plans
- **Plan selection happens post-registration:** Users select/change plans after account creation
- **No free plan:** "No free plan for new members" (per FAQ), but trial days available
- **Plan types referenced in documentation:** Basic, Pro, Ultimate, Plus
- **Annual billing discount:** "All annual plans offer a discounted monthly rate since payment is made upfront"
- **GMV-based pricing:** "The pricing structure adapts to individual business setups and GMV"
- **Pricing page:** Uses iframe to load dynamic pricing content, so specific prices are not statically visible
- **Shopify vs Enterprise toggle:** Pricing page has a toggle between "shopify" and "enterprise" shop kinds

### Changing Plans
1. Click profile icon in upper right corner
2. Select "Billing History" from dropdown
3. Click "Change Plan"
4. Choose to upgrade or downgrade
5. Select billing cycle (annual or monthly)

### Cancelling Plans
- **No self-service cancellation** — users must contact support via help chat
- Framed as an opportunity for dialogue: "We're here to assist you and would love the opportunity to discuss your needs and explore any potential solutions or alternatives"
- No documented refund or proration policy in Help Center

---

## Authentication Details

### Login Methods
- Email/Password (standard)
- Google OAuth
- Shopify OAuth (via store connection)

### Password Requirements
- Minimum 8 characters
- Must contain both letters and numbers
- Strength evaluated client-side using zxcvbn library

### 2FA / Two-Factor Authentication
Not mentioned in any Help Center documentation. No references to 2FA, MFA, or additional security verification beyond the basic login.

### Session Management
Not documented in Help Center articles.

### Login Email Changes
Per FAQ: Cannot change login email directly. Must "invite a new user with the desired email address" for security purposes.

---

## Initial Configuration After Account Creation

There is no formal "configuration wizard" post-signup. Instead, the registration flow itself incorporates platform connection (Steps 7-9), which triggers the initial data sync. Post-registration setup is done through the Settings area:

### Key Initial Settings

**Store Settings (Settings → Shop → General Settings):**
- Store name — automatically synced via webhooks from the connected platform ("BeProfit will automatically change its name for you")
- Timezone — adjustable via dropdown (Settings → Shop → General Settings)
- Language — changeable via Shop Format Setting dropdown, or use "Use default browser settings" to auto-sync with browser language

**Billing (Profile Icon → Billing):**
- View plan details
- Billing history, amount billed, plan name, due dates, dates charged

**Team Members:**
- Available via "Invite Team Members" at dashboard's lower section
- Also manageable via Settings → Workspace
- Two roles: Admin (full access) and View Only (read-only, can export reports)

---

## Configuration Options & Defaults

| Setting | Default | Options | Notes |
|---------|---------|---------|-------|
| Store name | Pulled from connected platform | Auto-synced via webhooks | Cannot manually override — changes on platform are auto-detected |
| Timezone | Not specified (likely platform default) | Dropdown of timezones | Settings → Shop → General Settings |
| Language | Not specified | Dropdown (languages not listed) + "Use default browser settings" | Settings → Shop → General Settings → Shop Format Setting |
| Marketing emails | Opt-in checkbox during signup | Yes/No | Checked during registration Step 1 |
| Billing cycle | Not specified | Annual (discounted) or Monthly | Selectable when choosing plan |
| User role (team) | Admin (account creator) | Admin, View Only | Set during team member invitation |

---

## Limitations & Caveats

1. **No self-service cancellation:** Users cannot cancel their plan through the UI — they must contact support via chat.
2. **No login email change:** Cannot change the email associated with the account. Must create a new invitation to a different email.
3. **No 2FA documented:** No two-factor authentication mentioned anywhere in the Help Center, which is a security concern for a financial analytics tool.
4. **Desktop-optimized signup:** Mobile users are encouraged to complete setup on desktop, with a "Continue on mobile anyway" fallback. This suggests the onboarding experience is not fully optimized for mobile.
5. **No free plan:** Only trial-based access; no permanent free tier.
6. **Account pausing loses access:** "Pausing your account means you won't have access to your data" (per FAQ).
7. **Multi-shop requires Plus or separate subscriptions:** Non-Plus plans require a separate subscription per shop.
8. **Language options not documented:** The Help Center doesn't list which languages are supported — only that a dropdown exists.
9. **GMV-based pricing opacity:** Pricing adapts to business size (GMV), making it non-transparent. Users must interact with the pricing page or contact support for actual costs.

---

## Plan/Tier Feature Gating

| Feature | Basic | Pro | Ultimate | Plus |
|---------|-------|-----|----------|------|
| Free trial | 14 days | 14 days | 14 days (also separate trial available) | 14 days |
| Multiple shops in one subscription | No | No | No | Yes |
| Custom metrics creation | No | No | No | Yes (created by BeProfit team) |
| Bulk data export from Custom Reports | No | No | No | Yes |
| Admin + View Only roles | Yes | Yes | Yes | Yes |

*Note: This is an incomplete feature matrix. The Help Center and pricing page do not provide a comprehensive feature comparison. Pricing is dynamically loaded and GMV-dependent.*

---

## Related Articles

- How can I change my plan? — https://help.runviably.com/beprofit/how-can-i-change-my-plan
- How can I cancel my plan? — https://help.runviably.com/beprofit/how-can-i-cancel-my-plan
- Adding Team Members to Your BeProfit Account — https://help.runviably.com/beprofit/adding-team-members-to-your-beprofit-account
- Where can I view my billing history? — https://help.runviably.com/beprofit/where-can-i-view-my-billing-history
- Change Timezone — https://help.runviably.com/beprofit/change-timezone
- Changing Your Language Settings in BeProfit — https://help.runviably.com/beprofit/changing-your-language-settings-in-beprofit

---

## Relevance to Our Build

### Account & Auth Takeaways
1. **Multi-step registration is comprehensive but long:** BeProfit's 10-step signup collects job title, GMV, goals, tracking methods, and platform connections all before the user sees the dashboard. This is good for segmentation/personalization but risks abandonment. We should consider a shorter initial signup (email + platform connection) with progressive profiling later.

2. **Platform connection during signup is smart:** Embedding the store connection step in the signup flow means data starts syncing immediately. We should adopt this pattern — minimize time-to-first-value.

3. **No self-service cancellation is aggressive:** Requiring support contact for cancellation is a friction-based retention tactic. We should decide whether to adopt this (higher retention but worse user experience) or offer self-service cancellation (better UX, possibly higher churn).

4. **GMV-based pricing is opaque:** Dynamic pricing based on business size makes comparison shopping difficult. We could differentiate with transparent, publicly listed pricing.

5. **Role system is minimal:** Only Admin and View Only roles. A more granular permission system (e.g., Marketing Manager, Finance, Operations roles with specific data access) could be a differentiator.

6. **No 2FA is a vulnerability:** For a tool handling financial data, lack of documented 2FA is surprising. We should include 2FA from launch as a trust signal.

7. **Desktop-first bias:** The mobile redirect during signup suggests their core experience is desktop-optimized. Mobile-first or mobile-parity could be a differentiator if our target audience works across devices.

8. **Job title and GMV collection during signup:** This data is valuable for segmentation, personalized onboarding, and sales outreach. We should collect similar data but consider doing it post-dashboard-access to reduce signup friction.

9. **Analytics tracking depth:** BeProfit's signup page uses GTM, Facebook Pixel, LinkedIn Insight Tag, HubSpot, Pinterest Conversion Tracking, and FullStory. This reveals a heavy paid acquisition and retargeting strategy across multiple channels. We should plan similar tracking infrastructure from day one.
