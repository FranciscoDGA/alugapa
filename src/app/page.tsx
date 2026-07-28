export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Encontre <span className="text-blue-600">Equipamentos</span> e <span className="text-blue-600">Serviços</span> Especializados
        </h1>
        <p className="text-lg text-gray-600">
          A infraestrutura digital para conectar sua necessidade aos melhores fornecedores do mercado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a href="/buscar" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Fazer uma Busca
          </a>
          <a href="/orcamento" className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors">
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </div>
  );
}
