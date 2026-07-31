import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MetricsEngine {
  
  /**
   * Extrai um resumo rápido da plataforma.
   * Usado para alimentar o Dashboard e enviar para a IA.
   */
  static async getPlatformSummary() {
    const totalCompanies = await prisma.company.count();
    const totalLeads = await prisma.lead.count();
    
    // Simula contagem de eventos de ontem vs hoje para crescimento (MVP)
    const recentEvents = await prisma.platformEvent.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
      }
    });

    return {
      companies: totalCompanies,
      leads: totalLeads,
      activityScore: recentEvents,
      mrr: totalCompanies * 149 // Mock simples de Receita Recorrente
    };
  }
}
