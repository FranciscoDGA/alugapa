import { Radar, ArrowRight } from "lucide-react";

export default function CtaRadar() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          
          {/* Radar animation decorative element */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 hidden md:block">
            <Radar className="w-64 h-64 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>

          <div className="relative z-10 md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-800/50 border border-blue-500/30 rounded-full text-blue-200 text-sm font-semibold mb-6 backdrop-blur-sm">
              <Radar className="w-4 h-4" />
              <span>Radar de Oportunidades</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Não encontrou o que procurava? Nós achamos para você.
            </h2>
            
            <p className="text-blue-100 mb-8 text-lg">
              Deixe sua necessidade registrada. Nosso sistema notifica empresas parceiras e avisa você assim que houver disponibilidade na sua região.
            </p>
            
            <a href="/orcamento" className="inline-flex items-center justify-center bg-white text-blue-900 hover:bg-gray-50 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-xl shadow-black/20">
              Registrar Necessidade
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
