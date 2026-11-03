# Artefato 8 — Planejamento do GitHub Project

**Caso de uso:** UC04 — Iniciar Vendas/Inscrições

## 1. Configuração

Os itens serão incluídos no Project da organização **Arena XVIII** (#3), já configurado com os 5 status da metodologia: `Backlog`, `Ready`, `In Progress`, `In Review` e `Done`.

## 2. Definition of Ready aplicada

- [ ] Especificação do UC04 validada pela equipe (hoje: **Rascunho**).
- [ ] Propostas técnicas e dúvidas que afetam o item decididas.
- [ ] Dependências internas e externas em `Done`.

## 3. Distribuição inicial

| Issue | Título | Status inicial | Justificativa |
|---|---|---|---|
| Epic | [UC04] Iniciar Vendas/Inscrições | `Backlog` | Especificação em Rascunho |
| SUB-01 | Implementar no domínio a operação de início de vendas/inscrições | `Backlog` | Especificação em Rascunho |
| SUB-02 | Definir os contratos de aplicação do início de vendas/inscrições | `Backlog` | Especificação em Rascunho; depende de SUB-01 |
| SUB-03 | Implementar o serviço de aplicação do início de vendas/inscrições | `Backlog` | Especificação em Rascunho; depende de SUB-01, SUB-02 |
| SUB-04 | Expor o início de vendas/inscrições via API HTTP | `Backlog` | Especificação em Rascunho; depende de SUB-03 |
| SUB-05 | Implementar os testes de integração ponta a ponta (e2e) do início de vendas/inscrições | `Backlog` | Especificação em Rascunho; depende de SUB-04 |
| SUB-06 | Documentar tecnicamente o início de vendas/inscrições | `Backlog` | Especificação em Rascunho; depende de SUB-04, SUB-05 |

Nenhum item inicia em `Ready`: a especificação ainda não foi validada (Definition of Ready não atendida). Após a validação, a unidade sem dependências pendentes pode ser movida para `Ready`.
