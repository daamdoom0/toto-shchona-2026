import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Leaderboard from "@/components/Leaderboard";
import type { LeaderboardEntry, TournamentSettings } from "@/types";
import { formatIsraelTime } from "@/lib/time";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [settingsRes, leaderboardRes] = await Promise.all([
    supabase.from("tournament_settings").select("*").eq("id", 1).single(),
    supabase.from("leaderboard").select("*"),
  ]);

  const settings = settingsRes.data as TournamentSettings | null;
  const entries = (leaderboardRes.data ?? []) as LeaderboardEntry[];

  const tournamentStarted = settings && new Date() >= new Date(settings.group_lock_at);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
        <div className="toto-card p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-4xl">🏆</span>
            <div>
              <span className="stage-chip">LEADERBOARD</span>
              <h2 className="font-display text-2xl sm:text-3xl mt-2">לוח התוצאות</h2>
              {!tournamentStarted && settings && (
                <p className="text-sm opacity-75 mt-1">
                  הטורניר מתחיל ב-{formatIsraelTime(settings.group_lock_at)}.
                  הנקודות יוצגו אחרי הזנת תוצאות המשחקים על ידי האדמין.
                </p>
              )}
            </div>
          </div>
        </div>

        <Leaderboard entries={entries} currentUserId={user.id} />

        <div className="mt-8 toto-card p-4 sm:p-6">
          <h3 className="font-display text-lg mb-3">📋 שיטת הניקוד</h3>
          {settings && (
            <ul className="text-sm space-y-1 font-mono">
              <li>• ניחוש 1X2 שלב הבתים: <b>{settings.pts_group}</b> נק׳</li>
              <li>• שמינית גמר (R32): <b>{settings.pts_r32}</b> נק׳</li>
              <li>• שמינית סופית (R16): <b>{settings.pts_r16}</b> נק׳</li>
              <li>• רבע גמר: <b>{settings.pts_qf}</b> נק׳</li>
              <li>• חצי גמר: <b>{settings.pts_sf}</b> נק׳</li>
              <li>• מקום שלישי: <b>{settings.pts_third}</b> נק׳</li>
              <li>• הגמר: <b>{settings.pts_final}</b> נק׳</li>
              <li>• זוכת המונדיאל: <b>{settings.pts_champion}</b> נק׳</li>
              <li>• מלך השערים: <b>{settings.pts_top_scorer}</b> נק׳</li>
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
