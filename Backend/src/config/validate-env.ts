const REQUIRED_IN_PRODUCTION = ['DATABASE_URL', 'JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD_HASH', 'FRONTEND_URL', 'ESSL_INTERNAL_API_KEY'] as const;

export function validateEnvironment(config: Record<string, unknown>): Record<string, unknown> {
  if (config.EOD_SUMMARY_ENABLED === 'true') {
    if (config.EMAIL_ENABLED !== 'true') throw new Error('EOD_SUMMARY_ENABLED requires EMAIL_ENABLED=true');
    if (typeof config.EOD_SUMMARY_RECIPIENT !== 'string' || !config.EOD_SUMMARY_RECIPIENT.trim()) {
      throw new Error('EOD summary configuration is incomplete. Missing configuration: EOD_SUMMARY_RECIPIENT');
    }
  }
  const timeZone = typeof config.EOD_SUMMARY_TIMEZONE === 'string' ? config.EOD_SUMMARY_TIMEZONE : 'Asia/Kolkata';
  try {
    new Intl.DateTimeFormat('en-US', { timeZone }).format();
  } catch {
    throw new Error(`EOD_SUMMARY_TIMEZONE is invalid: ${timeZone}`);
  }
  if (config.EMAIL_ENABLED === 'true') {
    const graphRequired = [
      'MICROSOFT_TENANT_ID', 'MICROSOFT_CLIENT_ID', 'MICROSOFT_CLIENT_SECRET', 'ESS_SENDER_EMAIL',
      'IT_ACCESS_EMAIL', 'FOOD_CAB_EMAIL', 'FINANCE_FACILITIES_EMAIL', 'OTHER_EMAIL', 'ESS_FRONTEND_URL',
    ];
    const missingGraph = graphRequired.filter((key) => typeof config[key] !== 'string' || !String(config[key]).trim());
    if (missingGraph.length) throw new Error(`Microsoft Graph email configuration is incomplete. Missing configuration: ${missingGraph.join(', ')}`);
  }
  if (config.NODE_ENV !== 'production') return config;
  const missing = REQUIRED_IN_PRODUCTION.filter((key) => typeof config[key] !== 'string' || !String(config[key]).trim());
  if (missing.length) throw new Error(`Missing required production environment variables: ${missing.join(', ')}`);
  if (String(config.JWT_SECRET).length < 32) throw new Error('JWT_SECRET must contain at least 32 characters in production');
  if (String(config.ESSL_INTERNAL_API_KEY).length < 32) throw new Error('ESSL_INTERNAL_API_KEY must contain at least 32 characters in production');
  if (!/^\$2[aby]\$\d{2}\$.{53}$/.test(String(config.ADMIN_PASSWORD_HASH))) {
    throw new Error('ADMIN_PASSWORD_HASH must be a valid bcrypt hash in production');
  }
  return config;
}
