"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setDone(true);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Check your email</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            If <strong className="text-white">{email}</strong> has an account, you&apos;ll get a
            password reset link shortly.
          </p>
          <Link href="/auth/signin" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
            Back to sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">FH</span>
            </div>
            <span className="font-bold text-white text-lg">Freehold</span>
          </Link>
          <h1 className="text-white font-bold text-xl mt-4 mb-1">Forgot your password?</h1>
          <p className="text-slate-400 text-sm">No problem. We&apos;ll send you a reset link.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-950/40 border border-red-800/50 rounded-lg px-3 py-2.5">
                <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-xs text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <Link href="/auth/signin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors">
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
