import { Event } from '../entities/event.entity.js';

export const EVENTS_REPOSITORY = 'EVENTS_REPOSITORY';

export interface IEventsRepository {
  findEventById(eventId: string): Promise<Event | null>;
  save(event: Event): Promise<Event>;
}
