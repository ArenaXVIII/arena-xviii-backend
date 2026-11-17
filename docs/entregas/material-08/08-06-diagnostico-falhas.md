# 08-06 - Diagnostico de falhas de integracao

## Falhas observadas

1. `EventsModule` nao compilava por causa do caractere `S` na metadata de controllers. A causa foi sintatica e foi corrigida removendo apenas o caractere.
2. O E2E de criacao retornava `404`, embora o controller existisse. A causa foi o controller de criacao nao estar registrado no modulo. O modulo passou a registrar os dois controllers existentes.

## Falha de DI isolada

O teste integrado tenta compilar um `TestingModule` com `EventsController` e `EventsService`, omitindo deliberadamente o provider `EVENTS_REPOSITORY`. A compilacao rejeita com erro associado a `EventsService`, demonstrando a dependencia ausente, sem alterar o modulo de producao.

Configuracao correta:

```ts
{
  provide: EVENTS_REPOSITORY,
  useExisting: InMemoryEventsRepository,
}
```

O teste confirma a causa por `rejects.toThrow(/EventsService/)`; a mensagem completa do Nest pode variar entre versoes, por isso nao foi inventada nem fixada em texto integral.
