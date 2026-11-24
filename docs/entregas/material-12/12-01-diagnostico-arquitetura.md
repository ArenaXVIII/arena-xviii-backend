# 12-01 - Diagnostico da arquitetura

## Projeto e caso de uso

- Projeto: Arena XVIII.
- Caso de uso: UC03 - Divulgar Evento.
- Branch atual: `feature/uc03-material-11-http-contracts`.
- Epic e sub-issues documentadas no planejamento: #12, #14 e #17.
- Documentacao anterior recuperada: oito artefatos do Material 11 em `docs/entregas/material-11/`.

## Componentes examinados

- Controllers: cadastro e divulgacao.
- DTO de entrada: `CreateEventDto`.
- DTOs de resposta: `CreateEventResponseDto` e `PublishEventResponseDto`.
- Mappers HTTP: `create-event-response.mapper.ts` e `publish-event-response.mapper.ts`.
- Application Service: `EventsService`.
- Entidade de dominio: `Event`.
- Contrato de persistencia: `IEventsRepository` e token `EVENTS_REPOSITORY`.
- Adaptadores: `InMemoryEventsRepository` e `TypeOrmEventsRepository`.
- Mapper de persistencia: `EventMapper`.
- Entidade ORM: `EventOrmEntity`.
- Modulos: `EventsModule` e `AppModule`.
- Infraestrutura: Docker Compose, PostgreSQL 17 e migration.

## Linha de base atual

- `pnpm build`: aprovado.
- `pnpm lint`: aprovado sem erros.
- `pnpm test`: 6 arquivos e 21 testes aprovados.
- `pnpm test:integration`: 1 arquivo e 1 teste aprovado.
- Banco de testes isolado: ativo na porta publicada 5434.

## Verificacoes desta auditoria

- `docker compose ps`: API `Up`, PostgreSQL dev `healthy`, PostgreSQL teste `healthy`.
- Migration: `[X] 1 CreateEventsTable1794873600000`.
- Sucesso HTTP containerizado: 201.
- Campo extra na entrada: removido; resposta fechada.
- Nome vazio/corpo vazio/tipo incorreto: 400.
- Nome composto por espacos: 422.
- Nenhum diff em dominio, Service, repositorios, mapper de persistencia ou ORM nesta auditoria.

## Riscos e pendencias

- Existe uma segunda classe em memoria em `events.repository.memory.ts`, mas a busca mostrou que ela nao possui importadores ativos.
- Testes E2E legados nao foram executados porque ainda podem subir `AppModule` contra o banco de desenvolvimento.
- Nenhum estado de GitHub foi consultado ou alterado nesta auditoria.

## Verificacao pos-atividade em 2026-11-24

- Branch atual: `feature/uc03-material-11-http-contracts`.
- `pnpm build`: aprovado.
- `pnpm lint`: aprovado com 0 erros.
- `pnpm test`: 6 arquivos e 21 testes aprovados.
- `pnpm test:integration`: 1 arquivo e 1 teste aprovado no banco isolado.
- Greps de `typeorm` e `infrastructure` no dominio, interface, Service e Controllers nao retornaram linhas.
- Nenhuma alteracao de codigo foi feita neste guia; as alteracoes locais sao os resultados ja existentes dos Materiais 10 e 11.
