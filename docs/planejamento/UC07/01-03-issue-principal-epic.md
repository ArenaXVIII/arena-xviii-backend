# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC07] Acompanhar Tarefas do Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC07`, `priority:low`, `spec:requer-modelagem`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar e acompanhar as tarefas de organização de um evento.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Baixa**; especificação **Rascunho — requer modelagem**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

> ⚠️ **Requer modelagem antes da implementação:** Modelar Tarefa no modelo conceitual (Entidade? estados? responsável e prazo?) antes de iniciar a implementação.

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC07
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC07/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC07-01 | Tarefas só podem ser registradas para eventos Em Organização |
| RN-UC07-02 | Toda tarefa pertence a um evento |
| RN-UC07-03 | A tarefa deve possuir uma descrição não vazia |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC07][SUB-01] Modelar a entidade Tarefa e suas regras
- [ ] [UC07][SUB-02] Definir os contratos de aplicação do acompanhamento de tarefas do evento
- [ ] [UC07][SUB-03] Implementar o serviço de aplicação do acompanhamento de tarefas do evento
- [ ] [UC07][SUB-04] Implementar o adaptador de persistência de tarefas
- [ ] [UC07][SUB-05] Expor o registro de tarefas via API HTTP
- [ ] [UC07][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do acompanhamento de tarefas do evento
- [ ] [UC07][SUB-07] Documentar tecnicamente o registro de tarefas

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A tarefa está registrada ou atualizada e foi persistida.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento em estado diferente de Em Organização: Operação rejeitada, nada é persistido
- [ ] FA03 — Descrição não informada: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho — requer modelagem).
- Modelar Tarefa no modelo conceitual (Entidade? estados? responsável e prazo?) antes de iniciar a implementação.
- UC04 — o evento precisa estar Em Organização.
- Infraestrutura do módulo de Eventos planejada no UC03 (#13 a #17).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC07/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
