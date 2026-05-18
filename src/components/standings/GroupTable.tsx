"use client";

import { getTeam } from "@/lib/data/teams";

interface MatchResult {
  team_a: string;
  team_b: string;
  score_a: number;
  score_b: number;
  finalized: boolean;
}

interface TeamStat {
  code: string;
  p: number; // played
  w: number; // wins
  d: number; // draws
  l: number; // losses
  gf: number;
  ga: number;
  pts: number;
}

interface Props {
  groupLetter: string;
  teams: string[];
  matches: MatchResult[];
}

export default function GroupTable({ groupLetter, teams, matches }: Props) {
  // חשב סטטיסטיקות
  const stats: Record<string, TeamStat> = {};
  for (const code of teams) {
    stats[code] = { code, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
  }

  for (const m of matches) {
    if (!m.finalized || m.score_a == null || m.score_b == null) continue;
    const a = stats[m.team_a];
    const b = stats[m.team_b];
    if (!a || !b) continue;

    a.p++; b.p++;
    a.gf += m.score_a; a.ga += m.score_b;
    b.gf += m.score_b; b.ga += m.score_a;

    if (m.score_a > m.score_b) {
      a.w++; a.pts += 3; b.l++;
    } else if (m.score_a < m.score_b) {
      b.w++; b.pts += 3; a.l++;
    } else {
      a.d++; a.pts++; b.d++; b.pts++;
    }
  }

  const sorted = Object.values(stats).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const gdA = a.gf - a.ga, gdB = b.gf - b.ga;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });

  const played = sorted.some((s) => s.p > 0);

  return (
    <div className="standings-card overflow-hidden">
      {/* Header */}
      <div className="standings-header">
        <span className="standings-group-letter">{groupLetter}</span>
        <span className="standings-group-title">בית {groupLetter}</span>
      </div>

      <table className="standings-table">
        <thead>
          <tr>
            <th className="standings-th rank">#</th>
            <th className="standings-th team">נבחרת</th>
            <th className="standings-th num">מ׳</th>
            <th className="standings-th num">נ׳</th>
            <th className="standings-th num">ת׳</th>
            <th className="standings-th num">ה׳</th>
            <th className="standings-th num">שע׳</th>
            <th className="standings-th num pts">נק׳</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s, i) => {
            const team = getTeam(s.code);
            const gd = s.gf - s.ga;
            const isAdvancing = played && i < 2;
            return (
              <tr
                key={s.code}
                className={`standings-row ${isAdvancing ? "advancing" : ""} ${i === 0 ? "first" : ""}`}
              >
                <td className="standings-td rank">
                  {isAdvancing ? (
                    <span className="rank-badge">{i + 1}</span>
                  ) : (
                    <span className="rank-num">{i + 1}</span>
                  )}
                </td>
                <td className="standings-td team">
                  <span className="team-flag">{team?.flag ?? "🏳️"}</span>
                  <span className="team-name">{team?.name_he ?? s.code}</span>
                </td>
                <td className="standings-td num">{s.p}</td>
                <td className="standings-td num">{s.w}</td>
                <td className="standings-td num">{s.d}</td>
                <td className="standings-td num">{s.l}</td>
                <td className="standings-td num gd">
                  <span className={gd > 0 ? "text-emerald-600" : gd < 0 ? "text-red-500" : ""}>
                    {gd > 0 ? `+${gd}` : gd}
                  </span>
                </td>
                <td className="standings-td num pts">
                  <strong>{s.pts}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {!played && (
        <div className="standings-pending">עוד לא שוחקו משחקים בבית זה</div>
      )}
    </div>
  );
}
