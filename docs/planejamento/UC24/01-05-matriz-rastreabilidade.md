# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC24 — Cadastrar Material

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator informa o nome e a quantidade inicial do material. | SUB-03, SUB-06 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-2 — O sistema verifica que o nome foi informado. | SUB-02 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que a quantidade é válida. | SUB-01, SUB-02 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-4 — O sistema cria o material. | SUB-02 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-5 — O sistema persiste o material. | SUB-04, SUB-05 | Critérios de SUB-04 | Passo executado conforme a especificação |
| FP-6 — O sistema retorna a confirmação. | SUB-03, SUB-04, SUB-06 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FA01 — Nome não informado | SUB-02, SUB-06, SUB-07 | Rejeição/falha específica em SUB-02; e2e em SUB-07 | Operação rejeitada, nada é persistido |
| FA02 — Quantidade ausente ou negativa | SUB-01, SUB-02, SUB-06, SUB-07 | Rejeição/falha específica em SUB-01; e2e em SUB-07 | Operação rejeitada, nada é persistido |
| FE01 — Falha na persistência | SUB-03, SUB-04, SUB-06, SUB-07 | Rejeição/falha específica em SUB-03; e2e em SUB-07 | Operação não concluída, falha informada ao ator |
| RN-UC24-01 — O material deve possuir um nome não vazio | SUB-02, SUB-07 | Critério "RN-UC24-01" em SUB-02 | Regra respeitada em todos os cenários |
| RN-UC24-02 — A quantidade do material não pode ser negativa | SUB-01, SUB-02, SUB-07 | Critério "RN-UC24-02" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC24-03 — O material é controlado por quantidade | SUB-02, SUB-07 | Critério "RN-UC24-03" em SUB-02 | Regra respeitada em todos os cenários |
| Pré-condição — Nenhuma. | SUB-02, SUB-04 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-04, SUB-05, SUB-07 | Critério de FP em SUB-07 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-02, SUB-04, SUB-07 | Critérios de rejeição em SUB-07 | Nada é persistido |
| Documentação e decisões | SUB-08 | Critérios de SUB-08 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FE01 e RN-UC24-01, RN-UC24-02, RN-UC24-03 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-05 | Origem indireta (persistência exigida pelo FP) | Tecnologia não definida; adaptador em memória é proposta H03 |
| SUB-06 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-08 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: RN-UC24-01, RN-UC24-02, RN-UC24-03.
