# 04-05 — Evidências do TDD RED

**Comando executado:** `pnpm test:e2e`  
**Data/hora local:** 2026-11-10, aproximadamente 15:10 (-03:00).

## Resultado observado

```text
❯ test/events.e2e-spec.ts (1 test | 1 failed)
  × creates an event and returns its identifier for a valid name

Error: expected 201 "Created", got 404 "Not Found"
  ❯ test/events.e2e-spec.ts:29:8
     .expect(201)

Test Files  1 failed | 1 passed (2)
     Tests  1 failed | 1 passed (2)
```

## Análise

O runner executou o cenário e2e e a requisição `POST /events` foi respondida com 404, enquanto o teste esperava 201. O teste existente de e2e passou. A falha é funcional: a rota de cadastro ainda não está registrada no `AppModule` de `main`, e não é erro de sintaxe, caminho de teste ou dependência ausente.

**Validação RED:** legítima para a hipótese de endpoint escolhida. O resultado demonstra que a API de cadastro ainda não está disponível na base atual. Não demonstra a persistência, o estado Planejamento nem os fluxos FA01/FE01; esses cenários seguem pendentes para a conclusão de SUB-06.

> A saída acima foi resumida a partir da execução real; nenhuma saída foi simulada.
