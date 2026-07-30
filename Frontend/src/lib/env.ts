import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  BACKEND_URL: z.string().url(),
});

const defaultUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:5000");

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: defaultUrl,
  BACKEND_URL:
    process.env.BACKEND_URL ??
    process.env.BACKEND_API_URL ??
    defaultUrl,
});

