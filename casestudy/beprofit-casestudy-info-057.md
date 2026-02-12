# BeProfit Troubleshooting: Integration Connection Issues

## Source
- **Primary URL:** https://help.runviably.com/beprofit
- **Category:** Help Center / Troubleshooting / Integration Connections
- **Date Captured:** 2026-02-13
- **Research Status:** ⚠️ TEMPLATE - Requires manual help center research

---

## Research Objective

Document integration-specific troubleshooting, reconnection procedures, permission/access issues, and platform-specific known issues. This information helps users diagnose and resolve connection problems with e-commerce platforms (Shopify, WooCommerce, Amazon) and advertising platforms (Facebook, Google, TikTok, Klaviyo, Google Analytics).

---

## Section Structure

### General Integration Connection Errors

**Expected Help Articles:**
- "Integration connection failed"
- "Reconnecting disconnected integrations"
- "Common connection errors"
- "Authentication errors explained"

**Key Areas to Document:**

#### "Connection Failed" Error Messages
- [ ] **Error:** "Connection failed" error messages
  - **Error message text:** [Exact error message shown to users]
  - **What triggers this error:** Network issues, invalid credentials, API endpoint changes, firewall blocking
  - **Step-by-step reconnection procedure:**
    1. Navigate to Integrations page in BeProfit
    2. Click "Reconnect" or "Fix Connection" button
    3. Follow OAuth flow or re-enter credentials
    4. Grant required permissions
    5. Verify connection status changes to "Connected"
  - **Prevention and best practices:** Maintain active credentials, monitor integration health, enable connection alerts

#### "Authentication Expired" Errors
- [ ] **Error:** "Authentication expired" errors
  - **Error message text:** [Exact error message]
  - **What triggers this error:** OAuth token expiration (typically 60-90 days), password change, account security changes
  - **Step-by-step reconnection procedure:**
    1. Navigate to Integrations page
    2. Identify expired integration (status indicator: "Authentication Expired")
    3. Click "Re-authenticate" or "Reconnect"
    4. Complete OAuth authorization flow
    5. Confirm all required permissions are granted
    6. Wait for sync to resume (5-15 minutes)
  - **Prevention and best practices:** Proactively re-authenticate before expiration, enable expiration alerts

#### "Invalid Credentials" Issues
- [ ] **Error:** "Invalid credentials" issues
  - **Error message text:** [Exact error message]
  - **What triggers this error:** Incorrect API key, wrong API secret, deleted credentials, credentials for different account
  - **Step-by-step reconnection procedure:**
    1. Verify credentials in source platform (Shopify, WooCommerce, etc.)
    2. Generate new API key/secret if needed
    3. Copy credentials carefully (no spaces, complete string)
    4. Paste into BeProfit integration settings
    5. Test connection
  - **Prevention and best practices:** Use password manager, verify credentials before pasting, keep credentials secure

#### "API Rate Limit Exceeded" Messages
- [ ] **Error:** "API rate limit exceeded" messages
  - **Error message text:** [Exact error message]
  - **What triggers this error:** Too many requests to platform API, sync frequency too high, multiple apps using same API
  - **Step-by-step reconnection procedure:**
    1. Wait for rate limit reset (typically 1 hour, 24 hours)
    2. Check if multiple apps are using same API credentials
    3. Reduce sync frequency if possible
    4. Retry connection after waiting period
  - **Prevention and best practices:** Avoid manual and automatic sync simultaneously, understand platform rate limits

#### "Permission Denied" Errors
- [ ] **Error:** "Permission denied" errors
  - **Error message text:** [Exact error message]
  - **What triggers this error:** Insufficient OAuth scopes, admin privileges not granted, team member role limitations
  - **Step-by-step reconnection procedure:**
    1. Verify account has admin/owner role in source platform
    2. Reconnect and carefully review permission request screen
    3. Grant all requested permissions (read orders, read products, etc.)
    4. Contact platform owner if permissions can't be granted
  - **Prevention and best practices:** Use owner/admin account for integration, review required permissions in documentation

#### Timeout Errors During Connection
- [ ] **Error:** Timeout errors during connection
  - **Error message text:** [Exact error message]
  - **What triggers this error:** Network latency, platform outage, firewall/proxy interference, slow API response
  - **Step-by-step reconnection procedure:**
    1. Check internet connection stability
    2. Verify platform status page (no outages)
    3. Try connecting from different network (if possible)
    4. Wait 10-15 minutes and retry
    5. Disable VPN or proxy temporarily
  - **Prevention and best practices:** Use stable internet connection, check platform status before troubleshooting

#### Network Connectivity Issues
- [ ] **Error:** Network connectivity issues
  - **Error message text:** [Exact error message]
  - **What triggers this error:** Firewall blocking API requests, corporate proxy, DNS issues, regional restrictions
  - **Step-by-step reconnection procedure:**
    1. Test basic internet connectivity (can you access other sites?)
    2. Check if corporate firewall is blocking API domains
    3. Whitelist BeProfit API domains (if documented)
    4. Try from different network or device
    5. Contact IT department for firewall exceptions
  - **Prevention and best practices:** Whitelist necessary domains, document network requirements

