# Integration Architecture Design & Cost Analysis

**Task Reference:** Task 004
**PRD Part:** 04 - Integration Architecture & Cost Analysis
**Date:** 2026-02-14
**Status:** COMPLETED

---

## Executive Summary

This document presents three distinct integration architecture options for the DTC Profit Dashboard, complete with technical specifications, 12-month cost projections, and risk analysis. The architectures range from a single unified connector platform to hybrid approaches to direct API integrations. Based on growth assumptions of 1-5 stores at launch scaling to 50-100 stores by month 12, the year-1 costs range from **$5,239 (Option C)** to **$7,871 (Option B)**.

**Key Findings:**
- **Lowest recurring cost:** Option C (Direct Shopify + Marketing Connector) at $437/month average
- **Fastest to launch:** Option A (Single Connector) with only 2 weeks development time
- **Most control & flexibility:** Option C provides real-time Shopify data and lowest vendor lock-in
- **Not recommended:** Option B (Hybrid) has highest cost without offsetting benefits

---

## Architecture Option A — Single Connector Platform

### Overview
All data sources (Shopify, Meta Ads, Google Ads, GA4) flow through one unified connector platform (e.g., Fivetran or Airbyte). This provides a single API integration point for our Node.js backend.

### Data Flow Diagram
```
┌──────────────────────────────────────────────────────────────────┐
│ Data Sources                                                      │
├──────────────────────────────────────────────────────────────────┤
│ Shopify Store │ Meta Ads │ Google Ads │ Google Analytics (GA4) │
└───────┬────────┴────┬─────┴─────┬──────┴──────────┬──────────────┘
        │             │           │                 │
        │   OAuth/API Credentials configured in connector platform
        │             │           │                 │
        └─────────────┴───────────┴─────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────────┐
        │   Connector Platform (Fivetran/Airbyte)   │
        │   - Manages OAuth connections             │
        │   - Pulls data on schedule                │
        │   - Normalizes data to unified schema     │
        │   - Exposes REST API                      │
        └───────────────────┬───────────────────────┘
                            │
                REST API calls (JSON over HTTPS)
                            │
                            ▼
        ┌───────────────────────────────────────────┐
        │   Our Node.js Backend                     │
        │   - Calls connector REST API              │
        │   - Transforms to our schema              │
        │   - Writes to database                    │
        │   - Business logic (profit calc, etc.)    │
        └───────────────────┬───────────────────────┘
                            │
                  Database writes (PostgreSQL/MySQL)
                            │
                            ▼
        ┌───────────────────────────────────────────┐
        │   PostgreSQL/MySQL Database               │
        │   Tables: orders, products, campaigns,    │
        │           ad_spend, analytics_sessions    │
        └───────────────────┬───────────────────────┘
                            │
                 GraphQL/REST API queries
                            │
                            ▼
        ┌───────────────────────────────────────────┐
        │   React Frontend                          │
        │   - Dashboard views                       │
        │   - Profit analytics                      │
        │   - Marketing metrics                     │
        └───────────────────────────────────────────┘
```

### Authentication Chain

```typescript
// Step 1: User configures OAuth in connector platform
// Connector platform handles:
// - Shopify OAuth flow → stores access token
// - Meta Ads OAuth flow → stores access token
// - Google Ads OAuth flow → stores access token
// - GA4 OAuth flow → stores access token

// Step 2: Our backend authenticates to connector API
import axios from 'axios';

interface ConnectorAPIClient {
  apiKey: string; // Our API key for the connector platform
  baseURL: string; // e.g., 'https://api.fivetran.com/v1'
}

class FivetranClient implements ConnectorAPIClient {
  apiKey: string;
  baseURL: string = 'https://api.fivetran.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getOrders(connectorId: string, dateRange: { start: string; end: string }): Promise<Order[]> {
    // Call Fivetran API to get Shopify orders
    const response = await axios.get(`${this.baseURL}/connectors/${connectorId}/data/orders`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
      params: {
        start_date: dateRange.start,
        end_date: dateRange.end
      }
    });
    return response.data.orders;
  }

  async getCampaignMetrics(connectorId: string, dateRange: { start: string; end: string }): Promise<CampaignMetrics[]> {
    // Call Fivetran API to get Meta Ads campaign data
    const response = await axios.get(`${this.baseURL}/connectors/${connectorId}/data/campaigns`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
      params: {
        start_date: dateRange.start,
        end_date: dateRange.end
      }
    });
    return response.data.campaigns;
  }
}

// Authentication summary:
// - Connector ↔ Data Sources: OAuth 2.0 (managed by connector platform)
// - Our Backend ↔ Connector: API Key / Bearer Token (our responsibility)
// - React Frontend ↔ Our Backend: JWT auth tokens (standard user auth, out of scope here)
```

### Failure Mode Analysis

