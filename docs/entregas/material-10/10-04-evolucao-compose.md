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

