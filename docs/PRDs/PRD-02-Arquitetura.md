# PRD 02 — Arquitetura da Informação (Information Architecture)

**Projeto:** AlugaPA (Infraestrutura Digital de Descoberta)
**Versão:** 1.0
**Status:** Obrigatório antes do Design

---

## 1. Objetivo
Projetar toda a estrutura de navegação da plataforma para que qualquer usuário consiga encontrar um equipamento, serviço ou empresa em poucos cliques, independentemente da cidade.

**Princípios:**
- Mobile First.
- SEO First.
- Search First.
- Conversão First.

---

## 2. Estrutura Geral
```
ALUGAPA
├── Home
├── Buscar
├── Categorias
│   ├── Equipamentos (Ativos)
│   └── Serviços (Especializados)
├── Empresas
├── Cidades
├── Blog
├── Solicitar Orçamento (Central de Necessidades)
├── Planos
├── Entrar
├── Criar Conta
└── Dashboard (Empresas e Admin)
```

---

## 3. Homepage
A homepage deve responder em menos de 5 segundos: O que é? O que encontro? Como encontro?
**Seções:**
- Hero com busca inteligente.
- Categorias principais.
- Equipamentos em destaque.
- Serviços em destaque.
- Empresas verificadas.
- Cidades populares.
- Como funciona.
- Depoimentos.
- CTA para anunciar.
- Blog.
- Rodapé completo.

---

## 4. Busca Inteligente
Principal recurso do sistema.
**O usuário pode pesquisar:** retroescavadeira, caminhão munck, poço artesiano, drone agrícola, gerador, topografia.
**Filtros:**
- Estado, Cidade.
- Categoria, Subcategoria.
- Empresa verificada.
- Faixa de preço (quando informada).
- Atendimento 24h.
- Disponibilidade (futuro).

---

## 5. Estrutura das Categorias (Os 2 Grandes Grupos)

**1. Ativos (Equipamentos)**
- Máquinas agrícolas, Máquinas pesadas, Energia, Eventos, Industrial, Transporte, Containers, Hospitalar.

**2. Serviços Especializados**
- Terraplenagem, Perfuração, Georreferenciamento, Topografia, Engenharia, Drones, Limpeza industrial, Manutenção especializada.

---

## 6. Estrutura Geográfica
Brasil → Estado → Região (opcional) → Cidade → Categoria → Empresa → Anúncio

**Exemplos de Rotas SEO:**
- `/pa/redencao/retroescavadeiras`
- `/pa/maraba/geradores`
- `/mt/sinop/drones-agricolas`

---

## 7. Estruturas de Páginas de Conteúdo

**Página de Categoria**
Introdução SEO, Equipamentos/serviços, Empresas em destaque, Últimos anúncios, Perguntas frequentes, Artigos relacionados, Solicitação de orçamento.

**Página da Cidade (Ex: Redenção)**
Equipamentos, Serviços, Empresas, Mapa, Estatísticas, Conteúdo local, FAQ.

**Página da Empresa (Mini-site)**
Logo, Banner, História, Serviços/Equipamentos, Avaliações, Galeria, Vídeos, WhatsApp, Localização, Horário, Redes sociais, Certificações, Formulário de contato.

**Página do Anúncio**
Fotos, Vídeo (opcional), Descrição, Especificações técnicas, Cidade, Empresa, Contato, Equipamentos/Serviços relacionados, CTA principal.

---

## 8. Central de Necessidades (Solicitação de Orçamento)
Em vez de apenas procurar, o usuário pode publicar uma necessidade ("Preciso de gerador em Marabá").
**Fluxo:** Usuário preenche formulário → Seleciona cidade, categoria, descrição, prazo → Empresas recebem o pedido → Contato direto.

---

## 9. Blog (Motor de SEO)
**Estrutura:** Guias → Comparativos → Custos → Legislação → Dicas → Casos reais → Manutenção → Mercado.
*Cada artigo deve apontar para categorias, empresas e páginas de cidade.*

---

## 10. Navegação e Dashboards

**Dashboard da Empresa:**
Visão Geral, Anúncios, Solicitações de Orçamento, Leads, Estatísticas, Plano, Financeiro, Perfil, Equipe, Configurações.

**Painel Administrativo:**
Dashboard Executivo, Empresas, Usuários, Categorias/Subcategorias, Estados/Cidades, Anúncios, Solicitações, Blog, SEO, IA, Financeiro, Planos, Auditoria, Configurações.

**Navegação Mobile (Barra inferior):**
Home, Buscar, Categorias, Orçamentos, Conta. (Busca sempre acessível).

---

## 11. URLs Amigáveis (SEO)
- `/empresa/agro-maquinas-redencao`
- `/equipamentos/retroescavadeira`
- `/servicos/perfuracao-de-pocos`
- `/pa/redencao/retroescavadeiras`
- `/blog/quanto-custa-alugar-um-gerador`

---

## 12. Estratégia de SEO Programático
Geração automática de landing pages com conteúdo único e dados estruturados para combinações:
- Estado + Cidade + Categoria
- Cidade + Equipamento / Serviço
- Categoria + Empresa
- Empresa + Cidade

---

## 13. Critérios de Aceite
A arquitetura estará aprovada quando:
1. Um usuário encontrar um fornecedor em até 3 cliques.
2. Todas as páginas importantes estiverem ligadas entre si.
3. A busca funcionar como principal ponto de entrada.
4. A navegação for consistente no desktop e no mobile.
5. A estrutura favorecer SEO programático e expansão nacional.
