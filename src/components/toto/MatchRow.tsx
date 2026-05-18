import type { Match, MatchResult } from "@/types";
import { getTeam } from "@/lib/data/teams";
import { formatIsraelHour, formatIsraelDate } from "@/lib/time";
import BetCells from "./BetCells";

interface Props {
  match: Match;
  userPrediction: MatchResult | null;
  locked: boolean;
}

export default function MatchRow({ match, userPrediction, locked }: Props) {
  const teamA = getTeam(match.team_a);
  const teamB = getTeam(match.team_b);

  const nameA = teamA?.name_he ?? match.team_a_placeholder ?? "?";
  const nameB = teamB?.name_he ?? match.team_b_placeholder ?? "?";
  const flagA = teamA?.flag ?? "🏳️";
  const flagB = teamB?.flag ?? "🏳️";

  return (
    <div className="border-b-2 border-dotted border-toto-ink/30 last:border-b-0 py-3 px-2 grid grid-cols-12 gap-2 items-center hover:bg-toto-paper/60 transition-colors">
      {/* תאריך + שעה */}
      <div className="col-span-3 sm:col-span-2 text-right">
        <div className="text-xs font-mono opacity-70">{formatIsraelDate(match.kickoff_at)}</div>
        <div className="font-display text-lg leading-none">{formatIsraelHour(match.kickoff_at)}</div>
      </div>

      {/* קבוצה בית */}
      <div className="col-span-3 sm:col-span-3 text-left flex items-center gap-2 justify-end">
        <span className="font-bold text-sm sm:text-base">{nameA}</span>
        <span className="text-2xl">{flagA}</span>
      </div>

      {/* תאי הימור */}
      <div className="col-span-3 sm:col-span-3 flex justify-center">
        <BetCells
          matchId={match.id}
          currentPrediction={userPrediction}
          actualResult={match.result}
          locked={locked}
          finalized={match.finalized}
          showReaction={!locked}
        />
      </div>

      {/* קבוצה חוץ */}
      <div className="col-span-3 sm:col-span-3 text-right flex items-center gap-2">
        <span className="text-2xl">{flagB}</span>
        <span className="font-bold text-sm sm:text-base">{nameB}</span>
      </div>

      {/* תוצאה אם הוזנה */}
      {match.finalized && match.score_a !== null && match.score_b !== null && (
        <div className="col-span-12 sm:col-span-1 text-center font-mono text-sm">
          <span className="bg-toto-ink text-usa-gold px-2 py-1 rounded">
            {match.score_a}-{match.score_b}
          </span>
        </div>
      )}
    </div>
  );
}
