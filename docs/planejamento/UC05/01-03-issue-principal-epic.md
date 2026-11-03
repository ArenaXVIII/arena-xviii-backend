# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC05] Registrar Inscrição em Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC05`, `priority:medium`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar a inscrição ou compra de um participante em um evento que está com vendas/inscrições abertas.

## Contexto e escopo

Caso de uso do módulo **Eventos** do ARENA XVIII (sustentação **Média**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC05
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC05/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC05-01 | Somente eventos no estado Em Organização aceitam inscrições |
| RN-UC05-02 | A inscrição deve conter os dados do participante |
| RN-UC05-03 | Toda inscrição pertence a um único evento |
| RN-UC05-04 | A inscrição é registrada como pendente até ser confirmada (UC06) |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC05][SUB-01] Modelar a entidade Inscrição em Evento e suas regras
- [ ] [UC05][SUB-02] Definir os contratos de aplicação do registro de inscrição em evento
- [ ] [UC05][SUB-03] Implementar o serviço de aplicação do registro de inscrição em evento
- [ ] [UC05][SUB-04] Implementar o adaptador de persistência de inscrições
- [ ] [UC05][SUB-05] Expor o registro de inscrição via API HTTP
- [ ] [UC05][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de inscrição em evento
- [ ] [UC05][SUB-07] Documentar tecnicamente o registro de inscrição

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: A inscrição está registrada, vinculada ao evento, aguardando confirmação, e foi persistida.
- [ ] FA01 — Evento não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Evento em estado diferente de Em Organização: Operação rejeitada, nada é persistido
- [ ] FA03 — Dados do participante ausentes: Operação rejeitada informando os dados ausentes, nada é persistido
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
3. Matriz de rastreabilidade (`docs/planejamento/UC05/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
