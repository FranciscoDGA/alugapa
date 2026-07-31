import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository {
  static async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
