# Artefato 12 — Relatório de Consistência e Cobertura

**Caso de uso:** UC08 — Remarcar Evento

## 1. Quantitativo

| Item | Quantidade |
|---|---|
| Epic | 1 |
| Sub-Issues | 6 |
| Total de Issues | 7 |

## 2. Cobertura

| Elemento | Total | Cobertos |
|---|---|---|
| Passos do fluxo principal | 7 | 7 |
| Fluxos alternativos e de exceção | 4 | 4 |
| Regras de negócio | 4 | 4 |
| Pré e pós-condições | 3 | 3 |

## 3. Dependências críticas

- Caminho crítico interno: SUB-01 → SUB-02 → SUB-03 → SUB-04 → SUB-05 → SUB-06.
- Casos de uso pré-requisito: UC04, UC02.
- Infraestrutura do módulo de Eventos: Issues #13 a #17 (UC03).

## 4. Decisões que dependem de validação da equipe

| ID | Decisão |
|---|---|
| H01 | Rota HTTP `PATCH /events/:eventId/reschedule` |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FE01 → 500 |
| H03 | Nomes de classes/arquivos em inglês (`Event`, `rescheduleEvent`), seguindo o padrão do código existente |
| H04 | Sem autenticação/autorização nesta etapa |
| D01–D04 | Dúvidas em aberto da especificação (Artefato 1, seção 11.3) |

## 5. Riscos e recomendações

| Risco | Impacto | Recomendação |
|---|---|---|
| Especificação em Rascunho | Retrabalho se regras mudarem após o início | Validar a especificação antes de mover itens para `Ready` |
| Regras marcadas como proposta técnica | Critérios de aceite podem mudar | Decidir e registrar no épico antes da implementação do domínio |
| Dependência de outros casos de uso | Bloqueio do caminho crítico | Implementar primeiro: UC04, UC02 |

**Recomendação para o início:** validar a especificação e decidir as propostas técnicas; em seguida, mover SUB-01 para `Ready`.
