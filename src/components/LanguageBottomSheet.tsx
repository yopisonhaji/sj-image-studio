"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { X, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function LanguageBottomSheet() {
  const { language, setLanguage, isLanguageSheetOpen, setLanguageSheetOpen } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  
  // Futuristic fake delay state
  const [processingLang, setProcessingLang] = useState<string | null>(null);

  useEffect(() => {
    if (isLanguageSheetOpen) {
      setIsRendering(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendering(false);
        setProcessingLang(null); // reset
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLanguageSheetOpen]);

  if (!isRendering) return null;

  const languages = [
    { code: "id", flag: "🇮🇩", name: "Indonesia", desc: "Bahasa Indonesia" },
    { code: "en", flag: "🇬🇧", name: "English", desc: "English Language" },
    { code: "ar", flag: "🇸🇦", name: "العربية", desc: "Arabic" },
  ];

  const handleSelectLanguage = (code: string) => {
    if (language === code) return;
    
    setProcessingLang(code);
    
    // Simulate futuristic synchronizing delay
    setTimeout(() => {
      setLanguage(code);
      setTimeout(() => setLanguageSheetOpen(false), 800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center md:items-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#020617]/80 backdrop-blur-md transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => !processingLang && setLanguageSheetOpen(false)}
      />
      
      {/* Container (Bottom Sheet on Mobile, Centered Modal on Desktop) */}
      <div 
        className={`relative w-full md:max-w-[700px] md:h-[500px] mx-auto bg-[#0a0f1c] md:bg-[#0f172a]/90 
          md:border md:border-blue-500/20 md:shadow-[0_0_50px_rgba(37,99,235,0.15)]
          border-t border-white/10 rounded-t-[32px] md:rounded-[32px] p-6 md:p-10 
          transition-all duration-500 ease-out transform flex flex-col
          ${isVisible ? 'translate-y-0 md:scale-100' : 'translate-y-full md:translate-y-0 md:scale-95 md:opacity-0'}`}
      >
        {/* Mobile drag indicator */}
        <div className="md:hidden w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-blue-500">🌐</span> Choose Application Language
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Pilih bahasa untuk seluruh aplikasi / Select language for entire application</p>
          </div>
          <button 
            onClick={() => !processingLang && setLanguageSheetOpen(false)} 
            disabled={processingLang !== null}
            className="p-3 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Syncing Overlay */}
        {processingLang && (
          <div className="absolute inset-0 z-20 rounded-[32px] bg-[#0a0f1c]/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
            {language === processingLang ? (
              <>
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Language Updated</h3>
              </>
            ) : (
              <>
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
                <h3 className="text-xl font-bold text-blue-400 animate-pulse">Language Synchronizing...</h3>
              </>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {languages.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  disabled={processingLang !== null}
                  className={`group flex flex-row md:flex-col items-center md:items-start md:justify-center p-4 md:p-8 rounded-2xl md:rounded-[24px] border transition-all duration-300 
                    ${isActive 
                      ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_30px_rgba(37,99,235,0.2)]' 
                      : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-blue-500/30'}
                  `}
                >
                  <div className="flex items-center gap-4 md:gap-0 md:flex-col md:items-start w-full">
                    {/* Emoji size adjusted for desktop */}
                    <div className="text-3xl md:text-5xl mb-0 md:mb-6 grayscale-[0.2] group-hover:grayscale-0 transition-all group-hover:scale-110">
                      {lang.flag}
                    </div>
                    
                    <div className="text-left flex-1" style={{ textAlign: lang.code === 'ar' && typeof window !== 'undefined' && window.innerWidth < 768 ? 'right' : 'left' }}>
                      <h4 className={`font-bold text-lg md:text-xl leading-tight mb-1 md:mb-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>{lang.name}</h4>
                      <p className={`text-sm ${isActive ? 'text-blue-300' : 'text-gray-500'}`}>{lang.desc}</p>
                    </div>

                    {/* Status Indicator */}
                    <div className="md:w-full md:mt-6 flex justify-end md:justify-between items-center">
                      <div className="hidden md:block">
                        {isActive ? (
                          <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">Aktif</span>
                        ) : (
                          <span className="text-xs font-bold text-transparent group-hover:text-gray-400 px-3 py-1 uppercase tracking-wider transition-colors">Pilih</span>
                        )}
                      </div>
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-black/50 text-transparent border border-white/10'}`}>
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}
