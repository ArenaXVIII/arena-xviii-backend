import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { EventsController } from '../src/modules/events/controllers/events.controller.js';
import { EventsService } from '../src/modules/events/services/events.service.js';
import { EventStatus } from '../src/common/enum/event-status.enum.js';

describe('Create Event HTTP contract', () => {
  let app: INestApplication<App>;
  let eventsService: { createEvent: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    eventsService = {
      createEvent: vi.fn().mockResolvedValue({
        eventId: '550e8400-e29b-41d4-a716-446655440000',
        status: EventStatus.PLANNING,
        createdAt: new Date('2026-11-24T01:26:28.473Z'),
        message: 'Evento cadastrado com sucesso.',
        internalNote: 'informacao-interna-ilustrativa',
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

  it('returns the closed public contract and removes internal properties', async () => {
    await request(app.getHttpServer())
      .post('/events')
      .send({
        name: 'Contrato HTTP Material 11',
        campoExtra: 'deve ser removido',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).not.toHaveProperty('internalNote');
        expect(body).toEqual({
          eventId: '550e8400-e29b-41d4-a716-446655440000',
          status: EventStatus.PLANNING,
          createdAt: '2026-11-24T01:26:28.473Z',
          message: 'Evento cadastrado com sucesso.',
        });
      });

    expect(eventsService.createEvent).toHaveBeenCalledWith(
      'Contrato HTTP Material 11',
    );
  });

  it.each([{ name: '' }, {}])(
    'rejects DTO-invalid name %j with 400',
    async (payload) => {
      await request(app.getHttpServer())
        .post('/events')
        .send(payload)
        .expect(400);

      expect(eventsService.createEvent).not.toHaveBeenCalled();
    },
  );

  it('rejects a whitespace-only name with 422', async () => {
    await request(app.getHttpServer())
      .post('/events')
      .send({ name: '   ' })
      .expect(422);

    expect(eventsService.createEvent).not.toHaveBeenCalled();
  });

  it('rejects a non-string name with 400', async () => {
    await request(app.getHttpServer())
      .post('/events')
      .send({ name: 123 })
      .expect(400);

    expect(eventsService.createEvent).not.toHaveBeenCalled();
  });
});
