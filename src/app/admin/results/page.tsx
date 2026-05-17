import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import type { Match } from "@/types";
import { STAGE_LABELS } from "@/types";
import AdminResultsClient from "./AdminResultsClient";

export const dynamic = "force-dynamic";

export default async function AdminResultsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/");

  const [matchesRes, specialResultsRes] = await Promise.all([
    supabase.from("matches").select("*").order("kickoff_at", { ascending: true }),
    supabase.from("special_results").select("*"),
  ]);

  const matches = (matchesRes.data ?? []) as Match[];
  const specialResults = specialResultsRes.data ?? [];

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-4 sm:p-6 pb-20">
        <div className="toto-card p-4 sm:p-6 mb-6">
          <span className="stage-chip">ADMIN · RESULTS</span>
          <h2 className="font-display text-2xl sm:text-3xl mt-3">הזנת תוצאות 📝</h2>
          <p className="text-sm opacity-75 mt-1">
            הזן 1/X/2 לכל משחק שהסתיים. עבור משחקי נוקאאוט - עדכן קודם את הנבחרות.
          </p>
        </div>
        <AdminResultsClient matches={matches} specialResults={specialResults} />
      </main>
    </>
  );
}
