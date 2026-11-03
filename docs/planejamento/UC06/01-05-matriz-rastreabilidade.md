# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC06 — Confirmar Inscrição em Evento

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issues | Critério de aceite vinculado | Comportamento a verificar |
|---|---|---|---|
| FP-1 — O ator solicita a confirmação informando o identificador da inscrição. | SUB-02, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-2 — O sistema localiza a inscrição. | SUB-02, SUB-04 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FP-3 — O sistema verifica que a inscrição está pendente. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-4 — O sistema verifica que os dados do participante estão completos. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-5 — O sistema verifica que o pagamento obrigatório foi realizado (UC12). | SUB-01, SUB-03, SUB-04 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-6 — O sistema altera a inscrição para confirmada. | SUB-01 | Critérios de SUB-01 | Passo executado conforme a especificação |
| FP-7 — O sistema persiste a alteração. | SUB-04 | Critérios de SUB-04 | Passo executado conforme a especificação |
| FP-8 — O sistema retorna a confirmação. | SUB-02, SUB-04, SUB-05 | Critérios de SUB-02 | Passo executado conforme a especificação |
| FA01 — Inscrição não encontrada | SUB-02, SUB-04, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA02 — Inscrição já confirmada | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA03 — Dados do participante incompletos | SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-01; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FA04 — Pagamento obrigatório não realizado | SUB-03, SUB-04, SUB-01, SUB-05, SUB-06 | Rejeição/falha específica em SUB-03; e2e em SUB-06 | Operação rejeitada, nada é persistido |
| FE01 — Falha na persistência | SUB-02, SUB-04, SUB-05, SUB-06 | Rejeição/falha específica em SUB-02; e2e em SUB-06 | Operação não concluída, falha informada ao ator |
| RN02 — Uma venda ou inscrição só pode ser confirmada quando os dados necessários estiverem corretos e o pagamento obrigatório tiver sido realizado | SUB-01, SUB-03, SUB-06 | Critério "RN02" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC06-01 — Uma inscrição já confirmada não pode ser confirmada novamente | SUB-01, SUB-06 | Critério "RN-UC06-01" em SUB-01 | Regra respeitada em todos os cenários |
| RN-UC06-02 — A alteração só é persistida quando todas as condições forem atendidas | SUB-04, SUB-06 | Critério "RN-UC06-02" em SUB-04 | Regra respeitada em todos os cenários |
| Pré-condição — A inscrição existe e está pendente. | SUB-01, SUB-04 | Fluxos de rejeição de existência/estado | Pré-condição verificada |
| Pós-condição de sucesso | SUB-04, SUB-06 | Critério de FP em SUB-06 | Estado persistido conforme esperado |
| Pós-condição de falha | SUB-01, SUB-04, SUB-06 | Critérios de rejeição em SUB-06 | Nada é persistido |
| Documentação e decisões | SUB-07 | Critérios de SUB-07 | — |

## 2. Análise de cobertura

### 2.1 Regras e fluxos sem cobertura
Nenhum. Todos os passos do FP, FA01, FA02, FA03, FA04, FE01 e RN02, RN-UC06-01, RN-UC06-02 possuem Sub-Issue e critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-05 | Origem indireta (interação do ator) | Rota e códigos HTTP são propostas H01 e H02 |
| SUB-07 | Registro de decisões | A especificação está em Rascunho, com dúvidas em aberto |

### 2.3 Regras/fluxos que são proposta técnica

As regras abaixo estão cobertas, mas constam na especificação como proposta técnica ou hipótese e devem ser confirmadas antes da implementação: RN-UC06-01.
