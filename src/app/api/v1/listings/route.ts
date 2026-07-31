import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");
    const city = searchParams.get("city");

    const where: any = { status: "ACTIVE" };

    if (categoryId) where.categoryId = categoryId;
    if (city) where.city = { contains: city };

    const listings = await prisma.listing.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        price: true,
        priceOnRequest: true,
        city: true,
        state: true,
        company: { select: { name: true, verified: true } },
        category: { select: { name: true } }
      },
      take: 20,
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, data: listings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
