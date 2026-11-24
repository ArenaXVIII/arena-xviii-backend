# 10-08 - Versionamento e checklist consolidado

## Identificacao

- Projeto: Arena XVIII.
- Caso de uso: UC03 - Divulgar Evento.
- Issue: #16.
- Epic: UC03.
- Branch: `feature/uc03-material-09-postgres-typeorm`.

## Estado inicial

- Dockerfile vazio.
- `.dockerignore` ausente.
- API ausente no Compose.
- Compose com PostgreSQL de desenvolvimento e testes.
- Migration pendente no banco de desenvolvimento.

## Alteracoes realizadas

- Dockerfile multi-stage criado.
- `.dockerignore` criado.
- Servico `api` acrescentado ao Compose.
- `COMPOSE_PROJECT_NAME` e porta definidos no `.env.example`.
- Scripts `migration:show:prod` e `migration:run:prod` adicionados.
- `packageManager` fixado em `pnpm@10.34.9`.
- Decoradores de validacao corrigidos em `CreateEventDto`.
- Oito artefatos Material 10 criados.

## Evidencias praticas

- Imagem: `arenaxviii-api:dev`.
- Compose: valido com `docker compose config --quiet`.
- API: Up em `3000`.
- PostgreSQL desenvolvimento: healthy em `5432`.
- PostgreSQL testes: healthy em `5434`.
- Migration aplicada no banco de desenvolvimento.
- Cadastro HTTP aprovado.
- Registro confirmado antes e depois do reinicio da API.
- Testes aprovados.

## Commits

Nenhum commit foi criado automaticamente nesta atividade. As alterações estão disponíveis no diretório de trabalho para commit seletivo.

## Pull Request e Project

- Não foi possível autenticar o GitHub CLI.
- Não foi criado ou atualizado PR.
- Nenhum status de Issue ou GitHub Project foi alterado.
- Nenhum merge foi executado.

## Checklist

| Item | Status |
|---|---|
| Oito Markdown do Material 09 analisados | Confirmado |
| Issue e Epic verificadas | Confirmado |
| Branch confirmada | Confirmado |
| Dockerfile criado | Confirmado |
| Versões verificadas | Confirmado |
| Lockfile validado pelo build | Confirmado |
| Build multi-stage verificado | Confirmado |
| `.dockerignore` auditado/criado | Confirmado |
| Imagem construída e identificada | Confirmado |
| Serviço API adicionado | Confirmado |
| PostgreSQL dev/teste e volumes preservados | Confirmado |
| Rede e portas confirmadas | Confirmado |
| Configuração Compose validada | Confirmado |
| Migration aplicada somente no pendente confirmado | Confirmado |
| Nenhuma operação destrutiva realizada | Confirmado |
| API inicializada e logs inspecionados | Confirmado |
| Cadastro HTTP executado | Confirmado |
| Registro consultado no PostgreSQL | Confirmado |
| API reiniciada e registro consultado novamente | Confirmado |
| Durabilidade comprovada | Confirmado |
| Testes principais reexecutados | Confirmado |
| Banco de testes isolado usado | Confirmado |
| PR existente verificado | Não foi possível verificar |
| GitHub Project atualizado | Não foi possível verificar |

## Pendencias

- Autenticar o GitHub CLI.
- Criar ou atualizar o PR da containerizacao.
- Atualizar Issue e GitHub Project conforme o fluxo da equipe.

## Verificacao complementar executada em 2026-11-23

### Evidencias reais desta verificacao

- Node local: `v24.21.0`.
- pnpm: `10.34.9`.
- `pnpm install --frozen-lockfile`: aprovado.
- `pnpm test`: 4 arquivos e 14 testes aprovados.
- `pnpm test:e2e`: 2 arquivos e 2 testes aprovados.
- `pnpm build`: aprovado.
- Arquivos compilados existentes: `dist/main.js`, `dist/database/data-source.js` e migration JavaScript correspondente.
- `pnpm test:integration`: falhou por variaveis `TEST_DB_*` ausentes.
- Docker/Compose: nao instalado ou nao acessivel no ambiente atual.
- GitHub CLI: nao instalado ou nao acessivel no ambiente atual.

### Checklist corrigido

| Item | Status atualizado |
|---|---|
| Dockerfile examinado e arquivos compilados confirmados | Confirmado |
| Versoes confirmadas | Confirmado |
| Lockfile validado | Confirmado |
| Build local verificado | Confirmado |
| `.dockerignore` auditado | Confirmado |
| Build de imagem Docker | Pendente |
| Configuracao Compose validada | Pendente |
| API em conteiner iniciada | Pendente |
| Postgres dev/teste verificados em conteiner | Pendente |
| Migration aplicada no banco de desenvolvimento | Pendente |
| Cadastro HTTP real e consulta SQL | Pendente |
| Durabilidade apos reinicio da API | Pendente |
| Testes unitarios reexecutados | Confirmado |
| Testes E2E reexecutados | Confirmado |
| Testes PostgreSQL reexecutados | Pendente |
| Issue/PR/Project verificados | Nao foi possivel verificar |
| Commits, Push ou merge | Nao aplicavel nesta atividade |

## Checklist atualizado em 2026-11-24

| Evidencia do guia | Status real |
|---|---|
| Branch e `.env` protegido | Confirmado; branch atual `feature/uc03-material-11-http-contracts` |
| Chaves do `.env.example` presentes | Confirmado |
| Docker Engine 29.9.3 e Compose v5.7.1 | Confirmado |
| `docker compose config --quiet` | OK |
| Build da imagem da API | Confirmado; `arenaxviii-api:dev` |
| Compose ps com API e PostgreSQL dev | Confirmado; API Up e PostgreSQL healthy |
| Logs da API com rotas e porta | Confirmado; porta 3000 |
| Migration show antes da aplicacao | Confirmado; uma migration `[ ]` |
| Migration aplicada no banco de desenvolvimento | Confirmado; posterior `[X]` |
| Cadastro HTTP | Confirmado; POST /events 201, UUID registrado |
| Validacao invalida | Confirmado; HTTP 422 |
| SQL antes do restart | Confirmado; 1 linha |
| Restart somente da API | Confirmado |
| SQL apos o restart | Confirmado; mesma linha e mesmos atributos |
| `pnpm test` | Confirmado; 4 arquivos, 14 testes |
| Banco de testes isolado | Confirmado; projeto correto e porta 5434 |
| `pnpm test:integration` | Confirmado; 1 arquivo, 1 teste |
| E2E legado | Nao executado; risco de acesso ao banco de desenvolvimento |
| `.env` ausente do diff e nenhuma credencial | Confirmado |
| Git lockfile alterado pelos testes | Confirmado como nao alterado |
| Commit, push ou merge | Nao executado |

## Pendencias restantes

- Atualizar Issue, PR e GitHub Project no fluxo externo da equipe, se a equipe exigir.
- Executar uma estrategia segura de E2E somente quando os testes puderem ser isolados do banco de desenvolvimento.
