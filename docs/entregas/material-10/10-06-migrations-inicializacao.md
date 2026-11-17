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

