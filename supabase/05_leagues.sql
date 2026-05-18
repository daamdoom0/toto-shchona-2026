-- ==========================================================================
-- 05 - מיני ליגות + תמונות פרופיל
-- ==========================================================================

-- הוסף avatar_url לפרופילים
alter table public.profiles add column if not exists avatar_url text;

-- ========== ליגות ==========
create table public.leagues (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 50),
  code text not null unique,             -- 6 תווים, קוד הזמנה
  creator_id uuid not null references public.profiles(id) on delete cascade,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.leagues enable row level security;

create policy "leagues_select_all" on public.leagues for select using (true);
create policy "leagues_insert_own" on public.leagues
  for insert with check (auth.uid() = creator_id);
create policy "leagues_update_creator" on public.leagues
  for update using (auth.uid() = creator_id);
create policy "leagues_delete_creator" on public.leagues
  for delete using (auth.uid() = creator_id);

-- ========== חברי ליגה ==========
create table public.league_members (
  league_id uuid not null references public.leagues(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (league_id, user_id)
);

alter table public.league_members enable row level security;

create policy "lm_select_all" on public.league_members for select using (true);
create policy "lm_insert_own" on public.league_members
  for insert with check (auth.uid() = user_id);
create policy "lm_delete_own" on public.league_members
  for delete using (auth.uid() = user_id);

-- אינדקסים
create index leagues_code_idx on public.leagues(code);
create index lm_user_idx on public.league_members(user_id);

-- ==========================================================================
-- הערות לאחר ריצה:
-- 1. צור bucket "avatars" ב-Supabase Storage (Public)
-- 2. צור bucket "league-images" ב-Supabase Storage (Public)
-- ==========================================================================
