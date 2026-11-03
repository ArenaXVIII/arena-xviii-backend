# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC16 — Registrar Patrocínio
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC16; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC16 |
| Nome | Registrar Patrocínio |
| Módulo | Patrocínios |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar um acordo de patrocínio firmado por um patrocinador, com valor e período definidos.

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
| Pré-condição | O patrocinador existe. |
| Pós-condição (sucesso) | O patrocínio está registrado, vinculado ao patrocinador, e foi persistido. |
| Pós-condição (falha) | Nenhum patrocínio é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o patrocinador, o valor e o período do patrocínio. |
| FP-2 | O sistema localiza o patrocinador. |
| FP-3 | O sistema verifica que o valor é válido. |
| FP-4 | O sistema verifica que o período é válido. |
| FP-5 | O sistema registra o patrocínio. |
| FP-6 | O sistema persiste o patrocínio. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Patrocinador não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Valor ausente ou inválido | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Período ausente ou inválido | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC16-01 | Todo patrocínio pertence a um patrocinador | Patrocinador estabelece Patrocínio 1 : 0..* (seção 8) |
| RN-UC16-02 | O patrocínio deve possuir um Valor Monetário válido | Patrocínio define Valor Monetário (seção 12) |
| RN-UC16-03 | O patrocínio deve possuir um Período válido (início anterior ou igual ao fim) | Período usado em patrocínios (seção 5) |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: patrocinador não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: valor ausente ou inválido | Entrada / regra de domínio | FA02 |
| Rejeitar quando: período ausente ou inválido | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Patrocínio (`Sponsorship`) | Entidade de domínio | Nova entidade |
| Patrocinador (`Sponsor`) | Entidade relacionada | Deve existir; planejada no UC15 |
| Valor Monetário (`Money`) | Objeto de Valor | Reutilizado; planejado no UC02 |
| Período (`Period`) | Objeto de Valor | Reutilizado; planejado no UC22 |
| Operação `registerSponsorship` | Serviço de aplicação | Módulo Patrocínios |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `sponsorId`, `amount`, `period (start, end)` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Patrocínio e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do registro de patrocínio | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do registro de patrocínio | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de patrocínios | SUB-04 |
| Interface (API) / Testes | Expor o registro de patrocínio via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do registro de patrocínio | SUB-06 |
| Documentação | Documentar tecnicamente o registro de patrocínio | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso do módulo:** o `SponsorshipsModule` é criado no UC15. Se este caso for implementado antes, a criação do módulo passa a fazer parte desta Sub-Issue de API.
5. **Objetos de Valor compartilhados:** Valor Monetário (UC02), Período (UC22) e Quantidade (UC24) são planejados uma única vez e reutilizados, evitando duplicação.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /sponsors/:sponsorId/sponsorships` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 422, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Sponsorship`, `registerSponsorship`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | O patrocínio se vincula à atlética, a um evento específico ou aos dois? (pendência de média prioridade). |
| D02 | Existem patrocínios sem valor monetário (ex.: permuta de produtos)? |
