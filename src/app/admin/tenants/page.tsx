"use client";

import { useEffect, useState } from "react";
import { getPlatformUsers, changeUserRole } from "@/app/actions/admin";
import { Users, Loader2, ShieldAlert, Building2 } from "lucide-react";

export default function AdminTenantsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    const { data } = await getPlatformUsers();
    if (data) setUsers(data);
    setLoading(false);
  }

  async function handleRoleChange(id: string, newRole: string) {
    if (confirm(`Tem certeza que deseja mudar a permissão deste usuário para ${newRole}?`)) {
      setProcessing(id);
      await changeUserRole(id, newRole);
      await loadUsers();
      setProcessing(null);
    }
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const PLATFORM_ROLES = [
    "USER", "COMPANY_MEMBER", "COMPANY_OWNER", 
    "SUPPORT", "MODERATOR", "FINANCIAL", "MARKETING", "AUDITOR", "PLATFORM_ADMIN", "SUPER_ADMIN"
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuários & Acessos</h1>
          <p className="text-slate-400">Gerenciamento global de usuários e RBAC (Role-Based Access Control).</p>
        </div>
        
        <div className="relative">
          <input 
            type="text"
            placeholder="Buscar usuário por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500 w-full md:w-80"
          />
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
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Usuário</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Vinculo (Empresas)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Permissão Global (RBAC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        ) : (
                          <Users className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.companyMembers.length > 0 ? (
                        user.companyMembers.map((cm: any) => (
                          <span key={cm.id} className="inline-flex items-center px-2 py-1 rounded border border-slate-700 bg-slate-800 text-[10px] text-slate-300">
                            <Building2 className="w-3 h-3 mr-1 text-slate-400" />
                            {cm.company.name} ({cm.role})
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">Nenhum vínculo</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <select 
                        disabled={processing === user.id}
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={`text-xs rounded-lg px-2 py-1.5 focus:outline-none disabled:opacity-50 border ${
                          ['SUPER_ADMIN', 'PLATFORM_ADMIN'].includes(user.role) 
                            ? 'bg-blue-950 border-blue-800 text-blue-300'
                            : 'bg-slate-950 border-slate-700 text-slate-300'
                        }`}
                      >
                        {PLATFORM_ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      
                      {['SUPER_ADMIN', 'PLATFORM_ADMIN'].includes(user.role) && (
                        <div title="Acesso Administrativo">
                          <ShieldAlert className="w-4 h-4 text-blue-500" />
                        </div>
                      )}
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
