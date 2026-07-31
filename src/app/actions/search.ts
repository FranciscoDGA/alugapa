"use server";

import { ListingService } from "@/services/ListingService";
import { CategoryService } from "@/services/CategoryService";
import { CompanyService } from "@/services/CompanyService";
import { SearchService } from "@/services/SearchService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getListings({
  query,
  location,
  categoryId,
  limit = 10
}: {
  query?: string;
  location?: string;
  categoryId?: string;
  limit?: number;
}) {
  try {
    if (query || location || categoryId) {
       const listings = await SearchService.executeSearch(query || "");
       // The SearchService should be enhanced to handle location and categoryId later.
       return { data: listings, error: null };
    }
    const listings = await ListingService.getFeaturedListings();
    return { data: listings, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch listings" };
  }
}

export async function getCategories() {
  try {
    const categories = await CategoryService.getCategories();
    return { data: categories, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch categories" };
  }
}

export async function getListingBySlug(slug: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { slug },
      include: {
        company: true,
        category: true,
        images: true
      }
    });
    return { data: listing, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch listing" };
  }
}

export async function getCompanyBySlug(slug: string) {
  try {
    const company = await CompanyService.getCompanyProfile(slug);
    return { data: company, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch company" };
  }
}
