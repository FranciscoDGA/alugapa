import { SearchRepository } from "@/repositories/SearchRepository";
import { ListingRepository } from "@/repositories/ListingRepository";

export class SearchService {
  static async executeSearch(query: string) {
    const results = await ListingRepository.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { shortDescription: { contains: query, mode: "insensitive" } }
        ]
      },
      take: 20
    });

    await SearchRepository.logSearch(query, results.length);
    
    return results;
  }
}
