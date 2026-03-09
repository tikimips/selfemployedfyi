import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { articles } from "@/lib/articles";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "The Field Guide — Guides for People Who Work for Themselves",
  description: "Plain-language guides on taxes, business structure, retirement, health insurance, contracts, and everything else that hits when you work for yourself.",
  alternates: { canonical: "https://propped.org/field" },
};

const stages = [
  { key: "start", label: "Starting Out", color: "text-brand-400", dotColor: "bg-brand-400", badgeColor: "bg-brand-950/60 border-brand-800/50 text-brand-300" },
  { key: "build", label: "Getting Stable", color: "text-blue-400", dotColor: "bg-blue-400", badgeColor: "bg-blue-950/60 border-blue-800/50 text-blue-300" },
  { key: "grow", label: "Building Wealth", color: "text-amber-400", dotColor: "bg-amber-400", badgeColor: "bg-amber-950/60 border-amber-800/50 text-amber-300" },
  { key: "optimize", label: "Playing Offense", color: "text-red-400", dotColor: "bg-red-400", badgeColor: "bg-red-950/60 border-red-800/50 text-red-300" },
];

export default function FieldPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />

      {/* Header */}
      <section className="pt-14 pb-10 px-4 border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
            {articles.length} guides published
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Everything you need to know about running your own thing.
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            No jargon. No fluff. Real answers for freelancers, founders, and anyone who decided a W2 wasn't for them.
          </p>
        </div>
      </section>

      {/* Articles by stage */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-14">
          {stages.map((stage) => {
            const stageArticles = articles.filter((a) => a.stage === stage.key);
            if (stageArticles.length === 0) return null;
            return (
              <div key={stage.key}>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs font-bold uppercase tracking-wider ${stage.color}`}>{stage.label}</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {stageArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/field/${article.slug}`}
                      className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${stage.badgeColor}`}>
                          {stage.label}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-600">
                          <Clock size={11} />
                          {article.readTime} min
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-brand-300 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-2">{article.description}</p>
                      <span className="flex items-center gap-1 text-xs text-zinc-600 group-hover:text-brand-400 transition-colors font-medium">
                        Read guide <ArrowRight size={12} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
