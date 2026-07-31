"use client";

import { useEffect, useState } from "react";
import { getCompanyListings, createListing, deleteListing } from "@/app/actions/company";
import { Plus, Package, Edit, Trash2, Loader2 } from "lucide-react";

export default function CatalogPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  async function loadListings() {
    setLoading(true);
    const { data } = await getCompanyListings();
    if (data) setListings(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir?")) {
      await deleteListing(id);
      loadListings();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    await createListing(formData);
    setSaving(false);
    setShowModal(false);
    loadListings();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meu Catálogo</h1>
          <p className="text-gray-500">Gerencie seus equipamentos e serviços ativos.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Anúncio
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Catálogo Vazio</h3>
          <p className="text-gray-500 mb-4">Você ainda não adicionou nenhum equipamento.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listings.map(listing => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">{listing.category.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {listing.priceOnRequest ? "Sob Consulta" : `R$ ${listing.price}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(listing.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Simplificado */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Novo Equipamento</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input name="title" required className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria (ID)</label>
                  <input name="categoryId" placeholder="ID da categoria no banco" required className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição Curta</label>
                <input name="shortDescription" required className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marca</label>
                  <input name="brand" className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Ex: Caterpillar" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Modelo</label>
                  <input name="model" className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Ex: 416F2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ano</label>
                  <input name="year" type="number" className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Ex: 2023" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preço (deixe em branco p/ Consulta)</label>
                  <input name="price" type="number" step="0.01" className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Disponibilidade</label>
                  <select name="status" className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white">
                    <option value="AVAILABLE">Disponível</option>
                    <option value="RESERVED">Reservado</option>
                    <option value="MAINTENANCE">Em Manutenção</option>
                    <option value="UNAVAILABLE">Indisponível</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="mr-3 text-gray-600 hover:text-gray-800">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  {saving ? "Salvando..." : "Salvar Anúncio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
