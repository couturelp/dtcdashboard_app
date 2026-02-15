# PRD Part 02: Third-Party Connector Platform Research

## Overview
Identify and catalog all viable third-party connector/aggregator platforms that could serve as our integration pass-through layer. The goal is to find platforms that already connect to Shopify, Meta Ads, Google Ads, and Google Analytics — and expose that data via API so our Node.js backend can consume it.

## Why a Third-Party Connector?
Building direct OAuth integrations with Meta and Google requires:
- Creating developer apps and going through approval processes
- Maintaining token refresh, rate limit handling, and API version migrations
- Significant development time per platform

A third-party connector eliminates this by:
- Providing pre-built connections to all major platforms
- Handling authentication, token management, and API changes
- Exposing normalized data through a single unified API
- Reducing our integration surface from 4+ platforms to 1

## Tasks

### Task 1: Research Unified API / Data Aggregator Platforms
- **Description**: Find platforms that aggregate data from multiple sources (e-commerce + ads + analytics) into a single API. These are purpose-built for our exact use case.
- **Acceptance Criteria**: List of at least 5 platforms with basic capability summary
- **Skills Required**: `agent-browser` (visit platform sites, read docs), `WebSearch` (find candidates)
- **Research Areas**:

**Candidate Category A — Marketing Data Aggregators**:
These platforms specialize in pulling marketing/ad data from multiple platforms:
- **Supermetrics** — Well-known marketing data connector
- **Funnel.io** — Marketing data aggregation platform
- **Fivetran** — General-purpose ELT/data pipeline tool
- **Airbyte** — Open-source data integration platform
- **Stitch (by Talend)** — Cloud-first ETL service
- **Windsor.ai** — Marketing attribution and data connector
- **Adverity** — Marketing analytics platform
- **Hevo Data** — No-code data pipeline
- **Portable.io** — ELT platform with marketing connectors

**Candidate Category B — Unified Commerce APIs**:
These platforms provide unified APIs specifically for e-commerce and related data:
- **Rutter** — Unified API for commerce platforms
- **Codat** — Unified API for commerce + accounting data
- **Merge.dev** — Unified API platform (check if they cover commerce/ads)
- **Hotglue** — Embedded integration platform for SaaS
- **Vessel** — Unified API for GTM tools
- **Alloy Automation** — Embedded commerce integration platform
- **Paragon** — Embedded integration platform

**Candidate Category C — iPaaS / Integration Platforms**:
General-purpose integration platforms that could work but may be overkill:
- **Zapier** — Popular automation platform (API available?)
- **Make (Integromat)** — Visual integration platform
- **Tray.io** — Enterprise integration platform
- **Workato** — Enterprise automation platform
- **n8n** — Open-source workflow automation

