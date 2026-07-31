"use client";

import { useEffect, useState } from "react";
import { getPlatformListings, moderateListing } from "@/app/actions/admin";
import { Package, Loader2, CheckCircle2, Ban, Eye, Search } from "lucide-react";
import Link from "next/link";

export default function AdminMarketplacePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadListings();
  }, []);

  async function loadListings() {
    setLoading(true);
    const { data } = await getPlatformListings();
    if (data) setListings(data);
    setLoading(false);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    if (confirm(`Tem certeza que deseja mudar o status do anúncio para ${newStatus}?`)) {
      setProcessing(id);
      await moderateListing(id, newStatus);
      await loadListings();
      setProcessing(null);
    }
  }

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(search.toLowerCase()) || 
    l.company.name.toLowerCase().includes(search.toLowerCase())
  );

  const STATUS_COLORS: Record<string, string> = {
    ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
    REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
    SUSPENDED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    PENDING: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace & Equipamentos</h1>
          <p className="text-slate-400">Modere os anúncios criados pelas locadoras.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Buscar equipamento ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500 w-full md:w-80"
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
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Equipamento</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredListings.map(listing => (
                <tr key={listing.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        <Package className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{listing.title}</div>
                        <div className="text-xs text-slate-400">{listing.category.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-300">{listing.company.name}</div>
                    <div className="text-xs text-slate-500">{listing.city} - {listing.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${STATUS_COLORS[listing.status] || "bg-slate-800 text-slate-400"}`}>
                      {listing.status === 'ACTIVE' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                      {listing.status === 'REJECTED' && <Ban className="w-3.5 h-3.5 mr-1" />}
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3 items-center">
                      <Link 
                        href={`/equipamento/${listing.slug}`} 
                        target="_blank"
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Ver no site"
                      >
                        <Eye size={18} />
                      </Link>
                      
                      <select 
                        disabled={processing === listing.id}
                        value={listing.status}
                        onChange={(e) => handleStatusChange(listing.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                      >
                        <option value="ACTIVE">Ativar Anúncio</option>
                        <option value="PENDING">Revisão Pendente</option>
                        <option value="SUSPENDED">Ocultar (Suspenso)</option>
                        <option value="REJECTED">Rejeitar (Denunciado)</option>
                      </select>
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
