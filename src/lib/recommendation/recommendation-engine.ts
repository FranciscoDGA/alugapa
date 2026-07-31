import { OpportunityGraphEngine } from './opportunity-graph';

export class RecommendationEngine {
  
  /**
   * Gera o feed inicial personalizado para o usuário.
   */
  static async getPersonalizedFeed(userId: string) {
    console.log(`[RecommendationEngine] Gerando Feed para usuário: ${userId}`);
    
    // Num cenário real, buscaríamos no UserBehaviorLog as últimas categorias vistas
    // const history = await prisma.userBehaviorLog.findMany(...)
    
    // Para o MVP (Cold Start)
    return {
      trending: [
        { id: '1', title: 'Gerador 50kVA Cummins', company: 'Volt Energia', img: '/placeholder.jpg' },
        { id: '2', title: 'Retroescavadeira Case 580N', company: 'LocaTudo', img: '/placeholder.jpg' }
      ],
      suggestedCategories: ['Transporte Pesado', 'Topografia'],
      personalizedMessage: "Identificamos obras na sua região. Veja estes equipamentos."
    };
  }

  /**
   * Cross Selling para a página de detalhes do anúncio
   */
  static getCrossSellSuggestions(categoryName: string) {
    const related = OpportunityGraphEngine.getMockRelated(categoryName);
    return related;
  }
}
