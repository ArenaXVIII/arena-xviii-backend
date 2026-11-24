# 11-04 - Semantica HTTP e erros

## Matriz observada no contêiner

| Cenário | Entrada | Resultado observado | Status |
|---|---|---|---|
| Cadastro valido | nome valido | Evento criado e JSON publico | 201 |
| Nome com espacos | `{"name":"   "}` | `Event name is required and cannot be empty.` | 422 |
| Nome vazio | `{"name":""}` | Validacao de campo vazio | 400 |
| Corpo vazio | `{}` | Validacao de nome obrigatorio e tipo | 400 |
| Tipo incorreto | `{"name":123}` | Validacao de tipo string | 400 |
| Campo extra | campo nao definido no DTO | campo extra removido pelo whitelist | 201 |

## Respostas invalidas

- Nome vazio: `{"message":["name should not be empty"],"error":"Bad Request","statusCode":400}`.
- Corpo vazio: mensagens de `should not be empty` e `must be a string`, com status 400.
- Tipo incorreto: mensagem `name must be a string`, com status 400.
- Nome com espacos: resposta 422 existente no Controller.

## Decisoes

- Preservar a configuracao efetiva `whitelist: true`, `transform: true`.
- Nao configurar `forbidNonWhitelisted: true`, pois isso mudaria o contrato atual e nao foi exigido pela especificacao real.
- Nao introduzir 404, 409 ou 500 no cadastro.
- Os fluxos de erro da divulgacao ja possuem excecoes e filtro implementados; nao houve mudanca sem verificacao concreta.

Nenhuma falha destrutiva de banco foi provocada.

## Evidencia pos-atividade

- Cadastro valido com campo extra: 201.
- Nome com espacos: 422.
- Nome vazio: 400.
- Corpo vazio: 400.
- Tipo incorreto: 400.
- Nenhuma resposta continha stack trace, SQL ou nomes de tabelas.
