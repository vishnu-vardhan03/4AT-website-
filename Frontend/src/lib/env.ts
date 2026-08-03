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

export const env = {
  NEXT_PUBLIC_API_URL: safeUrl(
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL
  ),
  BACKEND_URL: safeUrl(
    process.env.BACKEND_URL ||
    process.env.BACKEND_API_URL ||
    safeUrl(
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      process.env.VERCEL_URL
    )
  ),
};
