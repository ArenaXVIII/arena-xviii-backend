import { Controller, Param, Patch, UseFilters } from '@nestjs/common';
import { EventsService } from './services/events.service.js';
import { PublishEventParamsDto } from './dtos/publish-event-params.dto.js';
import { EventsExceptionFilter } from './events-exception.filter.js';
import { toPublishEventResponse } from './mappers/publish-event-response.mapper.js';

@Controller('events')
@UseFilters(EventsExceptionFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Patch(':eventId/publish')
  async publish(@Param() params: PublishEventParamsDto) {
    const response = await this.eventsService.publishEvent(params.eventId);
    return toPublishEventResponse(response);
  }
}
