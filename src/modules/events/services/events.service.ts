import { Inject, Injectable } from '@nestjs/common';
import {
  EVENTS_REPOSITORY,
  type IEventsRepository,
} from '../repositories/events.repository.interface.js';
import { EventNotFoundException } from '../../../common/exceptions/event-not-found.exception.js';
import { PublishEventResponseDto } from '../dtos/publish-event-response.dto.js';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_REPOSITORY)
    private readonly eventsRepository: IEventsRepository,
  ) {}

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