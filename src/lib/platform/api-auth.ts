import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ApiAuthEngine {
  
  /**
   * Valida o token Bearer e retorna o ID da empresa associada.
   */
  static async validateKey(authorizationHeader?: string | null): Promise<string | null> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authorizationHeader.replace('Bearer ', '');
    
    // Num cenário real, o token deve ser "hacheado" antes de buscar no banco.
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { key: token }
    });

    if (!apiKeyRecord) {
      return null;
    }

    // Atualizar lastUsed assíncronamente
    prisma.apiKey.update({
      where: { id: apiKeyRecord.id },
      data: { lastUsed: new Date() }
    }).catch(() => {});

    return apiKeyRecord.companyId;
  }
}
