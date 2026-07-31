import { AiGateway } from '@/lib/ai/gateway';

export interface SearchIntent {
  equipment: string | null;
  service: string | null;
  city: string | null;
  state: string | null;
  urgency: 'BAIXA' | 'NORMAL' | 'ALTA' | 'CRITICA';
  rawQuery: string;
}

export class IntentGraphEngine {
  
  /**
   * Converte uma pesquisa em linguagem natural ("Preciso cavar uma vala urgente")
   * num objeto de intenção fortemente tipado.
   */
  static async extractIntent(query: string): Promise<SearchIntent> {
    const prompt = `Analise a seguinte busca de um cliente: "${query}".
Extraia em formato JSON as chaves: "equipment" (ex: Retroescavadeira, Gerador), "service" (ex: Terraplanagem, Topografia), "city", "state", e "urgency" (BAIXA, NORMAL, ALTA, CRITICA).
Lembre-se, se o usuário descrever uma dor ("cavar vala"), traduza para o equipamento mais lógico ("Retroescavadeira").`;

    // Chamada à IA
    const response = await AiGateway.call({
      prompt,
      system: 'Você é um Analista de Intenção Semântica para um marketplace B2B de máquinas pesadas.',
      module: 'INTENT_GRAPH'
    });

    try {
      // Tenta parsear o JSON retornado pela IA. No MVP fazemos fallback manual se falhar.
      const rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(rawText);
      return {
        equipment: parsed.equipment || null,
        service: parsed.service || null,
        city: parsed.city || null,
        state: parsed.state || null,
        urgency: parsed.urgency || 'NORMAL',
        rawQuery: query
      };
    } catch (e) {
      // Fallback em caso de erro da IA (Timeout ou JSON inválido)
      console.warn('[IntentGraph] Falha ao extrair intenção, caindo para busca textual pura.');
      return {
        equipment: query,
        service: null,
        city: null,
        state: null,
        urgency: 'NORMAL',
        rawQuery: query
      };
    }
  }
}
