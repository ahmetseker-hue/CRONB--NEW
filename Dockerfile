# syntax=docker/dockerfile:1
# Multi-stage build: frontend build + nginx runtime

# --- Stage 1: Build frontend ---
FROM node:20-alpine AS client-build
# Güvenlik: root olmayan kullanıcı (Node imajında mevcut)
USER node
WORKDIR /home/node/app

# Bağımlılıkları kur ve build al
COPY --chown=node:node client/package*.json ./client/
RUN cd client && npm ci

COPY --chown=node:node client/ ./client/
RUN cd client && npm run build

# --- Stage 2: Production image ---
FROM nginx:1.27-alpine AS production

# Nginx yapılandırması
COPY nginx.conf /etc/nginx/nginx.conf

# Frontend static dosyaları
COPY --from=client-build /home/node/app/client/dist /usr/share/nginx/html

# Çalışma portları
EXPOSE 80

# Sağlık kontrolü (opsiyonel, minimal)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Nginx'i foreground'da çalıştır
CMD ["nginx", "-g", "daemon off;"]
