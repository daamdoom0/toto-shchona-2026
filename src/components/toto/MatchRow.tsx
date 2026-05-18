import type { Match, MatchResult } from "@/types";
import { getTeam } from "@/lib/data/teams";
import { formatIsraelHour, formatIsraelDate } from "@/lib/time";
import BetCells from "./BetCells";
import MatchCountdown from "./MatchCountdown";

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
    <div className="border-b border-toto-ink/10 last:border-b-0 py-2.5 px-3 hover:bg-toto-paper/60 transition-colors">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* תאריך + שעה + ספירה לאחור */}
        <div className="flex-shrink-0 w-14 sm:w-16 text-right">
          <div className="text-[10px] font-mono opacity-60 leading-tight">
            {formatIsraelDate(match.kickoff_at)}
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, lineHeight: 1.1, color: "#0a1f13" }}>
            {formatIsraelHour(match.kickoff_at)}
          </div>
          <MatchCountdown kickoffAt={match.kickoff_at} finalized={match.finalized} />
        </div>

        {/* קבוצה בית */}
        <div className="flex-1 min-w-0 flex items-center gap-1 justify-end">
          <span className="font-bold text-xs sm:text-sm truncate">{nameA}</span>
          <span className="text-lg sm:text-xl flex-shrink-0">{flagA}</span>
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
          <span className="text-lg sm:text-xl flex-shrink-0">{flagB}</span>
          <span className="font-bold text-xs sm:text-sm truncate">{nameB}</span>
        </div>

        {/* תוצאה */}
        {match.finalized && match.score_a !== null && match.score_b !== null && (
          <div className="flex-shrink-0 font-mono text-xs">
            <span style={{ background: "#0a1f13", color: "#c9a84c", padding: "2px 8px", borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700 }}>
              {match.score_a}–{match.score_b}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
