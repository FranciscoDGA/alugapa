import { AiGateway } from '@/lib/ai/gateway';
// import prisma from '@/lib/prisma';

export class AiSalesCopilot {
  
  /**
   * Avalia a "temperatura" inicial do lead baseando-se na urgência da mensagem
   */
  static async calculateInitialLeadScore(message: string): Promise<{ score: number, temperature: string }> {
    // Para MVP rápido: checa palavras chave simples. Depois usaria IA pesada.
    const urgentKeywords = ['hoje', 'urgente', 'amanhã', 'parado', 'emergência', 'imediato'];
    const msgLower = message.toLowerCase();
    
    let score = 10; 
    let temperature = 'FRIO';

    if (urgentKeywords.some(kw => msgLower.includes(kw))) {
      score += 50;
      temperature = 'QUENTE';
    }

    if (msgLower.length > 50) {
      score += 20; // Cliente se deu o trabalho de detalhar
    }

    if (score > 60) temperature = 'MUITO_QUENTE';
    else if (score > 30) temperature = 'MORNO';

    return { score, temperature };
  }

  /**
   * Gera um insight executivo pro vendedor antes dele ligar para o cliente.
   */
  static async generateLeadInsights(leadData: any) {
    const prompt = `Gere 3 dicas de abordagem comercial para este lead: ${JSON.stringify(leadData)}`;
    
    const response = await AiGateway.call({
      prompt,
      system: 'Você é um Sales Copilot focado em conversão B2B no AlugaPA.',
      module: 'SALES_COPILOT'
    });

    return {
      tips: [
        "O cliente enfatizou urgência. Não mande e-mail, ligue imediatamente.",
        "Ele procura retroescavadeira, sugira também um operador treinado (cross-sell).",
        "A obra é em Marabá; destaque a frota disponível mais próxima."
      ],
      aiRaw: response.text
    };
  }

  /**
   * Rascunha uma proposta baseada na conversa (Timeline)
   */
  static async draftProposal(leadTimelineContext: any) {
    // Integraria com o Gateway para gerar um template de e-mail comercial.
    return `Olá [Cliente],\n\nConforme conversamos...`;
  }
}
