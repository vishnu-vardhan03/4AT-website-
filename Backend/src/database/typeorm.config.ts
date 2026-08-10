import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InitialLeadTables1721640000000 } from './migrations/1721640000000-initial-lead-tables';
import { AcademyRegistrations1721640000001 } from './migrations/1721640000001-academy-registrations';
import { EsslTickets1721640000002 } from './migrations/1721640000002-essl-tickets';
import { EsslTicketAttachments1721640000003 } from './migrations/1721640000003-essl-ticket-attachments';
import { EsslTicketRequester1721640000004 } from './migrations/1721640000004-essl-ticket-requester';
import { EsslNotifications1721640000005 } from './migrations/1721640000005-essl-notifications';
import { EsslStatusEmail1721640000006 } from './migrations/1721640000006-essl-status-email';
import { EsslCreatedEmailLog1721640000007 } from './migrations/1721640000007-essl-created-email-log';

export function getTypeOrmConfig(config: ConfigService): TypeOrmModuleOptions {
  const url = config.get<string>('DATABASE_URL');
  const common: TypeOrmModuleOptions = {
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: false,
    migrations: [InitialLeadTables1721640000000, AcademyRegistrations1721640000001, EsslTickets1721640000002, EsslTicketAttachments1721640000003, EsslTicketRequester1721640000004, EsslNotifications1721640000005, EsslStatusEmail1721640000006, EsslCreatedEmailLog1721640000007],
    ssl: config.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
  };

  return url
    ? { ...common, url }
    : {
        ...common,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASS', 'postgres'),
        database: config.get<string>('DB_NAME', '4at_consulting'),
      };
}
