# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC11] Realizar Fechamento Financeiro do Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC11`, `priority:medium`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Apurar o resultado financeiro de um evento realizado, considerando suas entradas e saídas, e encerrá-lo.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Média**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC11
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC11/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN04 | O fechamento financeiro deve considerar vendas, receitas, despesas, pagamentos e patrocínios ou outras entradas relacionadas ao evento |
| RN05 | Despesas não registradas, pagamentos pendentes ou informações financeiras incompletas podem impedir a conclusão confiável do fechamento |
| RN-UC11-01 | Somente eventos no estado Realizado podem ser encerrados |
| RN-UC11-02 | O fechamento é bloqueado enquanto houver pagamentos pendentes |
| RN-UC11-03 | O resultado financeiro é a diferença entre as entradas e as despesas do evento |
| FP | Fluxo principal, passos 1 a 8 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC11][SUB-01] Implementar no domínio a operação de fechamento financeiro do evento
- [ ] [UC11][SUB-02] Implementar a apuração do resultado financeiro do evento
- [ ] [UC11][SUB-03] Definir os contratos de aplicação do fechamento financeiro do evento
- [ ] [UC11][SUB-04] Implementar o serviço de aplicação do fechamento financeiro do evento
- [ ] [UC11][SUB-05] Expor o fechamento financeiro via API HTTP
- [ ] [UC11][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do fechamento financeiro do evento
- [ ] [UC11][SUB-07] Documentar tecnicamente o fechamento financeiro

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O resultado financeiro está apurado e registrado, o evento está no estado Encerrado e a alteração foi persistida.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento em estado diferente de Realizado: Operação rejeitada, nada é persistido
- [ ] FA03 — Existem pagamentos pendentes: Operação rejeitada informando as pendências, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC10 — o evento precisa estar Realizado.
- UC12 — pagamentos do evento.
- UC13 — despesas do evento.
- UC16 — patrocínios (vínculo pendente).
- Infraestrutura do módulo de Eventos planejada no UC03 (#13 a #17).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC11/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
