import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { articles } from "@/lib/articles";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "The Field Guide — Guides for People Who Work for Themselves",
  description:
    "Plain-language guides on taxes, business structure, retirement, mortgages, and everything else that hits when you work for yourself. No jargon. No fluff.",
  alternates: { canonical: "https://selfemployedfyi.com/field" },
};

const stageColors: Record<string, string> = {
  emerald: "bg-emerald-950/60 border-emerald-800/50 text-emerald-300",
  blue: "bg-blue-950/60 border-blue-800/50 text-blue-300",
  amber: "bg-amber-950/60 border-amber-800/50 text-amber-300",
  red: "bg-red-950/60 border-red-800/50 text-red-300",
};

export default function FieldPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Nav />

      {/* Header */}
      <section className="pt-14 pb-10 px-4 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            Field Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Everything you need to know about running your own thing.
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            No jargon. No fluff. Real answers for freelancers, founders, and anyone who decided a W2 wasn't for them.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Stage: Starting Out */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Starting Out</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {articles.filter((a) => a.stage === "start").map((article) => (
                <Link
                  key={article.slug}
                  href={`/field/${article.slug}`}
                  className="group bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${stageColors[article.stageColor]}`}>
                      {article.stageLabel}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-600">
                      <Clock size={11} />
                      {article.readTime} min
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{article.description}</p>
                  <span className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-emerald-400 transition-colors font-medium">
                    Read guide <ArrowRight size={12} />
                  </span>
                </Link>
              ))}

              {/* Coming soon cards */}
              {["Quarterly Taxes: A Plain-English Guide", "What Expenses Can I Actually Deduct?"].map((title) => (
                <div key={title} className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-5 opacity-50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-slate-800 border-slate-700 text-slate-500">
                      Starting Out
                    </span>
                    <span className="text-xs text-slate-700">Coming soon</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-600 mb-2 leading-snug">{title}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Stage: Getting Stable */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Getting Stable</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Health Insurance for Freelancers (Without Losing Your Mind)", "How to Pay Yourself as an LLC Owner", "The Home Office Deduction: What Actually Qualifies"].map((title) => (
                <div key={title} className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-5 opacity-50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-blue-950/40 border-blue-800/40 text-blue-500">
                      Getting Stable
                    </span>
                    <span className="text-xs text-slate-700">Coming soon</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-600 mb-2 leading-snug">{title}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Stage: Building Wealth */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Building Wealth</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {["SEP IRA vs Solo 401(k): Which One Should You Open?", "S-Corp Election: When It Actually Saves You Money", "Self-Employed Mortgages: How to Qualify When You Write Off Everything"].map((title) => (
                <div key={title} className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-5 opacity-50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-amber-950/40 border-amber-800/40 text-amber-500">
                      Building Wealth
                    </span>
                    <span className="text-xs text-slate-700">Coming soon</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-600 mb-2 leading-snug">{title}</h2>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
