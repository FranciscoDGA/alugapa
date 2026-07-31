"use client";

import { useState } from "react";
import { UserPlus, Shield, MoreVertical, Trash2, Mail } from "lucide-react";
import { inviteMember, removeMember } from "@/app/actions/team";

const ROLE_LABELS: Record<string, string> = {
  OWNER: "Proprietário",
  ADMIN: "Administrador",
  OPERATOR: "Operador",
  SALES: "Comercial",
  FINANCIAL: "Financeiro",
  COMPANY_MEMBER: "Membro"
};

const ROLE_COLORS: Record<string, string> = {
  OWNER: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ADMIN: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  OPERATOR: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  SALES: "bg-green-500/10 text-green-400 border-green-500/20",
  FINANCIAL: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  COMPANY_MEMBER: "bg-slate-500/10 text-slate-400 border-slate-500/20"
};

export default function TeamManagement({ initialMembers }: { initialMembers: any[] }) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    const result = await inviteMember(formData);
    
    if (result.success) {
      setIsInviteOpen(false);
    } else {
      setErrorMsg(result.error || "Erro ao convidar membro.");
    }
    setLoading(false);
  };

  const handleRemove = async (memberId: string) => {
    if (confirm("Tem certeza que deseja remover este membro da empresa?")) {
      await removeMember(memberId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-semibold text-white">Membros da Equipe</h2>
          <p className="text-sm text-slate-400 mt-1">
            {initialMembers.length} membro(s) cadastrado(s)
          </p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
        >
          <UserPlus size={18} />
          Convidar Membro
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-300 text-sm">
                <th className="p-4 font-medium w-1/3">Usuário</th>
                <th className="p-4 font-medium">Nível de Acesso</th>
                <th className="p-4 font-medium text-center">Data de Entrada</th>
                <th className="p-4 font-medium text-right w-24">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {initialMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white uppercase overflow-hidden">
                        {member.user.avatarUrl ? (
                          <img src={member.user.avatarUrl} alt={member.user.name} className="w-full h-full object-cover" />
                        ) : (
                          member.user.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">{member.user.name}</div>
                        <div className="text-xs text-slate-400">{member.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${ROLE_COLORS[member.role] || ROLE_COLORS.COMPANY_MEMBER}`}>
                      <Shield size={12} />
                      {ROLE_LABELS[member.role] || member.role}
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm text-slate-400">
                    {new Date(member.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="p-4 text-right">
                    {member.role !== "OWNER" && (
                      <button 
                        onClick={() => handleRemove(member.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                        title="Remover membro"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isInviteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <h3 className="text-xl font-bold text-white mb-2">Convidar Membro</h3>
            <p className="text-sm text-slate-400 mb-6">
              Envie um convite para adicionar um novo membro à sua equipe.
            </p>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nome</label>
                <input 
                  name="name" 
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  placeholder="Nome do membro" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <input 
                    name="email" 
                    type="email"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                    placeholder="email@exemplo.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nível de Acesso (RBAC)</label>
                <select 
                  name="role" 
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                >
                  <option value="ADMIN">Administrador (Acesso total)</option>
                  <option value="SALES">Comercial (Apenas Leads)</option>
                  <option value="OPERATOR">Operador (Catálogo e Agenda)</option>
                  <option value="FINANCIAL">Financeiro (Faturamento)</option>
                </select>
              </div>

              {errorMsg && (
                <p className="text-sm text-red-400 font-medium">{errorMsg}</p>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-medium flex justify-center items-center gap-2"
                >
                  {loading ? "Enviando..." : <><Mail size={18} /> Enviar Convite</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
