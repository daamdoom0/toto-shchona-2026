"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { MatchResult, SpecialBetType } from "@/types";

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "לא מחובר", supabase: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) return { error: "אין הרשאת אדמין", supabase: null };
  return { supabase };
}

/**
 * עדכון תוצאת משחק - גם 1X2 וגם תוצאה מספרית (אופציונלי)
 */
export async function updateMatchResultAction(
  matchId: number,
  result: MatchResult,
  scoreA?: number | null,
  scoreB?: number | null
) {
  const { error: authErr, supabase } = await requireAdmin();
  if (authErr) return { error: authErr };

  const { error } = await supabase!
    .from("matches")
    .update({
      result,
      score_a: scoreA ?? null,
      score_b: scoreB ?? null,
      finalized: true,
    })
    .eq("id", matchId);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/leaderboard");
  return { ok: true };
}

/**
 * עדכון נבחרות במשחק נוקאאוט - אחרי שלב הבתים
 */
export async function setKnockoutTeamsAction(
  matchId: number,
  teamA: string,
  teamB: string
) {
  const { error: authErr, supabase } = await requireAdmin();
  if (authErr) return { error: authErr };

  const { error } = await supabase!
    .from("matches")
    .update({ team_a: teamA, team_b: teamB })
    .eq("id", matchId);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}

/**
 * עדכון תוצאת אלוף / מלך שערים
 */
export async function updateSpecialResultAction(betType: SpecialBetType, value: string) {
  const { error: authErr, supabase } = await requireAdmin();
  if (authErr) return { error: authErr };

  const { error } = await supabase!
    .from("special_results")
    .upsert({ bet_type: betType, value: value.trim(), updated_at: new Date().toISOString() });

  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/leaderboard");
  return { ok: true };
}

/**
 * עדכון שעת נעילה
 */
export async function updateLockTimeAction(
  field: "group_lock_at" | "r32_lock_at" | "r16_lock_at" | "qf_lock_at" | "sf_lock_at" | "third_lock_at" | "final_lock_at",
  isoTime: string
) {
  const { error: authErr, supabase } = await requireAdmin();
  if (authErr) return { error: authErr };

  const { error } = await supabase!
    .from("tournament_settings")
    .update({ [field]: isoTime })
    .eq("id", 1);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

/**
 * הענקת/הסרת הרשאת אדמין למשתמש (רק אדמין קיים)
 */
export async function toggleAdminAction(userId: string, makeAdmin: boolean) {
  const { error: authErr, supabase } = await requireAdmin();
  if (authErr) return { error: authErr };

  const { error } = await supabase!
    .from("profiles")
    .update({ is_admin: makeAdmin })
    .eq("id", userId);

  if (error) return { error: error.message };
  revalidatePath("/admin/users");
  return { ok: true };
}
