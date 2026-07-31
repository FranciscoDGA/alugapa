"use server";

import { CompanyService } from "@/services/CompanyService";
import { LeadService } from "@/services/LeadService";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to get authenticated company (DEMO MODE FOR SPRINT 03)
async function getAuthenticatedCompany() {
  // Demo Mode: Bypassing Supabase until Sprint 04
  // We just fetch the first company in the database to simulate an active session
  const company = await prisma.company.findFirst();

  if (!company) {
    throw new Error("No companies found in database. Run the seeder first.");
  }

  return company;
}

export async function getCompanyListings() {
  try {
    const company = await getAuthenticatedCompany();

    const companyData = await prisma.company.findUnique({
      where: { id: company.id },
      include: {
        listings: {
          orderBy: { createdAt: "desc" },
          include: { category: true }
        }
      }
    });

    if (!companyData) {
      return { data: null, error: "Company not found" };
    }

    return { data: companyData.listings, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch catalog" };
  }
}

export async function createListing(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const priceStr = formData.get("price") as string;
    const price = priceStr ? parseFloat(priceStr) : null;
    const categoryId = formData.get("categoryId") as string;
    
    // Novas propriedades (Sprint 04)
    const brand = formData.get("brand") as string | null;
    const model = formData.get("model") as string | null;
    const yearStr = formData.get("year") as string;
    const year = yearStr ? parseInt(yearStr, 10) : null;
    const status = (formData.get("status") as string) || "AVAILABLE";

    const company = await getAuthenticatedCompany();
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    await prisma.listing.create({
      data: {
        title,
        slug,
        shortDescription,
        price,
        priceOnRequest: !price,
        categoryId,
        companyId: company.id,
        city: company.city,
        state: company.state,
        type: "EQUIPMENT",
        brand,
        model,
        year,
        availability: status
      }
    });

    revalidatePath("/dashboard/catalogo");
    return { success: true };
  } catch (error) {
    console.error("Error creating listing", error);
    return { success: false, error: "Failed to create listing" };
  }
}

export async function deleteListing(id: string) {
  try {
    await prisma.listing.delete({ where: { id } });
    revalidatePath("/dashboard/catalogo");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete" };
  }
}

export async function getCompanyLeads() {
  try {
    const authenticatedCompany = await getAuthenticatedCompany();
    const leads = await LeadService.getCompanyLeads(authenticatedCompany.id);
    return { data: leads, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch leads" };
  }
}

export async function updateLeadStatus(leadId: string, newStatus: string) {
  try {
    // Determine a pipeline stage mapped from status for now
    let pipelineStage = "NOVO";
    if (newStatus === "CONTATO") pipelineStage = "CONTATO";
    if (newStatus === "PROPOSTA") pipelineStage = "PROPOSTA";
    if (newStatus === "FECHADO") pipelineStage = "FECHADO";
    if (newStatus === "PERDIDO") pipelineStage = "PERDIDO";

    await prisma.lead.update({
      where: { id: leadId },
      data: { status: newStatus, pipelineStage }
    });
    
    await prisma.leadEvent.create({
      data: {
        leadId,
        type: "status_change",
        title: `Status alterado para ${newStatus}`,
      }
    });
    
    revalidatePath("/dashboard/leads");
    revalidatePath("/dashboard/crm");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update lead" };
  }
}

export async function getMyCompany() {
  try {
    const company = await getAuthenticatedCompany();
    return { data: company, error: null };
  } catch (error) {
    return { data: null, error: "Not authenticated" };
  }
}

export async function getCompanyStats() {
  try {
    const authenticatedCompany = await getAuthenticatedCompany();
    const companyData = await prisma.company.findUnique({
      where: { id: authenticatedCompany.id },
      include: {
        _count: {
          select: { listings: true, leads: true, reviews: true }
        }
      }
    });
    return { data: companyData?._count, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch stats" };
  }
}

export async function updateCompanyProfile(formData: FormData) {
  try {
    const company = await getAuthenticatedCompany();
    const name = formData.get("name") as string;
    const about = formData.get("about") as string;
    const cnpj = formData.get("cnpj") as string;
    const website = formData.get("website") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;

    await prisma.company.update({
      where: { id: company.id },
      data: {
        name: name || company.name,
        about: about || company.about,
        cnpj: cnpj || company.cnpj,
        website: website || company.website,
        whatsapp: whatsapp || company.whatsapp,
        email: email || company.email,
        city: city || company.city,
        state: state || company.state
      }
    });

    revalidatePath("/dashboard/empresa");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile", error);
    return { success: false, error: "Failed to update profile" };
  }
}
