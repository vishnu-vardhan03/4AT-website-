import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslCreatedEmailLog1721640000007 implements MigrationInterface {
  name = 'EsslCreatedEmailLog1721640000007';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "essl_email_logs" ADD COLUMN IF NOT EXISTS "event_type" character varying(30)`);
    await queryRunner.query(`UPDATE "essl_email_logs" SET "event_type" = 'status-changed' WHERE "event_type" IS NULL`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" ALTER COLUMN "event_type" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" ALTER COLUMN "previous_status" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" ALTER COLUMN "new_status" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" ADD CONSTRAINT "CHK_essl_email_logs_event_type" CHECK ("event_type" IN ('ticket-created', 'status-changed'))`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "essl_email_logs" WHERE "event_type" = 'ticket-created'`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" DROP CONSTRAINT IF EXISTS "CHK_essl_email_logs_event_type"`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" ALTER COLUMN "previous_status" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" ALTER COLUMN "new_status" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "essl_email_logs" DROP COLUMN IF EXISTS "event_type"`);
  }
}
