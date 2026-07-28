"use client";

import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const placeholders = [
  "Retroescavadeira...",
  "Gerador para eventos...",
  "Drone Agrícola...",
  "Poço Artesiano...",
  "Caminhão Munck..."
];

export default function HeroSearch() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white pt-24 pb-32 overflow-hidden">
      {/* Background patterns/glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-cyan-400 rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="container relative mx-auto px-4 text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
        >
          Encontre <span className="text-blue-300">máquinas</span>, <span className="text-cyan-300">equipamentos</span> e <span className="text-blue-300">serviços</span> especializados em todo o Brasil.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
        >
          A principal infraestrutura digital para conectar sua necessidade aos melhores fornecedores do mercado.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2"
        >
          {/* O que você precisa */}
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 md:py-0 border border-transparent focus-within:border-blue-500 transition-colors">
            <Search className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" />
            <div className="relative w-full h-12 flex flex-col justify-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider absolute top-0">O que você precisa?</span>
              <div className="relative h-6 mt-4 w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPlaceholder}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 pointer-events-none flex items-center text-gray-400 text-lg whitespace-nowrap"
                  >
                    {placeholders[currentPlaceholder]}
                  </motion.div>
                </AnimatePresence>
                <input 
                  type="text" 
                  className="w-full h-full bg-transparent text-lg text-gray-900 outline-none relative z-10"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px bg-gray-200 my-2"></div>

          {/* Onde */}
          <div className="md:w-1/3 flex items-center bg-gray-50 rounded-xl px-4 py-3 md:py-0 border border-transparent focus-within:border-blue-500 transition-colors">
            <MapPin className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" />
            <div className="relative w-full h-12 flex flex-col justify-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider absolute top-0">Onde?</span>
              <input 
                type="text" 
                placeholder="Ex: Marabá, PA" 
                className="w-full h-6 mt-4 bg-transparent text-lg text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl px-8 py-4 md:py-0 transition-colors shadow-lg shadow-blue-600/30">
            Buscar
          </button>
        </motion.div>
        
        {/* Popular searches */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-blue-200"
        >
          <span className="opacity-70">Buscas populares:</span>
          <a href="#" className="hover:text-white transition-colors border border-blue-400/30 rounded-full px-3 py-0.5 bg-blue-800/30 backdrop-blur-sm">Geradores</a>
          <a href="#" className="hover:text-white transition-colors border border-blue-400/30 rounded-full px-3 py-0.5 bg-blue-800/30 backdrop-blur-sm">Topografia</a>
          <a href="#" className="hover:text-white transition-colors border border-blue-400/30 rounded-full px-3 py-0.5 bg-blue-800/30 backdrop-blur-sm">Munck</a>
        </motion.div>

      </div>
    </section>
  );
}
