# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC20 — Cadastrar Equipe
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC20; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC20 |
| Nome | Cadastrar Equipe |
| Módulo | Esportes |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar uma equipe formada dentro de uma modalidade.

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
| Pré-condição | A modalidade existe. |
| Pós-condição (sucesso) | A equipe está cadastrada, vinculada à modalidade, e foi persistida. |
| Pós-condição (falha) | Nenhuma equipe é criada. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa a modalidade e o nome da equipe. |
| FP-2 | O sistema localiza a modalidade. |
| FP-3 | O sistema verifica que o nome foi informado. |
| FP-4 | O sistema cria a equipe vinculada à modalidade. |
| FP-5 | O sistema persiste a equipe. |
| FP-6 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Modalidade não encontrada | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Nome não informado | FP-3 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-5 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC20-01 | Toda equipe pertence a uma modalidade | Modalidade organiza Equipe 1 : 0..* — hipótese (seção 8) |
| RN-UC20-02 | A equipe deve possuir um nome não vazio | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: modalidade não encontrada | Processamento (existência) | FA01 |
| Rejeitar quando: nome não informado | Entrada / regra de domínio | FA02 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Equipe (`Team`) | Entidade de domínio | Nova entidade |
| Modalidade (`Modality`) | Entidade relacionada | Deve existir; planejada no UC19 |
| Operação `createTeam` | Serviço de aplicação | Módulo Esportes |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `modalityId`, `name` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Equipe e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do cadastro de equipe | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do cadastro de equipe | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de equipes | SUB-04 |
| Interface (API) / Testes | Expor o cadastro de equipe via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do cadastro de equipe | SUB-06 |
| Documentação | Documentar tecnicamente o cadastro de equipe | SUB-07 |

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
| H01 | Rota HTTP `POST /modalities/:modalityId/teams` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Team`, `createTeam`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC20-01 | Toda equipe pertence a uma modalidade | Marcada na especificação como "Modalidade organiza Equipe 1 : 0.. — hipótese (seção 8)" |
| RN-UC20-02 | A equipe deve possuir um nome não vazio | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Como os atletas são incluídos na equipe? Devem estar vinculados à modalidade (UC18)? |
| D02 | Existe número mínimo ou máximo de integrantes? |
