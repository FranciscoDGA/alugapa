import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  cnpj: z.string().optional(),
  about: z.string().optional(),
  cityId: z.string().uuid("ID de cidade inválido").optional(),
  stateId: z.string().uuid("ID de estado inválido").optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  whatsapp: z.string().min(10, "WhatsApp muito curto").optional(),
  email: z.string().email("E-mail inválido").optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  message: z.string().min(10, "Mensagem muito curta"),
  companyId: z.string().uuid("ID da empresa inválido"),
  listingId: z.string().uuid("ID do anúncio inválido").optional(),
});
