import { createClient } from "@/lib/supabase/server";
import Header from "@/components/layout/Header";
import GroupTable from "@/components/standings/GroupTable";

export const dynamic = "force-dynamic";

const GROUPS: Record<string, string[]> = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

export default async function StandingsPage() {
  const supabase = createClient();

  const { data: matches } = await supabase
    .from("matches")
    .select("group_letter, team_a, team_b, score_a, score_b, finalized")
    .eq("stage", "group")
    .eq("finalized", true);

  const matchesByGroup: Record<string, typeof matches> = {};
  for (const letter of Object.keys(GROUPS)) {
    matchesByGroup[letter] = (matches ?? []).filter((m) => m.group_letter === letter);
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 pb-20">
        <div className="page-hero mb-8">
          <span className="stage-chip">STANDINGS</span>
          <h2 className="hero-title mt-3">🏟️ טבלאות הבתים</h2>
          <p className="hero-subtitle">מתעדכן אוטומטית עם כל תוצאה</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(GROUPS).map(([letter, teams]) => (
            <GroupTable
              key={letter}
              groupLetter={letter}
              teams={teams}
              matches={matchesByGroup[letter] ?? []}
            />
          ))}
        </div>
      </main>
    </>
  );
}
