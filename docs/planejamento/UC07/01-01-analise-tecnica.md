# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC07 — Acompanhar Tarefas do Evento
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC07; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho — requer modelagem

> ⚠️ **Especificação que requer modelagem.** A própria especificação recomenda: Modelar Tarefa no modelo conceitual (Entidade? estados? responsável e prazo?) antes de iniciar a implementação. Este planejamento é preliminar e nenhum item deve sair de `Backlog` antes dessa modelagem.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC07 |
| Nome | Acompanhar Tarefas do Evento |
| Módulo | Eventos |
| Sustentação | Baixa |
| Status da especificação | Rascunho — requer modelagem |

## 2. Objetivo e escopo

**Objetivo:** Registrar e acompanhar as tarefas de organização de um evento.

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
| Pós-condição (sucesso) | A tarefa está registrada ou atualizada e foi persistida. |
| Pós-condição (falha) | Nenhuma alteração é persistida. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o identificador do evento e a descrição da tarefa. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento está Em Organização. |
| FP-4 | O sistema verifica que a descrição foi informada. |
| FP-5 | O sistema registra a tarefa vinculada ao evento. |
| FP-6 | O sistema persiste a tarefa. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento em estado diferente de Em Organização | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Descrição não informada | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC07-01 | Tarefas só podem ser registradas para eventos Em Organização | Definição do estado Em Organização: "tarefas estão sendo acompanhadas" (seção 11) |
| RN-UC07-02 | Toda tarefa pertence a um evento | *Proposta técnica — validar* |
| RN-UC07-03 | A tarefa deve possuir uma descrição não vazia | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento em estado diferente de em organização | Entrada / regra de domínio | FA02 |
| Rejeitar quando: descrição não informada | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Tarefa (`Task`) | Entidade de domínio | Nova entidade |
| Evento (`Event`) | Entidade relacionada | Deve existir; planejada no UC03 |
| Operação `registerTask` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `eventId`, `description` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Tarefa e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do acompanhamento de tarefas do evento | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do acompanhamento de tarefas do evento | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de tarefas | SUB-04 |
| Interface (API) / Testes | Expor o registro de tarefas via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do acompanhamento de tarefas do evento | SUB-06 |
| Documentação | Documentar tecnicamente o registro de tarefas | SUB-07 |

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
| H01 | Rota HTTP `POST /events/:eventId/tasks` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Task`, `registerTask`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC07-02 | Toda tarefa pertence a um evento | Marcada na especificação como "Proposta técnica — validar" |
| RN-UC07-03 | A tarefa deve possuir uma descrição não vazia | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Tarefa não foi modelada no modelo conceitual: é uma Entidade? Quais estados possui? |
| D02 | Tarefas têm responsável e prazo? |
| D03 | Recomendação: modelar Tarefa no modelo conceitual antes de planejar a implementação deste caso de uso. |
