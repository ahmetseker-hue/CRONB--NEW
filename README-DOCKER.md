# Docker Deployment Rehberi (CRONBİ - Frontend)

Bu doküman, yalnızca frontend (React + Vite) uygulamasını Docker ile production ortamında çalıştırmak için gerekli adımları içerir.

## Gereksinimler
- Docker Engine (20.10+)
- Docker Compose (v2+)

## Kurulum
1. Docker kurulumu:
   - https://docs.docker.com/get-docker/
2. Docker Compose kurulumu (Docker Desktop ile birlikte gelir):
   - https://docs.docker.com/compose/install/

## Ortam Değişkenleri
Bu deployment için ek ortam değişkeni gerekmemektedir.

## Uygulamayı Başlatma
Proje root dizininde aşağıdaki komutu çalıştırın:

```bash
docker compose up -d --build
```

Uygulamayı durdurmak için:

```bash
docker compose down
```

## Port Bilgileri
- **Frontend (Nginx)**: `http://localhost` (port **80**)

## Güvenlik Notları
- Multi‑stage build ile minimal üretim imajı oluşturulur.

## Troubleshooting
- **Container ayağa kalkmıyorsa**:
  - `docker compose logs -f` ile logları inceleyin.
- **Port çakışması**:
  - 80 portu kullanımda ise `docker-compose.yml` içinde portları değiştirin.

## Dosyalar
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `nginx.conf`
