import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class SearchRepository {
  static async logSearch(query: string, resultsCount: number) {
    return prisma.searchQueryLog.create({
      data: { rawQuery: query, resultsCount }
    });
  }
}
