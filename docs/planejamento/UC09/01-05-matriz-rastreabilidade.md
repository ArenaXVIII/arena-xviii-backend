# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC09 — Cancelar Evento

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator solicita o cancelamento informando o identificador do evento e o motivo. | SUB-02, SUB-04 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-2 — O sistema localiza o evento. | SUB-02, SUB-03 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que o evento está Em Organização. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-4 — O sistema verifica que o motivo foi informado. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-5 — O sistema altera o estado para Cancelado e registra o motivo. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-6 — O sistema persiste a alteração. | SUB-03 | Critérios de SUB-03 | Passo executado conforme a especificação |
| FP-7 — O sistema retorna a confirmação. | SUB-02, SUB-03, SUB-04 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FA01 — Evento não encontrado | SUB-02, SUB-03, SUB-04, SUB-05 | Rejeição/falha específica em SUB-02; e2e em SUB-05 | Operação rejeitada, nada é persistido |
| FA02 — Evento em estado diferente de Em Organização | SUB-01, SUB-04, SUB-05 | Rejeição/falha específica em SUB-01; e2e em SUB-05 | Operação rejeitada, nada é persistido |
| FA03 — Motivo não informado | SUB-01, SUB-04, SUB-05 | Rejeição/falha específica em SUB-01; e2e em SUB-05 | Operação rejeitada, nada é persistido |
| FE01 — Falha na persistência | SUB-02, SUB-03, SUB-04, SUB-05 | Rejeição/falha específica em SUB-02; e2e em SUB-05 | Operação não concluída, falha informada ao ator |
| RN06 — Um evento pode ser cancelado quando falta de orçamento, problema grave de local, vendas insuficientes ou cancelamento de fornecedor/atração impedirem sua continuidade | SUB-01, SUB-05 | Critério "RN06" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC09-01 — Somente eventos no estado Em Organização podem ser cancelados | SUB-01, SUB-05 | Critério "RN-UC09-01" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC09-02 — O cancelamento exige um motivo | SUB-01, SUB-05 | Critério "RN-UC09-02" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC09-03 — Cancelado é um estado final: o evento não pode mais mudar de estado | SUB-01, SUB-05 | Critério "RN-UC09-03" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC09-04 — A alteração só é persistida quando todas as condições forem atendidas | SUB-03, SUB-05 | Critério "RN-UC09-04" em SUB-03 | Regra respeitada em todos os cenários |
| Pré-condição — O evento existe e está no estado Em Organização. | SUB-01, SUB-03 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-03, SUB-05 | Critério de FP em SUB-05 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-01, SUB-03, SUB-05 | Critérios de rejeição em SUB-05 | Nada é persistido |
| Documentação e decisões | SUB-06 | Critérios de SUB-06 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FA03, FE01 e RN06, RN-UC09-01, RN-UC09-02, RN-UC09-03, RN-UC09-04 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-04 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-06 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: RN06.
