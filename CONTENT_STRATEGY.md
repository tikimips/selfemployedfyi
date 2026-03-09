# SelfEmployedFYI — Content Strategy & Site Architecture
_Last updated: March 2026_

---

## The Core Bet

NerdWallet and Investopedia own broad financial content. You can't beat them on "self-employed taxes." 

What you CAN own: **The most practical, tool-first, no-fluff resource for people running their own thing** — organized by where they actually are in their journey, not by topic category. Voice: trusted friend who's been through it, not a corporate finance blog.

The moat is **tools + specificity + voice**. Every pillar article gets a calculator or interactive tool. Every answer is specific enough that AI systems cite it.

---

## Site Architecture

### URL Structure

```
selfemployedfyi.com/                          ← homepage (keep calculator, add stage nav)
selfemployedfyi.com/start/                    ← Stage 0: Just Starting hub
selfemployedfyi.com/build/                    ← Stage 1: Getting Stable hub
selfemployedfyi.com/grow/                     ← Stage 2: Building Wealth hub
selfemployedfyi.com/optimize/                 ← Stage 3: Playing Offense hub
selfemployedfyi.com/calculators/              ← All tools index
selfemployedfyi.com/guides/                   ← All guides index (full text searchable)
selfemployedfyi.com/glossary/                 ← SEO + AI citation goldmine
```

### Navigation (top nav)
```
[Logo]  Start  Build  Grow  Optimize  Calculators  [Search]  [Newsletter CTA]
```

### Stage Hub Pages (these are the pillar pages)

Each hub page = 1,500–2,500 words + links to all spokes + embedded tool where relevant.

---

## Content Map by Stage

### 🟢 STAGE 0 — Start (`/start/`)
_Who: Just went freelance, just quit their job, just started a side hustle_

