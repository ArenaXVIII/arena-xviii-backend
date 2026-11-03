# Artefato 5 — Matriz de Rastreabilidade

**Caso de uso:** UC03 — Divulgar Evento

## 1. Requisitos × Sub-Issues

| Requisito / regra / fluxo | Sub-Issue | Atividade técnica | Critério de aceite vinculado | Comportamento a verificar futuramente |
|---|---|---|---|---|
| FP-1 — Solicitação com identificador | SUB-05 | Rota HTTP de divulgação | A rota recebe o identificador e delega ao serviço | Requisição com `eventId` chega ao serviço |
| FP-2 — Localizar evento | SUB-02, SUB-03, SUB-04 | Porta `findEventById`, orquestração, adaptador | O serviço chama `findEventById`; o adaptador retorna o evento ou `null` | Evento existente é localizado |
| FP-3 — Verificar estado Planejado | SUB-01 | `Event.publish()` | Estado diferente de `planned` é rejeitado | Somente `planned` prossegue |
| FP-4 — Verificar RN01 | SUB-01 | Verificação dos campos de planejamento | Campos ausentes são listados | Planejamento completo prossegue |
| FP-5 — Alterar estado | SUB-01 | Transição para `published` | Estado `published` e `updatedAt` atualizado | Novo estado após a operação |
| FP-6 — Persistir | SUB-03, SUB-04 | `save` após o sucesso | `save` chamado uma única vez; a leitura posterior retorna `published` | Estado persistido |
| FP-7 — Retornar confirmação | SUB-02, SUB-03, SUB-05 | DTO de resposta | DTO com `eventId`, `status`, `updatedAt` e `message` | Resposta de sucesso ao ator |
| FA01 — Evento não encontrado | SUB-02, SUB-03, SUB-05, SUB-06 | Exceção de FA01 e mapeamento HTTP | Exceção lançada; `save` não chamado; código HTTP aprovado | Rejeição sem persistência |
| FA02 — Evento já divulgado | SUB-01, SUB-03, SUB-05, SUB-06 | `EventAlreadyPublishedException` | Exceção lançada; estado inalterado; `save` não chamado | Rejeição sem persistência |
| FA03 — Estado diferente de Planejado | SUB-01, SUB-03, SUB-05, SUB-06 | `EventNotPlannedException` | Teste parametrizado com todos os estados | Rejeição sem persistência |
| FA04 — Planejamento incompleto | SUB-01, SUB-03, SUB-05, SUB-06 | `EventPlanningIncompleteException` | `missingFields` exato; resposta HTTP com os campos | Campos ausentes informados ao ator |
| FE01 — Falha na persistência | SUB-02, SUB-03, SUB-05, SUB-06 | Contrato de FE01 e tratamento no serviço/HTTP | Falha no `save` gera erro de FE01 informado ao ator | Falha informada sem detalhes internos |
| RN01 | SUB-01, SUB-06 | Verificação dos cinco campos | Teste isolado por campo | Não é possível divulgar sem os cinco campos |
| RN-UC03-01 | SUB-01, SUB-06 | Guarda de estado `planned` | FA03 parametrizado | Somente Planejado é divulgado |
| RN-UC03-02 | SUB-01, SUB-06 | Guarda de estado `published` | FA02 | Não há divulgação duplicada |
| RN-UC03-03 | SUB-01, SUB-03, SUB-04, SUB-06 | Persistência condicionada ao sucesso | `save` não chamado em rejeições; estado armazenado isolado | O estado persistido não muda em falhas |
| Pré-condição (existe e está Planejado) | SUB-01, SUB-03 | FA01, FA03 | Ver FA01 e FA03 | Pré-condição verificada |
| Pós-condição de sucesso | SUB-04, SUB-06 | Leitura após a divulgação | E2E: estado persistido `published` | Divulgado e persistido |
| Pós-condição de falha | SUB-01, SUB-04, SUB-06 | Estado inalterado | E2E: estado inalterado após a rejeição | Evento inalterado |
| Ordem de verificação documentada | SUB-01, SUB-03 | Sequência existência → divulgado → planejado → RN01 | Critério de ordem em SUB-01 | FA02 tem precedência sobre FA03 |
| Documentação do slice (README) | SUB-07 | Atualização da documentação | README e contrato documentados | — |

## 2. Análise de cobertura

### 2.1 Regras sem cobertura
Nenhuma. Todos os passos do FP, FA01–FA04, FE01, RN01, RN-UC03-01, RN-UC03-02, RN-UC03-03 e as pré e pós-condições possuem ao menos uma Sub-Issue e um critério de aceite.

### 2.2 Atividades sem origem direta na especificação

| Sub-Issue | Situação | Justificativa |
|---|---|---|
| SUB-04 | Origem indireta (FP-6) | A especificação exige persistência, mas não define tecnologia. O adaptador em memória é **proposta técnica H03** |
| SUB-05 | Origem indireta (FP-1, FP-7) | A especificação exige a interação do ator, mas não define a interface. A rota e os códigos HTTP são **propostas H01 e H02** |
| SUB-07 | Origem no README | O README mantém "Tecnologia" e "Primeiro slice" como "a definir" |

### 2.3 Pontos dependentes de decisão
- D01 (orçamento zero) e D02 (data no passado) afetam os critérios de RN01 em SUB-01. Nenhuma regra foi presumida.
