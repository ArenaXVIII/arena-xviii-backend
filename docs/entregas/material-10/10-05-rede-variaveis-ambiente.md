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

## Correcao de evidencias em 2026-11-23

- Confirmado no codigo: a API recebe `DB_HOST=postgres`, `DB_PORT=5432`; banco de testes usa porta publicada `5434`.
- `.env` local nao existe no workspace e nenhuma variavel `TEST_DB_*` estava definida no processo atual.
- Rede compartilhada, resolucao DNS, healthchecks, variaveis dentro do processo e comunicacao TCP nao foram confirmados operacionalmente: Docker nao esta acessivel.

## Evidencias reais em 2026-11-24

- `.env` esta protegido pelo Git e todas as chaves de `.env.example` estao presentes.
- Compose iniciou a API na porta publicada `3000`.
- Banco de desenvolvimento publicado em `5432` e banco isolado de testes em `5434`.
- A API se comunicou com o banco pelo host interno `postgres` e porta interna `5432`.
- Os logs confirmaram que NestJS, TypeORM e os modulos da API iniciaram no contêiner.
- Nenhum valor secreto foi registrado nos artefatos ou no diff.

