"use client";

import { useState, useTransition } from "react";
import { toggleAdminAction } from "@/actions/admin";

interface User {
  id: string;
  display_name: string;
  is_admin: boolean;
  created_at: string;
}

export default function AdminUsersClient({
  users,
  currentUserId,
}: {
  users: User[];
  currentUserId: string;
}) {
  const [flash, setFlash] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const toggle = (u: User) => {
    if (u.id === currentUserId) {
      setFlash("לא ניתן להסיר אדמין מעצמך");
      setTimeout(() => setFlash(null), 2000);
      return;
    }
    startTransition(async () => {
      const res = await toggleAdminAction(u.id, !u.is_admin);
      if (res.error) setFlash(`שגיאה: ${res.error}`);
      else setFlash(`עודכן ✓`);
      setTimeout(() => setFlash(null), 1500);
    });
  };

  return (
    <>
      {flash && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-toto-green text-toto-paper px-6 py-3 font-bold shadow-stamp border-2 border-toto-ink">
          {flash}
        </div>
      )}
      <div className="toto-card overflow-hidden">
        <table className="leaderboard">
          <thead>
            <tr>
              <th>שם</th>
              <th className="text-center">נרשם</th>
              <th className="text-center">אדמין</th>
              <th className="text-center">פעולה</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-bold">
                  {u.display_name}
                  {u.id === currentUserId && <span className="text-xs text-toto-green"> (אתה)</span>}
                </td>
                <td className="text-center text-sm font-mono">
                  {new Date(u.created_at).toLocaleDateString("he-IL")}
                </td>
                <td className="text-center">
                  {u.is_admin ? "✅" : "❌"}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => toggle(u)}
                    disabled={pending || u.id === currentUserId}
                    className={`btn text-sm py-1 px-3 ${u.is_admin ? "btn-danger" : "btn-secondary"}`}
                  >
                    {u.is_admin ? "הסר אדמין" : "הפוך לאדמין"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
