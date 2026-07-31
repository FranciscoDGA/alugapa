import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AiCopilotEngine {
  /**
   * Coleta métricas gerais do sistema para municiar a IA com contexto.
   */
  static async collectSystemContext() {
    try {
      const totalCompanies = await prisma.company.count();
      const totalLeads = await prisma.lead.count();
      const totalListings = await prisma.listing.count();
      
      return {
        companies: totalCompanies,
        leads: totalLeads,
        listings: totalListings,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("[AiCopilot] Falha ao coletar contexto:", error);
      return null;
    }
  }

  /**
   * Executa a Geração de Insights do "Executive Copilot"
   * (Simulado no MVP. Em produção chamaria a API da OpenAI).
   */
  static async generateDailyExecutiveSummary() {
    const context = await this.collectSystemContext();

    // Simulação do retorno da LLM baseado nos dados agregados
    let summaryText = `Bom dia, Administrador. Nas últimas 24 horas, o sistema se comportou dentro da normalidade. `;
    
    if (context) {
      summaryText += `Atualmente temos ${context.companies} empresas ativas e ${context.listings} anúncios no ar, gerando um histórico de ${context.leads} oportunidades comerciais (Leads). `;
    }

    summaryText += `Recomendo verificar as configurações de SEO nas categorias principais para acelerar o crescimento orgânico.`;

    // Grava um Mock de Insight no Banco
    try {
      await prisma.aiInsight.create({
        data: {
          category: 'BUSINESS',
          title: 'Oportunidade de Otimização (SEO)',
          description: summaryText,
          suggestedAction: 'Revisar Meta Tags da categoria "Tratores"',
          confidence: 0.92,
          status: 'PENDING'
        }
      });
    } catch (e) {
      // Falha ao gravar insight
    }

    return summaryText;
  }
}
