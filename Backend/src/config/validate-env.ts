const REQUIRED_IN_PRODUCTION = ['DATABASE_URL', 'JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD_HASH', 'FRONTEND_URL'] as const;

export function validateEnvironment(config: Record<string, unknown>): Record<string, unknown> {
  if (config.NODE_ENV !== 'production') return config;
  const missing = REQUIRED_IN_PRODUCTION.filter((key) => typeof config[key] !== 'string' || !String(config[key]).trim());
  if (missing.length) throw new Error(`Missing required production environment variables: ${missing.join(', ')}`);
  if (String(config.JWT_SECRET).length < 32) throw new Error('JWT_SECRET must contain at least 32 characters in production');
  return config;
}
