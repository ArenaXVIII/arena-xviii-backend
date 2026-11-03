# Artefato 9 — Distribuição de Responsabilidades

**Caso de uso:** UC10 — Registrar Realização do Evento

**Responsável:** @LunaRibeiro (mesma alocação do UC03; ajuste se a equipe redistribuir os casos de uso).

| Issue | Atividade técnica | Responsável | Dependências | Estado inicial |
|---|---|---|---|---|
| Epic | [UC10] Registrar Realização do Evento | @LunaRibeiro | Todas as Sub-Issues | `Backlog` |
| SUB-01 | Implementar no domínio a operação de registro de realização do evento | @LunaRibeiro | — | `Backlog` |
| SUB-02 | Definir os contratos de aplicação do registro de realização do evento | @LunaRibeiro | SUB-01 | `Backlog` |
| SUB-03 | Implementar o serviço de aplicação do registro de realização do evento | @LunaRibeiro | SUB-01, SUB-02 | `Backlog` |
| SUB-04 | Expor o registro de realização via API HTTP | @LunaRibeiro | SUB-03 | `Backlog` |
| SUB-05 | Implementar os testes de integração ponta a ponta (e2e) do registro de realização do evento | @LunaRibeiro | SUB-04 | `Backlog` |
| SUB-06 | Documentar tecnicamente o registro de realização | @LunaRibeiro | SUB-04, SUB-05 | `Backlog` |

## Recomendações de comunicação e alinhamento

1. **Validação da especificação:** reunir a equipe (Adriel Ostrovski, Bolivar Torres Neto e Luna Ribeiro) para validar a especificação e responder às dúvidas antes de mover itens para `Ready`.
2. **Revisão por pares:** cada PR revisado por um membro diferente do autor antes de `Done`.
3. **Decisões registradas:** registrar no épico, como comentário, a decisão sobre cada proposta técnica.
4. **Dependências entre casos de uso:** alinhar a ordem de implementação com os responsáveis dos casos de uso dos quais este depende.
5. **Referência cruzada:** usar `Closes #número` nos PRs.
