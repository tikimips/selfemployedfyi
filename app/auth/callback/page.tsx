"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    const next = searchParams.get("next") || "/";
    const errorParam = searchParams.get("error");
    const errorDesc = searchParams.get("error_description");

    if (errorParam) {
      setError(errorDesc || errorParam);
      return;
    }

    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ data, error }) => {
          if (error) {
            setError(error.message);
          } else {
            // Check if user has onboarded
            if (data.user && next === "/") {
              supabase
                .from("profiles")
                .select("onboarded")
                .eq("id", data.user.id)
                .single()
                .then(({ data: profile }) => {
                  router.replace(profile?.onboarded ? "/" : "/onboarding");
                });
            } else {
              router.replace(next);
            }
          }
        });
    } else {
      // Hash-based auth (for email confirmation links)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          router.replace(next);
        } else {
          router.replace("/auth/signin");
        }
      });
    }
  }, [router, searchParams]);

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-red-400 font-semibold mb-3">Something went wrong</p>
          <p className="text-zinc-500 text-sm mb-6">{error}</p>
          <a href="/auth/signin" className="text-brand-400 hover:text-brand-300 text-sm font-medium">
            Back to sign in
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-sm">Completing sign in…</p>
      </div>
    </main>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <AuthCallbackInner />
    </Suspense>
  );
}