#### Integration Showing as "Disconnected"
- [ ] **Issue:** Integration showing as "disconnected"
  - **Error message text:** Status indicator shows "Disconnected" or "Not Connected"
  - **What triggers this error:** Token expiration, credentials revoked, app uninstalled from platform, platform API changes
  - **Step-by-step reconnection procedure:**
    1. Click integration card to see detailed error message
    2. Follow specific error guidance (auth expired, permission denied, etc.)
    3. Reconnect using "Reconnect" button
    4. Verify connection status updates to "Connected"
    5. Trigger manual sync to verify data flow
  - **Prevention and best practices:** Monitor integration health dashboard, enable disconnect alerts

---

### Shopify Integration Issues

**Expected Help Articles:**
- "Connecting BeProfit to Shopify"
- "Shopify integration troubleshooting"
- "Reconnecting Shopify store"
- "Shopify permission errors"

**Key Areas to Document:**
- [ ] **Shopify app installation problems**
  - App installation fails or hangs
  - "App could not be installed" error
  - Shopify app store access issues
  - Store not found during installation
- [ ] **Shopify OAuth connection failures**
  - OAuth authorization screen not appearing
  - "Authorization failed" after granting permissions
  - Redirect URL mismatch errors
  - OAuth token not received
- [ ] **"Missing permissions" errors (which scopes are needed?)**
  - **Required Shopify scopes:**
    - `read_orders` - Required to import orders
    - `read_products` - Required to sync product catalog
    - `read_customers` - Required for customer data
    - `read_analytics` - Required for analytics data (if applicable)
    - `read_inventory` - Required for inventory data (if applicable)
  - Permission grant screen checklist
  - What happens if permissions are declined
  - How to review/update granted permissions
- [ ] **Shopify store access token expiration**
  - Token expiration timeline (typically no expiration for embedded apps, but can be revoked)
  - Token revocation scenarios (app uninstall, security change)
  - Re-authentication process
- [ ] **Multi-store Shopify connection issues**
  - Connecting multiple Shopify stores to one BeProfit account
  - Store identification (which data comes from which store)
  - Store-specific settings
  - Switching between stores in BeProfit interface
- [ ] **Shopify Plus specific connection requirements**
  - Wholesale channel access
  - Multi-location inventory
  - Advanced permissions for Plus features
  - Launchpad integration (if applicable)
- [ ] **Shopify API version compatibility**
  - Which Shopify API version BeProfit uses (2023-10, 2024-01, etc.)
  - API version deprecation notices
  - Upgrade requirements when Shopify deprecates old API versions
- [ ] **Shopify app uninstall/reinstall procedure**
  - When to uninstall and reinstall
  - Data preservation during reinstall
  - Settings preservation during reinstall
  - Clean reinstall procedure (if needed)
- [ ] **Shopify webhook failures**
  - Webhook delivery failures
  - Webhook retry logic
  - Manual webhook re-registration
  - Webhook verification issues

**Reconnection Procedure for Shopify:**
```
Step 1: Navigate to BeProfit Integrations page
Step 2: Locate Shopify integration card (should show "Disconnected" status)
Step 3: Click "Reconnect" or "Fix Connection" button
Step 4: You'll be redirected to Shopify admin login (if not already logged in)
Step 5: Review permission request screen carefully
Step 6: Click "Install" or "Authorize" to grant permissions
Step 7: You'll be redirected back to BeProfit
Step 8: Verify connection status shows "Connected"
Step 9: Wait 5-15 minutes for initial data sync to resume
Step 10: Check dashboard to verify data is flowing
```

**Research Questions:**
1. What Shopify permissions (scopes) does BeProfit require?
2. Can multiple Shopify stores be connected to one BeProfit account?
3. Are there special requirements for Shopify Plus stores?
4. How often does Shopify authentication expire (or does it)?
5. What happens to data if Shopify integration is disconnected?
6. Can users reconnect without losing historical data?

---

### WooCommerce Integration Issues

**Expected Help Articles:**
- "Connecting WooCommerce to BeProfit"
- "WooCommerce REST API setup"
- "WooCommerce API key generation"
- "WooCommerce connection troubleshooting"

**Key Areas to Document:**
- [ ] **WooCommerce REST API connection setup**
  - Prerequisites (WooCommerce version, WordPress version)
  - REST API enablement in WooCommerce settings
  - Permalink structure requirements (pretty permalinks required)
  - HTTPS requirement (SSL certificate needed)
- [ ] **API key generation issues**
  - Where to generate API keys in WooCommerce (WooCommerce > Settings > Advanced > REST API)
  - Key generation failures
  - Key permissions selection (Read, Write, Read/Write)
  - User account requirements for key generation (admin role)
