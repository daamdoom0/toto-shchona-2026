"use client";

import { useState, useTransition } from "react";
import type { Match, MatchResult, MatchStage } from "@/types";
import { STAGE_LABELS } from "@/types";
import { getTeam, ALL_TEAMS_LIST } from "@/lib/data/teams";
import { formatIsraelTime } from "@/lib/time";
import {
  updateMatchResultAction,
  setKnockoutTeamsAction,
  updateSpecialResultAction,
} from "@/actions/admin";

interface Props {
  matches: Match[];
  specialResults: { bet_type: string; value: string }[];
}

const STAGES_ORDER: MatchStage[] = ["group", "r32", "r16", "qf", "sf", "third", "final"];

export default function AdminResultsClient({ matches, specialResults }: Props) {
  const [activeStage, setActiveStage] = useState<MatchStage>("group");
  const [flash, setFlash] = useState<string | null>(null);

  const stageMatches = matches.filter((m) => m.stage === activeStage);

  const showFlash = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 2000);
  };

  return (
    <>
      {flash && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-toto-green text-toto-paper px-6 py-3 font-bold shadow-stamp border-2 border-toto-ink animate-fade-up">
          {flash}
        </div>
      )}

      {/* בורר שלב */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {STAGES_ORDER.map((s) => {
          const count = matches.filter((m) => m.stage === s).length;
          const finalized = matches.filter((m) => m.stage === s && m.finalized).length;
          return (
            <button
              key={s}
              onClick={() => setActiveStage(s)}
              className={`btn text-sm py-2 px-3 whitespace-nowrap ${
                activeStage === s ? "btn-gold" : "btn-secondary"
              }`}
            >
              {STAGE_LABELS[s]}
              <span className="opacity-75 text-xs">({finalized}/{count})</span>
            </button>
          );
        })}
      </div>

      {/* רשימת משחקים */}
      <div className="toto-card overflow-hidden">
        <div className="bg-toto-green text-toto-paper px-4 py-3">
          <h3 className="font-display text-xl">{STAGE_LABELS[activeStage]}</h3>
        </div>

        <div className="bg-white">
          {stageMatches.map((match) => (
            <AdminMatchRow key={match.id} match={match} onFlash={showFlash} />
          ))}
        </div>
      </div>

      {/* הימורים מיוחדים - מוצגים רק בשלב הגמר */}
      {activeStage === "final" && (
        <div className="toto-card mt-8 p-4 sm:p-6">
          <h3 className="font-display text-xl mb-4">🏆 תוצאות הימורים מיוחדים</h3>
          <SpecialResultsEntry results={specialResults} onFlash={showFlash} />
        </div>
      )}
    </>
  );
}

