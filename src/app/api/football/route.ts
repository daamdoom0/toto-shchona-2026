import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TEAM_ID_MAP: Record<string, number> = {
  ARG: 26, AUT: 44, BEL: 1, BIH: 22, BRA: 6,
  CAN: 94, COD: 1580, COL: 20, CPV: 1591, CRO: 3,
  CUW: 1574, CZE: 49, ECU: 730, EGY: 23, ENG: 10,
  ESP: 9, FRA: 2, GER: 25, GHA: 31, HAI: 484, IRN: 29,
  IRQ: 165, JOR: 348, JPN: 28, KOR: 149, KSA: 36,
  MAR: 32, MEX: 16, NED: 1118, NOR: 41, NZL: 100,
  PAN: 514, PAR: 18, POR: 27, QAT: 90, RSA: 30,
  SCO: 1178, SEN: 33, SUI: 15, SWE: 630, TUN: 1534,
  TUR: 21, URU: 17, USA: 2036, UZB: 107, ALG: 1569,
  AUS: 26, CIV: 1543,
};

const WC_LEAGUE = 1;
const WC_SEASON = 2026;

export async function POST(req: Request) {
  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key missing" }, { status: 500 });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const res = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}`,
      { headers: { "x-apisports-key": apiKey } }
    );

    if (!res.ok) return NextResponse.json({ error: `API error: ${res.status}` }, { status: 502 });

    const data = await res.json();
    const fixtures = data.response ?? [];

    let updated = 0;
    let skipped = 0;

    for (const fix of fixtures) {
      const { fixture, goals, teams } = fix;
      if (!["FT", "AET", "PEN"].includes(fixture.status.short)) { skipped++; continue; }

      const homeId = teams.home.id;
      const awayId = teams.away.id;
      const homeCode = Object.entries(TEAM_ID_MAP).find(([, id]) => id === homeId)?.[0];
      const awayCode = Object.entries(TEAM_ID_MAP).find(([, id]) => id === awayId)?.[0];

      if (!homeCode || !awayCode) { skipped++; continue; }

      const scoreA = goals.home ?? 0;
      const scoreB = goals.away ?? 0;
      const result = scoreA > scoreB ? "1" : scoreA < scoreB ? "2" : "X";

      const { error } = await supabase
        .from("matches")
        .update({ result, score_a: scoreA, score_b: scoreB, finalized: true })
        .eq("team_a", homeCode)
        .eq("team_b", awayCode)
        .lt("kickoff_at", new Date().toISOString());

      if (!error) updated++;
      else skipped++;
    }

    return NextResponse.json({ ok: true, total: fixtures.length, updated, skipped });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST to trigger sync" });
}
