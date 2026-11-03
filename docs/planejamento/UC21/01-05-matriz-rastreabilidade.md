# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC21 — Registrar Treino

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator informa a equipe, a data e o horário do treino. | SUB-02, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-2 — O sistema localiza a equipe. | SUB-02, SUB-03, SUB-04 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que data e horário foram informados. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-4 — O sistema registra o treino vinculado à equipe. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-5 — O sistema persiste o treino. | SUB-03, SUB-04 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-6 — O sistema retorna a confirmação. | SUB-02, SUB-03, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FA01 — Equipe não encontrada | SUB-02, SUB-03, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA02 — Data ou horário não informados | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FE01 — Falha na persistência | SUB-02, SUB-03, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação não concluída, falha informada ao ator |
| RN-UC21-01 — Todo treino pertence a uma equipe | SUB-01, SUB-03, SUB-06 | Critério "RN-UC21-01" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC21-02 — O treino deve possuir data e horário | SUB-01, SUB-06 | Critério "RN-UC21-02" em SUB-01 | Regra respeitada em todos os cenários |
| Pré-condição — A equipe existe. | SUB-01, SUB-03 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-03, SUB-04, SUB-06 | Critério de FP em SUB-06 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-01, SUB-03, SUB-06 | Critérios de rejeição em SUB-06 | Nada é persistido |
| Documentação e decisões | SUB-07 | Critérios de SUB-07 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FE01 e RN-UC21-01, RN-UC21-02 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-04 | Origem indireta (persistência exigida pelo FP) | Tecnologia não definida; adaptador em memória é proposta H03 |
| SUB-05 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-07 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: RN-UC21-01, RN-UC21-02.
