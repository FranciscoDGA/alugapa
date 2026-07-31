"use client";

import { useMutation } from "@tanstack/react-query";

export function useFavorites() {
  return useMutation({
    mutationFn: async (targetId: string) => {
      return { favorited: true };
    }
  });
}
