"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function searchListings(query: string = "", city: string = "") {
  // Simples busca combinada de tÃ­tulo, descriÃ§Ã£o ou categoria
  const listings = await prisma.listing.findMany({
    where: {
      status: "ACTIVE",
      AND: [
        {
          OR: [
            { title: { contains: query } },
            { shortDescription: { contains: query } },
            { category: { name: { contains: query } } }
          ]
        },
        {
          city: { contains: city }
        }
      ]
    },
    include: {
      company: true,
      category: true
    },
    orderBy: [
      { createdAt: "desc" }
    ]
  });

  return listings;
}

export async function getCategories() {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: { listings: true }
      }
    }
  });
}
