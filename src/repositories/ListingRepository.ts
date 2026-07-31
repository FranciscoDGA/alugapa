import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListingRepository {
  static async create(data: {
    title: string;
    slug: string;
    shortDescription: string;
    type: string;
    price: number | null;
    priceOnRequest: boolean;
    categoryId: string;
    companyId: string;
    city: string;
    state: string;
  }) {
    return prisma.listing.create({ data });
  }

  static async findMany(options?: {
    where?: any;
    take?: number;
    include?: any;
    orderBy?: any;
  }) {
    return prisma.listing.findMany(options);
  }

  static async count() {
    return prisma.listing.count();
  }
}
