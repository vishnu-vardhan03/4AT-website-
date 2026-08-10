import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EsslTicketAttachment } from './essl-ticket-attachment.entity';

export type EsslTicketCategory = 'IT & Access' | 'Facilities' | 'Food';
export type EsslTicketPriority = 'Low' | 'Medium' | 'High';
export type EsslTicketStatus = 'New' | 'In progress' | 'Waiting' | 'Resolved' | 'Closed';

@Entity('essl_tickets')
export class EsslTicket {
  @PrimaryGeneratedColumn({ type: 'integer' }) id: number;
  @Column({ type: 'varchar', length: 255 }) subject: string;
  @Column({ type: 'text' }) description: string;
  @Column({ type: 'varchar', length: 50 }) category: EsslTicketCategory;
  @Column({ type: 'varchar', length: 20 }) priority: EsslTicketPriority;
  @Column({ type: 'varchar', length: 30, default: 'New' }) status: EsslTicketStatus;
  @Column({ name: 'requester_email', type: 'varchar', length: 255, nullable: true }) requesterEmail: string | null;
  @Column({ name: 'admin_comment', type: 'text', nullable: true }) adminComment: string | null;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }) updatedAt: Date;
  @OneToMany(() => EsslTicketAttachment, (attachment) => attachment.ticket)
  attachments: EsslTicketAttachment[];
}
