import { Search, GitCompare, MessageSquare, Handshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "1. Pesquise",
      desc: "Busque pelo equipamento ou serviço exato que você precisa em nossa plataforma."
    },
    {
      icon: GitCompare,
      title: "2. Compare",
      desc: "Analise avaliações, especificações e o perfil das empresas fornecedoras."
    },
    {
      icon: MessageSquare,
      title: "3. Entre em contato",
      desc: "Fale diretamente com o fornecedor via WhatsApp ou solicite um orçamento."
    },
    {
      icon: Handshake,
      title: "4. Feche negócio",
      desc: "Negocie diretamente sem intermediários e garanta o melhor negócio."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Como o AlugaPA funciona?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uma plataforma desenhada para conectar sua necessidade aos melhores fornecedores em apenas 4 passos simples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -z-10 -translate-y-1/2 transform"></div>
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 mb-6 relative">
                  <div className="absolute inset-0 bg-blue-50 rounded-full scale-0 hover:scale-100 transition-transform duration-300 ease-out origin-center -z-10"></div>
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
