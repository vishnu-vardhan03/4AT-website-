import { join, resolve } from 'path';

/** Files here are private and must only be served by the guarded controller. */
export function esslUploadDirectory(): string {
  const configured = process.env.ESSL_UPLOAD_DIR?.trim();
  if (configured) return resolve(configured);
  return join(process.cwd(), 'uploads', 'essl');
}
