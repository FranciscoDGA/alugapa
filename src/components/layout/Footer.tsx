import Link from "next/link";
import { Search, MessageCircle, Share2, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 inline-flex">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Search size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Aluga<span className="text-blue-500">PA</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              A maior infraestrutura digital para locação de máquinas, equipamentos pesados e serviços especializados no Brasil.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="/contato" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </Link>
              <Link href="/sobre" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Share2 size={20} />
              </Link>
              <Link href="/sobre" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Globe size={20} />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/buscar" className="hover:text-blue-400 transition-colors">Buscar Equipamentos</Link></li>
              <li><Link href="/empresas" className="hover:text-blue-400 transition-colors">Diretório de Empresas</Link></li>
              <li><Link href="/orcamento" className="hover:text-blue-400 transition-colors">Solicitar Orçamento</Link></li>
              <li><Link href="/radar" className="hover:text-blue-400 transition-colors">Radar de Oportunidades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Para Empresas</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/anunciar" className="hover:text-blue-400 transition-colors">Anunciar Frota</Link></li>
              <li><Link href="/planos" className="hover:text-blue-400 transition-colors">Planos e Preços</Link></li>
              <li><Link href="/cases" className="hover:text-blue-400 transition-colors">Casos de Sucesso</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Portal do Cliente</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/sobre" className="hover:text-blue-400 transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-blue-400 transition-colors">Contato</Link></li>
              <li><Link href="/termos" className="hover:text-blue-400 transition-colors">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="hover:text-blue-400 transition-colors">Privacidade</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AlugaPA. Todos os direitos reservados.</p>
          <p>Feito para impulsionar o Brasil 🇧🇷</p>
        </div>
      </div>
    </footer>
  );
}
