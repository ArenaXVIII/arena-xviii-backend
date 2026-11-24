# 10-01 - Diagnostico da containerizacao

## Projeto e caso de uso

- Projeto: Arena XVIII.
- Caso de uso: UC03 - Divulgar Evento.
- Contrato preservado: `IEventsRepository` / `EVENTS_REPOSITORY`.
- Branch inspectada: `feature/uc03-material-09-postgres-typeorm`.

## Verificacao atual executada em 2026-11-23

- Confirmado no codigo: `Dockerfile` multi-stage, `.dockerignore`, Compose com API e PostgreSQL dev/teste ja existem.
- Executado nesta atividade: Node.js local `v24.21.0`, pnpm `10.34.9`, `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm test:e2e` e `pnpm build`.
- Executado nesta atividade: `pnpm test` aprovou 4 arquivos e 14 testes; `pnpm test:e2e` aprovou 2 arquivos e 2 testes; `pnpm build` aprovou.
- Executado nesta atividade: `pnpm test:integration` falhou antes da execucao por ausencia de `TEST_DB_HOST` e das demais variaveis `TEST_DB_*`; 1 teste ficou pendente.
- Nao confirmado nesta atividade: Docker nao esta instalado ou acessivel no PATH (`docker` nao localizado); portanto nao houve `docker build`, `docker compose`, inicializacao de contêineres, migration, HTTP nem consulta SQL.
- Branch atual do workspace: `feature/uc03-material-11-http-contracts`; a branch historica da containerizacao/persistencia permanece registrada como `feature/uc03-material-09-postgres-typeorm`.
- GitHub CLI: `gh` nao esta instalado ou acessivel neste ambiente; Issue, Epic, PR, Project e status remoto nao puderam ser consultados agora.

## Documentacao anterior

Os oito artefatos do Material 09 em `docs/entregas/material-09/` foram analisados.

## Issue e GitHub

- Issue containerizacao/persistencia: #16, estado publico aberto, responsavel `LunaRibeiro`.
- Epic: UC03 no planejamento local.
- A CLI do GitHub nao estava autenticada nesta atividade.
- Nenhum PR relacionado a containerizacao ou Material 10 foi criado.
- Nenhum status de Issue, Project ou WIP foi alterado.

## Infraestrutura existente

- `Dockerfile`: inexistente efetivamente (arquivo vazio).
- `.dockerignore`: inexistente.
- `compose.yaml`: existente com PostgreSQL 17 de desenvolvimento e PostgreSQL 17 de testes.
- `api`: inexistente no Compose.
- Volume de desenvolvimento: `arenaxviii_postgres_data`.
- Volume de testes: `arenaxviii_postgres_test_data`.

## Linha de base executada

- `pnpm test --run`: 4 arquivos aprovados, 14 testes aprovados.
- `pnpm build`: aprovado.
- `pnpm test:integration`: aprovado contra o banco isolado de testes apos informar as variaveis `TEST_DB_*` existentes no ambiente.

## Diagnosticos

- Confirmado: Node efetivo local `v23.10.0`; pnpm efetivo `10.34.9`.
- Confirmado: Docker Engine e Docker Compose disponiveis.
- Confirmado: banco de testes ativo e healthy na porta publicada 5434.
- Pendente de correcao inicial: Dockerfile vazio e ausencia de `.dockerignore`.
- Pendente de correcao inicial: Compose sem servico `api`.
- Confirmado: a DTO `CreateEventDto` nao continha decoradores e o whitelist removia `name`; foi corrigida com `@IsString()` e `@IsNotEmpty()`.

## Verificacao integral executada em 2026-11-24

- Branch atual observada: `feature/uc03-material-11-http-contracts`; nao houve troca de branch.
- Docker Engine `29.9.3` e Docker Compose `v5.7.1` confirmados.
- `.env` existe e esta protegido por `.gitignore`; todas as chaves de `.env.example` estao presentes, incluindo `COMPOSE_PROJECT_NAME`.
- `docker compose config --quiet` retornou `OK`.
- `docker compose build api` concluiu e produziu a imagem `arenaxviii-api:dev`.
- API e PostgreSQL de desenvolvimento iniciaram; PostgreSQL ficou `healthy` e a API ficou `Up`.
- Migration pendente aplicada somente no banco de desenvolvimento e confirmada como `[X]`.
- Cadastro HTTP validado em `POST /events`: status 201 e UUID `9a6553a5-03e0-4b99-bc16-40558ad850b0`.
- Corpos invalidos com nome vazio ou composto por espacos foram rejeitados com HTTP 422.
- Registro persistiu identico apos reinicio exclusivamente da API.
- Banco isolado de testes iniciou na porta publicada 5434, com projeto Compose `arena-xviii-backend`.
- `pnpm test`: 4 arquivos e 14 testes aprovados.
- `pnpm test:integration`: 1 arquivo e 1 teste aprovados contra o banco isolado.
- E2E legado nao executado por importar `AppModule` completo e poder acessar o banco de desenvolvimento.

