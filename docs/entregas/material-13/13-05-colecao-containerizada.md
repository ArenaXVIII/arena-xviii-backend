# 13-05 - Colecao containerizada

## Smoke

- `GET /` -> 200.
- Rota inexistente -> 404.

## Ambiente

- API em `http://localhost:3000`.
- Docker Compose com `api` e `postgres`.
- `api` estava `Up`, `postgres` e `postgres-test` estavam `healthy`; o banco de testes está publicado em `5434`.
- Banco de desenvolvimento permanece ativo; o script não reinicia PostgreSQL.

## Operações autorizadas

- O script grava no máximo um evento por execução normal.
- A execução `--durability` pode gravar até um evento adicional.
- Os registros não são removidos.
- Nenhum volume, migration ou banco de testes é removido ou alterado.
- Somente o contêiner `api` é reiniciado no modo de durabilidade.
- Consulta SQL manual com a linha identificada por UUID comparou `eventId`, `name`, `status`, `createdAt` e `updatedAt`: hash antes/depois idêntico; `GET /` retornou 200 após restart.

O README operacional está em `http-rest-client/containerizado/README.md`.
