"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Filter, Star, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { searchListings, getCategories } from "../actions/listings";

// Tipos baseados no schema do Prisma
type Listing = {
  id: string;
  title: string;
  shortDescription: string;
  city: string;
  state: string;
  price: number | null;
  priceOnRequest: boolean;
  company: {
    name: string;
    verified: boolean;
    rating: number;
    yearsInMarket: number;
  };
  category: {
    name: string;
  };
};

type CategoryCount = {
  id: string;
  name: string;
  _count: {
    listings: number;
  }
};

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca inicial
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [results, cats] = await Promise.all([
          searchListings(query, city),
          getCategories()
        ]);
        // Conversão de tipos para não dar erro no TypeScript por conta de datas do Prisma
        setListings(results as unknown as Listing[]);
        setCategories(cats);
      } catch (error) {
        console.error("Erro ao buscar:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []); // Executa uma vez no carregamento. Na versão real, executaria também ao mudar query/city

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchListings(query, city);
      setListings(results as unknown as Listing[]);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Header da Busca */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-500 transition-colors">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Ex: Gerador 50kVA, Retroescavadeira..." 
              className="w-full bg-transparent text-gray-900 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="md:w-1/4 w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-500 transition-colors">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Cidade ou Estado" 
              className="w-full bg-transparent text-gray-900 outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3 transition-colors flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Buscar"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filtros */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 font-bold text-gray-900 mb-6">
                <Filter size={20} /> Filtros
              </div>
              
              <div className="space-y-6">
                {/* Categorias */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-3 uppercase tracking-wider">Categorias</h4>
                  <div className="space-y-2">
                    {categories.map((cat, i) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        <span className="text-gray-600 text-sm">{cat.name} ({cat._count.listings})</span>
                      </label>
                    ))}
                    {categories.length === 0 && !loading && (
                      <span className="text-gray-400 text-sm">Nenhuma categoria</span>
                    )}
                  </div>
                </div>
                <hr className="border-gray-100" />
                {/* Tipo de Locação */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-3 uppercase tracking-wider">Tipo</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-gray-600 text-sm">Com Operador</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-gray-600 text-sm">Sem Operador</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {loading ? "Buscando..." : `${listings.length} resultados encontrados`}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                Mais relevantes <ChevronDown size={16} />
              </div>
            </div>

            <div className="space-y-4">
              {loading && listings.length === 0 ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                </div>
              ) : (
                listings.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={item.id} 
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-full md:w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      <span className="text-gray-400">Sem Imagem</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded-lg text-sm">
                            <Star size={16} className="fill-amber-500" /> {item.company.rating.toFixed(1)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <MapPin size={16} /> {item.city}, {item.state}
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {item.shortDescription}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                            {item.company.name.substring(0,2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                              {item.company.name} 
                              {item.company.verified && <CheckCircle2 size={14} className="text-blue-500" />}
                            </p>
                            <p className="text-xs text-gray-500">Na plataforma há {item.company.yearsInMarket} anos</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button className="flex-1 bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors">
                            Ver Detalhes
                          </button>
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors">
                            Orçar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {!loading && listings.length === 0 && (
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum anúncio encontrado</h3>
                  <p className="text-gray-600">Tente buscar com outros termos ou altere a região.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
