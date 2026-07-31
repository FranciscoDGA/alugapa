export interface MessagePayload {
  to: string;
  subject?: string;
  body: string;
}

export interface CommunicationAdapter {
  send(payload: MessagePayload): Promise<boolean>;
}

/**
 * Adapter Fake (Mock) para E-mail (ex: substituiria pelo Resend/Brevo)
 */
export class EmailAdapter implements CommunicationAdapter {
  async send(payload: MessagePayload): Promise<boolean> {
    console.log(`[EmailAdapter] Enviando e-mail para ${payload.to}...`);
    console.log(`[EmailAdapter] Assunto: ${payload.subject}`);
    // Simula tempo de rede
    await new Promise(r => setTimeout(r, 500));
    return true;
  }
}

/**
 * Adapter Fake (Mock) para WhatsApp (ex: substituiria pelo Twilio/Z-API)
 */
export class WhatsAppAdapter implements CommunicationAdapter {
  async send(payload: MessagePayload): Promise<boolean> {
    console.log(`[WhatsAppAdapter] Disparando Zap para ${payload.to}...`);
    console.log(`[WhatsAppAdapter] Mensagem: ${payload.body}`);
    // Simula tempo de rede
    await new Promise(r => setTimeout(r, 500));
    return true;
  }
}

export class PushAdapter implements CommunicationAdapter {
  async send(payload: MessagePayload): Promise<boolean> {
    console.log(`[PushAdapter] Disparando Push para device token ${payload.to}...`);
    return true;
  }
}
