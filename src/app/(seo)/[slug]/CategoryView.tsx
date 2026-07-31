import { Category } from "@prisma/client";

export default function CategoryView({ category }: { category: Category }) {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{category.seoTitle || category.name}</h1>
      <p className="text-gray-600 mb-8">{category.seoDescription || `Encontre tudo para ${category.name}.`}</p>
      {/* Aqui virão os filtros/resultados filtrados por categoria */}
    </div>
  );
}
