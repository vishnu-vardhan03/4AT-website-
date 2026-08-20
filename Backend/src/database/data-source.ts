import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AcademyLead } from '../academy/academy-lead.entity';
import { AcademyRegistration } from '../academy/academy-registration.entity';
import { AiLead } from '../ai/ai-lead.entity';
import { ConsultingLead } from '../consulting/consulting-lead.entity';
import { InitialLeadTables1721640000000 } from './migrations/1721640000000-initial-lead-tables';
import { AcademyRegistrations1721640000001 } from './migrations/1721640000001-academy-registrations';
import { EsslTickets1721640000002 } from './migrations/1721640000002-essl-tickets';
import { EsslTicket } from '../essl/essl-ticket.entity';
import { EsslTicketAttachment } from '../essl/essl-ticket-attachment.entity';
import { EsslTicketAttachments1721640000003 } from './migrations/1721640000003-essl-ticket-attachments';
import { EsslTicketRequester1721640000004 } from './migrations/1721640000004-essl-ticket-requester';
import { EsslNotification } from '../essl/essl-notification.entity';
import { EsslNotifications1721640000005 } from './migrations/1721640000005-essl-notifications';
import { EsslEmailLog } from '../essl/essl-email-log.entity';
import { EsslStatusEmail1721640000006 } from './migrations/1721640000006-essl-status-email';
import { EsslCreatedEmailLog1721640000007 } from './migrations/1721640000007-essl-created-email-log';
import { EsslCabCategory1721640000008 } from './migrations/1721640000008-essl-cab-category';
import { EsslCategoriesAndActivity1721640000009 } from './migrations/1721640000009-essl-categories-and-activity';
import { EsslTicketActivity } from '../essl/essl-ticket-activity.entity';
import { EsslTicketReopening1721640000010 } from './migrations/1721640000010-essl-ticket-reopening';
import { EctmsRecord } from '../ectms/ectms-record.entity';
import { EctmsRecords1721640000011 } from './migrations/1721640000011-ectms-records';

const useUrl = Boolean(process.env.DATABASE_URL);

export default new DataSource({
  type: 'postgres',
  ...(useUrl
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASS ?? 'postgres',
        database: process.env.DB_NAME ?? '4at_consulting',
      }),
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false' }
    : false,
  synchronize: false,
  entities: [AcademyLead, AcademyRegistration, ConsultingLead, AiLead, EsslTicket, EsslTicketAttachment, EsslTicketActivity, EsslNotification, EsslEmailLog, EctmsRecord],
  migrations: [InitialLeadTables1721640000000, AcademyRegistrations1721640000001, EsslTickets1721640000002, EsslTicketAttachments1721640000003, EsslTicketRequester1721640000004, EsslNotifications1721640000005, EsslStatusEmail1721640000006, EsslCreatedEmailLog1721640000007, EsslCabCategory1721640000008, EsslCategoriesAndActivity1721640000009, EsslTicketReopening1721640000010, EctmsRecords1721640000011],
});
