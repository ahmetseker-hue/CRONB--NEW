# CRONBİ Docker Deployment Stratejisi

## Proje mimarisi özeti

- **Frontend:** React + Vite uygulaması (`client/`).
- **Backend:** Node.js + Express API (`server/`).
- **Veri katmanı:** SQLite veritabanı (`server/data/cronbi.db`).

## Bağımlılık ve ortam değişkenleri özeti

### Frontend bağımlılıkları (client/package.json)

- Runtime: React, React Router, Framer Motion, GSAP, Three.js, Radix UI, vb.
- Build tooling: Vite, TailwindCSS, PostCSS, Autoprefixer.

### Backend bağımlılıkları (server/package.json)

- Express, CORS, Helmet, dotenv, better-sqlite3.

### Environment variables (server/.env)

- `PORT=3001`
- `CLIENT_URL=http://localhost:5173`

## Çalıştırma ve build komutları

### Frontend

- Geliştirme: `npm run dev`
- Üretim build: `npm run build`
- Önizleme: `npm run preview`

### Backend

- Geliştirme: `npm run dev`
- Üretim: `npm start`

## Docker yaklaşımı

### Tek container mı, multi-container mı?

**İstenen yaklaşım: tek container.**

Tek container senaryosunda en sağlıklı yaklaşım, **backend’in frontend build çıktısını statik olarak servis etmesidir.** Bu, tek süreç (Node.js) ile hem API hem statik içerik servis etmeyi mümkün kılar. Bunun için backend tarafında statik dosya servisleme (ör. Express `static`) gibi bir düzenleme gerekir. Kod değişikliği istemiyorsanız ikinci bir süreç çalıştırmak gerekir (ör. `serve` + `node`), ancak bu konteyner içinde çoklu süreç yönetimi gerektirir.

### Multi-stage build kullanımı

**Evet, önerilir.**

- Aşama 1: Frontend build (Vite)
- Aşama 2: Backend runtime (Node.js) + build çıktısı kopyalanır

### Frontend production build

- `npm run build` ile `client/dist` üretilir.
- Üretimde bu build çıktısı backend tarafından servis edilmelidir.

### Backend Node.js versiyonu

- **Node.js 20 LTS** önerilir.
- Vite 6 ve güncel ekosistem için 18+ uygundur; 20 LTS daha uzun destek sağlar.

### SQLite volume yönetimi

- SQLite dosyası `server/data/cronbi.db` için **kalıcı volume** gereklidir.
- Container içinde veri yolu: `/app/server/data` (örnek).
- Docker volume örneği: `cronbi-data:/app/server/data`.

### Environment variables yönetimi

- `PORT` ve `CLIENT_URL` container runtime’da env ile verilmeli.
- Üretimde frontend aynı origin’de ise `CLIENT_URL` aynı origin olacak şekilde ayarlanmalı (ör. `https://example.com`).
- Yerel geliştirme `.env` korunur; prod için `--env-file` veya `docker-compose` `environment` önerilir.

### Port konfigürasyonları

- Backend: `PORT=3001` varsayılan.
- Tek container yaklaşımında dışa açılacak port **3001** olabilir.
- Reverse proxy kullanılırsa dışa 80/443, container içi 3001 map edilir.

### docker-compose gerekli mi?

- **Tek container** yeterli; `docker run` ile yönetilebilir.
- Eğer environment, volume ve port yönetimini standartlaştırmak isterseniz **docker-compose** önerilir.

## Dockerfile genel yapısı (özet)

**Çok aşamalı (multi-stage) tek Dockerfile:**

1. **frontend-build** aşaması
   - `client/` kopyalanır
   - `npm ci` + `npm run build`
2. **backend-runtime** aşaması
   - `server/` kopyalanır
   - `npm ci --omit=dev`
   - Frontend build çıktısı `client/dist` backend’in public dizinine kopyalanır
   - `node src/index.js` ile tek süreç çalıştırılır

> Not: Backend’in statik dosya servis edecek şekilde yapılandırılması gerekir.

## docker-compose.yml genel yapısı (gerekirse)

```yaml
services:
  cronbi:
    build: .
    ports:
      - "3001:3001"
    environment:
      - PORT=3001
      - CLIENT_URL=https://example.com
    volumes:
      - cronbi-data:/app/server/data

volumes:
  cronbi-data:
```

## Önemli notlar ve best practices

- `better-sqlite3` derleme gerektirebilir; build aşamasında gerekli araçlar bulunmalıdır.
- Production image küçük tutulmalı: yalnızca runtime bağımlılıkları dahil edilmeli.
- `CLIENT_URL` CORS için kritik; frontend aynı origin’deyse uygun değere çekilmeli.
- SQLite dosyası write-permission’a ihtiyaç duyar; volume izinleri kontrol edilmeli.
- Tek container yaklaşımında **tek süreç** önerilir; çoklu süreç gerekiyorsa bir process manager kullanılmalıdır.
