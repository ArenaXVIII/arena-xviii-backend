# 12-04 - Priorizacao e decisoes

## Matriz de prioridade

| Achado | Evidencia | Impacto | Risco | Beneficio | Esforco | Cobranca | Prioridade | Decisao |
|---|---|---|---|---|---|---|---|---|
| Segunda implementacao em memoria nao usada | `events.repository.memory.ts` sem importadores | Divergencia futura potencial | Baixo | Limpeza para evitar duvidas | Baixo | Build e suite cobrem outro adaptador | Baixa | Preservar; investigar/remover em atividade futura |
| Nenhum problema arquitetural ativo comprovado | Fluxos e providers atendem separacao | Nenhum | Nenhum de refatoracao imediata | Nenhum beneficio imediato esperado | Nao aplicavel | 21 testes rapidos e 1 integracao | Nao priorizado | Cenário B |

## Alternativas consideradas

1. Refatorar a arquitetura por preferencia abstrata.
2. Remover o arquivo em memoria nao utilizado.
3. Preservar a implementacao atual e registrar hipoteses residuais.

A primeira alternativa nao possui problema comprovado. A segunda seria uma limpeza com baixo beneficio arquitetural e nao foi solicitada pela equipe. A terceira preserva contratos e evita alteracao artificial.

## Decisao

Adotar o **Cenario B - preservacao justificada**.

Nenhuma refatoracao foi realizada porque nao existe defeito ativo demonstravel nos componentes auditados. A duplicacao em memoria encontrada sera registrada como observacao de baixa prioridade, nao como problema confirmado.

## Validacao da decisao em 2026-11-24

- Build e lint passaram.
- Suite rapida permaneceu em 21 testes aprovados.
- Suite de integracao permaneceu em 1 teste aprovado.
- Nenhum diff artificial de codigo apareceu durante o guia pos-atividade.

