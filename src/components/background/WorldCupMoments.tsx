"use client";

/**
 * סילואטות SVG של רגעי מונדיאל אגדיים.
 * דמויות גנריות המבוססות על תנוחות ספורט ידועות — לא דיוקנאות ספציפיים.
 * מוצג כ-watermark עדין ברקע.
 */
export default function WorldCupMoments() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ואן פרסי — ניגוח צלילה (הולנד 2014) */}
      <svg
        viewBox="0 0 120 160"
        className="moment-figure"
        style={{ position: "absolute", top: "8%", left: "2%", width: 140, opacity: 0.045, transform: "rotate(-10deg)" }}
      >
        {/* גוף אופקי בצלילה */}
        <ellipse cx="60" cy="80" rx="48" ry="12" fill="currentColor" transform="rotate(-20 60 80)" />
        {/* ראש */}
        <circle cx="98" cy="55" r="14" fill="currentColor" />
        {/* רגל בועטת */}
        <ellipse cx="20" cy="95" rx="25" ry="9" fill="currentColor" transform="rotate(15 20 95)" />
        {/* זרועות פרושות */}
        <ellipse cx="55" cy="55" rx="20" ry="7" fill="currentColor" transform="rotate(-35 55 55)" />
        <ellipse cx="65" cy="108" rx="18" ry="7" fill="currentColor" transform="rotate(25 65 108)" />
        {/* כדור */}
        <circle cx="10" cy="78" r="10" fill="currentColor" />
      </svg>

      {/* באג'ו — ברכיים (איטליה 94 פנדל שהוחטא) */}
      <svg
        viewBox="0 0 100 160"
        className="moment-figure"
        style={{ position: "absolute", bottom: "15%", left: "5%", width: 110, opacity: 0.04, transform: "rotate(5deg)" }}
      >
        {/* ראש כפוף */}
        <circle cx="50" cy="30" r="14" fill="currentColor" />
        {/* גוף כפוף קדימה */}
        <ellipse cx="50" cy="60" rx="16" ry="28" fill="currentColor" transform="rotate(20 50 60)" />
        {/* ברכיים על הקרקע */}
        <ellipse cx="35" cy="110" rx="12" ry="8" fill="currentColor" />
        <ellipse cx="65" cy="112" rx="12" ry="8" fill="currentColor" />
        {/* זרועות לצדדים כלפי מטה */}
        <ellipse cx="20" cy="80" rx="18" ry="7" fill="currentColor" transform="rotate(40 20 80)" />
        <ellipse cx="80" cy="82" rx="18" ry="7" fill="currentColor" transform="rotate(-40 80 82)" />
      </svg>

      {/* שוער בצלילה אגדית — גורדון בנקס (אנגליה 70) */}
      <svg
        viewBox="0 0 160 120"
        className="moment-figure"
        style={{ position: "absolute", top: "35%", right: "1%", width: 160, opacity: 0.04, transform: "rotate(5deg)" }}
      >
        {/* גוף בצלילה */}
        <ellipse cx="80" cy="65" rx="55" ry="14" fill="currentColor" transform="rotate(-30 80 65)" />
        {/* ראש */}
        <circle cx="130" cy="35" r="15" fill="currentColor" />
        {/* יד פרושה למעלה */}
        <ellipse cx="145" cy="18" rx="20" ry="8" fill="currentColor" transform="rotate(-50 145 18)" />
        {/* רגליים */}
        <ellipse cx="25" cy="90" rx="22" ry="9" fill="currentColor" transform="rotate(20 25 90)" />
        <ellipse cx="35" cy="108" rx="20" ry="8" fill="currentColor" transform="rotate(-10 35 108)" />
        {/* כדור מעל היד */}
        <circle cx="148" cy="8" r="9" fill="currentColor" />
      </svg>

      {/* זידאן — מרים גביע (צרפת 98/2006) */}
      <svg
        viewBox="0 0 100 180"
        className="moment-figure"
        style={{ position: "absolute", bottom: "5%", right: "4%", width: 100, opacity: 0.045, transform: "rotate(-3deg)" }}
      >
        {/* ראש */}
        <circle cx="50" cy="20" r="14" fill="currentColor" />
        {/* גוף זקוף */}
        <ellipse cx="50" cy="75" rx="18" ry="38" fill="currentColor" />
        {/* זרועות מורמות */}
        <ellipse cx="20" cy="48" rx="22" ry="8" fill="currentColor" transform="rotate(-55 20 48)" />
        <ellipse cx="80" cy="46" rx="22" ry="8" fill="currentColor" transform="rotate(55 80 46)" />
        {/* גביע */}
        <ellipse cx="50" cy="5" rx="12" ry="7" fill="currentColor" />
        <rect x="44" y="5" width="12" height="12" fill="currentColor" />
        <ellipse cx="50" cy="17" rx="16" ry="5" fill="currentColor" />
        {/* רגליים */}
        <ellipse cx="38" cy="145" rx="10" ry="32" fill="currentColor" transform="rotate(-5 38 145)" />
        <ellipse cx="62" cy="145" rx="10" ry="32" fill="currentColor" transform="rotate(5 62 145)" />
      </svg>

      {/* מרדונה — ריצה עם כדור (ארגנטינה 86) */}
      <svg
        viewBox="0 0 130 180"
        className="moment-figure"
        style={{ position: "absolute", top: "50%", left: "50%", width: 130, opacity: 0.03, transform: "translate(-50%,-50%) rotate(8deg)" }}
      >
        {/* ראש */}
        <circle cx="70" cy="18" r="14" fill="currentColor" />
        {/* שיער מסולסל */}
        <ellipse cx="70" cy="10" rx="18" ry="8" fill="currentColor" />
        {/* גוף נוטה קדימה */}
        <ellipse cx="60" cy="70" rx="18" ry="38" fill="currentColor" transform="rotate(-15 60 70)" />
        {/* זרוע שמאל — רמוזה "יד האל" */}
        <ellipse cx="30" cy="45" rx="22" ry="8" fill="currentColor" transform="rotate(-60 30 45)" />
        {/* זרוע ימין */}
        <ellipse cx="88" cy="60" rx="20" ry="8" fill="currentColor" transform="rotate(30 88 60)" />
        {/* רגל בועטת */}
        <ellipse cx="85" cy="130" rx="12" ry="32" fill="currentColor" transform="rotate(30 85 130)" />
        {/* רגל נושאת */}
        <ellipse cx="45" cy="135" rx="12" ry="35" fill="currentColor" transform="rotate(-10 45 135)" />
        {/* כדור ליד רגל */}
        <circle cx="100" cy="150" r="11" fill="currentColor" />
      </svg>
    </div>
  );
}
