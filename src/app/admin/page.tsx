import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, display_name")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto p-6">
          <div className="toto-card p-8 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="font-display text-2xl mb-2">אין הרשאת גישה</h2>
            <p className="opacity-75">רק אדמין יכול לגשת לעמוד הזה.</p>
          </div>
        </main>
      </>
    );
  }

  // ספירות שימושיות
  const [usersCount, matchesCount, finalizedCount, betsCount] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("matches").select("*", { count: "exact", head: true }),
    supabase.from("matches").select("*", { count: "exact", head: true }).eq("finalized", true),
    supabase.from("bets").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "משתמשים רשומים", value: usersCount.count ?? 0, emoji: "👥" },
    { label: "סה״כ משחקים", value: matchesCount.count ?? 0, emoji: "⚽" },
    { label: "משחקים שהסתיימו", value: finalizedCount.count ?? 0, emoji: "✅" },
    { label: "סה״כ הימורים", value: betsCount.count ?? 0, emoji: "🎯" },
  ];

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-4 sm:p-6 pb-20">
        <div className="toto-card p-4 sm:p-6 mb-8">
          <span className="stage-chip">ADMIN</span>
          <h2 className="font-display text-3xl mt-3">לוח בקרה ⚙️</h2>
          <p className="text-sm opacity-75 mt-1">שלום, {profile.display_name}. כאן אתה שולט בכל המנגנון.</p>
        </div>

        {/* סטטיסטיקות */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="toto-card p-4 text-center">
              <div className="text-3xl">{s.emoji}</div>
              <div className="font-display text-3xl text-toto-green mt-1">{s.value}</div>
              <div className="text-xs opacity-75 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* פעולות */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/admin/results" className="toto-card p-6 hover:scale-[1.01] transition-transform">
            <div className="text-4xl mb-2">📝</div>
            <h3 className="font-display text-xl">הזנת תוצאות</h3>
            <p className="text-sm opacity-75 mt-1">
              הזן את תוצאות המשחקים (1, X, 2) ואת הנבחרות שעלו לשלבי הנוקאאוט.
            </p>
          </Link>

          <Link href="/admin/users" className="toto-card p-6 hover:scale-[1.01] transition-transform">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="font-display text-xl">ניהול משתמשים</h3>
            <p className="text-sm opacity-75 mt-1">
              צפייה ברשימת המשתתפים והענקת הרשאות אדמין נוספים.
            </p>
          </Link>
        </div>

        <div className="mt-8 toto-card p-4 sm:p-6 text-sm">
          <h3 className="font-display text-lg mb-2">💡 איך זה עובד</h3>
          <ol className="list-decimal pr-6 space-y-1.5">
            <li>לפני שריקת המשחק הראשון, כל המשתמשים ממרים על שלב הבתים + אלוף + מלך שערים.</li>
            <li>הכל ננעל ברגע שהמשחק הראשון מתחיל. אחרי זה, ההימורים גלויים לכולם.</li>
            <li>אתה כאדמין מזין את תוצאות המשחקים בדף ״הזנת תוצאות״. הניקוד מתעדכן אוטומטית.</li>
            <li>אחרי שלב הבתים: אתה מעדכן את הנבחרות שעלו לשמינית הגמר (R32) באותו דף. ההימורים נפתחים אוטומטית.</li>
            <li>חוזרים על זה לכל שלב נוקאאוט - הצמדים נקבעים מ-FIFA, אתה מזין אותם.</li>
            <li>בסיום הטורניר אתה מזין את אלוף המונדיאל ומלך השערים, ולוח התוצאות סוגר את הניקוד הסופי.</li>
          </ol>
        </div>
      </main>
    </>
  );
}
