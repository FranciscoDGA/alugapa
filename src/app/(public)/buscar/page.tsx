"use client";

import React, { useState, Suspense } from "react";
import { Search, MapPin, Filter, Star, ChevronDown, CheckCircle2, Loader2, Frown } from "lucide-react";
import { motion } from "framer-motion";
import { useSearch } from "@/hooks/useSearch";
import { useCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function BuscarContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [city, setCity] = useState(searchParams.get("location") || "");
  const [activeCategoryId, setActiveCategoryId] = useState(searchParams.get("categoryId") || "");
  
  const [appliedQuery, setAppliedQuery] = useState(query);
  const [appliedCity, setAppliedCity] = useState(city);

  const { data: listings, isLoading } = useSearch(appliedQuery, appliedCity, activeCategoryId);
  const { data: categories } = useCategories();

  const handleSearch = () => {
    setAppliedQuery(query);
    setAppliedCity(city);
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
            Buscar
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
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-3 uppercase tracking-wider">Categorias</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category"
                        checked={activeCategoryId === ""}
                        onChange={() => setActiveCategoryId("")}
                        className="text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-gray-600 text-sm">Todas</span>
                    </label>
                    {categories?.map((cat: any) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="category"
                          checked={activeCategoryId === cat.id}
                          onChange={() => setActiveCategoryId(cat.id)}
                          className="text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="text-gray-600 text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {isLoading ? "Buscando..." : `${listings?.length || 0} resultados encontrados`}
              </h1>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                </div>
              ) : (
                listings?.map((item: any, index: number) => (
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
                          <Link href={`/equipamento/${item.slug}`}>
                            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          {item.company?.rating && (
                            <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded-lg text-sm">
                              <Star size={16} className="fill-amber-500" /> {item.company.rating.toFixed(1)}
                            </div>
                          )}
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
                            {item.company?.name?.substring(0,2).toUpperCase() || 'CO'}
                          </div>
                          <div>
                            <Link href={`/empresa/${item.company?.slug || '#'}`}>
                              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1 hover:underline">
                                {item.company?.name || 'Empresa Desconhecida'} 
                                {item.company?.verified && <CheckCircle2 size={14} className="text-blue-500" />}
                              </p>
                            </Link>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Link href={`/equipamento/${item.slug}`} className="flex-1 text-center bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors">
                            Detalhes
                          </Link>
                          <Link href={`/orcamento/${item.id}`} className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors">
                            Orçar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {!isLoading && (!listings || listings.length === 0) && (
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <Frown className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum anúncio encontrado</h3>
                  <p className="text-gray-600">Tente buscar com outros termos ou altere os filtros.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin w-10 h-10 text-blue-600" /></div>}>
      <BuscarContent />
    </Suspense>
  );
}
