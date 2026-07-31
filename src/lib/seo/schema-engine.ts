export function generateLocalBusinessSchema(company: any) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company.name,
    "image": company.logoUrl,
    "description": company.about,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": company.city,
      "addressRegion": company.state,
      "addressCountry": "BR"
    },
    "aggregateRating": company.rating ? {
      "@type": "AggregateRating",
      "ratingValue": company.rating.toString(),
      "reviewCount": "1" // placeholder
    } : undefined
  };
}

export function generateFAQSchema(faqs: {question: string, answer: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
