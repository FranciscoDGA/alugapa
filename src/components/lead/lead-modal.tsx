"use client";

import { useState, useEffect } from "react";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useSubmitLead } from "@/hooks/useLeads";
import { z } from "zod";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingName?: string;
  companyName?: string;
  listingId?: string;
  companyId?: string;
}

export function LeadModal({ isOpen, onClose, listingName, companyName, listingId, companyId }: LeadModalProps) {
  const { mutateAsync: submitLead, isPending: loading } = useSubmitLead();
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
    urgency: "MÉDIA",
    rentalStartDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Pre-fill message
      if (listingName) {
        setFormData(prev => ({...prev, message: `Olá! Gostaria de um orçamento para o equipamento ${listingName}.`}));
      }
    } else {
      document.body.style.overflow = "unset";
      setSuccess(false);
      setFormData({ name: "", phone: "", email: "", city: "", message: "", urgency: "MÉDIA", rentalStartDate: "" });
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, listingName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Zod validation on client
    if (formData.name.length < 2) return setErrors({ name: "Nome muito curto" });
    if (formData.phone.length < 10) return setErrors({ phone: "Telefone inválido" });
    if (formData.message.length < 5) return setErrors({ message: "Mensagem muito curta" });

    try {
      await submitLead({
        ...formData,
        companyId,
        listingId,
        channel: "SITE"
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (error: any) {
      setErrors({ root: error.message || "Erro ao enviar solicitação." });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Solicitar Orçamento</h2>
            {listingName && (
              <p className="text-sm text-gray-500 mt-1">Para: {listingName}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in-up">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Solicitação Enviada!</h3>
              <p className="text-gray-600">
                A empresa {companyName || 'fornecedora'} entrará em contato com você em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {errors.root && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {errors.root}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                  placeholder="Seu nome"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp *</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail (opcional)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade da Locação</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Sua cidade"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Estimada</label>
                  <input 
                    type="date" 
                    value={formData.rentalStartDate}
                    onChange={(e) => setFormData({...formData, rentalStartDate: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} rounded-lg focus:outline-none focus:ring-2 transition-all resize-none`}
                  placeholder={`Olá! Gostaria de um orçamento para o equipamento ${listingName || ''}...`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover text-white py-3.5 px-6 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Solicitação
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Ao enviar, você concorda com nossos Termos de Uso e Política de Privacidade.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
