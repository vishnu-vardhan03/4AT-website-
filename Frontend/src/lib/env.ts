import { z } from "zod";

const urlSchema = z.string().url();

const devFallback = process.env.NODE_ENV === "development" ? "http://localhost:5000" : undefined;

function resolveUrl(label: string, hint: string, candidates: (string | undefined)[]): string {
  const value = candidates.find((candidate) => candidate && candidate.trim());
  const parsed = urlSchema.safeParse(value);
  if (!parsed.success) throw new Error(`${label} is not configured. ${hint}`);
  return parsed.data;
}

let backendUrl: string | undefined;
let publicApiUrl: string | undefined;

/**
 * Base URL of the Nest backend. Single source of truth — every server-side caller (public
 * lead intake, academy registration, admin auth, dashboard queries) must resolve through
 * here. Divergent local fallback chains previously let public lead intake point at
 * localhost while the dashboard talked to the real API, silently dropping every lead.
 *
 * Resolved lazily and cached: reading it at module load would make `next build` fail in
 * environments that legitimately have no runtime configuration.
 */
export function getBackendUrl(): string {
  backendUrl ??= resolveUrl(
    "BACKEND_URL",
    "Set BACKEND_URL (or BACKEND_API_URL / NEXT_PUBLIC_API_URL) to the Nest API base URL.",
    [process.env.BACKEND_URL, process.env.BACKEND_API_URL, process.env.NEXT_PUBLIC_API_URL, devFallback],
  );
  return backendUrl;
}

/** Browser-visible API base URL. */
export function getPublicApiUrl(): string {
  publicApiUrl ??= resolveUrl("NEXT_PUBLIC_API_URL", "Set NEXT_PUBLIC_API_URL to the public API base URL.", [
    process.env.NEXT_PUBLIC_API_URL,
    devFallback,
  ]);
  return publicApiUrl;
}

/** Property-style access over the lazy resolvers above. */
export const env = {
  get BACKEND_URL(): string {
    return getBackendUrl();
  },
  get NEXT_PUBLIC_API_URL(): string {
    return getPublicApiUrl();
  },
};
