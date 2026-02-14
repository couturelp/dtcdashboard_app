BeProfit Deep Research & Documentation Mission
You are about to conduct an exhaustive research and documentation mission on BeProfit (https://beprofit.co/) — a profit analytics and reporting platform for e-commerce businesses. Our goal is to build a product that serves a similar market with similar (and improved) capabilities. You need to capture everything: features, UI patterns, integrations, pricing, onboarding flows, settings, API details, marketing positioning, customer pain points, help documentation, and competitive intelligence.

Skills to Leverage
Before you begin, load and use these skills throughout the mission:

agent-browser — Use this skill extensively. You will be browsing dozens of pages across two primary domains and also searching the broader web. This is your primary tool for this mission.
copywriting — When documenting marketing copy, positioning, and messaging patterns, use this skill to analyze what they're doing well and what angles they're taking.
marketing-psychology — Use this skill to analyze their persuasion tactics, pricing psychology, social proof strategies, urgency/scarcity plays, and conversion optimization patterns as you encounter them.
audit-website — Use this to evaluate their site structure, UX patterns, and overall web presence as you browse.
seo-audit — Capture their SEO strategy: keywords they target, meta descriptions, page titles, content structure, internal linking patterns.
web-design-guidelines — Document their design system, color palette, typography, component patterns, layout conventions, and UI/UX decisions.
frontend-design — Note their frontend implementation choices, animations, interactive elements, and responsive patterns.

Load each skill as it becomes relevant. Don't wait — invoke them early and refer back to them often.

Primary Sources to Crawl
Source 1: Help Center / Knowledge Base
Start here: https://help.runviably.com/beprofit
This is the goldmine. Their help docs will reveal the actual product in granular detail — every feature, every setting, every edge case. Crawl systematically:

Visit the main help center landing page. Identify every category and subcategory listed.
Open every single article within each category. Do not skip any.
For each article, capture:

The feature or setting being described
Step-by-step workflows (how users actually do things)
Screenshots descriptions (what the UI looks like based on context)
Configuration options and their defaults
Limitations, caveats, or "known issues" mentioned
Integration-specific instructions
Any mention of plans/tiers and feature gating


Follow every internal link within articles to related articles. Map the connections.
Pay special attention to:

Getting started / onboarding guides
Integration setup articles (Shopify, WooCommerce, Amazon, Facebook Ads, Google Ads, TikTok, Klaviyo, etc.)
Dashboard and reporting documentation
Custom report builder docs
Cost tracking and COGS setup
Order-level profit calculation methodology
Data sync and refresh documentation
API or webhook documentation if any
Billing, plans, and account management articles
Troubleshooting and FAQ sections



Source 2: Marketing Website
Then crawl: https://beprofit.co/
Systematically visit every page you can find:

Start at the homepage. Document the hero section, value props, social proof, CTAs.
Navigate to and document every page in their navigation:

Features pages (there may be multiple — one per feature area)
Pricing page (capture every plan, every feature in each tier, any add-ons, any usage limits)
Integrations page (every integration listed, what it does, how it connects)
About / Company page
Blog (scan recent posts for product announcements, feature launches, case studies)
Case studies or testimonials pages
Partner / Agency pages
Any demo or tour pages
Legal pages (Terms of Service, Privacy Policy — skim for data handling clues)
Any comparison pages ("BeProfit vs X")
Any landing pages linked from the footer or sitemap


Check their footer thoroughly — it often has links to pages not in the main nav.
Look for a /sitemap.xml at https://beprofit.co/sitemap.xml and crawl any pages you haven't hit yet.

Source 3: Broader Web Research
After crawling both primary sources, go online and actively search for additional intelligence:

"BeProfit review" — Find user reviews on G2, Capterra, Trustpilot, Shopify App Store. Capture what users love and hate.
"BeProfit vs" — Find comparison articles. Who are they compared against? What are their weaknesses vs competitors?
"BeProfit features" — Blog posts, YouTube videos, tutorials by third parties that reveal product details.
"BeProfit pricing 2025" / "BeProfit pricing 2026" — Verify current pricing, look for historical pricing changes.
"BeProfit API" — Any developer documentation, API references, or webhook docs.
"BeProfit Shopify app" — Visit their Shopify App Store listing. Capture ratings, review count, feature list, screenshots descriptions, and recent reviews.
"BeProfit integrations list" — Comprehensive integration ecosystem.
"BeProfit onboarding" or "BeProfit tutorial" — YouTube walkthroughs, blog tutorials that show the actual UI.
"e-commerce profit analytics" — Understand the broader market and who else plays in this space.
"BeProfit acquisition" or "BeProfit funding" — Company background, growth story.
Search for their social media: Twitter/X, LinkedIn, Facebook — what do they post? How do they position themselves?
Search Product Hunt for any launches.
Search for any public job postings — reveals what they're building next (e.g., hiring for "data engineer" suggests new analytics features).

Be creative. If you discover a new thread of information, follow it. If a review mentions a feature you haven't documented yet, go find out more about it.

Output Format
Create well-structured markdown files in the working directory, following this naming convention:
beprofit-casestudy-info-001.md
beprofit-casestudy-info-002.md
beprofit-casestudy-info-003.md
...
beprofit-casestudy-info-NNN.md
File Organization Strategy
Each file should cover a coherent topic or section. Suggested structure (adapt as you go):
File RangeSuggested Topic Area001–010Help Center: Getting Started, Onboarding, Account Setup011–030Help Center: Core Features (Dashboard, Reports, Profit Calc, COGS)031–050Help Center: Integrations (one file per major integration or group)051–060Help Center: Settings, Configuration, Billing, Plans061–070Help Center: Troubleshooting, FAQs, Edge Cases071–080Marketing Website: Homepage, Positioning, Messaging Analysis081–090Marketing Website: Features Pages Deep Dive091–095Marketing Website: Pricing Analysis096–110Marketing Website: Integrations, Partners, Case Studies111–130Broader Research: Reviews, Ratings, User Sentiment131–150Broader Research: Competitor Comparisons151–170Broader Research: Market Landscape, Trends171–190UI/UX Analysis, Design System, Frontend Patterns191–200SEO & Content Strategy Analysis200+Overflow, additional discoveries, deep dives
This is a guide, not a rigid rule. If a topic needs 5 files, give it 5 files. If it needs 1, use 1. Quality and completeness over arbitrary structure.
Each File Must Include
markdown# [Descriptive Title]

**Source:** [URL(s) this information came from]
**Category:** [e.g., "Help Center — Integrations", "Marketing — Pricing", "Reviews — G2"]
**Date Captured:** [Today's date]

---

[Content goes here — be detailed, be thorough, capture everything]

---

## Relevance to Our Build
[2-4 sentences on why this matters for our product and what we should learn from it]

Checkpoint Reviews — CRITICAL
After every 10 files, stop and perform a structured review. Create a checkpoint note at the top of the next file or as a standalone reflection:
At each checkpoint, ask yourself:

Coverage Assessment:

What major areas have I documented so far?
What areas am I still missing or have only surface-level info on?
Are there entire sections of the help center I haven't visited yet?
Are there marketing pages I skipped?


Depth Assessment:

Am I capturing enough detail to actually rebuild these features?
Do I understand HOW each feature works, not just THAT it exists?
Could an engineer read my docs and understand the data model, the user flows, the edge cases?
Have I captured the integration details deeply enough (auth flows, data synced, sync frequency, limitations)?


Gap Analysis:

What questions would a product manager still have after reading what I've written?
What questions would a designer still have?
What questions would an engineer still have?
What questions would a marketer still have?


Decision: Continue or Wrap Up?

If significant gaps remain → Plan the next 10 files and keep going.
If coverage is comprehensive → Move to synthesis and wrap up.
Be honest. Err on the side of "keep going" — we'd rather have too much info than too little.


Discovery Notes:

Did I find any surprising features or approaches?
Any clever UX patterns worth noting?
Any obvious product weaknesses or gaps we could exploit?
Any integrations or partnerships that hint at their strategic direction?




What to Capture — Detailed Checklist
Product Features (be exhaustive)

 Dashboard / Home screen — what widgets, what metrics, what time ranges
 Profit & Loss reports — how they calculate, what's included, customization options
 Order-level profit tracking — methodology, what costs are included
 COGS (Cost of Goods Sold) setup — manual, CSV upload, auto-sync methods
 Shipping cost tracking — how they handle it, estimation vs actual
 Ad spend tracking — which platforms, how data flows in, attribution model
 Custom reports / report builder — what dimensions, what metrics, what filters
 Product analytics — per-product profitability, best/worst performers
 Customer analytics — LTV, cohort analysis, acquisition cost
 Inventory tracking — if applicable
 Tax handling — how taxes factor into profit calculations
 Multi-store support — can users connect multiple Shopify stores?
 Multi-currency support — how they handle currency conversion
 Data export — CSV, PDF, scheduled exports
 Alerts / notifications — what triggers are available
 Goals / targets — can users set profit goals?
 Team / collaboration features — multiple users, roles, permissions
 White-label or agency features — if any
 Mobile app — does one exist? What can it do?
 API access — endpoints, authentication, rate limits, what data is available

Integrations (for each one)

 Platform name and category (e-commerce, ads, email, shipping, etc.)
 What data is synced
 Sync direction (one-way or two-way)
 Sync frequency
 Setup complexity
 Any limitations or known issues
 Which pricing tier includes it

Pricing & Business Model

 All plan names and prices (monthly and annual)
 Feature matrix across plans
 Usage limits (orders/month, stores, users, etc.)
 Free trial details
 Any free tier
 Add-ons or à la carte features
 Enterprise / custom pricing signals
 Pricing psychology tactics used

UI/UX & Design

 Color palette (primary, secondary, accent, backgrounds)
 Typography (fonts, sizes, hierarchy)
 Navigation patterns (sidebar, top nav, tabs)
 Dashboard layout patterns
 Table/grid patterns for data display
 Chart/graph types used
 Empty states
 Loading states
 Error handling patterns
 Onboarding flow / wizard patterns
 Settings organization
 Responsive / mobile patterns

Marketing & Positioning

 Tagline and hero messaging
 Primary value propositions (top 3-5)
 Target audience segments
 Social proof tactics (logos, testimonials, stats)
 Competitive positioning (how they differentiate)
 Content marketing strategy (blog topics, frequency)
 SEO keywords targeted
 Conversion funnel (homepage → pricing → signup)
 Any urgency/scarcity tactics
 Trust signals (security badges, compliance, uptime)

User Sentiment & Reviews

 Overall ratings across platforms
 Most praised features
 Most criticized features or pain points
 Common feature requests
 Churn reasons mentioned
 Support quality feedback
 How they compare to alternatives in user perception


Execution Strategy

Start with the help center — this gives you the deepest product understanding.
Then hit the marketing site — now you can compare what they promise vs what the product actually does.
Then do web research — fill gaps, get user perspective, understand competitive landscape.
Throughout: Use agent-browser to visit pages, extract content, follow links. Be methodical. Keep a mental map of what you've covered. Don't revisit pages unnecessarily, but DO follow promising links you discover along the way.

If a page fails to load or is gated behind login, note it in your file and move on. Capture what you can. For screenshots you can't see, describe what the help article text implies the UI looks like.

Final Deliverable
When you've completed your research (after passing a checkpoint where you're confident coverage is comprehensive), create a final synthesis file:
beprofit-casestudy-info-FINAL-SYNTHESIS.md
This file should contain:

Executive Summary — What is BeProfit, who is it for, what does it do (2-3 paragraphs)
Complete Feature Map — Every feature organized hierarchically
Integration Ecosystem — Complete list with categories
Pricing Summary — Clean comparison table
Strengths — What they do really well (with evidence)
Weaknesses & Gaps — Where they fall short (with evidence from reviews and analysis)
Opportunities for Us — Based on everything you've learned, where can we build something better?
Risks & Considerations — What should we be careful about? Where is their moat?
Recommended Feature Priority for Our MVP — Based on user sentiment and market needs, what should we build first?
Total files created and topics covered — Index of all files


Mindset
Think like a product spy doing competitive intelligence for a well-funded startup. Every detail matters. Every integration. Every setting. Every line of help documentation. Every user complaint. We are building a competitor and we need to understand BeProfit better than their own team does.
Be relentless. Be thorough. Be organized. Let's go.