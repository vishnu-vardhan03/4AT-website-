import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ConfigService } from '@nestjs/config';
import type { ExecutionContext } from '@nestjs/common';
import { EsslInternalGuard } from '../src/essl/essl-internal.guard';

function context(header?: string): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ header: () => header }) }),
  } as unknown as ExecutionContext;
}

describe('EsslInternalGuard', () => {
  const key = 'a'.repeat(32);
  const guard = new EsslInternalGuard({ get: () => key } as unknown as ConfigService);

  it('accepts the configured internal service key', () => {
    assert.equal(guard.canActivate(context(key)), true);
  });

  it('rejects missing, incorrect, and different-length keys', () => {
    assert.throws(() => guard.canActivate(context()), /service authentication is required/);
    assert.throws(() => guard.canActivate(context('b'.repeat(32))), /service authentication is required/);
    assert.throws(() => guard.canActivate(context('short')), /service authentication is required/);
  });
});
