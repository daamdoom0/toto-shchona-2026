"use client";

import { useRef, useState, useTransition } from "react";
import { updateAvatarAction } from "@/actions/leagues";

interface Props {
  currentUrl?: string | null;
  displayName: string;
}

export default function AvatarUpload({ currentUrl, displayName }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [isPending, start] = useTransition();
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const fd = new FormData();
    fd.append("avatar", file);
    start(async () => {
      const res = await updateAvatarAction(fd);
      if (res.error) setMsg(res.error);
      else setMsg("נשמר ✓");
      setTimeout(() => setMsg(""), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative cursor-pointer group"
        onClick={() => fileRef.current?.click()}
        title="לחץ לשינוי תמונה"
      >
        {preview ? (
          <img
            src={preview}
            alt={displayName}
            className="w-20 h-20 rounded-full object-cover border-3 border-toto-green shadow-md"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-toto-green flex items-center justify-center text-3xl font-black text-usa-gold border-3 border-toto-green shadow-md">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-white text-xs font-bold">שנה</span>
        </div>
        {isPending && (
          <div className="absolute inset-0 rounded-full bg-white/60 flex items-center justify-center">
            <span className="text-xs">⏳</span>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange}/>
      {msg && <span className="text-xs font-bold text-toto-green">{msg}</span>}
    </div>
  );
}
