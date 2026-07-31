import { TrustScoreEngine } from '../security/trust-score-engine';

export class RankingEngine {
  
  /**
   * Reordena os resultados do banco de dados (Prisma) aplicando pesos de negócio e o Trust Score.
   */
  static async applyRankingWeights(results: any[]): Promise<any[]> {
    
    // Buscar Trust Score de todas as empresas listadas
    const companyIds = [...new Set(results.map(item => item.companyId).filter(id => id))];
    const trustScores: Record<string, number> = {};
    for (const id of companyIds) {
      if (id) trustScores[id as string] = await TrustScoreEngine.getScore(id as string);
    }

    const scoredResults = results.map(item => {
      let score = 0;
      
      // Peso: Verificação
      if (item.company?.verified) {
        score += 30;
      }

      // Peso: Capa bonita no anúncio
      if (item.coverUrl || item.company?.coverUrl) {
        score += 10;
      }

      // Peso: Boa reputação
      if (item.company?.rating && item.company.rating >= 4.5) {
        score += 20;
      }

      // Peso: Trust Score Engine (Multiplicador e Bônus Direto)
      if (item.companyId && trustScores[item.companyId]) {
        score += trustScores[item.companyId]; // Soma de 0 a 100 pontos diretos
      }

      // Anúncios recentes tem bônus leve
      const ageInDays = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 3600 * 24);
      if (ageInDays < 7) {
        score += 5;
      }

      return { ...item, _rankingScore: score };
    });

    // Ordena do maior Score para o menor
    return scoredResults.sort((a, b) => b._rankingScore - a._rankingScore);
  }
}
