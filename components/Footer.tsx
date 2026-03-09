import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center">
            <span className="text-white text-[9px] font-black">FH</span>
          </div>
          <span className="text-slate-500 text-sm font-medium">Freehold</span>
        </Link>
        <p className="text-xs text-slate-600 text-center">
          For educational purposes only. Not financial, tax, or legal advice. Consult a licensed professional.
        </p>
      </div>
    </footer>
  );
}
