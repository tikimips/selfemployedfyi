"use client";

import { useState } from "react";
import { MortgageInputs, MortgageOutputs } from "@/lib/mortgage";
import { saveLead } from "@/lib/supabase";
import { generatePDFReport } from "@/lib/pdf";
import { X, Download, Loader2, CheckCircle2, Mail } from "lucide-react";

interface ReportModalProps {
  inputs: MortgageInputs;
  outputs: MortgageOutputs;
  onClose: () => void;
}

type Step = "email" | "generating" | "done" | "error";

export default function ReportModal({
  inputs,
  outputs,
  onClose,
}: ReportModalProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [error, setError] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleDownload() {
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setStep("generating");
    setError("");

    try {
      // Save lead to Supabase (non-blocking — don't fail if Supabase is unreachable)
      saveLead({
        email,
        gross_revenue: inputs.grossRevenue,
        qualifying_income: outputs.qualifyingIncome,
        target_home_price: inputs.targetHomePrice,
        recommendation: outputs.recommendation,
      }).catch((e) => console.warn("Lead save failed (non-fatal):", e));

      // Generate PDF
      await generatePDFReport(inputs, outputs, email);
      setStep("done");
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError("Something went wrong generating your report. Please try again.");
      setStep("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md shadow-2xl shadow-black/50 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {step === "email" && (
            <>
              <div className="flex items-center justify-center w-12 h-12 bg-brand-900/40 border border-brand-800/50 rounded-xl mb-5 mx-auto">
                <Mail size={22} className="text-brand-400" />
              </div>

              <h2 className="text-xl font-bold text-white text-center mb-1">
                Get Your Free Report
              </h2>
              <p className="text-zinc-400 text-sm text-center mb-6">
                Enter your email and we'll generate a clean PDF you can share
                with your mortgage broker.
              </p>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleDownload()}
                    placeholder="you@example.com"
                    autoFocus
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                  />
                  {error && (
                    <p className="text-xs text-red-400">{error}</p>
                  )}
                </div>

                <button
                  onClick={handleDownload}
                  disabled={!isValidEmail}
                  className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Download size={16} />
                  Download PDF Report
                </button>
              </div>

              <p className="text-xs text-zinc-600 text-center mt-4">
                No spam. We'll only send you relevant resources for
                self-employed homebuyers.
              </p>
            </>
          )}

          {step === "generating" && (
            <div className="flex flex-col items-center py-6">
              <Loader2
                size={36}
                className="text-brand-400 animate-spin mb-4"
              />
              <h2 className="text-lg font-semibold text-white mb-1">
                Generating your report...
              </h2>
              <p className="text-sm text-zinc-400">
                Building your personalized PDF
              </p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex items-center justify-center w-14 h-14 bg-brand-900/40 border border-brand-700/50 rounded-full mb-4">
                <CheckCircle2 size={28} className="text-brand-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Report Downloaded!
              </h2>
              <p className="text-sm text-zinc-400 mb-6">
                Check your downloads folder. Share it with your mortgage broker
                to start the conversation about your options.
              </p>
              <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 text-left w-full mb-5">
                <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-2">
                  Quick tip
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  When talking to brokers, ask specifically: <span className="text-zinc-200">"Do you work with Non-QM bank statement loans for self-employed borrowers?"</span> Most standard mortgage officers don't — you may need a specialized broker.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="flex flex-col items-center py-4 text-center">
              <h2 className="text-lg font-semibold text-red-400 mb-2">
                Something went wrong
              </h2>
              <p className="text-sm text-zinc-400 mb-4">{error}</p>
              <button
                onClick={() => setStep("email")}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-medium py-2 px-4 rounded-lg text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
