"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Wrench, Lock, CheckCircle2, Clock, Trash2, Plus } from "lucide-react";
import { createSchedule, deleteSchedule } from "@/app/actions/agenda";

const TYPE_COLORS: Record<string, string> = {
  MAINTENANCE: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  BLOCK: "bg-red-500/10 text-red-400 border-red-500/20",
  BOOKING: "bg-blue-500/10 text-blue-400 border-blue-500/20"
};

const TYPE_LABELS: Record<string, string> = {
  MAINTENANCE: "Manutenção",
  BLOCK: "Bloqueio",
  BOOKING: "Reserva"
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  MAINTENANCE: Wrench,
  BLOCK: Lock,
  BOOKING: CheckCircle2
};

export default function AgendaManagement({ initialSchedules, listings }: { initialSchedules: any[], listings: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    const result = await createSchedule(formData);
    
    if (result.success) {
      setIsModalOpen(false);
    } else {
      setErrorMsg(result.error || "Erro ao criar evento.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      await deleteSchedule(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-semibold text-white">Próximos Eventos</h2>
          <p className="text-sm text-slate-400 mt-1">
            {initialSchedules.length} evento(s) programado(s)
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={18} />
          Novo Evento
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        {initialSchedules.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <CalendarIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>Sua agenda está livre.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {initialSchedules.map((schedule) => {
              const Icon = TYPE_ICONS[schedule.type] || Clock;
              return (
                <div key={schedule.id} className="p-6 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4 items-start md:items-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${TYPE_COLORS[schedule.type] || "bg-slate-800"}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-lg flex items-center gap-2">
                        {schedule.title || TYPE_LABELS[schedule.type]}
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_COLORS[schedule.type]}`}>
                          {TYPE_LABELS[schedule.type]}
                        </span>
                      </h4>
                      <p className="text-sm text-slate-400 mt-1">
                        Equipamento: {schedule.listing.title} {schedule.listing.model ? `(${schedule.listing.model})` : ''}
                      </p>
                      {schedule.notes && <p className="text-xs text-slate-500 mt-1">{schedule.notes}</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0">
                    <div className="text-right">
                      <div className="text-sm text-slate-300">
                        Início: <span className="text-white">{new Date(schedule.startDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="text-sm text-slate-300">
                        Fim: <span className="text-white">{new Date(schedule.endDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(schedule.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                      title="Excluir Evento"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
            <h3 className="text-xl font-bold text-white mb-2">Novo Evento</h3>
            <p className="text-sm text-slate-400 mb-6">
              Adicione uma reserva, manutenção ou bloqueie datas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Equipamento</label>
                <select 
                  name="listingId" 
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                >
                  <option value="">Selecione um equipamento...</option>
                  {listings.map(listing => (
                    <option key={listing.id} value={listing.id}>
                      {listing.title} {listing.model ? `(${listing.model})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Tipo de Evento</label>
                <select 
                  name="type" 
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                >
                  <option value="BOOKING">Reserva / Locação</option>
                  <option value="MAINTENANCE">Manutenção</option>
                  <option value="BLOCK">Bloqueio de Agenda</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Título (Opcional)</label>
                <input 
                  name="title" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  placeholder="Ex: Troca de Óleo 500h" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Data Inicial</label>
                  <input 
                    name="startDate" 
                    type="date"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Data Final</label>
                  <input 
                    name="endDate" 
                    type="date"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Observações (Opcional)</label>
                <textarea 
                  name="notes" 
                  rows={2}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                  placeholder="Detalhes adicionais..." 
                />
              </div>

              {errorMsg && (
                <p className="text-sm text-red-400 font-medium">{errorMsg}</p>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-medium flex justify-center items-center gap-2"
                >
                  {loading ? "Salvando..." : <><CalendarIcon size={18} /> Confirmar</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
