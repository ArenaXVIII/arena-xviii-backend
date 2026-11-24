# 10-04 - Evolucao do Compose

## Servicos

- API: criado no Compose como `api`, container `arenaxviii-api`.
- Desenvolvimento: `postgres`, container `arenaxviii-postgres`.
- Testes: `postgres-test`, container `arenaxviii-postgres-test`, perfil `test`.

Os volumes existentes e distintos foram preservados.

## API

- Image: `arenaxviii-api:dev`.
- Build: Dockerfile do contexto atual.
- Restart: `unless-stopped`.
- Porta publicada: `3000`.
- Porta interna: `3000`.
- Dependencia: `postgres` com `condition: service_healthy`.

## Variaveis

A API recebe `DB_HOST=postgres`, `DB_PORT=5432` e variaveis de credencial e banco pelo `.env`/defaults do Compose. O banco de testes nao foi usado pela API.

## Validacao

Comando executado sem imprimir configuracao interpolada:

```bash
docker compose config --quiet
```

Resultado: OK.

## Evidencias

- PostgreSQL de desenvolvimento: healthy.
- API: Up e porta `3000`.
- Banco de testes continua separado na porta publicada `5434`.

## Correcao de evidencias em 2026-11-23

- Estrutura confirmada no codigo: API `api`, PostgreSQL `postgres`, PostgreSQL de testes `postgres-test`, porta 3000 e volume de desenvolvimento distinto.
- `docker compose config --quiet` nao foi executado neste ambiente porque Docker/Compose nao esta disponivel.
- Nao houve inicializacao Docker nem comprovacao nova de rede, healthcheck ou contêineres ativos.

## Verificacao real em 2026-11-24

- `docker compose config --quiet`: `OK`.
- API iniciada: `arenaxviii-api`, imagem `arenaxviii-api:dev`, status `Up`, porta publicada `3000`.
- Desenvolvimento: `arenaxviii-postgres`, PostgreSQL 17, status `healthy`, porta publicada `5432`.
- Testes: `arenaxviii-postgres-test`, PostgreSQL 17, status `healthy`, porta publicada `5434`.
- O banco de testes pertence ao projeto Compose `arena-xviii-backend`.
- Nenhum volume ou banco foi removido; nao foram usados `down -v`, revert ou `synchronize`.

