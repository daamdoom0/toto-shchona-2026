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
      .select("display_name, is_admin")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <>
      <div className="mundial-flag-strip" />
      <header className="bg-toto-green text-toto-paper border-b-4 border-toto-ink">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl">⚽</div>
            <div>
              <h1 className="font-display text-2xl leading-none text-shadow-stamp">
                טוטו מונדיאל <span className="text-usa-gold">2026</span>
              </h1>
              <p className="text-xs opacity-80 mt-0.5 font-mono">USA · MEXICO · CANADA</p>
            </div>
          </Link>

          {profile && (
            <nav className="flex items-center gap-2 flex-wrap">
              <Link href="/" className="btn btn-secondary text-sm py-1.5 px-3">
                ההימורים שלי
              </Link>
              <Link href="/leaderboard" className="btn btn-gold text-sm py-1.5 px-3">
                🏆 לוח התוצאות
              </Link>
              {profile.is_admin && (
                <Link href="/admin" className="btn btn-danger text-sm py-1.5 px-3">
                  ⚙️ אדמין
                </Link>
              )}
              <span className="text-sm opacity-90 px-2 hidden sm:inline">
                שלום, <b>{profile.display_name}</b>
              </span>
              <form action={logoutAction}>
                <button type="submit" className="btn btn-secondary text-sm py-1.5 px-3">
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
