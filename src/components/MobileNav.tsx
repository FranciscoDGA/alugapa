import Link from 'next/link';

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        <Link href="/" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600">
          <span className="text-xs font-medium">Início</span>
        </Link>
        
        <Link href="/buscar" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600">
          <span className="text-xs font-medium">Buscar</span>
        </Link>
        
        <Link href="/categorias" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600">
          <span className="text-xs font-medium">Categorias</span>
        </Link>
        
        <Link href="/orcamento" className="flex flex-col items-center gap-1 text-blue-600">
          <span className="text-xs font-medium">Orçamentos</span>
        </Link>
        
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600">
          <span className="text-xs font-medium">Conta</span>
        </Link>
      </div>
    </nav>
  );
}
