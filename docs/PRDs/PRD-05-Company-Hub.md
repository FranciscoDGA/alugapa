# PRD 05 - Company Hub (Centro da Empresa)

**Projeto:** AlugaPA  
**Versão:** 1.0  
**Status:** Documento Funcional  
**Prioridade:** Muito Alta  

## 1. Objetivo

Transformar o perfil de cada empresa em um mini-site profissional, otimizado para SEO, geração de leads e fortalecimento da marca. Cada perfil deve funcionar como uma página institucional completa.

## 2. Objetivos de Negócio

O módulo deve:
- Aumentar a conversão dos visitantes;
- Aumentar a retenção dos assinantes;
- Fortalecer o SEO da empresa;
- Gerar confiança;
- Incentivar upgrades de plano.

## 3. Estrutura Geral
**Empresa**
```
│
├── Página Pública
├── Dashboard
├── Equipe
├── Equipamentos
├── Serviços
├── Galeria
├── Avaliações
├── Leads
├── Analytics
├── Financeiro
└── Configurações
```

## 4. Página Pública da Empresa

**URL:** `/alugapa.com.br/empresa/nome-da-empresa` (ou, futuramente: `empresa.alugapa.com.br`)

Essa página será indexada pelo Google.

## 5. Hero da Empresa

Deve conter:
- Logo;
- Banner;
- Nome da empresa;
- Cidade;
- Estado;
- Selo Empresa Verificada;
- Anos de atuação;
- Nota média;
- Botão WhatsApp;
- Botão Solicitar Orçamento;
- Botão Compartilhar.

## 6. Informações Institucionais

**Campos:**
- História da empresa;
- Missão;
- Áreas de atuação;
- Diferenciais;
- Certificações;
- Licenças;
- CNPJ (opcional);
- Horário de atendimento;
- Idiomas atendidos (quando aplicável).

## 7. Área de Cobertura

A empresa poderá informar:
- Cidade sede;
- Cidades atendidas;
- Estados atendidos;
- Raio de atendimento.

Isso melhora a busca e evita contatos fora da área de atuação.

## 8. Catálogo

Dividido em:
- **Equipamentos:** Cada item pode ter fotos, vídeo, descrição, atributos técnicos, disponibilidade (roadmap), CTA para orçamento.
- **Serviços:** Mesmo padrão.

## 9. Galeria

Fotos organizadas por álbuns:
- Máquinas;
- Equipe;
- Obras;
- Eventos;
- Bastidores;
- Certificações.

*Suporte futuro para vídeos curtos.*

## 10. Avaliações

Os clientes poderão avaliar:
- Atendimento;
- Qualidade;
- Pontualidade;
- Custo-benefício;
- Recomendação.

A empresa poderá responder às avaliações.

## 11. Perguntas Frequentes

Cada empresa terá um FAQ próprio.
**Exemplos:**
- Vocês atendem finais de semana?
- Possuem operador?
- Atendem fora do estado?
- Emitem nota fiscal?

## 12. Conteúdo da Empresa

Empresas Premium poderão publicar:
- Artigos;
- Novidades;
- Casos de sucesso;
- Lançamentos de equipamentos;
- Promoções.

Isso fortalece o SEO da página da empresa.

## 13. CTA Permanente

Todas as páginas da empresa terão ações visíveis:
- WhatsApp.
- Solicitar orçamento.
- Ligar.
- E-mail.
- Compartilhar.
- Salvar empresa.

## 14. Dashboard Empresarial

O painel será dividido em módulos:
- **Visão Geral:** resumo de métricas, leads recentes, desempenho.
- **Catálogo:** equipamentos, serviços, mídia.
- **Leads:** solicitações recebidas, status, origem.
- **Analytics:** visualizações, cliques, CTR, cidades de origem, categorias mais acessadas.
- **Financeiro:** plano, pagamentos, histórico, faturas.
- **Configurações:** perfil, equipe, integrações, notificações.

## 15. Equipe

A empresa poderá criar usuários internos.
**Papéis:** Proprietário, Administrador, Editor, Comercial, Operador.
Cada papel terá permissões específicas.

## 16. IA da Empresa

**Ferramentas disponíveis:**
- Gerar descrição institucional;
- Criar anúncio;
- Sugerir títulos;
- Gerar FAQ;
- Criar posts para redes sociais;
- Melhorar SEO;
- Sugerir palavras-chave;
- Revisar textos.

## 17. Analytics

Painel com indicadores como:
- Visualizações da empresa;
- Visitantes únicos;
- Origem do tráfego;
- Páginas mais acessadas;
- Cliques em WhatsApp;
- Solicitações recebidas;
- Taxa de conversão;
- Equipamentos mais procurados.

## 18. SEO da Empresa

Cada perfil deve possuir:
- URL amigável;
- Title, Meta Description, Open Graph;
- Schema.org LocalBusiness;
- Breadcrumb;
- Sitemap;
- Canonical.

Além disso:
- FAQ Schema;
- Review Schema (quando houver avaliações);
- Imagens otimizadas;
- Dados estruturados.

## 19. Integrações Futuras

Preparar o modelo para integração com:
- Google Business Profile, Google Maps;
- Instagram, Facebook, LinkedIn, YouTube;
- WhatsApp Business API;
- CRMs, ERPs.

## 20. Segurança

A empresa controla:
- Membros, permissões;
- Autenticação em dois fatores (roadmap);
- Histórico de alterações, auditoria.

## 21. Planos

- **Gratuito:** Perfil básico, até 3 anúncios, galeria limitada.
- **Essencial:** Mais anúncios, estatísticas, mais fotos.
- **Profissional:** Empresa Verificada, SEO avançado, IA, Analytics completo.
- **Enterprise:** Equipe, API, Landing premium, integrações, IA avançada.

## 22. KPIs

Monitorar:
- Empresas cadastradas;
- Perfis completos;
- Taxa de atualização dos perfis;
- Leads por empresa;
- Retenção, upgrade de plano;
- Tempo de resposta;
- Satisfação.

## 23. Critérios de Aceite

O módulo será aprovado quando:
- Cada empresa possuir um perfil institucional completo.
- O perfil gerar tráfego orgânico.
- O empresário conseguir atualizar seu conteúdo sem suporte técnico.
- As métricas forem apresentadas em tempo real (ou próximo disso).
- O perfil estiver preparado para crescimento nacional.

---
🚀 **Funcionalidade que considero o maior diferencial**

Eu adicionaria um recurso chamado **Diagnóstico Digital com IA**.

Uma vez por semana, a IA analisa automaticamente o perfil da empresa e gera um relatório como:
- "Seu perfil está com 82/100."
- "Adicione mais 5 fotos para aumentar a confiança."
- "Complete o FAQ para melhorar o SEO."
- "Sua descrição é muito curta."
- "Há procura por 'gerador 250 kVA' na sua região e você ainda não oferece esse equipamento."
- "Você respondeu apenas 40% das solicitações nos últimos 30 dias."

Isso transforma o AlugaPA em um consultor digital contínuo para as empresas, aumentando a percepção de valor da assinatura e incentivando melhorias constantes.
