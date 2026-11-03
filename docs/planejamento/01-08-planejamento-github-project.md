# Artefato 8 — Planejamento do GitHub Project

## 1. Configuração do Project

| Item | Valor |
|---|---|
| Nome sugerido | `ARENA XVIII — Implementação` |
| Layout | Board (Kanban) |
| Agrupamento das colunas | Campo `Status` |

### 1.1 Campo `Status` (exatamente 5 opções, nesta ordem)

| Ordem | Status | Significado |
|---|---|---|
| 1 | `Backlog` | Item planejado, mas com dependências ou decisões pendentes |
| 2 | `Ready` | Atende à Definition of Ready: dependências resolvidas, critérios de aceite claros e responsável definido |
| 3 | `In Progress` | Em desenvolvimento |
| 4 | `In Review` | PR aberto, aguardando revisão |
| 5 | `Done` | PR integrado e critérios de aceite comprovados com evidências |

> Remova as opções padrão divergentes (por exemplo, `Todo`) e não use itens sem status (`No Status`).

### 1.2 Definition of Ready (para mover de `Backlog` para `Ready`)
- [ ] As Sub-Issues das quais o item depende estão em `Done`.
- [ ] As decisões técnicas (H/D) que afetam o item foram registradas.
- [ ] Os critérios de aceite são objetivos e verificáveis.
- [ ] O responsável foi atribuído.

### 1.3 Definition of Done (para mover para `Done`)
- [ ] Todos os critérios de aceite foram marcados.
- [ ] Os testes pertinentes foram aprovados (`pnpm test` / `pnpm test:e2e`).
- [ ] O PR foi revisado e integrado.
- [ ] As evidências foram anexadas à Issue.

### 1.4 Campos adicionais sugeridos (opcionais)

| Campo | Tipo | Valores |
|---|---|---|
| `Camada` | Single select | Domínio, Aplicação, Infraestrutura, API, Testes, Documentação |
| `Caso de Uso` | Text | UC03 |

## 2. Distribuição inicial

| Issue | Título | Status inicial | Justificativa |
|---|---|---|---|
| Epic | [UC03] Divulgar Evento | `Ready` | Escopo, critérios e Sub-Issues definidos |
| SUB-01 | Modelar a entidade Evento e a transição de divulgação | `Ready` | Sem dependências; critérios definidos |
| SUB-02 | Definir os contratos de aplicação | `Backlog` | Depende de SUB-01 |
| SUB-03 | Implementar o serviço de aplicação de divulgação | `Backlog` | Depende de SUB-01 e SUB-02 |
| SUB-04 | Implementar o adaptador de persistência de eventos | `Backlog` | Depende de SUB-01 e SUB-02 e da decisão H03 |
| SUB-05 | Expor a divulgação via API HTTP e registrar o módulo | `Backlog` | Depende de SUB-03 e SUB-04 e das decisões H01 e H02 |
| SUB-06 | Testes de integração ponta a ponta (e2e) | `Backlog` | Depende de SUB-04 e SUB-05 |
| SUB-07 | Documentar tecnicamente o primeiro slice | `Backlog` | Depende de SUB-05 e SUB-06 |

Nenhum item inicia em `In Progress`, `In Review` ou `Done`, pois esta etapa é exclusivamente de planejamento.
