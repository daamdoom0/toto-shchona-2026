import type { Metadata } from "next";
import "./globals.css";
import SoundButton from "@/components/layout/SoundButton";

export const metadata: Metadata = {
  title: "טוטו מונדיאל 2026 🏆",
  description: "טוטו שכונתי למונדיאל 2026 - ארה״ב, מקסיקו, קנדה",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <SoundButton />
        {children}
      </body>
    </html>
  );
}
