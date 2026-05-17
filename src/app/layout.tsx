import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "טוטו מונדיאל 2026 🏆",
  description: "טוטו שכונתי למונדיאל 2026 - ארה״ב, מקסיקו, קנדה",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
