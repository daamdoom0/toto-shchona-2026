"use client";

import { useState } from "react";

export default function SyncButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [result, setResult] = useState<string>("");

  const handleSync = async () => {
    setStatus("loading");
    setResult("");
    try {
      const res = await fetch("/api/football", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("ok");
        setResult(`עודכנו ${data.updated} משחקים מתוך ${data.total}`);
      } else {
        setStatus("error");
        setResult(data.error ?? "שגיאה לא ידועה");
      }
    } catch {
      setStatus("error");
      setResult("שגיאת רשת");
    }
  };

  return (
    <div className="toto-card p-5 mb-6">
      <h3 className="font-display text-xl mb-3">🔄 סנכרון תוצאות מ-API</h3>
      <p className="text-sm opacity-70 mb-4">
        מושך תוצאות עדכניות מ-API-Football ומעדכן את מסד הנתונים אוטומטית.
        לחץ לאחר כל יום משחקים.
      </p>
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={handleSync}
          disabled={status === "loading"}
          className="btn btn-gold"
        >
          {status === "loading" ? "⏳ מסנכרן..." : "🔄 עדכן תוצאות עכשיו"}
        </button>
        {status === "ok" && (
          <span className="text-sm font-bold" style={{ color: "var(--green-600)" }}>✅ {result}</span>
        )}
        {status === "error" && (
          <span className="text-sm font-bold text-red-600">❌ {result}</span>
        )}
      </div>
    </div>
  );
}
