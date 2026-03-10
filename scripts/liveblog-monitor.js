#!/usr/bin/env node
/**
 * Propped Live Blog Monitor
 * Monitors financial news RSS feeds, writes original Propped posts via Gemini,
 * attributes them to "Josh Smart", and inserts into Supabase.
 *
 * Run: node scripts/liveblog-monitor.js
 */

const https = require("https");
const http = require("http");
const { createClient } = require("@supabase/supabase-js");
const RssParser = require("rss-parser");
const path = require("path");
const fs = require("fs");

// ── Load .env.local ──────────────────────────────────────────────────────────
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line.includes("=") && !line.startsWith("#"))
    .forEach((line) => {
      const [k, ...v] = line.split("=");
      if (k && !process.env[k.trim()]) process.env[k.trim()] = v.join("=").trim();
    });
}

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const GEMINI_API_KEY    = process.env.GEMINI_API_KEY || "AIzaSyBOzWBN4yt5NaFHLbPBNATHCzSEBHv05Fs";

// ── RSS Sources ──────────────────────────────────────────────────────────────
// mode: "news"         → traditional news sources, reported-style rewrite
// mode: "thought_leader" → monitor for topic signals, write original Propped
//                          editorial — never reference or attribute the source

const SOURCES = [
  // ── Finance & Business News ──────────────────────────────────────────────
  { key: "cnbc-markets",     mode: "news", url: "https://www.cnbc.com/id/10000664/device/rss/rss.html",                       category: "economy"    },
  { key: "cnbc-investing",   mode: "news", url: "https://www.cnbc.com/id/15839069/device/rss/rss.html",                       category: "stockcheck" },
  { key: "yahoo-finance",    mode: "news", url: "https://finance.yahoo.com/news/rssindex",                                     category: "stockcheck" },
  { key: "yahoo-bizfin",     mode: "news", url: "https://finance.yahoo.com/rss/topstories",                                    category: "moneymoves" },
  { key: "entrepreneur",     mode: "news", url: "https://www.entrepreneur.com/latest.rss",                                     category: "bizbuzz"    },
  { key: "inc",              mode: "news", url: "https://www.inc.com/rss.html",                                                category: "bizbuzz"    },
  { key: "thestreet",        mode: "news", url: "https://www.thestreet.com/.rss/full/",                                        category: "stockcheck" },
  { key: "marketwatch",      mode: "news", url: "https://feeds.marketwatch.com/marketwatch/topstories/",                       category: "economy"    },
  { key: "marketwatch-real", mode: "news", url: "https://feeds.marketwatch.com/marketwatch/realtimeheadlines/",                category: "stockcheck" },
  { key: "taxfoundation",    mode: "news", url: "https://taxfoundation.org/feed/",                                             category: "taxtalk"    },
  { key: "nerdwallet",       mode: "news", url: "https://www.nerdwallet.com/blog/feed/",                                       category: "moneymoves" },

  // ── Thought Leaders & Founder Voices ─────────────────────────────────────
  // Monitor for topic signals — write original Propped editorial, no attribution
  {
    key: "paulgraham",
    mode: "thought_leader",
    url: "https://feeds.feedburner.com/PaulGrahamEssays",
    category: "bizbuzz",
    context: "startup philosophy, founder mindset, how to build companies that matter",
  },
  {
    key: "samaltman",
    mode: "thought_leader",
    url: "https://blog.samaltman.com/posts.atom",
    category: "bizbuzz",
    context: "AI, startups, big swings, what it takes to build something important",
  },
  {
    key: "lenny",
    mode: "thought_leader",
    url: "https://www.lennysnewsletter.com/feed",
    category: "bizbuzz",
    context: "product strategy, growth, building products people love, creator economy",
  },
  {
    key: "justinwelsh",
    mode: "thought_leader",
    url: "https://justinwelsh.substack.com/feed",
    category: "bizbuzz",
    context: "one-person business, solopreneur systems, monetizing your knowledge",
  },
  {
    key: "sahilbloom",
    mode: "thought_leader",
    url: "https://sahilbloom.substack.com/feed",
    category: "moneymoves",
    context: "wealth frameworks, leverage, career and financial growth for high-achievers",
  },
  {
    key: "allin-podcast",
    mode: "thought_leader",
    url: "https://www.omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/a91018a4-ea4f-4130-bf55-ae270180c327/44710ecc-10bb-48d1-93c7-ae270180c33e/podcast.rss",
    category: "economy",
    context: "tech, startups, venture capital, macro trends, what's really happening in the economy",
  },
  {
    key: "how-i-built-this",
    mode: "thought_leader",
    url: "https://rss.art19.com/how-i-built-this",
    category: "bizbuzz",
    context: "founder stories, how companies actually started, the messy reality of building a business",
  },
  {
    key: "invest-like-best",
    mode: "thought_leader",
    url: "https://feeds.megaphone.fm/investlikethebest",
    category: "moneymoves",
    context: "investing, business building, deep conversations with operators and investors",
  },
  {
    key: "yc-blog",
    mode: "thought_leader",
    url: "https://www.ycombinator.com/blog/rss.xml",
    category: "bizbuzz",
    context: "startup tactics, fundraising, building companies, product-market fit, early-stage decisions",
  },
];

