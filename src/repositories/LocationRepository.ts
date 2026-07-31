import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LocationRepository {
  static async getStates() {
    return prisma.state.findMany({
      orderBy: { name: "asc" }
    });
  }

  static async getStateBySlug(slug: string) {
    return prisma.state.findUnique({
      where: { slug }
    });
  }

  static async getCitiesByState(stateId: string) {
    return prisma.city.findMany({
      where: { stateId },
      orderBy: { name: "asc" }
    });
  }

  static async getCityBySlug(slug: string) {
    return prisma.city.findUnique({
      where: { slug },
      include: { state: true }
    });
  }
}
