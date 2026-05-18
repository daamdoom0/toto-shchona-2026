import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import CreateLeagueForm from "@/components/leagues/CreateLeagueForm";
import JoinLeagueForm from "@/components/leagues/JoinLeagueForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface League {
  id: string;
  name: string;
  code: string;
  image_url: string | null;
  creator_id: string;
}

export default async function LeaguesPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: memberships } = await supabase
    .from("league_members")
    .select("league_id, leagues(id, name, code, image_url, creator_id)")
    .eq("user_id", user.id);

  const myLeagues: League[] = [];
  for (const m of memberships ?? []) {
    const l = m.leagues;
    if (!l) continue;
    const league = Array.isArray(l) ? l[0] : l;
    if (league) myLeagues.push(league as League);
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
        <div className="toto-card p-5 mb-6">
          <span className="stage-chip">LEAGUES</span>
          <h2 className="hero-title mt-3">מיני ליגות</h2>
          <p className="hero-subtitle">התחרה מול החברים שלך בליגה פרטית</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <CreateLeagueForm />
          <JoinLeagueForm />
        </div>

        {myLeagues.length > 0 && (
          <div>
            <h3 className="font-display text-xl mb-4">הליגות שלי</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myLeagues.map((league) => (
                <Link key={league.id} href={`/leagues/${league.id}`} className="toto-card block hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 p-4">
                    {league.image_url ? (
                      <img src={league.image_url} alt={league.name} className="w-16 h-16 rounded-lg object-cover border-2 border-toto-green"/>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-toto-green flex items-center justify-content-center text-3xl flex items-center justify-center">🏆</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-lg truncate">{league.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-sm bg-toto-paper border border-toto-ink/20 px-2 py-0.5 rounded">
                          {league.code}
                        </span>
                        {league.creator_id === user.id && (
                          <span className="text-xs font-bold text-usa-gold bg-toto-green px-2 py-0.5 rounded">יוצר</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
