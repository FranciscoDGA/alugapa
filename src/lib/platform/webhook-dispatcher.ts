import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class WebhookDispatcher {
  
  /**
   * Procura assinantes do evento e dispara payloads HTTP em Background.
   */
  static async dispatch(eventType: string, payload: any) {
    try {
      // Idealmente, a busca deveria ser "LIKE %eventType%" no campo events (JSON no SQLite).
      // Mas pro MVP faremos um findMany bruto ou adaptado
      const endpoints = await prisma.webhookEndpoint.findMany({
        where: { isActive: true }
      });

      for (const endpoint of endpoints) {
        if (endpoint.events.includes(eventType)) {
          this.sendPayload(endpoint, eventType, payload);
        }
      }
    } catch (e) {
      console.error('[WebhookDispatcher] Falha ao processar.', e);
    }
  }

  private static async sendPayload(endpoint: any, eventType: string, payload: any) {
    const body = JSON.stringify({ event: eventType, data: payload });
    
    // Gerar HMAC SHA256 Signature (Segurança)
    const signature = crypto.createHmac('sha256', endpoint.secret).update(body).digest('hex');

    try {
      console.log(`[WebhookDispatcher] Disparando ${eventType} para ${endpoint.url}`);
      await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AlugaPA-Signature': signature
        },
        body
      });
    } catch (e) {
      console.error(`[WebhookDispatcher] Falha ao enviar para ${endpoint.url}`);
    }
  }
}
