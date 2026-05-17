"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { MatchResult, SpecialBetType } from "@/types";

/**
 * שמירת הימור 1X2 על משחק בודד.
 * מדיניות ה-RLS תחסום אם המשחק כבר ננעל.
 */
export async function saveBetAction(matchId: number, prediction: MatchResult) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "לא מחובר" };

  const { error } = await supabase
    .from("bets")
    .upsert(
      { user_id: user.id, match_id: matchId, prediction, updated_at: new Date().toISOString() },
      { onConflict: "user_id,match_id" }
    );

  if (error) {
    return { error: error.message.includes("violates row-level security")
      ? "ההימור נעול - תאריך הנעילה עבר"
      : error.message };
  }

  revalidatePath("/");
  return { ok: true };
}

/**
 * שמירת הימור מיוחד (אלוף / מלך שערים)
 */
export async function saveSpecialBetAction(betType: SpecialBetType, value: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "לא מחובר" };

  if (!value.trim()) {
    // ערך ריק = מחיקה
    await supabase.from("special_bets").delete().match({ user_id: user.id, bet_type: betType });
    revalidatePath("/");
    return { ok: true };
  }

  const { error } = await supabase
    .from("special_bets")
    .upsert(
      { user_id: user.id, bet_type: betType, value: value.trim(), updated_at: new Date().toISOString() },
      { onConflict: "user_id,bet_type" }
    );

  if (error) {
    return { error: error.message.includes("violates row-level security")
      ? "ההימורים המיוחדים נעולים - הטורניר החל"
      : error.message };
  }

  revalidatePath("/");
  return { ok: true };
}
