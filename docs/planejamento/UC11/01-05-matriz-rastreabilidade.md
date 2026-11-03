# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC11 — Realizar Fechamento Financeiro do Evento

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator solicita o fechamento financeiro informando o identificador do evento. | SUB-03, SUB-05 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-2 — O sistema localiza o evento. | SUB-03, SUB-04 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que o evento está Realizado. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-4 — O sistema verifica que não há pagamentos pendentes vinculados ao evento. | SUB-02, SUB-04 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-5 — O sistema apura o resultado financeiro a partir de pagamentos, despesas e patrocínios. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-6 — O sistema registra o resultado e altera o estado para Encerrado. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-7 — O sistema persiste a alteração. | SUB-04 | Critérios de SUB-04 | Passo executado conforme a especificação |
| FP-8 — O sistema retorna o resultado financeiro apurado. | SUB-03, SUB-04, SUB-05 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FA01 — Evento não encontrado | SUB-03, SUB-04, SUB-05, SUB-06 | Rejeição/falha específica em SUB-03; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA02 — Evento em estado diferente de Realizado | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA03 — Existem pagamentos pendentes | SUB-02, SUB-04, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada informando as pendências, nada é persistido |
| FE01 — Falha na persistência | SUB-03, SUB-04, SUB-05, SUB-06 | Rejeição/falha específica em SUB-03; e2e em SUB-06 | Operação não concluída, falha informada ao ator |
| RN04 — O fechamento financeiro deve considerar vendas, receitas, despesas, pagamentos e patrocínios ou outras entradas relacionadas ao evento | SUB-02, SUB-06 | Critério "RN04" em SUB-02 | Regra respeitada em todos os cenários |
| RN05 — Despesas não registradas, pagamentos pendentes ou informações financeiras incompletas podem impedir a conclusão confiável do fechamento | SUB-02, SUB-06 | Critério "RN05" em SUB-02 | Regra respeitada em todos os cenários |
| RN-UC11-01 — Somente eventos no estado Realizado podem ser encerrados | SUB-01, SUB-06 | Critério "RN-UC11-01" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC11-02 — O fechamento é bloqueado enquanto houver pagamentos pendentes | SUB-02, SUB-04, SUB-06 | Critério "RN-UC11-02" em SUB-02 | Regra respeitada em todos os cenários |
| RN-UC11-03 — O resultado financeiro é a diferença entre as entradas e as despesas do evento | SUB-02, SUB-06 | Critério "RN-UC11-03" em SUB-02 | Regra respeitada em todos os cenários |
| Pré-condição — O evento existe e está no estado Realizado. | SUB-01, SUB-04 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-04, SUB-06 | Critério de FP em SUB-06 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-01, SUB-04, SUB-06 | Critérios de rejeição em SUB-06 | Nada é persistido |
| Documentação e decisões | SUB-07 | Critérios de SUB-07 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FA03, FE01 e RN04, RN05, RN-UC11-01, RN-UC11-02, RN-UC11-03 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-05 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-07 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: RN-UC11-03.
