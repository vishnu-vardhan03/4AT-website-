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
        ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: 'hash', FRONTEND_URL: 'https://example.com',
      }),
      /at least 32 characters/,
    );
  });

  it('accepts complete production configuration', () => {
    const config = {
      NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
      ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: '$2b$12$'.concat('x'.repeat(53)), FRONTEND_URL: 'https://example.com',
    };
    assert.equal(validateEnvironment(config), config);
  });

  it('rejects a non-bcrypt production password hash', () => {
    assert.throws(
      () => validateEnvironment({
        NODE_ENV: 'production', DATABASE_URL: 'postgres://database', JWT_SECRET: 'x'.repeat(32),
        ADMIN_USERNAME: 'admin', ADMIN_PASSWORD_HASH: 'plaintext', FRONTEND_URL: 'https://example.com',
      }),
      /valid bcrypt hash/,
    );
  });
});
