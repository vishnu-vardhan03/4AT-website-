import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('essl_notifications')
export class EsslNotification {
  @PrimaryGeneratedColumn({ type: 'integer' }) id: number;
  @Column({ name: 'recipient_email', type: 'varchar', length: 255 }) recipientEmail: string;
  @Column({ name: 'ticket_id', type: 'integer', nullable: true }) ticketId: number | null;
  @Column({ type: 'varchar', length: 50 }) type: 'ticket-created' | 'status-updated' | 'ticket-reopened';
  @Column({ type: 'varchar', length: 255 }) title: string;
  @Column({ type: 'text' }) message: string;
  @Column({ name: 'is_read', type: 'boolean', default: false }) isRead: boolean;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;
}
