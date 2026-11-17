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

