# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC16] Registrar Patrocínio`
> **Labels:** `type:epic`, `module:patrocinios`, `uc:UC16`, `priority:medium`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar um acordo de patrocínio firmado por um patrocinador, com valor e período definidos.

## Contexto e escopo

Caso de uso do módulo **Patrocínios** do ARENA XVIII (sustentação **Média**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC16
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC16/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC16-01 | Todo patrocínio pertence a um patrocinador |
| RN-UC16-02 | O patrocínio deve possuir um Valor Monetário válido |
| RN-UC16-03 | O patrocínio deve possuir um Período válido (início anterior ou igual ao fim) |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC16][SUB-01] Modelar a entidade Patrocínio e suas regras
- [ ] [UC16][SUB-02] Definir os contratos de aplicação do registro de patrocínio
- [ ] [UC16][SUB-03] Implementar o serviço de aplicação do registro de patrocínio
- [ ] [UC16][SUB-04] Implementar o adaptador de persistência de patrocínios
- [ ] [UC16][SUB-05] Expor o registro de patrocínio via API HTTP
- [ ] [UC16][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de patrocínio
- [ ] [UC16][SUB-07] Documentar tecnicamente o registro de patrocínio

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O patrocínio está registrado, vinculado ao patrocinador, e foi persistido.
- [ ] FA01 — Patrocinador não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Valor ausente ou inválido: Operação rejeitada, nada é persistido
- [ ] FA03 — Período ausente ou inválido: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC15 — o patrocinador precisa existir.
- UC02 — Objeto de Valor Valor Monetário.
- UC22 — Objeto de Valor Período.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC16/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
