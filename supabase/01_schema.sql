-- ==========================================================================
-- TOTO MONDIAL 2026 - DATABASE SCHEMA
-- ==========================================================================
-- הרץ את הקובץ הזה ב-Supabase SQL Editor במלואו לפני seed.
-- ==========================================================================

-- 1) טבלת פרופילים - מרחיבה את auth.users
-- ==========================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- כל משתמש יכול לקרוא את כל הפרופילים (לצורך לוח התוצאות)
create policy "profiles_select_all" on public.profiles
  for select using (true);

-- משתמש יכול לעדכן רק את שלו
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- 2) הגדרות טורניר - שורה אחת בלבד
-- ==========================================================================
create table public.tournament_settings (
  id int primary key default 1,
  -- שעת נעילה גלובלית של שלב הבתים + הימורים מיוחדים
  group_lock_at timestamptz not null,
  -- שמירה לעתיד - אפשרות לדרוס נעילות פר-סבב נוקאאוט
  r32_lock_at timestamptz,
  r16_lock_at timestamptz,
  qf_lock_at timestamptz,
  sf_lock_at timestamptz,
  third_lock_at timestamptz,
  final_lock_at timestamptz,
  -- ניקוד פר-שלב
  pts_group int not null default 3,
  pts_r32 int not null default 4,
  pts_r16 int not null default 6,
  pts_qf int not null default 10,
  pts_sf int not null default 15,
  pts_third int not null default 8,
  pts_final int not null default 20,
  pts_champion int not null default 25,
  pts_top_scorer int not null default 15,
  constraint single_row check (id = 1)
);

alter table public.tournament_settings enable row level security;

-- כולם יכולים לקרוא את ההגדרות
create policy "settings_select_all" on public.tournament_settings
  for select using (true);

-- רק אדמין יכול לעדכן
create policy "settings_update_admin" on public.tournament_settings
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );

-- 3) משחקים - כל 104 המשחקים של המונדיאל
-- ==========================================================================
create type match_stage as enum ('group', 'r32', 'r16', 'qf', 'sf', 'third', 'final');
create type match_result as enum ('1', 'X', '2');

create table public.matches (
  id int primary key, -- מספר משחק רץ
  stage match_stage not null,
  group_letter char(1), -- A..L לבתים, NULL לנוקאאוט
  match_number_in_stage int not null, -- 1..16 ב-R32, 1..6 בבית וכו'
  team_a text, -- קוד נבחרת או NULL לנוקאאוט שעוד לא ידועה
  team_b text,
  team_a_placeholder text, -- "מנצחת בית A" וכו' עד שהקבוצה נקבעת
  team_b_placeholder text,
  venue text,
  kickoff_at timestamptz not null,
  -- תוצאה - מתמלא ע"י אדמין
  result match_result, -- 1=נצחון בית, X=תיקו, 2=נצחון חוץ (אחרי 90 דק')
  score_a int,
  score_b int,
  finalized boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.matches enable row level security;

-- כולם רואים את כל המשחקים
create policy "matches_select_all" on public.matches
  for select using (true);

-- רק אדמין יכול לעדכן (תוצאות, נבחרות בנוקאאוט)
create policy "matches_update_admin" on public.matches
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );
create policy "matches_insert_admin" on public.matches
  for insert with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );

-- אינדקס לחיפושים נפוצים
create index matches_stage_idx on public.matches(stage, kickoff_at);

-- 4) הימורים - 1X2 פר משחק
-- ==========================================================================
create table public.bets (
  user_id uuid not null references public.profiles(id) on delete cascade,
  match_id int not null references public.matches(id) on delete cascade,
  prediction match_result not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, match_id)
);

alter table public.bets enable row level security;

-- ============== מדיניות גישה - הליבה של "הסתרה עד נעילה" ==============

-- משתמש רואה תמיד את ההימורים של עצמו
create policy "bets_select_own" on public.bets
  for select using (auth.uid() = user_id);

-- הימור של מישהו אחר נחשף רק אחרי שהמשחק שלו ננעל:
-- אם זה משחק בית - נחשף עם group_lock_at שעבר
-- אם זה משחק נוקאאוט - נחשף עם kickoff_at של אותו משחק
create policy "bets_select_after_lock" on public.bets
  for select using (
    exists (
      select 1 from public.matches m
      cross join public.tournament_settings s
      where m.id = match_id
      and (
        (m.stage = 'group' and now() >= s.group_lock_at)
        or (m.stage <> 'group' and now() >= m.kickoff_at)
      )
    )
  );

-- משתמש יכול להוסיף/לעדכן/למחוק רק את ההימורים שלו, ורק לפני נעילה
create policy "bets_insert_own_before_lock" on public.bets
  for insert with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.matches m
      cross join public.tournament_settings s
      where m.id = match_id
      and (
        (m.stage = 'group' and now() < s.group_lock_at)
        or (m.stage <> 'group' and now() < m.kickoff_at and m.team_a is not null and m.team_b is not null)
      )
    )
  );

