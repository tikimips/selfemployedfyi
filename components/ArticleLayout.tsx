import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import { ArrowLeft, Clock } from "lucide-react";
import type { Article } from "@/lib/articles";

const stageColors: Record<string, string> = {
  emerald: "bg-emerald-950/60 border-emerald-800/50 text-emerald-300",
  blue: "bg-blue-950/60 border-blue-800/50 text-blue-300",
  amber: "bg-amber-950/60 border-amber-800/50 text-amber-300",
  red: "bg-red-950/60 border-red-800/50 text-red-300",
};

interface ArticleLayoutProps {
  article: Article;
  children: React.ReactNode;
}

export default function ArticleLayout({ article, children }: ArticleLayoutProps) {
  const colorClass = stageColors[article.stageColor] ?? stageColors.emerald;

  return (
    <div className="min-h-screen bg-slate-950">
      <Nav />

      <article className="max-w-2xl mx-auto px-4 py-12">

        {/* Back */}
        <Link
          href="/field"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Field Guide
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center border text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
              {article.stageLabel}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} />
              {article.readTime} min read
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {article.description}
          </p>
          <div className="mt-6 border-t border-slate-800" />
        </header>

        {/* Body */}
        <div className="article-body space-y-5 text-[17px] leading-relaxed text-slate-300">
          {children}
        </div>

      </article>

      <Footer />
    </div>
  );
}
