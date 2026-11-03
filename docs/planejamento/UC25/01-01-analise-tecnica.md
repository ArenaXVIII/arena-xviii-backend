# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC25 — Registrar Movimentação de Estoque
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC25; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC25 |
| Nome | Registrar Movimentação de Estoque |
| Módulo | Estoque |
| Sustentação | Média |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Registrar uma entrada ou retirada de material, atualizando sua quantidade e preservando o histórico.

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
| Pré-condição | O material existe. |
| Pós-condição (sucesso) | A movimentação está registrada, a quantidade do material foi atualizada e ambos foram persistidos. |
| Pós-condição (falha) | Nenhuma alteração é persistida. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o material, o tipo de movimentação e a quantidade. |
| FP-2 | O sistema localiza o material. |
| FP-3 | O sistema verifica que o tipo e a quantidade são válidos. |
| FP-4 | Em caso de retirada, o sistema verifica que há quantidade disponível. |
| FP-5 | O sistema registra a movimentação e atualiza a quantidade do material. |
| FP-6 | O sistema persiste a movimentação e o material. |
| FP-7 | O sistema retorna a confirmação com a nova quantidade. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Material não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Tipo inválido ou quantidade menor ou igual a zero | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Retirada maior que a quantidade disponível | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC25-01 | Toda movimentação está relacionada a um material | Invariante possível de Movimentação (seção 10) |
| RN-UC25-02 | A movimentação é do tipo entrada ou retirada | Definição de Movimentação de Estoque (seção 3) |
| RN-UC25-03 | A quantidade movimentada deve ser maior que zero | Objeto de Valor Quantidade (seção 5) — *Proposta técnica — validar* |
| RN-UC25-04 | Uma retirada não pode ser maior que a quantidade disponível | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: material não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: tipo inválido ou quantidade menor ou igual a zero | Entrada / regra de domínio | FA02 |
| Rejeitar quando: retirada maior que a quantidade disponível | Entrada / regra de domínio | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Movimentação de Estoque (`StockMovement`) | Entidade de domínio | Nova entidade |
| Material (`Material`) | Entidade relacionada | Deve existir; planejada no UC24 |
| Quantidade (`Quantity`) | Objeto de Valor | Reutilizado; planejado no UC24 |
| Operação `registerStockMovement` | Serviço de aplicação | Módulo Estoque |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `materialId`, `type (entrada/retirada)`, `quantity` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Movimentação de Estoque e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do registro de movimentação de estoque | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do registro de movimentação de estoque | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de movimentações | SUB-04 |
| Interface (API) / Testes | Expor o registro de movimentação via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do registro de movimentação de estoque | SUB-06 |
| Documentação | Documentar tecnicamente o registro de movimentação | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso do módulo:** o `InventoryModule` é criado no UC24. Se este caso for implementado antes, a criação do módulo passa a fazer parte desta Sub-Issue de API.
5. **Objetos de Valor compartilhados:** Valor Monetário (UC02), Período (UC22) e Quantidade (UC24) são planejados uma única vez e reutilizados, evitando duplicação.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /materials/:materialId/movements` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 422, FA03 → 422, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`StockMovement`, `registerStockMovement`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC25-03 | A quantidade movimentada deve ser maior que zero | Marcada na especificação como "Objeto de Valor Quantidade (seção 5) — Proposta técnica — validar" |
| RN-UC25-04 | Uma retirada não pode ser maior que a quantidade disponível | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | A retirada precisa registrar quem retirou ou para qual atividade/evento? |
| D02 | Há devolução de material emprestado? |
