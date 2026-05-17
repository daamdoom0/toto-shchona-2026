-- ==========================================================================
-- 04 - טבלת צ'אט שכונתי
-- ==========================================================================
-- הרץ את הקובץ הזה ב-SQL Editor של Supabase

create table public.chat_messages (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null,
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

-- כולם יכולים לקרוא
create policy "chat_select_all" on public.chat_messages
  for select using (true);

-- משתמש מחובר יכול לכתוב
create policy "chat_insert_own" on public.chat_messages
  for insert with check (auth.uid() = user_id);

-- משתמש יכול למחוק רק את ההודעות שלו
create policy "chat_delete_own" on public.chat_messages
  for delete using (auth.uid() = user_id);

-- אינדקס לביצועים
create index chat_messages_created_idx on public.chat_messages(created_at desc);

-- enable realtime
alter publication supabase_realtime add table public.chat_messages;
