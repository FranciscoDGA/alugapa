"use client";

import { useState } from "react";
import { Building2, Mail, MapPin, Phone, Globe, Image as ImageIcon } from "lucide-react";
import { updateCompanyProfile } from "@/app/actions/company";

export default function CompanyProfileForm({ company }: { company: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateCompanyProfile(formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Building2 className="text-blue-400" />
          Dados Principais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Razão Social / Nome Fantasia</label>
            <input 
              name="name" 
              defaultValue={company.name}
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Nome da sua locadora" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">CNPJ</label>
            <input 
              name="cnpj" 
              defaultValue={company.cnpj || ""}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="00.000.000/0000-00" 
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">Sobre a Empresa</label>
            <textarea 
              name="about" 
              defaultValue={company.about || ""}
              rows={4}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
              placeholder="Descreva a história e os diferenciais da sua empresa..." 
            />
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Mail className="text-blue-400" />
          Contato
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">E-mail Comercial</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input 
                name="email" 
                type="email"
                defaultValue={company.email || ""}
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                placeholder="contato@empresa.com" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input 
                name="whatsapp" 
                defaultValue={company.whatsapp || ""}
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" 
                placeholder="(00) 00000-0000" 
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">Website Oficial</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input 
                name="website" 
                type="url"
                defaultValue={company.website || ""}
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                placeholder="https://suaempresa.com.br" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <MapPin className="text-blue-400" />
          Localização Sede
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Cidade</label>
            <input 
              name="city" 
              defaultValue={company.city || ""}
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Sua cidade" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Estado</label>
            <input 
              name="state" 
              defaultValue={company.state || ""}
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Seu estado (Ex: SP)" 
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        {success && (
          <span className="text-green-400 font-medium">Perfil atualizado com sucesso!</span>
        )}
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}
