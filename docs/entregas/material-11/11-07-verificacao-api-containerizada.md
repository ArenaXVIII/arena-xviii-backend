# 11-07 - Verificacao da API containerizada

## Ambiente

- Docker Engine: `29.9.3`.
- Docker Compose: `v5.7.1`.
- API: `arenaxviii-api:dev`, contêiner `arenaxviii-api`, status `Up`, porta 3000.
- PostgreSQL desenvolvimento: `arenaxviii-postgres`, status `healthy`, porta 5432.
- PostgreSQL testes: `arenaxviii-postgres-test`, status `healthy`, porta 5434.
- Projeto Compose: `arena-xviii-backend`.

## Reconstrucao

O codigo foi alterado e a imagem foi reconstruida com:

```bash
docker compose up -d --build api
```

Manifesto construido: `a032304e16e7c230d55eb95fbfe8fc95441ff27daecee8feaa00d1c827a7d18`.

## Requisicao de sucesso

Payload enviado:

```json
{"name":"Contrato HTTP Material 11 atualizado","campoExtra":"deve ser removido"}
```

Resultado observado:

- Status: `201`.
- Content-Type: `application/json; charset=utf-8`.
- Resposta:

```json
{
  "eventId": "a3df0817-aa02-4bfd-9c13-0143012630ae",
  "status": "planning",
  "createdAt": "2026-11-24T01:35:50.963Z",
  "message": "Evento cadastrado com sucesso."
}
```

A propriedade extra do payload nao apareceu no contrato de resposta e nao apareceu como campo interno adicional.

## Cenarios invalidos

- Nome com espacos: 422.
- Nome vazio: 400.
- Corpo vazio: 400.
- Nome numerico: 400.

## Persistencia

Consulta no PostgreSQL de desenvolvimento pelo UUID:

```text
a3df0817-aa02-4bfd-9c13-0143012630ae|Contrato HTTP Material 11 atualizado|planning|2026-11-24 01:35:50.963+00|2026-11-24 01:35:50.963+00
```

## Migration

A migration continua aplicada:

```text
[X] 1 CreateEventsTable1794873600000
```

## Verificacao pos-atividade em 2026-11-24

- Imagem reconstruida em `docker compose up -d --build api`.
- API `Up`, PostgreSQL desenvolvimento `healthy` e banco de testes `healthy`.
- Requisicao valida com campo extra: 201 e Content-Type `application/json; charset=utf-8`.
- UUID real desta verificacao: `fad9d807-7767-4a1d-9204-765a9c366f35`.
- Resposta continha somente `eventId`, `status`, `createdAt` e `message`.
- Nome com espacos: 422.
- Nome vazio, corpo vazio e tipo incorreto: 400.
- SQL confirmou o mesmo UUID, nome e status no banco de desenvolvimento.
