"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import {
  CheckCircle2, Lock, Calculator, FileText, TrendingUp,
  Newspaper, BarChart2, Star, Rocket, ChevronRight
} from "lucide-react";

const UNLOCKED = [
  {
    icon: <Calculator size={20} className="text-emerald-400" />,
    title: "Mortgage Qualifying Calculator",
    desc: "See exactly what you qualify for — and why your tax returns are lying to your lender.",
    href: "/",
  },
  {
    icon: <TrendingUp size={20} className="text-amber-400" />,
    title: "Quarterly Tax Estimator",
    desc: "Never get surprised by a quarterly bill again. Stay ahead of Q1 (April 15).",
    href: "/calculators/quarterly-taxes",
  },
  {
    icon: <BarChart2 size={20} className="text-red-400" />,
    title: "True Hourly Rate Calculator",
    desc: "You bill $150/hr. Find out what you actually make after admin time and overhead.",
    href: "/calculators/true-hourly-rate",
  },
  {
    icon: <FileText size={20} className="text-blue-400" />,
    title: "Field Guide — All Articles",
    desc: "The full library. Taxes, LLCs, S-Corps, health insurance, deductions, and more.",
    href: "/field",
  },
  {
    icon: <Newspaper size={20} className="text-purple-400" />,
    title: "Live Blog",
    desc: "Real-time market, tax, and money news through the lens of the self-employed.",
    href: "/liveblog",
  },
];

const COMING_SOON = [
  {
    icon: <Star size={18} className="text-yellow-400" />,
    title: "Company Finance Tracker",
    desc: "Follow the financial health of companies you work with, compete against, or want to join.",
  },
  {
    icon: <Rocket size={18} className="text-pink-400" />,
    title: "IPO Reviews",
    desc: "First-look analysis of upcoming IPOs — and what they mean for the self-employed economy.",
  },
  {
    icon: <FileText size={18} className="text-cyan-400" />,
    title: "Premium Field Guides",
    desc: "Deep dives: S-Corp optimization, advanced tax strategy, home office playbooks.",
  },
  {
    icon: <BarChart2 size={18} className="text-orange-400" />,
    title: "Business Health Checkup",
    desc: "A quiz that scores your business's financial foundation and tells you exactly what to fix.",
  },
];

export default function OnboardingPage() {
  const { user, profile, refreshProfile, loading } = useAuth();
  const router = useRouter();
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/signin");
    }
  }, [user, loading, router]);

  async function handleContinue() {
    if (!user) return;
    setMarking(true);
    await supabase
      .from("profiles")
      .update({ onboarded: true })
      .eq("id", user.id);
    await refreshProfile();
    router.push("/");
  }

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-2xl mb-5">
            <span className="text-white text-xl font-black">FH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Welcome to Freehold, {firstName}.
          </h1>
          <p className="text-slate-400 text-lg">
            Your account is set up. Here&apos;s everything you have access to right now.
          </p>
        </div>

        {/* Unlocked features */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Unlocked</p>
          </div>
          <div className="space-y-3">
            {UNLOCKED.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-start gap-4 bg-slate-900 border border-slate-800 hover:border-emerald-700/50 rounded-xl p-4 transition-all group"
              >
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-0.5 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-700 group-hover:text-emerald-500 transition-colors mt-1 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-slate-500" />
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Coming soon</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {COMING_SOON.map((item, i) => (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-4 ${i < COMING_SOON.length - 1 ? "border-b border-slate-800" : ""}`}
              >
                <div className="w-8 h-8 bg-slate-800/60 rounded-lg flex items-center justify-center shrink-0 opacity-60">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-400">{item.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleContinue}
          disabled={marking}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-lg py-4 rounded-xl transition-all"
        >
          {marking ? "Setting up…" : "Start exploring →"}
        </button>
      </div>
    </main>
  );
}
