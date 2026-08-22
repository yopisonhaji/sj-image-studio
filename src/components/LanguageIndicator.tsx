"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageIndicator() {
  const { language, setLanguageSheetOpen } = useLanguage();

  return (
    <button 
      onClick={() => setLanguageSheetOpen(true)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#2a2a2a] text-sm font-semibold hover:bg-white/10 shadow-sm transition-all active:scale-95"
    >
      <Globe className="w-4 h-4 text-white" />
      <span className="text-white uppercase tracking-wider">{language}</span>
    </button>
  );
}
