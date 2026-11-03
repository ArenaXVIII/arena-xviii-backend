# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC06 — Confirmar Inscrição em Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC06; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC06 |
| Nome | Confirmar Inscrição em Evento |
| Módulo | Eventos |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Confirmar uma inscrição registrada, desde que seus dados estejam corretos e o pagamento obrigatório tenha sido realizado.

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
| Pré-condição | A inscrição existe e está pendente. |
| Pós-condição (sucesso) | A inscrição está confirmada e a alteração foi persistida. |
| Pós-condição (falha) | A inscrição permanece inalterada. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator solicita a confirmação informando o identificador da inscrição. |
| FP-2 | O sistema localiza a inscrição. |
| FP-3 | O sistema verifica que a inscrição está pendente. |
| FP-4 | O sistema verifica que os dados do participante estão completos. |
| FP-5 | O sistema verifica que o pagamento obrigatório foi realizado (UC12). |
| FP-6 | O sistema altera a inscrição para confirmada. |
| FP-7 | O sistema persiste a alteração. |
| FP-8 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Inscrição não encontrada | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Inscrição já confirmada | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Dados do participante incompletos | FP-4 | Operação rejeitada, nada é persistido |
| FA04 | Pagamento obrigatório não realizado | FP-5 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-7 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN02 | Uma venda ou inscrição só pode ser confirmada quando os dados necessários estiverem corretos e o pagamento obrigatório tiver sido realizado | Modelo conceitual, RN02 |
| RN-UC06-01 | Uma inscrição já confirmada não pode ser confirmada novamente | *Proposta técnica — validar* |
| RN-UC06-02 | A alteração só é persistida quando todas as condições forem atendidas | Invariante da Inscrição (seção 10) |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: inscrição não encontrada | Processamento (existência) | FA01 |
| Rejeitar quando: inscrição já confirmada | Entrada / regra de domínio | FA02 |
| Rejeitar quando: dados do participante incompletos | Entrada / regra de domínio | FA03 |
| Rejeitar quando: pagamento obrigatório não realizado | Entrada / regra de domínio | FA04 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Inscrição em Evento (`Registration`) | Entidade de domínio | Criada no UC05 |
| Operação `confirmRegistration` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: apenas o identificador na rota |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FA04, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Implementar no domínio a operação de confirmação de inscrição | SUB-01 |
| Aplicação | Definir os contratos de aplicação da confirmação de inscrição | SUB-02 |
| Aplicação | Definir a porta de consulta de pagamento da inscrição | SUB-03 |
| Aplicação | Implementar o serviço de aplicação da confirmação de inscrição | SUB-04 |
| Interface (API) / Testes | Expor a confirmação de inscrição via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) da confirmação de inscrição | SUB-06 |
| Documentação | Documentar tecnicamente a confirmação de inscrição | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso da infraestrutura do UC03:** este caso de uso reutiliza o `EventsModule`, o `EventsController` e o adaptador de eventos planejados nas Issues #13 a #17, que ainda estão abertas.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-8).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `PATCH /registrations/:registrationId/confirm` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FA04 → 409, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Nomes de classes/arquivos em inglês (`Registration`, `confirmRegistration`), seguindo o padrão do código existente | Convenção não documentada |
| H04 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC06-01 | Uma inscrição já confirmada não pode ser confirmada novamente | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Em quais eventos o pagamento é obrigatório? Existem eventos gratuitos? (seção 6.2). |
| D02 | O que define que os dados estão "corretos"? |
| D03 | Uma inscrição pode ser cancelada ou recusada? |
