"use client";

import { useEffect, useState } from "react";
import { getPlatformTickets, changeTicketStatus } from "@/app/actions/admin";
import { LifeBuoy, Loader2, MessageSquare, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    setLoading(true);
    const { data } = await getPlatformTickets();
    if (data) setTickets(data);
    setLoading(false);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setProcessing(id);
    await changeTicketStatus(id, newStatus);
    await loadTickets();
    setProcessing(null);
  }

  const PRIORITY_COLORS: Record<string, string> = {
    LOW: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    MEDIUM: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    HIGH: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    CRITICAL: "bg-red-500/10 text-red-400 border-red-500/20"
  };
  
  const STATUS_COLORS: Record<string, string> = {
    OPEN: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    IN_PROGRESS: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    RESOLVED: "bg-green-500/10 text-green-400 border-green-500/20",
    CLOSED: "bg-slate-500/10 text-slate-400 border-slate-500/20"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Central de Suporte</h1>
          <p className="text-slate-400">Gerenciamento de tickets de atendimento e chamados.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
          Novo Chamado Interno
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {tickets.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
              <LifeBuoy className="h-12 w-12 text-slate-700 mb-4" />
              <p className="text-lg font-medium text-slate-300">Nenhum ticket encontrado.</p>
              <p className="text-sm">A fila de suporte está vazia.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-950/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Assunto</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Solicitante</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Prioridade / Categoria</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {tickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-slate-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-bold text-white line-clamp-1" title={ticket.subject}>
                            {ticket.subject}
                          </div>
                          <div className="text-xs text-slate-400 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(ticket.createdAt).toLocaleDateString('pt-BR')} às {new Date(ticket.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-300">{ticket.user?.name || 'Anônimo'}</div>
                      <div className="text-xs text-slate-500">{ticket.company?.name || ticket.user?.email || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex w-fit items-center px-2 py-0.5 rounded text-[10px] font-bold border ${PRIORITY_COLORS[ticket.priority] || "bg-slate-800 text-slate-400"}`}>
                          {ticket.priority === 'CRITICAL' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {ticket.priority}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{ticket.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${STATUS_COLORS[ticket.status] || "bg-slate-800 text-slate-400"}`}>
                        {ticket.status === 'RESOLVED' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3 items-center">
                        <select 
                          disabled={processing === ticket.id}
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                        >
                          <option value="OPEN">Abrir</option>
                          <option value="IN_PROGRESS">Em Atendimento</option>
                          <option value="RESOLVED">Resolvido</option>
                          <option value="CLOSED">Fechar</option>
                        </select>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                          Abrir Ticket
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
