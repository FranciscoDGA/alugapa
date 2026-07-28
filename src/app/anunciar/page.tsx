"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Target, ShieldCheck, Zap, ChevronRight, Check } from "lucide-react";
import Link from "next/link";

export default function AnunciarPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Alcance Nacional",
      description: "Sua frota visÃ­vel para locatÃ¡rios de todo o Brasil."
    },
    {
      icon: Users,
      title: "Leads Qualificados",
      description: "Receba pedidos de orÃ§amento detalhados e diretos no seu WhatsApp."
    },
    {
      icon: ShieldCheck,
      title: "PresenÃ§a Verificada",
      description: "Gere confianÃ§a com o selo de Empresa Verificada AlugaPA."
    },
    {
      icon: Zap,
      title: "Mini-site AutomÃ¡tico",
      description: "Seu perfil se torna um site otimizado para o Google (SEO)."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-900/40 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold mb-6 border border-blue-500/30">
              Para Locadoras e Prestadores de ServiÃ§o
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Transforme sua frota parada em <span className="text-blue-500">lucro constante</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Cadastre sua empresa no AlugaPA e conecte-se com clientes que estÃ£o buscando equipamentos e serviÃ§os exatamente onde vocÃª atende.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#planos" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                Ver Planos e PreÃ§os <ChevronRight size={20} />
              </Link>
              <Link href="/login" className="bg-transparent border-2 border-gray-700 hover:border-gray-500 text-white font-bold px-8 py-4 rounded-xl transition-all text-center">
                JÃ¡ tenho cadastro
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Por que estar no AlugaPA?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Nossa plataforma foi desenhada para colocar a sua empresa como protagonista, atraindo o cliente ideal.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing / Planos */}
      <section id="planos" className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Escolha o plano ideal</h2>
            <p className="text-gray-600 mt-4">Cancele quando quiser. Sem taxas escondidas.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Gratuito */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative">
              <h3 className="text-xl font-bold text-gray-900">BÃ¡sico</h3>
              <p className="text-gray-500 text-sm mt-2 mb-6">Para quem estÃ¡ comeÃ§ando</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-gray-900">GrÃ¡tis</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-gray-600 text-sm"><Check className="text-green-500 shrink-0" size={20}/> Perfil da Empresa (BÃ¡sico)</li>
                <li className="flex gap-3 text-gray-600 text-sm"><Check className="text-green-500 shrink-0" size={20}/> AtÃ© 3 anÃºncios</li>
                <li className="flex gap-3 text-gray-600 text-sm"><Check className="text-green-500 shrink-0" size={20}/> Recebimento de OrÃ§amentos</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
                Criar Conta GrÃ¡tis
              </button>
            </div>

            {/* Profissional */}
            <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-600/20 relative transform md:-translate-y-4 border-2 border-blue-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                Mais Escolhido
              </div>
              <h3 className="text-xl font-bold text-white">Profissional</h3>
              <p className="text-blue-100 text-sm mt-2 mb-6">PresenÃ§a digital completa</p>
              <div className="mb-8">
                <span className="text-sm text-blue-200">R$</span>
                <span className="text-4xl font-extrabold text-white">149</span>
                <span className="text-blue-200">/mÃªs</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-white text-sm"><Check className="text-cyan-300 shrink-0" size={20}/> Selo Empresa Verificada</li>
                <li className="flex gap-3 text-white text-sm"><Check className="text-cyan-300 shrink-0" size={20}/> AnÃºncios Ilimitados</li>
                <li className="flex gap-3 text-white text-sm"><Check className="text-cyan-300 shrink-0" size={20}/> Mini-site SEO Otimizado</li>
                <li className="flex gap-3 text-white text-sm"><Check className="text-cyan-300 shrink-0" size={20}/> Acesso ao Radar de Oportunidades</li>
                <li className="flex gap-3 text-white text-sm"><Check className="text-cyan-300 shrink-0" size={20}/> BotÃ£o WhatsApp Direto</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-bold text-blue-600 bg-white hover:bg-gray-50 transition-colors shadow-lg">
                Assinar Profissional
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative">
              <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
              <p className="text-gray-500 text-sm mt-2 mb-6">Para grandes frotas e locadoras</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-gray-900">Personalizado</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-gray-600 text-sm"><Check className="text-blue-600 shrink-0" size={20}/> Tudo do plano Profissional</li>
                <li className="flex gap-3 text-gray-600 text-sm"><Check className="text-blue-600 shrink-0" size={20}/> IntegraÃ§Ã£o via API/ERP</li>
                <li className="flex gap-3 text-gray-600 text-sm"><Check className="text-blue-600 shrink-0" size={20}/> Equipe e Multi-usuÃ¡rios</li>
                <li className="flex gap-3 text-gray-600 text-sm"><Check className="text-blue-600 shrink-0" size={20}/> Suporte Dedicado</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                Falar com Consultor
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
