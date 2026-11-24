# 13-01 - Diagnostico da verificacao HTTP

## Estado inicial

- Branch: `feature/uc03-material-13-rest-client`.
- Base integrada: PR #106, mergeado em `main`.
- Os oito artefatos numerados `12-01` a `12-08` existiam em `docs/entregas/material-12/`; há também o roteiro adicional `12-roteiro-conclusao-uc03.md`.
- Não existia `http-rest-client/` antes desta atividade.

## Contrato confirmado no código

- `GET /` -> `200` com `Hello World!`.
- `POST /events` -> `201`.
- Campo ausente ou não string -> `400`.
- Nome vazio ou composto apenas por espaços -> `422`.
- `PATCH /events/:eventId/publish` -> `404` para evento inexistente.
- A API usa porta `3000`, `ValidationPipe` com `whitelist: true` e dois mappers HTTP fechados.

## Ambiente observado

- Docker Engine `29.9.3`.
- Docker Compose `v5.7.1`.
- Serviço `api`: `Up`.
- Serviço `postgres`: `healthy`.
- Migration única exibida sem pendências: `CreateEventsTable1794873600000`.
- Banco de testes iniciado na porta `5434` e confirmado `healthy`.
- A migration foi consultada novamente em container: `[X] 1 CreateEventsTable1794873600000`.

## Lacunas e decisão

- Não havia coleção REST versionada.
- Não havia README de operação containerizada.
- Não havia script automatizado.
- Os testes E2E foram executados após confirmar em `vitest.config.e2e.ts` `NODE_ENV=test` e em `AppModule` o uso de repositório em memória sem conexão TypeORM.
- Resultado: 2 arquivos, 2 testes aprovados.
