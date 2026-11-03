# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC05 — Registrar Inscrição em Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC05; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC05 |
| Nome | Registrar Inscrição em Evento |
| Módulo | Eventos |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar a inscrição ou compra de um participante em um evento que está com vendas/inscrições abertas.

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
| Pós-condição (sucesso) | A inscrição está registrada, vinculada ao evento, aguardando confirmação, e foi persistida. |
| Pós-condição (falha) | Nenhuma inscrição é criada. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o identificador do evento e os dados do participante. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento está Em Organização. |
| FP-4 | O sistema verifica que os dados do participante foram informados. |
| FP-5 | O sistema cria a inscrição como pendente, vinculada ao evento. |
| FP-6 | O sistema persiste a inscrição. |
| FP-7 | O sistema retorna a confirmação do registro. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento em estado diferente de Em Organização | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Dados do participante ausentes | FP-4 | Operação rejeitada informando os dados ausentes, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC05-01 | Somente eventos no estado Em Organização aceitam inscrições | Definição do estado Em Organização (seção 11) |
| RN-UC05-02 | A inscrição deve conter os dados do participante | Operação "controlar vendas/inscrições" (seção 6.2) |
| RN-UC05-03 | Toda inscrição pertence a um único evento | Cardinalidade Evento recebe Inscrição 1 : 0..* (seção 8) |
| RN-UC05-04 | A inscrição é registrada como pendente até ser confirmada (UC06) | RN02 — *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento em estado diferente de em organização | Entrada / regra de domínio | FA02 |
| Rejeitar quando: dados do participante ausentes | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Inscrição em Evento (`Registration`) | Entidade de domínio | Nova entidade |
| Evento (`Event`) | Entidade relacionada | Deve existir; planejada no UC03 |
| Operação `registerParticipant` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `eventId`, `participant (dados do participante)` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Inscrição em Evento e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do registro de inscrição em evento | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do registro de inscrição em evento | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de inscrições | SUB-04 |
| Interface (API) / Testes | Expor o registro de inscrição via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do registro de inscrição em evento | SUB-06 |
| Documentação | Documentar tecnicamente o registro de inscrição | SUB-07 |

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
| H01 | Rota HTTP `POST /events/:eventId/registrations` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Registration`, `registerParticipant`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC05-04 | A inscrição é registrada como pendente até ser confirmada (UC06) | Marcada na especificação como "RN02 — Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Inscrição e venda de ingresso são o mesmo conceito? (pendência de alta prioridade). |
| D02 | Quais dados do participante são necessários? O participante precisa ser um Associado? |
| D03 | Existe limite de vagas ou de ingressos? |
