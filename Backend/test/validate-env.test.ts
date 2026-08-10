import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateEnvironment } from '../src/config/validate-env';

describe('validateEnvironment', () => {
  it('allows incomplete development configuration', () => {
    const config = { NODE_ENV: 'development' };
    assert.equal(validateEnvironment(config), config);
  });

  it('rejects missing production configuration', () => {
    assert.throws(() => validateEnvironment({ NODE_ENV: 'production' }), /Missing required production/);
  });

  it('rejects a weak production JWT secret', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'short',
        ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: 'hash', FRONTEND_URL: 'https://example.com', ESSL_INTERNAL_API_KEY: 'y'.repeat(32),
      }),
      /at least 32 characters/,
    );
  });

  it('accepts complete production configuration', () => {
    const config = {
      NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
      ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: '$2b$12$'.concat('x'.repeat(53)), FRONTEND_URL: 'https://example.com',
      ESSL_INTERNAL_API_KEY: 'y'.repeat(32),
    };
    assert.equal(validateEnvironment(config), config);
  });

  it('rejects a non-bcrypt production password hash', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
        ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: 'plaintext', FRONTEND_URL: 'https://example.com', ESSL_INTERNAL_API_KEY: 'y'.repeat(32),
      }),
      /valid bcrypt hash/,
    );
  });

  it('requires complete SMTP configuration when production email is enabled', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
        ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: '$2b$12$'.concat('x'.repeat(53)),
        FRONTEND_URL: 'https://example.com', ESSL_INTERNAL_API_KEY: 'y'.repeat(32), EMAIL_ENABLED: 'true',
      }),
      /Missing required email environment variables/,
    );
  });
});
