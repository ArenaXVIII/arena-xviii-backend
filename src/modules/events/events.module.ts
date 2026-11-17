import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller.js';
import { EventsController as CreateEventsController } from './controllers/events.controller.js';
import { EventsExceptionFilter } from './events-exception.filter.js';
import { EVENTS_REPOSITORY } from './repositories/events.repository.interface.js';
import { InMemoryEventsRepository } from './repositories/in-memory-events.repository.js';
import { EventOrmEntity } from './persistence/event.orm-entity.js';
import { TypeOrmEventsRepository } from './persistence/typeorm-events.repository.js';
import { EventsService } from './services/events.service.js';

const isTestRuntime = process.env.NODE_ENV === 'test';

@Module({
  imports: isTestRuntime ? [] : [TypeOrmModule.forFeature([EventOrmEntity])],
  controllers: [EventsController, CreateEventsController],
  providers: [
    EventsService,
    ...(isTestRuntime
      ? [
          InMemoryEventsRepository,
          {
            provide: EVENTS_REPOSITORY,
            useExisting: InMemoryEventsRepository,
          },
        ]
      : [
          TypeOrmEventsRepository,
          {
            provide: EVENTS_REPOSITORY,
            useExisting: TypeOrmEventsRepository,
          },
        ]),
    EventsExceptionFilter,
  ],
})
export class EventsModule {}
