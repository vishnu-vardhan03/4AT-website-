import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslNotifications1721640000005 implements MigrationInterface {
  name = 'EsslNotifications1721640000005';
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "essl_notifications" ("id" SERIAL NOT NULL, "recipient_email" character varying(255) NOT NULL, "ticket_id" integer, "type" character varying(50) NOT NULL, "title" character varying(255) NOT NULL, "message" text NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_essl_notifications" PRIMARY KEY ("id"), CONSTRAINT "FK_essl_notifications_ticket" FOREIGN KEY ("ticket_id") REFERENCES "essl_tickets"("id") ON DELETE CASCADE)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_notifications_recipient" ON "essl_notifications" ("recipient_email", "created_at" DESC)`);
  }
  async down(queryRunner: QueryRunner): Promise<void> { await queryRunner.query(`DROP TABLE IF EXISTS "essl_notifications"`); }
}
