import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('academy_registrations')
export class AcademyRegistration {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  gender: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'mobile_number', type: 'varchar', length: 50 })
  mobileNumber: string;

  @Column({ name: 'applicant_type', type: 'varchar', length: 50 })
  applicantType: string;

  // Student specific fields (nullable)
  @Column({ type: 'varchar', length: 255, nullable: true })
  college: string | null;

  @Column({ name: 'program_name', type: 'varchar', length: 255, nullable: true })
  programName: string | null;

  @Column({ name: 'academic_year', type: 'varchar', length: 100, nullable: true })
  academicYear: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  department: string | null;

  // Professional specific fields (nullable)
  @Column({ name: 'company_name', type: 'varchar', length: 255, nullable: true })
  companyName: string | null;

  @Column({ name: 'job_title', type: 'varchar', length: 255, nullable: true })
  jobTitle: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  industry: string | null;

  @Column({ name: 'years_of_experience', type: 'varchar', length: 100, nullable: true })
  yearsOfExperience: string | null;

  // Shared metadata fields
  @Column({ name: 'highest_education', type: 'varchar', length: 255 })
  highestEducation: string;

  @Column({ name: 'referred_by', type: 'varchar', length: 255, nullable: true })
  referredBy: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date | null;
}
