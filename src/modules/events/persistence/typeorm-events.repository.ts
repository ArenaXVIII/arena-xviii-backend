import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity.js';
import type { IEventsRepository } from '../repositories/events.repository.interface.js';
import { EventMapper } from './event.mapper.js';
import { EventOrmEntity } from './event.orm-entity.js';

@Injectable()
export class TypeOrmEventsRepository implements IEventsRepository {
  constructor(
    @InjectRepository(EventOrmEntity)
    private readonly ormRepository: Repository<EventOrmEntity>,
  ) {}

  async findEventById(eventId: string): Promise<Event | null> {
    const entity = await this.ormRepository.findOne({ where: { eventId } });
    return entity ? EventMapper.toDomain(entity) : null;
  }

  async save(event: Event): Promise<Event> {
    const savedEntity = await this.ormRepository.save(
      EventMapper.toPersistence(event),
    );
    return EventMapper.toDomain(savedEntity);
  }
}
