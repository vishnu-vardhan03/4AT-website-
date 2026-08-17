import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type EctmsRecordType = 'booking' | 'driver' | 'vehicle' | 'route' | 'pickup' | 'vendor' | 'safety' | 'feedback' | 'audit' | 'notification' | 'employee' | 'settings' | 'escort' | 'bill';

@Entity('ectms_records')
export class EctmsRecord {
  @PrimaryGeneratedColumn({ type: 'integer' }) id: number;
  @Column({ name: 'record_type', type: 'varchar', length: 30 }) recordType: EctmsRecordType;
  @Column({ name: 'owner_email', type: 'varchar', length: 255, nullable: true }) ownerEmail: string | null;
  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" }) data: Record<string, unknown>;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }) updatedAt: Date;
}
