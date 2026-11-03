# Artefato 7 — Plano de Labels

As labels usam prefixos (`categoria:valor`) para facilitar a filtragem no GitHub e a reutilização nos próximos casos de uso.

## 1. Labels de domínio / funcionalidade

| Label | Cor sugerida | Finalidade | Issues |
|---|---|---|---|
| `module:eventos` | `#1D76DB` | Identifica itens do módulo de Eventos | Epic, SUB-01 a SUB-07 |
| `uc:UC03` | `#5319E7` | Agrupa os itens do caso de uso UC03 — Divulgar Evento | Epic, SUB-01 a SUB-07 |

## 2. Labels de tipo de atividade

| Label | Cor sugerida | Finalidade | Issues |
|---|---|---|---|
| `type:epic` | `#3E4B9E` | Issue principal que agrupa as Sub-Issues de um caso de uso | Epic |
| `type:feature` | `#0E8A16` | Implementação de funcionalidade (inclui os testes unitários da unidade) | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 |
| `type:test` | `#FBCA04` | Atividade cujo entregável principal são testes automatizados (integração/e2e) | SUB-06 |
| `type:documentation` | `#0075CA` | Documentação técnica | SUB-07 |

## 3. Labels de camada / arquitetura

| Label | Cor sugerida | Finalidade | Issues |
|---|---|---|---|
| `layer:domain` | `#C2E0C6` | Entidades, enums e regras de domínio | SUB-01 |
| `layer:application` | `#BFD4F2` | Serviços de aplicação, DTOs e portas | SUB-02, SUB-03 |
| `layer:infra` | `#D4C5F9` | Adaptadores de persistência e integração | SUB-04 |
| `layer:api` | `#F9D0C4` | Controllers, módulos e mapeamento HTTP | SUB-05, SUB-06 |

## 4. Labels de prioridade

| Label | Cor sugerida | Finalidade | Issues |
|---|---|---|---|
| `priority:high` | `#B60205` | Caminho crítico do slice | Epic, SUB-01, SUB-02, SUB-03, SUB-05 |
| `priority:medium` | `#D93F0B` | Necessária para a conclusão, com alguma flexibilidade | SUB-04, SUB-06 |
| `priority:low` | `#E4E669` | Pode ser concluída por último | SUB-07 |

## 5. Aplicação consolidada

| Issue | Labels |
|---|---|
| Epic `[UC03] Divulgar Evento` | `type:epic`, `module:eventos`, `uc:UC03`, `priority:high` |
| SUB-01 | `module:eventos`, `uc:UC03`, `type:feature`, `layer:domain`, `priority:high` |
| SUB-02 | `module:eventos`, `uc:UC03`, `type:feature`, `layer:application`, `priority:high` |
| SUB-03 | `module:eventos`, `uc:UC03`, `type:feature`, `layer:application`, `priority:high` |
| SUB-04 | `module:eventos`, `uc:UC03`, `type:feature`, `layer:infra`, `priority:medium` |
| SUB-05 | `module:eventos`, `uc:UC03`, `type:feature`, `layer:api`, `priority:high` |
| SUB-06 | `module:eventos`, `uc:UC03`, `type:test`, `layer:api`, `priority:medium` |
| SUB-07 | `module:eventos`, `uc:UC03`, `type:documentation`, `priority:low` |
