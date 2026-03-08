# SelfEmployedFYI — Go-To-Market & Growth Strategy
*Created: 2026-03-08*

---

## What This Product Actually Is

A free mortgage qualification calculator for self-employed people that reveals the gap between what they earn and what a lender thinks they earn — and tells them what to do about it. Collects email leads via Supabase.

**The core insight (and the headline):** "You make $200K. The bank thinks you make $60K." That's a genuinely painful problem that 16+ million self-employed Americans face.

---

## Business Model

You're collecting leads. That's the business. Revenue paths in order of effort:

1. **Partner referral fees** — mortgage brokers who specialize in self-employed/Non-QM pay $200–$1,000+ per referred funded loan. This is how NerdWallet, Bankrate, and LendingTree became $1B+ companies.
2. **Lead sales** — sell qualified leads directly to lenders ($50–200/lead)
3. **Sponsored recommendations** — "Our recommended Non-QM lender" in the results
4. **Affiliate** — LendingTree, Better.com, Rocket all have affiliate programs

The leads table you have is the asset. Everything in this strategy is about filling it with high-intent people.

---

## Target Audience

### Primary (highest intent, most valuable)
- Freelancers/consultants earning $80K–$300K+ who want to buy a home in the next 6–18 months
- People who've been denied a mortgage or told their income "doesn't qualify"
- 1099 contractors who just had a good year and are finally thinking about buying

### Secondary (high volume, slightly longer path)
- Business owners wondering why their CPA's write-offs are hurting their homebuying chances
- Gig workers (Uber, Airbnb, DoorDash) who want to understand their options
- Real estate investors with complex income structures

### Channel Partners (multiplier)
- **Mortgage brokers** who specialize in self-employed/Non-QM — they need leads and will pay for them
- **CPAs** who work with self-employed clients — they get asked this question constantly
- **Real estate agents** — they hate losing self-employed buyers who can't qualify

---

## Phase 1: Immediate Traction (0–30 days)

### Reddit — Free, High-Intent Audience

These communities are where your users go when they're frustrated. Don't spam — be genuinely helpful.

**Target subreddits:**
- r/personalfinance (18M members) — "I'm self-employed and trying to buy a house"
- r/freelance (750K) — core audience, they talk about this constantly
- r/FirstTimeHomeBuyer (250K) — high purchase intent
- r/realestate (1.7M) — buyers and agents both here
- r/financialindependence (1.7M) — self-employed FIRE crowd
- r/Entrepreneur (3M) — business owners who want homes

**The play:** Search each subreddit for "self employed mortgage" or "1099 income mortgage." Find unanswered questions or old threads. Post genuinely helpful answers. When relevant, drop the tool naturally: *"I've been trying to understand this myself — there's a calculator at selfemployed.fyi that actually shows the qualifying income gap, might be helpful."*

Do 10 of these and you'll get your first 100 users.

### Hacker News — "Show HN"

HN's "Show HN" posts for tools like this regularly get 200–500 upvotes and thousands of clicks if the pitch is right.

**Pitch format:**
> Show HN: I built a calculator that shows self-employed people their actual mortgage-qualifying income
>
> Self-employed income gets hammered by lenders — they average your last 2 years of tax returns, not what you actually make. A freelancer making $200K can end up with a qualifying income of $60K after deductions.
>
> selfemployed.fyi calculates your qualifying income, shows the gap, and tells you whether conventional or Non-QM is your best bet.

Post Sunday night or Monday morning for max visibility.

### Facebook Groups

Search for "self employed" and "freelance" groups. There are dozens with 50K–500K members. Same approach as Reddit — be helpful, drop the link when relevant.

### Product Hunt

Launch here once the site is properly polished. Good for a spike of 500–2,000 visitors. Make sure the landing page is tight (it is) and you have a solid tagline.

**PH tagline:** "Mortgage calculator for the self-employed. See why lenders think you make less than you do."

---

## Phase 2: SEO Content Engine (30–90 days)

This is the highest-ROI play long-term. People are actively searching for this information.

### Target Keyword Clusters

**High volume, achievable:**
- "self employed mortgage calculator" — 8K/mo, medium competition
- "self employed mortgage qualifying income" — 4K/mo, low competition
- "1099 mortgage calculator" — 2.5K/mo, low competition
- "how do lenders calculate self employed income" — 3K/mo, low competition
- "non-qm loan self employed" — 1.5K/mo, low competition
- "bank statement loan vs conventional" — 1K/mo, very low competition

**Long-tail goldmines (easy to rank):**
- "self employed turned down for mortgage"
- "why do deductions hurt mortgage qualification"
- "freelancer mortgage qualifying income calculation"
- "how much can self employed person borrow for mortgage"
- "non-qm mortgage calculator self employed"

### Content to Build (priority order)

1. **"The Complete Guide to Qualifying for a Mortgage When Self-Employed"**
 - Target keyword: "self employed mortgage"
 - 3,000+ words, include the calculator inline
 - This single piece can drive 500–2,000 organic visits/month at scale
 - Every other piece links to this

