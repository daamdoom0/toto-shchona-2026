"use client";

import { useState, useTransition } from "react";
import { joinLeagueAction } from "@/actions/leagues";
import { useRouter } from "next/navigation";

export default function JoinLeagueForm() {
  const [isPending, start] = useTransition();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (!code.trim()) return;
    setError(""); setSuccess("");
    start(async () => {
      const res = await joinLeagueAction(code);
      if (res.error) { setError(res.error); return; }
      if (res.ok) {
        setSuccess(`הצטרפת ל-${res.name}!`);
        router.refresh();
        setTimeout(() => router.push(`/leagues/${res.leagueId}`), 1000);
      }
    });
  };

  return (
    <div className="toto-card p-5">
      <h3 className="font-display text-xl mb-4">🔑 הצטרף לליגה</h3>
      <p className="text-sm opacity-70 mb-4">קיבלת קוד הזמנה? הכנס אותו כאן.</p>
      <div className="space-y-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ABC123"
          maxLength={6}
          className="input font-mono text-2xl text-center tracking-widest"
          style={{ letterSpacing: "0.2em" }}
        />
        {error && <div className="text-sm text-red-600 font-bold">{error}</div>}
        {success && <div className="text-sm text-toto-green font-bold">{success}</div>}
        <button
          onClick={handleJoin}
          disabled={isPending || code.length < 6}
          className="btn btn-gold w-full justify-center"
        >
          {isPending ? "מצטרף..." : "הצטרף לליגה"}
        </button>
      </div>
    </div>
  );
}
