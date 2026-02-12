# BeProfit Billing, Plans & Subscriptions

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Secondary URLs:**
  - https://beprofit.co/pricing (marketing site pricing page)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store - pricing info)
- **Category:** Help Center / Billing & Account Management
- **Subcategory:** Plans, Pricing, Subscriptions
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research to populate

---

## Research Objective

Document all billing-related help articles, plan names and pricing, feature differences between tiers, upgrade/downgrade flows, payment methods, subscription management, cancellation process, and data retention policies. This information should come from both the help center and the public pricing page.

---

## Plan Tiers Overview

### Current Plan Structure

**Expected Help Articles:**
- "BeProfit pricing plans explained"
- "Choosing the right plan"
- "Plan comparison"
- "What's included in each plan?"

**Key Areas to Document:**
- [ ] Plan tier names:
  - Free tier (if exists)
  - Starter / Basic tier name
  - Pro / Growth tier name
  - Ultimate / Enterprise tier name
  - Custom / Agency tier (if exists)
- [ ] Monthly pricing for each tier:
  - Price in USD
  - Price in other currencies (EUR, GBP, etc.)
  - Monthly vs annual pricing (annual discount percentage)
  - Price per additional store (if applicable)
- [ ] Plan positioning:
  - Target customer for each tier
  - Marketing copy for each plan
  - "Most Popular" designation
  - Recommended plan indicators

**Questions to Answer:**
1. How many plan tiers are there?
2. Is there a free tier or free trial only?
3. What's the entry-level paid plan price?
4. What's the discount for annual vs monthly billing?
5. Are prices shown including or excluding VAT/taxes?

---

### Free Trial Details

**Expected Help Articles:**
- "Free trial information"
- "Starting your free trial"
- "What happens when trial ends?"
- "Extending your trial"
- "Trial limitations"

**Key Areas to Document:**
- [ ] Trial duration:
  - Number of days (7, 14, 30?)
  - Trial start trigger (account creation, store connection, first login)
  - Trial countdown display (e.g., "3 trial days left" in sidebar)
- [ ] Trial feature access:
  - Which plan features are available during trial?
  - Are all features unlocked or limited to a specific tier?
  - Data/usage limits during trial
- [ ] Trial requirements:
  - Credit card required upfront or not?
  - Email verification required
  - Store connection required to start trial
- [ ] Trial expiration:
  - What happens when trial ends (account locked, read-only, deleted?)
  - Grace period after trial expires
  - Trial extension options (can you request more time?)
  - Auto-conversion to paid plan or manual upgrade required
- [ ] Trial restrictions:
  - One trial per email address
  - One trial per store/domain
  - Trial abuse prevention measures

**Questions to Answer:**
1. How long is the free trial?
2. Do you need to enter payment info to start trial?
3. What features are accessible during trial?
4. What happens to your data if you don't upgrade after trial?
5. Can you restart or extend the trial?

---

### Plan Usage Limits

**Expected Help Articles:**
- "Plan limits and quotas"
- "Order volume limits"
- "Store limits by plan"
- "User/team member limits"
- "Integration limits"

**Key Areas to Document:**
- [ ] Order volume limits per plan:
  - Monthly order limit (e.g., Starter: 100 orders/month, Pro: 1000, Ultimate: unlimited)
  - How order count is calculated (fulfilled orders only, or all orders?)
  - What happens when limit is exceeded (block, overage fee, forced upgrade?)
  - Order history access limits
- [ ] Store limits:
  - Number of stores allowed per plan
  - Additional store pricing (e.g., +$10/month per store)
  - Platform-specific limits (Shopify vs Amazon vs WooCommerce)
- [ ] User/team member limits:
  - Number of users per plan (e.g., Starter: 1, Pro: 3, Ultimate: unlimited)
  - Additional user pricing
- [ ] Integration limits:
  - Number of ad accounts connectable
  - Number of email/SMS integrations
  - Number of shipping integrations
  - API call limits
- [ ] Data retention limits:
  - Historical data access (12 months, 24 months, unlimited)
  - Report export limits
  - Data refresh frequency by plan
- [ ] Feature access gates:
  - Custom reports available on which plans
  - API access available on which plans
  - Advanced features (cohort analysis, LTV, etc.) by plan

