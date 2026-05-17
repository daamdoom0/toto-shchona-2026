"use client";

import { useState, useMemo } from "react";
import MafiaUncle from "./MafiaUncle";
import Politician from "./Politician";

// תגובות "הדוד" - בסגנון איטלקי-אמריקאי שכונתי
const MAFIA_REACTIONS = {
  bold: [
    { text: "Aaayyy! עכשיו אתה מדבר!", mood: "happy" as const, sound: "ayyy" },
    { text: "Madonna mia! ביצים גדולים!", mood: "smug" as const, sound: "madonna" },
    { text: "ככה גבר מהמר!", mood: "happy" as const, sound: "ayyy" },
    { text: "אתה אחד מאיתנו עכשיו.", mood: "smug" as const, sound: "ohhh" },
  ],
  safe: [
    { text: "*אנחה* שובר לי את הלב פה.", mood: "annoyed" as const, sound: "ohhh" },
    { text: "פחדן. הסבתא שלי מהמרת יותר חכם.", mood: "annoyed" as const, sound: "fuhgeddit" },
    { text: "Eh, גם זה הימור...", mood: "annoyed" as const, sound: "ohhh" },
    { text: "תיקו? אתה מבזבז לי הימור.", mood: "annoyed" as const, sound: "fuhgeddit" },
  ],
  upset: [
    { text: "מה?! נגד הקבוצה שלי?!", mood: "shocked" as const, sound: "ohhh" },
    { text: "הילד שלי מהמר טוב יותר ממך!", mood: "annoyed" as const, sound: "fuhgeddit" },
    { text: "אתה תצטער על זה...", mood: "smug" as const, sound: "ohhh" },
  ],
};

// תגובות "הפוליטיקאי"
const POLITICIAN_REACTIONS = {
  bold: [
    { text: "ההימור הזה - HUGE! פנטסטי!", mood: "happy" as const, sound: "tremendous" },
    { text: "ההימור הזה גאוני. אנשים אומרים לי כל הזמן.", mood: "smug" as const, sound: "tremendous" },
    { text: "אף אחד אף פעם לא הימר על זה ככה. אף פעם.", mood: "smug" as const, sound: "tremendous" },
    { text: "ההימור הכי טוב שראיתי. וראיתי הרבה.", mood: "happy" as const, sound: "tremendous" },
  ],
  safe: [
    { text: "Sad! הימור משעמם נורא.", mood: "annoyed" as const, sound: "sad" },
    { text: "אולי תרצה לחשוב על זה שוב? FAKE BET.", mood: "annoyed" as const, sound: "sad" },
    { text: "Boring. מאוד boring.", mood: "annoyed" as const, sound: "sad" },
  ],
  upset: [
    { text: "WRONG! אסון!", mood: "shocked" as const, sound: "sad" },
    { text: "Believe me, זה לא ייגמר טוב.", mood: "annoyed" as const, sound: "sad" },
    { text: "אולי תקרא ספר על כדורגל?", mood: "smug" as const, sound: "sad" },
  ],
};

type Prediction = "1" | "X" | "2" | null;
type Character = "mafia" | "politician";

interface Props {
  prediction: Prediction;
  /** קטגוריה: 'bold' להימור מנצח בית/חוץ, 'safe' לתיקו או היעדר הימור */
  character?: Character;
}

function classify(prediction: Prediction): "bold" | "safe" | "upset" | null {
  if (!prediction) return null;
  if (prediction === "X") return "safe";
  return "bold";
}

export default function ReactionBubble({ prediction, character }: Props) {
  const [showAudio, setShowAudio] = useState(false);

  const reactionData = useMemo(() => {
    if (!prediction) return null;
    const cat = classify(prediction);
    if (!cat) return null;

    // אם לא נקבע - נבחר רנדומלי
    const chosenChar: Character = character ?? (Math.random() < 0.5 ? "mafia" : "politician");
    const pool = chosenChar === "mafia" ? MAFIA_REACTIONS[cat] : POLITICIAN_REACTIONS[cat];
    const reaction = pool[Math.floor(Math.random() * pool.length)];
    return { ...reaction, character: chosenChar };
  }, [prediction, character]);

  if (!reactionData) return null;

  const playSound = () => {
    setShowAudio(true);
    // ניגון אפקט קולי באמצעות Web Speech API (פלסטר זמני - אפשר להחליף לקבצי אודיו רויאלטי-פרי)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(
        reactionData.character === "mafia"
          ? soundEffectText(reactionData.sound)
          : politicianSoundText(reactionData.sound)
      );
      utter.lang = reactionData.character === "politician" ? "en-US" : "en-US";
      utter.rate = reactionData.character === "politician" ? 0.9 : 1.1;
      utter.pitch = reactionData.character === "politician" ? 0.6 : 1.3;
      utter.volume = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
    setTimeout(() => setShowAudio(false), 1500);
  };

  return (
    <div className="flex items-end gap-3 animate-fade-up" dir="rtl">
      <div className={showAudio ? "animate-wobble" : ""}>
        {reactionData.character === "mafia" ? (
          <MafiaUncle mood={reactionData.mood} size={64} />
        ) : (
          <Politician mood={reactionData.mood} size={64} />
        )}
      </div>
      <div className="reaction-bubble cursor-pointer" onClick={playSound} role="button" title="לחץ לתגובה קולית">
        {reactionData.text}
        <span className="opacity-50 text-xs mr-2">🔊</span>
      </div>
    </div>
  );
}

function soundEffectText(s: string): string {
  switch (s) {
    case "ayyy": return "Ay! Ay! Ay!";
    case "madonna": return "Madonna mia!";
    case "ohhh": return "Ohhhh!";
    case "fuhgeddit": return "Fuhgeddaboudit!";
    default: return "Ay!";
  }
}

function politicianSoundText(s: string): string {
  switch (s) {
    case "tremendous": return "Tremendous! Big league!";
    case "sad": return "Sad! Very sad!";
    default: return "Believe me!";
  }
}
