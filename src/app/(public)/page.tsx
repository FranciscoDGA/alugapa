import Link from "next/link";
import { Hammer, Sprout, Zap, Truck, Activity, Leaf, Building, Package, Droplet, Mountain, Search, MapPin, CheckCircle2, Star } from "lucide-react";
import { WaitlistForm } from "@/components/home/waitlist-form";

const CATEGORIES = [
  { name: "Construção", icon: Hammer, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Agro", icon: Sprout, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Energia", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "Transporte", icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Saúde", icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Ambiental", icon: Leaf, color: "text-slate-500", bg: "bg-slate-50" },
  { name: "Comercial", icon: Building, color: "text-teal-500", bg: "bg-teal-50" },
  { name: "Logística", icon: Package, color: "text-red-500", bg: "bg-red-50" },
  { name: "Saneamento", icon: Droplet, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Mineração", icon: Mountain, color: "text-sky-500", bg: "bg-sky-50" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56">
        {/* Background Image with City Skyline */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-[#1e2130]/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1f2e] via-[#1c1f2e]/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-2 leading-none animate-fade-in-up">
              Encontre o que você precisa.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 pb-2 inline-block">
                Onde você precisa.
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 animate-fade-in-up font-medium" style={{ animationDelay: '0.1s' }}>
              Encontre máquinas e equipamentos onde você estiver de forma rápida e segura.
            </p>

            {/* Search Bar - White Pill */}
            <div className="bg-white rounded-full p-2 flex flex-col sm:flex-row items-center max-w-4xl mx-auto shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex-1 flex items-center px-6 py-3 w-full border-b sm:border-b-0 sm:border-r border-gray-200">
                <Search className="text-gray-400 w-5 h-5 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="O que você busca?" 
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 outline-none text-lg font-medium"
                />
              </div>
              <div className="flex-1 flex items-center px-6 py-3 w-full">
                <MapPin className="text-gray-400 w-5 h-5 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Onde?" 
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 outline-none text-lg font-medium"
                />
              </div>
              <button className="w-full sm:w-auto mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-colors shrink-0 text-lg">
                Buscar
              </button>
            </div>

            {/* Tags - Dark Pills */}
            <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {["Asfalto", "Saneamento", "Mineração", "Manejo", "Pavimentação", "Construção", "Logística"].map(tag => (
                <span key={tag} className="text-sm font-semibold text-slate-300 bg-[#2b2e40] hover:bg-white/20 transition-colors px-5 py-2 rounded-full cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">O que você precisa está aqui.</h2>
            <p className="text-lg text-slate-500">
              Equipamentos de grande porte para sua obra. Os melhores equipamentos estão na AlugaPA.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link href={`/categoria/${cat.name.toLowerCase()}`} key={idx} className="bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all rounded-[2rem] p-6 flex flex-col items-center justify-center text-center group cursor-pointer block">
                  <div className={`w-14 h-14 rounded-[1rem] flex items-center justify-center mb-4 ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-[15px] group-hover:text-blue-600 transition-colors mb-1">{cat.name}</h3>
                  <span className="text-[13px] text-slate-400">{Math.floor(Math.random() * 200 + 50)} anúncios</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Dark Pain Point Section */}
      <section className="py-24 bg-slate-950 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Encontrar equipamentos especializados ainda é difícil.
            </h2>
            <p className="text-lg md:text-xl text-slate-400">
              Muitas empresas perdem dias procurando fornecedores confiáveis. O AlugaPA conecta os equipamentos, serviços especializados e empresas verificadas em um único lugar.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Como funciona */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Como funciona</h2>
            <p className="text-lg text-slate-500">
              O jeito mais rápido e seguro de alugar máquinas. Em poucos passos, sempre que precisar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {/* Linha conectora desktop */}
            <div className="hidden md:block absolute top-10 left-12 right-12 h-0.5 bg-gray-200"></div>
            
            {[
              { num: "1", title: "Pesquise", desc: "Busque os equipamentos e serviços necessários para sua obra.", color: "text-blue-600" },
              { num: "2", title: "Encontre fornecedores", desc: "Veja fornecedores verificados em nossa plataforma.", color: "text-orange-500" },
              { num: "3", title: "Solicite orçamento", desc: "Fale com as locadoras em poucos cliques.", color: "text-purple-600" },
              { num: "4", title: "Feche negócio", desc: "Alugue com as melhores condições e pague com segurança.", color: "text-emerald-500" }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full bg-white border border-gray-100 shadow-xl flex items-center justify-center text-3xl font-black ${step.color} mb-6 relative z-10`}>
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Muito mais que um marketplace */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-blue-600 tracking-widest uppercase mb-4 bg-blue-50 px-3 py-1 rounded-full">Novidade</span>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Muito mais que um marketplace.</h3>
            <p className="text-lg text-slate-500">
              O AlugaPA conecta empresas, fornecedores e oportunidades, utilizando tecnologia para tornar as solicitações de equipamentos mais rápidas, seguras e inteligentes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Para quem precisa */}
            <div className="bg-blue-50/50 rounded-3xl p-8 md:p-12 border border-blue-100 flex flex-col">
              <h4 className="text-2xl font-black text-slate-900 mb-4">
                Para quem <span className="text-blue-600">precisa</span>
              </h4>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Encontre locadoras, compare propostas de equipamentos da sua região e faça negócios diretos com locadoras de confiança.
              </p>
              <ul className="space-y-4 mb-10 flex-1">
                {["Busca inteligente na sua região", "Orçamentos em 1 clique", "Conexão direta pelo WhatsApp", "Sem comissão ou taxas ocultas"].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/buscar" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 w-full md:w-auto mt-auto text-center">
                Quero Alugar Equipamentos &rarr;
              </Link>
            </div>

            {/* Para quem possui */}
            <div className="bg-orange-50/50 rounded-3xl p-8 md:p-12 border border-orange-100 flex flex-col">
              <h4 className="text-2xl font-black text-slate-900 mb-4">
                Para quem <span className="text-orange-500">possui</span>
              </h4>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Disponibilize seus equipamentos, receba orçamentos de empresas verificadas e maximize o faturamento da sua frota ociosa.
              </p>
              <ul className="space-y-4 mb-10 flex-1">
                {["Vitrine qualificada 24/7", "Receba solicitações via WhatsApp", "Painel de gestão de leads B2B", "Redução do tempo de frota parada"].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/anunciar" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/25 w-full md:w-auto mt-auto text-center">
                Quero Anunciar minha Frota &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Acesso Antecipado */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
            </div>
            <div className="bg-blue-900/40 border border-blue-500/30 text-blue-300 font-medium px-4 py-1.5 rounded-full text-sm mb-6">
              Mais de 120 empresas já estão na lista de espera
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
              Acesso Antecipado
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl text-center">
              Cadastre-se para garantir condições exclusivas e acesso antecipado ao maior hub de locação digital do Brasil.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>

    </div>
  );
}
