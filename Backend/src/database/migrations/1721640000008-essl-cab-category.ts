import { MigrationInterface, QueryRunner } from 'typeorm';

export class EsslCabCategory1721640000008 implements MigrationInterface {
  name = 'EsslCabCategory1721640000008';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_category"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_category" CHECK ("category" IN ('IT & Access', 'Facilities', 'Food', 'Cab'))`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "essl_tickets" SET "category" = 'Facilities' WHERE "category" = 'Cab'`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" DROP CONSTRAINT IF EXISTS "CHK_essl_tickets_category"`);
    await queryRunner.query(`ALTER TABLE "essl_tickets" ADD CONSTRAINT "CHK_essl_tickets_category" CHECK ("category" IN ('IT & Access', 'Facilities', 'Food'))`);
  }
}
