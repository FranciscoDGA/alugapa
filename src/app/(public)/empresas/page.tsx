import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Building2, Search, MapPin, Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diretório de Empresas - AlugaPA",
  description: "Encontre as melhores locadoras de máquinas e equipamentos pesados da sua região.",
  alternates: { canonical: "/empresas" }
};

export default function EmpresasPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs items={[{ label: "Diretório de Empresas" }]} />
        
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Empresas e Locadoras</h1>
          <p className="text-slate-500 text-lg">Encontre parceiros verificados para alugar os equipamentos que sua obra precisa.</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-blue-500 transition-colors">
            <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
            <input type="text" placeholder="Buscar por nome da empresa..." className="w-full bg-transparent border-none py-3 outline-none text-slate-800" />
          </div>
          <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-blue-500 transition-colors">
            <MapPin className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
            <input type="text" placeholder="Cidade ou estado" className="w-full bg-transparent border-none py-3 outline-none text-slate-800" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
            Buscar
          </button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Nenhuma empresa encontrada com estes filtros.</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Não encontramos locadoras cadastradas para esta busca no momento. Tente remover alguns filtros ou buscar em cidades vizinhas.</p>
          <button className="bg-slate-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
