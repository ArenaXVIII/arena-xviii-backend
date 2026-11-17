import { Event } from '../entities/event.entity.js';
import { EventOrmEntity } from './event.orm-entity.js';

export class EventMapper {
  static toPersistence(event: Event): EventOrmEntity {
    const entity = new EventOrmEntity();

    entity.eventId = event.eventId;
    entity.name = event.name;
    entity.status = event.getStatus();
    entity.date = event.date;
    entity.location = event.location;
    entity.budget = event.budget;
    entity.responsibles = [...event.responsibles];
    entity.activities = [...event.activities];
    entity.createdAt = event.createdAt;
    entity.updatedAt = event.getUpdatedAt();
    entity.deletedAt = event.deletedAt;

    return entity;
  }

  static toDomain(entity: EventOrmEntity): Event {
    return new Event(
      entity.eventId,
      entity.name,
      entity.status,
      entity.date,
      entity.location,
      entity.budget,
      [...entity.responsibles],
      [...entity.activities],
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
