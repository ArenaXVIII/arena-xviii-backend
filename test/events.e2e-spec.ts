import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';

describe('Events API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates an event and returns its identifier for a valid name', async () => {
    const payload = { name: 'Arena XVIII Opening Event' };

    await request(app.getHttpServer())
      .post('/events')
      .send(payload)
      .expect(201)
      .expect(({ body }) => {
        expect(body.eventId).toBeTruthy();
      });
  });
});
