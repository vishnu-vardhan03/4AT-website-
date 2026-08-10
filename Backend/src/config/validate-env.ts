const REQUIRED_IN_PRODUCTION = ['DATABASE_URL', 'JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD_HASH', 'FRONTEND_URL', 'ESSL_INTERNAL_API_KEY'] as const;

export function validateEnvironment(config: Record<string, unknown>): Record<string, unknown> {
  if (config.NODE_ENV !== 'production') return config;
  const missing = REQUIRED_IN_PRODUCTION.filter((key) => typeof config[key] !== 'string' || !String(config[key]).trim());
  if (missing.length) throw new Error(`Missing required production environment variables: ${missing.join(', ')}`);
  if (String(config.JWT_SECRET).length < 32) throw new Error('JWT_SECRET must contain at least 32 characters in production');
  if (String(config.ESSL_INTERNAL_API_KEY).length < 32) throw new Error('ESSL_INTERNAL_API_KEY must contain at least 32 characters in production');
  if (!/^\$2[aby]\$\d{2}\$.{53}$/.test(String(config.ADMIN_PASSWORD_HASH))) {
    throw new Error('ADMIN_PASSWORD_HASH must be a valid bcrypt hash in production');
  }
  if (config.EMAIL_ENABLED === 'true') {
    const emailRequired = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'SMTP_FROM', 'IT_SUPPORT_EMAIL', 'ESSL_TICKET_BASE_URL'];
    const missingEmail = emailRequired.filter((key) => typeof config[key] !== 'string' || !String(config[key]).trim());
    if (missingEmail.length) throw new Error(`Missing required email environment variables: ${missingEmail.join(', ')}`);
    const smtpPort = Number(config.SMTP_PORT);
    if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) throw new Error('SMTP_PORT must be a valid TCP port');
  }
  return config;
}
