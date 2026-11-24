# 11-02 - Definicao do contrato publico

## Contrato de entrada

| Campo | Tipo | Obrigatorio | Regras |
|---|---|---|---|
| `name` | string | Sim | nao vazio; espacos extremos nao sao aceitos |

Propriedades extras de entrada sao removidas pelo `ValidationPipe` configurado com `whitelist: true`.

## Contrato anterior observado - cadastro

```json
{
  "eventId": "uuid",
  "status": "planning",
  "createdAt": "timestamp ISO-8601",
  "message": "Evento cadastrado com sucesso."
}
```

Status esperado e observado: `201 Created`.

## Contrato anterior observado - divulgacao

```json
{
  "eventId": "string",
  "status": "published",
  "updatedAt": "timestamp ISO-8601",
  "message": "Evento divulgado com sucesso."
}
```

Status esperado pela implementacao: `200 OK`.

## Responsabilidades distintas

| Modelo | Responsabilidade |
|---|---|
| `CreateEventDto` | Entrada HTTP |
| `Event` | Entidade de dominio e invariantes |
| `EventOrmEntity` | Persistencia TypeORM |
| `CreateEventResponseDto` | Confirmacao publica do cadastro |
| `PublishEventResponseDto` | Confirmacao publica da divulgacao |

O `Event` e a entidade ORM nao sao expostos diretamente pelos Controllers.

## Compatibilidade

- A estrutura publica de cadastro foi preservada.
- Nenhum campo novo foi introducido.
- Nenhum identificador foi renomeado.
- Nenhum status de sucesso foi alterado.

## Confirmacao pos-atividade

- Resposta containerizada validada com somente `eventId`, `status`, `createdAt` e `message`.
- Campo extra enviado na entrada foi removido pelo whitelist.
- Status 201, 400 e 422 confirmados segundo a semantica implementada.