// ── Category keyword classifier ──────────────────────────────────────────────
const CATEGORY_KEYWORDS = {
  stockcheck: ["stock", "S&P", "nasdaq", "dow", "equity", "shares", "earnings", "IPO", "bull", "bear", "rally", "selloff", "NYSE", "market cap", "dividend", "trading"],
  ratewatch:  ["interest rate", "fed rate", "savings rate", "CD rate", "mortgage rate", "APY", "APR", "Federal Reserve", "FOMC", "yield", "treasury", "bond", "rate hike", "rate cut"],
  taxtalk:    ["tax", "IRS", "deduction", "write-off", "1099", "Schedule C", "self-employment tax", "quarterly tax", "filing", "refund", "audit", "W-2", "capital gains"],
  moneymoves: ["personal finance", "budget", "savings", "debt", "credit score", "401k", "retirement", "investing", "wealth", "net worth", "emergency fund"],
  bizbuzz:    ["small business", "entrepreneur", "startup", "freelance", "freelancer", "founder", "self-employed", "side hustle", "solopreneur", "gig economy", "LLC", "S-corp"],
  economy:    ["GDP", "inflation", "CPI", "unemployment", "jobs", "Fed", "Federal Reserve", "recession", "economic growth", "trade", "tariff", "fiscal"],
};

