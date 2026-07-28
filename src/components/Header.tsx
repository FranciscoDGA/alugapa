import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tighter text-blue-600">
          AlugaPA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/buscar" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Buscar
          </Link>
          <Link href="/categorias" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Categorias
          </Link>
          <Link href="/empresas" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Empresas
          </Link>
          <Link href="/cidades" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Cidades
          </Link>
        </nav>

        {/* Call to Action */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/orcamento" className="text-sm font-medium text-blue-600 hover:underline">
            Solicitar Orçamento
          </Link>
          <Link href="/dashboard" className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Anunciar
          </Link>
        </div>
      </div>
    </header>
  );
}
