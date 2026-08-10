const DEVELOPMENT_ESSL_API_KEY = "4at-local-development-essl-api-key-not-for-production";

export const esslInternalApiKey = process.env.ESSL_INTERNAL_API_KEY
  ?? (process.env.NODE_ENV === "production" ? "" : DEVELOPMENT_ESSL_API_KEY);
