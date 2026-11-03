# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC24 — Cadastrar Material
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC24; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC24 |
| Nome | Cadastrar Material |
| Módulo | Estoque |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar um material esportivo ou uniforme controlado pela atlética.

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
| Pós-condição (sucesso) | O material está cadastrado, com quantidade inicial, e foi persistido. |
| Pós-condição (falha) | Nenhum material é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o nome e a quantidade inicial do material. |
| FP-2 | O sistema verifica que o nome foi informado. |
| FP-3 | O sistema verifica que a quantidade é válida. |
| FP-4 | O sistema cria o material. |
| FP-5 | O sistema persiste o material. |
| FP-6 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Nome não informado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Quantidade ausente ou negativa | FP-3 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-5 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC24-01 | O material deve possuir um nome não vazio | *Proposta técnica — validar* |
| RN-UC24-02 | A quantidade do material não pode ser negativa | Objeto de Valor Quantidade (seção 5) — *Proposta técnica — validar* |
| RN-UC24-03 | O material é controlado por quantidade | Hipótese do modelo conceitual (seção 19) |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: nome não informado | Entrada / regra de domínio | FA01 |
| Rejeitar quando: quantidade ausente ou negativa | Entrada / regra de domínio | FA02 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Material (`Material`) | Entidade de domínio | Nova entidade |
| Quantidade (`Quantity`) | Objeto de Valor | Planejado neste caso de uso (reutilizável) |
| Operação `createMaterial` | Serviço de aplicação | Módulo Estoque |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `name`, `initialQuantity` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar o Objeto de Valor Quantidade | SUB-01 |
| Domínio | Modelar a entidade Material e suas regras | SUB-02 |
| Aplicação | Definir os contratos de aplicação do cadastro de material | SUB-03 |
| Aplicação | Implementar o serviço de aplicação do cadastro de material | SUB-04 |
| Infraestrutura | Implementar o adaptador de persistência de materiais | SUB-05 |
| Interface (API) / Testes | Expor o cadastro de material via API HTTP | SUB-06 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do cadastro de material | SUB-07 |
| Documentação | Documentar tecnicamente o cadastro de material | SUB-08 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Criação do módulo:** este é o primeiro caso de uso do módulo Estoque; ele cria o `InventoryModule`, que será reutilizado pelos demais casos do módulo.
5. **Objetos de Valor compartilhados:** Valor Monetário (UC02), Período (UC22) e Quantidade (UC24) são planejados uma única vez e reutilizados, evitando duplicação.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-6).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /materials` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 422, FA02 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Critério de validade de Quantidade (Objeto de Valor `Quantity`, ver SUB-01) | O modelo conceitual cita o Objeto de Valor sem definir o critério de validade |
| H05 | Nomes de classes/arquivos em inglês (`Material`, `createMaterial`), seguindo o padrão do código existente | Convenção não documentada |
| H06 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC24-01 | O material deve possuir um nome não vazio | Marcada na especificação como "Proposta técnica — validar" |
| RN-UC24-02 | A quantidade do material não pode ser negativa | Marcada na especificação como "Objeto de Valor Quantidade (seção 5) — Proposta técnica — validar" |
| RN-UC24-03 | O material é controlado por quantidade | Marcada na especificação como "Hipótese do modelo conceitual (seção 19)" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Todos os materiais são controlados só por quantidade ou alguns precisam de identificação individual? (pendência de média prioridade). |
| D02 | Uniformes têm tamanho? Cada tamanho é um material diferente? |
