# 02-07 - Plano de Atualização do GitHub

## 1. Objetivo

Este plano orienta a equipe a aplicar, no GitHub, os resultados da organização do time e da revisão das Issues do UC03 — Divulgar Evento.

## 2. Procedimento operacional

### 2.1 Conferência de integridade

1. Confirmar que o épico `[UC03] Divulgar Evento` existe no repositório.
2. Confirmar que todas as Sub-Issues abaixo existem e estão rastreadas:
   - `SUB-01` — Modelar a entidade Evento e a transição de divulgação
   - `SUB-02` — Definir os contratos de aplicação
   - `SUB-03` — Implementar o serviço de aplicação de divulgação
   - `SUB-04` — Implementar o adaptador de persistência de eventos
   - `SUB-05` — Expor a divulgação via API HTTP e registrar o módulo de eventos
   - `SUB-06` — Implementar os testes de integração ponta a ponta (e2e) do slice
   - `SUB-07` — Documentar tecnicamente o primeiro slice
3. Validar que os textos e os títulos estão compatíveis com o planejamento anterior e preservam a nomenclatura original.

### 2.2 Atualização de assignees

- Registrar o `Assignee` da Issue conforme a matriz de distribuição:
  - `SUB-01`: Luna Ribeiro
  - `SUB-02`: Adriel Ostrovski
  - `SUB-03`: Luna Ribeiro
  - `SUB-04`: Bolivar Torres Neto
  - `SUB-05`: Adriel Ostrovski
  - `SUB-06`: Bolivar Torres Neto
  - `SUB-07`: Luna Ribeiro

### 2.3 Registro de revisores

- Registrar o revisor humano em cada Issue, conforme a recomendação da equipe:
  - `SUB-01`: Adriel Ostrovski
  - `SUB-02`: Bolivar Torres Neto
  - `SUB-03`: Bolivar Torres Neto
  - `SUB-04`: Adriel Ostrovski
  - `SUB-05`: Luna Ribeiro
  - `SUB-06`: Luna Ribeiro
  - `SUB-07`: Adriel Ostrovski

### 2.4 Publicação dos comentários de revisão

1. Publicar os comentários técnicos do Artefato 05 em cada Issue correspondente.
2. Garantir que cada comentário identifique:
   - `Sub-Issue` correspondente;
   - `Revisor` designado;
   - pontos verificados;
   - ajustes recomendados;
   - condição para `Ready`.
3. Registrar comentário de aprovação ou solicitação de ajuste em cada atividade antes da promoção para `Ready`.

### 2.5 Ajustes de descrição

1. Revisar critérios de aceite, dependências e textos da Issue quando houver ambiguidade.
2. Registrar as decisões técnicas que ainda não foram formalizadas:
   - `D01` — orçamento zero;
   - `D02` — data no passado;
   - `H01` — proposta de endpoint;
   - `H02` — códigos HTTP;
   - `H03` — persistência em memória.
3. Atualizar as Issues diretamente no GitHub antes de mover qualquer item para `Ready`.

### 2.6 Governança de estados no GitHub Project

Usar estritamente os 5 estados do fluxo Kanban acadêmico:

`Backlog` → `Ready` → `In Progress` → `In Review` → `Done`

Regras:
- `Ready` somente será atribuído depois que todos os 7 critérios da DoR forem atendidos e as revisões humanas forem publicadas.
- Itens com pendências de decisão técnica ou revisão continuam em `Backlog`.
- Não criar labels de status (`status:ready`, `status:in-progress`, etc.).
- A coluna `Status` do Project é a fonte oficial de estado e a label deve ser usada apenas para classificação funcional, tipo e módulo.

### 2.7 Auditoria final do board

Antes de iniciar o desenvolvimento:

- Verificar coerência dos estados;
- Confirmar que cada Issue possui assignee e reviewer distintos;
- Validar que o épico mantém a rastreabilidade com as Sub-Issues;
- Garantir que itens pendentes continuam em `Backlog` e não foram promovidos indevidamente.

## 3. Resultado esperado

- O board do GitHub refletirá a organização real da equipe.
- As Issues ficarão com assignees e revisores claros.
- Os comentários técnicos estarão disponíveis para publicação e revisão humana.
- Somente itens validados e com DoR completo serão promovidos a `Ready`.

> Esta etapa é de planejamento e revisão; ela não deve ser confundida com a implementação do código do slice.
