# syntax=docker/dockerfile:1
# R Insulfilms — landing estática servida por Nginx sem root.
# Estágio 1: prepara os arquivos (pré-compressão gzip). Estágio 2: só o Nginx e o site.

FROM alpine:3.20 AS build
WORKDIR /site
COPY dist/ ./
# Remove o que não é do site e pré-comprime os textos (o Nginx serve o .gz direto).
RUN find . -name '.DS_Store' -delete \
 && find . -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' -o -name '*.ttf' -o -name '*.webmanifest' \) \
      -exec gzip -9 -k -n {} \; \
 && find . -type d -exec chmod 755 {} \; \
 && find . -type f -exec chmod 644 {} \;

FROM nginxinc/nginx-unprivileged:1.27-alpine
# Só a configuração própria: nada do default.conf da imagem.
COPY --chown=root:root deploy/nginx-container.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=root:root /site /usr/share/nginx/html
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
