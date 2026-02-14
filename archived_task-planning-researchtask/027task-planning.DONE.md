# Task 027 - Populate Review Platform Templates (Files 113-115)

## PRD Reference
- **PRD Part:** 07
- **PRD File:** @prd/detailed_prd_part_07.md
- **Requirements Addressed:**
  - Task 3: G2 Reviews (populate file 113)
  - Task 4: Capterra Reviews (populate file 114)
  - Task 5: Trustpilot Reviews (populate file 115)

## Status
- [x] Planning Complete
- [x] Implementation Complete
- [x] Verification Complete
- Completed At: 2026-02-13

## Purpose
Continue manual web research phase for PRD Part 07 by populating three major review platform templates (G2, Capterra, Trustpilot) with actual BeProfit data. This expands user sentiment coverage beyond Shopify App Store to capture enterprise/SMB review platforms, providing broader perspective on user satisfaction, feature effectiveness, and competitive positioning across different user segments.

## Scope

### What This Task WILL Do (3 deliverables)
- **Deliverable 1:** Use browser automation to research BeProfit on G2.com and populate `beprofit-casestudy-info-113.md` with actual data (overall rating, review count, category rankings, pros/cons from 15-20 reviews, company size/industry demographics, comparison mentions)
- **Deliverable 2:** Research BeProfit on Capterra and populate `beprofit-casestudy-info-114.md` with actual data (ratings across categories like ease of use/features/support/value, 15-20 detailed review excerpts, competitor comparison mentions, use case patterns)
- **Deliverable 3:** Research BeProfit on Trustpilot and populate `beprofit-casestudy-info-115.md` with actual data (overall rating, review volume, review theme categorization, sentiment analysis, notable positive/negative excerpts)

### What This Task Will NOT Do (Left for Later Tasks)
- **Alternative review sources:** Product Hunt, Reddit, YouTube research for file 116 (deferred to Task 028)
- **Synthesis files:** Populating sentiment aggregation templates 117-122 (requires ALL primary research files 111-116 completed first, deferred to Task 029+)
- **Other PRD parts:** Moving to PRD Part 08 (competitive landscape) before completing Part 07
- **Quantitative sentiment scoring:** Building automated sentiment analysis algorithms (manual categorization only)
- **Social media monitoring:** Scraping Twitter, Facebook, LinkedIn for BeProfit mentions (out of scope for this PRD)
- **Competitor platform research:** Researching TrueProfit/Lifetimely/etc on review platforms (comes in PRD Part 08)

## Files to Create/Modify

### File 1: beprofit-casestudy-info-113.md
- **Path:** dtcdashboard_app/casestudy/beprofit-casestudy-info-113.md
- **Action:** MODIFY
- **What changes:** Populate existing template with actual G2 review data. Replace `[to be filled during research]` placeholders with:
  - BeProfit's G2 profile URL and overall rating (e.g., 4.6/5.0 stars)
  - Total review count and review recency (e.g., "87 reviews, last review Jan 2026")
  - G2 category rankings (e.g., "#3 in Profit Analytics Software", "#12 in E-commerce Analytics")
  - Grid scores (market presence, user satisfaction) if available
  - 15-20 review excerpts including: reviewer name/title, company size (1-10, 11-50, 51-200, 201-1000, 1000+), industry, star rating, pros section, cons section, overall review text, "Reasons for Choosing BeProfit" (if available)
  - Aggregated pros/cons ranking (most commonly mentioned pros and cons with frequency counts)
  - User segment analysis (small business vs mid-market vs enterprise sentiment differences)
  - Competitor comparison mentions (which alternatives reviewers considered: TrueProfit, Lifetimely, Triple Whale, etc.)
  - Feature effectiveness by company size (which features praised by small stores vs large stores)
  - "Relevance to Our Build" section with G2-specific competitive insights

### File 2: beprofit-casestudy-info-114.md
- **Path:** dtcdashboard_app/casestudy/beprofit-casestudy-info-114.md
- **Action:** MODIFY
- **What changes:** Populate existing template with actual Capterra review data. Replace placeholders with:
  - BeProfit's Capterra profile URL and overall rating (e.g., 4.4/5.0)
  - Review count and rating distribution (X five-star, Y four-star, etc.)
  - Category-specific ratings: Ease of Use (X/5), Features (Y/5), Customer Support (Z/5), Value for Money (W/5)
  - 15-20 detailed review excerpts including: reviewer name, company size, industry, rating, full review text, "What do you like best?", "What do you dislike?", "What problems is BeProfit solving?", recommendations
  - Use case pattern analysis (what business problems reviewers report solving with BeProfit)
  - Competitor comparison mentions from reviews (e.g., "Compared BeProfit to TrueProfit and chose BeProfit because...")
  - Feature request frequency from Capterra reviews (which missing features mentioned most often)
  - Support quality sentiment from Capterra data (response time feedback, helpfulness ratings)
  - Pricing sentiment specific to Capterra reviews (value for money perception by user segment)
  - "Relevance to Our Build" section analyzing Capterra-specific insights for competitive positioning

