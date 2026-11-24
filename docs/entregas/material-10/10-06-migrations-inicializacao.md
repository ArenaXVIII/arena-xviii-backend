# 10-06 - Migrations e inicializacao

## Scripts

Foram confirmados os scripts existentes de desenvolvimento e criados:

- `migration:show:prod`
- `migration:run:prod`

Ambos apontam para `dist/database/data-source.js`.

## Banco de destino

Banco de desenvolvimento `arenaxviii_db`, usuario `arenaxviii_user`, porta publicada 5432.

## Historico

Antes da aplicacao:

```text
[ ] CreateEventsTable1794873600000
```

Depois da aplicacao:

```text
[X] 1 CreateEventsTable1794873600000
```

## Aplicacao

Comando executado no contêiner da API:

```bash
docker compose run --rm api pnpm migration:run:prod
```

Resultado: migration executada com sucesso em transacao e registrada em `migrations`.

## Inicializacao

Comandos executados:

```bash
docker compose up -d --build api
docker compose ps
docker compose logs api
docker compose logs postgres
```

Confirmado:

- PostgreSQL `healthy`.
- API `Up`.
- Porta HTTP `3000`.
- TypeORM e modulos Nest inicializados.
- Rotas `/` e `/events` mapeadas.

## Correcao de evidencias em 2026-11-23

- Confirmado no codigo e em disco: scripts `migration:show:prod` / `migration:run:prod`, DataSource compilado e migration compilada existem.
- Compilacao local `pnpm build` aprovada e arquivos JavaScript do runtime confirmados.
- Historico de migrations nao foi consultado por Compose nesta atividade.
- Nenhuma migration foi aplicada novamente; o banco de desenvolvimento nao foi iniciado nem verificado.
- Inicializacao da API em Docker nao foi executada; PostgreSQL `healthy` e logs anteriores nao sao evidencias desta atividade.

## Resultado real em 2026-11-24

- Antes da aplicacao, `docker compose run --rm --no-deps api pnpm migration:show:prod` mostrou `[ ] CreateEventsTable1794873600000`.
- A migration foi aplicada somente no banco de desenvolvimento com `migration:run:prod`.
- A verificacao posterior mostrou `[X] 1 CreateEventsTable1794873600000`.
- API iniciada em contêiner e PostgreSQL de desenvolvimento iniciado com status `healthy`.
- Logs mostraram as rotas mapeadas `/`, `POST /events` e `PATCH /events/:eventId/publish`, alem da inicializacao da aplicacao.