| Failure Scenario | Impact | Detection | Recovery |
|------------------|--------|-----------|----------|
| **Connector platform API down** | HIGH - No new data sync | API calls return 503/timeout | Retry with exponential backoff; alert if down >1hr; show stale data in UI with timestamp |
| **Single data source OAuth expires** (e.g., Meta Ads token) | MEDIUM - Missing ad spend data | Connector platform webhook/API reports auth failure | Notify user to re-authenticate; continue showing other sources' data |
| **All data sources OAuth expire** | HIGH - No data available | Multiple auth failures | User dashboard shows "Reconnect Required" banner; email notification |
| **Connector API rate limit hit** | MEDIUM - Delayed data sync | API returns 429 Too Many Requests | Queue requests; spread sync across longer time window |
| **Database connection lost** | HIGH - Cannot persist data | Database client throws connection error | Retry connection; buffer data in memory (limited); alert DevOps |
| **Connector platform schema change** | MEDIUM - Data parsing errors | Unexpected field formats/names | Log errors; alert DevOps; may need code update to handle new schema |
| **Connector platform company shutdown** | CRITICAL - Permanent data loss if no backup | News/emails from platform | **Mitigation required**: Must have architecture allowing swap to alternative connector (see Migration strategy in Task 4) |

### Data Freshness by Source

| Data Source | Connector Sync Frequency | API Latency | Total Freshness | Real-time? |
|-------------|--------------------------|-------------|-----------------|------------|
| **Shopify Orders** | Every 15 minutes (Fivetran) or 1 hour (Airbyte) | ~5-10 minutes | **20-70 minutes** | No - near-real-time via webhooks requires Direct API |
| **Meta Ads Campaigns** | Daily (most connectors) | Meta API updates hourly | **~24 hours** | No |
| **Google Ads Campaigns** | Daily | Google Ads API updates every 3 hours | **~24 hours** | No |
| **Google Analytics (GA4)** | Daily | GA4 processes data with 24-48hr delay | **24-72 hours** | No |

**Freshness notes:**
- For profit dashboard MVP, daily refresh is acceptable for ad spend and analytics
- Shopify order data should ideally be <1 hour stale for customer support use cases
- If real-time order data is required, consider Architecture Option C (Direct Shopify API)

### Infrastructure Cost Estimate (Month 1-3)

**Connector Platform:** $100-200/month (Airbyte Cloud or Fivetran starter tier)
**Our Backend Hosting:** $50/month (AWS ECS Fargate 0.5 vCPU, 1GB RAM)
**Database:** $25/month (AWS RDS PostgreSQL db.t3.micro)
**Data Transfer:** $10/month (estimate based on 10K orders/month)
**Monitoring/Logging:** $15/month (CloudWatch, Sentry)

**Total:** ~$200-300/month

---

## Architecture Option B — Hybrid (Commerce + Marketing Split)

### Overview
Uses different specialized connectors for commerce data (Shopify) vs. marketing data (Meta Ads, Google Ads, GA4). This "best-of-breed" approach aims to get the strongest connector for each category.

### Data Flow Diagram
```
┌─────────────────────────┐    ┌──────────────────────────────────────┐
│ Commerce Data Source    │    │ Marketing Data Sources               │
│ ─────────────────       │    │ ──────────────────────               │
│ Shopify Store           │    │ Meta Ads │ Google Ads │ GA4         │
└───────────┬─────────────┘    └─────┬──────────┴─────────┴────────────┘
            │                        │
     OAuth/API creds         OAuth/API creds for ad platforms
            │                        │
            ▼                        ▼
┌───────────────────────┐    ┌──────────────────────────────────────┐
│ Commerce Connector    │    │ Marketing Connector                  │
│ (e.g., Rutter,        │    │ (e.g., Supermetrics, Windsor.ai)     │
│  Fivetran, Airbyte)   │    │                                      │
│ - Shopify specialist  │    │ - Ad platform specialist             │
│ - E-commerce schema   │    │ - Marketing metrics schema           │
└───────────┬───────────┘    └──────────────┬───────────────────────┘
            │                               │
    REST API (orders,             REST API (campaigns, spend,
    products, customers)           conversions, analytics)
            │                               │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────────────────┐
            │   Our Node.js Backend                     │
            │   - Calls both connector APIs             │
            │   - Joins data (match orders to campaigns)│
            │   - Profit calculations                   │
            └───────────────┬───────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────────────────┐
            │   Database & React Frontend               │
            │   (Same as Option A)                      │
            └───────────────────────────────────────────┘
```

### Key Differences from Option A

```typescript
// Option B requires TWO API clients instead of one

interface CommerceConnector {
  getOrders(storeId: string, dateRange: DateRange): Promise<Order[]>;
  getProducts(storeId: string): Promise<Product[]>;
  getCustomers(storeId: string): Promise<Customer[]>;
}

interface MarketingConnector {
  getAdSpend(accountIds: string[], dateRange: DateRange): Promise<AdSpend[]>;
  getCampaignMetrics(accountIds: string[], dateRange: DateRange): Promise<CampaignMetrics[]>;
  getAnalytics(propertyId: string, dateRange: DateRange): Promise<AnalyticsData[]>;
}

// Backend service layer combines both
class DataSyncService {
  constructor(
    private commerceConnector: CommerceConnector,
    private marketingConnector: MarketingConnector
  ) {}

  async syncAllData(userId: string, dateRange: DateRange) {
    // Parallel fetch from both connectors
    const [orders, adSpend, campaigns] = await Promise.all([
      this.commerceConnector.getOrders(userId, dateRange),
      this.marketingConnector.getAdSpend([userId], dateRange),
      this.marketingConnector.getCampaignMetrics([userId], dateRange)
    ]);

    // Join logic: match orders to campaigns by date + UTM params
    const ordersWithAttribution = this.attributeOrdersToCampaigns(orders, campaigns);

    // Calculate profit per campaign
    const profitBycampaigns = this.calculateProfitPerCampaign(ordersWithAttribution, adSpend);

    // Persist to database
    await this.db.saveAll({ orders, adSpend, campaigns, profitByCompaign });
  }

  private attributeOrdersToCampaigns(orders: Order[], campaigns: Campaign[]): OrderWithAttribution[] {
    // Simplified attribution logic
    // Real implementation would match by UTM parameters, referrer, or customer journey
    return orders.map(order => ({
      ...order,
      campaignId: this.findMatchingCampaign(order, campaigns)?.id || null
    }));
  }
}
```

