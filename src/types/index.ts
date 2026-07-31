import { Prisma } from "@prisma/client";

// Tipos extraídos do Prisma para uso no Frontend / Hooks / Services
export type Company = Prisma.CompanyGetPayload<{}>;
export type CompanyWithDetails = Prisma.CompanyGetPayload<{
  include: {
    listings: true;
    reviews: true;
  };
}>;

export type Listing = Prisma.ListingGetPayload<{}>;
export type ListingWithDetails = Prisma.ListingGetPayload<{
  include: {
    company: true;
    category: true;
  };
}>;

export type Category = Prisma.CategoryGetPayload<{}>;

export type Lead = Prisma.LeadGetPayload<{}>;
export type LeadWithDetails = Prisma.LeadGetPayload<{
  include: {
    company: true;
    listing: true;
  };
}>;

export type User = Prisma.UserGetPayload<{}>;
