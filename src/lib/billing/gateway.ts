// Módulo abstrato de pagamentos (Billing Gateway)

export interface CreateSubscriptionArgs {
  companyId: string;
  planId: string;
  gateway: 'STRIPE' | 'ASAAS';
}

export class BillingGateway {
  
  /**
   * Orquestra a criação da assinatura chamando o provider correto.
   */
  static async createSubscription(args: CreateSubscriptionArgs) {
    console.log(`[BillingGateway] Criando assinatura via ${args.gateway}`);
    
    // Simulação do comportamento
    const gatewayId = `sub_${args.gateway.toLowerCase()}_${Date.now()}`;
    const invoiceId = `inv_${Date.now()}`;

    // Lógica real chamaria:
    // if (args.gateway === 'STRIPE') return stripe.subscriptions.create(...)
    
    return {
      success: true,
      subscriptionId: gatewayId,
      invoiceId: invoiceId,
      status: 'ACTIVE'
    };
  }

  /**
   * Trata webhooks genéricos (ex: fatura paga, assinatura cancelada)
   */
  static async handleWebhook(eventPayload: any, gateway: 'STRIPE' | 'ASAAS') {
    console.log(`[BillingGateway] Processando webhook do ${gateway}:`, eventPayload.type);
    
    // 1. Extrair ID da assinatura
    // 2. Localizar no Prisma (prisma.subscription.findFirst)
    // 3. Atualizar Status (ACTIVE, PAST_DUE)
    // 4. Gerar Invoice/Transaction no DB
  }
}
