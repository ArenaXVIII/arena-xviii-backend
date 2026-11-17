# 07-02 - Planejamento HTTP e branch

## Escopo

Issue #12 (UC03 - Divulgar Evento) -> #17 (SUB-05 - API HTTP) com dependencia de #15 (servico) e #16 (adaptador). Os testes HTTP desta entrega estao relacionados a #18.

## Branch

Nome proposto: `feature/uc03-events-http`.

O repositorio entregue nao possui `.git`, portanto a branch nao foi criada. A base correta deve ser a branch que contenha o `EventsService` GREEN e os contratos anteriores; nao se deve ramificar de `main` se esses commits ainda nao estiverem integrados.

Arvore planejada:

```text
main
  +-- branch de contratos/testes (#14, se ainda nao integrada)
        +-- branch do servico GREEN (#15)
              +-- feature/uc03-events-http (#17)
```

O PR da fronteira deve apontar para a branch do servico enquanto ela nao estiver em `main`. Somente os arquivos do controller, DTO, filtro, modulo, adaptador em memoria e testes HTTP devem ser exclusivos desta branch.

## Matriz tecnica

| Componente | Arquivo | Contrato | Sub-Issue | Dependencia | Verificacao |
|---|---|---|---|---|---|
| Controller | `src/modules/events/events.controller.ts` | `publishEvent(eventId)` | #17 | Servico | Teste HTTP |
| DTO | `src/modules/events/dtos/publish-event-params.dto.ts` | `eventId` | #17/#14 | class-validator | 400 para branco |
| Validacao | `src/main.ts` e teste | `ValidationPipe` | #17 | class-transformer | Requisicao real |
| Modulo/providers | `events.module.ts`, `app.module.ts` | token `EVENTS_REPOSITORY` | #17 | Adaptador | Build e startup |
| Repositorio | `in-memory-events.repository.ts` | `IEventsRepository` | #16 | Entidade | E2E e startup |
| Testes | `test/events-publish.http-spec.ts` | PATCH + JSON | #18 | Vitest/Supertest | 2 cenarios |

## Riscos e decisoes

- Risco: ausencia de Git local impede branch, commit e PR; mantido como pendencia explicita.
- Decisao: manter `PATCH /events/:eventId/publish`, conforme H01.
- Decisao: mapear recusas para 404, 409 e 422 conforme H02.
- Decisao: usar repositorio em memoria H03, sem persistencia real.
- A validacao HTTP nao substitui as regras de `Event.publish()`.
