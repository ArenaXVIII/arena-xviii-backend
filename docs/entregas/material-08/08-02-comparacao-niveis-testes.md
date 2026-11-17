# 08-02 - Comparacao dos niveis de teste

| Criterio | Nivel A - Service unitario | Nivel B - HTTP com Service simulado | Nivel C - Integrado |
|---|---|---|---|
| Componentes reais | `EventsService`, entidades e excecoes | `EventsController`, DTO e pipe | `EventsModule`, controller, service, token, repository, DTO e pipe |
| Mocks | `EVENTS_REPOSITORY` com `useValue` | `EventsService` com `vi.fn()` | Nenhum no fluxo exercitado |
| Dependencias | Contrato e regras de publicacao | Rota, parametros, status e delegacao | Resolucao IoC e armazenamento em memoria |
| Evidencia | Regras isoladas e chamada a `save` | Fronteira HTTP | Fluxo ponta a ponta em memoria |
| Limitacoes | Nao verifica HTTP ou composicao | Nao executa service/repository reais | Nao verifica banco real ou SQL |

O teste integrado consolidado esta em `test/events.integration.spec.ts`. Ele importa `EventsModule`, cria uma aplicacao Nest real, configura o mesmo `ValidationPipe` da aplicacao e usa Supertest. O teste de diagnostico de DI cria um modulo isolado sem `EVENTS_REPOSITORY` e confirma a falha de compilacao, sem quebrar a producao.
