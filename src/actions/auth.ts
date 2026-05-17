"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "אנא מלא מייל וסיסמה" };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: hebrewAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function registerAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const displayName = String(formData.get("display_name") || "").trim();

  if (!email || !password || !displayName) {
    return { error: "אנא מלא את כל השדות" };
  }
  if (password.length < 6) {
    return { error: "הסיסמה חייבת להיות לפחות 6 תווים" };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });

  if (error) {
    return { error: hebrewAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

function hebrewAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "מייל או סיסמה שגויים";
  if (m.includes("already registered")) return "המייל כבר רשום במערכת";
  if (m.includes("email not confirmed")) return "יש לאשר את המייל לפני התחברות";
  if (m.includes("rate limit")) return "יותר מדי ניסיונות - נסה שוב בעוד דקה";
  return msg;
}
