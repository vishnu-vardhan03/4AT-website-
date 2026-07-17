const nextConfig = {
  // Keep high-churn development output in the dependency cache. OneDrive
  // leaves this tree local, preventing Files On-Demand readlink failures.
  distDir: process.env.NODE_ENV === "development" ? "node_modules/.cache/4at-next-dev" : ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

module.exports = nextConfig;
