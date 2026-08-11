import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Repository } from 'typeorm';
import { EsslTicketService } from '../src/essl/essl-ticket.service';
import type { EsslTicket } from '../src/essl/essl-ticket.entity';
import type { EsslTicketAttachment } from '../src/essl/essl-ticket-attachment.entity';
import type { EsslNotification } from '../src/essl/essl-notification.entity';
import type { EsslEmailService } from '../src/essl/essl-email.service';
import type { EsslTicketActivity } from '../src/essl/essl-ticket-activity.entity';

function setup(emailResult: 'success' | 'throw' = 'success') {
  const ticket = {
    id: 42, subject: 'VPN access', description: 'Cannot connect', category: 'IT & Access', priority: 'High',
    status: 'New', requesterEmail: 'employee@consult-4at.com', adminComment: null, reopenCount: 0, escalationLevel: 0, attachments: [], activities: [], createdAt: new Date(), updatedAt: new Date(),
  } as EsslTicket;
  let ticketSaveCount = 0;
  let emailCount = 0;
  let createdEmailCount = 0;
  let activitySaveCount = 0;
  let emailInput: unknown;
  const ticketRepo = {
    create: (value: Partial<EsslTicket>) => Object.assign(ticket, value),
    findOne: async () => ticket,
    save: async (value: EsslTicket) => { ticketSaveCount++; return value; },
  } as unknown as Repository<EsslTicket>;
  const notificationRepo = {
    create: (value: unknown) => value,
    save: async (value: unknown) => value,
  } as unknown as Repository<EsslNotification>;
  const activityRepo = {
    create: (value: Partial<EsslTicketActivity>) => value,
    save: async (value: EsslTicketActivity) => { activitySaveCount++; return Object.assign(value, { id: activitySaveCount, createdAt: new Date() }); },
  } as unknown as Repository<EsslTicketActivity>;
  const emailService = {
    sendTicketCreated: async () => { createdEmailCount++; if (emailResult === 'throw') throw new Error('Graph unavailable'); return true; },
    sendStatusChanged: async (input: unknown) => {
      emailCount++;
      emailInput = input;
      if (emailResult === 'throw') throw new Error('Graph unavailable');
      return true;
    },
  } as unknown as EsslEmailService;
  const service = new EsslTicketService(
    ticketRepo,
    {} as Repository<EsslTicketAttachment>,
    activityRepo,
    notificationRepo,
    emailService,
  );
  return { service, ticket, counts: () => ({ ticketSaveCount, activitySaveCount, emailCount, createdEmailCount, emailInput }) };
}

describe('EsslTicketService status email notifications', () => {
  it('emails ESS Support once after a ticket is created', async () => {
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
    const result = await test.service.updateStatus(42, { status: 'New' });
    assert.equal(result.status, 'New');
    assert.deepEqual(test.counts(), { ticketSaveCount: 0, activitySaveCount: 0, emailCount: 0, createdEmailCount: 0, emailInput: undefined });
  });

  it('records a saved admin note without sending a status email', async () => {
    const test = setup();
    const result = await test.service.updateStatus(42, { status: 'New', adminComment: 'Employee contacted for more information.' });
    assert.equal(result.status, 'New');
    assert.equal(result.adminComment, 'Employee contacted for more information.');
    assert.equal(test.counts().ticketSaveCount, 1);
    assert.equal(test.counts().activitySaveCount, 1);
    assert.equal(test.counts().emailCount, 0);
  });

  it('sends one email after a real status change with previous/new status and comment', async () => {
    const test = setup();
    const result = await test.service.updateStatus(42, { status: 'In progress', adminComment: 'Investigating the VPN gateway.' });
    assert.equal(result.status, 'In progress');
    assert.equal(result.adminComment, 'Investigating the VPN gateway.');
    const counts = test.counts();
    assert.equal(counts.ticketSaveCount, 1);
    assert.equal(counts.activitySaveCount, 1);
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

describe('EsslTicketService employee reopening', () => {
  it('reopens a closed ticket with a reason and increases escalation on each reopen', async () => {
    const test = setup();
    test.ticket.status = 'Closed';
    const first = await test.service.reopen(42, { requesterEmail: 'employee@consult-4at.com', reason: 'The VPN connection is failing again.' });
    assert.equal(first.status, 'Reopened');
    assert.equal(first.reopenCount, 1);
    assert.equal(first.escalationLevel, 1);
    assert.equal(first.activities.at(-1)?.eventType, 'reopened');
    assert.equal(first.activities.at(-1)?.comment, 'The VPN connection is failing again.');
    assert.equal(test.counts().emailCount, 1);

    test.ticket.status = 'Closed';
    const second = await test.service.reopen(42, { requesterEmail: 'employee@consult-4at.com', reason: 'The second resolution did not restore access.' });
    assert.equal(second.reopenCount, 2);
    assert.equal(second.escalationLevel, 2);
    assert.equal(test.counts().emailCount, 2);
  });

  it('rejects a reopen request from another employee', async () => {
    const test = setup();
    test.ticket.status = 'Closed';
    await assert.rejects(() => test.service.reopen(42, { requesterEmail: 'other@consult-4at.com', reason: 'Please reopen this ticket.' }), /Ticket not found/);
  });
});

describe('EsslTicketService employee editing', () => {
  it('updates an open ticket owned by the employee and records the edit', async () => {
    const test = setup();
    const result = await test.service.edit(42, {
      requesterEmail: 'employee@consult-4at.com', subject: 'VPN and email access', description: 'Both services are unavailable', category: 'IT & Access', priority: 'Medium',
    });
    assert.equal(result.subject, 'VPN and email access');
    assert.equal(result.description, 'Both services are unavailable');
    assert.equal(result.priority, 'Medium');
    assert.equal(result.activities.at(-1)?.eventType, 'edited');
    assert.match(result.activities.at(-1)?.comment ?? '', /subject, description, priority/);
    assert.equal(test.counts().ticketSaveCount, 1);
    assert.equal(test.counts().activitySaveCount, 1);
  });

  it('rejects edits from another employee', async () => {
    const test = setup();
    await assert.rejects(() => test.service.edit(42, {
      requesterEmail: 'other@consult-4at.com', subject: 'Changed', description: 'Changed description', category: 'Others', priority: 'Low',
    }), /Ticket not found/);
  });

  it('rejects edits after the ticket is closed', async () => {
    const test = setup();
    test.ticket.status = 'Closed';
    await assert.rejects(() => test.service.edit(42, {
      requesterEmail: 'employee@consult-4at.com', subject: 'Changed', description: 'Changed description', category: 'Others', priority: 'Low',
    }), /closed ticket cannot be edited/i);
  });
});
