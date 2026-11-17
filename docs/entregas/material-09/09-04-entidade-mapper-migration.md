# 09-04 - Entidade ORM, Mapper e Migration

## Mapeamento definido

A classe ORM fica em `src/modules/events/persistence/event.orm-entity.ts`, separada da entidade `Event`. A migration e o modelo ORM concordam nos nomes, tipos, nulabilidade e chave primaria.

| Campo          | PostgreSQL                | Nulavel |
| -------------- | ------------------------- | ------- |
| `eventId`      | `uuid`, PK                | nao     |
| `name`         | `text`                    | nao     |
| `status`       | enum `events_status_enum` | nao     |
| `date`         | `timestamptz`             | sim     |
| `location`     | `text`                    | sim     |
| `budget`       | `double precision`        | sim     |
| `responsibles` | `text[]`, default `{}`    | nao     |
| `activities`   | `text[]`, default `{}`    | nao     |
| `createdAt`    | `timestamptz`             | nao     |
| `updatedAt`    | `timestamptz`             | nao     |
| `deletedAt`    | `timestamptz`             | sim     |

Nao foi inventado limite textual ou regra de negocio. O UUID continua sendo fornecido pela camada de aplicacao; a entidade ORM usa `@PrimaryColumn`, sem geracao automatica.

## Entidade ORM implementada

```typescript
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EventStatus } from '../../../common/enum/event-status.enum.js';

@Entity({ name: 'events' })
export class EventOrmEntity {
  @PrimaryColumn({ type: 'uuid', name: 'eventId' })
  eventId!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'enum', enum: EventStatus, enumName: 'events_status_enum' })
  status!: EventStatus;

  @Column({ type: 'timestamptz', nullable: true })
  date!: Date | null;

  @Column({ type: 'text', nullable: true })
  location!: string | null;

  @Column({ type: 'double precision', nullable: true })
  budget!: number | null;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  responsibles!: string[];

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  activities!: string[];

  @Column({ type: 'timestamptz', name: 'createdAt' })
  createdAt!: Date;

  @Column({ type: 'timestamptz', name: 'updatedAt' })
  updatedAt!: Date;

  @Column({ type: 'timestamptz', nullable: true, name: 'deletedAt' })
  deletedAt!: Date | null;
}
```

## Migration implementada

Arquivo: `src/database/migrations/1794873600000-create-events-table.ts`. Classe registrada: `CreateEventsTable1794873600000`.

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventsTable1794873600000 implements MigrationInterface {
  name = 'CreateEventsTable1794873600000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "events_status_enum" AS ENUM ('planning', 'planned', 'published', 'in_organization', 'rescheduled', 'cancelled', 'held', 'closed')`,
    );
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "events" (
        "eventId" uuid NOT NULL,
        "name" text NOT NULL,
        "status" "events_status_enum" NOT NULL,
        "date" TIMESTAMPTZ,
        "location" text,
        "budget" double precision,
        "responsibles" text[] NOT NULL DEFAULT '{}',
        "activities" text[] NOT NULL DEFAULT '{}',
        "createdAt" TIMESTAMPTZ NOT NULL,
        "updatedAt" TIMESTAMPTZ NOT NULL,
        "deletedAt" TIMESTAMPTZ,
        CONSTRAINT "PK_events_eventId" PRIMARY KEY ("eventId")
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "events"');
    await queryRunner.query('DROP TYPE "events_status_enum"');
  }
}
```

`down` existe para a API de migrations do TypeORM, mas nao foi executado. Nenhum comando de revert foi usado.

## Mapper implementado

```typescript
import { Event } from '../entities/event.entity.js';
import { EventOrmEntity } from './event.orm-entity.js';

export class EventMapper {
  static toPersistence(event: Event): EventOrmEntity {
    const entity = new EventOrmEntity();
    entity.eventId = event.eventId;
    entity.name = event.name;
    entity.status = event.getStatus();
    entity.date = event.date;
    entity.location = event.location;
    entity.budget = event.budget;
    entity.responsibles = [...event.responsibles];
    entity.activities = [...event.activities];
    entity.createdAt = event.createdAt;
    entity.updatedAt = event.getUpdatedAt();
    entity.deletedAt = event.deletedAt;
    return entity;
  }

  static toDomain(entity: EventOrmEntity): Event {
    return new Event(
      entity.eventId,
      entity.name,
      entity.status,
      entity.date,
      entity.location,
      entity.budget,
      [...entity.responsibles],
      [...entity.activities],
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
```

O Mapper apenas traduz dados e copia os arrays; nao contem regras de negocio.

## Evidencia e limite

`pnpm build` e `pnpm exec tsc --noEmit` passaram apos corrigir o fechamento do metodo `up`. A migration foi aplicada ao banco de teste depois de confirmar banco, usuario, ausencia de `events`, `migrations` e `events_status_enum`.

A consulta a `information_schema.columns` retornou 11 colunas e confirmou nomes, tipos e nulabilidade: `eventId uuid NOT NULL`, `name text NOT NULL`, `status USER-DEFINED/events_status_enum NOT NULL`, `date timestamptz NULL`, `location text NULL`, `budget double precision NULL`, `responsibles text[] NOT NULL`, `activities text[] NOT NULL`, `createdAt timestamptz NOT NULL`, `updatedAt timestamptz NOT NULL` e `deletedAt timestamptz NULL`. A tabela `migrations` registrou timestamp `1794873600000` e nome `CreateEventsTable1794873600000`. Antes do teste de integracao, `events` tinha zero linhas.

Essas verificacoes foram feitas no banco exclusivo de testes. A migration ainda nao foi aplicada no banco de desenvolvimento.
