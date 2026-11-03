# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC06] Confirmar Inscrição em Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC06`, `priority:medium`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Confirmar uma inscrição registrada, desde que seus dados estejam corretos e o pagamento obrigatório tenha sido realizado.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Média**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC06
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC06/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN02 | Uma venda ou inscrição só pode ser confirmada quando os dados necessários estiverem corretos e o pagamento obrigatório tiver sido realizado |
| RN-UC06-01 | Uma inscrição já confirmada não pode ser confirmada novamente |
| RN-UC06-02 | A alteração só é persistida quando todas as condições forem atendidas |
| FP | Fluxo principal, passos 1 a 8 |
| FA01, FA02, FA03, FA04, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC06][SUB-01] Implementar no domínio a operação de confirmação de inscrição
- [ ] [UC06][SUB-02] Definir os contratos de aplicação da confirmação de inscrição
- [ ] [UC06][SUB-03] Definir a porta de consulta de pagamento da inscrição
- [ ] [UC06][SUB-04] Implementar o serviço de aplicação da confirmação de inscrição
- [ ] [UC06][SUB-05] Expor a confirmação de inscrição via API HTTP
- [ ] [UC06][SUB-06] Implementar os testes de integração ponta a ponta (e2e) da confirmação de inscrição
- [ ] [UC06][SUB-07] Documentar tecnicamente a confirmação de inscrição

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A inscrição está confirmada e a alteração foi persistida.
- [ ] FA01 — Inscrição não encontrada: Operação rejeitada, nada é persistido
- [ ] FA02 — Inscrição já confirmada: Operação rejeitada, nada é persistido
- [ ] FA03 — Dados do participante incompletos: Operação rejeitada, nada é persistido
- [ ] FA04 — Pagamento obrigatório não realizado: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).
- UC05 — a inscrição precisa existir e estar pendente.
- UC12 — o pagamento precisa estar registrado.
- Infraestrutura do módulo de Eventos planejada no UC03 (#13 a #17).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC06/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
