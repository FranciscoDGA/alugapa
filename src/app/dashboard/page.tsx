import { PrismaClient } from "@prisma/client";
import { Users, MousePointerClick, TrendingUp, DollarSign, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function DashboardOverview() {
  // Mocking the logged-in company as "Energia Locações" for MVP
  const company = await prisma.company.findFirst({
    where: { slug: "energia-locacoes" },
    include: {
      leads: {
        orderBy: { createdAt: "desc" },
        take: 5
      },
      listings: true
    }
  });

  if (!company) {
    return <div>Empresa não encontrada no banco de dados.</div>;
  }

  const activeLeads = company.leads.filter(l => l.status !== "FECHADO" && l.status !== "PERDIDO").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bom dia, João!</h1>
          <p className="text-gray-500">Aqui está o resumo da sua operação no AlugaPA hoje.</p>
        </div>
        <Link href="/dashboard/leads" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Ver Leads Pendentes
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Novos Leads</p>
              <h3 className="text-3xl font-bold text-gray-900">{activeLeads}</h3>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+12%</span>
            <span className="text-gray-400 ml-2">esta semana</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Cliques no WhatsApp</p>
              <h3 className="text-3xl font-bold text-gray-900">42</h3>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <MousePointerClick size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+5%</span>
            <span className="text-gray-400 ml-2">esta semana</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Conversão Estimada</p>
              <h3 className="text-3xl font-bold text-gray-900">8.4%</h3>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
              <Activity size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+1.2%</span>
            <span className="text-gray-400 ml-2">este mês</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm opacity-60">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Receita Gerada</p>
              <h3 className="text-3xl font-bold text-gray-900 line-through text-gray-400">R$ --</h3>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            Configure seu ERP para ver dados financeiros.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Feed Inteligente (IA Diagnóstico) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">IA</span>
              <h2 className="text-lg font-bold text-gray-900">Health Center (Diagnóstico de Negócio)</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Alta demanda detectada</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    A procura por "Gerador 50kVA" aumentou 23% na sua região (São Paulo, SP) nos últimos 7 dias. Seu anúncio é o 2º mais visitado!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Otimização de Perfil</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Seu perfil não possui fotos da equipe. Empresas que mostram a equipe fecham 14% mais negócios na plataforma.
                  </p>
                  <button className="mt-3 text-sm font-semibold text-amber-700 hover:text-amber-800">
                    Adicionar fotos agora →
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Tempo de resposta excelente</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Você está respondendo aos leads em média em 12 minutos. Continue assim para manter seu selo "Resposta Rápida".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Últimos Leads */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Leads Recentes</h2>
            <Link href="/dashboard/leads" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
              Ver todos
            </Link>
          </div>

          <div className="space-y-4">
            {company.leads.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">Nenhum lead recebido ainda.</p>
            ) : (
              company.leads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{lead.message}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    lead.status === 'NOVO' ? 'bg-blue-100 text-blue-700' :
                    lead.status === 'CONTATO' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
