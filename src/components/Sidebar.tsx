"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  Sparkles, 
  LayoutGrid, 
  Image as ImageIcon, 
  PlaySquare, 
  Utensils, 
  Shirt, 
  Megaphone,
  Layers, 
  Settings,
  User,
  Zap,
  Film,
  CircleDollarSign,
  MonitorSmartphone,
  Globe
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

type MenuItem = {
  name: string;
  icon: React.ElementType;
  mode?: string;
  path?: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMode = searchParams.get("mode") || "storyboard";
  const { t: globalT, language, setLanguageSheetOpen } = useLanguage();
  const t = globalT.sidebar;

  const menuItems: MenuItem[] = [
    { name: t.storyboard, icon: Film, mode: "storyboard" },
    { name: t.logo, icon: ImageIcon, mode: "logo" },
    { name: t.grid9, icon: LayoutGrid, mode: "9-feed" },
    { name: t.ads, icon: Megaphone, mode: "ads" },
    { name: t.youtube, icon: PlaySquare, mode: "youtube" },
    { name: t.review, icon: CircleDollarSign, mode: "review" },
    { name: t.tryon, icon: Shirt, mode: "tryon" },
    { name: t.carousel, icon: Layers, mode: "carousel" },
    { name: t.designFeeds, icon: MonitorSmartphone, mode: "design-feeds" },
    { name: t.fnb, icon: Utensils, mode: "fnb" },
    { name: t.settings, icon: Settings, mode: "settings" },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/5 flex flex-col h-full shrink-0 z-10">
      <div className="p-6">
        <a href="https://satujalan.id" className="flex items-center gap-3 group" title="Kembali ke satujalan.id">
          <img 
            src="/logo-sj-design.webp" 
            alt="SJ Design Logo" 
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white leading-tight">SJ Design</span>
            <span className="text-[10px] text-gray-400 font-medium">Powered by satujalan.id</span>
          </div>
        </a>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1 px-3 text-sm font-medium">
          {menuItems.map((item, index) => {
            const isActive = item.path 
              ? pathname === item.path 
              : pathname === "/editor" && currentMode === item.mode;
              
            const targetPath = item.path || `/editor?mode=${item.mode}`;
            const Icon = item.icon;
            
            return (
              <li key={index}>
                <Link 
                  href={targetPath} 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" /> {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Desktop Language Indicator (Bottom) - Dihapus */}
    </aside>
  );
}
