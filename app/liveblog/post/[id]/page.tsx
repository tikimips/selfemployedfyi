"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const COLOR_MAP: Record<string, { dot: string; badge: string }> = {
  emerald: { dot: "bg-emerald-400", badge: "bg-emerald-950/50 border-emerald-800/50 text-emerald-300" },
  blue:    { dot: "bg-blue-400",    badge: "bg-blue-950/50 border-blue-800/50 text-blue-300"         },
  amber:   { dot: "bg-amber-400",   badge: "bg-amber-950/50 border-amber-800/50 text-amber-300"      },
  green:   { dot: "bg-green-400",   badge: "bg-green-950/50 border-green-800/50 text-green-300"      },
  purple:  { dot: "bg-purple-400",  badge: "bg-purple-950/50 border-purple-800/50 text-purple-300"   },
  slate:   { dot: "bg-slate-400",   badge: "bg-slate-800/50 border-slate-700/50 text-slate-300"      },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function PostPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);

      // Fetch post
      const { data: postData, error: postErr } = await supabase
        .from("live_blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (postErr || !postData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(postData);

      // Fetch category + related in parallel
      const [catRes, relRes] = await Promise.all([
        supabase
          .from("live_blog_categories")
          .select("*")
          .eq("slug", postData.category_slug)
          .single(),
        supabase
          .from("live_blog_posts")
          .select("id, title, image_url, published_at")
          .eq("category_slug", postData.category_slug)
          .neq("id", id)
          .order("published_at", { ascending: false })
          .limit(3),
      ]);

      if (catRes.data) setCategory(catRes.data);
      if (relRes.data) setRelated(relRes.data);

      setLoading(false);
    }

    load();
  }, [id]);

  const c = COLOR_MAP[category?.color || "slate"];

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Nav />
        <div className="max-w-2xl mx-auto px-4 pt-16 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-900 rounded-xl h-8 animate-pulse" style={{ width: `${70 + i * 7}%` }} />
          ))}
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Nav />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-2xl mb-2">📰</p>
          <p className="text-slate-400">Post not found.</p>
          <Link href="/liveblog" className="text-emerald-400 hover:text-emerald-300 mt-4 inline-block text-sm">
            ← Back to Live Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Nav />

      <article className="max-w-2xl mx-auto px-4 pt-10 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 flex-wrap">
          <Link href="/liveblog" className="hover:text-slate-300 transition-colors">Live Blog</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/liveblog/${post.category_slug}`} className="hover:text-slate-300 transition-colors">
                {category.icon} {category.name}
              </Link>
            </>
          )}
        </div>

        {/* Badge + time */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {category && (
            <Link href={`/liveblog/${post.category_slug}`}>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer hover:opacity-80 transition-opacity ${c.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                {category.icon} {category.name}
              </span>
            </Link>
          )}
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock size={11} />
            {timeAgo(post.published_at)}
          </span>
          {post.source_name && ["Josh Smart"].includes(post.source_name) && (
            <span className="text-xs text-slate-500">by {post.source_name}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
          {post.title}
        </h1>

        {/* Summary */}
        {post.summary && (
          <p className="text-lg text-slate-300 leading-relaxed mb-6 border-l-2 border-slate-700 pl-4">
            {post.summary}
          </p>
        )}

        {/* Hero image */}
        {post.image_url && (
          <div className="rounded-xl overflow-hidden mb-8 aspect-video bg-slate-800">
            <img
              src={post.image_url}
              alt={post.image_alt || post.title}
              className="w-full h-full object-cover"
              width={1200}
              height={675}
            />
          </div>
        )}

        {/* Content */}
        {post.content && post.content !== post.summary && (
          <div className="text-slate-300 leading-relaxed space-y-4 mb-8 text-[15px]">
            {post.content.split("\n\n").filter(Boolean).map((para: string, i: number) => (
              <p key={i}>{para.replace(/\n/g, " ")}</p>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* No external source link — posts are original Freehold content */}

        {/* Back */}
        <div className="border-t border-slate-800 pt-8">
          <Link
            href={`/liveblog/${post.category_slug}`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            {category ? `Back to ${category.name}` : "Back to live blog"}
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-slate-800/50 py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              More from {category?.name || "Live Blog"}
            </p>
            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/liveblog/post/${r.id}`}
                  className="flex items-start gap-3 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-all group"
                >
                  {r.image_url && (
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 hidden sm:block">
                      <img src={r.image_url} alt={r.title} className="w-full h-full object-cover" width={64} height={40} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-slate-200 transition-colors">
                      {r.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{timeAgo(r.published_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
