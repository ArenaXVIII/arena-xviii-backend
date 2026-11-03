# Artefato 7 — Plano de Labels

**Caso de uso:** UC11 — Realizar Fechamento Financeiro do Evento

Mesmo padrão `categoria:valor` adotado no UC03. As cores e descrições de todas as labels estão em `docs/planejamento/README.md`.

| Label | Issues |
|---|---|
| `layer:api` | SUB-05, SUB-06 |
| `layer:application` | SUB-03, SUB-04 |
| `layer:domain` | SUB-01, SUB-02 |
| `module:eventos` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |
| `priority:high` | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 |
| `priority:low` | SUB-07 |
| `priority:medium` | Epic, SUB-06 |
| `spec:rascunho` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |
| `type:documentation` | SUB-07 |
| `type:epic` | Epic |
| `type:feature` | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 |
| `type:test` | SUB-06 |
| `uc:UC11` | Epic, SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, SUB-07 |

## Aplicação consolidada

| Issue | Labels |
|---|---|
| Epic | `type:epic`, `module:eventos`, `uc:UC11`, `priority:medium`, `spec:rascunho` |
| SUB-01 | `module:eventos`, `uc:UC11`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho` |
| SUB-02 | `module:eventos`, `uc:UC11`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho` |
| SUB-03 | `module:eventos`, `uc:UC11`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-04 | `module:eventos`, `uc:UC11`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho` |
| SUB-05 | `module:eventos`, `uc:UC11`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho` |
| SUB-06 | `module:eventos`, `uc:UC11`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho` |
| SUB-07 | `module:eventos`, `uc:UC11`, `type:documentation`, `priority:low`, `spec:rascunho` |