- [ ] **API secret configuration**
  - Consumer Key vs Consumer Secret
  - Copying keys correctly (no spaces, complete string)
  - Key regeneration process
  - Key security best practices
- [ ] **Server firewall blocking API requests**
  - Hosting provider firewall rules
  - IP whitelisting requirements
  - API endpoint accessibility testing (curl test, Postman test)
  - Common blocked ports or endpoints
- [ ] **SSL certificate requirements**
  - HTTPS required for API connections (not HTTP)
  - SSL certificate validation
  - Self-signed certificate issues
  - SSL certificate renewal impact
- [ ] **WooCommerce plugin version compatibility**
  - Minimum WooCommerce version required
  - WordPress version requirements
  - Plugin conflicts (security plugins, caching plugins)
  - WooCommerce REST API version compatibility
- [ ] **Self-hosted vs WooCommerce.com differences**
  - Self-hosted WooCommerce connection differences
  - WooCommerce.com connection procedure
  - Managed hosting considerations (WP Engine, Kinsta, etc.)

**Reconnection Procedure for WooCommerce:**
```
Step 1: Log in to WordPress admin
Step 2: Navigate to WooCommerce > Settings > Advanced > REST API
Step 3: Click "Add Key" to generate new API credentials
Step 4: Description: "BeProfit Integration"
Step 5: User: Select admin user
Step 6: Permissions: Select "Read" (minimum) or "Read/Write"
Step 7: Click "Generate API Key"
Step 8: Copy Consumer Key and Consumer Secret (shown only once!)
Step 9: In BeProfit, navigate to Integrations page
Step 10: Click WooCommerce integration
Step 11: Enter your WooCommerce store URL (with https://)
Step 12: Paste Consumer Key and Consumer Secret
Step 13: Click "Connect" or "Test Connection"
Step 14: Verify connection status shows "Connected"
Step 15: Wait for initial data sync (may take 30-60 minutes depending on data volume)
```

**Research Questions:**
1. What WooCommerce version is required for BeProfit integration?
2. Is HTTPS (SSL certificate) required for WooCommerce connection?
3. What API permissions are needed (Read, Write, or Read/Write)?
4. Are there known plugin conflicts (security, caching)?
5. How do users test if REST API is accessible (before connecting)?
6. Can multiple WooCommerce stores be connected?

---

### Amazon Seller Central Integration Issues

**Expected Help Articles:**
- "Connecting Amazon Seller Central"
- "Amazon MWS vs SP-API"
- "Amazon multi-marketplace setup"
- "Amazon authorization troubleshooting"

**Key Areas to Document:**
- [ ] **Amazon MWS/SP-API authentication**
  - MWS (Marketplace Web Service) - legacy API
  - SP-API (Selling Partner API) - current API
  - Migration from MWS to SP-API requirements
  - Developer account requirements
- [ ] **Amazon seller account type requirements**
  - Individual vs Professional seller account
  - Which account types are supported
  - Account status requirements (active, not suspended)
- [ ] **Multi-marketplace connection (US, UK, EU, etc.)**
  - Separate authorization per marketplace
  - Unified North America marketplace (US, CA, MX)
  - European marketplace authorization (UK, DE, FR, IT, ES)
  - Marketplace selection during connection
- [ ] **Amazon API throttling issues**
  - Request rate limits per API endpoint
  - Throttling error messages
  - Recovery from throttling (wait and retry)
  - Sync frequency impact on throttling
- [ ] **Amazon consent/authorization expiration**
  - Authorization expiration timeline (typically no expiration, but can be revoked)
  - Re-authorization process
  - What triggers authorization revocation
- [ ] **Developer account requirements**
  - Amazon Developer account needed for SP-API
  - Developer application registration
  - App credentials (Client ID, Client Secret)
  - LWA (Login with Amazon) authorization

**Reconnection Procedure for Amazon:**
```
Step 1: Navigate to BeProfit Integrations page
Step 2: Click "Connect Amazon" or "Reconnect Amazon"
Step 3: Select marketplace region (North America, Europe, Far East)
Step 4: You'll be redirected to Amazon Seller Central login
Step 5: Log in with Amazon Seller Central credentials
Step 6: Review permission request: "BeProfit is requesting access to..."
Step 7: Click "Authorize" to grant access
Step 8: Select which marketplaces to share (US, UK, DE, etc.)
Step 9: You'll be redirected back to BeProfit
Step 10: Verify connection status shows "Connected"
Step 11: Wait for initial data sync (may take several hours for large catalogs)
```

**Research Questions:**
1. Does BeProfit support Amazon SP-API (the successor to MWS)?
2. Can multiple Amazon marketplaces be connected simultaneously?
3. Is a Developer account required for connection?
4. What seller account types are supported (Individual, Professional)?
5. How long does Amazon authorization last (does it expire)?
6. Are there region-specific connection requirements?

---

### Facebook Ads Integration Issues

