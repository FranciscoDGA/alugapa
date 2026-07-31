import Link from "next/link";
import { Search, Compass } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center relative">
              <Compass className="w-12 h-12 text-blue-600 animate-[spin_3s_linear_infinite]" />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Página não encontrada</h2>
          
          <p className="text-slate-500 mb-10 text-lg">
            Parece que a máquina ou página que você está procurando não está disponível ou foi movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Voltar ao Início
            </Link>
            <Link href="/buscar" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-8 rounded-xl transition-colors">
              Buscar Equipamentos
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