### File 3: beprofit-casestudy-info-115.md
- **Path:** dtcdashboard_app/casestudy/beprofit-casestudy-info-115.md
- **Action:** MODIFY
- **What changes:** Populate existing template with actual Trustpilot review data. Replace placeholders with:
  - BeProfit's Trustpilot profile URL and overall rating (e.g., 4.3/5.0 "Great")
  - Total review count and rating distribution
  - Review recency (how many reviews in last 30/90/365 days)
  - 12-15 review excerpts (Trustpilot typically shorter reviews): reviewer name, date, star rating, review text, company response (if any)
  - Review theme categorization: positive themes (accurate profit tracking, great support, easy setup, valuable insights, multi-store management, etc.), negative themes (pricing too high, COGS import issues, slow dashboard, missing features, billing surprises, etc.)
  - Sentiment trend analysis (is rating improving or declining over time?)
  - Company response analysis (response rate to reviews, response time, tone, issue resolution follow-through)
  - Trust signals (verified purchase indicators, detailed reviews vs generic praise)
  - Geographic distribution if shown (US vs UK vs other markets)
  - "Relevance to Our Build" section with Trustpilot-specific competitive insights

## Implementation Steps (Max 6 steps)

### Step 1: Research BeProfit on G2 and extract core profile data
**Files:** dtcdashboard_app/casestudy/beprofit-casestudy-info-113.md (begin populating)

Use `agent-browser` skill or `WebSearch` + `WebFetch` to locate BeProfit's G2 profile and extract foundational data.

**Search approach:**
```bash
# Web search query: "BeProfit G2 review" or "BeProfit G2.com"
# Expected G2 profile URL pattern: https://www.g2.com/products/beprofit/reviews
```

**Core data extraction for file 113:**

```markdown
## G2 Profile Overview

**Product Name:** [Official name on G2, e.g., "BeProfit - Profit Analytics"]
**Vendor:** [Company name, e.g., "Viably Tech"]
**G2 URL:** [Full profile URL]
**Overall Rating:** [X.X out of 5.0 stars]
**Total Reviews:** [Number of reviews, e.g., "87 reviews"]
**Review Recency:** [e.g., "Last review: January 2026"]

**Category Rankings:**
- [Category 1]: #X out of Y products (e.g., "#3 in Profit Analytics Software out of 15 products")
- [Category 2]: #X out of Y products
- [Primary category if identified]

**G2 Grid Positioning (if available):**
- Market Presence Score: [X/100]
- User Satisfaction Score: [Y/100]
- Grid Quadrant: [Leader / High Performer / Contender / Niche]

**Review Distribution:**
- 5 stars: X reviews (Y%)
- 4 stars: X reviews (Y%)
- 3 stars: X reviews (Y%)
- 2 stars: X reviews (Y%)
- 1 star: X reviews (Y%)
```

**Integration with existing template:**
- Locate the "G2 Profile Overview" section in existing file 113 template
- Replace `[to be filled during research]` placeholders with actual extracted data
- Preserve template structure and markdown formatting from Task 023

**Browser automation notes:**
- Use `agent-browser` for dynamic content loading (G2 uses JavaScript for reviews)
- Capture screenshots of G2 profile page if verification needed
- Note if G2 requires login to view full reviews (common restriction)

- [x] Checkpoint: Step 1 complete - G2 NO PRESENCE confirmed and documented in file 113

### Step 2: Extract and categorize 15-20 G2 review excerpts
**Files:** dtcdashboard_app/casestudy/beprofit-casestudy-info-113.md (continue populating)

From BeProfit's G2 profile, systematically extract review content and metadata.

**Review extraction process:**
1. Target 15-20 reviews (prioritize recent reviews from 2025-2026, mix of ratings)
2. For each review on G2, extract these structured fields:

