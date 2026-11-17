# 08-04 - Execucao HTTP integrada

## Cenario valido

Requisicao real via Supertest:

```http
PATCH /events/1/publish
```

O repositorio em memoria inicia o evento `1` como `PLANNED`. O fluxo real retornou `200` e um DTO contendo `eventId: "1"`, `status: "published"`, `message: "Evento divulgado com sucesso."` e `updatedAt` serializado como string.

## Cenario invalido

```http
PATCH /events/%20/publish
```

O `PublishEventParamsDto` e o `ValidationPipe` rejeitaram o identificador em branco com `400`. A chamada nao alcanca o service.

## Limite da evidencia

A resposta comprova que controller, service, token e repository participaram do fluxo e produziram um DTO compativel. Ela nao e uma inspecao direta da colecao privada do repository. Nao foram adicionados metodos de consulta nem endpoints fora do escopo.
