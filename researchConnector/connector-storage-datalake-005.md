# Connector Destination & Storage Analysis

**Task Reference:** Task 005
**PRD Part:** 04 - Integration Architecture & Cost Analysis (supplement)
**Date:** 2026-02-15
**Status:** COMPLETED

---

## Critical Correction to Architecture Doc 004

The architecture document (004) describes Fivetran as exposing a "REST API" that our Node.js backend calls to fetch data. **This is incorrect.** Fivetran is an ELT (Extract-Load-Transform) tool. It does not work as an API proxy.

### How Fivetran Actually Works

```
1. Fivetran EXTRACTS data from sources (Shopify, Meta Ads, Google Ads, GA4)
2. Fivetran LOADS that data INTO a destination database/warehouse you configure
3. You then QUERY that destination directly from your application
```

Fivetran's REST API (`api.fivetran.com/v1`) is a **management API** — it lets you create connectors, trigger syncs, check status. It does NOT return your Shopify orders or ad spend data. The data itself lives in whatever destination you point Fivetran at.

### Corrected Data Flow (Option A)

```
WRONG (what doc 004 shows):
Shopify ──> Fivetran ──REST API──> Node.js Backend ──> Database

CORRECT (how Fivetran actually works):
Shopify ──> Fivetran ──writes to──> PostgreSQL (destination)
                                        │
                                   Node.js Backend (reads via SQL)
                                        │
                                   React Frontend
```

---

## The Question: Where Does Fivetran Send the Data?

When you set up Fivetran, you must choose a **destination** — a database or warehouse where Fivetran will create schemas and tables and continuously sync data into them. This is the central architectural question.

### Available Fivetran Destinations

| Destination | Type | Monthly Cost | Best For |
|---|---|---|---|
| **Snowflake** | Cloud data warehouse | $40-400+/mo (compute + storage) | Large-scale analytics, petabyte data |
| **BigQuery** | Cloud data warehouse | $0-200+/mo (pay-per-query) | Analytics workloads, Google ecosystem |
| **Amazon Redshift** | Cloud data warehouse | $180+/mo (dc2.large minimum) | AWS-native analytics |
| **Databricks** | Lakehouse platform | $100+/mo | ML/AI + analytics |
| **Azure Synapse** | Cloud data warehouse | $100+/mo | Microsoft ecosystem |
| **S3 / GCS Data Lake** | Object storage | $5-20/mo (storage only) | Raw file storage, not directly queryable |
| **PostgreSQL** | Relational database | $0-15/mo (managed) | Application databases, startup scale |
| **MySQL** | Relational database | $0-15/mo (managed) | Application databases |

---

## Analysis: What We Actually Need

### Our Data Volume Reality

Based on growth assumptions from doc 004:

| Phase | Months | Orders/mo | Ad Campaigns | Estimated Rows/mo | Total DB Size |
|---|---|---|---|---|---|
| Beta | 1-3 | 500-1,000 | 10-20 | 50K-100K | < 500 MB |
| Growth | 4-6 | 2,000-5,000 | 30-50 | 200K-500K | < 2 GB |
| Scaling | 7-9 | 8,000-20,000 | 60-100 | 1M-2M | < 10 GB |
| Expansion | 10-12 | 25,000-50,000 | 120-200 | 3M-5M | < 30 GB |

**These volumes are trivially small.** PostgreSQL handles billions of rows. Even at month 12 with 100 stores and 50K orders, the total database would be under 30 GB. Data warehouses like Snowflake, BigQuery, and Redshift are designed for terabytes to petabytes — they are overkill by several orders of magnitude.

### Why Each "Big" Option Is Wrong for Us

**Snowflake** ($40-400+/mo):
- Designed for petabyte-scale analytics across dozens of teams
- Compute credits burn money even when idle (unless you aggressively suspend warehouses)
- Separate system from your app database — your Node.js backend can't just `SELECT * FROM orders` the way it queries its own PostgreSQL
- You'd need to maintain TWO databases: Snowflake for Fivetran data + PostgreSQL for your app data (users, settings, uploaded costs)
- Adding unnecessary infrastructure complexity and cost

