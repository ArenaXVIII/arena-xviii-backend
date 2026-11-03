# Artefato 7 — Plano de Labels

**Caso de uso:** UC09 — Cancelar Evento

Mesmo padrão `categoria:valor` adotado no UC03. As cores e descrições de todas as labels estão em `docs/planejamento/README.md`.

| Label | Issues |
|---|---|
| `layer:api` | SUB-04, SUB-05 |
| `layer:application` | SUB-02, SUB-03 |
| `layer:domain` | SUB-01 |
| `module:eventos` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06 |
| `priority:high` | SUB-01, SUB-02, SUB-03, SUB-04 |
| `priority:low` | SUB-06 |
| `priority:medium` | Epic, SUB-05 |
| `spec:rascunho` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06 |
| `type:documentation` | SUB-06 |
| `type:epic` | Epic |
| `type:feature` | SUB-01, SUB-02, SUB-03, SUB-04 |
| `type:test` | SUB-05 |
| `uc:UC09` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06 |

## Aplicação consolidada

| Issue | Labels |
|---|---|
| Epic | `type:epic`, `module:eventos`, `uc:UC09`, `priority:medium`, `spec:rascunho` |
| SUB-01 | `module:eventos`, `uc:UC09`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho` |
| SUB-02 | `module:eventos`, `uc:UC09`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-03 | `module:eventos`, `uc:UC09`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-04 | `module:eventos`, `uc:UC09`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho` |
| SUB-05 | `module:eventos`, `uc:UC09`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho` |
| SUB-06 | `module:eventos`, `uc:UC09`, `type:documentation`, `priority:low`, `spec:rascunho` |
