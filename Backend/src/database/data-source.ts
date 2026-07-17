import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AcademyLead } from '../academy/academy-lead.entity';
import { AiLead } from '../ai/ai-lead.entity';
import { ConsultingLead } from '../consulting/consulting-lead.entity';

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
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false,
  entities: [AcademyLead, ConsultingLead, AiLead],
});
