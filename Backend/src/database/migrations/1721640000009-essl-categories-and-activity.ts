import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslCategoriesAndActivity1721640000009 implements MigrationInterface {
  name = 'EsslCategoriesAndActivity1721640000009';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_category"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_category" CHECK ("category" IN ('IT & Access', 'Facilities', 'Food', 'Cab', 'Finance & Admin', 'Others'))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "essl_ticket_activities" ("id" SERIAL NOT NULL, "ticket_id" integer NOT NULL, "event_type" character varying(30) NOT NULL, "previous_status" character varying(30), "new_status" character varying(30) NOT NULL, "comment" text, "actor_label" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_essl_ticket_activities" PRIMARY KEY ("id"), CONSTRAINT "FK_essl_ticket_activities_ticket" FOREIGN KEY ("ticket_id") REFERENCES "essl_tickets"("id") ON DELETE CASCADE)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_essl_ticket_activities_ticket" ON "essl_ticket_activities" ("ticket_id", "created_at" ASC)`);
    await queryRunner.query(`INSERT INTO "essl_ticket_activities" ("ticket_id", "event_type", "previous_status", "new_status", "comment", "actor_label", "created_at") SELECT "id", 'created', NULL, 'New', NULL, COALESCE("requester_email", 'Employee'), "created_at" FROM "essl_tickets" WHERE NOT EXISTS (SELECT 1 FROM "essl_ticket_activities" activity WHERE activity."ticket_id" = "essl_tickets"."id" AND activity."event_type" = 'created')`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "essl_ticket_activities"`);
    await queryRunner.query(`UPDATE "essl_tickets" SET "category" = 'Facilities' WHERE "category" IN ('Finance & Admin', 'Others')`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_category"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_category" CHECK ("category" IN ('IT & Access', 'Facilities', 'Food', 'Cab'))`);
  }
}
