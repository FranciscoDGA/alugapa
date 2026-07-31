"use client";

import { useQuery } from "@tanstack/react-query";

export function useEquipment() {
  return useQuery({
    queryKey: ["equipment"],
    queryFn: async () => {
      return [];
    }
  });
}
