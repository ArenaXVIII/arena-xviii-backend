# 08-05 - Testes integrados

Arquivo: `test/events.integration.spec.ts`.

O arquivo e consolidado e contem imports, ciclo de vida da aplicacao, configuracao do `ValidationPipe`, cenarios valido/invalido e diagnostico isolado de DI. Nao usa mock de `EventsService` nem de `InMemoryEventsRepository`.

Resultado direcionado:

```text
pnpm exec vitest run test/events.integration.spec.ts
Test Files  1 passed (1)
Tests       3 passed (3)
```

Resultado da suite:

```text
pnpm test
Test Files  3 passed (3)
Tests       11 passed (11)
```

Comparacao: a linha de base tinha 2 arquivos e 8 testes; a etapa acrescentou 1 arquivo e 3 testes, sem regressao.

## Armazenamento

O evento seed foi lido, alterado e salvo pelo repository real. Ainda assim, a evidencia observada e a resposta HTTP; o mapa privado nao foi inspecionado diretamente. Essa escolha preserva o encapsulamento do adaptador.