| Article | Target Keyword | Est. Monthly Searches | Difficulty |
|---|---|---|---|
| Sole Prop vs LLC vs S-Corp: Which Do You Actually Need? | "sole proprietor vs llc vs s corp" | 18K | Medium |
| How to Open a Business Bank Account (and Why You Can't Wait) | "business bank account freelancer" | 8K | Low |
| What Business Expenses Can I Deduct? The Real List | "self employed tax deductions list" | 22K | High |
| How Self-Employment Tax Works (And Why It's 15.3%) | "how does self employment tax work" | 12K | Medium |
| The 30% Rule: How Much to Set Aside for Taxes | "how much to set aside for taxes self employed" | 9K | Low ✅ |
| Free Tools to Track Business Income (Before You Need a CPA) | "best free bookkeeping for freelancers" | 5K | Low ✅ |
| Your First Invoice: What to Include + Free Templates | "invoice template freelancer" | 14K | Low ✅ |

**Tool for this stage:** Quarterly Tax Estimator (`/calculators/quarterly-taxes/`) — "How much do I owe this quarter?" Input: income, expenses, state. Output: estimated payment + deadline.

---

### 🔵 STAGE 1 — Build (`/build/`)
_Who: Making money consistently, starting to feel the tax pain, thinking about structure_

| Article | Target Keyword | Est. Monthly Searches | Difficulty |
|---|---|---|---|
| Quarterly Estimated Taxes: How, When, and How Much | "quarterly estimated taxes self employed" | 20K | Medium |
| The Self-Employed Health Insurance Deduction (Full Guide) | "self employed health insurance deduction" | 8K | Medium |
| Best Health Insurance for Freelancers in 2026 | "health insurance for self employed" | 12K | Medium |
| How to Pay Yourself as a Freelancer or LLC Owner | "how to pay yourself llc" | 10K | Low ✅ |
| Contracts 101: What Every Freelancer Needs Before Starting Work | "freelance contract template" | 7K | Low ✅ |
| How to Set Your Freelance Rate (With Calculator) | "how to set freelance rate" | 6K | Low ✅ |
| Business Credit vs Personal Credit: Why Separation Matters | "business credit for freelancers" | 4K | Low ✅ |
| The Home Office Deduction: What Qualifies and What Doesn't | "home office deduction self employed" | 9K | Medium |

**Tool for this stage:** Rate Calculator (`/calculators/freelance-rate/`) — "What should I charge?" Input: desired annual income, hours/week, vacation weeks, overhead. Output: hourly + project rate.

---

### 🟡 STAGE 2 — Grow (`/grow/`)
_Who: $80K–$250K revenue, considering S-corp, wants to build real wealth_

| Article | Target Keyword | Est. Monthly Searches | Difficulty |
|---|---|---|---|
| SEP IRA vs Solo 401(k): Which One Is Right for You? | "sep ira vs solo 401k" | 14K | Medium |
| When to Elect S-Corp Status (The Real Break-Even Number) | "s corp election threshold" | 6K | Low ✅ |
| How Self-Employed People Get Mortgages | "self employed mortgage" | 9K | Low ✅ (we own this) |
| Hiring Your First 1099 Contractor: The Rules | "hiring 1099 contractor rules" | 5K | Low ✅ |
| How to Build Business Credit (From Zero) | "how to build business credit" | 18K | Medium |
| Retirement Savings as a Business Owner: The Cheat Sheet | "retirement planning self employed" | 7K | Medium |
| Should You Hire a CPA? Signs You've Outgrown TurboTax | "when to hire a cpa self employed" | 3K | Low ✅ |
| QBI Deduction: The Pass-Through Tax Break Most Freelancers Miss | "qualified business income deduction" | 11K | High |

**Tool for this stage:** S-Corp Savings Calculator (`/calculators/s-corp-savings/`) — "Would an S-corp save me money?" Input: net profit. Output: estimated SE tax savings vs. S-corp admin costs, break-even point.

---

### 🔴 STAGE 3 — Optimize (`/optimize/`)
_Who: Established, $200K+, thinking about wealth preservation and legacy_

| Article | Target Keyword | Est. Monthly Searches | Difficulty |
|---|---|---|---|
| Tax Strategies for High-Income Self-Employed People | "tax strategies self employed high income" | 4K | Low ✅ |
| Defined Benefit Plans: The Retirement Account for Big Savers | "defined benefit plan self employed" | 3K | Low ✅ |
| Estate Planning for Business Owners: The Basics | "estate planning small business owner" | 5K | Medium |
| How to Value Your Business (Even If You Don't Plan to Sell) | "how to value a small business" | 12K | Medium |
| Depreciation and Section 179: Writing Off Equipment the Right Way | "section 179 deduction" | 8K | Medium |
| Augusta Rule and Other Overlooked Tax Strategies | "augusta rule tax strategy" | 6K | Low ✅ |
| When to Form a Holding Company | "holding company for small business" | 4K | Low ✅ |

**Tool for this stage:** Retirement Max Calculator (`/calculators/retirement-max/`) — "How much can I contribute this year?" Input: business structure, net profit, age. Output: max contribution to SEP/Solo 401k/Defined Benefit.

---

## Calculators Roadmap (`/calculators/`)

Priority order:

| # | Calculator | Why | Build Complexity |
|---|---|---|---|
| 1 | **Quarterly Tax Estimator** | Highest search volume, lowest competition, seasonal spike 4x/year | Medium |
| 2 | **S-Corp Savings Calculator** | High commercial intent, drives CPA referrals | Medium |
| 3 | **Freelance Rate Calculator** | Huge audience, very shareable | Low |
| 4 | **Retirement Max Calculator** | High-intent, wealthy users | Medium |
| 5 | **1099 vs W2 Income Comparison** | "Is this contract worth it?" — very searched | Low |
| ✅ | **Mortgage Qualifying Calculator** | Already built | Done |

---

## Glossary (`/glossary/`)

Build 50+ one-page definitions. These are AI citation machines.

Examples:
- What is self-employment tax?
- What is a Schedule C?
- What is a QBI deduction?
- What is a solo 401(k)?
- What is a Non-QM mortgage?
- What is the Augusta Rule?
- What is a K-1?
- What is a pass-through entity?

Each page: 300–500 words, plain language, no fluff, structured Q&A format. They'll show up in AI Overviews constantly.

---

## Content Calendar — First 12 Weeks

**Week 1–2:** Foundation
- [ ] Restructure homepage — add stage navigation, keep calculator
- [ ] Build `/calculators/quarterly-taxes/` — highest immediate SEO value
- [ ] Publish: "How Much to Set Aside for Taxes: The 30% Rule Explained"
- [ ] Publish: "How Self-Employment Tax Works (And Why It's 15.3%)"

**Week 3–4:** Stage 0 Core
- [ ] Publish: "Sole Prop vs LLC vs S-Corp: Which Do You Actually Need?"
- [ ] Publish: "What Business Expenses Can I Deduct?"
- [ ] Publish: "How to Open a Business Bank Account"
- [ ] Set up newsletter (Beehiiv or ConvertKit) — collect emails from day 1

**Week 5–6:** Stage 1 Core
- [ ] Build `/calculators/freelance-rate/`
- [ ] Publish: "Quarterly Estimated Taxes: The Complete Guide"
- [ ] Publish: "Health Insurance for Freelancers in 2026"
- [ ] Publish: "The Home Office Deduction: What Qualifies"

**Week 7–8:** Stage 2 Core + Mortgage SEO push
- [ ] Publish: "SEP IRA vs Solo 401(k)"
- [ ] Publish: "When to Elect S-Corp Status" (with calculator link)
- [ ] Build `/calculators/s-corp-savings/`
- [ ] Expand mortgage calculator page with more copy + FAQ

**Week 9–10:** Glossary Blitz
- [ ] Publish 20 glossary definitions (batch them, they're fast)
- [ ] Publish: "The QBI Deduction Guide"
- [ ] Publish: "How to Build Business Credit"

**Week 11–12:** Optimize + Outreach
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Plausible or Fathom analytics
- [ ] Start 3 outreach threads: freelancer communities (Reddit r/freelance, r/selfemployed), Twitter/X, ProductHunt launch
- [ ] First newsletter issue to collected emails

---

## What Makes This Win vs. Generic Finance Sites

1. **Tools on every pillar** — NerdWallet has articles. You have calculators. People link to calculators.
2. **Stage-based navigation** — The IRS doesn't tell you you're a Stage 1. You will.
3. **Tone** — "The real break-even number" beats "S-corporation election considerations." Write like a smart friend, not a compliance officer.
4. **AI-optimized structure** — Every article ends with a 5-question FAQ. AI Overviews pull from FAQ schema. Use it.
5. **Internal linking** — Every article links to 2+ calculators and 2+ related guides. Build the web.

---

## Tech Stack for the Content Layer

Current: Next.js + Tailwind + Vercel (good, keep it)

Add:
- **MDX** for blog posts — lets you embed React components (calculators!) inside articles
- **Contentlayer or Velite** — type-safe MDX processing, auto-generates routes
- **next-sitemap** — auto-generates sitemap.xml for Google
- **next-seo** — handles meta tags, OG images, structured data
- **JSON-LD schema** — Article + FAQPage + HowTo schema on every post

This keeps everything in the same repo, deploys to Vercel with zero infrastructure, and is fast as hell (important for Core Web Vitals / SEO).

---

## Revenue Tie-ins by Stage

| Stage | Natural Monetization |
|---|---|
| Start | Affiliate: business bank accounts (Mercury, Relay pay $50–150/referral), accounting software (FreshBooks, Wave) |
| Build | Affiliate: health insurance brokers, CPA referrals, contract templates |
| Grow | Lead gen: mortgage brokers (already doing this), financial advisors, CPA firms |
| Optimize | High-value: vetted CPA network, financial planner referrals ($200–500/lead) |
| All | Newsletter sponsorships once list hits 5K+ |

---

_This doc lives in the repo. Update it as priorities shift._
