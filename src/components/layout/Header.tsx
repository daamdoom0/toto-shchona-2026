import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/actions/auth";

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, is_admin, avatar_url")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <>
      <div className="mundial-flag-strip" />
      <header style={{
        background: "linear-gradient(135deg, #001a0e 0%, #003320 40%, #004830 100%)",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <Link href="/" className="flex items-center gap-3">
            <div style={{
              width: 40, height: 40,
              background: "linear-gradient(135deg, #c9a84c, #f0c96a)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, boxShadow: "0 2px 8px rgba(201,168,76,0.4)", flexShrink: 0,
            }}>⚽</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                טוטו <span style={{ color: "#f0c96a" }}>מונדיאל</span>{" "}
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1rem", color: "#c9a84c" }}>2026</span>
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "Space Mono", letterSpacing: "0.1em" }}>
                USA · MEXICO · CANADA
              </div>
            </div>
          </Link>

          {profile && (
            <nav className="flex items-center gap-1 flex-wrap">
              {[
                { href: "/",          label: "הימורים" },
                { href: "/standings", label: "טבלאות" },
                { href: "/leaderboard", label: "לוח" },
                { href: "/leagues",   label: "ליגות" },
                { href: "/chat",      label: "צ׳אט" },
                { href: "/rules",     label: "הוראות" },
              ].map((item) => (
                <Link key={item.href} href={item.href} style={{
                  padding: "6px 11px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}>
                  {item.label}
                </Link>
              ))}

              {profile.is_admin && (
                <Link href="/admin" style={{
                  padding: "6px 11px",
                  background: "rgba(191,10,48,0.3)",
                  border: "1px solid rgba(191,10,48,0.4)",
                  borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700,
                  textDecoration: "none", whiteSpace: "nowrap",
                }}>אדמין</Link>
              )}

              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 8, borderRight: "1px solid rgba(255,255,255,0.12)", marginRight: 2 }}>
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.display_name}
                    style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,168,76,0.6)", flexShrink: 0 }}/>
                ) : (
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: "linear-gradient(135deg, #c9a84c, #f0c96a)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, color: "#001a0e", flexShrink: 0,
                  }}>
                    {profile.display_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 600 }} className="hidden sm:inline">
                  {profile.display_name}
                </span>
              </div>

              <form action={logoutAction}>
                <button type="submit" style={{
                  padding: "6px 11px", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6,
                  color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 600,
                  fontFamily: "Heebo", cursor: "pointer",
                }}>יציאה</button>
              </form>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
