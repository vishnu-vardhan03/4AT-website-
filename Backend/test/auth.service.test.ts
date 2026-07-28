import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/auth.service';

function createService(config: Record<string, string>) {
  const jwtService = {
    signAsync: async () => 'signed-access-token',
  } as unknown as JwtService;
  const configService = {
    get: (key: string) => config[key],
  } as unknown as ConfigService;
  return new AuthService(jwtService, configService);
}

describe('AuthService', () => {
  it('accepts only the configured username and bcrypt password', async () => {
    const passwordHash = await bcrypt.hash('correct-password', 4);
    const service = createService({ ADMIN_USERNAME: 'owner', ADMIN_PASSWORD_HASH: passwordHash });

    assert.deepEqual(await service.validateLogin('owner', 'correct-password'), { role: 'admin' });
    assert.equal(await service.validateLogin('owner', 'wrong-password'), null);
    assert.equal(await service.validateLogin('admin', 'correct-password'), null);
  });

  it('fails closed when credentials are not configured', async () => {
    const service = createService({});
    assert.equal(await service.validateLogin('admin', 'any-password'), null);
  });

  it('returns a signed access token after valid authentication', async () => {
    const passwordHash = await bcrypt.hash('correct-password', 4);
    const service = createService({ ADMIN_USERNAME: 'owner', ADMIN_PASSWORD_HASH: passwordHash });

    assert.deepEqual(await service.login('owner', 'correct-password'), {
      accessToken: 'signed-access-token',
    });
    await assert.rejects(() => service.login('owner', 'wrong-password'), /Invalid credentials/);
  });
});
