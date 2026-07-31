import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TrustScoreEngine {
  
  /**
   * Recalcula o Trust Score de uma empresa baseando-se em suas métricas.
   * Chamado em cron jobs ou após ações sensíveis.
   */
  static async recalculateScore(companyId: string) {
    // Busca os dados da empresa e seu registro de trust
    let trustRecord = await prisma.companyTrustScore.findUnique({
      where: { companyId }
    });

    if (!trustRecord) {
      trustRecord = await prisma.companyTrustScore.create({
        data: { companyId, score: 50.0 }
      });
    }

    let newScore = 50.0; // Base inicial

    // Bônus
    if (trustRecord.documentsVerified) newScore += 20;
    if (trustRecord.responseRate > 0.8) newScore += 15; // +80% de taxa de resposta
    
    // Punições
    newScore -= (trustRecord.strikes * 10);

    // Limites
    newScore = Math.max(0, Math.min(newScore, 100));

    await prisma.companyTrustScore.update({
      where: { companyId },
      data: { score: newScore }
    });

    return newScore;
  }

  /**
   * Obtém o score de confiança para uso imediato (ex: Ranking de Busca)
   */
  static async getScore(companyId: string) {
    const record = await prisma.companyTrustScore.findUnique({
      where: { companyId }
    });
    return record?.score || 50.0; // Padrão Neutro
  }
}
