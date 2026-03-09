#!/usr/bin/env node
/**
 * Freehold Live Blog Monitor
 * Watches financial news RSS feeds, generates Freehold-flavored posts via GPT,
 * and inserts them into Supabase.
 *
 * Run: node scripts/liveblog-monitor.js
 * Cron: every 5 minutes
 */

const https = require("https");
const http = require("http");
const { createClient } = require("@supabase/supabase-js");
const RssParser = require("rss-parser");

// ── Config ──────────────────────────────────────────────────────────────────

// Load .env.local if running directly (not via Next.js)
const path = require("path");
const fs = require("fs");
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

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBOzWBN4yt5NaFHLbPBNATHCzSEBHv05Fs";

// ── RSS Sources ──────────────────────────────────────────────────────────────

const SOURCES = [
  // CNBC
  { key: "cnbc-markets",    name: "CNBC",         url: "https://feeds.nbcnews.com/nbcnews/public/business", category: "stockcheck" },
  { key: "cnbc-finance",    name: "CNBC",         url: "https://www.cnbc.com/id/10000664/device/rss/rss.html", category: "economy" },
  { key: "cnbc-investing",  name: "CNBC",         url: "https://www.cnbc.com/id/15839069/device/rss/rss.html", category: "stockcheck" },
  // Yahoo Finance
  { key: "yahoo-finance",   name: "Yahoo Finance",url: "https://finance.yahoo.com/news/rssindex", category: "stockcheck" },
  { key: "yahoo-bizfin",    name: "Yahoo Finance",url: "https://finance.yahoo.com/rss/topstories", category: "moneymoves" },
  // Entrepreneur
  { key: "entrepreneur",    name: "Entrepreneur", url: "https://www.entrepreneur.com/latest.rss", category: "bizbuzz" },
  // Inc
  { key: "inc",             name: "Inc.",          url: "https://www.inc.com/rss.html", category: "bizbuzz" },
  // Forbes
  { key: "forbes-biz",      name: "Forbes",       url: "https://www.forbes.com/real-time/feed2/", category: "bizbuzz" },
  { key: "forbes-investing",name: "Forbes",       url: "https://www.forbes.com/investing/feed2/", category: "stockcheck" },
  // Investopedia
  { key: "investopedia",    name: "Investopedia", url: "https://www.investopedia.com/feedbuilder/feed/getfeed?feedName=rss_headline", category: "moneymoves" },
  // The Street
  { key: "thestreet",       name: "The Street",   url: "https://www.thestreet.com/.rss/full/", category: "stockcheck" },
  // Barron's
  { key: "barrons",         name: "Barron's",     url: "https://www.barrons.com/xml/rss/3_7510.xml", category: "stockcheck" },
  // MarketWatch
  { key: "marketwatch",     name: "MarketWatch",  url: "https://feeds.marketwatch.com/marketwatch/topstories/", category: "economy" },
  { key: "marketwatch-real",name: "MarketWatch",  url: "https://feeds.marketwatch.com/marketwatch/realtimeheadlines/", category: "stockcheck" },
  // Kiplinger / rates
  { key: "kiplinger",       name: "Kiplinger",    url: "https://www.kiplinger.com/rss/channel/news", category: "ratewatch" },
  // Reuters Business
  { key: "reuters-biz",     name: "Reuters",      url: "https://feeds.reuters.com/reuters/businessNews", category: "economy" },
  // AP Business
  { key: "ap-biz",          name: "AP",           url: "https://rsshub.app/apnews/topics/business", category: "economy" },
  // Tax Foundation
  { key: "taxfoundation",   name: "Tax Foundation",url: "https://taxfoundation.org/feed/", category: "taxtalk" },
  // IRS Newsroom
  { key: "irs",             name: "IRS",          url: "https://www.irs.gov/newsroom/irs-news.rss", category: "taxtalk" },
  // NerdWallet
  { key: "nerdwallet",      name: "NerdWallet",   url: "https://www.nerdwallet.com/blog/feed/", category: "moneymoves" },
  // Bankrate
  { key: "bankrate",        name: "Bankrate",     url: "https://www.bankrate.com/rss/", category: "ratewatch" },
];

// ── Category keyword classifier (fallback) ───────────────────────────────────

