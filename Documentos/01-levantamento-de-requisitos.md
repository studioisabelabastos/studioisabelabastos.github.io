# Levantamento de Requisitos — Site Studio Isabela Bastos

| Item | Descrição |
|---|---|
| Projeto | Site institucional do Studio Isabela Bastos (Lash Design) |
| Tipo | Site estático (HTML, CSS e JavaScript puro, sem build) |
| Hospedagem | GitHub Pages |
| Versão do documento | 1.1 (horário de atendimento definido; pendência de endereço revisada) |
| Data | 12/10/2026 |

---

## 1. Visão geral

### 1.1 Problema
O studio depende do Instagram como principal vitrine. Não há um endereço próprio que reúna, em um só lugar, apresentação do espaço, serviços, localização, formas de pagamento e um canal direto de agendamento.

### 1.2 Objetivo
Oferecer uma página única, rápida e responsiva que apresente o studio e **converta visitantes em agendamentos pelo WhatsApp**.

### 1.3 Escopo
**Dentro do escopo**
- Página única (one-page) com seções: Início, O studio, Experiência, Localização, Pagamento e Chamada final.
- Redirecionamento para WhatsApp, Instagram e Google Maps.
- Publicação gratuita via GitHub Pages.

**Fora do escopo (nesta versão)**
- Agendamento online com calendário próprio.
- Tabela de preços.
- Área administrativa / CMS.
- Pagamento online.
- Backend, banco de dados ou formulário de contato.

### 1.4 Partes interessadas
| Parte interessada | Interesse |
|---|---|
| Proprietária do studio | Divulgar o trabalho e receber mais agendamentos |
| Clientes e potenciais clientes | Conhecer o studio, tirar dúvidas e agendar com facilidade |
| Desenvolvedor / mantenedor | Site simples de manter, sem custo de hospedagem |

---

## 2. Requisitos funcionais (RF)

| ID | Requisito | Prioridade | Seção / elemento |
|---|---|---|---|
| RF01 | Exibir cabeçalho fixo com marca e menu de navegação para as seções da página | Alta | `.site-header` |
| RF02 | Em telas até 680px, exibir menu recolhível (botão hambúrguer) que abre/fecha a navegação, fecha ao clicar em um link e com a tecla Esc | Alta | `.menu-toggle`, `script.js` |
| RF03 | Exibir seção inicial (hero) com título, descrição e botão de agendamento | Alta | `#inicio` |
| RF04 | Redirecionar todos os botões de agendamento para o WhatsApp do studio, em nova aba | Alta | Links `api.whatsapp.com` |
| RF05 | Exibir botão flutuante de agendamento visível durante toda a rolagem | Alta | `.floating-cta` |
| RF06 | Apresentar o studio com texto institucional e galeria de 3 fotos com legenda | Alta | `#sobre`, `.studio-gallery` |
| RF07 | Exibir os diferenciais do atendimento (atendimento individualizado, cuidado, beleza personalizada) | Média | `.values-row` |
| RF08 | Exibir cartões de serviço/experiência, cada um com link de contato | Alta | `#servicos` |
| RF09 | Exibir endereço do studio e mapa incorporado | Alta | `#localizacao`, `iframe` |
| RF10 | Abrir o endereço no Google Maps em nova aba para traçar rota | Alta | Botão "Ver no mapa" |
| RF11 | Exibir formas de pagamento (Pix, dinheiro, cartão de débito/crédito) e aviso de acréscimo da maquininha | Média | `.payment` |
| RF12 | Exibir links para o Instagram do studio (barra superior, seção "O studio" e rodapé) | Média | Links `instagram.com` |
| RF13 | Exibir rodapé com marca, link do Instagram e direitos autorais com ano atualizado automaticamente | Baixa | `#year`, `script.js` |
| RF14 | Fornecer metadados de SEO e compartilhamento (title, description, Open Graph) e dados estruturados Schema.org (`BeautySalon`) | Média | `<head>` |

---

## 3. Requisitos não funcionais (RNF)

