# Artefato 9 — Distribuição de Responsabilidades

**Caso de uso:** UC24 — Cadastrar Material

**Responsável:** @LunaRibeiro (mesma alocação do UC03; ajuste se a equipe redistribuir os casos de uso).

| Issue | Atividade técnica | Responsável | Dependências | Estado inicial |
|---|---|---|---|---|
| Epic | [UC24] Cadastrar Material | @LunaRibeiro | Todas as Sub-Issues | `Backlog` |
| SUB-01 | Modelar o Objeto de Valor Quantidade | @LunaRibeiro | — | `Backlog` |
| SUB-02 | Modelar a entidade Material e suas regras | @LunaRibeiro | SUB-01 | `Backlog` |
| SUB-03 | Definir os contratos de aplicação do cadastro de material | @LunaRibeiro | SUB-02 | `Backlog` |
| SUB-04 | Implementar o serviço de aplicação do cadastro de material | @LunaRibeiro | SUB-02, SUB-03 | `Backlog` |
| SUB-05 | Implementar o adaptador de persistência de materiais | @LunaRibeiro | SUB-02, SUB-03 | `Backlog` |
| SUB-06 | Expor o cadastro de material via API HTTP | @LunaRibeiro | SUB-04, SUB-05 | `Backlog` |
| SUB-07 | Implementar os testes de integração ponta a ponta (e2e) do cadastro de material | @LunaRibeiro | SUB-06, SUB-05 | `Backlog` |
| SUB-08 | Documentar tecnicamente o cadastro de material | @LunaRibeiro | SUB-06, SUB-07 | `Backlog` |

## Recomendações de comunicação e alinhamento

1. **Validação da especificação:** reunir a equipe (Adriel Ostrovski, Bolivar Torres Neto e Luna Ribeiro) para validar a especificação e responder às dúvidas antes de mover itens para `Ready`.
2. **Revisão por pares:** cada PR revisado por um membro diferente do autor antes de `Done`.
3. **Decisões registradas:** registrar no épico, como comentário, a decisão sobre cada proposta técnica.
4. **Dependências entre casos de uso:** alinhar a ordem de implementação com os responsáveis dos casos de uso dos quais este depende.
5. **Referência cruzada:** usar `Closes #número` nos PRs.
