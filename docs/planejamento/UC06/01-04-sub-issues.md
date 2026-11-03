# Artefato 4 — Sub-Issues

**Épico:** `[UC06] Confirmar Inscrição em Evento`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC06][SUB-01] Implementar no domínio a operação de confirmação de inscrição

**Épico:** [UC06] Confirmar Inscrição em Evento

### Objetivo
Garantir no domínio as regras da confirmação de inscrição, independentemente da camada de entrada.

### Descrição
Criar na entidade `Registration` a operação de confirmação (ex.: `confirm(paymentDone)`), que aceita apenas inscrições pendentes com dados do participante completos e pagamento obrigatório realizado. Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN02, RN-UC06-01, FP-3, FP-4, FP-5, FP-6, FA02, FA03, FA04

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com todas as condições atendidas, a operação produz o resultado da pós-condição de sucesso, sem depender de persistência: "A inscrição está confirmada.".
- [ ] FA02 — Inscrição já confirmada: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] FA03 — Dados do participante incompletos: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] FA04 — Pagamento obrigatório não realizado: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] RN02 — "Uma venda ou inscrição só pode ser confirmada quando os dados necessários estiverem corretos e o pagamento obrigatório tiver sido realizado": verificada por teste unitário.
- [ ] RN-UC06-01 — "Uma inscrição já confirmada não pode ser confirmada novamente": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
UC05 · SUB-01 (entidade de inscrições).

### Labels sugeridas
`module:eventos`, `uc:UC06`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC06][SUB-02] Definir os contratos de aplicação da confirmação de inscrição

**Épico:** [UC06] Confirmar Inscrição em Evento

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro da confirmação de inscrição.

### Descrição
Definir os DTOs de entrada e de resposta, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-2, FP-8, FA01, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] Existe exceção dedicada para FA01 (Inscrição não encontrada).
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01; UC05 · SUB-02 (porta de repositório de inscrições).

### Labels sugeridas
`module:eventos`, `uc:UC06`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC06][SUB-03] Definir a porta de consulta de pagamento da inscrição

**Épico:** [UC06] Confirmar Inscrição em Evento

### Objetivo
Permitir que a confirmação verifique se o pagamento obrigatório da inscrição foi realizado (RN02), sem acoplar o módulo de Eventos ao módulo Financeiro.

### Descrição
Definir uma porta (ex.: `IRegistrationPaymentQuery`) que informe se existe pagamento realizado associado à inscrição, com adaptador baseado no repositório de pagamentos do UC12. **Depende da decisão sobre o vínculo Pagamento × Inscrição (dúvida do UC12).**

### Origem
RN02, FP-5, FA04

### Escopo e responsabilidades
- **Inclui:** Conforme descrição.
- **Não inclui:** Regras de domínio e camada HTTP.

### Critérios de aceite
- [ ] A porta declara uma consulta que retorna se o pagamento obrigatório da inscrição foi realizado.
- [ ] O adaptador usa o repositório de pagamentos do UC12 sem expor detalhes do módulo Financeiro ao domínio de Eventos.
- [ ] A decisão sobre o vínculo entre Pagamento e Inscrição e sobre eventos gratuitos foi registrada pela equipe.
- [ ] Testes unitários do adaptador aprovados.

### Dependências
SUB-02; UC12 · SUB-02 (porta de repositório de pagamentos); UC12 · SUB-04 (adaptador de persistência de pagamentos).

### Labels sugeridas
`module:eventos`, `uc:UC06`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes aprovados.

---

## [UC06][SUB-04] Implementar o serviço de aplicação da confirmação de inscrição

**Épico:** [UC06] Confirmar Inscrição em Evento

### Objetivo
Orquestrar o fluxo principal da confirmação de inscrição na camada de aplicação.

### Descrição
Implementar o método `confirmRegistration` no serviço do módulo Eventos: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-2, FP-5, FP-7, FP-8, FA01, FA04, FE01, RN-UC06-02

### Escopo e responsabilidades
- **Inclui:** Orquestração, tratamento de não encontrado/duplicidade/falha de persistência e testes unitários.
- **Não inclui:** Regras de domínio, adaptador concreto e HTTP.

### Critérios de aceite
- [ ] O caminho de sucesso persiste uma única vez e retorna o DTO de resposta.
- [ ] FA01 — Inscrição não encontrada: lança a exceção correspondente e nada é persistido.
- [ ] FA04 — Pagamento obrigatório não realizado: lança a exceção correspondente e nada é persistido.
- [ ] Nas rejeições do domínio (FA02, FA03), a exceção é propagada e `save` não é chamado (verificação explícita por teste).
- [ ] Uma falha em `save` é convertida no erro de FE01.
- [ ] Testes unitários do serviço com repositórios simulados aprovados.

### Dependências
SUB-01; SUB-02; SUB-03.

### Labels sugeridas
`module:eventos`, `uc:UC06`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC06][SUB-05] Expor a confirmação de inscrição via API HTTP

**Épico:** [UC06] Confirmar Inscrição em Evento

### Objetivo
Disponibilizar a confirmação de inscrição ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `PATCH /registrations/:registrationId/confirm`) no controller do módulo Eventos, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `EventsModule`.

### Origem
FP-1, FP-8, FA01, FA02, FA03, FA04, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `PATCH /registrations/:registrationId/confirm` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Inscrição não encontrada) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA02 (Inscrição já confirmada) retorna HTTP 409 (H02) com mensagem descritiva.
- [ ] FA03 (Dados do participante incompletos) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FA04 (Pagamento obrigatório não realizado) retorna HTTP 409 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O controller e os provedores estão registrados no `EventsModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-04; UC05 · SUB-05 (rotas de inscrições).

### Labels sugeridas
`module:eventos`, `uc:UC06`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC06][SUB-06] Implementar os testes de integração ponta a ponta (e2e) da confirmação de inscrição

**Épico:** [UC06] Confirmar Inscrição em Evento

### Objetivo
Verificar a confirmação de inscrição atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FA03, FA04, FE01, RN02, RN-UC06-01, RN-UC06-02, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("A inscrição está confirmada e a alteração foi persistida.").
- [ ] FA01 (Inscrição não encontrada): retorna o código aprovado e a pós-condição de falha se mantém ("A inscrição permanece inalterada.").
- [ ] FA02 (Inscrição já confirmada): retorna o código aprovado e a pós-condição de falha se mantém ("A inscrição permanece inalterada.").
- [ ] FA03 (Dados do participante incompletos): retorna o código aprovado e a pós-condição de falha se mantém ("A inscrição permanece inalterada.").
- [ ] FA04 (Pagamento obrigatório não realizado): retorna o código aprovado e a pós-condição de falha se mantém ("A inscrição permanece inalterada.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-05; UC05 · SUB-04 (adaptador de persistência de inscrições).

### Labels sugeridas
`module:eventos`, `uc:UC06`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC06][SUB-07] Documentar tecnicamente a confirmação de inscrição

**Épico:** [UC06] Confirmar Inscrição em Evento

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas da confirmação de inscrição.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC06, Dúvidas em aberto da especificação

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
`module:eventos`, `uc:UC06`, `type:documentation`, `priority:low`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
