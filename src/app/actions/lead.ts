"use server";

import { LeadService } from "@/services/LeadService";

export async function createLead(data: any) {
  try {
    return LeadService.requestQuote(data);
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return { success: false, error: "Failed to submit lead" };
  }
}

export async function getCompanyLeads(companyId: string) {
  try {
    const leads = await LeadService.getCompanyLeads(companyId);
    return { data: leads, error: null };
  } catch (error) {
    return { data: null, error: "Failed to load leads" };
  }
}

export async function getLeadDetails(id: string) {
  try {
    const lead = await LeadService.getLeadDetails(id);
    return { data: lead, error: null };
  } catch (error) {
    return { data: null, error: "Failed to load lead details" };
  }
}

export async function replyToLead(leadId: string, companyId: string, message: string) {
  try {
    const result = await LeadService.replyToLead(leadId, companyId, message);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: "Failed to reply to lead" };
  }
}
