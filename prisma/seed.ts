import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Criar Categorias
  const catEnergia = await prisma.category.upsert({
    where: { slug: 'energia' },
    update: {},
    create: { name: 'Energia', slug: 'energia', icon: 'Zap' },
  })

  const catConstrucao = await prisma.category.upsert({
    where: { slug: 'construcao' },
    update: {},
    create: { name: 'Construção', slug: 'construcao', icon: 'Pickaxe' },
  })

  // 2. Criar Empresas
  const empresa1 = await prisma.company.create({
    data: {
      name: 'Energia Locações',
      city: 'São Paulo',
      state: 'SP',
      verified: true,
      plan: 'PRO',
      rating: 4.9,
      yearsInMarket: 2,
    },
  })

  const empresa2 = await prisma.company.create({
    data: {
      name: 'TratorMax Pesados',
      city: 'Marabá',
      state: 'PA',
      verified: true,
      plan: 'ESSENTIAL',
      rating: 4.7,
      yearsInMarket: 5,
    },
  })

  // 3. Criar Anúncios
  await prisma.listing.create({
    data: {
      title: 'Gerador Silenciado 50kVA a Diesel',
      slug: 'gerador-silenciado-50kva-diesel-sp',
      shortDescription: 'Gerador cabinado super silenciado, ideal para eventos, hospitais e obras. Manutenção em dia e entrega imediata na grande SP.',
      type: 'EQUIPMENT',
      city: 'São Paulo',
      state: 'SP',
      priceOnRequest: true,
      companyId: empresa1.id,
      categoryId: catEnergia.id,
    },
  })

  await prisma.listing.create({
    data: {
      title: 'Retroescavadeira Case 580N',
      slug: 'retroescavadeira-case-580n-maraba',
      shortDescription: 'Equipamento novo com operador. Ideal para terraplenagem e obras de grande porte.',
      type: 'EQUIPMENT',
      city: 'Marabá',
      state: 'PA',
      price: 250, // diária/hora dependendo do modelo de negócio (ex: R$250/h)
      priceOnRequest: false,
      companyId: empresa2.id,
      categoryId: catConstrucao.id,
    },
  })

  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
