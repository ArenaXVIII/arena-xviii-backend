# 13-03 - Cenarios do caso de uso

| Cenário | Requisição | Esperado | Obtido |
|---|---|---|---|
| Cadastro válido | `POST /events` | 201 | 201 |
| Campo ausente | `POST /events` | 400 | 400 |
| Nome vazio | `POST /events` | 400 | 400 |
| Nome não string | `POST /events` | 400 | 400 |
| Nome só com espaços | `POST /events` | 422 | 422 |
| Campo extra | `POST /events` | 201, campo removido | 201 |
| Evento inexistente | `PATCH /events/:eventId/publish` | 404 | 404 |

O identificador do cenário 404 é um UUID de teste fixo, usado apenas para buscar um registro inexistente; não representa dado obtido de seed. A resposta de cadastro foi inspecionada diretamente: HTTP 201 e somente `createdAt,eventId,message,status`; `campoExtra` não aparece.

Resultado dos testes no código: `pnpm test` aprovou 6 arquivos/21 testes; `pnpm test:e2e` aprovou 2 arquivos/2 testes. O script verifica o status e a presença do identificador, mas não compara por si só o conjunto completo de propriedades da resposta.
