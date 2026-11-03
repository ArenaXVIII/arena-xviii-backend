# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC13] Registrar Despesa`
> **Labels:** `type:epic`, `module:financeiro`, `uc:UC13`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar um gasto gerado pela organização ou realização de um evento, para que seja considerado no fechamento financeiro.

## Contexto e escopo

Caso de uso do módulo **Financeiro** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC13
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC13/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC13-01 | Toda despesa deve possuir um Valor Monetário válido |
| RN-UC13-02 | Toda despesa pertence a um único evento |
| RN-UC13-03 | A despesa deve possuir uma descrição não vazia |
| RN-UC13-04 | Despesas não podem ser registradas para eventos Encerrados |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC13][SUB-01] Modelar a entidade Despesa e suas regras
- [ ] [UC13][SUB-02] Definir os contratos de aplicação do registro de despesa
- [ ] [UC13][SUB-03] Implementar o serviço de aplicação do registro de despesa
- [ ] [UC13][SUB-04] Implementar o adaptador de persistência de despesas
- [ ] [UC13][SUB-05] Expor o registro de despesa via API HTTP
- [ ] [UC13][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de despesa
- [ ] [UC13][SUB-07] Documentar tecnicamente o registro de despesa

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A despesa está registrada, vinculada ao evento, e foi persistida.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento Encerrado: Operação rejeitada, nada é persistido
- [ ] FA03 — Descrição ou valor ausente ou inválido: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC01 — o evento precisa existir.
- UC02 — Objeto de Valor Valor Monetário.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC13/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
