import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslTicketRequester1721640000004 implements MigrationInterface {
  name = 'EsslTicketRequester1721640000004';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD COLUMN IF NOT EXISTS "requester_email" character varying(255)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_tickets_requester_email" ON "essl_tickets" ("requester_email")`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP COLUMN IF EXISTS "requester_email"`);
  }
}
