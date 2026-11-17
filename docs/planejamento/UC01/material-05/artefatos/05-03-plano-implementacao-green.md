# 05-03 — Plano de implementação GREEN

## Objetivo

Implementar a menor mudança funcional capaz de transformar o teste RED em GREEN legítimo, sem alterar as asserções do exame e sem ampliar o escopo do caso de uso.

## Plano

1. Registrar `EventsModule` em `AppModule`.
2. Criar `EventsController` com `@Controller('events')` e `@Post()`.
3. Validar `body.name` apenas no contorno da API, retornando `422` quando vazio.
4. Implementar `EventsService.createEvent(name)` e gerar o identificador com `randomUUID()`.
5. Persistir o evento em memória via `InMemoryEventsRepository`.
6. Retornar `201 Created` e um objeto com `eventId` e status do evento.
7. Executar a suíte antiga e a suíte e2e para verificar regressão.

## Critérios de aceitação do GREEN

- o comando do Material 04 passa;
- o corpo da resposta inclui `eventId` truthy;
- a API retorna HTTP 201;
- o restante da suíte continua estável.

## O que não será feito nesta etapa

- refatoração profunda;
- mudança de contrato do teste RED;
- merge em `main`;
- encerramento das issues antes de revisão final.
