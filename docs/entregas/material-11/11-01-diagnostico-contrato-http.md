# 11-01 - Diagnostico do contrato HTTP

## Projeto e caso de uso

- Projeto: Arena XVIII.
- Caso de uso: UC03 - Divulgar Evento.
- Branch atual: `feature/uc03-material-11-http-contracts`.
- Issues documentadas no planejamento: Epic #12, contratos #14 e interface HTTP #17.

## Inspecao realizada

- Oito artefatos do Material 10 analisados em `docs/entregas/material-10/`.
- Controller de cadastro: `src/modules/events/controllers/events.controller.ts`.
- Controller de divulgacao: `src/modules/events/events.controller.ts`.
- DTO de entrada: `CreateEventDto`.
- DTOs de resposta existentes: `CreateEventResponseDto` e `PublishEventResponseDto`.
- Service, dominio, mapper de persistencia e repositorios nao foram alterados.
- `ValidationPipe`: `whitelist: true`, `transform: true`.

## Contrato observado antes da estabilizacao

- Cadastro: `POST /events`, sucesso HTTP 201.
- Campos observados no cadastro: `eventId`, `status`, `createdAt`, `message`.
- Invalidacao por nome composto apenas por espacos: HTTP 422.
- DTO vazio, nome vazio e nome nao-string: HTTP 400.
- Divulgacao: `PATCH /events/:eventId/publish`, sucesso HTTP 200 documentado pela implementacao.

## Linha de base

- Antes das alteracoes: `pnpm test` aprovou 4 arquivos e 14 testes.
- `pnpm test:integration` aprovou 1 arquivo e 1 teste contra o banco isolado.
- Os testes HTTP existentes nao estavam incluidos na suite rapida porque os nomes terminavam em `*.http-spec.ts`.

## Decisoes

- Preservar 201 no cadastro e 422 para nome composto por espacos.
- Preservar 400 do ValidationPipe para DTO vazio, nome vazio e tipo incorreto.
- Adicionar mapeamento HTTP explicito em vez de serializar objetos internos.
- Identificar #17 como sub-issue HTTP; #14 como contratos de aplicacao.
- No GitHub nao foram feitas alteracoes, commits ou movimentacao de estados.

## Pendencias

- Confirmacao humana da Issue #17 e de quaisquer outros itens externos.
- Estrategia futura para executar os testes E2E legados sem banco de desenvolvimento.

## Verificacao pos-atividade em 2026-11-24

- `pnpm build`: aprovado.
- `pnpm lint`: aprovado com 0 erros.
- `pnpm test`: 6 arquivos e 21 testes aprovados.
- `pnpm test:integration`: 1 arquivo e 1 teste aprovado contra o banco isolado.
- Dominio, Service, Repository e persistencia nao apareceram em diffs desta atividade.
- API reconstruida e ativa em Docker.
- Contrato real observado: 201 no cadastro valido, 400 nas entradas invalidas do DTO e 422 no nome composto por espacos.
