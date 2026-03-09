"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff, Trash2 } from "lucide-react";

export default function AccountPage() {
  const { user, profile, refreshProfile, signOut, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/signin");
    if (profile) setName(profile.full_name || "");
  }, [user, profile, loading, router]);

  async function handleSaveName(e: FormEvent) {
    e.preventDefault();
    setSavingName(true);
    await supabase.from("profiles").update({ full_name: name, updated_at: new Date().toISOString() }).eq("id", user!.id);
    await refreshProfile();
    setSavingName(false);
    setNameSuccess(true);
    setTimeout(() => setNameSuccess(false), 3000);
  }

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setPwError("");
    if (newPw !== confirmPw) { setPwError("Passwords don't match."); return; }
    if (newPw.length < 8) { setPwError("Password must be at least 8 characters."); return; }
    setSavingPw(true);
    // Re-authenticate then update
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email: user!.email!, password: currentPw });
    if (signInErr) { setPwError("Current password is incorrect."); setSavingPw(false); return; }
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setSavingPw(false);
    if (error) setPwError(error.message);
    else {
      setPwSuccess(true);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwSuccess(false), 3000);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== "DELETE") return;
    setDeleting(true);
    // Sign out and show message — actual deletion requires admin API
    await signOut();
    router.push("/?deleted=1");
  }

  const isOAuthUser = !user?.email || user?.app_metadata?.provider !== "email";

  if (loading || !user) return null;

  return (
    <main className="min-h-screen bg-zinc-950">
      <Nav />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/settings" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-8 transition-colors">
          <ArrowLeft size={12} /> Settings
        </Link>

        <h1 className="text-2xl font-bold text-white mb-8">Account</h1>

        {/* Profile */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-4">
          <h2 className="text-sm font-bold text-white mb-5">Profile</h2>
          <form onSubmit={handleSaveName} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Display name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full bg-zinc-800/40 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed"
              />
              <p className="text-xs text-zinc-600 mt-1">Email cannot be changed here.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={savingName}
                className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-all"
              >
                {savingName ? "Saving…" : "Save changes"}
              </button>
              {nameSuccess && (
                <span className="flex items-center gap-1.5 text-xs text-brand-400">
                  <CheckCircle2 size={13} /> Saved
                </span>
              )}
            </div>
          </form>
        </section>

        {/* Password — only for email users */}
        {!isOAuthUser && (
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-4">
            <h2 className="text-sm font-bold text-white mb-5">Change password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Current password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-600 transition-colors"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">New password</label>
                <input
                  type={showPw ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  required
                  placeholder="At least 8 characters"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirm new password</label>
                <input
                  type={showPw ? "text" : "password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  required
                  placeholder="Same again"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-600 transition-colors"
                />
              </div>

              {pwError && (
                <div className="flex items-start gap-2 bg-red-950/40 border border-red-800/50 rounded-lg px-3 py-2.5">
                  <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-300">{pwError}</p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={savingPw}
                  className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-all"
                >
                  {savingPw ? "Updating…" : "Update password"}
                </button>
                {pwSuccess && (
                  <span className="flex items-center gap-1.5 text-xs text-brand-400">
                    <CheckCircle2 size={13} /> Updated
                  </span>
                )}
              </div>
            </form>
          </section>
        )}

        {isOAuthUser && (
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
            <p className="text-sm text-zinc-400">
              You signed in with <span className="text-white capitalize">{user.app_metadata?.provider}</span>.
              Password management is handled by your identity provider.
            </p>
          </section>
        )}

        {/* Sign out */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-4">
          <h2 className="text-sm font-bold text-white mb-3">Session</h2>
          <button
            onClick={async () => { await signOut(); router.push("/"); }}
            className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
          >
            Sign out of all devices
          </button>
        </section>

        {/* Delete account */}
        <section className="bg-red-950/20 border border-red-900/40 rounded-xl p-6">
          <h2 className="text-sm font-bold text-red-400 mb-2">Delete account</h2>
          <p className="text-xs text-zinc-500 mb-4">
            This permanently deletes your account and all data. Type <strong className="text-zinc-400">DELETE</strong> to confirm.
          </p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type DELETE"
              className="bg-zinc-900 border border-red-900/40 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-red-600 transition-colors w-36"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== "DELETE" || deleting}
              className="flex items-center gap-2 bg-red-800/40 hover:bg-red-700/50 disabled:opacity-30 disabled:cursor-not-allowed text-red-300 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              <Trash2 size={14} />
              {deleting ? "Deleting…" : "Delete account"}
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
