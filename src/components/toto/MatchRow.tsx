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
    <div className="border-b-2 border-dotted border-toto-ink/30 last:border-b-0 py-3 px-2 hover:bg-toto-paper/60 transition-colors">
      <div className="flex items-center gap-1 sm:gap-2">
        {/* תאריך + שעה */}
        <div className="flex-shrink-0 w-12 sm:w-16 text-right">
          <div className="text-[10px] sm:text-xs font-mono opacity-70 leading-tight">
            {formatIsraelDate(match.kickoff_at)}
          </div>
          <div className="font-display text-sm sm:text-lg leading-none">
            {formatIsraelHour(match.kickoff_at)}
          </div>
        </div>

        {/* קבוצה בית */}
        <div className="flex-1 min-w-0 flex items-center gap-1 justify-end">
          <span className="font-bold text-xs sm:text-base truncate">{nameA}</span>
          <span className="text-lg sm:text-2xl flex-shrink-0">{flagA}</span>
        </div>

        {/* תאי הימור */}
        <div className="flex-shrink-0">
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
        <div className="flex-1 min-w-0 flex items-center gap-1">
          <span className="text-lg sm:text-2xl flex-shrink-0">{flagB}</span>
          <span className="font-bold text-xs sm:text-base truncate">{nameB}</span>
        </div>

        {/* תוצאה */}
        {match.finalized && match.score_a !== null && match.score_b !== null && (
          <div className="flex-shrink-0 font-mono text-xs">
            <span className="bg-toto-ink text-usa-gold px-1.5 py-0.5 rounded">
              {match.score_a}-{match.score_b}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
