# 02-06 - Definition of Ready (DoR)

## 1. Critérios formais da DoR

Os 7 critérios obrigatórios para promoção de uma Sub-Issue para `Ready` são:

- **DoR-01** — Objetivo claramente definido.
- **DoR-02** — Escopo delimitado.
- **DoR-03** — Critérios de aceite verificáveis.
- **DoR-04** — Dependências identificadas.
- **DoR-05** — Informações disponíveis.
- **DoR-06** — Responsável definido.
- **DoR-07** — Revisão concluída.

## 2. Aplicação ao UC03

| Identificador | DoR-01 | DoR-02 | DoR-03 | DoR-04 | DoR-05 | DoR-06 | DoR-07 | Resultado consolidado | Pendências específicas | Status final recomendado |
|---|---|---|---|---|---|---|---|---|---|---|
| SUB-01 | Atende | Atende | Atende | Atende | Atende | Atende | Não atende | Não atende | Registrar decisões `D01` e `D02`; revisão humana ainda pendente | `Backlog` |
| SUB-02 | Atende | Atende | Atende | Atende | Atende | Atende | Não atende | Não atende | Revisão humana e validação do contrato com a entidade | `Backlog` |
| SUB-03 | Atende | Atende | Atende | Atende | Atende | Atende | Não atende | Não atende | Validação humana do fluxo principal e do tratamento de erro | `Backlog` |
| SUB-04 | Atende | Atende | Atende | Atende | Atende | Atende | Não atende | Não atende | Formalizar decisão H03 e revisar a proposta do repositório em memória | `Backlog` |
| SUB-05 | Atende | Atende | Atende | Atende | Atende | Atende | Não atende | Não atende | Confirmar H01/H02 e confirmar o contrato HTTP e os códigos de resposta | `Backlog` |
| SUB-06 | Atende | Atende | Atende | Atende | Atende | Atende | Não atende | Não atende | Revisão humana para cobertura e2e e confirmação das evidências | `Backlog` |
| SUB-07 | Atende | Atende | Atende | Atende | Atende | Atende | Não atende | Não atende | Revisão humana da documentação e confirmação das evidências finais | `Backlog` |

## 3. Interpretação da avaliação

- O planejamento do UC03 está bem estruturado em termos de objetivo, escopo e critérios de aceite.
- O principal bloqueio para promoção a `Ready` não é o escopo técnico, mas a **formalização da revisão humana** e a confirmação de decisões complementares (D01, D02, H01, H02, H03).
- Conformidade à regra do prompt: **uma Sub-Issue somente pode ir para `Ready` quando todos os 7 critérios forem atendidos cumulativamente**.

## 4. Regras aplicadas

1. `DoR-07` permanece como **Não atende** até que a revisão formal do aluno tenha ocorrido no GitHub e o comentário de aprovação esteja registrado.
2. Dependências não implementadas não impedem a movimentação de uma Issue para `Backlog`, desde que a atividade tenha informações de implementação e contratos definidos.
3. A recomendação geral do projeto é manter as Sub-Issues do UC03 em `Backlog` enquanto a revisão humana não estiver concluída.

## 5. Resumo executivo

- **Total de issues avaliadas:** 7.
- **Issues com DoR satisfeita:** 0.
- **Issues recomendadas para `Ready`:** 0, enquanto a revisão humana e a formalização de decisões não ocorrerem.
- **Issues recomendadas para `Backlog`:** 7.

> Em outras palavras, o produto de revisão atual apresenta uma base técnica sólida e uma rastreabilidade clara, mas ainda não atende à condição cumulativa de prontidão para desenvolvimento em GitHub.
