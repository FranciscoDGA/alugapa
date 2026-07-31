import { ReviewRepository } from "@/repositories/ReviewRepository";

export class ReviewService {
  static async getCompanyReviews(companyId: string) {
    if (!companyId) throw new Error("ID da empresa é obrigatório");
    return ReviewRepository.findByCompany(companyId);
  }
}
