# 10-07 - Execucao, testes e persistencia

## Cadastro HTTP

Payload enviado:

```json
{"name":"Evento de verificacao Material 10"}
```

Resposta real:

```json
{"eventId":"f4955111-4a12-46b9-bf9e-bae9e464e76f","status":"planning","createdAt":"2026-11-17T19:21:12.760Z","message":"Evento cadastrado com sucesso."}
```

Status observado: HTTP 201.

## Validacao

Payload com nome composto apenas por espaços foi rejeitado com HTTP 422:

```json
{"message":"Event name is required and cannot be empty.","error":"Unprocessable Entity","statusCode":422}
```

## Consulta SQL antes do reinicio

O registro foi consultado diretamente em `arenaxviii_db` pela tabela `"events"` e pelo UUID real. A consulta confirmou nome, status `planning`, timestamps e arrays vazios.

## Reinicio

Comando executado:

```bash
docker compose restart api
```

Somente o contêiner da API foi reiniciado. PostgreSQL e volumes nao foram reiniciados ou removidos.

## Consulta SQL apos o reinicio

A mesma consulta pelo mesmo UUID retornou:

- UUID: `f4955111-4a12-46b9-bf9e-bae9e464e76f`.
- Nome: `Evento de verificacao Material 10`.
- Status: `planning`.
- `createdAt`: `2026-11-17 19:21:12.76+00`.
- `updatedAt`: `2026-11-17 19:21:12.76+00`.

Durabilidade confirmada pelo mesmo registro antes e depois do reinicio da API.

## Testes

- Linha de base: 4 arquivos, 14 testes aprovados.
- Pos-containerizacao: 4 arquivos, 14 testes aprovados.
- Integracao PostgreSQL: 1 arquivo, 1 teste aprovado.
- Nenhuma regressao observada.

## Correcao de evidencias em 2026-11-23

- Confirmado agora: `pnpm test` = 4 arquivos aprovados, 14 testes aprovados.
- Confirmado agora: `pnpm test:e2e` = 2 arquivos aprovados, 2 testes aprovados.
- Confirmado agora: `pnpm test:integration` nao iniciou o teste por falta de `TEST_DB_HOST` e das demais variaveis; resultado: 1 suite falha por configuracao, 1 teste pendente.
- Nao confirmado: requisicao HTTP real, resposta do servidor, consulta SQL, reinicio da API e durabilidade.
- Nenhuma operacao de banco de desenvolvimento ou destrutiva foi executada.

## Verificacao integral real em 2026-11-24

### HTTP

- `POST /events` recebeu uma requisicao valida com campo extra fora do contrato.
- Status real: `201`.
- UUID real criado: `9a6553a5-03e0-4b99-bc16-40558ad850b0`.
- Resposta confirmou `status: planning` e a mensagem de sucesso.
- Um corpo com nome composto apenas por espacos foi rejeitado com `422` e a mensagem `Event name is required and cannot be empty.`

### Durabilidade

Antes do reinicio da API, a consulta por UUID retornou:

```text
9a6553a5-03e0-4b99-bc16-40558ad850b0|Evento de verificacao Material 10|planning|2026-11-24 01:12:28.848+00|2026-11-24 01:12:28.848+00
```

Somente o contêiner da API foi reiniciado. Depois do reinicio, a mesma consulta retornou os mesmos valores de UUID, nome, status e timestamps.

### Testes

- `pnpm test`: 4 arquivos aprovados, 14 testes aprovados.
- Banco isolado `postgres-test`: portaria publicada `5434`, status `healthy`, projeto Compose `arena-xviii-backend`.
- `pnpm test:integration`: 1 arquivo aprovado, 1 teste aprovado.
- `pnpm test:e2e`: nao executado. Os testes legados em `test/*.e2e-spec.ts` importam o `AppModule` completo e podem abrir conexao com o banco de desenvolvimento; isso estaria fora do escopo seguro deste guia.

