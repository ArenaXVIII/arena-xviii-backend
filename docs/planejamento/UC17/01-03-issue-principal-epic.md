# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC17] Cadastrar Associado`
> **Labels:** `type:epic`, `module:associados`, `uc:UC17`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar uma pessoa como associada da atlética, de forma que permaneça reconhecível ao longo do tempo.

## Contexto e escopo

Caso de uso do módulo **Associados** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC17
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC17/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC17-01 | O associado deve possuir um nome não vazio |
| RN-UC17-02 | Não podem existir dois associados com o mesmo identificador (ex.: RA ou CPF) |
| FP | Fluxo principal, passos 1 a 6 |
| FA01, FA02, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC17][SUB-01] Modelar a entidade Associado e suas regras
- [ ] [UC17][SUB-02] Definir os contratos de aplicação do cadastro de associado
- [ ] [UC17][SUB-03] Implementar o serviço de aplicação do cadastro de associado
- [ ] [UC17][SUB-04] Implementar o adaptador de persistência de associados
- [ ] [UC17][SUB-05] Expor o cadastro de associado via API HTTP
- [ ] [UC17][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do cadastro de associado
- [ ] [UC17][SUB-07] Documentar tecnicamente o cadastro de associado

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O associado está cadastrado e foi persistido.
- [ ] FA01 — Dados obrigatórios ausentes: Operação rejeitada, nada é persistido
- [ ] FA02 — Associado já cadastrado: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC17/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