**BigQuery** ($0-200+/mo):
- Pay-per-query pricing seems cheap but adds up with frequent dashboard refreshes
- Every time a user loads your dashboard, that's a BigQuery query = cost
- 10 users refreshing 10x/day = 100 queries/day = ~3,000 queries/month
- BigQuery is batch-oriented, not designed for low-latency application queries
- Same dual-database problem as Snowflake

**Redshift** ($180+/mo minimum):
- Minimum viable cluster costs ~$180/month
- Enterprise AWS warehouse — would be running at <1% capacity for years
- No serverless option competitive with just using PostgreSQL directly

**S3/GCS Data Lake** ($5-20/mo):
- Cheapest storage, but raw files (Parquet/CSV/JSON)
- Not directly queryable from your Node.js backend
- Requires an additional query engine (Athena, Presto) to read the data
- Adds latency and complexity
- Makes sense for archival, not for powering a live dashboard

---

## Recommendation: PostgreSQL as Fivetran Destination

### Why PostgreSQL Is the Right Answer

1. **You already need PostgreSQL** — your app stores users, accounts, settings, uploaded product costs, shipping rates, and manual expenses. This is your application database regardless of Fivetran.

2. **One database, not two** — Fivetran syncs Shopify/ad data into schemas within the same PostgreSQL instance your app already uses. No second database to manage, pay for, or connect to.

3. **Your backend already speaks SQL** — Node.js with Prisma, Knex, or raw `pg` client queries PostgreSQL natively. No new SDK, no new query language, no new connection to manage.

4. **Cost is negligible** — a managed PostgreSQL instance that handles your entire app AND Fivetran data costs $7-25/month at startup scale.

5. **Performance is more than sufficient** — PostgreSQL handles the query patterns of a dashboard application (aggregations, date-range filters, GROUP BY) extremely well at these volumes. Add a few indexes and you're set.

6. **Fivetran officially supports PostgreSQL as a destination** — it creates schemas like `fivetran_shopify`, `fivetran_facebook_ads`, etc. and manages the tables automatically.

### How It Works in Practice

```
Fivetran creates these schemas/tables in your PostgreSQL:
├── fivetran_shopify_<connector_id>/
│   ├── order                    (orders with line items, totals, dates)
│   ├── order_line               (individual line items per order)
│   ├── product                  (product catalog)
│   ├── product_variant          (variants with prices)
│   ├── customer                 (customer records)
│   ├── refund                   (refund records)
│   ├── transaction              (payment transactions)
│   └── ...
├── fivetran_facebook_ads_<connector_id>/
│   ├── campaign_history         (campaign metadata)
│   ├── ad_set_history           (ad set metadata)
│   ├── ad_history               (ad metadata)
│   ├── basic_ad                 (daily ad performance metrics)
│   └── ...
├── fivetran_google_ads_<connector_id>/
│   ├── campaign_history
│   ├── ad_group_history
│   ├── campaign_stats           (daily campaign metrics)
│   └── ...
├── fivetran_google_analytics_<connector_id>/
│   ├── ...                      (GA4 session/event data)
│   └── ...
│
│── public/                      (YOUR app schema - users, settings, costs)
│   ├── users
│   ├── stores
│   ├── product_costs            (uploaded COGS)
│   ├── shipping_rates           (uploaded shipping costs)
│   ├── operating_expenses       (manual input)
│   └── ...
```

### Your Node.js Backend Queries Both

```typescript
// Example: Calculate daily profit using BOTH Fivetran data and your own uploaded costs

const dailyProfit = await db.query(`
  SELECT
    o.created_at::date AS day,
    SUM(o.total_price) AS revenue,
    SUM(pc.cost * ol.quantity) AS cogs,
    SUM(ads.spend) AS ad_spend,
    SUM(o.total_price) - SUM(pc.cost * ol.quantity) - SUM(ads.spend) AS gross_profit
  FROM fivetran_shopify.order o
  JOIN fivetran_shopify.order_line ol ON ol.order_id = o.id
  LEFT JOIN public.product_costs pc ON pc.shopify_product_id = ol.product_id
  LEFT JOIN (
    SELECT date, SUM(spend) AS spend
    FROM fivetran_facebook_ads.basic_ad
    GROUP BY date
  ) ads ON ads.date = o.created_at::date
  WHERE o.created_at >= $1 AND o.created_at <= $2
  GROUP BY o.created_at::date
  ORDER BY day DESC
