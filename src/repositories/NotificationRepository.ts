import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class NotificationRepository {
  static async create(data: Prisma.NotificationUncheckedCreateInput) {
    return prisma.notification.create({
      data,
    });
  }

  static async findByCompanyId(companyId: string) {
    return prisma.notification.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  static async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { read: true }
    });
  }
}
