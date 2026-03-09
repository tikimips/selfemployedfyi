"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Settings, LogOut, User, ChevronDown } from "lucide-react";

export default function UserAvatar() {
  const { user, profile, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className="text-sm font-semibold text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 transition-all"
      >
        Sign in
      </Link>
    );
  }

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : (user.email?.[0] ?? "U").toUpperCase();

  const displayName = profile?.full_name || user.email?.split("@")[0] || "Account";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 group"
        aria-label="Account menu"
      >
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-700 group-hover:ring-brand-600 transition-all"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center ring-2 ring-zinc-700 group-hover:ring-brand-600 transition-all">
            <span className="text-xs font-bold text-white">{initials}</span>
          </div>
        )}
        <ChevronDown size={13} className="text-zinc-500 hidden sm:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl shadow-black/40 z-50 py-1">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-sm font-semibold text-white truncate">{displayName}</p>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          </div>

          <Link
            href="/settings/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <User size={14} />
            Account
          </Link>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Settings size={14} />
            Settings
          </Link>

          <div className="border-t border-zinc-800 mt-1 pt-1">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-800 transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
