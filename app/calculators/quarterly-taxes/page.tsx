import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import QuarterlyTaxCalculator from "@/components/QuarterlyTaxCalculator";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Quarterly Tax Estimator — How Much Do I Owe?",
  description:
    "Free quarterly estimated tax calculator for self-employed people, freelancers, and 1099 contractors. Find out exactly how much to pay by April 15, June 16, September 15, and January 15.",
  keywords: [
    "quarterly estimated tax calculator",
    "how much self-employment tax do I owe",
    "1099 quarterly tax calculator",
    "freelancer estimated tax",
    "self-employed quarterly tax payment",
    "quarterly tax deadline 2026",
  ],
  alternates: {
    canonical: "https://selfemployedfyi.com/calculators/quarterly-taxes",
  },
  openGraph: {
    title: "Quarterly Tax Estimator — How Much Do I Owe?",
    description:
      "Find out exactly how much to send the IRS each quarter. Free calculator for freelancers and the self-employed.",
  },
};

export default function QuarterlyTaxesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Who has to pay quarterly estimated taxes?", acceptedAnswer: { "@type": "Answer", text: "Anyone who expects to owe at least $1,000 in federal taxes for the year and doesn't have an employer withholding taxes — including freelancers, independent contractors, sole proprietors, and LLC owners." } },
      { "@type": "Question", name: "What are the 2026 quarterly tax deadlines?", acceptedAnswer: { "@type": "Answer", text: "Q1 (Jan–Mar): April 15, 2026. Q2 (Apr–May): June 16, 2026. Q3 (Jun–Aug): September 15, 2026. Q4 (Sep–Dec): January 15, 2027." } },
      { "@type": "Question", name: "What is self-employment tax and why is it 15.3%?", acceptedAnswer: { "@type": "Answer", text: "Self-employment tax covers Social Security (12.4%) and Medicare (2.9%) — taxes an employer and employee would normally split. When you're self-employed, you pay both sides. It applies to 92.35% of your net self-employment income." } },
      { "@type": "Question", name: "How much should I set aside for quarterly taxes?", acceptedAnswer: { "@type": "Answer", text: "Most self-employed people earning $50K–$200K net should set aside 25–30% of every payment received. Move it to a separate savings account immediately so it's there when quarterly deadlines hit." } },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">FH</span>
            </div>
            <span className="font-bold text-white">Freehold</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            Back to tools
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-12 pb-2 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Q1 deadline: April 15, 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            How much do I owe in{" "}
            <span className="text-emerald-400">quarterly taxes?</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Enter your expected income and expenses. Get your exact quarterly payment,
            the right set-aside percentage, and your full 2026 payment schedule.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <QuarterlyTaxCalculator />

      {/* FAQ — structured for AI Overviews */}
      <section className="border-t border-slate-800/50 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-8">Common questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Who has to pay quarterly estimated taxes?",
                a: "Anyone who expects to owe at least $1,000 in federal taxes for the year and doesn't have an employer withholding taxes. This includes freelancers, independent contractors, sole proprietors, LLC owners, and anyone with significant 1099 income.",
              },
              {
                q: "What are the 2026 quarterly tax deadlines?",
                a: "Q1 (Jan–Mar): April 15, 2026. Q2 (Apr–May): June 16, 2026. Q3 (Jun–Aug): September 15, 2026. Q4 (Sep–Dec): January 15, 2027. Missing a deadline triggers an underpayment penalty from the IRS.",
              },
              {
                q: "What happens if I miss a quarterly tax payment?",
                a: "The IRS charges an underpayment penalty — currently around 8% annualized on the amount you should have paid. It's not a huge amount but it adds up. You can avoid it entirely by paying at least 90% of this year's tax or 100% of last year's tax (110% if your income is over $150K).",
              },
              {
                q: "What is self-employment tax and why is it 15.3%?",
                a: "Self-employment tax covers Social Security (12.4%) and Medicare (2.9%) — the same taxes an employer and employee would split. When you work for yourself, you pay both sides. The 15.3% applies to 92.35% of your net self-employment income (a small adjustment the IRS allows). You can deduct half of your SE tax on your income tax return.",
              },
              {
                q: "How much of each payment should I set aside for taxes?",
                a: "A safe rule for most self-employed people earning $50K–$200K net is to set aside 25–30% of every payment you receive. Move this into a separate savings account immediately — treat it as gone. When quarterly deadlines hit, the money is already there.",
              },
              {
                q: "Does this calculator include state income tax?",
                a: "No — this calculator covers federal self-employment tax and federal income tax only. Most states also charge income tax (California tops out at 13.3%). Add another 5–10% on top of your federal estimate depending on your state.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-800 pb-6">
                <h3 className="text-sm font-semibold text-white mb-2">{q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-black">FH</span>
            </div>
            <span className="text-slate-500 text-sm font-medium">Freehold</span>
          </Link>
          <p className="text-xs text-slate-600 text-center">
            For educational purposes only. Not tax or financial advice. Consult a tax professional.
          </p>
        </div>
      </footer>
    </main>
  );
}
