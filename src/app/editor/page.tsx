import Sidebar from "@/components/Sidebar";
import PromptTerminal from "@/components/PromptTerminal";
import SettingsModal from "@/components/SettingsModal";
import LanguageBottomSheet from "@/components/LanguageBottomSheet";
import WelcomePopup from "@/components/WelcomePopup";
import MobileHeader from "@/components/MobileHeader";
import { Suspense } from "react";

export default function EditorPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden relative bg-[#0f0f0f]">
      <Suspense fallback={null}>
        <MobileHeader />
      </Suspense>

      <Suspense fallback={null}>
        <div className="hidden md:block h-full relative z-10">
          <Sidebar />
        </div>
      </Suspense>
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto md:overflow-hidden relative z-0">
        <Suspense fallback={null}>
          <PromptTerminal />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <SettingsModal />
      </Suspense>

      <LanguageBottomSheet />
      <WelcomePopup />
    </div>
  );
}
