# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC12 — Registrar Pagamento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC12; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC12 |
| Nome | Registrar Pagamento |
| Módulo | Financeiro |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar um pagamento relacionado a um evento, preservando-o individualmente para o acompanhamento e o fechamento financeiro.

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
| Pós-condição (sucesso) | O pagamento está registrado, vinculado ao evento, e foi persistido. |
| Pós-condição (falha) | Nenhum pagamento é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o identificador do evento, o valor e a situação do pagamento. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento aceita registros financeiros. |
| FP-4 | O sistema verifica que o valor é válido. |
| FP-5 | O sistema registra o pagamento vinculado ao evento. |
| FP-6 | O sistema persiste o pagamento. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento Encerrado ou Cancelado | FP-3 | Operação rejeitada, nada é persistido (*Proposta técnica — validar*) |
| FA03 | Valor ausente ou inválido | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC12-01 | Todo pagamento deve possuir um Valor Monetário válido | Invariante possível de Pagamento (seção 10) |
| RN-UC12-02 | Todo pagamento pertence a um único evento | Cardinalidade Evento registra Pagamento 1 : 0..* (seção 8) |
| RN-UC12-03 | Um pagamento pode estar pendente ou realizado | RN05 cita pagamentos pendentes — *Proposta técnica — validar* |
| RN-UC12-04 | Pagamentos não podem ser registrados para eventos Encerrados ou Cancelados | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento encerrado ou cancelado | Entrada / regra de domínio | FA02 |
| Rejeitar quando: valor ausente ou inválido | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Pagamento (`Payment`) | Entidade de domínio | Nova entidade |
| Evento (`Event`) | Entidade relacionada | Deve existir; planejada no UC03 |
| Valor Monetário (`Money`) | Objeto de Valor | Reutilizado; planejado no UC02 |
| Operação `registerPayment` | Serviço de aplicação | Módulo Financeiro |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `eventId`, `amount`, `status (pendente/realizado)` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Pagamento e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do registro de pagamento | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do registro de pagamento | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de pagamentos | SUB-04 |
| Interface (API) / Testes | Expor o registro de pagamento via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do registro de pagamento | SUB-06 |
| Documentação | Documentar tecnicamente o registro de pagamento | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Criação do módulo:** este é o primeiro caso de uso do módulo Financeiro; ele cria o `FinancialModule`, que será reutilizado pelos demais casos do módulo.
5. **Objetos de Valor compartilhados:** Valor Monetário (UC02), Período (UC22) e Quantidade (UC24) são planejados uma única vez e reutilizados, evitando duplicação.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /events/:eventId/payments` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Payment`, `registerPayment`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC12-03 | Um pagamento pode estar pendente ou realizado | Marcada na especificação como "RN05 cita pagamentos pendentes — Proposta técnica — validar" |
| RN-UC12-04 | Pagamentos não podem ser registrados para eventos Encerrados ou Cancelados | Marcada na especificação como "Proposta técnica — validar" |
| FA02 | Evento Encerrado ou Cancelado | Fluxo marcado na especificação como proposta técnica |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | O pagamento é sempre vinculado a uma inscrição? (relação com RN02). |
| D02 | Pagamentos de mensalidades (UC14) usam a mesma Entidade? |
| D03 | Quais formas de pagamento existem? |
