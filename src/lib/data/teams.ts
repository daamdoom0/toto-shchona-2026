// מפת קודי FIFA לשמות עבריים ודגלים

export type TeamCode = string;

export interface TeamInfo {
  code: TeamCode;
  name_he: string;
  name_en: string;
  flag: string;
}

export const TEAMS: Record<TeamCode, TeamInfo> = {
  MEX: { code: "MEX", name_he: "מקסיקו",        name_en: "Mexico",        flag: "🇲🇽" },
  RSA: { code: "RSA", name_he: "דרום אפריקה",    name_en: "South Africa",  flag: "🇿🇦" },
  KOR: { code: "KOR", name_he: "דרום קוריאה",    name_en: "South Korea",   flag: "🇰🇷" },
  CZE: { code: "CZE", name_he: "צ׳כיה",          name_en: "Czechia",       flag: "🇨🇿" },
  CAN: { code: "CAN", name_he: "קנדה",           name_en: "Canada",        flag: "🇨🇦" },
  BIH: { code: "BIH", name_he: "בוסניה",         name_en: "Bosnia",        flag: "🇧🇦" },
  QAT: { code: "QAT", name_he: "קטאר",           name_en: "Qatar",         flag: "🇶🇦" },
  SUI: { code: "SUI", name_he: "שווייץ",         name_en: "Switzerland",   flag: "🇨🇭" },
  BRA: { code: "BRA", name_he: "ברזיל",          name_en: "Brazil",        flag: "🇧🇷" },
  MAR: { code: "MAR", name_he: "מרוקו",          name_en: "Morocco",       flag: "🇲🇦" },
  HAI: { code: "HAI", name_he: "האיטי",          name_en: "Haiti",         flag: "🇭🇹" },
  SCO: { code: "SCO", name_he: "סקוטלנד",        name_en: "Scotland",      flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  USA: { code: "USA", name_he: "ארה״ב",          name_en: "United States", flag: "🇺🇸" },
  PAR: { code: "PAR", name_he: "פרגוואי",        name_en: "Paraguay",      flag: "🇵🇾" },
  AUS: { code: "AUS", name_he: "אוסטרליה",       name_en: "Australia",     flag: "🇦🇺" },
  TUR: { code: "TUR", name_he: "טורקיה",         name_en: "Türkiye",       flag: "🇹🇷" },
  GER: { code: "GER", name_he: "גרמניה",         name_en: "Germany",       flag: "🇩🇪" },
  CUW: { code: "CUW", name_he: "קוראסאו",        name_en: "Curaçao",       flag: "🇨🇼" },
  CIV: { code: "CIV", name_he: "חוף השנהב",      name_en: "Ivory Coast",   flag: "🇨🇮" },
  ECU: { code: "ECU", name_he: "אקוודור",        name_en: "Ecuador",       flag: "🇪🇨" },
  NED: { code: "NED", name_he: "הולנד",          name_en: "Netherlands",   flag: "🇳🇱" },
  JPN: { code: "JPN", name_he: "יפן",            name_en: "Japan",         flag: "🇯🇵" },
  SWE: { code: "SWE", name_he: "שוודיה",         name_en: "Sweden",        flag: "🇸🇪" },
  TUN: { code: "TUN", name_he: "תוניסיה",        name_en: "Tunisia",       flag: "🇹🇳" },
  BEL: { code: "BEL", name_he: "בלגיה",          name_en: "Belgium",       flag: "🇧🇪" },
  EGY: { code: "EGY", name_he: "מצרים",          name_en: "Egypt",         flag: "🇪🇬" },
  IRN: { code: "IRN", name_he: "איראן",          name_en: "Iran",          flag: "🇮🇷" },
  NZL: { code: "NZL", name_he: "ניו זילנד",      name_en: "New Zealand",   flag: "🇳🇿" },
  ESP: { code: "ESP", name_he: "ספרד",           name_en: "Spain",         flag: "🇪🇸" },
  CPV: { code: "CPV", name_he: "כף ורדה",        name_en: "Cape Verde",    flag: "🇨🇻" },
  KSA: { code: "KSA", name_he: "ערב הסעודית",    name_en: "Saudi Arabia",  flag: "🇸🇦" },
  URU: { code: "URU", name_he: "אורוגוואי",      name_en: "Uruguay",       flag: "🇺🇾" },
  FRA: { code: "FRA", name_he: "צרפת",           name_en: "France",        flag: "🇫🇷" },
  SEN: { code: "SEN", name_he: "סנגל",           name_en: "Senegal",       flag: "🇸🇳" },
  IRQ: { code: "IRQ", name_he: "עיראק",          name_en: "Iraq",          flag: "🇮🇶" },
  NOR: { code: "NOR", name_he: "נורווגיה",       name_en: "Norway",        flag: "🇳🇴" },
  ARG: { code: "ARG", name_he: "ארגנטינה",       name_en: "Argentina",     flag: "🇦🇷" },
  ALG: { code: "ALG", name_he: "אלג׳יריה",       name_en: "Algeria",       flag: "🇩🇿" },
  AUT: { code: "AUT", name_he: "אוסטריה",        name_en: "Austria",       flag: "🇦🇹" },
  JOR: { code: "JOR", name_he: "ירדן",           name_en: "Jordan",        flag: "🇯🇴" },
  POR: { code: "POR", name_he: "פורטוגל",        name_en: "Portugal",      flag: "🇵🇹" },
  COD: { code: "COD", name_he: "קונגו",          name_en: "DR Congo",      flag: "🇨🇩" },
  UZB: { code: "UZB", name_he: "אוזבקיסטן",      name_en: "Uzbekistan",    flag: "🇺🇿" },
  COL: { code: "COL", name_he: "קולומביה",       name_en: "Colombia",      flag: "🇨🇴" },
  ENG: { code: "ENG", name_he: "אנגליה",         name_en: "England",       flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  CRO: { code: "CRO", name_he: "קרואטיה",        name_en: "Croatia",       flag: "🇭🇷" },
  GHA: { code: "GHA", name_he: "גאנה",           name_en: "Ghana",         flag: "🇬🇭" },
  PAN: { code: "PAN", name_he: "פנמה",           name_en: "Panama",        flag: "🇵🇦" },
};

export function getTeam(code: string | null | undefined): TeamInfo | null {
  if (!code) return null;
  return TEAMS[code] ?? null;
}

// רשימה לשימוש ב-dropdown של הימורים מיוחדים (אלוף)
export const ALL_TEAMS_LIST: TeamInfo[] = Object.values(TEAMS).sort((a, b) =>
  a.name_he.localeCompare(b.name_he, "he")
);
