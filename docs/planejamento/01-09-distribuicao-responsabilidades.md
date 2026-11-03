# Artefato 9 — Distribuição de Responsabilidades

**Responsável informado:** LunaRibeiro (`@LunaRibeiro`)

## 1. Matriz de alocação

| Issue | Atividade técnica | Responsável | Dependências de execução | Estado inicial |
|---|---|---|---|---|
| Epic | [UC03] Divulgar Evento | @LunaRibeiro | Conclusão de SUB-01 a SUB-07 | `Ready` |
| SUB-01 | Modelar a entidade Evento e a transição de divulgação | @LunaRibeiro | — | `Ready` |
| SUB-02 | Definir os contratos de aplicação | @LunaRibeiro | SUB-01 | `Backlog` |
| SUB-03 | Implementar o serviço de aplicação de divulgação | @LunaRibeiro | SUB-01, SUB-02 | `Backlog` |
| SUB-04 | Implementar o adaptador de persistência de eventos | @LunaRibeiro | SUB-01, SUB-02 | `Backlog` |
| SUB-05 | Expor a divulgação via API HTTP e registrar o módulo | @LunaRibeiro | SUB-03, SUB-04 | `Backlog` |
| SUB-06 | Testes de integração ponta a ponta (e2e) | @LunaRibeiro | SUB-04, SUB-05 | `Backlog` |
| SUB-07 | Documentar tecnicamente o primeiro slice | @LunaRibeiro | SUB-05, SUB-06 | `Backlog` |

## 2. Recomendações de comunicação e alinhamento

1. **Revisão por pares:** como todas as Sub-Issues estão atribuídas a uma única responsável, recomenda-se que outro membro da equipe (Adriel Ostrovski ou Bolivar Torres Neto, conforme o README) revise cada PR antes da passagem de `In Review` para `Done`.
2. **Decisões pendentes:** registrar as decisões H01–H05 e D01–D04 como comentários no épico, com a concordância da equipe, antes de mover as Sub-Issues afetadas para `Ready`.
3. **Sequenciamento:** como há uma única responsável, o paralelismo SUB-03 ∥ SUB-04 pode ser explorado com a alternância entre as duas unidades ou com a redistribuição de uma delas, caso a equipe decida ampliar a alocação.
4. **Atualização do board:** mover o cartão no mesmo momento em que o trabalho muda de fase (início, abertura de PR, integração).
5. **Referência cruzada:** mencionar a Issue nos PRs (`Closes #número`) para manter a rastreabilidade automática.
