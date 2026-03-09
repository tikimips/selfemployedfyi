"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

interface Post {
  id: string;
  category_slug: string;
  title: string;
  summary: string;
  image_url: string;
  source_name: string;
  published_at: string;
  category?: {
    name: string;
    icon: string;
    color: string;
    slug: string;
  };
}

const COLOR_DOT: Record<string, string> = {
  emerald: "bg-emerald-400",
  blue:    "bg-blue-400",
  amber:   "bg-amber-400",
  green:   "bg-green-400",
  purple:  "bg-purple-400",
  slate:   "bg-slate-400",
};

const COLOR_BADGE: Record<string, string> = {
  emerald: "bg-emerald-950/60 border-emerald-800/60 text-emerald-300",
  blue:    "bg-blue-950/60 border-blue-800/60 text-blue-300",
  amber:   "bg-amber-950/60 border-amber-800/60 text-amber-300",
  green:   "bg-green-950/60 border-green-800/60 text-green-300",
  purple:  "bg-purple-950/60 border-purple-800/60 text-purple-300",
  slate:   "bg-slate-800/60 border-slate-700/60 text-slate-300",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function LiveBlogWidget() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [hasNew, setHasNew] = useState(false);

  const fetchPosts = useCallback(async (isManual = false) => {
    try {
      const res = await fetch("/api/liveblog/posts?limit=5", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const data: Post[] = await res.json();
      setPosts((prev) => {
        if (prev.length > 0 && data.length > 0 && data[0]?.id !== prev[0]?.id) {
          setHasNew(true);
        }
        return data;
      });
      setLastUpdated(new Date());
      if (isManual) setHasNew(false);
    } catch (_) {
      // silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPosts();
    // Poll every 90 seconds
    const interval = setInterval(() => fetchPosts(), 90000);
    return () => clearInterval(interval);
  }, [fetchPosts]);

  return (
    <section className="py-12 px-4 border-t border-slate-800/50" aria-label="Live Blog Widget">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Live</p>
            <p className="text-xs font-bold text-white">Blog</p>
            {hasNew && (
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-semibold animate-pulse">
                New updates
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-xs text-slate-600 hidden sm:block">
                Updated {timeAgo(lastUpdated.toISOString())}
              </span>
            )}
            <button
              onClick={() => fetchPosts(true)}
              className="text-slate-600 hover:text-slate-300 transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw size={13} />
            </button>
            <Link
              href="/liveblog"
              className="hidden sm:flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              All live blogs <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Posts list */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-500 text-sm">Live updates coming soon — check back shortly.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post, i) => {
              const color = post.category?.color || "slate";
              const dot = COLOR_DOT[color] || COLOR_DOT.slate;
              const badge = COLOR_BADGE[color] || COLOR_BADGE.slate;
              const slug = post.category?.slug || post.category_slug;

              return (
                <Link
                  key={post.id}
                  href={`/liveblog/post/${post.id}`}
                  className="flex items-start gap-4 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-all group"
                >
                  {/* Thumbnail */}
                  {post.image_url && (
                    <div className="hidden sm:block flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden bg-slate-800">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                        width={80}
                        height={45}
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {post.category && (
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>
                          <span className={`w-1 h-1 rounded-full ${dot}`} />
                          {post.category.icon} {post.category.name}
                        </span>
                      )}
                      {i === 0 && (
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-slate-200 transition-colors">
                      {post.title}
                    </p>
                    {post.summary && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{post.summary}</p>
                    )}
                  </div>

                  <div className="flex-shrink-0 text-right hidden sm:block">
                    <p className="text-xs text-slate-600">{timeAgo(post.published_at)}</p>
                    {post.source_name && (
                      <p className="text-[10px] text-slate-700 mt-0.5">{post.source_name}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-4 flex justify-end sm:hidden">
          <Link
            href="/liveblog"
            className="flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            All live blogs <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* SEO: static structured data for crawlers */}
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Freehold Live Blog — Recent Updates",
              url: "https://selfemployedfyi.com/liveblog",
              itemListElement: posts.map((p, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                item: {
                  "@type": "BlogPosting",
                  headline: p.title,
                  description: p.summary,
                  datePublished: p.published_at,
                  url: `https://selfemployedfyi.com/liveblog/${p.category_slug}`,
                  author: { "@type": "Organization", name: "Freehold" },
                },
              })),
            }),
          }}
        />
      )}
    </section>
  );
}
