# 07-06 - Testes HTTP

## Arquivo e ferramenta

Arquivo: `test/events-publish.http-spec.ts`. Runner: Vitest. Cliente HTTP: Supertest. O projeto usa `vi.fn()`, sem mistura com Jest.

## Cenarios

1. `PATCH /events/1/publish`: espera 200, resposta `published` e delegacao com `eventId = 1`.
2. `PATCH /events/%20/publish`: espera 400 e confirma que o servico nao foi chamado.

O teste cria um `TestingModule`, injeta um mock de `EventsService`, aplica `ValidationPipe`, inicializa e fecha a aplicacao Nest.

## Execucoes reais

```text
pnpm test
Test Files 2 passed
Tests 8 passed

pnpm exec vitest run src/modules/events/services/events.service.spec.ts
Test Files 1 passed
Tests 7 passed

pnpm test:e2e
Test Files 1 passed
Tests 1 passed
```

Tambem foram aprovados `pnpm build` e `pnpm lint`.

O teste HTTP da fronteira com mock cobre roteamento, validacao, status e delegacao. Ele nao substitui teste de persistencia real nem E2E de todos os fluxos de negocio.