// ── Unsplash image pools per category ───────────────────────────────────────
const CATEGORY_IMAGES = {
  stockcheck: [
    { url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80", alt: "Stock market trading screens" },
    { url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=675&fit=crop&q=80", alt: "Financial charts and market data" },
    { url: "https://images.unsplash.com/photo-1611095566888-ba07f8d1a66e?w=1200&h=675&fit=crop&q=80", alt: "Stock market graph" },
    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80", alt: "Financial data analysis" },
    { url: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=675&fit=crop&q=80", alt: "Market trading charts" },
  ],
  ratewatch: [
    { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop&q=80", alt: "Interest rate concepts" },
    { url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop&q=80", alt: "Cash and savings" },
    { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=675&fit=crop&q=80", alt: "Banking and rates" },
    { url: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=1200&h=675&fit=crop&q=80", alt: "Financial planning" },
  ],
  taxtalk: [
    { url: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=1200&h=675&fit=crop&q=80", alt: "Tax documents and forms" },
    { url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=675&fit=crop&q=80", alt: "Calculator and tax documents" },
    { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop&q=80", alt: "Tax preparation" },
    { url: "https://images.unsplash.com/photo-1507209575474-fa5d5dd8e2f5?w=1200&h=675&fit=crop&q=80", alt: "Financial paperwork" },
  ],
  moneymoves: [
    { url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop&q=80", alt: "Personal finance planning" },
    { url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=675&fit=crop&q=80", alt: "Money management" },
    { url: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=1200&h=675&fit=crop&q=80", alt: "Savings and investing" },
    { url: "https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=1200&h=675&fit=crop&q=80", alt: "Financial growth" },
  ],
  bizbuzz: [
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop&q=80", alt: "Entrepreneurs collaborating" },
    { url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=675&fit=crop&q=80", alt: "Small business owner working" },
    { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop&q=80", alt: "Business planning session" },
    { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=675&fit=crop&q=80", alt: "Startup team at work" },
  ],
  economy: [
    { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80", alt: "Economic data overview" },
    { url: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&h=675&fit=crop&q=80", alt: "Global economy" },
    { url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80", alt: "Economic markets" },
    { url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=675&fit=crop&q=80", alt: "Financial market overview" },
  ],
};

function pickImage(categorySlug) {
  const pool = CATEGORY_IMAGES[categorySlug] || CATEGORY_IMAGES.economy;
  return pool[Math.floor(Math.random() * pool.length)];
}

function classifyCategory(title, description, defaultCategory) {
  const text = (title + " " + description).toLowerCase();
  let bestCat = defaultCategory;
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.filter((kw) => text.includes(kw.toLowerCase())).length;
    if (score > bestScore) { bestScore = score; bestCat = cat; }
  }
  return bestCat;
}

async function callGemini(prompt) {
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.75, maxOutputTokens: 700 },
  });

  return new Promise((resolve, reject) => {
    const apiPath = `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: apiPath,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject(new Error(parsed.error.message || JSON.stringify(parsed.error)));
          else resolve(parsed.candidates?.[0]?.content?.parts?.[0]?.text || "");
        } catch (e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ── Prompts ──────────────────────────────────────────────────────────────────

const SYSTEM_VOICE = `You are Josh Smart, a staff writer at Propped. Propped is for scrappy entrepreneurs, freelancers, founders, and self-employed people who are building something real. Your voice is: direct, sharp, no-BS, millennial-smart. No em dashes. No corporate speak. No sycophancy. Every post should feel like advice from a trusted friend who's been in the room.`;

function newsPrompt(title, desc) {
  return `${SYSTEM_VOICE}

You spotted a news story and you're writing a quick Propped take on it.

Story: "${title}"
Details: "${desc.substring(0, 500)}"

Write an original Propped live blog post. Do NOT name the source or publication. Write it as your own reporting through the Propped lens.

Return JSON only — no markdown, no explanation:
{
  "title": "Punchy original headline (10-15 words, for a scrappy entrepreneur audience)",
  "summary": "2-3 tight sentences. Why does this matter to someone building their own thing? Hook them fast. No em dashes.",
  "content": "4-6 sentences going deeper. What's the real implication? What should a freelancer or founder actually do with this? Be specific — use numbers, percentages, or concrete examples where you can. No em dashes.",
  "tags": ["tag1", "tag2", "tag3"]
}`;
}

function thoughtLeaderPrompt(title, desc, context) {
  return `${SYSTEM_VOICE}

You just read something from a well-known thinker in the startup/business world. You're not covering THEIR piece — you're using the topic as a jumping-off point to write your own original take for scrappy entrepreneurs.

Topic signal: "${title}"
Context: "${desc.substring(0, 400)}"
Thematic territory this source covers: ${context}

Write a completely original Propped editorial post on this theme or topic. Do NOT reference any source, publication, person, podcast, or newsletter — not even indirectly ("one founder recently said..." is off-limits). Write as if this is purely your own thinking and observation, grounded in what entrepreneurs are actually experiencing.

Make it actionable and specific. This audience is building real businesses, not just consuming content.

Return JSON only — no markdown, no explanation:
{
  "title": "Original, specific headline for a founder/entrepreneur audience (10-15 words)",
  "summary": "2-3 sentences. Your sharpest insight on this topic, up front. Make them want to keep reading. No em dashes.",
  "content": "5-7 sentences of original thinking. Give them something they can use today. Be concrete — frameworks, numbers, specific moves. End with a forward-looking observation or challenge. No em dashes.",
  "tags": ["tag1", "tag2", "tag3"]
}`;
}

// ── Post generator ───────────────────────────────────────────────────────────

async function generatePost(item, source) {
  const title = (item.title || "").trim();
  const desc  = (item.contentSnippet || item.content || item.summary || "").trim();
  const category = classifyCategory(title, desc, source.category);

  const prompt = source.mode === "thought_leader"
    ? thoughtLeaderPrompt(title, desc, source.context || "startups and entrepreneurship")
    : newsPrompt(title, desc);

  try {
    const raw = await callGemini(prompt);

    // Strip markdown code fences if Gemini wraps JSON
    const cleaned = raw.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const parsed = JSON.parse(jsonMatch[0]);

    const image = pickImage(category);

    return {
      category_slug: category,
      title:         (parsed.title   || title).substring(0, 200),
      summary:       parsed.summary  || desc.substring(0, 300),
      content:       parsed.content  || desc,
      image_url:     image.url,
      image_alt:     (parsed.title   || title).substring(0, 200),
      source_url:    null,
      source_name:   null,  // no attribution — ever
      tags:          Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : [],
      published_at:  new Date().toISOString(),
    };
  } catch (err) {
    console.error(`  AI error for "${title.substring(0, 60)}": ${err.message}`);
    return null;
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`[${new Date().toISOString()}] Propped Live Blog Monitor starting...`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const parser = new RssParser({
    timeout: 10000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ProppedBot/1.0; +https://propped.org)" },
  });

  let totalNew = 0;

  for (const source of SOURCES) {
    try {
      console.log(`  Checking ${source.key}...`);

      // Get last known state
      const { data: stateRow } = await supabase
        .from("live_blog_source_state")
        .select("last_item_guid")
        .eq("source_key", source.key)
        .single();

      const lastGuid = stateRow?.last_item_guid || null;

      // Fetch RSS
      let feed;
      try {
        feed = await parser.parseURL(source.url);
      } catch (rssErr) {
        console.log(`    RSS fail: ${rssErr.message}`);
        continue;
      }

      const items = feed.items || [];
      if (!items.length) { console.log(`    Empty feed`); continue; }

      // Find new items since last run (max 2 per source)
      const newItems = [];
      for (const item of items) {
        const guid = item.guid || item.link || item.title || "";
        if (guid === lastGuid) break;
        newItems.push({ ...item, _guid: guid });
        if (newItems.length >= 2) break;
      }

      if (!newItems.length) {
        console.log(`    No new items`);
        await supabase.from("live_blog_source_state").upsert(
          { source_key: source.key, last_checked: new Date().toISOString() },
          { onConflict: "source_key" }
        );
        continue;
      }

      console.log(`    ${newItems.length} new item(s) — generating...`);

      for (const item of newItems.reverse()) {
        const post = await generatePost(item, source);
        if (!post) continue; // skip if Gemini failed

        const { error } = await supabase.from("live_blog_posts").insert([post]);
        if (error) {
          console.log(`    Insert error: ${error.message}`);
        } else {
          console.log(`    Published: "${post.title.substring(0, 70)}"`);
          totalNew++;
        }

        await new Promise((r) => setTimeout(r, 1500)); // rate limit buffer
      }

      // Save latest guid
      const latestGuid = items[0]?.guid || items[0]?.link || items[0]?.title || null;
      await supabase.from("live_blog_source_state").upsert(
        {
          source_key:     source.key,
          last_item_guid: latestGuid,
          last_item_date: items[0]?.isoDate || null,
          last_checked:   new Date().toISOString(),
        },
        { onConflict: "source_key" }
      );

    } catch (err) {
      console.error(`  Fatal error on ${source.key}:`, err.message);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  // Update category last_updated timestamps
  if (totalNew > 0) {
    await supabase
      .from("live_blog_categories")
      .update({ last_updated: new Date().toISOString() })
      .eq("is_live", true);
  }

  console.log(`[${new Date().toISOString()}] Done. ${totalNew} new post(s) published.`);
}

main().catch((err) => {
  console.error("Monitor fatal error:", err);
  process.exit(1);
});
