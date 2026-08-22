"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LanguageIndicator from "./LanguageIndicator";
import Sidebar from "./Sidebar";

export default function MobileHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold text-white tracking-tight">Dashboard</span>
        </div>
        <LanguageIndicator />
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Drawer */}
        <div 
          className={`absolute top-0 left-0 bottom-0 w-[280px] bg-[#0a0a0a] border-r border-[#2a2a2a] shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-white/5">
            <span className="font-bold text-white tracking-tight">Menu</span>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