```markdown
### Review [N]

**Reviewer Information:**
- Name: [Reviewer name or "Anonymous"]
- Title: [Job title, e.g., "E-commerce Manager"]
- Company Size: [1-10 / 11-50 / 51-200 / 201-1000 / 1000+ employees]
- Industry: [Industry category, e.g., "Retail", "Fashion", "Electronics"]
- Review Date: [Month Year]

**Rating:** [X/5 stars] ⭐⭐⭐⭐⭐

**What do you like best about BeProfit?**
"[Full text from G2's 'Pros' section]"

**What do you dislike about BeProfit?**
"[Full text from G2's 'Cons' section]"

**What problems is BeProfit solving and how is that benefiting you?**
"[Full text if available on G2]"

**Reasons for Choosing BeProfit:**
"[Text if available - G2 sometimes includes this]"

**Full Review Text:**
"[Complete review body if available beyond pros/cons]"

**Key Themes:** [Manually tag: profit-tracking, COGS-management, ad-integration, support-quality, pricing-concerns, etc.]
```

**Aggregation methodology after extracting 15-20 reviews:**

```markdown
## Aggregated Pros (Ranked by Frequency)

### Top 10 Most Praised Aspects

1. **[Pro category]** - Mentioned by X out of 20 reviewers (Y%)
   - Sample quotes: "[quote 1 from review #N]", "[quote 2 from review #M]"
   - User segments praising this: [Company sizes or industries]

2. **[Pro category]** - Mentioned by X out of 20 reviewers
   - Sample quotes: [...]

[Continue ranking down to #10]

## Aggregated Cons (Ranked by Frequency)

### Top 10 Most Common Complaints

1. **[Con category]** - Mentioned by X out of 20 reviewers (Y%)
   - Sample quotes: "[quote 1]", "[quote 2]"
   - User segments reporting this: [Segments]

2. **[Con category]** - Mentioned by X reviewers
   - Sample quotes: [...]

[Continue ranking]
```

**Frequency counting rules:**
- A "mention" = reviewer explicitly discusses the topic in pros/cons/review body
- Use exact counts (e.g., "7 out of 20 reviews" not "many reviews")
- If same reviewer mentions topic multiple times, count as 1 mention

- [x] Checkpoint: Step 2 complete - N/A (No G2 presence to extract reviews from)

### Step 3: Analyze G2 user segments and competitor comparisons
**Files:** dtcdashboard_app/casestudy/beprofit-casestudy-info-113.md (continue populating)

Perform deeper analysis on G2 review patterns by user segment and competitive alternatives mentioned.

**User segment analysis framework:**

```markdown
## User Segment Analysis

### Small Business (1-50 employees)
**Review Count in Sample:** [X out of 20 reviews]

**Satisfaction Pattern:**
- Average rating from small biz reviewers: [X.X/5.0]
- Most valued features: [Feature 1], [Feature 2], [Feature 3]
- Common pain points: [Pain 1], [Pain 2]

**Characteristic Quotes:**
- "[Quote showing small business perspective on BeProfit]"
- "[Another small biz quote]"

### Mid-Market (51-1000 employees)
[Same structure as above]

### Enterprise (1000+ employees)
[Same structure as above]

**Segment Insights for Our Build:**
- Small businesses prioritize: [Findings that inform feature priorities]
- Mid-market needs: [Different requirements than small biz]
- Enterprise gaps: [What BeProfit lacks for enterprise, opportunities for us]
```

**Competitor comparison analysis from G2 reviews:**

```markdown
## Competitor Mentions in G2 Reviews

### Alternatives Considered (Before Choosing BeProfit)

**TrueProfit**
- Mentioned in: X reviews
- Why users chose BeProfit instead: "[Quote 1]", "[Quote 2]"
- Common comparison point: [e.g., "BeProfit has better dashboard than TrueProfit"]

**Lifetimely**
- Mentioned in: X reviews
- Why users chose BeProfit instead: [Quotes]
- Comparison insights: [...]

**Triple Whale**
- Mentioned in: X reviews
- Comparison reasoning: [...]

[Continue for all competitors mentioned in G2 reviews]

### Alternatives Mentioned (Users Switching Away from BeProfit)

**[Competitor Name]**
- Mentioned in: X negative reviews as alternative being considered
- Why considering switch: "[Quote from dissatisfied reviewer]"
- Competitive threat level: [High/Medium/Low based on frequency]

[Analysis of switching patterns]
```

**Data sources for this step:**
- G2 reviews "Reasons for Choosing" field (shows what alternatives were considered)
- G2 review body text (search for competitor names: TrueProfit, Lifetimely, Triple Whale, etc.)
- G2 cons section (users sometimes mention "X does this better than BeProfit")

- [x] Checkpoint: Step 3 complete - Competitive context analysis documented (no G2 presence for BeProfit or competitors)