2. **"Why Your Tax Deductions Are Killing Your Mortgage Application"**
 - Target: "self employed deductions mortgage"
 - The CPA vs. mortgage broker conflict story — genuinely useful, very shareable

3. **"Conventional vs. Non-QM Loans: A Self-Employed Person's Guide"**
 - Target: "non-qm loan self employed"
 - Positions the tool as the decision-making resource

4. **"Bank Statement Loans: When They Make Sense for Self-Employed Borrowers"**
 - Target: "bank statement loan self employed"
 - Very high purchase intent search

5. **State-specific landing pages** (scale later)
 - "Self-Employed Mortgage Calculator — California"
 - "Self-Employed Mortgage in Texas"
 - These rank faster with geo modifiers

### What the site needs to support this:
- A `/blog` section (Next.js makes this trivial to add)
- Internal linking from every blog post to the calculator
- Email capture on every blog post ("Get your qualifying income report")

---

## Phase 3: Partnership Channel (60–120 days)

### Mortgage Broker Partnerships

This is where the real money is. Self-employed Non-QM mortgage brokers are desperate for qualified leads. They'll pay $200–1,000 per funded loan.

**How to find them:**
- Google "non-qm mortgage broker [city]" in top 10 metros
- Search for brokers active in self-employed forums (they post there)
- Non-QM lenders: Angel Oak, Acra Lending, Newrez — they all have broker programs

**The pitch:**
> "I run selfemployed.fyi — a calculator that shows self-employed people their qualifying income gap. My users have already done the math and know they need Non-QM options. Would you be interested in a referral partnership?"

Start with 2–3 brokers in LA (your backyard) and test the referral flow.

### CPA Partnerships

CPAs who specialize in self-employed clients get asked "can I get a mortgage?" constantly. Most don't know how to answer it.

**The pitch:**
> "I built a calculator for your clients — shows them exactly how their deductions affect their qualifying income. Free to use, I can even white-label it for your firm if you want. All I ask is a mention in your newsletter."

### Freelancer Newsletters & Communities

High-leverage placements:
- **Freelancing Females** — 150K community, newsletter ads are cheap
- **Freelance Corner** — popular weekly newsletter
- **Indy.com** — freelancer platform, ad or partnership
- **The Motley Fool / NerdWallet roundups** — getting listed in "best tools for freelancers" articles is worth thousands of visits

---

## Growth Loops

### Loop 1: SEO → Calculator → Lead → Partner Referral
Organic search → use the calculator → email captured → follow-up email sequence → referred to mortgage broker partner → referral fee

### Loop 2: Shareability
After showing results, add: *"Share your qualifying income gap with your financial advisor"* — generates a shareable link with their (anonymized) numbers. People share this in group chats, forums, with their agents.

### Loop 3: Embed Widget
Create an embeddable version of the calculator that mortgage brokers and real estate agents can put on their own sites. Each embed drives leads back to you.

### Loop 4: Retargeting
Facebook/Instagram pixel on the site. Retarget calculator users who didn't submit email with: *"Still confused about your mortgage options? Here's exactly what to do next."*

---

## Email Strategy (You Have a Leads Table — Use It)

Currently collecting emails. Here's what to send them:

**Email 1 (immediate):** "Here's your qualifying income breakdown" — their numbers, what they mean, the gap
**Email 2 (day 3):** "The strategy most self-employed buyers use" — conventional vs Non-QM explained simply
**Email 3 (day 7):** "3 things to do right now if you're self-employed and want a mortgage" — actionable checklist
**Email 4 (day 14):** "Ready to talk to someone who specializes in this?" — soft referral to partner

This 4-email sequence turns a calculator user into a warm mortgage lead. Use Resend or Mailchimp. I can build this out if you want.

---

## Metrics to Track

| Metric | Target (month 1) | Target (month 3) |
|---|---|---|
| Monthly calculator users | 500 | 5,000 |
| Lead capture rate | 20% | 30% |
| Leads captured/month | 100 | 1,500 |
| Partner referrals sent | 5 | 50 |
| Revenue (referral fees) | $500 | $10,000 |

---

## Priority Action List

**This week:**
1. Post on r/personalfinance and r/freelance (2 posts each, helpful, not spammy)
2. Draft "Show HN" post, schedule for Monday morning
3. Reach out to 3 LA-based Non-QM mortgage brokers about a referral deal
4. Add email nurture sequence (Resend or Mailchimp, 4 emails)
5. Set up Google Analytics + Search Console

**This month:**
1. Write the "Complete Guide to Self-Employed Mortgages" (3,000 words)
2. Add a `/blog` section to the Next.js app
3. Launch on Product Hunt
4. Sign first partner broker deal

**This quarter:**
1. 10 blog posts targeting key search terms
2. 3+ active broker partnerships
3. Launch the embeddable calculator widget
4. First retargeting campaigns