**Questions to Answer:**
1. What are the order volume limits for each plan?
2. Can you buy additional order capacity?
3. What happens if you exceed your plan's limits mid-month?
4. Are there hard stops or soft limits with overage fees?
5. How far back can you access historical data on each plan?

---

## Billing & Payment

### Payment Methods

**Expected Help Articles:**
- "Payment methods accepted"
- "Updating your payment method"
- "Failed payment handling"
- "Payment security"

**Key Areas to Document:**
- [ ] Accepted payment methods:
  - Credit cards (Visa, Mastercard, Amex, Discover)
  - Debit cards
  - PayPal
  - Direct debit / ACH (for enterprise)
  - Wire transfer (for enterprise)
  - Purchase order (for enterprise)
- [ ] Payment processor used (Stripe, PayPal, etc.)
- [ ] Payment information storage and security:
  - PCI compliance mentions
  - Payment info update process
  - Tokenization / no card storage claims
- [ ] International payments:
  - Multi-currency payment support
  - Foreign transaction fees
  - VAT/GST handling

**Questions to Answer:**
1. What payment methods are accepted?
2. Can you pay with PayPal?
3. Are payments processed via Shopify billing or direct to BeProfit?
4. Do international customers pay in USD or local currency?

---

### Billing Cycle & Invoicing

**Expected Help Articles:**
- "Understanding your bill"
- "Billing cycle explained"
- "Viewing invoices"
- "Downloading receipts"
- "Pro-rated charges"

**Key Areas to Document:**
- [ ] Billing frequency:
  - Monthly billing date (anniversary of subscription start)
  - Annual billing option
  - Billing date change options
- [ ] Invoicing:
  - Invoice generation (automatic at billing cycle)
  - Invoice delivery (email, downloadable in app)
  - Invoice contents (line items, tax breakdown, payment method)
  - Invoice history access
- [ ] Pro-ration logic:
  - Mid-cycle upgrades (charged immediately, pro-rated?)
  - Mid-cycle downgrades (applied immediately or next cycle?)
  - Adding stores mid-cycle
  - Adding team members mid-cycle
- [ ] Taxes:
  - VAT collection for EU customers
  - GST for Australian customers
  - Sales tax for US customers (varies by state?)
  - Tax ID / VAT number entry for businesses
  - Reverse charge mechanism for B2B EU sales

**Questions to Answer:**
1. When are you billed each month?
2. Can you change your billing date?
3. Are upgrades pro-rated?
4. Can you download invoices for accounting?
5. How are taxes calculated and collected?

---

### Failed Payments & Dunning

**Expected Help Articles:**
- "What happens if payment fails?"
- "Updating failed payment method"
- "Subscription suspension"
- "Reactivating suspended account"

**Key Areas to Document:**
- [ ] Payment failure handling:
  - Automatic retry attempts (how many, how often?)
  - Email notifications for failed payments
  - Grace period before account suspension
  - Account status during grace period (read-only, full access, locked?)
- [ ] Account suspension:
  - When account gets suspended (after X failed payment attempts)
  - What happens to data during suspension
  - Can you access data in suspended state (read-only)?
  - Suspension notification to users
- [ ] Reactivation process:
  - Update payment method
  - Pay outstanding balance
  - Immediate reactivation or processing time
  - Late fees or penalties (if any)

**Questions to Answer:**
1. How many times does BeProfit retry a failed payment?
2. How long before account is suspended after payment failure?
3. Can you still access your data if payment fails?
4. Are there late fees for failed payments?

---

## Plan Changes

### Upgrading Your Plan

**Expected Help Articles:**
- "Upgrading your subscription"
- "How to upgrade plans"
- "Upgrade pricing and pro-ration"
- "What happens when you upgrade"

**Key Areas to Document:**
- [ ] Upgrade process:
  - Where to upgrade (settings > billing page)
  - Upgrade button/link location
  - Plan comparison during upgrade flow
  - Confirmation step before processing
- [ ] Upgrade pricing:
  - Pro-rated charge calculation
  - Applied to current cycle or new cycle
  - Upgrade effective immediately or next cycle
