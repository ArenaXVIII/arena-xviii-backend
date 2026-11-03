# Artefato 4 — Sub-Issues

**Épico:** `[UC09] Cancelar Evento`

Cada bloco abaixo corresponde a uma Issue independente. Ao criá-las, substitua as referências `SUB-XX` por `#número`.

---

## [UC09][SUB-01] Implementar no domínio a operação de cancelamento de evento

**Épico:** [UC09] Cancelar Evento

### Objetivo
Garantir no domínio as regras do cancelamento de evento, independentemente da camada de entrada.

### Descrição
Criar na entidade `Event` a operação de cancelamento (ex.: `cancel(reason)`), que aceita apenas eventos `in_organization`, exige motivo, registra o motivo e leva o evento ao estado final `cancelled`, do qual não há outras transições. Criar as exceções de domínio de cada rejeição e os testes unitários correspondentes.

### Origem
RN06, RN-UC09-01, RN-UC09-02, RN-UC09-03, FP-3, FP-4, FP-5, FA02, FA03

### Escopo e responsabilidades
- **Inclui:** Entidade/operação de domínio, exceções de domínio e testes unitários.
- **Não inclui:** Repositórios, DTOs e camada HTTP.

### Critérios de aceite
- [ ] Com todas as condições atendidas, a operação produz o resultado da pós-condição de sucesso, sem depender de persistência: "O evento está no estado Cancelado, com o motivo registrado.".
- [ ] FA02 — Evento em estado diferente de Em Organização: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] FA03 — Motivo não informado: a operação é rejeitada com exceção de domínio específica e o estado permanece inalterado.
- [ ] RN06 — "Um evento pode ser cancelado quando falta de orçamento, problema grave de local, vendas insuficientes ou cancelamento de fornecedor/atração impedirem sua continuidade": verificada por teste unitário.
- [ ] RN-UC09-01 — "Somente eventos no estado Em Organização podem ser cancelados": verificada por teste unitário.
- [ ] RN-UC09-02 — "O cancelamento exige um motivo": verificada por teste unitário.
- [ ] RN-UC09-03 — "Cancelado é um estado final: o evento não pode mais mudar de estado": verificada por teste unitário.
- [ ] Testes unitários do domínio aprovados (`pnpm test`).

### Dependências
#13 (UC03 · SUB-01 — entidade `Event` e `EventStatus`).

### Labels sugeridas
`module:eventos`, `uc:UC09`, `type:feature`, `layer:domain`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test` com os testes do domínio aprovados.

---

## [UC09][SUB-02] Definir os contratos de aplicação do cancelamento de evento

**Épico:** [UC09] Cancelar Evento

### Objetivo
Estabelecer os contratos de entrada, saída, persistência e erro do cancelamento de evento.

### Descrição
Definir os DTOs de entrada e de resposta, as exceções de aplicação e o contrato de erro de falha de persistência.

### Origem
FP-1, FP-2, FP-7, FA01, FE01

### Escopo e responsabilidades
- **Inclui:** DTOs, porta de repositório e exceções de aplicação.
- **Não inclui:** Implementação de serviço, adaptador e controller.

### Critérios de aceite
- [ ] O DTO de entrada contém: `reason (motivo)`, com validação de formato na borda.
- [ ] O DTO de resposta contém o identificador, os dados relevantes do resultado e a mensagem de confirmação.
- [ ] Existe exceção dedicada para FA01 (Evento não encontrado).
- [ ] O contrato de erro de FE01 reutiliza o definido no UC03 (#14) ou equivalente aprovado.
- [ ] O projeto compila (`pnpm build`) e o lint passa (`pnpm lint`).

### Dependências
SUB-01; #14 (UC03 · SUB-02 — porta `IEventsRepository` e contrato de erro de FE01).

### Labels sugeridas
`module:eventos`, `uc:UC09`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saídas de `pnpm build` e `pnpm lint` sem erros.

---

## [UC09][SUB-03] Implementar o serviço de aplicação do cancelamento de evento

**Épico:** [UC09] Cancelar Evento

### Objetivo
Orquestrar o fluxo principal do cancelamento de evento na camada de aplicação.

### Descrição
Implementar o método `cancelEvent` no serviço do módulo Eventos: localizar os registros necessários, delegar as regras ao domínio, persistir somente após o sucesso e montar a resposta.

### Origem
FP-2, FP-6, FP-7, FA01, FE01, RN-UC09-04

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
SUB-01; SUB-02; #15 (UC03 · SUB-03 — `EventsService`).

### Labels sugeridas
`module:eventos`, `uc:UC09`, `type:feature`, `layer:application`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test`.
- Relatório de cobertura (`pnpm test:cov`) do serviço.

---

## [UC09][SUB-04] Expor o cancelamento de evento via API HTTP

**Épico:** [UC09] Cancelar Evento

### Objetivo
Disponibilizar o cancelamento de evento ao ator por meio da API HTTP.

