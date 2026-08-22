"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/translations";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: typeof translations.id;
  isLanguageSheetOpen: boolean;
  setLanguageSheetOpen: (open: boolean) => void;
  isWelcomePopupOpen: boolean;
  setWelcomePopupOpen: (open: boolean) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState("id");
  const [isClient, setIsClient] = useState(false);
  const [isLanguageSheetOpen, setLanguageSheetOpen] = useState(false);
  const [isWelcomePopupOpen, setWelcomePopupOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem("appLang");
    const hasSelectedLanguage = localStorage.getItem("language_selected");
    
    if (savedLang) {
      setLanguageState(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    }
    
    if (!hasSelectedLanguage) {
      setWelcomePopupOpen(true);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("appLang", lang);
    localStorage.setItem("language_selected", "true");
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const t = translations[language as keyof typeof translations] || translations.id;

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage, t, 
      isLanguageSheetOpen, setLanguageSheetOpen,
      isWelcomePopupOpen, setWelcomePopupOpen
    }}>
      <div style={{ visibility: isClient ? "visible" : "hidden", width: "100%", height: "100%" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
