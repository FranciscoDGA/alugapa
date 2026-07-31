"use client";
import React from "react";
import { DollarSign, TrendingUp, CreditCard, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function FinanceiroAdminPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Revenue OS
            <DollarSign className="text-emerald-500" />
          </h1>
          <p className="text-slate-400 mt-1">Dashboard central de Billing, Upsells e Assinaturas.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <CreditCard size={18} />
          Criar Plano Novo
        </button>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-sm font-medium text-slate-400 mb-1">MRR (Receita Recorrente)</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-white">R$ 14.500,00</h2>
            <span className="text-xs font-bold text-emerald-400 flex items-center"><ArrowUpRight size={14}/> +12%</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-sm font-medium text-slate-400 mb-1">ARR (Receita Anual Estimada)</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-white">R$ 174.000,00</h2>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-sm font-medium text-slate-400 mb-1">Taxa de Churn Mensal</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-white">2.4%</h2>
            <span className="text-xs font-bold text-emerald-400 flex items-center"><ArrowDownRight size={14}/> Bom</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 border-t-4 border-t-amber-500">
          <p className="text-sm font-medium text-amber-400 mb-1">Inadimplência Recente</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-white">R$ 950,00</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upsell Intelligence */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-black/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Revenue Intelligence (Oportunidades)</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">Locadora XYZ</h4>
                  <p className="text-sm text-slate-400 mt-1">Plano atual: Starter. Recebeu 15 leads essa semana.</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">UPSELL ALTO</span>
              </div>
              <p className="text-sm text-amber-400 font-medium mt-3">Impacto Potencial: +R$ 299/mês</p>
            </div>
          </div>
        </div>

        {/* Recovery Engine */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-black/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Recovery Engine (Cobrança)</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">Máquinas BR</h4>
                  <p className="text-sm text-slate-400 mt-1">Fatura de R$ 499,90 atrasada há 5 dias (PIX).</p>
                </div>
              </div>
              <button className="mt-4 text-sm font-medium text-rose-400 hover:text-rose-300">
                Disparar Régua de Cobrança (WhatsApp) →
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
