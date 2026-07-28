import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { MapPin, Star, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  // Busca a empresa pelo slug e inclui as relações
  const company = await prisma.company.findUnique({
    where: { slug: params.slug },
    include: {
      listings: {
        where: { status: "ACTIVE" },
        include: { category: true }
      },
      reviews: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!company) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner / Cover */}
      <div className="h-64 md:h-80 w-full relative bg-gray-900">
        {company.coverUrl ? (
          <img 
            src={company.coverUrl} 
            alt={`Banner ${company.name}`}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-900 to-gray-900"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Perfil Header (Sobreposto ao banner) */}
        <div className="relative -mt-24 mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-sm border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden -mt-12 md:-mt-16 z-10 p-2">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={`Logo ${company.name}`} className="w-full h-full object-contain" />
              ) : (
                <span className="text-3xl font-bold text-gray-300">{company.name.substring(0, 2)}</span>
              )}
            </div>

            {/* Info Principal */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                {company.verified && (
                  <span title="Empresa Verificada">
                    <ShieldCheck className="text-blue-500 w-6 h-6" />
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1"><MapPin size={16}/> {company.city}, {company.state}</span>
                <span className="flex items-center gap-1 text-amber-500 font-medium"><Star size={16} className="fill-amber-500" /> {company.rating.toFixed(1)} ({company.reviews.length} avaliações)</span>
                <span className="text-gray-400">•</span>
                <span>No mercado há {company.yearsInMarket} anos</span>
              </div>
            </div>

            {/* Ações */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <Link href={`/orcamento?empresa=${company.id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center shadow-md shadow-blue-600/20 flex items-center justify-center gap-2">
                Solicitar Orçamento
              </Link>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-3 px-6 rounded-xl transition-colors text-center">
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 pb-24">
          
          {/* Main Content (Catálogo e Avaliações) */}
          <div className="flex-1 space-y-8">
            
            {/* Sobre a empresa (Mobile + Desktop) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre a Empresa</h2>
              <p className="text-gray-600 leading-relaxed">
                {company.about || "Esta empresa ainda não adicionou uma descrição."}
              </p>
            </div>

            {/* Catálogo de Equipamentos/Serviços */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Catálogo ({company.listings.length})</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {company.listings.map((listing) => (
                  <div key={listing.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-md transition-shadow group">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                       <span className="text-xs text-gray-400">Sem Foto</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-xs font-semibold text-blue-600 mb-1">{listing.category.name}</span>
                      <h3 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">{listing.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{listing.shortDescription}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-semibold text-gray-900">
                          {listing.priceOnRequest ? "Sob Consulta" : `R$ ${listing.price}`}
                        </span>
                        <Link href={`/orcamento?listing=${listing.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center">
                          Orçar <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                
                {company.listings.length === 0 && (
                  <div className="col-span-2 bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center">
                    <p className="text-gray-500">Esta empresa ainda não possui anúncios publicados.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Avaliações */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Avaliações dos Clientes</h2>
              <div className="space-y-6">
                {company.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-amber-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{review.authorName}</span>
                      <span className="text-xs text-gray-500">• {review.createdAt.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <p className="text-gray-600 text-sm">"{review.comment}"</p>
                  </div>
                ))}
                
                {company.reviews.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">Ainda não há avaliações para esta empresa.</p>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar / Informações Adicionais */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Informações</h3>
              
              <ul className="space-y-4 text-sm text-gray-600">
                {company.cnpj && (
                  <li className="flex justify-between">
                    <span className="text-gray-500">CNPJ</span>
                    <span className="font-medium text-gray-900">{company.cnpj}</span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="text-gray-500">Atuação</span>
                  <span className="font-medium text-gray-900">{company.city} e região</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Membro desde</span>
                  <span className="font-medium text-gray-900">{company.createdAt.getFullYear()}</span>
                </li>
              </ul>
              
              <hr className="my-6 border-gray-100" />
              
              <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Pagamento Seguro</h4>
                  <p className="text-xs text-blue-700">O AlugaPA garante a comunicação segura. Sempre verifique o equipamento antes do pagamento final.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
