# 05-05 — Evidências de testes GREEN

## Comando executado

```bash
npm test
npm run test:e2e
```

## Resultado unitário

```text
> arena-xviii-backend@0.0.1 test
> vitest run

 RUN  v4.1.11 C:/Users/utfpr/arena-xviii-backend

 Test Files  2 passed (2)
      Tests  8 passed (8)
```

## Resultado e2e

```text
> arena-xviii-backend@0.0.1 test:e2e
> vitest run --config ./vitest.config.e2e.ts

 RUN  v4.1.11 C:/Users/utfpr/arena-xviii-backend

 Test Files  2 passed (2)
      Tests  2 passed (2)
```

## Comparativo RED → GREEN

### RED (Material 04)

```text
Error: expected 201 "Created", got 404 "Not Found"
```

### GREEN (Material 05)

```text
Test Files  2 passed (2)
Tests  2 passed (2)
```

## Conclusão

A transição RED → GREEN foi confirmada de forma legítima: o mesmo cenário e2e que falhava agora passa por implementação funcional, sem alteração da asserção do teste e sem regressão aparente na suíte básica do projeto.
