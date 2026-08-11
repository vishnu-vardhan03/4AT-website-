import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslTickets1721640000002 implements MigrationInterface {
  name = 'EsslTickets1721640000002';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "essl_tickets" (
        "id" SERIAL NOT NULL,
        "subject" character varying(255) NOT NULL,
        "description" text NOT NULL,
        "category" character varying(50) NOT NULL,
        "priority" character varying(20) NOT NULL,
        "status" character varying(30) NOT NULL DEFAULT 'New',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_essl_tickets" PRIMARY KEY ("id"),
        CONSTRAINT "CHK_essl_tickets_category" CHECK ("category" IN ('IT & Access', 'Facilities', 'Food')),
        CONSTRAINT "CHK_essl_tickets_priority" CHECK ("priority" IN ('Low', 'Medium', 'High')),
        CONSTRAINT "CHK_essl_tickets_status" CHECK ("status" IN ('New', 'In progress', 'Waiting', 'Resolved'))
      )
    `);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_tickets_created_at" ON "essl_tickets" ("created_at" DESC)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_tickets_status" ON "essl_tickets" ("status")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_tickets_priority" ON "essl_tickets" ("priority")`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "essl_tickets"`);
  }
}
