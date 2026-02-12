# BeProfit API & Webhook Documentation

## Source
- **URLs:**
  - https://help.runviably.com/beprofit/beprofit-faq (FAQ — API and integration mentions)
  - https://help.runviably.com/beprofit/custom-metrics-creation-for-plus-plan-members (Plus Plan — Custom Metrics, no API features)
  - https://beprofit.co/integrations/ (Integrations page — data flow overview)
  - https://integrations.beprofit.co/ (Tech Partner Directory — 403 at time of research)
  - https://apps.shopify.com/beprofit-profit-tracker (Shopify App Store listing)
  - https://www.getapp.com/website-ecommerce-software/a/beprofit/ (GetApp feature listing)
  - https://woocommerce.com/document/beprofit-for-woocommerce/ (WooCommerce documentation)
  - Searched broader web for: "BeProfit API", "BeProfit developer documentation", "BeProfit webhook", "BeProfit REST API", "BeProfit FTP integration"
  - Cross-referenced with real dashboard visual inventory (prd/manually-added-dump-from-real-dashboard.md) — Settings → Costs tab, API Access and FTP Integration cards
  - Cross-referenced with file 023 (beprofit-casestudy-info-023.md) — Data Export & Scheduled Reports (API and FTP sections)
- **Category:** Core Feature / API & Webhooks (GAP ANALYSIS + PARTIAL DOCUMENTATION)
- **Date Captured:** 2026-02-12

---

## API Overview

BeProfit has **limited API functionality** focused exclusively on **inbound cost data**. There is no general-purpose public API for reading data out of BeProfit. The API-related features consist of:

1. **API Access** — A Settings → Costs feature for programmatically pushing cost updates INTO BeProfit
2. **FTP Integration** — A Settings → Costs feature for batch-uploading cost files via FTP/SFTP

Both features are **input-only** mechanisms. BeProfit does not offer any documented output/retrieval API.

### The Fundamental API Asymmetry
```
External Systems ──[costs]──→ BeProfit API/FTP ──→ BeProfit Database
                                                         ↓
                                                   Dashboard/Reports
                                                         ↓
                                                   Manual Export (CSV)
                                                         ↓
                                                   ✗ No API out
```

Data flows INTO BeProfit via API, integrations, and manual entry — but the only way to get data OUT is through manual page-by-page export or scheduled email reports. There is no programmatic data retrieval mechanism.

---

## API Access (Cost Input)

### Location
**Settings → Costs → API Access**

The dashboard visual inventory confirms this as a card on the Costs settings tab with:
- **Title:** "API Access"
- **Icon:** Server/terminal icon
- **Subtitle:** "Update costs over API"

### API Purpose & Scope

The API Access feature is designed for **one-way cost data input**. Based on all available research:

| Capability | Supported? | Evidence |
|-----------|-----------|---------|
| Push product costs (COGS) into BeProfit | **Likely yes** | Settings subtitle: "Update costs over API" |
| Push custom expenses into BeProfit | **Possibly** | General cost input context |
| Push order-related costs | **Possibly** | FTP description mentions "order related costs" |
| Retrieve profit/analytics data | **No** | No evidence of data retrieval API anywhere |
| Retrieve order data | **No** | No documentation of outbound endpoints |
| Webhook notifications | **No** | No webhook functionality documented |

### API Authentication

The authentication method is **not publicly documented**. Based on the Settings → Costs → API Access card location and standard patterns for Shopify apps:

**Likely authentication approaches:**
- **API Key** — Generated within the Settings → Costs → API Access page, used as a bearer token or header parameter
- **Token-based** — The Data Protection article mentions "advanced security token mechanisms" generally, which could apply to the API

**What is NOT documented:**
- API key generation process
- Token format (JWT, opaque token, etc.)
- Key rotation or revocation
- Multiple API keys per workspace
- Per-key permissions or scoping

### API Endpoints