### Step 4: Research BeProfit on Capterra and populate file 114
**Files:** dtcdashboard_app/casestudy/beprofit-casestudy-info-114.md (begin populating)

Use `agent-browser` or `WebSearch` + `WebFetch` to locate BeProfit's Capterra profile and extract comprehensive review data.

**Search approach:**
```bash
# Web search query: "BeProfit Capterra" or "BeProfit Capterra review"
# Expected Capterra URL pattern: https://www.capterra.com/p/[product-id]/beprofit/
```

**Core data extraction for Capterra:**

```markdown
## Capterra Profile Overview

**Product Name:** [Official name on Capterra]
**Vendor:** [Company name]
**Capterra URL:** [Full profile URL]
**Overall Rating:** [X.X out of 5.0 stars]
**Total Reviews:** [Number of reviews]

**Category-Specific Ratings:**
- **Ease of Use:** [X.X/5.0] - Based on Y reviews
- **Features:** [X.X/5.0] - Based on Y reviews
- **Customer Support:** [X.X/5.0] - Based on Y reviews
- **Value for Money:** [X.X/5.0] - Based on Y reviews

**Rating Distribution:**
- 5 stars: X reviews (Y%)
- 4 stars: X reviews (Y%)
- 3 stars: X reviews (Y%)
- 2 stars: X reviews (Y%)
- 1 star: X reviews (Y%)

**Review Recency:**
- Reviews in last 30 days: X
- Reviews in last 90 days: Y
- Reviews in last 365 days: Z
```

**Review extraction from Capterra (target 15-20 reviews):**

Capterra reviews have distinct structure - capture these specific fields:

```markdown
### Capterra Review [N]

**Reviewer:** [Name or "Anonymous"]
**Company Size:** [Self-employed / 1-10 / 11-50 / 51-200 / 201-500 / 500+ employees]
**Industry:** [Industry category]
**Review Date:** [Month Year]
**Overall Rating:** [X/5 stars]

**What do you like best?**
"[Full text from Capterra's structured question]"

**What do you dislike?**
"[Full text]"

**What problems is BeProfit solving and how is that benefiting you?**
"[Full text - this is key for use case understanding]"

**Recommendations to others considering BeProfit:**
"[Text if available]"

**Use Case Identified:** [Manually categorize: multi-store management, COGS tracking, ad attribution, profit reporting, etc.]
```

**Use case pattern synthesis:**

After extracting reviews, categorize and rank use cases:

```markdown
## Use Case Patterns from Capterra Reviews

### Primary Use Cases (Ranked by Frequency)

**Use Case 1: Multi-Store Profit Consolidation**
- **Frequency:** Mentioned in X/20 reviews
- **User segment:** Primarily [company sizes and industries]
- **Problem solved:** "[Quote describing pain point before BeProfit]"
- **Benefit achieved:** "[Quote describing outcome with BeProfit]"
- **Representative quotes:** "[Full excerpt from review showing this use case]"

**Use Case 2: COGS & Margin Tracking**
- **Frequency:** X/20 reviews
- **User segment:** [...]
- **Problem/benefit pattern:** [...]

[Continue for top 5-7 use cases identified]

**Relevance to Our Build:**
- Must support use cases 1-3 from day one (core value prop)
- Use case 4 is differentiator opportunity (BeProfit's implementation has gaps per reviews)
- Use cases 5-7 can be phased post-launch
```

- [x] Checkpoint: Step 4 complete - Capterra profile and 4 reviews documented in file 114 with limited use case analysis

### Step 5: Research BeProfit on Trustpilot and populate file 115
**Files:** dtcdashboard_app/casestudy/beprofit-casestudy-info-115.md (begin populating)

Use `agent-browser` or `WebSearch` + `WebFetch` to locate BeProfit's Trustpilot profile and extract review content.

**Search approach:**
```bash
# Web search query: "BeProfit Trustpilot" or "site:trustpilot.com BeProfit"
# Expected Trustpilot URL pattern: https://www.trustpilot.com/review/[domain]
# Note: May need to search "beprofit.co Trustpilot" or "viably.com Trustpilot"
```

**Core data extraction for Trustpilot:**

