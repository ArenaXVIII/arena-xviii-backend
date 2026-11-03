# Artefato 7 — Plano de Labels

**Caso de uso:** UC24 — Cadastrar Material

Mesmo padrão `categoria:valor` adotado no UC03. As cores e descrições de todas as labels estão em `docs/planejamento/README.md`.

| Label | Issues |
|---|---|
| `layer:api` | SUB-06, SUB-07 |
| `layer:application` | SUB-03, SUB-04 |
| `layer:domain` | SUB-01, SUB-02 |
| `layer:infra` | SUB-05 |
| `module:estoque` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07, SUB-08 |
| `priority:high` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-06 |
| `priority:low` | SUB-08 |
| `priority:medium` | SUB-05, SUB-07 |
| `spec:rascunho` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07, SUB-08 |
| `type:documentation` | SUB-08 |
| `type:epic` | Epic |
| `type:feature` | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06 |
| `type:test` | SUB-07 |
| `uc:UC24` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07, SUB-08 |

## Aplicação consolidada

| Issue | Labels |
|---|---|
| Epic | `type:epic`, `module:estoque`, `uc:UC24`, `priority:high`, `spec:rascunho` |
| SUB-01 | `module:estoque`, `uc:UC24`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho` |
| SUB-02 | `module:estoque`, `uc:UC24`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho` |
| SUB-03 | `module:estoque`, `uc:UC24`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-04 | `module:estoque`, `uc:UC24`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-05 | `module:estoque`, `uc:UC24`, `type:feature`, `layer:infra`, `priority:medium`, `spec:rascunho` |
| SUB-06 | `module:estoque`, `uc:UC24`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho` |
| SUB-07 | `module:estoque`, `uc:UC24`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho` |
| SUB-08 | `module:estoque`, `uc:UC24`, `type:documentation`, `priority:low`, `spec:rascunho` |
