import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EsslTicket } from './essl-ticket.entity';

@Entity('essl_ticket_attachments')
export class EsslTicketAttachment {
  @PrimaryGeneratedColumn({ type: 'integer' }) id: number;
  @Column({ name: 'ticket_id', type: 'integer' }) ticketId: number;
  @Column({ name: 'original_name', type: 'varchar', length: 255 }) originalName: string;
  @Column({ name: 'stored_name', type: 'varchar', length: 255 }) storedName: string;
  @Column({ name: 'mime_type', type: 'varchar', length: 120 }) mimeType: string;
  @Column({ name: 'size_bytes', type: 'integer' }) sizeBytes: number;
  @Column({ name: 'file_path', type: 'varchar', length: 500 }) filePath: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;

  @ManyToOne(() => EsslTicket, (ticket) => ticket.attachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket: EsslTicket;
}
