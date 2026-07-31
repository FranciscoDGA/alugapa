import { EmailAdapter, WhatsAppAdapter, PushAdapter } from './adapters';
// import prisma from '@/lib/prisma';

export class AiCommunicationHub {
  private static emailAdapter = new EmailAdapter();
  private static whatsappAdapter = new WhatsAppAdapter();

  /**
   * Decide inteligentemente qual o canal de comunicação usar.
   */
  static async routeMessage(companyId: string, event: string, payload: any) {
    console.log(`[AiHub] Analisando melhor rota para empresa ${companyId}...`);
    
    // 1. Checa preferências (Prisma)
    // const prefs = await prisma.companyPreference.findUnique({ where: { companyId }});
    const prefs = { whatsappOptIn: true, emailOptIn: true }; // Mock
    
    // Lógica da IA Mock: Se for urgência do Lead, manda no WhatsApp direto.
    const isUrgent = event === 'LEAD_CREATED' && payload.temperature === 'QUENTE';

    if (isUrgent && prefs.whatsappOptIn) {
      console.log(`[AiHub] Decisão IA: Enviar via WHATSAPP (Urgência Crítica)`);
      await this.whatsappAdapter.send({
        to: '+5511999999999',
        body: `🔥 Novo Lead Quente!\n${payload.message}\nAcesse o app para responder.`
      });
      // Salvaria no MessageLog...
    } else if (prefs.emailOptIn) {
      console.log(`[AiHub] Decisão IA: Enviar via E-MAIL (Informativo padrão)`);
      await this.emailAdapter.send({
        to: 'contato@locadora.com',
        subject: 'Atualização do AlugaPA',
        body: 'Você tem novas notificações.'
      });
    }
  }
}
