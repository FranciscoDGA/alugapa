import { Key, Webhook, BookOpen, Code2 } from "lucide-react";

export default function DesenvolvedorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portal do Desenvolvedor</h1>
          <p className="text-slate-500 mt-1">Gerencie suas API Keys, Webhooks e integrações (Platform OS).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* API Keys */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Key size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">API Keys</h2>
            </div>
            <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">
              + Nova Chave
            </button>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-800 text-sm">ERP Zapier Integ.</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Ativa</span>
            </div>
            <div className="bg-slate-200 p-2 rounded text-slate-600 font-mono text-xs flex justify-between">
              sk_live_8f92j3...
              <button className="text-blue-600 hover:underline">Copiar</button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Último uso: Há 2 horas</p>
          </div>
        </div>

        {/* Webhooks */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <Webhook size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Webhooks</h2>
            </div>
            <button className="text-sm bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">
              Configurar
            </button>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm font-medium text-slate-800 mb-1">https://hooks.zapier.com/...</p>
            <p className="text-xs text-slate-500 mb-3">Eventos inscritos: LEAD_CREATED</p>
            <div className="flex gap-2">
              <button className="text-xs border border-slate-300 bg-white text-slate-700 px-3 py-1 rounded font-medium hover:bg-slate-50 transition-colors">
                Ping Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documentação */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-indigo-400" size={24} />
          <h2 className="text-xl font-bold">Documentação da API v1</h2>
        </div>
        <p className="text-slate-400 text-sm mb-4">
          Para realizar chamadas, envie sua API Key no cabeçalho Authorization.
        </p>
        <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-slate-300 border border-slate-800 overflow-x-auto">
          <code>
            curl -X GET https://api.alugapa.com.br/api/v1/listings \<br/>
            &nbsp;&nbsp;-H "Authorization: Bearer sk_live_8f92j3..."
          </code>
        </div>
      </div>
    </div>
  );
}