- [ ] Feature unlock timing:
  - Immediate access to new features
  - Data sync triggers (does upgrade trigger full re-sync?)
  - Limits increased immediately
- [ ] Upgrade incentives:
  - Discount offers for upgrading
  - Annual plan savings promotion
  - "Upgrade now" prompts in UI

**Questions to Answer:**
1. Can you upgrade mid-cycle?
2. Are you charged immediately when upgrading?
3. Is the upgrade pro-rated or full price?
4. Do new features activate immediately?
5. Can you upgrade from monthly to annual mid-cycle?

---

### Downgrading Your Plan

**Expected Help Articles:**
- "Downgrading your subscription"
- "How to downgrade plans"
- "What happens when you downgrade"
- "Downgrade restrictions"

**Key Areas to Document:**
- [ ] Downgrade process:
  - Where to downgrade (billing settings)
  - Downgrade warnings shown (feature loss, data retention)
  - Confirmation requirements
- [ ] Downgrade timing:
  - Applied immediately or at end of current billing cycle?
  - Refund or credit if downgrade mid-cycle?
- [ ] Feature/limit implications:
  - What happens if you exceed lower plan's limits (stores, orders, users)?
  - Do you lose access to features immediately or at cycle end?
  - Data deletion or archiving warnings
  - User removal requirements if over new limit
- [ ] Downgrade restrictions:
  - Can you downgrade during a contract period?
  - Minimum plan duration requirements
  - Can you downgrade from annual plan?

**Questions to Answer:**
1. Can you downgrade at any time?
2. When does a downgrade take effect?
3. Do you get a refund for unused time?
4. What happens to data or integrations that aren't available on lower plan?
5. Do you lose historical data when downgrading?

---

### Adding Stores or Users

**Expected Help Articles:**
- "Adding another store to your account"
- "Pricing for additional stores"
- "Inviting team members"
- "Additional user pricing"

**Key Areas to Document:**
- [ ] Additional store pricing:
  - Cost per additional store beyond plan limit
  - Per-store billing model (flat fee or variable by plan tier)
  - Pro-ration for mid-cycle store addition
  - Store removal and billing adjustment
- [ ] Additional user pricing:
  - Cost per additional team member beyond plan limit
  - User seat billing model
  - Pro-ration for mid-cycle user addition
  - User removal and billing adjustment
- [ ] Add-on limits:
  - Maximum stores even with add-ons
  - Maximum users even with add-ons

**Questions to Answer:**
1. How much does an additional store cost?
2. How much does an additional user cost?
3. Are there limits on how many add-ons you can purchase?
4. Can you remove stores/users and get credit?

---

## Cancellation & Account Closure

### Cancellation Process

**Expected Help Articles:**
- "How to cancel your subscription"
- "Cancellation policy"
- "What happens when you cancel"
- "Canceling vs pausing"

**Key Areas to Document:**
- [ ] How to cancel:
  - Cancellation location (billing settings, support ticket, email?)
  - Self-service cancellation or require contacting support?
  - Cancellation confirmation steps
  - Reason for cancellation survey
  - Retention offers (discount, pause, downgrade instead)
- [ ] Cancellation timing:
  - Effective immediately or end of billing cycle?
  - Refund policy (pro-rated refund or no refund?)
  - Access during remaining paid period
- [ ] Post-cancellation:
  - Account status (read-only, locked, deleted?)
  - Data retention period (7 days, 30 days, 90 days?)
  - Reactivation window
  - Data export options before deletion
- [ ] Pause vs cancel:
  - Is there a "pause subscription" option?
  - Pause duration limits
  - Pause pricing (free or reduced rate?)

**Questions to Answer:**
1. Can you cancel without contacting support?
2. Is there a cancellation fee or penalty?
3. Do you get a refund if you cancel mid-cycle?
4. How long do you have access after canceling?
5. Can you reactivate later or is it permanent?

---

### Data Retention After Cancellation

**Expected Help Articles:**
- "Data retention policy"
- "Accessing data after cancellation"
- "Account deletion"
- "Exporting data before canceling"

**Key Areas to Document:**
- [ ] Data retention duration:
  - How long data is kept after cancellation (30 days, 90 days?)
  - Difference between canceled and expired accounts
  - Data deletion schedule
