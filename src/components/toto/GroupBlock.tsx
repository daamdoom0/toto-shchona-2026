import type { Match, Bet } from "@/types";
import { getTeam } from "@/lib/data/teams";
import MatchRow from "./MatchRow";

interface Props {
  letter: string;
  matches: Match[];
  userBets: Map<number, Bet>;
  locked: boolean;
}

export default function GroupBlock({ letter, matches, userBets, locked }: Props) {
  // Extract the 4 unique teams in this group
  const teamCodes = Array.from(
    new Set(matches.flatMap((m) => [m.team_a, m.team_b]).filter((x): x is string => !!x))
  );

  return (
    <section className="toto-card mb-8 overflow-hidden">
      <div className="bg-toto-green text-toto-paper px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="group-letter-block">{letter}</div>
          <div>
            <h3 className="font-display text-xl">בית {letter}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm opacity-95 mt-1">
              {teamCodes.map((code) => {
                const t = getTeam(code);
                return (
                  <span key={code} className="inline-flex items-center gap-1">
                    <span>{t?.flag}</span>
                    <span>{t?.name_he}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        {locked && <div className="locked-stamp" style={{ position: "static" }}>🔒 נעול</div>}
      </div>

      <div className="px-2 sm:px-4 py-2 bg-white">
        {matches.map((m) => (
          <MatchRow
            key={m.id}
            match={m}
            userPrediction={userBets.get(m.id)?.prediction ?? null}
            locked={locked}
          />
        ))}
      </div>
    </section>
  );
}
