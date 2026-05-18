"use client";

import { useEffect, useState } from "react";

interface Props {
  kickoffAt: string;
  finalized?: boolean;
}

export default function MatchCountdown({ kickoffAt, finalized }: Props) {
  const [display, setDisplay] = useState("");
  const [urgency, setUrgency] = useState<"done" | "normal" | "soon" | "imminent">("normal");

  useEffect(() => {
    const update = () => {
      if (finalized) { setDisplay("הסתיים"); setUrgency("done"); return; }

      const diff = new Date(kickoffAt).getTime() - Date.now();
      if (diff <= 0) { setDisplay("בשידור"); setUrgency("done"); return; }

      const days  = Math.floor(diff / 86_400_000);
      const hours = Math.floor((diff % 86_400_000) / 3_600_000);
      const mins  = Math.floor((diff % 3_600_000)  /    60_000);

      if (diff < 30 * 60_000) {
        setUrgency("imminent");
        setDisplay(`${mins} דק׳`);
      } else if (diff < 3 * 3_600_000) {
        setUrgency("soon");
        setDisplay(`${hours}ש ${mins}ד`);
      } else if (days > 0) {
        setUrgency("normal");
        setDisplay(`${days}י ${hours}ש`);
      } else {
        setUrgency("normal");
        setDisplay(`${hours}ש ${mins}ד`);
      }
    };

    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, [kickoffAt, finalized]);

  const styles: Record<string, React.CSSProperties> = {
    done:     { background: "#e5e7eb", color: "#6b7280" },
    normal:   { background: "#0a4a2a", color: "#4ade80" },
    soon:     { background: "#b45309", color: "#fff" },
    imminent: { background: "#dc2626", color: "#fff" },
  };

  if (!display) return null;

  return (
    <span
      style={{
        ...styles[urgency],
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: 100,
        display: "inline-block",
        marginTop: 3,
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
        animation: urgency === "imminent" ? "pulse 1s infinite" : "none",
      }}
    >
      {display}
    </span>
  );
}
