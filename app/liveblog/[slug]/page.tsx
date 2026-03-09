import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getLiveBlogCategories, getLiveBlogPosts, LiveBlogPost } from "@/lib/supabase";
import { ArrowLeft, ExternalLink } from "lucide-react";

const BASE_URL = "https://selfemployedfyi.com";

export const revalidate = 60; // ISR: revalidate every 60s

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const categories = await getLiveBlogCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const categories = await getLiveBlogCategories();
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) return { title: "Live Blog | Freehold" };

    const title = `${cat.name} — Live Blog | Freehold`;
    const desc = cat.description;
    const url = `${BASE_URL}/liveblog/${cat.slug}.htm`;

    return {
      title,
      description: desc,
      alternates: { canonical: url },
      openGraph: {
        title,
        description: desc,
        url,
        type: "website",
        siteName: "Freehold",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: desc,
      },
    };
  } catch {
    return { title: "Live Blog | Freehold" };
  }
}

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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const COLOR_MAP: Record<string, { dot: string; badge: string; accent: string }> = {
  emerald: { dot: "bg-emerald-400", badge: "bg-emerald-950/50 border-emerald-800/50 text-emerald-300", accent: "text-emerald-400" },
  blue:    { dot: "bg-blue-400",    badge: "bg-blue-950/50 border-blue-800/50 text-blue-300",         accent: "text-blue-400"    },
  amber:   { dot: "bg-amber-400",   badge: "bg-amber-950/50 border-amber-800/50 text-amber-300",      accent: "text-amber-400"   },
  green:   { dot: "bg-green-400",   badge: "bg-green-950/50 border-green-800/50 text-green-300",      accent: "text-green-400"   },
  purple:  { dot: "bg-purple-400",  badge: "bg-purple-950/50 border-purple-800/50 text-purple-300",   accent: "text-purple-400"  },
  slate:   { dot: "bg-slate-400",   badge: "bg-slate-800/50 border-slate-700/50 text-slate-300",      accent: "text-slate-400"   },
};

export default async function LiveBlogCategoryPage({ params }: Props) {
  let categories: any[] = [];
  let posts: LiveBlogPost[] = [];
  let cat: any = null;

  try {
    categories = await getLiveBlogCategories();
    cat = categories.find((c) => c.slug === params.slug);
    posts = await getLiveBlogPosts(params.slug, 50);
  } catch (_) {}

  if (!cat) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Nav />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-slate-400">Live blog not found.</p>
          <Link href="/liveblog" className="text-emerald-400 hover:text-emerald-300 mt-4 inline-block">
            ← Back to Live Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const c = COLOR_MAP[cat.color] || COLOR_MAP.slate;
  const canonicalUrl = `${BASE_URL}/liveblog/${cat.slug}.htm`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LiveBlogPosting",
    "@id": canonicalUrl,
    headline: `${cat.name} — Live Blog`,
    description: cat.description,
    url: canonicalUrl,
    datePublished: cat.created_at,
    dateModified: cat.last_updated || new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Freehold",
      url: BASE_URL,
    },
    coverageStartTime: cat.created_at,
    coverageEndTime: new Date(Date.now() + 86400000 * 365).toISOString(),
    liveBlogUpdate: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.summary,
      url: canonicalUrl,
      datePublished: p.published_at,
      image: p.image_url
        ? { "@type": "ImageObject", url: p.image_url, width: 1200, height: 675 }
        : undefined,
      author: { "@type": "Organization", name: "Freehold" },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pt-12 pb-8 px-4 border-b border-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/liveblog"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mb-6 transition-colors"
          >
            <ArrowLeft size={12} /> Live Blog
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-75`} />
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${c.dot}`} />
                  </span>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Live</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{cat.name}</h1>
              <p className="text-slate-400 max-w-xl">{cat.description}</p>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-600">
            {posts.length} update{posts.length !== 1 ? "s" : ""} · Last updated{" "}
            {posts[0] ? timeAgo(posts[0].published_at) : "recently"}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.length === 0 && (
            <div className="text-center py-20 text-slate-600">
              <p className="text-2xl mb-2">{cat.icon}</p>
              <p>First update incoming — check back shortly.</p>
            </div>
          )}

          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Image */}
              {post.image_url && (
                <div className="relative w-full aspect-video bg-slate-800">
                  <img
                    src={post.image_url}
                    alt={post.image_alt || post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={675}
                    itemProp="image"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                    {cat.name}
                  </span>
                  {post.source_name && (
                    <span className="text-xs text-slate-600">Via {post.source_name}</span>
                  )}
                  <time
                    className="text-xs text-slate-600 ml-auto"
                    dateTime={post.published_at}
                    itemProp="datePublished"
                    title={formatDate(post.published_at)}
                  >
                    {timeAgo(post.published_at)}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 leading-snug" itemProp="headline">
                  {post.title}
                </h2>

                {/* Summary */}
                {post.summary && (
                  <p className="text-slate-300 text-sm leading-relaxed mb-4" itemProp="description">
                    {post.summary}
                  </p>
                )}

                {/* Content */}
                {post.content && (
                  <div
                    className="text-slate-400 text-sm leading-relaxed space-y-3 prose prose-invert prose-sm max-w-none"
                    itemProp="articleBody"
                    dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>") }}
                  />
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded"
                      >
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
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 mt-4 transition-colors"
                  >
                    <ExternalLink size={11} />
                    Source: {post.source_name || post.source_url}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Other live blogs */}
      <section className="py-10 px-4 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">More live blogs</p>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((other) => other.slug !== cat.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/liveblog/${other.slug}.htm`}
                  className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white transition-all"
                >
                  <span>{other.icon}</span>
                  {other.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
