import { CategoryRepository } from "@/repositories/CategoryRepository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CategoryService {
  static async getCategories() {
    return CategoryRepository.findMany();
  }

  static async getCategory(slug: string) {
    return prisma.category.findUnique({ where: { slug } });
  }
}