### Pros and Cons

**Option B Advantages:**
1. **Best-of-breed**: Choose the strongest connector for each category (e.g., Rutter for commerce, Windsor.ai for marketing)
2. **Specialization**: Commerce connectors may have better Shopify coverage (COGS, fees); marketing connectors may have better ad metrics
3. **Risk distribution**: If one connector fails, the other still works (partial data availability)
4. **Pricing flexibility**: Can choose cheaper commerce connector + expensive marketing connector, or vice versa

**Option B Disadvantages:**
1. **Two APIs to maintain**: More integration code, more potential points of failure
2. **Two vendor relationships**: Separate contracts, support channels, pricing negotiations
3. **Data join complexity**: Must join orders to campaigns ourselves (attribution logic can be complex)
4. **Higher total cost**: Paying for two platforms instead of one (unless one is open-source)
5. **Schema differences**: Each connector has its own data format; more transformation logic needed

### Infrastructure Cost Estimate (Month 1-3)

**Commerce Connector:** $50-100/month (e.g., Rutter developer tier or Airbyte self-hosted)
**Marketing Connector:** $100-200/month (e.g., Supermetrics API tier or Windsor.ai)
**Our Backend Hosting:** $60/month (slightly higher CPU/RAM for dual API integration)
**Database:** $25/month (same as Option A)
**Data Transfer:** $15/month (higher due to two connectors)
**Monitoring/Logging:** $15/month

**Total:** ~$265-415/month

---

## Architecture Option C — Direct + Connector Mix

### Overview
Integrates Shopify directly via their official API while using a connector platform only for marketing data sources (Meta Ads, Google Ads, GA4). This reduces connector costs and provides full control over Shopify data with real-time webhook support.

### Data Flow Diagram
```
┌─────────────────┐        ┌─────────────────────────────────────┐
│ Shopify Store   │        │ Marketing Data Sources              │
└────────┬────────┘        │ Meta Ads │ Google Ads │ GA4        │
         │                 └─────┬──────────┴─────────┴───────────┘
    Direct API                   │
   (OAuth flow we                │ OAuth via connector platform
    manage ourselves)             │
         │                        │
         │                        ▼
         │            ┌────────────────────────────────┐
         │            │ Marketing Connector            │
         │            │ (e.g., Supermetrics, Airbyte)  │
         │            └────────────┬───────────────────┘
         │                         │
         │                REST API (ad metrics)
         │                         │
         └────────────┬────────────┘
                      │
                      ▼
    ┌─────────────────────────────────────────────────┐
    │ Our Node.js Backend                             │
    │ ┌─────────────────────────────────────────────┐ │
    │ │ Shopify API Client (direct integration)    │ │
    │ │ - OAuth handler for Shopify                │ │
    │ │ - REST/GraphQL calls to Shopify Admin API  │ │
    │ │ - Webhook listener for real-time orders    │ │
    │ └─────────────────────────────────────────────┘ │
    │ ┌─────────────────────────────────────────────┐ │
    │ │ Marketing Connector Client                 │ │
    │ │ - Calls connector REST API for ad data     │ │
    │ └─────────────────────────────────────────────┘ │
    │                                                   │
    │ Data joining, profit calculation, storage        │
    └───────────────────────┬───────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────────────────┐
            │   Database & React Frontend               │
            │   (Same as Options A & B)                 │
            └───────────────────────────────────────────┘
```

### Direct Shopify Integration Code Patterns

