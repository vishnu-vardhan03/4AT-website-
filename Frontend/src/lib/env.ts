import { z } from "zod";

const fallback = "http://localhost:5000";

function normalizeUrl(val?: string): string {
  if (!val || typeof val !== "string") return "";
  const trimmed = val.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

const defaultApiUrl =
  normalizeUrl(process.env.NEXT_PUBLIC_API_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_VERCEL_URL) ||
  normalizeUrl(process.env.VERCEL_URL) ||
  fallback;

const defaultBackendUrl =
  normalizeUrl(process.env.BACKEND_URL) ||
  normalizeUrl(process.env.BACKEND_API_URL) ||
  defaultApiUrl;

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().catch(fallback),
  BACKEND_URL: z.string().url().catch(fallback),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: defaultApiUrl,
  BACKEND_URL: defaultBackendUrl,
});


