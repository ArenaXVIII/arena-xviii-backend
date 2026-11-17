import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventStatus } from '../src/common/enum/event-status.enum.js';
import { Event } from '../src/modules/events/entities/event.entity.js';
import { EventMapper } from '../src/modules/events/persistence/event.mapper.js';
import { EventOrmEntity } from '../src/modules/events/persistence/event.orm-entity.js';
import { TypeOrmEventsRepository } from '../src/modules/events/persistence/typeorm-events.repository.js';
import type { Repository } from 'typeorm';

describe('Events persistence mapper and repository adapter', () => {
  let event: Event;

  beforeEach(() => {
    const now = new Date('2026-11-17T12:00:00.000Z');
    event = new Event(
      '24e5c546-bad1-4c02-9768-8117488d87d2',
      'Arena XVIII',
      EventStatus.PLANNED,
      new Date('2026-11-20T18:00:00.000Z'),
      'UTFPR Medianeira',
      1200,
      ['responsible-1'],
      ['activity-1'],
      now,
      now,
      null,
    );
  });

  it('maps every event field between domain and persistence models', () => {
    const persistenceEntity = EventMapper.toPersistence(event);
    const domainEvent = EventMapper.toDomain(persistenceEntity);

    expect(persistenceEntity).toMatchObject({
      eventId: event.eventId,
      name: event.name,
      status: EventStatus.PLANNED,
      date: event.date,
      location: event.location,
      budget: event.budget,
      responsibles: event.responsibles,
      activities: event.activities,
      createdAt: event.createdAt,
      updatedAt: event.getUpdatedAt(),
      deletedAt: null,
    });
    expect(domainEvent.eventId).toBe(event.eventId);
    expect(domainEvent.getStatus()).toBe(event.getStatus());
    expect(domainEvent.getUpdatedAt()).toEqual(event.getUpdatedAt());
    expect(domainEvent.responsibles).toEqual(event.responsibles);
    expect(domainEvent.activities).toEqual(event.activities);
  });

  it('saves through the ORM repository and maps the returned entity to domain', async () => {
    const save = vi.fn(async (entity: EventOrmEntity) => entity);
    const ormRepository = {
      save,
      findOne: vi.fn(async () => null),
    } as unknown as Repository<EventOrmEntity>;
    const repository = new TypeOrmEventsRepository(ormRepository);

    const savedEvent = await repository.save(event);

    expect(save).toHaveBeenCalledWith(
      expect.objectContaining({ eventId: event.eventId, name: event.name }),
    );
    expect(savedEvent.eventId).toBe(event.eventId);
    expect(savedEvent.getStatus()).toBe(EventStatus.PLANNED);
  });

  it('maps a found ORM entity and returns null for an unknown event', async () => {
    const ormEntity = EventMapper.toPersistence(event);
    const findOne = vi
      .fn<() => Promise<EventOrmEntity | null>>()
      .mockResolvedValueOnce(ormEntity)
      .mockResolvedValueOnce(null);
    const ormRepository = {
      save: vi.fn(),
      findOne,
    } as unknown as Repository<EventOrmEntity>;
    const repository = new TypeOrmEventsRepository(ormRepository);

    const foundEvent = await repository.findEventById(event.eventId);
    const missingEvent = await repository.findEventById('unknown');

    expect(findOne).toHaveBeenNthCalledWith(1, {
      where: { eventId: event.eventId },
    });
    expect(foundEvent?.eventId).toBe(event.eventId);
    expect(missingEvent).toBeNull();
  });
});
