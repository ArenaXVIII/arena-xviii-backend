# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC25 — Registrar Movimentação de Estoque

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator informa o material, o tipo de movimentação e a quantidade. | SUB-02, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-2 — O sistema localiza o material. | SUB-02, SUB-03, SUB-04 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que o tipo e a quantidade são válidos. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-4 — Em caso de retirada, o sistema verifica que há quantidade disponível. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-5 — O sistema registra a movimentação e atualiza a quantidade do material. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-6 — O sistema persiste a movimentação e o material. | SUB-03, SUB-04 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-7 — O sistema retorna a confirmação com a nova quantidade. | SUB-02, SUB-03, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FA01 — Material não encontrado | SUB-02, SUB-03, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA02 — Tipo inválido ou quantidade menor ou igual a zero | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA03 — Retirada maior que a quantidade disponível | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FE01 — Falha na persistência | SUB-02, SUB-03, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação não concluída, falha informada ao ator |
| RN-UC25-01 — Toda movimentação está relacionada a um material | SUB-01, SUB-03, SUB-06 | Critério "RN-UC25-01" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC25-02 — A movimentação é do tipo entrada ou retirada | SUB-01, SUB-06 | Critério "RN-UC25-02" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC25-03 — A quantidade movimentada deve ser maior que zero | SUB-01, SUB-06 | Critério "RN-UC25-03" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC25-04 — Uma retirada não pode ser maior que a quantidade disponível | SUB-01, SUB-06 | Critério "RN-UC25-04" em SUB-01 | Regra respeitada em todos os cenários |
| Pré-condição — O material existe. | SUB-01, SUB-03 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-03, SUB-04, SUB-06 | Critério de FP em SUB-06 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-01, SUB-03, SUB-06 | Critérios de rejeição em SUB-06 | Nada é persistido |
| Documentação e decisões | SUB-07 | Critérios de SUB-07 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FA03, FE01 e RN-UC25-01, RN-UC25-02, RN-UC25-03, RN-UC25-04 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-04 | Origem indireta (persistência exigida pelo FP) | Tecnologia não definida; adaptador em memória é proposta H03 |
| SUB-05 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-07 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: RN-UC25-03, RN-UC25-04.
