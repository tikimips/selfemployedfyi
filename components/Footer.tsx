import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8 px-4" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center font-black text-[9px]"
            style={{ background: "var(--brand)", color: "#031a0d" }}>
            PR
          </div>
          <span className="text-sm font-semibold" style={{ color: "#4a6055" }}>Propped</span>
        </Link>

        <p className="text-xs text-center" style={{ color: "#4a6055" }}>
          For educational purposes only. Not financial, tax, or legal advice.{" "}
          <span className="hidden sm:inline">Consult a licensed professional.</span>
        </p>

        <div className="flex items-center gap-5">
          <Link href="/legal/terms"
            className="text-xs transition-colors hover:text-zinc-400"
            style={{ color: "#3a5040" }}>
            Terms
          </Link>
          <Link href="/legal/privacy"
            className="text-xs transition-colors hover:text-zinc-400"
            style={{ color: "#3a5040" }}>
            Privacy
          </Link>
          <a href="https://generalpublic.ai" target="_blank" rel="noopener noreferrer"
            className="text-xs transition-colors hover:text-zinc-400"
            style={{ color: "#3a5040" }}>
            General Public
          </a>
        </div>
      </div>
    </footer>
  );
}
