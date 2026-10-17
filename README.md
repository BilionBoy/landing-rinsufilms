# R Insulfilms — landing page

Landing estática em HTML, CSS e JavaScript, baseada no protótipo enviado. Todas as imagens e fontes estão incluídas localmente.

## Rodar

```sh
cd dist
python3 -m http.server 8080 --bind 127.0.0.1
```

Abra http://127.0.0.1:8080.

## Arquivos

- `dist/index.html`: conteúdo, ícones SVG e estrutura semântica.
- `dist/styles.css`: layout desktop e mobile.
- `dist/app.js`: menu, galeria e detalhes dos serviços.
- `dist/assets/`: fotografias, referência e fontes locais.

Os fundos e fotografias ocupam toda a largura da janela. O conteúdo é alinhado em até 1320 px, com tipografia limitada, navbar de 80 px e botões de 44–48 px. O layout não escala proporcionalmente à largura da tela e tem ajustes específicos para tablet e celular. O logo da navbar usa o PNG original de 2172 × 724 px, com transparência. A imagem principal foi reconstruída em maior resolução com base no protótipo; não é uma nova fotografia documental da empresa. Textos, botões, navegação e seções são HTML real. Fotografias enviadas separadamente aparecem na unidade, no ambiente e na galeria. Alguns itens do portfólio preservam recortes do protótipo; a nitidez desses recortes é limitada pela resolução do arquivo de referência.

O WhatsApp está configurado para +55 69 99280-4208, conforme o material fornecido. Endereço e informações de atendimento seguem o protótipo. Para publicar, basta servir o conteúdo de `dist` em uma hospedagem estática.

## Refinamento de UX/UI

- Navegação fixa, seção ativa e menu mobile com fechamento por Escape e clique externo.
- Cards com alinhamento consistente e textos de apoio legíveis.
- Detalhes de serviço com benefícios e orçamento contextualizado pelo WhatsApp.
- Catálogo navegável com doze serviços.
- Galeria ampliável com navegação anterior/próxima e teclado.
- Fechamento de janelas devolve o foco ao botão de origem.
- Contato pelo WhatsApp e rota pelo Google Maps separados.

Validação: sintaxe JavaScript, referências de arquivos e âncoras, além de smoke checks da lógica de interações em DOM simulado. A validação visual em navegador não estava disponível na sessão.

## Publicar (VPS dhionux, mesmo padrão dos outros sites)

O site roda num container Nginx sem root (`Dockerfile` em 2 estágios), só em `127.0.0.1:3002`. O Nginx do host faz o proxy e a Cloudflare fica na frente (TLS em modo Flexible).

```sh
# na VPS
cd /root/projetos && git clone https://github.com/BilionBoy/landing-rinsufilms.git rinsufilms && cd rinsufilms
docker compose up -d --build
cp deploy/nginx-host-rinsufilms.com.br.conf /etc/nginx/sites-available/rinsufilms.com.br
ln -sf /etc/nginx/sites-available/rinsufilms.com.br /etc/nginx/sites-enabled/rinsufilms.com.br
nginx -t && systemctl reload nginx
```

Atualizar depois: `git pull && docker compose up -d --build`.

Cloudflare: registro `A` de `rinsufilms.com.br` e `CNAME` de `www` para o IP da VPS, com proxy ligado (nuvem laranja); SSL/TLS em **Flexible**.

### Segurança

- **Container:** sistema de arquivos só leitura, usuário sem root (101), sem nenhuma capability do Linux, `no-new-privileges`, limites de memória, CPU e processos.
- **Nginx:** aceita só GET/HEAD, não mostra versão, bloqueia arquivos ocultos, limita requisições e conexões por visitante (IP real vindo da Cloudflare).
- **Navegador (cabeçalhos):** Content-Security-Policy com `script-src 'self'` (só roda o `app.js` do próprio site; script injetado, inline, `eval` e de outro domínio são bloqueados), `frame-ancestors 'none'` e `X-Frame-Options: DENY` (ninguém embute o site), `nosniff`, `Referrer-Policy`, `Permissions-Policy` (sem câmera, microfone, localização), HSTS e isolamento de origem.
- **Prévia no WhatsApp e redes sociais:** tags Open Graph no `<head>` com título, descrição e `og-image.jpg` (1200×630, recorte da foto principal com o letreiro). Favicon e ícones gerados do "R" do logo (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest`). Só esses arquivos podem ser carregados por outros sites; o resto fica `same-origin`.
- O console do navegador não tem como ser desligado por um site (é ferramenta do próprio navegador do visitante). O que a política acima garante é que nenhum código colado ou injetado consegue rodar como se fosse do site.
