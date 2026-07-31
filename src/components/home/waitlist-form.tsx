"use client";

import { useState } from "react";
import { useSubmitLead } from "@/hooks/useLeads";
import { Loader2, CheckCircle2 } from "lucide-react";

export function WaitlistForm() {
  const [tab, setTab] = useState<"alugar" | "possuo">("alugar");
  const { mutateAsync: submitLead, isPending } = useSubmitLead();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    state: "",
    role: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const fullMessage = `Acesso Antecipado (${tab === "alugar" ? "Quero alugar" : "Tenho equipamentos"})\nProfissão/Cargo: ${formData.role}\nEmpresa: ${formData.companyName}\nEstado: ${formData.state}\n\n${formData.message}`;

      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage,
        channel: "ACESSO_ANTECIPADO"
      });
      
      setSuccess(true);
      setFormData({ name: "", companyName: "", email: "", phone: "", state: "", role: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao enviar.");
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center animate-fade-in-up border border-gray-100">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Você está na lista!</h3>
        <p className="text-slate-500">
          Entraremos em contato em breve pelo e-mail ou WhatsApp informado. Fique de olho.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-8 text-blue-600 font-semibold hover:underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative z-10">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setTab("alugar")}
          className={`flex-1 py-4 px-4 text-sm font-bold transition-colors ${
            tab === "alugar" 
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30" 
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Quero alugar equipamentos
        </button>
        <button
          onClick={() => setTab("possuo")}
          className={`flex-1 py-4 px-4 text-sm font-bold transition-colors ${
            tab === "possuo" 
              ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30" 
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Tenho equipamentos
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nome Completo</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="João da Silva"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nome da Empresa</label>
            <input 
              required
              type="text" 
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="Construtora XYZ"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">E-mail Corporativo</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="joao@construtoraxyz.com.br"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">WhatsApp</label>
            <input 
              required
              type="tel" 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estado</label>
            <select
              required
              value={formData.state}
              onChange={e => setFormData({...formData, state: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
            >
              <option value="" disabled>Selecione um Estado</option>
              <option value="SP">São Paulo</option>
              <option value="MG">Minas Gerais</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="PR">Paraná</option>
              <option value="SC">Santa Catarina</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="BA">Bahia</option>
              <option value="OUTRO">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Qual sua Profissão?</label>
            <select
              required
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
            >
              <option value="" disabled>Selecione...</option>
              <option value="Engenheiro">Engenheiro(a)</option>
              <option value="Comprador">Comprador(a)</option>
              <option value="Dono">Dono(a) / Sócio(a)</option>
              <option value="Gestor_Frota">Gestor(a) de Frota</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Como podemos te ajudar hoje?</label>
          <textarea 
            required
            rows={3}
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
            placeholder={tab === "alugar" ? "Preciso de uma retroescavadeira para o mês que vem..." : "Tenho 5 retroescavadeiras paradas e quero anunciar..."}
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className={`w-full flex items-center justify-center text-white py-4 px-6 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg ${
            tab === "alugar" ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25" : "bg-orange-600 hover:bg-orange-700 shadow-orange-500/25"
          }`}
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : null}
          Garantir Acesso Antecipado
        </button>
      </form>
    </div>
  );
}
