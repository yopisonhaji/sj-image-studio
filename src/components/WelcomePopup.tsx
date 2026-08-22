"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function WelcomePopup() {
  const { isWelcomePopupOpen, setWelcomePopupOpen, setLanguageSheetOpen } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    if (isWelcomePopupOpen) {
      setIsRendering(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendering(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isWelcomePopupOpen]);

  if (!isRendering) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-white/20">
          <Globe className="w-10 h-10 text-black" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Welcome</h2>
        <p className="text-gray-400 mb-8 text-sm">
          Pilih bahasa aplikasi Anda<br/>
          Choose your language<br/>
          اختر لغتك
        </p>

        <button
          onClick={() => {
            setWelcomePopupOpen(false);
            setLanguageSheetOpen(true);
          }}
          className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 active:scale-[0.98]"
        >
          Select Language
        </button>
      </div>
    </div>
  );
}