const CATEGORY_KEYWORDS = {
  stockcheck: ["stock", "S&P", "nasdaq", "dow", "equity", "shares", "earnings", "IPO", "bull", "bear", "rally", "selloff", "NYSE", "market cap", "dividend", "trading"],
  ratewatch:  ["interest rate", "fed rate", "savings rate", "CD rate", "mortgage rate", "APY", "APR", "Federal Reserve", "FOMC", "yield", "treasury", "bond", "rate hike", "rate cut"],
  taxtalk:    ["tax", "IRS", "deduction", "write-off", "1099", "Schedule C", "self-employment tax", "quarterly tax", "filing", "refund", "audit", "W-2", "capital gains"],
  moneymoves: ["personal finance", "budget", "savings", "debt", "credit score", "401k", "retirement", "investing", "wealth", "net worth", "emergency fund"],
  bizbuzz:    ["small business", "entrepreneur", "startup", "freelance", "freelancer", "founder", "self-employed", "side hustle", "solopreneur", "gig economy", "LLC", "S-corp"],
  economy:    ["GDP", "inflation", "CPI", "unemployment", "jobs", "Fed", "Federal Reserve", "recession", "economic growth", "trade", "tariff", "fiscal"],
};

// ── Curated images per category (Unsplash, 16:9 1200×675) ───────────────────

