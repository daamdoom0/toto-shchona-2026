"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { registerAction } from "@/actions/auth";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await registerAction(fd);
      if (res?.error) setError(res.error);
    });
  };

  return (
    <>
      <div className="mundial-flag-strip" />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">🏆</div>
            <h1 className="font-display text-3xl text-toto-green">הצטרפות לטוטו השכונתי</h1>
            <p className="font-mono text-xs mt-2 opacity-70">מונדיאל 2026 · ארה״ב · מקסיקו · קנדה</p>
          </div>

          <div className="toto-card p-6">
            <h2 className="font-display text-xl mb-4 text-center">הרשמה</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">שם תצוגה</label>
                <input
                  name="display_name"
                  type="text"
                  required
                  className="input"
                  placeholder="הכינוי שיופיע בלוח התוצאות"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">מייל</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="input"
                  placeholder="you@example.com"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">סיסמה (מינ׳ 6 תווים)</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="input"
                  dir="ltr"
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-usa-red p-3 text-usa-red font-bold text-sm">
                  {error}
                </div>
              )}

              <button type="submit" disabled={pending} className="btn btn-gold w-full justify-center">
                {pending ? "נרשם..." : "להירשם עכשיו 🏆"}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t-2 border-dotted border-toto-ink/30 text-center text-sm">
              כבר רשום?{" "}
              <Link href="/login" className="font-bold text-toto-green underline">
                לכניסה
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
