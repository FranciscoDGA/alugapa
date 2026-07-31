import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OpportunityGraphEngine {
  
  /**
   * Encontra categorias relacionadas usando o peso das arestas (Edges).
   * Útil para o Cross-Sell. (Ex: Sugerir "Frete" para quem alugou "Gerador")
   */
  static async getRelatedCategories(sourceCategoryId: string, limit = 3) {
    try {
      // Busca conexões onde a categoria alvo tenha um peso forte (> 0.5)
      const edges = await prisma.opportunityEdge.findMany({
        where: {
          sourceCategoryId,
          weight: { gte: 0.5 }
        },
        orderBy: {
          weight: 'desc'
        },
        take: limit
      });

      return edges;
    } catch (e) {
      console.warn('[OpportunityGraph] Erro ao buscar arestas. Retornando vazio.', e);
      return [];
    }
  }

  /**
   * Mock para o MVP: Retorna relacionamentos fixos sem bater no banco
   */
  static getMockRelated(categoryName: string) {
    const graph: Record<string, string[]> = {
      'Geradores': ['Transporte Pesado', 'Tendas', 'Iluminação'],
      'Retroescavadeiras': ['Topografia', 'Caminhão Caçamba', 'Compactadores'],
      'Drones': ['Topografia', 'Engenharia Civil']
    };

    return graph[categoryName] || [];
  }
}
