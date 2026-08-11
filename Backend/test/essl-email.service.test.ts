import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ConfigService } from '@nestjs/config';
import type { Repository } from 'typeorm';
import { categoryEnvironmentKey, EsslEmailService, parseMandatoryCc } from '../src/essl/essl-email.service';
import type { EsslEmailLog } from '../src/essl/essl-email-log.entity';
import type { EsslTicket } from '../src/essl/essl-ticket.entity';

describe('ESSL mandatory email CC parsing', () => {
  it('parses, normalizes, and de-duplicates configured recipients', () => {
    assert.deepEqual(
      parseMandatoryCc(' shashank@consult-4at.com,prudviraju@consult-4at.com,SHASHANK@consult-4at.com ', ['esssupport@consult-4at.com']),
      ['shashank@consult-4at.com', 'prudviraju@consult-4at.com'],
    );
  });

  it('removes the primary recipient and ignores empty or invalid values', () => {
    assert.deepEqual(
      parseMandatoryCc('esssupport@consult-4at.com,,not-an-email,prudviraju@consult-4at.com', ['ESSSupport@consult-4at.com']),
      ['prudviraju@consult-4at.com'],
    );
  });

  it('routes every live ticket category through backend configuration', () => {
    assert.equal(categoryEnvironmentKey('IT & Access'), 'IT_ACCESS_EMAIL');
    assert.equal(categoryEnvironmentKey('Food'), 'FOOD_CAB_EMAIL');
    assert.equal(categoryEnvironmentKey('Cab'), 'FOOD_CAB_EMAIL');
    assert.equal(categoryEnvironmentKey('Facilities'), 'FINANCE_FACILITIES_EMAIL');
    assert.equal(categoryEnvironmentKey('Finance & Admin'), 'FINANCE_FACILITIES_EMAIL');
    assert.equal(categoryEnvironmentKey('Others'), 'OTHER_EMAIL');
  });

  it('sends category support and employee confirmation messages through Microsoft Graph', async () => {
    const originalFetch = globalThis.fetch;
    const requests: Array<{ url: string; body?: string }> = [];
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
      requests.push({ url, body: typeof init?.body === 'string' ? init.body : undefined });
      if (url.includes('/oauth2/v2.0/token')) {
        return new Response(JSON.stringify({ access_token: 'test-token', expires_in: 3600 }), { status: 200 });
      }
      return new Response(null, { status: 202 });
    });
    const savedLogs: Partial<EsslEmailLog>[] = [];
    const logRepo = {
      create: (value: Partial<EsslEmailLog>) => value,
      save: async (value: Partial<EsslEmailLog>) => { savedLogs.push(value); return value; },
    } as unknown as Repository<EsslEmailLog>;
    const config = new ConfigService({
      EMAIL_ENABLED: 'true', MICROSOFT_TENANT_ID: 'tenant', MICROSOFT_CLIENT_ID: 'client', MICROSOFT_CLIENT_SECRET: 'secret',
      ESS_SENDER_EMAIL: 'esssupport@consult-4at.com', FOOD_CAB_EMAIL: 'hrd@consult-4at.com',
      MANDATORY_CC_EMAILS: 'shashank@consult-4at.com,prudviraju@consult-4at.com', ESS_FRONTEND_URL: 'http://localhost:3000/essl',
    });
    const ticket = {
      id: 14, subject: 'Cab request', description: 'Need transport', category: 'Cab', priority: 'Medium', status: 'New',
      requesterEmail: 'employee@consult-4at.com', createdAt: new Date('2026-08-11T10:00:00Z'), updatedAt: new Date('2026-08-11T10:00:00Z'),
    } as EsslTicket;
    try {
      assert.equal(await new EsslEmailService(config, logRepo).sendTicketCreated(ticket), true);
    } finally {
      globalThis.fetch = originalFetch;
    }
    assert.equal(requests.length, 3);
    assert.match(requests[0].url, /login\.microsoftonline\.com\/tenant\/oauth2\/v2\.0\/token/);
    assert.equal(requests[1].url, 'https://graph.microsoft.com/v1.0/users/esssupport%40consult-4at.com/sendMail');
    const supportPayload = JSON.parse(requests[1].body ?? '{}') as { message: { toRecipients: Array<{ emailAddress: { address: string } }>; ccRecipients: Array<{ emailAddress: { address: string } }> } };
    assert.deepEqual(supportPayload.message.toRecipients.map((item) => item.emailAddress.address), ['hrd@consult-4at.com']);
    assert.deepEqual(supportPayload.message.ccRecipients.map((item) => item.emailAddress.address), ['shashank@consult-4at.com', 'prudviraju@consult-4at.com']);
    const employeePayload = JSON.parse(requests[2].body ?? '{}') as { message: { toRecipients: Array<{ emailAddress: { address: string } }>; ccRecipients: unknown[] } };
    assert.deepEqual(employeePayload.message.toRecipients.map((item) => item.emailAddress.address), ['employee@consult-4at.com']);
    assert.deepEqual(employeePayload.message.ccRecipients, []);
    assert.equal(savedLogs.length, 2);
  });
});