```markdown
## Trustpilot Profile Overview

**Company:** [Company name as shown on Trustpilot]
**Trustpilot URL:** [Full profile URL]
**TrustScore:** [X.X out of 5.0]
**Rating Category:** [Excellent (4.5-5.0) / Great (4.0-4.4) / Average (3.0-3.9) / Poor (2.0-2.9) / Bad (1.0-1.9)]
**Total Reviews:** [Number of reviews]
**Review Distribution:**
- Excellent (5 stars): X reviews (Y%)
- Great (4 stars): X reviews (Y%)
- Average (3 stars): X reviews (Y%)
- Poor (2 stars): X reviews (Y%)
- Bad (1 star): X reviews (Y%)

**Review Activity:**
- Reviews in last 30 days: X
- Reviews in last 90 days: Y
- Reviews in last 365 days: Z

**Trust Signals:**
- Verified reviews: X out of Y total (Z%)
- Company claims profile: [Yes/No]
- Average response time to reviews: [X hours/days if shown]
- Review invitation process: [Service/Direct/Both]
```

**Review extraction from Trustpilot (target 12-15 reviews):**

Trustpilot reviews tend to be shorter and more emotional - capture tone as well as content:

```markdown
### Trustpilot Review [N]

**Reviewer:** [Name or "Anonymous"]
**Location:** [Country if shown]
**Review Date:** [Date]
**Rating:** [X/5 stars]
**Verified:** [Yes/No]

**Review Title:** "[Title/headline if present]"

**Review Text:**
"[Full review content]"

**Company Response:**
[If BeProfit/Viably responded, include full response text and response date]
**Response Date:** [Date]
**Response Text:** "[Full company response]"

**Tone:** [Positive/Neutral/Frustrated/Angry]
**Key Themes:** [Tag: pricing, support, accuracy, onboarding, etc.]
```

**Theme categorization synthesis:**

```markdown
## Trustpilot Review Theme Analysis

### Positive Themes (What Users Love)

**Theme 1: [e.g., Accurate Profit Tracking]**
- **Frequency:** Mentioned in X/15 reviews
- **Representative quotes:**
  - "[Quote 1 from 5-star review]" - Reviewer Name, Date
  - "[Quote 2]" - Reviewer Name, Date
- **Sentiment intensity:** [Strong positive / Moderate positive]

**Theme 2: [e.g., Responsive Support Team]**
[Same structure]

[Continue for top 5-7 positive themes]

### Negative Themes (What Users Complain About)

**Theme 1: [e.g., Pricing Too High for Value]**
- **Frequency:** X/15 reviews
- **Representative quotes:** [...]
- **Sentiment intensity:** [Frustration level]
- **Churn risk:** [High/Medium/Low based on whether reviewers mention canceling]

**Theme 2: [e.g., COGS Import Bugs]**
[Same structure]

[Continue for top 5-7 negative themes]

## Company Response Analysis

**Response Rate:** X out of Y reviews received responses (Z%)
**Average Response Time:** [X hours/days based on date stamps]

**Response Pattern Breakdown:**
- Responses to 5-star reviews: X/Y (Z%) - [Typical tone: grateful, promotional]
- Responses to 1-3 star reviews: X/Y (Z%) - [Typical tone: apologetic, solution-focused, defensive]

**Response Quality Assessment:**
- **Acknowledgment of issues:** [Good/Mixed/Poor]
- **Solution offering:** [Proactive (offer fix/refund) / Reactive (ask to contact support) / None]
- **Follow-through visible:** [Can see resolved issues in response threads: Yes/No/Sometimes]

**Example High-Quality Response:**
"[Quote from BeProfit's best response showing good customer service]"

**Example Poor Response:**
"[Quote from defensive or unhelpful response if exists]"

**Relevance to Our Build:**
Our Trustpilot strategy must include:
- [Specific response time target based on BeProfit's gaps]
- [Response tone guidelines based on what works/doesn't work in BeProfit's responses]
- [Proactive issue resolution approach to differentiate from BeProfit]
```

**Sentiment trend analysis (if data available):**

```markdown
## Trustpilot Sentiment Trends

**Historical Rating Trend:**
- Current rating: [X.X/5.0]
- 6 months ago: [Y.Y/5.0] (if historical data available)
- 12 months ago: [Z.Z/5.0]
- **Trend direction:** [Improving / Stable / Declining]

**What Changed (if declining/improving):**
[Analysis of what reviews cite as reasons for changes - new features, pricing changes, support quality shifts, etc.]
```

- [x] Checkpoint: Step 5 complete - Trustpilot research complete (no BeProfit profile; parent company Viably has 22 reviews at 4.3/5.0)

### Step 6: Write comprehensive "Relevance to Our Build" synthesis for all three files
**Files:** dtcdashboard_app/casestudy/beprofit-casestudy-info-113.md, beprofit-casestudy-info-114.md, beprofit-casestudy-info-115.md (finalize all three)

