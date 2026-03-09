"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
      <path d="M13.48 9.58c-.02-2.09 1.7-3.09 1.78-3.14-.97-1.42-2.48-1.61-3.02-1.64-1.29-.13-2.52.76-3.17.76-.65 0-1.66-.74-2.73-.72-1.4.02-2.7.82-3.42 2.08-1.46 2.54-.37 6.3 1.05 8.36.7 1.01 1.52 2.14 2.61 2.1 1.05-.04 1.45-.67 2.72-.67 1.27 0 1.63.67 2.74.65 1.13-.02 1.84-1.02 2.53-2.04.8-1.17 1.13-2.3 1.15-2.36-.03-.01-2.22-.85-2.24-3.38zM11.3 3.17c.58-.71.97-1.69.86-2.67-.83.03-1.84.55-2.43 1.25-.53.61-1 1.6-.87 2.54.92.07 1.86-.47 2.44-1.12z"/>
    </svg>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEmailSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async function handleApple() {
    await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">FH</span>
            </div>
            <span className="font-bold text-white text-lg">Freehold</span>
          </Link>
          <p className="text-slate-400 text-sm mt-3">Welcome back</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          {/* OAuth buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm px-4 py-3 rounded-xl transition-all"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              onClick={handleApple}
              className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm px-4 py-3 rounded-xl border border-slate-700 transition-all"
            >
              <AppleIcon />
              Continue with Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-600">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-400">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Sign up free
          </Link>
        </p>

        <p className="text-center text-xs text-slate-700 mt-4">
          By continuing, you agree to our{" "}
          <Link href="/legal/terms" className="hover:text-slate-500 underline">Terms</Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="hover:text-slate-500 underline">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}
