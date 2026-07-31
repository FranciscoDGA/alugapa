import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
  static async findMany() {
    return prisma.category.findMany();
  }
}
