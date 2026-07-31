import { getPlatformStats } from "@/app/actions/admin";
import { Building2, Package, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const { data: stats } = await getPlatformStats();

  const metrics = [
    { label: "Empresas Ativas", value: stats?.companies || 0, icon: Building2, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Anúncios (Listings)", value: stats?.listings || 0, icon: Package, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Leads Gerados", value: stats?.leads || 0, icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Receita (MRR)", value: `R$ ${(stats?.revenue || 0).toLocaleString('pt-BR')}`, icon: DollarSign, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
        <p className="text-slate-400 mt-2">Visão geral do desempenho da plataforma AlugaPA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">{metric.label}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{metric.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${metric.bg} ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center text-emerald-500 text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-1" /> +12% vs mês anterior
            </div>
          </div>
        ))}
      </div>

      {/* Seções Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Ações Pendentes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 animate-pulse" />
                <span className="text-slate-200">2 empresas aguardando verificação</span>
              </div>
              <Link href="/admin/empresas" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                Revisar &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Building2 className="w-32 h-32 text-indigo-400" />
           </div>
           <h3 className="text-xl font-bold text-white mb-2 relative z-10">Expansão de Mercado</h3>
           <p className="text-indigo-200 text-sm mb-6 max-w-sm relative z-10">
             O estado do Pará atingiu 80% da meta de aquisição de fornecedores deste trimestre.
           </p>
           <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg relative z-10 transition-colors shadow-lg shadow-indigo-900/50">
             Ver Relatório Growth
           </button>
        </div>
      </div>
    </div>
  );
}
