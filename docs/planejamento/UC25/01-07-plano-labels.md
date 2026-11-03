# Artefato 7 — Plano de Labels

**Caso de uso:** UC25 — Registrar Movimentação de Estoque

Mesmo padrão `categoria:valor` adotado no UC03. As cores e descrições de todas as labels estão em `docs/planejamento/README.md`.

| Label | Issues |
|---|---|
| `layer:api` | SUB-05, SUB-06 |
| `layer:application` | SUB-02, SUB-03 |
| `layer:domain` | SUB-01 |
| `layer:infra` | SUB-04 |
| `module:estoque` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |
| `priority:high` | SUB-01, SUB-02, SUB-03, SUB-05 |
| `priority:low` | SUB-07 |
| `priority:medium` | Epic, SUB-04, SUB-06 |
| `spec:rascunho` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |
| `type:documentation` | SUB-07 |
| `type:epic` | Epic |
| `type:feature` | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 |
| `type:test` | SUB-06 |
| `uc:UC25` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |

## Aplicação consolidada

| Issue | Labels |
|---|---|
| Epic | `type:epic`, `module:estoque`, `uc:UC25`, `priority:medium`, `spec:rascunho` |
| SUB-01 | `module:estoque`, `uc:UC25`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho` |
| SUB-02 | `module:estoque`, `uc:UC25`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-03 | `module:estoque`, `uc:UC25`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-04 | `module:estoque`, `uc:UC25`, `type:feature`, `layer:infra`, `priority:medium`, `spec:rascunho` |
| SUB-05 | `module:estoque`, `uc:UC25`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho` |
| SUB-06 | `module:estoque`, `uc:UC25`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho` |
| SUB-07 | `module:estoque`, `uc:UC25`, `type:documentation`, `priority:low`, `spec:rascunho` |