`, [startDate, endDate]);
```

No Snowflake. No BigQuery. No data lake. Just SQL against one PostgreSQL database.

---

## Corrected Architecture Diagram (Option A with Fivetran)

```
┌────────────────────────────────────────────────────────────┐
│ Data Sources                                                │
│  Shopify  │  Meta Ads  │  Google Ads  │  GA4               │
└────┬───────────┬────────────┬─────────────┬────────────────┘
     │           │            │             │
     │    OAuth managed by Fivetran         │
     │           │            │             │
     └───────────┴────────────┴─────────────┘
                       │
                       ▼
     ┌─────────────────────────────────────┐
     │   Fivetran (ELT Platform)           │
     │   - Pulls data on schedule          │
     │   - Transforms to normalized schema │
     │   - Writes directly to PostgreSQL   │
     └────────────────┬────────────────────┘
                      │
              SQL writes (INSERT/UPDATE)
                      │
                      ▼
     ┌─────────────────────────────────────┐
     │   PostgreSQL (Single Database)      │
     │                                     │
     │   Fivetran-managed schemas:         │
     │   ├── fivetran_shopify.*            │
     │   ├── fivetran_facebook_ads.*       │
     │   ├── fivetran_google_ads.*         │
     │   └── fivetran_google_analytics.*   │
     │                                     │
     │   App-managed schemas:              │
     │   └── public.*  (users, costs,      │
     │                  settings, etc.)     │
     └────────────────┬────────────────────┘
                      │
              SQL reads (SELECT/JOIN)
                      │
                      ▼
     ┌─────────────────────────────────────┐
     │   Node.js Backend                   │
     │   - Queries Fivetran tables (SQL)   │
     │   - Queries app tables (SQL)        │
     │   - Joins data for profit calc      │
     │   - Business logic                  │
     │   - REST/GraphQL API for frontend   │
     └────────────────┬────────────────────┘
                      │
              REST / GraphQL API
                      │
                      ▼
     ┌─────────────────────────────────────┐
     │   React Frontend                    │
     │   - Dashboard views                 │
     │   - Profit analytics                │
     │   - Marketing metrics               │
     └─────────────────────────────────────┘
```

### Key Difference from Doc 004

| Aspect | Doc 004 (Incorrect) | Corrected |
|---|---|---|
| Data retrieval | Backend calls Fivetran REST API | Backend queries PostgreSQL directly |
| Where data lives | Vague ("database") | PostgreSQL = Fivetran destination = app database |
| API dependency | Runtime dependency on Fivetran API | Fivetran only needed for sync, not reads |
| Latency | API call latency per request | Local SQL query latency (milliseconds) |
| Availability | If Fivetran API is down, no data | If Fivetran is down, data is stale but still queryable |

The corrected model is actually **better** than what doc 004 described. Your backend has zero runtime dependency on Fivetran. Fivetran syncs data in the background. If Fivetran goes down for hours, your dashboard still works — it just shows slightly stale data.

---

## Cost Comparison: Destinations

### At Our Scale (Month 1-12)

| Destination | Monthly Cost | What You Get | Verdict |
|---|---|---|---|
| **PostgreSQL (managed)** | $7-25/mo | Supabase/Neon/Railway/Render free tier → paid | **Use this** |
| PostgreSQL (AWS RDS) | $15-50/mo | db.t3.micro → db.t3.small | Also fine, AWS native |
| BigQuery | $0-50/mo | Free tier generous but pay-per-query adds up | Unnecessary |
| Snowflake | $40-200/mo | Massive overkill | No |
| Redshift | $180+/mo | Minimum cluster cost | No |
| S3 Data Lake | $5/mo + query engine | Can't query directly | Wrong tool |

### Managed PostgreSQL Options for Startup