**Expected Help Articles:**
- "Connecting Facebook Ads"
- "Facebook Business Manager setup"
- "Facebook token expired"
- "Facebook ad account access issues"

**Key Areas to Document:**
- [ ] **Facebook Business Manager connection**
  - Business Manager account required vs personal ad account
  - Business Manager ownership vs admin access
  - Business Manager verification requirements
  - Multiple Business Manager support
- [ ] **Facebook ad account access permissions**
  - **Required permissions:**
    - `ads_read` - Read ad data
    - `ads_management` - Manage ads (if needed for features)
    - `business_management` - Access Business Manager
  - Permission grant screen during OAuth
  - How to verify granted permissions
- [ ] **"Token expired" errors**
  - Facebook token expiration timeline (typically 60-90 days)
  - Token expiration error message
  - Re-authentication process
  - Token refresh mechanism (automatic vs manual)
- [ ] **Multi-account connection limits**
  - How many ad accounts can be connected
  - Ad account selection during connection
  - Managing multiple ad accounts in BeProfit
  - Switching between ad accounts
- [ ] **Facebook API changes breaking connection**
  - Facebook Marketing API version deprecation
  - Breaking changes notification process
  - Update requirements when API changes
  - Temporary connection issues during Facebook platform updates
- [ ] **Attribution settings affecting data access**
  - Attribution window settings (7-day click, 28-day click, etc.)
  - Attribution model selection impact on permissions
  - Data availability based on attribution settings
- [ ] **Facebook Business verification requirements**
  - Business verification impact on API access
  - Unverified business limitations
  - Business verification process (if required for BeProfit)

**Reconnection Procedure for Facebook Ads:**
```
Step 1: Navigate to BeProfit Integrations page
Step 2: Click "Connect Facebook Ads" or "Reconnect"
Step 3: You'll be redirected to Facebook login (if not logged in)
Step 4: Review permission request:
   - Access ad account data
   - Access Business Manager
   - Read ad performance data
Step 5: Click "Continue" or "Authorize"
Step 6: Select which ad accounts to connect (can select multiple)
Step 7: You'll be redirected back to BeProfit
Step 8: Verify connection status shows "Connected"
Step 9: Verify ad account names appear correctly
Step 10: Wait 15-30 minutes for initial ad spend data sync
```

**Research Questions:**
1. Is Facebook Business Manager required or can personal ad accounts connect?
2. How many Facebook ad accounts can be connected?
3. How often does Facebook authentication expire (60 days, 90 days)?
4. What Facebook permissions are required (ads_read, business_management)?
5. Are there known issues with Facebook API version updates?
6. Can users select attribution window (7-day vs 28-day click)?

---

### Google Ads Integration Issues

**Expected Help Articles:**
- "Connecting Google Ads"
- "Google Ads authentication"
- "Google Ads Manager (MCC) account setup"
- "Google Ads permission errors"

**Key Areas to Document:**
- [ ] **Google Ads OAuth connection**
  - Google account login required
  - OAuth permission grant screen
  - Scope selection (read-only vs management)
  - Multiple Google account handling (which account to use)
- [ ] **Google Ads Manager account vs standard account**
  - Manager (MCC - My Client Center) account support
  - Standard Google Ads account connection
  - Differences in connection process
  - Sub-account access via Manager account
- [ ] **Multi-account (MCC) connection setup**
  - Connecting at Manager account level
  - Selecting individual accounts to sync
  - Account hierarchy visibility
  - Per-account sync settings
- [ ] **Google API console configuration**
  - Google Cloud project requirements (if any)
  - API enablement requirements
  - OAuth consent screen configuration (if self-managed)
  - Service account vs OAuth user account
- [ ] **Conversion tracking setup requirements**
  - Conversion tracking impact on data access
  - Google Ads conversion actions visibility
  - Attribution model selection
  - Imported conversions from Google Analytics

**Reconnection Procedure for Google Ads:**
```
Step 1: Navigate to BeProfit Integrations page
Step 2: Click "Connect Google Ads" or "Reconnect"
Step 3: You'll be redirected to Google account selection screen
Step 4: Choose Google account associated with Google Ads
Step 5: Review permission request:
   - View and manage your Google Ads data
   - View your Google Ads account data and statistics
Step 6: Click "Allow" to grant permissions
Step 7: Select Google Ads account(s) to connect
   - If you have MCC, you'll see sub-accounts listed
Step 8: You'll be redirected back to BeProfit
Step 9: Verify connection status shows "Connected"
Step 10: Verify ad account ID and name appear correctly
Step 11: Wait 15-30 minutes for initial ad spend data sync
```

**Research Questions:**
1. Does BeProfit support Google Ads Manager (MCC) accounts?
2. Can multiple Google Ads accounts be connected?
3. What Google permissions are required (OAuth scopes)?
4. How often does Google authentication expire?
5. Is conversion tracking setup required for connection?
6. Are there differences between standard and Manager account connections?

---

### TikTok Ads Integration Issues

