import type { Match, TournamentSettings } from "@/types";

/**
 * האם משחק נעול להימור?
 * - שלב בתים: לפי group_lock_at הגלובלי
 * - נוקאאוט: לפי kickoff_at של המשחק הספציפי
 *   + הקבוצות חייבות להיות ידועות (team_a/team_b לא NULL)
 */
export function isMatchLocked(match: Match, settings: TournamentSettings): boolean {
  const now = new Date();

  if (match.stage === "group") {
    return now >= new Date(settings.group_lock_at);
  }

  // נוקאאוט: לא נעול אם אין עדיין נבחרות
  if (!match.team_a || !match.team_b) return true; // נחשב נעול כל עוד אי-אפשר להמר
  return now >= new Date(match.kickoff_at);
}

/**
 * האם ניתן להמר על המשחק עכשיו?
 */
export function canBet(match: Match, settings: TournamentSettings): boolean {
  if (match.stage === "group") {
    return new Date() < new Date(settings.group_lock_at);
  }
  if (!match.team_a || !match.team_b) return false;
  return new Date() < new Date(match.kickoff_at);
}

/**
 * האם הימור מיוחד (אלוף, מלך שערים) פתוח?
 */
export function canSpecialBet(settings: TournamentSettings): boolean {
  return new Date() < new Date(settings.group_lock_at);
}

/**
 * תאריך + שעה מפורמטים לעברית עם אזור זמן ישראל
 */
export function formatIsraelTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * רק תאריך
 */
export function formatIsraelDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("he-IL", {
    timeZone: "Asia/Jerusalem",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });
}

/**
 * רק שעה
 */
export function formatIsraelHour(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("he-IL", {
    timeZone: "Asia/Jerusalem",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * זמן עד שעת היעד בפורמט "3 ימים, 7 שעות"
 */
export function timeUntil(iso: string, now: Date = new Date()): string {
  const target = new Date(iso);
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) return "התחיל";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diffMs / (1000 * 60)) % 60);

  if (days > 0) return `${days} ימים, ${hours} שעות`;
  if (hours > 0) return `${hours} שעות, ${mins} דק׳`;
  return `${mins} דק׳`;
}
