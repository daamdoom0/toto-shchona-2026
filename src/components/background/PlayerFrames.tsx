"use client";

const FRAMES = [
  { src: "/players/p1.png", label: "ITALIA · 1994",     x: "-2%",  y: "4%",  rotation: -8,  w: 150 },
  { src: "/players/p2.png", label: "BRASIL · 2002",     x: "83%",  y: "8%",  rotation: 6,   w: 140 },
  { src: "/players/p3.png", label: "BRASIL · 2014",     x: "78%",  y: "52%", rotation: -5,  w: 145 },
  { src: "/players/p4.png", label: "FRANCE · 2006",     x: "-3%",  y: "50%", rotation: 7,   w: 135 },
  { src: "/players/p5.png", label: "FRANCE · 1998",     x: "38%",  y: "72%", rotation: -4,  w: 130 },
  { src: "/players/p6.png", label: "ARGENTINA · 2022",  x: "60%",  y: "80%", rotation: 5,   w: 138 },
  { src: "/players/p7.png", label: "NEDERLAND · 2014",  x: "15%",  y: "80%", rotation: -6,  w: 142 },
];

interface FrameProps {
  src: string;
  label: string;
  width: number;
}

function MuseumFrame({ src, label, width }: FrameProps) {
  const h = Math.round(width * 1.32);
  const fw = width + 28;
  const fh = h + 36;

  return (
    <svg width={fw} height={fh} viewBox={`0 0 ${fw} ${fh}`}>
      {/* Outer dark wood */}
      <rect x="0" y="0" width={fw} height={fh} rx="3" fill="#5C3D00"/>
      {/* Gold frame */}
      <rect x="3" y="3" width={fw - 6} height={fh - 6} rx="2" fill="#C9A84C"/>
      {/* Inner shadow */}
      <rect x="9" y="9" width={fw - 18} height={fh - 18} rx="1" fill="#8B6914"/>
      {/* Mat / passepartout */}
      <rect x="13" y="13" width={fw - 26} height={fh - 26} rx="1" fill="#F5F0E8"/>
      {/* Corner ornaments */}
      {[[9,9],[fw-9,9],[9,fh-9],[fw-9,fh-9]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#C9A84C"/>
      ))}
      {/* Side center ornaments */}
      <rect x="6" y={fh/2-8} width="5" height="16" rx="2.5" fill="#8B6914"/>
      <rect x={fw-11} y={fh/2-8} width="5" height="16" rx="2.5" fill="#8B6914"/>
      <rect x={fw/2-10} y="6" width="20" height="5" rx="2.5" fill="#8B6914"/>
      {/* Player image */}
      <image href={src} x="14" y="14" width={fw - 28} height={h} preserveAspectRatio="xMidYMid meet"/>
      {/* Nameplate */}
      <rect x={fw/2 - 48} y={fh - 22} width="96" height="16" rx="2" fill="#C9A84C"/>
      <text
        x={fw/2} y={fh - 11}
        fontSize="7.5" fontWeight="700"
        fill="#5C3D00" textAnchor="middle"
        fontFamily="Georgia, serif"
        letterSpacing="0.08em"
      >{label}</text>
      {/* Inner line */}
      <rect x="11" y="11" width={fw - 22} height={fh - 22} rx="2" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.7"/>
    </svg>
  );
}

export default function PlayerFrames() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {FRAMES.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: f.x,
            top: f.y,
            transform: `rotate(${f.rotation}deg)`,
            opacity: 0.07,
            filter: "sepia(20%)",
          }}
        >
          <MuseumFrame src={f.src} label={f.label} width={f.w} />
        </div>
      ))}
    </div>
  );
}