Complete all three research files by adding strategic analysis connecting review platform findings to competitive product development requirements.

**Strategic synthesis framework for file 113 (G2):**

```markdown
## Relevance to Our Build

### G2 Market Positioning Strategy

**Target G2 Categories for Our Product:**
- Primary category: [Based on where BeProfit ranks and user needs]
- Secondary categories: [Where we can differentiate]
- G2 Grid positioning goal: [Leader/High Performer based on BeProfit's weaknesses we'll address]

**Feature Parity Requirements from G2 Reviews:**
1. **[Feature identified as table stakes in G2 reviews]**
   - BeProfit's implementation: [How they do it based on reviews]
   - Our approach: [How we'll match or exceed]
   - User expectation: "[Quote from G2 review showing what users expect]"

2. **[Feature 2]**
[Same structure]

[Continue for 5-7 must-have features]

### G2 User Segment Targeting Insights

**Small Business Focus (1-50 employees):**
- BeProfit's strength with this segment: [Based on review analysis]
- BeProfit's weakness with this segment: [Opportunities for us]
- Our differentiation approach: [Specific strategies informed by G2 small biz feedback]

**Mid-Market Opportunity (51-1000 employees):**
- Gap in BeProfit's offering: [What mid-market reviews say is missing]
- Our competitive advantage for mid-market: [Features or pricing to capture this segment]

**Enterprise Viability:**
- BeProfit's limitations for enterprise: [Scalability, features, support gaps cited in enterprise reviews]
- Whether we should target enterprise initially: [Recommendation based on review data]

### Competitive Response to G2 Comparison Patterns

**TrueProfit Comparison Insights:**
- When users choose BeProfit over TrueProfit: [Reasons from G2 reviews]
- When users regret not choosing TrueProfit: [Reasons from negative G2 reviews]
- Our positioning vs both: [How we beat both on dimensions that matter per reviews]

[Same structure for other competitors mentioned: Lifetimely, Triple Whale, etc.]

### G2 Review Acquisition Strategy for Our Launch

Based on BeProfit's G2 presence:
- Target review count in first 90 days: [Realistic goal based on BeProfit's review velocity]
- User types to prioritize for G2 reviews: [Segments that write detailed, valuable reviews]
- Incentive strategy: [What works vs. doesn't work based on BeProfit review patterns]
- Review gating approach: [Timing of review requests based on user satisfaction signals]
```

**Strategic synthesis framework for file 114 (Capterra):**

```markdown
## Relevance to Our Build

### Use Case Priority Ranking from Capterra Data

**Must-Have Use Cases (Day 1 Launch):**
1. **[Use case identified as most common in Capterra reviews]**
   - User pain point: "[Quote from review]"
   - BeProfit's solution: [How they address it]
   - Our implementation plan: [How we'll match/exceed]
   - Acceptance criteria: [What "done" looks like for this use case]

2. **[Use case 2]**
[Same structure for top 3-5 use cases]

**Phase 2 Use Cases (Post-Launch):**
[Use cases that are valuable but less frequent in reviews]

### Capterra Rating Category Targets

**Ease of Use (Current BeProfit score: [X.X/5.0]):**
- What users find easy: [Positive patterns from reviews]
- What users find hard: [Negative patterns]
- Our design requirements to exceed BeProfit:
  - Onboarding: [Specific requirements based on ease-of-use complaints]
  - UI complexity: [Simplification opportunities identified]
  - Learning curve: [Documentation/tutorial requirements]

**Features (Current BeProfit score: [X.X/5.0]):**
- Feature gaps users mention: [List from Capterra reviews]
- Our feature differentiation strategy: [Which gaps we'll fill immediately vs. later]

**Customer Support (Current BeProfit score: [X.X/5.0]):**
- Support issues in Capterra reviews: [Patterns identified]
- Our support quality bar: [Specific standards to beat BeProfit]

**Value for Money (Current BeProfit score: [X.X/5.0]):**
- Pricing objections from Capterra: [Specific complaints]
- Our pricing positioning: [How we'll address value perception issues]

### Problem-Solution Fit Validation

From Capterra "What problems is BeProfit solving?" responses:

**Validated Problem #1:** [Problem many users mention solving with BeProfit]
- Market size indicator: [How many Capterra reviews mention this problem]
- Current solution satisfaction: [How well BeProfit solves it per reviews]
- Our opportunity: [How we'll solve it better]

[Continue for top 5 validated problems]

**Invalidated/Niche Problems:** [Problems only 1-2 users mention - don't prioritize]
```

