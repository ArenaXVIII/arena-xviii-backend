import {
  type INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { EventsController } from '../src/modules/events/events.controller.js';
import { EventsModule } from '../src/modules/events/events.module.js';
import { EventsService } from '../src/modules/events/services/events.service.js';

describe('Events backend integration', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EventsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('publishes the seeded event through the real controller, service, and repository', async () => {
    await request(app.getHttpServer())
      .patch('/events/1/publish')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          eventId: '1',
          status: 'published',
          message: 'Evento divulgado com sucesso.',
        });
        expect(body.updatedAt).toEqual(expect.any(String));
      });
  });

  it('rejects a blank event id at the real HTTP boundary', async () => {
    await request(app.getHttpServer())
      .patch('/events/%20/publish')
      .expect(400);
  });

  it('reports the missing repository token in an isolated module', async () => {
    await expect(
      Test.createTestingModule({
        controllers: [EventsController],
        providers: [EventsService],
      }).compile(),
    ).rejects.toThrow(/EventsService/);
  });
});
