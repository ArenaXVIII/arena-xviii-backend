# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC04 — Iniciar Vendas/Inscrições
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC04; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho

> **Especificação em Rascunho.** O documento de casos de uso determina que a especificação seja validada pela equipe antes da implementação. Por isso, todos os itens iniciam em `Backlog`.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC04 |
| Nome | Iniciar Vendas/Inscrições |
| Módulo | Eventos |
| Sustentação | Alta |
| Status da especificação | Rascunho |

## 2. Objetivo e escopo

**Objetivo:** Iniciar as vendas ou inscrições de um evento divulgado, levando-o ao estado Em Organização.

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
| Pré-condição | O evento existe e está no estado Divulgado. |
| Pós-condição (sucesso) | O evento está no estado Em Organização e a alteração foi persistida. |
| Pós-condição (falha) | O evento permanece inalterado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator solicita o início das vendas/inscrições informando o identificador do evento. |
| FP-2 | O sistema localiza o evento. |
| FP-3 | O sistema verifica que o evento está no estado Divulgado. |
| FP-4 | O sistema altera o estado para Em Organização. |
| FP-5 | O sistema persiste a alteração. |
| FP-6 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Evento não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Evento em estado diferente de Divulgado | FP-3 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-5 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC04-01 | Somente eventos no estado Divulgado podem iniciar vendas ou inscrições | Ciclo de vida do Evento (seção 11) |
| RN-UC04-02 | A alteração só é persistida quando todas as condições forem atendidas | Padrão adotado no UC03 |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: evento não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: evento em estado diferente de divulgado | Entrada / regra de domínio | FA02 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Evento (`Event`) | Entidade de domínio | Já existente (UC03); recebe nova operação |
| Operação `startSales` | Serviço de aplicação | Módulo Eventos |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: apenas o identificador na rota |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Implementar no domínio a operação de início de vendas/inscrições | SUB-01 |
| Aplicação | Definir os contratos de aplicação do início de vendas/inscrições | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do início de vendas/inscrições | SUB-03 |
| Interface (API) / Testes | Expor o início de vendas/inscrições via API HTTP | SUB-04 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do início de vendas/inscrições | SUB-05 |
| Documentação | Documentar tecnicamente o início de vendas/inscrições | SUB-06 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso da infraestrutura do UC03:** este caso de uso reutiliza o `EventsModule`, o `EventsController` e o adaptador de eventos planejados nas Issues #13 a #17, que ainda estão abertas.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-6).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `PATCH /events/:eventId/start-sales` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 409, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Nomes de classes/arquivos em inglês (`Event`, `startSales`), seguindo o padrão do código existente | Convenção não documentada |
| H04 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | O evento utiliza venda de ingressos, inscrições ou ambos? (seção 6.2 do modelo conceitual). |
| D02 | É necessário definir preço, limite de vagas ou prazo ao iniciar as vendas/inscrições? |
