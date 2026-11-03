# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC12] Registrar Pagamento`
> **Labels:** `type:epic`, `module:financeiro`, `uc:UC12`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar um pagamento relacionado a um evento, preservando-o individualmente para o acompanhamento e o fechamento financeiro.

## Contexto e escopo

Caso de uso do módulo **Financeiro** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC12
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC12/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC12-01 | Todo pagamento deve possuir um Valor Monetário válido |
| RN-UC12-02 | Todo pagamento pertence a um único evento |
| RN-UC12-03 | Um pagamento pode estar pendente ou realizado |
| RN-UC12-04 | Pagamentos não podem ser registrados para eventos Encerrados ou Cancelados |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC12][SUB-01] Modelar a entidade Pagamento e suas regras
- [ ] [UC12][SUB-02] Definir os contratos de aplicação do registro de pagamento
- [ ] [UC12][SUB-03] Implementar o serviço de aplicação do registro de pagamento
- [ ] [UC12][SUB-04] Implementar o adaptador de persistência de pagamentos
- [ ] [UC12][SUB-05] Expor o registro de pagamento via API HTTP
- [ ] [UC12][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de pagamento
- [ ] [UC12][SUB-07] Documentar tecnicamente o registro de pagamento

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O pagamento está registrado, vinculado ao evento, e foi persistido.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento Encerrado ou Cancelado: Operação rejeitada, nada é persistido
- [ ] FA03 — Valor ausente ou inválido: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC01 — o evento precisa existir.
- UC02 — Objeto de Valor Valor Monetário.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC12/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
