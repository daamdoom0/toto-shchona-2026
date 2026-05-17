"use client";

import { useState, useEffect } from "react";

export default function SoundButton() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // בדוק אם כבר הופעל בעבר
    const stored = localStorage.getItem("toto_sound_enabled");
    if (stored === "1") setEnabled(true);
    setReady(true);
  }, []);

  const handleEnable = () => {
    // לחיצה זו "פותחת" את ה-speech synthesis בדפדפן
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // נגן משפט קצר כדי לפתוח את ה-AudioContext
    const u = new SpeechSynthesisUtterance("Ay!");
    u.volume = 0.01; // כמעט שקט - רק לצורך הפתיחה
    u.rate = 1.2;

    // בחר קול טוב אם יש
    const voices = window.speechSynthesis.getVoices();
    const google = voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en"));
    if (google) u.voice = google;

    window.speechSynthesis.speak(u);

    localStorage.setItem("toto_sound_enabled", "1");
    setEnabled(true);

    // אחרי שניה - הודעה חגיגית
    setTimeout(() => {
      const u2 = new SpeechSynthesisUtterance("Sound is on! Tremendous!");
      u2.volume = 0.7;
      u2.rate = 0.85;
      u2.pitch = 0.6;
      const deepVoice = voices.find((v) => v.lang === "en-US" && v.name.includes("Google"));
      if (deepVoice) u2.voice = deepVoice;
      window.speechSynthesis.speak(u2);
    }, 300);
  };

  if (!ready) return null;

  if (enabled) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-toto-green text-usa-gold border-2 border-toto-ink px-3 py-2 text-sm font-bold shadow-stamp flex items-center gap-2">
        🔊 קול פעיל ✓
      </div>
    );
  }

  return (
    <button
      onClick={handleEnable}
      className="fixed bottom-4 left-4 z-50 btn btn-gold animate-wobble text-base shadow-lg"
      style={{ boxShadow: "0 4px 20px rgba(255,184,28,0.5), 3px 3px 0 #1a1a1a" }}
    >
      🔊 לחץ להפעלת קול!
    </button>
  );
}