| ID | Categoria | Requisito |
|---|---|---|
| RNF01 | Tecnologia | O site deve ser estático, sem dependências de build ou instalação (HTML5, CSS3, JavaScript sem frameworks). |
| RNF02 | Hospedagem | Deve funcionar no GitHub Pages, servido a partir da branch principal, pasta raiz. |
| RNF03 | Responsividade | Layout adaptável a desktop (> 900px), tablet (≤ 900px) e celular (≤ 680px), sem rolagem horizontal. |
| RNF04 | Acessibilidade | Seguir boas práticas WCAG: link "Pular para o conteúdo", `aria-label`/`aria-expanded`, textos alternativos nas imagens, foco visível, navegação por teclado e respeito a `prefers-reduced-motion`. |
| RNF05 | Desempenho | Imagens e mapa com carregamento tardio (`loading="lazy"`), script com `defer`, fontes com `display=swap`. |
| RNF06 | Usabilidade | O agendamento deve estar a no máximo 1 clique de qualquer ponto da página. |
| RNF07 | Idioma | Todo o conteúdo em português do Brasil (`lang="pt-BR"`). |
| RNF08 | Segurança / privacidade | Links externos com `target="_blank"` e `rel="noreferrer"`; o site não coleta dados do visitante. |
| RNF09 | Compatibilidade | Funcionar nas versões atuais de Chrome, Edge, Firefox e Safari (desktop e mobile). |
| RNF10 | Manutenibilidade | Código separado em `index.html`, `styles.css` e `script.js`; cores e fontes centralizadas em variáveis CSS (`:root`). |
| RNF11 | Identidade visual | Paleta em tons de rosa, creme e grafite; tipografia Playfair Display (títulos) e DM Sans (textos). |
| RNF12 | Arquivos | Nomes de imagens são sensíveis a maiúsculas no GitHub Pages (ex.: `.PNG`); devem ser mantidos idênticos às referências do HTML. |

---

## 4. Regras de negócio (RN)

| ID | Regra |
|---|---|
| RN01 | O atendimento é feito somente com hora marcada; o studio não tem horário fixo de funcionamento aberto ao público. |
| RN02 | O agendamento é realizado exclusivamente pelo WhatsApp do studio. |
| RN03 | Pagamentos aceitos: Pix, dinheiro e cartão (débito e crédito). |
| RN04 | Pagamentos no cartão podem ter acréscimo da maquininha, a ser consultado no atendimento. |
| RN05 | Valores dos procedimentos não são divulgados no site; são informados no atendimento. |

---

## 5. Restrições e premissas

**Restrições**
- Sem orçamento para hospedagem paga ou domínio próprio nesta versão.
- Sem backend: toda interação externa depende de serviços de terceiros (WhatsApp, Instagram, Google Maps).

**Premissas**
- O link de mensagem do WhatsApp Business permanece ativo.
- O perfil do Instagram permanece público.
- As fotos do studio foram autorizadas pela proprietária para uso no site.

---

## 6. Pendências e pontos de melhoria identificados

| # | Ponto | Impacto | Sugestão |
|---|---|---|---|
| 1 | O site informa rua, número e "Zona Norte", mas não o bairro nem o CEP (nem no HTML nem no JSON-LD) | Reduz a precisão em buscas locais e no Google Maps | Confirmar bairro e CEP nos Correios e incluir em `addressLocality`/`postalCode` e na seção Localização |
| 2 | ~~Horário de funcionamento não informado~~ — **Resolvido:** atendimento somente com hora marcada (RN01) | — | Não usar `openingHours` no JSON-LD; manter a mensagem "Atendimento com hora marcada" |
| 3 | Falta `og:image` | Link compartilhado no WhatsApp/Instagram aparece sem imagem | Criar imagem 1200×630 e adicionar a meta tag |
| 4 | JSON-LD incompleto (sem `url`, `telephone`, `image`) | Menor relevância em buscas locais | Completar após publicação |
| 5 | Mapa do Google incorporado carrega cookies de terceiros | Ponto de atenção para a LGPD | Avaliar aviso de privacidade ou exibir o mapa só após clique |
| 6 | Imagens em PNG | Peso maior que o necessário | Converter para WebP/JPG otimizado |
| 7 | Sem tabela de serviços detalhada | Menos informação para decisão da cliente | Validar com a proprietária se deseja listar tipos de procedimento |

---

## 7. Critérios de aceite gerais

- [ ] Todos os botões de agendamento abrem a conversa do WhatsApp do studio.
- [ ] O menu mobile abre, fecha e responde à tecla Esc.
- [ ] As 3 fotos carregam corretamente após a publicação no GitHub Pages.
- [ ] O mapa exibe o endereço correto e o botão "Ver no mapa" abre o Google Maps.
- [ ] O site é navegável apenas pelo teclado, com foco visível.
- [ ] Não há rolagem horizontal em telas de 360px de largura.
- [ ] O ano do rodapé corresponde ao ano atual.
