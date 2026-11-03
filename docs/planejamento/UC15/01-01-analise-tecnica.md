# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC15 — Cadastrar Patrocinador
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC15; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC15 |
| Nome | Cadastrar Patrocinador |
| Módulo | Patrocínios |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar uma empresa ou organização parceira que poderá estabelecer patrocínios com a atlética.

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
| Pós-condição (sucesso) | O patrocinador está cadastrado e foi persistido. |
| Pós-condição (falha) | Nenhum patrocinador é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa os dados do patrocinador. |
| FP-2 | O sistema verifica que o nome foi informado. |
| FP-3 | O sistema verifica que não há patrocinador com o mesmo identificador. |
| FP-4 | O sistema cria o patrocinador. |
| FP-5 | O sistema persiste o patrocinador. |
| FP-6 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Nome não informado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Patrocinador já cadastrado | FP-3 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-5 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC15-01 | O patrocinador deve possuir um nome não vazio | Patrocinador é organização identificável (seção 5) — *Proposta técnica — validar* |
| RN-UC15-02 | Não podem existir dois patrocinadores com o mesmo identificador (ex.: CNPJ) | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: nome não informado | Entrada / regra de domínio | FA01 |
| Rejeitar quando: patrocinador já cadastrado | Processamento (unicidade) | FA02 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Patrocinador (`Sponsor`) | Entidade de domínio | Nova entidade |
| Operação `createSponsor` | Serviço de aplicação | Módulo Patrocínios |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `name`, `identifier (ex.: CNPJ — validar)` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Patrocinador e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do cadastro de patrocinador | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do cadastro de patrocinador | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de patrocinadores | SUB-04 |
| Interface (API) / Testes | Expor o cadastro de patrocinador via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do cadastro de patrocinador | SUB-06 |
| Documentação | Documentar tecnicamente o cadastro de patrocinador | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Criação do módulo:** este é o primeiro caso de uso do módulo Patrocínios; ele cria o `SponsorshipsModule`, que será reutilizado pelos demais casos do módulo.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-6).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /sponsors` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 422, FA02 → 409, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`Sponsor`, `createSponsor`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC15-01 | O patrocinador deve possuir um nome não vazio | Marcada na especificação como "Patrocinador é organização identificável (seção 5) — Proposta técnica — validar" |
| RN-UC15-02 | Não podem existir dois patrocinadores com o mesmo identificador (ex.: CNPJ) | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Quais dados identificam o patrocinador? Pessoas físicas podem ser patrocinadoras? |
