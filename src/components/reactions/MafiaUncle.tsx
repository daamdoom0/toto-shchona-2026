"use client";

interface Props {
  mood?: "happy" | "annoyed" | "shocked" | "smug";
  size?: number;
}

/**
 * "הדוד טוני מהשכונה" - דמות איטלקית-אמריקאית מקורית.
 * שיער שחור מסורק לאחור, חולצה לבנה, גופייה, סיגר. ללא IP מוגן.
 */
export default function MafiaUncle({ mood = "happy", size = 80 }: Props) {
  // עיניים שונות לכל מצב
  const eye = (cx: number, cy: number) => {
    if (mood === "shocked") {
      return <ellipse cx={cx} cy={cy} rx="5" ry="5" fill="#1a1a1a" />;
    }
    if (mood === "annoyed") {
      return <path d={`M ${cx - 5} ${cy - 1} L ${cx + 5} ${cy + 1}`} stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />;
    }
    if (mood === "smug") {
      return <path d={`M ${cx - 4} ${cy + 1} Q ${cx} ${cy - 3} ${cx + 4} ${cy + 1}`} stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    }
    return <ellipse cx={cx} cy={cy} rx="3" ry="3.5" fill="#1a1a1a" />;
  };

  // פה לפי מצב רוח
  const mouth = () => {
    if (mood === "happy") {
      return <path d="M 38 68 Q 50 76 62 68" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    }
    if (mood === "shocked") {
      return <ellipse cx="50" cy="70" rx="5" ry="7" fill="#3a1a1a" />;
    }
    if (mood === "annoyed") {
      return <path d="M 38 72 Q 50 68 62 72" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    }
    // smug
    return <path d="M 38 70 Q 56 72 62 66" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      {/* גוף - חולצה לבנה עם וסט שחור */}
      <path d="M 20 95 Q 20 80 35 78 L 65 78 Q 80 80 80 95 L 80 110 L 20 110 Z" fill="#1a1a1a" />
      <path d="M 38 78 L 38 110 L 62 110 L 62 78 Z" fill="#fafafa" />
      {/* עניבה אדומה */}
      <path d="M 47 78 L 53 78 L 52 95 L 48 95 Z" fill="#bf0a30" />
      <path d="M 47 78 L 53 78 L 50 81 Z" fill="#9a0823" />

      {/* צוואר */}
      <rect x="42" y="68" width="16" height="14" fill="#e8b58c" />

      {/* ראש */}
      <ellipse cx="50" cy="50" rx="25" ry="28" fill="#e8b58c" />

      {/* שיער שחור מסורק לאחור */}
      <path d="M 25 38 Q 30 18 50 18 Q 70 18 75 38 Q 76 42 73 44 Q 60 28 50 28 Q 40 28 27 44 Q 24 42 25 38 Z" fill="#1a1a1a" />
      {/* קווי שיער מבריק */}
      <path d="M 38 25 Q 50 22 62 25" stroke="#3a3a3a" strokeWidth="1" fill="none" />

      {/* גבות */}
      <path d="M 32 42 Q 36 39 42 41" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 58 41 Q 64 39 68 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* עיניים */}
      {eye(38, 50)}
      {eye(62, 50)}

      {/* אף איטלקי */}
      <path d="M 50 53 Q 47 60 49 65 Q 51 66 53 65 Q 55 60 50 53" fill="#d9a07a" stroke="#a87555" strokeWidth="0.5" />

      {/* פה */}
      {mouth()}

      {/* סיגר */}
      {(mood === "smug" || mood === "happy") && (
        <>
          <rect x="62" y="69" width="20" height="4" fill="#6b3a1a" stroke="#3a1a08" strokeWidth="0.5" />
          <rect x="80" y="69" width="4" height="4" fill="#1a1a1a" />
          <circle cx="84" cy="71" r="2" fill="#ff6a00" opacity="0.85" />
          <path d="M 84 68 Q 86 62 84 58 Q 87 56 85 50" stroke="#bbb" strokeWidth="1.5" fill="none" opacity="0.7" />
        </>
      )}

      {/* זיפי זקן */}
      <g opacity="0.3">
        <circle cx="36" cy="65" r="0.6" fill="#1a1a1a" />
        <circle cx="40" cy="68" r="0.6" fill="#1a1a1a" />
        <circle cx="44" cy="70" r="0.6" fill="#1a1a1a" />
        <circle cx="56" cy="70" r="0.6" fill="#1a1a1a" />
        <circle cx="60" cy="68" r="0.6" fill="#1a1a1a" />
        <circle cx="64" cy="65" r="0.6" fill="#1a1a1a" />
      </g>
    </svg>
  );
}
