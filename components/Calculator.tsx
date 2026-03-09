"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MortgageInputs,
  MortgageOutputs,
  calculateMortgage,
  formatCurrency,
  formatPercent,
} from "@/lib/mortgage";
import ReportModal from "./ReportModal";
import {
  TrendingDown,
  TrendingUp,
  Home,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

const CREDIT_SCORE_OPTIONS = [
  { value: "760+", label: "760+ (Excellent)" },
  { value: "720-759", label: "720–759 (Very Good)" },
  { value: "680-719", label: "680–719 (Good)" },
  { value: "640-679", label: "640–679 (Fair)" },
  { value: "580-639", label: "580–639 (Poor)" },
  { value: "below-580", label: "Below 580" },
];

const DEFAULT_INPUTS: MortgageInputs = {
  grossRevenue: 150000,
  businessDeductions: 70000,
  filingStatus: "single",
  targetHomePrice: 650000,
  downPaymentPct: 20,
  creditScoreRange: "720-759",
};

function CurrencyInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  hint?: string;
}) {
  const [raw, setRaw] = useState(value.toLocaleString());
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setRaw(value.toLocaleString());
    }
  }, [value, focused]);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={focused ? raw : value.toLocaleString()}
          onFocus={() => {
            setFocused(true);
            setRaw(value.toString());
          }}
          onBlur={() => {
            setFocused(false);
            const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
            if (!isNaN(num)) onChange(num);
          }}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^0-9]/g, "");
            setRaw(cleaned);
            const num = parseInt(cleaned, 10);
            if (!isNaN(num)) onChange(num);
          }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
        />
      </div>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
  danger,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        accent
          ? "bg-brand-950/40 border-brand-800/50"
          : danger
          ? "bg-red-950/30 border-red-900/40"
          : "bg-zinc-800/50 border-zinc-700/50"
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {label}
        </p>
        {icon && <span className="text-zinc-500">{icon}</span>}
      </div>
      <p
        className={`text-2xl font-bold mt-1 ${
          accent ? "text-brand-400" : danger ? "text-red-400" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function Calculator() {
  const [inputs, setInputs] = useState<MortgageInputs>(DEFAULT_INPUTS);
  const [outputs, setOutputs] = useState<MortgageOutputs>(
    calculateMortgage(DEFAULT_INPUTS)
  );
  const [showReport, setShowReport] = useState(false);

  const update = useCallback(
    (key: keyof MortgageInputs, value: MortgageInputs[typeof key]) => {
      const next = { ...inputs, [key]: value };
      setInputs(next);
      setOutputs(calculateMortgage(next));
    },
    [inputs]
  );

  const canQualify = outputs.estimatedMaxMortgage >= outputs.targetMortgageNeeded;

  return (
    <section id="calculator" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-brand-950/50 border border-brand-800/50 text-brand-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            LIVE CALCULATOR
          </span>
          <h2 className="text-3xl font-bold text-white">
            Your Numbers, Right Now
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Fill in your details below — results update in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* ── Inputs ── */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-5">
            <h3 className="font-semibold text-zinc-200 text-sm uppercase tracking-wider">
              Your Info
            </h3>

            <CurrencyInput
              label="Gross Annual Revenue"
              value={inputs.grossRevenue}
              onChange={(v) => update("grossRevenue", v)}
              hint="Total income before any deductions"
            />

            <CurrencyInput
              label="Total Business Deductions / Expenses"
              value={inputs.businessDeductions}
              onChange={(v) => update("businessDeductions", v)}
              hint="Schedule C expenses — office, equipment, mileage, etc."
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300">
                Filing Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["single", "married"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => update("filingStatus", status)}
                    className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      inputs.filingStatus === status
                        ? "bg-brand-900/50 border-brand-600 text-brand-400"
                        : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                    }`}
                  >
                    {status === "single" ? "Single" : "Married / Joint"}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-4">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                Target Home
              </h4>
              <div className="space-y-4">
                <CurrencyInput
                  label="Target Home Price"
                  value={inputs.targetHomePrice}
                  onChange={(v) => update("targetHomePrice", v)}
                />

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-zinc-300">
                      Down Payment
                    </label>
                    <span className="text-sm font-bold text-brand-400">
                      {inputs.downPaymentPct}%{" "}
                      <span className="text-zinc-500 font-normal text-xs">
                        ({formatCurrency(outputs.downPaymentAmount)})
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={50}
                    step={1}
                    value={inputs.downPaymentPct}
                    onChange={(e) =>
                      update("downPaymentPct", Number(e.target.value))
                    }
                    className="w-full accent-brand-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>3%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Credit Score Range
                  </label>
                  <select
                    value={inputs.creditScoreRange}
                    onChange={(e) => update("creditScoreRange", e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-3 text-zinc-100 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                  >
                    {CREDIT_SCORE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ── Outputs ── */}
          <div className="space-y-4">
            {/* Main metrics */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Schedule C Income"
                value={formatCurrency(outputs.qualifyingIncome)}
                sub="What lenders see"
                accent
                icon={<DollarSign size={14} />}
              />
              <StatCard
                label="Max Mortgage (Today)"
                value={formatCurrency(outputs.estimatedMaxMortgage)}
                sub={`At 43% DTI, 7% rate`}
                accent={canQualify}
                danger={!canQualify}
                icon={<Home size={14} />}
              />
              <StatCard
                label="Est. Tax Bill"
                value={formatCurrency(outputs.estimatedTaxBill)}
                sub={`${formatPercent(outputs.effectiveTaxRate)} effective rate`}
                icon={<TrendingDown size={14} />}
              />
              <StatCard
                label="Max Monthly Payment"
                value={formatCurrency(outputs.maxMonthlyPayment)}
                sub="Principal + interest (PITI may vary)"
                icon={<TrendingUp size={14} />}
              />
            </div>

            {/* Gap analysis */}
            {outputs.deductionGap > 0 && (
              <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={16}
                    className="text-amber-400 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-amber-300">
                      Deduction Gap:{" "}
                      <span className="text-amber-400">
                        {formatCurrency(outputs.deductionGap)}
                      </span>
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      You'd need to claim{" "}
                      <strong className="text-amber-500">
                        {formatCurrency(outputs.deductionGap)} less
                      </strong>{" "}
                      in deductions to qualify conventionally — which would
                      increase your tax bill by{" "}
                      <strong className="text-amber-500">
                        {formatCurrency(outputs.taxIncreaseIfReduced)}
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}

            {canQualify && (
              <div className="bg-brand-950/30 border border-brand-800/40 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-brand-400 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-brand-300">
                      You qualify at your target price
                    </p>
                    <p className="text-xs text-brand-700 mt-1">
                      Your Schedule C income is high enough to support a{" "}
                      <strong className="text-brand-500">
                        {formatCurrency(outputs.targetMortgageNeeded)}
                      </strong>{" "}
                      mortgage conventionally.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendation */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info size={14} className="text-brand-400" />
                <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                  Recommendation
                </p>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {outputs.recommendationText}
              </p>
              {outputs.nonQmNote && (
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed border-t border-zinc-800 pt-2">
                  <span className="text-zinc-400 font-medium">Non-QM note:</span>{" "}
                  {outputs.nonQmNote}
                </p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowReport(true)}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-brand-900/40 active:scale-[0.99]"
            >
              Download Full PDF Report
              <ArrowRight size={16} />
            </button>
            <p className="text-xs text-zinc-600 text-center">
              Free — we'll email you a copy too
            </p>
          </div>
        </div>
      </div>

      {showReport && (
        <ReportModal
          inputs={inputs}
          outputs={outputs}
          onClose={() => setShowReport(false)}
        />
      )}
    </section>
  );
}