| Provider | Free Tier | Paid Starting At | Notes |
|---|---|---|---|
| **Supabase** | 500 MB, 2 projects | $25/mo (8 GB) | Built-in auth, realtime, REST API. Popular with startups |
| **Neon** | 512 MB, branching | $19/mo (10 GB) | Serverless PostgreSQL, auto-scales to zero |
| **Railway** | $5 trial credit | ~$7/mo (1 GB) | Simple deploy, good DX |
| **Render** | 90-day free | $7/mo | Simple managed Postgres |
| **AWS RDS** | 12-month free tier | $15/mo (db.t3.micro) | Enterprise-grade, most control |
| **DigitalOcean** | None | $15/mo | Simple, predictable pricing |

**For MVP launch:** Supabase or Neon free tier handles everything. Upgrade to paid ($19-25/mo) when you hit storage limits, which won't happen for months.

---

## When Would You Actually Need a Data Warehouse?

You would consider upgrading from PostgreSQL to a warehouse (Snowflake/BigQuery) only if:

1. **Data volume exceeds 100GB+** — not happening in Year 1 even at 100 stores
2. **Complex analytics queries become slow** — dashboards taking >5 seconds to load on PostgreSQL with proper indexing
3. **Multiple teams need concurrent heavy queries** — data science team running ML models alongside dashboard queries
4. **Historical data retention exceeds 2+ years** — multi-year trend analysis across hundreds of stores
5. **You need to join with other large datasets** — CRM data, support tickets, external market data at scale

**Realistic timeline:** 18-36 months after launch, if the business scales successfully to 500+ stores. At that point you'd likely add BigQuery or Snowflake as a secondary analytics destination while keeping PostgreSQL as the primary app database.

---

## Impact on Option C (Direct Shopify + Marketing Connector)

If going with Option C (direct Shopify integration), the destination question changes slightly:

```
Shopify ──Direct API + Webhooks──> Node.js Backend ──writes──> PostgreSQL (public schema)
                                                                     │
Meta/Google ──> Fivetran ──writes──> PostgreSQL (fivetran_* schemas) │
                                                                     │
                                   Node.js Backend <──reads (SQL)────┘
                                        │
                                   React Frontend
```

In this case:
- Shopify data goes into your **app schema** (public.*) via your own code
- Marketing data goes into **Fivetran schemas** (fivetran_*) via Fivetran
- Both live in the same PostgreSQL database
- Backend queries both with standard SQL joins

This is cleaner than Option A in some ways — your Shopify data is in your own schema format, fully controlled.

---

## Revised Cost Projection (Option A with PostgreSQL Destination)

The original doc 004 listed "Database: $25/month" which is reasonable. But with modern managed PostgreSQL, the early months can be even cheaper:

| Month | Database Cost (Original) | Database Cost (Revised) | Notes |
|---|---|---|---|
| 1-3 | $25/mo | $0-7/mo | Free tier (Supabase/Neon/Render) |
| 4-6 | $30-40/mo | $19-25/mo | Paid tier, 8-10 GB |
| 7-9 | $50-75/mo | $25-40/mo | Growing storage, add read replica if needed |
| 10-12 | $90-130/mo | $40-75/mo | 20-30 GB, higher IOPS |

**Year 1 database savings: ~$200-400** by using a modern managed PostgreSQL provider instead of AWS RDS.

---

## Summary

| Question | Answer |
|---|---|
| Do I need a data lake? | **No.** Not at startup scale, not in Year 1, probably not in Year 2. |
| Do I need Snowflake/BigQuery/Redshift? | **No.** These are for terabyte-scale analytics. You have megabytes to low gigabytes. |
| Do I need S3/GCS? | **No.** You need a queryable database, not file storage. |
| Where should Fivetran send data? | **PostgreSQL.** The same database your app already uses. |
| What PostgreSQL provider? | **Supabase or Neon** for free tier start. Upgrade to paid when needed. |
| When to reconsider? | When you hit 500+ stores, 100GB+ data, or need multi-team analytics (18-36 months out). |

**The answer is simple: one PostgreSQL database. Fivetran writes to it, your backend reads from it, your frontend queries through your backend. No data lake, no warehouse, no extra infrastructure.**
