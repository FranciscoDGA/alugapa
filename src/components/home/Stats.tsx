export default function Stats() {
  const stats = [
    { value: "4.500+", label: "Empresas Cadastradas" },
    { value: "12.000+", label: "Equipamentos Disponíveis" },
    { value: "15+", label: "Estados Atendidos" },
    { value: "R$ 50M+", label: "em Negócios Gerados" }
  ];

  return (
    <section className="bg-blue-600 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-blue-500/50">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl md:text-5xl font-extrabold mb-2">{stat.value}</span>
              <span className="text-blue-100 text-sm md:text-base font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