**Expected Help Articles:**
- "Connecting TikTok Ads"
- "TikTok Business Center setup"
- "TikTok ad account permissions"

**Key Areas to Document:**
- [ ] **TikTok Business Center connection**
  - TikTok Business Center account required
  - Business Center ownership vs access
  - Multiple Business Center support
- [ ] **TikTok ad account permissions**
  - Required permissions for data access
  - Permission grant during OAuth flow
  - Admin vs member role requirements
- [ ] **TikTok Pixel setup requirements**
  - Is TikTok Pixel required for connection?
  - Pixel ID visibility in BeProfit
  - Pixel data sync (conversions, events)

**Reconnection Procedure for TikTok Ads:**
```
Step 1: Navigate to BeProfit Integrations page
Step 2: Click "Connect TikTok Ads" or "Reconnect"
Step 3: You'll be redirected to TikTok login
Step 4: Log in with TikTok account associated with Business Center
Step 5: Review permission request for ad data access
Step 6: Click "Authorize" or "Confirm"
Step 7: Select TikTok ad account to connect
Step 8: You'll be redirected back to BeProfit
Step 9: Verify connection status shows "Connected"
Step 10: Wait 15-30 minutes for initial ad spend data sync
```

**Research Questions:**
1. Is TikTok Business Center required for connection?
2. What TikTok permissions are required?
3. How many TikTok ad accounts can be connected?
4. Is TikTok Pixel required for integration?
5. How often does TikTok authentication expire?

---

### Klaviyo Integration Issues

**Expected Help Articles:**
- "Connecting Klaviyo"
- "Klaviyo API key setup"
- "Klaviyo private API key vs public API key"

**Key Areas to Document:**
- [ ] **Klaviyo API key generation**
  - Where to find API keys in Klaviyo (Account > Settings > API Keys)
  - API key types (Private vs Public)
  - API key creation process
- [ ] **Klaviyo private vs public API keys**
  - Which key type is needed for BeProfit (typically Private)
  - Key permission differences
  - Key security considerations
- [ ] **Email campaign data access permissions**
  - What data is synced (email campaign spend, performance)
  - Campaign-level data vs account-level data
  - Segment and list access requirements

**Reconnection Procedure for Klaviyo:**
```
Step 1: Log in to Klaviyo
Step 2: Navigate to Account > Settings > API Keys
Step 3: Copy your Private API Key (or create one if none exists)
Step 4: In BeProfit, navigate to Integrations page
Step 5: Click "Connect Klaviyo" or enter API key field
Step 6: Paste Klaviyo Private API Key
Step 7: Click "Connect" or "Verify"
Step 8: Verify connection status shows "Connected"
Step 9: Wait for initial campaign data sync
```

**Research Questions:**
1. Which Klaviyo API key type is required (Private or Public)?
2. Where do users find their Klaviyo API key?
3. What Klaviyo data is synced (campaign spend, email sends, conversions)?
4. Can multiple Klaviyo accounts be connected?

---

### Google Analytics Integration Issues

**Expected Help Articles:**
- "Connecting Google Analytics"
- "GA4 vs Universal Analytics"
- "Google Analytics property selection"
- "E-commerce tracking requirements"

**Key Areas to Document:**
- [ ] **GA4 vs Universal Analytics connection**
  - Universal Analytics (UA) deprecation notice
  - GA4 property connection
  - Data differences between UA and GA4
  - Migration from UA to GA4 integration
- [ ] **Google Analytics property selection**
  - Account > Property > View hierarchy (UA)
  - Account > Property > Data Stream hierarchy (GA4)
  - Selecting correct property during connection
  - Multiple property support
- [ ] **View/stream permissions**
  - Required Google Analytics permissions (Read & Analyze)
  - Account-level vs property-level access
  - User role requirements (Viewer, Analyst, Editor, Administrator)
- [ ] **E-commerce tracking requirements**
  - Enhanced E-commerce tracking required for data sync
  - E-commerce enablement check
  - Transaction data availability
  - Revenue data sync

**Reconnection Procedure for Google Analytics:**
```
Step 1: Navigate to BeProfit Integrations page
Step 2: Click "Connect Google Analytics" or "Reconnect"
Step 3: You'll be redirected to Google account selection
Step 4: Choose Google account with Analytics access
Step 5: Review permission request:
   - View your Google Analytics data
Step 6: Click "Allow"
Step 7: Select Google Analytics account
Step 8: Select property (or data stream for GA4)
Step 9: You'll be redirected back to BeProfit
Step 10: Verify connection status shows "Connected"
Step 11: Wait for initial analytics data sync
```

**Research Questions:**
1. Does BeProfit support GA4 (Google Analytics 4) or only Universal Analytics?
2. Is Enhanced E-commerce tracking required for connection?
3. What Google Analytics permissions are required?
4. Can multiple GA properties be connected?
5. What GA data is synced (sessions, revenue, conversions)?

---

### Permission & Access Issues