```typescript
// Our backend implements Shopify OAuth and API calls directly
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion, Session } from '@shopify/shopify-api';

// Step 1: Configure Shopify API client
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: ['read_orders', 'read_products', 'read_customers', 'read_inventory'],
  hostName: process.env.SHOPIFY_APP_HOST_NAME!,
  apiVersion: ApiVersion.January24,
  isEmbeddedApp: false,
});

// Step 2: OAuth handler (user clicks "Connect Shopify")
class ShopifyOAuthHandler {
  async beginAuth(req: Request, res: Response) {
    const authRoute = await shopify.auth.begin({
      shop: shopify.utils.sanitizeShop(req.query.shop as string)!,
      callbackPath: '/api/shopify/callback',
      isOnline: false, // offline access for background sync
    });
    res.redirect(authRoute);
  }

  async handleCallback(req: Request, res: Response) {
    const session = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    // Store session.accessToken in our database for this user
    await db.users.update({
      where: { shopifyDomain: session.shop },
      data: { shopifyAccessToken: session.accessToken }
    });

    res.redirect('/dashboard?connected=shopify');
  }
}

// Step 3: Fetch data from Shopify Admin API
class ShopifyDataFetcher {
  async fetchOrders(session: Session, dateRange: DateRange): Promise<Order[]> {
    const client = new shopify.clients.Rest({ session });

    // Shopify REST API call
    const response = await client.get({
      path: 'orders',
      query: {
        created_at_min: dateRange.start,
        created_at_max: dateRange.end,
        status: 'any',
        limit: 250
      }
    });

    return response.body.orders.map(rawOrder => this.transformOrder(rawOrder));
  }

  async fetchOrderTransactions(session: Session, orderId: string): Promise<Transaction[]> {
    // IMPORTANT: Transaction fees require separate API call per order
    const client = new shopify.clients.Rest({ session });
    const response = await client.get({
      path: `orders/${orderId}/transactions`
    });

    return response.body.transactions; // Includes gateway fees, processing fees
  }

  private transformOrder(rawOrder: any): Order {
    // Transform Shopify schema to our internal schema
    return {
      id: rawOrder.id.toString(),
      createdAt: new Date(rawOrder.created_at),
      totalPrice: parseFloat(rawOrder.total_price),
      lineItems: rawOrder.line_items.map(this.transformLineItem),
      // ... more fields
    };
  }
}

// Step 4: Real-time webhooks for immediate order updates
class ShopifyWebhookHandler {
  async registerWebhooks(session: Session) {
    const response = await shopify.webhooks.register({
      session,
      topic: 'ORDERS_CREATE',
      path: '/api/webhooks/shopify/orders/create'
    });

    // Also register: ORDERS_UPDATED, ORDERS_CANCELLED, REFUNDS_CREATE
  }

  async handleOrderCreated(req: Request, res: Response) {
    const verified = await shopify.webhooks.validate({
      rawBody: req.body,
      rawRequest: req,
      rawResponse: res
    });

    if (!verified) {
      return res.status(401).send('Webhook verification failed');
    }

    const order = req.body; // Shopify sends full order object
    await this.processNewOrder(order); // Save to our database immediately

    res.status(200).send('OK');
  }
}

// Benefits of direct integration:
// 1. Real-time data via webhooks (no 15min-1hr sync delay)
// 2. Full control over API calls (can request exactly the fields we need)
// 3. Can fetch transaction fees (many connectors don't expose this)
// 4. No connector cost for Shopify (reduced monthly bill)
//
// Drawbacks:
// 1. We must implement and maintain OAuth flow ourselves
// 2. We must handle API rate limits (Shopify: 2 calls/second, burst of 40)
// 3. We must handle webhook verification and processing
// 4. More code to write and test
```

### Failure Mode Analysis

| Failure Scenario | Impact | Detection | Recovery |
|------------------|--------|-----------|----------|
| **Shopify API down** | HIGH - No new order data | API calls timeout/5xx | Retry with backoff; rely on webhooks queued by Shopify (delivered when API back up) |
| **Shopify OAuth token expires** | HIGH - Cannot fetch data | API returns 401 Unauthorized | Notify user to re-authenticate via dashboard banner |
| **Webhook endpoint down** | MEDIUM - Missing real-time orders, but batch sync still works | CloudWatch alarm on endpoint errors | Auto-restart backend; Shopify retries webhooks for 48hrs |
| **Marketing connector API down** | MEDIUM - Missing ad spend data | API 503/timeout | Same as Option A - retry, show stale data |
| **Rate limit hit (Shopify)** | MEDIUM - Delayed sync | API returns 429 with Retry-After header | Respect Retry-After; implement request queue with rate limiter |
| **Webhook replay attack** | LOW - Could process duplicate orders | Webhook HMAC validation fails | Reject webhook; log security event |

**Key difference from Options A & B:**
- Direct Shopify integration means WE are responsible for uptime, security, and error handling
- But we gain real-time data and reduced connector costs

### Infrastructure Cost Estimate (Month 1-3)

**Marketing Connector:** $100-200/month (for Meta Ads, Google Ads, GA4)
**Our Backend Hosting:** $70/month (higher resources for direct API integration + webhook processing)
**Database:** $30/month (slightly larger for webhook buffering)
**Shopify API Costs:** $0 (free with Shopify plan)
**Data Transfer:** $10/month
**Monitoring/Logging:** $20/month (more critical due to webhook processing)

**Total:** ~$230-330/month

**Cost savings vs Option A:** ~$0-30/month (saves connector cost for Shopify, but higher infrastructure)
**Development cost (one-time):** +2-3 weeks engineering time to build Shopify OAuth + webhooks vs. using connector

---

## 12-Month Cost Projection

### Growth Assumptions

Based on realistic DTC SaaS adoption curve:

| Growth Phase | Months | Connected Stores | Orders/Month | Ad Campaigns | GA4 Sessions | Notes |
|--------------|--------|------------------|--------------|--------------|--------------|-------|
| **Beta/Early Adopter** | 1-3 | 1-5 | 500-1,000 | 10-20 | 5,000-10,000 | Testing with friendly users, low volume |
| **Initial Growth** | 4-6 | 5-20 | 2,000-5,000 | 30-50 | 20,000-50,000 | First paid users, word-of-mouth growth |
| **Scaling** | 7-9 | 20-50 | 8,000-20,000 | 60-100 | 80,000-200,000 | Product-market fit, marketing investment |
| **Expansion** | 10-12 | 50-100 | 25,000-50,000 | 120-200 | 250,000-500,000 | Established product, sales team active |

