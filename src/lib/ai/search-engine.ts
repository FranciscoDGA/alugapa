import { AiGateway } from './gateway';

export class AiSearchEngine {
  /**
   * Transforma linguagem natural em filtros estruturados de busca
   */
  static async parseSearchIntent(query: string) {
    const prompt = `Extraia a intenção da seguinte busca: "${query}". Retorne um JSON com a "categoria" primária, "acao" (alugar, comprar), e "contexto".`;
    
    const response = await AiGateway.call({
      prompt,
      system: 'Você é um assistente de busca do AlugaPA, um marketplace de locação de máquinas pesadas.',
      module: 'SEARCH',
      provider: 'openai'
    });

    // Mocked parse
    return {
      rawInput: query,
      parsedIntent: {
        category: "caminhao_prancha", // inferido de "levar um trator"
        action: "rent",
        related: ["guincho_pesado"]
      },
      aiResponse: response.text
    };
  }
}
