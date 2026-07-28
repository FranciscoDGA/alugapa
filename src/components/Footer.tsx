export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-xl text-blue-600 mb-4">AlugaPA</h3>
            <p className="text-sm text-gray-500">
              Infraestrutura Digital de Descoberta de Equipamentos e Serviços Especializados.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900">Plataforma</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/buscar" className="hover:text-blue-600">Buscar Equipamentos</a></li>
              <li><a href="/categorias" className="hover:text-blue-600">Explorar Categorias</a></li>
              <li><a href="/cidades" className="hover:text-blue-600">Cidades Atendidas</a></li>
              <li><a href="/empresas" className="hover:text-blue-600">Empresas Verificadas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900">Para Empresas</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/dashboard" className="hover:text-blue-600">Criar Conta</a></li>
              <li><a href="/planos" className="hover:text-blue-600">Planos e Preços</a></li>
              <li><a href="/orcamento" className="hover:text-blue-600">Receber Orçamentos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-900">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/faq" className="hover:text-blue-600">Perguntas Frequentes</a></li>
              <li><a href="/contato" className="hover:text-blue-600">Fale Conosco</a></li>
              <li><a href="/termos" className="hover:text-blue-600">Termos de Uso</a></li>
              <li><a href="/privacidade" className="hover:text-blue-600">Privacidade</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} AlugaPA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
