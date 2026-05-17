"use client";

import { useEffect, useState } from "react";

interface Props {
  targetIso: string;
  label?: string;
}

export default function Countdown({ targetIso, label = "נעילה בעוד:" }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) {
    return <div className="text-sm font-mono opacity-70">טוען...</div>;
  }

  const diff = new Date(targetIso).getTime() - now.getTime();

  if (diff <= 0) {
    return (
      <div className="locked-stamp" style={{ position: "static", display: "inline-block" }}>
        נעול! 🔒
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const Box = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center bg-toto-ink text-usa-gold px-3 py-2 min-w-[60px] border-2 border-toto-ink shadow-stamp">
      <span className="font-display text-2xl leading-none">{String(value).padStart(2, "0")}</span>
      <span className="text-[10px] font-mono opacity-90 mt-1">{unit}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-lg">{label}</span>
      <div className="flex gap-2">
        <Box value={days} unit="ימים" />
        <Box value={hours} unit="שעות" />
        <Box value={mins} unit="דק׳" />
        <Box value={secs} unit="שניות" />
      </div>
    </div>
  );
}
