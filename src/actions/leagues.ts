"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function createLeagueAction(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "לא מחובר" };

  const name = String(formData.get("name") || "").trim();
  if (!name) return { error: "שם הליגה חסר" };

  // העלאת תמונה אם יש
  let imageUrl: string | null = null;
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage
      .from("league-images")
      .upload(path, imageFile, { upsert: true });
    if (!uploadErr) {
      const { data: { publicUrl } } = supabase.storage.from("league-images").getPublicUrl(path);
      imageUrl = publicUrl;
    }
  }

  // צור קוד ייחודי
  let code = generateCode();
  let attempts = 0;
  while (attempts < 5) {
    const { data } = await supabase.from("leagues").select("id").eq("code", code).single();
    if (!data) break;
    code = generateCode();
    attempts++;
  }

  const { data: league, error } = await supabase
    .from("leagues")
    .insert({ name, code, creator_id: user.id, image_url: imageUrl })
    .select("id, code")
    .single();

  if (error) return { error: error.message };

  // הצרף את היוצר לליגה
  await supabase.from("league_members").insert({ league_id: league.id, user_id: user.id });

  revalidatePath("/leagues");
  return { ok: true, leagueId: league.id, code: league.code };
}

export async function joinLeagueAction(code: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "לא מחובר" };

  const { data: league } = await supabase
    .from("leagues")
    .select("id, name")
    .eq("code", code.toUpperCase().trim())
    .single();

  if (!league) return { error: "קוד לא נמצא — בדוק שוב" };

  // בדוק אם כבר חבר
  const { data: existing } = await supabase
    .from("league_members")
    .select("user_id")
    .eq("league_id", league.id)
    .eq("user_id", user.id)
    .single();

  if (existing) return { error: "אתה כבר חבר בליגה זו" };

  const { error } = await supabase
    .from("league_members")
    .insert({ league_id: league.id, user_id: user.id });

  if (error) return { error: error.message };

  revalidatePath("/leagues");
  return { ok: true, leagueId: league.id, name: league.name };
}

export async function updateAvatarAction(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "לא מחובר" };

  const file = formData.get("avatar") as File | null;
  if (!file || file.size === 0) return { error: "לא נבחר קובץ" };

  const ext = file.name.split(".").pop();
  const path = `${user.id}.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true });

  if (uploadErr) return { error: uploadErr.message };

  const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);

  const { error: updateErr } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateErr) return { error: updateErr.message };

  revalidatePath("/", "layout");
  return { ok: true, url: publicUrl };
}
