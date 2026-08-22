import { Suspense } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Plus, Clock, LayoutTemplate } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense fallback={<div className="w-64 glass-panel border-r border-gray-800 shrink-0"></div>}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto bg-gray-950 p-8 custom-scrollbar">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Pilih template atau lanjutkan proyek desain Anda.</p>
          </div>
        </header>

        {/* Konten Dashboard telah dihapus sesuai permintaan */}
      </main>
    </div>
  );
}
