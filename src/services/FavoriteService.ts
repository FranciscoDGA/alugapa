// Favorite operations
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class FavoriteService {
  static async toggleFavorite(userId: string, targetId: string, type: string) {
    const existing = await prisma.userFavorite.findUnique({
      where: {
        userId_targetId: { userId, targetId }
      }
    });

    if (existing) {
      await prisma.userFavorite.delete({ where: { id: existing.id } });
      return { favorited: false };
    } else {
      await prisma.userFavorite.create({
        data: { userId, targetId, type }
      });
      return { favorited: true };
    }
  }
}
