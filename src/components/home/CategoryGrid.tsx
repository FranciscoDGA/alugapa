import { Tractor, Pickaxe, Zap, Truck, PartyPopper, Factory, Box, HeartPulse, HardHat, Rocket } from "lucide-react";

const categories = [
  { id: 1, name: "Agro", icon: Tractor, color: "bg-emerald-100 text-emerald-700" },
  { id: 2, name: "Construção", icon: Pickaxe, color: "bg-orange-100 text-orange-700" },
  { id: 3, name: "Energia", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
  { id: 4, name: "Transporte", icon: Truck, color: "bg-blue-100 text-blue-700" },
  { id: 5, name: "Eventos", icon: PartyPopper, color: "bg-purple-100 text-purple-700" },
  { id: 6, name: "Industrial", icon: Factory, color: "bg-gray-200 text-gray-800" },
  { id: 7, name: "Containers", icon: Box, color: "bg-teal-100 text-teal-700" },
  { id: 8, name: "Hospitalar", icon: HeartPulse, color: "bg-rose-100 text-rose-700" },
  { id: 9, name: "Engenharia", icon: HardHat, color: "bg-indigo-100 text-indigo-700" },
  { id: 10, name: "Tecnologia", icon: Rocket, color: "bg-sky-100 text-sky-700" },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore por Categorias</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encontre exatamente o que sua empresa precisa através das nossas categorias especializadas de ativos e serviços.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a 
                key={cat.id} 
                href={`/categorias/${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
