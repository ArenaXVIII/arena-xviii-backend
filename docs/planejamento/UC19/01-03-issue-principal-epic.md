# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC19] Cadastrar Modalidade`
> **Labels:** `type:epic`, `module:esportes`, `uc:UC19`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar uma modalidade esportiva oferecida pela atlética.

## Contexto e escopo

Caso de uso do módulo **Esportes** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC19
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC19/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC19-01 | A modalidade deve possuir um nome não vazio |
| RN-UC19-02 | Não podem existir duas modalidades com o mesmo nome |
| FP | Fluxo principal, passos 1 a 6 |
| FA01, FA02, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC19][SUB-01] Modelar a entidade Modalidade e suas regras
- [ ] [UC19][SUB-02] Definir os contratos de aplicação do cadastro de modalidade
- [ ] [UC19][SUB-03] Implementar o serviço de aplicação do cadastro de modalidade
- [ ] [UC19][SUB-04] Implementar o adaptador de persistência de modalidades
- [ ] [UC19][SUB-05] Expor o cadastro de modalidade via API HTTP
- [ ] [UC19][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do cadastro de modalidade
- [ ] [UC19][SUB-07] Documentar tecnicamente o cadastro de modalidade

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A modalidade está cadastrada e foi persistida.
- [ ] FA01 — Nome não informado: Operação rejeitada, nada é persistido
- [ ] FA02 — Modalidade já cadastrada: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC19/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
