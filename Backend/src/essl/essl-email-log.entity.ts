import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EsslTicket, type EsslTicketStatus } from './essl-ticket.entity';

@Entity('essl_email_logs')
export class EsslEmailLog {
  @PrimaryGeneratedColumn({ type: 'integer' }) id: number;
  @Column({ name: 'ticket_id', type: 'integer', nullable: true }) ticketId: number | null;
  @Column({ name: 'recipient_email', type: 'varchar', length: 255 }) recipientEmail: string;
  @Column({ name: 'event_type', type: 'varchar', length: 30 }) eventType: 'ticket-created' | 'status-changed';
  @Column({ name: 'previous_status', type: 'varchar', length: 30, nullable: true }) previousStatus: EsslTicketStatus | null;
  @Column({ name: 'new_status', type: 'varchar', length: 30, nullable: true }) newStatus: EsslTicketStatus | null;
  @Column({ type: 'varchar', length: 20 }) outcome: 'sent' | 'failed';
  @Column({ name: 'provider_message_id', type: 'varchar', length: 255, nullable: true }) providerMessageId: string | null;
  @Column({ name: 'error_message', type: 'text', nullable: true }) errorMessage: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;

  @ManyToOne(() => EsslTicket, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'ticket_id' })
  ticket: EsslTicket | null;
}
