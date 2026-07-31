"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/actions/search";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await getCategories();
      if (error) throw new Error(error);
      return data || [];
    }
  });
}
