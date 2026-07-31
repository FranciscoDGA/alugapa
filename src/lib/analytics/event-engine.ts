import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EventEngine {
  
  /**
   * Registra um evento estratégico no Banco de Dados (Data Lake).
   * Deve ser usado apenas para eventos CORE (Leads, Pagamentos, Falhas) no MVP.
   */
  static async log(type: string, metadata: any = {}, userId?: string, companyId?: string) {
    try {
      await prisma.platformEvent.create({
        data: {
          type,
          userId,
          companyId,
          metadata: JSON.stringify(metadata)
        }
      });
      console.log(`[EventEngine] Logado: ${type}`);
    } catch (e) {
      console.error('[EventEngine] Falha ao logar evento', e);
    }
  }
}
