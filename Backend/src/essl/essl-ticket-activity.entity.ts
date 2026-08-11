import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EsslTicket } from './essl-ticket.entity';
import type { EsslTicketStatus } from './essl-ticket.entity';

@Entity('essl_ticket_activities')
export class EsslTicketActivity {
  @PrimaryGeneratedColumn({ type: 'integer' }) id: number;
  @Column({ name: 'ticket_id', type: 'integer' }) ticketId: number;
  @Column({ name: 'event_type', type: 'varchar', length: 30 }) eventType: 'created' | 'status-updated' | 'reopened' | 'edited';
  @Column({ name: 'previous_status', type: 'varchar', length: 30, nullable: true }) previousStatus: EsslTicketStatus | null;
  @Column({ name: 'new_status', type: 'varchar', length: 30 }) newStatus: EsslTicketStatus;
  @Column({ type: 'text', nullable: true }) comment: string | null;
  @Column({ name: 'actor_label', type: 'varchar', length: 100 }) actorLabel: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @JoinColumn({ name: 'ticket_id' })
  @ManyToOne(() => EsslTicket, (ticket) => ticket.activities, { onDelete: 'CASCADE' }) ticket: EsslTicket;
}
