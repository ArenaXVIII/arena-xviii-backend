import { Event } from '../entities/event.entity.js';
import { IEventsRepository } from './events.repository.interface.js';

export class InMemoryEventsRepository implements IEventsRepository {
  private readonly events = new Map<string, Event>();

  async findEventById(eventId: string): Promise<Event | null> {
    return this.events.get(eventId) ?? null;
  }

  async save(event: Event): Promise<Event> {
    this.events.set(event.eventId, event);
    return event;
  }
}
