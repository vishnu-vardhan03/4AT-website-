# Production audit

Audit date: 10 August 2026

## Automated evidence

- Backend `npm run check`: pass — strict lint, 10 tests, TypeScript compilation, and Nest production build.
- Frontend `npm run check`: pass — lint, TypeScript, Next.js 16.3.0 production build, and standalone artifact preparation.
- Frontend `npm audit --audit-level=high`: 0 vulnerabilities.
- Backend `npm audit --audit-level=high`: 0 vulnerabilities.
- Selenium against the standalone production server: 4 passed, 0 failed, 1 conditional authenticated test skipped because no staging session cookie was supplied.

## Security controls added for ESSL

- ESSL temporarily runs with `ESSL_AUTH_MODE=legacy`: employee access checks an approved email domain and technician access checks the configured email and password.
- Microsoft Entra ID support remains implemented for the planned migration, but legacy mode does not verify employee ownership of a submitted address.
- Backend ESSL ticket and notification controllers require a timing-safe `ESSL_INTERNAL_API_KEY` check.
- Employee ticket retrieval is filtered by verified session email; technicians receive the operational queue.
- Frontend production builds fail closed when Entra, session-secret, technician-email, or internal-key settings are missing.

## Selenium coverage

- Public homepage smoke test and semantic landmarks.
- Unauthenticated `/essl` protection and redirect.
- Temporary organization-domain login control.
- Mobile horizontal-overflow and 44px touch-target checks.
- CSP, MIME-sniffing, and frame-protection headers.
- Optional authenticated staging-cookie assertion.

Run with:

```text
cd Frontend
SELENIUM_BASE_URL=https://staging.example.com npm run test:selenium
```

Use `SELENIUM_BROWSER=edge` for Edge and `SELENIUM_HEADLESS=false` for an observed local run.

## Deployment-only release gates

- Create and approve the Microsoft Entra application, redirect URI, tenant consent, and a non-personal technician identity.
- Provision unique production secrets; verify rotation and keep the backend from being independently internet-exposed where practical.
- Back up PostgreSQL and apply all migrations in staging and production.
- Confirm persistent attachment storage, malware scanning or quarantine, retention/deletion, and restore testing.
- Run the authenticated Selenium assertion with a short-lived staging cookie, plus manual ticket, technician, notification, logout, and cross-user isolation tests.
- Run Lighthouse, axe, keyboard-only, 200% zoom, high-contrast, and screen-reader tests on the deployed URL in current Chrome, Edge, Firefox, and Safari.
- Configure centralized redacted logging, alerting, uptime monitoring, encrypted backups, and rollback procedures.

## Readiness verdict

Code readiness: **pass for internal staging and formal audit testing**. Legacy ESSL authentication is not approved for an internet-facing production release.

Production deployment approval remains conditional on the deployment-only gates above. Source checks cannot certify real Entra configuration, database recovery, browser accessibility, hosting performance, monitoring, or operational rollback.