### Task 2: Initial Screening — Does Each Platform Cover Our 4 Sources?
- **Description**: For each candidate, verify they support all 4 required integrations.
- **Acceptance Criteria**: Matrix showing coverage per platform
- **Skills Required**: `agent-browser` (check each platform's integrations page)
- **Technical Details**:

**Coverage Matrix Template**:
| Platform | Shopify | Meta Ads | Google Ads | Google Analytics | API Available | Pricing Tier |
|----------|---------|----------|------------|-----------------|---------------|-------------|
| Platform A | ? | ? | ? | ? | ? | ? |
| Platform B | ? | ? | ? | ? | ? | ? |
| ... | | | | | | |

**Must-Have Criteria** (eliminate platforms missing any):
1. Shopify integration (orders, products, customers)
2. Facebook/Meta Ads integration (campaign spend, performance)
3. Google Ads integration (campaign spend, performance)
4. Google Analytics (GA4) integration (traffic, conversions)
5. REST API or similar for our Node.js backend to consume data
6. Reasonable pricing (under $500/month for startup scale)

**Nice-to-Have Criteria** (bonus points):
- Real-time or near-real-time data sync
- Webhook support for data changes
- Node.js SDK or client library
- Free tier or trial for development
- Self-hosted option (cost savings)

### Task 3: Research Pricing Models
- **Description**: Gather pricing information for all candidates that pass the coverage check.
- **Acceptance Criteria**: Pricing comparison document with estimated monthly cost for our usage
- **Skills Required**: `agent-browser` (visit pricing pages), `WebSearch` (find pricing articles/discussions)
- **Technical Details**:

**Pricing Factors to Document**:
- Base monthly/annual cost
- Per-row/per-record pricing
- Per-connector pricing
- API call limits
- Data volume limits
- Historical data access limits
- Number of users/destinations included
- Free tier limitations
- Startup/early-stage discounts

**Our Estimated Usage** (for pricing calculation):
- ~4 connectors (Shopify, Meta Ads, Google Ads, GA4)
- ~1,000-10,000 orders/month initially (startup scale)
- ~50-200 ad campaigns active
- Daily data sync minimum, hourly preferred
- 1 destination (our Node.js backend / database)
- Historical data: 90 days minimum

### Task 4: Research Platform Reliability & Reputation
- **Description**: Investigate each platform's track record for stability, uptime, and user satisfaction.
- **Acceptance Criteria**: Reliability assessment for each candidate
- **Skills Required**: `agent-browser` (read reviews, status pages), `WebSearch` (find user feedback)
- **Research Sources**:
  - G2 reviews and ratings
  - Capterra reviews
  - Product Hunt reviews and launch data
  - Reddit discussions (r/ecommerce, r/analytics, r/dataengineering)
  - Status page history (uptime track record)
  - GitHub issues (for open-source options)
  - Stack Overflow questions (indicates developer usage)
  - Blog posts and case studies from users
  - Twitter/X sentiment

**Reliability Criteria**:
- Company age and funding status (stability risk)
- Published uptime SLA
- Frequency of connector breakage reports
- Response time on support tickets (from reviews)
- Documentation quality score (1-5)
- Community size and activity

### Task 5: Research Documentation Quality & Developer Experience
- **Description**: Evaluate the API documentation, SDKs, and developer experience for each candidate.
- **Acceptance Criteria**: Documentation quality score and DX assessment per platform
- **Skills Required**: `agent-browser` (browse API docs, quickstart guides)
- **Technical Details**:

**Documentation Assessment Criteria**:
| Criteria | Weight | Description |
|----------|--------|-------------|
| API Reference completeness | High | Are all endpoints documented? |
| Quickstart guide quality | High | Can we get data flowing in < 1 hour? |
| Code examples (Node.js) | High | Are there Node.js-specific examples? |
| Authentication docs | Medium | Clear OAuth/API key setup instructions? |
| Rate limit documentation | Medium | Are limits clearly documented? |
| Error handling docs | Medium | Are error codes and responses documented? |
| Changelog/versioning | Medium | Is there a clear API versioning strategy? |
| SDK availability (Node.js) | High | Official or community Node.js SDK? |
| Webhook documentation | Medium | Can we receive push notifications? |
| Sandbox/test environment | High | Can we test without live data? |

## Research Execution Plan

### Step 1: Web Search Phase
Use `WebSearch` to find:
- "best marketing data aggregator API 2025 2026"
- "unified commerce API Shopify Meta Google"
- "alternative to Fivetran for marketing data"
- "Supermetrics vs Funnel.io vs Windsor.ai API access"
- "best data connector platform for SaaS startup"
- "Rutter API vs Codat vs Hotglue review"
- "cheapest marketing data API for startups"

### Step 2: Platform Website Deep-Dive
Use `agent-browser` to visit each platform's:
- Homepage (understand positioning)
- Integrations page (verify coverage)
- Pricing page (gather cost data)
- API documentation (assess DX)
- Blog (find case studies, stability info)

### Step 3: Review Aggregation
Use `agent-browser` + `WebSearch` to check:
- G2.com reviews for each platform
- Reddit discussions mentioning each platform
- Stack Overflow question volume
- GitHub stars/issues for open-source options

## Progress

### Task 002 - Connector Platform Discovery & Coverage Validation - 2026-02-14
- **Status:** COMPLETED
- **Summary:** Researched 21 connector platforms across 3 categories (Marketing Data Aggregators, Unified Commerce APIs, iPaaS), created coverage matrix for 4 required integrations, gathered detailed pricing data for shortlisted platforms
- **Files Created:** dtcdashboard_app/research/connector-platform-research-002.md
- **Key Findings:**
  - 12 platforms passed full coverage screening (Shopify + Meta Ads + Google Ads + GA4)
  - Pricing range: $0-$500/month for viable options (14 platforms eliminated for cost >$500/month)
  - 2 open-source/self-hosted options identified (Airbyte, n8n) offering $0 software cost
  - 6 platforms shortlisted for deep-dive evaluation in Task 003
- **Shortlist Created:** Fivetran (free tier), n8n ($0-24/month), Airbyte ($0-300/month), Windsor.ai ($99/month), Stitch Data ($100/month), Make ($9-29/month)
- **Research Report:** See dtcdashboard_app/research/connector-platform-research-002.md for full coverage matrix, pricing analysis, and platform recommendations

### Cumulative Progress
- [x] Task 1: Candidate platforms identified - **Completed in Task 002** (21 platforms cataloged across 3 categories)
- [x] Task 2: Coverage matrix completed - **Completed in Task 002** (4/4 integrations verified per platform)
- [x] Task 3: Initial pricing comparison - **Completed in Task 002** (detailed pricing breakdown for 8 shortlisted platforms)
- [ ] Task 4: Reliability assessment - **NOT STARTED** (deferred to Task 003)
- [ ] Task 5: Documentation quality assessment - **NOT STARTED** (deferred to Task 003)

### Remaining Work
- **Next Task (003):** Deep-dive evaluation of top 6 shortlisted platforms - reliability assessment (G2/Capterra reviews, uptime, user feedback), API documentation quality evaluation, hands-on testing recommendations, final platform selection
- **Next Task (004+):** Architecture design, implementation planning, cost-benefit analysis, final recommendation
