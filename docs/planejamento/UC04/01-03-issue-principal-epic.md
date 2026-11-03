# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC04] Iniciar Vendas/Inscrições`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC04`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Iniciar as vendas ou inscrições de um evento divulgado, levando-o ao estado Em Organização.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC04
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC04/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC04-01 | Somente eventos no estado Divulgado podem iniciar vendas ou inscrições |
| RN-UC04-02 | A alteração só é persistida quando todas as condições forem atendidas |
| FP | Fluxo principal, passos 1 a 6 |
| FA01, FA02, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC04][SUB-01] Implementar no domínio a operação de início de vendas/inscrições
- [ ] [UC04][SUB-02] Definir os contratos de aplicação do início de vendas/inscrições
- [ ] [UC04][SUB-03] Implementar o serviço de aplicação do início de vendas/inscrições
- [ ] [UC04][SUB-04] Expor o início de vendas/inscrições via API HTTP
- [ ] [UC04][SUB-05] Implementar os testes de integração ponta a ponta (e2e) do início de vendas/inscrições
- [ ] [UC04][SUB-06] Documentar tecnicamente o início de vendas/inscrições

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O evento está no estado Em Organização e a alteração foi persistida.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento em estado diferente de Divulgado: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC03 (épico #12) — o evento precisa estar Divulgado.
- Infraestrutura do módulo de Eventos planejada no UC03 (#13 a #17).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC04/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
