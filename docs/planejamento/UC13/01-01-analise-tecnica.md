# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC13 — Registrar Despesa
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC13; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC13 |
| Nome | Registrar Despesa |
| Módulo | Financeiro |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar um gasto gerado pela organização ou realização de um evento, para que seja considerado no fechamento financeiro.

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
| Pré-condição | O evento existe. |
| Pós-condição (sucesso) | A despesa está registrada, vinculada ao evento, e foi persistida. |
| Pós-condição (falha) | Nenhuma despesa é criada. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o identificador do evento, a descrição e o valor da despesa. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento não está Encerrado. |
| FP-4 | O sistema verifica que descrição e valor são válidos. |
| FP-5 | O sistema registra a despesa vinculada ao evento. |
| FP-6 | O sistema persiste a despesa. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento Encerrado | FP-3 | Operação rejeitada, nada é persistido (*Proposta técnica — validar*) |
| FA03 | Descrição ou valor ausente ou inválido | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC13-01 | Toda despesa deve possuir um Valor Monetário válido | Invariante possível de Despesa (seção 10) |
| RN-UC13-02 | Toda despesa pertence a um único evento | Cardinalidade Evento gera Despesa 1 : 0..* (seção 8) |
| RN-UC13-03 | A despesa deve possuir uma descrição não vazia | Despesas iguais precisam ser distinguidas (seção 4) — *Proposta técnica — validar* |
| RN-UC13-04 | Despesas não podem ser registradas para eventos Encerrados | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento encerrado | Entrada / regra de domínio | FA02 |
| Rejeitar quando: descrição ou valor ausente ou inválido | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Despesa (`Expense`) | Entidade de domínio | Nova entidade |
| Evento (`Event`) | Entidade relacionada | Deve existir; planejada no UC03 |
| Valor Monetário (`Money`) | Objeto de Valor | Reutilizado; planejado no UC02 |
| Operação `registerExpense` | Serviço de aplicação | Módulo Financeiro |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `eventId`, `description`, `amount` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Despesa e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do registro de despesa | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do registro de despesa | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de despesas | SUB-04 |
| Interface (API) / Testes | Expor o registro de despesa via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do registro de despesa | SUB-06 |
| Documentação | Documentar tecnicamente o registro de despesa | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso do módulo:** o `FinancialModule` é criado no UC12. Se este caso for implementado antes, a criação do módulo passa a fazer parte desta Sub-Issue de API.
5. **Objetos de Valor compartilhados:** Valor Monetário (UC02), Período (UC22) e Quantidade (UC24) são planejados uma única vez e reutilizados, evitando duplicação.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /events/:eventId/expenses` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Expense`, `registerExpense`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC13-03 | A despesa deve possuir uma descrição não vazia | Marcada na especificação como "Despesas iguais precisam ser distinguidas (seção 4) — Proposta técnica — validar" |
| RN-UC13-04 | Despesas não podem ser registradas para eventos Encerrados | Marcada na especificação como "Proposta técnica — validar" |
| FA02 | Evento Encerrado | Fluxo marcado na especificação como proposta técnica |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Existem despesas da atlética não vinculadas a evento? |
| D02 | É necessário anexar comprovante? |
