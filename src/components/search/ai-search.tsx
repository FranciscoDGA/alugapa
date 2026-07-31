"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { discoverEquipment } from "@/app/actions/ai";
import { useRouter } from "next/navigation";

export function AiSearchBar() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    const result = await discoverEquipment(prompt);
    
    if (result.success && result.categoryIds && result.categoryIds.length > 0) {
      // Build search URL with AI suggestions
      const params = new URLSearchParams();
      params.set("q", result.searchQuery || "");
      params.set("categoryId", result.categoryIds[0]); // Pega a primeira recomendada para o filtro
      params.set("ai_msg", result.message || ""); // Mostra a mensagem da IA na página de busca
      
      router.push(`/busca?${params.toString()}`);
    } else {
      // Fallback para busca normal
      router.push(`/busca?q=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <div className="w-full relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-soft"></div>
      
      <form 
        onSubmit={handleSearch}
        className="relative flex items-center bg-white rounded-xl shadow-2xl p-2 sm:p-3"
      >
        <div className="flex items-center justify-center bg-indigo-50 w-10 h-10 rounded-lg shrink-0 ml-1">
          <Sparkles className="h-5 w-5 text-indigo-600" />
        </div>
        
        <input 
          type="text" 
          placeholder="O que você vai construir hoje? (Ex: 'Preciso nivelar um terreno')"
          className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base sm:text-lg px-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        
        <button 
          type="submit"
          disabled={loading || !prompt.trim()}
          className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white p-3 sm:px-6 sm:py-3 rounded-lg font-bold transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline mr-2">Descobrir</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
