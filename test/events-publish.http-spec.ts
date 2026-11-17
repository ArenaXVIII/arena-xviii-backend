import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { EventsController } from '../src/modules/events/events.controller.js';
import { EventsService } from '../src/modules/events/services/events.service.js';
import { EventStatus } from '../src/common/enum/event-status.enum.js';

describe('EventsController HTTP boundary', () => {
  let app: INestApplication<App>;
  let eventsService: { publishEvent: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    eventsService = {
      publishEvent: vi.fn().mockResolvedValue({
        eventId: '1',
        status: EventStatus.PUBLISHED,
        updatedAt: new Date('2026-11-17T12:00:00.000Z'),
        message: 'Evento divulgado com sucesso.',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: eventsService }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('delegates a valid request and returns the service response', async () => {
    await request(app.getHttpServer())
      .patch('/events/1/publish')
      .expect(200)
      .expect(({ body }) => {
        expect(body.eventId).toBe('1');
        expect(body.status).toBe(EventStatus.PUBLISHED);
      });

    expect(eventsService.publishEvent).toHaveBeenCalledWith('1');
  });

  it('rejects a blank event id before calling the service', async () => {
    await request(app.getHttpServer())
      .patch('/events/%20/publish')
      .expect(400);

    expect(eventsService.publishEvent).not.toHaveBeenCalled();
  });
});
