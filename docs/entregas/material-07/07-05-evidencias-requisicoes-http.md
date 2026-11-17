# 07-05 - Evidencias das requisicoes HTTP

## Ambiente

- Aplicacao: NestJS em modo watch.
- URL: `http://localhost:3000`.
- Ferramenta: `curl.exe` no PowerShell.
- Data observada: 17/11/2026.

## Cenario valido

Comando:

```text
curl.exe -i -X PATCH http://localhost:3000/events/1/publish
```

Resultado real: `HTTP/1.1 200 OK`.

```json
{"eventId":"1","status":"published","updatedAt":"2026-11-17T17:14:00.125Z","message":"Evento divulgado com sucesso."}
```

O evento seed `1` foi localizado, o servico foi chamado e o estado foi persistido no repositorio em memoria.

## Cenario invalido

Comando:

```text
curl.exe -i -X PATCH "http://localhost:3000/events/%20/publish"
```

Resultado real: `HTTP/1.1 400 Bad Request`.

```json
{"message":["eventId must not be blank"],"error":"Bad Request","statusCode":400}
```

A requisicao foi rejeitada pelo `ValidationPipe` antes de chamar o servico. Isso comprova a validacao da fronteira HTTP, nao uma nova regra de negocio.

## Limites

O repositorio e em memoria e perde estado ao reiniciar. Nao foi possivel comprovar commit, push, PR ou atualizacao do Project porque a copia local nao e um repositorio Git.
