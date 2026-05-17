"use client";

interface Props {
  mood?: "happy" | "annoyed" | "shocked" | "smug";
  size?: number;
}

/**
 * "המטיף" - דמות פוליטיקאי גנרית עם תספורת כתומה גדולה וחליפה.
 * לא מבוסס על אדם אמיתי - פיצור גנרי של "פוליטיקאי קולני".
 */
export default function Politician({ mood = "happy", size = 80 }: Props) {
  const eye = (cx: number, cy: number) => {
    if (mood === "shocked") {
      return (
        <>
          <ellipse cx={cx} cy={cy} rx="5" ry="5" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2.5" fill="#1a1a1a" />
        </>
      );
    }
    if (mood === "annoyed") {
      return <path d={`M ${cx - 6} ${cy - 1} L ${cx + 6} ${cy + 2}`} stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />;
    }
    if (mood === "smug") {
      return <path d={`M ${cx - 5} ${cy + 1} L ${cx + 5} ${cy + 1}`} stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />;
    }
    return (
      <>
        <ellipse cx={cx} cy={cy} rx="4" ry="4" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="2" fill="#0066cc" />
      </>
    );
  };

  const mouth = () => {
    if (mood === "shocked") {
      return <ellipse cx="50" cy="70" rx="6" ry="9" fill="#3a1a1a" />;
    }
    if (mood === "annoyed") {
      return <path d="M 38 72 Q 50 65 62 72" stroke="#1a1a1a" strokeWidth="3" fill="#e8b58c" strokeLinecap="round" />;
    }
    if (mood === "smug") {
      return <path d="M 38 70 Q 50 72 62 70" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    }
    return <path d="M 36 68 Q 50 78 64 68" stroke="#1a1a1a" strokeWidth="3" fill="#bf0a30" strokeLinecap="round" />;
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      {/* גוף - חליפה כחולה כהה */}
      <path d="M 18 95 Q 18 78 32 76 L 68 76 Q 82 78 82 95 L 82 110 L 18 110 Z" fill="#002868" />
      {/* חולצה לבנה */}
      <path d="M 40 76 L 60 76 L 58 92 L 50 88 L 42 92 Z" fill="#fafafa" />
      {/* עניבה אדומה ארוכה */}
      <path d="M 47 78 L 53 78 L 56 110 L 44 110 Z" fill="#bf0a30" />
      <path d="M 47 78 L 53 78 L 50 84 Z" fill="#9a0823" />

      {/* צוואר */}
      <rect x="42" y="66" width="16" height="14" fill="#f4c89a" />

      {/* ראש - גוון "מעט שזוף יתר על המידה" */}
      <ellipse cx="50" cy="50" rx="24" ry="27" fill="#f4c89a" />

      {/* תספורת כתומה גדולה ומסורקת לצד */}
      <path d="M 24 38 Q 22 24 36 18 Q 50 14 65 17 Q 78 22 76 38 Q 74 40 70 38 Q 65 30 50 30 Q 35 30 28 40 Q 25 40 24 38 Z" fill="#ff9933" />
      {/* קווי תספורת מסורקים */}
      <path d="M 30 25 Q 50 18 72 26" stroke="#cc6600" strokeWidth="1.5" fill="none" />
      <path d="M 32 30 Q 50 24 70 32" stroke="#cc6600" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 28 35 Q 50 30 74 36" stroke="#cc6600" strokeWidth="1" fill="none" opacity="0.5" />

      {/* עיניים קטנטנות */}
      {eye(40, 48)}
      {eye(60, 48)}

      {/* גבות בלונדיניות-כתמתמות */}
      <path d="M 33 42 Q 38 39 44 41" stroke="#ff9933" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 56 41 Q 62 39 67 42" stroke="#ff9933" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* אף */}
      <path d="M 50 52 Q 46 60 49 64 Q 51 65 53 64 Q 55 60 50 52" fill="#e0a880" stroke="#a86a3d" strokeWidth="0.5" />

      {/* פה */}
      {mouth()}

      {/* קמטים סביב העיניים */}
      <path d="M 30 50 Q 28 52 30 55" stroke="#cc8855" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 70 50 Q 72 52 70 55" stroke="#cc8855" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* סמן כובע אדום קטן בצד (אופציונלי) */}
      {mood === "smug" && (
        <g opacity="0.9">
          <rect x="74" y="20" width="14" height="6" fill="#bf0a30" rx="1" />
          <text x="81" y="24.5" fontSize="3.5" fill="#fff" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">YUGE</text>
        </g>
      )}
    </svg>
  );
}
