import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslStatusEmail1721640000006 implements MigrationInterface {
  name = 'EsslStatusEmail1721640000006';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD COLUMN IF NOT EXISTS "admin_comment" text`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_status"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_status" CHECK ("status" IN ('New', 'In progress', 'Waiting', 'Resolved', 'Closed'))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "essl_email_logs" (
      "id" SERIAL NOT NULL,
      "ticket_id" integer,
      "recipient_email" character varying(255) NOT NULL,
      "previous_status" character varying(30) NOT NULL,
      "new_status" character varying(30) NOT NULL,
      "outcome" character varying(20) NOT NULL,
      "provider_message_id" character varying(255),
      "error_message" text,
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "CHK_essl_email_logs_outcome" CHECK ("outcome" IN ('sent', 'failed')),
      CONSTRAINT "PK_essl_email_logs" PRIMARY KEY ("id"),
      CONSTRAINT "FK_essl_email_logs_ticket" FOREIGN KEY ("ticket_id") REFERENCES "essl_tickets"("id") ON DELETE SET NULL
    )`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_email_logs_ticket_created" ON "essl_email_logs" ("ticket_id", "created_at" DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_email_logs_outcome_created" ON "essl_email_logs" ("outcome", "created_at" DESC)`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "essl_email_logs"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_status"`);
    await queryRunner.query(`UPDATE "essl_tickets" SET "status" = 'Resolved' WHERE "status" = 'Closed'`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_status" CHECK ("status" IN ('New', 'In progress', 'Waiting', 'Resolved'))`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP COLUMN IF EXISTS "admin_comment"`);
  }
}
