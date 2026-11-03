# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC02] Definir Planejamento do Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC02`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Definir as informações principais do evento (data, local, orçamento, responsáveis e atrações ou atividades), levando-o ao estado Planejado. Também é utilizado para definir a nova data de um evento remarcado.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC02
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC02/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC02-01 | Somente eventos nos estados Planejamento ou Remarcado podem ter o planejamento definido |
| RN-UC02-02 | O evento só passa a Planejado quando data, local, orçamento, responsáveis e atrações ou atividades estiverem definidos |
| RN-UC02-03 | Para um evento Remarcado, a transição para Planejado exige a definição de uma nova data |
| RN-UC02-04 | O orçamento deve ser um Valor Monetário válido |
| RN-UC02-05 | A alteração só é persistida quando todas as condições forem atendidas |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FA04, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC02][SUB-01] Modelar o Objeto de Valor Valor Monetário
- [ ] [UC02][SUB-02] Implementar no domínio a operação de definição de planejamento de evento
- [ ] [UC02][SUB-03] Definir os contratos de aplicação da definição de planejamento do evento
- [ ] [UC02][SUB-04] Implementar o serviço de aplicação da definição de planejamento do evento
- [ ] [UC02][SUB-05] Expor a definição de planejamento via API HTTP
- [ ] [UC02][SUB-06] Implementar os testes de integração ponta a ponta (e2e) da definição de planejamento do evento
- [ ] [UC02][SUB-07] Documentar tecnicamente a definição de planejamento

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O evento possui as informações principais definidas, está no estado Planejado e a alteração foi persistida.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento em estado diferente de Planejamento ou Remarcado: Operação rejeitada, nada é persistido
- [ ] FA03 — Informações principais ausentes ou inválidas: Operação rejeitada informando os campos ausentes ou inválidos, nada é persistido
- [ ] FA04 — Evento Remarcado sem nova data diferente da anterior: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC01 — o evento precisa existir em `planning`.
- Infraestrutura do módulo de Eventos planejada no UC03 (#13 a #17).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC02/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
