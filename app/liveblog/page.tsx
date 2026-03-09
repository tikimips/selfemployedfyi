import { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getLiveBlogCategories, LiveBlogCategory } from "@/lib/supabase";

const BASE_URL = "https://selfemployedfyi.com";

export const metadata: Metadata = {
  title: "Live Blog — Real-Time News for the Self-Employed",
  description:
    "Live updates on stocks, interest rates, taxes, and the economy — curated for freelancers, founders, and the self-employed. Updated in real time.",
  alternates: {
    canonical: `${BASE_URL}/liveblog`,
  },
  openGraph: {
    title: "Live Blog — Freehold",
    description:
      "Real-time news for people who work for themselves. Stocks, rates, taxes, and the economy — through the lens of the self-employed.",
    url: `${BASE_URL}/liveblog`,
    type: "website",
  },
};

const COLOR_MAP: Record<string, { bg: string; border: string; dot: string; badge: string }> = {
  emerald: {
    bg: "hover:border-emerald-700/60",
    border: "border-slate-800",
    dot: "bg-emerald-400",
    badge: "bg-emerald-950/50 border-emerald-800/50 text-emerald-300",
  },
  blue: {
    bg: "hover:border-blue-700/60",
    border: "border-slate-800",
    dot: "bg-blue-400",
    badge: "bg-blue-950/50 border-blue-800/50 text-blue-300",
  },
  amber: {
    bg: "hover:border-amber-700/60",
    border: "border-slate-800",
    dot: "bg-amber-400",
    badge: "bg-amber-950/50 border-amber-800/50 text-amber-300",
  },
  green: {
    bg: "hover:border-green-700/60",
    border: "border-slate-800",
    dot: "bg-green-400",
    badge: "bg-green-950/50 border-green-800/50 text-green-300",
  },
  purple: {
    bg: "hover:border-purple-700/60",
    border: "border-slate-800",
    dot: "bg-purple-400",
    badge: "bg-purple-950/50 border-purple-800/50 text-purple-300",
  },
  slate: {
    bg: "hover:border-slate-600",
    border: "border-slate-800",
    dot: "bg-slate-400",
    badge: "bg-slate-800/50 border-slate-700/50 text-slate-300",
  },
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function LiveBlogPage() {
  let categories: LiveBlogCategory[] = [];
  try {
    categories = await getLiveBlogCategories();
  } catch (_) {
    // fallback handled below
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/liveblog`,
    name: "Freehold Live Blog",
    description:
      "Real-time news and analysis for freelancers, founders, and the self-employed. Stocks, rates, taxes, and the economy — updated as it happens.",
    url: `${BASE_URL}/liveblog`,
    publisher: {
      "@type": "Organization",
      name: "Freehold",
      url: BASE_URL,
    },
    inLanguage: "en-US",
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Nav />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pt-16 pb-10 px-4 border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Live Blog
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Real-time news on stocks, rates, taxes, and the economy — curated for freelancers,
            founders, and anyone who works for themselves.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
            Choose a live blog
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const c = COLOR_MAP[cat.color] || COLOR_MAP.slate;
              return (
                <Link
                  key={cat.slug}
                  href={`/liveblog/${cat.slug}`}
                  className={`group relative bg-slate-900 border ${c.border} ${c.bg} rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30`}
                >
                  {/* Live indicator */}
                  {cat.is_live && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-75`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`} />
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live</span>
                    </div>
                  )}

                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge}`}
                    >
                      View live updates →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-20 text-slate-600">
              <p className="text-lg">Loading live blogs…</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
