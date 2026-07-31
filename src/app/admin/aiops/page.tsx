"use client";

import { BrainCircuit, Check, X, TrendingUp, AlertOctagon, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";

export default function AIOpsDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  
  // Mock State para as recomendações pendentes (Human in the loop)
  const [insights, setInsights] = useState([
    {
      id: 1,
      category: 'INFRA',
      title: 'Alto Consumo de Memória (Workers)',
      description: 'O processo de geração de miniaturas das imagens consumiu 85% da RAM alocada nas últimas 2 horas.',
      suggestedAction: 'Escalar Horizontalmente (Adicionar +1 Worker)',
      confidence: 0.98,
      icon: AlertOctagon,
      color: 'rose'
    },
    {
      id: 2,
      category: 'BUSINESS',
      title: 'Queda de Conversão (Categoria: Geradores)',
      description: 'A taxa de geração de leads para Geradores em São Paulo caiu 15% comparada à semana passada.',
      suggestedAction: 'Ativar Campanha de Reengajamento (CRM)',
      confidence: 0.84,
      icon: TrendingUp,
      color: 'blue'
    }
  ]);

  const handleGenerateSummary = () => {
    setLoading(true);
    setTimeout(() => {
      setSummary("Nas últimas 24 horas, o sistema se comportou dentro da normalidade. Registramos 3 novos parceiros e 12 leads processados. Recomendo escalar os workers de imagem temporariamente devido ao pico de cadastros na região de Altamira.");
      setLoading(false);
    }, 1500);
  };

  const handleAction = (id: number) => {
    setInsights(insights.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Executive Copilot (AIOps)</h1>
          <p className="text-slate-400 mt-1">A IA como membro da sua equipe operacional.</p>
        </div>
        <button 
          onClick={handleGenerateSummary}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-indigo-900/20 transition-all disabled:opacity-50"
        >
          <BrainCircuit size={20} />
          {loading ? 'Analisando Dados...' : 'Gerar Resumo Diário'}
        </button>
      </div>

      {summary && (
        <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-indigo-500/30 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit size={100} />
          </div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-indigo-300 mb-4">
            <Lightbulb size={24} /> Resumo Executivo (Últimas 24h)
          </h2>
          <p className="text-indigo-100 text-lg leading-relaxed relative z-10 max-w-3xl">
            "{summary}"
          </p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-6">Recomendações Pendentes (Aprovação)</h3>
        
        {insights.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center">
            <Check className="mx-auto h-12 w-12 text-emerald-500 mb-3" />
            <h4 className="text-white font-bold">Nenhuma Ação Pendente</h4>
            <p className="text-slate-400 text-sm">O sistema está operando de forma autônoma sem anomalias detectadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map(insight => {
              const Icon = insight.icon;
              return (
                <div key={insight.id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded bg-${insight.color}-900/50 text-${insight.color}-400`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2 py-1 rounded">
                        {insight.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{insight.title}</h4>
                    <p className="text-slate-400 text-sm mb-4">{insight.description}</p>
                    
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 mb-6">
                      <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Ação Sugerida pela IA:</p>
                      <div className="flex items-center gap-2 text-emerald-400 font-medium">
                        <Zap size={16} /> {insight.suggestedAction}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Nível de Confiança: {(insight.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAction(insight.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Check size={18} /> Aprovar Execução
                    </button>
                    <button 
                      onClick={() => handleAction(insight.id)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                      title="Ignorar"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
