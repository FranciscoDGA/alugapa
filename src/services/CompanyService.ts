import { CompanyRepository } from "@/repositories/CompanyRepository";

export class CompanyService {
  static async getCompanyProfile(slug: string) {
    const company = await CompanyRepository.findBySlug(slug);
    if (!company) {
      throw new Error(`Empresa com slug '${slug}' não encontrada.`);
    }
    return company;
  }

  static async getCompanyDashboardStats(id: string) {
    const company = await CompanyRepository.findById(id);
    if (!company) {
      throw new Error(`Empresa não encontrada.`);
    }
    return company;
  }

  static async getTotalCompanies() {
    return CompanyRepository.count();
  }
}