create policy "bets_update_own_before_lock" on public.bets
  for update using (
    auth.uid() = user_id
    and exists (
      select 1 from public.matches m
      cross join public.tournament_settings s
      where m.id = match_id
      and (
        (m.stage = 'group' and now() < s.group_lock_at)
        or (m.stage <> 'group' and now() < m.kickoff_at)
      )
    )
  );

create policy "bets_delete_own_before_lock" on public.bets
  for delete using (
    auth.uid() = user_id
    and exists (
      select 1 from public.matches m
      cross join public.tournament_settings s
      where m.id = match_id
      and (
        (m.stage = 'group' and now() < s.group_lock_at)
        or (m.stage <> 'group' and now() < m.kickoff_at)
      )
    )
  );

create index bets_match_idx on public.bets(match_id);

-- 5) הימורים מיוחדים - אלוף ומלך השערים
-- ==========================================================================
create type special_bet_type as enum ('champion', 'top_scorer');

create table public.special_bets (
  user_id uuid not null references public.profiles(id) on delete cascade,
  bet_type special_bet_type not null,
  value text not null, -- שם נבחרת או שם שחקן
  updated_at timestamptz not null default now(),
  primary key (user_id, bet_type)
);

alter table public.special_bets enable row level security;

-- אדמין רושם את התוצאה האמיתית בטבלה הזו
create table public.special_results (
  bet_type special_bet_type primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.special_results enable row level security;
create policy "special_results_select_all" on public.special_results for select using (true);
create policy "special_results_admin" on public.special_results for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
) with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);

-- משתמש רואה את שלו תמיד
create policy "special_bets_select_own" on public.special_bets
  for select using (auth.uid() = user_id);

-- של אחרים - אחרי נעילת הבתים (אותה נעילה כמו הבתים)
create policy "special_bets_select_after_lock" on public.special_bets
  for select using (
    exists (select 1 from public.tournament_settings s where now() >= s.group_lock_at)
  );

create policy "special_bets_modify_own_before_lock" on public.special_bets
  for all using (
    auth.uid() = user_id
    and exists (select 1 from public.tournament_settings s where now() < s.group_lock_at)
  ) with check (
    auth.uid() = user_id
    and exists (select 1 from public.tournament_settings s where now() < s.group_lock_at)
  );

-- 6) טריגר ליצירת פרופיל אוטומטית בהרשמה
-- ==========================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_email text;
begin
  -- מייל אדמין מוגדר ב-Supabase secrets (vault) או ידנית
  -- אופציה פשוטה: כל משתמש שנרשם, אם הוא הראשון - הוא אדמין
  insert into public.profiles (id, display_name, is_admin)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    (select count(*) = 0 from public.profiles) -- האדמין הוא הראשון שנרשם
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 7) View לחישוב ניקוד
-- ==========================================================================
create or replace view public.user_scores as
select
  p.id as user_id,
  p.display_name,
  coalesce(sum(
    case
      when b.prediction = m.result and m.finalized then
        case m.stage
          when 'group' then s.pts_group
          when 'r32' then s.pts_r32
          when 'r16' then s.pts_r16
          when 'qf' then s.pts_qf
          when 'sf' then s.pts_sf
          when 'third' then s.pts_third
          when 'final' then s.pts_final
        end
      else 0
    end
  ), 0) as match_points,
  coalesce((
    select sum(
      case when sb.value = sr.value then
        case sb.bet_type
          when 'champion' then s.pts_champion
          when 'top_scorer' then s.pts_top_scorer
        end
      else 0 end
    )
    from public.special_bets sb
    left join public.special_results sr on sr.bet_type = sb.bet_type
    where sb.user_id = p.id
  ), 0) as special_points,
  count(b.match_id) filter (where m.finalized) as decided_matches,
  count(b.match_id) filter (where b.prediction = m.result and m.finalized) as correct_predictions
from public.profiles p
cross join public.tournament_settings s
left join public.bets b on b.user_id = p.id
left join public.matches m on m.id = b.match_id
group by p.id, p.display_name, s.pts_champion, s.pts_top_scorer;

-- View קומפקטית עם הניקוד הכולל
create or replace view public.leaderboard as
select
  user_id,
  display_name,
  match_points + special_points as total_points,
  match_points,
  special_points,
  decided_matches,
  correct_predictions
from public.user_scores
order by total_points desc, correct_predictions desc;

grant select on public.user_scores to authenticated;
grant select on public.leaderboard to authenticated;

-- ==========================================================================
-- סיום סכמה
-- ==========================================================================
