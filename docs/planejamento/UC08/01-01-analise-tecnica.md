# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC08 — Remarcar Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC08; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC08 |
| Nome | Remarcar Evento |
| Módulo | Eventos |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar a remarcação de um evento em organização quando problemas com clima ou local impedirem sua realização na data prevista, levando-o ao estado Remarcado. A definição da nova data ocorre no UC02.

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
| Pré-condição | O evento existe e está no estado Em Organização. |
| Pós-condição (sucesso) | O evento está no estado Remarcado, com o motivo registrado, e a alteração foi persistida. |
| Pós-condição (falha) | O evento permanece inalterado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator solicita a remarcação informando o identificador do evento e o motivo. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento está Em Organização. |
| FP-4 | O sistema verifica que o motivo foi informado e corresponde a clima ou local. |
| FP-5 | O sistema altera o estado para Remarcado e registra o motivo. |
| FP-6 | O sistema persiste a alteração. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento em estado diferente de Em Organização | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Motivo não informado ou diferente de clima ou local | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN03 | Um evento pode ser remarcado quando problemas com clima ou local impedirem sua realização na data prevista | Modelo conceitual, RN03 |
| RN-UC08-01 | Somente eventos no estado Em Organização podem ser remarcados | Ciclo de vida do Evento (seção 11) |
| RN-UC08-02 | A remarcação exige um motivo, que deve corresponder a problema de clima ou de local | Derivado da RN03 |
| RN-UC08-03 | A alteração só é persistida quando todas as condições forem atendidas | Padrão adotado no UC03 |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento em estado diferente de em organização | Entrada / regra de domínio | FA02 |
| Rejeitar quando: motivo não informado ou diferente de clima ou local | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Evento (`Event`) | Entidade de domínio | Já existente (UC03); recebe nova operação |
| Operação `rescheduleEvent` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `reason (motivo: clima ou local)` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Implementar no domínio a operação de remarcação de evento | SUB-01 |
| Aplicação | Definir os contratos de aplicação da remarcação de evento | SUB-02 |
| Aplicação | Implementar o serviço de aplicação da remarcação de evento | SUB-03 |
| Interface (API) / Testes | Expor a remarcação de evento via API HTTP | SUB-04 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) da remarcação de evento | SUB-05 |
| Documentação | Documentar tecnicamente a remarcação de evento | SUB-06 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso da infraestrutura do UC03:** este caso de uso reutiliza o `EventsModule`, o `EventsController` e o adaptador de eventos planejados nas Issues #13 a #17, que ainda estão abertas.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `PATCH /events/:eventId/reschedule` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Nomes de classes/arquivos em inglês (`Event`, `rescheduleEvent`), seguindo o padrão do código existente | Convenção não documentada |
| H04 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Um evento Divulgado pode ser remarcado? O ciclo de vida só prevê a partir de Em Organização. |
| D02 | Existem outros motivos aceitos além de clima e local? |
| D03 | A data anterior deve ser preservada no histórico de alterações? |
| D04 | Os inscritos devem ser notificados? |
