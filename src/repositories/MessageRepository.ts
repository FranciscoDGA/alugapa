import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class MessageRepository {
  static async create(data: Prisma.LeadMessageUncheckedCreateInput) {
    return prisma.leadMessage.create({
      data,
    });
  }

  static async findByLeadId(leadId: string) {
    return prisma.leadMessage.findMany({
      where: { leadId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async markAsRead(id: string) {
    return prisma.leadMessage.update({
      where: { id },
      data: { readAt: new Date() }
    });
  }
}
