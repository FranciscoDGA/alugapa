# PRD 03 — Website Público

**Projeto:** AlugaPA
**Versão:** 1.0
**Status:** Documento Funcional
**Prioridade:** Máxima

---

## 1. Objetivo
O Website Público é responsável por atrair visitantes, convertê-los em leads e empresas em anunciantes. Deve dominar o SEO nacional e ser a principal porta de entrada do ecossistema AlugaPA, transmitindo confiança, velocidade e profissionalismo.

## 2. Objetivos de Negócio
- Gerar tráfego orgânico e solicitações de orçamento.
- Gerar contatos via WhatsApp.
- Converter empresas em assinantes.
- Educar o mercado.

---

## 3. Estrutura Global
```
Header
├── Logo
├── Busca Inteligente
├── Categorias
├── Cidades
├── Blog
├── Para Empresas
├── Planos
├── Entrar
└── Anunciar
```

## 4. Header
Sempre fixo (Sticky).
- Logo, Busca, Categorias, Estados.
- Botões: **Solicitar Orçamento** e **Anunciar Empresa**.
- Perfil do usuário e Menu Mobile.

---

## 5. Hero Section (A parte mais importante da Home)
Deve responder imediatamente: *O que você procura hoje?*
- Texto: Encontre máquinas, equipamentos e serviços especializados em todo o Brasil.
- Campo de busca gigante com suporte a linguagem natural (Ex: "Preciso de um gerador para evento em Marabá").
- Placeholders dinâmicos: Retroescavadeira, Gerador, Drone Agrícola, Poço Artesiano, Munck.

## 6. Categorias Premium
Cards grandes com ícones próprios:
🚜 Agro | 🏗 Construção | ⚡ Energia | 🚛 Transporte | 🎉 Eventos | 🏭 Industrial | 📦 Containers | 🏥 Hospitalar | 🌍 Engenharia | 🛰 Tecnologia

---

## 7. Componentes de Destaque na Home
- **Busca Inteligente:** Principal CTA. Filtros por Estado, Cidade, Categoria, Subcategoria, Empresa Verificada, Urgência.
- **Equipamentos e Serviços em Destaque:** Cards com Imagem, Cidade, Empresa, Botão "Ver detalhes".
- **Empresas Verificadas:** Mostrar Logo, Avaliação, Cidade, Categorias, Tempo na plataforma, Botão "Ver empresa".
- **Como Funciona:** Pesquise → Compare → Entre em contato → Feche negócio.
- **Estatísticas:** Dados reais (Empresas cadastradas, Equipamentos, Leads gerados, etc.).
- **Depoimentos:** Empresas, Clientes, Casos reais.

## 8. Solicitar Orçamento e Radar de Oportunidades (Crucial)
Além do formulário rápido (Categoria, Cidade, Descrição, Data, Contato), o sistema conta com o **Radar de Oportunidades**:
- Salva demandas não atendidas imediatamente.
- Notifica empresas cadastradas quando houver compatibilidade.
- Avisa o usuário quando um novo fornecedor entrar.

---

## 9. Páginas Secundárias e Programáticas (SEO)
- **Página de Categoria / Cidade:** Hero, Descrição, Filtros, Empresas, Equipamentos, FAQ, Artigos, CTA.
- **Página da Empresa (Mini-site):** Banner, Logo, Contato, WhatsApp, Avaliações, Equipamentos, Serviços, Vídeos, Equipe, Certificados, Mapa.
- **Landing Pages Programáticas:** Geradas automaticamente (ex: "Retroescavadeira em Redenção"). Devem possuir título único, texto exclusivo, FAQ, schema.org.
- **Blog:** Guias, Comparativos, Dicas, Custos. Sempre relacionados às categorias.

## 10. Estratégia de SEO e Performance
- **Tags & Schema:** Title, Description, Canonical, Open Graph, Twitter Card, Breadcrumb, Schema (FAQ, Organization, LocalBusiness, ItemList), Sitemap automático.
- **Performance (Core Web Vitals):** Lighthouse 95+, Excelente.
- **Responsividade e Acessibilidade:** Desktop, Tablet, Mobile (PWA). Acessibilidade WCAG AA (Navegação por teclado, ARIA, contraste, alt).
- **Analytics:** Monitoramento de cliques, buscas, filtros, WhatsApp, conversões.

## 11. Estados da Interface
Cada tela deve prever: Carregando, Sem resultados, Erro de conexão, Página vazia, Sucesso, Conteúdo indisponível.

## 12. Componentes Reutilizáveis
Search Bar, Hero Banner, Category Card, Equipment/Service/Company Card, CTA Banner, FAQ Accordion, Breadcrumb, Badge (Empresa Verificada, Novo, Destaque), Empty State, Skeleton Loader, Pagination.

## 13. Critérios de Aceite
1. Visitante encontra um fornecedor em até 3 cliques.
2. Busca funciona como principal ponto de entrada.
3. Todas as páginas são indexáveis e rápidas.
4. Experiência consistente (mobile e desktop).
5. Arquitetura suporta crescimento nacional.
