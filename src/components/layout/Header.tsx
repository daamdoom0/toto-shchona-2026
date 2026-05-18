import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/actions/auth";

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let profile = null;
  if (user) {
    const { data } = await supabase.from("profiles").select("display_name, is_admin").eq("id", user.id).single();
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          {/* לוגו */}
          <Link href="/" className="flex items-center gap-3 group">
            <div style={{
              width: 44, height: 44,
              background: "linear-gradient(135deg, #c9a84c, #f0c96a)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24,
              boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
              flexShrink: 0,
            }}>⚽</div>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}>
                טוטו <span style={{ color: "#f0c96a" }}>מונדיאל</span>{" "}
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", color: "#c9a84c" }}>2026</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "Space Mono", letterSpacing: "0.1em" }}>
                USA · MEXICO · CANADA
              </div>
            </div>
          </Link>

          {profile && (
            <nav className="flex items-center gap-1.5 flex-wrap">
              {[
                { href: "/", label: "🎯 הימורים" },
                { href: "/standings", label: "📊 טבלאות" },
                { href: "/leaderboard", label: "🏆 לוח" },
                { href: "/chat", label: "💬 צ׳אט" },
                { href: "/rules", label: "📋 הוראות" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "7px 14px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 6,
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "Heebo",
                    textDecoration: "none",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  className="hover:bg-white/15"
                >
                  {item.label}
                </Link>
              ))}

              {profile.is_admin && (
                <Link
                  href="/admin"
                  style={{
                    padding: "7px 14px",
                    background: "rgba(191,10,48,0.3)",
                    border: "1px solid rgba(191,10,48,0.4)",
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "Heebo",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  ⚙️ אדמין
                </Link>
              )}

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingRight: 8,
                borderRight: "1px solid rgba(255,255,255,0.15)",
                marginRight: 4,
              }}>
                <div style={{
                  width: 32, height: 32,
                  background: "linear-gradient(135deg, #c9a84c, #f0c96a)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, color: "#001a0e",
                  flexShrink: 0,
                }}>
                  {profile.display_name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}
                  className="hidden sm:inline">
                  {profile.display_name}
                </span>
              </div>

              <form action={logoutAction}>
                <button
                  type="submit"
                  style={{
                    padding: "7px 14px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 6,
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "Heebo",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  יציאה
                </button>
              </form>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
