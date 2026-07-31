import { getCompanyBySlug } from "@/app/actions/search";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ShieldCheck, Mail, Phone, Factory, MessageCircle } from "lucide-react";
import { ListingCard } from "@/components/listing/listing-card";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: company } = await getCompanyBySlug(slug);
  
  if (!company) {
    return { title: "Empresa não encontrada" };
  }

  return {
    title: `${company.name} | AlugaPA`,
    description: company.about || `Aluguel de máquinas e equipamentos na empresa ${company.name} em ${company.city}, ${company.state}.`,
    openGraph: {
      title: `${company.name} - Locadora no AlugaPA`,
      description: `Veja os equipamentos disponíveis para locação na ${company.name}.`,
      images: [company.logoUrl || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"],
    },
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: company } = await getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const { listings } = company;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Cover Image */}
      <div className="h-64 sm:h-80 w-full relative bg-slate-800">
        <Image
          src={company.coverUrl || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"}
          alt={`Capa da empresa ${company.name}`}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 -mt-20 relative z-10">
          
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Header Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl bg-white p-2 shadow-md border border-gray-100 shrink-0 relative">
                <div className="h-full w-full rounded-xl overflow-hidden relative bg-gray-50 flex items-center justify-center">
                  {company.logoUrl ? (
                    <Image src={company.logoUrl} alt={company.name} fill className="object-cover" />
                  ) : (
                    <Factory className="h-10 w-10 text-gray-300" />
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    {company.name}
                  </h1>
                  {company.verified && (
                    <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                      <ShieldCheck className="h-4 w-4 mr-1" /> Empresa Verificada
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center text-sm text-gray-600 gap-y-2 gap-x-6">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5 text-gray-400" /> 
                    {company.city}, {company.state}
                  </span>
                  <span className="flex items-center font-medium">
                    <Star className="h-4 w-4 mr-1.5 text-accent fill-accent" /> 
                    {company.rating.toFixed(1)} <span className="text-gray-400 font-normal ml-1">({company.reviews.length} avaliações)</span>
                  </span>
                  <span className="flex items-center">
                    <Factory className="h-4 w-4 mr-1.5 text-gray-400" />
                    {company.yearsInMarket} anos no mercado
                  </span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sobre a Empresa</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {company.about || "Nenhuma descrição fornecida."}
              </p>
            </div>

            {/* Equipment Grid */}
            <div id="equipamentos">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Equipamentos Disponíveis ({listings.length})</h3>
              </div>
              
              {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {listings.map((listing: any) => (
                    <ListingCard 
                      key={listing.id}
                      id={listing.id}
                      slug={listing.slug}
                      title={listing.title}
                      companyName={company.name}
                      city={listing.city}
                      state={listing.state}
                      price={listing.price}
                      priceOnRequest={listing.priceOnRequest}
                      rating={company.rating}
                      verified={company.verified}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                  <p className="text-gray-500">Esta empresa ainda não possui equipamentos cadastrados.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contato Direto</h3>
              
              <div className="space-y-4 mb-8">
                <a href="#contato" className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                  <div className="h-10 w-10 bg-white rounded-lg shadow-sm flex items-center justify-center mr-4 text-gray-500 group-hover:text-primary transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Telefone</p>
                    <p className="text-xs text-gray-500">Ver número</p>
                  </div>
                </a>
                
                <a href="#contato" className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                  <div className="h-10 w-10 bg-white rounded-lg shadow-sm flex items-center justify-center mr-4 text-green-500 group-hover:text-green-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                    <p className="text-xs text-gray-500">Iniciar conversa</p>
                  </div>
                </a>
                
                <a href="#contato" className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                  <div className="h-10 w-10 bg-white rounded-lg shadow-sm flex items-center justify-center mr-4 text-gray-500 group-hover:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">E-mail</p>
                    <p className="text-xs text-gray-500">Enviar mensagem</p>
                  </div>
                </a>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <h4 className="font-bold text-primary mb-2 flex items-center text-sm">
                  <ShieldCheck className="h-4 w-4 mr-1.5" /> Segurança AlugaPA
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Nunca faça pagamentos antecipados sem antes confirmar as informações com a empresa através dos canais oficiais da plataforma.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
