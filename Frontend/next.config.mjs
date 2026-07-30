if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  process.env.NEXT_PUBLIC_API_URL = "http://localhost:5000";
}

if (!process.env.BACKEND_URL) {
  process.env.BACKEND_URL = "http://localhost:5000";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
  // Keep the development compiler separate from production `.next` builds.
  // This prevents a concurrent `next build` from invalidating dev assets.
  distDir: process.env.NODE_ENV === "development" ? "node_modules/.cache/4at-next-dev" : ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
