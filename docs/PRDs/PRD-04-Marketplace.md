# PRD 04 — Marketplace Core (Núcleo do AlugaPA)

**Projeto:** AlugaPA
**Versão:** 1.0
**Status:** Documento Mestre
**Prioridade:** Crítica

---

## 1. Missão
Criar o maior marketplace brasileiro de descoberta de equipamentos, máquinas e serviços especializados.
O Marketplace deverá ser: rápido, inteligente, escalável, orientado por busca e preparado para IA.

**Objetivo:** Permitir que qualquer pessoa encontre um fornecedor em menos de 60 segundos.

---

## 2. Estrutura Conceitual
Empresa → Possui → Anúncios → Que pertencem → Categoria → Cidade → Estado

**Tipos de Oferta:**
1. **Equipamentos:** Retroescavadeira, Munck, Gerador, Drone, Container, Empilhadeira.
2. **Serviços:** Terraplenagem, Perfuração, Topografia, Georreferenciamento, Soldagem.
3. **Estruturas:** Galpões, Salões, Áreas, Pavilhões.

---

## 3. Modelo Universal do Anúncio
Todo anúncio deverá possuir:
- ID, Empresa, Tipo, Categoria, Subcategoria.
- Título, Slug, Descrição Curta, Descrição Completa.
- Cidade, Estado, Endereço, Área de atendimento.
- Preço, Preço sob consulta.
- Fotos, Vídeos, Especificações, Documentos.
- Status, Data de publicação, Última atualização, Plano da empresa.

**Especificações Técnicas por Categoria (Exemplos):**
- *Retroescavadeira:* Potência, Peso, Profundidade, Ano, Marca, Modelo, Operador.
- *Gerador:* Potência, Combustível, Tensão, Silenciado, Entrega.
- *Drone:* Autonomia, Carga, Área, Sensores.

---

## 4. Busca Inteligente & IA
Busca por Texto livre, Categoria, Cidade, Estado, Filtros.

**IA do Marketplace:**
- Entende linguagem natural: *"Preciso de um gerador de 250 kVA em Marabá"* → (Categoria: Gerador, Cidade: Marabá, Potência: 250 kVA).
- Ajuda a empresa: Criar anúncio, melhorar descrição, gerar FAQ, SEO, detectar spam, sugerir categorias e atributos faltantes.

---

## 5. Algoritmo de Ranqueamento
O ranking **não** é apenas cronológico ou financeiro. É baseado em:
Empresa Verificada, Plano, Qualidade do anúncio, Fotos, Tempo de resposta, Avaliações, Atualização, Distância, CTR, Conversão histórica.

---

## 6. Funcionalidades Core
- **Sistema de Avaliações:** Atendimento, Pontualidade, Qualidade, Custo-benefício.
- **Favoritos e Compartilhamento:** Salvar anúncios/empresas, WhatsApp, Redes Sociais.
- **Solicitação de Orçamento:** Formulário rápido (Radar de Oportunidades em caso de não haver resultados).
- **Workflow do Anúncio:** Rascunho → Análise → Aprovado → Publicado → Expirado/Arquivado.
- **Regras de Moderação:** Anti-spam, duplicidade, fotos inadequadas, telefone inválido.

---

## 7. SEO Programático
Cada anúncio gera sua própria página com: Schema, FAQ, Breadcrumb, Canonical, Open Graph, Meta Description.

---

## 8. Integrações Futuras
Google Maps, Google Business Profile, ERPs, CRMs, WhatsApp Business API, Calendários, Gateways de pagamento.

---

## 9. Central de Inteligência de Mercado (Diferencial)
Recurso exclusivo para assinantes que transforma o AlugaPA em uma plataforma de inteligência comercial.
**Insights:**
- *"Retroescavadeiras foram pesquisadas 380 vezes em Marabá nesta semana."*
- *"Alta procura por geradores em Redenção e apenas 3 empresas anunciam."*
- *"Você perdeu 12 oportunidades porque seu anúncio estava incompleto."*

---

## 10. Critérios de Aceite
1. Um anúncio pode ser publicado em poucos minutos.
2. A busca encontra resultados relevantes rapidamente.
3. Anúncios possuem atributos específicos por categoria.
4. O ranqueamento prioriza qualidade/relevância (não só pagamento).
5. O sistema suporta expansão nacional sem mudanças estruturais.
