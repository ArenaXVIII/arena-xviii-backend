# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC01] Cadastrar Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC01`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar um novo evento da atlética, que passa a existir no estado Planejamento enquanto suas informações principais são definidas.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC01
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC01/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC01-01 | Todo evento cadastrado inicia no estado Planejamento |
| RN-UC01-02 | O evento deve possuir um nome não vazio |
| RN-UC01-03 | O evento só é persistido quando todas as condições forem atendidas |
| FP | Fluxo principal, passos 1 a 5 |
| FA01, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC01][SUB-01] Implementar no domínio a criação de evento
- [ ] [UC01][SUB-02] Definir os contratos de aplicação do cadastro de evento
- [ ] [UC01][SUB-03] Implementar o serviço de aplicação do cadastro de evento
- [ ] [UC01][SUB-04] Estender o adaptador de persistência de eventos para o cadastro
- [ ] [UC01][SUB-05] Expor o cadastro de evento via API HTTP
- [ ] [UC01][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do cadastro de evento
- [ ] [UC01][SUB-07] Documentar tecnicamente o cadastro de evento

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O evento existe, está no estado Planejamento e foi persistido.
- [ ] FA01 — Nome não informado ou vazio: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- Infraestrutura do módulo de Eventos planejada no UC03 (#13 a #17).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC01/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
