import { IntentGraphEngine } from './intent-graph';
import { RankingEngine } from './ranking-engine';
import { searchListings } from '@/app/actions/listings';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DiscoveryEngine {
  
  /**
   * Orquestra todo o fluxo de uma Busca Avançada
   */
  static async executeSearch(rawQuery: string) {
    console.log(`[DiscoveryOS] Nova busca recebida: "${rawQuery}"`);

    // 1. Extração de Intenção (Semantic Graph)
    let intent = null;
    if (rawQuery.length > 3) {
      intent = await IntentGraphEngine.extractIntent(rawQuery);
      console.log(`[DiscoveryOS] Intenção extraída:`, intent);
    }

    // 2. Busca no Banco de Dados (Textual/Relacional)
    // Se a IA achar que é um Gerador, buscamos Gerador. Senão, buscamos a rawQuery.
    const searchTerm = intent?.equipment || rawQuery;
    const searchCity = intent?.city || "";
    
    const rawResults = await searchListings(searchTerm, searchCity);

    // 3. Aplicação do Ranking (Boost Comercial)
    const rankedResults = await RankingEngine.applyRankingWeights(rawResults);

    // 4. Salvar Log no Analytics em Background (Não usar await para não travar resposta)
    Promise.resolve(
      prisma.searchQueryLog.create({
        data: {
          rawQuery,
          intentCategory: intent?.equipment || null,
          intentCity: intent?.city || null,
          resultsCount: rankedResults.length
        }
      })
    ).catch(e => console.error("Erro ao salvar log de busca", e));

    return {
      results: rankedResults,
      intentUsed: intent,
      suggestions: rankedResults.length === 0 ? await this.getSuggestions() : []
    };
  }

  static async getSuggestions() {
    // Retorna fallback inteligente se a busca for vazia.
    return [
      { type: 'CATEGORY', name: 'Geradores', link: '/categorias/energia' },
      { type: 'CATEGORY', name: 'Retroescavadeiras', link: '/categorias/construcao' }
    ];
  }
}
