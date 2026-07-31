"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { getMyCompany } from "./company";

const prisma = new PrismaClient();

export async function getCompanyMembers() {
  try {
    const { data: company, error } = await getMyCompany();
    if (error || !company) return { data: null, error: "Not authenticated" };

    const members = await prisma.companyMember.findMany({
      where: { companyId: company.id },
      include: {
        user: {
          select: { name: true, email: true, avatarUrl: true, phone: true }
        }
      },
      orderBy: { createdAt: "asc" }
    });

    return { data: members, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch members" };
  }
}

export async function inviteMember(formData: FormData) {
  try {
    const { data: company, error } = await getMyCompany();
    if (error || !company) return { success: false, error: "Not authenticated" };

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;

    // TODO: Connect this to Supabase Auth Invite later. 
    // For now, we mock the user creation if it doesn't exist.
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: "COMPANY_MEMBER"
        }
      });
    }

    // Check if already a member
    const existing = await prisma.companyMember.findUnique({
      where: { userId_companyId: { userId: user.id, companyId: company.id } }
    });

    if (existing) {
      return { success: false, error: "Usuário já é membro da empresa." };
    }

    await prisma.companyMember.create({
      data: {
        userId: user.id,
        companyId: company.id,
        role
      }
    });

    revalidatePath("/dashboard/equipe");
    return { success: true };
  } catch (err) {
    console.error("Invite error:", err);
    return { success: false, error: "Falha ao convidar membro." };
  }
}

export async function removeMember(memberId: string) {
  try {
    const { data: company, error } = await getMyCompany();
    if (error || !company) return { success: false, error: "Not authenticated" };

    // Verify member belongs to this company
    const member = await prisma.companyMember.findUnique({
      where: { id: memberId }
    });

    if (!member || member.companyId !== company.id) {
      return { success: false, error: "Membro não encontrado." };
    }

    if (member.role === "OWNER") {
      return { success: false, error: "Não é possível remover o proprietário." };
    }

    await prisma.companyMember.delete({ where: { id: memberId } });
    revalidatePath("/dashboard/equipe");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Erro ao remover membro." };
  }
}
