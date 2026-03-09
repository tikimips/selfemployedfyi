"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Calendar,
  ChevronDown,
  Info,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  ArrowRight,
  Clock,
} from "lucide-react";

// ── 2025 tax constants (used for 2026 planning — close enough) ──────────────

const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 15000,
  mfj: 30000,
  mfs: 15000,
  hoh: 22500,
};

const SS_WAGE_BASE = 176100;

function calcSETax(netIncome: number): number {
  if (netIncome <= 0) return 0;
  const seEarnings = netIncome * 0.9235;
  const ss = Math.min(seEarnings, SS_WAGE_BASE) * 0.124;
  const medicare = seEarnings * 0.029;
  return ss + medicare;
}

const BRACKETS: Record<string, { min: number; max: number; rate: number }[]> = {
  single: [
    { min: 0, max: 11925, rate: 0.1 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  mfj: [
    { min: 0, max: 23850, rate: 0.1 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  mfs: [
    { min: 0, max: 11925, rate: 0.1 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 375800, rate: 0.35 },
    { min: 375800, max: Infinity, rate: 0.37 },
  ],
  hoh: [
    { min: 0, max: 17000, rate: 0.1 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
};

function calcFederalTax(taxable: number, status: string): number {
  if (taxable <= 0) return 0;
  const brackets = BRACKETS[status] ?? BRACKETS.single;
  let tax = 0;
  for (const b of brackets) {
    if (taxable <= b.min) break;
    tax += (Math.min(taxable, b.max) - b.min) * b.rate;
  }
  return tax;
}

function getMarginalRate(taxable: number, status: string): number {
  if (taxable <= 0) return 0;
  const brackets = BRACKETS[status] ?? BRACKETS.single;
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxable > brackets[i].min) return brackets[i].rate;
  }
  return 0;
}

// ── Quarterly deadlines ──────────────────────────────────────────────────────

const DEADLINES = [
  { q: "Q1", period: "Jan 1 – Mar 31", due: new Date("2026-04-15"), label: "April 15, 2026" },
  { q: "Q2", period: "Apr 1 – May 31", due: new Date("2026-06-16"), label: "June 16, 2026" },
  { q: "Q3", period: "Jun 1 – Aug 31", due: new Date("2026-09-15"), label: "September 15, 2026" },
  { q: "Q4", period: "Sep 1 – Dec 31", due: new Date("2027-01-15"), label: "January 15, 2027" },
];

function getNextDeadline() {
  const now = new Date();
  return DEADLINES.find((d) => d.due > now) ?? DEADLINES[DEADLINES.length - 1];
}

function daysUntil(d: Date) {
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}

// ── Formatting ───────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, n));

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

// ── CurrencyInput ────────────────────────────────────────────────────────────

function CurrencyInput({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState(value > 0 ? value.toLocaleString() : "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setRaw(value > 0 ? value.toLocaleString() : "");
  }, [value, focused]);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-sm">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={focused ? raw : value > 0 ? value.toLocaleString() : ""}
          placeholder="0"
          onFocus={() => {
            setFocused(true);
            setRaw(value > 0 ? value.toString() : "");
          }}
          onBlur={() => {
            setFocused(false);
            const n = parseInt(raw.replace(/\D/g, ""), 10);
            onChange(isNaN(n) ? 0 : n);
          }}
          onChange={(e) => setRaw(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-7 pr-4 py-3 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
        />
      </div>
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  highlight,
  warning,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-brand-900/30 border-brand-700/50"
          : warning
          ? "bg-red-900/20 border-red-800/40"
          : "bg-zinc-800/60 border-zinc-700"
      }`}
    >
      <p className="text-xs text-zinc-400 mb-1">{label}</p>
      <p
        className={`text-xl font-bold ${
          highlight ? "text-brand-300" : warning ? "text-red-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function QuarterlyTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(120000);
  const [expenses, setExpenses] = useState(30000);
  const [filingStatus, setFilingStatus] = useState("single");
  const [otherIncome, setOtherIncome] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Email capture
  const [email, setEmail] = useState("");
  const [emailStep, setEmailStep] = useState<"idle" | "submitting" | "done">("idle");
  const [emailError, setEmailError] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const nextDeadline = getNextDeadline();
  const days = daysUntil(nextDeadline.due);

  const calc = useMemo(() => {
    const netSE = Math.max(0, grossIncome - expenses);
    const seTax = calcSETax(netSE);
    const deductibleSE = seTax / 2;
    const agi = netSE + otherIncome - deductibleSE;
    const stdDed = STANDARD_DEDUCTIONS[filingStatus] ?? 15000;
    const taxableIncome = Math.max(0, agi - stdDed);
    const federalTax = calcFederalTax(taxableIncome, filingStatus);
    const totalAnnual = seTax + federalTax;
    const perQuarter = totalAnnual / 4;
    const effectiveRate = netSE + otherIncome > 0 ? totalAnnual / (netSE + otherIncome) : 0;
    const marginalRate = getMarginalRate(taxableIncome, filingStatus);

    return {
      netSE,
      seTax,
      deductibleSE,
      agi,
      stdDed,
      taxableIncome,
      federalTax,
      totalAnnual,
      perQuarter,
      effectiveRate,
      marginalRate,
      setAsideRate: Math.ceil((effectiveRate + 0.02) * 10) / 10, // round up slightly for safety
    };
  }, [grossIncome, expenses, filingStatus, otherIncome]);

  const hasResults = grossIncome > 0;

  async function handleEmailSave() {
    if (!isValidEmail) {
      setEmailError("Please enter a valid email.");
      return;
    }
    setEmailStep("submitting");
    setEmailError("");
    try {
      // Save to Supabase leads table (reuse existing pattern, non-blocking)
      const { saveLead } = await import("@/lib/supabase");
      await saveLead({
        email,
        gross_revenue: grossIncome,
        qualifying_income: calc.netSE,
        target_home_price: 0,
        recommendation: `quarterly-tax-tool | annual-tax:${Math.round(calc.totalAnnual)} | per-quarter:${Math.round(calc.perQuarter)}`,
      }).catch(() => {});
      setEmailStep("done");
    } catch {
      setEmailStep("done"); // fail silently, still show success
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">

      {/* Deadline banner */}
      <div
        className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-8 border ${
          days <= 14
            ? "bg-red-950/50 border-red-800/50"
            : days <= 30
            ? "bg-amber-950/40 border-amber-800/40"
            : "bg-zinc-800/60 border-zinc-700"
        }`}
      >
        <Clock
          size={16}
          className={days <= 14 ? "text-red-400" : days <= 30 ? "text-amber-400" : "text-zinc-400"}
        />
        <p className="text-sm">
          <span
            className={`font-semibold ${
              days <= 14 ? "text-red-300" : days <= 30 ? "text-amber-300" : "text-zinc-200"
            }`}
          >
            {nextDeadline.q} payment due {nextDeadline.label}
          </span>
          <span className="text-zinc-400">
            {" "}— {days} day{days !== 1 ? "s" : ""} away
          </span>
        </p>
      </div>

      {/* Inputs */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
          <Calculator size={16} className="text-brand-400" />
          Your 2026 Numbers
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <CurrencyInput
            label="Expected Annual Revenue"
            hint="Your gross business income this year"
            value={grossIncome}
            onChange={setGrossIncome}
          />
          <CurrencyInput
            label="Expected Annual Expenses"
            hint="Business deductions — software, gear, home office, etc."
            value={expenses}
            onChange={setExpenses}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300">Filing Status</label>
            <div className="relative">
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="w-full appearance-none bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors pr-8"
              >
                <option value="single">Single</option>
                <option value="mfj">Married Filing Jointly</option>
                <option value="mfs">Married Filing Separately</option>
                <option value="hoh">Head of Household</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <CurrencyInput
            label="Other Household Income"
            hint="W2 job, spouse income, etc. (optional)"
            value={otherIncome}
            onChange={setOtherIncome}
          />
        </div>
      </div>

      {/* Results */}
      {hasResults && (
        <>
          {/* Hero result */}
          <div className="bg-gradient-to-br from-brand-900/40 to-zinc-900 border border-brand-700/40 rounded-2xl p-6 mb-4 text-center">
            <p className="text-sm text-zinc-400 mb-1">Your next quarterly payment ({nextDeadline.q})</p>
            <p className="text-5xl font-black text-brand-300 mb-1">{fmt(calc.perQuarter)}</p>
            <p className="text-sm text-zinc-400">
              due <span className="text-zinc-200 font-medium">{nextDeadline.label}</span>
            </p>

            <div className="mt-5 pt-5 border-t border-zinc-700/50 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Annual Tax</p>
                <p className="text-base font-bold text-white">{fmt(calc.totalAnnual)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Effective Rate</p>
                <p className="text-base font-bold text-white">{pct(calc.effectiveRate)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Set Aside</p>
                <p className="text-base font-bold text-amber-300">
                  {pct(calc.setAsideRate)}
                </p>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <StatCard
              label="Self-Employment Tax (15.3%)"
              value={fmt(calc.seTax)}
              sub="Social Security + Medicare"
              warning={calc.seTax > 15000}
            />
            <StatCard
              label="Federal Income Tax"
              value={fmt(calc.federalTax)}
              sub={`${pct(calc.marginalRate)} marginal bracket`}
            />
          </div>

          {/* Breakdown toggle */}
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between px-4 py-3 bg-zinc-800/60 border border-zinc-700 rounded-xl text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors mb-4"
          >
            <span className="flex items-center gap-2">
              <Info size={14} />
              How this is calculated
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform ${showBreakdown ? "rotate-180" : ""}`}
            />
          </button>

          {showBreakdown && (
            <div className="bg-zinc-800/40 border border-zinc-700/60 rounded-xl p-4 mb-4 space-y-2 text-sm">
              {[
                ["Gross Revenue", fmt(grossIncome)],
                ["− Business Expenses", `(${fmt(expenses)})`],
                ["= Net Self-Employment Income", fmt(calc.netSE), true],
                ["+ Other Household Income", fmt(otherIncome)],
                ["− Deductible SE Tax (½)", `(${fmt(calc.deductibleSE)})`],
                ["= Adjusted Gross Income", fmt(calc.agi), true],
                ["− Standard Deduction", `(${fmt(calc.stdDed)})`],
                ["= Federal Taxable Income", fmt(calc.taxableIncome), true],
                ["Self-Employment Tax", fmt(calc.seTax)],
                ["Federal Income Tax", fmt(calc.federalTax)],
                ["Total Annual Tax", fmt(calc.totalAnnual), true, true],
                ["÷ 4 Quarters", fmt(calc.perQuarter), false, true],
              ].map(([label, value, bold, highlight]) => (
                <div
                  key={label as string}
                  className={`flex justify-between items-center ${
                    bold ? "font-semibold text-white border-t border-zinc-700 pt-2 mt-2" : "text-zinc-400"
                  } ${highlight ? "text-brand-300" : ""}`}
                >
                  <span>{label as string}</span>
                  <span className="font-mono">{value as string}</span>
                </div>
              ))}
            </div>
          )}

          {/* All 4 quarters */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
            <h3 className="text-sm font-semibold text-zinc-300 mb-4">2026 Payment Schedule</h3>
            <div className="space-y-2">
              {DEADLINES.map((d) => {
                const isPast = d.due <= new Date();
                const isNext = d.q === nextDeadline.q;
                return (
                  <div
                    key={d.q}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                      isNext
                        ? "bg-brand-900/30 border border-brand-700/40"
                        : isPast
                        ? "opacity-40 bg-zinc-800/30"
                        : "bg-zinc-800/40"
                    }`}
                  >
                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider mr-2 ${
                          isNext ? "text-brand-400" : "text-zinc-500"
                        }`}
                      >
                        {d.q}
                      </span>
                      <span className="text-sm text-zinc-300">{d.period}</span>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${isNext ? "text-brand-300" : "text-white"}`}>
                        {fmt(calc.perQuarter)}
                      </p>
                      <p className="text-xs text-zinc-500">{d.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-zinc-600 mt-3">
              Equal quarterly payments assume even income throughout the year. If your income is seasonal, annualized income method may save you money.
            </p>
          </div>

          {/* The "set aside" tip */}
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4 mb-6 flex gap-3">
            <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-300 mb-1">
                Set aside {pct(calc.setAsideRate)} of every payment you receive
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Move this percentage into a separate savings account every time you get paid. When quarterly deadlines hit, the money is already there. No surprises.
              </p>
            </div>
          </div>

          {/* Email capture */}
          {emailStep === "done" ? (
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 bg-brand-900/40 border border-brand-700/50 rounded-full flex items-center justify-center">
                <CheckCircle2 size={20} className="text-brand-400" />
              </div>
              <p className="font-semibold text-white">You're on the list</p>
              <p className="text-sm text-zinc-400">
                We'll remind you before each quarterly deadline with a heads-up and a link back to this calculator.
              </p>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <Calendar size={18} className="text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Get a reminder before each deadline</p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    We'll email you 2 weeks before Q2, Q3, and Q4 payments are due. No spam — just the deadline, the amount, and a link back here.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSave()}
                  placeholder="you@example.com"
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                />
                <button
                  onClick={handleEmailSave}
                  disabled={!isValidEmail || emailStep === "submitting"}
                  className="bg-brand-600 hover:bg-brand-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold px-4 py-2.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  {emailStep === "submitting" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>Remind me <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
              {emailError && <p className="text-xs text-red-400 mt-2">{emailError}</p>}
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-zinc-600 text-center mt-5 leading-relaxed">
            Estimates based on 2025 federal tax rates. Does not include state income tax, NIIT, or AMT.
            Actual tax may vary. Consult a tax professional for personalized advice.
          </p>
        </>
      )}
    </div>
  );
}
