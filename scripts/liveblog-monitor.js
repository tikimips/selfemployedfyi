#!/usr/bin/env node
/**
 * Freehold Live Blog Monitor
 * Monitors financial news RSS feeds, writes original Freehold posts via Gemini,
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

const SUPABASE_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const GEMINI_API_KEY   = process.env.GEMINI_API_KEY || "AIzaSyBOzWBN4yt5NaFHLbPBNATHCzSEBHv05Fs";

// ── RSS Sources ──────────────────────────────────────────────────────────────
const SOURCES = [
  { key: "cnbc-markets",     url: "https://www.cnbc.com/id/10000664/device/rss/rss.html",                       category: "economy"    },
  { key: "cnbc-investing",   url: "https://www.cnbc.com/id/15839069/device/rss/rss.html",                       category: "stockcheck" },
  { key: "yahoo-finance",    url: "https://finance.yahoo.com/news/rssindex",                                     category: "stockcheck" },
  { key: "yahoo-bizfin",     url: "https://finance.yahoo.com/rss/topstories",                                    category: "moneymoves" },
  { key: "entrepreneur",     url: "https://www.entrepreneur.com/latest.rss",                                     category: "bizbuzz"    },
  { key: "inc",              url: "https://www.inc.com/rss.html",                                                category: "bizbuzz"    },
  { key: "forbes-investing", url: "https://www.forbes.com/investing/feed2/",                                     category: "stockcheck" },
  { key: "investopedia",     url: "https://www.investopedia.com/feedbuilder/feed/getfeed?feedName=rss_headline", category: "moneymoves" },
  { key: "thestreet",        url: "https://www.thestreet.com/.rss/full/",                                        category: "stockcheck" },
  { key: "marketwatch",      url: "https://feeds.marketwatch.com/marketwatch/topstories/",                       category: "economy"    },
  { key: "marketwatch-real", url: "https://feeds.marketwatch.com/marketwatch/realtimeheadlines/",                category: "stockcheck" },
  { key: "kiplinger",        url: "https://www.kiplinger.com/rss/channel/news",                                  category: "ratewatch"  },
  { key: "taxfoundation",    url: "https://taxfoundation.org/feed/",                                             category: "taxtalk"    },
  { key: "irs",              url: "https://www.irs.gov/newsroom/irs-news.rss",                                   category: "taxtalk"    },
  { key: "nerdwallet",       url: "https://www.nerdwallet.com/blog/feed/",                                       category: "moneymoves" },
  { key: "bankrate",         url: "https://www.bankrate.com/rss/",                                               category: "ratewatch"  },
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
    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject(new Error(parsed.error.message));
          else resolve(parsed.candidates?.[0]?.content?.parts?.[0]?.text || "");
        } catch (e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function generatePost(item, defaultCategory) {
  const title = (item.title || "").trim();
  const desc  = (item.contentSnippet || item.content || item.summary || "").trim();
  const category = classifyCategory(title, desc, defaultCategory);

  const prompt = `You are Josh Smart, a staff writer at Freehold — a platform for freelancers, founders, and the self-employed. You just spotted a news story and are writing an original Freehold post inspired by it.

Topic inspiration: "${title}"
Context: "${desc.substring(0, 400)}"

Write an ORIGINAL Freehold live blog post from scratch. Do NOT mention where you saw this story. Do NOT mention the original source or publication. Write as if you discovered this yourself and are reporting it through the Freehold lens.

Style rules:
- Direct, conversational, millennial-smart
- No em dashes (use commas or periods instead)
- No corporate speak
- Always connect to what it means for freelancers, founders, or self-employed people
- Be specific, use numbers where relevant
- Punchy headline, not clickbait

Return JSON only:
{
  "title": "Your original headline (10-15 words, grabs attention)",
  "summary": "2-3 sentences that hook the reader and explain why this matters to self-employed people. No em dashes.",
  "content": "4-6 sentences with your original take. Go deeper. What should freelancers actually do with this information? Be concrete. No em dashes.",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  try {
    const raw = await callGemini(prompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
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
      source_url:    null,          // never store source URL
      source_name:   "Josh Smart",  // always our writer
      tags:          Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : [],
      published_at:  new Date().toISOString(), // current time, not RSS pubDate
    };
  } catch (err) {
    console.error(`  Gemini error for "${title.substring(0, 60)}": ${err.message}`);
    return null; // skip on failure rather than fallback with raw source content
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`[${new Date().toISOString()}] Freehold Live Blog Monitor starting...`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const parser = new RssParser({
    timeout: 10000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; FreeholdBot/1.0; +https://selfemployedfyi.com)" },
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
        const post = await generatePost(item, source.category);
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
