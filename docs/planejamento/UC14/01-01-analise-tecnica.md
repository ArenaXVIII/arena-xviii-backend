# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC14 — Controlar Mensalidades
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC14; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho — requer modelagem

> ⚠️ **Especificação que requer modelagem.** A própria especificação recomenda: Incluir Mensalidade no modelo conceitual (valor, periodicidade e consequências da inadimplência) antes de iniciar a implementação. Este planejamento é preliminar e nenhum item deve sair de `Backlog` antes dessa modelagem.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC14 |
| Nome | Controlar Mensalidades |
| Módulo | Financeiro |
| Sustentação | Baixa |
| Status da especificação | Rascunho — requer modelagem |

## 2. Objetivo e escopo

**Objetivo:** Registrar o pagamento de mensalidades dos associados.

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
| Pré-condição | O associado existe. |
| Pós-condição (sucesso) | O pagamento da mensalidade está registrado e foi persistido. |
| Pós-condição (falha) | Nenhum registro é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o associado, a competência e o valor. |
| FP-2 | O sistema localiza o associado. |
| FP-3 | O sistema verifica que o valor é válido. |
| FP-4 | O sistema verifica que não há mensalidade registrada para a mesma competência. |
| FP-5 | O sistema registra a mensalidade. |
| FP-6 | O sistema persiste o registro. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Associado não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Valor ausente ou inválido | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Mensalidade já registrada para a competência | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC14-01 | Toda mensalidade pertence a um associado | *Proposta técnica — validar* |
| RN-UC14-02 | A mensalidade deve possuir um Valor Monetário válido | Objeto de Valor Valor Monetário (seção 5) |
| RN-UC14-03 | Um associado não pode ter duas mensalidades registradas para a mesma competência (mês/ano) | *Proposta técnica — validar* |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: associado não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: valor ausente ou inválido | Entrada / regra de domínio | FA02 |
| Rejeitar quando: mensalidade já registrada para a competência | Processamento (unicidade) | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Mensalidade (`MonthlyFee`) | Entidade de domínio | Nova entidade |
| Associado (`Member`) | Entidade relacionada | Deve existir; planejada no UC17 |
| Valor Monetário (`Money`) | Objeto de Valor | Reutilizado; planejado no UC02 |
| Operação `registerMonthlyFee` | Serviço de aplicação | Módulo Financeiro |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `memberId`, `competence (mês/ano)`, `amount` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Mensalidade e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do controle de mensalidades | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do controle de mensalidades | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de mensalidades | SUB-04 |
| Interface (API) / Testes | Expor o registro de mensalidade via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do controle de mensalidades | SUB-06 |
| Documentação | Documentar tecnicamente o registro de mensalidade | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso do módulo:** o `FinancialModule` é criado no UC12. Se este caso for implementado antes, a criação do módulo passa a fazer parte desta Sub-Issue de API.
5. **Objetos de Valor compartilhados:** Valor Monetário (UC02), Período (UC22) e Quantidade (UC24) são planejados uma única vez e reutilizados, evitando duplicação.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /members/:memberId/monthly-fees` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 422, FA03 → 409, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`MonthlyFee`, `registerMonthlyFee`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC14-01 | Toda mensalidade pertence a um associado | Marcada na especificação como "Proposta técnica — validar" |
| RN-UC14-03 | Um associado não pode ter duas mensalidades registradas para a mesma competência (mês/ano) | Marcada na especificação como "Proposta técnica — validar" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | Mensalidades não aparecem no modelo conceitual, apenas no README: todo associado paga mensalidade? |
| D02 | Qual o valor e a periodicidade? |
| D03 | Inadimplência gera alguma consequência (ex.: impedir inscrição)? |
| D04 | Recomendação: incluir Mensalidade no modelo conceitual antes de planejar a implementação. |
