import { MetadataRoute } from 'next';
// import prisma from '@/lib/prisma'; // Assumindo que você tem um cliente prisma

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://alugapa.com.br';

  // O Sitemap Engine idealmente buscaria da tabela SeoPage
  // const pages = await prisma.seoPage.findMany({ where: { indexed: true } });
  
  // Exemplo estrutural base
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/buscar`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    // Aqui seria mapeado o array dinâmico do SeoPage
    // ...pages.map(page => ({ url: `${baseUrl}${page.url}`, lastModified: page.updatedAt }))
  ];
}
