# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC14] Controlar Mensalidades`
> **Labels:** `type:epic`, `module:financeiro`, `uc:UC14`, `priority:low`, `spec:requer-modelagem`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar o pagamento de mensalidades dos associados.

## Contexto e escopo

Caso de uso do módulo **Financeiro** do ARENA XVIII (sustentação **Baixa**; especificação **Rascunho — requer modelagem**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

> ⚠️ **Requer modelagem antes da implementação:** Incluir Mensalidade no modelo conceitual (valor, periodicidade e consequências da inadimplência) antes de iniciar a implementação.

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC14
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC14/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC14-01 | Toda mensalidade pertence a um associado |
| RN-UC14-02 | A mensalidade deve possuir um Valor Monetário válido |
| RN-UC14-03 | Um associado não pode ter duas mensalidades registradas para a mesma competência (mês/ano) |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC14][SUB-01] Modelar a entidade Mensalidade e suas regras
- [ ] [UC14][SUB-02] Definir os contratos de aplicação do controle de mensalidades
- [ ] [UC14][SUB-03] Implementar o serviço de aplicação do controle de mensalidades
- [ ] [UC14][SUB-04] Implementar o adaptador de persistência de mensalidades
- [ ] [UC14][SUB-05] Expor o registro de mensalidade via API HTTP
- [ ] [UC14][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do controle de mensalidades
- [ ] [UC14][SUB-07] Documentar tecnicamente o registro de mensalidade

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O pagamento da mensalidade está registrado e foi persistido.
- [ ] FA01 — Associado não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Valor ausente ou inválido: Operação rejeitada, nada é persistido
- [ ] FA03 — Mensalidade já registrada para a competência: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho — requer modelagem).
- Incluir Mensalidade no modelo conceitual (valor, periodicidade e consequências da inadimplência) antes de iniciar a implementação.
- UC17 — o associado precisa existir.
- UC02 — Objeto de Valor Valor Monetário.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC14/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
