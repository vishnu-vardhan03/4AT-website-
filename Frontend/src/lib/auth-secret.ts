const DEVELOPMENT_SESSION_SECRET = "4at-local-development-session-secret-not-for-production";

export const authSecret = process.env.NEXTAUTH_SECRET
  ?? (process.env.NODE_ENV === "production" ? undefined : DEVELOPMENT_SESSION_SECRET);
