import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Countdown from "@/components/layout/Countdown";
import GroupBlock from "@/components/toto/GroupBlock";
import SpecialBets from "@/components/toto/SpecialBets";
import MatchRow from "@/components/toto/MatchRow";
import type { Match, Bet, SpecialBet, TournamentSettings } from "@/types";
import { STAGE_LABELS } from "@/types";
import { canBet, canSpecialBet } from "@/lib/time";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // טוען הכל במקביל
  const [settingsRes, matchesRes, betsRes, specialBetsRes, specialResultsRes] = await Promise.all([
    supabase.from("tournament_settings").select("*").eq("id", 1).single(),
    supabase.from("matches").select("*").order("kickoff_at", { ascending: true }),
    supabase.from("bets").select("*").eq("user_id", user.id),
    supabase.from("special_bets").select("*").eq("user_id", user.id),
    supabase.from("special_results").select("*"),
  ]);

  if (!settingsRes.data || !matchesRes.data) {
    return (
      <>
        <Header />
        <main className="max-w-6xl mx-auto p-6">
          <div className="toto-card p-8 text-center">
            <p className="font-display text-xl">שגיאה בטעינת נתונים.</p>
            <p className="opacity-70 mt-2">בדוק שהסכמה ב-Supabase הותקנה כראוי וה-seed הורץ.</p>
          </div>
        </main>
      </>
    );
  }

  const settings = settingsRes.data as TournamentSettings;
  const matches = matchesRes.data as Match[];
  const betsArr = (betsRes.data ?? []) as Bet[];
  const specialBetsArr = (specialBetsRes.data ?? []) as SpecialBet[];
  const specialResults = specialResultsRes.data ?? [];

  const userBetsMap = new Map(betsArr.map((b) => [b.match_id, b]));

  // קיבוץ של משחקי בית לפי אות
  const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const groupMatches = new Map<string, Match[]>();
  groupLetters.forEach((l) => groupMatches.set(l, []));
  matches
    .filter((m) => m.stage === "group")
    .forEach((m) => {
      if (m.group_letter) groupMatches.get(m.group_letter)?.push(m);
    });
  // מיון פר בית לפי זמן
  groupLetters.forEach((l) => {
    groupMatches.get(l)?.sort((a, b) => a.kickoff_at.localeCompare(b.kickoff_at));
  });

  // משחקי נוקאאוט - לפי שלב
  const knockoutStages: Array<{ stage: Match["stage"]; matches: Match[] }> = [
    { stage: "r32", matches: matches.filter((m) => m.stage === "r32") },
    { stage: "r16", matches: matches.filter((m) => m.stage === "r16") },
    { stage: "qf", matches: matches.filter((m) => m.stage === "qf") },
    { stage: "sf", matches: matches.filter((m) => m.stage === "sf") },
    { stage: "third", matches: matches.filter((m) => m.stage === "third") },
    { stage: "final", matches: matches.filter((m) => m.stage === "final") },
  ];

  const groupLocked = !canBet({ stage: "group" } as Match, settings);
  const specialLocked = !canSpecialBet(settings);

  // הימורים מיוחדים
  const championBet = specialBetsArr.find((s) => s.bet_type === "champion")?.value ?? null;
  const scorerBet = specialBetsArr.find((s) => s.bet_type === "top_scorer")?.value ?? null;
  const championResult = specialResults.find((s) => s.bet_type === "champion")?.value ?? null;
  const scorerResult = specialResults.find((s) => s.bet_type === "top_scorer")?.value ?? null;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-4 sm:p-6 pb-20">
        {/* כותרת + countdown */}
        <div className="toto-card p-4 sm:p-6 mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="stage-chip">שלב הבתים</span>
              <h2 className="font-display text-2xl sm:text-3xl mt-3">
                ההימורים שלך 🎯
              </h2>
              <p className="text-sm opacity-75 mt-1">
                {groupLocked
                  ? "ההימורים נעולים - שלב הבתים החל. ניתן להמשיך להמר על סבבי הנוקאאוט כשהם נפתחים."
                  : "בחר 1, X או 2 לכל משחק. הכל נעול ברגע השריקה הראשונה של המונדיאל."}
              </p>
            </div>
            {!groupLocked && (
              <Countdown targetIso={settings.group_lock_at} label="עד הנעילה:" />
            )}
          </div>
        </div>

        {/* הימורים מיוחדים */}
        <SpecialBets
          championBet={championBet}
          topScorerBet={scorerBet}
          championResult={championResult}
          topScorerResult={scorerResult}
          locked={specialLocked}
        />

        {/* שלב הבתים */}
        <h3 className="font-display text-2xl mb-4 mt-10">⚽ שלב הבתים</h3>
        {groupLetters.map((letter) => {
          const mlist = groupMatches.get(letter) ?? [];
          if (mlist.length === 0) return null;
          return (
            <GroupBlock
              key={letter}
              letter={letter}
              matches={mlist}
              userBets={userBetsMap}
              locked={groupLocked}
            />
          );
        })}

        {/* שלבי נוקאאוט */}
        <h3 className="font-display text-2xl mb-4 mt-10">🏆 שלבי הנוקאאוט</h3>
        {knockoutStages.map(({ stage, matches: mlist }) => {
          if (mlist.length === 0) return null;
          const sortedMatches = [...mlist].sort((a, b) => a.kickoff_at.localeCompare(b.kickoff_at));
          // הכל נעול אם אין נבחרות, אחרת לפי kickoff פר משחק
          return (
            <section key={stage} className="toto-card mb-8 overflow-hidden">
              <div className="bg-toto-ink text-usa-gold px-4 py-3 flex items-center justify-between">
                <h4 className="font-display text-xl">{STAGE_LABELS[stage]}</h4>
                <span className="font-mono text-sm opacity-75">{mlist.length} משחקים</span>
              </div>
              <div className="px-2 sm:px-4 py-2 bg-white">
                {sortedMatches.map((m) => {
                  const locked = !canBet(m, settings);
                  return (
                    <MatchRow
                      key={m.id}
                      match={m}
                      userPrediction={userBetsMap.get(m.id)?.prediction ?? null}
                      locked={locked}
                    />
                  );
                })}
              </div>
              {sortedMatches.every((m) => !m.team_a) && (
                <div className="px-4 py-3 bg-toto-paper text-sm text-center font-bold opacity-80 border-t-2 border-toto-ink/20">
                  ההימורים יפתחו כשהאדמין יעדכן את הנבחרות שעלו לשלב הזה.
                </div>
              )}
            </section>
          );
        })}
      </main>
    </>
  );
}
