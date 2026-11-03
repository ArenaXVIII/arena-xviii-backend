# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC21] Registrar Treino`
> **Labels:** `type:epic`, `module:esportes`, `uc:UC21`, `priority:low`, `spec:requer-modelagem`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar uma ocorrência de treino de uma equipe.

## Contexto e escopo

Caso de uso do módulo **Esportes** do ARENA XVIII (sustentação **Baixa**; especificação **Rascunho — requer modelagem**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

> ⚠️ **Requer modelagem antes da implementação:** Detalhar o fluxo de treinos (presença, local) antes de iniciar a implementação.

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC21
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC21/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC21-01 | Todo treino pertence a uma equipe |
| RN-UC21-02 | O treino deve possuir data e horário |
| FP | Fluxo principal, passos 1 a 6 |
| FA01, FA02, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC21][SUB-01] Modelar a entidade Treino e suas regras
- [ ] [UC21][SUB-02] Definir os contratos de aplicação do registro de treino
- [ ] [UC21][SUB-03] Implementar o serviço de aplicação do registro de treino
- [ ] [UC21][SUB-04] Implementar o adaptador de persistência de treinos
- [ ] [UC21][SUB-05] Expor o registro de treino via API HTTP
- [ ] [UC21][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de treino
- [ ] [UC21][SUB-07] Documentar tecnicamente o registro de treino

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O treino está registrado, vinculado à equipe, e foi persistido.
- [ ] FA01 — Equipe não encontrada: Operação rejeitada, nada é persistido
- [ ] FA02 — Data ou horário não informados: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho — requer modelagem).
- Detalhar o fluxo de treinos (presença, local) antes de iniciar a implementação.
- UC20 — a equipe precisa existir.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC21/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
