import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LeaguePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: league } = await supabase
    .from("leagues")
    .select("id, name, code, image_url, creator_id, created_at")
    .eq("id", params.id)
    .single();

  if (!league) notFound();

  // חברי הליגה
  const { data: members } = await supabase
    .from("league_members")
    .select("user_id")
    .eq("league_id", params.id);

  const memberIds = (members ?? []).map((m) => m.user_id);

  // בדוק שהמשתמש חבר
  if (!memberIds.includes(user.id)) {
    redirect("/leagues");
  }

  // לוח תוצאות מסונן לחברי הליגה
  const { data: leaderboard } = await supabase
    .from("leaderboard")
    .select("*")
    .in("user_id", memberIds);

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url")
    .in("id", memberIds);

  const profileMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]));

  const sorted = (leaderboard ?? []).sort((a, b) => b.total_points - a.total_points);

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 sm:p-6 pb-20">
        {/* League header */}
        <div className="toto-card mb-6 overflow-hidden">
          <div className="flex items-center gap-5 p-5">
            {league.image_url ? (
              <img src={league.image_url} alt={league.name} className="w-20 h-20 rounded-xl object-cover border-3 border-toto-green shadow-md flex-shrink-0"/>
            ) : (
              <div className="w-20 h-20 rounded-xl bg-toto-green flex items-center justify-center text-4xl flex-shrink-0">🏆</div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-2xl">{league.name}</h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-sm text-muted">קוד הזמנה:</span>
                <code className="font-mono text-base font-bold bg-usa-gold/20 border border-usa-gold/40 px-3 py-1 rounded-lg tracking-widest">
                  {league.code}
                </code>
                <span className="text-xs text-muted">{memberIds.length} חברים</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mini leaderboard */}
        <div className="toto-card overflow-hidden">
          <div style={{ background: "linear-gradient(135deg, #0a1f13, #004830)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#c9a84c" }}>🏆</span>
            <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>טבלת הליגה</span>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
            <thead>
              <tr style={{ background: "rgba(0,90,60,0.06)" }}>
                <th style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: "#666", textAlign: "right", letterSpacing: "0.05em" }}>#</th>
                <th style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: "#666", textAlign: "right" }}>שחקן</th>
                <th style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: "#666", textAlign: "center" }}>נק׳</th>
                <th style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: "#666", textAlign: "center" }}>% ניחושים</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => {
                const profile = profileMap[entry.user_id];
                const pct = entry.decided_matches > 0
                  ? Math.round((entry.correct_predictions / entry.decided_matches) * 100)
                  : 0;
                const isMe = entry.user_id === user.id;
                const medals = ["🥇", "🥈", "🥉"];

                return (
                  <tr key={entry.user_id} style={{
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    background: i === 0 ? "rgba(201,168,76,0.08)" : isMe ? "rgba(0,90,60,0.04)" : "transparent",
                  }}>
                    <td style={{ padding: "12px", fontSize: 16, textAlign: "right" }}>
                      {medals[i] ?? <span style={{ color: "#aaa", fontWeight: 700, fontSize: 13 }}>{i + 1}</span>}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid #ddd" }}/>
                        ) : (
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0a4a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#c9a84c", flexShrink: 0 }}>
                            {(profile?.display_name ?? "?").charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span style={{ fontWeight: isMe ? 800 : 600, fontSize: 14 }}>
                          {profile?.display_name ?? "—"}
                          {isMe && <span style={{ fontSize: 11, color: "#0a4a2a", marginRight: 6 }}>• אתה</span>}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center", fontSize: 18, fontWeight: 800, color: "#0a4a2a", fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {entry.total_points}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#666" }}>
                      {entry.decided_matches > 0 ? `${pct}%` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link href="/leagues" style={{ fontSize: 13, color: "#0a4a2a", fontWeight: 600, textDecoration: "underline" }}>
            ← חזרה לכל הליגות
          </Link>
        </div>
      </main>
    </>
  );
}
