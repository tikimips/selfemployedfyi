import { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getLiveBlogPost, getLiveBlogPosts } from "@/lib/supabase";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { notFound } from "next/navigation";

const BASE_URL = "https://selfemployedfyi.com";
export const revalidate = 300;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getLiveBlogPost(params.id);
  if (!post) return { title: "Post Not Found | Freehold" };
  return {
    title: `${post.title} | Freehold Live Blog`,
    description: post.summary,
    alternates: { canonical: `${BASE_URL}/liveblog/post/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${BASE_URL}/liveblog/post/${post.id}`,
      type: "article",
      images: post.image_url ? [{ url: post.image_url, width: 1200, height: 675 }] : [],
    },
  };
}

const COLOR_MAP: Record<string, { dot: string; badge: string; accent: string }> = {
  emerald: { dot: "bg-emerald-400", badge: "bg-emerald-950/50 border-emerald-800/50 text-emerald-300", accent: "text-emerald-400" },
  blue:    { dot: "bg-blue-400",    badge: "bg-blue-950/50 border-blue-800/50 text-blue-300",         accent: "text-blue-400"    },
  amber:   { dot: "bg-amber-400",   badge: "bg-amber-950/50 border-amber-800/50 text-amber-300",      accent: "text-amber-400"   },
  green:   { dot: "bg-green-400",   badge: "bg-green-950/50 border-green-800/50 text-green-300",      accent: "text-green-400"   },
  purple:  { dot: "bg-purple-400",  badge: "bg-purple-950/50 border-purple-800/50 text-purple-300",   accent: "text-purple-400"  },
  slate:   { dot: "bg-slate-400",   badge: "bg-slate-800/50 border-slate-700/50 text-slate-300",      accent: "text-slate-400"   },
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

export default async function PostPage({ params }: Props) {
  const post = await getLiveBlogPost(params.id);
  if (!post) notFound();

  const c = COLOR_MAP[post.category?.color || "slate"];
  const catSlug = post.category_slug;

  // Related posts from same category
  let related = await getLiveBlogPosts(catSlug, 4);
  related = related.filter((p) => p.id !== post.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.published_at,
    dateModified: post.published_at,
    url: `${BASE_URL}/liveblog/post/${post.id}`,
    image: post.image_url ? { "@type": "ImageObject", url: post.image_url, width: 1200, height: 675 } : undefined,
    author: { "@type": "Organization", name: "Freehold" },
    publisher: { "@type": "Organization", name: "Freehold", url: BASE_URL },
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Nav />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-2xl mx-auto px-4 pt-10 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/liveblog" className="hover:text-slate-300 transition-colors">Live Blog</Link>
          <span>/</span>
          {post.category && (
            <>
              <Link href={`/liveblog/${catSlug}`} className="hover:text-slate-300 transition-colors">
                {post.category.icon} {post.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-slate-600 truncate max-w-[200px]">{post.title.slice(0, 40)}…</span>
        </div>

        {/* Category badge + time */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {post.category && (
            <Link href={`/liveblog/${catSlug}`}>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer hover:opacity-80 transition-opacity ${c.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                {post.category.icon} {post.category.name}
              </span>
            </Link>
          )}
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock size={11} />
            {timeAgo(post.published_at)}
          </span>
          {post.source_name && (
            <span className="text-xs text-slate-600">Via {post.source_name}</span>
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
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed space-y-4 mb-8">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para.replace(/\n/g, " ")}</p>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Source link */}
        {post.source_url && (
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 border border-slate-800 hover:border-slate-600 rounded-lg px-4 py-2.5 transition-all mb-10"
          >
            <ExternalLink size={14} />
            Read full story on {post.source_name || "source"}
          </a>
        )}

        {/* Back to category */}
        <div className="border-t border-slate-800 pt-8">
          <Link
            href={`/liveblog/${catSlug}`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            {post.category ? `Back to ${post.category.name}` : "Back to live blog"}
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-slate-800/50 py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              More from {post.category?.name || "Live Blog"}
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
