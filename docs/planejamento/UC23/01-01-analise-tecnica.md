# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC23 — Inscrever Equipe em Campeonato
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC23; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC23 |
| Nome | Inscrever Equipe em Campeonato |
| Módulo | Esportes |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar a participação de uma equipe da atlética em um campeonato.

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
| Pré-condição | A equipe e o campeonato existem. |
| Pós-condição (sucesso) | A participação está registrada e foi persistida. |
| Pós-condição (falha) | Nenhuma participação é criada. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa a equipe e o campeonato. |
| FP-2 | O sistema localiza a equipe. |
| FP-3 | O sistema localiza o campeonato. |
| FP-4 | O sistema verifica que a equipe ainda não está inscrita no campeonato. |
| FP-5 | O sistema registra a participação. |
| FP-6 | O sistema persiste a participação. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Equipe não encontrada | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Campeonato não encontrado | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Equipe já inscrita no campeonato | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC23-01 | A inscrição exige uma equipe e um campeonato existentes | Equipe participa de Campeonato (seção 7) |
| RN-UC23-02 | Uma equipe não pode ser inscrita duas vezes no mesmo campeonato | *Proposta técnica — validar* |
| RN-UC23-03 | Uma equipe pode participar de vários campeonatos e um campeonato pode reunir várias equipes | Cardinalidade N:N — hipótese (seção 8) |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: equipe não encontrada | Processamento (existência) | FA01 |
| Rejeitar quando: campeonato não encontrado | Processamento (existência) | FA02 |
| Rejeitar quando: equipe já inscrita no campeonato | Processamento (unicidade) | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Participação em Campeonato (`TeamChampionship`) | Entidade de domínio | Nova entidade |
| Equipe (`Team`) | Entidade relacionada | Deve existir; planejada no UC20 |
| Campeonato (`Championship`) | Entidade relacionada | Deve existir; planejada no UC22 |
| Operação `enrollTeam` | Serviço de aplicação | Módulo Esportes |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `championshipId`, `teamId` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Participação em Campeonato e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação da inscrição de equipe em campeonato | SUB-02 |
| Aplicação | Implementar o serviço de aplicação da inscrição de equipe em campeonato | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de participações | SUB-04 |
| Interface (API) / Testes | Expor a inscrição de equipe em campeonato via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) da inscrição de equipe em campeonato | SUB-06 |
| Documentação | Documentar tecnicamente a inscrição de equipe em campeonato | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso do módulo:** o `SportsModule` é criado no UC19. Se este caso for implementado antes, a criação do módulo passa a fazer parte desta Sub-Issue de API.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /championships/:championshipId/teams` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 404, FA03 → 409, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`TeamChampionship`, `enrollTeam`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC23-02 | Uma equipe não pode ser inscrita duas vezes no mesmo campeonato | Marcada na especificação como "Proposta técnica — validar" |
| RN-UC23-03 | Uma equipe pode participar de vários campeonatos e um campeonato pode reunir várias equipes | Marcada na especificação como "Cardinalidade N:N — hipótese (seção 8)" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | A modalidade da equipe precisa ser a mesma do campeonato? |
| D02 | Existe prazo de inscrição? |
