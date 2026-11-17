import { Module } from '@nestjs/common';
import { EventsController } from './events.controller.js';
import { EventsExceptionFilter } from './events-exception.filter.js';
import { EVENTS_REPOSITORY } from './repositories/events.repository.interface.js';
import { InMemoryEventsRepository } from './repositories/in-memory-events.repository.js';
import { EventsService } from './services/events.service.js';

@Module({
  controllers: [EventsController],S
  providers: [
    EventsService,
    InMemoryEventsRepository,
    {
      provide: EVENTS_REPOSITORY,
      useExisting: InMemoryEventsRepository,
    },
    EventsExceptionFilter,
  ],
})
export class EventsModule {}
