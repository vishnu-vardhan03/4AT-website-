/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};
export default nextConfig;
