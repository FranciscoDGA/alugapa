"use client";

import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      // In a real app this would hit a /api/auth/me or a server action
      return null;
    }
  });
}
