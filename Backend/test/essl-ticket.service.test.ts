import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Repository } from 'typeorm';
import { EsslTicketService } from '../src/essl/essl-ticket.service';
import type { EsslTicket } from '../src/essl/essl-ticket.entity';
import type { EsslTicketAttachment } from '../src/essl/essl-ticket-attachment.entity';
import type { EsslNotification } from '../src/essl/essl-notification.entity';
import type { EsslEmailService } from '../src/essl/essl-email.service';

function setup(emailResult: 'success' | 'throw' = 'success') {
  const ticket = {
    id: 42, subject: 'VPN access', description: 'Cannot connect', category: 'IT & Access', priority: 'High',
    status: 'New', requesterEmail: 'employee@consult-4at.com', adminComment: null,
  } as EsslTicket;
  let ticketSaveCount = 0;
  let emailCount = 0;
  let createdEmailCount = 0;
  let emailInput: unknown;
  const ticketRepo = {
    create: (value: Partial<EsslTicket>) => Object.assign(ticket, value),
    findOneBy: async () => ticket,
    save: async (value: EsslTicket) => { ticketSaveCount++; return value; },
  } as unknown as Repository<EsslTicket>;
  const notificationRepo = {
    create: (value: unknown) => value,
    save: async (value: unknown) => value,
  } as unknown as Repository<EsslNotification>;
  const emailService = {
    sendTicketCreated: async () => { createdEmailCount++; if (emailResult === 'throw') throw new Error('SMTP unavailable'); return true; },
    sendStatusChanged: async (input: unknown) => {
      emailCount++;
      emailInput = input;
      if (emailResult === 'throw') throw new Error('SMTP unavailable');
      return true;
    },
  } as unknown as EsslEmailService;
  const service = new EsslTicketService(
    ticketRepo,
    {} as Repository<EsslTicketAttachment>,
    notificationRepo,
    emailService,
  );
  return { service, ticket, counts: () => ({ ticketSaveCount, emailCount, createdEmailCount, emailInput }) };
}

describe('EsslTicketService status email notifications', () => {
  it('emails IT support once after a ticket is created', async () => {
    const test = setup();
    const result = await test.service.create({
      subject: 'VPN access', description: 'Cannot connect', category: 'IT & Access', priority: 'High', requesterEmail: 'employee@consult-4at.com',
    });
    assert.equal(result.id, 42);
    assert.equal(test.counts().createdEmailCount, 1);
    assert.equal(test.counts().emailCount, 0);
  });

  it('does not save or email when the status is unchanged', async () => {
    const test = setup();
    const result = await test.service.updateStatus(42, { status: 'New', adminComment: 'No change' });
    assert.equal(result.status, 'New');
    assert.deepEqual(test.counts(), { ticketSaveCount: 0, emailCount: 0, createdEmailCount: 0, emailInput: undefined });
  });

  it('sends one email after a real status change with previous/new status and comment', async () => {
    const test = setup();
    const result = await test.service.updateStatus(42, { status: 'In progress', adminComment: 'Investigating the VPN gateway.' });
    assert.equal(result.status, 'In progress');
    assert.equal(result.adminComment, 'Investigating the VPN gateway.');
    const counts = test.counts();
    assert.equal(counts.ticketSaveCount, 1);
    assert.equal(counts.emailCount, 1);
    assert.deepEqual(counts.emailInput, {
      ticket: test.ticket, previousStatus: 'New', newStatus: 'In progress', adminComment: 'Investigating the VPN gateway.',
    });
  });

  it('keeps the saved status when the email layer unexpectedly throws', async () => {
    const test = setup('throw');
    const result = await test.service.updateStatus(42, { status: 'Resolved', adminComment: 'Access restored.' });
    assert.equal(result.status, 'Resolved');
    assert.equal(test.counts().ticketSaveCount, 1);
    assert.equal(test.counts().emailCount, 1);
  });
});
