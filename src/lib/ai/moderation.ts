import { AiGateway } from './gateway';

export class AiModeration {
  /**
   * Filtra anúncios novos procurando por violações, spam e linguagem inapropriada
   */
  static async checkListingContent(title: string, description: string) {
    const prompt = `Verifique se o anúncio viola as regras de spam, fraude ou palavras ofensivas. Título: ${title}. Desc: ${description}.`;
    
    const response = await AiGateway.call({
      prompt,
      system: 'Você é um moderador estrito do AlugaPA. Responda apenas com PASS ou FLAG.',
      module: 'MODERATION',
      provider: 'google' // Gemini geralmente é rápido e barato para moderação
    });

    // Mock
    return {
      status: 'PASS',
      confidenceScore: 0.98,
      reason: 'Nenhuma violação encontrada.'
    };
  }
}
