import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ignorar arquivos estáticos e imagens
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const hostname = request.headers.get('host') || '';
  
  // Lógica de Isolamento: Extrair subdomínio (Ex: sp.alugapa.com.br -> 'sp')
  let tenantSlug = 'global'; // Tenant Matriz padrão
  
  // Tratamento básico para domínios de desenvolvimento e produção
  const cleanHost = hostname.replace('.localhost:3000', '').replace('.alugapa.com.br', '');
  
  if (cleanHost && cleanHost !== 'localhost:3000' && cleanHost !== 'alugapa.com.br') {
    tenantSlug = cleanHost;
  }

  // Clona os headers e injeta a variável de Tenant
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-slug', tenantSlug);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
