# Production release checklist

1. Configure separate production secrets and never copy local `.env` files into source control.
2. Set backend `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and `FRONTEND_URL`.
3. Set frontend `BACKEND_URL`, `NEXT_PUBLIC_API_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
4. Run `npm ci` and `npm run check` in both `Backend` and `Frontend`.
5. Back up PostgreSQL, then run `npm run migration:run` from `Backend` before starting the new API version.
6. Verify `/health`, admin login, one test submission per lead category, and dashboard retrieval in staging.
7. Configure HTTPS, centralized redacted logs, uptime/error monitoring, database backups, and retention/deletion policies for lead data.
8. Set `TRUST_PROXY=true` only when exactly one trusted proxy sits in front of the backend. Keep Swagger disabled unless it is intentionally protected.

The GitHub Actions workflow runs the repeatable code checks for each push and pull request. Database migration, backup, infrastructure, and staging smoke tests remain deployment-environment responsibilities.
