import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslTicketAttachments1721640000003 implements MigrationInterface {
  name = 'EsslTicketAttachments1721640000003';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "essl_ticket_attachments" (
        "id" SERIAL NOT NULL,
        "ticket_id" integer NOT NULL,
        "original_name" character varying(255) NOT NULL,
        "stored_name" character varying(255) NOT NULL,
        "mime_type" character varying(120) NOT NULL,
        "size_bytes" integer NOT NULL,
        "file_path" character varying(500) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_essl_ticket_attachments" PRIMARY KEY ("id"),
        CONSTRAINT "FK_essl_ticket_attachments_ticket" FOREIGN KEY ("ticket_id") REFERENCES "essl_tickets"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_ticket_attachments_ticket_id" ON "essl_ticket_attachments" ("ticket_id")`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "essl_ticket_attachments"`);
  }
}
