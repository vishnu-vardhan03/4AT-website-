import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('academy_leads')
export class AcademyLead {
  @PrimaryGeneratedColumn({ type: 'integer' }) id: number;
  @Column({ name: 'full_name', type: 'varchar', nullable: true }) fullName: string | null;
  @Column({ type: 'varchar', nullable: true }) company: string | null;
  @Column({ type: 'varchar', nullable: true }) email: string | null;
  @Column({ type: 'varchar', nullable: true }) phone: string | null;
  @Column({ type: 'text', nullable: true }) message: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true }) createdAt: Date | null;
}
