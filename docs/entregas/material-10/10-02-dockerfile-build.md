# 10-02 - Dockerfile e build

## Estado inicial

O Dockerfile existia como arquivo vazio. Foi criado o minimo necessario em um formato multi-stage.

## Versoes

- Node local: `v23.10.0`.
- pnpm local: `10.34.9`.
- Imagem base: `node:24-bookworm-slim`, pois o projeto declara tipos Node 24 e nao possui campo `packageManager` anterior.
- pnpm operacional da imagem: `10.34.9`.
- PostgreSQL: `17`.

O projeto nao declarava uma versao exata anterior de Node. Para nao substituir silenciosamente, o Dockerfile usa a familia major 24 e registra a diferenca.

## Etapas

Build:

- `node:24-bookworm-slim`
- trabalho em `/app`
- pnpm 10.34.9
- `pnpm install --frozen-lockfile`
- `pnpm build`

Runtime:

- `node:24-bookworm-slim`
- pnpm 10.34.9
- dependencias de producao com `--prod --frozen-lockfile`
- copia de `dist`
- porta 3000
- entrypoint `node dist/main.js`

## Arquivos compilados

- Entry point: `dist/main.js`.
- DataSource: `dist/database/data-source.js`.
- Migration: `dist/database/migrations/1794873600000-create-events-table.js`.

## Evidencias

- `pnpm build`: aprovado.
- `docker compose config --quiet`: aprovado.
- `docker build -t arenaxviii-api:dev .`: aprovado.
- Imagem identificada: `arenaxviii-api:dev`, ID `4f0306815b28`, tamanho observado `312MB`.
- Nenhum arquivo `.env` foi enviado ao contexto de build.

## Verificacao complementar executada em 2026-11-23

- Versao efetiva local executada: Node.js `v24.21.0`; pnpm `10.34.9`.
- `pnpm install --frozen-lockfile`: aprovado; o lockfile permaneceu valido.
- `pnpm build`: aprovado.
- Compilado confirmado em disco: `dist/main.js`, `dist/database/data-source.js` e `dist/database/migrations/1794873600000-create-events-table.js`.
- A afirmacao anterior de que `docker build` foi aprovado nao pode ser reproduzida neste ambiente: o executavel Docker nao esta disponivel.
- Imagem `arenaxviii-api:dev` e o ID/tamanho anteriormente registrados permanecem como evidencias historicas, nao como executados nesta atividade.

## Evidencias reais da verificacao em 2026-11-24

- Docker Engine: `29.9.3`; Docker Compose: `v5.7.1`.
- `docker compose config --quiet`: `OK`.
- `docker compose build api`: concluido sem erro.
- Build stage: `pnpm install --frozen-lockfile` aprovado e `pnpm build` aprovado.
- Runtime stage: dependencias de producao instaladas com `--frozen-lockfile`.
- Imagem real criada: `arenaxviii-api:dev`, com ID Docker `9d17e1bfcc89`.
- Nenhuma senha foi incluida nesta documentacao ou no contexto de build.

