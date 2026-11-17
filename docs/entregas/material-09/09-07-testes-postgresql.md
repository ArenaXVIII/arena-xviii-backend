# 09-07 - Testes automatizados com PostgreSQL

## DataSource de teste e salvaguardas

O runner e separado em `vitest.config.postgres.ts`; `pnpm test:integration` nao se mistura com `pnpm test --run`. O DataSource exclusivo do teste registra explicitamente `EventOrmEntity` e `CreateEventsTable1794873600000`, usa `synchronize: false` e a tabela de migrations `migrations`.

Antes de aplicar migrations, o setup valida que as variaveis `TEST_DB_*` existem, que a porta e valida, que banco, usuario e senha diferem dos valores de desenvolvimento quando estes estao definidos, que o nome do banco identifica um ambiente de teste e nao contem `prod`, e que a conexao reporta exatamente o `current_database()` e `current_user` esperados. `inet_server_port()` e verificada como porta positiva, sem comparacao com a porta publicada no host.

A migration so e chamada depois da verificacao da identidade. Cada teste gera UUID proprio; nao ha `TRUNCATE`, `DROP`, `dropSchema`, limpeza ampla ou uso de `TEST_DB_ALLOW_DESTRUCTIVE`. A conexao e fechada no erro de setup e em `afterAll`.

## Codigo completo do teste PostgreSQL

Arquivo: `test/events.postgres.integration.test.ts`.

```typescript
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
```

## Execucao observada

`pnpm test:integration` foi executado com variaveis temporarias distintas para o banco de desenvolvimento e teste, apontando para `localhost:5434`. Resultado real: a inicializacao do driver falhou com `ECONNREFUSED` em `::1:5434` e `127.0.0.1:5434`; o hook nao chegou a validar identidade nem a chamar `runMigrations()`. Saida: 1 arquivo falhou e 1 teste foi ignorado devido a falha no setup. Nao houve operacao no banco.

Depois da tentativa, a regressao foi reexecutada: `pnpm test --run` passou com 4 arquivos e 14 testes. `pnpm exec tsc --noEmit` e `pnpm lint` tambem passaram. O teste PostgreSQL real continua pendente ate que o servico dedicado esteja ativo e a identidade do banco seja comprovada.
