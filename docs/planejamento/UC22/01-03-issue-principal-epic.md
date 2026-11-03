# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC22] Cadastrar Campeonato`
> **Labels:** `type:epic`, `module:esportes`, `uc:UC22`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar uma competição específica da qual equipes da atlética podem participar.

## Contexto e escopo

Caso de uso do módulo **Esportes** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC22
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC22/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC22-01 | O campeonato deve possuir um nome não vazio |
| RN-UC22-02 | O campeonato deve possuir um Período válido (início anterior ou igual ao fim) |
| FP | Fluxo principal, passos 1 a 6 |
| FA01, FA02, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC22][SUB-01] Modelar o Objeto de Valor Período
- [ ] [UC22][SUB-02] Modelar a entidade Campeonato e suas regras
- [ ] [UC22][SUB-03] Definir os contratos de aplicação do cadastro de campeonato
- [ ] [UC22][SUB-04] Implementar o serviço de aplicação do cadastro de campeonato
- [ ] [UC22][SUB-05] Implementar o adaptador de persistência de campeonatos
- [ ] [UC22][SUB-06] Expor o cadastro de campeonato via API HTTP
- [ ] [UC22][SUB-07] Implementar os testes de integração ponta a ponta (e2e) do cadastro de campeonato
- [ ] [UC22][SUB-08] Documentar tecnicamente o cadastro de campeonato

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O campeonato está cadastrado e foi persistido.
- [ ] FA01 — Nome não informado: Operação rejeitada, nada é persistido
- [ ] FA02 — Período ausente ou inválido: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC22/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
