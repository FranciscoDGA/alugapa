import { PrismaClient } from "@prisma/client";
import { Logger } from "@/lib/logger";

const prisma = new PrismaClient();

export class AuditLogger {
  static async log(params: {
    action: string;
    actorId: string;
    targetId?: string;
    ipAddress?: string;
    details?: any;
  }) {
    try {
      await prisma.auditLog.create({
        data: {
          action: params.action,
          actorId: params.actorId,
          targetId: params.targetId,
          ipAddress: params.ipAddress,
          details: params.details ? JSON.stringify(params.details) : undefined,
        },
      });
    } catch (error) {
      // Falhas no log não devem derrubar a requisição principal
      Logger.error("Failed to write to AuditLog", error);
    }
  }
}
