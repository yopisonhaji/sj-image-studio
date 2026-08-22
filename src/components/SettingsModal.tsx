"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { X, Globe, User, Palette, Bell, Shield, ArrowRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SettingsModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { language, setLanguageSheetOpen } = useLanguage();

  const [activeTab, setActiveTab] = useState("language");
  const [theme, setTheme] = useState("dark");

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  };

  if (mode !== "settings") return null;

  const handleClose = () => {
    router.push(`${pathname}?mode=design-feeds`);
  };

  const getLanguageName = () => {
    if (language === 'ar') return 'العربية';
    if (language === 'en') return 'English';
    return 'Indonesia';
  };

  const getLanguageDesc = () => {
    if (language === 'ar') return 'جميع واجهات التطبيق تستخدم اللغة العربية';
    if (language === 'en') return 'Entire application uses English interface';
    return 'Seluruh aplikasi menggunakan Bahasa Indonesia';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8" data-no-invert>
      {/* Desktop Futuristic Dashboard Container */}
      <div 
        className="glass-panel w-full max-w-6xl h-full max-h-[900px] rounded-[32px] shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-white/10"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-72 bg-[#050811]/80 backdrop-blur-3xl md:border-r border-b border-white/5 flex flex-col shrink-0">
          <div className="p-6 md:p-8 md:pb-4 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </span>
              Settings
            </h2>
            
            {/* Mobile Close Button */}
            <button 
              onClick={handleClose}
              className="md:hidden p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex px-4 py-4 md:space-y-2 gap-2 overflow-x-auto md:overflow-y-auto flex-row md:flex-col custom-scrollbar">
            {[
              { id: 'account', label: 'Account', icon: User },
              { id: 'appearance', label: 'Appearance', icon: Palette },
              { id: 'language', label: 'Language', icon: Globe },
              { id: 'notifications', label: 'Notification', icon: Bell },
              { id: 'security', label: 'Security', icon: Shield },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-2xl transition-all font-medium text-sm md:text-sm ${
                  activeTab === tab.id 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-transparent relative">
          
          {/* Top Bar with Desktop Close Button */}
          <div className="hidden md:flex justify-end p-6">
            <button 
              onClick={handleClose}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
            {activeTab === 'language' ? (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Language & Localization</h1>
                <p className="text-gray-400 text-lg mb-12">Manage your application language preferences globally.</p>

                {/* Futuristic Glass Card */}
                <div className="glass-card-futuristic rounded-[32px] p-8 md:p-10 relative overflow-hidden group">
                  {/* Glowing background effect */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -z-10 group-hover:bg-blue-600/30 transition-all duration-700 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    
                    {/* Left: Icon & Text */}
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
                        <div className="w-full h-full bg-[#0a0f1c] rounded-[15px] flex items-center justify-center">
                          <Globe className="w-8 h-8 text-blue-400" />
                        </div>
                      </div>
                      
                      <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">Application Language</p>
                        <h3 className="text-3xl font-bold text-white mb-2">{getLanguageName()}</h3>
                        <p className="text-gray-400">{getLanguageDesc()}</p>
                      </div>
                    </div>

                    {/* Right: Button */}
                    <button 
                      onClick={() => setLanguageSheetOpen(true)}
                      className="group/btn flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-2xl transition-all duration-300"
                    >
                      <span className="font-bold text-white tracking-wide">Change Language</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover/btn:text-blue-400 transition-colors transform group-hover/btn:translate-x-1" />
                    </button>
                    
                  </div>
                </div>
              </div>
            ) : activeTab === 'appearance' ? (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Appearance</h1>
                <p className="text-gray-400 text-lg mb-12">Customize how the application looks.</p>

                {/* Futuristic Glass Card */}
                <div className="glass-card-futuristic rounded-[32px] p-8 md:p-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px] -z-10 group-hover:bg-cyan-600/30 transition-all duration-700 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    {/* Left: Icon & Text */}
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-400 p-0.5 shadow-lg shadow-cyan-500/20">
                        <div className="w-full h-full bg-[#0a0f1c] rounded-[15px] flex items-center justify-center">
                          <Palette className="w-8 h-8 text-cyan-400" />
                        </div>
                      </div>
                      
                      <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                        <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-1">Color Theme</p>
                        <h3 className="text-3xl font-bold text-white mb-2">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</h3>
                        <p className="text-gray-400">Current theme active</p>
                      </div>
                    </div>

                    {/* Right: Toggle Buttons */}
                    <div className="flex bg-[#0a0f1c] border border-white/10 rounded-2xl p-1 shadow-inner">
                      <button 
                        onClick={() => changeTheme("light")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                          theme === 'light' 
                            ? 'bg-white text-black shadow-lg shadow-white/20' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Light
                      </button>
                      <button 
                        onClick={() => changeTheme("dark")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                          theme === 'dark' 
                            ? 'bg-white text-black shadow-lg shadow-white/20' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Dark
                      </button>
                    </div>
                    
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-50 text-center">
                <div className="w-24 h-24 border border-white/10 rounded-3xl flex items-center justify-center mb-6 bg-white/5 backdrop-blur-xl shadow-2xl">
                  <span className="text-4xl text-white/50">?</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Module Not Found</h3>
                <p className="text-gray-400">The <strong>{activeTab}</strong> settings module is currently under construction.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
