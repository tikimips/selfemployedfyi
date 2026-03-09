"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Supabase handles the hash fragment automatically on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
      else setError("This reset link has expired or is invalid. Request a new one.");
    });
  }, []);

  async function handleReset(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError(error.message);
    else setDone(true);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-brand-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Password updated</h1>
          <p className="text-zinc-400 text-sm mb-6">You&apos;re all set. Sign in with your new password.</p>
          <Link
            href="/auth/signin"
            className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-xl transition-all"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">PR</span>
            </div>
            <span className="font-bold text-white text-lg">Propped</span>
          </Link>
          <h1 className="text-white font-bold text-xl mt-4 mb-1">Set new password</h1>
          <p className="text-zinc-400 text-sm">Choose something strong.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
          {!ready && error ? (
            <div className="text-center space-y-4">
              <div className="flex items-center gap-2 justify-center text-red-400">
                <AlertCircle size={16} />
                <p className="text-sm">{error}</p>
              </div>
              <Link href="/auth/forgot-password" className="text-brand-400 hover:text-brand-300 text-sm font-medium">
                Request a new reset link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">New password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="At least 8 characters"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-600 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirm password</label>
                <input
                  type={showPw ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  placeholder="Same again"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-600 transition-colors"
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
                disabled={loading || !ready}
                className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
              >
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
