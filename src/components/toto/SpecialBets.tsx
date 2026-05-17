"use client";

import { useState, useTransition } from "react";
import { ALL_TEAMS_LIST } from "@/lib/data/teams";
import { PLAYERS } from "@/lib/data/players";
import { saveSpecialBetAction } from "@/actions/bets";

interface Props {
  championBet: string | null;
  topScorerBet: string | null;
  championResult: string | null;
  topScorerResult: string | null;
  locked: boolean;
}

export default function SpecialBets({ championBet, topScorerBet, championResult, topScorerResult, locked }: Props) {
  const [champion, setChampion] = useState(championBet ?? "");
  const [scorer, setScorer] = useState(topScorerBet ?? "");
  const [saving, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const save = (type: "champion" | "top_scorer", value: string) => {
    if (locked) return;
    setMsg(null);
    startTransition(async () => {
      const res = await saveSpecialBetAction(type, value);
      if (res.error) setMsg(res.error);
      else setMsg("נשמר ✓");
      setTimeout(() => setMsg(null), 1500);
    });
  };

  const championStatus = championResult ? (champion === championResult ? "correct" : "wrong") : null;
  const scorerStatus = topScorerResult ? (scorer.trim().toLowerCase() === topScorerResult.trim().toLowerCase() ? "correct" : "wrong") : null;

  return (
    <section className="toto-card mb-8 relative">
      <div className="bg-usa-gold text-toto-ink px-4 py-3 flex items-center justify-between gap-4 flex-wrap border-b-3 border-toto-ink">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <div>
            <h3 className="font-display text-xl">הימורים מיוחדים</h3>
            <p className="text-xs mt-0.5">נעילה: עם תחילת הטורניר</p>
          </div>
        </div>
        {locked && <div className="locked-stamp" style={{ position: "static" }}>🔒 נעול</div>}
      </div>

      <div className="p-4 sm:p-6 bg-white space-y-5">
        {/* אלוף */}
        <div>
          <label className="font-display text-lg block mb-2">
            🥇 אלופת המונדיאל
            {championResult && (
              <span className="mr-2 text-sm">
                | תוצאה: <b>{championResult}</b>
                {championStatus === "correct" && <span className="text-toto-green"> ✓ פגעת!</span>}
                {championStatus === "wrong" && <span className="text-usa-red"> ✗ פספסת</span>}
              </span>
            )}
          </label>
          <select
            value={champion}
            disabled={locked || saving}
            onChange={(e) => { setChampion(e.target.value); save("champion", e.target.value); }}
            className={`input ${championStatus === "correct" ? "bg-green-50 border-toto-green" : ""} ${championStatus === "wrong" ? "bg-red-50 border-usa-red" : ""}`}
          >
            <option value="">— בחר נבחרת —</option>
            {ALL_TEAMS_LIST.map((t) => (
              <option key={t.code} value={t.code}>{t.flag} {t.name_he}</option>
            ))}
          </select>
        </div>

        {/* מלך שערים */}
        <div>
          <label className="font-display text-lg block mb-2">
            ⚽ מלך השערים של הטורניר
            {topScorerResult && (
              <span className="mr-2 text-sm">
                | תוצאה: <b>{topScorerResult}</b>
                {scorerStatus === "correct" && <span className="text-toto-green"> ✓ פגעת!</span>}
                {scorerStatus === "wrong" && <span className="text-usa-red"> ✗ פספסת</span>}
              </span>
            )}
          </label>
          <select
            value={scorer}
            disabled={locked || saving}
            onChange={(e) => { setScorer(e.target.value); save("top_scorer", e.target.value); }}
            className={`input ${scorerStatus === "correct" ? "bg-green-50 border-toto-green" : ""} ${scorerStatus === "wrong" ? "bg-red-50 border-usa-red" : ""}`}
          >
            <option value="">— בחר שחקן —</option>
            {PLAYERS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <p className="text-xs opacity-60 mt-1 font-mono">~130 שחקנים בולטים מכל 48 הנבחרות</p>
        </div>

        {msg && <div className="text-sm font-bold text-toto-green">{msg}</div>}
      </div>
    </section>
  );
}
