import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialLeadTables1721640000000 implements MigrationInterface {
  name = 'InitialLeadTables1721640000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of ['academy_leads', 'consulting_leads', 'ai_leads']) {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "${table}" (
          "id" SERIAL NOT NULL,
          "full_name" character varying(255),
          "company" character varying(255),
          "email" character varying(255),
          "phone" character varying(50),
          "message" text,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_${table}" PRIMARY KEY ("id")
        )
      `);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_${table}_created_at" ON "${table}" ("created_at" DESC)`);
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_${table}_email" ON "${table}" ("email")`);
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of ['ai_leads', 'consulting_leads', 'academy_leads']) {
      await queryRunner.query(`DROP TABLE IF EXISTS "${table}"`);
    }
  }
}
