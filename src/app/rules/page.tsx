import Header from "@/components/layout/Header";
import Link from "next/link";

export default function RulesPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 sm:p-6 pb-20">
        <div className="toto-card p-4 sm:p-6 mb-6">
          <span className="stage-chip">מדריך שחקן</span>
          <h2 className="font-display text-3xl mt-3">איך משחקים? 📋</h2>
          <p className="text-sm opacity-75 mt-1">כל מה שצריך לדעת לפני שמתחילים להמר</p>
        </div>

        {/* הסבר בסיסי */}
        <div className="toto-card mb-6 overflow-hidden">
          <div className="bg-toto-green text-toto-paper px-4 py-3">
            <h3 className="font-display text-xl">⚽ מה זה טוטו מונדיאל?</h3>
          </div>
          <div className="p-5 bg-white space-y-3 text-sm leading-relaxed">
            <p>על כל משחק במונדיאל אתה בוחר אחת מ-3 אפשרויות:</p>
            <div className="flex gap-4 my-3 justify-center">
              <div className="flex flex-col items-center">
                <div className="bet-cell bet-cell-selected w-14 h-14 text-2xl">1</div>
                <span className="text-xs mt-1 font-bold">ניצחון<br/>קבוצת בית</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bet-cell w-14 h-14 text-2xl border-2 border-toto-ink flex items-center justify-center font-display">X</div>
                <span className="text-xs mt-1 font-bold">תיקו</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bet-cell bet-cell-selected w-14 h-14 text-2xl">2</div>
                <span className="text-xs mt-1 font-bold">ניצחון<br/>קבוצת חוץ</span>
              </div>
            </div>
            <p>⚠️ <b>חשוב:</b> הכל לפי 90 דקות בלבד — תוספת זמן ופנדלים לא נחשבים להימור!</p>
            <p>בית = הקבוצה הראשונה ברשימה (צד שמאל). חוץ = הקבוצה השנייה (צד ימין).</p>
          </div>
        </div>

        {/* נעילות */}
        <div className="toto-card mb-6 overflow-hidden">
          <div className="bg-toto-ink text-usa-gold px-4 py-3">
            <h3 className="font-display text-xl">🔒 מתי ננעלים ההימורים?</h3>
          </div>
          <div className="p-5 bg-white space-y-3 text-sm">
            <div className="border-r-4 border-toto-green pr-3 mb-3">
              <b>שלב הבתים (72 משחקים) + הימורים מיוחדים:</b><br />
              נעילה אחת — ברגע שריקת הפתיחה של המונדיאל.<br />
              <span className="font-mono text-toto-green">מקסיקו נגד דרום אפריקה — 11/6/2026 בשעה 22:00 שעון ישראל</span>
            </div>
            <div className="border-r-4 border-usa-blue pr-3">
              <b>שלבי הנוקאאוט (R32, R16, רבע, חצי, גמר):</b><br />
              כל סבב נפתח להימורים כשהאדמין מעדכן את הנבחרות שעלו.<br />
              ננעל ברגע שריקת המשחק הראשון של אותו סבב.
            </div>
          </div>
        </div>

        {/* ניקוד */}
        <div className="toto-card mb-6 overflow-hidden">
          <div className="bg-usa-gold text-toto-ink px-4 py-3">
            <h3 className="font-display text-xl">🏆 שיטת הניקוד</h3>
          </div>
          <div className="bg-white">
            <table className="leaderboard">
              <thead>
                <tr>
                  <th>שלב</th>
                  <th className="text-center">נקודות לניחוש נכון</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["שלב הבתים", "3"],
                  ["שמינית גמר (R32)", "4"],
                  ["שמינית סופית (R16)", "6"],
                  ["רבע גמר", "10"],
                  ["חצי גמר", "15"],
                  ["מקום שלישי", "8"],
                  ["הגמר", "20"],
                  ["🥇 אלופת המונדיאל", "25"],
                  ["⚽ מלך השערים", "15"],
                ].map(([stage, pts]) => (
                  <tr key={stage}>
                    <td className="font-bold">{stage}</td>
                    <td className="text-center font-display text-xl text-toto-green">{pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* הימורים מיוחדים */}
        <div className="toto-card mb-6 overflow-hidden">
          <div className="bg-toto-green text-toto-paper px-4 py-3">
            <h3 className="font-display text-xl">🌟 הימורים מיוחדים</h3>
          </div>
          <div className="p-5 bg-white space-y-2 text-sm">
            <p><b>אלופת המונדיאל (25 נקודות):</b> בחר מרשימת כל 48 הנבחרות. אם ניחשת נכון — +25 בסיום הטורניר.</p>
            <p><b>מלך השערים (15 נקודות):</b> בחר שחקן מרשימת ~130 כוכבים. ההשוואה מדויקת — בחר בדיוק את השם שרשום ברשימה.</p>
          </div>
        </div>

        {/* קול ודמויות */}
        <div className="toto-card mb-6 overflow-hidden">
          <div className="bg-usa-red text-white px-4 py-3">
            <h3 className="font-display text-xl">🎭 הדמויות האינטראקטיביות</h3>
          </div>
          <div className="p-5 bg-white space-y-2 text-sm">
            <p>אחרי כל הימור יופיעו שתי דמויות מצוירות שמגיבות לבחירה שלך:</p>
            <p>🤌 <b>הדוד האיטלקי</b> — תגיב בסגנון מאפיה ניו ג׳רסי ("Madonna mia!", "Bravissimo!")</p>
            <p>🎩 <b>הפוליטיקאי הקולני</b> — תגיב בסגנון אמריקאי מוגזם ("Tremendous!", "Sad!")</p>
            <p className="mt-3 font-bold">🔊 להפעלת קול:</p>
            <p>לחץ על הכפתור <b>"לחץ להפעלת קול!"</b> שמופיע בפינה השמאלית התחתונה של המסך — ופעם אחת זה מספיק לכל הביקור.</p>
            <p>אחרי ההפעלה — לחץ על כל תגובה (בועית הדיבור) כדי לשמוע אותה בקול רם!</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="btn btn-gold text-lg px-8 py-3">
            ⚽ לאיזור ההימורים!
          </Link>
        </div>
      </main>
    </>
  );
}