**Expected Help Articles:**
- "Required permissions for integrations"
- "Insufficient permissions error"
- "Admin access requirements"
- "Team member integration access"

**Key Areas to Document:**
- [ ] **"Insufficient permissions" error resolution**
  - Error message details
  - What permissions are missing
  - How to verify current permissions
  - How to request additional permissions
  - Account owner involvement required
- [ ] **Admin vs member role requirements**
  - Which integrations require admin/owner role
  - Member role limitations
  - Role-based access control for integrations
  - How to check your role in each platform
- [ ] **Platform-specific permission scopes needed**
  - **Shopify scopes:**
    - `read_orders` - Import orders and order data
    - `read_products` - Import product catalog and variants
    - `read_customers` - Import customer data
    - `read_analytics` - Import analytics data (optional)
    - `read_inventory` - Import inventory levels (optional)
  - **Facebook permissions:**
    - `ads_read` - Read ad account data and campaigns
    - `ads_management` - Manage ads (if features require)
    - `business_management` - Access Business Manager data
  - **Google Ads permissions:**
    - `adwords` - Access Google Ads data (full scope)
    - `adwords.readonly` - Read-only access (preferred if available)
  - **WooCommerce permissions:**
    - API Key with "Read" permission minimum
    - "Read/Write" if order editing features are used
- [ ] **Team member access not working**
  - Team member can't connect integrations
  - Team member can't see integration data
  - Permission delegation to team members
  - Owner vs admin vs member capabilities
- [ ] **Owner/admin transfer affecting connections**
  - What happens when ownership changes
  - Re-authentication requirements after transfer
  - Integration preservation during transfer
- [ ] **App authorization revoked by user**
  - How authorization revocation happens
  - Notification of revoked authorization
  - Re-authorization process
  - Impact on historical data

**Research Questions:**
1. What permissions are required for each integration (exact scope list)?
2. Can team members (non-owners) connect integrations?
3. What happens to integrations when account ownership changes?
4. How does BeProfit notify users of permission issues?
5. Can users review currently granted permissions?
6. Are there differences in permissions between plan tiers?

---

### Platform-Specific Known Issues

**Expected Help Articles:**
- "Known integration issues"
- "Platform API limitations"
- "Third-party platform outages"
- "API deprecation notices"

**Key Areas to Document:**
- [ ] **Shopify API rate limits (40 requests/second)**
  - Rate limit thresholds
  - Rate limit error handling
  - Sync impact during high-volume periods
  - Rate limit recovery time
- [ ] **Facebook API changes causing temporary disconnections**
  - Facebook Marketing API version deprecation schedule
  - Breaking changes announcements
  - Temporary disconnections during Facebook platform updates
  - How BeProfit handles API version migrations
- [ ] **Amazon MWS deprecation to SP-API migration**
  - MWS deprecation timeline
  - SP-API adoption requirements
  - Migration impact on existing connections
  - Data continuity during migration
- [ ] **Google sunset of Universal Analytics affecting GA integration**
  - Universal Analytics deprecation (July 2023)
  - GA4 migration requirements
  - Data export from Universal Analytics before shutdown
  - GA4 connection setup for existing UA users
- [ ] **Platform maintenance windows causing connection drops**
  - Scheduled maintenance notification
  - Expected downtime duration
  - Automatic reconnection after maintenance
  - How to verify platform status
- [ ] **Third-party platform outages**
  - Platform status pages (Shopify status, Facebook status, etc.)
  - How BeProfit handles platform outages
  - Data sync recovery after outage
  - Outage notification to users

**Research Questions:**
1. Are there known API rate limit issues with any platforms?
2. How does BeProfit handle Facebook API version deprecations?
3. Has BeProfit migrated from Amazon MWS to SP-API?
4. Are there known issues during platform maintenance windows?
5. How are users notified of third-party platform outages?
6. Is there a status page for BeProfit integration health?

---

### Reconnection Procedures (Generic)

**Standard Reconnection Steps:**
```
1. Navigate to BeProfit Integrations page
   - Location: Settings > Integrations or Dashboard sidebar > Integrations

2. Identify disconnected integration (status indicator)
   - Look for status: "Disconnected", "Authentication Expired", "Connection Failed", "Error"
   - Status may be shown as colored badge (red, yellow) or icon

3. Click "Reconnect" or "Re-authenticate" button
   - Button text may vary: "Reconnect", "Fix Connection", "Re-authenticate", "Reconnect Integration"

4. Complete OAuth flow or re-enter API credentials
   - OAuth flow: You'll be redirected to platform login, grant permissions, redirected back
   - API credentials: Enter API key, secret, or token in form fields

5. Grant/verify required permissions
   - Review permission request screen carefully
   - Ensure all required permissions are granted (see platform-specific sections for required scopes)
   - Decline permissions may cause connection failure

6. Confirm connection status changes to "Connected"
   - Status should update immediately or within 1-2 minutes
   - Status may show "Syncing" temporarily during initial sync

7. Wait for initial data sync (5-30 minutes typically)
   - Order data sync: 5-15 minutes for most stores
   - Ad data sync: 15-30 minutes for ad platforms
   - Large data volumes may take longer (1-2 hours)

8. Verify data is flowing correctly
   - Check dashboard for recent orders/data
   - Verify data freshness (last sync timestamp)
   - Compare data with source platform for accuracy
```

