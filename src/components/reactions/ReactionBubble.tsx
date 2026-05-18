"use client";

import { useState, useMemo, useRef } from "react";
import MafiaUncle from "./MafiaUncle";
import Politician from "./Politician";

// Voice IDs מ-ElevenLabs
const VOICE_MAFIA = "f8NAZK1ciwrVujah7clz";   // Valerio - איטלקי
const VOICE_POLITICIAN = "cUOf9X9lJBQIB51APspo"; // הפוליטיקאי

// קאש קליינט - אותו ביטוי לא ייקרא פעמיים לשרת
const clientAudioCache = new Map<string, string>(); // key -> blob URL

const MAFIA_REACTIONS = {
  bold: [
    { text: "Ay! Now THAT is how you make a bet!", mood: "happy" as const, speech: "Ay! Now THAT is how you make a bet!" },
    { text: "Fuhgeddaboudit! Beautiful pick, beautiful!", mood: "smug" as const, speech: "Fuhgeddaboudit! Beautiful pick, beautiful!" },
    { text: "Ay ay ay! You make the family proud!", mood: "happy" as const, speech: "Ay ay ay! You make the family proud!" },
    { text: "Now THAT'S a bet! You got good taste, I like you.", mood: "smug" as const, speech: "Now THAT'S a bet! You got good taste, I like you." },
  ],
  safe: [
    { text: "A DRAW?! You breakin' my heart over here!", mood: "annoyed" as const, speech: "A DRAW?! You breakin' my heart over here!" },
    { text: "What is this?! My grandmother bets better than you!", mood: "annoyed" as const, speech: "What is this?! My grandmother bets better than you!" },
    { text: "Ay... you're killin' me. You're KILLIN' me.", mood: "annoyed" as const, speech: "Ay... you're killin' me. You're KILLIN' me." },
  ],
  upset: [
    { text: "AGAINST my team?! You got a death wish?!", mood: "shocked" as const, speech: "AGAINST my team?! You got a death wish?!" },
    { text: "Fuhgeddaboudit! You're dead to me. DEAD.", mood: "annoyed" as const, speech: "Fuhgeddaboudit! You're dead to me. DEAD." },
    { text: "I'm gonna pretend I didn't see that...", mood: "smug" as const, speech: "I'm gonna pretend I didn't see that..." },
  ],
};

const POLITICIAN_REACTIONS = {
  bold: [
    { text: "This bet is TREMENDOUS! Nobody bets like this, nobody!", mood: "happy" as const, speech: "This bet is TREMENDOUS! Nobody bets like this, nobody!" },
    { text: "Believe me, this is the greatest bet ever made in history!", mood: "smug" as const, speech: "Believe me, this is the greatest bet ever made in history!" },
    { text: "Big league! Big league pick! A lot of people are saying this!", mood: "happy" as const, speech: "Big league! Big league pick! A lot of people are saying this!" },
    { text: "Genius bet. People tell me I make great bets. Same energy.", mood: "smug" as const, speech: "Genius bet. People tell me I make great bets. Same energy." },
  ],
  safe: [
    { text: "SAD! Very sad bet. Disgraceful, frankly.", mood: "annoyed" as const, speech: "SAD! Very sad bet. Disgraceful, frankly." },
    { text: "WEAK! This is the weakest bet I've ever seen. Believe me.", mood: "annoyed" as const, speech: "WEAK! This is the weakest bet I have ever seen. Believe me." },
    { text: "A draw? Only losers pick draws. Are you a loser?", mood: "shocked" as const, speech: "A draw? Only losers pick draws. Are you a loser?" },
  ],
  upset: [
    { text: "WRONG! Completely wrong! Total disaster! Embarrassing!", mood: "shocked" as const, speech: "WRONG! Completely wrong! Total disaster! Embarrassing!" },
    { text: "This will not end well for you. Trust me, I know these things.", mood: "annoyed" as const, speech: "This will not end well for you. Trust me, I know these things." },
    { text: "Fake bet! Very fake! Low energy pick!", mood: "annoyed" as const, speech: "Fake bet! Very fake! Low energy pick!" },
  ],
};

type Prediction = "1" | "X" | "2" | null;
type Character = "mafia" | "politician";

function classify(prediction: Prediction): "bold" | "safe" | null {
  if (!prediction) return null;
  if (prediction === "X") return "safe";
  return "bold";
}

function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("toto_sound_enabled") === "1";
}

export default function ReactionBubble({ prediction, character }: { prediction: Prediction; character?: Character }) {
  const [showAnim, setShowAnim] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const reactionData = useMemo(() => {
    if (!prediction) return null;
    const cat = classify(prediction);
    if (!cat) return null;
    const chosenChar: Character = character ?? (Math.random() < 0.5 ? "mafia" : "politician");
    const pool = chosenChar === "mafia" ? MAFIA_REACTIONS[cat] : POLITICIAN_REACTIONS[cat];
    const reaction = pool[Math.floor(Math.random() * pool.length)];
    return { ...reaction, character: chosenChar };
  }, [prediction, character]);

  if (!reactionData) return null;

  const playAudio = async () => {
    if (!isSoundEnabled() || loading) return;

    const voiceId = reactionData.character === "mafia" ? VOICE_MAFIA : VOICE_POLITICIAN;
    const cacheKey = `${voiceId}:${reactionData.speech}`;

    setShowAnim(true);
    setTimeout(() => setShowAnim(false), 600);

    // בדוק קאש
    if (clientAudioCache.has(cacheKey)) {
      const blobUrl = clientAudioCache.get(cacheKey)!;
      playBlobUrl(blobUrl);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reactionData.speech, voiceId }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      clientAudioCache.set(cacheKey, blobUrl);
      playBlobUrl(blobUrl);
    } catch (err) {
      console.error("Audio error:", err);
    } finally {
      setLoading(false);
    }
  };

  const playBlobUrl = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch(console.error);
  };

  return (
    <div className="flex items-end gap-3 animate-fade-up mt-2" dir="rtl">
      <div className={showAnim ? "animate-wobble" : ""}>
        {reactionData.character === "mafia" ? (
          <MafiaUncle mood={reactionData.mood} size={60} />
        ) : (
          <Politician mood={reactionData.mood} size={60} />
        )}
      </div>
      <div
        className="reaction-bubble cursor-pointer select-none max-w-[220px]"
        onClick={playAudio}
        role="button"
        title="לחץ לתגובה קולית"
      >
        {loading ? (
          <span className="text-xs opacity-60">⏳ טוען קול...</span>
        ) : (
          <>
            <span className="text-xs opacity-60 ml-1">🔊</span>
            {reactionData.text}
          </>
        )}
      </div>
    </div>
  );
}
