import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class LeadRepository {
  static async create(data: Prisma.LeadUncheckedCreateInput) {
    return prisma.lead.create({
      data,
      include: {
        company: true,
        listing: true,
      }
    });
  }

  static async findById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: {
        company: true,
        listing: true,
        events: { orderBy: { createdAt: 'desc' } },
        messages: { orderBy: { createdAt: 'asc' } },
        attachments: true
      }
    });
  }

  static async findByCompanyId(companyId: string) {
    return prisma.lead.findMany({
      where: { companyId },
      include: {
        listing: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateStatus(id: string, status: string, pipelineStage: string) {
    return prisma.lead.update({
      where: { id },
      data: { status, pipelineStage },
    });
  }

  static async count() {
    return prisma.lead.count();
  }
}
