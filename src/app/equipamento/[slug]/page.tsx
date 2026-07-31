import { getListingBySlug } from "@/app/actions/search";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ShieldCheck, Share2, Heart, CheckCircle2, Factory } from "lucide-react";
import { LeadModalClient } from "./lead-modal-client";
import { Metadata } from "next";
import { FavoriteButton } from "@/components/listing/favorite-button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: listing } = await getListingBySlug(slug);
  
  if (!listing) {
    return { title: "Equipamento não encontrado" };
  }

  return {
    title: `${listing.title} - Locação | AlugaPA`,
    description: listing.shortDescription || `Alugue ${listing.title} com a empresa ${listing.company.name} em ${listing.city}, ${listing.state}.`,
    openGraph: {
      title: `${listing.title} - Locação no AlugaPA`,
      description: `Disponível para locação na ${listing.company.name}. Solicite um orçamento.`,
      images: ["https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"], // Placeholder for now
    },
  };
}

export default async function EquipmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: listing } = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const { company } = listing;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/busca" className="hover:text-primary transition-colors">Busca</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">{listing.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              <Share2 className="h-4 w-4 mr-1.5" /> Compartilhar
            </button>
            <FavoriteButton targetId={listing.id} type="EQUIPMENT" />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (Images & Details) */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-8">
              <div className="relative aspect-[16/9] w-full bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> {listing.city}, {listing.state}
                    </span>
                    <span className="flex items-center text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-md">
                      {listing.category.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Sobre o Equipamento</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {listing.fullDescription || listing.shortDescription}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Características</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span>Característica genérica {i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Company & CTA) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-slate-50/50">
                {listing.priceOnRequest ? (
                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Valor da Locação</span>
                    <p className="text-3xl font-bold text-gray-900 mt-1">Sob consulta</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Valor da Locação</span>
                    <div className="flex items-baseline mt-1">
                      <span className="text-lg font-medium text-gray-500 mr-1">R$</span>
                      <span className="text-4xl font-extrabold text-gray-900">{listing.price?.toLocaleString('pt-BR')}</span>
                      <span className="text-lg font-medium text-gray-500 ml-1">/dia</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  {/* The Lead Modal trigger is handled by a client component to manage state */}
                  <LeadModalClient 
                    listingName={listing.title} 
                    companyName={company.name}
                    companyId={company.id}
                    listingId={listing.id}
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
                  Garantia de resposta rápida
                </p>
              </div>

              <div className="p-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Fornecedor</h4>
                
                <Link href={`/empresa/${company.slug}`} className="group flex items-center p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                  <div className="h-12 w-12 rounded-full bg-gray-100 overflow-hidden relative shrink-0 border border-gray-200">
                    {company.logoUrl ? (
                      <Image src={company.logoUrl} alt={company.name} fill className="object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400 bg-slate-100">
                        <Factory className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <h5 className="font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center">
                      {company.name}
                      {company.verified && <ShieldCheck className="h-3.5 w-3.5 text-green-500 ml-1" />}
                    </h5>
                    <div className="flex items-center text-sm text-gray-500 mt-0.5">
                      <Star className="h-3.5 w-3.5 text-accent fill-accent mr-1" />
                      <span className="font-semibold text-gray-700 mr-1">{company.rating.toFixed(1)}</span>
                      <span>({company.yearsInMarket} anos)</span>
                    </div>
                  </div>
                </Link>
                
                <Link href={`/empresa/${company.slug}`} className="mt-4 block w-full py-2 text-center text-sm font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors">
                  Ver perfil completo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
