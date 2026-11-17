import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EventStatus } from '../../../common/enum/event-status.enum.js';

@Entity({ name: 'events' })
export class EventOrmEntity {
  @PrimaryColumn({ type: 'uuid', name: 'eventId' })
  eventId!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    enumName: 'events_status_enum',
  })
  status!: EventStatus;

  @Column({ type: 'timestamptz', nullable: true })
  date!: Date | null;

  @Column({ type: 'text', nullable: true })
  location!: string | null;

  @Column({ type: 'double precision', nullable: true })
  budget!: number | null;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  responsibles!: string[];

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  activities!: string[];

  @Column({ type: 'timestamptz', name: 'createdAt' })
  createdAt!: Date;

  @Column({ type: 'timestamptz', name: 'updatedAt' })
  updatedAt!: Date;

  @Column({ type: 'timestamptz', nullable: true, name: 'deletedAt' })
  deletedAt!: Date | null;
}