- [ ] Data access post-cancellation:
  - Read-only access during retention period?
  - Export capabilities after cancellation
  - Re-activation and data restoration
- [ ] Permanent deletion:
  - Automatic deletion after retention period
  - Request immediate deletion option
  - Deletion confirmation and irreversibility
  - GDPR "right to be forgotten" handling
- [ ] What data is deleted:
  - Account information
  - Store configuration
  - Historical order data
  - Reports and exports
  - Integration connections
  - User accounts and team members

**Questions to Answer:**
1. How long is data retained after cancellation?
2. Can you access your data after canceling?
3. Can you reactivate within the retention period?
4. Is data deleted automatically or do you need to request it?
5. Can you get data back after deletion?

---

## Enterprise & Custom Plans

### Enterprise Plan Features

**Expected Help Articles:**
- "Enterprise plan overview"
- "Custom plan inquiries"
- "Contact sales for enterprise"
- "Enterprise features"

**Key Areas to Document:**
- [ ] Enterprise plan availability:
  - "Contact Sales" vs self-service signup
  - Minimum order volume or revenue requirements
  - Custom pricing negotiation
- [ ] Enterprise-exclusive features:
  - Dedicated account manager
  - Custom integrations
  - White-label options
  - Advanced API access
  - SLA commitments
  - Uptime guarantees
  - Priority support
  - Custom contracts and terms
  - Invoice billing (vs credit card)
  - Multi-year agreements
- [ ] Agency/partner plans:
  - Managing multiple client accounts
  - Agency pricing models
  - White-label for agencies

**Questions to Answer:**
1. Is there an enterprise plan tier?
2. What makes enterprise different from highest self-service plan?
3. Is enterprise pricing public or custom quotes only?
4. Are there agency or partner plans?

---

## Discounts & Promotions

### Available Discounts

**Expected Help Articles:**
- "Available discounts"
- "Annual plan savings"
- "Nonprofit discounts"
- "Education discounts"
- "Startup programs"
- "Coupon codes"

**Key Areas to Document:**
- [ ] Annual plan discount:
  - Percentage saved (e.g., "Save 20% with annual billing")
  - How discount is displayed (monthly equivalent price)
- [ ] Special program discounts:
  - Nonprofit organizations
  - Educational institutions
  - Startup programs (e.g., Shopify Plus partners)
  - Referral credits
- [ ] Promotional offers:
  - Seasonal promotions
  - First-time customer discounts
  - Upgrade incentive discounts
  - Coupon code entry location
  - Affiliate discounts
- [ ] Grandfathered pricing:
  - Do existing customers keep old pricing if plans change?
  - Price lock guarantees

**Questions to Answer:**
1. What's the annual plan discount percentage?
2. Are there nonprofit or education discounts?
3. Can you apply coupon codes?
4. Do referrals earn discounts or credits?
5. If pricing changes, are existing customers grandfathered?

---

## Billing Support & Issues

### Billing Support Channels

**Expected Help Articles:**
- "Billing support"
- "Contacting billing team"
- "Disputing a charge"
- "Requesting refund"
- "Invoice corrections"

**Key Areas to Document:**
- [ ] Support options:
  - Email support for billing (billing@beprofit.co or similar)
  - Live chat for billing issues
  - Phone support for billing (enterprise only?)
  - Help center articles
- [ ] Common billing issues:
  - Double-charged troubleshooting
  - Incorrect plan charged
  - Payment method declined
  - Invoice errors
  - Tax exemption requests
- [ ] Refund policy:
  - Refund eligibility (time limits, conditions)
  - Refund request process
  - Refund processing time
  - Partial refunds vs full refunds
- [ ] Billing dispute resolution:
  - Chargeback handling
  - Disputed charge investigation
  - Account suspension during disputes

**Questions to Answer:**
1. How do you contact billing support?
2. What's the refund policy?
3. Can you dispute a charge?
4. How long do refunds take to process?

---

## Plan Comparison Matrix

### Feature-by-Plan Table

**Research Task:** Build comprehensive table from pricing page + help articles