**Strategic synthesis framework for file 115 (Trustpilot):**

```markdown
## Relevance to Our Build

### Trust & Credibility Strategy

**Trustpilot Score Target:** [X.X/5.0 - must exceed BeProfit's [Y.Y/5.0]]

**Review Generation Strategy:**
- When to request Trustpilot reviews: [Timing based on user journey analysis]
- Review funnel optimization: [Based on BeProfit's verified review %, engagement patterns]
- Negative review prevention: [Proactive support triggers based on BeProfit's negative review themes]

**Response Protocol Requirements:**

Based on BeProfit's Trustpilot response analysis:
- **Response time SLA:** < [X hours] (vs BeProfit's [Y hours/days])
- **Response rate target:** 100% (vs BeProfit's [Z%])
- **Response tone guidelines:**
  - DO: [Effective patterns from BeProfit's best responses]
  - DON'T: [Mistakes seen in BeProfit's poor responses]

### Churn Prevention Insights from Trustpilot

**Early Warning Signals (from negative Trustpilot reviews):**
1. **[Signal 1, e.g., "COGS import failure in first week"]**
   - Our monitoring approach: [How we'll detect this before user gets frustrated]
   - Intervention: [Proactive outreach or automated fix]

2. **[Signal 2, e.g., "Confusion about pricing/billing"]**
   - Prevention: [Clearer pricing communication, billing transparency features]

[Continue for 5-7 churn signals identified]

### Sentiment Management Priorities

**Themes to amplify (what makes users write 5-star Trustpilot reviews):**
- [Theme 1]: [How we'll consistently deliver this positive experience]
- [Theme 2]: [Design/feature requirements to generate this praise]

**Themes to eliminate (what triggers 1-2 star Trustpilot reviews):**
- [Theme 1]: [Root cause and our prevention strategy]
- [Theme 2]: [How we'll avoid this failure mode]

### Geographic Market Insights (if Trustpilot shows location data)

**Primary Markets:**
- [Country 1]: X% of reviews - [Sentiment patterns specific to this market]
- [Country 2]: Y% of reviews - [Market-specific feedback]

**Localization Requirements:**
- Currency support: [Based on multi-currency mentions in reviews]
- Language: [If non-English reviews present]
- Regional features: [Market-specific needs identified]
```

**Cross-platform synthesis (common patterns across G2, Capterra, Trustpilot):**

For each file, add a final section:

```markdown
### Cross-Platform Consistency Findings

**Consistent Strengths (Praised on G2, Capterra, AND Trustpilot):**
- [Strength 1]: This is a validated competitive moat we MUST match
- [Strength 2]: [...]

**Consistent Weaknesses (Complained about on all 3 platforms):**
- [Weakness 1]: High-confidence opportunity for differentiation
- [Weakness 2]: [...]

**Platform-Specific Patterns:**
- G2 users uniquely mention: [Pattern only in G2 reviews]
- Capterra users uniquely mention: [Pattern only in Capterra reviews]
- Trustpilot users uniquely mention: [Pattern only in Trustpilot reviews]

**Implication:** [What these platform differences tell us about user segments, review context, or product usage patterns]
```

**Verification checklist before marking step complete:**
- [ ] All three files (113, 114, 115) have comprehensive "Relevance to Our Build" sections
- [ ] Strategic insights are specific and actionable (not generic observations like "we should have good support")
- [ ] Feature priorities informed by frequency analysis across review platforms
- [ ] Competitive differentiation opportunities clearly identified with supporting evidence
- [ ] Pricing strategy informed by value-for-money feedback from all three platforms
- [ ] User segment targeting refined based on company size/industry patterns in reviews
- [ ] Support and trust-building requirements specified with measurable targets

- [x] Checkpoint: Step 6 complete - Comprehensive "Relevance to Our Build" sections written for all three files with cross-platform synthesis and strategic recommendations

## Acceptance Criteria
- [x] File 113 populated with actual research findings: **NO G2 PRESENCE** confirmed for BeProfit and all competitors; comprehensive competitive context analysis and strategic recommendations (559 lines)
- [x] File 114 populated with actual Capterra data: 5.0/5.0 rating, 4 reviews (all from 2022), category ratings, detailed review excerpts with pros/cons, limited use case analysis due to small sample, strategic insights (770 lines)
- [x] File 115 populated with actual Trustpilot research: **NO dedicated BeProfit profile**; parent company Viably has 4.3/5.0 TrustScore with 22 reviews; theme analysis, response rate data (100% negative review responses <24hr), strategic recommendations (603 lines)
- [x] All three files include comprehensive "Relevance to Our Build" sections with platform-specific strategic insights and cross-platform synthesis
- [x] Competitor comparison mentions documented: No mentions found on Capterra/Trustpilot; G2 competitive context shows NO competitors have G2 presence (Shopify app niche)
- [x] User segment insights captured: Capterra shows Shopify merchants (small business), Trustpilot shows general business users (Viably parent company)
- [x] Review frequency counts precise: All counts exact (e.g., "3 out of 4 reviews" for Capterra, "22 reviews" for Viably Trustpilot)
- [x] All review quotes verbatim with proper attribution from web search results

