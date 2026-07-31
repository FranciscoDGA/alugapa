import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PackageOpen, Filter } from "lucide-react";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace("-", " ");
  
  return {
    title: `${categoryName} - AlugaPA`,
    description: `Aluguel de equipamentos e serviços para ${categoryName} no AlugaPA.`,
    alternates: { canonical: `/categoria/${params.slug}` }
  };
}

export default function CategoriaDetalhePage({ params }: Props) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace("-", " ");

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs 
          items={[
            { label: "Categorias", href: "/categorias" },
            { label: categoryName }
          ]} 
        />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{categoryName}</h1>
            <p className="text-slate-500 text-lg">Mostrando equipamentos e serviços da categoria {categoryName.toLowerCase()}.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2 px-4 rounded-xl transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center mt-10">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <PackageOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ainda não existem empresas nesta categoria.</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Estamos expandindo nossa base de fornecedores. Conheça categorias relacionadas ou tente buscar em outras regiões.
          </p>
          <a href="/categorias" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Ver todas as categorias
          </a>
        </div>
      </div>
    </div>
  );
}
