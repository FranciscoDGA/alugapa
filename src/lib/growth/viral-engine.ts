// Engine para recursos de Viralidade (Flywheel)

export class ViralEngine {
  
  /**
   * Gera um link de Referral exclusivo para a empresa compartilhar.
   */
  static generateReferralLink(companySlug: string, campaignId: string = "default") {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://alugapa.com.br';
    
    // Anexa UTMs para Analytics SEO/Growth
    return `${baseUrl}/anunciar?ref=${companySlug}&utm_source=referral&utm_campaign=${campaignId}`;
  }

  /**
   * Mock para geração de QR Code de um Anúncio.
   */
  static generateQRCodeUrl(listingSlug: string) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://alugapa.com.br';
    const listingUrl = `${baseUrl}/equipamento/${listingSlug}`;
    
    // Utilizaria uma lib real como qrcode ou API
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(listingUrl)}`;
  }
}
