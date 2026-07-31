import { State } from "@prisma/client";

export default function StateView({ state }: { state: State }) {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Equipamentos para Alugar em {state.name}</h1>
      <p className="text-gray-600 mb-8">Encontre as melhores locadoras de {state.name}.</p>
      {/* Aqui virão os filtros/resultados filtrados por estado */}
    </div>
  );
}
