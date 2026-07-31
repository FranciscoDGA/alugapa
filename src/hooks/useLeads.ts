"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLead, getCompanyLeads, getLeadDetails, replyToLead } from "@/app/actions/lead";

export function useSubmitLead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (leadData: any) => {
      const result = await createLead(leadData);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-leads"] });
    }
  });
}

export function useCompanyLeads(companyId: string) {
  return useQuery({
    queryKey: ["company-leads", companyId],
    queryFn: async () => {
      const { data, error } = await getCompanyLeads(companyId);
      if (error) throw new Error(error);
      return data || [];
    },
    enabled: !!companyId,
  });
}

export function useLeadDetails(leadId: string) {
  return useQuery({
    queryKey: ["lead-details", leadId],
    queryFn: async () => {
      const { data, error } = await getLeadDetails(leadId);
      if (error) throw new Error(error);
      return data;
    },
    enabled: !!leadId,
    refetchInterval: 10000, // polling para mensagens novas
  });
}

export function useReplyToLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ leadId, companyId, message }: { leadId: string, companyId: string, message: string }) => {
      const { data, error } = await replyToLead(leadId, companyId, message);
      if (error) throw new Error(error);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lead-details", variables.leadId] });
      queryClient.invalidateQueries({ queryKey: ["company-leads", variables.companyId] });
    }
  });
}
