"use client";

import { useEffect, useState } from "react";
import { getCompanies, toggleCompanyVerification, changeCompanyStatus } from "@/app/actions/admin";
import { Building2, ShieldCheck, ShieldAlert, Loader2, CheckCircle2, XCircle, Ban } from "lucide-react";
import Image from "next/image";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    setLoading(true);
    const { data } = await getCompanies();
    if (data) setCompanies(data);
    setLoading(false);
  }

  async function handleToggleVerify(id: string, currentStatus: boolean) {
    setProcessing(id);
    await toggleCompanyVerification(id, currentStatus);
    await loadCompanies();
    setProcessing(null);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    if (confirm(`Tem certeza que deseja mudar o status para ${newStatus}?`)) {
      setProcessing(id);
      await changeCompanyStatus(id, newStatus);
      await loadCompanies();
      setProcessing(null);
    }
  }

  const STATUS_COLORS: Record<string, string> = {
    ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    SUSPENDED: "bg-red-500/10 text-red-400 border-red-500/20"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Empresas</h1>
          <p className="text-slate-400">Gestão e moderação de fornecedores da plataforma.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-950/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Local</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Métricas</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status / Selo</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {companies.map(company => (
                <tr key={company.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden relative">
                        {company.logoUrl ? (
                          <Image src={company.logoUrl} alt={company.name} fill className="object-cover" />
                        ) : (
                          <Building2 className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-white flex items-center">
                          {company.name}
                        </div>
                        <div className="text-xs text-slate-400">Desde {new Date(company.createdAt).getFullYear()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-300">{company.city}</div>
                    <div className="text-xs text-slate-500">{company.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-200 font-medium">{company._count.listings}</span> anúncios
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      <span className="text-slate-200 font-medium">{company._count.leads}</span> leads
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex w-fit items-center px-2.5 py-1 rounded-md text-xs font-bold border ${STATUS_COLORS[company.status] || "bg-slate-800 text-slate-400"}`}>
                        {company.status === 'ACTIVE' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                        {company.status === 'PENDING' && <Loader2 className="w-3.5 h-3.5 mr-1" />}
                        {company.status === 'SUSPENDED' && <Ban className="w-3.5 h-3.5 mr-1" />}
                        {company.status}
                      </span>
                      
                      {company.verified && (
                        <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Selo de Verificação
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex flex-col items-end gap-2">
                      <select 
                        disabled={processing === company.id}
                        value={company.status}
                        onChange={(e) => handleStatusChange(company.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                      >
                        <option value="ACTIVE">Ativar</option>
                        <option value="PENDING">Pendente</option>
                        <option value="SUSPENDED">Suspender</option>
                      </select>

                      <button 
                        onClick={() => handleToggleVerify(company.id, company.verified)}
                        disabled={processing === company.id}
                        className={`inline-flex justify-center items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all w-32 ${
                          company.verified 
                            ? 'bg-slate-800 text-slate-300 hover:bg-red-500/10 hover:text-red-400 border border-slate-700' 
                            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
                        } disabled:opacity-50`}
                      >
                      {processing === company.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : company.verified ? (
                        <>
                           <XCircle className="w-3.5 h-3.5 mr-1" /> Revogar Selo
                        </>
                      ) : (
                        <>
                           <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Aprovar Selo
                        </>
                      )}
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