function AdminMatchRow({ match, onFlash }: { match: Match; onFlash: (m: string) => void }) {
  const teamA = getTeam(match.team_a);
  const teamB = getTeam(match.team_b);
  const isKnockoutNoTeams = match.stage !== "group" && (!match.team_a || !match.team_b);

  const [teamAInput, setTeamAInput] = useState(match.team_a ?? "");
  const [teamBInput, setTeamBInput] = useState(match.team_b ?? "");
  const [resultInput, setResultInput] = useState<MatchResult | "">(match.result ?? "");
  const [scoreA, setScoreA] = useState(match.score_a?.toString() ?? "");
  const [scoreB, setScoreB] = useState(match.score_b?.toString() ?? "");
  const [pending, startTransition] = useTransition();

  const setTeams = () => {
    if (!teamAInput || !teamBInput) return;
    startTransition(async () => {
      const res = await setKnockoutTeamsAction(match.id, teamAInput, teamBInput);
      if (res.error) onFlash(`שגיאה: ${res.error}`);
      else onFlash("נבחרות עודכנו ✓");
    });
  };

  const setResult = () => {
    if (!resultInput) return;
    startTransition(async () => {
      const res = await updateMatchResultAction(
        match.id,
        resultInput as MatchResult,
        scoreA ? parseInt(scoreA) : null,
        scoreB ? parseInt(scoreB) : null
      );
      if (res.error) onFlash(`שגיאה: ${res.error}`);
      else onFlash("תוצאה נשמרה ✓");
    });
  };

  return (
    <div className="border-b border-dotted border-toto-ink/30 p-3 sm:p-4 grid grid-cols-12 gap-3 items-center">
      <div className="col-span-12 sm:col-span-2 text-sm">
        <div className="font-mono text-xs opacity-70">#{match.id}</div>
        <div>{formatIsraelTime(match.kickoff_at)}</div>
        {match.group_letter && (
          <div className="font-display text-toto-green">בית {match.group_letter}</div>
        )}
      </div>

      {/* נבחרות */}
      {isKnockoutNoTeams ? (
        <div className="col-span-12 sm:col-span-7 grid grid-cols-2 gap-2 items-center">
          <div className="text-xs opacity-75 col-span-2">
            <b>{match.team_a_placeholder}</b> נגד <b>{match.team_b_placeholder}</b>
          </div>
          <select
            value={teamAInput}
            onChange={(e) => setTeamAInput(e.target.value)}
            className="input text-sm py-1.5"
          >
            <option value="">בית - בחר נבחרת</option>
            {ALL_TEAMS_LIST.map((t) => (
              <option key={t.code} value={t.code}>{t.flag} {t.name_he}</option>
            ))}
          </select>
          <select
            value={teamBInput}
            onChange={(e) => setTeamBInput(e.target.value)}
            className="input text-sm py-1.5"
          >
            <option value="">חוץ - בחר נבחרת</option>
            {ALL_TEAMS_LIST.map((t) => (
              <option key={t.code} value={t.code}>{t.flag} {t.name_he}</option>
            ))}
          </select>
          <button
            onClick={setTeams}
            disabled={pending || !teamAInput || !teamBInput}
            className="btn btn-secondary text-sm py-1.5 col-span-2"
          >
            ⚽ הגדר נבחרות
          </button>
        </div>
      ) : (
        <div className="col-span-12 sm:col-span-5 flex items-center justify-center gap-3">
          <span className="font-bold text-left">
            {teamA?.flag} {teamA?.name_he ?? match.team_a_placeholder}
          </span>
          <span className="opacity-50">vs</span>
          <span className="font-bold">
            {teamB?.name_he ?? match.team_b_placeholder} {teamB?.flag}
          </span>
        </div>
      )}

      {/* תוצאה */}
      {!isKnockoutNoTeams && (
        <div className="col-span-12 sm:col-span-5 flex items-center gap-2 justify-end flex-wrap">
          <div className="flex gap-1">
            {(["1", "X", "2"] as MatchResult[]).map((r) => (
              <button
                key={r}
                onClick={() => setResultInput(r)}
                className={`w-10 h-10 border-2 border-toto-ink font-display text-lg ${
                  resultInput === r ? "bg-toto-green text-usa-gold" : "bg-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="0"
            value={scoreA}
            onChange={(e) => setScoreA(e.target.value)}
            className="input w-14 text-center py-1.5"
            min="0"
            max="20"
          />
          <span className="font-display">:</span>
          <input
            type="number"
            placeholder="0"
            value={scoreB}
            onChange={(e) => setScoreB(e.target.value)}
            className="input w-14 text-center py-1.5"
            min="0"
            max="20"
          />
          <button
            onClick={setResult}
            disabled={pending || !resultInput}
            className={`btn text-sm py-1.5 ${match.finalized ? "btn-secondary" : ""}`}
          >
            {match.finalized ? "עדכן" : "שמור"}
          </button>
        </div>
      )}
    </div>
  );
}

function SpecialResultsEntry({
  results,
  onFlash,
}: {
  results: { bet_type: string; value: string }[];
  onFlash: (m: string) => void;
}) {
  const championResult = results.find((r) => r.bet_type === "champion")?.value ?? "";
  const scorerResult = results.find((r) => r.bet_type === "top_scorer")?.value ?? "";

  const [champion, setChampion] = useState(championResult);
  const [scorer, setScorer] = useState(scorerResult);
  const [pending, startTransition] = useTransition();

  const save = (type: "champion" | "top_scorer", value: string) => {
    if (!value.trim()) return;
    startTransition(async () => {
      const res = await updateSpecialResultAction(type, value);
      if (res.error) onFlash(`שגיאה: ${res.error}`);
      else onFlash("תוצאה נשמרה ✓");
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1">🥇 אלופת המונדיאל (קוד נבחרת)</label>
        <div className="flex gap-2">
          <select
            value={champion}
            onChange={(e) => setChampion(e.target.value)}
            className="input"
          >
            <option value="">— בחר —</option>
            {ALL_TEAMS_LIST.map((t) => (
              <option key={t.code} value={t.code}>{t.flag} {t.name_he} ({t.code})</option>
            ))}
          </select>
          <button onClick={() => save("champion", champion)} disabled={pending || !champion} className="btn">
            שמור
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1">⚽ מלך השערים (שם השחקן)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={scorer}
            onChange={(e) => setScorer(e.target.value)}
            placeholder="כתוב שם מלא"
            className="input"
          />
          <button onClick={() => save("top_scorer", scorer)} disabled={pending || !scorer.trim()} className="btn">
            שמור
          </button>
        </div>
      </div>
    </div>
  );
}
