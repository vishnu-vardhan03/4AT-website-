import { z } from "zod";

const DEFAULT_URL = "http://localhost:5000";

function safeUrl(val: string | undefined): string {
  if (!val || typeof val !== "string" || !val.trim()) {
    return DEFAULT_URL;
  }
  const trimmed = val.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

const rawApiUrl = safeUrl(
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.VERCEL_URL
);

const rawBackendUrl = safeUrl(
  process.env.BACKEND_URL ||
  process.env.BACKEND_API_URL ||
  rawApiUrl
);

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default(DEFAULT_URL),
  BACKEND_URL: z.string().default(DEFAULT_URL),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: rawApiUrl,
  BACKEND_URL: rawBackendUrl,
});

export const env = {
  NEXT_PUBLIC_API_URL: parsed.success ? parsed.data.NEXT_PUBLIC_API_URL : rawApiUrl,
  BACKEND_URL: parsed.success ? parsed.data.BACKEND_URL : rawBackendUrl,
};
