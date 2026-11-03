# Artefato 12 — Relatório de Consistência e Cobertura

**Caso de uso:** UC03 — Divulgar Evento

## 1. Quantitativo

| Item | Quantidade |
|---|---|
| Issue principal (Epic) | 1 |
| Sub-Issues | 7 |
| Total de Issues | 8 |
| Labels | 13 |
| Status do Project | 5 |

## 2. Cobertura

| Elemento da especificação | Total | Cobertos | Sub-Issues |
|---|---|---|---|
| Passos do fluxo principal | 7 | 7 | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 |
| Fluxos alternativos (FA01–FA04) | 4 | 4 | SUB-01, SUB-02, SUB-03, SUB-05, SUB-06 |
| Fluxos de exceção (FE01) | 1 | 1 | SUB-02, SUB-03, SUB-05, SUB-06 |
| Regras de negócio (RN01, RN-UC03-01 a 03) | 4 | 4 | SUB-01, SUB-03, SUB-04, SUB-06 |
| Pré e pós-condições | 3 | 3 | SUB-01, SUB-03, SUB-04, SUB-06 |

**Cobertura: 100% dos elementos documentados.** Cada elemento possui critério de aceite e verificação futura prevista em teste unitário e/ou e2e.

## 3. Dependências críticas

- **Caminho crítico:** SUB-01 → SUB-02 → (SUB-03 ∥ SUB-04) → SUB-05 → SUB-06 → SUB-07.
- **Ponto de maior acoplamento:** SUB-05, que integra o serviço e o adaptador e concentra as decisões de contrato HTTP.
- **Bloqueios não técnicos:** decisões H01–H05 e D01–D02.

## 4. Decisões que dependem de validação da equipe

| ID | Decisão | Sub-Issue afetada |
|---|---|---|
| H01 | Rota `PATCH /events/:eventId/publish` | SUB-05, SUB-06, SUB-07 |
| H02 | Códigos HTTP: 404 / 409 / 422 / 500 | SUB-05, SUB-06 |
| H03 | Persistência inicial em memória | SUB-04 |
| H04 | Exceção específica para FE01 | SUB-02, SUB-03 |
| H05 | Sem autorização no UC03 nesta etapa | SUB-05 |
| D01 | Orçamento zero conta como "definido"? | SUB-01 |
| D02 | Data no passado impede a divulgação? | SUB-01 |
| D03 | Versionar `docs/casos-de-uso.md` | SUB-07 |
| D04 | Função organizacional do ator | Futuro (autorização) |
| — | Localização das exceções (`common` × módulo) e idioma das mensagens | SUB-01, SUB-02 |

## 5. Situação do código preexistente

O repositório já contém código inicial para o UC03: entidade `Event`, enum de estados, exceções de FA01–FA04, DTO de resposta, interface do repositório, `EventsService` e testes unitários do serviço. **Esse código não foi validado neste planejamento e não está considerado concluído.** As Sub-Issues SUB-01, SUB-02 e SUB-03 preveem sua revisão contra os critérios de aceite.

Lacunas observadas e já cobertas pelo planejamento:
- não há implementação concreta de `IEventsRepository` (SUB-04);
- não há controller, `EventsModule` nem registro no `AppModule` (SUB-05);
- o FE01 não tem tratamento nem teste (SUB-02, SUB-03, SUB-06);
- não há testes isolados da entidade (SUB-01) nem testes e2e do UC03 (SUB-06).

## 6. Riscos e recomendações

| Risco | Impacto | Recomendação |
|---|---|---|
| Decisões H/D não tomadas atrasam SUB-04 e SUB-05 | Bloqueio no caminho crítico | Deliberar as decisões em reunião curta antes de iniciar SUB-02 |
| Concentração de todas as Sub-Issues em uma única responsável | Gargalo e falta de revisão independente | Designar revisores entre os demais membros da equipe |
| O adaptador em memória mascara problemas de persistência real | O FE01 e a atomicidade são verificados apenas com dublês | Registrar a substituição por banco real como item de evolução, sem incluí-lo neste slice |
| O código preexistente ser tratado como pronto | Critérios não verificados | Exigir as evidências do Artefato 4 antes de mover para `Done` |
| `docs/casos-de-uso.md` ausente do repositório | Referência formal quebrada | Versionar o arquivo antes de criar o épico |

**Recomendação para o início da implementação:** resolver D01 e D02, mover SUB-01 para `In Progress` e, em paralelo, deliberar H01–H05 para liberar o restante do caminho crítico.
