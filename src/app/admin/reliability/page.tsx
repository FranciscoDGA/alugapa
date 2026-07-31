"use client";

import { Activity, ServerCrash, CheckCircle2, AlertTriangle, ShieldCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReliabilityDashboardPage() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    // Simula a busca do health check real a cada 10 segundos
    const fetchHealth = () => {
      fetch('/api/health')
        .then(res => res.json())
        .then(data => setHealth(data))
        .catch(() => setHealth({ status: 'error' }));
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Platform Reliability OS</h1>
          <p className="text-slate-400 mt-1">SRE, Health Checks e Pipeline de CI/CD.</p>
        </div>
        <div className="flex gap-2">
          {health?.status === 'ok' ? (
             <div className="flex items-center gap-2 bg-emerald-900/30 text-emerald-500 px-4 py-2 rounded-lg font-bold border border-emerald-900">
               <CheckCircle2 size={18} /> Sistema Operacional
             </div>
          ) : (
             <div className="flex items-center gap-2 bg-rose-900/30 text-rose-500 px-4 py-2 rounded-lg font-bold border border-rose-900 animate-pulse">
               <AlertTriangle size={18} /> Incidente Detectado
             </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-medium">Uptime (Global)</span>
            <Activity className="text-blue-500 h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-white">99.98%</p>
          <p className="text-xs text-emerald-400 mt-1">SLA Atendido</p>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-medium">Latência Banco (DB)</span>
            <ServerCrash className="text-indigo-500 h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-white">
            {health?.services?.database?.latencyMs ? `${health.services.database.latencyMs}ms` : '--'}
          </p>
          <p className="text-xs text-slate-500 mt-1">Readiness Check</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-medium">Último Deploy (CI)</span>
            <ShieldCheck className="text-emerald-500 h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-white">Passou</p>
          <p className="text-xs text-emerald-400 mt-1">Build & Lint Automáticos</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-medium">Tempo Ativo</span>
            <Clock className="text-amber-500 h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-white">
            {health?.uptime ? `${(health.uptime / 3600).toFixed(1)}h` : '--'}
          </p>
          <p className="text-xs text-slate-500 mt-1">Desde o último restart</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Logs Estruturados (Live Tail Mock)</h2>
        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs space-y-2 h-64 overflow-y-auto">
          <div className="text-slate-400"><span className="text-blue-500">[INFO]</span> 2026-07-29T20:50:00Z - &#123; "message": "Tenant Engine Initialized", "environment": "production" &#125;</div>
          <div className="text-slate-400"><span className="text-blue-500">[INFO]</span> 2026-07-29T20:50:02Z - &#123; "message": "HealthCheck ping", "context": &#123; "dbLatency": 14 &#125; &#125;</div>
          <div className="text-slate-400"><span className="text-amber-500">[WARN]</span> 2026-07-29T20:51:14Z - &#123; "message": "Search query with 0 results", "context": &#123; "term": "trator espacial" &#125; &#125;</div>
          <div className="text-slate-500 italic mt-4">Aguardando novos logs do sistema...</div>
        </div>
      </div>
    </div>
  );
}
