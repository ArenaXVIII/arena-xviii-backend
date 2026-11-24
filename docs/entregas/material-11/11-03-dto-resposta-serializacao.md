# 11-03 - DTO de resposta e serializacao

## Estado anterior

Os DTOs de resposta ja existiam, mas os Controllers retornavam diretamente o objeto produzido pelo Service. Em JavaScript isso poderia entregar campos adicionais presentes em objetos simulados ou futuros sem que o TypeScript detectasse o vazamento.

## Alteracoes realizadas

Foram criados dois mapeadores HTTP:

- `src/modules/events/mappers/create-event-response.mapper.ts`
- `src/modules/events/mappers/publish-event-response.mapper.ts`

Cada mapper seleciona apenas os campos publicos do DTO correspondente.

## Controller de cadastro

O `createEvent` continua recebendo `CreateEventDto`, delegando a `EventsService.createEvent(name)` e retornando o resultado mapeado.

```typescript
const response = await this.eventsService.createEvent(name);
return toCreateEventResponse(response);
```

## Controller de divulgacao

O `publish` continua recebendo `PublishEventParamsDto` e delegando a `EventsService.publishEvent(params.eventId)`.

```typescript
const response = await this.eventsService.publishEvent(params.eventId);
return toPublishEventResponse(response);
```

## Arquivos modificados

- `src/modules/events/controllers/events.controller.ts`
- `src/modules/events/events.controller.ts`
- `src/modules/events/mappers/create-event-response.mapper.ts`
- `src/modules/events/mappers/publish-event-response.mapper.ts`
- `vitest.config.ts`
- `test/events-create.http-spec.ts`
- `test/events-publish.http-spec.ts`

## Evidencias

- `pnpm build`: aprovado.
- Os testes fecharam a resposta contra os campos publicos.
- Uma propriedade simulada `internalNote` nao foi entregue na resposta.
- O mapper de persistencia, o dominio e o repositorio nao foram alterados.

## Verificacao final

- `pnpm lint`: aprovado.
- `pnpm test`: 6 arquivos e 21 testes aprovados, incluindo assercoes fechadas.
- O DTO de cadastro e os dois mappers permanecem separados do mapper de persistencia.
- A imagem Docker foi reconstruida apos estas alteracoes.
