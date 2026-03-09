"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { User, Shield, FileText, ChevronRight, Bell } from "lucide-react";

const SETTINGS_SECTIONS = [
  {
    icon: <User size={18} className="text-brand-400" />,
    title: "Account",
    desc: "Manage your name, email, password, and profile.",
    href: "/settings/account",
  },
  {
    icon: <Bell size={18} className="text-blue-400" />,
    title: "Notifications",
    desc: "Control what you hear from us and when.",
    href: "/settings/account#notifications",
    soon: true,
  },
  {
    icon: <Shield size={18} className="text-amber-400" />,
    title: "Privacy",
    desc: "Review our privacy policy and data practices.",
    href: "/legal/privacy",
  },
  {
    icon: <FileText size={18} className="text-zinc-400" />,
    title: "Terms of Service",
    desc: "The rules of the road.",
    href: "/legal/terms",
  },
];

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/signin");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <main className="min-h-screen bg-zinc-950">
      <Nav />
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-zinc-400 text-sm mb-8">{user.email}</p>

        <div className="space-y-3">
          {SETTINGS_SECTIONS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-5 transition-all group"
            >
              <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white group-hover:text-zinc-100">{s.title}</p>
                  {s.soon && (
                    <span className="text-[10px] font-bold bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">Soon</span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
              </div>
              <ChevronRight size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0" />
            </Link>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-600">
            Propped is a product of{" "}
            <a href="https://generalpublic.ai" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              General Public
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
