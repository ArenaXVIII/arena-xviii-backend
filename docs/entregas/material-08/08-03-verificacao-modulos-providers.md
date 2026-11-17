# 08-03 - Verificacao de modulos e providers

## Verificacoes

`EventsModule` registra:

- `EventsController` (publicacao);
- `CreateEventsController` (controller de criacao existente);
- `EventsService`;
- `InMemoryEventsRepository`;
- `EventsExceptionFilter`;
- provider `{ provide: EVENTS_REPOSITORY, useExisting: InMemoryEventsRepository }`.

`AppModule` importa `EventsModule`. O service recebe `@Inject(EVENTS_REPOSITORY)`, portanto depende do contrato em tempo de execucao por token, e nao de uma interface TypeScript apagada pelo compilador.

## Diagnostico

O caractere espurio em `controllers` impedia o build. Apos sua remocao, o build passou. O E2E revelou que o controller de criacao nao estava registrado e retornava 404; o modulo foi ajustado para registrar a classe existente com alias, mantendo as duas rotas.

Comandos finais:

```text
pnpm lint  -> aprovado
pnpm build -> aprovado
```

O container resolve o controller, injeta o service real, resolve `EVENTS_REPOSITORY` para `InMemoryEventsRepository` e executa `findEventById`/`save`.
