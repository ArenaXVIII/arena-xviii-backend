# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC02 — Definir Planejamento do Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC02; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC02 |
| Nome | Definir Planejamento do Evento |
| Módulo | Eventos |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Definir as informações principais do evento (data, local, orçamento, responsáveis e atrações ou atividades), levando-o ao estado Planejado. Também é utilizado para definir a nova data de um evento remarcado.

**Dentro do escopo:** o fluxo principal, os fluxos alternativos e de exceção e as regras de negócio listados abaixo, atravessando domínio, aplicação, infraestrutura e API HTTP.

**Fora do escopo:** autenticação/autorização (funções organizacionais pendentes) e qualquer comportamento citado apenas nas dúvidas em aberto.

## 3. Atores

| Ator | Papel | Observação |
|---|---|---|
| Diretoria | Ator principal; solicita a operação | Provisório — funções organizacionais pendentes de governança |
| Sistema | Valida as regras, persiste e responde | — |

## 4. Pré-condições e pós-condições

| Tipo | Descrição |
|---|---|
| Pré-condição | O evento existe e está no estado Planejamento ou Remarcado. |
| Pós-condição (sucesso) | O evento possui as informações principais definidas, está no estado Planejado e a alteração foi persistida. |
| Pós-condição (falha) | O evento permanece inalterado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o identificador do evento e as informações de planejamento. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento está em Planejamento ou Remarcado. |
| FP-4 | O sistema verifica que todas as informações principais foram informadas e são válidas. |
| FP-5 | O sistema registra as informações e altera o estado para Planejado. |
| FP-6 | O sistema persiste a alteração. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento em estado diferente de Planejamento ou Remarcado | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Informações principais ausentes ou inválidas | FP-4 | Operação rejeitada informando os campos ausentes ou inválidos, nada é persistido |
| FA04 | Evento Remarcado sem nova data diferente da anterior | FP-4 | Operação rejeitada, nada é persistido (*Proposta técnica — validar*) |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC02-01 | Somente eventos nos estados Planejamento ou Remarcado podem ter o planejamento definido | Ciclo de vida do Evento (seção 11) |
| RN-UC02-02 | O evento só passa a Planejado quando data, local, orçamento, responsáveis e atrações ou atividades estiverem definidos | Definição do estado Planejado (seção 11) e RN01 |
| RN-UC02-03 | Para um evento Remarcado, a transição para Planejado exige a definição de uma nova data | Ciclo de vida do Evento (seção 11) — "nova data definida" |
| RN-UC02-04 | O orçamento deve ser um Valor Monetário válido | Objeto de Valor Valor Monetário (seção 5) |
| RN-UC02-05 | A alteração só é persistida quando todas as condições forem atendidas | Padrão adotado no UC03 |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento em estado diferente de planejamento ou remarcado | Entrada / regra de domínio | FA02 |
| Rejeitar quando: informações principais ausentes ou inválidas | Entrada / regra de domínio | FA03 |
| Rejeitar quando: evento remarcado sem nova data diferente da anterior | Entrada / regra de domínio | FA04 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Evento (`Event`) | Entidade de domínio | Já existente (UC03); recebe nova operação |
| Valor Monetário (`Money`) | Objeto de Valor | Planejado neste caso de uso (reutilizável) |
| Operação `definePlanning` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `date`, `location`, `budget`, `responsibles`, `activities` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FA04, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar o Objeto de Valor Valor Monetário | SUB-01 |
| Domínio | Implementar no domínio a operação de definição de planejamento de evento | SUB-02 |
| Aplicação | Definir os contratos de aplicação da definição de planejamento do evento | SUB-03 |
| Aplicação | Implementar o serviço de aplicação da definição de planejamento do evento | SUB-04 |
| Interface (API) / Testes | Expor a definição de planejamento via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) da definição de planejamento do evento | SUB-06 |
| Documentação | Documentar tecnicamente a definição de planejamento | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso da infraestrutura do UC03:** este caso de uso reutiliza o `EventsModule`, o `EventsController` e o adaptador de eventos planejados nas Issues #13 a #17, que ainda estão abertas.
5. **Objetos de Valor compartilhados:** Valor Monetário (UC02), Período (UC22) e Quantidade (UC24) são planejados uma única vez e reutilizados, evitando duplicação.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `PUT /events/:eventId/planning` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FA04 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Critério de validade de Valor Monetário (Objeto de Valor `Money`, ver SUB-01) | O modelo conceitual cita o Objeto de Valor sem definir o critério de validade |
| H04 | Nomes de classes/arquivos em inglês (`Event`, `definePlanning`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| FA04 | Evento Remarcado sem nova data diferente da anterior | Fluxo marcado na especificação como proposta técnica |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | O planejamento pode ser salvo parcialmente, mantendo o evento em Planejamento, ou só é aceito completo? |
| D02 | Quais dados identificam um responsável? Responsáveis são Associados? (relação Papel/Função Organizacional em aberto). |
| D03 | A data anterior de um evento remarcado deve ser preservada no histórico de alterações? |
