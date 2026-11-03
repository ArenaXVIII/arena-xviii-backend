# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC25] Registrar Movimentação de Estoque`
> **Labels:** `type:epic`, `module:estoque`, `uc:UC25`, `priority:medium`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar uma entrada ou retirada de material, atualizando sua quantidade e preservando o histórico.

## Contexto e escopo

Caso de uso do módulo **Estoque** do ARENA XVIII (sustentação **Média**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC25
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC25/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC25-01 | Toda movimentação está relacionada a um material |
| RN-UC25-02 | A movimentação é do tipo entrada ou retirada |
| RN-UC25-03 | A quantidade movimentada deve ser maior que zero |
| RN-UC25-04 | Uma retirada não pode ser maior que a quantidade disponível |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC25][SUB-01] Modelar a entidade Movimentação de Estoque e suas regras
- [ ] [UC25][SUB-02] Definir os contratos de aplicação do registro de movimentação de estoque
- [ ] [UC25][SUB-03] Implementar o serviço de aplicação do registro de movimentação de estoque
- [ ] [UC25][SUB-04] Implementar o adaptador de persistência de movimentações
- [ ] [UC25][SUB-05] Expor o registro de movimentação via API HTTP
- [ ] [UC25][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de movimentação de estoque
- [ ] [UC25][SUB-07] Documentar tecnicamente o registro de movimentação

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A movimentação está registrada, a quantidade do material foi atualizada e ambos foram persistidos.
- [ ] FA01 — Material não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Tipo inválido ou quantidade menor ou igual a zero: Operação rejeitada, nada é persistido
- [ ] FA03 — Retirada maior que a quantidade disponível: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC24 — o material precisa existir.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC25/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
