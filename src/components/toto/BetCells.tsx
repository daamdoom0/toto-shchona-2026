"use client";

import { useState, useTransition } from "react";
import type { MatchResult } from "@/types";
import { saveBetAction } from "@/actions/bets";
import ReactionBubble from "@/components/reactions/ReactionBubble";

interface Props {
  matchId: number;
  currentPrediction: MatchResult | null;
  actualResult: MatchResult | null;
  locked: boolean;
  finalized: boolean;
  /** הצג תגובה של דמות אחרי בחירה */
  showReaction?: boolean;
}

export default function BetCells({
  matchId,
  currentPrediction,
  actualResult,
  locked,
  finalized,
  showReaction = true,
}: Props) {
  const [optimisticPick, setOptimisticPick] = useState<MatchResult | null>(currentPrediction);
  const [error, setError] = useState<string | null>(null);
  const [showReactionFor, setShowReactionFor] = useState<MatchResult | null>(null);
  const [pending, startTransition] = useTransition();

  const handleClick = (pick: MatchResult) => {
    if (locked || pending) return;
    setError(null);
    setOptimisticPick(pick);
    setShowReactionFor(pick);
    startTransition(async () => {
      const res = await saveBetAction(matchId, pick);
      if (res.error) {
        setError(res.error);
        setOptimisticPick(currentPrediction); // החזר ערך אם נכשל
      }
    });
  };

  const cellClasses = (key: MatchResult): string => {
    const isSelected = optimisticPick === key;
    const isCorrect = finalized && key === actualResult;
    const isWrong = finalized && optimisticPick === key && actualResult !== key;

    let cls = "bet-cell";
    if (locked) cls += " bet-cell-locked";
    if (isCorrect) cls += " bet-cell-correct";
    else if (isWrong) cls += " bet-cell-wrong";
    else if (isSelected) cls += " bet-cell-selected";
    return cls;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {(["1", "X", "2"] as MatchResult[]).map((key) => (
          <button
            key={key}
            className={cellClasses(key)}
            onClick={() => handleClick(key)}
            disabled={locked || pending}
            aria-label={`הימור ${key === "1" ? "ניצחון בית" : key === "X" ? "תיקו" : "ניצחון חוץ"}`}
          >
            {key}
          </button>
        ))}
      </div>

      {pending && <div className="text-xs opacity-60 font-mono">שומר...</div>}
      {error && <div className="text-xs text-usa-red font-bold">{error}</div>}

      {showReaction && showReactionFor && !locked && (
        <ReactionBubble prediction={showReactionFor} />
      )}
    </div>
  );
}
