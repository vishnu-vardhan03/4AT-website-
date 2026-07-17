import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  LEADS_API_KEY: z.string().min(32).optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.NODE_ENV === "development" ? "http://localhost:5000" : undefined),
  LEADS_API_KEY: process.env.LEADS_API_KEY,
});
