export const ESSL_ALLOWED_DOMAINS = ["consult-4at.com", "4at.ai"] as const;

export function isAllowedEsslEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  const separator = email.lastIndexOf("@");
  return separator > 0 && ESSL_ALLOWED_DOMAINS.includes(email.slice(separator + 1) as (typeof ESSL_ALLOWED_DOMAINS)[number]);
}
