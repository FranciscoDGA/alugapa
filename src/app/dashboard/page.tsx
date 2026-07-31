import { getCompanyStats } from "@/app/actions/company";
import { Package, Users, Star, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const { data: stats } = await getCompanyStats();

  const metrics = [
    { label: "Total de Equipamentos", value: stats?.listings || 0, icon: Package, color: "text-blue-500", bg: "bg-blue-100", href: "/dashboard/catalogo" },
    { label: "Leads Recebidos", value: stats?.leads || 0, icon: Users, color: "text-amber-500", bg: "bg-amber-100", href: "/dashboard/leads" },
    { label: "Avaliações", value: stats?.reviews || 0, icon: Star, color: "text-emerald-500", bg: "bg-emerald-100", href: "/dashboard" },
    { label: "Score da Loja", value: "92", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-100", href: "/dashboard" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-500">Resumo da sua operação e performance no AlugaPA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{metric.label}</p>
                <h3 className="text-3xl font-bold text-gray-900">{metric.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${metric.bg} ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <Link href={metric.href} className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                Ver detalhes <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Atividades Recentes</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Novo lead recebido: João Silva</p>
                <p className="text-xs text-gray-500">Referente a: Retroescavadeira Case 580N</p>
                <p className="text-xs text-gray-400 mt-1">Há 2 horas</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Anúncio criado: Gerador 100kVA</p>
                <p className="text-xs text-gray-500">O equipamento já está visível nas buscas.</p>
                <p className="text-xs text-gray-400 mt-1">Há 1 dia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dicas de Crescimento */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl border border-blue-500 shadow-sm p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <h3 className="text-lg font-bold mb-2 relative z-10 flex items-center">
            <Star className="h-5 w-5 mr-2 text-amber-300 fill-amber-300" />
            AlugaPA Pro
          </h3>
          <p className="text-blue-100 mb-6 relative z-10">
            Assine o plano PRO para destacar seus anúncios nas buscas e ter acesso aos contatos ilimitados.
          </p>
          <button className="bg-white text-blue-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors relative z-10">
            Fazer Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
