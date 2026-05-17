import type { LeaderboardEntry } from "@/types";

interface Props {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const medal = (rank: number): string => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "";
};

export default function Leaderboard({ entries, currentUserId }: Props) {
  if (entries.length === 0) {
    return (
      <div className="toto-card p-8 text-center">
        <p className="font-display text-xl">עוד אין נתוני ניקוד.</p>
        <p className="opacity-70 mt-2">הציונים יתעדכנו ככל שיתקבלו תוצאות של משחקים.</p>
      </div>
    );
  }

  return (
    <table className="leaderboard">
      <thead>
        <tr>
          <th className="text-center w-12">#</th>
          <th>שחקן</th>
          <th className="text-center">נקודות</th>
          <th className="text-center hidden sm:table-cell">משחקים</th>
          <th className="text-center hidden sm:table-cell">פגיעות</th>
          <th className="text-center hidden sm:table-cell">מיוחדים</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e, idx) => {
          const isMe = e.user_id === currentUserId;
          return (
            <tr key={e.user_id} className={isMe ? "ring-2 ring-usa-gold" : ""}>
              <td className="text-center font-display text-lg">
                {medal(idx + 1) || idx + 1}
              </td>
              <td className="font-bold">
                {e.display_name} {isMe && <span className="text-xs text-toto-green">(אתה)</span>}
              </td>
              <td className="text-center font-display text-xl text-toto-green">
                {e.total_points}
              </td>
              <td className="text-center hidden sm:table-cell text-sm opacity-80">
                {e.decided_matches}
              </td>
              <td className="text-center hidden sm:table-cell text-sm opacity-80">
                {e.correct_predictions}
              </td>
              <td className="text-center hidden sm:table-cell text-sm opacity-80">
                {e.special_points > 0 ? `+${e.special_points}` : "-"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
