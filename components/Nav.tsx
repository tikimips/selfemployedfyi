"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

const links = [
  { label: "Field", href: "/field" },
  { label: "Ledger", href: "/#tools" },
  { label: "Live Blog", href: "/liveblog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">FH</span>
          </div>
          <span className="font-bold text-white">Freehold</span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
          <UserAvatar />
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm text-slate-300 hover:text-white py-1 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/field"
            className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors mt-2"
            onClick={() => setOpen(false)}
          >
            Get Updates
          </Link>
        </div>
      )}
    </nav>
  );
}
