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

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-blue-400" /> Mulai Desain Baru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link href="/editor?template=blank" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold mb-1">Kanvas Kosong</h3>
              <p className="text-sm text-gray-400">Buat desain dari nol dengan ukuran custom.</p>
            </Link>

            <Link href="/editor?template=fnb-feed" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10 group cursor-pointer">
              <div className="w-12 h-12 bg-purple-600/20 text-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold mb-1">Template Makanan (F&B)</h3>
              <p className="text-sm text-gray-400">Cocok untuk promosi menu dan diskon.</p>
            </Link>

            <Link href="/editor?template=fashion" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-pink-500 transition-all hover:shadow-lg hover:shadow-pink-500/10 group cursor-pointer">
              <div className="w-12 h-12 bg-pink-600/20 text-pink-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold mb-1">Katalog Fashion</h3>
              <p className="text-sm text-gray-400">Estetika minimalis untuk brand baju/sepatu.</p>
            </Link>

          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" /> Proyek Terakhir
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Belum ada proyek</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Anda belum membuat desain apa pun. Proyek yang Anda simpan akan muncul di sini dan tersinkronisasi ke database.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
