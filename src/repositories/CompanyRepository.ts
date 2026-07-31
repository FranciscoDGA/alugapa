import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CompanyRepository {
  static async findById(id: string) {
    return prisma.company.findUnique({
      where: { id },
      include: {
        listings: { orderBy: { createdAt: "desc" } },
        leads: { orderBy: { createdAt: "desc" } },
        reviews: { orderBy: { createdAt: "desc" } },
        _count: { select: { listings: true, leads: true, reviews: true } }
      },
    });
  }

  static async findBySlug(slug: string) {
    return prisma.company.findUnique({
      where: { slug },
      include: { listings: true, reviews: true },
    });
  }

  static async count() {
    return prisma.company.count();
  }
}
