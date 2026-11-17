# 09-01 - Diagnostico da persistencia e linha de base

## Projeto e caso de uso

Projeto Arena XVIII, caso de uso UC03 - Divulgar Evento. O fluxo HTTP inclui `POST /events` para cadastro e `PATCH /events/:eventId/publish` para divulgacao.

Destino dos artefatos: `docs/entregas/material-09/`.

## Contratos e arquitetura preservados

O contrato existente e `IEventsRepository`, identificado pelo token `EVENTS_REPOSITORY`, com `findEventById(eventId): Promise<Event | null>` e `save(event): Promise<Event>`. O dominio `Event`, `EventsService`, controllers, DTOs e excecoes existentes foram mantidos. A arquitetura passa a ser:

`HTTP -> EventsController -> EventsService -> EVENTS_REPOSITORY -> TypeOrmEventsRepository -> TypeORM -> PostgreSQL`.

A entidade ORM e separada da entidade de dominio. O provider em memoria continua selecionado nos testes (`NODE_ENV=test`).

## Infraestrutura encontrada

- O `compose.yaml` local ja continha um servico PostgreSQL 17, porta host 5432 para porta interna 5432, volume persistente e healthcheck. O arquivo estava nao rastreado antes desta tarefa; suas configuracoes existentes foram preservadas e o servico de testes foi acrescentado com profile e volume distintos.
- Docker Desktop nao estava disponivel: `docker compose ps` falhou ao conectar ao pipe do Docker Desktop.
- Nao foi encontrado arquivo `.env`; `.gitignore` ja ignora arquivos `.env` locais.
- Nao havia TypeORM, driver `pg`, DataSource, entidade ORM ou migrations antes desta tarefa.
- Os contratos de dominio e aplicacao estao em `src/modules/events/`.

## Sub-Issue, DoR, dependencias e WIP

A Sub-Issue correspondente e #16 - `[SUB-04] Implementar o adaptador de persistencia de eventos`, aberta e atribuida a `LunaRibeiro`, conforme consulta publica ao GitHub em 2026-11-17. O corpo atual ainda descreve a implementacao em memoria e pede confirmacao da decisao H03. A Issue nao tem comentarios; portanto, H03 e a revisao humana nao estao comprovadas.

O planejamento local declara dependencias das Issues #13 e #14, responsavel `LunaRibeiro` e estado inicial `Backlog`. O artefato DoR local marca DoR-07 (revisao) como pendente. Assim, a Sub-Issue nao deve ser promovida para `Ready` com a evidencia disponivel. A consulta ao GitHub Project/WIP nao foi possivel porque o GitHub CLI nao esta autenticado; o estado atual do quadro e a contagem In Progress permanecem nao verificados. Nenhum status foi alterado.

## Linha de base

Branch em que a linha de base foi executada: `main`, commit `90dad12135d0a2512ab9105df6344dbc61226bc9` (merge do Material 08, PR #104).

A primeira execucao de `pnpm test --run` falhou porque `class-validator` constava no manifesto e lockfile, mas nao estava instalado em `node_modules`. Apos `pnpm install --frozen-lockfile`, o mesmo comando passou:

```text
Test Files  3 passed (3)
Tests       11 passed (11)
```

As tres suites incluem `test/events.integration.spec.ts`, `test/events.e2e-spec.ts` e `test/app.e2e-spec.ts`. A falha inicial foi ambiental; nenhum teste ou assercao foi alterado para estabelecer a linha de base.

## Branches, PRs e riscos

A branch de trabalho `feature/uc03-material-09-postgres-typeorm` foi criada a partir de `main`, que ja continha o merge dos contratos e testes do Material 08. Ela ainda nao foi publicada. A consulta publica a lista de PRs confirma que o PR #104 do Material 08 foi integrado e que nao ha PR aberto para a Issue #16 ou para o Material 09. Nenhum PR foi criado ou atualizado nesta atividade.

Riscos e pendencias: DoR-07/H03 nao confirmados; estado do Project e WIP nao verificaveis; Docker/PostgreSQL indisponiveis para migration, requisicao HTTP real, consulta SQL e prova de durabilidade. Essas evidencias nao serao declaradas como concluidas sem execucao real.
