"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getPlatformStats() {
  try {
    const [companies, listings, leads] = await Promise.all([
      prisma.company.count(),
      prisma.listing.count(),
      prisma.lead.count(),
    ]);
    // TODO: Connect to Stripe for real revenue
    const revenue = 45000;
    return { data: { companies, listings, leads, revenue }, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch platform stats" };
  }
}

export async function getCompanies() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { listings: true, leads: true } }
      }
    });
    return { data: companies, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch companies" };
  }
}

export async function toggleCompanyVerification(id: string, currentStatus: boolean) {
  try {
    await prisma.company.update({
      where: { id },
      data: { verified: !currentStatus }
    });
    revalidatePath("/admin/empresas");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update verification" };
  }
}

export async function changeCompanyStatus(id: string, status: string) {
  try {
    await prisma.company.update({
      where: { id },
      data: { status }
    });
    
    // Log audit
    await prisma.auditLog.create({
      data: {
        action: `COMPANY_STATUS_${status}`,
        actorId: "SYSTEM_ADMIN", // TODO: Replace with real admin ID when auth is ready
        targetId: id
      }
    });

    revalidatePath("/admin/empresas");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to change company status" };
  }
}

export async function getPlatformListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        company: { select: { name: true, verified: true } },
        category: { select: { name: true } }
      }
    });
    return { data: listings, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch platform listings" };
  }
}

export async function moderateListing(id: string, status: string) {
  try {
    await prisma.listing.update({
      where: { id },
      data: { status } // ACTIVE, REJECTED, SUSPENDED
    });

    await prisma.auditLog.create({
      data: {
        action: `LISTING_MODERATED_${status}`,
        actorId: "SYSTEM_ADMIN",
        targetId: id
      }
    });

    revalidatePath("/admin/marketplace");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to moderate listing" };
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { listings: true } } }
    });
    return { data: categories, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch categories" };
  }
}

export async function getPlatformUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        companyMembers: {
          include: { company: { select: { name: true } } }
        }
      }
    });
    return { data: users, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch users" };
  }
}

export async function changeUserRole(id: string, role: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role }
    });

    await prisma.auditLog.create({
      data: {
        action: `USER_ROLE_CHANGED_TO_${role}`,
        actorId: "SYSTEM_ADMIN",
        targetId: id
      }
    });

    revalidatePath("/admin/tenants");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to change user role" };
  }
}

export async function getPlatformTickets() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        company: { select: { name: true } }
      }
    });
    return { data: tickets, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch tickets" };
  }
}

export async function changeTicketStatus(id: string, status: string) {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/suporte");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update ticket" };
  }
}
export async function getPlatformArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { data: articles, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch articles" };
  }
}

export async function getPlatformFaqs() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { question: "asc" }
    });
    return { data: faqs, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch faqs" };
  }
}
