# Deploy (VPS / dedicated)

SPA собирается в Docker (multi-stage: Node 20 → nginx) и отдаётся через `nginx.conf`.

## Быстрый старт на сервере

Требования: Docker + Docker Compose plugin.

```bash
git clone <repo-url> app && cd app
cp .env.example .env
# при необходимости поправь EXTERNAL_PORT / REACT_APP_*
chmod +x deploy.sh
./deploy.sh
```

Или вручную:

```bash
cp .env.example .env
docker compose --env-file .env up --build -d
```

Открыть: `http://SERVER_IP:8080` (порт из `EXTERNAL_PORT`).

## Переменные (.env)

| Variable | Default | Meaning |
|---|---|---|
| `EXTERNAL_PORT` | `8080` | Host port → container `:80` |
| `COMPOSE_PREFIX` | `workspace` | Image/container name prefix |
| `REACT_APP_USE_MOCKS` | `true` | Demo mocks (axios-mock-adapter) |
| `REACT_APP_API_URL` | empty | Real API base URL if mocks off |
| `REACT_APP_SENTRY_DSN` | empty | Optional Sentry |

`REACT_APP_*` вшиваются **на этапе `docker build`**. После смены `.env` нужен rebuild:

```bash
docker compose --env-file .env up --build -d
```

## Nginx / HTTPS перед контейнером

Контейнер слушает HTTP `:80`. На VPS обычно ставят host nginx / Caddy / Traefik:

```nginx
server {
  listen 443 ssl http2;
  server_name demo.example.com;

  # ssl_certificate ...;
  # ssl_certificate_key ...;

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Внутри контейнера SPA-роутинг уже настроен (`try_files … /index.html`).

## Обновление

```bash
git pull
./deploy.sh
```

## Полезные команды

```bash
docker compose ps
docker compose logs -f frontend
docker compose down
```

## CI (GitLab)

`.gitlab-ci.yml` можно настроить на runner с Docker: `git pull` + `docker compose up --build -d` в каталоге проекта. Старый пайплайн был завязан на пути CRM/superset — для этого демо используй `deploy.sh` или упрощённый job:

```yaml
deploy:
  stage: deploy
  tags: [vps]
  only: [main]
  script:
    - cd /opt/workspace-frontend
    - git pull
    - docker compose --env-file .env up --build -d
```
