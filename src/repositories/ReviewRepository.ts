import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ReviewRepository {
  static async findByCompany(companyId: string) {
    return prisma.review.findMany({ where: { companyId }, orderBy: { createdAt: "desc" } });
  }
}
