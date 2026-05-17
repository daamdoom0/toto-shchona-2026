import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import ChatRoom from "@/components/chat/ChatRoom";

export const dynamic = "force-dynamic";

export default async function ChatPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [profileRes, messagesRes] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("id", user.id).single(),
    supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(200),
  ]);

  const displayName = profileRes.data?.display_name ?? "אנונימי";
  const messages = messagesRes.data ?? [];

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 sm:p-6 pb-20">
        <div className="toto-card p-4 sm:p-6 mb-6">
          <span className="stage-chip">CHAT</span>
          <h2 className="font-display text-2xl sm:text-3xl mt-3">💬 צ׳אט שכונתי</h2>
          <p className="text-sm opacity-75 mt-1">
            כל המשתתפים יכולים לכתוב כאן. ההיסטוריה נשמרת לתמיד.
          </p>
        </div>

        <ChatRoom
          currentUserId={user.id}
          currentDisplayName={displayName}
          initialMessages={messages}
        />
      </main>
    </>
  );
}
