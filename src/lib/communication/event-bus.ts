type EventType = 'LEAD_CREATED' | 'PAYMENT_APPROVED' | 'LISTING_EXPIRED' | 'SYSTEM_ALERT';

type EventHandler = (payload: any) => Promise<void>;

/**
 * EventBus: O coração reativo do Communication OS.
 */
export class EventBus {
  private static listeners: Record<string, EventHandler[]> = {};

  /**
   * Registra um ouvinte para um evento
   */
  static subscribe(event: EventType, handler: EventHandler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  /**
   * Emite um evento que será processado de forma assíncrona pelos ouvintes.
   */
  static publish(event: EventType, payload: any) {
    console.log(`[EventBus] Evento publicado: ${event}`);
    const handlers = this.listeners[event] || [];
    
    // Processamento assíncrono para não travar a requisição principal
    handlers.forEach(handler => {
      Promise.resolve(handler(payload)).catch(err => {
        console.error(`[EventBus] Erro ao processar evento ${event}:`, err);
      });
    });
  }
}
