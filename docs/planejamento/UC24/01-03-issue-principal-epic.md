# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC24] Cadastrar Material`
> **Labels:** `type:epic`, `module:estoque`, `uc:UC24`, `priority:high`, `spec:rascunho`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Backlog`

---

## Objetivo

Registrar um material esportivo ou uniforme controlado pela atlética.

## Contexto e escopo

Caso de uso do módulo **Estoque** do ARENA XVIII (sustentação **Alta**; especificação **Rascunho**). O planejamento decompõe o caso em unidades por camada (domínio, aplicação, infraestrutura, API, testes e documentação), seguindo a arquitetura do primeiro slice (UC03, épico #12).

**Fora do escopo:** autenticação/autorização e itens listados apenas como dúvidas em aberto.

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção do UC24
- Modelo conceitual: `docs/visao-geral.md`
- Planejamento: `docs/planejamento/UC24/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN-UC24-01 | O material deve possuir um nome não vazio |
| RN-UC24-02 | A quantidade do material não pode ser negativa |
| RN-UC24-03 | O material é controlado por quantidade |
| FP | Fluxo principal, passos 1 a 6 |
| FA01, FA02, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [UC24][SUB-01] Modelar o Objeto de Valor Quantidade
- [ ] [UC24][SUB-02] Modelar a entidade Material e suas regras
- [ ] [UC24][SUB-03] Definir os contratos de aplicação do cadastro de material
- [ ] [UC24][SUB-04] Implementar o serviço de aplicação do cadastro de material
- [ ] [UC24][SUB-05] Implementar o adaptador de persistência de materiais
- [ ] [UC24][SUB-06] Expor o cadastro de material via API HTTP
- [ ] [UC24][SUB-07] Implementar os testes de integração ponta a ponta (e2e) do cadastro de material
- [ ] [UC24][SUB-08] Documentar tecnicamente o cadastro de material

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Fluxo principal: O material está cadastrado, com quantidade inicial, e foi persistido.
- [ ] FA01 — Nome não informado: Operação rejeitada, nada é persistido
- [ ] FA02 — Quantidade ausente ou negativa: Operação rejeitada, nada é persistido
- [ ] FE01 — Falha na persistência: Operação não concluída, falha informada ao ator
- [ ] Testes unitários e e2e aprovados (`pnpm test` e `pnpm test:e2e`).
- [ ] Propostas técnicas e dúvidas em aberto decididas e registradas.
- [ ] Documentação técnica atualizada.

## Dependências externas e bloqueios

- Validação da especificação pela equipe (status atual: Rascunho).

## Condições de conclusão

1. Todas as Sub-Issues em `Done`.
2. Todos os critérios gerais de aceite marcados com evidências.
3. Matriz de rastreabilidade (`docs/planejamento/UC24/01-05-matriz-rastreabilidade.md`) sem regras descobertas.
