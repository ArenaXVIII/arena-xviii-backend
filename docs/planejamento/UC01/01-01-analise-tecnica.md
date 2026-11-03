# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC01 — Cadastrar Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC01; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC01 |
| Nome | Cadastrar Evento |
| Módulo | Eventos |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar um novo evento da atlética, que passa a existir no estado Planejamento enquanto suas informações principais são definidas.

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
| Pré-condição | Nenhuma. |
| Pós-condição (sucesso) | O evento existe, está no estado Planejamento e foi persistido. |
| Pós-condição (falha) | Nenhum evento é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator solicita o cadastro de um evento informando seu nome. |
| FP-2 | O sistema verifica que o nome foi informado. |
| FP-3 | O sistema cria o evento no estado Planejamento. |
| FP-4 | O sistema persiste o evento. |
| FP-5 | O sistema retorna a confirmação do cadastro com o identificador do evento. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Nome não informado ou vazio | FP-2 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-4 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC01-01 | Todo evento cadastrado inicia no estado Planejamento | Ciclo de vida do Evento (seção 11) |
| RN-UC01-02 | O evento deve possuir um nome não vazio | *Proposta técnica — validar* |
| RN-UC01-03 | O evento só é persistido quando todas as condições forem atendidas | Padrão adotado no UC03 |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: nome não informado ou vazio | Entrada / regra de domínio | FA01 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Evento (`Event`) | Entidade de domínio | Nova entidade |
| Operação `createEvent` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `name` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Implementar no domínio a criação de evento | SUB-01 |
| Aplicação | Definir os contratos de aplicação do cadastro de evento | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do cadastro de evento | SUB-03 |
| Infraestrutura | Estender o adaptador de persistência de eventos para o cadastro | SUB-04 |
| Interface (API) / Testes | Expor o cadastro de evento via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do cadastro de evento | SUB-06 |
| Documentação | Documentar tecnicamente o cadastro de evento | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso da infraestrutura do UC03:** este caso de uso reutiliza o `EventsModule`, o `EventsController` e o adaptador de eventos planejados nas Issues #13 a #17, que ainda estão abertas.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-5).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /events` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Nomes de classes/arquivos em inglês (`Event`, `createEvent`), seguindo o padrão do código existente | Convenção não documentada |
| H04 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC01-02 | O evento deve possuir um nome não vazio | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Quais informações são obrigatórias no cadastro, além do nome? O modelo conceitual cita apenas que, em Planejamento, as informações principais ainda estão sendo definidas. |
| D02 | Data, local, orçamento e responsáveis podem ser informados já no cadastro ou apenas no UC02? |
