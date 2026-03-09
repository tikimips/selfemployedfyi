"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Clock,
  DollarSign,
  TrendingDown,
  ChevronDown,
  Share2,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  Info,
} from "lucide-react";

// ── Tax math (same as quarterly calc) ───────────────────────────────────────

const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 15000,
  mfj: 30000,
  mfs: 15000,
  hoh: 22500,
};

function calcSETax(net: number) {
  if (net <= 0) return 0;
  const se = net * 0.9235;
  return Math.min(se, 176100) * 0.124 + se * 0.029;
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

function calcFederalTax(taxable: number, status: string) {
  if (taxable <= 0) return 0;
  const brackets = BRACKETS[status] ?? BRACKETS.single;
  let tax = 0;
  for (const b of brackets) {
    if (taxable <= b.min) break;
    tax += (Math.min(taxable, b.max) - b.min) * b.rate;
  }
  return tax;
}

// ── Formatting ───────────────────────────────────────────────────────────────

const fmt = (n: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(Math.max(0, n));

const fmtHr = (n: number) => fmt(n, n < 10 ? 2 : 0);

// ── Slider ───────────────────────────────────────────────────────────────────

function Slider({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  display,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  display: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-sm font-bold text-emerald-300">{display}</span>
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-500"
        style={{
          background: `linear-gradient(to right, rgb(16 185 129) ${pct}%, rgb(51 65 85) ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-slate-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

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
      <label className="text-sm font-medium text-slate-300">{label}</label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={focused ? raw : value > 0 ? value.toLocaleString() : ""}
          placeholder="0"
          onFocus={() => { setFocused(true); setRaw(value > 0 ? value.toString() : ""); }}
          onBlur={() => {
            setFocused(false);
            const n = parseInt(raw.replace(/\D/g, ""), 10);
            onChange(isNaN(n) ? 0 : n);
          }}
          onChange={(e) => setRaw(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-4 py-3 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
        />
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TrueHourlyCalculator() {
  const [revenue, setRevenue] = useState(120000);
  const [billableHours, setBillableHours] = useState(30);
  const [adminHours, setAdminHours] = useState(15);
  const [weeksWorked, setWeeksWorked] = useState(48);
  const [expenses, setExpenses] = useState(12000);
  const [filingStatus, setFilingStatus] = useState("single");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copied, setCopied] = useState(false);

  // Email capture
  const [email, setEmail] = useState("");
  const [emailStep, setEmailStep] = useState<"idle" | "submitting" | "done">("idle");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const calc = useMemo(() => {
    const totalBillableHours = billableHours * weeksWorked;
    const totalHoursWorked = (billableHours + adminHours) * weeksWorked;
    const billedRate = totalBillableHours > 0 ? revenue / totalBillableHours : 0;

    const netIncome = Math.max(0, revenue - expenses);
    const seTax = calcSETax(netIncome);
    const deductibleSE = seTax / 2;
    const agi = netIncome - deductibleSE;
    const stdDed = STANDARD_DEDUCTIONS[filingStatus] ?? 15000;
    const taxable = Math.max(0, agi - stdDed);
    const federalTax = calcFederalTax(taxable, filingStatus);
    const totalTax = seTax + federalTax;
    const takeHome = Math.max(0, netIncome - totalTax);
    const trueHourly = totalHoursWorked > 0 ? takeHome / totalHoursWorked : 0;

    const gap = billedRate - trueHourly;
    const gapPct = billedRate > 0 ? gap / billedRate : 0;

    // Unpaid hours per week
    const unpaidHoursPerWeek = adminHours;
    const unpaidHoursPerYear = adminHours * weeksWorked;

    // What you need to charge to hit a target true rate
    // target_take_home = target_true × totalHours
    // This requires iterating since tax changes with income — simplified linear approximation
    const effectiveTaxRate = netIncome > 0 ? totalTax / netIncome : 0;
    const toHitCurrentRate = billedRate > 0
      ? (trueHourly * totalHoursWorked) / ((1 - effectiveTaxRate) * totalBillableHours) + expenses / totalBillableHours
      : 0;

    // Salary equivalent: what W2 salary gives same take-home
    // W2 employee has employer SS/Medicare (~7.65%) + benefits (~$15K avg)
    // Rough: salary_equivalent = takeHome / (1 - 0.25) where 0.25 is avg W2 effective rate
    // More precisely: salary such that (salary - fed_tax(salary) - 7.65% FICA employee) ≈ takeHome
    const salaryEquivalent = takeHome * 1.35 + 15000; // rough but directionally right

    // "Hours lost" value — what those admin hours would be worth at billed rate
    const adminHoursValue = unpaidHoursPerYear * billedRate;

    return {
      totalBillableHours,
      totalHoursWorked,
      billedRate,
      netIncome,
      seTax,
      federalTax,
      totalTax,
      takeHome,
      trueHourly,
      gap,
      gapPct,
      unpaidHoursPerWeek,
      unpaidHoursPerYear,
      effectiveTaxRate,
      adminHoursValue,
      salaryEquivalent,
    };
  }, [revenue, billableHours, adminHours, weeksWorked, expenses, filingStatus]);

  const severity = calc.gapPct > 0.6 ? "severe" : calc.gapPct > 0.4 ? "high" : calc.gapPct > 0.2 ? "medium" : "low";

  const shareText = `I bill at ${fmtHr(calc.billedRate)}/hr. My true hourly rate after taxes, overhead & unpaid time: ${fmtHr(calc.trueHourly)}/hr. Reality check via Freehold → selfemployedfyi.com/calculators/true-hourly-rate`;

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleEmail() {
    if (!isValidEmail) return;
    setEmailStep("submitting");
    try {
      const { saveLead } = await import("@/lib/supabase");
      await saveLead({
        email,
        gross_revenue: revenue,
        qualifying_income: calc.takeHome,
        target_home_price: 0,
        recommendation: `true-hourly-tool | billed:${Math.round(calc.billedRate)} | true:${Math.round(calc.trueHourly)}`,
      }).catch(() => {});
    } catch { /* fail silently */ }
    setEmailStep("done");
  }

  const hasResults = revenue > 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">

      {/* Inputs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 space-y-6">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Clock size={16} className="text-emerald-400" />
          Your Work Reality
        </h2>

        <CurrencyInput
          label="Annual Gross Revenue"
          hint="Total you invoice or get paid before any deductions"
          value={revenue}
          onChange={setRevenue}
        />

        <div className="grid sm:grid-cols-2 gap-6">
          <Slider
            label="Billable hours/week"
            hint="Hours you actually bill clients for"
            value={billableHours}
            onChange={setBillableHours}
            min={5}
            max={60}
            display={`${billableHours} hrs`}
          />
          <Slider
            label="Admin hours/week"
            hint="Emails, invoicing, proposals, calls, marketing"
            value={adminHours}
            onChange={setAdminHours}
            min={0}
            max={40}
            display={`${adminHours} hrs`}
          />
        </div>

        <Slider
          label="Weeks worked per year"
          hint="After vacation, sick days, and slow weeks"
          value={weeksWorked}
          onChange={setWeeksWorked}
          min={20}
          max={52}
          display={`${weeksWorked} weeks`}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <CurrencyInput
            label="Annual Business Expenses"
            hint="Software, equipment, insurance, workspace, etc."
            value={expenses}
            onChange={setExpenses}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Filing Status</label>
            <div className="relative">
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors pr-8"
              >
                <option value="single">Single</option>
                <option value="mfj">Married Filing Jointly</option>
                <option value="mfs">Married Filing Separately</option>
                <option value="hoh">Head of Household</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* THE REVEAL */}
      {hasResults && (
        <>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">The reality</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Billed rate */}
              <div className="bg-slate-800/60 rounded-xl p-4 text-center">
                <p className="text-xs text-slate-400 mb-1">You bill at</p>
                <p className="text-3xl font-black text-slate-300">{fmtHr(calc.billedRate)}</p>
                <p className="text-xs text-slate-500 mt-1">per hour</p>
              </div>

              {/* True rate */}
              <div
                className={`rounded-xl p-4 text-center ${
                  severity === "severe"
                    ? "bg-red-900/30 border border-red-800/40"
                    : severity === "high"
                    ? "bg-amber-900/30 border border-amber-800/40"
                    : "bg-emerald-900/20 border border-emerald-800/30"
                }`}
              >
                <p className="text-xs text-slate-400 mb-1">You actually make</p>
                <p
                  className={`text-3xl font-black ${
                    severity === "severe"
                      ? "text-red-400"
                      : severity === "high"
                      ? "text-amber-300"
                      : "text-emerald-300"
                  }`}
                >
                  {fmtHr(calc.trueHourly)}
                </p>
                <p className="text-xs text-slate-500 mt-1">per hour</p>
              </div>
            </div>

            {/* Gap bar */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>True rate</span>
                <span className={severity === "severe" ? "text-red-400 font-semibold" : severity === "high" ? "text-amber-400 font-semibold" : "text-slate-400"}>
                  {Math.round(calc.gapPct * 100)}% of your billed rate disappears
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    severity === "severe" ? "bg-red-500" : severity === "high" ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.max(5, (1 - calc.gapPct) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>$0</span>
                <span>{fmtHr(calc.billedRate)}</span>
              </div>
            </div>

            {/* Where it goes */}
            <div className="space-y-2">
              {[
                {
                  label: "Taxes (SE + Federal)",
                  amount: calc.totalTax,
                  pct: calc.totalTax / revenue,
                  color: "bg-red-500/70",
                },
                {
                  label: "Business expenses",
                  amount: expenses,
                  pct: expenses / revenue,
                  color: "bg-amber-500/70",
                },
                {
                  label: `${calc.unpaidHoursPerWeek} unpaid hours/wk`,
                  amount: calc.adminHoursValue,
                  pct: calc.adminHoursValue / (revenue || 1),
                  color: "bg-violet-500/70",
                },
              ].map(({ label, amount, pct, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{label}</span>
                    <span className="text-xs font-medium text-slate-300">
                      {fmt(amount)} ({Math.round(pct * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-1 border-t border-slate-700">
                <div className="w-2 h-2 rounded-full shrink-0 bg-emerald-500" />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Take-home pay</span>
                  <span className="text-xs font-bold text-emerald-300">{fmt(calc.takeHome)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Salary equivalent</p>
              <p className="text-lg font-bold text-white">{fmt(calc.salaryEquivalent)}/yr</p>
              <p className="text-xs text-slate-500 mt-1">W2 job with same take-home</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Unpaid time per year</p>
              <p className="text-lg font-bold text-white">{calc.unpaidHoursPerYear.toLocaleString()} hrs</p>
              <p className="text-xs text-slate-500 mt-1">Admin, emails, proposals, etc.</p>
            </div>
          </div>

          {/* The Fix */}
          {calc.trueHourly < calc.billedRate * 0.7 && (
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 mb-4 flex gap-3">
              <ArrowRight size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-300 mb-1">
                  The levers you can pull
                </p>
                <ul className="text-xs text-slate-400 leading-relaxed space-y-1">
                  <li>
                    → <strong className="text-slate-300">Raise your rate:</strong> Every $10/hr billed rate increase adds {fmtHr(10 * (1 - calc.effectiveTaxRate))} to your true hourly
                  </li>
                  <li>
                    → <strong className="text-slate-300">Cut admin time:</strong> Reducing unpaid hours from {adminHours} to {Math.max(0, adminHours - 5)}/wk adds {fmtHr((calc.takeHome / Math.max(1, ((billableHours + Math.max(0, adminHours - 5)) * weeksWorked))) - calc.trueHourly)} to your true hourly
                  </li>
                  <li>
                    → <strong className="text-slate-300">Elect S-corp:</strong> At {fmt(calc.netIncome)}/yr net, you may save {fmt(Math.max(0, calc.netIncome * 0.9235 * 0.153 * 0.4))} in SE tax
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Breakdown toggle */}
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors mb-4"
          >
            <span className="flex items-center gap-2"><Info size={14} />Full calculation breakdown</span>
            <ChevronDown size={14} className={`transition-transform ${showBreakdown ? "rotate-180" : ""}`} />
          </button>

          {showBreakdown && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 mb-4 text-sm space-y-2">
              {[
                ["Annual gross revenue", fmt(revenue)],
                ["− Business expenses", `(${fmt(expenses)})`],
                ["= Net self-employment income", fmt(calc.netIncome), true],
                ["Self-employment tax (15.3%)", `(${fmt(calc.seTax)})`],
                ["Federal income tax", `(${fmt(calc.federalTax)})`],
                ["= Annual take-home", fmt(calc.takeHome), true, true],
                ["Total hours worked/year", `${calc.totalHoursWorked.toLocaleString()} hrs`],
                ["  Billable: " + calc.totalBillableHours.toLocaleString() + " hrs", ""],
                ["  Admin: " + calc.unpaidHoursPerYear.toLocaleString() + " hrs", ""],
                ["True hourly rate", fmtHr(calc.trueHourly), true, true],
              ].map(([label, value, bold, highlight]) => (
                value ? (
                  <div
                    key={label as string}
                    className={`flex justify-between ${bold ? "font-semibold text-white border-t border-slate-700 pt-2 mt-2" : "text-slate-400"} ${highlight ? "text-emerald-300" : ""}`}
                  >
                    <span>{label as string}</span>
                    <span className="font-mono">{value as string}</span>
                  </div>
                ) : (
                  <div key={label as string} className="text-xs text-slate-600 pl-2">{label as string}</div>
                )
              ))}
            </div>
          )}

          {/* Share */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Share your result</p>
            <div className="bg-slate-800 rounded-xl p-3 mb-3">
              <p className="text-sm text-slate-300 leading-relaxed">{shareText}</p>
            </div>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm py-2.5 rounded-lg transition-colors"
            >
              {copied ? (
                <><CheckCircle2 size={14} className="text-emerald-400" /> Copied!</>
              ) : (
                <><Share2 size={14} /> Copy to share</>
              )}
            </button>
          </div>

          {/* Email capture */}
          {emailStep === "done" ? (
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
              <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-white text-sm">You're on the list</p>
              <p className="text-xs text-slate-400 mt-1">
                We'll send you tools and guides for freelancers who want to earn more per real hour.
              </p>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
              <p className="text-sm font-semibold text-white mb-1">
                Want to improve that number?
              </p>
              <p className="text-xs text-slate-400 mb-4">
                Get guides on raising rates, cutting admin time, and structuring your business to keep more of what you earn.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmail()}
                  placeholder="you@example.com"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                />
                <button
                  onClick={handleEmail}
                  disabled={!isValidEmail || emailStep === "submitting"}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold px-4 py-2.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  {emailStep === "submitting" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>Send it <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-600 text-center mt-5 leading-relaxed">
            Federal tax estimate based on 2025 rates. Excludes state income tax, NIIT, and health insurance deductions.
          </p>
        </>
      )}
    </div>
  );
}
