# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC20] Cadastrar Equipe`
> **Labels:** `type:epic`, `module:esportes`, `uc:UC20`, `priority:medium`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar uma equipe formada dentro de uma modalidade.

## Contexto e escopo

Caso de uso do módulo **Esportes** do ARENA XVIII (sustentação **Média**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC20
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC20/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC20-01 | Toda equipe pertence a uma modalidade |
| RN-UC20-02 | A equipe deve possuir um nome não vazio |
| FP | Fluxo principal, passos 1 a 6 |
| FA01, FA02, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC20][SUB-01] Modelar a entidade Equipe e suas regras
- [ ] [UC20][SUB-02] Definir os contratos de aplicação do cadastro de equipe
- [ ] [UC20][SUB-03] Implementar o serviço de aplicação do cadastro de equipe
- [ ] [UC20][SUB-04] Implementar o adaptador de persistência de equipes
- [ ] [UC20][SUB-05] Expor o cadastro de equipe via API HTTP
- [ ] [UC20][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do cadastro de equipe
- [ ] [UC20][SUB-07] Documentar tecnicamente o cadastro de equipe

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A equipe está cadastrada, vinculada à modalidade, e foi persistida.
- [ ] FA01 — Modalidade não encontrada: Operação rejeitada, nada é persistido
- [ ] FA02 — Nome não informado: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC19 — a modalidade precisa existir.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC20/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
