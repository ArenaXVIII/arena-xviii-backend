# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC18] Vincular Associado a Modalidade`
> **Labels:** `type:epic`, `module:associados`, `uc:UC18`, `priority:low`, `spec:requer-modelagem`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar a participação de um associado em uma modalidade esportiva, na qual ele assume o papel de atleta.

## Contexto e escopo

Caso de uso do módulo **Associados** do ARENA XVIII (sustentação **Baixa**; especificação **Rascunho — requer modelagem**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

> ⚠️ **Requer modelagem antes da implementação:** Confirmar a cardinalidade Associado–Modalidade e se Atleta é papel do Associado ou Entidade própria antes de iniciar a implementação.

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC18
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC18/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC18-01 | O vínculo exige um associado e uma modalidade existentes |
| RN-UC18-02 | Um associado não pode ser vinculado duas vezes à mesma modalidade |
| RN-UC18-03 | Um associado pode participar de mais de uma modalidade |
| FP | Fluxo principal, passos 1 a 7 |
| FA01, FA02, FA03, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC18][SUB-01] Modelar a entidade Vínculo Associado–Modalidade e suas regras
- [ ] [UC18][SUB-02] Definir os contratos de aplicação do vínculo entre associado e modalidade
- [ ] [UC18][SUB-03] Implementar o serviço de aplicação do vínculo entre associado e modalidade
- [ ] [UC18][SUB-04] Implementar o adaptador de persistência de vínculos
- [ ] [UC18][SUB-05] Expor o vínculo associado–modalidade via API HTTP
- [ ] [UC18][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do vínculo entre associado e modalidade
- [ ] [UC18][SUB-07] Documentar tecnicamente o vínculo associado–modalidade

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O vínculo está registrado e foi persistido.
- [ ] FA01 — Associado não encontrado: Operação rejeitada, nada é persistido
- [ ] FA02 — Modalidade não encontrada: Operação rejeitada, nada é persistido
- [ ] FA03 — Vínculo já existente: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho — requer modelagem).
- Confirmar a cardinalidade Associado–Modalidade e se Atleta é papel do Associado ou Entidade própria antes de iniciar a implementação.
- UC17 — o associado precisa existir.
- UC19 — a modalidade precisa existir.

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC18/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