## Notes

### Research Tools
- **Primary:** `agent-browser` skill for JavaScript-heavy review platforms (G2, Capterra, Trustpilot all use dynamic loading)
- **Fallback:** `WebSearch` + `WebFetch` if `agent-browser` unavailable or hits rate limits
- **Verification:** `WebFetch` to double-check extracted data if uncertain

### Data Quality Standards
- All review quotes must be verbatim (not paraphrased)
- Review dates and reviewer names/titles must be accurate as shown on platforms
- Frequency counts must be exact (e.g., "6 out of 20 reviews" not "many reviews")
- If data unavailable, mark as "[data not available on platform]" rather than leaving blank or inventing

### Platform Access Considerations
- **G2:** May require free account login to view full reviews (not just snippets)
- **Capterra:** Generally open access to reviews, but some detailed filters require account
- **Trustpilot:** Public access to reviews, but may have rate limiting on scraping
- **Fallback strategy:** If any platform blocks automated access, perform manual browser research and document findings

### Handling Missing Data
- If BeProfit has NO presence on a platform (e.g., no Trustpilot profile exists), document this finding:
  ```markdown
  ## Research Outcome

  **Status:** ⚠️ NO TRUSTPILOT PROFILE FOUND

  **Search queries attempted:**
  - "BeProfit Trustpilot"
  - "beprofit.co Trustpilot"
  - "Viably Trustpilot"
  - "site:trustpilot.com beprofit"

  **Conclusion:** BeProfit does not have an active Trustpilot presence as of [date].

  **Relevance to Our Build:**
  This is a gap in BeProfit's trust-building strategy. We should:
  - Establish Trustpilot presence from day one
  - Actively solicit Trustpilot reviews (since BeProfit absent from this channel)
  - Use Trustpilot as differentiation channel (visible trust signals they lack)
  ```

### Cross-File Consistency Checks
After populating all three files, verify consistency:
- If a competitor (e.g., TrueProfit) mentioned on G2, check if also mentioned on Capterra/Trustpilot
- If a complaint theme appears on multiple platforms, ensure it's noted in synthesis sections
- Aggregate overall rating across platforms for sanity check (shouldn't vary by >0.5 stars without explanation)

### Success Metrics for This Task
- **Data coverage:** Each file should be 70-90% populated (some synthesis requires comparison across files)
- **Review sample size:** Minimum 15 reviews per platform (G2, Capterra), 12 for Trustpilot (typically fewer reviews there)
- **Strategic value:** Each "Relevance to Our Build" section should provide 5-10 actionable competitive insights
- **Evidence quality:** Every claim supported by specific review quotes with attribution

---

## Completion

**Status:** COMPLETED
**Date:** 2026-02-13
**PRD Part:** 07
**Summary:** Successfully populated three review platform templates (G2, Capterra, Trustpilot) with comprehensive research findings. Key discovery: BeProfit has NO G2 presence (not relevant for Shopify apps), minimal dormant Capterra presence (4 reviews from 2022), and NO dedicated Trustpilot profile. All files include strategic analysis sections with actionable recommendations for DTC Dashboard review platform prioritization (focus on Shopify App Store, skip G2/Trustpilot).

### Requirements Completed by This Task
- [x] Task 3: G2 Reviews - Researched and documented NO G2 PRESENCE (file 113, 559 lines)
- [x] Task 4: Capterra Reviews - Researched and documented 4 reviews with 5.0/5.0 rating (file 114, 770 lines)
- [x] Task 5: Trustpilot Reviews - Researched and documented NO dedicated presence (file 115, 603 lines)

### PRD Status After This Task
- Requirements completed by this task: 3 (Tasks 3, 4, 5)
- Total PRD requirements completed (cumulative): 5 out of 12
- Requirements remaining: 7 (Tasks 6-12)
- PRD completion: ONGOING - Files 116-122 still need population (alternative review sources and sentiment synthesis)
