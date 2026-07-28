"use client";

import { useState } from "react";
import { Search, MapPin, Filter, Star, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function BuscarPage() {
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
              defaultValue="Gerador"
            />
          </div>
          <div className="md:w-1/4 w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-500 transition-colors">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Cidade ou Estado" 
              className="w-full bg-transparent text-gray-900 outline-none"
              defaultValue="SÃ£o Paulo, SP"
            />
          </div>
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3 transition-colors">
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
                {/* Categorias */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-3 uppercase tracking-wider">Categorias</h4>
                  <div className="space-y-2">
                    {["Energia (45)", "ConstruÃ§Ã£o (12)", "Eventos (8)"].map((cat, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked={i === 0} />
                        <span className="text-gray-600 text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-100" />
                {/* Tipo de LocaÃ§Ã£o */}
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
              <h1 className="text-2xl font-bold text-gray-900">45 resultados encontrados</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                Mais relevantes <ChevronDown size={16} />
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item * 0.1 }}
                  key={item} 
                  className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-gray-400">Imagem {item}</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                          Gerador Silenciado 50kVA a Diesel
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded-lg text-sm">
                          <Star size={16} className="fill-amber-500" /> 4.9
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <MapPin size={16} /> SÃ£o Paulo, SP (a 12km)
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        Gerador cabinado super silenciado, ideal para eventos, hospitais e obras. ManutenÃ§Ã£o em dia e entrega imediata na grande SP.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                          EL
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                            Energia LocaÃ§Ãµes <CheckCircle2 size={14} className="text-blue-500" />
                          </p>
                          <p className="text-xs text-gray-500">Na plataforma hÃ¡ 2 anos</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors">
                          Ver Detalhes
                        </button>
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors">
                          OrÃ§ar
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
