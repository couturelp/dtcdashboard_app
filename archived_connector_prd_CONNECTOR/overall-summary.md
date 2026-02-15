# Project Overview — connectorResearch Phase

## Project Name
DTC Dashboard — Connector Research Phase

## Description
Research phase to identify the best third-party connector/aggregator platform(s) that will serve as a pass-through layer for our DTC profit dashboard MVP. Instead of building direct OAuth integrations with Meta, Google, Shopify, etc., we want to find a proven, stable, well-documented third-party platform that already connects to these services and exposes the data we need via API.

## Context
We are building a BeProfit-like DTC profit analytics dashboard MVP with the following scope:
- **Dashboard/Overview section**: Real-time profit tracking, P&L breakdowns, key metrics (gross profit, contribution profit, net profit, ROAS)
- **Marketing section**: Ad spend tracking, campaign-level analytics, profit attribution across ad platforms
- **Custom cost management**: Upload product costs, fulfillment/shipping costs, operation expenses via spreadsheet or manual input
- **Account management & payments**: Full user account system with payment support

### Integrations Required (Minimum)
1. **Shopify** — Orders, products, COGS, refunds, customers, transaction fees
2. **Facebook/Meta Ads** — Campaigns, ad spend, clicks, impressions, CPC, conversions
3. **Google Ads** — Campaigns, ad spend, clicks, CPC, conversions
4. **Google Analytics** — Traffic, conversion data, channel attribution

### Explicitly Excluded
- BeProfit Pricing Feature
- Profit Simulator
- UTM Attribution system
- Profit Insights
- Cohort Analysis

## Phase Goal
Identify 1-2 third-party connector platforms that:
1. Already integrate with Shopify, Meta Ads, Google Ads, and Google Analytics
2. Expose data via REST API or similar that our Node.js backend can consume
3. Have proven stability, clear documentation, and reasonable pricing
4. Minimize the integration work needed on our side
5. Are trustworthy, actively maintained, and used by real production applications

## Technical Stack (for MVP build, post-research)
- **Backend**: Node.js
- **Frontend**: React
- **Data Sources**: Shopify, Meta Ads, Google Ads, Google Analytics + manual CSV/spreadsheet uploads

## PRD Parts for This Phase

| Part | Title | Description |
|------|-------|-------------|
| 01 | MVP Data Requirements Mapping | Exact data fields needed from each integration source |
| 02 | Third-Party Connector Platform Research | Identify and catalog candidate platforms |
| 03 | Platform Deep-Dive Evaluation | Detailed evaluation of top 3-5 candidates |
| 04 | Integration Architecture & Cost Analysis | Architecture design, cost comparison, final recommendation |

## Skills & Tools Required
- **agent-browser**: Web research for platform documentation, pricing pages, API docs, reviews
- **Web Search**: Finding articles, blog posts, comparisons, case studies about connector platforms
- **Read/Explore**: Analyzing existing casestudy research files for context

## Success Criteria
- Clear recommendation of 1-2 platforms with justification
- Documented pricing breakdown for our expected usage
- Confirmed API coverage for all required data points
- Proof that chosen platform(s) work with Node.js
- Risk assessment and fallback plan
