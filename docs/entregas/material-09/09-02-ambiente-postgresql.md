# 09-02 - Ambiente PostgreSQL

## Infraestrutura inspecionada e alterada

O `compose.yaml` local ja continha PostgreSQL 17 para desenvolvimento, com volume nomeado e healthcheck. O servico existente e o volume foram preservados. Foi acrescentado `postgres-test`, ativado explicitamente pelo profile `test`, com banco, usuario, porta host e volume separados. O arquivo ja era nao rastreado antes desta atividade.

O servico de testes publica `${TEST_DB_PORT:-5434}:5432`: a porta 5434 e a porta no host, usada pelos testes em `localhost`; a porta 5432 e a porta interna do PostgreSQL no container. Em uma consulta SQL dentro do container, `inet_server_port()` normalmente informa 5432. O teste verifica que a porta reportada e positiva, sem exigir que seja igual a porta publicada no host.

Os volumes de desenvolvimento e teste sao distintos. Nenhum volume foi removido e nao foi executado `docker compose down -v`, `DROP` ou `TRUNCATE`. As credenciais nao sao reproduzidas neste documento. `.env.example` apresenta os nomes de variaveis; o arquivo `.env` real continua ignorado pelo Git.

## Variaveis e comandos

Variaveis de desenvolvimento: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` e `DB_NAME`.

Variaveis de teste: `TEST_DB_HOST`, `TEST_DB_PORT`, `TEST_DB_USERNAME`, `TEST_DB_PASSWORD`, `TEST_DB_NAME` e `TEST_DB_ALLOW_DESTRUCTIVE`. O teste nao executa limpeza destrutiva e nao depende de `TEST_DB_ALLOW_DESTRUCTIVE`.

Na primeira verificacao, `docker compose ps` nao conseguiu conectar ao pipe do Docker Desktop. Depois, o engine ficou disponivel e foi iniciado somente o servico de teste:

```text
docker compose --profile test up -d postgres-test
Container arenaxviii-postgres-test Started
Volume arena-xviii-backend_arenaxviii_postgres_test_data Created
```

`docker compose --profile test ps` reportou `Up (healthy)` e `0.0.0.0:5434->5432/tcp`; `pg_isready` respondeu `accepting connections`. Uma consulta TCP retornou `arenaxviii_test_db`, `arenaxviii_test_user` e `inet_server_port() = 5432`. Nenhum segredo temporario foi gravado em arquivo.

O banco de desenvolvimento nao foi iniciado; ele permanece sem conexao verificada. O container antigo `welcome-to-docker`, que estava parado e nao pertence a este Compose, foi preservado.

## Estado

A configuracao, inicializacao, conexao e identidade do banco de teste foram confirmadas. A porta host 5434 nao foi confundida com a porta interna 5432. A conexao do banco de desenvolvimento continua pendente.
