import { notFound } from "next/navigation";
import { CategoryService } from "@/services/CategoryService";

export default async function SubCategoryPage({ params }: { params: Promise<{ slug: string, subslug: string }> }) {
  const { slug, subslug } = await params;

  try {
    const parent = await CategoryService.getCategory(slug);
    const child = await CategoryService.getCategory(subslug); // Na v1 não há hierarquia forte, mas mockando comportamento

    if (!parent || !child) {
      notFound();
    }

    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">{child.name} em {parent.name}</h1>
        {/* Filtros da subcategoria */}
      </div>
    );
  } catch (e) {
    notFound();
  }
}
