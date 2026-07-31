// Motor para manipulação do funil de vendas (Pipeline)

export class PipelineEngine {
  
  /**
   * Move o lead para um novo estágio e automaticamente cria um log na Timeline.
   */
  static async moveLead(leadId: string, newStage: string, changedBy: string = "SYSTEM") {
    console.log(`[Pipeline] Movendo Lead ${leadId} para o estágio: ${newStage}`);
    
    /* Lógica real no Prisma:
    await prisma.$transaction([
      prisma.lead.update({
        where: { id: leadId },
        data: { pipelineStage: newStage, updatedAt: new Date() }
      }),
      prisma.leadTimeline.create({
        data: {
          leadId,
          type: 'STATUS_CHANGE',
          title: `Lead movido para ${newStage}`,
          details: `Alterado por ${changedBy}`
        }
      })
    ]);
    */
    
    // Se estágio = FECHADO, dispara gatilhos de Growth Engine (ex: Winback) ou pede avaliação
    if (newStage === 'FECHADO') {
      console.log(`[Pipeline] Disparando webhook de Onboarding Pós-Venda.`);
    }
  }

  /**
   * Agenda tarefas automáticas padrão (Follow-up)
   */
  static async scheduleStandardFollowUp(leadId: string) {
    // 1 dia após "PROPOSTA" -> Criar Task "Ligar perguntando se recebeu"
  }
}