| Feature | Free Trial | Starter | Pro | Ultimate | Enterprise |
|---------|-----------|---------|-----|----------|------------|
| **Pricing** | $0 | $? | $? | $? | Custom |
| **Trial Duration** | N days | N/A | N/A | N/A | N/A |
| **Stores** | ? | ? | ? | ? | Unlimited |
| **Orders/Month** | ? | ? | ? | ? | Unlimited |
| **Team Members** | ? | ? | ? | ? | Unlimited |
| **Historical Data** | ? months | ? months | ? months | Unlimited | Unlimited |
| **Data Refresh** | ? hours | ? hours | ? hours | Real-time? | Real-time |
| **Shopify Integration** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Amazon Integration** | ? | ? | ✓ | ✓ | ✓ |
| **WooCommerce** | ? | ? | ✓ | ✓ | ✓ |
| **Ad Platforms** | ? | ? | ✓ | ✓ | ✓ |
| **Email Integrations** | ? | ? | ✓ | ✓ | ✓ |
| **Shipping Integrations** | ? | ? | ✓ | ✓ | ✓ |
| **Custom Reports** | ✗ | ? | ✓ | ✓ | ✓ |
| **API Access** | ✗ | ✗ | ? | ✓ | ✓ |
| **Priority Support** | ✗ | ✗ | ✗ | ✓ | ✓ |
| **Dedicated Account Manager** | ✗ | ✗ | ✗ | ✗ | ✓ |

**Instructions:** Populate this table with actual feature availability from pricing page and help center articles.

---

## Payment & Subscription Management UI

### Where Billing is Managed

**Expected Screenshots/Descriptions from Help Articles:**
- Settings > Billing page layout
- Current plan display
- Payment method section
- Invoice history
- Upgrade/downgrade buttons
- Cancellation link location
- Billing cycle and next payment date
- Usage meter/limits display (e.g., "450 / 1000 orders used this month")

**Key UI Elements to Document:**
- [ ] Billing page location (Settings > Billing, Account > Subscription, etc.)
- [ ] Current plan display (plan name, features included)
- [ ] Next payment date and amount
- [ ] Payment method on file (last 4 digits)
- [ ] "Update payment method" button
- [ ] "Change plan" or "Upgrade" button
- [ ] Invoice history table (date, amount, status, download)
- [ ] Usage indicators (orders used, stores connected, etc.)
- [ ] Cancellation link (often in small text at bottom)

---

## Research Checklist

To complete this document, systematically search the help center for:
- [ ] "pricing"
- [ ] "plans"
- [ ] "billing"
- [ ] "subscription"
- [ ] "payment"
- [ ] "invoice"
- [ ] "upgrade"
- [ ] "downgrade"
- [ ] "cancel"
- [ ] "refund"
- [ ] "trial"
- [ ] "free trial"
- [ ] "limits"
- [ ] "orders per month"
- [ ] "store limit"
- [ ] "additional store"
- [ ] "team members"
- [ ] "discount"
- [ ] "annual plan"
- [ ] "enterprise"

Also visit:
- [ ] https://beprofit.co/pricing (public pricing page)
- [ ] Shopify App Store pricing section
- [ ] Any pricing comparison pages

Document:
1. All plan tier names and prices
2. Feature availability matrix
3. Usage limits and restrictions
4. Payment flows and processes
5. Screenshots descriptions from help articles
6. Cancellation and refund policies
7. Any promotional offers or discounts mentioned

---

## Next Steps

After manual research:
1. Fill in the Plan Comparison Matrix with complete data
2. Populate all "Expected Help Articles" sections with actual titles and URLs
3. Complete all checkboxes with documented findings
4. Answer all "Questions to Answer" sections
5. Document actual plan names (not placeholders)
6. Add exact pricing in USD and other currencies
7. Cross-reference with file 054 (Plan Feature Gating Details) for feature restrictions
8. Note any recent pricing changes or promotions

---

**Status:** Template ready for manual research population
**Estimated Completion:** Requires 2-3 hours (help center + pricing page + app store)
**Dependencies:**
- Access to BeProfit help center at https://help.runviably.com/beprofit
- Access to https://beprofit.co/pricing
- Access to Shopify App Store listing