**When to Use Different Reconnection Methods:**
- **Use "Reconnect" button:** When integration is disconnected or authentication expired
- **Use "Refresh" or "Sync Now":** When connection is active but data seems stale
- **Use "Disconnect and Reconnect":** When persistent issues occur, clean slate needed
- **Contact Support:** When none of the above resolve the issue (after trying 2-3 times)

**Research Questions:**
1. Is there a standardized reconnection process across all integrations?
2. How long does reconnection typically take (immediate, minutes)?
3. Is historical data preserved during reconnection?
4. Can users trigger reconnection from multiple places (settings, dashboard)?
5. Are there reconnection attempt limits or cooldown periods?

---

### Connection Health Monitoring

**Expected Help Articles:**
- "Integration health dashboard"
- "Connection status indicators"
- "Integration alerts and notifications"
- "Testing connection health"

**Key Areas to Document:**
- [ ] **Integration status dashboard**
  - Where to view all integration statuses (Integrations page)
  - Status indicator meanings:
    - **Green/Connected:** Integration active, data syncing normally
    - **Yellow/Warning:** Connection active but sync delayed or partial issue
    - **Red/Disconnected:** Integration disconnected, no data syncing
    - **Gray/Not Connected:** Integration never connected
  - Last sync timestamp visibility
  - Sync frequency display
- [ ] **Connection health indicators (green/yellow/red)**
  - Color-coded status badges
  - Icon indicators (checkmark, warning triangle, error X)
  - Tooltip details on hover (last sync, error message)
- [ ] **Last successful sync timestamp**
  - Timestamp format (relative: "5 minutes ago" vs absolute: "2026-02-13 14:30")
  - Timezone display (account timezone vs UTC)
  - Per-integration sync timestamp
  - Sync timestamp update frequency
- [ ] **Connection alerts and notifications**
  - Disconnection alerts (email, in-app)
  - Sync failure notifications
  - Authentication expiration warnings (7 days before expiration)
  - Connection restored notifications
  - Alert delivery channels (email, in-app, SMS, push)
  - Alert preferences and configuration
- [ ] **Automatic reconnection attempts (if applicable)**
  - Does BeProfit retry failed connections automatically?
  - Retry frequency (every 15 min, hourly, daily)
  - Maximum retry attempts before manual intervention required
  - Exponential backoff strategy
- [ ] **Connection testing tools**
  - "Test Connection" button functionality
  - Connection diagnostics (ping, API test, permission check)
  - Test results display (success, failure, detailed error)
  - Test frequency (can users test multiple times?)

**Research Questions:**
1. Is there a dedicated integration health dashboard?
2. What do different status indicators mean (green, yellow, red)?
3. Can users see last successful sync timestamp for each integration?
4. Are there automatic connection health alerts?
5. Does BeProfit retry failed connections automatically?
6. Is there a "Test Connection" feature for diagnostics?
7. Can users see sync frequency per integration?

---

### Multiple Store/Account Scenarios

**Expected Help Articles:**
- "Connecting multiple Shopify stores"
- "Managing multiple ad accounts"
- "Multi-store setup and management"
- "Switching between stores"

**Key Areas to Document:**
- [ ] **Connecting multiple Shopify stores**
  - How many stores can be connected per BeProfit account
  - Connection process for second/third store (same as first?)
  - Store identification (store name, URL display)
  - Data separation between stores
- [ ] **Managing multiple ad accounts per platform**
  - Multiple Facebook ad accounts
  - Multiple Google Ads accounts
  - Multiple TikTok ad accounts
  - Per-account sync settings
- [ ] **Switching between accounts**
  - Store/account switcher UI location (dropdown, sidebar)
  - Dashboard data filtering by store/account
  - Report filtering by store/account
  - Unified vs separated views
- [ ] **Bulk reconnection procedures**
  - Reconnecting all integrations at once
  - Bulk re-authentication (if tokens expired simultaneously)
  - Multi-store reconnection efficiency
- [ ] **Account limits per BeProfit plan tier**
  - Free/Trial plan: How many stores/accounts?
  - Starter plan: Connection limits
  - Growth plan: Connection limits
  - Enterprise plan: Connection limits (typically unlimited or very high)

**Research Questions:**
1. How many stores/ad accounts can be connected per BeProfit account?
2. Are there connection limits based on plan tier?
3. Can users easily switch between connected stores in the dashboard?
4. Is data unified across stores or separated?
5. Can users reconnect multiple integrations at once?
6. Are there additional costs for connecting multiple stores?

