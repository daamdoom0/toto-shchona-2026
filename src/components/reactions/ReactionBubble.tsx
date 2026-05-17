"use client";

import { useState, useMemo } from "react";
import MafiaUncle from "./MafiaUncle";
import Politician from "./Politician";

const MAFIA_REACTIONS = {
  bold: [
    { text: "Ay! Ay! Ay! Questo è un bel tiro!", mood: "happy" as const, sound: "ayyy" },
    { text: "Madonna mia! Finalmente una scelta coraggiosa!", mood: "smug" as const, sound: "madonna" },
    { text: "Bravissimo! Così si fa!", mood: "happy" as const, sound: "bravo" },
    { text: "Magnifico! La famiglia è fiera di te.", mood: "smug" as const, sound: "magnifico" },
  ],
  safe: [
    { text: "Pareggio?! Che cosa?! Mi spezza il cuore...", mood: "annoyed" as const, sound: "mamma_mia" },
    { text: "Vigliacco. Mia nonna scommette meglio di te.", mood: "annoyed" as const, sound: "mamma_mia" },
    { text: "Eh, capisco... ma non mi piace.", mood: "annoyed" as const, sound: "mamma_mia" },
  ],
  upset: [
    { text: "Che disastro! Contro la mia squadra?!", mood: "shocked" as const, sound: "che_cosa" },
    { text: "Fuhgeddaboudit! Sei pazzo?", mood: "annoyed" as const, sound: "che_cosa" },
    { text: "Guarda cosa hai fatto...", mood: "smug" as const, sound: "mamma_mia" },
  ],
};

const POLITICIAN_REACTIONS = {
  bold: [
    { text: "This bet is TREMENDOUS! Nobody bets like this!", mood: "happy" as const, sound: "tremendous" },
    { text: "Believe me, this is the greatest bet ever made!", mood: "smug" as const, sound: "tremendous" },
    { text: "Big league! Big league! What a pick!", mood: "happy" as const, sound: "bigleague" },
    { text: "People are saying this is a genius bet. I agree.", mood: "smug" as const, sound: "tremendous" },
  ],
  safe: [
    { text: "SAD! Very sad bet. Disgraceful, frankly.", mood: "annoyed" as const, sound: "sad" },
    { text: "WEAK! This is the weakest bet I have ever seen.", mood: "annoyed" as const, sound: "sad" },
    { text: "A draw? Losers pick draws. Are you a loser?", mood: "shocked" as const, sound: "sad" },
  ],
  upset: [
    { text: "WRONG! Completely wrong! A total disaster!", mood: "shocked" as const, sound: "wrong" },
    { text: "This will not end well. Trust me, I know.", mood: "annoyed" as const, sound: "sad" },
    { text: "Fake bet! Very fake!", mood: "annoyed" as const, sound: "wrong" },
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

function getBestVoice(character: Character): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  if (character === "mafia") {
    const italian = voices.find((v) => v.lang.startsWith("it"));
    if (italian) return italian;
    const google = voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en"));
    if (google) return google;
  }
  if (character === "politician") {
    const google = voices.find((v) => v.name.includes("Google") && v.lang === "en-US");
    if (google) return google;
    const us = voices.find((v) => v.lang === "en-US");
    if (us) return us;
  }
  return voices[0] || null;
}

function playReaction(sound: string, character: Character) {
  if (!isSoundEnabled()) return;
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const phrases: Record<string, string> = {
    ayyy: "Ay! Ay! Ay!",
    madonna: "Madonna mia!",
    bravo: "Bravissimo!",
    magnifico: "Magnifico! Bellissimo!",
    mamma_mia: "Mamma mia... che peccato.",
    che_cosa: "Che cosa?! Sei pazzo?!",
    tremendous: "Tremendous! This is tremendous, believe me!",
    bigleague: "Big league! Big league pick!",
    sad: "Sad! Very sad! Low energy!",
    wrong: "Wrong! So wrong! Total disaster!",
  };
  const text = phrases[sound] || "Ay!";
  const u = new SpeechSynthesisUtterance(text);
  if (character === "mafia") {
    u.rate = 1.1; u.pitch = 1.3; u.volume = 0.85;
    const voice = getBestVoice("mafia");
    if (voice) { u.voice = voice; u.lang = voice.lang; }
  } else {
    u.rate = 0.82; u.pitch = 0.55; u.volume = 0.9;
    const voice = getBestVoice("politician");
    if (voice) { u.voice = voice; u.lang = "en-US"; }
  }
  window.speechSynthesis.speak(u);
}

export default function ReactionBubble({ prediction, character }: { prediction: Prediction; character?: Character }) {
  const [showAnim, setShowAnim] = useState(false);

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

  const handleClick = () => {
    setShowAnim(true);
    playReaction(reactionData.sound, reactionData.character);
    setTimeout(() => setShowAnim(false), 600);
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
        onClick={handleClick}
        role="button"
        title="לחץ לתגובה קולית"
      >
        <span className="text-xs opacity-60 ml-1">🔊</span>
        {reactionData.text}
      </div>
    </div>
  );
}
