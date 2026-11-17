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