---

### API Key & Credential Management

**Expected Help Articles:**
- "Managing API keys"
- "Where to find platform API keys"
- "Securing integration credentials"
- "Rotating API keys"

**Key Areas to Document:**
- [ ] **Where to find API keys for each platform**
  - **Shopify:** Apps section > Private apps or API credentials (for custom apps)
  - **WooCommerce:** WooCommerce > Settings > Advanced > REST API > Add Key
  - **Amazon:** Seller Central > Apps & Services > Manage Your Apps
  - **Klaviyo:** Account > Settings > API Keys
  - **Google Ads/Analytics:** OAuth (no manual key needed, automatic through OAuth flow)
  - **Facebook Ads:** OAuth (no manual key needed, automatic through OAuth flow)
- [ ] **Secure storage of credentials**
  - How BeProfit stores API keys (encrypted at rest)
  - Credential visibility in BeProfit UI (masked vs full display)
  - Credential transmission security (HTTPS, TLS)
- [ ] **Rotating API keys (when and how)**
  - When to rotate keys (annually, after security incident, after employee departure)
  - How to rotate without service interruption
  - Updating keys in BeProfit (edit integration, re-enter credentials)
  - Key rotation best practices
- [ ] **Credential validation checks**
  - "Test Connection" button validates credentials
  - Error messages for invalid credentials
  - Credential format validation (before submission)
- [ ] **What to do if credentials are compromised**
  - Immediate steps: Revoke compromised key in platform
  - Generate new API key
  - Update BeProfit integration with new key
  - Monitor for unauthorized access
  - Contact support if suspicious activity detected

**Research Questions:**
1. How does BeProfit store integration credentials (encrypted)?
2. Can users view or export their stored API keys?
3. Is there guidance on API key rotation best practices?
4. What happens if API keys are compromised?
5. Can credentials be validated before full connection (test mode)?
6. Are there credential expiration warnings?

---

## Summary of Research Questions

**Critical Questions:**
1. How does BeProfit notify users of disconnected integrations?
2. Is there an automatic reconnection retry mechanism?
3. What permissions are required for each integration (exact scope list)?
4. Can users test a connection without triggering a full data sync?
5. Are there known platform compatibility issues (e.g., Shopify API versions)?
6. How long can an integration be disconnected before data is lost?
7. Is there a connection history log showing disconnection events?
8. What's the typical resolution time for connection issues?
9. Are there webhooks or real-time connection monitoring?
10. Can integrations be temporarily paused without disconnecting?

**Secondary Questions:**
11. What Shopify permissions (scopes) are required?
12. Can multiple Shopify stores be connected?
13. Is HTTPS required for WooCommerce connection?
14. Does BeProfit support Amazon SP-API (not just MWS)?
15. How often does Facebook authentication expire?
16. Does BeProfit support Google Ads Manager (MCC) accounts?
17. Is TikTok Business Center required for TikTok Ads connection?
18. Which Klaviyo API key type is needed (Private vs Public)?
19. Does BeProfit support GA4 or only Universal Analytics?
20. Are there connection limits based on plan tier?

---

## Research Notes

**Data Sources to Check:**
- Help Center main page (https://help.runviably.com/beprofit)
- Help Center search for: "connect", "integration", "reconnect", "disconnected", "authentication", "permission", "error"
- Platform-specific integration guides (Shopify, WooCommerce, Amazon, Facebook, Google, TikTok, Klaviyo, GA)
- Troubleshooting section for each integration
- API documentation or developer docs (if available)
- Status page or known issues page

**Expected Documentation Depth:**
- Integration setup and troubleshooting should be extensively documented
- Step-by-step connection procedures for each platform
- Common error messages with specific resolutions
- Screenshot-based guides are common for OAuth flows
- Platform-specific nuances (Shopify Plus, Google MCC, etc.) should be noted

**Research Challenges:**
- OAuth flows may not be fully documented in help center (assume standard flow)
- Required permission scopes may not be explicitly listed
- API version compatibility may not be documented
- Multi-store/account scenarios may not be covered comprehensively
- Automatic retry logic may not be documented

---

## Completion Checklist

- [ ] All "Key Areas to Document" sections reviewed and populated
- [ ] All "Questions to Answer" addressed with findings
- [ ] Source URLs documented for each finding
- [ ] Error messages captured verbatim
- [ ] Reconnection procedures documented step-by-step for each platform
- [ ] Required permissions/scopes listed for each platform
- [ ] Research date and status updated
- [ ] Cross-references to related files (055, 056) added if applicable
- [ ] Ambiguities or gaps in documentation noted
- [ ] File marked as "RESEARCHED" instead of "TEMPLATE" when complete

---

**File Status:** ⚠️ TEMPLATE - Ready for manual research
**Expected Completion Time:** 4-6 hours of thorough help center exploration
**Next Steps:** Visit https://help.runviably.com/beprofit and systematically document integration troubleshooting findings in each section above
