# Artefato 7 — Plano de Labels

**Caso de uso:** UC14 — Controlar Mensalidades

Mesmo padrão `categoria:valor` adotado no UC03. As cores e descrições de todas as labels estão em `docs/planejamento/README.md`.

| Label | Issues |
|---|---|
| `layer:api` | SUB-05, SUB-06 |
| `layer:application` | SUB-02, SUB-03 |
| `layer:domain` | SUB-01 |
| `layer:infra` | SUB-04 |
| `module:financeiro` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |
| `priority:high` | SUB-01, SUB-02, SUB-03, SUB-05 |
| `priority:low` | Epic, SUB-07 |
| `priority:medium` | SUB-04, SUB-06 |
| `spec:requer-modelagem` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |
| `type:documentation` | SUB-07 |
| `type:epic` | Epic |
| `type:feature` | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 |
| `type:test` | SUB-06 |
| `uc:UC14` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |

## Aplicação consolidada

| Issue | Labels |
|---|---|
| Epic | `type:epic`, `module:financeiro`, `uc:UC14`, `priority:low`, `spec:requer-modelagem` |
| SUB-01 | `module:financeiro`, `uc:UC14`, `type:feature`, `layer:domain`, `priority:high`, `spec:requer-modelagem` |
| SUB-02 | `module:financeiro`, `uc:UC14`, `type:feature`, `layer:application`, `priority:high`, `spec:requer-modelagem` |
| SUB-03 | `module:financeiro`, `uc:UC14`, `type:feature`, `layer:application`, `priority:high`, `spec:requer-modelagem` |
| SUB-04 | `module:financeiro`, `uc:UC14`, `type:feature`, `layer:infra`, `priority:medium`, `spec:requer-modelagem` |
| SUB-05 | `module:financeiro`, `uc:UC14`, `type:feature`, `layer:api`, `priority:high`, `spec:requer-modelagem` |
| SUB-06 | `module:financeiro`, `uc:UC14`, `type:test`, `layer:api`, `priority:medium`, `spec:requer-modelagem` |
| SUB-07 | `module:financeiro`, `uc:UC14`, `type:documentation`, `priority:low`, `spec:requer-modelagem` |
