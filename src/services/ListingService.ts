import { ListingRepository } from "@/repositories/ListingRepository";

export class ListingService {
  static async createListing(params: {
    title: string;
    description: string;
    type: string;
    price: number | null;
    categoryId: string;
    companyId: string;
    city: string;
    state: string;
  }) {
    const slug = params.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);
    
    return ListingRepository.create({
      title: params.title,
      slug,
      shortDescription: params.description,
      type: params.type,
      price: params.price,
      priceOnRequest: !params.price,
      categoryId: params.categoryId,
      companyId: params.companyId,
      city: params.city,
      state: params.state,
    });
  }

  static async getFeaturedListings() {
    return ListingRepository.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        company: { select: { name: true, verified: true, rating: true, logoUrl: true } },
        category: true,
      }
    });
  }

  static async getTotalListings() {
    return ListingRepository.count();
  }
}
