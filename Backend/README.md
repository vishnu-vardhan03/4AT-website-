# 4AT Consulting Leads API

NestJS and TypeORM API for the PostgreSQL tables `academy_leads`, `consulting_leads`, and `ai_leads`.

## Configuration

Copy `.env.example` to `.env`. Use either `DATABASE_URL` or the individual PostgreSQL variables:

```env
PORT=5000
DATABASE_URL=
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=your_database
DB_SSL=false
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Schema synchronization and automatic migration execution are intentionally disabled. Apply reviewed migrations during deployment with `npm run migration:run`.

## Run

```bash
npm install
npm run start:dev
```

Production:

```bash
npm run build
npm run migration:run
npm run start:prod
```

Run `npm run check` before deployment. In production, `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and `FRONTEND_URL` are required; `JWT_SECRET` must contain at least 32 characters.

Swagger is available at `/api/docs` only when `ENABLE_SWAGGER=true`. The database health check is available at `/health`. Set `TRUST_PROXY=true` only when the API runs behind one trusted reverse proxy so rate limiting sees the originating client address.

## Endpoints

Each lead resource supports `POST /`, `GET /`, `GET /:id`, and `DELETE /:id`:

- `/academy-leads`
- `/consulting-leads`
- `/ai-leads`

List endpoints accept optional `page` and `limit` query parameters. The authenticated `GET /leads/summary` endpoint returns counts for all three tables and their combined total.

## Existing column mappings

- `academy_leads`: `id`, `full_name`, `company`, `email`, `phone`, `message`, `created_at`
- `consulting_leads`: `id`, `full_name`, `company`, `email`, `phone`, `message`, `created_at`
- `ai_leads`: `id`, `full_name`, `company`, `email`, `phone`, `message`, `created_at`

TypeScript properties use camelCase while `@Column({ name: ... })` maps them to the existing snake_case PostgreSQL columns.