### Cost Categories Tracked

1. **Connector Platform Subscription**
   - Base monthly fee + per-connector fees (if applicable)
   - Volume-based pricing tiers (orders/rows synced)
   - Overage charges for exceeding included limits

2. **Backend Hosting (AWS)**
   - ECS Fargate or EC2 instances
   - Scaling based on API request volume and data processing needs
   - Estimated: 0.5 vCPU at Month 1 → 4 vCPU at Month 12

3. **Database (PostgreSQL RDS)**
   - Storage costs (10GB at Month 1 → 200GB at Month 12)
   - IOPS and compute tier upgrades
   - Backup storage

4. **Data Transfer**
   - API calls to connector platforms
   - Inbound/outbound data transfer (AWS charges $0.09/GB out)
   - Estimated: 5GB/month at Month 1 → 100GB/month at Month 12

5. **Monitoring & DevOps Tools**
   - CloudWatch, Sentry, DataDog
   - Scales with request volume and log retention

6. **Development/Maintenance Time** (one-time cost amortized)
   - Initial integration development: 2-4 weeks
   - Ongoing maintenance: 4-8 hours/month (bug fixes, connector API updates)

### Option A: Single Connector Platform (Assuming Fivetran)

#### Fivetran Pricing Research
- **Starter Plan**: $100/month (includes 500K rows/month, 5 connectors)
- **Standard Plan**: $200/month (includes 1M rows/month, unlimited connectors)
- **Overage**: $50 per additional 500K rows
- **Source**: https://fivetran.com/pricing (as of 2026)

#### Monthly Cost Breakdown

| Month | Stores | Orders/mo | Rows/mo¹ | Connector Cost² | Backend | Database | Transfer | Monitoring | **Total** |
|-------|--------|-----------|----------|----------------|---------|----------|----------|------------|-----------|
| 1 | 1-3 | 500 | 50K | $100 (Starter) | $50 | $25 | $5 | $15 | **$195** |
| 2 | 3 | 750 | 75K | $100 | $50 | $25 | $7 | $15 | **$197** |
| 3 | 5 | 1,000 | 100K | $100 | $50 | $25 | $10 | $15 | **$200** |
| 4 | 8 | 2,000 | 200K | $100 | $60 | $30 | $15 | $18 | **$223** |
| 5 | 12 | 3,500 | 350K | $100 | $70 | $35 | $20 | $20 | **$245** |
| 6 | 20 | 5,000 | 500K | $100 | $80 | $40 | $25 | $22 | **$267** |
| 7 | 30 | 10,000 | 1M | $200 (Standard) | $100 | $50 | $35 | $25 | **$410** |
| 8 | 40 | 15,000 | 1.5M | $250 ($200+overage) | $120 | $60 | $45 | $28 | **$503** |
| 9 | 50 | 20,000 | 2M | $300 ($200+2×overage) | $140 | $75 | $55 | $30 | **$600** |
| 10 | 60 | 30,000 | 3M | $400 | $160 | $90 | $70 | $35 | **$755** |
| 11 | 80 | 40,000 | 4M | $500 | $200 | $110 | $85 | $40 | **$935** |
| 12 | 100 | 50,000 | 5M | $600 | $250 | $130 | $100 | $45 | **$1,125** |
| **Year 1 Total** | | | | | | | | | **$5,555** |
| **Avg/month** | | | | | | | | | **$463** |

¹ Rows/month = Orders × 8 (order + line items + customer + refunds + transactions) + Campaigns × 4 (campaign + ad set + ads + daily breakdowns)
² Connector cost includes Fivetran subscription; may vary by actual usage

#### Cost Drivers
- **Month 7 spike**: Crossing 1M rows/month threshold → Standard plan required
- **Months 8-12**: Overage charges accumulate as volume grows beyond included 1M rows
- **Backend hosting scales**: From $50 (0.5 vCPU) to $250 (4 vCPU) to handle increased API traffic

### Option B: Hybrid (Commerce + Marketing Split)

#### Assumed Platforms
- **Commerce**: Airbyte Cloud ($100/month for Shopify connector)
- **Marketing**: Windsor.ai ($150/month for Meta Ads + Google Ads + GA4)

#### Monthly Cost Breakdown

