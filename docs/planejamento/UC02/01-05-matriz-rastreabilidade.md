# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC02 — Definir Planejamento do Evento

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator informa o identificador do evento e as informações de planejamento. | SUB-03, SUB-05 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-2 — O sistema localiza o evento. | SUB-03, SUB-04 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que o evento está em Planejamento ou Remarcado. | SUB-02 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-4 — O sistema verifica que todas as informações principais foram informadas e são válidas. | SUB-02 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-5 — O sistema registra as informações e altera o estado para Planejado. | SUB-02 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-6 — O sistema persiste a alteração. | SUB-04 | Critérios de SUB-04 | Passo executado conforme a especificação |
| FP-7 — O sistema retorna a confirmação. | SUB-03, SUB-04, SUB-05 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FA01 — Evento não encontrado | SUB-03, SUB-04, SUB-05, SUB-06 | Rejeição/falha específica em SUB-03; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA02 — Evento em estado diferente de Planejamento ou Remarcado | SUB-02, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA03 — Informações principais ausentes ou inválidas | SUB-02, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada informando os campos ausentes ou inválidos, nada é persistido |
| FA04 — Evento Remarcado sem nova data diferente da anterior | SUB-02, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FE01 — Falha na persistência | SUB-03, SUB-04, SUB-05, SUB-06 | Rejeição/falha específica em SUB-03; e2e em SUB-06 | Operação não concluída, falha informada ao ator |
| RN-UC02-01 — Somente eventos nos estados Planejamento ou Remarcado podem ter o planejamento definido | SUB-02, SUB-06 | Critério "RN-UC02-01" em SUB-02 | Regra respeitada em todos os cenários |
| RN-UC02-02 — O evento só passa a Planejado quando data, local, orçamento, responsáveis e atrações ou atividades estiverem definidos | SUB-02, SUB-06 | Critério "RN-UC02-02" em SUB-02 | Regra respeitada em todos os cenários |
| RN-UC02-03 — Para um evento Remarcado, a transição para Planejado exige a definição de uma nova data | SUB-02, SUB-06 | Critério "RN-UC02-03" em SUB-02 | Regra respeitada em todos os cenários |
| RN-UC02-04 — O orçamento deve ser um Valor Monetário válido | SUB-02, SUB-06 | Critério "RN-UC02-04" em SUB-02 | Regra respeitada em todos os cenários |
| RN-UC02-05 — A alteração só é persistida quando todas as condições forem atendidas | SUB-04, SUB-06 | Critério "RN-UC02-05" em SUB-04 | Regra respeitada em todos os cenários |
| Pré-condição — O evento existe e está no estado Planejamento ou Remarcado. | SUB-02, SUB-04 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-04, SUB-06 | Critério de FP em SUB-06 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-02, SUB-04, SUB-06 | Critérios de rejeição em SUB-06 | Nada é persistido |
| Documentação e decisões | SUB-07 | Critérios de SUB-07 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FA03, FA04, FE01 e RN-UC02-01, RN-UC02-02, RN-UC02-03, RN-UC02-04, RN-UC02-05 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-05 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-07 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: FA04.
