# 10-05 - Rede e variaveis de ambiente

## Rede

A API e os dois bancos compartilham a rede do projeto Compose `arena-xviii-backend_default`. A API resolve PostgreSQL pelo nome de servico `postgres`, nao por `localhost`.

Dentro da API, `localhost` seria o proprio contêiner da API, portanto o Compose usa o nome do servico e a porta interna `5432`.

## Variaveis

- API: `DB_HOST=postgres`.
- API: `DB_PORT=5432`.
- Credenciais e banco: interpoladas pelo Compose a partir do `.env` local.
- `.env.example`: inclui `COMPOSE_PROJECT_NAME`, `PORT` e nomes das variaveis sem dependencias Docker.
- `.env`: ignorado pelo Git e usado apenas no ambiente local.

Nenhuma senha real foi registrada neste documento.

## Evidencias

- Rede confirmada: `arena-xviii-backend_default`.
- PostgreSQL publicado em `5432`.
- Banco de testes publicado em `5434`.
- API publicada em `3000`.
- Logs da API confirmaram inicializacao do TypeOrmCoreModule e dos modulos Nest.

