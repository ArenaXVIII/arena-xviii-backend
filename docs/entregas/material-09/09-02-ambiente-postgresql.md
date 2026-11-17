# 09-02 - Ambiente PostgreSQL

## Infraestrutura inspecionada e alterada

O `compose.yaml` local ja continha PostgreSQL 17 para desenvolvimento, com volume nomeado e healthcheck. O servico existente e o volume foram preservados. Foi acrescentado `postgres-test`, ativado explicitamente pelo profile `test`, com banco, usuario, porta host e volume separados. O arquivo ja era nao rastreado antes desta atividade.

O servico de testes publica `${TEST_DB_PORT:-5434}:5432`: a porta 5434 e a porta no host, usada pelos testes em `localhost`; a porta 5432 e a porta interna do PostgreSQL no container. Em uma consulta SQL dentro do container, `inet_server_port()` normalmente informa 5432. O teste verifica que a porta reportada e positiva, sem exigir que seja igual a porta publicada no host.

Os volumes de desenvolvimento e teste sao distintos. Nenhum volume foi removido e nao foi executado `docker compose down -v`, `DROP` ou `TRUNCATE`. As credenciais nao sao reproduzidas neste documento. `.env.example` apresenta os nomes de variaveis; o arquivo `.env` real continua ignorado pelo Git.

## Variaveis e comandos

Variaveis de desenvolvimento: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` e `DB_NAME`.

Variaveis de teste: `TEST_DB_HOST`, `TEST_DB_PORT`, `TEST_DB_USERNAME`, `TEST_DB_PASSWORD`, `TEST_DB_NAME` e `TEST_DB_ALLOW_DESTRUCTIVE`. O teste nao executa limpeza destrutiva e nao depende de `TEST_DB_ALLOW_DESTRUCTIVE`.

Comando de verificacao executado:

```text
docker compose ps
error: nao foi possivel conectar ao pipe do Docker Desktop (dockerDesktopLinuxEngine)
```

Portanto, nem o servico de desenvolvimento nem o servico de teste tiveram conexao ou healthcheck verificados. A tentativa de `pnpm test:integration`, com as variaveis de teste temporarias apontando para `localhost:5434`, retornou `ECONNREFUSED` para IPv6 e IPv4 antes de inicializar o DataSource ou executar migrations. Nenhum segredo temporario foi gravado em arquivo.

## Proximo procedimento, ainda nao executado

Com Docker Desktop ativo, revisar `docker compose config`, iniciar somente o servico de teste com `docker compose --profile test up -d postgres-test`, aguardar o healthcheck e confirmar a conexao e a identidade do banco. Nao executar migrations ate confirmar `current_database()` e `current_user` contra `TEST_DB_NAME` e `TEST_DB_USERNAME`.

## Estado

A configuracao separada foi implementada, mas inicializacao, conexao e identidade PostgreSQL permanecem pendentes por indisponibilidade do Docker Desktop. A porta host 5434 nao foi confundida com a porta interna 5432.
