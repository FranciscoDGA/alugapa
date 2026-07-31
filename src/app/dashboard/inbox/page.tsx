"use client";

import { useState, useEffect } from "react";
import { useCompanyLeads, useLeadDetails, useReplyToLead } from "@/hooks/useLeads";
import { Send, User, Loader2, Phone, Mail, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getMyCompany } from "@/app/actions/company";

export default function InboxPage() {
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    async function loadAuth() {
      const { data } = await getMyCompany();
      if (data) setCompanyId(data.id);
    }
    loadAuth();
  }, []);

  const { data: leads, isLoading: loadingLeads } = useCompanyLeads(companyId || "");
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  
  const { data: leadDetails, isLoading: loadingLead } = useLeadDetails(activeLeadId || "");
  const { mutateAsync: reply, isPending: sending } = useReplyToLead();
  
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeLeadId || !companyId) return;
    
    await reply({ leadId: activeLeadId, companyId, message });
    setMessage("");
  };

  if (!companyId) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center bg-white rounded-2xl border border-gray-200">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      
      {/* Sidebar - Lista de Leads */}
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-gray-50/50 shrink-0">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-bold text-gray-900">Mensagens</h2>
          <p className="text-xs text-gray-500">Atenda seus leads em tempo real</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loadingLeads ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          ) : leads?.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              Nenhuma mensagem encontrada.
            </div>
          ) : (
            leads?.map((lead: any) => (
              <button 
                key={lead.id}
                onClick={() => setActiveLeadId(lead.id)}
                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-white transition-colors ${
                  activeLeadId === lead.id ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 text-sm truncate">{lead.name}</h4>
                  <span className="text-xs text-gray-400 shrink-0">
                    {format(new Date(lead.createdAt), "dd MMM", { locale: ptBR })}
                  </span>
                </div>
                <p className="text-xs text-blue-600 font-medium mb-1 truncate">
                  {lead.listing?.title || "Geral"}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {lead.message}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content - Chat */}
      <div className="flex-1 flex flex-col bg-white">
        {!activeLeadId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Mail className="w-16 h-16 mb-4 opacity-20" />
            <p>Selecione uma conversa para iniciar o atendimento</p>
          </div>
        ) : loadingLead ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : leadDetails ? (
          <>
            {/* Header do Chat */}
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold shrink-0">
                  {leadDetails.name.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{leadDetails.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center"><Phone className="w-3 h-3 mr-1" /> {leadDetails.phone}</span>
                    {leadDetails.email && <span className="flex items-center"><Mail className="w-3 h-3 mr-1" /> {leadDetails.email}</span>}
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase tracking-wider">
                  {leadDetails.status}
                </span>
              </div>
            </div>

            {/* Area de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50 custom-scrollbar">
              
              {/* Mensagem Original do Lead */}
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 max-w-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-900">
                    <User className="w-3 h-3" /> {leadDetails.name}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{leadDetails.message}</p>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div><strong>Equipamento:</strong> {leadDetails.listing?.title || "N/A"}</div>
                    <div><strong>Cidade:</strong> {leadDetails.city || "N/A"}</div>
                    {leadDetails.rentalStartDate && (
                      <div className="col-span-2">
                        <strong>Período:</strong> {format(new Date(leadDetails.rentalStartDate), "dd/MM/yyyy")}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-[10px] text-gray-400 text-right">
                    {format(new Date(leadDetails.createdAt), "dd/MM HH:mm")}
                  </div>
                </div>
              </div>

              {/* Mensagens (Respostas) */}
              {leadDetails.messages?.map((msg: any) => (
                <div key={msg.id} className={`flex ${msg.senderType === 'COMPANY' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-2xl max-w-lg shadow-sm ${
                    msg.senderType === 'COMPANY' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    <div className={`mt-1 text-[10px] text-right flex items-center justify-end gap-1 ${
                      msg.senderType === 'COMPANY' ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      {format(new Date(msg.createdAt), "HH:mm")}
                      {msg.senderType === 'COMPANY' && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}

              {/* Timeline Events (optional display) */}
              {leadDetails.events?.filter((e:any) => e.type === 'status_change').map((event: any) => (
                <div key={event.id} className="flex justify-center my-4">
                  <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3 h-3" />
                    {event.title} • {format(new Date(event.createdAt), "dd/MM HH:mm")}
                  </div>
                </div>
              ))}

            </div>

            {/* Composer */}
            <div className="p-4 border-t border-gray-200 bg-white shrink-0">
              <form onSubmit={handleSend} className="flex items-end gap-3">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva sua resposta (o cliente será notificado por email)..."
                    className="w-full bg-transparent p-3 text-sm text-gray-700 resize-none outline-none max-h-32 min-h-[60px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!message.trim() || sending}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center shadow-md shadow-blue-500/20"
                >
                  {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
