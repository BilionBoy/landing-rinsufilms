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
