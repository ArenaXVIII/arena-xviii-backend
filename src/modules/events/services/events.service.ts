import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { EventStatus } from '../../../common/enum/event-status.enum.js';
import {
  EVENTS_REPOSITORY,
  type IEventsRepository,
} from '../repositories/events.repository.interface.js';
import { EventNotFoundException } from '../../../common/exceptions/event-not-found.exception.js';
import { Event } from '../entities/event.entity.js';
import { PublishEventResponseDto } from '../dtos/publish-event-response.dto.js';
import { CreateEventResponseDto } from '../dtos/create-event-response.dto.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_REPOSITORY)
    private readonly eventsRepository: IEventsRepository,
  ) {}

  async createEvent(name: string): Promise<CreateEventResponseDto> {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new UnprocessableEntityException(
        'Event name is required and cannot be empty.',
      );
    }

    const event = new Event(
      randomUUID(),
      normalizedName,
      EventStatus.PLANNING,
      null,
      null,
      null,
      [],
      [],
      new Date(),
      new Date(),
      null,
    );

    const savedEvent = await this.eventsRepository.save(event);

    return new CreateEventResponseDto(
      savedEvent.eventId,
      savedEvent.getStatus(),
      savedEvent.getUpdatedAt(),
      'Evento cadastrado com sucesso.',
    );
  }

  async publishEvent(eventId: string): Promise<PublishEventResponseDto> {
    const event = await this.eventsRepository.findEventById(eventId);
    if (!event) {
      throw new EventNotFoundException();
    }

    event.publish();

    const savedEvent = await this.eventsRepository.save(event);

    return new PublishEventResponseDto(
      savedEvent.eventId,
      savedEvent.getStatus(),
      savedEvent.getUpdatedAt(),
      'Evento divulgado com sucesso.',
    );
  }
}