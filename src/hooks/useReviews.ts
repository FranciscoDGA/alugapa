"use client";

import { useQuery } from "@tanstack/react-query";

export function useReviews(companyId: string) {
  return useQuery({
    queryKey: ["reviews", companyId],
    queryFn: async () => {
      return [];
    },
    enabled: !!companyId
  });
}
