import { PrismaClient } from "@prisma/client";
import { MessageCircle, Phone, Mail, MoreVertical, Calendar } from "lucide-react";

const prisma = new PrismaClient();

export default async function LeadsPage() {
  const company = await prisma.company.findFirst({
    where: { slug: "energia-locacoes" },
    include: {
      leads: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!company) return <div>Erro ao carregar dados.</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NOVO": return "bg-blue-100 text-blue-700";
      case "CONTATO": return "bg-amber-100 text-amber-700";
      case "PROPOSTA": return "bg-purple-100 text-purple-700";
      case "NEGOCIACAO": return "bg-orange-100 text-orange-700";
      case "FECHADO": return "bg-emerald-100 text-emerald-700";
      case "PERDIDO": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Leads</h1>
          <p className="text-gray-500">Acompanhe e responda às solicitações de orçamento.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Contato</th>
                <th className="px-6 py-4 font-semibold">Solicitação</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {company.leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : (
                company.leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar size={12} /> {lead.createdAt.toLocaleDateString("pt-BR")}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <a href={`https://wa.me/55${lead.phone}`} target="_blank" className="flex items-center gap-1 text-green-600 hover:underline">
                          <MessageCircle size={14} /> {lead.phone}
                        </a>
                        {lead.email && (
                          <span className="flex items-center gap-1 text-gray-500">
                            <Mail size={14} /> {lead.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="line-clamp-2 max-w-xs">{lead.message}</p>
                      {lead.city && <span className="text-xs text-gray-400 mt-1 block">Local: {lead.city}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
