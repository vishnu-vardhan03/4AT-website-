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
        ESSL_UPLOAD_DIR: '/var/lib/4at/essl-uploads',
      }),
      /at least 32 characters/,
    );
  });

  it('accepts complete production configuration', () => {
    const config = {
      NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
      ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: '$2b$12$'.concat('x'.repeat(53)), FRONTEND_URL: 'https://example.com',
      ESSL_INTERNAL_API_KEY: 'y'.repeat(32), ESSL_UPLOAD_DIR: '/var/lib/4at/essl-uploads',
    };
    assert.equal(validateEnvironment(config), config);
  });

  it('requires an absolute private upload directory in production', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
        ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: '$2b$12$'.concat('x'.repeat(53)), FRONTEND_URL: 'https://example.com',
        ESSL_INTERNAL_API_KEY: 'y'.repeat(32), ESSL_UPLOAD_DIR: 'relative/uploads',
      }),
      /absolute path/,
    );
  });

  it('rejects a non-bcrypt production password hash', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
        ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: 'plaintext', FRONTEND_URL: 'https://example.com', ESSL_INTERNAL_API_KEY: 'y'.repeat(32),
        ESSL_UPLOAD_DIR: '/var/lib/4at/essl-uploads',
      }),
      /valid bcrypt hash/,
    );
  });

  it('requires complete Microsoft Graph configuration whenever email is enabled', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'development', EMAIL_ENABLED: 'true',
      }),
      /Microsoft Graph email configuration is incomplete.*MICROSOFT_TENANT_ID/,
    );
  });

  it('accepts complete Microsoft Graph configuration when email is enabled', () => {
    const config = {
      NODE_ENV: 'development', EMAIL_ENABLED: 'true', MICROSOFT_TENANT_ID: 'tenant', MICROSOFT_CLIENT_ID: 'client',
      MICROSOFT_CLIENT_SECRET: 'secret', ESS_SENDER_EMAIL: 'esssupport@consult-4at.com', IT_ACCESS_EMAIL: 'esssupport@consult-4at.com',
      FOOD_CAB_EMAIL: 'hrd@consult-4at.com', FINANCE_FACILITIES_EMAIL: 'finance@consult-4at.com', OTHER_EMAIL: 'other@consult-4at.com',
      ESS_FRONTEND_URL: 'http://localhost:3000/essl',
    };
    assert.equal(validateEnvironment(config), config);
  });

  it('requires email delivery and a recipient when the EOD schedule is enabled', () => {
    assert.throws(() => validateEnvironment({ NODE_ENV: 'development', EOD_SUMMARY_ENABLED: 'true' }), /requires EMAIL_ENABLED/);
    assert.throws(() => validateEnvironment({ NODE_ENV: 'development', EOD_SUMMARY_ENABLED: 'true', EMAIL_ENABLED: 'true' }), /EOD_SUMMARY_RECIPIENT/);
  });

  it('rejects an invalid EOD reporting timezone', () => {
    assert.throws(() => validateEnvironment({ NODE_ENV: 'development', EOD_SUMMARY_TIMEZONE: 'Mars/Olympus' }), /TIMEZONE is invalid/);
  });
});
