# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC23] Inscrever Equipe em Campeonato`
> **Labels:** `type:epic`, `module:esportes`, `uc:UC23`, `priority:medium`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar a participação de uma equipe da atlética em um campeonato.

## Contexto e escopo

Caso de uso do módulo **Esportes** do ARENA XVIII (sustentação **Média**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC23
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC23/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC23-01 | A inscrição exige uma equipe e um campeonato existentes |
| RN-UC23-02 | Uma equipe não pode ser inscrita duas vezes no mesmo campeonato |
| RN-UC23-03 | Uma equipe pode participar de vários campeonatos e um campeonato pode reunir várias equipes |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC23][SUB-01] Modelar a entidade Participação em Campeonato e suas regras
- [ ] [UC23][SUB-02] Definir os contratos de aplicação da inscrição de equipe em campeonato
- [ ] [UC23][SUB-03] Implementar o serviço de aplicação da inscrição de equipe em campeonato
- [ ] [UC23][SUB-04] Implementar o adaptador de persistência de participações
- [ ] [UC23][SUB-05] Expor a inscrição de equipe em campeonato via API HTTP
- [ ] [UC23][SUB-06] Implementar os testes de integração ponta a ponta (e2e) da inscrição de equipe em campeonato
- [ ] [UC23][SUB-07] Documentar tecnicamente a inscrição de equipe em campeonato

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A participação está registrada e foi persistida.
- [ ] FA01 — Equipe não encontrada: Operação rejeitada, nada é persistido
- [ ] FA02 — Campeonato não encontrado: Operação rejeitada, nada é persistido
- [ ] FA03 — Equipe já inscrita no campeonato: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC20 — a equipe precisa existir.
- UC22 — o campeonato precisa existir.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC23/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
