# Studio Isabela Bastos

Site estático em português para o Studio Isabela Bastos (extensão de cílios, Zona Norte de São Paulo). Não requer build nem instalação de dependências.

## Estrutura

- `index.html`: a página. Seções: início (com a ilustração do olhar), o studio, experiência (como agendar), cuidados com os cílios, localização e pagamento, dúvidas frequentes e chamada final.
- `styles.css`: todo o visual. As cores e fontes ficam no bloco `:root` no topo do arquivo.
- `script.js`: menu do celular, animações ao rolar, botão flutuante do WhatsApp, olhar que acompanha o cursor e o mapa que só carrega quando a visitante clica em "Mostrar mapa".
- `images/`: fotos do studio em `.jpg` otimizado. Os `.PNG` originais ficam guardados, mas a página não os usa.
- `share.jpg`: imagem de prévia quando o link é compartilhado no WhatsApp ou no Instagram.
- `favicon.svg`: ícone da aba, com o monograma IB.

## Identidade

- Cores: café escuro `#171213`, creme `#f7f2ed`, rosé `#d4968a` e vinho `#6b3632`.
- Fontes: Cormorant Garamond nos títulos e DM Sans nos textos, hospedadas em `fonts/`.

## Publicar no GitHub Pages

1. Envie estes arquivos para a branch principal do repositório.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch principal e a pasta **/(root)** e salve.
4. Aguarde a publicação. O GitHub mostra o endereço do site nessa página.
5. O endereço publicado é `https://studioisabelabastos.github.io/`, já configurado em `canonical`, `og:url` e `og:image`. Se passar a usar um domínio próprio, troque esses três endereços no `<head>`.

## Segurança

O site é estático: não tem login, formulário, banco de dados nem servidor próprio. Mesmo assim, ele foi blindado assim:

- **Política de segurança de conteúdo (CSP)** no `<head>` do `index.html`: o navegador só executa scripts, estilos, fontes e imagens do próprio site. A única exceção é o mapa do Google, e só dentro do iframe.
- **Nenhum serviço de terceiros ao abrir a página.** As fontes ficam em `fonts/` (licença SIL OFL 1.1, junto dos arquivos), e o mapa do Google só carrega quando a visitante clica em "Mostrar mapa" (LGPD).
- **Mapa isolado:** o iframe roda com `sandbox` e não recebe o endereço completo da página.
- **Links externos** (WhatsApp, Instagram, Maps) abrem com `rel="noopener noreferrer"`. A outra aba não consegue controlar o site e não recebe a origem.
- **Script sem montagem de HTML:** o `script.js` não usa `innerHTML`, `eval` nem lê dados da URL. Ele só liga e desliga classes.
- **`.gitignore`** impede subir por engano arquivos `.env`, chaves e configurações locais.

**Ao editar o código:**

- Não use `style="..."` no HTML nem `<script>` sem `src`. A CSP bloqueia os dois. Coloque estilos no `styles.css` e scripts no `script.js`.
- O pequeno script dentro do `<head>` tem uma impressão digital (hash) registrada na CSP (`'sha256-...'`). Se mudar esse script, gere o novo hash (por exemplo, em https://report-uri.com/home/hash) e troque na linha da CSP.
- Para incluir outro serviço externo (por exemplo, um vídeo do YouTube), acrescente o domínio na diretiva correspondente da CSP.

**No GitHub (configurações da conta e do repositório):**

1. Ative a verificação em duas etapas (2FA) na conta do GitHub. É a principal proteção do site, porque quem acessa a conta altera o site.
2. Em **Settings → Pages**, deixe marcado **Enforce HTTPS**.
3. Se usar um domínio próprio, verifique o domínio em **Settings → Pages → Verified domains**. Isso evita que outra conta assuma o endereço.
4. Lembre que tudo no repositório público fica visível, inclusive a pasta `Documentos/`, que também é publicada no endereço do site. Ela não tem dados sensíveis hoje, mas não coloque ali informações privadas.

O GitHub Pages não permite configurar cabeçalhos HTTP. Por isso, proteções que só existem como cabeçalho (como `frame-ancestors`, que impede o site de ser exibido dentro de outro) não estão disponíveis. Como o site não tem formulários nem áreas logadas, o risco disso é baixo.

## Pendências com a cliente

- Fotos em alta resolução (1600 px ou mais), de preferência com trabalhos prontos. Mantenha os mesmos nomes de arquivo em `images/`.
- Confirmar os textos da seção "Cuidados", que trazem orientações gerais de pós-atendimento.
