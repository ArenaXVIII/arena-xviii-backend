# 09-05 - Repositorio TypeORM e providers

## Adaptador implementado

Arquivo: `src/modules/events/persistence/typeorm-events.repository.ts`.

Mapper em `src/modules/events/persistence/event.mapper.ts`:

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

Adaptador em `src/modules/events/persistence/typeorm-events.repository.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity.js';
import type { IEventsRepository } from '../repositories/events.repository.interface.js';
import { EventMapper } from './event.mapper.js';
import { EventOrmEntity } from './event.orm-entity.js';

@Injectable()
export class TypeOrmEventsRepository implements IEventsRepository {
  constructor(
    @InjectRepository(EventOrmEntity)
    private readonly ormRepository: Repository<EventOrmEntity>,
  ) {}

  async findEventById(eventId: string): Promise<Event | null> {
    const entity = await this.ormRepository.findOne({ where: { eventId } });
    return entity ? EventMapper.toDomain(entity) : null;
  }

  async save(event: Event): Promise<Event> {
    const savedEntity = await this.ormRepository.save(
      EventMapper.toPersistence(event),
    );
    return EventMapper.toDomain(savedEntity);
  }
}
```

A assinatura `IEventsRepository` nao foi alterada. O Service e os controllers nao importam TypeORM.

## Provider e isolamento dos testes antigos

Em runtime normal, `EventsModule` importa `TypeOrmModule.forFeature([EventOrmEntity])` e associa `EVENTS_REPOSITORY` a `TypeOrmEventsRepository`. Em `NODE_ENV=test`, o modulo usa `InMemoryEventsRepository` e nao registra `forFeature`; `AppModule` tambem nao abre conexao PostgreSQL. Os dois configs Vitest definem `NODE_ENV=test`, mantendo os testes unitarios, HTTP e integrados em memoria sem servidor ativo.

O teste de memoria do Material 08 continua importando o `EventsModule` real e executando controller, service e repository em memoria. Nenhuma assercao anterior foi alterada.

## Verificacoes

- `pnpm build`: passou.
- `pnpm exec tsc --noEmit`: passou, incluindo o teste de PostgreSQL.
- `pnpm lint`: passou.
- `pnpm test --run`: 3 arquivos e 11 testes passaram antes da inclusao dos 3 testes direcionados de persistencia.
- `pnpm exec vitest run test/events.persistence.spec.ts`: 1 arquivo, 3 testes passaram; cobre mapeamento, `save`, `findEventById` e resultado ausente.

A resolucao do provider em uma aplicacao conectada ao PostgreSQL e o startup real permanecem pendentes: nao havia servidor Docker/PostgreSQL disponivel para inicializar o DataSource.