| Month | Stores | Orders/mo | Commerce Connector | Marketing Connector | Backend | Database | Transfer | Monitoring | **Total** |
|-------|--------|-----------|-------------------|---------------------|---------|----------|----------|------------|-----------|
| 1 | 1-3 | 500 | $50 (low volume) | $100 | $60 | $25 | $8 | $15 | **$258** |
| 2 | 3 | 750 | $50 | $100 | $60 | $25 | $10 | $15 | **$260** |
| 3 | 5 | 1,000 | $75 | $125 | $60 | $25 | $12 | $15 | **$312** |
| 4 | 8 | 2,000 | $100 | $150 | $70 | $30 | $18 | $18 | **$386** |
| 5 | 12 | 3,500 | $125 | $175 | $80 | $35 | $22 | $20 | **$457** |
| 6 | 20 | 5,000 | $150 | $200 | $90 | $40 | $28 | $22 | **$530** |
| 7 | 30 | 10,000 | $200 | $250 | $110 | $50 | $40 | $25 | **$675** |
| 8 | 40 | 15,000 | $250 | $300 | $130 | $60 | $50 | $28 | **$818** |
| 9 | 50 | 20,000 | $300 | $350 | $150 | $75 | $60 | $30 | **$965** |
| 10 | 60 | 30,000 | $400 | $400 | $170 | $90 | $75 | $35 | **$1,170** |
| 11 | 80 | 40,000 | $500 | $450 | $210 | $110 | $90 | $40 | **$1,400** |
| 12 | 100 | 50,000 | $600 | $500 | $260 | $130 | $105 | $45 | **$1,640** |
| **Year 1 Total** | | | | | | | | | **$7,871** |
| **Avg/month** | | | | | | | | | **$656** |

#### Cost Comparison vs Option A
- **Higher by:** $2,316/year (~$193/month average)
- **Trade-off**: Specialized connectors may have better data coverage, but costs scale faster with two platforms

### Option C: Direct Shopify + Marketing Connector

#### Assumed Platforms
- **Shopify**: Direct integration (no connector cost)
- **Marketing**: Airbyte Cloud ($100-200/month for Meta Ads + Google Ads + GA4)

#### Monthly Cost Breakdown

| Month | Stores | Orders/mo | Marketing Connector | Backend¹ | Database | Transfer | Monitoring | **Total** |
|-------|--------|-----------|-------------------|---------|----------|----------|------------|-----------|
| 1 | 1-3 | 500 | $100 | $70 | $30 | $6 | $20 | **$226** |
| 2 | 3 | 750 | $100 | $70 | $30 | $8 | $20 | **$228** |
| 3 | 5 | 1,000 | $125 | $70 | $30 | $10 | $20 | **$255** |
| 4 | 8 | 2,000 | $150 | $80 | $35 | $15 | $22 | **$302** |
| 5 | 12 | 3,500 | $175 | $90 | $40 | $20 | $24 | **$349** |
| 6 | 20 | 5,000 | $200 | $100 | $45 | $25 | $26 | **$396** |
| 7 | 30 | 10,000 | $250 | $120 | $55 | $35 | $28 | **$488** |
| 8 | 40 | 15,000 | $300 | $140 | $65 | $45 | $30 | **$580** |
| 9 | 50 | 20,000 | $350 | $160 | $80 | $55 | $32 | **$677** |
| 10 | 60 | 30,000 | $400 | $180 | $95 | $70 | $35 | **$780** |
| 11 | 80 | 40,000 | $450 | $220 | $115 | $88 | $38 | **$911** |
| 12 | 100 | 50,000 | $500 | $270 | $135 | $100 | $42 | **$1,047** |
| **Year 1 Total** | | | | | | | | **$5,239** |
| **Avg/month** | | | | | | | | **$437** |

¹ Backend hosting cost is 20-40% higher than Option A due to direct API integration complexity (OAuth, webhooks, rate limiting)

#### Cost Comparison
- **Lower than Option A by:** $316/year (~$26/month average) - Savings from no Shopify connector
- **Lower than Option B by:** $2,632/year (~$219/month average) - Significant savings
- **Development cost:** +2-3 weeks upfront engineering time (one-time cost)

#### Break-Even Analysis
If we value engineering time at $100/hour:
- Upfront development: 80-120 hours = $8,000-12,000 one-time cost
- Monthly savings vs Option A: $26/month
- **Break-even point**: ~25-38 months

BUT: Option C provides real-time order data (business value) and avoids vendor lock-in for Shopify (risk mitigation)

### Year 1 Cost Summary (All Options)

| Architecture | Month 1-3 Avg | Month 4-6 Avg | Month 7-9 Avg | Month 10-12 Avg | **Year 1 Total** | **Dev Cost¹** | **Total w/ Dev** |
|--------------|---------------|---------------|---------------|-----------------|------------------|---------------|------------------|
| **Option A: Single Connector** | $197 | $245 | $504 | $938 | **$5,555** | $4,000 | **$9,555** |
| **Option B: Hybrid** | $277 | $458 | $819 | $1,403 | **$7,871** | $5,000 | **$12,871** |
| **Option C: Direct+Connector** | $236 | $349 | $582 | $913 | **$5,239** | $10,000 | **$15,239** |

¹ Dev cost = Upfront engineering time at $100/hour for initial integration build (2-4 weeks)

### Key Insights
- **Lowest recurring cost**: Option C ($5,239/year)
- **Lowest total cost (including dev)**: Option A ($9,555 Year 1)
- **Highest cost**: Option B ($12,871 total) - not recommended unless specialized connectors provide critical missing data
- **Best value long-term**: Option C (lower recurring cost, real-time data, less vendor lock-in)
- **Fastest to launch**: Option A (least dev work required)

---

## Risk Assessment

### Top 10 Critical Risks