**No public API endpoint documentation exists.** Comprehensive web research across:
- help.runviably.com (Help Center) — no API docs category
- beprofit.co (marketing site) — no developer documentation section
- integrations.beprofit.co (Tech Partner Directory) — returned 403 error
- apps.shopify.com/beprofit-profit-tracker (Shopify listing) — no API mentions
- woocommerce.com BeProfit documentation — no API details
- Google search for "BeProfit API documentation" — no developer portal found
- Google search for "BeProfit REST endpoint" — no results

**Conclusion:** BeProfit does not have a publicly indexed developer portal, Swagger/OpenAPI documentation, Postman collection, or any other standard API documentation format. The API Access feature appears to be a semi-private interface accessible only after purchasing and configuring it within the app.

### Rate Limits & Constraints

No information available on:
- Request rate limits (requests per minute/hour)
- Payload size limits
- Concurrent connection limits
- Batch operation support
- Retry/backoff policies
- Throttling behavior

### API Documentation Location

Based on research, the API documentation is likely:
1. **Available only within the app** — after navigating to Settings → Costs → API Access, the configuration page may contain inline documentation
2. **Provided by support** — users may need to contact support@beprofit.co to receive API documentation
3. **Minimal** — given the narrow scope (cost input only), documentation may be a simple guide rather than a comprehensive API reference

---

## FTP Integration

### Location
**Settings → Costs → FTP Integration**

The dashboard visual inventory confirms this as a card on the Costs settings tab with:
- **Title:** "FTP integration"
- **Icon:** Globe with upload arrow icon
- **Subtitle:** "Sync order related costs using an FTP"

### FTP Purpose & Scope

The FTP integration provides a **batch file upload mechanism** for syncing cost data, specifically "order related costs." This is designed for businesses with legacy systems (ERP, warehouse management, supply chain tools) that generate cost data files.

| Capability | Supported? | Evidence |
|-----------|-----------|---------|
| Upload cost files via FTP/SFTP | **Yes** | Settings card description confirms this |
| Sync order-related costs | **Yes** | Subtitle: "Sync order related costs using an FTP" |
| Sync product-level costs (COGS) | **Possibly** | Related to cost input generally |
| Download/retrieve data via FTP | **Unlikely** | Pattern matches API (input only) |

### FTP Configuration

Configuration details are **not documented** in the Help Center. Based on the Settings card and standard FTP integration patterns:

