import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import TrueHourlyCalculator from "@/components/TrueHourlyCalculator";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "True Hourly Rate Calculator — What Do You Actually Make?",
  description:
    "Find your real hourly rate as a freelancer or self-employed person. After taxes, business expenses, and unpaid admin time — most freelancers earn 40–60% less than their billing rate suggests.",
  keywords: [
    "true hourly rate calculator freelancer",
    "what do I actually make self-employed",
    "freelance effective hourly rate",
    "real hourly rate after taxes",
    "freelancer hourly rate calculator",
    "self-employed true income calculator",
  ],
  alternates: {
    canonical: "https://selfemployedfyi.com/calculators/true-hourly-rate",
  },
  openGraph: {
    title: "True Hourly Rate Calculator — What Do You Actually Make?",
    description:
      "You charge $100/hr. After taxes, overhead, and unpaid time — what are you really making? Find out in 60 seconds.",
  },
};

export default function TrueHourlyPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a true hourly rate for freelancers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your true hourly rate is what you actually take home per hour worked — after accounting for taxes, business expenses, and all unpaid time (admin, emails, invoicing, proposals). Most freelancers find their true rate is 40–60% lower than their billing rate.",
        },
      },
      {
        "@type": "Question",
        name: "Why is my real hourly rate so much lower than what I charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Three things eat your billing rate: taxes (self-employment tax is 15.3% on top of income tax), business expenses (software, equipment, insurance), and unpaid time. For every billable hour, most freelancers spend 20–50 minutes on emails, proposals, invoicing, and admin that they never charge for.",
        },
      },
      {
        "@type": "Question",
        name: "How can I increase my true hourly rate as a freelancer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Three levers: (1) Raise your billing rate — every dollar increase goes directly to take-home after tax. (2) Cut unpaid admin hours — use templates, automation, and better client boundaries to reduce non-billable time. (3) Reduce your tax burden — consider S-corp election if your net profit exceeds $60K, max out retirement contributions, and track every deduction.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            Most freelancers make 40–60% less than they think
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            What do you{" "}
            <span className="text-emerald-400">actually</span> make per hour?
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Your billing rate isn't your real rate. After taxes, overhead, and all the hours
            you never invoice for — the number is usually a lot lower. Find out exactly where yours lands.
          </p>
        </div>
      </section>

      <TrueHourlyCalculator />

      {/* FAQ */}
      <section className="border-t border-slate-800/50 py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-8">Common questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is a 'true hourly rate' and why does it matter?",
                a: "Your true hourly rate is what you actually take home per hour of your life spent working — after taxes, expenses, and all unpaid time. It matters because most freelancers are optimizing for their billing rate when they should be optimizing for their true rate. A $200/hr consultant working 60 hours a week with high overhead can have a lower true rate than a $80/hr freelancer with lean expenses and a 35-hour week.",
              },
              {
                q: "Why do taxes hit freelancers so much harder?",
                a: "Two reasons. First, self-employment tax: you pay both the employer and employee share of Social Security and Medicare — 15.3% on top of income tax. Second, no withholding: employees have taxes pulled from each paycheck automatically. Freelancers have to set aside the money themselves and pay quarterly. Many get to the end of the year surprised by how much they owe.",
              },
              {
                q: "How many hours of admin time is normal for a freelancer?",
                a: "Research suggests freelancers spend 20–35% of their working time on non-billable activities — email, invoicing, proposals, client calls, marketing, bookkeeping. For someone working 45 hours a week, that's 9–16 hours per week of unpaid time. Over a year, that's 450–800 hours of invisible work.",
              },
              {
                q: "What's the fastest way to increase my true hourly rate?",
                a: "The fastest lever is raising your billing rate — it has an immediate, compounding effect on take-home with no extra hours required. The second lever is cutting admin time through better tools and processes (contract templates, automated invoicing, better onboarding). The third is tax optimization: tracking every deduction, contributing to a SEP IRA or Solo 401(k), and considering S-corp election if your net profit exceeds $60–80K.",
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
            For educational purposes only. Not financial or tax advice.
          </p>
        </div>
      </footer>
    </main>
  );
}
