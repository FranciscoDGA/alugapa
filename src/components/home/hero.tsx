import { SearchBar } from "@/components/search/search-bar";
import { MoveRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary pt-24 pb-32 lg:pt-32 lg:pb-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V0H40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in-up text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            A Maior Rede de Aluguel de <span className="text-accent">Equipamentos</span> do Brasil
          </h1>
          <p className="animate-fade-in-up mt-6 max-w-2xl mx-auto text-lg text-blue-100 sm:text-xl" style={{ animationDelay: '0.1s' }}>
            Encontre máquinas pesadas, geradores, plataformas e ferramentas para a sua obra ou evento, direto com fornecedores verificados.
          </p>

          <div className="animate-fade-in-up mt-10 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            {/* Search Bar Placeholder */}
            <div className="glass rounded-2xl p-2 sm:p-3">
              <SearchBar />
            </div>
          </div>

          <div className="animate-fade-in-up mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-white/80" style={{ animationDelay: '0.3s' }}>
            <span className="flex items-center gap-1">Mais buscados:</span>
            <button className="hover:text-accent transition-colors">Retroescavadeiras</button>
            <span>&bull;</span>
            <button className="hover:text-accent transition-colors">Geradores</button>
            <span>&bull;</span>
            <button className="hover:text-accent transition-colors">Plataformas Articuladas</button>
          </div>
        </div>
      </div>
    </section>
  );
}
