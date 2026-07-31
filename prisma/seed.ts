import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seed da Sprint 02 (Zero Mock -> Real Data)');

  // 1. Estados
  const para = await prisma.state.upsert({
    where: { uf: 'PA' },
    update: {},
    create: {
      name: 'Pará',
      uf: 'PA',
      slug: 'para',
    },
  });

  const saoPaulo = await prisma.state.upsert({
    where: { uf: 'SP' },
    update: {},
    create: {
      name: 'São Paulo',
      uf: 'SP',
      slug: 'sao-paulo',
    },
  });

  // 2. Cidades (Foco inicial: Sul do Pará e SP)
  const citiesData = [
    { name: 'Redenção', slug: 'redencao', stateId: para.id },
    { name: 'Marabá', slug: 'maraba', stateId: para.id },
    { name: 'Parauapebas', slug: 'parauapebas', stateId: para.id },
    { name: 'Belém', slug: 'belem', stateId: para.id },
    { name: 'São Paulo', slug: 'sao-paulo-sp', stateId: saoPaulo.id },
    { name: 'Campinas', slug: 'campinas', stateId: saoPaulo.id },
  ];

  for (const city of citiesData) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: city,
    });
  }

  // 3. Categorias Base
  const categoriesData = [
    { name: 'Construção Civil', slug: 'construcao-civil', seoTitle: 'Aluguel de Máquinas para Construção Civil' },
    { name: 'Agronegócio', slug: 'agronegocio', seoTitle: 'Equipamentos para Agronegócio' },
    { name: 'Energia', slug: 'energia', seoTitle: 'Geradores de Energia' },
    { name: 'Logística', slug: 'logistica', seoTitle: 'Empilhadeiras e Logística' },
    { name: 'Mineração', slug: 'mineracao', seoTitle: 'Máquinas para Mineração' },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, active: true },
    });
  }

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
