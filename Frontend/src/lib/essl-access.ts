export const ESSL_ALLOWED_DOMAINS = ["consult-4at.com", "4at.ai"] as const;

export function isAllowedEsslEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  const separator = email.lastIndexOf("@");
  return separator > 0 && ESSL_ALLOWED_DOMAINS.includes(email.slice(separator + 1) as (typeof ESSL_ALLOWED_DOMAINS)[number]);
}

export function getCabRole(emailValue: string): "technician" | "nodal" | "finance" | "employee" {
  const email = emailValue.trim().toLowerCase();
  if (email === process.env.ESSL_ADMIN_EMAIL?.trim().toLowerCase()) return "technician";
  const nodal = (process.env.ESSL_NODAL_EMAILS ?? "").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  const finance = (process.env.ESSL_FINANCE_EMAILS ?? "").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (nodal.includes(email)) return "nodal";
  if (finance.includes(email)) return "finance";
  return "employee";
}
