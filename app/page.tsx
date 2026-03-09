import Calculator from "@/components/Calculator";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LiveBlogWidget from "@/components/LiveBlogWidget";
import { articles } from "@/lib/articles";
import { ArrowRight, CheckCircle, TrendingDown, FileText, Users, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        {/* Structural grid lines — premium fintech feel */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute left-1/4 top-0 bottom-0 w-px opacity-[0.04]" style={{ background: "var(--brand)" }} />
          <div className="absolute left-3/4 top-0 bottom-0 w-px opacity-[0.04]" style={{ background: "var(--brand)" }} />
          <div className="absolute top-1/3 left-0 right-0 h-px opacity-[0.04]" style={{ background: "var(--brand)" }} />
        </div>

        {/* Ambient glow — subtle, not a blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] -translate-y-1/4 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(0,201,107,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 border text-xs font-semibold px-3 py-1.5 rounded-full mb-8"
            style={{
              background: "rgba(0,201,107,0.06)",
              borderColor: "rgba(0,201,107,0.2)",
              color: "var(--brand)",
            }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand)" }} />
            Built for freelancers, founders, and the self-employed
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.0 }}>
            You make{" "}
            <span style={{ color: "var(--brand)" }}>$200K</span>.
            <br />
            The bank thinks{" "}
            <br className="hidden sm:block" />
            you make{" "}
            <span className="relative">
              <span style={{ color: "#ef4444" }}>$60K</span>
              {/* Gold underline accent */}
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0.6 }}
              />
            </span>.
          </h1>

          <p className="text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#8fa899" }}>
            Self-employed income looks great until it hits your tax return.
            Find out your real mortgage-qualifying income — and exactly what to do about it — in 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2.5 font-bold text-base px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--brand)",
                color: "#031a0d",
                boxShadow: "0 0 24px rgba(0,201,107,0.25)",
              }}
            >
              Run the numbers free
              <ArrowRight size={18} />
            </a>
            <Link
              href="/field"
              className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-3.5 rounded-xl border transition-all"
              style={{
                borderColor: "var(--border-mid)",
                color: "#8fa899",
              }}
            >
              Read the Field Guide
            </Link>
          </div>

          <p className="text-xs mt-4" style={{ color: "#4a6055" }}>
            No account. No credit card. No BS.
          </p>
        </div>

        {/* Stats row */}
        <div className="relative max-w-3xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { stat: "43%", label: "Max DTI ratio lenders allow", accent: "brand" },
            { stat: "2 yrs", label: "Of tax returns lenders average", accent: "gold" },
            { stat: "0.5–2%", label: "Higher rate on Non-QM loans", accent: "brand" },
          ].map(({ stat, label, accent }) => (
            <div
              key={stat}
              className="rounded-xl p-5 text-center border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <p className="text-2xl font-black mb-1"
                style={{ color: accent === "gold" ? "var(--gold)" : "var(--brand)" }}>
                {stat}
              </p>
              <p className="text-xs" style={{ color: "#4a6055" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-line mx-auto max-w-4xl" />

      {/* ── Problem section ──────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
              The Problem
            </p>
            <h2 className="text-3xl font-black text-white mb-3">
              Why self-employed people struggle to get mortgages
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#8fa899" }}>
              You did everything right — wrote off your expenses, minimized your tax bill. Now it&apos;s working against you.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <TrendingDown className="text-red-400" size={20} />,
                title: "Write-offs shrink your income",
                desc: "Lenders use your Schedule C net income — after every deduction. A $200K freelancer with $120K in expenses looks like they make $80K.",
                accent: "#ff4d4d22",
              },
              {
                icon: <FileText style={{ color: "var(--gold)" }} size={20} />,
                title: "Tax returns are the only proof",
                desc: "Conventional lenders average your last 2 years of 1040s. No bank statements. No invoices. Just the 1040.",
                accent: "rgba(212,175,55,0.1)",
              },
              {
                icon: <Users style={{ color: "var(--brand)" }} size={20} />,
                title: "Non-QM loans exist for you",
                desc: "Bank statement loans look at 12–24 months of deposits — not your tax return. Higher rate, but you can actually qualify.",
                accent: "rgba(0,201,107,0.08)",
              },
            ].map(({ icon, title, desc, accent }) => (
              <div
                key={title}
                className="rounded-xl p-5 border"
                style={{ background: `${accent}`, borderColor: "var(--border-subtle)" }}
              >
                <div className="mb-3 p-2 rounded-lg w-fit" style={{ background: "var(--bg-elevated)" }}>
                  {icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8fa899" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl p-6 border flex items-start gap-4"
            style={{
              background: "rgba(0,201,107,0.05)",
              borderColor: "rgba(0,201,107,0.2)",
            }}>
            <CheckCircle style={{ color: "var(--brand)", flexShrink: 0, marginTop: 2 }} size={18} />
            <div>
              <h3 className="font-bold mb-1" style={{ color: "var(--brand)" }}>
                There&apos;s a path — you just need to model it
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8fa899" }}>
                This calculator shows you exactly how your tax deductions impact your mortgage qualification,
                what the gap is, and whether a conventional or Non-QM loan makes more sense for you.
                Fill in your numbers below and download a PDF to share with your broker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Tools ───────────────────────────────────────────────── */}
      <section className="pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#4a6055" }}>
            More tools
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                href: "/calculators/quarterly-taxes",
                icon: <Clock size={16} style={{ color: "var(--gold)" }} />,
                iconBg: "rgba(212,175,55,0.1)",
                title: "Quarterly Tax Estimator",
                sub: "Q1 deadline: April 15",
              },
              {
                href: "/calculators/true-hourly-rate",
                icon: <TrendingUp size={16} className="text-red-400" />,
                iconBg: "rgba(239,68,68,0.1)",
                title: "True Hourly Rate",
                sub: "What do you actually make?",
              },
            ].map(({ href, icon, iconBg, title, sub }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-xl p-4 border transition-all group"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: iconBg }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs" style={{ color: "#4a6055" }}>{sub}</p>
                  </div>
                </div>
                <ArrowRight size={15} style={{ color: "#4a6055" }} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ───────────────────────────────────────────────── */}
      <Calculator />

      {/* ── Who it's for ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
            Who it&apos;s for
          </p>
          <h2 className="text-2xl font-black text-white mb-8">
            If this is you, Propped was built for you.
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            {[
              "Freelancers and independent contractors",
              "Small business owners filing Schedule C",
              "Consultants, designers, developers, writers",
              "Real estate investors with business income",
              "Gig workers and platform-based earners",
              "Anyone who's been turned down for a mortgage",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg px-4 py-3 border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <CheckCircle size={14} style={{ color: "var(--brand)", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "#c5d4c8" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Blog Widget ─────────────────────────────────────────── */}
      <LiveBlogWidget />

      {/* ── Field Guide preview ──────────────────────────────────────── */}
      <section className="py-16 px-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4a6055" }}>
                Field Guide
              </p>
              <h2 className="text-2xl font-black text-white">Everything else you need to know.</h2>
            </div>
            <Link
              href="/field"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: "var(--brand)" }}
            >
              View all guides <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/field/${a.slug}`}
                className="group rounded-xl p-4 border transition-all"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <span className="inline-block text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--brand)" }}>
                  {a.stageLabel}
                </span>
                <p className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-zinc-200 transition-colors">
                  {a.title}
                </p>
                <p className="text-xs" style={{ color: "#4a6055" }}>{a.readTime} min read</p>
              </Link>
            ))}
          </div>
          <Link href="/field" className="sm:hidden flex items-center gap-1.5 text-sm font-semibold mt-4"
            style={{ color: "var(--brand)" }}>
            View all guides <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
