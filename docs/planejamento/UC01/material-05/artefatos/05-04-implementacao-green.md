# 05-04 — Implementação GREEN

## Arquivos modificados

- `src/app.module.ts`
- `src/modules/events/events.module.ts`
- `src/modules/events/controllers/events.controller.ts`
- `src/modules/events/services/events.service.ts`
- `src/modules/events/repositories/events.repository.memory.ts`
- `src/modules/events/dtos/create-event.dto.ts`
- `src/modules/events/dtos/create-event-response.dto.ts`
- `src/modules/events/entities/event.entity.ts`

## Trecho 1 — registro do módulo

```ts
import { EventsModule } from './modules/events/events.module.js';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Explicação

O `AppModule` precisou importar o módulo de eventos para que a aplicação reconhecesse a rota `POST /events` durante o bootstrap do NestJS.

## Trecho 2 — controller HTTP

```ts
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() body: CreateEventDto): Promise<CreateEventResponseDto> {
    const name = body?.name?.trim();

    if (!name) {
      throw new UnprocessableEntityException(
        'Event name is required and cannot be empty.',
      );
    }

    return this.eventsService.createEvent(name);
  }
}
```

### Explicação

- `@Controller('events')` registra o endpoint base `/events`.
- `@Post()` expõe o verbo HTTP esperado pela suíte e2e.
- `@HttpCode(201)` satisfaz a asserção de `expect(201)` do Material 04.
- `body.name` é validado para evitar que um evento vazio seja persistido.

## Trecho 3 — serviço de aplicação

```ts
async createEvent(name: string): Promise<CreateEventResponseDto> {
  const normalizedName = name.trim();

  if (!normalizedName) {
    throw new UnprocessableEntityException(
      'Event name is required and cannot be empty.',
    );
  }

  const event = new Event(
    randomUUID(),
    normalizedName,
    EventStatus.PLANNING,
    null,
    null,
    null,
    [],
    [],
    new Date(),
    new Date(),
    null,
  );

  const savedEvent = await this.eventsRepository.save(event);

  return new CreateEventResponseDto(
    savedEvent.eventId,
    savedEvent.getStatus(),
    savedEvent.getUpdatedAt(),
    'Evento cadastrado com sucesso.',
  );
}
```

### Explicação

Esse fluxo gera um identificador único (`eventId`), inicia o evento em `planning` e salva a instância. Isso atende diretamente ao ponto-chave do teste RED: a resposta deve incluir um identificador válido que seja `truthy`.

## Trecho 4 — adaptador em memória

```ts
export class InMemoryEventsRepository implements IEventsRepository {
  private readonly events = new Map<string, Event>();

  async findEventById(eventId: string): Promise<Event | null> {
    return this.events.get(eventId) ?? null;
  }

  async save(event: Event): Promise<Event> {
    this.events.set(event.eventId, event);
    return event;
  }
}
```

### Explicação

A persistência mínima foi implementada em memória para manter o padrão da arquitetura do projeto e permitir a navegação do evento recém-criado.

## Relação direta com o teste RED

O teste do Material 04 espera exatamente:

```ts
await request(app.getHttpServer())
  .post('/events')
  .send(payload)
  .expect(201)
  .expect(({ body }) => {
    expect(body.eventId).toBeTruthy();
  });
```

A implementação atende à duas exigências principais:

- a rota `POST /events` está disponível;
- a resposta HTTP possui e retorna um `eventId` válido.

## O que ficou para o REFACTOR

- substituir a persistência em memória por armazenamento real;
- validar a classe `Event` com fábrica de domínio mais rica;
- padronizar DTOs, mensagens e erros de acordo com as próximas issues de negócio.
