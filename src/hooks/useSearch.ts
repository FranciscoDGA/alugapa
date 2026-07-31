"use client";

import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/app/actions/search";

export function useSearch(query: string, location?: string, categoryId?: string) {
  return useQuery({
    queryKey: ["search", query, location, categoryId],
    queryFn: async () => {
      const { data, error } = await getListings({ query, location, categoryId });
      if (error) throw new Error(error);
      return data || [];
    },
  });
}
