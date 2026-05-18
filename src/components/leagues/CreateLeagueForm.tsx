"use client";

import { useState, useTransition, useRef } from "react";
import { createLeagueAction } from "@/actions/leagues";
import { useRouter } from "next/navigation";

export default function CreateLeagueForm() {
  const [isPending, start] = useTransition();
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await createLeagueAction(fd);
      if (res.error) { setError(res.error); return; }
      if (res.ok && res.code) { setCode(res.code); router.refresh(); }
    });
  };

  if (code) {
    return (
      <div className="toto-card p-5 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-display text-xl mb-2">הליגה נוצרה!</h3>
        <p className="text-sm opacity-70 mb-4">שלח את הקוד הזה לחברים:</p>
        <div className="font-mono text-3xl font-black tracking-widest bg-usa-gold/20 border-2 border-usa-gold rounded-xl px-6 py-4 mb-4 text-toto-green">
          {code}
        </div>
        <button className="btn btn-secondary text-sm" onClick={() => { navigator.clipboard.writeText(code); }}>
          העתק קוד
        </button>
      </div>
    );
  }

  return (
    <div className="toto-card p-5">
      <h3 className="font-display text-xl mb-4">➕ צור ליגה חדשה</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">שם הליגה</label>
          <input name="name" required maxLength={50} placeholder="למשל: חברי העבודה" className="input"/>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">תמונת ליגה (אופציונלי)</label>
          <div
            className="border-2 border-dashed border-toto-ink/20 rounded-lg p-4 text-center cursor-pointer hover:border-toto-green transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="preview" className="h-20 mx-auto rounded-lg object-cover"/>
            ) : (
              <div className="text-sm opacity-50">לחץ להעלאת תמונה</div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
            }}
          />
        </div>
        {error && <div className="text-sm text-red-600 font-bold">{error}</div>}
        <button type="submit" disabled={isPending} className="btn w-full justify-center">
          {isPending ? "יוצר..." : "צור ליגה וקבל קוד"}
        </button>
      </form>
    </div>
  );
}
