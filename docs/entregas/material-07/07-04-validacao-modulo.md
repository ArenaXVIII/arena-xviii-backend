# 07-04 - Validacao e modulo

## ValidationPipe

`src/main.ts` configura:

```ts
new ValidationPipe({ whitelist: true, transform: true })
```

`whitelist` remove propriedades sem decoradores e `transform` transforma os parametros para o tipo esperado pelo DTO. O mesmo pipe foi aplicado no teste HTTP para reproduzir o ambiente real.

## Composicao

`AppModule` importa `EventsModule`. O modulo registra `EventsController`, `EventsService`, `InMemoryEventsRepository`, o provider do token `EVENTS_REPOSITORY` via `useExisting` e `EventsExceptionFilter`.

O filtro traduz:

- evento inexistente: 404;
- evento ja divulgado ou fora de `planned`: 409;
- planejamento incompleto: 422 com `missingFields`.

Falhas tecnicas nao sao expostas pelo filtro de dominio e permanecem como erro 500 generico do Nest.

## Evidencia de inicializacao

`pnpm start:dev` compilou sem erros e produziu:

```text
[RoutesResolver] EventsController {/events}
[RouterExplorer] Mapped {/events/:eventId/publish, PATCH} route
[NestApplication] Nest application successfully started
```

`pnpm build` tambem foi aprovado.
