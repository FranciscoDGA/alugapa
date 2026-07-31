import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuditEngine {
  
  /**
   * Grava um log imutável de uma ação crítica no sistema.
   */
  static async log(action: string, actorId: string, targetId?: string, details?: any, ipAddress?: string) {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          actorId,
          targetId,
          ipAddress: ipAddress || '127.0.0.1',
          details: details ? JSON.stringify(details) : null
        }
      });
      console.log(`[Trust OS] Auditoria registrada: ${action} por ${actorId}`);
    } catch (e) {
      console.error('[Trust OS] Falha ao registrar auditoria.', e);
    }
  }
}
