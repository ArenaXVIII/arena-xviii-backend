# Artefato 4 — Sub-Issues

**Épico:** `[UC02] Definir Planejamento do Evento`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC02][SUB-01] Modelar o Objeto de Valor Valor Monetário

**Épico:** [UC02] Definir Planejamento do Evento

### Objetivo
Representar Valor Monetário como Objeto de Valor reutilizável, garantindo sua validade no domínio.

### Descrição
Criar o Objeto de Valor `Money`, imutável e validado na construção, com testes unitários próprios.

### Origem
Seção 5 do modelo conceitual (Objetos de Valor)

### Escopo e responsabilidades
- **Inclui:** Objeto de Valor, validação na construção e testes unitários.
- **Não inclui:** Entidades que usam o Objeto de Valor.

### Critérios de aceite
- [ ] O Valor Monetário rejeita valores inválidos conforme critério definido pela equipe (hipótese: não negativo, com precisão de centavos — validar).
- [ ] O Valor Monetário é imutável e comparável por valor (Objeto de Valor, seção 5 do modelo conceitual).
- [ ] O Objeto de Valor fica em local compartilhado (proposta: `src/common/value-objects/`), pois é reutilizado por UC12, UC13, UC14 e UC16.
- [ ] Testes unitários do Objeto de Valor aprovados (`pnpm test`).

### Dependências
Nenhuma dependência interna.

### Labels sugeridas
`module:eventos`, `uc:UC02`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do Objeto de Valor.

---

## [UC02][SUB-02] Implementar no domínio a operação de definição de planejamento de evento

**Épico:** [UC02] Definir Planejamento do Evento

### Objetivo
Garantir no domínio as regras da definição de planejamento do evento, independentemente da camada de entrada.

### Descrição
Criar na entidade `Event` a operação de definição de planejamento (ex.: `definePlanning(...)`), que aceita eventos em `planning` ou `rescheduled`, valida as informações principais, exige nova data para evento remarcado e leva o evento a `planned`. Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN-UC02-01, RN-UC02-02, RN-UC02-03, RN-UC02-04, FP-3, FP-4, FP-5, FA02, FA03, FA04

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com todas as condições atendidas, a operação produz o resultado da pós-condição de sucesso, sem depender de persistência: "O evento possui as informações principais definidas, está no estado Planejado.".
- [ ] FA02 — Evento em estado diferente de Planejamento ou Remarcado: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] FA03 — Informações principais ausentes ou inválidas: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] FA04 — Evento Remarcado sem nova data diferente da anterior: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] RN-UC02-01 — "Somente eventos nos estados Planejamento ou Remarcado podem ter o planejamento definido": verificada por teste unitário.
- [ ] RN-UC02-02 — "O evento só passa a Planejado quando data, local, orçamento, responsáveis e atrações ou atividades estiverem definidos": verificada por teste unitário.
- [ ] RN-UC02-03 — "Para um evento Remarcado, a transição para Planejado exige a definição de uma nova data": verificada por teste unitário.
- [ ] RN-UC02-04 — "O orçamento deve ser um Valor Monetário válido": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
SUB-01; #13 (UC03 · SUB-01 — entidade `Event` e `EventStatus`).

### Labels sugeridas
`module:eventos`, `uc:UC02`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC02][SUB-03] Definir os contratos de aplicação da definição de planejamento do evento

**Épico:** [UC02] Definir Planejamento do Evento

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro da definição de planejamento do evento.

### Descrição
Definir os DTOs de entrada e de resposta, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-2, FP-7, FA01, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `date`, `location`, `budget`, `responsibles`, `activities`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] Existe exceção dedicada para FA01 (Evento não encontrado).
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-02; #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01).

### Labels sugeridas
`module:eventos`, `uc:UC02`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC02][SUB-04] Implementar o serviço de aplicação da definição de planejamento do evento

**Épico:** [UC02] Definir Planejamento do Evento

### Objetivo
Orquestrar o fluxo principal da definição de planejamento do evento na camada de aplicação.

### Descrição
Implementar o método `definePlanning` no serviço do módulo Eventos: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-2, FP-6, FP-7, FA01, FE01, RN-UC02-05

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] FA01 — Evento não encontrado: lança a exceção correspondente e nada é persistido.
- [ ] Nas rejeições do domínio (FA02, FA03, FA04), a exceção é propagada e `save` não é chamado (verificação explícita por teste).
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-02; SUB-03; #15 (UC03 · SUB-03 — `EventsService`).

### Labels sugeridas
`module:eventos`, `uc:UC02`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC02][SUB-05] Expor a definição de planejamento via API HTTP

**Épico:** [UC02] Definir Planejamento do Evento

### Objetivo
Disponibilizar a definição de planejamento ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `PUT /events/:eventId/planning`) no controller do módulo Eventos, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `EventsModule`.

### Origem
FP-1, FP-7, FA01, FA02, FA03, FA04, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `PUT /events/:eventId/planning` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Evento não encontrado) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA02 (Evento em estado diferente de Planejamento ou Remarcado) retorna HTTP 409 (H02) com mensagem descritiva.
- [ ] FA03 (Informações principais ausentes ou inválidas) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FA04 (Evento Remarcado sem nova data diferente da anterior) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O controller e os provedores estão registrados no `EventsModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-04; #17 (UC03 · SUB-05 — `EventsController` e `EventsModule`).

### Labels sugeridas
`module:eventos`, `uc:UC02`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC02][SUB-06] Implementar os testes de integração ponta a ponta (e2e) da definição de planejamento do evento

**Épico:** [UC02] Definir Planejamento do Evento

### Objetivo
Verificar a definição de planejamento atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FA03, FA04, FE01, RN-UC02-01, RN-UC02-02, RN-UC02-03, RN-UC02-04, RN-UC02-05, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("O evento possui as informações principais definidas, está no estado Planejado e a alteração foi persistida.").
- [ ] FA01 (Evento não encontrado): retorna o código aprovado e a pós-condição de falha se mantém ("O evento permanece inalterado.").
- [ ] FA02 (Evento em estado diferente de Planejamento ou Remarcado): retorna o código aprovado e a pós-condição de falha se mantém ("O evento permanece inalterado.").
- [ ] FA03 (Informações principais ausentes ou inválidas): retorna o código aprovado e a pós-condição de falha se mantém ("O evento permanece inalterado.").
- [ ] FA04 (Evento Remarcado sem nova data diferente da anterior): retorna o código aprovado e a pós-condição de falha se mantém ("O evento permanece inalterado.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-05; #16 (UC03 · SUB-04 — adaptador de persistência de eventos).

### Labels sugeridas
`module:eventos`, `uc:UC02`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC02][SUB-07] Documentar tecnicamente a definição de planejamento

**Épico:** [UC02] Definir Planejamento do Evento

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas da definição de planejamento do evento.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC02, Dúvidas em aberto da especificação

### Escopo e responsabilidades
- **Inclui:** Documentação técnica e registro de decisões.
- **Não inclui:** Documentação de outros casos de uso.

### Critérios de aceite
- [ ] O contrato da rota está documentado e coincide com o comportamento verificado nos testes e2e.
- [ ] As decisões sobre as propostas técnicas e as dúvidas em aberto estão registradas com o resultado.
- [ ] O status da especificação em `docs/casos-de-uso.md` foi atualizado após a validação.
- [ ] Um membro da equipe diferente do autor revisou a documentação.

### Dependências
SUB-05; SUB-06.

### Labels sugeridas
`module:eventos`, `uc:UC02`, `type:documentation`, `priority:low`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
