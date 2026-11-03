# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC10] Registrar Realização do Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC10`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar que o evento ocorreu, levando-o ao estado Realizado, no qual aguarda o fechamento financeiro.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC10
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC10/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC10-01 | Somente eventos no estado Em Organização podem ser registrados como realizados |
| RN-UC10-02 | A realização só pode ser registrada a partir da data do evento |
| RN-UC10-03 | A alteração só é persistida quando todas as condições forem atendidas |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC10][SUB-01] Implementar no domínio a operação de registro de realização do evento
- [ ] [UC10][SUB-02] Definir os contratos de aplicação do registro de realização do evento
- [ ] [UC10][SUB-03] Implementar o serviço de aplicação do registro de realização do evento
- [ ] [UC10][SUB-04] Expor o registro de realização via API HTTP
- [ ] [UC10][SUB-05] Implementar os testes de integração ponta a ponta (e2e) do registro de realização do evento
- [ ] [UC10][SUB-06] Documentar tecnicamente o registro de realização

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O evento está no estado Realizado e a alteração foi persistida.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento em estado diferente de Em Organização: Operação rejeitada, nada é persistido
- [ ] FA03 — Data do evento ainda não alcançada: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC04 — o evento precisa estar Em Organização.
- Infraestrutura do módulo de Eventos planejada no UC03 (#13 a #17).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC10/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
