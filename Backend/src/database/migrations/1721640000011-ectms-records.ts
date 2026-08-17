import { MigrationInterface, QueryRunner } from 'typeorm';

export class EctmsRecords1721640000011 implements MigrationInterface {
  name = 'EctmsRecords1721640000011';
  async up(queryRunner: QueryRunner): Promise<void> { await queryRunner.query(`CREATE TABLE IF NOT EXISTS "ectms_records" ("id" SERIAL NOT NULL, "record_type" character varying(30) NOT NULL, "owner_email" character varying(255), "data" jsonb NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ectms_records" PRIMARY KEY ("id"))`); await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_ectms_records_type_owner" ON "ectms_records" ("record_type", "owner_email")`); }
  async down(queryRunner: QueryRunner): Promise<void> { await queryRunner.query('DROP TABLE IF EXISTS "ectms_records"'); }
}
