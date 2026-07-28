import { Star, MapPin, CheckCircle } from "lucide-react";

export default function FeaturedSection() {
  const featured = [
    {
      id: 1,
      title: "Gerador 250 kVA Silenciado",
      company: "Energia Locações",
      city: "Marabá, PA",
      image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=600&auto=format&fit=crop",
      rating: 4.9,
      type: "Equipamento",
      verified: true
    },
    {
      id: 2,
      title: "Retroescavadeira CAT 416F2",
      company: "MaqPesada",
      city: "Redenção, PA",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073e0f?q=80&w=600&auto=format&fit=crop",
      rating: 4.8,
      type: "Equipamento",
      verified: true
    },
    {
      id: 3,
      title: "Perfuração de Poço Artesiano",
      company: "Águas Profundas",
      city: "Parauapebas, PA",
      image: "https://images.unsplash.com/photo-1541888086925-eb97a15998bd?q=80&w=600&auto=format&fit=crop",
      rating: 5.0,
      type: "Serviço",
      verified: true
    },
    {
      id: 4,
      title: "Caminhão Munck 12 Toneladas",
      company: "Logística Norte",
      city: "Xinguara, PA",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop",
      rating: 4.7,
      type: "Equipamento",
      verified: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Destaques da Plataforma</h2>
            <p className="text-gray-600">Equipamentos e serviços mais buscados na sua região.</p>
          </div>
          <a href="/buscar" className="hidden md:block text-blue-600 font-semibold hover:underline">
            Ver todos &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                  {item.type}
                </div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-4 mt-auto pt-2">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {item.city}
                </div>

                <div className="w-full h-px bg-gray-100 mb-4"></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mr-2">
                      {item.company.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 flex items-center">
                        {item.company}
                        {item.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500 ml-1" />}
                      </p>
                      <div className="flex items-center text-xs text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="ml-1 font-medium text-gray-700">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="/buscar" className="inline-block bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-xl w-full">
            Ver todos os anúncios
          </a>
        </div>
      </div>
    </section>
  );
}
