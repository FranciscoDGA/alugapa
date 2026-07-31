"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { getMyCompany } from "./company";

const prisma = new PrismaClient();

export async function getCompanySchedules() {
  try {
    const { data: company, error } = await getMyCompany();
    if (error || !company) return { data: null, error: "Not authenticated" };

    const schedules = await prisma.listingSchedule.findMany({
      where: {
        listing: { companyId: company.id }
      },
      include: {
        listing: {
          select: { id: true, title: true, brand: true, model: true }
        }
      },
      orderBy: { startDate: "asc" }
    });

    return { data: schedules, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch schedules" };
  }
}

export async function createSchedule(formData: FormData) {
  try {
    const { data: company, error } = await getMyCompany();
    if (error || !company) return { success: false, error: "Not authenticated" };

    const listingId = formData.get("listingId") as string;
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const notes = formData.get("notes") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);

    // Verify ownership
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }
    });

    if (!listing || listing.companyId !== company.id) {
      return { success: false, error: "Equipamento inválido." };
    }

    await prisma.listingSchedule.create({
      data: {
        listingId,
        type,
        title,
        notes,
        startDate,
        endDate,
        status: "CONFIRMED"
      }
    });

    revalidatePath("/dashboard/agenda");
    return { success: true };
  } catch (err) {
    console.error("Schedule error:", err);
    return { success: false, error: "Falha ao criar evento." };
  }
}

export async function deleteSchedule(id: string) {
  try {
    const { data: company, error } = await getMyCompany();
    if (error || !company) return { success: false, error: "Not authenticated" };

    const schedule = await prisma.listingSchedule.findUnique({
      where: { id },
      include: { listing: true }
    });

    if (!schedule || schedule.listing.companyId !== company.id) {
      return { success: false, error: "Evento não encontrado." };
    }

    await prisma.listingSchedule.delete({ where: { id } });
    revalidatePath("/dashboard/agenda");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Falha ao deletar evento." };
  }
}
