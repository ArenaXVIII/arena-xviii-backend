import { Injectable } from '@nestjs/common';
import { EventStatus } from '../../../common/enum/event-status.enum.js';
import { Event } from '../entities/event.entity.js';
import type { IEventsRepository } from './events.repository.interface.js';

@Injectable()
export class InMemoryEventsRepository implements IEventsRepository {
  private readonly events = new Map<string, Event>();

  constructor() {
    this.seed(
      new Event(
        '1',
        'Interatléticas 2026',
        EventStatus.PLANNED,
        new Date('2026-11-20'),
        'Ginásio UTFPR Medianeira',
        5000,
        ['associado-1'],
        ['Torneio de futsal'],
      ),
    );
  }

  findEventById(eventId: string): Promise<Event | null> {
    const event = this.events.get(eventId);
    return Promise.resolve(event ? this.clone(event) : null);
  }

  save(event: Event): Promise<Event> {
    const savedEvent = this.clone(event);
    this.events.set(savedEvent.eventId, savedEvent);
    return Promise.resolve(this.clone(savedEvent));
  }

  seed(event: Event): void {
    this.events.set(event.eventId, this.clone(event));
  }

  private clone(event: Event): Event {
    return new Event(
      event.eventId,
      event.name,
      event.getStatus(),
      event.date,
      event.location,
      event.budget,
      [...event.responsibles],
      [...event.activities],
      event.createdAt,
      event.getUpdatedAt(),
      event.deletedAt,
    );
  }
}
