"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: number;
  user_id: string;
  display_name: string;
  message: string;
  created_at: string;
}

interface Props {
  currentUserId: string;
  currentDisplayName: string;
  initialMessages: Message[];
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("he-IL", {
    timeZone: "Asia/Jerusalem",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
  });
}

export default function ChatRoom({ currentUserId, currentDisplayName, initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // גלילה לתחתית
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            // מנע כפילות
            if (prev.find((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    setInput("");

    const { error } = await supabase.from("chat_messages").insert({
      user_id: currentUserId,
      display_name: currentDisplayName,
      message: text,
    });

    if (error) {
      console.error(error);
      setInput(text); // החזר את הטקסט אם נכשל
    }

    setSending(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // קיבוץ הודעות לפי תאריך
  let lastDate = "";

  return (
    <div className="flex flex-col h-[70vh] toto-card overflow-hidden">
      {/* כותרת */}
      <div className="bg-toto-green text-toto-paper px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <span className="text-2xl">💬</span>
        <div>
          <h3 className="font-display text-xl">צ׳אט שכונתי</h3>
          <p className="text-xs opacity-80">כל מה שנאמר פה נשאר פה</p>
        </div>
      </div>

      {/* הודעות */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-toto-paper/50">
        {messages.length === 0 && (
          <div className="text-center text-sm opacity-50 mt-8">
            <p className="text-3xl mb-2">👋</p>
            <p>אף אחד עוד לא כתב. תהיה הראשון!</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMe = msg.user_id === currentUserId;
          const dateStr = formatDate(msg.created_at);
          const showDate = dateStr !== lastDate;
          lastDate = dateStr;

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center text-xs opacity-50 my-3 font-mono">{dateStr}</div>
              )}
              <div className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {/* אווטאר */}
                <div className="w-8 h-8 rounded-full bg-toto-green text-toto-paper flex items-center justify-center font-display text-sm flex-shrink-0">
                  {msg.display_name.charAt(0).toUpperCase()}
                </div>
                {/* בועה */}
                <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                  {!isMe && (
                    <span className="text-xs font-bold opacity-70 mb-0.5 px-1">{msg.display_name}</span>
                  )}
                  <div
                    className={`px-3 py-2 text-sm font-medium break-words ${
                      isMe
                        ? "bg-toto-green text-toto-paper rounded-r-none rounded-xl"
                        : "bg-white border-2 border-toto-ink/20 rounded-l-none rounded-xl"
                    }`}
                    style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.08)" }}
                  >
                    {msg.message}
                  </div>
                  <span className="text-[10px] opacity-50 mt-0.5 px-1 font-mono">
                    {formatTime(msg.created_at)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* שליחה */}
      <div className="flex gap-2 p-3 bg-white border-t-2 border-toto-ink/20 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="כתוב הודעה... (Enter לשליחה)"
          maxLength={500}
          className="input flex-1 py-2"
          disabled={sending}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || sending}
          className="btn text-sm py-2 px-4"
        >
          {sending ? "⏳" : "שלח ⚡"}
        </button>
      </div>
    </div>
  );
}