### Descrição
Criar a rota (proposta H01: `PATCH /events/:eventId/cancel`) no controller do módulo Eventos, mapear as exceções para respostas HTTP (proposta H02) e registrar os provedores no `EventsModule`.

### Origem
FP-1, FP-7, FA01, FA02, FA03, FE01

### Escopo e responsabilidades
- **Inclui:** Rota, mapeamento de erros e registro de módulo.
- **Não inclui:** Autenticação/autorização (funções organizacionais pendentes) e regras de negócio.

### Critérios de aceite
- [ ] A rota proposta `PATCH /events/:eventId/cancel` (H01) recebe os dados e retorna o DTO de resposta no sucesso.
- [ ] FA01 (Evento não encontrado) retorna HTTP 404 (H02) com mensagem descritiva.
- [ ] FA02 (Evento em estado diferente de Em Organização) retorna HTTP 409 (H02) com mensagem descritiva.
- [ ] FA03 (Motivo não informado) retorna HTTP 422 (H02) com mensagem descritiva.
- [ ] FE01 retorna HTTP 500 sem expor detalhes internos.
- [ ] O controller e os provedores estão registrados no `EventsModule`.
- [ ] O controller não contém regra de negócio; apenas delega ao serviço.

### Dependências
SUB-03; #17 (UC03 · SUB-05 — `EventsController` e `EventsModule`).

### Labels sugeridas
`module:eventos`, `uc:UC09`, `type:feature`, `layer:api`, `priority:high`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Exemplos de requisição e resposta (sucesso e cada erro) no PR.

---

## [UC09][SUB-05] Implementar os testes de integração ponta a ponta (e2e) do cancelamento de evento

**Épico:** [UC09] Cancelar Evento

### Objetivo
Verificar o cancelamento de evento atravessando todas as camadas.

### Descrição
Criar testes e2e com Supertest (`vitest.config.e2e.ts`) para o fluxo principal e todos os fluxos alternativos e de exceção, verificando o estado persistido após cada requisição.

### Origem
FP completo, FA01, FA02, FA03, FE01, RN06, RN-UC09-01, RN-UC09-02, RN-UC09-03, RN-UC09-04, Pós-condições

### Escopo e responsabilidades
- **Inclui:** Cenários e2e de todos os fluxos.
- **Não inclui:** Testes de carga e segurança.

### Critérios de aceite
- [ ] FP: uma requisição válida retorna sucesso e a leitura posterior confirma a pós-condição de sucesso ("O evento está no estado Cancelado, com o motivo registrado, e a alteração foi persistida.").
- [ ] FA01 (Evento não encontrado): retorna o código aprovado e a pós-condição de falha se mantém ("O evento permanece inalterado.").
- [ ] FA02 (Evento em estado diferente de Em Organização): retorna o código aprovado e a pós-condição de falha se mantém ("O evento permanece inalterado.").
- [ ] FA03 (Motivo não informado): retorna o código aprovado e a pós-condição de falha se mantém ("O evento permanece inalterado.").
- [ ] FE01: com repositório que falha ao salvar, retorna o código aprovado e informa a falha.
- [ ] `pnpm test:e2e` aprovado.

### Dependências
SUB-04; #16 (UC03 · SUB-04 — adaptador de persistência de eventos).

### Labels sugeridas
`module:eventos`, `uc:UC09`, `type:test`, `layer:api`, `priority:medium`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR.
- Saída de `pnpm test:e2e` com todos os cenários aprovados.

---

## [UC09][SUB-06] Documentar tecnicamente o cancelamento de evento

**Épico:** [UC09] Cancelar Evento

### Objetivo
Registrar o contrato da API, as decisões técnicas e as dúvidas resolvidas do cancelamento de evento.

### Descrição
Documentar a rota, os parâmetros, as respostas e os códigos de erro; registrar as decisões sobre as propostas técnicas e as dúvidas em aberto da especificação; atualizar o status da especificação em `docs/casos-de-uso.md` quando validada.

### Origem
Rastreabilidade do UC09, Dúvidas em aberto da especificação

### Escopo e responsabilidades
- **Inclui:** Documentação técnica e registro de decisões.
- **Não inclui:** Documentação de outros casos de uso.

### Critérios de aceite
- [ ] O contrato da rota está documentado e coincide com o comportamento verificado nos testes e2e.
- [ ] As decisões sobre as propostas técnicas e as dúvidas em aberto estão registradas com o resultado.
- [ ] O status da especificação em `docs/casos-de-uso.md` foi atualizado após a validação.
- [ ] Um membro da equipe diferente do autor revisou a documentação.

### Dependências
SUB-04; SUB-05.

### Labels sugeridas
`module:eventos`, `uc:UC09`, `type:documentation`, `priority:low`, `spec:rascunho`

### Responsável
@LunaRibeiro

### Estado inicial
`Backlog`

### Evidências esperadas
- Link do PR com a documentação.
- Aprovação da revisão no PR.
