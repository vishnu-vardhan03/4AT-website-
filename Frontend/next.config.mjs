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

if (process.env.NODE_ENV === "production") {
  const legacyAuth = (process.env.ESSL_AUTH_MODE ?? "legacy") !== "entra";
  const required = ["NEXTAUTH_SECRET", "ESSL_ADMIN_EMAIL", "ESSL_INTERNAL_API_KEY", ...(legacyAuth ? ["ESSL_ADMIN_PASSWORD"] : ["AZURE_AD_CLIENT_ID", "AZURE_AD_CLIENT_SECRET", "AZURE_AD_TENANT_ID"])];
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  if (process.env.NEXTAUTH_SECRET.length < 32) throw new Error("NEXTAUTH_SECRET must contain at least 32 characters in production");
  if (process.env.ESSL_INTERNAL_API_KEY.length < 32) throw new Error("ESSL_INTERNAL_API_KEY must contain at least 32 characters in production");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_ESSL_AUTH_MODE: process.env.ESSL_AUTH_MODE ?? "legacy",
  },

  // Allow Next.js dev assets when accessed through ngrok
  allowedDevOrigins: [
    "dwindling-unshipped-bamboo.ngrok-free.dev",
  ],

  distDir:
    process.env.NODE_ENV === "development"
      ? "node_modules/.cache/4at-next-dev"
      : ".next",

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    // React/Turbopack uses eval for development diagnostics; never allow it in production.
    const developmentScriptPolicy = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
    const csp = [
      "default-src 'self'", "base-uri 'self'", "form-action 'self'",
      "frame-ancestors 'none'", "object-src 'none'",
      `script-src 'self' 'unsafe-inline'${developmentScriptPolicy} https://www.googletagmanager.com`,
      "style-src 'self' 'unsafe-inline'", "font-src 'self' data:",
      // react-international-phone serves its Twemoji country flags from cdnjs.
      "img-src 'self' blob: data: https://cdn.sanity.io https://images.unsplash.com https://api.dicebear.com https://cdnjs.cloudflare.com",
      "media-src 'self'",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
      "upgrade-insecure-requests",
    ].join("; ");
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      ],
    }];
  },
};

export default nextConfig;
