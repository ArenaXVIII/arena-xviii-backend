# 07-03 - Controller e DTO

## Sub-Issues

Atendida a fronteira de #17, com testes relacionados a #18. O contrato de aplicacao de #15 foi preservado: o controller chama `publishEvent(params.eventId)` e nao acessa o repositorio.

## Controller implementado

Arquivo: `src/modules/events/events.controller.ts`.

```ts
@Controller('events')
@UseFilters(EventsExceptionFilter)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Patch(':eventId/publish')
  publish(@Param() params: PublishEventParamsDto) {
    return this.eventsService.publishEvent(params.eventId);
  }
}
```

Nao ha regra de negocio, acesso a persistencia ou instanciacao de entidade no controller.

## DTO implementado

Arquivo: `src/modules/events/dtos/publish-event-params.dto.ts`.

```ts
export class PublishEventParamsDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'eventId must not be blank' })
  eventId!: string;
}
```

O DTO valida a estrutura minima do parametro HTTP. A existencia do evento e sua possibilidade de divulgacao continuam sendo responsabilidades da aplicacao e do dominio.
