"use client";

import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query && !location) return;
    
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("l", location);
    
    router.push(`/busca?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="flex-1 flex items-center w-full px-4 py-3 sm:py-4">
        <Search className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
        <input 
          type="text" 
          placeholder="O que você precisa alugar?"
          className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <div className="flex-1 flex items-center w-full px-4 py-3 sm:py-4">
        <MapPin className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
        <input 
          type="text" 
          placeholder="Onde? (Ex: Belém, PA)"
          className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="w-full sm:w-auto p-2">
        <button 
          type="submit"
          className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-md shadow-primary/20"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
