# Production release checklist

1. Configure separate production secrets and never copy local `.env` files into source control.
2. Set backend `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `FRONTEND_URL`, and a random `ESSL_INTERNAL_API_KEY` of at least 32 characters. Admin login is bcrypt-only and fails closed. ESSL controllers reject every request without the internal key. Add extra CORS origins through `ALLOWED_ORIGINS`; it is unioned with `FRONTEND_URL`.
3. For temporary internal testing, set `ESSL_AUTH_MODE=legacy`, `ESSL_ADMIN_EMAIL`, and `ESSL_ADMIN_PASSWORD`. Also set `BACKEND_URL`, `NEXT_PUBLIC_API_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and the shared `ESSL_INTERNAL_API_KEY`. Legacy mode must not be treated as final internet-facing production authentication because employee email ownership is not verified.
4. Before final production approval, change away from legacy mode and configure `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, and `AZURE_AD_TENANT_ID`. Register `${NEXTAUTH_URL}/api/auth/callback/azure-ad` as the Microsoft Entra redirect URI.
5. Run `npm ci` and `npm run check` in both `Backend` and `Frontend`. The frontend uses Next.js standalone output and starts with `npm start`.
6. Back up PostgreSQL, run `npm run migration:run` from `Backend`, and confirm with `npm run migration:show` that every migration is applied. Migration `1721640000006` adds the `Closed` status, admin comments, and persistent email delivery logs.
7. Configure backend SMTP variables (`EMAIL_ENABLED`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM`, optional `SMTP_REPLY_TO`, `IT_SUPPORT_EMAIL`, and `ESSL_TICKET_BASE_URL`) and verify `ticket-created` and `status-changed` sent/failed records in `essl_email_logs`. Migration `1721640000007` adds event-specific logging.
8. Verify `/health`, admin login, one submission per lead category, ESSL employee sign-in, ticket creation, technician status changes, email/in-app notification delivery, requester isolation, and dashboard retrieval in staging.
9. Run Selenium from `Frontend`: `SELENIUM_BASE_URL=https://staging.example.com npm run test:selenium`. Supply a valid `SELENIUM_SESSION_COOKIE` to include the authenticated ESSL assertion; never store the cookie in source control or CI logs.
10. Run Lighthouse, axe, keyboard-only, 200% zoom, high-contrast, and screen-reader checks against the deployed staging URL.
11. Configure HTTPS, centralized redacted logs, uptime/error monitoring, database backups, attachment persistence and scanning, and retention/deletion policies.
12. Set `TRUST_PROXY=true` only when exactly one trusted proxy sits in front of the backend. API documentation is not bundled into the production service.

The GitHub Actions workflow runs repeatable code checks on pushes and pull requests. Database backup/restore, migrations, Entra tenant approval, authenticated staging tests, accessibility checks, infrastructure monitoring, and rollback validation remain release-environment responsibilities.
