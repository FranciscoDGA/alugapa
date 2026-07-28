# PRD 01 — Product Requirements Document
## AlugaPA v1.0
**Documento Mestre do Produto**

- **Versão:** 1.0
- **Status:** Em Aprovação
- **Prioridade:** Crítica

---

## 1. Visão do Produto

**Nome**
AlugaPA (Plataforma de Descoberta de Ativos Especializados)

**Missão**
Conectar pessoas e empresas que precisam encontrar equipamentos, máquinas e serviços especializados de difícil acesso, reduzindo tempo de busca, aumentando a visibilidade das empresas e gerando oportunidades de negócio.

**Visão**
Ser a principal plataforma brasileira (Infraestrutura Digital) para descoberta, locação e contratação de equipamentos e serviços especializados.

**Problema**
O mercado é fragmentado. Hoje um usuário precisa pesquisar em diversos locais: Google, WhatsApp, Facebook, OLX, Indicações, Sites individuais. Não existe uma plataforma especializada.

**Solução**
Criar uma plataforma inteligente que centralize: Empresas, Equipamentos, Serviços, Avaliações, Disponibilidade, Contatos, Conteúdo especializado.

---

## 2. Objetivos do Produto
- Centralizar ofertas especializadas.
- Facilitar a busca.
- Gerar leads qualificados.
- Aumentar a presença digital das empresas.
- Construir autoridade em SEO.

---

## 3. Objetivos do MVP
O MVP deve validar:
- Empresas querem anunciar.
- Usuários conseguem encontrar fornecedores.
- Há geração de contatos.
- Existe disposição para pagar por planos premium.

---

## 4. Fora do Escopo (MVP)
Não serão implementados inicialmente:
- Pagamento de aluguel pela plataforma.
- Chat interno.
- Aplicativos nativos.
- API pública.
- Leilões.
- Agenda de disponibilidade em tempo real.
- Integrações com ERPs.
*(Esses itens ficam para fases posteriores).*

---

## 5. Usuários do Sistema

**Visitante**
- *Pode:* Pesquisar, Navegar, Ver empresas, Ver anúncios, Compartilhar páginas, Solicitar Orçamento (Central de Necessidades).
- *Não pode:* Publicar anúncios, Alterar dados, Avaliar empresas.

**Usuário Cadastrado**
- *Pode:* Favoritar anúncios, Solicitar contato, Avaliar após interação, Gerenciar perfil.

**Empresa**
- *Pode:* Criar perfil, Publicar anúncios, Editar informações, Acompanhar métricas, Assinar planos, Receber solicitações de orçamento.

**Administrador**
- *Pode:* Gerenciar empresas, Moderar anúncios, Gerenciar categorias, Gerenciar cidades, Publicar conteúdo, Visualizar métricas, Configurar planos.

---

## 6. Personas

**Quem procura:**
Fazendas, Construtoras, Prefeituras, Organizadores de eventos, Indústrias, Empresas de logística.

**Quem anuncia (Ativos e Serviços Especializados):**
Locadoras, Empresas de máquinas, Prestadores especializados, Empresas de energia, Empresas agrícolas, Empresas de transporte.

---

## 7. Escopo Funcional

**Website Público**
Homepage, Busca, Categorias, Cidades, Empresas, Landing Pages, Blog, Solicitar Orçamento.

**Marketplace**
Listagem de anúncios, Filtros, Busca, Destaques, Avaliações.

**Dashboard Empresarial**
Perfil, Anúncios, Estatísticas, Plano, Faturamento, Solicitações de Orçamento.

**Administração**
Usuários, Empresas, Conteúdo, Categorias, Financeiro, SEO.

---

## 8. Fluxos Principais

**Fluxo do Visitante**
Google → Landing Page → Busca → Resultados → Empresa → WhatsApp → Negócio

**Fluxo do Anunciante**
Cadastro → Perfil → Plano → Criar anúncio → Receber contatos → Renovar assinatura

