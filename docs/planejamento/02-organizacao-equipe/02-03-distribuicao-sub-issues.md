# 02-03 - Matriz de Distribuição das Sub-Issues

## 1. Fonte e contexto

- O caso de uso herdado é **UC03 — Divulgar Evento**, cujo épico e as Sub-Issues foram definidos em `docs/planejamento/01-03-issue-principal-epic.md` e `docs/planejamento/01-04-sub-issues.md`.
- O planejamento original registra **SUB-01** como `Ready` e as demais Sub-Issues como `Backlog`.
- A proposta aqui é manter a nomenclatura e a rastreabilidade das atividades do projeto, distribuindo execução e revisão entre os membros reais da equipe.

## 2. Matriz de distribuição

| Identificador | Título da atividade | Complexidade | Dependências técnicas | Assignee | Reviewer | Status atual informado | Status recomendado no board | Justificativa técnica |
|---|---|---|---|---|---|---|---|---|
| SUB-01 | Modelar a entidade Evento e a transição de divulgação | Alta | Nenhuma | Luna Ribeiro | Adriel Ostrovski | `Ready` | `Ready` | Base do slice; contém a regra de negócio central (`RN01`) e a transição Planejado → Divulgado |
| SUB-02 | Definir os contratos de aplicação (porta de repositório e DTO de resposta) | Alta | SUB-01 | Adriel Ostrovski | Bolivar Torres Neto | `Backlog` | `Backlog` | É a base para o serviço e a API; exige estabilidade em `Event` e `EventStatus` |
| SUB-03 | Implementar o serviço de aplicação de divulgação | Alta | SUB-01, SUB-02 | Luna Ribeiro | Bolivar Torres Neto | `Backlog` | `Backlog` | Orquestra a regra de domínio e o contrato de persistência, sendo o componente central do fluxo principal |
| SUB-04 | Implementar o adaptador de persistência de eventos | Média | SUB-01, SUB-02 | Bolivar Torres Neto | Adriel Ostrovski | `Backlog` | `Backlog` | Repositório em memória é uma proposta de implementação compatível com a etapa inicial, mas exige revisão cruzada |
| SUB-05 | Expor a divulgação via API HTTP e registrar o módulo de eventos | Alta | SUB-03, SUB-04 | Adriel Ostrovski | Luna Ribeiro | `Backlog` | `Backlog` | A camada HTTP precisa confirmar os contratos e a orquestração antes do fechamento do endpoint |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) do slice | Média | SUB-04, SUB-05 | Bolivar Torres Neto | Luna Ribeiro | `Backlog` | `Backlog` | O objetivo é validar a jornada completa e a persistência do estado `published` |
| SUB-07 | Documentar tecnicamente o primeiro slice | Baixa | SUB-05, SUB-06 | Luna Ribeiro | Adriel Ostrovski | `Backlog` | `Backlog` | Esta atividade consolida a documentação para o primeiro slice, mas deve ser concluída ao final |

## 3. Regras aplicadas

1. **Segregação de funções:** o revisor é diferente do responsável em todas as Sub-Issues, respeitando a revisão cruzada independente.
2. **Equilíbrio de carga:** a entrega principal do domínio foi atribuída a Luna Ribeiro, enquanto a infraestrutura, testes e revisão foram distribuídos para os demais membros.
3. **Dependências:** a sequência recomendada segue a matriz de dependências do planejamento anterior: `SUB-01 → SUB-02 → SUB-03 / SUB-04 → SUB-05 → SUB-06 → SUB-07`.
4. **Governança de status:** mesmo as atividades com `Ready` no planejamento inicial devem permanecer em `Backlog` até que a revisão humana e a Definition of Ready (DoR) sejam formalizadas no GitHub.

## 4. Observações finais

- A atribuição atual deve ser registrada no GitHub como `Assignee` e `Reviewer` em cada Issue.
- A distribuição acima **não altera o escopo funcional** do UC03; apenas organiza execução e validação.
- A recomendação não presume que os membros possuam permissões administrativas no repositório; a autorização real deve ser confirmada pelos administradores do projeto.
