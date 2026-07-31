import { AiGateway } from '@/lib/ai/gateway';
import { MetricsEngine } from './metrics-engine';

export class DecisionIntelligenceEngine {
  
  /**
   * Pega as métricas frias e transforma em conselhos estratégicos pro CEO.
   */
  static async generateExecutiveInsights() {
    const metrics = await MetricsEngine.getPlatformSummary();
    
    const prompt = `Atuamos como um Marketplace B2B de Máquinas. 
Aqui estão nossos números atuais: ${JSON.stringify(metrics)}.
Com base nisso, me dê 3 conselhos diretos (Decision Intelligence) sobre o que devemos fazer hoje. Foque em crescimento e retenção. Responda em markdown curto.`;

    try {
      const response = await AiGateway.call({
        prompt,
        system: 'Você é um Analista de BI e Conselheiro de Diretoria executiva.',
        module: 'DECISION_INTELLIGENCE'
      });
      return response.text;
    } catch (e) {
      return "Não foi possível gerar insights no momento.";
    }
  }
}
