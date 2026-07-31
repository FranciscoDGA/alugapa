"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStates, fetchCitiesByState } from "@/app/actions/location";

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const { data, error } = await fetchStates();
      if (error) throw new Error(error);
      return data || [];
    }
  });
}

export function useCities(stateId?: string) {
  return useQuery({
    queryKey: ["cities", stateId],
    queryFn: async () => {
      if (!stateId) return [];
      const { data, error } = await fetchCitiesByState(stateId);
      if (error) throw new Error(error);
      return data || [];
    },
    enabled: !!stateId
  });
}
