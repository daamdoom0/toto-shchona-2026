"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await loginAction(fd);
      if (res?.error) setError(res.error);
    });
  };

  return (
    <>
      <div className="mundial-flag-strip" />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">⚽</div>
            <h1 className="font-display text-3xl text-toto-green">
              טוטו מונדיאל <span className="text-usa-red">2026</span>
            </h1>
            <p className="font-mono text-xs mt-2 opacity-70">USA · MEXICO · CANADA</p>
          </div>

          <div className="toto-card p-6">
            <h2 className="font-display text-xl mb-4 text-center">כניסה</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">מייל</label>
                <input
                  name="email"
                  type="email"
                  required
                  autoFocus
                  className="input"
                  placeholder="you@example.com"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">סיסמה</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="input"
                  dir="ltr"
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-usa-red p-3 text-usa-red font-bold text-sm">
                  {error}
                </div>
              )}

              <button type="submit" disabled={pending} className="btn w-full justify-center">
                {pending ? "מתחבר..." : "כניסה ⚽"}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t-2 border-dotted border-toto-ink/30 text-center text-sm">
              עוד לא רשום?{" "}
              <Link href="/register" className="font-bold text-toto-green underline">
                להרשמה
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
