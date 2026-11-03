# Artefato 3 — Issue Principal (Epic)

> Copie o conteúdo abaixo da linha horizontal para o GitHub.
> **Título:** `[UC03] Divulgar Evento`
> **Labels:** `type:epic`, `module:eventos`, `uc:UC03`, `priority:high`
> **Responsável:** `@LunaRibeiro`
> **Status inicial no Project:** `Ready`

---

## Objetivo

Implementar o caso de uso **UC03 — Divulgar Evento** como primeiro slice vertical do ARENA XVIII. O ator deve conseguir alterar o estado de um Evento de **Planejado** para **Divulgado** apenas quando as informações de planejamento exigidas pela **RN01** estiverem definidas.

## Contexto e escopo

O UC03 foi escolhido como primeiro slice arquitetural porque deriva da RN01, a regra de maior impacto no modelo conceitual, e porque define uma transição central do ciclo de vida do Evento. O slice deve atravessar domínio, aplicação, infraestrutura e interface HTTP, validando a arquitetura do backend (NestJS + TypeScript + Vitest).

**Fora do escopo:** canais de divulgação externos, cadastro e planejamento do evento (UC01 e UC02) e autorização por função (pendência de governança).

## Referência formal

- Especificação: `docs/casos-de-uso.md`, seção 5 (UC03)
- Modelo conceitual: `docs/visao-geral.md`, seções 9 (RN01), 10 (invariantes) e 11 (ciclo de vida)
- Planejamento: `docs/planejamento/`

## Requisitos contemplados

| Código | Descrição |
|---|---|
| RN01 | Divulgação exige data, local, orçamento, responsáveis e atrações/atividades definidos |
| RN-UC03-01 | Somente eventos Planejados podem ser divulgados |
| RN-UC03-02 | Um evento já divulgado não pode ser divulgado novamente |
| RN-UC03-03 | O estado só é persistido quando todas as condições forem atendidas |
| FP | Fluxo principal, passos 1 a 7 |
| FA01–FA04, FE01 | Fluxos alternativos e de exceção |

## Sub-Issues planejadas

- [ ] [SUB-01] Modelar a entidade Evento e a transição de divulgação
- [ ] [SUB-02] Definir os contratos de aplicação (porta de repositório e DTO de resposta)
- [ ] [SUB-03] Implementar o serviço de aplicação de divulgação
- [ ] [SUB-04] Implementar o adaptador de persistência de eventos
- [ ] [SUB-05] Expor a divulgação via API HTTP e registrar o módulo de eventos
- [ ] [SUB-06] Implementar os testes de integração ponta a ponta (e2e) do slice
- [ ] [SUB-07] Documentar tecnicamente o primeiro slice

> Após criar as Sub-Issues, substitua os identificadores provisórios pelas referências `#número`.

## Critérios gerais de aceite

- [ ] Um evento Planejado com planejamento completo passa para Divulgado, e a alteração é persistida.
- [ ] Um evento inexistente é rejeitado (FA01) sem persistência.
- [ ] Um evento já Divulgado é rejeitado (FA02) sem persistência.
- [ ] Um evento em estado diferente de Planejado é rejeitado (FA03) sem persistência.
- [ ] Um evento com planejamento incompleto é rejeitado (FA04), a resposta informa os campos ausentes e nada é persistido.
- [ ] Uma falha de persistência é informada ao ator (FE01).
- [ ] As verificações seguem a ordem documentada: existência → já divulgado → Planejado → RN01.
- [ ] Os testes unitários e e2e do slice estão aprovados no pipeline local (`pnpm test` e `pnpm test:e2e`).
- [ ] A documentação técnica do slice está atualizada.

## Dependências externas e bloqueios

- Confirmação, pela equipe, das propostas técnicas H01 (endpoint), H02 (códigos HTTP), H03 (persistência em memória), H04 (exceção de FE01) e H05 (sem autorização nesta etapa).
- Resposta às dúvidas D01 (orçamento zero) e D02 (data no passado) antes da conclusão de SUB-01.
- Versionamento de `docs/casos-de-uso.md` no repositório (D03).

## Condições de conclusão

O épico é considerado concluído quando:

1. todas as Sub-Issues estiverem em `Done`;
2. todos os critérios gerais de aceite estiverem marcados com evidências (links de PR e de execução de testes);
3. a matriz de rastreabilidade (`docs/planejamento/01-05-matriz-rastreabilidade.md`) não tiver regras sem cobertura.
