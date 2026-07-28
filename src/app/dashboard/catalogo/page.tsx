import { PrismaClient } from "@prisma/client";
import { Plus, Edit3, Trash2, Eye } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function CatalogoPage() {
  const company = await prisma.company.findFirst({
    where: { slug: "energia-locacoes" },
    include: {
      listings: {
        include: { category: true },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!company) return <div>Erro ao carregar catálogo.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meu Catálogo</h1>
          <p className="text-gray-500">Gerencie seus equipamentos e serviços publicados.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm shadow-blue-600/20">
          <Plus size={20} />
          Novo Anúncio
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold w-16">Foto</th>
                <th className="px-6 py-4 font-semibold">Anúncio</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Preço</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {company.listings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Você ainda não tem nenhum anúncio publicado.
                  </td>
                </tr>
              ) : (
                company.listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden">
                        <span className="text-[10px] text-gray-400 font-medium">Sem Foto</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{listing.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px] mt-1">{listing.shortDescription}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
                        {listing.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {listing.priceOnRequest ? "Sob Consulta" : `R$ ${listing.price}`}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex inline-flex items-center gap-1 ${
                        listing.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${listing.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                        {listing.status === 'ACTIVE' ? 'Ativo' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/orcamento?listing=${listing.id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Visualizar">
                          <Eye size={18} />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Editar">
                          <Edit3 size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      </div>
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
