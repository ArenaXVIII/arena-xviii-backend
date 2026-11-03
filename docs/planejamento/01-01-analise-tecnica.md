# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC03 — Divulgar Evento (primeiro slice arquitetural)
**Documento de origem:** `docs/casos-de-uso.md`, seção 5 (especificação), complementado por `docs/visao-geral.md` (RN01, seção 9; invariante do Evento, seção 10; ciclo de vida, seção 11)
**Responsável pelo planejamento:** LunaRibeiro

---

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC03 |
| Nome | Divulgar Evento |
| Módulo | Eventos |
| Sustentação | Alta (deriva da RN01 e de transição confirmada do ciclo de vida) |
| Justificativa de escolha como primeiro slice | RN01 é a regra de maior impacto sobre o modelo e a transição Planejado → Divulgado é central no ciclo de vida do Evento |

## 2. Objetivo e escopo

**Objetivo:** permitir que o ator altere o estado de um Evento de **Planejado** para **Divulgado**, desde que as informações de planejamento exigidas pela RN01 estejam definidas.

**Dentro do escopo:**
- localização do evento pelo identificador;
- verificação do estado atual (Planejado);
- verificação da completude do planejamento (RN01);
- transição de estado e persistência;
- retorno de confirmação ou de rejeição com motivo.

**Fora do escopo (não documentado para o UC03):**
- canais de divulgação (redes sociais, e-mail etc.) — o caso de uso trata apenas da mudança de estado;
- cadastro e definição de planejamento do evento (UC01 e UC02);
- autenticação e autorização (funções organizacionais ainda pendentes de governança).

## 3. Atores

| Ator | Papel | Observação |
|---|---|---|
| Diretoria | Ator principal; solicita a divulgação | **Provisório.** As funções organizacionais e permissões não foram definidas (Pendências de Governança) |
| Sistema | Valida as regras, altera o estado e persiste | — |

## 4. Pré-condições e pós-condições

| Tipo | Descrição |
|---|---|
| Pré-condição | O evento existe e está no estado Planejado |
| Pós-condição (sucesso) | O evento está no estado Divulgado e a alteração foi persistida |
| Pós-condição (falha) | O evento permanece inalterado |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator solicita a divulgação informando o identificador do evento |
| FP-2 | O sistema localiza o evento |
| FP-3 | O sistema verifica que o evento está no estado Planejado |
| FP-4 | O sistema verifica que as informações exigidas pela RN01 estão definidas |
| FP-5 | O sistema altera o estado do evento para Divulgado |
| FP-6 | O sistema persiste a alteração |
| FP-7 | O sistema retorna a confirmação da divulgação |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada; nada é persistido |
| FA02 | Evento já divulgado | FP-3 | Operação rejeitada; nada é persistido |
| FA03 | Evento em estado diferente de Planejado | FP-3 | Operação rejeitada; nada é persistido |
| FA04 | Informações de planejamento incompletas | FP-4 | Operação rejeitada **informando os campos ausentes**; nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída; falha informada ao ator |

**Ordem de avaliação documentada:** existência → já divulgado (FA02) → estado Planejado (FA03) → completude RN01 (FA04) → persistência (FE01).

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN01 | Um evento só pode ser divulgado quando data, local, orçamento, responsáveis e atrações ou atividades estiverem definidos | `visao-geral.md`, seção 9 |
| RN-UC03-01 | Somente eventos no estado Planejado podem ser divulgados | Ciclo de vida do Evento |
| RN-UC03-02 | Um evento já divulgado não pode ser divulgado novamente | Ciclo de vida do Evento |
| RN-UC03-03 | A alteração de estado só é persistida quando todas as condições forem atendidas | Invariante do Evento (`visao-geral.md`, seção 10) |

## 7. Validações

