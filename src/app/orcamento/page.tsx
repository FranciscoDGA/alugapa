"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Package, MapPin, Calendar, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrcamentoPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Solicitar OrÃ§amento</h1>
          <p className="text-lg text-gray-600">
            Conectamos sua necessidade aos melhores fornecedores do Brasil. Receba cotaÃ§Ãµes em minutos.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                step >= i ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > i ? <CheckCircle2 size={20} /> : i}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="text-blue-600" /> O que vocÃª precisa?
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                      <option>Selecione uma categoria</option>
                      <option>Geradores de Energia</option>
                      <option>MÃ¡quinas Pesadas</option>
                      <option>Plataformas ElevatÃ³rias</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descreva sua necessidade</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                      placeholder="Ex: Preciso de um gerador 50kVA silenciado para um evento de 3 dias..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3 flex items-center gap-2 transition-colors"
                  >
                    PrÃ³ximo Passo <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="text-blue-600" /> Onde e Quando?
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cidade / Estado</label>
                      <input 
                        type="text" 
                        placeholder="Ex: SÃ£o Paulo, SP" 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CEP (Opcional)</label>
                      <input 
                        type="text" 
                        placeholder="00000-000" 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PerÃ­odo de LocaÃ§Ã£o</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                        <Calendar size={20} className="text-gray-400 mr-2" />
                        <input type="date" className="w-full bg-transparent outline-none text-gray-900" />
                      </div>
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                        <Calendar size={20} className="text-gray-400 mr-2" />
                        <input type="date" className="w-full bg-transparent outline-none text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="text-gray-500 font-bold hover:text-gray-900 px-4 py-2 transition-colors"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3 flex items-center gap-2 transition-colors"
                  >
                    Ãšltimo Passo <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="text-blue-600" /> Seus Dados
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo / Empresa</label>
                    <input 
                      type="text" 
                      placeholder="Seu nome" 
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                      <input 
                        type="tel" 
                        placeholder="(11) 90000-0000" 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                      <input 
                        type="email" 
                        placeholder="seu@email.com" 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4 mt-6 border border-blue-100 flex items-start gap-3">
                    <CheckCircle2 className="text-blue-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-900">Radar de Oportunidades</h4>
                      <p className="text-sm text-blue-800">
                        Sua solicitaÃ§Ã£o serÃ¡ enviada para atÃ© 5 fornecedores verificados da sua regiÃ£o, economizando seu tempo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="text-gray-500 font-bold hover:text-gray-900 px-4 py-2 transition-colors"
                  >
                    Voltar
                  </button>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl px-8 py-3 flex items-center gap-2 transition-colors shadow-lg shadow-green-200"
                  >
                    Enviar SolicitaÃ§Ã£o <CheckCircle2 size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
