# Artefato 9 — Distribuição de Responsabilidades

**Caso de uso:** UC01 — Cadastrar Evento

**Responsável:** @LunaRibeiro (mesma alocação do UC03; ajuste se a equipe redistribuir os casos de uso).

| Issue | Atividade técnica | Responsável | Dependências | Estado inicial |
|---|---|---|---|---|
| Epic | [UC01] Cadastrar Evento | @LunaRibeiro | Todas as Sub-Issues | `Backlog` |
| SUB-01 | Implementar no domínio a criação de evento | @LunaRibeiro | — | `Backlog` |
| SUB-02 | Definir os contratos de aplicação do cadastro de evento | @LunaRibeiro | SUB-01 | `Backlog` |
| SUB-03 | Implementar o serviço de aplicação do cadastro de evento | @LunaRibeiro | SUB-01, SUB-02 | `Backlog` |
| SUB-04 | Estender o adaptador de persistência de eventos para o cadastro | @LunaRibeiro | SUB-01, SUB-02 | `Backlog` |
| SUB-05 | Expor o cadastro de evento via API HTTP | @LunaRibeiro | SUB-03, SUB-04 | `Backlog` |
| SUB-06 | Implementar os testes de integração ponta a ponta (e2e) do cadastro de evento | @LunaRibeiro | SUB-05, SUB-04 | `Backlog` |
| SUB-07 | Documentar tecnicamente o cadastro de evento | @LunaRibeiro | SUB-05, SUB-06 | `Backlog` |

## Recomendações de comunicação e alinhamento

1. **Validação da especificação:** reunir a equipe (Adriel Ostrovski, Bolivar Torres Neto e Luna Ribeiro) para validar a especificação e responder às dúvidas antes de mover itens para `Ready`.
2. **Revisão por pares:** cada PR revisado por um membro diferente do autor antes de `Done`.
3. **Decisões registradas:** registrar no épico, como comentário, a decisão sobre cada proposta técnica.
4. **Dependências entre casos de uso:** alinhar a ordem de implementação com os responsáveis dos casos de uso dos quais este depende.
5. **Referência cruzada:** usar `Closes #número` nos PRs.
