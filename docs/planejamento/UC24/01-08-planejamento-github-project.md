# Artefato 8 — Planejamento do GitHub Project

**Caso de uso:** UC24 — Cadastrar Material

## 1. Configuração

Os itens serão incluídos no Project da organização **Arena XVIII** (#3), já configurado com os 5 status da metodologia: `Backlog`, `Ready`, `In Progress`, `In Review` e `Done`.

## 2. Definition of Ready aplicada

- [ ] Especificação do UC24 validada pela equipe (hoje: **Rascunho**).
- [ ] Propostas técnicas e dúvidas que afetam o item decididas.
- [ ] Dependências internas e externas em `Done`.

## 3. Distribuição inicial

| Issue | Título | Status inicial | Justificativa |
|---|---|---|---|
| Epic | [UC24] Cadastrar Material | `Backlog` | Especificação em Rascunho |
| SUB-01 | Modelar o Objeto de Valor Quantidade | `Backlog` | Especificação em Rascunho |
| SUB-02 | Modelar a entidade Material e suas regras | `Backlog` | Especificação em Rascunho; depende de SUB-01 |
| SUB-03 | Definir os contratos de aplicação do cadastro de material | `Backlog` | Especificação em Rascunho; depende de SUB-02 |
| SUB-04 | Implementar o serviço de aplicação do cadastro de material | `Backlog` | Especificação em Rascunho; depende de SUB-02, SUB-03 |
| SUB-05 | Implementar o adaptador de persistência de materiais | `Backlog` | Especificação em Rascunho; depende de SUB-02, SUB-03 |
| SUB-06 | Expor o cadastro de material via API HTTP | `Backlog` | Especificação em Rascunho; depende de SUB-04, SUB-05 |
| SUB-07 | Implementar os testes de integração ponta a ponta (e2e) do cadastro de material | `Backlog` | Especificação em Rascunho; depende de SUB-06, SUB-05 |
| SUB-08 | Documentar tecnicamente o cadastro de material | `Backlog` | Especificação em Rascunho; depende de SUB-06, SUB-07 |

Nenhum item inicia em `Ready`: a especificação ainda não foi validada (Definition of Ready não atendida). Após a validação, a unidade sem dependências pendentes pode ser movida para `Ready`.
