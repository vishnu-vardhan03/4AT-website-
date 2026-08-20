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
ESSL_UPLOAD_DIR=/absolute/path/to/persistent/essl-uploads
```

Schema synchronization and automatic migration execution are intentionally disabled. Apply reviewed migrations during deployment with `npm run migration:run`.

ESSL ticket attachments are private and are served only through the guarded API. In production, `ESSL_UPLOAD_DIR` is required, must be absolute, and must point to durable storage that survives restarts. The Docker image declares `/app/data/uploads` as a volume; mount persistent storage there. Do not expose that directory from a web server or commit its contents to Git.

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

For the `consult-4at.com` production deployment, configure these URL values:

```env
FRONTEND_URL=https://consult-4at.com
ALLOWED_ORIGINS=https://consult-4at.com
ESS_FRONTEND_URL=https://consult-4at.com/essl
```

The database health check is available at `/health`. API documentation is intentionally not bundled into the production service. Set `TRUST_PROXY=true` only when the API runs behind one trusted reverse proxy so rate limiting sees the originating client address.

## ESSL Microsoft Graph email notifications

Email is sent through Microsoft Graph using the OAuth 2.0 client-credentials flow. Set `EMAIL_ENABLED=true` and configure `MICROSOFT_TENANT_ID`, `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `ESS_SENDER_EMAIL`, `IT_ACCESS_EMAIL`, `FOOD_CAB_EMAIL`, `FINANCE_FACILITIES_EMAIL`, `OTHER_EMAIL`, optional comma-separated `MANDATORY_CC_EMAILS`, and `ESS_FRONTEND_URL`. The Entra application requires the Microsoft Graph `Mail.Send` application permission with administrator consent, and `ESS_SENDER_EMAIL` must be a real Exchange Online mailbox the application is allowed to use.

New tickets produce a category-routed support notification plus a separate employee confirmation. Mandatory CC recipients are applied only to the support notification. A status email is sent to the requester only after a ticket moves to a different status, with dedicated subjects for resolved and reopened tickets. Delivery success/failure is written to application logs and the `essl_email_logs` table; Graph failure does not roll back ticket creation or a saved status. When `EMAIL_ENABLED=false`, tickets continue to work and email delivery is intentionally skipped.

Apply the database change before enabling email:

```text
npm run migration:run
```

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
