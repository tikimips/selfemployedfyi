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
    <nav className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        background: "rgba(9,16,12,0.85)",
        borderColor: "var(--border-subtle)",
      }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-[11px] transition-all"
            style={{
              background: "var(--brand)",
              color: "#031a0d",
              boxShadow: "0 0 12px rgba(0,201,107,0.3)",
            }}
          >
            PR
          </div>
          <span className="font-black text-white tracking-tight">Propped</span>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: "#8fa899" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#e8f0e9")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8fa899")}
            >
              {l.label}
            </Link>
          ))}
          <UserAvatar />
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden transition-colors"
          style={{ color: "#8fa899" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t px-4 py-4 space-y-3"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm py-1 transition-colors"
              style={{ color: "#c5d4c8" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <UserAvatar />
          </div>
        </div>
      )}
    </nav>
  );
}
