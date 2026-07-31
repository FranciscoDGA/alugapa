import { notFound } from "next/navigation";
import { LocationService } from "@/services/LocationService";
import { CategoryService } from "@/services/CategoryService";
import StateView from "./StateView";
import CategoryView from "./CategoryView";

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Tentar achar Estado
  try {
    const state = await LocationService.getState(slug);
    if (state) {
      return <StateView state={state} />;
    }
  } catch (e) {
    // IGNORA, não é estado
  }

  // 2. Tentar achar Categoria
  try {
    const category = await CategoryService.getCategory(slug);
    if (category) {
      return <CategoryView category={category} />;
    }
  } catch (e) {
    // IGNORA
  }

  // Se não achar nenhum dos dois, é 404
  notFound();
}
