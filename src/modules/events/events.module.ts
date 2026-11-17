import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller.js';
import { EventsService } from './services/events.service.js';
import {
  EVENTS_REPOSITORY,
} from './repositories/events.repository.interface.js';
import { InMemoryEventsRepository } from './repositories/events.repository.memory.js';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: EVENTS_REPOSITORY,
      useClass: InMemoryEventsRepository,
    },
  ],
  exports: [EventsService],
})
export class EventsModule {}
