import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hammer, Sprout, Zap, Truck, Activity, Leaf, Building, Package, Droplet, Mountain } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categorias - AlugaPA",
  description: "Navegue por todas as categorias de equipamentos e serviços disponíveis para locação no AlugaPA.",
  alternates: { canonical: "/categorias" }
};

const CATEGORIES = [
  { name: "Construção", slug: "construcao", icon: Hammer, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Agronegócio", slug: "agronegocio", icon: Sprout, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Energia", slug: "energia", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "Transporte", slug: "transporte", icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Saúde", slug: "saude", icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Ambiental", slug: "ambiental", icon: Leaf, color: "text-slate-500", bg: "bg-slate-50" },
  { name: "Comercial", slug: "comercial", icon: Building, color: "text-teal-500", bg: "bg-teal-50" },
  { name: "Logística", slug: "logistica", icon: Package, color: "text-red-500", bg: "bg-red-50" },
  { name: "Saneamento", slug: "saneamento", icon: Droplet, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Mineração", slug: "mineracao", icon: Mountain, color: "text-sky-500", bg: "bg-sky-50" },
];

export default function CategoriasPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs items={[{ label: "Categorias" }]} />
        
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Todas as Categorias</h1>
          <p className="text-slate-500 text-lg">Selecione o segmento do equipamento que você está buscando para visualizar as opções disponíveis.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link href={`/categoria/${cat.slug}`} key={idx} className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all rounded-[2rem] p-6 flex flex-col items-center justify-center text-center group block">
                <div className={`w-14 h-14 rounded-[1rem] flex items-center justify-center mb-4 ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <h3 className="font-bold text-slate-800 text-[15px] group-hover:text-blue-600 transition-colors mb-1">{cat.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
