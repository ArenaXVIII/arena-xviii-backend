# Artefato 4 — Sub-Issues

**Épico:** `[UC12] Registrar Pagamento`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC12][SUB-01] Modelar a entidade Pagamento e suas regras

**Épico:** [UC12] Registrar Pagamento

### Objetivo
Garantir no domínio as regras do registro de pagamento, independentemente da camada de entrada.

### Descrição
Criar a entidade `Payment` vinculada a um único evento, com Valor Monetário e situação (pendente ou realizado). O registro é rejeitado para eventos Encerrados ou Cancelados. Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN-UC12-01, RN-UC12-02, RN-UC12-03, RN-UC12-04, FP-3, FP-4, FP-5, FA02, FA03

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com dados válidos, a criação produz uma instância de `Payment` consistente com a pós-condição de sucesso.
- [ ] FA02 — Evento Encerrado ou Cancelado: a operação é rejeitada com exceção de domínio específica e nenhum registro é criado.
- [ ] FA03 — Valor ausente ou inválido: a operação é rejeitada com exceção de domínio específica e nenhum registro é criado.
- [ ] RN-UC12-01 — "Todo pagamento deve possuir um Valor Monetário válido": verificada por teste unitário.
- [ ] RN-UC12-02 — "Todo pagamento pertence a um único evento": verificada por teste unitário.
- [ ] RN-UC12-03 — "Um pagamento pode estar pendente ou realizado": verificada por teste unitário.
- [ ] RN-UC12-04 — "Pagamentos não podem ser registrados para eventos Encerrados ou Cancelados": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
UC02 · SUB-01 (Objeto de Valor Valor Monetário).

### Labels sugeridas
`module:financeiro`, `uc:UC12`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC12][SUB-02] Definir os contratos de aplicação do registro de pagamento

**Épico:** [UC12] Registrar Pagamento

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro do registro de pagamento.

### Descrição
Definir os DTOs de entrada e de resposta, a porta de repositório `IPaymentRepository`, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-2, FP-7, FA01, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `eventId`, `amount`, `status (pendente/realizado)`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] A porta `IPaymentRepository` (com token de injeção) declara: findById, save.
- [ ] Existe exceção dedicada para FA01 (Evento não encontrado).
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01.

### Labels sugeridas
`module:financeiro`, `uc:UC12`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC12][SUB-03] Implementar o serviço de aplicação do registro de pagamento

**Épico:** [UC12] Registrar Pagamento

### Objetivo
Orquestrar o fluxo principal do registro de pagamento na camada de aplicação.

### Descrição
Implementar o método `registerPayment` no serviço do módulo Financeiro: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-2, FP-6, FP-7, FA01, FE01, RN-UC12-02

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] FA01 — Evento não encontrado: lança a exceção correspondente e nada é persistido.
- [ ] Nas rejeições do domínio (FA02, FA03), a exceção é propagada e `save` não é chamado (verificação explícita por teste).
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-01; SUB-02; #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01).

### Labels sugeridas
`module:financeiro`, `uc:UC12`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC12][SUB-04] Implementar o adaptador de persistência de pagamentos

**Épico:** [UC12] Registrar Pagamento

### Objetivo
Fornecer implementação concreta da persistência do registro de pagamento.

### Descrição
Implementar `IPaymentRepository`. **Proposta técnica (H03):** adaptador em memória, substituível futuramente sem alterar domínio e aplicação, com carga de dados para os testes e2e.

### Origem
FP-2, FP-6

### Escopo e responsabilidades
- **Inclui:** Adaptador de persistência e seus testes.
- **Não inclui:** Escolha definitiva de banco de dados e migrações.

### Critérios de aceite
- [ ] `findById` retorna a instância correspondente ou `null`.
- [ ] `save` persiste a instância e uma leitura posterior reflete o estado salvo.
- [ ] Alterações em instâncias ainda não salvas não modificam o armazenamento (isolamento).
- [ ] Testes do adaptador aprovados.
- [ ] A decisão H03 foi confirmada pela equipe.

### Dependências
SUB-01; SUB-02.

### Labels sugeridas
`module:financeiro`, `uc:UC12`, `type:feature`, `layer:infra`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do adaptador.

---

## [UC12][SUB-05] Expor o registro de pagamento via API HTTP

**Épico:** [UC12] Registrar Pagamento

### Objetivo
Disponibilizar o registro de pagamento ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `POST /events/:eventId/payments`) no controller do módulo Financeiro, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `FinancialModule` (criando o módulo, se ainda não existir).

### Origem
FP-1, FP-7, FA01, FA02, FA03, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `POST /events/:eventId/payments` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Evento não encontrado) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA02 (Evento Encerrado ou Cancelado) retorna HTTP 409 (H02) com mensagem descritiva.
- [ ] FA03 (Valor ausente ou inválido) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O `FinancialModule` foi criado com controller, serviço e provedores e está registrado no `AppModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-03; SUB-04.

### Labels sugeridas
`module:financeiro`, `uc:UC12`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC12][SUB-06] Implementar os testes de integração ponta a ponta (e2e) do registro de pagamento

**Épico:** [UC12] Registrar Pagamento

### Objetivo
Verificar o registro de pagamento atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FA03, FE01, RN-UC12-01, RN-UC12-02, RN-UC12-03, RN-UC12-04, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("O pagamento está registrado, vinculado ao evento, e foi persistido.").
- [ ] FA01 (Evento não encontrado): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum pagamento é criado.").
- [ ] FA02 (Evento Encerrado ou Cancelado): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum pagamento é criado.").
- [ ] FA03 (Valor ausente ou inválido): retorna o código aprovado e a pós-condição de falha se mantém ("Nenhum pagamento é criado.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-05; SUB-04; #16 (UC03 · SUB-04 — adaptador de persistência de eventos).

### Labels sugeridas
`module:financeiro`, `uc:UC12`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC12][SUB-07] Documentar tecnicamente o registro de pagamento

**Épico:** [UC12] Registrar Pagamento

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do registro de pagamento.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC12, Dúvidas em aberto da especificação

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
`module:financeiro`, `uc:UC12`, `type:documentation`, `priority:low`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
