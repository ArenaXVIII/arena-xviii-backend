# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC12 — Registrar Pagamento

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator informa o identificador do evento, o valor e a situação do pagamento. | SUB-02, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-2 — O sistema localiza o evento. | SUB-02, SUB-03, SUB-04 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que o evento aceita registros financeiros. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-4 — O sistema verifica que o valor é válido. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-5 — O sistema registra o pagamento vinculado ao evento. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-6 — O sistema persiste o pagamento. | SUB-03, SUB-04 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-7 — O sistema retorna a confirmação. | SUB-02, SUB-03, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FA01 — Evento não encontrado | SUB-02, SUB-03, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA02 — Evento Encerrado ou Cancelado | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA03 — Valor ausente ou inválido | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FE01 — Falha na persistência | SUB-02, SUB-03, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação não concluída, falha informada ao ator |
| RN-UC12-01 — Todo pagamento deve possuir um Valor Monetário válido | SUB-01, SUB-06 | Critério "RN-UC12-01" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC12-02 — Todo pagamento pertence a um único evento | SUB-01, SUB-03, SUB-06 | Critério "RN-UC12-02" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC12-03 — Um pagamento pode estar pendente ou realizado | SUB-01, SUB-06 | Critério "RN-UC12-03" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC12-04 — Pagamentos não podem ser registrados para eventos Encerrados ou Cancelados | SUB-01, SUB-06 | Critério "RN-UC12-04" em SUB-01 | Regra respeitada em todos os cenários |
| Pré-condição — O evento existe. | SUB-01, SUB-03 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-03, SUB-04, SUB-06 | Critério de FP em SUB-06 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-01, SUB-03, SUB-06 | Critérios de rejeição em SUB-06 | Nada é persistido |
| Documentação e decisões | SUB-07 | Critérios de SUB-07 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FA03, FE01 e RN-UC12-01, RN-UC12-02, RN-UC12-03, RN-UC12-04 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-04 | Origem indireta (persistência exigida pelo FP) | Tecnologia não definida; adaptador em memória é proposta H03 |
| SUB-05 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-07 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: RN-UC12-03, RN-UC12-04, FA02.
