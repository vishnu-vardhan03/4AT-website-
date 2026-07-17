# 4AT Consulting Leads API

NestJS and TypeORM API connected to the existing PostgreSQL tables `academy_leads`, `consulting_leads`, and `ai_leads`. The application never synchronizes or migrates the schema.

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

`synchronize` and `migrationsRun` are both disabled. No migration files or table-creation scripts are included.

## Run

```bash
npm install
npm run start:dev
```

Production:

```bash
npm run build
npm run start:prod
```

Swagger is available at `http://localhost:5000/api/docs` and the database health check at `http://localhost:5000/health`.

## Endpoints

Each lead resource supports `POST /`, `GET /`, `GET /:id`, and `DELETE /:id`:

- `/academy-leads`
- `/consulting-leads`
- `/ai-leads`

List endpoints also accept optional `page`, `limit`, and `status` query parameters. `GET /dashboard/stats` returns counts for all three existing tables and their combined total.

## Existing column mappings

- `academy_leads`: `id`, `full_name`, `company`, `email`, `phone`, `message`, `created_at`
- `consulting_leads`: `id`, `full_name`, `company`, `email`, `phone`, `message`, `created_at`
- `ai_leads`: `id`, `full_name`, `company`, `email`, `phone`, `message`, `created_at`

TypeScript properties use camelCase while `@Column({ name: ... })` maps them to the existing snake_case PostgreSQL columns.
