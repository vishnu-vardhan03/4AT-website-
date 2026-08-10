import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Creates the table backing AcademyRegistration. This schema previously lived only in an
 * ad-hoc script that no npm script or deploy step ran, so `migration:run` left the table
 * missing on a fresh database and every academy registration failed with a 500.
 */
export class AcademyRegistrations1721640000001 implements MigrationInterface {
  name = 'AcademyRegistrations1721640000001';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "academy_registrations" (
        "id" SERIAL NOT NULL,
        "first_name" character varying(100) NOT NULL,
        "last_name" character varying(100) NOT NULL,
        "gender" character varying(50) NOT NULL,
        "country" character varying(100) NOT NULL,
        "state" character varying(100) NOT NULL,
        "city" character varying(100) NOT NULL,
        "email" character varying(255) NOT NULL,
        "mobile_number" character varying(50) NOT NULL,
        "applicant_type" character varying(50) NOT NULL,
        "college" character varying(255),
        "program_name" character varying(255),
        "academic_year" character varying(100),
        "department" character varying(255),
        "company_name" character varying(255),
        "job_title" character varying(255),
        "industry" character varying(255),
        "years_of_experience" character varying(100),
        "highest_education" character varying(255) NOT NULL,
        "referred_by" character varying(255),
        "created_at" TIMESTAMP DEFAULT now(),
        CONSTRAINT "PK_academy_registrations" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_academy_registrations_created_at" ON "academy_registrations" ("created_at" DESC)`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_academy_registrations_email" ON "academy_registrations" ("email")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_academy_registrations_applicant_type" ON "academy_registrations" ("applicant_type")`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "academy_registrations"`);
  }
}
