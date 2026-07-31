import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TenantEngine {
  
  /**
   * Identifica o Tenant (Operação/Franquia) ativo na requisição atual.
   * Lê o cabeçalho 'x-tenant-slug' injetado pelo Middleware.
   */
  static async getCurrentTenant() {
    const headersList = await headers();
    const slug = headersList.get('x-tenant-slug') || 'global';

    // No MVP, se não encontrar o Tenant no banco, retornamos um mock padrão 
    // para não quebrar a aplicação durante o desenvolvimento.
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { slug }
      });
      
      if (tenant) return tenant;
    } catch (e) {
      console.error('[TenantEngine] Erro ao buscar Tenant no banco', e);
    }

    // Fallback Mock (Global)
    return {
      id: 'global-123',
      slug: 'global',
      name: 'AlugaPA',
      domain: 'alugapa.com.br',
      themeColor: 'blue'
    };
  }

  /**
   * Retorna os filtros do Prisma para queries isoladas.
   */
  static async getTenantFilter() {
    const tenant = await this.getCurrentTenant();
    if (tenant.slug === 'global') {
      return {}; // Global admin vê tudo
    }
    return { tenantId: tenant.id };
  }
}
