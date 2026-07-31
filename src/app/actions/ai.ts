"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * AI Discovery Engine (Phase 04)
 * Recebe uma requisição natural (ex: "Vou construir uma ponte e preciso de força")
 * e retorna uma lista de IDs de categorias recomendadas e uma mensagem amigável.
 */
export async function discoverEquipment(prompt: string) {
  try {
    // 1. Get all available categories to pass to the AI as context
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true }
    });

    const categoryContext = categories.map(c => `- ${c.name} (ID: ${c.id})`).join("\n");

    const systemPrompt = `
      Você é um especialista em equipamentos de construção e maquinário pesado do AlugaPA.
      O usuário vai descrever um problema ou projeto que ele está realizando.
      Sua tarefa é recomendar as categorias de equipamentos adequadas para a necessidade dele.
      
      Categorias Disponíveis no AlugaPA:
      ${categoryContext}
      
      Responda ESTRITAMENTE em formato JSON com a seguinte estrutura:
      {
        "message": "Uma frase curta e amigável sugerindo os equipamentos ideais",
        "recommendedCategoryIds": ["id-aqui", "outro-id-aqui"],
        "searchQuery": "Uma query curta (2-3 palavras) que o sistema usará para buscar no banco (ex: Escavadeira)"
      }
      Não inclua marcação markdown como \`\`\`json, apenas o JSON cru.
    `;

    const response = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: prompt,
    });

    // Parse the JSON response
    const aiData = JSON.parse(response.text.trim());

    // Fallback if parsing fails or structure is wrong handled by try-catch
    return { 
      success: true, 
      message: aiData.message, 
      categoryIds: aiData.recommendedCategoryIds || [],
      searchQuery: aiData.searchQuery || prompt
    };

  } catch (error) {
    console.error("AI Discovery Error:", error);
    return { 
      success: false, 
      error: "Não conseguimos processar sua requisição no momento.",
      fallbackQuery: prompt 
    };
  }
}