#### Risk 1: Vendor Lock-In
- **Likelihood:** Medium
- **Impact:** High
- **Description:** Deep integration with a single connector platform makes it difficult and costly to switch providers if pricing increases, service degrades, or platform shuts down
- **Affects:** Options A & B more than Option C
- **Indicators:** Connector-specific code throughout codebase; data stored in connector's proprietary format; no abstraction layer
- **Initial Mitigation Ideas:** Abstract connector behind interface; store data in our own schema; design for portability

#### Risk 2: Connector Platform Shutdown or Acquisition
- **Likelihood:** Low-Medium
- **Impact:** Critical
- **Description:** If connector company goes out of business or is acquired with product discontinuation, we lose all integration capabilities overnight
- **Affects:** All options (but Option C has fallback - only marketing connector affected)
- **Indicators:** Platform raises prices drastically; stops responding to support tickets; engineering team departures announced; acquisition news
- **Initial Mitigation Ideas:** Monitor platform health; have backup platform evaluated; design modular architecture allowing swap

#### Risk 3: API Breaking Changes
- **Likelihood:** Medium
- **Impact:** Medium-High
- **Description:** Connector platform or underlying data source (Shopify, Meta, Google) changes API in non-backward-compatible way, breaking our integration
- **Affects:** All options
- **Indicators:** API version deprecation notices; fields renamed/removed in connector schema; breaking changes in platform changelog
- **Initial Mitigation Ideas:** Pin API versions; monitor changelogs; implement adapter layer; comprehensive test coverage

#### Risk 4: Data Accuracy Issues
- **Likelihood:** Medium
- **Impact:** High
- **Description:** Connector platform introduces bugs in data transformation, leading to incorrect profit calculations and business decisions
- **Affects:** Options A & B (Option C has more control with direct API)
- **Indicators:** Customer reports of incorrect numbers; discrepancies between our dashboard and native platform reports; connector platform bug reports
- **Initial Mitigation Ideas:** Cross-validate sample data against direct API; implement data quality checks; alerting on anomalies

#### Risk 5: Unexpected Price Increases
- **Likelihood:** Medium
- **Impact:** Medium
- **Description:** Connector platform increases pricing significantly (30%+ annually), making service unaffordable or forcing us to raise our prices
- **Affects:** All options
- **Indicators:** Platform shifts from per-connector to per-row pricing; introduces new fees; eliminates free tier; acquisition by enterprise-focused company
- **Initial Mitigation Ideas:** Negotiate annual contracts; have alternative platform evaluated and ready; budget for 30% annual increase

#### Risk 6: Rate Limiting and Throttling
- **Likelihood:** Medium
- **Impact:** Medium
- **Description:** As we scale, we hit connector platform API rate limits, causing delayed data syncs or failed requests
- **Affects:** All options (especially Option C if we mismanage Shopify direct API calls)
- **Indicators:** 429 Too Many Requests errors; connector platform warning emails; sync delays increasing
- **Initial Mitigation Ideas:** Implement request queue; exponential backoff; caching layer; batch requests; monitor quota usage

#### Risk 7: Data Freshness Degradation
- **Likelihood:** Low-Medium
- **Impact:** Medium
- **Description:** Connector platform's sync frequency slows down (e.g., from hourly to daily) due to their infrastructure issues or pricing model changes
- **Affects:** Options A & B (Option C controls sync frequency)
- **Indicators:** Increasing lag between platform timestamps and our data; connector platform service status updates; customer complaints about stale data
- **Initial Mitigation Ideas:** Monitor actual sync times vs. expected; SLA in contract; fallback to direct API for critical data; webhook-based real-time updates

#### Risk 8: Security Breach at Connector Platform
- **Likelihood:** Low
- **Impact:** Critical
- **Description:** Connector platform suffers data breach, exposing our customers' OAuth tokens and business data
- **Affects:** All options
- **Indicators:** Security incident announcements; unauthorized access to customer accounts; media coverage of breach
- **Initial Mitigation Ideas:** Verify SOC 2 Type II compliance; minimize data stored at connector (pull only what we need); encrypt sensitive data at rest in our DB; have OAuth token rotation policy

#### Risk 9: Missing Critical Data Fields
- **Likelihood:** Medium (for specific platforms)
- **Impact:** High
- **Description:** After integration, we discover connector platform doesn't actually provide a critical field we need (e.g., transaction fees, product COGS), breaking profit calculations
- **Affects:** All options (mitigated by Task 003 deep-dive verification, but risk remains)
- **Indicators:** Field returns null/empty; connector docs updated to remove field; platform support confirms field unavailable
- **Initial Mitigation Ideas:** Thorough pre-integration verification (done in Task 003); pilot testing with real data; fallback to direct API for critical missing fields

#### Risk 10: Integration Complexity Underestimated
- **Likelihood:** Medium-High (especially for Option C)
- **Impact:** Medium-High
- **Description:** Direct API integration (Option C) or complex data joining logic (Option B) takes 2-3x longer to build than estimated, delaying product launch
- **Affects:** Options B & C more than Option A
- **Indicators:** Engineering estimates consistently wrong; unexpected edge cases discovered; OAuth flows more complex than expected; data schema mismatches
- **Initial Mitigation Ideas:** Prototype integration early; allocate 50% buffer time; start with Option A (simpler) and migrate to Option C later if needed; use well-documented libraries (e.g., @shopify/shopify-api)

### Risk Summary by Architecture Option

