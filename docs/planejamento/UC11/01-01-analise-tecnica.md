# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC11 — Realizar Fechamento Financeiro do Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC11; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC11 |
| Nome | Realizar Fechamento Financeiro do Evento |
| Módulo | Eventos |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Apurar o resultado financeiro de um evento realizado, considerando suas entradas e saídas, e encerrá-lo.

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
| Pré-condição | O evento existe e está no estado Realizado. |
| Pós-condição (sucesso) | O resultado financeiro está apurado e registrado, o evento está no estado Encerrado e a alteração foi persistida. |
| Pós-condição (falha) | O evento permanece inalterado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator solicita o fechamento financeiro informando o identificador do evento. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento está Realizado. |
| FP-4 | O sistema verifica que não há pagamentos pendentes vinculados ao evento. |
| FP-5 | O sistema apura o resultado financeiro a partir de pagamentos, despesas e patrocínios. |
| FP-6 | O sistema registra o resultado e altera o estado para Encerrado. |
| FP-7 | O sistema persiste a alteração. |
| FP-8 | O sistema retorna o resultado financeiro apurado. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento em estado diferente de Realizado | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Existem pagamentos pendentes | FP-4 | Operação rejeitada informando as pendências, nada é persistido |
| FE01 | Falha na persistência | FP-7 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN04 | O fechamento financeiro deve considerar vendas, receitas, despesas, pagamentos e patrocínios ou outras entradas relacionadas ao evento | Modelo conceitual, RN04 |
| RN05 | Despesas não registradas, pagamentos pendentes ou informações financeiras incompletas podem impedir a conclusão confiável do fechamento | Modelo conceitual, RN05 |
| RN-UC11-01 | Somente eventos no estado Realizado podem ser encerrados | Ciclo de vida do Evento (seção 11) |
| RN-UC11-02 | O fechamento é bloqueado enquanto houver pagamentos pendentes | Derivado da RN05 |
| RN-UC11-03 | O resultado financeiro é a diferença entre as entradas e as despesas do evento | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento em estado diferente de realizado | Entrada / regra de domínio | FA02 |
| Rejeitar quando: existem pagamentos pendentes | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Evento (`Event`) | Entidade de domínio | Já existente (UC03); recebe nova operação |
| Operação `closeEventFinancially` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: apenas o identificador na rota |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Implementar no domínio a operação de fechamento financeiro do evento | SUB-01 |
| Domínio | Implementar a apuração do resultado financeiro do evento | SUB-02 |
| Aplicação | Definir os contratos de aplicação do fechamento financeiro do evento | SUB-03 |
| Aplicação | Implementar o serviço de aplicação do fechamento financeiro do evento | SUB-04 |
| Interface (API) / Testes | Expor o fechamento financeiro via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do fechamento financeiro do evento | SUB-06 |
| Documentação | Documentar tecnicamente o fechamento financeiro | SUB-07 |

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
| H01 | Rota HTTP `POST /events/:eventId/financial-closing` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 409, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Nomes de classes/arquivos em inglês (`Event`, `closeEventFinancially`), seguindo o padrão do código existente | Convenção não documentada |
| H04 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC11-03 | O resultado financeiro é a diferença entre as entradas e as despesas do evento | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Qual a regra exata para considerar o fechamento concluído? (pendência de alta prioridade). |
| D02 | Como o sistema identifica "despesas não registradas"? |
| D03 | Patrocínios vinculados à atlética (e não ao evento) entram no fechamento? |
