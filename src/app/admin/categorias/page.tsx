"use client";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/app/actions/admin";
import { Layers, Loader2, Edit3, Settings, TrendingUp } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    const { data } = await getAllCategories();
    if (data) setCategories(data);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Categorias & Taxonomia</h1>
          <p className="text-slate-400">Estruture o motor de busca e SEO programático.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center shadow-lg shadow-blue-900/20">
          <Layers className="h-5 w-5 mr-2" />
          Nova Categoria
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm group hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700/50 text-blue-400">
                  <Layers className="h-6 w-6" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                     <Settings className="w-4 h-4" />
                   </button>
                   <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                     <Edit3 className="w-4 h-4" />
                   </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
              <p className="text-xs text-slate-500 font-mono mb-4">/{cat.slug}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="text-sm text-slate-400">
                  <span className="text-white font-bold">{cat._count.listings}</span> anúncios ativos
                </div>
                <div className="flex items-center text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                   <TrendingUp className="w-3.5 h-3.5 mr-1" /> Alta Demanda
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
