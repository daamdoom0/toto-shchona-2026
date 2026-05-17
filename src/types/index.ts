export type MatchStage = "group" | "r32" | "r16" | "qf" | "sf" | "third" | "final";
export type MatchResult = "1" | "X" | "2";
export type SpecialBetType = "champion" | "top_scorer";

export interface Profile {
  id: string;
  display_name: string;
  is_admin: boolean;
  created_at: string;
}

export interface TournamentSettings {
  id: number;
  group_lock_at: string;
  r32_lock_at: string | null;
  r16_lock_at: string | null;
  qf_lock_at: string | null;
  sf_lock_at: string | null;
  third_lock_at: string | null;
  final_lock_at: string | null;
  pts_group: number;
  pts_r32: number;
  pts_r16: number;
  pts_qf: number;
  pts_sf: number;
  pts_third: number;
  pts_final: number;
  pts_champion: number;
  pts_top_scorer: number;
}

export interface Match {
  id: number;
  stage: MatchStage;
  group_letter: string | null;
  match_number_in_stage: number;
  team_a: string | null;
  team_b: string | null;
  team_a_placeholder: string | null;
  team_b_placeholder: string | null;
  venue: string | null;
  kickoff_at: string;
  result: MatchResult | null;
  score_a: number | null;
  score_b: number | null;
  finalized: boolean;
}

export interface Bet {
  user_id: string;
  match_id: number;
  prediction: MatchResult;
  updated_at: string;
}

export interface SpecialBet {
  user_id: string;
  bet_type: SpecialBetType;
  value: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  total_points: number;
  match_points: number;
  special_points: number;
  decided_matches: number;
  correct_predictions: number;
}

export const STAGE_LABELS: Record<MatchStage, string> = {
  group: "שלב הבתים",
  r32: "שמינית גמר",
  r16: "שמינית סופית (R16)",
  qf: "רבע הגמר",
  sf: "חצי הגמר",
  third: "מקום שלישי",
  final: "הגמר",
};

export const STAGE_LABELS_SHORT: Record<MatchStage, string> = {
  group: "בתים",
  r32: "R32",
  r16: "R16",
  qf: "רבע",
  sf: "חצי",
  third: "3",
  final: "גמר",
};