| Validação | Tipo | Regra de origem |
|---|---|---|
| Identificador do evento informado e correspondente a um evento existente | Entrada / processamento | FP-1, FP-2, FA01 |
| Estado atual diferente de Divulgado | Processamento | RN-UC03-02, FA02 |
| Estado atual igual a Planejado | Processamento | RN-UC03-01, FA03 |
| Data definida | Processamento | RN01 |
| Local definido | Processamento | RN01 |
| Orçamento definido | Processamento | RN01 |
| Ao menos um responsável definido | Processamento | RN01 |
| Ao menos uma atração ou atividade definida | Processamento | RN01 |
| Nenhuma persistência em caso de rejeição | Processamento | RN-UC03-03, pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Evento | Entidade de domínio (identidade própria) | Atributos relevantes: identificador, estado, data, local, orçamento, responsáveis, atrações/atividades |
| Estado do Evento | Enumeração | Planejamento, Planejado, Divulgado, Em Organização, Remarcado, Cancelado, Realizado, Encerrado |
| Divulgar | Operação de domínio | Transição Planejado → Divulgado protegida pela RN01 |
| Repositório de eventos | Contrato (porta) | Operações: localizar por identificador; salvar |
| Resposta de divulgação | Contrato de saída (DTO) | Confirmação com identificador, novo estado e data de atualização |
| Erros de domínio | Contratos de erro | Um por fluxo de rejeição (FA01–FA04); FE01 a definir |

## 9. Componentes e camadas arquiteturais

A stack consta como "a definir" no README, mas o repositório já está configurado com **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, gerenciado por **pnpm**. As camadas abaixo seguem a organização já iniciada em `src/modules/events/`.

| Camada | Componente | Situação no repositório |
|---|---|---|
| Domínio | `Event` (entidade), `EventStatus` (enum), exceções de domínio | Código preexistente (não validado neste planejamento) |
| Aplicação | `EventsService.publishEvent`, `PublishEventResponseDto`, porta `IEventsRepository` | Código preexistente (não validado) |
| Infraestrutura | Implementação concreta de `IEventsRepository` | Inexistente |
| Interface (API HTTP) | Controller de eventos, mapeamento de exceções para HTTP, `EventsModule` | Inexistente; `AppModule` não registra o módulo de eventos |
| Testes | Unitários do serviço (`events.service.spec.ts`) | Preexistentes; não cobrem FE01 nem a entidade isoladamente; não há e2e do UC03 |

## 10. Considerações arquiteturais preliminares

1. **Regra no domínio:** a RN01 e as transições de estado ficam na própria entidade `Event` (método `publish`), mantendo a invariante protegida independentemente da camada de entrada. O código preexistente já segue essa abordagem.
2. **Inversão de dependência:** o serviço depende da porta `IEventsRepository` (token `EVENTS_REPOSITORY`), o que permite trocar o adaptador de persistência sem alterar domínio e aplicação.
3. **Slice vertical:** a conclusão do UC03 exige atravessar todas as camadas até a interface HTTP, conforme a estratégia de slices do README.
4. **Localização das exceções:** as exceções específicas de evento estão em `src/common/exceptions/`. *Proposta técnica:* avaliar movê-las para `src/modules/events/` (decisão da equipe; não é requisito).
5. **Idioma das mensagens:** as exceções usam mensagens em inglês e o DTO de sucesso usa português. *Proposta técnica:* padronizar (decisão da equipe).

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações (seção 5.2).
- Rejeição sem persistência para FA01–FA04 (RN-UC03-03).
- FA04 deve **informar os campos ausentes**.
- FE01 deve **informar a falha ao ator**.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Endpoint `PATCH /events/:eventId/publish` | A documentação não define o contrato HTTP |
| H02 | Mapeamento HTTP: FA01 → 404; FA02 e FA03 → 409; FA04 → 422 (com lista de campos); FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial **em memória** | A tecnologia de banco de dados não foi definida; o modelo conceitual não antecipa tecnologia |
| H04 | Exceção específica para FE01 (por exemplo, `EventPersistenceException`) | Não existe tratamento explícito no código |
| H05 | Sem controle de acesso no UC03 nesta etapa | Funções e permissões ainda são pendência de governança |

### 11.3 Dúvidas abertas (não inventadas como regra)

| ID | Dúvida | Impacto |
|---|---|---|
| D01 | Orçamento igual a zero é considerado "definido" pela RN01? | O código preexistente considera apenas `null` como ausente |
| D02 | Data de evento no passado impede a divulgação? | A RN01 exige apenas que a data esteja "definida"; nenhuma regra temporal foi documentada |
| D03 | O arquivo `casos-de-uso.md` deve ser versionado em `docs/`? | Hoje `docs/` contém apenas `visao-geral.md`; a referência formal das Issues depende do arquivo estar no repositório |
| D04 | Qual ator real (função organizacional) executará a divulgação? | Afeta autorização futura |