const CATEGORY_IMAGES = {
  stockcheck: [
    { url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80", alt: "Stock market trading screens showing live market data" },
    { url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=675&fit=crop&q=80", alt: "Financial charts and stock market data" },
    { url: "https://images.unsplash.com/photo-1611095566888-ba07f8d1a66e?w=1200&h=675&fit=crop&q=80", alt: "Stock market graph showing price movements" },
    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80", alt: "Financial data charts and analysis" },
  ],
  ratewatch: [
    { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop&q=80", alt: "Interest rate concept with financial symbols" },
    { url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop&q=80", alt: "Cash and savings representing interest rates" },
    { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=675&fit=crop&q=80", alt: "Bank building representing banking rates" },
  ],
  taxtalk: [
    { url: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=1200&h=675&fit=crop&q=80", alt: "Tax forms and financial documents" },
    { url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=675&fit=crop&q=80", alt: "Calculator and tax documents" },
    { url: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=1200&h=675&fit=crop&q=80", alt: "Tax preparation concept" },
  ],
  moneymoves: [
    { url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop&q=80", alt: "Personal finance and money management" },
    { url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=675&fit=crop&q=80", alt: "Financial planning and money moves" },
    { url: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=1200&h=675&fit=crop&q=80", alt: "Saving and investing concepts" },
  ],
  bizbuzz: [
    { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80", alt: "Entrepreneur working on business" },
    { url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=675&fit=crop&q=80", alt: "Small business owner at laptop" },
    { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop&q=80", alt: "Business meeting and collaboration" },
  ],
  economy: [
    { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80", alt: "Economic data and charts" },
    { url: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&h=675&fit=crop&q=80", alt: "Global economy concept" },
    { url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80", alt: "Economic markets and data" },
  ],
};

// ── Utilities ────────────────────────────────────────────────────────────────

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
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }
  return bestCat;
}

async function httpGet(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(url, { 
      headers: { 
        "User-Agent": "Mozilla/5.0 (compatible; FreeholdBot/1.0; +https://selfemployedfyi.com)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*"
      },
      timeout: 10000
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

async function callGemini(prompt) {
  const systemCtx = `You are the editorial voice of Freehold — a platform for freelancers, founders, and the self-employed. Your job: take a news headline and produce a punchy, relevant live blog update. Style: direct, conversational, millennial-smart. No corporate speak. No em dashes. Write for people who invoice clients, own their own business, pay quarterly taxes. Always connect the story to what it means for the self-employed.`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: systemCtx + "\n\n" + prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
  });

  return new Promise((resolve, reject) => {
    const path = `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const options = {
      hostname: "generativelanguage.googleapis.com",
      path,
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
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function generatePost(item, sourceName, defaultCategory) {
  const title = item.title || "";
  const desc = item.contentSnippet || item.content || item.summary || "";
  const link = item.link || item.guid || "";
  const category = classifyCategory(title, desc, defaultCategory);

  const prompt = `News item from ${sourceName}:
Title: "${title}"
Summary: "${desc.substring(0, 500)}"
URL: ${link}

Generate a Freehold live blog post. Return JSON only with these fields:
{
  "title": "your rewritten headline (punchy, 10-15 words max, relevant to self-employed)",
  "summary": "2-3 sentence lead that explains why this matters to freelancers/founders (no em dashes)",
  "content": "4-6 sentence deeper take. What does this mean for someone who works for themselves? Be specific, mention numbers if relevant. No em dashes.",
  "tags": ["tag1", "tag2", "tag3"] (2-5 relevant tags)
}`;

  try {
    const raw = await callGemini(prompt);
    // Extract JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const parsed = JSON.parse(jsonMatch[0]);
    
    const image = pickImage(category);
    
    return {
      category_slug: category,
      title: parsed.title || title,
      summary: parsed.summary || desc.substring(0, 200),
      content: parsed.content || desc,
      image_url: image.url,
      image_alt: parsed.title || title,
      source_url: link,
      source_name: sourceName,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      published_at: item.isoDate || item.pubDate || new Date().toISOString(),
    };
  } catch (err) {
    console.error(`Gemini error for "${title}":`, err.message);
    // Fallback: use original title/desc without AI
    const image = pickImage(category);
    return {
      category_slug: category,
      title: title.substring(0, 120),
      summary: desc.substring(0, 300),
      content: desc.substring(0, 800),
      image_url: image.url,
      image_alt: title.substring(0, 120),
      source_url: link,
      source_name: sourceName,
      tags: [],
      published_at: item.isoDate || item.pubDate || new Date().toISOString(),
    };
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[${new Date().toISOString()}] Freehold Live Blog Monitor starting...`);
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const parser = new RssParser({
    timeout: 10000,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; FreeholdBot/1.0; +https://selfemployedfyi.com)",
    },
  });

  let totalNew = 0;

  for (const source of SOURCES) {
    try {
      console.log(`  Checking ${source.name} (${source.key})...`);

      // Get last known state
      const { data: stateRow } = await supabase
        .from("live_blog_source_state")
        .select("*")
        .eq("source_key", source.key)
        .single();

      const lastGuid = stateRow?.last_item_guid || null;

      // Fetch RSS
      let feed;
      try {
        feed = await parser.parseURL(source.url);
      } catch (rssErr) {
        console.log(`    RSS fetch failed: ${rssErr.message}`);
        continue;
      }

      const items = feed.items || [];
      if (items.length === 0) {
        console.log(`    No items in feed`);
        continue;
      }

      // Find new items (items since last run)
      const newItems = [];
      for (const item of items) {
        const guid = item.guid || item.link || item.id || item.title;
        if (guid === lastGuid) break; // Stop when we hit the last seen item
        newItems.push({ ...item, _guid: guid });
        if (newItems.length >= 3) break; // Max 3 new posts per source per run
      }

      if (newItems.length === 0) {
        console.log(`    No new items`);
        // Update last_checked
        await supabase
          .from("live_blog_source_state")
          .upsert({ source_key: source.key, last_checked: new Date().toISOString(), last_item_guid: lastGuid }, { onConflict: "source_key" });
        continue;
      }

      console.log(`    Found ${newItems.length} new item(s)`);

      // Process new items (in reverse order so oldest is inserted first)
      for (const item of newItems.reverse()) {
        const post = await generatePost(item, source.name, source.category);
        
        // Insert into Supabase
        const { error } = await supabase.from("live_blog_posts").insert([post]);
        if (error) {
          console.log(`    Insert error: ${error.message}`);
        } else {
          console.log(`    ✓ Posted: "${post.title.substring(0, 60)}..."`);
          totalNew++;
        }

        // Small delay to avoid rate-limiting OpenAI
        await new Promise((r) => setTimeout(r, 1200));
      }

      // Update source state to the latest item's guid
      const latestGuid = items[0]?.guid || items[0]?.link || items[0]?.title || null;
      await supabase
        .from("live_blog_source_state")
        .upsert(
          {
            source_key: source.key,
            last_item_guid: latestGuid,
            last_item_date: items[0]?.isoDate || items[0]?.pubDate || null,
            last_checked: new Date().toISOString(),
          },
          { onConflict: "source_key" }
        );

    } catch (err) {
      console.error(`  Error processing ${source.key}:`, err.message);
    }

    // Brief pause between sources
    await new Promise((r) => setTimeout(r, 500));
  }

  // Update last_updated for active categories
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
