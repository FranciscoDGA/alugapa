"use client";

import { useEffect, useState } from "react";
import { getCompanyLeads, updateLeadStatus } from "@/app/actions/company";
import { Users, Phone, Mail, Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const COLUMNS = [
  { id: "NOVO", label: "Novos", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "CONTATO", label: "Em Contato", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { id: "PROPOSTA", label: "Proposta", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "FECHADO", label: "Fechado", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { id: "PERDIDO", label: "Perdido", color: "bg-slate-100 text-slate-800 border-slate-200" }
];

export default function LeadsCRMPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    const { data } = await getCompanyLeads();
    if (data) setLeads(data);
    setLoading(false);
  }

  async function handleStatusChange(leadId: string, newStatus: string) {
    // Optimistic update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    await updateLeadStatus(leadId, newStatus);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM & Leads</h1>
          <p className="text-gray-500">Acompanhe suas oportunidades de negócio no funil de vendas.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 h-full min-w-max">
            {COLUMNS.map(column => {
              const columnLeads = leads.filter(l => l.status === column.id);
              return (
                <div key={column.id} className="w-80 flex flex-col bg-slate-50/50 rounded-xl border border-slate-200 shrink-0">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-100/50 rounded-t-xl">
                    <h3 className={`text-sm font-bold px-2.5 py-1 rounded-md border ${column.color}`}>
                      {column.label}
                    </h3>
                    <span className="text-sm font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full shadow-sm">
                      {columnLeads.length}
                    </span>
                  </div>
                  
                  <div className="flex-1 p-3 overflow-y-auto space-y-3">
                    {columnLeads.map(lead => (
                      <div key={lead.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab hover:border-blue-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{lead.name}</h4>
                        </div>
                        <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block mb-3 line-clamp-1">
                          {lead.listing?.title || "Contato Geral"}
                        </p>
                        
                        <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                          <div className="flex items-center">
                            <Phone className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> {lead.phone}
                          </div>
                          {lead.email && (
                            <div className="flex items-center">
                              <Mail className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> {lead.email}
                            </div>
                          )}
                          <div className="flex items-center text-slate-400">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" /> 
                            {format(new Date(lead.createdAt), "dd MMM 'às' HH:mm", { locale: ptBR })}
                          </div>
                        </div>

                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="w-full text-xs border-slate-200 rounded-lg p-1.5 bg-slate-50 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {COLUMNS.map(c => <option key={c.id} value={c.id}>Mover para {c.label}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
