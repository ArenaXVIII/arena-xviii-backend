# Artefato 1 — Análise Técnica do Caso de Uso

**Projeto:** ARENA XVIII — Sistema de Gestão da Atlética XVIII de Março (UTFPR Medianeira)
**Caso de uso analisado:** UC18 — Vincular Associado a Modalidade
**Documento de origem:** `docs/casos-de-uso.md`, especificação do UC18; complementado por `docs/visao-geral.md`
**Status da especificação:** Rascunho — requer modelagem

> ⚠️ **Especificação que requer modelagem.** A própria especificação recomenda: Confirmar a cardinalidade Associado–Modalidade e se Atleta é papel do Associado ou Entidade própria antes de iniciar a implementação. Este planejamento é preliminar e nenhum item deve sair de `Backlog` antes dessa modelagem.

## 1. Identificação

| Item | Valor |
|---|---|
| Código | UC18 |
| Nome | Vincular Associado a Modalidade |
| Módulo | Associados |
| Sustentação | Baixa |
| Status da especificação | Rascunho — requer modelagem |

## 2. Objetivo e escopo

**Objetivo:** Registrar a participação de um associado em uma modalidade esportiva, na qual ele assume o papel de atleta.

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
| Pré-condição | O associado e a modalidade existem. |
| Pós-condição (sucesso) | O vínculo está registrado e foi persistido. |
| Pós-condição (falha) | Nenhum vínculo é criado. |

## 5. Síntese dos fluxos

### 5.1 Fluxo principal (FP)

| Passo | Descrição |
|---|---|
| FP-1 | O ator informa o associado e a modalidade. |
| FP-2 | O sistema localiza o associado. |
| FP-3 | O sistema localiza a modalidade. |
| FP-4 | O sistema verifica que o vínculo ainda não existe. |
| FP-5 | O sistema registra o vínculo. |
| FP-6 | O sistema persiste o vínculo. |
| FP-7 | O sistema retorna a confirmação. |

### 5.2 Fluxos alternativos e de exceção

| Código | Situação | Passo | Resultado esperado |
|---|---|---|---|
| FA01 | Associado não encontrado | FP-2 | Operação rejeitada, nada é persistido |
| FA02 | Modalidade não encontrada | FP-3 | Operação rejeitada, nada é persistido |
| FA03 | Vínculo já existente | FP-4 | Operação rejeitada, nada é persistido |
| FE01 | Falha na persistência | FP-6 | Operação não concluída, falha informada ao ator |

## 6. Regras de negócio

| Código | Regra | Origem |
|---|---|---|
| RN-UC18-01 | O vínculo exige um associado e uma modalidade existentes | Associado participa de Modalidade (seção 7) |
| RN-UC18-02 | Um associado não pode ser vinculado duas vezes à mesma modalidade | *Proposta técnica — validar* |
| RN-UC18-03 | Um associado pode participar de mais de uma modalidade | Cardinalidade N:N — hipótese (seção 8) |

## 7. Validações

| Validação | Tipo | Origem |
|---|---|---|
| Rejeitar quando: associado não encontrado | Processamento (existência) | FA01 |
| Rejeitar quando: modalidade não encontrada | Processamento (existência) | FA02 |
| Rejeitar quando: vínculo já existente | Processamento (unicidade) | FA03 |
| Nenhuma persistência em caso de rejeição | Processamento | Pós-condição de falha |

## 8. Entidades, contratos e operações envolvidas

| Elemento | Tipo | Observação |
|---|---|---|
| Vínculo Associado–Modalidade (`MemberModality`) | Entidade de domínio | Nova entidade |
| Associado (`Member`) | Entidade relacionada | Deve existir; planejada no UC17 |
| Modalidade (`Modality`) | Entidade relacionada | Deve existir; planejada no UC19 |
| Operação `linkMemberToModality` | Serviço de aplicação | Módulo Associados |
| DTOs de entrada e de resposta | Contratos | Campos de entrada: `memberId`, `modalityId` |
| Exceções por fluxo de rejeição | Contratos de erro | FA01, FA02, FA03, FE01 |

## 9. Componentes e camadas arquiteturais

Stack do repositório: **NestJS 12 + TypeScript (ESM) + Vitest + Supertest**, com organização em `src/modules/<módulo>/` (entities, dtos, repositories, services), conforme iniciado no UC03.

| Camada | Componente | Unidade |
|---|---|---|
| Domínio | Modelar a entidade Vínculo Associado–Modalidade e suas regras | SUB-01 |
| Aplicação | Definir os contratos de aplicação do vínculo entre associado e modalidade | SUB-02 |
| Aplicação | Implementar o serviço de aplicação do vínculo entre associado e modalidade | SUB-03 |
| Infraestrutura | Implementar o adaptador de persistência de vínculos | SUB-04 |
| Interface (API) / Testes | Expor o vínculo associado–modalidade via API HTTP | SUB-05 |
| Interface (API) / Testes | Implementar os testes de integração ponta a ponta (e2e) do vínculo entre associado e modalidade | SUB-06 |
| Documentação | Documentar tecnicamente o vínculo associado–modalidade | SUB-07 |

## 10. Considerações arquiteturais preliminares

1. **Regras no domínio:** as verificações de estado e as invariantes ficam na entidade, como no UC03, protegendo-as independentemente da camada de entrada.
2. **Inversão de dependência:** o serviço depende de portas de repositório (tokens de injeção), permitindo trocar a persistência sem alterar domínio e aplicação.
3. **Persistência condicionada:** só há gravação após todas as verificações passarem (padrão adotado no UC03).
4. **Reuso do módulo:** o `MembersModule` é criado no UC17. Se este caso for implementado antes, a criação do módulo passa a fazer parte desta Sub-Issue de API.

## 11. Restrições e dúvidas levantadas

### 11.1 Requisitos documentados

- Ordem das verificações conforme o fluxo principal (FP-1 a FP-7).
- Toda rejeição ocorre sem persistência (pós-condição de falha).
- Falha de persistência é informada ao ator.

### 11.2 Propostas técnicas / hipóteses (requerem confirmação da equipe)

| ID | Proposta / hipótese | Motivo |
|---|---|---|
| H01 | Rota HTTP `POST /members/:memberId/modalities` | A especificação não define o contrato HTTP |
| H02 | Códigos HTTP: FA01 → 404, FA02 → 404, FA03 → 409, FE01 → 500 | Códigos HTTP não documentados |
| H03 | Adaptador de persistência inicial em memória | Tecnologia de banco de dados não definida |
| H04 | Nomes de classes/arquivos em inglês (`MemberModality`, `linkMemberToModality`), seguindo o padrão do código existente | Convenção não documentada |
| H05 | Sem autenticação/autorização nesta etapa | Funções organizacionais e permissões pendentes de governança |
| RN-UC18-02 | Um associado não pode ser vinculado duas vezes à mesma modalidade | Marcada na especificação como "Proposta técnica — validar" |
| RN-UC18-03 | Um associado pode participar de mais de uma modalidade | Marcada na especificação como "Cardinalidade N:N — hipótese (seção 8)" |

### 11.3 Dúvidas em aberto (da especificação)

| ID | Dúvida |
|---|---|
| D01 | A cardinalidade N:N não foi confirmada (pendência de alta prioridade). |
| D02 | Atleta é papel do Associado ou Entidade própria? (seção 6.1). |
| D03 | Recomendação: confirmar a cardinalidade antes de planejar a implementação. |
