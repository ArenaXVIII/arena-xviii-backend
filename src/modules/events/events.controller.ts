import { Controller, Param, Patch, UseFilters } from '@nestjs/common';
import { EventsService } from './services/events.service.js';
import { PublishEventParamsDto } from './dtos/publish-event-params.dto.js';
import { EventsExceptionFilter } from './events-exception.filter.js';

@Controller('events')
@UseFilters(EventsExceptionFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Patch(':eventId/publish')
  publish(@Param() params: PublishEventParamsDto) {
    return this.eventsService.publishEvent(params.eventId);
  }
}
