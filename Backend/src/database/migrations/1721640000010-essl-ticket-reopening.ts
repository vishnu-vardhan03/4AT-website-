import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslTicketReopening1721640000010 implements MigrationInterface {
  name = 'EsslTicketReopening1721640000010';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD COLUMN IF NOT EXISTS "reopen_count" integer NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD COLUMN IF NOT EXISTS "escalation_level" integer NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_status"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_status" CHECK ("status" IN ('New', 'In progress', 'Waiting', 'Resolved', 'Closed', 'Reopened'))`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_escalation" CHECK ("reopen_count" >= 0 AND "escalation_level" BETWEEN 0 AND 3)`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "essl_tickets" SET "status" = 'In progress' WHERE "status" = 'Reopened'`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_escalation"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_status"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_status" CHECK ("status" IN ('New', 'In progress', 'Waiting', 'Resolved', 'Closed'))`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP COLUMN IF EXISTS "escalation_level"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP COLUMN IF EXISTS "reopen_count"`);
  }
}