**Likely configuration fields:**
- FTP/SFTP server hostname (provided by BeProfit or user's server)
- Port number (21 for FTP, 22 for SFTP)
- Username / credentials
- Target directory
- Connection test button

**Unknown configuration aspects:**
- Whether BeProfit provides the FTP server (push model) or connects to the user's FTP server (pull model)
- SFTP vs plain FTP support
- SSH key-based authentication vs password
- Scheduled sync frequency (hourly, daily, on-demand)
- File pickup or file push mechanism

### Supported File Formats

The accepted file formats for FTP uploads are **not documented**. Based on BeProfit's other import methods and industry standards:

**Likely formats:**
- **CSV** — BeProfit already supports CSV for bulk COGS updates (file 015)
- **Excel (.xlsx)** — Common format for business data files

**Unlikely formats:**
- JSON, XML — More typical for API integrations than FTP
- EDI (Electronic Data Interchange) — Enterprise standard but unlikely for a Shopify-focused tool

### FTP vs API Access: When to Use Which

| Consideration | API Access | FTP Integration |
|--------------|-----------|-----------------|
| **Data freshness** | Near real-time (per-request) | Batch (periodic file upload) |
| **Integration complexity** | Requires HTTP client programming | Requires FTP client/scheduled upload |
| **Best for** | Modern systems with API capabilities | Legacy systems generating flat files |
| **Volume** | Per-record or small batches | Large bulk file uploads |
| **Automation** | Triggered by events in source system | Scheduled via cron job or ERP export |

---

## Webhook Functionality

### Outbound Webhooks — NOT AVAILABLE
BeProfit does **not offer outbound webhooks**. There is no documented ability to:
- Subscribe to events (order created, profit calculated, cost updated)
- Receive HTTP callbacks when data changes
- Configure webhook endpoints for external systems
- Set up push notifications to third-party services

### Inbound Webhooks — PARTIALLY AVAILABLE (via Shopify)
BeProfit receives data from e-commerce platforms (primarily Shopify) via the platform's own webhook/API infrastructure. For example:
- Shopify sends order webhooks to BeProfit when new orders are placed
- Store name changes are auto-synced via Shopify webhooks (documented in file 022)

However, these are **platform-to-app webhooks** managed by Shopify, not user-configurable BeProfit webhooks.

### The Inbound vs Outbound Integration Gap

```
BeProfit Integration Architecture:

Inbound (data INTO BeProfit):
✅ Shopify webhooks (orders, products, inventory)
✅ Ad platform APIs (Facebook, Google, TikTok ad spend)
✅ Fulfillment platform APIs (ShipStation, ShipHero, Shippo)
✅ Google Sheets sync (COGS, expenses, revenue)
✅ API Access (cost input)
✅ FTP Integration (cost file upload)
✅ CSV bulk upload (manual)

Outbound (data OUT of BeProfit):
✅ Meta Conversions API (profit data → Meta for optimization) — UNIQUE
✅ Scheduled email reports (automated)
✅ Manual export (page-by-page CSV/Excel download)
❌ No REST API for data retrieval
❌ No webhooks for event notifications
❌ No GraphQL or streaming API
❌ No Google Sheets data sync (output direction)
❌ No Zapier/Make integration
❌ No Slack/Teams data push
```

The Meta Conversions API integration (documented in file 007) is the **only programmatic outbound data flow** from BeProfit — and it's specifically for sending profit data back to Meta for ad optimization, not for general-purpose data access.

---

## Third-Party Integration Platforms

### Zapier Integration — NOT AVAILABLE
BeProfit does **not have a native Zapier integration**. Research confirmed:
- BeProfit is not listed in Zapier's app directory
- No BeProfit "Zaps" or triggers/actions are available
- No documentation mentions Zapier support

### Make (formerly Integromat) — NOT AVAILABLE
BeProfit does **not have a native Make/Integromat integration**. No modules, triggers, or scenarios are available for BeProfit on the Make platform.

### Potential Workaround: Google Sheets as Bridge
Since BeProfit supports Google Sheets for data INPUT (COGS, expenses, revenue), a theoretical workaround exists:
1. Create a Google Sheet with cost data
2. Use Zapier/Make to populate the Google Sheet from an external system
3. BeProfit syncs from Google Sheets

This is input-only and cumbersome, but it's the closest thing to iPaaS integration available.

### Google Sheets Integration (Recap)
Google Sheets is extensively documented for DATA INPUT:
- COGS/product cost updates (file 015)
- Custom expenses (file 023 cross-reference)
- Other revenue (Settings → Other Revenue page in dashboard dump)

Google Sheets is **not documented for data output** — there is no sync from BeProfit analytics data to Google Sheets.

### Direct Platform Integrations

| Integration | Direction | Data Type | Authentication |
|------------|-----------|-----------|----------------|
| **Shopify** | Inbound | Orders, products, inventory, fees | OAuth via Shopify App Store |
| **WooCommerce** | Inbound | Orders, products, revenue | API key/secret |
| **Amazon** | Inbound | Orders, products, fees | Amazon seller auth |
| **Wix** | Inbound | Orders, products, revenue | Wix account auth |
| **Facebook Ads** | Inbound | Ad spend, impressions, clicks | OAuth via Facebook |
| **Google Ads** | Inbound | Ad spend, impressions, clicks | OAuth via Google |
| **TikTok Ads** | Inbound | Ad spend, impressions, clicks | OAuth |
| **Snapchat Ads** | Inbound | Ad spend | OAuth |
| **Pinterest Ads** | Inbound | Ad spend | OAuth |
| **ShipStation** | Inbound | Shipping costs, tracking | API connection |
| **ShipHero** | Inbound | Shipping costs | API connection |
| **Shippo** | Inbound | Shipping costs | API connection |
| **CJ Dropshipping** | Inbound | COGS per order | Integration |
| **Klaviyo** | Inbound | Email/SMS marketing metrics | API integration |
| **Google Sheets** | Inbound | COGS, expenses, revenue | Google OAuth |
| **Meta Conversions API** | **Outbound** | Profit data to Meta | CS team setup, not self-service |

**Total: 16 integrations confirmed — 15 inbound, 1 outbound (Meta only)**

---

## Developer Experience Assessment

### Overall Developer Experience Rating: 1/10

BeProfit effectively has **no developer experience**:

| Aspect | Assessment |
|--------|-----------|
| **Public API documentation** | Does not exist publicly |
| **Developer portal** | None |
| **API reference (Swagger/OpenAPI)** | None |
| **SDKs or client libraries** | None |
| **Code samples** | None |
| **Postman collection** | None |
| **Sandbox/test environment** | None |
| **Developer blog** | None |
| **API changelog** | None |
| **Community/forum** | None |
| **Developer support** | Not documented (general support only) |

The API Access feature under Settings → Costs is a narrow, configuration-driven interface — not a developer platform. It's designed for merchants who need to push cost data from ERP systems, not for developers building integrations.

---

## Plan-Based API Feature Availability

The Help Center does not document plan-specific API restrictions. Based on available evidence:

| Feature | Plan Availability | Evidence |
|---------|-------------------|---------|
| API Access (cost input) | Unknown — likely Pro or higher | Settings → Costs card, no plan gating mentioned |
| FTP Integration | Unknown — likely Pro or higher | Settings → Costs card, no plan gating mentioned |
| Custom Metrics (staff-created) | Plus Plan only | Explicit documentation |
| Bulk Export from Custom Reports | Plus Plan only | Explicit documentation |
| Public API (data retrieval) | Not available on any plan | Does not exist |
| Webhooks | Not available on any plan | Does not exist |

---

## Inferred UI Elements

| Element | Type | Location | Description |
|---------|------|----------|-------------|
| API Access card | Settings card | Settings → Costs | Server/terminal icon, "Update costs over API" subtitle |
| FTP Integration card | Settings card | Settings → Costs | Globe with upload arrow, "Sync order related costs using an FTP" subtitle |
| API configuration page (inferred) | Settings sub-page | Accessed from API Access card | API key display/generation, endpoint documentation, test connection |
| FTP configuration page (inferred) | Settings sub-page | Accessed from FTP Integration card | Server details, credentials, file format requirements, sync schedule |
| API key display (inferred) | Text/masked field | API configuration page | Generated API key with copy button |
| Connection test button (inferred) | Action button | FTP configuration page | Verify FTP connection works |

---

## Data Model Implications

### API as a Cost Input Channel
```
Cost Input Channels (parallel, independent):
├── Manual UI entry (Settings → Product Costs)
├── CSV bulk upload
├── Google Sheets sync
├── CJ Dropshipping integration
├── Shopify COGS sync
├── API Access ──→ Cost Update Endpoint
│   ├── Authentication: API key/token
│   ├── Payload: product_id, variant_id, cost_value, effective_date
│   └── Response: success/failure status
└── FTP Integration ──→ File Upload
    ├── Authentication: FTP credentials
    ├── File format: CSV (likely)
    ├── Processing: Batch import on schedule or trigger
    └── Status: Processing log/status page
```

### COGS Priority Hierarchy Impact
From file 005, COGS has a 6-level priority hierarchy. API-entered costs would likely slot into this hierarchy at a specific level (possibly equivalent to or above Manual Edit priority), but this is not documented.

### No Outbound Data Model
Since there is no data retrieval API, there is no:
- Pagination model for large result sets
- Query parameter schema for filtering/sorting
- Response envelope format
- Rate limit headers
- Error response format

---

## Limitations & Gaps

1. **No public API for data retrieval.** This is the most significant API gap. Merchants, agencies, and developers have no programmatic way to access their BeProfit analytics data. Every other major SaaS analytics tool offers data retrieval APIs.

2. **No webhook notifications.** There are no event-driven webhooks for notifying external systems when data changes. This prevents integration with modern workflow automation tools and custom dashboards.

3. **API documentation is not publicly available.** The API Access feature exists, but its documentation is not indexed on the web. Users cannot evaluate the API's capabilities before purchasing or committing to integration work.

4. **No Zapier/Make integration.** The absence of iPaaS (Integration Platform as a Service) connectors means BeProfit cannot participate in the broader automation ecosystem that many DTC merchants rely on.

5. **FTP integration details are undocumented.** File format requirements, sync schedule, configuration options, and error handling for the FTP integration are not described in any Help Center article.

6. **API is input-only.** Even the existing API is limited to pushing costs in — it cannot be used to retrieve analytics, generate reports, or trigger actions.

7. **No developer portal or community.** There are no developer resources, SDKs, code samples, or community forums for API users. This makes integration difficult and isolates BeProfit from the developer ecosystem.

8. **Meta Conversions API is not self-service.** The only outbound data flow (profit data → Meta) requires BeProfit's customer success team to set up manually. It cannot be configured by the user independently.

9. **Google Sheets is input-only.** Google Sheets could serve as a low-friction data bridge, but it only works for data input. There is no Google Sheets output sync for analytics data.

10. **No API versioning or changelog.** Without versioned endpoints or a changelog, any API changes could break existing integrations without warning.

---

## Relevance to Our Build

1. **Build a comprehensive public REST API as a major differentiator.** This is the single biggest technical gap in BeProfit and the broader DTC profit analytics category. Offer a RESTful API with endpoints for orders, products, profits, marketing, inventory, and reports. Include proper documentation (Swagger/OpenAPI), SDKs (JavaScript, Python), and a developer portal.

2. **Implement outbound webhooks for event-driven integration.** Offer webhooks for key events: order processed, daily summary calculated, alert triggered, cost updated, report generated. This enables real-time integration with Slack, Zapier, custom dashboards, and automation workflows.

3. **Build a Zapier integration from launch.** Creating a Zapier app (triggers + actions) would instantly connect our product to 7,000+ other tools. Key triggers: daily profit summary, alert fired, new order processed. Key actions: add expense, update COGS. This is a massive distribution channel.

4. **Offer Google Sheets bi-directional sync.** Extend Google Sheets integration to support OUTPUT — sync profit reports, product analytics, and custom queries to Google Sheets on a schedule. This serves as a "poor man's API" for merchants who aren't developers.

5. **Create a developer portal with comprehensive documentation.** Include: API reference (Swagger/OpenAPI), authentication guide, rate limit documentation, code samples in multiple languages, Postman collection, sandbox environment, and changelog. First-class developer experience is a competitive moat.

6. **Support GraphQL alongside REST.** For agencies and developers building custom dashboards, GraphQL enables efficient querying of exactly the data they need. This is especially valuable for multi-store aggregation queries.

7. **Build API-first for internal use.** Design our own product to be API-first — every feature available through the API, not just cost input. This ensures the API is comprehensive and well-tested because we use it ourselves.

8. **Offer API access on mid-tier plans.** Don't gate the API behind the highest plan tier. Provide read-only API access on Pro plans and full read-write access on Ultimate/Enterprise plans. This encourages ecosystem development.

9. **Implement API analytics and monitoring.** Provide API users with a dashboard showing their request volume, error rates, and rate limit usage. This is standard for modern API platforms and helps developers debug integration issues.

10. **Build an FTP integration with clear documentation.** For enterprise customers with legacy ERP systems, offer well-documented FTP/SFTP integration with: supported file formats, field mapping configuration, processing schedule options, error reports, and retry logic. Document this thoroughly — unlike BeProfit.
