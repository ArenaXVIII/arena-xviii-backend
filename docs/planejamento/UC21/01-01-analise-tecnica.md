# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC21 — Registrar Treino
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC21; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho — requer modelagem

> ⚠️ **Especificação que requer modelagem.** A própria especificação recomenda: Detalhar o fluxo de treinos (presença, local) antes de iniciar a implementação. Este planejamento é preliminar e nenhum item deve sair de `Backlog` antes dessa modelagem.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC21 |
| Nome | Registrar Treino |
| Módulo | Esportes |
| Sustentação | Baixa |
| Status da especificação | Rascunho — requer modelagem |

## 2. Objetivo e escopo

**Objetivo:** Registrar uma ocorrência de treino de uma equipe.

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
| Pré-condição | A equipe existe. |
| Pós-condição (sucesso) | O treino está registrado, vinculado à equipe, e foi persistido. |
| Pós-condição (falha) | Nenhum treino é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa a equipe, a data e o horário do treino. |
| FP-2 | O sistema localiza a equipe. |
| FP-3 | O sistema verifica que data e horário foram informados. |
| FP-4 | O sistema registra o treino vinculado à equipe. |
| FP-5 | O sistema persiste o treino. |
| FP-6 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Equipe não encontrada | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Data ou horário não informados | FP-3 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-5 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC21-01 | Todo treino pertence a uma equipe | Equipe realiza Treino 1 : 0..* — hipótese (seção 8) |
| RN-UC21-02 | O treino deve possuir data e horário | Cada ocorrência é um acontecimento específico (seção 4) — *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: equipe não encontrada | Processamento (existência) | FA01 |
| Rejeitar quando: data ou horário não informados | Entrada / regra de domínio | FA02 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Treino (`Training`) | Entidade de domínio | Nova entidade |
| Equipe (`Team`) | Entidade relacionada | Deve existir; planejada no UC20 |
| Operação `registerTraining` | Serviço de aplicação | Módulo Esportes |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `teamId`, `date`, `time` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Treino e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do registro de treino | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do registro de treino | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de treinos | SUB-04 |
| Interface (API) / Testes | Expor o registro de treino via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do registro de treino | SUB-06 |
| Documentação | Documentar tecnicamente o registro de treino | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso do módulo:** o `SportsModule` é criado no UC19. Se este caso for implementado antes, a criação do módulo passa a fazer parte desta Sub-Issue de API.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-6).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /teams/:teamId/trainings` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Training`, `registerTraining`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC21-01 | Todo treino pertence a uma equipe | Marcada na especificação como "Equipe realiza Treino 1 : 0.. — hipótese (seção 8)" |
| RN-UC21-02 | O treino deve possuir data e horário | Marcada na especificação como "Cada ocorrência é um acontecimento específico (seção 4) — Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | O fluxo de treinos não foi detalhado (pendência de média prioridade). |
| D02 | Há registro de presença dos atletas? Local do treino? |
| D03 | Recomendação: detalhar o fluxo de treinos antes de planejar a implementação. |