**Fluxo de Solicitação de Orçamento (Central de Necessidades)**
Usuário informa o que precisa → Define cidade e detalhes → Sistema envia para empresas compatíveis → Empresas respondem diretamente ao cliente.

---

## 9. Funcionalidades Obrigatórias do MVP

**Busca inteligente:** Por Cidade, Categoria, Palavra-chave.
**Empresas:** Perfil próprio, Fotos, WhatsApp, Endereço, Serviços, Equipamentos.
**Anúncios (Ativos e Serviços):** Fotos, Descrição, Categoria, Cidade, Empresa, CTA, Compartilhamento.
**SEO:** URL amigável, Meta Title, Meta Description, Structured Data, Sitemap.
**Solicitar Orçamento:** Formulário de captação de demandas e distribuição para fornecedores.

---

## 10. Requisitos Funcionais
- **RF001** — Cadastro de usuários.
- **RF002** — Cadastro de empresas.
- **RF003** — Cadastro de anúncios (Ativos / Serviços Especializados).
- **RF004** — Busca por cidade.
- **RF005** — Busca por categoria.
- **RF006** — Busca textual.
- **RF007** — Dashboard empresarial.
- **RF008** — Painel administrativo.
- **RF009** — Assinaturas.
- **RF010** — Analytics básico.
- **RF011** — Sistema de Solicitação de Orçamentos.

---

## 11. Requisitos Não Funcionais
- Mobile First.
- PWA.
- Alto desempenho (Core Web Vitals otimizados).
- Acessibilidade (WCAG AA).
- SEO programático.
- Segurança baseada em RLS.
- LGPD.
- Escalabilidade nacional.
- Observabilidade e logs.

---

## 12. Regras de Negócio
- Todo anúncio pertence a uma empresa.
- Toda empresa pertence a uma cidade.
- Toda cidade pertence a um estado.
- Todo anúncio deve estar vinculado a uma categoria (Ativo ou Serviço).
- Empresas podem possuir múltiplos anúncios.
- O plano contratado define os limites de uso.

---

## 13. KPIs
- Visitantes únicos.
- Empresas cadastradas.
- Anúncios ativos.
- Leads gerados.
- Cliques em WhatsApp.
- Conversão para planos pagos.
- MRR, CAC, LTV.
- Taxa de retenção.

---

## 14. Critérios de Aceite do MVP
O MVP será considerado pronto quando:
1. Usuários conseguirem encontrar empresas em poucos passos.
2. O fluxo de "Solicitar Orçamento" gerar leads com sucesso.
3. Empresas conseguirem publicar anúncios sem suporte manual.
4. O painel administrativo permitir gestão completa da plataforma.
5. O SEO estiver funcional para páginas de cidade, categoria e empresa.
6. O sistema apresentar bom desempenho em dispositivos móveis.

---

## 15. Dependências Técnicas
- Frontend em Next.js.
- Backend integrado ao Supabase.
- Autenticação.
- Banco PostgreSQL.
- Armazenamento de imagens.
- Serviço de e-mail.
- Integração com gateway de pagamento para assinaturas.
- Analytics.

---

## 16. Riscos & Mitigações
- **Baixa oferta inicial de empresas:** Mitigado pelo recurso de Solicitar Orçamento e programa de empresas fundadoras.
- **Pouca atualização dos anúncios:** Mitigado por monitoramento de anúncios.
- **Crescimento desigual entre cidades:** Prospecção ativa nas regiões chave.
- **Dependência excessiva de SEO no início:** Diversificação dos canais de aquisição.

---

## 17. Roadmap

**MVP**
Cadastro, Busca, Empresas, Anúncios, Dashboard, SEO, Solicitação de Orçamento.

**Growth**
IA, Avaliações, Blog, Analytics avançado.

**Enterprise**
API, White Label, Aplicativos, Integrações (ERPs), Cotação Online, Reservas em Tempo Real.
