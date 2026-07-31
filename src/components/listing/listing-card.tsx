import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ShieldCheck } from "lucide-react";

interface ListingCardProps {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  city: string;
  state: string;
  price?: number | null;
  priceOnRequest: boolean;
  rating?: number;
  imageUrl?: string;
  verified?: boolean;
}

export function ListingCard({
  slug,
  title,
  companyName,
  city,
  state,
  price,
  priceOnRequest,
  rating = 5.0,
  imageUrl = "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
  verified = true
}: ListingCardProps) {
  return (
    <Link href={`/equipamento/${slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Imagem do Produto */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {verified && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center text-xs font-semibold text-green-700">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              Verificado
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="p-4 sm:p-5">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-gray-500 line-clamp-1">{companyName}</p>
            <div className="flex items-center text-sm font-semibold text-gray-800">
              <Star className="h-3.5 w-3.5 text-accent fill-accent mr-1" />
              {rating.toFixed(1)}
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="h-4 w-4 mr-1 shrink-0" />
            <span className="truncate">{city}, {state}</span>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
            <div>
              {priceOnRequest ? (
                <p className="text-lg font-bold text-gray-900">Sob consulta</p>
              ) : (
                <div className="flex items-baseline">
                  <span className="text-xs font-medium text-gray-500 mr-1">R$</span>
                  <span className="text-xl font-bold text-gray-900">{price?.toLocaleString('pt-BR')}</span>
                  <span className="text-sm font-medium text-gray-500 ml-1">/dia</span>
                </div>
              )}
            </div>
            
            <div className="text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Ver detalhes &rarr;
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