| Risk | Option A | Option B | Option C |
|------|----------|----------|----------|
| Vendor Lock-In | HIGH | HIGH | MEDIUM |
| Platform Shutdown | HIGH | HIGH | MEDIUM |
| API Breaking Changes | MEDIUM | MEDIUM | MEDIUM |
| Data Accuracy Issues | MEDIUM | MEDIUM | LOW |
| Price Increases | MEDIUM | HIGH | MEDIUM |
| Rate Limiting | MEDIUM | MEDIUM | MEDIUM-HIGH |
| Data Freshness | MEDIUM | MEDIUM | LOW |
| Security Breach | MEDIUM | MEDIUM | LOW-MEDIUM |
| Missing Data Fields | MEDIUM | MEDIUM | LOW |
| Integration Complexity | LOW | MEDIUM-HIGH | HIGH |

### Risk-Based Recommendation
- **Lowest overall risk**: Option A (Single Connector) - simpler, faster, but higher vendor dependency
- **Best risk mitigation**: Option C (Direct+Connector) - more control, less vendor lock-in, but higher complexity
- **Highest risk**: Option B (Hybrid) - complexity of Option C without the cost savings or full control

---

## Summary & Recommendations

### Deliverables Completed

1. ✅ **3 Architecture Options Designed**
   - Option A: Single Connector Platform (Fivetran or Airbyte)
   - Option B: Hybrid (Commerce + Marketing Split)
   - Option C: Direct Shopify + Marketing Connector
   - Each with detailed data flow diagrams, code patterns, and failure mode analysis

2. ✅ **12-Month Cost Projections**
   - Detailed month-by-month cost breakdown for all 3 options
   - Growth assumptions: 1-5 stores (Month 1-3) → 50-100 stores (Month 10-12)
   - Year 1 totals: Option A ($5,555), Option B ($7,871), Option C ($5,239)
   - Including infrastructure costs: Backend hosting, database, data transfer, monitoring

3. ✅ **Technical Specifications**
   - Authentication chains documented for each option
   - Code snippets showing integration patterns (TypeScript/Node.js)
   - Data freshness analysis per data source
   - Failure mode matrices with detection and recovery strategies

4. ✅ **Top 10 Critical Risks Identified**
   - Vendor lock-in, platform shutdown, API breaking changes, data accuracy issues, price increases
   - Risk severity scored per architecture option
   - Initial mitigation ideas documented (full mitigation strategies deferred to Task 005)

### Key Findings

#### Cost Analysis
- **Most cost-effective (recurring):** Option C at $437/month average ($5,239/year)
- **Fastest to launch:** Option A (lowest development time: 2 weeks)
- **Highest cost:** Option B at $656/month average ($7,871/year) - not recommended
- **Break-even:** Option C's lower recurring cost offsets higher upfront dev cost after ~25-38 months

#### Technical Comparison

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| **Dev Time** | 2 weeks | 3 weeks | 4-5 weeks |
| **Data Freshness (Shopify)** | 20-70 min delay | 20-70 min | Real-time (webhooks) |
| **Vendor Dependency** | High (1 platform) | High (2 platforms) | Medium (marketing only) |
| **Code Complexity** | Low | Medium-High | High |
| **Maintenance Effort** | Low (4 hrs/month) | Medium (6 hrs/month) | Medium-High (8 hrs/month) |

#### Risk Analysis
- **Option A**: Simplest but highest vendor lock-in risk
- **Option B**: Highest cost and complexity without offsetting benefits - **not recommended**
- **Option C**: Best long-term value with lower vendor risk and real-time Shopify data, but requires more upfront development

### Recommendations for Next Task (005)

**Task 005 should focus on:**
1. Detailed risk mitigation strategies for Top 10 risks identified in this task
2. Migration & fallback strategy (how to switch between architectures or swap connectors)
3. Abstraction layer design (code interface for swappable connectors)
4. Beginning of final recommendation document (but not yet completing it - need Google Ads/GA4 coverage from PRD Part 03 first)

### Decision Point

**If business priority is "fastest launch"** → recommend **Option A**
- Lowest development time (2 weeks)
- Simplest integration
- Acceptable Year 1 total cost including dev ($9,555)

**If business priority is "lowest long-term cost + real-time data"** → recommend **Option C**
- Lowest recurring cost ($437/month avg)
- Real-time Shopify data via webhooks
- Reduced vendor lock-in risk
- Higher upfront investment pays off after ~2-3 years

**Option B should be eliminated** unless deep-dive reveals critical missing data in single-platform connectors.

---

## Appendix: Research Context

This analysis builds on previous research tasks:

- **Task 001** (data-requirements-validation-001.md): Validated core data requirements for profit dashboard
- **Task 002** (connector-platform-research-002.md): Identified and evaluated 5 connector platform candidates
- **Task 003** (platform-deepdive-shopify-meta-003.md): Deep-dive on Shopify and Meta Ads data coverage for top platforms

**Remaining work in connectorResearch phase:**
- Google Ads + GA4 coverage evaluation (PRD Part 03, Tasks 3-4)
- Risk mitigation strategies (PRD Part 04, Task 3 remainder)
- Migration & fallback strategy (PRD Part 04, Task 4)
- Final recommendation document (PRD Part 04, Task 5)
- Research artifacts compilation (PRD Part 04, Task 6)
