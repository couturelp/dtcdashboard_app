# PRD Part 03: Platform Deep-Dive Evaluation

## Overview
After the initial screening in Part 02, this part focuses on deep-diving into the top 3-5 candidate platforms. We will test their APIs, verify data coverage at the field level, and assess how well they match our specific requirements from Part 01.

## Tasks

### Task 1: Deep-Dive — Shopify Data Coverage per Platform
- **Description**: For each shortlisted platform, verify it provides the specific Shopify data fields we need (orders, products, customers, refunds, transaction fees) as defined in Part 01.
- **Acceptance Criteria**: Field-level coverage matrix for Shopify data across all shortlisted platforms
- **Skills Required**: `agent-browser` (read API docs for each platform's Shopify connector)
- **Technical Details**:

**Verification Checklist per Platform**:
- [ ] Can retrieve order line items with individual prices and quantities?
- [ ] Can retrieve transaction/payment gateway fees per order?
- [ ] Can retrieve refund data linked to original orders?
- [ ] Can retrieve product COGS/cost data?
- [ ] Can retrieve customer data (email, order history)?
- [ ] Can retrieve discount code usage per order?
- [ ] Can access historical data (90+ days back)?
- [ ] What is the data refresh frequency for Shopify?
- [ ] Does it support Shopify webhooks or only polling?

### Task 2: Deep-Dive — Meta Ads Data Coverage per Platform
- **Description**: Verify each platform provides campaign-level, ad-set-level, and ad-level data from Meta Ads with the fields we need.
- **Acceptance Criteria**: Field-level coverage matrix for Meta Ads data
- **Skills Required**: `agent-browser` (read API docs for each platform's Meta Ads connector)
- **Technical Details**:

**Verification Checklist per Platform**:
- [ ] Campaign-level spend, clicks, impressions, conversions?
- [ ] Ad set-level breakdown available?
- [ ] Daily granularity on spend data?
- [ ] Conversion value (purchase revenue) available?
- [ ] ROAS metric available or calculable?
- [ ] Can access data by date range (custom period queries)?
- [ ] What attribution windows are supported?
- [ ] How is Meta's API token refresh handled?
- [ ] What happens when Meta changes their API? (version migration)

### Task 3: Deep-Dive — Google Ads Data Coverage per Platform
- **Description**: Verify each platform provides the Google Ads campaign and performance data we need.
- **Acceptance Criteria**: Field-level coverage matrix for Google Ads data
- **Skills Required**: `agent-browser` (read API docs for each platform's Google Ads connector)
- **Technical Details**:

**Verification Checklist per Platform**:
- [ ] Campaign-level spend, clicks, impressions, conversions?
- [ ] Campaign type breakdown (Search, Shopping, Display, Video)?
- [ ] Ad group-level data available?
- [ ] Daily granularity on spend data?
- [ ] Conversion value available?
- [ ] Keyword-level data for Search campaigns?
- [ ] Shopping campaign product-level performance?
- [ ] How are Google Ads API quota limits handled?

### Task 4: Deep-Dive — Google Analytics (GA4) Data Coverage per Platform
- **Description**: Verify each platform provides GA4 data (not Universal Analytics, which is deprecated).
- **Acceptance Criteria**: Field-level coverage matrix for GA4 data
- **Skills Required**: `agent-browser` (read API docs for each platform's GA4 connector)
- **Technical Details**:

**Verification Checklist per Platform**:
- [ ] Is this GA4 (not Universal Analytics)?
- [ ] Sessions by channel/source/medium?
- [ ] E-commerce transaction data?
- [ ] Revenue by channel?
- [ ] Conversion rate by channel?
- [ ] Page views and engagement metrics?
- [ ] User demographics (if available)?
- [ ] Custom date range queries?
- [ ] Real-time data access or batch only?

### Task 5: API Integration Feasibility Test
- **Description**: For the top 2-3 platforms, attempt a proof-of-concept API call to verify the developer experience matches the documentation claims.
- **Acceptance Criteria**: Working code snippet that retrieves sample data from each platform's API
- **Skills Required**: `agent-browser` (sign up for free trial/sandbox), Node.js code testing
- **Technical Details**:

**Per Platform, Verify**:
1. **Authentication Flow**: How does our backend authenticate? API key? OAuth?
2. **Data Retrieval**: Can we make a simple GET request and receive structured JSON?
3. **Response Format**: Is the data normalized or raw from the source?
4. **Pagination**: How are large datasets handled?
5. **Rate Limits**: What are the actual limits for API consumers?
6. **Error Handling**: What do error responses look like?
7. **Latency**: How fast do API calls respond?

**Test Scenarios**:
```
Scenario 1: Retrieve last 7 days of Shopify orders
Scenario 2: Retrieve last 7 days of Meta Ads campaign spend
Scenario 3: Retrieve last 7 days of Google Ads campaign spend
Scenario 4: Retrieve last 7 days of GA4 session data
```

### Task 6: Evaluate Data Normalization & Schema
- **Description**: Assess how each platform normalizes data across sources and whether their schema works for our profit calculation needs.
- **Acceptance Criteria**: Schema assessment document per platform
- **Skills Required**: `agent-browser` (read schema docs)
- **Technical Details**:

**Key Questions**:
- Does the platform normalize data into a unified schema, or pass through raw API responses?
- If normalized, does the schema preserve the granularity we need?
- Can we join Shopify order data with ad spend data at the platform level, or must we do that ourselves?
- Is the timestamp format consistent across all connectors?
- How are currencies handled across different sources?
- Does the platform handle data deduplication?

### Task 7: Security & Compliance Assessment
- **Description**: Evaluate each platform's security posture, data handling practices, and compliance certifications.
- **Acceptance Criteria**: Security assessment document per platform
- **Skills Required**: `agent-browser` (read security pages, compliance docs)
- **Technical Details**:

**Security Checklist**:
- [ ] SOC 2 Type II certification?
- [ ] GDPR compliance?
- [ ] Data encryption at rest and in transit?
- [ ] Where is data stored (region)?
- [ ] Data retention policy?
- [ ] Can we use the platform without it storing our data (pass-through mode)?
- [ ] How are OAuth tokens for connected services stored?
- [ ] What happens to our data if we cancel?

## Evaluation Scoring Framework

Each platform will be scored on a 1-5 scale across these dimensions:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| **Data Coverage** | 30% | Does it provide all fields we need from all 4 sources? |
| **API Quality** | 20% | Documentation, SDK, DX, response format |
| **Pricing** | 20% | Monthly cost at our usage level |
| **Reliability** | 15% | Uptime track record, company stability |
| **Ease of Integration** | 10% | Time to get first data flowing in our Node.js app |
| **Security** | 5% | Compliance, data handling |

**Scoring Template**:
| Platform | Coverage (30%) | API (20%) | Pricing (20%) | Reliability (15%) | Ease (10%) | Security (5%) | **Total** |
|----------|----------------|-----------|----------------|-------------------|------------|---------------|-----------|
| Platform A | /5 | /5 | /5 | /5 | /5 | /5 | /5.0 |
| Platform B | /5 | /5 | /5 | /5 | /5 | /5 | /5.0 |

## Progress

### Task 003 - Platform Deep-Dive: Shopify & Meta Ads Coverage - 2026-02-14
- **Status:** COMPLETED
- **Summary:** Evaluated 6 shortlisted platforms (Fivetran, n8n, Airbyte, Windsor.ai, Stitch Data, Make) for Shopify and Meta Ads data coverage at field level
- **Files Created:** `dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md`
- **Key Findings:**
  - **Shopify Coverage Results:** 3 platforms with 90%+ coverage (Fivetran 93%, Airbyte 90%, n8n 90%); 2 with 80-89% (Make 88%, Stitch 78%); 1 eliminated (Windsor.ai 33-53%)
  - **Meta Ads Coverage Results:** 4 platforms with 100% coverage (Fivetran, Airbyte, n8n, Stitch); 1 with 68% (Make - gaps due to Insights module limitations)
  - **Combined Scores:** Fivetran 95% (56/59), Airbyte 93% (55/59), n8n 93% (55/59), Stitch 85% (50/59), Make 81% (48/59)
  - **Universal Shopify Challenges:** Transaction fees problematic across ALL platforms (Shopify API limitation); Product COGS requires special permission + separate API call for all platforms
  - **Meta Ads Performance:** Near-perfect coverage across traditional ETL platforms; workflow tools (n8n, Make) require more manual configuration
  - **Platform Eliminated:** Windsor.ai - insufficient Shopify coverage (too many critical fields undocumented/missing); marketing-focus doesn't align with e-commerce financial requirements
  - **Platforms Advancing to Task 004:** 5 platforms (Fivetran, Airbyte, n8n, Stitch Data, Make)
- **Top 3 Platforms (Combined Shopify + Meta Ads):**
  1. Fivetran - 56/59 (95%) - Best traditional ETL; excellent documentation; free tier
  2. Airbyte - 55/59 (93%) - Best open-source option; verify transaction fees + COGS
  3. n8n - 55/59 (93%) - Best value; flexible workflow automation; $0-24/month
- **Research Report:** See `dtcdashboard_app/research/platform-deepdive-shopify-meta-003.md` for complete coverage matrices, platform rankings, and detailed analysis

### Cumulative Progress
- [x] Task 1: Shopify data deep-dive completed - **COMPLETED IN TASK 003** (40 fields verified across 6 platforms)
- [x] Task 2: Meta Ads data deep-dive completed - **COMPLETED IN TASK 003** (19 fields verified across 5 platforms, 1 eliminated)
- [ ] Task 3: Google Ads data deep-dive - **NOT STARTED** (deferred to Task 004)
- [ ] Task 4: GA4 data deep-dive - **NOT STARTED** (deferred to Task 004)
- [ ] Task 5: API feasibility test - **NOT STARTED** (deferred to later task)
- [ ] Task 6: Data normalization assessment - **NOT STARTED** (deferred to later task)
- [ ] Task 7: Security assessment - **NOT STARTED** (deferred to later task)

### Remaining Work
- **Next Task (004):** Google Ads + GA4 data coverage evaluation for remaining 5 platforms (Fivetran, Airbyte, n8n, Stitch Data, Make)
- **Subsequent Tasks:** API integration testing, data normalization assessment, security review, final platform recommendation
