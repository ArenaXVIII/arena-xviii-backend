# Artefato 8 — Planejamento do GitHub Project

**Caso de uso:** UC14 — Controlar Mensalidades

## 1. Configuração

Os itens serão incluídos no Project da organização **Arena XVIII** (#3), já configurado com os 5 status da metodologia: `Backlog`, `Ready`, `In Progress`, `In Review` e `Done`.

## 2. Definition of Ready aplicada

- [ ] Especificação do UC14 validada pela equipe (hoje: **Rascunho — requer modelagem**).
- [ ] Propostas técnicas e dúvidas que afetam o item decididas.
- [ ] Dependências internas e externas em `Done`.
- [ ] Modelagem pendente concluída: Incluir Mensalidade no modelo conceitual (valor, periodicidade e consequências da inadimplência) antes de iniciar a implementação.

## 3. Distribuição inicial

| Issue | Título | Status inicial | Justificativa |
|---|---|---|---|
| Epic | [UC14] Controlar Mensalidades | `Backlog` | Especificação em Rascunho |
| SUB-01 | Modelar a entidade Mensalidade e suas regras | `Backlog` | Especificação em Rascunho |
| SUB-02 | Definir os contratos de aplicação do controle de mensalidades | `Backlog` | Especificação em Rascunho; depende de SUB-01 |
| SUB-03 | Implementar o serviço de aplicação do controle de mensalidades | `Backlog` | Especificação em Rascunho; depende de SUB-01, SUB-02 |
| SUB-04 | Implementar o adaptador de persistência de mensalidades | `Backlog` | Especificação em Rascunho; depende de SUB-01, SUB-02 |
| SUB-05 | Expor o registro de mensalidade via API HTTP | `Backlog` | Especificação em Rascunho; depende de SUB-03, SUB-04 |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) do controle de mensalidades | `Backlog` | Especificação em Rascunho; depende de SUB-05, SUB-04 |
| SUB-07 | Documentar tecnicamente o registro de mensalidade | `Backlog` | Especificação em Rascunho; depende de SUB-05, SUB-06 |

Nenhum item inicia em `Ready`: a especificação ainda não foi validada (Definition of Ready não atendida). Após a validação, a unidade sem dependências pendentes pode ser movida para `Ready`.
