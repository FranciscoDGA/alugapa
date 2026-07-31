import { LeadRepository } from "@/repositories/LeadRepository";
import { NotificationRepository } from "@/repositories/NotificationRepository";
import { MessageRepository } from "@/repositories/MessageRepository";
import { z } from "zod";

const createLeadSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().min(10, "Telefone inválido"),
  city: z.string().optional(),
  message: z.string().min(5, "Mensagem muito curta"),
  companyId: z.string().uuid("ID de empresa inválido").optional(),
  listingId: z.string().uuid("ID de listing inválido").optional(),
  urgency: z.string().optional(),
  rentalStartDate: z.string().optional(),
  rentalEndDate: z.string().optional(),
  quantity: z.number().optional().default(1),
  channel: z.string().optional().default("SITE"),
});

export class LeadService {
  static async requestQuote(data: any) {
    try {
      const validatedData = createLeadSchema.parse(data);

      const lead = await LeadRepository.create({
        name: validatedData.name,
        email: validatedData.email || null,
        phone: validatedData.phone,
        city: validatedData.city || null,
        message: validatedData.message,
        companyId: validatedData.companyId,
        listingId: validatedData.listingId || null,
        urgency: validatedData.urgency || "MÉDIA",
        rentalStartDate: validatedData.rentalStartDate ? new Date(validatedData.rentalStartDate) : null,
        rentalEndDate: validatedData.rentalEndDate ? new Date(validatedData.rentalEndDate) : null,
        quantity: validatedData.quantity,
        channel: validatedData.channel,
        status: "NOVO",
        pipelineStage: "NOVO",
        events: {
          create: [{
            type: "criado",
            title: "Lead Criado",
            details: "Lead gerado através do formulário do site."
          }]
        }
      });

      // Create Notification for the Company if companyId exists
      if (validatedData.companyId) {
        await NotificationRepository.create({
          companyId: validatedData.companyId,
          type: "LEAD",
          title: "Novo Lead Recebido",
          content: `Você recebeu um novo lead de ${validatedData.name}`,
          link: `/dashboard/leads/${lead.id}`,
        });
      }

      return { success: true, lead };
    } catch (error: any) {
      console.error("Lead creation failed", error);
      return { success: false, error: error.message || "Failed to create lead" };
    }
  }

  static async getCompanyLeads(companyId: string) {
    return LeadRepository.findByCompanyId(companyId);
  }

  static async getLeadDetails(id: string) {
    return LeadRepository.findById(id);
  }

  static async replyToLead(leadId: string, companyId: string, message: string) {
    const msg = await MessageRepository.create({
      leadId,
      senderType: "COMPANY",
      senderId: companyId,
      message,
    });

    await LeadRepository.updateStatus(leadId, "EM ATENDIMENTO", "CONTATO");
    
    return { success: true, message: msg };
  }

  static async getTotalLeads() {
    return LeadRepository.count();
  }
}
