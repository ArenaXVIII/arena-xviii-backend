import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DataSource } from 'typeorm';
import { EventStatus } from '../src/common/enum/event-status.enum.js';
import { CreateEventsTable1794873600000 } from '../src/database/migrations/1794873600000-create-events-table.js';
import { Event } from '../src/modules/events/entities/event.entity.js';
import { EventMapper } from '../src/modules/events/persistence/event.mapper.js';
import { EventOrmEntity } from '../src/modules/events/persistence/event.orm-entity.js';
import { TypeOrmEventsRepository } from '../src/modules/events/persistence/typeorm-events.repository.js';

function requiredTestEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

describe('Events PostgreSQL persistence', () => {
  let dataSource: DataSource | undefined;

  beforeAll(async () => {
    const host = requiredTestEnvironmentVariable('TEST_DB_HOST');
    const port = Number(requiredTestEnvironmentVariable('TEST_DB_PORT'));
    const username = requiredTestEnvironmentVariable('TEST_DB_USERNAME');
    const password = requiredTestEnvironmentVariable('TEST_DB_PASSWORD');
    const database = requiredTestEnvironmentVariable('TEST_DB_NAME');

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('TEST_DB_PORT must be a valid TCP port.');
    }
    if (database === process.env.DB_NAME) {
      throw new Error('TEST_DB_NAME must differ from DB_NAME.');
    }
    if (username === process.env.DB_USERNAME) {
      throw new Error('TEST_DB_USERNAME must differ from DB_USERNAME.');
    }
    if (password === process.env.DB_PASSWORD) {
      throw new Error('TEST_DB_PASSWORD must differ from DB_PASSWORD.');
    }
    if (/prod/i.test(database)) {
      throw new Error(
        'PostgreSQL integration tests cannot target a production database.',
      );
    }
    if (!/(^|[_-])test($|[_-])/i.test(database)) {
      throw new Error('TEST_DB_NAME must identify an isolated test database.');
    }

    dataSource = new DataSource({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [EventOrmEntity],
      migrations: [CreateEventsTable1794873600000],
      migrationsTableName: 'migrations',
      synchronize: false,
    });

    try {
      await dataSource.initialize();
      const [identity] = await dataSource.query(
        'SELECT current_database() AS name, current_user AS username, inet_server_port() AS server_port',
      );

      expect(identity.name).toBe(database);
      expect(identity.username).toBe(username);
      expect(port).toBeGreaterThan(0);
      expect(Number(identity.server_port)).toBeGreaterThan(0);
      await dataSource.runMigrations();
    } catch (error) {
      if (dataSource.isInitialized) {
        await dataSource.destroy();
      }
      throw error;
    }
  });

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('saves and reads an event using the TypeORM adapter and the verified test database', async () => {
    if (!dataSource?.isInitialized) {
      throw new Error('The PostgreSQL test DataSource was not initialized.');
    }

    const now = new Date();
    const event = new Event(
      randomUUID(),
      'Material 09 PostgreSQL integration event',
      EventStatus.PLANNING,
      new Date('2026-11-20T18:00:00.000Z'),
      'UTFPR Medianeira',
      1250.5,
      ['responsible-material-09'],
      ['integration-check'],
      now,
      now,
      null,
    );
    const repository = new TypeOrmEventsRepository(
      dataSource.getRepository(EventOrmEntity),
    );

    const savedEvent = await repository.save(event);
    const [persisted] = await dataSource.query(
      'SELECT * FROM "events" WHERE "eventId" = $1',
      [event.eventId],
    );
    const persistedDomainEvent = EventMapper.toDomain(
      persisted as EventOrmEntity,
    );

    expect(savedEvent.eventId).toBe(event.eventId);
    expect(persistedDomainEvent.eventId).toBe(event.eventId);
    expect(persistedDomainEvent.name).toBe(event.name);
    expect(persistedDomainEvent.getStatus()).toBe(EventStatus.PLANNING);
    expect(persistedDomainEvent.date?.toISOString()).toBe(
      event.date?.toISOString(),
    );
    expect(persistedDomainEvent.location).toBe(event.location);
    expect(persistedDomainEvent.budget).toBe(event.budget);
    expect(persistedDomainEvent.responsibles).toEqual(event.responsibles);
    expect(persistedDomainEvent.activities).toEqual(event.activities);
    expect(persistedDomainEvent.createdAt.toISOString()).toBe(
      event.createdAt.toISOString(),
    );
    expect(persistedDomainEvent.getUpdatedAt().toISOString()).toBe(
      event.getUpdatedAt().toISOString(),
    );
    expect(persistedDomainEvent.deletedAt).toBeNull();
  });
});
