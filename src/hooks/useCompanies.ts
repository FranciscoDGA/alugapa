"use client";

import { useQuery } from "@tanstack/react-query";

export function useCompanyStats() {
  return useQuery({
    queryKey: ["company", "stats"],
    queryFn: async () => {
      // Por enquanto as actions do Next.js ainda operam a ponte. 
      // Em uma SPA pura faríamos fetch('/api/...').
      return null;
    }
  });
}
