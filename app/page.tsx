import Calculator from "@/components/Calculator";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LiveBlogWidget from "@/components/LiveBlogWidget";
import { articles } from "@/lib/articles";
import { ArrowRight, CheckCircle, TrendingDown, FileText, Users, Clock, TrendingUp } from "lucide-react";

function scrollToCalc() {
  "use client";
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* ── Nav ── */}
      <Nav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            Tools & guides for people who work for themselves
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
            You make{" "}
            <span className="text-emerald-400">$200K</span>.{" "}
            <br className="hidden sm:block" />
            The bank thinks you make{" "}
            <span className="text-red-400">$60K</span>.
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Self-employed income looks great until it hits your tax return. Find
            out your real mortgage-qualifying income — and what to do about it
            — in 2 minutes.
          </p>

          <a
            href="#calculator"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-emerald-900/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Free Calculator
            <ArrowRight size={20} />
          </a>

          <p className="text-sm text-slate-600 mt-3">
            No account. No credit card. No BS.
          </p>
        </div>

        {/* Stats row */}
        <div className="relative max-w-3xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { stat: "43%", label: "Max DTI ratio lenders allow" },
            { stat: "2 yrs", label: "Of tax returns lenders average" },
            { stat: "0.5–2%", label: "Higher rate on Non-QM loans" },
          ].map(({ stat, label }) => (
            <div
              key={stat}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-black text-emerald-400">{stat}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem section ── */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Why Self-Employed People Struggle to Get Mortgages
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              You did everything right — wrote off your expenses, minimized your
              tax bill. Now it's working against you.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <TrendingDown className="text-red-400" size={22} />,
                title: "Write-offs shrink your income",
                desc: "Lenders use your Schedule C net income — after every deduction. A $200K freelancer with $120K in expenses looks like they make $80K.",
              },
              {
                icon: <FileText className="text-amber-400" size={22} />,
                title: "Tax returns are the proof",
                desc: "Conventional lenders average your last 2 years of 1040s. No bank statements. No \"but I invoice $20K/mo\". Just the 1040.",
              },
              {
                icon: <Users className="text-emerald-400" size={22} />,
                title: "Non-QM loans exist for you",
                desc: "Bank statement loans look at 12–24 months of deposits — not your tax return. Higher rate, but you can actually qualify.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5"
              >
                <div className="mb-3">{icon}</div>
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-emerald-400 mt-0.5 shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-emerald-300 mb-1">
                  There's a path — you just need to model it
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  This calculator shows you exactly how your tax deductions impact your
                  mortgage qualification, what the gap is, and whether a conventional or
                  Non-QM loan makes more sense for your situation. Fill in your numbers
                  below and download a PDF to share with your broker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Tools ── */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">More tools</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href="/calculators/quarterly-taxes"
              className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-emerald-700/50 rounded-xl p-4 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-900/40 border border-amber-800/40 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Quarterly Tax Estimator</p>
                  <p className="text-xs text-slate-500">Q1 deadline: April 15</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </Link>
            <Link
              href="/calculators/true-hourly-rate"
              className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-emerald-700/50 rounded-xl p-4 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-900/40 border border-red-800/40 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp size={16} className="text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">True Hourly Rate</p>
                  <p className="text-xs text-slate-500">What do you actually make?</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <Calculator />

      {/* ── Who it's for ── */}
      <section className="py-16 px-4 bg-slate-900/20 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Who This Is For
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            If any of these sound like you, this tool is for you.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            {[
              "Freelancers and independent contractors",
              "Small business owners filing Schedule C",
              "Consultants, designers, developers, writers",
              "Real estate investors with business income",
              "Gig workers and platform-based earners",
              "Anyone who's been turned down for a mortgage",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
                <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Blog Widget ── */}
      <LiveBlogWidget />

      {/* ── Field Guide preview ── */}
      <section className="py-16 px-4 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Field Guide</p>
              <h2 className="text-2xl font-bold text-white">Everything else you need to know.</h2>
            </div>
            <Link href="/field" className="hidden sm:flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              View all guides <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {articles.slice(0, 3).map((a) => (
              <Link key={a.slug} href={`/field/${a.slug}`} className="group bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-all">
                <span className="inline-block text-xs font-semibold text-emerald-400 mb-2">{a.stageLabel}</span>
                <p className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-emerald-300 transition-colors">{a.title}</p>
                <p className="text-xs text-slate-500">{a.readTime} min read</p>
              </Link>
            ))}
          </div>
          <Link href="/field" className="sm:hidden flex items-center gap-1.5 text-sm text-emerald-400 font-medium mt-4 transition-colors">
            View all guides <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
