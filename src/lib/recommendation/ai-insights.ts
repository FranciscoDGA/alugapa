import { AiGateway } from '@/lib/ai/gateway';

export class AiInsightsEngine {
  
  /**
   * Traduz recomendações numéricas em textos humanos (Explainable AI).
   */
  static async generateInsightReason(userHistoryContext: string, suggestedItem: string) {
    const prompt = `O usuário tem o seguinte histórico: "${userHistoryContext}". 
Nós sugerimos a ele o item: "${suggestedItem}". 
Crie uma frase amigável, curta (1 linha) justificando por que escolhemos isso para ele.`;

    try {
      const response = await AiGateway.call({
        prompt,
        system: 'Você é um assistente de e-commerce que explica recomendações amigavelmente.',
        module: 'AI_INSIGHTS'
      });
      return response.text.replace(/"/g, '').trim();
    } catch (e) {
      return "Sugerido com base nas suas últimas pesquisas.";
    }
  }
}
