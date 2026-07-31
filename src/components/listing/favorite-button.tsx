"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export function FavoriteButton({ targetId, type }: { targetId: string; type: string }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { mutate, isPending } = useFavorites();

  const toggleFavorite = () => {
    // Optimistic update
    setIsFavorited(!isFavorited);
    mutate(targetId, {
      onError: () => setIsFavorited(!isFavorited) // Rollback on error
    });
  };

  return (
    <button 
      onClick={toggleFavorite}
      disabled={isPending}
      className={`flex items-center text-sm font-medium transition-colors ${
        isFavorited ? "text-red-500" : "text-gray-600 hover:text-red-500"
      }`}
    >
      <Heart className={`h-4 w-4 mr-1.5 ${isFavorited ? "fill-red-500" : ""}`} /> 
      {isFavorited ? "Salvo" : "Salvar"}
    </button>
  );
}
