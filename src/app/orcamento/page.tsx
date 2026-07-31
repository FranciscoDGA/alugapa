"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Package, MapPin, Calendar, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubmitLead } from "@/hooks/useLeads";

export default function OrcamentoPage() {
  const [step, setStep] = useState(1);
  const { mutateAsync: submitLead, isPending: loading } = useSubmitLead();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
    urgency: "MÉDIA",
    rentalStartDate: "",
    rentalEndDate: "",
    category: "",
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (formData.name.length < 2) return setErrors({ name: "Nome muito curto" });
    if (formData.phone.length < 10) return setErrors({ phone: "Telefone inválido" });
    
    // Concatena a categoria na mensagem se selecionada
    const finalMessage = formData.category 
      ? `Categoria: ${formData.category}\n\n${formData.message}`
      : formData.message;

    if (finalMessage.length < 5) return setErrors({ message: "Mensagem muito curta" });

    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        message: finalMessage,
        urgency: formData.urgency,
        rentalStartDate: formData.rentalStartDate,
        rentalEndDate: formData.rentalEndDate,
        channel: "SITE"
      });
      
      setSuccess(true);
    } catch (error: any) {
      setErrors({ root: error.message || "Erro ao enviar solicitação." });
    }
  };

  if (success) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg mx-4">
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Solicitação Recebida!</h2>
          <p className="text-gray-600 mb-8">
            Nossos parceiros entrarão em contato em breve com as melhores cotações para sua necessidade.
          </p>
          <button 
            onClick={() => {
              setSuccess(false);
              setStep(1);
              setFormData({name: "", phone: "", email: "", city: "", message: "", urgency: "MÉDIA", rentalStartDate: "", rentalEndDate: "", category: ""});
            }}
            className="text-blue-600 font-bold hover:text-blue-700"
          >
            Fazer nova solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Solicitar Orçamento</h1>
          <p className="text-lg text-gray-600">
            Conectamos sua necessidade aos melhores fornecedores do Brasil. Receba cotações em minutos.
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
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 overflow-hidden relative">
          {errors.root && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium">
              {errors.root}
            </div>
          )}

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
                  <Package className="text-blue-600" /> O que você precisa?
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Geradores de Energia">Geradores de Energia</option>
                      <option value="Máquinas Pesadas">Máquinas Pesadas</option>
                      <option value="Plataformas Elevatórias">Plataformas Elevatórias</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descreva sua necessidade *</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none`}
                      placeholder="Ex: Preciso de um gerador 50kVA silenciado para um evento de 3 dias..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => {
                      if (formData.message.length < 5) {
                        setErrors({message: "Descreva sua necessidade com mais detalhes."});
                        return;
                      }
                      setErrors({});
                      handleNext();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3 flex items-center gap-2 transition-colors"
                  >
                    Próximo Passo <ChevronRight size={20} />
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade da Locação</label>
                    <input 
                      type="text" 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="Ex: São Paulo, SP" 
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Período de Locação</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all overflow-hidden">
                        <Calendar size={18} className="text-gray-400 mr-2 shrink-0" />
                        <input 
                          type="date" 
                          value={formData.rentalStartDate}
                          onChange={(e) => setFormData({...formData, rentalStartDate: e.target.value})}
                          className="w-full bg-transparent outline-none text-gray-900 text-sm" 
                        />
                      </div>
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all overflow-hidden">
                        <Calendar size={18} className="text-gray-400 mr-2 shrink-0" />
                        <input 
                          type="date" 
                          value={formData.rentalEndDate}
                          onChange={(e) => setFormData({...formData, rentalEndDate: e.target.value})}
                          className="w-full bg-transparent outline-none text-gray-900 text-sm" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={handleBack}
                    className="text-gray-500 font-bold hover:text-gray-900 px-4 py-2 transition-colors"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3 flex items-center gap-2 transition-colors"
                  >
                    Último Passo <ChevronRight size={20} />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo / Empresa *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Seu nome" 
                      className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp *</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(11) 90000-0000" 
                        className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail (opcional)</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                        Sua solicitação será enviada para os melhores fornecedores da sua região.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={handleBack}
                    className="text-gray-500 font-bold hover:text-gray-900 px-4 py-2 transition-colors"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl px-8 py-3 flex items-center gap-2 transition-colors shadow-lg shadow-green-200 disabled:opacity-70"
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Enviando...</>
                    ) : (
                      <>Enviar Solicitação <CheckCircle2 size={20} /></>
                    )}
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
