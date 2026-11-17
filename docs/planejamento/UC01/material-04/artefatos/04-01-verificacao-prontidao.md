# 04-01 — Verificação de prontidão (DoR)

**Projeto:** ARENA XVIII  
**Caso de uso:** UC01 — Cadastrar Evento  
**Sub-Issue:** [#26 — UC01/SUB-06: testes e2e do cadastro de evento](https://github.com/ArenaXVIII/arena-xviii-backend/issues/26)  
**Responsável indicado no planejamento:** @LunaRibeiro  
**Diretório dos artefatos:** `docs/planejamento/UC01/material-04/artefatos/`

## Matriz DoR

| Código | Condição | Resultado | Evidência / pendência |
|---|---|---|---|
| DoR-01 | Objetivo claramente definido | Atende | Verificar o cadastro de evento atravessando as camadas. |
| DoR-02 | Escopo delimitado | Atende | SUB-06 inclui cenários e2e dos fluxos; exclui carga e segurança. |
| DoR-03 | Critérios verificáveis | Pendente de ajuste | Há critérios para FP, FA01 e FE01, mas H01 (rota) e os contratos HTTP ainda dependem de validação; o status 201 usado no primeiro teste é uma hipótese de implementação. |
| DoR-04 | Dependências identificadas e desbloqueadas | Não atende | SUB-06 depende de SUB-04 (#24) e SUB-05 (#25). O `main` inspecionado ainda não registra a API de cadastro e não contém o fluxo de criação completo. |
| DoR-05 | Informações técnicas disponíveis | Pendente de ajuste | Stack NestJS/TypeScript/Vitest/Supertest e endpoint proposto `POST /events` estão documentados; a especificação continua em Rascunho e faltam contratos HTTP validados. |
| DoR-06 | Responsável definido | Atende | O planejamento indica @LunaRibeiro. |
| DoR-07 | Revisão do planejamento concluída | Não atende | O planejamento UC01 mantém todos os itens em Backlog até a validação da especificação e revisão humana. Os artefatos do Material 03 não foram localizados. |

## Decisão

**A SUB-06 não atende à Definition of Ready.** O início normal do trabalho deveria aguardar a conclusão das dependências e a validação da equipe. A pedido explícito do usuário, foi aberto um fluxo local de TDD RED apesar desse bloqueio. Isso não altera a avaliação DoR, não autoriza a implementação GREEN/REFACTOR e não significa que a unidade SUB-06 esteja concluída.

## Pendências para desbloqueio

- Concluir e confirmar SUB-04 (#24) e SUB-05 (#25).
- Validar a especificação do UC01, incluindo H01/H02 e o contrato HTTP.
- Confirmar os artefatos do Material 03 e registrar a revisão humana no GitHub.
- Definir o revisor da UC01/SUB-06; o material encontrado designa revisores apenas para o UC03.
