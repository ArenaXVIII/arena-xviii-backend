# 04-06 — Registro de alterações

**Branch:** `test/26-uc01-sub06-event-registration-e2e`  
**Issue:** [#26 — UC01/SUB-06](https://github.com/ArenaXVIII/arena-xviii-backend/issues/26)

## Alteração commitada

- `test/events.e2e-spec.ts` — novo teste e2e do fluxo principal para nome válido.
- Nenhum arquivo de produção foi modificado.
- `git diff --check` não reportou problemas.
- O lint (`pnpm exec oxlint --type-aware test/events.e2e-spec.ts`) e o formato (`pnpm exec prettier --check test/events.e2e-spec.ts`) passaram.
- A suíte e2e mantém 1 teste existente aprovado; o novo cenário falha conforme a evidência RED em `04-05-evidencias-tdd-red.md`.

## Commit

```text
commit be16843e38aaee159aaf3b05c4040310ff79f5d7
test(events): add failing event creation e2e test (refs #26)

test/events.e2e-spec.ts | 34 ++++++++++++++++++++++++++++++++++
1 file changed, 34 insertions(+)
```

## Push

```text
git push -u origin test/26-uc01-sub06-event-registration-e2e
* [new branch] test/26-uc01-sub06-event-registration-e2e
  -> test/26-uc01-sub06-event-registration-e2e
```

A branch foi publicada e está rastreando o upstream `origin/test/26-uc01-sub06-event-registration-e2e`.
