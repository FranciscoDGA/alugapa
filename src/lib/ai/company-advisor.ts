import { AiGateway } from './gateway';

export class AiCompanyAdvisor {
  /**
   * Analisa a performance da empresa e sugere melhorias
   */
  static async generateInsights(companyId: string, companyContext: any) {
    const prompt = `Analise os dados da empresa ${companyId}: ${JSON.stringify(companyContext)}. Sugira 2 melhorias urgentes para ela aumentar a conversão.`;

    const response = await AiGateway.call({
      prompt,
      system: 'Você é um consultor comercial focado em crescimento de parceiros no AlugaPA.',
      module: 'COMPANY_ADVISOR',
      provider: 'openai'
    });

    return {
      insights: [
        { type: 'WARNING', message: 'Seu tempo médio de resposta caiu. Responda orçamentos em até 2 horas para não perder negócios.' },
        { type: 'OPPORTUNITY', message: 'Você tem geradores parados. Ofereça um desconto sazonal nesta semana!' }
      ],
      aiDetails: response.text
    };
  }
}
