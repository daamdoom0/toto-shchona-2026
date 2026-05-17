import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import AdminUsersClient from "./AdminUsersClient";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/");

  const { data: users } = await supabase
    .from("profiles")
    .select("id, display_name, is_admin, created_at")
    .order("created_at", { ascending: true });

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
        <div className="toto-card p-4 sm:p-6 mb-6">
          <span className="stage-chip">ADMIN · USERS</span>
          <h2 className="font-display text-2xl sm:text-3xl mt-3">ניהול משתמשים 👥</h2>
          <p className="text-sm opacity-75 mt-1">
            כאן רואים את כל המשתמשים. אתה יכול להעניק או להסיר הרשאות אדמין.
          </p>
        </div>
        <AdminUsersClient users={users ?? []} currentUserId={user.id} />
      </main>
    </>
  );
}
