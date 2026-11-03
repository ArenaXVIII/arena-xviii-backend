# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC09 — Cancelar Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC09; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC09 |
| Nome | Cancelar Evento |
| Módulo | Eventos |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Cancelar um evento em organização quando uma condição impedir sua continuidade, levando-o ao estado final Cancelado.

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
| Pós-condição (sucesso) | O evento está no estado Cancelado, com o motivo registrado, e a alteração foi persistida. |
| Pós-condição (falha) | O evento permanece inalterado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator solicita o cancelamento informando o identificador do evento e o motivo. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento está Em Organização. |
| FP-4 | O sistema verifica que o motivo foi informado. |
| FP-5 | O sistema altera o estado para Cancelado e registra o motivo. |
| FP-6 | O sistema persiste a alteração. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento em estado diferente de Em Organização | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Motivo não informado | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN06 | Um evento pode ser cancelado quando falta de orçamento, problema grave de local, vendas insuficientes ou cancelamento de fornecedor/atração impedirem sua continuidade | Modelo conceitual, RN06 (hipótese quanto ao critério exato) |
| RN-UC09-01 | Somente eventos no estado Em Organização podem ser cancelados | Ciclo de vida do Evento (seção 11) |
| RN-UC09-02 | O cancelamento exige um motivo | Derivado da RN06 |
| RN-UC09-03 | Cancelado é um estado final: o evento não pode mais mudar de estado | Ciclo de vida do Evento (seção 11) — Cancelado → [*] |
| RN-UC09-04 | A alteração só é persistida quando todas as condições forem atendidas | Padrão adotado no UC03 |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento em estado diferente de em organização | Entrada / regra de domínio | FA02 |
| Rejeitar quando: motivo não informado | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Evento (`Event`) | Entidade de domínio | Já existente (UC03); recebe nova operação |
| Operação `cancelEvent` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `reason (motivo)` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Implementar no domínio a operação de cancelamento de evento | SUB-01 |
| Aplicação | Definir os contratos de aplicação do cancelamento de evento | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do cancelamento de evento | SUB-03 |
| Interface (API) / Testes | Expor o cancelamento de evento via API HTTP | SUB-04 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do cancelamento de evento | SUB-05 |
| Documentação | Documentar tecnicamente o cancelamento de evento | SUB-06 |

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
| H01 | Rota HTTP `PATCH /events/:eventId/cancel` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Nomes de classes/arquivos em inglês (`Event`, `cancelEvent`), seguindo o padrão do código existente | Convenção não documentada |
| H04 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN06 | Um evento pode ser cancelado quando falta de orçamento, problema grave de local, vendas insuficientes ou cancelamento de fornecedor/atração impedirem sua continuidade | Marcada na especificação como "Modelo conceitual, RN06 (hipótese quanto ao critério exato)" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | O motivo deve ser um dos quatro previstos na RN06 ou é texto livre? (critério é hipótese). |
| D02 | Eventos em Planejamento, Planejado ou Divulgado podem ser cancelados? |
| D03 | O que acontece com inscrições e pagamentos já registrados? |
